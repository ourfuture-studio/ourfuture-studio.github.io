import {CATALOG} from './catalog.mjs';
import {createProgressStore} from './progress.mjs';

/** Shared reader/lab record mount. Does not touch SQL inputs or engine state. */
export function mountRecordTools({code,mount,base='',kind='theory',includeLinks=false}={}){
 const row=CATALOG.find(r=>r.code===code);if(!row||!mount)return null;
 const store=createProgressStore({catalog:CATALOG});mount.replaceChildren();mount.classList.add('learner-tools');mount.dataset.code=code;
 const link=(label,href)=>{const a=document.createElement('a');a.textContent=label;a.href=base+href;a.className='learning-theory-link';mount.append(a)};
 if(includeLinks){link('이론 읽기',row.theoryUrl);link(row.question?'관련 문제 풀기':'개념 확인','practice.html?code='+encodeURIComponent(code)+'&type='+(row.question?'choice':'recall'))}
 const read=document.createElement('button'),bookmark=document.createElement('button'),status=document.createElement('p'),notice=document.createElement('p'),warning=document.createElement('p');
 for(const b of [read,bookmark])b.type='button';read.textContent='읽음 표시';bookmark.textContent='북마크';read.id='theory-mark-read';bookmark.id='theory-bookmark';status.className='learner-status';status.setAttribute('role','status');notice.textContent='읽음·북마크·문제 답안은 이 브라우저에 저장합니다. 이론을 열거나 정답을 펼치는 것만으로 객관식 풀이 기록이 생기지는 않습니다.';warning.className='storage-warning';
 mount.append(read,bookmark,status,notice,warning);
 read.onclick=()=>store.setRead(code,!store.getRecord(code).read);bookmark.onclick=()=>store.setBookmark(code,!store.getRecord(code).bookmark);
 const unsubscribe=store.subscribe(({warning:message})=>{const r=store.getRecord(code);read.setAttribute('aria-pressed',String(r.read));bookmark.setAttribute('aria-pressed',String(r.bookmark));status.textContent=[r.read?'읽음 표시함':'아직 읽음 표시 전',r.bookmark?'북마크함':'북마크 안 함',r.choice.attempts?'객관식 '+r.choice.attempts+'회 · 첫 '+(r.choice.firstCorrect?'정답':'오답·모름')+' · 최근 '+(r.choice.lastCorrect?'정답':'오답·모름'):'아직 객관식 풀이 없음',r.recall.checks?'개념 자기점검: '+(r.recall.lastUnderstood?'이해 표시':'다시 확인'):null].filter(Boolean).join(' · ');warning.hidden=!message;warning.textContent=message});
 store.visit(code,kind);return {store,unsubscribe};
}
