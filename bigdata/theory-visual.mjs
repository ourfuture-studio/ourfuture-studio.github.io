/* Reading layout only; no access to progress storage or experiment inputs. */
const toc=document.querySelector('.theory-visual-toc');
if(toc){
 const sidebar=document.querySelector('.theory-sidebar'),heading=document.querySelector('.theory-heading');
 const media=matchMedia('(max-width:760px)');
 const arrange=()=>{if(media.matches){heading?.append(toc);toc.open=false}else{sidebar?.prepend(toc);toc.open=true}};
 arrange();media.addEventListener('change',arrange);
}
document.documentElement.dataset.visualReady='true';
const refreshFormulaHints=()=>{for(const region of document.querySelectorAll('.theory-math-expression')){const hint=region.nextElementSibling;if(hint?.classList.contains('theory-math-hint'))hint.hidden=region.scrollWidth<=region.clientWidth+2}};
refreshFormulaHints();document.fonts?.ready.then(refreshFormulaHints);addEventListener('resize',refreshFormulaHints);
