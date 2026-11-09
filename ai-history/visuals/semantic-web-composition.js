/* A fixed, authored source join and condition trace; not a general Web agent. */
(function(){
  'use strict';
  const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const text=v=>typeof v==='string'&&v.trim().length>0;
  const compare=(a,b)=>a<b?-1:a>b?1:0;
  const owns=(o,k)=>Object.hasOwn(o,k);
  function id(v){if(!text(v)||v.length>80)throw new TypeError('A source or row id must be a nonempty string of up to80 characters.');return v;}
  function iri(v){if(typeof v!=='string'||!v.length||!/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(v)||/[\u0000-\u0020<>"{}|^`\\]/u.test(v))throw new TypeError('This view requires absolute, whitespace-free identifiers.');return v;}
  function minute(v,kind){const lower=kind==='end'?1:0,upper=kind==='end'?1440:1439;if(!Number.isInteger(v)||v<lower||v>upper)throw new TypeError('Times must be integer minutes within one day.');return v;}
  function sourceRows(source,kind,limit,key){
    if(!record(source)||!Array.isArray(source.rows)||source.rows.length>limit)throw new TypeError('Each source needs a bounded rows array.');id(source.id);
    const rowIds=new Set(),keys=new Set();
    for(const row of source.rows){
      if(!record(row))throw new TypeError('Source rows must be records.');id(row.id);iri(row[key]);
      if(rowIds.has(row.id)||keys.has(row[key]))throw new TypeError('Rows and join keys must be unique within each source.');rowIds.add(row.id);keys.add(row[key]);
      if(kind==='program'){
        for(const field of ['speaker','venue','topic'])if(owns(row,field))iri(row[field]);
        if(owns(row,'start'))minute(row.start,'start');if(owns(row,'end'))minute(row.end,'end');
        if(owns(row,'start')&&owns(row,'end')&&row.start>=row.end)throw new TypeError('A session needs a positive duration.');
      }else if(kind==='profiles'){
        if(owns(row,'language')&&!['ko','en'].includes(row.language))throw new TypeError('The announced language must be ko or en.');
      }else if(owns(row,'mode')&&!['online','onsite'].includes(row.mode))throw new TypeError('The announced participation mode must be online or onsite.');
    }
    return source.rows;
  }
  const evidence=(source,row,fields)=>({kind:'source',sourceId:source.id,rowId:row.id,fields:fields.slice()});
  function composePlan(options){
    if(!record(options)||!record(options.sources)||!record(options.request)||!Array.isArray(options.mappings)||options.mappings.length>32)throw new TypeError('Provide sources, explicit mappings and one request.');
    const s=options.sources,r=options.request;
    const program=sourceRows(s.program,'program',16,'session'),profiles=sourceRows(s.profiles,'profiles',32,'person'),venues=sourceRows(s.venues,'venues',32,'venue');
    if(new Set([s.program.id,s.profiles.id,s.venues.id]).size!==3)throw new TypeError('The three source ids must differ.');
    iri(r.topic);if(!['ko','en'].includes(r.language)||!['online','onsite','any'].includes(r.mode))throw new TypeError('The request needs a supported language and participation mode.');
    minute(r.earliestStart,'start');minute(r.latestEnd,'end');if(r.earliestStart>=r.latestEnd)throw new TypeError('The request window must have positive length.');
    const mappings=new Map(),mappingIds=new Set();
    for(const m of options.mappings){if(!record(m))throw new TypeError('Mappings must be records.');id(m.id);iri(m.from);iri(m.to);if(mappingIds.has(m.id)||mappings.has(m.from))throw new TypeError('Mappings need unique ids and source terms.');mappingIds.add(m.id);mappings.set(m.from,m);}
    const byPerson=new Map(profiles.map(p=>[p.person,p])),byVenue=new Map(venues.map(v=>[v.venue,v]));
    const candidates=program.slice().sort((a,b)=>compare(a.session,b.session)).map(p=>{
      const profile=owns(p,'speaker')?byPerson.get(p.speaker):undefined,venue=owns(p,'venue')?byVenue.get(p.venue):undefined;
      const resolved={topic:null,language:profile&&owns(profile,'language')?profile.language:null,start:owns(p,'start')?p.start:null,end:owns(p,'end')?p.end:null,mode:venue&&owns(venue,'mode')?venue.mode:null};
      const checks=[],add=(name,state,reason,items)=>checks.push({id:name,state,reason,evidence:items});
      if(!owns(p,'topic'))add('topic','unknown','topic-unrecorded',[evidence(s.program,p,['topic'])]);
      else if(p.topic===r.topic){resolved.topic=p.topic;add('topic','pass','topic-identity',[evidence(s.program,p,['topic'])]);}
      else if(mappings.has(p.topic)){const m=mappings.get(p.topic);resolved.topic=m.to;add('topic',m.to===r.topic?'pass':'fail',m.to===r.topic?'topic-mapped':'topic-other-concept',[evidence(s.program,p,['topic']),{kind:'mapping',mappingId:m.id}]);}
      else add('topic','unknown','topic-unmapped',[evidence(s.program,p,['topic'])]);
      if(!owns(p,'speaker'))add('language','unknown','speaker-unrecorded',[evidence(s.program,p,['speaker'])]);
      else if(!profile)add('language','unknown','profile-missing',[evidence(s.program,p,['speaker'])]);
      else if(!owns(profile,'language'))add('language','unknown','language-unrecorded',[evidence(s.program,p,['speaker']),evidence(s.profiles,profile,['person','language'])]);
      else add('language',profile.language===r.language?'pass':'fail',profile.language===r.language?'language-match':'language-different',[evidence(s.program,p,['speaker']),evidence(s.profiles,profile,['person','language'])]);
      const before=owns(p,'start')&&(p.start<r.earliestStart||p.start>=r.latestEnd),after=owns(p,'end')&&(p.end<=r.earliestStart||p.end>r.latestEnd);
      if(before||after)add('window','fail','time-outside-window',[evidence(s.program,p,['start','end'])]);
      else if(!owns(p,'start')||!owns(p,'end'))add('window','unknown','time-unrecorded',[evidence(s.program,p,['start','end'])]);
      else add('window','pass','time-in-window',[evidence(s.program,p,['start','end'])]);
      if(r.mode==='any')add('mode','pass','mode-not-required',[]);
      else if(!owns(p,'venue'))add('mode','unknown','venue-unrecorded',[evidence(s.program,p,['venue'])]);
      else if(!venue)add('mode','unknown','venue-missing',[evidence(s.program,p,['venue'])]);
      else if(!owns(venue,'mode'))add('mode','unknown','mode-unrecorded',[evidence(s.program,p,['venue']),evidence(s.venues,venue,['venue','mode'])]);
      else add('mode',venue.mode===r.mode?'pass':'fail',venue.mode===r.mode?'mode-match':'mode-different',[evidence(s.program,p,['venue']),evidence(s.venues,venue,['venue','mode'])]);
      const status=checks.some(c=>c.state==='fail')?'rejected':checks.some(c=>c.state==='unknown')?'unknown':'accepted';
      return{sessionId:p.session,programRowId:p.id,speakerId:owns(p,'speaker')?p.speaker:null,venueId:owns(p,'venue')?p.venue:null,status,resolved,joins:{program:{sourceId:s.program.id,rowId:p.id},profile:profile?{sourceId:s.profiles.id,rowId:profile.id}:null,venue:venue?{sourceId:s.venues.id,rowId:venue.id}:null},checks};
    });
    return{request:{topic:r.topic,language:r.language,earliestStart:r.earliestStart,latestEnd:r.latestEnd,mode:r.mode},sourceCounts:[['program',program],['profiles',profiles],['venues',venues]].map(([kind,rows])=>({kind,id:s[kind].id,rows:rows.length})),mappingCount:options.mappings.length,candidates,counts:{accepted:candidates.filter(c=>c.status==='accepted').length,rejected:candidates.filter(c=>c.status==='rejected').length,unknown:candidates.filter(c=>c.status==='unknown').length}};
  }
  window.AtlasSemanticWebModel=Object.freeze({composePlan});

  const el=(tag,cls,value)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=value;return e;};
  const sourced=s=>s&&text(s.title)&&text(s.url);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const time=value=>value===null||value===undefined?'미기록':String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0');
  const statuses={accepted:'조건 충족',rejected:'조건 불충족',unknown:'정보 부족'},states={pass:'충족',fail:'불일치',unknown:'확인 필요'},names={topic:'주제',language:'발표 언어',window:'참여 시간',mode:'참여 방식'};
  const language=v=>v==='ko'?'한국어':v==='en'?'영어':'미기록',mode=v=>v==='online'?'온라인':v==='onsite'?'현장':v==='any'?'방식 제한 없음':'미기록';
  const reasons={
    'topic-unrecorded':'행사 공지에 분류가 적혀 있지 않습니다.','topic-identity':'공지와 요청이 같은 개념 식별자를 가리킵니다.','topic-mapped':'사람이 명시한 대응을 통해 요청의 공통 분류에 연결됩니다.','topic-other-concept':'이 보기의 분류표에서 요청한 코드와 대응된 코드가 다릅니다.','topic-unmapped':'공지의 분류를 요청의 개념과 연결하는 대응이 없습니다.',
    'speaker-unrecorded':'행사에 발표자 식별자가 적혀 있지 않습니다.','profile-missing':'같은 발표자 식별자로 연결되는 공지 프로필 자료가 없습니다.','language-unrecorded':'연결한 프로필에 이번 발표의 언어가 적혀 있지 않습니다.','language-match':'이번 발표에 공지된 언어가 요청과 같습니다.','language-different':'이번 발표에 공지된 언어가 요청과 다릅니다.',
    'time-outside-window':'알려진 시간이 요청한 참여 범위에서 벗어납니다.','time-unrecorded':'요청한 범위 안에 드는지 확인할 시간 정보가 부족합니다.','time-in-window':'공지된 시작과 종료가 모두 요청한 범위 안에 있습니다.',
    'mode-not-required':'참여 방식에 조건을 두지 않아 이 항목은 제한하지 않습니다.','venue-unrecorded':'행사에 장소 식별자가 적혀 있지 않습니다.','venue-missing':'같은 장소 식별자로 연결되는 안내 자료가 없습니다.','mode-unrecorded':'장소 안내에 온라인인지 현장인지 적혀 있지 않습니다.','mode-match':'장소 안내의 참여 방식이 요청과 같습니다.','mode-different':'장소 안내의 참여 방식이 요청과 다릅니다.'
  };
  function validate(config){
    if(!config||!Array.isArray(config.stages)||config.stages.length!==3||!['connect','interpret','compose'].every(id=>config.stages.some(s=>s.id===id&&text(s.label)&&text(s.text))))throw new TypeError('The Semantic Web view needs three dated stages.');
    if(!Array.isArray(config.terms)||!config.terms.length||new Set(config.terms.map(t=>t.id)).size!==config.terms.length||!config.terms.every(t=>iri(t.id)&&text(t.label)))throw new TypeError('Named entities need unique display metadata.');
    for(const kind of ['program','profiles','venues'])if(!text(config.sources?.[kind]?.label))throw new TypeError('Each source needs a display label.');
    composePlan({sources:config.sources,mappings:config.mappings,request:config.initialRequest});
    if(!record(config.requestOptions))throw new TypeError('Request options are required.');
    for(const key of ['topics','languages','latestEnds','modes'])if(!Array.isArray(config.requestOptions[key])||!config.requestOptions[key].length||new Set(config.requestOptions[key].map(o=>o.value)).size!==config.requestOptions[key].length||!config.requestOptions[key].every(o=>o&&text(o.label)))throw new TypeError('Request options need unique values and labels.');
    const targets={topics:'topic',languages:'language',latestEnds:'latestEnd',modes:'mode'};
    for(const [key,field] of Object.entries(targets)){
      if(!config.requestOptions[key].some(o=>o.value===config.initialRequest[field]))throw new TypeError('Initial request values must be selectable.');
      for(const o of config.requestOptions[key])composePlan({sources:config.sources,mappings:config.mappings,request:{...config.initialRequest,[field]:o.value}});
    }
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>text(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|gif|jpe?g)$/u.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original article evidence needs files and sources.');
    if(!text(config.scope)||!sourced(config.source))throw new TypeError('The view needs its source and scope.');
  }
  function sourceLink(item){const a=el('a','semweb-source',item.title+' ↗');a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';return a;}
  window.AtlasVisuals.register('semantic-web-composition',{
    mount(host,config){
      validate(config);const listeners=[],root=el('div','semantic-web-composition'),labels=new Map(config.terms.map(t=>[t.id,t.label]));
      const pretty=v=>v===null||v===undefined?'미기록':labels.get(v)||v.split(/[/#]/u).at(-1)||v;
      const listen=(target,event,fn)=>{target.addEventListener(event,fn);listeners.push(()=>target.removeEventListener(event,fn));};
      const group=(label,cls)=>{const n=el('div',cls||'semweb-controls');n.setAttribute('role','group');n.setAttribute('aria-label',label);return n;};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const mark=(buttons,key,value)=>{for(const b of buttons){const yes=b.dataset[key]===String(value);b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));}};
      const disclosure=(title,content)=>{const d=el('details','semweb-details');d.append(el('summary','',title),content);return d;};
      let stage='connect',mappingsEnabled=true,request={...config.initialRequest},selectedId=null,checkId='topic',model,disposed=false,evidenceId=config.evidence[0].id,expanded=false;
      const enabled=new Set(['program','profiles','venues']),stageButtons=[],candidateButtons=new Map(),checkButtons=[],requestSelects=new Map(),sourceInputs=new Map(),sourceCards=new Map();
      const nav=group('웹의 정보에서 조건을 만족하는 조합까지','semweb-stage-controls'),stageText=el('p','semweb-stage-text');
      const connect=el('section','semweb-panel'),sourceGrid=el('div','semweb-sources-grid');
      connect.append(el('h4','','서로 다른 페이지의 정보를, 연결할 수 있는 기록으로'),el('p','semweb-prose','행사 안내에는 시간과 발표자가, 발표자 페이지에는 이번 발표의 언어가, 장소 안내에는 참여 방식이 적혀 있습니다. 어떤 자료를 함께 읽을지 선택해 보세요.'),sourceGrid);
      const sourceDetails=el('div','semweb-source-details');
      for(const kind of ['program','profiles','venues']){
        const source=config.sources[kind],card=el('section','semweb-source-card'),label=el('label','semweb-source-toggle'),input=el('input'),head=el('span');input.type='checkbox';input.checked=true;input.dataset.source=kind;head.append(el('strong','',source.label),el('span','',source.description||'직접 작성한 이 보기의 공지 자료'));label.append(input,head);card.append(label);sourceInputs.set(kind,input);sourceCards.set(kind,card);
        const rows=el('ul','semweb-source-rows');
        for(const row of source.rows){const li=el('li');if(kind==='program')li.append(el('strong','',pretty(row.session)),el('span','',pretty(row.speaker)+' · '+time(row.start)+'–'+time(row.end)),el('span','',pretty(row.topic)+' / '+pretty(row.venue)));else if(kind==='profiles')li.append(el('strong','',pretty(row.person)),el('span','','공지된 발표 언어 · '+language(row.language)));else li.append(el('strong','',pretty(row.venue)),el('span','','참여 방식 · '+mode(row.mode)));rows.append(li);}
        card.append(rows);sourceGrid.append(card);
        const raw=el('pre','semweb-code',JSON.stringify({sourceId:source.id,rows:source.rows},null,2));sourceDetails.append(el('h5','',source.label),raw);
        listen(input,'change',()=>{input.checked?enabled.add(kind):enabled.delete(kind);recompute();});
      }
      connect.append(el('p','semweb-keypoint','화면의 이름을 비교해 붙이지 않습니다. 행사에서 가리킨 발표자·장소 식별자를 각 출처의 같은 식별자와 연결합니다.'),disclosure('각 페이지의 식별자와 기록 더 보기',sourceDetails));
      const interpret=el('section','semweb-panel'),mappingLabel=el('label','semweb-mapping-toggle'),mappingCheck=el('input'),mappingWords=el('span'),mappingRows=el('div','semweb-mappings');mappingCheck.type='checkbox';mappingCheck.checked=true;mappingCheck.dataset.mapping='enabled';mappingWords.append(el('strong','','분류 이름의 대응을 명시하기'),el('span','','대응을 끄면 다른 이름이 같은 뜻이라고 저절로 판단하지 않습니다.'));mappingLabel.append(mappingCheck,mappingWords);
      interpret.append(el('h4','','표기가 다른 개념은, 어떤 관계인지 먼저 명시하다'),el('p','semweb-prose','분류 코드가 다르면 글자의 생김새만으로 뜻을 맞추기 어렵습니다. 이 보기에서는 사람이 정한 대응으로 공지의 분류를 요청의 공통 개념에 연결합니다.'),mappingLabel,mappingRows);
      for(const m of config.mappings){const line=el('div','semweb-mapping-row');line.append(el('div','',pretty(m.from)),el('span','semweb-map-arrow','→'),el('div','',pretty(m.to)));if(m.note)line.append(el('p','',m.note));mappingRows.append(line);}
      const mappingState=el('p','semweb-keypoint'),mappingImpact=el('p','semweb-note');interpret.append(mappingState,mappingImpact,el('p','semweb-note','이 대응은 예시를 위해 사람이 작성했습니다. 온톨로지를 자동 발견하거나 임의의 단어 뜻을 추측하는 기능은 아닙니다.'));
      listen(mappingCheck,'change',()=>{mappingsEnabled=mappingCheck.checked;recompute();});
      const compose=el('section','semweb-panel'),requestGrid=el('div','semweb-request-grid'),requestWindow=el('p','semweb-note'),summary=el('div','semweb-summary'),candidateGrid=group('조건과 근거를 살펴볼 행사 선택','semweb-candidates'),empty=el('p','semweb-empty','행사 시간표가 없어 후보를 구성할 자료가 없습니다. 이것은 행사가 없다는 뜻이 아닙니다.'),result=el('div','semweb-result'),resultHeading=el('h5'),resultStatus=el('strong','semweb-result-status'),join=el('div','semweb-join'),checks=group('각 조건을 판단한 근거 선택','semweb-checks'),proof=el('section','semweb-proof');
      compose.append(el('h4','','내 조건과 여러 출처의 기록을 함께 읽다'),el('p','semweb-prose','요청을 바꾸고 각 후보가 왜 남거나 제외되는지 살펴보세요. 공지가 빠진 항목은 조건이 틀렸다는 판단과 구분해 표시합니다.'),requestGrid,requestWindow,summary,candidateGrid,empty,result);result.append(resultHeading,resultStatus,join,checks,proof);
      for(const [key,field,title] of [['topics','topic','주제'],['languages','language','발표 언어'],['latestEnds','latestEnd','종료 시각까지'],['modes','mode','참여 방식']]){
        const label=el('label','semweb-request'),select=el('select');select.dataset.request=field;for(const option of config.requestOptions[key]){const o=el('option','',option.label);o.value=String(option.value);select.append(o);}select.value=String(request[field]);label.append(el('span','',title),select);requestGrid.append(label);requestSelects.set(field,select);listen(select,'change',()=>{request[field]=field==='latestEnd'?Number(select.value):select.value;recompute();});
      }
      const countNodes={};for(const status of ['accepted','rejected','unknown']){const n=el('span');n.dataset.status=status;const count=el('strong');n.append(count,el('span','',statuses[status]));summary.append(n);countNodes[status]=count;}
      for(const row of config.sources.program.rows){const b=button('',candidateGrid,()=>{selectedId=row.session;renderSelected();});b.dataset.session=row.session;const badge=el('span','semweb-status'),name=el('strong','',pretty(row.session)),meta=el('span','semweb-candidate-meta');b.append(badge,name,meta);candidateButtons.set(row.session,{button:b,badge,meta});}
      for(const key of ['topic','language','window','mode']){const b=button('',checks,()=>{checkId=key;renderSelected();});b.dataset.check=key;const title=el('strong','',names[key]),state=el('span');b.append(title,state);checkButtons.push(b);}
      const evidence=el('details','semweb-details semweb-evidence'),evidenceControls=group('2001년 원문 그림 선택'),evidenceTitle=el('h4'),evidenceCaption=el('p','semweb-prose'),zoom=el('button','semweb-zoom','원문 그림 확대'),pane=el('div','semweb-evidence-viewport'),image=el('img'),evidenceScope=el('p','semweb-scope'),evidenceSource=el('div'),credit=el('p','semweb-credit');zoom.type='button';image.loading='lazy';image.decoding='async';pane.append(image);evidence.append(el('summary','','2001년 원문 그림과 연결하기'),evidenceControls,evidenceTitle,evidenceCaption,zoom,el('p','semweb-note','확대하면 그림 영역 안에서 가로·세로로 움직여 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,credit);
      const evidenceButtons=[];for(const item of config.evidence){const b=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;renderEvidence();});b.dataset.evidence=item.id;evidenceButtons.push(b);}listen(zoom,'click',()=>{expanded=!expanded;renderEvidence();});
      for(const item of config.stages){const b=button(item.label,nav,()=>{stage=item.id;renderStage();});b.dataset.stage=item.id;stageButtons.push(b);}
      function renderStage(){root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;connect.hidden=stage!=='connect';interpret.hidden=stage!=='interpret';compose.hidden=stage!=='compose';}
      function recompute(){
        const sources={};for(const kind of ['program','profiles','venues']){sources[kind]={...config.sources[kind],rows:enabled.has(kind)?config.sources[kind].rows:[]};sourceCards.get(kind).dataset.enabled=String(enabled.has(kind));sourceInputs.get(kind).checked=enabled.has(kind);}
        model=composePlan({sources,mappings:mappingsEnabled?config.mappings:[],request});if(!model.candidates.some(c=>c.sessionId===selectedId))selectedId=(model.candidates.find(c=>c.status==='accepted')||model.candidates[0])?.sessionId||null;
        root.dataset.enabledSources=[...enabled].sort(compare).join(',');root.dataset.mappingsEnabled=String(mappingsEnabled);mappingRows.dataset.enabled=String(mappingsEnabled);
        mappingState.textContent=mappingsEnabled?'명시한 대응을 사용해 다른 표기를 공통 분류에 연결합니다.':'대응이 없는 항목은 같은 뜻인지 결정하지 않고 정보가 부족한 상태로 남깁니다.';
        mappingImpact.textContent='현재 요청에서 조건 충족 '+model.counts.accepted+'개 · 정보 부족 '+model.counts.unknown+'개입니다. 다음 보기에서 각 후보의 근거를 확인할 수 있습니다.';
        requestWindow.textContent='참여 가능한 시간 · '+time(request.earliestStart)+'–'+time(request.latestEnd)+' · 이 보기의 시각은 같은 날, 같은 시간대를 기준으로 비교합니다.';
        for(const status of ['accepted','rejected','unknown']){countNodes[status].textContent=String(model.counts[status]);root.dataset[status+'Count']=String(model.counts[status]);}
        for(const [session,item] of candidateButtons){const c=model.candidates.find(c=>c.sessionId===session);item.button.hidden=!c;if(c){item.button.dataset.status=c.status;item.badge.textContent=statuses[c.status];item.meta.textContent=time(c.resolved.start)+'–'+time(c.resolved.end)+' · '+pretty(c.speakerId);}}
        empty.hidden=model.candidates.length!==0;renderSelected();
      }
      function joinCard(kind,reference,title,subtitle,highlight){const n=el('section','semweb-join-card');n.dataset.highlight=String(highlight);n.append(el('span','semweb-eyebrow',title),el('strong','',subtitle));if(reference){const source=Object.values(config.sources).find(s=>s.id===reference.sourceId);n.append(el('span','semweb-row-ref',(source?.label||reference.sourceId)+' · '+reference.rowId));}else n.append(el('span','semweb-row-ref','연결할 공지 자료 없음'));return n;}
      function renderSelected(){
        const c=model.candidates.find(c=>c.sessionId===selectedId);result.hidden=!c;root.dataset.selectedSession=selectedId||'';
        for(const [session,item] of candidateButtons){const yes=session===selectedId;item.button.classList.toggle('active',yes);item.button.setAttribute('aria-pressed',String(yes));}
        if(!c){root.dataset.status='empty';return;}root.dataset.status=c.status;root.dataset.check=checkId;resultHeading.textContent=pretty(c.sessionId);resultStatus.textContent=statuses[c.status];resultStatus.dataset.status=c.status;
        const current=c.checks.find(check=>check.id===checkId),sourceIds=new Set(current.evidence.filter(e=>e.kind==='source').map(e=>e.sourceId));
        const profileBranch=el('div','semweb-join-branch'),venueBranch=el('div','semweb-join-branch');profileBranch.append(el('span','semweb-join-arrow','행사 → 발표자 식별자 ↓'),joinCard('profiles',c.joins.profile,'발표자 프로필',pretty(c.speakerId)+' · '+language(c.resolved.language),sourceIds.has(config.sources.profiles.id)));venueBranch.append(el('span','semweb-join-arrow','행사 → 장소 식별자 ↓'),joinCard('venues',c.joins.venue,'장소 안내',pretty(c.venueId)+' · '+mode(c.resolved.mode),sourceIds.has(config.sources.venues.id)));
        join.replaceChildren(joinCard('program',c.joins.program,'행사 안내',time(c.resolved.start)+'–'+time(c.resolved.end),sourceIds.has(config.sources.program.id)),profileBranch,venueBranch);
        for(const b of checkButtons){const check=c.checks.find(x=>x.id===b.dataset.check);b.dataset.state=check.state;b.querySelector('span').textContent=states[check.state];}mark(checkButtons,'check',checkId);
        proof.replaceChildren(el('h5','',names[checkId]+' · '+states[current.state]),el('p','',reasons[current.reason]||current.reason));
        const items=el('ul','semweb-proof-evidence');
        for(const ev of current.evidence){const li=el('li');if(ev.kind==='mapping'){const m=config.mappings.find(m=>m.id===ev.mappingId);li.append(el('strong','','사람이 명시한 분류 대응'),el('span','',pretty(m.from)+' → '+pretty(m.to)),el('span','semweb-row-ref',m.id));}else{const source=Object.values(config.sources).find(s=>s.id===ev.sourceId),row=source.rows.find(r=>r.id===ev.rowId);li.append(el('strong','',source.label+' · '+ev.rowId));for(const field of ev.fields){const value=owns(row,field)?row[field]:null,formatted=field==='start'||field==='end'?time(value):field==='language'?language(value):field==='mode'?mode(value):pretty(value);li.append(el('span','',({topic:'분류',speaker:'발표자',person:'발표자 식별자',venue:'장소',language:'발표 언어',start:'시작',end:'종료',mode:'참여 방식'}[field]||field)+' · '+formatted));}}items.append(li);}
        if(!current.evidence.length)items.append(el('li','','이 요청에는 참여 방식 조건이 없습니다.'));proof.append(items);
      }
      function renderEvidence(){const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;pane.dataset.expanded=String(expanded);if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 Semantic Web 원문 그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));pane.scrollLeft=0;pane.scrollTop=0;evidenceSource.replaceChildren(sourceLink(item.source));credit.replaceChildren(sourceLink(item.credit));if(item.credit.note)credit.append(document.createTextNode(' · '+item.credit.note));}
      const scope=el('div');scope.append(el('p','semweb-scope',config.scope),sourceLink(config.source));
      root.append(nav,stageText,connect,interpret,compose,evidence,disclosure('이 보기의 전제와 원문 구분',scope));host.append(root);recompute();renderStage();renderEvidence();
      return()=>{if(disposed)return;disposed=true;for(const off of listeners)off();root.remove();};
    }
  });
})();
