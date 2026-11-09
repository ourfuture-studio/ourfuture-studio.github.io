/* Function-free positive definite clauses. Leftmost depth-first interpreter, with explicit cutoffs. */
(function(){
  'use strict';
  const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),clone=x=>JSON.parse(JSON.stringify(x));
  const only=(x,keys)=>object(x)&&Reflect.ownKeys(x).every(k=>typeof k==='string'&&keys.includes(k));
  const variable=x=>typeof x==='string'&&/^[A-Z][A-Za-z0-9_]{0,23}$/.test(x);
  const constant=x=>typeof x==='string'&&/^[a-z][a-z0-9_]{0,23}$/.test(x);
  const symbol=x=>typeof x==='string'&&/^[a-z][a-z0-9_-]{0,31}$/.test(x);
  const integer=(x,a,b)=>Number.isInteger(x)&&x>=a&&x<=b;
  const atom=x=>only(x,['predicate','args'])&&constant(x.predicate)&&Array.isArray(x.args)&&x.args.length<=3&&Array.from(x.args).every(t=>constant(t)||variable(t));
  const list=(x,n)=>Array.isArray(x)&&x.length<=n&&Array.from(x).every(atom);
  const variables=atoms=>[...new Set(atoms.flatMap(a=>a.args.filter(variable)))];
  const termLabel=t=>t.startsWith('@')?t.replace(/^@(\d+)_(.+)$/,'$2_$1'):t;
  const format=a=>a.predicate+(a.args.length?'('+a.args.map(termLabel).join(', ')+')':'');
  function validate(options){
    if(!only(options,['program','query','maxDepth','maxSteps','maxAnswers'])||!Array.isArray(options.program)||options.program.length>24||!list(options.query,4)||!integer(options.maxDepth,0,16)||!integer(options.maxSteps,1,5000)||!integer(options.maxAnswers,1,32))throw new TypeError('A bounded definite-clause program and explicit search limits are required.');
    const ids=new Set(),arities=new Map();
    for(const c of options.program){
      if(!only(c,['id','head','body'])||!symbol(c.id)||ids.has(c.id)||!atom(c.head)||!list(c.body,4))throw new TypeError('Clauses require unique ids, a head and a positive body.');
      ids.add(c.id);const bodyVars=new Set(variables(c.body));
      if(variables([c.head]).some(v=>!bodyVars.has(v)))throw new TypeError('Head variables must occur in the body; facts are ground.');
    }
    for(const a of [...options.query,...options.program.flatMap(c=>[c.head,...c.body])]){if(arities.has(a.predicate)&&arities.get(a.predicate)!==a.args.length)throw new TypeError('A predicate has one fixed arity.');arities.set(a.predicate,a.args.length);}
  }
  function run(options){
    validate(options);const queryVars=variables(options.query),nodes=[],trace=[],answers=[],seen=new Set();let serial=0,steps=0,stopped=false,reason=null;
    const isVar=t=>variable(t)||typeof t==='string'&&t.startsWith('@');
    const deref=(t,env)=>{let k=0;while(isVar(t)&&Object.prototype.hasOwnProperty.call(env,t)){t=env[t];if(++k>256)throw new Error('Invalid substitution cycle.');}return t;};
    const apply=(a,env)=>({predicate:a.predicate,args:a.args.map(t=>deref(t,env))});
    const bind=(a,b,env)=>{if(a.predicate!==b.predicate||a.args.length!==b.args.length)return null;const next={...env};for(let i=0;i<a.args.length;i++){const l=deref(a.args[i],next),r=deref(b.args[i],next);if(l===r)continue;if(isVar(l))next[l]=r;else if(isVar(r))next[r]=l;else return null;}return next;};
    const answerOf=env=>Object.fromEntries(queryVars.map(v=>{const t=deref(v,env);return[v,isVar(t)?null:t];}));
    const stop=(kind,n)=>{stopped=true;reason=kind;n.status='limited';trace.push({kind:'limit',node:n.id,reason:kind});};
    function visit(goals,env,depth,parent,via,delta){
      const n={id:'n'+nodes.length,parent,via,depth,goals:goals.map(a=>apply(a,env)),bindings:answerOf(env),substitution:delta||{},status:'call'};nodes.push(n);trace.push({kind:'call',node:n.id});
      if(!goals.length){n.status='answer';const key=JSON.stringify(n.bindings);n.duplicate=seen.has(key);if(!n.duplicate){seen.add(key);answers.push({bindings:clone(n.bindings),node:n.id});}trace.push({kind:'answer',node:n.id,duplicate:n.duplicate});if(answers.length>=options.maxAnswers)stop('answers',n);return;}
      if(depth>=options.maxDepth){stop('depth',n);return;}
      let matched=false;const selected=apply(goals[0],env);
      for(const c of options.program){
        if(stopped)return;if(c.head.predicate!==selected.predicate)continue;
        if(steps>=options.maxSteps){stop('steps',n);return;}steps++;
        const renames=new Map(),fresh=t=>variable(t)?(renames.has(t)?renames.get(t):(renames.set(t,'@'+serial+'_'+t),renames.get(t))):t;
        serial++;const head={predicate:c.head.predicate,args:c.head.args.map(fresh)},body=c.body.map(a=>({predicate:a.predicate,args:a.args.map(fresh)}));
        const next=bind(selected,head,env);
        if(!next){trace.push({kind:'reject',node:n.id,clause:c.id});continue;}
        matched=true;const substitution=Object.fromEntries([...renames].map(([v,t])=>[v,deref(t,next)]));
        trace.push({kind:'match',node:n.id,clause:c.id,substitution});
        visit([...body,...goals.slice(1)],next,depth+1,n.id,c.id,substitution);
        if(!stopped)trace.push({kind:'backtrack',node:n.id,clause:c.id});
      }
      if(!matched){n.status='failure';trace.push({kind:'failure',node:n.id});}else n.status='expanded';
    }
    visit(clone(options.query),{},0,null,null,{});
    return{status:stopped?'limited':'complete',reason,answers,nodes,trace,steps,queryVariables:queryVars,answerCount:answers.length};
  }
  window.AtlasPrologModel=Object.freeze({run});
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const svg=(tag,attrs,text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs||{}))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n;};
  window.AtlasVisuals.register('prolog-relations',{
    mount(host,config){
      if(!object(config)||!Array.isArray(config.stages)||config.stages.length!==3||!Array.isArray(config.facts)||!Array.isArray(config.rules)||!Array.isArray(config.queries)||!config.originalImage||!config.scope||!config.source)throw new TypeError('Prolog relation content and sources are required.');
      const root=el('div','prolog-relations'),off=[],dynamic=[],state={stage:'facts',query:config.queries[0].id,cycle:false,recursiveFirst:false,depth:config.limits.maxDepth},buttons=[];let result,cursor=0,disposed=false;
      const listen=(n,type,fn,temporary=false)=>{n.addEventListener(type,fn);(temporary?dynamic:off).push(()=>n.removeEventListener(type,fn));};
      const button=(label,parent,fn,temp=false)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn,temp);parent.append(b);return b;};
      const source=s=>{const a=el('a','plg-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const pane=(drawing,label)=>{const n=el('div','plg-svg-viewport');n.tabIndex=0;n.setAttribute('role','group');n.setAttribute('aria-label',label);const nativeWidth=Number(drawing.getAttribute('viewBox')?.trim().split(/[\s,]+/)[2]);if(Number.isFinite(nativeWidth)&&nativeWidth>0)drawing.style.minWidth=nativeWidth+'px';n.append(drawing);return n;};
      const details=(label,content)=>{const n=el('details');n.append(el('summary','',label),content);return n;};
      const nav=el('div','plg-nav');nav.setAttribute('role','group');nav.setAttribute('aria-label','Prolog의 관계와 질문을 읽는 단계');
      for(const s of config.stages){const b=button(s.label,nav,()=>{state.stage=s.id;renderStage();});b.dataset.stage=s.id;buttons.push(b);}
      const intro=el('p','plg-prose'),controls=el('section','plg-controls'),query=el('select');query.dataset.control='query';query.setAttribute('aria-label','관계에 던질 질문');
      for(const q of config.queries){const o=el('option','',q.label);o.value=q.id;query.append(o);}query.value=state.query;controls.append(el('label','','질문 '),query);listen(query,'change',()=>{state.query=query.value;recompute();});
      const depth=el('select');depth.dataset.control='depth';depth.setAttribute('aria-label','최대 절 적용 깊이');for(const n of [4,8,12,16]){const o=el('option','',n+'단계');o.value=String(n);depth.append(o);}depth.value=String(state.depth);controls.append(el('label','','탐색 깊이 '),depth);listen(depth,'change',()=>{state.depth=Number(depth.value);recompute();});
      for(const[key,label]of[['cycle','광주 → 서울 연결 추가'],['recursiveFirst','재귀 규칙을 먼저 시도']]){const l=el('label','plg-check'),i=el('input');i.type='checkbox';i.dataset.setup=key;l.append(i,el('span','',label));controls.append(l);listen(i,'change',()=>{state[key]=i.checked;recompute();});}
      const factsPanel=el('section','plg-panel'),map=el('div'),factsList=el('div');factsPanel.append(el('h4','','지식을 관계로 적으면, 질문의 빈칸을 찾을 수 있다'),el('p','plg-prose','아래 도시는 실제 운항·교통 정보와 관계없는 직접 작성한 연결 자료입니다. 화살표는 한 방향의 direct 관계를 나타냅니다.'),map,factsList);
      const rulesPanel=el('section','plg-panel'),rulesBody=el('div');rulesPanel.append(el('h4','','도달 관계를 외우는 대신, 관계를 만드는 규칙을 적다'),el('p','plg-prose','“바로 연결되면 도달할 수 있다”, “한 곳으로 바로 간 뒤 그곳에서 도달할 수 있으면 도달할 수 있다”를 절로 적습니다. X·Y·Z는 규칙을 쓸 때마다 새로 쓰는 변수입니다.'),rulesBody);
      const searchPanel=el('section','plg-panel'),status=el('p','plg-status'),answers=el('div','plg-answers'),traceControls=el('div','plg-trace-controls'),tree=el('div'),traceList=el('ol','plg-trace'),current=el('div');
      button('이전 기록',traceControls,()=>{cursor=Math.max(0,cursor-1);renderCursor();}).dataset.control='previous';button('다음 기록',traceControls,()=>{cursor=Math.min(result.trace.length-1,cursor+1);renderCursor();}).dataset.control='next';
      const inspect=el('select');inspect.dataset.control='inspect';inspect.setAttribute('aria-label','실행 기록 선택');traceControls.append(inspect);listen(inspect,'change',()=>{cursor=Number(inspect.value);renderCursor();});
      searchPanel.append(el('h4','','질문을 작은 질문으로 바꾸고, 다른 답으로 돌아가다'),el('p','plg-prose','가장 왼쪽 질문을 선택하고, 위에서부터 절을 시도하는 깊이 우선 실행입니다. 한 답을 찾은 뒤에도 이전 선택으로 돌아가 다른 답을 찾습니다. 깊이 제한에 닿으면 이후 대안을 실행하지 않고 멈춥니다.'),status,answers,tree,traceControls,current,details('절 선택과 되돌아가기 기록',traceList));
      const original=el('section','plg-original');original.append(el('h5','',config.originalImage.title));const image=el('img');window.AtlasPublicAssets.setSource(image,config.originalImage.src);image.alt=config.originalImage.alt;const ip=el('div','plg-image-viewport');ip.tabIndex=0;ip.setAttribute('role','group');ip.setAttribute('aria-label','원문의 계산 나무, 확대 후 좌우 이동');ip.append(image);const zoom=button('원문 크게 보기',original,()=>{const on=!ip.classList.contains('expanded');ip.classList.toggle('expanded',on);zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'원문 크기 되돌리기':'원문 크게 보기';});zoom.setAttribute('aria-pressed','false');original.append(ip,el('p','plg-prose',config.originalImage.caption),el('p','plg-note',config.originalImage.credit),source(config.originalImage.source));
      const evidence=el('div');for(const e of config.evidence){const b=el('section','plg-evidence');b.append(el('h5','',e.title),el('pre','',e.formula),el('p','plg-prose',e.caption),source(e.source));evidence.append(b);}evidence.append(original);
      const scope=el('div');scope.append(el('p','plg-note',config.scope),source(config.source));
      function program(){const f=config.facts.filter(f=>!f.optional||state[f.optional]).map(f=>f.clause),rules=state.recursiveFirst?[...config.rules].reverse():config.rules;return[...f,...rules.map(r=>r.clause)];}
      function recompute(){for(const remove of dynamic.splice(0))remove();result=run({program:program(),query:config.queries.find(q=>q.id===state.query).query,maxDepth:state.depth,maxSteps:config.limits.maxSteps,maxAnswers:config.limits.maxAnswers});cursor=0;root.dataset.status=result.status;root.dataset.reason=result.reason||'';root.dataset.answers=String(result.answers.length);root.dataset.cycle=String(state.cycle);root.dataset.recursiveFirst=String(state.recursiveFirst);renderFacts();renderRules();renderSearch();renderStage();}
      function renderFacts(){const positions={seoul:[110,60],busan:[480,60],daejeon:[110,225],gwangju:[480,225]},names=Object.fromEntries(config.cities.map(c=>[c.id,c.label])),d=svg('svg',{viewBox:'0 0 650 300',role:'img','aria-label':'직접 작성한 네 도시의 direct 관계'});
        for(const f of config.facts.filter(f=>!f.optional||state[f.optional])){const[a,b]=f.clause.head.args,p=positions[a],q=positions[b],dx=q[0]-p[0],dy=q[1]-p[1],len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,x=q[0]-45*ux,y=q[1]-32*uy;d.append(svg('path',{d:'M'+(p[0]+45*ux)+' '+(p[1]+32*uy)+' L'+x+' '+y,class:'plg-edge'}),svg('path',{d:'M'+(x-10*ux+5*uy)+' '+(y-10*uy-5*ux)+' L'+x+' '+y+' L'+(x-10*ux-5*uy)+' '+(y-10*uy+5*ux),class:'plg-edge'}));}
        for(const c of config.cities){const[x,y]=positions[c.id];d.append(svg('rect',{x:x-47,y:y-26,width:94,height:52,rx:15,class:'plg-city'}),svg('text',{x,y:y+4,'text-anchor':'middle',class:'plg-city-name'},c.label));}map.replaceChildren(pane(d,'도시 연결 관계를 좌우로 이동'),el('p','plg-note','화살표는 direct(출발지, 도착지) 한 사실입니다. 연결을 하나 추가하면 가능한 답과 탐색 경로가 달라집니다.'));factsList.replaceChildren();for(const f of config.facts.filter(f=>!f.optional||state[f.optional]))factsList.append(el('code','plg-fact',format(f.clause.head)+'.'));}
      function renderRules(){rulesBody.replaceChildren();const rules=state.recursiveFirst?[...config.rules].reverse():config.rules;for(const r of rules){const b=el('section','plg-rule');b.append(el('h5','',r.label),el('pre','',format(r.clause.head)+' :-\n  '+r.clause.body.map(format).join(',\n  ')+'.'),el('p','plg-prose',r.explanation));rulesBody.append(b);}rulesBody.append(el('p','plg-note','왼쪽은 결론, 오른쪽은 함께 만족할 조건입니다. 이 화면의 실행은 위에 있는 규칙을 먼저 시도합니다. 변수는 같은 규칙 안에서 같은 대상을 가리키며, 다른 호출에서는 새로 구분됩니다.'));}
      function renderSearch(){status.textContent=result.status==='limited'?'정한 '+({depth:'깊이',steps:'절 시도 횟수',answers:'답 개수'}[result.reason])+' 제한에 닿아 멈췄습니다. 찾은 답 뒤에 다른 답이 있는지는 판단하지 않았습니다.':result.answers.length?'정한 절들의 모든 실행 대안을 마쳤습니다. 서로 다른 답 '+result.answers.length+'개를 찾았습니다.':'정한 절들의 모든 실행 대안을 마쳤지만 답을 찾지 못했습니다. 이 자료에서의 유한 실패입니다.';answers.replaceChildren();for(const a of result.answers){const label=Object.entries(a.bindings).length?Object.entries(a.bindings).map(([k,v])=>k+' = '+(v||'미정')).join(', '):'질문이 성립';const b=button(label,answers,()=>{cursor=result.trace.findIndex(t=>t.kind==='answer'&&t.node===a.node);renderCursor();},true);b.dataset.answer=a.node;}inspect.replaceChildren();traceList.replaceChildren();result.trace.forEach((t,i)=>{const o=el('option','',i+' · '+describe(t));o.value=String(i);inspect.append(o);const li=el('li');li.dataset.trace=String(i);li.append(el('span','',describe(t)));traceList.append(li);});renderCursor();}
      function describe(t){const n=result.nodes.find(n=>n.id===t.node),goal=n.goals.length?n.goals.map(format).join(' ∧ '):'남은 질문 없음';return({call:'질문',match:'절 일치',reject:'인자 불일치',answer:t.duplicate?'같은 답의 다른 도출':'답 찾음',backtrack:'다른 절로 돌아가기',failure:'맞는 절 없음',limit:'범위 제한'}[t.kind]||t.kind)+' · '+(t.clause?t.clause+' · ':'')+goal;}
      function renderCursor(){inspect.value=String(cursor);root.dataset.cursor=String(cursor);const t=result.trace[cursor],n=result.nodes.find(n=>n.id===t.node);current.replaceChildren(el('p','plg-status',cursor+' / '+(result.trace.length-1)+' · '+describe(t)),el('pre','','남은 질문\n'+(n.goals.map(format).join('\n')||'없음')+'\n\n질문의 변수\n'+(Object.entries(n.bindings).map(([k,v])=>k+' = '+(v||'아직 미정')).join('\n')||'변수가 없는 질문')));if(t.kind==='match'){const clause=program().find(c=>c.id===t.clause),child=result.nodes.find(c=>c.parent===n.id&&c.via===t.clause);current.append(el('h5','','이번에 일치한 절과 이어지는 질문'),el('pre','',format(clause.head)+(clause.body.length?' :- '+clause.body.map(format).join(', '):'')+'.\n\n규칙 변수의 연결\n'+(Object.entries(t.substitution).map(([k,v])=>k+' = '+termLabel(v)).join('\n')||'변수가 없는 사실')+'\n\n치환을 전달한 다음 질문\n'+(child?.goals.map(format).join('\n')||'남은 질문 없음')),el('p','plg-note','X_숫자처럼 보이는 이름은 서로 다른 호출의 변수를 구분한 표시입니다. 같은 규칙의 변수를 다른 호출과 섞지 않습니다.'));}for(const li of traceList.children)li.classList.toggle('selected',li.dataset.trace===String(cursor));drawTree(n.id);}
      function drawTree(selected){const levels=new Map();for(const n of result.nodes){const a=levels.get(n.depth)||[];a.push(n);levels.set(n.depth,a);}const width=Math.max(720,...[...levels.values()].map(a=>a.length*125)),height=100+Math.max(...levels.keys())*75,positions=new Map(),d=svg('svg',{viewBox:'0 0 '+width+' '+height,role:'img','aria-label':'이 실행이 실제로 방문한 질문들의 나무'});for(const[depth,ns]of levels)ns.forEach((n,i)=>positions.set(n.id,[(i+1)*width/(ns.length+1),30+depth*75]));for(const n of result.nodes)if(n.parent){const[x,y]=positions.get(n.id),[px,py]=positions.get(n.parent);d.append(svg('path',{d:'M'+px+' '+(py+20)+' L'+x+' '+(y-20),class:'plg-tree-edge'}));}for(const n of result.nodes){const[x,y]=positions.get(n.id);d.append(svg('rect',{x:x-54,y:y-20,width:108,height:42,rx:8,class:'plg-tree-node '+n.status+(n.id===selected?' selected':'')}),svg('text',{x,y:y-3,'text-anchor':'middle',class:'plg-tree-title'},n.id+' · '+(n.via||'질문')),svg('text',{x,y:y+13,'text-anchor':'middle',class:'plg-tree-small'},n.status==='answer'?'답':n.status==='failure'?'유한 실패':n.status==='limited'?'제한':n.goals.length+'개 질문'));}tree.replaceChildren(pane(d,'방문한 질문 나무를 좌우로 이동'),el('p','plg-note','실제 방문한 질문만 그렸습니다. 자식은 한 절과 일치해 생긴 다음 질문이며, 같은 논리적 질문도 다른 경로로 다시 나타날 수 있습니다. 답을 찾은 뒤에는 이전 선택으로 돌아갑니다.'));}
      function renderStage(){for(const b of buttons){const on=b.dataset.stage===state.stage;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}factsPanel.hidden=state.stage!=='facts';rulesPanel.hidden=state.stage!=='rules';searchPanel.hidden=state.stage!=='search';intro.textContent=config.stages.find(s=>s.id===state.stage).text;root.dataset.stage=state.stage;}
      root.append(nav,intro,controls,factsPanel,rulesPanel,searchPanel,details('원문의 질문과 계산 나무 비교',evidence),details('이 보기의 표현과 탐색 범위',scope));recompute();host.append(root);return()=>{if(disposed)return;disposed=true;for(const remove of [...off,...dynamic])remove();root.remove();};
    }
  });
})();
