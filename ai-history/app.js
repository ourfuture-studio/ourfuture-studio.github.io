(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = [...(window.TIMELINE_DATA || [])].sort((a, b) => a.year - b.year);
  const tracks = {
    neural: { label: '연결주의 AI', english: 'CONNECTIONIST AI', color: '#8595ef', lane: -1 },
    symbolic: { label: '심볼릭 AI', english: 'SYMBOLIC AI', color: '#75beb5', lane: 0 },
    hybrid: { label: '결합 연구', english: 'LEARNING + REASONING', color: '#e2a0ae', lane: 1 },
    foundations: { label: '기초·다른 연구', english: 'FOUNDATIONS / OTHER APPROACHES', color: '#adb5c8', lane: 0 },
    industry: { label: '기업·인프라', english: 'INDUSTRY / INFRASTRUCTURE', color: '#adb5c8', lane: 0 }
  };
  const byId = new Map(all.map(e => [e.id, e]));
  const peopleYears=window.AtlasPeople.profiles.flatMap(p=>p.works.map(w=>w.year));
  const portraitPreference={'advice-taker':'john-mccarthy',backprop:'geoffrey-hinton'};
  function eventPortrait(event){
    if(!window.AtlasPortraits)return null;const people=(event.people||[]).map(name=>window.AtlasPeople.findProfile(name)||{name}),preferred=people.find(p=>p.id===portraitPreference[event.id]);
    return window.AtlasPortraits.pick(preferred?[preferred,...people]:people);
  }
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const state = { mode:'research', filter: 'all', query: '', view: 'journey', events: all, position: 0, target: 0, selected: '', zoom: 1, frame: 0, drag: null, busy: false };
  const modeState={research:{filter:'all',query:''},people:{filter:'all',query:''}};
  const elements = new Map();
  let width = 1000, height = 500, announceTimer;

  function node(tag, className, text) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function art(event, photo = true, target = null) {
    const wrapper = target||node('div', 'moment-art'),portrait=photo?eventPortrait(event):null;
    if(window.AtlasPortraits)window.AtlasPortraits.clear(wrapper);else wrapper.replaceChildren();
    if(portrait){window.AtlasPortraits.render(wrapper,portrait,{loading:target?'eager':'lazy',caption:portrait.name,fallbackLabel:event.title+'의 자체 도식',fallback:()=>{const icon=node('div');icon.innerHTML=window.AtlasArt.cover(event.visual,event.track);return icon;}});}
    else wrapper.innerHTML=window.AtlasArt.cover(event.visual,event.track);
    return wrapper;
  }
  function buildCard(e) {
    const t = tracks[e.track];
    const card = node('button', 'moment-card'); card.type = 'button'; card.dataset.event = e.id;
    card.style.setProperty('--moment', t.color); card.setAttribute('aria-label', `${e.year}, ${t.label}, ${e.title}. 상세 보기`);
    const head = node('div', 'moment-card-head'); head.append(node('span', 'moment-card-category', t.label), node('span', 'mono', String(e.year)));
    const body = node('div', 'moment-body'); body.append(node('h2', '', e.title), node('p', 'moment-people', e.people.join(' · ')), node('p', 'moment-summary', e.summary));
    const more = node('div', 'moment-more'); more.append(node('span', '', '아이디어 들여다보기'), node('span', '', '↗')); body.append(more);
    card.append(head, art(e), body);
    card.addEventListener('click', () => { if (state.busy) return; selectEvent(e.id); openDetail(e.id); });
    return card;
  }
  function normalized(text) { return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function queryText(q) {
    const aliases = { '힌턴': 'hinton', '매카시': 'mccarthy', '맥카시': 'mccarthy', '로젠블랫': 'rosenblatt', '르쿤': 'lecun', '호크라이터': 'hochreiter', '슈미트후버': 'schmidhuber', '가르세즈': 'garcez', '테넨바움': 'tenenbaum', '민스키': 'minsky', '튜링': 'turing' };
    return normalized(aliases[q] || q);
  }
  function updateFilter() {
    for (const button of document.querySelectorAll('[data-filter]')) { const active = button.dataset.filter === state.filter; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); }
    if(state.mode==='people'){
      const count=window.AtlasPeople.setFilter(state.filter,state.query);
      $('all-count').textContent=window.AtlasPeople.total;$('all-filter-label').textContent='전체 인물';
      return;
    }
    $('all-count').textContent=all.length;$('all-filter-label').textContent='전체 흐름';
    const previous = byId.get(state.selected);
    const q = queryText(state.query.trim());
    state.events = all.filter(e => (state.filter === 'all' || state.filter === e.track) && (!q || normalized([e.title,e.subtitle,e.people.join(' '),e.summary,e.detail,e.year,tracks[e.track].label].join(' ')).includes(q)));
    let index = state.events.findIndex(e => e.id === state.selected);
    if (index < 0 && state.events.length) {
      index = previous ? state.events.reduce((best, e, i, arr) => Math.abs(e.year - previous.year) < Math.abs(arr[best].year - previous.year) ? i : best, 0) : 0;
    }
    state.position = state.target = Math.max(0, index); state.selected = state.events[index]?.id || '';
    $('journey-cards').replaceChildren(); elements.clear();
    for (const e of state.events) { const card = buildCard(e); elements.set(e.id,card); $('journey-cards').append(card); }
    $('visible-count').textContent = state.events.length;
    $('current-track').textContent = state.filter === 'all' ? '세 가지 흐름' : tracks[state.filter].label;
    $('scene-empty').hidden = state.events.length > 0;
    $('scene-era').hidden = state.events.length === 0;
    $('time-range').disabled = state.events.length === 0;
    for (const button of document.querySelectorAll('[data-filter]')) { const active = button.dataset.filter === state.filter; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); }
    buildMinimap(); buildFlat(); updateSelection(true); renderJourney();
    if (state.view === 'flat') centerFlat();
  }
  function yearAt(position) {
    if (!state.events.length) return 1943;
    const lo = Math.floor(clamp(position,0,state.events.length-1)); const hi = Math.min(lo+1,state.events.length-1);
    return state.events[lo].year + (state.events[hi].year-state.events[lo].year)*(position-lo);
  }
  function positionAtYear(year) {
    const es=state.events;
    if (!es.length || year<=es[0].year) return 0;
    for (let i=0;i<es.length-1;i++) if(year<=es[i+1].year) return i+(year-es[i].year)/Math.max(1,es[i+1].year-es[i].year);
    return es.length-1;
  }
  function buildMinimap() {
    const container=$('mini-marks'); container.replaceChildren();
    for (const e of state.events) {
      const mark=node('button','mini-mark'); mark.type='button'; mark.dataset.event=e.id; mark.dataset.track=e.track;
      mark.style.left=((e.year-1943)/82*100)+'%'; mark.style.setProperty('--moment',tracks[e.track].color);
      mark.setAttribute('aria-label',`${e.year} ${e.title}`); mark.title=`${e.year} · ${e.title}`;
      mark.addEventListener('click',()=>selectEvent(e.id)); container.append(mark);
    }
  }
  function updateSelection(announce = false) {
    if (!state.events.length) {
      $('selection-number').textContent='0 / 0'; $('selection-title').textContent='검색 조건을 바꿔 보세요'; $('selection-year').textContent=''; $('selection-people').textContent='';
      for(const id of ['selection-open','selection-title','prev-event','next-event'])$(id).disabled=true;
      $('mini-cursor').hidden=true; return;
    }
    $('mini-cursor').hidden=false;
    const index=clamp(Math.round(state.position),0,state.events.length-1); const e=state.events[index];
    const changed=state.selected!==e.id; state.selected=e.id;
    $('selection-number').textContent=String(index+1).padStart(2,'0')+' / '+String(state.events.length).padStart(2,'0');
    $('selection-year').textContent=e.year; $('selection-title').textContent=e.title; $('selection-people').textContent=e.people.join(' · ');
    $('selection-open').disabled=$('selection-title').disabled=false; $('prev-event').disabled=index===0; $('next-event').disabled=index===state.events.length-1;
    let era,caption;
    if(e.year<1960){era='지능을 계산하다';caption='논리와 학습이 시작되는 자리';}
    else if(e.year<1980){era='지식을 표현하다';caption='증명하고, 계획하고, 설명하는 기계';}
    else if(e.year<2000){era='표현을 배우다';caption='학습과 지식, 서로 다른 질문들';}
    else if(e.year<2017){era='배움의 규모를 넓히다';caption='데이터와 계산이 바꾼 가능성';}
    else {era='생각의 경계를 잇다';caption='학습과 추론을 함께 쓰는 연구';}
    $('era-word').textContent=era; $('era-year').textContent=e.year; $('era-caption').textContent=caption;
    const percent=(yearAt(state.position)-1943)/82*100; $('mini-cursor').style.left=percent+'%'; $('time-range').value=yearAt(state.position);
    $('time-range').setAttribute('aria-valuetext',`${e.year} ${e.title}`);
    for(const el of document.querySelectorAll('.mini-mark,.flat-event')) { const active=el.dataset.event===e.id; el.classList.toggle('active',active); el.classList.toggle('selected',active); el.setAttribute('aria-pressed',String(active)); }
    for(const [id,el] of elements) el.classList.toggle('selected',id===e.id);
    if (announce || changed) { clearTimeout(announceTimer); announceTimer=setTimeout(()=>{$('live-status').textContent=`${e.year}, ${e.title}. ${e.people.join(', ')}`;},250); }
  }
  function move(position, immediate=false) {
    state.target=clamp(position,0,Math.max(0,state.events.length-1));
    if(immediate||reducedMotion){state.position=state.target;updateSelection();renderJourney();return;}
    if(!state.frame) state.frame=requestAnimationFrame(animate);
  }
  function animate() {
    const d=state.target-state.position; state.position+=d*.15;
    if(Math.abs(d)<.002)state.position=state.target;
    renderJourney();updateSelection();
    state.frame=state.position===state.target?0:requestAnimationFrame(animate);
  }
  function selectEvent(id, immediate=false) {
    const index=state.events.findIndex(e=>e.id===id); if(index<0)return;
    move(index,immediate); if(state.view==='flat')centerFlat(id);
  }
  function measure() {
    const rect=$('scene').getBoundingClientRect(); width=rect.width||1000;height=rect.height||500;
    renderRoad();renderJourney();
  }
  function renderRoad() {
    const w=width,h=height, cx=w*.52,hy=h*.13;
    let svg='';
    const boundaries=[-.45,-.16,.16,.45];
    boundaries.forEach((v,i)=>{
      svg+=`<path d="M${cx+v*30} ${hy} C${cx+v*w*.18} ${h*.47},${cx+v*w*.72} ${h*.7},${cx+v*w*1.34} ${h*1.13}" stroke="${i===0||i===3?'#64718a':'#3f4b65'}" stroke-width="${i===0||i===3?.8:.6}" fill="none" opacity="${i===0||i===3?.6:.45}"/>`;
    });
    [-1,0,1].forEach((lane,i)=>{
      const c=[tracks.neural.color,tracks.symbolic.color,tracks.hybrid.color][i];
      svg+=`<path d="M${cx+lane*10} ${hy+12} C${cx+lane*w*.055} ${h*.45},${cx+lane*w*.25} ${h*.74},${cx+lane*w*.39} ${h*1.03}" stroke="${c}" stroke-width="1" fill="none" opacity=".22"/>`;
    });
    for(let n=0;n<15;n++){
      const p=n/14, y=hy+(h-hy)*p*p, dx=12+w*.6*p*p;
      svg+=`<path d="M${cx-dx} ${y}H${cx+dx}" stroke="#4a5874" opacity="${.07+p*.13}" stroke-width=".6"/>`;
    }
    svg+=`<circle cx="${cx}" cy="${hy}" r="3" fill="#d6dcea" opacity=".45"/>`;
    const labelY=h*.98;
    [-1,0,1].forEach((lane,i)=>{
      const label=['CONNECTIONIST','SYMBOLIC','HYBRID'][i],c=[tracks.neural.color,tracks.symbolic.color,tracks.hybrid.color][i];
      svg+=`<text x="${cx+lane*w*.3}" y="${labelY}" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="${w<700?6:8}" letter-spacing="2" fill="${c}" opacity=".4">${label}</text>`;
    });
    $('road').setAttribute('viewBox',`0 0 ${w} ${h}`);$('road').innerHTML=svg;
  }
  function renderJourney() {
    const small=width<700;
    const center=width*(small?.5:.53);
    const visiblePerLane=new Map();
    for(let i=0;i<state.events.length;i++){
      const e=state.events[i],card=elements.get(e.id);if(!card)continue;
      const d=i-state.position;
      if(small){
        if(d<-.38||d>1.15){card.style.display='none';card.tabIndex=-1;continue;}
        const scale=.84-clamp(d,-.3,1.15)*.39;
        const x=width*.5+clamp(d,0,1.15)*width*.22;
        const y=height*(.91-clamp(d,-.3,1.15)*.47);
        card.style.display='block';const cardH=card.offsetHeight||286;
        card.style.transform=`translate(${x-132}px,${y-cardH}px) scale(${scale})`;
        card.style.opacity=d<0?clamp(1+d*2.4,0,1):1-d*.3;
        card.style.zIndex=String(100-Math.round(d*10));card.style.pointerEvents='auto';card.tabIndex=0;card.setAttribute('aria-hidden','false');continue;
      }
      if(d<-.67||d>7){card.style.display='none';card.tabIndex=-1;continue;}
      const count=visiblePerLane.get(e.track)||0;
      if(count>1&&d>2){card.style.display='none';card.tabIndex=-1;continue;}
      visiblePerLane.set(e.track,count+1);
      const p=1/(1+Math.max(-.45,d)*.34), lane=tracks[e.track].lane;
      const baseScale=small?.74:1;
      const scale=(.31+.69*Math.pow(p,1.18))*baseScale;
      const y=height*(.22+.69*Math.pow(p,1.55));
      let x=center+lane*width*(small?.27:.29)*Math.pow(p,1.3);
      if(small){x=clamp(x,132*scale+12,width-132*scale-12);}
      card.style.display='block';
      const cardH=card.offsetHeight||286;
      const alpha=d<0?clamp(1+d*1.25,0,1):clamp(1-d*.09,.26,1);
      card.style.display='block';card.style.opacity=alpha;
      card.style.transform=`translate(${x-132}px,${y-cardH}px) scale(${scale}) rotate(${lane*(1-p)*1.8}deg)`;
      card.style.zIndex=String(100-Math.round(d*10));
      card.style.pointerEvents=d>5?'none':'auto';card.tabIndex=d>3?-1:0;
      card.setAttribute('aria-hidden',String(d>5));
    }
  }
  function buildFlat() {
    const world=$('flat-world');world.replaceChildren();
    const px=27*state.zoom,fullWidth=82*px+210;
    world.style.width=fullWidth+'px';
    const availableHeight=$('flat-shell').offsetHeight||height;
    const baseLaneH=Math.max(108,(availableHeight-65)/3);
    const rowEnds={neural:[],symbolic:[],hybrid:[]},placements=new Map();
    for(const e of state.events){const x=(e.year-1943)*px+25;let row=rowEnds[e.track].findIndex(end=>end<=x);if(row<0)row=rowEnds[e.track].length;rowEnds[e.track][row]=x+108;placements.set(e.id,{x,row});}
    const laneKeys=['neural','symbolic','hybrid'],laneHeights=laneKeys.map(key=>Math.max(baseLaneH,rowEnds[key].length*46+20));
    const offsets=laneKeys.map((_,i)=>laneHeights.slice(0,i).reduce((n,h)=>n+h,0));
    world.style.height=(50+laneHeights.reduce((n,h)=>n+h,0))+'px';
    const labels=document.querySelector('.flat-labels');labels.style.setProperty('--flat-scroll',String($('flat-scroll').scrollTop)+'px');
    [...labels.children].forEach((label,i)=>label.style.top=(46+offsets[i]+laneHeights[i]*.5)+'px');
    for(let year=1945;year<=2025;year+=5){const line=node('div','flat-year',String(year));line.style.left=((year-1943)*px+25)+'px';world.append(line);}
    for(let lane=0;lane<3;lane++){const line=node('div','flat-lane-line');line.style.top=(46+offsets[lane]+laneHeights[lane]*.5)+'px';world.append(line);}
    const shortNames={'mcculloch-pitts':'인공 뉴런','logic-theorist':'Logic Theorist',perceptron:'퍼셉트론','advice-taker':'Advice Taker',resolution:'Resolution',strips:'STRIPS',prolog:'Prolog',frames:'프레임','expert-systems':'전문가시스템','knowledge-representation':'지식표현',backprop:'역전파',kbann:'KBANN',lstm:'LSTM',lenet:'LeNet-5',cilp:'C-IL²P',imagenet:'ImageNet',alexnet:'AlexNet',transformer:'Transformer',deepproblog:'DeepProbLog',nscl:'NS-CL',dreamcoder:'DreamCoder',ltn:'LTN',alphageometry:'AlphaGeometry',alphaproof:'AlphaProof'};
    for(const e of state.events){
      const lane={neural:0,symbolic:1,hybrid:2}[e.track];
      const {x,row}=placements.get(e.id);
      const card=node('button','flat-event');card.type='button';card.dataset.event=e.id;card.style.setProperty('--moment',tracks[e.track].color);
      card.style.left=x+'px';card.style.top=(43+offsets[lane]+row*46)+'px';
      card.setAttribute('aria-label',`${e.year}, ${tracks[e.track].label}, ${e.title}. 상세 보기`);
      card.title=e.year+' · '+e.title+' / '+e.people.join(' · ');
      card.append(node('span','mono',String(e.year)),node('strong','',shortNames[e.id]||e.subtitle));
      card.addEventListener('click',()=>{selectEvent(e.id);openDetail(e.id);});world.append(card);
    }
    $('zoom-label').textContent=state.zoom.toFixed(state.zoom%1?1:0)+'×';
    $('zoom-out').disabled=state.zoom<=1;$('zoom-in').disabled=state.zoom>=3;
  }
  function centerFlat(id=state.selected) {
    const e=byId.get(id);if(!e)return;
    const scroll=$('flat-scroll'),x=(e.year-1943)*27*state.zoom+25;
    const card=[...$('flat-world').querySelectorAll('[data-event]')].find(el=>el.dataset.event===id),y=card?parseFloat(card.style.top):0;
    scroll.scrollTo({left:Math.max(0,x-scroll.clientWidth*.45),top:Math.max(0,y-scroll.clientHeight*.4),behavior:reducedMotion?'instant':'smooth'});
  }
  function setView(view) {
    state.view=view;
    $('journey-shell').hidden=view!=='journey';$('flat-shell').hidden=view!=='flat';
    for(const [id,active] of [['journey-view',view==='journey'],['timeline-view',view==='flat']]){$(id).classList.toggle('active',active);$(id).setAttribute('aria-pressed',String(active));}
    if(view==='flat'){buildFlat();updateSelection();centerFlat();}else measure();
  }
  function setMode(mode){
    clearTimeout(announceTimer);
    if(mode==='people'&&state.frame){cancelAnimationFrame(state.frame);state.frame=0;state.position=state.target;state.selected=state.events[Math.round(state.position)]?.id||state.selected;}
    if(state.mode!==mode){modeState[state.mode]={filter:state.filter,query:state.query};Object.assign(state,modeState[mode]);}
    state.mode=mode;
    const people=mode==='people';
    $('people-shell').hidden=!people;
    document.querySelector('.timeline-nav').hidden=people;document.querySelector('.selection-strip').hidden=people;
    document.querySelector('.view-switch').hidden=people;
    for(const [id,on] of [['research-mode',!people],['people-mode',people]]){$(id).classList.toggle('active',on);$(id).setAttribute('aria-pressed',String(on));}
    $('browse-mode-hint').textContent=people?'한 인물의 여러 연구를 연도순으로 읽습니다':'연도 위에서 세 가지 접근을 비교합니다';
    document.querySelector('.intro-period').textContent=people?Math.min(...peopleYears)+' — '+Math.max(...peopleYears):all[0].year+' — '+all.at(-1).year;
    updateFilter();
    if(people){$('journey-shell').hidden=true;$('flat-shell').hidden=true;}
    else setView(state.view);
    try{
      if(people&&window.AtlasPeople.selected)history.replaceState(null,'','#person='+encodeURIComponent(window.AtlasPeople.selected));
      else if(location.hash.startsWith('#person='))history.replaceState(null,'',location.pathname+location.search);
    }catch{}
  }
  function openDetail(id) {
    const e=byId.get(id);if(!e)return;openRecord(e);
    try { history.replaceState(null,'','#event='+encodeURIComponent(id)); } catch {}
  }
  function openWorkDetail(personId,workId){
    const p=window.AtlasPeople.profiles.find(p=>p.id===personId),w=p?.works.find(w=>w.id===workId);if(!w)return;
    const e=byId.get(w.eventId)||{...w,subtitle:w.type,detail:'',related:[],question:''};openRecord(e);
    try{history.replaceState(null,'','#person='+encodeURIComponent(personId)+'&work='+encodeURIComponent(workId));}catch{}
  }
  function openRecord(e) {
    const t=tracks[e.track]||tracks.foundations;
    const article=!!e.content?.article;$('detail-dialog').classList.toggle('is-article',article);$('detail-art').hidden=article;
    $('detail-category').textContent=t.label+' / '+t.english;$('detail-category').style.color='var(--accent)';
    art(e,!article,$('detail-art'));
    $('detail-year').textContent=e.dateLabel;$('detail-title').textContent=e.title;$('detail-subtitle').textContent=e.subtitle;$('detail-people').textContent=e.authorNote||e.people.join(' · ');
    $('detail-person-links').replaceChildren();
    for(const name of e.people){const p=window.AtlasPeople.findProfile(name);if(!p)continue;const b=node('button','',name+'의 기록 ↗');b.type='button';b.addEventListener('click',()=>{$('detail-dialog').close();setMode('people');state.filter='all';state.query='';updateFilter();window.AtlasPeople.select(p.id);});$('detail-person-links').append(b);}
    $('detail-summary').textContent=e.summary;$('detail-summary').hidden=article;$('detail-body').textContent=e.detail||'';$('detail-body').hidden=article||!e.detail;
    $('detail-question').textContent=e.question||'';$('detail-question').parentElement.hidden=article||!e.question;$('detail-caveat').textContent=e.caveat||'';$('detail-caveat').hidden=article;
    document.querySelector('.detail-sources').hidden=article;
    window.AtlasStudy.render(e,$('detail-study'));
    $('detail-sources').replaceChildren();
    for(const s of e.sources){const a=node('a');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';a.append(node('span','',s.title),node('span','','↗'));$('detail-sources').append(a);}
    const portrait=eventPortrait(e);if(portrait)window.AtlasPortraits.appendCredit($('detail-sources'),portrait);
    $('detail-related').replaceChildren();
    $('detail-related').parentElement.hidden=!e.related?.length;
    for(const related of e.related||[]){const r=byId.get(related);if(!r)continue;const b=node('button','',`${r.year} · ${r.title}`);b.type='button';b.addEventListener('click',()=>{
      if(!state.events.some(item=>item.id===r.id)){state.filter='all';state.query='';state.selected=r.id;updateFilter();}
      if(state.mode!=='research'){setMode('research');state.filter='all';state.query='';updateFilter();}selectEvent(r.id);openDetail(r.id);
    });$('detail-related').append(b);}
    const dialog=$('detail-dialog');if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
  }
  function openAbout() { $('about-dialog').showModal(); }
  function addCredits() {
    const c=$('asset-credits');
    for(const portrait of window.AtlasPortraits?.records||[])window.AtlasPortraits.appendCredit(c,portrait);
    c.append(node('p','','도식: ourfuture studio 자체 제작. 인물 사진은 원격 파일을 사용하며, 불러오지 못하면 이름 약자나 자체 도식을 표시합니다. 기존 두 사진은 같은 파일의 보관본을 대체 자료로 쓸 수 있습니다.'));
  }
  function wire() {
    window.addEventListener('atlas:search-result',ev=>{
      const r=ev.detail;
      if($('detail-dialog').open)$('detail-dialog').close();
      if(r.kind==='work'&&r.eventId&&byId.has(r.eventId)){
        setMode('research');state.filter='all';state.query='';updateFilter();selectEvent(r.eventId,true);openDetail(r.eventId);
      }else if(r.personId){
        setMode('people');state.filter='all';state.query='';updateFilter();
        if(r.kind==='work'){window.AtlasPeople.showWork(r.personId,r.workId||r.id);openWorkDetail(r.personId,r.workId||r.id);}
        else{window.AtlasPeople.select(r.personId);$('person-panel').scrollIntoView({block:'start',behavior:reducedMotion?'auto':'smooth'});}
      }
    });
    $('research-mode').addEventListener('click',()=>setMode('research'));$('people-mode').addEventListener('click',()=>setMode('people'));
    window.addEventListener('atlas:open-event',ev=>{if(!byId.has(ev.detail.id))return;setMode('research');state.filter='all';state.query='';updateFilter();selectEvent(ev.detail.id);openDetail(ev.detail.id);});
    window.addEventListener('atlas:open-work',ev=>openWorkDetail(ev.detail.personId,ev.detail.workId));
    window.addEventListener('hashchange',()=>{
      const params=new URLSearchParams(location.hash.slice(1)),person=params.get('person'),event=params.get('event');
      if(person&&window.AtlasPeople.profiles.some(p=>p.id===person)){
        if($('detail-dialog').open)$('detail-dialog').close();setMode('people');state.filter='all';state.query='';updateFilter();window.AtlasPeople.select(person);
        if(params.get('work'))openWorkDetail(person,params.get('work'));
      }else if(event&&byId.has(event)){
        setMode('research');state.filter='all';state.query='';updateFilter();selectEvent(event);openDetail(event);
      }
    });
    document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter;updateFilter();}));
    $('journey-view').addEventListener('click',()=>setView('journey'));$('timeline-view').addEventListener('click',()=>setView('flat'));
    $('prev-event').addEventListener('click',()=>{const i=state.events.findIndex(e=>e.id===state.selected);move(i-1);if(state.view==='flat')centerFlat(state.events[Math.max(0,i-1)]?.id);});
    $('next-event').addEventListener('click',()=>{const i=state.events.findIndex(e=>e.id===state.selected);move(i+1);if(state.view==='flat')centerFlat(state.events[Math.min(state.events.length-1,i+1)]?.id);});
    $('reset-view').addEventListener('click',()=>move(0));
    for(const id of ['selection-open','selection-title'])$(id).addEventListener('click',()=>openDetail(state.selected));
    $('time-range').min=1943;$('time-range').max=2025;$('time-range').step=.01;
    $('time-range').addEventListener('input',e=>{move(positionAtYear(Number(e.target.value)),true);if(state.view==='flat')centerFlat();});
    $('time-range').addEventListener('keydown',e=>{
      if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(e.key))return;
      e.preventDefault();let i=Math.round(state.target);
      if(e.key==='Home')i=0;else if(e.key==='End')i=state.events.length-1;else i+=['ArrowRight','ArrowUp','PageUp'].includes(e.key)?1:-1;
      move(i,true);if(state.view==='flat')centerFlat();
    });
    $('clear-search').addEventListener('click',()=>{state.query='';state.filter='all';window.AtlasSearch?.reset();updateFilter();});
    for(const id of ['about-open','sources-open'])$(id).addEventListener('click',openAbout);
    document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
    document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();}));
    $('detail-dialog').addEventListener('close',()=>window.AtlasArticle?.dispose());
    $('zoom-out').addEventListener('click',()=>{state.zoom=clamp(state.zoom-.25,1,3);buildFlat();updateSelection();centerFlat();});
    $('zoom-in').addEventListener('click',()=>{state.zoom=clamp(state.zoom+.25,1,3);buildFlat();updateSelection();centerFlat();});
    $('theme-toggle').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('theme-toggle').setAttribute('aria-label',dark?'밝은 테마로 전환':'어두운 테마로 전환');try{localStorage.setItem('ourfuture-atlas-theme',dark?'dark':'light');}catch{}});
    try{if(localStorage.getItem('ourfuture-atlas-theme')==='dark'){$('theme-toggle').click();}}catch{}
    const scene=$('scene');
    scene.addEventListener('wheel',e=>{if(!state.events.length||$('detail-dialog').open||$('about-dialog').open)return;e.preventDefault();const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;const factor=e.deltaMode===1?16:e.deltaMode===2?height:1;move(state.target+clamp(delta*factor*.0035,-1.3,1.3));},{passive:false});
    scene.addEventListener('pointerdown',e=>{if(e.target.closest('.scene-bottomline'))return;state.drag={x:e.clientX,y:e.clientY,start:state.target,moved:false,pointer:e.pointerId};});
    scene.addEventListener('pointermove',e=>{const d=state.drag;if(!d||d.pointer!==e.pointerId)return;const dy=e.clientY-d.y,dx=e.clientX-d.x;if(Math.abs(dx)+Math.abs(dy)>7)d.moved=true;if(d.moved){state.busy=true;scene.classList.add('dragging');const delta=Math.abs(dy)>Math.abs(dx)?-dy:-dx;move(d.start+delta*(width<700?.018:.012),true);}});
    const release=()=>{if(!state.drag)return;const moved=state.drag.moved;state.drag=null;scene.classList.remove('dragging');if(moved){move(Math.round(state.target));setTimeout(()=>{state.busy=false;},100);}else state.busy=false;};
    scene.addEventListener('pointerup',release);scene.addEventListener('pointercancel',release);scene.addEventListener('pointerleave',release);
    scene.addEventListener('keydown',e=>{if(e.target.closest('button'))return;if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End','Enter'].includes(e.key)){e.preventDefault();if(e.key==='Enter'){openDetail(state.selected);return;}let pos=Math.round(state.target);if(e.key==='Home')pos=0;else if(e.key==='End')pos=state.events.length-1;else pos+=['ArrowDown','ArrowRight'].includes(e.key)?1:-1;move(pos);}});
    $('flat-scroll').addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){e.preventDefault();if(e.shiftKey)$('flat-scroll').scrollTop+=e.deltaY;else $('flat-scroll').scrollLeft+=e.deltaY;}},{passive:false});
    $('flat-scroll').addEventListener('scroll',()=>document.querySelector('.flat-labels').style.setProperty('--flat-scroll',$('flat-scroll').scrollTop+'px'),{passive:true});
    new ResizeObserver(()=>{if(state.mode!=='research')return;measure();if(state.view==='flat'){buildFlat();updateSelection();}}).observe(scene);
  }
  function init() {
    if(!all.length){$('scene-empty').hidden=false;return;}
    $('all-count').textContent=all.length;
    const route=new URLSearchParams(location.hash.slice(1));
    const requested=route.get('event')||(!route.get('person')&&document.documentElement.dataset.previewEntry);
    state.selected=byId.has(requested)?requested:all[0].id;
    wire();addCredits();updateFilter();measure();
    document.fonts.ready.then(measure);
    if(byId.has(requested))openDetail(requested);
    const requestedPerson=new URLSearchParams(location.hash.slice(1)).get('person');
    if(requestedPerson&&window.AtlasPeople.profiles.some(p=>p.id===requestedPerson)){const work=new URLSearchParams(location.hash.slice(1)).get('work');setMode('people');window.AtlasPeople.select(requestedPerson,true,false);if(work)openWorkDetail(requestedPerson,work);}
  }
  init();
})();
