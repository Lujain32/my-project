// Netlify Function: POST /api/letter (D12).
// It runs on Netlify's server, not in the browser, so the Gemini API key
// stays secret (R19). Letter content is never logged (rule 15).

const MODEL = 'gemini-3.1-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_INPUT_CHARS = 4000; // rule 12
const GEMINI_TIMEOUT_MS = 9000; // inside Netlify's 10-second limit (D12)

// Rule 13: the student's voice, their facts only, nothing invented.
// There is no minimum length on purpose: when the student gives only a few
// facts, a minimum length pushes the model to invent the rest (found in
// testing, 26 Nov 2026).
const INSTRUCTIONS = `You write motivation letters for students applying to scholarships, internships and training programs.
Write in the student's own voice, in the first person, in clear and simple English.
Use only the facts the student gives you. Never invent achievements, grades, experience, projects, awards, skills, tools, tasks or results.
If the student mentions projects without details, do not describe what the projects did or what the student learned from them.
If a detail is missing, leave it out instead of making it up.
Make the letter as long as the facts allow, up to 350 words. A short, true letter is better than a long one.
Return only the letter text, with no title, notes or placeholders.`;

function textOrEmpty(value) {
  return typeof value === 'string' ? value.trim() : '';
}

// Checks the request body. Returns { status: 200, inputs } when it's fine,
// or { status: 400 } for missing input and { status: 413 } for too much text.
export function checkRequest(body) {
  const inputs = body?.inputs ?? {};
  const opportunity = textOrEmpty(inputs.opportunity);
  const field = textOrEmpty(inputs.field);
  const keyPoints = textOrEmpty(inputs.keyPoints);

  if (body?.mode !== 'draft' || !opportunity || !keyPoints) {
    return { status: 400 };
  }
  if (opportunity.length + field.length + keyPoints.length > MAX_INPUT_CHARS) {
    return { status: 413 };
  }
  return { status: 200, inputs: { opportunity, field, keyPoints } };
}

// The message sent to Gemini. Field is optional (D19), so its line is left
// out when it's empty.
export function buildPrompt({ opportunity, field, keyPoints }) {
  const lines = [`Target opportunity: ${opportunity}`];
  if (field) {
    lines.push(`Field: ${field}`);
  }
  lines.push('Key points about me:', keyPoints);
  return lines.join('\n');
}

// A reply with only a status code. The browser turns it into a message (D12).
function statusOnly(code) {
  return new Response(null, { status: code });
}

export default async function handler(request) {
  if (request.method !== 'POST') {
    return statusOnly(405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return statusOnly(400);
  }

  const checked = checkRequest(body);
  if (checked.status !== 200) {
    return statusOnly(checked.status);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return statusOnly(500);
  }

  // Stop waiting for Gemini after 9 seconds.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);

  try {
    const reply = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: INSTRUCTIONS }] },
        contents: [{ role: 'user', parts: [{ text: buildPrompt(checked.inputs) }] }],
        // Keep Gemini 3's default temperature: Google warns that lower values can
        // make it loop. "minimal" thinking and an output cap keep the reply fast,
        // so it fits inside the 9 seconds (D12).
        generationConfig: {
          thinkingConfig: { thinkingLevel: 'minimal' },
          maxOutputTokens: 800,
        },
      }),
      signal: controller.signal,
    });

    if (reply.status === 429) {
      return statusOnly(429); // busy, or the free quota is used up
    }
    if (!reply.ok) {
      return statusOnly(502); // Gemini answered with another error
    }

    const data = await reply.json();
    const parts = data.candidates?.[0]?.content?.parts ?? [];
    const text = parts.map((part) => part.text ?? '').join('').trim();
    if (!text) {
      return statusOnly(502);
    }
    return Response.json({ text });
  } catch (error) {
    return statusOnly(error.name === 'AbortError' ? 504 : 502);
  } finally {
    clearTimeout(timer);
  }
}

// Serves this function at /api/letter instead of /.netlify/functions/letter.
export const config = { path: '/api/letter' };
