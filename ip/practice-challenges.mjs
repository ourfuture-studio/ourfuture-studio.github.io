import {evidenceMarkup,evidenceGuide,matchesEvidence,normalizeEvidenceFilter} from './question-evidence.mjs?v=37f1e52741e0';
import {CONCEPT_LEVELS,TRAP_LEVELS,CHALLENGES,questionProfile,normalizeProfileLevel,matchesProfile} from './question-profiles.mjs?v=aa2007bca57d';

export function profileBadges(id,esc){
 const p=questionProfile(id);
 return `<div class="challenge-badges" aria-label="문제의 학습 특성"><span class="challenge-badge concept-${p.concept}" title="${esc(CONCEPT_LEVELS[p.concept-1].description)}">개념 · ${CONCEPT_LEVELS[p.concept-1].label}</span><span class="challenge-badge trap-${p.trap}" title="${esc(TRAP_LEVELS[p.trap-1].description)}">함정 · ${TRAP_LEVELS[p.trap-1].label}</span></div>`+evidenceMarkup(id,esc);
}
export function profileDescription(id,esc){
 const p=questionProfile(id);
 return `<div class="challenge-focus"><strong>이번 연습의 초점</strong><p>${esc(CONCEPT_LEVELS[p.concept-1].description)} ${esc(TRAP_LEVELS[p.trap-1].description)}</p></div>`;
}
export function returnToPickerUrl(){
 const p=new URLSearchParams(location.search);
 for(const key of [...p.keys()])if(!['subject','topic','status','concept','trap','query','origin','year','count','errorEvidence','frequencyEvidence'].includes(key))p.delete(key);
 return 'practice.html'+(p.size?'?'+p:'');
}
export function filteredItems(items,filters,getState){
 return items.filter(q=>{
  const r=getState(q),s=filters;
  return (s.subject==='all'||String(q.subject)===s.subject)&&
   (s.topic==='all'||q.topicIds.includes(s.topic))&&
   (s.origin==='all'||q.origin===s.origin)&&(s.year==='all'||String(q.year)===s.year)&&
   (!s.query||`${q.id} ${q.title} ${q.summary??''}`.toLowerCase().includes(s.query.toLowerCase()))&&
   (s.status==='all'||s.status==='unanswered'&&!r.attempted||s.status==='wrong'&&r.wrong||s.status==='bookmark'&&r.bookmark)&&
   matchesProfile(q.id,{concept:s.concept,trap:s.trap})&&matchesEvidence(q.id,{error:s.errorEvidence,frequency:s.frequencyEvidence});
 });
}
const icons={warmup:'<path d="M7 22h18M12 18c-5-7 2-9 1-14 7 6 10 10 5 14M14 18c-2-3 0-4 1-6 4 3 4 4 3 6"/>',detective:'<circle cx="13" cy="13" r="8"/><path d="m19 19 9 9M10 13l2 2 4-5"/>',connect:'<circle cx="7" cy="8" r="3"/><circle cx="25" cy="8" r="3"/><circle cx="16" cy="25" r="3"/><path d="M10 8h12M8 11l6 11M24 11l-6 11"/>'};

export function mountChallengePicker({target,items,subjects,topics,getState,onStart,esc,courseName,origins=[],bookmarks=false,shuffle=false,message=''}){
 const $=s=>target.querySelector(s),params=new URLSearchParams(location.search);
 const valid=(v,values,fallback='all')=>values.includes(v)?v:fallback;
 const s={errorEvidence:normalizeEvidenceFilter(params.get('errorEvidence')),frequencyEvidence:normalizeEvidenceFilter(params.get('frequencyEvidence'),true),subject:valid(params.get('subject'),subjects.map(x=>String(x.id))),topic:valid(params.get('topic'),topics.map(x=>x.id)),status:valid(params.get('status')||params.get('mode'),['unanswered','wrong',...(bookmarks?['bookmark']:[])]),concept:normalizeProfileLevel(params.get('concept')),trap:normalizeProfileLevel(params.get('trap')),query:params.get('query')||'',origin:valid(params.get('origin'),origins.map(x=>x.id)),year:valid(params.get('year'),items.map(x=>String(x.year)).filter(x=>x!=='null'&&x!=='undefined')),count:valid(params.get('count'),['5','10','20','all'],'10')};
 const options=(rows,label)=>`<option value="all">${label}</option>`+rows.map(x=>`<option value="${esc(x.id??x.value)}">${esc(x.label??x.name??x.title)}</option>`).join('');
 target.innerHTML=`<section class="challenge-intro"><p class="challenge-kicker">${esc(courseName)} · 문제풀이</p><h1>오늘의 ${esc(courseName)} 도전</h1><p>개념의 복잡함과 함정의 강도를 따로 골라 연습하세요. 내 풀이 기록을 더하면 복습 범위도 좁힐 수 있어요.</p></section>
 <section class="challenge-picker" aria-labelledby="challenge-heading"><div class="challenge-heading"><div><p class="challenge-kicker">오늘의 연습 방향</p><h2 id="challenge-heading">어려운 이유를 나눠서 골라요.</h2><p>개념은 간단해도 함정은 강할 수 있어요. 나에게 필요한 도전부터 시작하세요.</p></div><span class="challenge-total">${items.length}<small>가지 생각 연습</small></span></div><div class="challenge-routes">${CHALLENGES.map(c=>`<button type="button" class="challenge-route route-${c.id}" data-challenge="${c.id}" aria-pressed="false"><span class="challenge-icon"><svg viewBox="0 0 32 32" aria-hidden="true">${icons[c.id]}</svg></span><span class="challenge-route-copy"><small>${c.subtitle}</small><strong>${c.title}</strong><span>${c.description}</span></span><span class="challenge-route-count"><b data-challenge-count="${c.id}"></b>문제 <span aria-hidden="true">↗</span></span></button>`).join('')}</div></section>
 <section class="challenge-filters" aria-label="문제 범위 선택"><div class="challenge-subject-row"><div class="challenge-subjects" role="group" aria-label="과목 선택"><button type="button" data-challenge-subject="all">전체</button>${subjects.map(x=>`<button type="button" data-challenge-subject="${x.id}" title="${esc(x.name)}">${x.id}과목</button>`).join('')}</div><button type="button" class="challenge-reset" id="challenge-reset">선택 초기화</button></div>
 <div class="challenge-fields"><label>개념 부담<select id="challenge-concept">${options(CONCEPT_LEVELS,'모든 개념 부담')}</select></label><label>함정 강도<select id="challenge-trap">${options(TRAP_LEVELS,'모든 함정 강도')}</select></label><label class="challenge-topic-field">주제<select id="challenge-topic"></select></label><label>내 풀이 기록<select id="challenge-status"><option value="all">모든 문제</option><option value="unanswered">첫 풀이</option><option value="wrong">다시 확인할 문제</option>${bookmarks?'<option value="bookmark">표시한 문제</option>':''}</select></label><label>한 번에 풀 분량<select id="challenge-count"><option value="5">5문제씩</option><option value="10">10문제씩</option><option value="20">20문제씩</option><option value="all">선택 범위 전체</option></select></label><label class="challenge-search-field">문제 찾기<input type="search" id="challenge-query" placeholder="개념 또는 문항 ID" value="${esc(s.query)}"></label>${origins.length?`<label>출처 구분<select id="challenge-origin">${options(origins,'모든 구분')}</select></label><label>출처 연도<select id="challenge-year">${options([...new Set(items.map(x=>x.year).filter(Boolean))].sort().map(y=>({id:y,label:y+'년'})),'모든 연도')}</select></label>`:''}</div><div class="evidence-filter-row"><label>외부 오답 근거<select id="challenge-errorEvidence"><option value="all">모든 문제</option><option value="linked">관련 문항 통계 있음</option><option value="unknown">연결 근거 미확인</option></select></label><label>자료 내 빈도 근거<select id="challenge-frequencyEvidence"><option value="all">모든 문제</option><option value="linked">관련 유형군 집계 있음</option><option value="zero">수집 범위 내 0회</option><option value="unknown">집계·연결 미확인</option></select></label></div></section>
 <div class="challenge-launch"><p id="challenge-result-count" role="status"></p><button type="button" class="challenge-start" id="challenge-start">문제 시작 →</button></div><p class="challenge-message" role="status">${esc(message)}</p>
 <details class="challenge-guide"><summary>표시를 읽는 법</summary><div class="challenge-guide-columns"><div><h3>개념 부담</h3>${CONCEPT_LEVELS.map(x=>`<p><strong>${x.label}</strong> · ${x.description}</p>`).join('')}</div><div><h3>함정 강도</h3>${TRAP_LEVELS.map(x=>`<p><strong>${x.label}</strong> · ${x.description}</p>`).join('')}</div></div><p>문항의 개념 연결과 혼동 조건을 읽고 나눈 학습 가이드입니다. 개념·함정 표시는 실측 통계가 아닙니다. 외부 근거는 아래 별도 표시에서 확인할 수 있습니다. ‘첫 풀이·다시 확인’은 이 브라우저의 내 기록을 사용합니다.</p>${evidenceGuide()}</details><div class="challenge-question-grid" id="challenge-grid"></div><p class="challenge-origin-note">직접 만든 교육용 연습문제입니다. 공식 기출문항·합격 예측 서비스가 아닙니다.</p>`;
 const syncTopics=()=>{
  const rows=topics.filter(t=>(s.subject==='all'||String(t.subject)===s.subject)&&items.some(q=>q.topicIds.includes(t.id)));
  if(!rows.some(t=>t.id===s.topic))s.topic='all';
  $('#challenge-topic').innerHTML=options(rows,'모든 주제');$('#challenge-topic').value=s.topic;
 };
 let found=[];
 const launch=list=>{
  const pool=[...list];
  if(shuffle)for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
  const selected=pool.slice(0,s.count==='all'?pool.length:Number(s.count));
  if(selected.length)onStart(selected);
 };
 const render=()=>{
  const p=new URLSearchParams();for(const [k,v]of Object.entries(s))if(v!==''&&v!=='all'&&!(k==='count'&&v==='10'))p.set(k,v);
  history.replaceState(null,'','practice.html'+(p.size?'?'+p:''));
  found=filteredItems(items,s,getState);
  for(const b of target.querySelectorAll('[data-challenge-subject]'))b.setAttribute('aria-pressed',String(b.dataset.challengeSubject===s.subject));
  for(const c of CHALLENGES){const b=$('[data-challenge="'+c.id+'"]'),n=filteredItems(items,{...s,concept:c.concept,trap:c.trap},getState).length;b.disabled=!n;b.setAttribute('aria-pressed',String(s.concept===c.concept&&s.trap===c.trap));$('[data-challenge-count="'+c.id+'"]').textContent=n}
  for(const key of ['errorEvidence','frequencyEvidence','concept','trap','status','count',...(origins.length?['origin','year']:[])])$('#challenge-'+key).value=s[key];
  const labels=[s.subject==='all'?'전체':s.subject+'과목',s.concept==='all'?null:'개념 '+CONCEPT_LEVELS[Number(s.concept)-1].label,s.trap==='all'?null:'함정 '+TRAP_LEVELS[Number(s.trap)-1].label,s.status==='unanswered'?'첫 풀이':s.status==='wrong'?'다시 확인':s.status==='bookmark'?'표시한 문제':null].filter(Boolean);
  if(s.errorEvidence!=='all')labels.push(s.errorEvidence==='linked'?'외부 오답 근거 있음':'외부 오답 미확인');if(s.frequencyEvidence!=='all')labels.push(s.frequencyEvidence==='linked'?'유형군 집계 있음':s.frequencyEvidence==='zero'?'수집 범위 0회':'빈도 미확인');
  $('#challenge-result-count').textContent=labels.join(' · ')+' — '+found.length+'문제';
  const start=$('#challenge-start');start.disabled=!found.length;start.textContent=found.length?(s.count==='all'?found.length:Math.min(Number(s.count),found.length))+'문제 도전 →':'범위를 바꿔 보세요';
  $('#challenge-grid').innerHTML=found.map(q=>{const r=getState(q),state=r.wrong?'다시 확인':r.attempted?'풀어본 문제':'첫 풀이';return `<article class="challenge-question" data-profile-question="${esc(q.id)}"><div class="challenge-card-head"><span>${q.subject}과목 · ${esc(q.id)}</span><span>${state}</span></div><h2>${esc(q.title)}</h2>${profileBadges(q.id,esc)}${q.summary?`<p>${esc(q.summary)}</p>`:''}<div class="challenge-card-actions"><button type="button" data-open-question="${esc(q.id)}">문제 풀기 →</button><a href="theory/${encodeURIComponent(q.topicIds[0])}.html">이론 읽기 ↗</a></div></article>`}).join('')||'<div class="challenge-empty"><h2>이 조합의 문제가 없어요.</h2><p>개념 부담·함정 강도를 넓히거나 선택 초기화를 눌러 보세요.</p></div>';
  for(const b of target.querySelectorAll('[data-open-question]'))b.onclick=()=>onStart([items.find(q=>q.id===b.dataset.openQuestion)]);
 };
 for(const b of target.querySelectorAll('[data-challenge-subject]'))b.onclick=()=>{s.subject=b.dataset.challengeSubject;s.topic='all';syncTopics();render()};
 for(const b of target.querySelectorAll('[data-challenge]'))b.onclick=()=>{const c=CHALLENGES.find(c=>c.id===b.dataset.challenge);s.concept=c.concept;s.trap=c.trap;render()};
 for(const key of ['errorEvidence','frequencyEvidence','concept','trap','status','count','topic',...(origins.length?['origin','year']:[])])$('#challenge-'+key).onchange=e=>{s[key]=e.target.value;render()};
 $('#challenge-query').oninput=e=>{s.query=e.target.value;render()};
 $('#challenge-start').onclick=()=>launch(found);
 $('#challenge-reset').onclick=()=>{for(const key of Object.keys(s))s[key]=key==='query'?'':key==='count'?'10':'all';$('#challenge-query').value='';syncTopics();render()};
 syncTopics();render();
}
