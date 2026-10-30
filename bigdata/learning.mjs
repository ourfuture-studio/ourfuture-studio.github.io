import { CATALOG } from './catalog.mjs';
import { createProgressStore } from './progress.mjs';

const store = createProgressStore({catalog: CATALOG});
let snapshot = store.get();
const content = document.querySelector('#page-content');
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byCode = new Map(CATALOG.map(item => [item.code,item]));
const SUBJECTS = [
  {id:1,name:'빅데이터 분석 기획',short:'분석 기획',description:'분석할 문제와 데이터의 조건을 정해요.',icon:'plan'},
  {id:2,name:'빅데이터 탐색',short:'탐색',description:'자료를 살피고, 전처리와 통계의 기준을 읽어요.',icon:'search'},
  {id:3,name:'빅데이터 모델링',short:'모델링',description:'모형이 학습하는 방식과 적용 조건을 구분해요.',icon:'model'},
  {id:4,name:'빅데이터 결과 해석',short:'결과 해석',description:'평가 지표와 그림에서 결론의 범위를 확인해요.',icon:'chart'},
];
const PATHS={arrow:'M4 10h12m-5-5 5 5-5 5',book:'M10 5C7 2 3 3 2 4v12c3-2 5-1 8 1m0-12c3-3 7-2 8-1v12c-3-2-5-1-8 1V5',bookmark:'M5 3h10v15l-5-3-5 3V3',check:'m4 10 4 4 8-8',cross:'m5 5 10 10M15 5 5 15',search:'M14 14l4 4M15 9a6 6 0 1 1-12 0 6 6 0 0 1 12 0',plan:'M5 4h10v14H5V4m3 0V2h4v2M8 8h4M8 11h4M8 14h3',model:'M10 2v5M4 18v-5h12v5M10 7v6M7 7h6M2 18h4m8 0h4',chart:'M3 3v14h15M7 14V9m4 5V6m4 8v-4',download:'M10 2v11m-4-4 4 4 4-4M3 14v4h14v-4',refresh:'M16 7a7 7 0 1 0 0 7M16 2v5h-5',flask:'M7 2h6M8 2v6l-5 8q-1 2 2 2h10q3 0 2-2l-5-8V2M6 12h8',list:'M7 5h10M7 10h10M7 15h10M3 5h.1M3 10h.1M3 15h.1'};
const icon = name => `<svg class="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="${PATHS[name] || PATHS.book}"></path></svg>`;
const linkFor = (code,kind='theory') => {
  const id=encodeURIComponent(code);
  return kind==='practice'?`practice.html?code=${id}`:kind==='lesson'?`${id}.html`:`theory/${id}.html`;
};
const record = code => snapshot.records[code] || {};
const subjectOf = item => SUBJECTS.find(s=>s.id===Number(item.subject));
const totalAttempts = records => Object.values(records).reduce((sum,r)=>sum+r.attempts,0);
const stats = () => {
  const records = store.get().records;
  const all=Object.values(records),attempts=totalAttempts(records),correct=all.reduce((sum,r)=>sum+r.correct,0);
  return {read:all.filter(r=>r.read).length,solved:all.filter(r=>r.attempts>0).length,wrong:all.filter(r=>r.lastCorrect===false).length,bookmarks:all.filter(r=>r.bookmark).length,attempts,correct,rate:attempts?Math.round(correct/attempts*100):null};
};
const bookmarkButton = item => `<button type="button" class="bookmark-btn" data-bookmark="${esc(item.code)}" aria-pressed="${!!record(item.code).bookmark}" aria-label="${esc(item.title)} · 다시 볼 문제 표시">${icon('bookmark')}</button>`;
const stateLabel = item => {const r=record(item.code);return r.lastCorrect===false?'<span class="card-state wrong">다시 풀 문제</span>':r.lastCorrect===true?`<span class="card-state">${icon('check')}최근 풀이 정답</span>`:r.read?`<span class="card-state">${icon('check')}읽은 개념</span>`:'<span class="card-state">아직 풀지 않음</span>'};
const empty = (heading,description,href='practice.html',label='문제 풀어 보기') => `<div class="empty-state">${icon('book')}<h2>${esc(heading)}</h2><p>${esc(description)}</p><a class="btn primary" href="${href}">${label} ${icon('arrow')}</a></div>`;
const intro = (number,eyebrow,title,description) => `<div class="page-intro"><div><p class="eyebrow-learn">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div><span class="page-number" aria-hidden="true">${number}</span></div>`;
const heading = (title,description,href,label) => `<div class="section-heading"><div><h2>${title}</h2><p>${description}</p></div>${href?`<a class="line-link" href="${href}">${label} ↗</a>`:''}</div>`;
const progressStrip = () => {const s=stats();return `<section class="progress-strip" aria-label="내 학습 현황"><div><h2>차곡차곡, 내 공부 기록</h2><p>현재 브라우저에 저장돼요.</p></div><div><span class="stat-label">읽은 개념</span><span class="stat-value">${s.read}<small>/ ${CATALOG.length}</small></span></div><div><span class="stat-label">풀어 본 문제</span><span class="stat-value">${s.solved}<small>/ ${CATALOG.length}</small></span></div><div><span class="stat-label">누적 정답률</span><span class="stat-value">${s.rate===null?'—':s.rate+'%'}<span class="stat-meta">${s.correct} / ${s.attempts}회 풀이</span></span></div></section>`};

function renderHome(){
  const s=stats(),last=store.get().lastLocation;
  const next=CATALOG.filter(x=>x.featured).sort((a,b)=>a.featuredOrder-b.featuredOrder).find(x=>!record(x.code).read) || CATALOG[0];
  const resume=last&&byCode.has(last.code)?byCode.get(last.code):null;
  content.innerHTML=`<section class="hero" aria-labelledby="home-title"><div class="hero-copy"><p class="eyebrow-learn">빅데이터분석기사 · 필기 공부</p><h1 id="home-title">문제에서 시작해,<br><em>개념으로 이어지는 공부.</em></h1><p>답을 고른 이유까지 이해하고 싶을 때.<br>핵심을 읽고, 조건을 바꿔 보고, 틀린 문제를 다시 풀어요.</p><div class="button-row"><a class="btn primary" href="practice.html">오늘의 10문제 ${icon('arrow')}</a><a class="btn subtle" href="${resume?linkFor(resume.code,['practice','theory','lesson'].includes(last.kind)?last.kind:'theory'):'study.html?view=starter'}">${resume?'최근 학습 다시 보기':'어디서 시작할까요?'} ${icon('book')}</a></div><div class="hero-foot"><span>4과목 · ${CATALOG.length}개 주제</span><span>조건을 바꾸는 체험</span><span>나만의 오답노트</span></div></div><div class="hero-board"><div class="board-top"><b>한 문제, 한 개념</b><span>이렇게 공부해요</span></div><div class="board-card"><span class="pill-learn">2과목 · 결측 발생 기전</span><h2>빈칸이 같아도,<br>발생한 이유는 다를 수 있어요.</h2><p>연령은 모두 관측됐고, 연령대별로 체중 누락 확률이 다르며 관측 연령에만 의존한다면?</p><div class="board-answer"><span>✓</span><span><strong>MAR</strong> · 빈칸의 모양보다 발생 규칙</span></div></div><div class="board-path"><span>문제 풀기</span><i>→</i><span>이유 확인</span><i>→</i><span>조건 바꾸기</span><i>→</i><span>다시 풀기</span></div></div></section>
  ${progressStrip()}
  ${heading('네 과목, 한눈에 살펴보기','필요한 과목부터 골라도 괜찮아요.','study.html','전체 핵심 보기')}
  <div class="subject-grid">${SUBJECTS.map(sub=>{const items=CATALOG.filter(x=>Number(x.subject)===sub.id),read=items.filter(x=>record(x.code).read).length;return `<a class="subject-card" href="study.html?subject=${sub.id}"><div class="subject-top"><span class="subject-number">0${sub.id}</span><span class="subject-icon">${icon(sub.icon)}</span></div><h3>${sub.short}</h3><p>${sub.description}</p><div class="subject-progress"><span>읽은 개념 ${read} / ${items.length}</span><span>${Math.round(read/items.length*100)}%</span></div><div class="progress-line"><span style="width:${read/items.length*100}%"></span></div></a>`}).join('')}</div>
  <div class="two-column"><section class="panel"><div class="section-heading"><div><h2>처음이라면, 이 순서로</h2><p>개념을 연결하는 세 가지 공부 방법</p></div><span class="routine-label">STUDY ROUTINE</span></div><ol class="route-list"><li><span class="route-num">01</span><div><h3><a href="study.html?view=starter">입문 추천 12개로 큰 틀 잡기</a></h3><p>과목별 3개씩, 기존 핵심 자료에서 골랐어요.</p></div><a class="route-end" href="study.html?view=starter" aria-label="입문 추천 12개 보기">${icon('arrow')}</a></li><li><span class="route-num">02</span><div><h3><a href="${linkFor(next.code)}">${esc(next.title)}</a></h3><p>다음 읽을 개념 · ${next.subject}과목 ${next.code}</p></div><a class="route-end" href="${linkFor(next.code)}" aria-label="다음 개념 읽기">${icon('arrow')}</a></li><li><span class="route-num">03</span><div><h3><a href="review.html">틀렸거나 표시한 문제 다시 풀기</a></h3><p>다시 풀 문제 ${s.wrong}개 · 표시한 문제 ${s.bookmarks}개</p></div><a class="route-end" href="review.html" aria-label="오답노트 열기">${icon('arrow')}</a></li></ol></section><section class="panel accent-panel"><p class="eyebrow-learn">직접 바꿔 보는 공부</p><h2>숫자가 바뀌면,<br>답도 달라질까요?</h2><p>표준점수, 분류 지표, 트리 분할.<br>계산값과 판단의 조건을 함께 확인하세요.</p><a class="btn" href="experiments.html">체험 둘러보기 ${icon('arrow')}</a><span class="count-orb" aria-hidden="true">108</span></section></div>`;
}

let filters={subject:['1','2','3','4'].includes(params.get('subject'))?params.get('subject'):'all',query:'',state:params.get('view')==='starter'?'starter':'all'};
function filterMarkup(){return `<section class="filter-panel" aria-label="자료 검색과 필터"><div class="filter-row">${[{id:'all',short:'전체'},...SUBJECTS].map(s=>`<button class="filter-btn" type="button" data-subject="${s.id}" aria-pressed="${String(filters.subject)===String(s.id)}">${s.id==='all'?'전체':s.id+'과목 · '+s.short}</button>`).join('')}<label class="search-wrap">${icon('search')}<input id="catalog-search" type="search" aria-label="개념과 문제 검색" placeholder="개념 · 문제 검색" value="${esc(filters.query)}"></label></div><div class="filter-row"><label class="small muted" for="state-filter">학습 상태</label><select id="state-filter" class="mini-select"><option value="all">전체 개념</option><option value="starter">입문 추천 12개</option><option value="unread">아직 읽지 않은 개념</option><option value="read">읽은 개념</option><option value="unanswered">아직 풀지 않은 문제</option><option value="wrong">다시 풀 문제</option><option value="bookmark">표시한 문제</option></select></div></section>`}
const matchesFilter = item => {const r=record(item.code),q=filters.query.trim().toLocaleLowerCase('ko');return (filters.subject==='all'||Number(filters.subject)===Number(item.subject))&&(!q||[item.code,item.title,item.lead,item.goal,item.question.givens,item.question.stem,...item.question.choices].join(' ').toLocaleLowerCase('ko').includes(q))&&(filters.state==='all'||filters.state==='starter'&&item.featured||filters.state==='unread'&&!r.read||filters.state==='read'&&r.read||filters.state==='unanswered'&&!r.attempts||filters.state==='wrong'&&r.lastCorrect===false||filters.state==='bookmark'&&r.bookmark)};
function lessonCard(item,asLab=false){
  const mainKind=asLab?'lesson':'theory';
  const links=asLab
    ? `<a class="card-link" href="${linkFor(item.code,'lesson')}">체험하기 ${icon('arrow')}</a><a class="card-link" href="${linkFor(item.code)}">이론 읽기</a><a class="card-link" href="${linkFor(item.code,'practice')}">문제 풀기</a>`
    : `<a class="card-link" href="${linkFor(item.code)}">이론 읽기 ${icon('arrow')}</a><a class="card-link" href="${linkFor(item.code,'practice')}">문제 풀기</a><a class="card-link" href="${linkFor(item.code,'lesson')}">체험</a>`;
  return `<article class="lesson-card" data-code="${esc(item.code)}"><div class="card-head"><span class="pill-learn">${item.subject}과목 · ${esc(item.code)}</span>${bookmarkButton(item)}</div><h2><a href="${linkFor(item.code,mainKind)}">${esc(item.title)}</a></h2><p>${esc(asLab?item.goal:item.lead)}</p>${stateLabel(item)}<div class="card-bottom">${links}</div></article>`;
}
function updateCatalog(){const list=CATALOG.filter(matchesFilter);if(filters.state==='starter')list.sort((a,b)=>a.featuredOrder-b.featuredOrder);const count=document.querySelector('#catalog-count');if(!count)return;count.textContent=`${list.length}개 ${page==='experiments'?'체험':'개념'} · 전체 ${CATALOG.length}개 중`;document.querySelector('#catalog-list').innerHTML=list.length?`<div class="lesson-grid">${list.map(i=>lessonCard(i,page==='experiments')).join('')}</div>`:empty('조건에 맞는 자료가 없어요.','다른 과목이나 학습 상태를 고르거나 검색어를 줄여 보세요.','study.html','전체 개념 보기');}
function renderCatalog(asLab=false){
  const featuredLabs=[{code:'1-16',title:'분석 조건 판단'},{code:'2-03',title:'MCAR · MAR · MNAR'},{code:'3-07',title:'트리의 정보이득'},{code:'4-04',title:'정밀도와 재현율'}].map(x=>({...x,item:byCode.get(x.code)})).filter(x=>x.item);
  content.innerHTML=intro(asLab?'04':'02',asLab?'조건을 바꾸는 실험실':'네 과목의 핵심 개념',asLab?'직접 바꾸며 이해하기':'과목별 핵심',asLab?'입력값과 전제를 바꾸고, 결과와 이유를 함께 확인하세요.':'이론과 예제를 바로 읽고, 관련 문제와 조건 변경 체험으로 이어 가세요.')+
    (asLab?`<div class="lab-feature">${featuredLabs.map(x=>`<a class="lab-card" href="${linkFor(x.code,'lesson')}"><div class="lab-visual"><img src="assets/figures/${x.code}.png" alt="" loading="lazy"></div><div><span class="pill-learn">${x.item.subject}과목 · 대표 체험</span><h3>${x.title} ↗</h3><p>${esc(x.item.goal)}</p></div></a>`).join('')}</div>`:'<p class="starter-note">입문 추천은 과목별 3개씩, 개념을 연결하기 위한 시작점입니다. 오답률 순위나 시험 전체 범위를 뜻하지 않습니다.</p>')+filterMarkup()+`<p class="result-count" id="catalog-count" role="status"></p><div id="catalog-list"></div>`;
  document.querySelector('#state-filter').value=filters.state;
  content.querySelectorAll('[data-subject]').forEach(button=>button.addEventListener('click',()=>{filters.subject=button.dataset.subject;content.querySelectorAll('[data-subject]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));updateCatalog()}));
  document.querySelector('#catalog-search').addEventListener('input',event=>{filters.query=event.target.value;updateCatalog()});
  document.querySelector('#state-filter').addEventListener('change',event=>{filters.state=event.target.value;updateCatalog()});
  updateCatalog();
}

let session=null;
function renderSetup(message=''){
  session=null;
  content.innerHTML=intro('03','기억을 꺼내 보는 연습','문제풀이','한 문제씩 풀고 이유를 확인하세요. 틀린 문제는 오답노트에 남습니다.')+`<div class="practice-layout"><section class="panel"><span class="pill-learn">직접 만든 교육용 연습문제</span><h2 style="margin-top:20px">오늘은 무엇을 풀어 볼까요?</h2><p class="muted small">과목과 문제 구성을 고르면 선택한 범위에서 무작위로 출제합니다.</p><form id="practice-setup"><div class="setup-grid"><label class="field">공부할 과목<select name="subject"><option value="all">네 과목 섞어서</option>${SUBJECTS.map(s=>`<option value="${s.id}">${s.id}과목 · ${s.name}</option>`).join('')}</select></label><label class="field">문제 구성<select name="mode"><option value="all">전체 문제에서</option><option value="wrong">다시 풀 문제에서</option><option value="bookmark">표시한 문제에서</option><option value="unanswered">아직 풀지 않은 문제에서</option></select></label><label class="field">문제 수<select name="count"><option value="5">5문제 · 가볍게</option><option value="10" selected>10문제 · 오늘의 연습</option><option value="20">20문제 · 조금 더</option></select></label></div><p id="available-count" class="small muted" role="status"></p><p class="quiz-alert" id="setup-message" role="status">${esc(message)}</p><button class="btn primary" type="submit">풀기 시작 ${icon('arrow')}</button></form></section><aside class="practice-aside"><span class="pill-learn">가볍게 시작하세요</span><div class="aside-number">10<span style="font:13px sans-serif"> 문제</span></div><h2>정답 다음에는, 이유까지</h2><ul><li>보기 하나를 고르면 바로 채점해요.</li><li>오답 이유와 연결된 체험을 확인해요.</li><li>틀린 문제와 표시한 문제를 다시 풀어요.</li></ul><p>여기는 학습용 연습입니다. 실제 시험의 시간·배점·합격 여부를 판정하지 않습니다.</p></aside></div>`;
  const form=document.querySelector('#practice-setup');
  form.elements.subject.value=filters.subject;
  form.elements.mode.value=['wrong','bookmark','unanswered'].includes(params.get('mode'))?params.get('mode'):'all';
  const pool=()=>CATALOG.filter(item=>{const r=record(item.code);return (form.elements.subject.value==='all'||Number(form.elements.subject.value)===Number(item.subject))&&(form.elements.mode.value==='all'||form.elements.mode.value==='wrong'&&r.lastCorrect===false||form.elements.mode.value==='bookmark'&&r.bookmark||form.elements.mode.value==='unanswered'&&!r.attempts)});
  const available=()=>{const n=pool().length;document.querySelector('#available-count').textContent=`선택한 범위에 ${n}문제가 있습니다.${n>0&&n<Number(form.elements.count.value)?' 해당 문제 수만큼 시작합니다.':''}`};
  form.addEventListener('change',available);available();
  form.addEventListener('submit',event=>{event.preventDefault();const items=pool();if(!items.length){document.querySelector('#setup-message').textContent='선택한 범위에 문제가 없습니다. 과목이나 문제 구성을 바꿔 주세요.';return}for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}startSession(items.slice(0,Number(form.elements.count.value)))});
}
function startSession(items){session={items,position:0,answers:[]};renderQuestion();}
function quizAside(){return `<aside class="practice-aside"><h2>이번 연습</h2><p>${session.items.length}문제 · 즉시 해설</p><div class="quiz-overview" aria-label="풀이 진행">${session.items.map((_,i)=>`<span class="${i===session.position?'current ':''}${session.answers[i]?(session.answers[i].correct?'correct':'wrong'):''}" aria-label="${i+1}번 ${session.answers[i]?(session.answers[i].correct?'정답':'오답'):'미응답'}">${i+1}</span>`).join('')}</div><p>틀린 문제는 학습 기록에 남아요.<br>다시 맞히면 ‘다시 풀 문제’에서 빠집니다.</p><button class="btn subtle" type="button" data-action="leave-practice">범위 다시 고르기</button></aside>`}
function renderQuestion(){
  const item=session.items[session.position],q=item.question;
  store.setLastLocation({code:item.code,kind:'practice'});
  content.innerHTML=`<div class="page-intro"><div><p class="eyebrow-learn">문제풀이 · ${item.subject}과목</p><h1>한 문제씩, 이유까지.</h1></div><span class="page-number" aria-hidden="true">03</span></div><div class="practice-layout"><section class="panel" aria-labelledby="question-title"><div class="quiz-top"><span class="pill-learn">${subjectOf(item).short} · ${esc(item.code)}</span><span class="quiz-progress">${session.position+1} / ${session.items.length} 문제</span>${bookmarkButton(item)}</div><div class="progress-line"><span style="width:${(session.position+1)/session.items.length*100}%"></span></div>${q.givens?`<p class="question-givens">${esc(q.givens)}</p>`:''}<h2 class="question-stem" id="question-title" tabindex="-1">${esc(q.stem)}</h2><form id="answer-form"><fieldset class="quiz-options"><legend>정답 보기 하나 선택</legend>${q.choices.map((choice,i)=>`<label class="quiz-choice"><input type="radio" name="answer" value="${i+1}"><span class="choice-index">${i+1}</span><span>${esc(choice)}</span></label>`).join('')}</fieldset><p class="quiz-alert" id="answer-alert" role="status"></p><div id="answer-feedback" aria-live="polite"></div><div class="quiz-actions"><button class="btn primary" type="submit" id="submit-answer">답과 이유 확인 ${icon('arrow')}</button><div class="button-row"><a class="line-link" href="${linkFor(item.code)}">이론 읽기 ↗</a><a class="line-link" href="${linkFor(item.code,'lesson')}">체험 ↗</a></div></div></form></section>${quizAside()}</div>`;
  const form=document.querySelector('#answer-form');
  form.addEventListener('submit',event=>{
    event.preventDefault();if(session.answers[session.position])return;
    const selected=form.querySelector('input[name=answer]:checked');
    if(!selected){document.querySelector('#answer-alert').textContent='보기 하나를 고른 뒤 확인해 주세요.';return}
    const answer=Number(selected.value),correct=answer===q.answer;
    session.answers[session.position]={code:item.code,answer,correct};store.recordAnswer(item.code,answer);
    form.querySelectorAll('input[name=answer]').forEach(input=>{input.disabled=true;const label=input.closest('label');if(Number(input.value)===q.answer)label.classList.add('is-correct');if(input.checked&&!correct)label.classList.add('is-wrong')});
    document.querySelector('#answer-alert').textContent='';
    document.querySelector('#answer-feedback').innerHTML=`<div class="answer-feedback ${correct?'':'wrong'}"><h3>${correct?'맞았습니다. 이유도 확인해 보세요.':'조건을 한 번 더 살펴볼까요?'}</h3><p><strong>정답 ${q.answer}번 · ${esc(q.choices[q.answer-1])}</strong></p><p>${esc(q.reason)}</p><details><summary>다른 보기는 왜 다를까요?</summary><ul>${q.wrong_reasons.map(reason=>`<li>${esc(reason)}</li>`).join('')}</ul></details><p class="button-row"><a class="line-link" href="${linkFor(item.code)}">${icon('book')} 이론 다시 읽기 ↗</a><a class="line-link" href="${linkFor(item.code,'lesson')}">${icon('flask')} 체험으로 확인 ↗</a></p></div>`;
    const submit=document.querySelector('#submit-answer');submit.type='button';submit.id='next-question';submit.innerHTML=`${session.position+1===session.items.length?'이번 연습 결과 보기':'다음 문제'} ${icon('arrow')}`;
    submit.addEventListener('click',()=>{if(session.position+1===session.items.length){renderSessionResult()}else{session.position++;renderQuestion();document.querySelector('#question-title').focus()}});
    const aside=document.querySelector('.practice-aside');aside.outerHTML=quizAside();
  });
}
function renderSessionResult(){
  const right=session.answers.filter(a=>a.correct).length,wrong=session.items.filter((_,i)=>!session.answers[i]?.correct);
  content.innerHTML=intro('03','한 번의 연습을 마쳤어요','오늘 확인한 개념들','이번 결과와 누적 학습 기록을 구분해 보여 드립니다.')+`<section class="panel"><span class="pill-learn">이번 연습 결과</span><div class="session-score">${right}<small> / ${session.items.length}문제 정답</small></div><p class="muted small">${wrong.length?`${wrong.length}문제의 조건을 다시 확인해 보세요. 오답노트에서도 이어서 풀 수 있습니다.`:'이번 문제를 모두 맞혔습니다. 다른 주제나 표시한 문제로 이어 가세요.'}</p><div class="button-row"><button class="btn primary" type="button" data-action="new-practice">다른 문제 풀기 ${icon('arrow')}</button>${wrong.length?'<button class="btn" type="button" data-action="retry-session">이번 오답 다시 풀기</button>':''}<a class="btn subtle" href="review.html">오답노트 보기</a></div><div class="summary-list">${session.items.map((item,i)=>`<div class="summary-item ${session.answers[i]?.correct?'good':''}">${icon(session.answers[i]?.correct?'check':'cross')}<span>${esc(item.title)}</span><a href="${linkFor(item.code)}">이론 읽기 ↗</a></div>`).join('')}</div></section>`;
}

let reviewTab='wrong';
function renderReview(){
  const s=stats();const list=CATALOG.filter(item=>{const r=record(item.code);return reviewTab==='wrong'?r.lastCorrect===false:reviewTab==='bookmark'?r.bookmark:!!r.attempts});
  list.sort((a,b)=>String(record(b.code).lastAttemptAt||'').localeCompare(String(record(a.code).lastAttemptAt||'')));
  content.innerHTML=intro('05','다시 만나면 내 것이 되도록','나의 오답노트','틀렸거나 헷갈린 문제를 모아, 필요한 개념부터 다시 확인하세요.')+`<div class="review-summary"><div><b>${s.wrong}</b><span>다시 풀 문제</span></div><div><b>${s.bookmarks}</b><span>표시한 문제</span></div><div><b>${s.solved}</b><span>풀어 본 문제</span></div></div><div class="section-heading"><div class="filter-row" aria-label="복습 목록"><button class="filter-btn" type="button" data-review-tab="wrong" aria-pressed="${reviewTab==='wrong'}">다시 풀 문제</button><button class="filter-btn" type="button" data-review-tab="bookmark" aria-pressed="${reviewTab==='bookmark'}">표시한 문제</button><button class="filter-btn" type="button" data-review-tab="history" aria-pressed="${reviewTab==='history'}">풀이 기록</button></div>${list.length&&reviewTab!=='history'?`<a class="btn primary" href="practice.html?mode=${reviewTab}">이 문제들 다시 풀기 ${icon('arrow')}</a>`:''}</div><p class="result-count" role="status">${list.length}개 문제${reviewTab==='wrong'?' · 최근 풀이가 오답인 문제입니다. 다시 맞히면 목록에서 빠집니다.':''}</p>${list.length?`<div class="lesson-grid">${list.map(item=>lessonCard(item)+`<!-- ${esc(item.code)} -->`).join('')}</div>`:empty(reviewTab==='wrong'?'아직 다시 풀 문제가 없어요.':reviewTab==='bookmark'?'표시한 문제가 없어요.':'아직 풀이 기록이 없어요.',reviewTab==='bookmark'?'개념 카드의 책갈피를 눌러, 다시 보고 싶은 문제를 모아 보세요.':'문제를 풀면 이곳에 내 공부 기록이 차곡차곡 쌓입니다.',reviewTab==='bookmark'?'study.html':'practice.html',reviewTab==='bookmark'?'핵심 개념 둘러보기':'문제 풀어 보기')}
  <section class="panel record-panel"><h2>내 공부 기록 보관하기</h2><p>현재 브라우저의 기록입니다. 브라우저나 기기를 바꿀 때는 파일로 내보낸 뒤 새 브라우저에서 불러오세요. 같은 문제의 기록은 최근 수정한 쪽을 기준으로 합칩니다.</p><div class="button-row"><button class="btn" type="button" data-action="export-records">${icon('download')}기록 내보내기</button><label class="btn import-label">${icon('book')}기록 불러오기<input class="import-input" id="import-records" type="file" accept="application/json,.json"></label><button class="btn subtle danger" type="button" data-action="show-reset">학습 기록 초기화</button></div><p class="record-message" id="record-message" role="status"></p><div class="reset-confirm" id="reset-confirm" hidden><p>이 브라우저의 빅분기 학습 기록을 모두 지웁니다. 필요한 기록은 먼저 파일로 내보내세요.</p><div class="button-row"><button class="btn danger" type="button" data-action="confirm-reset">이 학습 기록 지우기</button><button class="btn subtle" type="button" data-action="cancel-reset">취소</button></div></div></section>`;
  document.querySelector('#import-records').addEventListener('change',async event=>{const file=event.target.files?.[0];if(!file)return;try{if(file.size>2*1024*1024)throw new Error('2MB 이하의 기록 파일을 골라 주세요.');const result=store.importData(await file.text());recordMessage(`${result.imported}개 문제의 기록을 불러왔습니다.`)}catch(error){recordMessage('불러오지 못했습니다. '+error.message,true)}});
}
function recordMessage(message,error=false){const el=document.querySelector('#record-message');if(el){el.textContent=message;el.classList.toggle('error',error)}}
function updateWarning(){const node=document.querySelector('#storage-warning');node.hidden=!store.warning;node.textContent=store.warning||'';}
store.subscribe(next=>{snapshot=next;updateWarning();if(page==='home')renderHome();if(page==='study'||page==='experiments')updateCatalog();if(page==='review')renderReview()});
content.addEventListener('click',event=>{
  const bookmark=event.target.closest('[data-bookmark]');if(bookmark){const item=byCode.get(bookmark.dataset.bookmark);if(item){store.setBookmark(item.code,!record(item.code).bookmark);if(page==='practice'){bookmark.setAttribute('aria-pressed',String(!!record(item.code).bookmark))}}return}
  const tab=event.target.closest('[data-review-tab]');if(tab){reviewTab=tab.dataset.reviewTab;renderReview();return}
  const button=event.target.closest('[data-action]');if(!button)return;
  switch(button.dataset.action){
    case 'leave-practice':case 'new-practice':renderSetup();break;
    case 'retry-session':{const items=session.items.filter((_,i)=>!session.answers[i]?.correct);if(items.length)startSession(items);break}
    case 'export-records':{const blob=new Blob([store.exportData()],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`bigdata-learning-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);recordMessage('기록 파일을 내려받았습니다. 브라우저의 다운로드 목록을 확인해 주세요.');break}
    case 'show-reset':document.querySelector('#reset-confirm').hidden=false;break;
    case 'cancel-reset':document.querySelector('#reset-confirm').hidden=true;break;
    case 'confirm-reset':store.clear();recordMessage(store.warning?'이 화면의 기록만 비웠습니다. 브라우저 저장값 삭제 여부는 위 경고를 확인하세요.':'이 브라우저의 빅분기 학습 기록을 지웠습니다.',!!store.warning);break;
  }
});
if(page==='home')renderHome();
else if(page==='study')renderCatalog();
else if(page==='experiments')renderCatalog(true);
else if(page==='review')renderReview();
else if(page==='practice'){const code=params.get('code');if(code&&byCode.has(code))startSession([byCode.get(code)]);else renderSetup(code?'해당 문제를 찾지 못했습니다. 아래에서 공부할 범위를 골라 주세요.':'')}
updateWarning();document.documentElement.dataset.ready='true';
