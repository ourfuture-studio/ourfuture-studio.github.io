/* Copy code only. This page does not execute Python or store study records. */
(() => {
  'use strict';
  const selectAll = (field) => {
    field.focus();
    field.select();
    field.setSelectionRange(0, field.value.length);
  };
  document.querySelectorAll('[data-copy-target]').forEach((button) => {
    button.addEventListener('click', async () => {
      const card = button.closest('.code-card');
      const code = document.getElementById(button.dataset.copyTarget);
      const status = card.querySelector('[data-copy-status]');
      const fallback = card.querySelector('[data-copy-help]');
      const field = fallback.querySelector('textarea');
      const text = code.textContent;
      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
          throw new Error('Clipboard API unavailable');
        }
        await navigator.clipboard.writeText(text);
        fallback.hidden = true;
        status.textContent = '코드를 복사했습니다. Python 환경에 붙여 넣어 실행하세요.';
      } catch (_) {
        fallback.hidden = false;
        field.value = text;
        selectAll(field);
        status.textContent = '코드를 선택했습니다. Ctrl+C 또는 기기의 복사 메뉴를 사용하세요.';
      }
    });
  });
  document.querySelectorAll('[data-select-code]').forEach((button) => {
    button.addEventListener('click', () => {
      selectAll(button.closest('[data-copy-help]').querySelector('textarea'));
    });
  });
})();
