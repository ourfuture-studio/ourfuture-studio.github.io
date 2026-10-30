for(const [index,code] of [...document.querySelectorAll('#theory-content pre code')].entries()){
 const button=document.createElement('button');button.type='button';button.className='copy-sql';button.textContent='쿼리 복사';button.setAttribute('aria-label',`${index+1}번 쿼리 복사`);
 button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(code.textContent);button.textContent='복사됨';}catch{const range=document.createRange();range.selectNodeContents(code);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);button.textContent='코드를 선택했습니다. 복사해 주세요.';}});
 code.parentElement.before(button);
}
document.documentElement.dataset.readerReady='true';
