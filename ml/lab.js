'use strict';
(async()=>{
 const id=document.querySelector('[data-lesson]').dataset.lesson;
 const status=document.getElementById('runtime-status');
 let lesson,worker,timer,busy=false,mode='all',target=0;
 const editors=Array.from(document.querySelectorAll('textarea'));
 const outputs=Array.from(document.querySelectorAll('.output'));
 const stop=document.getElementById('stop');
 const buttons=Array.from(document.querySelectorAll('button[data-run],#run-all,#restore,#check-homework'));
 function lock(value){busy=value;buttons.forEach(b=>b.disabled=value);editors.forEach(e=>e.readOnly=value);stop.disabled=!value;}
 function finish(){clearTimeout(timer);lock(false);}
 function terminate(message){if(worker)worker.terminate();worker=null;finish();status.textContent=message;}
 function ensureWorker(){
  if(worker)return;
  worker=new Worker('worker.js');
  worker.onerror=()=>terminate('실행 도구를 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 실행하세요.');
  worker.onmessage=({data})=>{
   if(data.type==='phase'){status.textContent=data.text;return;}
   if(data.type==='failure'){outputs[target].textContent=data.text;outputs[target].classList.add('error');status.textContent='실행 도구를 준비하지 못했습니다. 연결을 확인하거나 Python 파일을 받아 실행하세요.';finish();return;}
   if(data.type!=='result')return;
   const error=data.results.find(r=>r.error);
   if(mode==='all'||error){data.results.forEach(r=>{outputs[r.index].textContent=r.text;outputs[r.index].classList.toggle('error',r.error);});}
   else {const r=data.results.at(-1);outputs[target].textContent=r.text;outputs[target].classList.toggle('error',r.error);}
   if(mode==='check'&&!error){const actual=data.homework,expected=lesson.answer;let ok=typeof expected==='number'?typeof actual==='number'&&Math.abs(actual-expected)<1e-8:actual===expected;document.getElementById('homework-status').textContent=actual==null?'아직 None입니다. 힌트를 보고 한 줄만 채워 보세요.':ok?'맞았습니다. 정답과 이유도 읽어 보세요.':'다시 확인해 보세요. 힌트와 주어진 조건을 읽어 보세요.';}
   status.textContent=error?'오류가 난 코드 번호와 메시지를 확인하세요.':'입력한 코드 실행을 마쳤습니다.';finish();
  };
 }
 function run(index,kind){
  if(busy||!lesson)return;
  mode=kind;target=index;lock(true);status.textContent='실행 준비 중입니다.';
  ensureWorker();timer=setTimeout(()=>terminate('준비 또는 실행 시간이 길어 중단했습니다. 연결을 확인하고 다시 실행하세요.'),120000);
  worker.postMessage({codes:editors.slice(0,index+1).map(e=>e.value),check:kind==='check'});
 }
 try {const response=await fetch('lessons.json');if(!response.ok)throw Error('목록을 불러오지 못했습니다.');lesson=(await response.json()).find(x=>x.id===id);if(!lesson)throw Error('실습 번호를 찾지 못했습니다.');}
 catch(e){status.textContent=String(e);buttons.forEach(b=>b.disabled=true);return;}
 document.querySelectorAll('[data-run]').forEach(b=>b.addEventListener('click',()=>run(Number(b.dataset.run),'single')));
 document.getElementById('run-all').addEventListener('click',()=>run(3,'all'));
 document.getElementById('check-homework').addEventListener('click',()=>run(3,'check'));
 stop.addEventListener('click',()=>terminate('실행을 중단했습니다. 코드는 그대로입니다. 다시 실행할 수 있습니다.'));
 document.getElementById('restore').addEventListener('click',()=>{editors.forEach((e,i)=>e.value=lesson.codes[i]);outputs.forEach(e=>{e.textContent='아직 실행하지 않았습니다.';e.classList.remove('error');});document.getElementById('homework-status').textContent='';status.textContent='원래 코드로 되돌렸습니다.';});
 document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const editor=editors[Number(b.dataset.copy)];try{await navigator.clipboard.writeText(editor.value);b.textContent='복사했습니다';}catch(e){editor.focus();editor.select();b.textContent='선택한 코드를 Ctrl+C로 복사하세요';}}));
})();
