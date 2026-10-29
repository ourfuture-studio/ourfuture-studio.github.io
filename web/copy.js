// Copy exact code text in local previews, including the current editor value.
(() => {
  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); return; }
      catch { /* Fall back for local files or a restricted clipboard. */ }
    }
    const active = document.activeElement;
    const selection = window.getSelection();
    const ranges = selection ? Array.from({length: selection.rangeCount}, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
    const area = document.createElement('textarea');
    area.value = text; area.readOnly = true;
    area.setAttribute('aria-label', '복사할 코드');
    Object.assign(area.style, {position:'fixed',left:'0',top:'0',opacity:'0'});
    document.body.append(area); area.focus(); area.select(); area.setSelectionRange(0, text.length);
    let copied = false;
    try { copied = document.execCommand('copy'); }
    finally {
      area.remove();
      if (active && active.focus) active.focus({preventScroll:true});
      if (selection) { selection.removeAllRanges(); ranges.forEach(range => selection.addRange(range)); }
    }
    if (!copied) throw new Error('Clipboard unavailable');
  }
  function addButton(label, readText, filename) {
    const row = document.createElement('div'); row.className = 'code-heading';
    label.replaceWith(row); row.append(label);
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'copy-code'; button.textContent = '복사';
    button.setAttribute('aria-label', `${filename} 코드 복사`);
    const status = document.createElement('span');
    status.className = 'copy-status'; status.setAttribute('role', 'status');
    row.append(status, button);
    let timer;
    button.addEventListener('click', async () => {
      clearTimeout(timer); button.disabled = true; button.dataset.copyState = 'pending'; status.textContent = '';
      try {
        await copyText(readText());
        button.textContent = '복사 완료'; button.dataset.copyState = 'success';
        status.textContent = `${filename} 코드를 복사했습니다.`;
      } catch {
        button.textContent = '다시 복사'; button.dataset.copyState = 'error';
        status.textContent = '복사하지 못했습니다. 코드를 선택해 복사하세요.';
      } finally {
        button.disabled = false;
        timer = setTimeout(() => { button.textContent = '복사'; }, 2200);
      }
    });
  }
  document.querySelectorAll('pre > code').forEach(code => {
    const pre = code.parentElement;
    let label = pre.previousElementSibling;
    const isFilename = label && /\.(html|js|json|svg|css)$/i.test(label.textContent.trim());
    if (!isFilename) { label = document.createElement('p'); label.textContent = '코드'; pre.before(label); }
    addButton(label, () => code.textContent, label.textContent.trim());
  });
  const editor = document.querySelector('#editor');
  const label = document.querySelector('label[for="editor"]');
  if (editor && label) addButton(label, () => editor.value, 'index.html');
})();
