import { CATALOG } from './catalog.mjs';
import { createProgressStore } from './progress.mjs';

const dataNode=document.querySelector('#theory-data');
let code;
try { code=JSON.parse(dataNode?.textContent||'null')?.code; } catch { code=null; }
const lesson=CATALOG.find(item=>item.code===code);
const read=document.querySelector('#theory-mark-read');
const bookmark=document.querySelector('#theory-bookmark');
const status=document.querySelector('#theory-status');
const warning=document.querySelector('#theory-storage-warning');
if(lesson&&read&&bookmark&&status){
  const store=createProgressStore({catalog:CATALOG});
  const update=snapshot=>{
    const record=snapshot.records[code]||{};
    read.disabled=!!record.read;
    read.textContent=record.read?'읽음으로 표시됨':'읽음 표시';
    read.setAttribute('aria-pressed',String(!!record.read));
    bookmark.textContent=record.bookmark?'북마크 해제':'북마크';
    bookmark.setAttribute('aria-pressed',String(!!record.bookmark));
    status.textContent=(record.read?'읽은 개념':'아직 읽음으로 표시하지 않은 개념')+' · '+(record.bookmark?'북마크함':'북마크 안 함')+(record.attempts?' · 풀이 '+record.attempts+'회 · 최근 답안 '+(record.lastCorrect?'정답':'오답'):' · 아직 푼 기록 없음');
    if(warning){warning.hidden=!store.warning;warning.textContent=store.warning||'';}
  };
  read.addEventListener('click',()=>store.markRead(code));
  bookmark.addEventListener('click',()=>{
    const current=store.get().records[code]||{};
    store.setBookmark(code,!current.bookmark);
  });
  store.subscribe(update);
  // Opening a text is a navigation event, not evidence that it was read or solved.
  store.setLastLocation({code,kind:'theory'});
  document.documentElement.dataset.ready='true';
}
