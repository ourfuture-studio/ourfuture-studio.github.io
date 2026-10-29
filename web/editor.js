// Prism 1.30.0 is vendored locally. The native textarea retains editing/IME/undo.
(() => {
  if (!window.Prism) return;
  Prism.manual = true;
  document.querySelectorAll('pre > code').forEach(code => {
    const filename = code.parentElement.previousElementSibling?.textContent.trim() || '';
    const language = code.dataset.language || (/\.js$/i.test(filename) ? 'javascript' : /\.css$/i.test(filename) ? 'css' : /\.json$/i.test(filename) ? 'javascript' : 'markup');
    if (!Prism.languages[language]) return;
    code.innerHTML = Prism.highlight(code.textContent, Prism.languages[language], language);
    code.classList.add('syntax-code');
  });
  const editor = document.querySelector('#editor');
  if (!editor) return;
  const shell = document.createElement('div'); shell.className = 'code-editor';
  const painted = document.createElement('pre'); painted.className = 'code-highlight';
  painted.setAttribute('aria-hidden', 'true');
  const code = document.createElement('code'); painted.append(code);
  editor.before(shell); shell.append(painted, editor);
  editor.wrap = 'off'; editor.autocomplete = 'off'; editor.autocapitalize = 'off';
  let composing = false;
  function syncScroll() {
    painted.scrollTop = editor.scrollTop; painted.scrollLeft = editor.scrollLeft;
  }
  function paint() {
    code.innerHTML = Prism.highlight(editor.value, Prism.languages.markup, 'markup') + '\n';
    syncScroll();
  }
  editor.addEventListener('input', () => { if (!composing) paint(); });
  editor.addEventListener('compositionstart', () => { composing = true; shell.classList.add('is-composing'); });
  editor.addEventListener('compositionend', () => { composing = false; shell.classList.remove('is-composing'); paint(); });
  editor.addEventListener('scroll', syncScroll);
  document.querySelector('#reset')?.addEventListener('click', () => requestAnimationFrame(paint));
  paint();
})();
