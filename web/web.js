(() => {
 const editor=document.querySelector('#editor'), frame=document.querySelector('#demo');
 if(!editor||!frame)return;
 const original=editor.defaultValue;
 const source=new URL(frame.getAttribute('src'),location.href);
 const base=new URL('./',source).href;
 document.querySelector('#apply').addEventListener('click',()=>{
   const doc=new DOMParser().parseFromString(editor.value,'text/html');
   doc.querySelectorAll('base').forEach(el=>el.remove());
   const tag=doc.createElement('base');tag.href=base;doc.head.prepend(tag);
   frame.srcdoc='<!doctype html>\n'+doc.documentElement.outerHTML;
   document.querySelector('#lab-status').textContent='수정한 코드를 적용했습니다. 연결 파일은 원본입니다.';
 });
 document.querySelector('#reset').addEventListener('click',()=>{
   editor.value=original;frame.removeAttribute('srcdoc');frame.src=source.href;
   document.querySelector('#lab-status').textContent='원본 코드와 실행 화면을 복원했습니다.';
 });
})();
