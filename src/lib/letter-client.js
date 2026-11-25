// Sends the Draft inputs to our letter function (D12).
// The browser never talks to Gemini directly (rule 2).

const CLIENT_TIMEOUT_MS = 12000; // D12: the browser gives up after 12 seconds

// Returns { ok: true, text } or { ok: false, status }.
// status 0 means no reply at all (offline, or the 12 seconds ran out).
export async function requestDraft(inputs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const response = await fetch('/api/letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'draft', inputs }),
      signal: controller.signal,
    });
    if (!response.ok) {
      return { ok: false, status: response.status };
    }
    const data = await response.json();
    return { ok: true, text: data.text };
  } catch {
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(timer);
  }
}
