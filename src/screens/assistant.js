import '../styles/assistant.css';
import { requestDraft } from '../lib/letter-client.js';

// One message for every failure for now. Ticket 07 splits it into
// separate messages for busy, timeout, too long and offline.
const ERROR_MESSAGE = 'Something went wrong. Your text is safe. Please try again.';

// Nothing typed here is saved (D14).
export function assistantScreen() {
  return `
    <h1 class="page-title">Letter Assistant</h1>

    <div class="tabs" role="tablist" aria-label="Mode">
      <button class="tabs__tab" type="button" role="tab" id="tab-draft" aria-selected="true" aria-controls="panel-draft">Draft</button>
    </div>

    <section class="assistant-panel" id="panel-draft" role="tabpanel" aria-labelledby="tab-draft">
      <div class="assistant-row">
        <div class="assistant-field">
          <label class="assistant-label" for="opportunity">Target opportunity <span class="assistant-required">(required)</span></label>
          <p class="assistant-hint" id="opportunity-hint">The scholarship or program you're applying to.</p>
          <input class="assistant-input" id="opportunity" type="text" required aria-describedby="opportunity-hint" placeholder="DAAD EPOS Master's Scholarship">
        </div>
        <div class="assistant-field">
          <label class="assistant-label" for="field">Field</label>
          <p class="assistant-hint" id="field-hint">Your study area.</p>
          <input class="assistant-input" id="field" type="text" aria-describedby="field-hint" placeholder="Artificial intelligence">
        </div>
      </div>

      <div class="assistant-field">
        <label class="assistant-label" for="key-points">Key points about you <span class="assistant-required">(required)</span></label>
        <p class="assistant-hint" id="key-points-hint">Your degree, projects, and why you want this. Don't include ID numbers, phone numbers, or addresses.</p>
        <textarea class="assistant-input assistant-textarea" id="key-points" rows="5" required aria-describedby="key-points-hint"></textarea>
      </div>

      <div class="assistant-actions">
        <button class="button" type="button" id="generate" disabled>Generate</button>
        <p class="assistant-status" id="assistant-status" role="status"></p>
      </div>
    </section>

    <p class="assistant-error" id="assistant-error" role="alert"></p>

    <section class="assistant-panel">
      <label class="assistant-label" for="editor">Your letter</label>
      <textarea class="assistant-input assistant-textarea" id="editor" rows="14" placeholder="Your letter will appear here. You can edit it freely."></textarea>
      <div class="assistant-actions">
        <button class="button button--secondary" type="button" id="copy" disabled>Copy</button>
        <p class="assistant-status" id="copy-status" role="status"></p>
      </div>
    </section>
  `;
}

function valueOf(id) {
  return document.getElementById(id)?.value.trim() ?? '';
}

// Generate needs both required fields. Copy needs text in the editor.
function updateButtons() {
  const generate = document.getElementById('generate');
  const copy = document.getElementById('copy');
  if (generate && generate.dataset.busy !== 'true') {
    generate.disabled = !valueOf('opportunity') || !valueOf('key-points');
  }
  if (copy) {
    copy.disabled = !valueOf('editor');
  }
}

async function generateLetter() {
  const generate = document.getElementById('generate');
  const status = document.getElementById('assistant-status');
  const error = document.getElementById('assistant-error');

  generate.dataset.busy = 'true';
  generate.disabled = true;
  generate.textContent = 'Writing…';
  status.textContent = 'The assistant is writing your letter. This can take up to 10 seconds.';
  error.textContent = '';

  const result = await requestDraft({
    opportunity: valueOf('opportunity'),
    field: valueOf('field'),
    keyPoints: valueOf('key-points'),
  });

  // The user may have left the screen while waiting.
  const editor = document.getElementById('editor');
  if (!editor) {
    return;
  }

  if (result.ok) {
    editor.value = result.text;
  } else {
    // The editor and inputs keep their text (R11).
    document.getElementById('assistant-error').textContent = ERROR_MESSAGE;
  }

  generate.dataset.busy = 'false';
  generate.textContent = 'Generate';
  document.getElementById('assistant-status').textContent = '';
  updateButtons();
}

async function copyLetter() {
  const copyStatus = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(document.getElementById('editor').value);
    copyStatus.textContent = 'Copied';
  } catch {
    copyStatus.textContent = "Couldn't copy. Select the text and copy it yourself.";
  }
}

// Called once from main.js. Listeners sit on the whole page,
// because the screen's HTML is replaced on every visit.
export function setupAssistant() {
  document.addEventListener('input', (event) => {
    if (['opportunity', 'key-points', 'editor'].includes(event.target.id)) {
      updateButtons();
    }
    if (event.target.id === 'editor') {
      document.getElementById('copy-status').textContent = '';
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.id === 'generate') {
      generateLetter();
    } else if (event.target.id === 'copy') {
      copyLetter();
    }
  });
}
