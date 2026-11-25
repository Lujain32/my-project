import { describe, it, expect, vi, afterEach } from 'vitest';
import handler, { checkRequest, buildPrompt } from '../netlify/functions/letter.js';

function draft(inputs) {
  return { mode: 'draft', inputs };
}

describe('checkRequest', () => {
  it('accepts a draft without a field (D19)', () => {
    const result = checkRequest(draft({ opportunity: 'DAAD EPOS', keyPoints: 'BSc in AI' }));
    expect(result.status).toBe(200);
    expect(result.inputs.field).toBe('');
  });

  it('returns 400 when a required input is missing or blank', () => {
    expect(checkRequest(draft({ keyPoints: 'BSc in AI' })).status).toBe(400);
    expect(checkRequest(draft({ opportunity: 'DAAD EPOS', keyPoints: '   ' })).status).toBe(400);
    expect(checkRequest({ mode: 'improve', inputs: {} }).status).toBe(400);
    expect(checkRequest(null).status).toBe(400);
  });

  it('allows 4,000 characters and returns 413 above that (rule 12)', () => {
    const atLimit = draft({ opportunity: 'a'.repeat(2000), keyPoints: 'b'.repeat(2000) });
    const overLimit = draft({ opportunity: 'a'.repeat(2000), keyPoints: 'b'.repeat(2001) });
    expect(checkRequest(atLimit).status).toBe(200);
    expect(checkRequest(overLimit).status).toBe(413);
  });
});

describe('buildPrompt', () => {
  it('leaves out the Field line when it is empty', () => {
    const prompt = buildPrompt({ opportunity: 'DAAD EPOS', field: '', keyPoints: 'BSc in AI' });
    expect(prompt).not.toContain('Field:');
    expect(prompt).toContain('Target opportunity: DAAD EPOS');
  });
});

describe('handler', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  function post(body) {
    return new Request('http://localhost/api/letter', { method: 'POST', body: JSON.stringify(body) });
  }

  it('returns the letter text from Gemini', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-key');
    vi.stubGlobal('fetch', async () =>
      Response.json({ candidates: [{ content: { parts: [{ text: 'Dear Committee,' }] } }] }),
    );
    const response = await handler(post(draft({ opportunity: 'DAAD', keyPoints: 'BSc' })));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ text: 'Dear Committee,' });
  });

  it('passes on 429 when Gemini is busy', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'test-key');
    vi.stubGlobal('fetch', async () => new Response(null, { status: 429 }));
    const response = await handler(post(draft({ opportunity: 'DAAD', keyPoints: 'BSc' })));
    expect(response.status).toBe(429);
  });

  it('does not call Gemini when the input is missing', async () => {
    const fakeFetch = vi.fn();
    vi.stubGlobal('fetch', fakeFetch);
    const response = await handler(post(draft({ opportunity: 'DAAD' })));
    expect(response.status).toBe(400);
    expect(fakeFetch).not.toHaveBeenCalled();
  });
});
