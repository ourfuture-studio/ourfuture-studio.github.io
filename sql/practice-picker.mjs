import {evidenceMarkup,evidenceGuide,matchesEvidence,normalizeEvidenceFilter} from './question-evidence.mjs?v=66a25c28b98b';
import {CONCEPT_LEVELS,TRAP_LEVELS,CHALLENGES,questionProfile,normalizeProfileLevel,matchesProfile} from './question-profiles.mjs?v=bbb345cf3413';

export function profileBadges(row,esc){
 const p=questionProfile(row.code),concept=CONCEPT_LEVELS[p.concept-1],trap=TRAP_LEVELS[p.trap-1];
 return '<div class="question-profile" aria-label="문제의 학습 특성"><span class="profile-badge concept-'+p.concept+'" title="'+esc(concept.description)+'"><span>개념</span> '+esc(concept.label)+'</span><span class="profile-badge trap-'+p.trap+'" title="'+esc(trap.description)+'"><span>함정</span> '+esc(trap.label)+'</span></div>'+evidenceMarkup(row.code,esc);
}
export function profileDescription(row,esc){
 const p=questionProfile(row.code);
 return '<div class="profile-reading"><strong>이번 연습의 초점</strong><p>'+esc(CONCEPT_LEVELS[p.concept-1].description)+' '+esc(TRAP_LEVELS[p.trap-1].description)+'</p></div>';
}
const icon=id=>'<svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+({warmup:'<path d="M8 23h16M11 19c-5-7 2-10 1-15 8 6 12 11 6 15M14 19c-2-3 0-5 1-7 4 3 5 5 3 7"/>',detective:'<circle cx="14" cy="13" r="8"/><path d="m20 19 7 8M11 13l2 2 4-5"/>',connect:'<circle cx="7" cy="8" r="3"/><circle cx="24" cy="8" r="3"/><circle cx="16" cy="25" r="3"/><path d="M10 8h11M8 11l6 11M23 11l-5 11"/>'})[id]+'</svg>';

export function renderPracticePicker(target,{choices,catalog,store,params,badge,empty,esc}){
 const $=selector=>target.querySelector(selector);
 let subject=['1','2'].includes(params.get('subject'))?params.get('subject'):'all';
 let lesson=params.get('lesson')||'all';
 let status=['unanswered','wrong'].includes(params.get('status'))?params.get('status'):'all';
 let concept=normalizeProfileLevel(params.get('concept')),trap=normalizeProfileLevel(params.get('trap'));
 let errorEvidence=normalizeEvidenceFilter(params.get('errorEvidence')),frequencyEvidence=normalizeEvidenceFilter(params.get('frequencyEvidence'),true);
 const levelOptions=(levels,label)=>'<option value="all">'+label+'</option>'+levels.map(l=>'<option value="'+l.value+'">'+l.label+'</option>').join('');
 target.innerHTML=`<section class="challenge-picker" aria-labelledby="challenge-heading">
  <div class="challenge-heading"><div><p class="challenge-kicker">오늘의 연습 방향</p><h2 id="challenge-heading">어려운 이유를 나눠서 골라요.</h2><p>개념은 간단해도 함정은 강할 수 있어요. 나에게 필요한 도전부터 시작하세요.</p></div><span class="challenge-total">${choices.length}<small>가지 생각 연습</small></span></div>
  <div class="challenge-routes">${CHALLENGES.map(c=>`<button type="button" class="challenge-route route-${c.id}" data-challenge="${c.id}" aria-pressed="false"><span class="challenge-icon">${icon(c.id)}</span><span class="challenge-route-copy"><small>${c.subtitle}</small><strong>${c.title}</strong><span>${c.description}</span></span><span class="challenge-route-count"><b data-challenge-count="${c.id}">0</b>문제 <span aria-hidden="true">↗</span></span></button>`).join('')}</div>
 </section>
 <div class="filter-panel profile-filter-panel"><div class="filter-row"><div class="subject-filter" role="group" aria-label="과목 선택"><button type="button" class="filter-btn" data-practice-subject="all">전체</button>${[1,2].map(n=>`<button type="button" class="filter-btn" data-practice-subject="${n}">${n}과목</button>`).join('')}</div><button type="button" class="profile-reset" id="practice-reset">선택 초기화</button></div>
  <div class="filter-row"><label class="field">개념 부담<select class="mini-select" id="practice-concept">${levelOptions(CONCEPT_LEVELS,'모든 개념 부담')}</select></label><label class="field">함정 강도<select class="mini-select" id="practice-trap">${levelOptions(TRAP_LEVELS,'모든 함정 강도')}</select></label><label class="field profile-topic-field">주제<select class="mini-select" id="practice-topic"></select></label><label class="field">내 풀이 기록<select class="mini-select" id="practice-status"><option value="all">모든 문제</option><option value="unanswered">첫 풀이</option><option value="wrong">오답·모름 다시 도전</option></select></label><label class="field">한 번에 풀 분량<select class="mini-select" id="practice-size"><option value="10">10문제씩</option><option value="20">20문제씩</option><option value="all">선택 범위 전체</option></select></label></div>
 <div class="evidence-filter-row"><label>외부 오답 근거<select class="mini-select" id="practice-errorEvidence"><option value="all">모든 문제</option><option value="linked">관련 문항 통계 있음</option><option value="unknown">연결 근거 미확인</option></select></label><label>자료 내 빈도 근거<select class="mini-select" id="practice-frequencyEvidence"><option value="all">모든 문제</option><option value="linked">관련 유형군 집계 있음</option><option value="zero">수집 범위 내 0회</option><option value="unknown">집계·연결 미확인</option></select></label></div>
 </div>
 <div class="practice-launch"><p id="practice-count" class="result-count" role="status"></p><a class="btn primary" id="start-practice">문제 시작 →</a></div>
 <details class="profile-guide"><summary>표시를 읽는 법</summary><div class="profile-guide-columns"><div><h3>개념 부담</h3>${CONCEPT_LEVELS.map(l=>'<p><strong>'+l.label+'</strong> · '+l.description+'</p>').join('')}</div><div><h3>함정 강도</h3>${TRAP_LEVELS.map(l=>'<p><strong>'+l.label+'</strong> · '+l.description+'</p>').join('')}</div></div><p>기존 문항의 개념 연결 수와 혼동 조건을 기준으로 나눈 학습 가이드입니다. 개념·함정 표시는 전체 이용자의 정답률이나 실제 시험 출제 빈도를 측정한 값이 아닙니다. ‘첫 풀이·다시 도전’은 이 브라우저의 내 기록을 사용합니다.</p>${evidenceGuide()}</details>
 <div class="lesson-grid" id="practice-grid"></div><p class="practice-origin">직접 만든 교육용 객관식 ${choices.length}문제입니다. 공식 기출문항이 아니며, 개념 자기점검은 객관식 수에 포함하지 않습니다.</p>`;
 const lessonOf=r=>r.lessonCode||r.code;
 const topics=()=>{
  const rows=catalog.filter(r=>(subject==='all'||r.subject===Number(subject))&&choices.some(q=>lessonOf(q)===r.code));
  if(!rows.some(r=>r.code===lesson))lesson='all';
  $('#practice-topic').innerHTML='<option value="all">모든 주제</option>'+rows.map(r=>'<option value="'+esc(r.code)+'">'+esc(r.title)+'</option>').join('');
  $('#practice-topic').value=lesson;
 };
 const baseRows=()=>choices.filter(r=>{
  const c=store.getRecord(r.code).choice;
  return (subject==='all'||r.subject===Number(subject))&&(lesson==='all'||lessonOf(r)===lesson)&&(status==='all'||status==='unanswered'&&!c.attempts||status==='wrong'&&c.attempts&&!c.lastCorrect);
 });
 const render=()=>{
  const p=new URLSearchParams();
  for(const [key,value] of Object.entries({subject,lesson,status,concept,trap,errorEvidence,frequencyEvidence}))if(value!=='all')p.set(key,value);
  history.replaceState({},'','practice.html'+(p.size?'?'+p:''));
  const base=baseRows().filter(r=>matchesEvidence(r.code,{error:errorEvidence,frequency:frequencyEvidence})),rows=base.filter(r=>matchesProfile(r.code,{concept,trap}));
  for(const b of target.querySelectorAll('[data-practice-subject]'))b.setAttribute('aria-pressed',String(b.dataset.practiceSubject===subject));
  for(const c of CHALLENGES){
   const button=$('[data-challenge="'+c.id+'"]'),count=base.filter(r=>matchesProfile(r.code,c)).length;
   button.setAttribute('aria-pressed',String(c.concept===concept&&c.trap===trap));button.disabled=!count;
   $('[data-challenge-count="'+c.id+'"]').textContent=count;
  }
  $('#practice-errorEvidence').value=errorEvidence;$('#practice-frequencyEvidence').value=frequencyEvidence;
  $('#practice-concept').value=concept;$('#practice-trap').value=trap;$('#practice-status').value=status;
  const labels=[subject==='all'?'전체':subject+'과목',concept==='all'?null:'개념 '+CONCEPT_LEVELS[Number(concept)-1].label,trap==='all'?null:'함정 '+TRAP_LEVELS[Number(trap)-1].label,status==='unanswered'?'첫 풀이':status==='wrong'?'다시 도전':null].filter(Boolean);
  if(errorEvidence!=='all')labels.push(errorEvidence==='linked'?'외부 오답 근거 있음':'외부 오답 미확인');if(frequencyEvidence!=='all')labels.push(frequencyEvidence==='linked'?'유형군 집계 있음':frequencyEvidence==='zero'?'수집 범위 0회':'빈도 미확인');
  $('#practice-count').textContent=labels.join(' · ')+' — '+rows.length+'문제';
  const size=$('#practice-size').value,set=rows.slice(0,size==='all'?rows.length:Number(size));
  const urlFor=(row,range)=>{const url=new URLSearchParams(p);url.set('code',row.code);url.set('type','choice');url.set('set',range.map(r=>r.code).join(','));return 'practice.html?'+url};
  const start=$('#start-practice');
  if(set.length){start.href=urlFor(set[0],set);start.removeAttribute('aria-disabled');start.textContent=set.length+'문제 도전 →'}
  else{start.removeAttribute('href');start.setAttribute('aria-disabled','true');start.textContent='범위를 바꿔 보세요'}
  $('#practice-grid').innerHTML=rows.map(r=>{
   const record=store.getRecord(r.code),state=!record.choice.attempts?'첫 풀이':record.choice.lastCorrect?'풀어본 문제':'다시 도전';
   return '<article class="lesson-card profiled-question" data-question="'+esc(r.code)+'"><div class="card-head">'+badge(r.subject+'과목 · '+(r.group||r.topicId))+'<span class="question-familiarity">'+state+'</span></div><h2>'+esc(r.title)+'</h2>'+profileBadges(r,esc)+'<p>'+esc(r.question.stem)+'</p><div class="card-bottom"><a class="btn primary" href="'+esc(urlFor(r,rows))+'">문제 풀기 →</a><a href="'+esc(r.theoryUrl)+'">이론 읽기 ↗</a></div></article>';
  }).join('')||empty('이 조합의 문제가 없어요.','개념 부담·함정 강도를 넓히거나 선택 초기화를 눌러 보세요.');
 };
 for(const button of target.querySelectorAll('[data-challenge]'))button.onclick=()=>{const c=CHALLENGES.find(c=>c.id===button.dataset.challenge);concept=c.concept;trap=c.trap;render()};
 for(const button of target.querySelectorAll('[data-practice-subject]'))button.onclick=()=>{subject=button.dataset.practiceSubject;lesson='all';topics();render()};
 $('#practice-concept').onchange=e=>{concept=normalizeProfileLevel(e.target.value);render()};
 $('#practice-trap').onchange=e=>{trap=normalizeProfileLevel(e.target.value);render()};
 $('#practice-topic').onchange=e=>{lesson=e.target.value;render()};
 $('#practice-status').onchange=e=>{status=e.target.value;render()};
 $('#practice-size').onchange=render;
 for(const key of ['errorEvidence','frequencyEvidence'])$('#practice-'+key).onchange=e=>{if(key==='errorEvidence')errorEvidence=e.target.value;else frequencyEvidence=e.target.value;render()};
 $('#practice-reset').onclick=()=>{subject=lesson=status=concept=trap=errorEvidence=frequencyEvidence='all';topics();render()};
 topics();render();
}
