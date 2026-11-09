/* Finite positive-ground STRIPS transitions and unit-cost BFS; no theorem prover. */
(function(){
  'use strict';
  const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const only=(v,keys)=>record(v)&&Reflect.ownKeys(v).every(k=>typeof k==='string'&&keys.includes(k));
  const text=v=>typeof v==='string'&&v.trim().length>0;
  const id=v=>typeof v==='string'&&/^[A-Za-z][A-Za-z0-9_-]*$/.test(v);
  const list=(v,maximum=64)=>Array.isArray(v)&&v.length<=maximum&&Array.from(v).every(id)&&new Set(v).size===v.length;
  const sorted=v=>[...v].sort(),clone=v=>JSON.parse(JSON.stringify(v));
  function validateAction(action){
    if(!only(action,['id','label','preconditions','add','delete'])||!id(action.id)||!text(action.label)||!['preconditions','add','delete'].every(k=>list(action[k])))throw new TypeError('An action needs a unique id, label and explicit precondition/add/delete sets.');
  }
  function applyAction(options){
    if(!only(options,['state','action'])||!list(options.state))throw new TypeError('Provide a finite state set and an action.');
    validateAction(options.action);const before=sorted(options.state),state=new Set(before),action=options.action;
    const missing=action.preconditions.filter(f=>!state.has(f));
    if(missing.length)return{applicable:false,missing:sorted(missing),before,after:before.slice(),added:[],deleted:[],unchanged:before.slice()};
    const next=new Set(before);for(const f of action.delete)next.delete(f);for(const f of action.add)next.add(f);
    if(next.size>64)throw new RangeError('This view is limited to64 facts.');
    return{applicable:true,missing:[],before,after:sorted(next),added:sorted([...next].filter(f=>!state.has(f))),deleted:before.filter(f=>!next.has(f)),unchanged:before.filter(f=>next.has(f))};
  }
  function findPlan(options){
    if(!only(options,['initial','goal','actions','maxDepth','maxStates'])||!list(options.initial)||!list(options.goal)||!Array.isArray(options.actions)||options.actions.length>32||!Array.from(options.actions).every(record)||!Number.isInteger(options.maxDepth)||options.maxDepth<0||options.maxDepth>20||!Number.isInteger(options.maxStates)||options.maxStates<1||options.maxStates>2048)throw new TypeError('Provide finite initial/goal sets, actions and explicit bounded search limits.');
    options.actions.forEach(validateAction);if(new Set(options.actions.map(a=>a.id)).size!==options.actions.length)throw new TypeError('Action ids must be unique.');
    const universe=new Set([...options.initial,...options.goal,...options.actions.flatMap(a=>[...a.preconditions,...a.add,...a.delete])]);if(universe.size>64)throw new RangeError('This view is limited to64 ground facts.');
    const nodes=[{id:'n0',state:sorted(options.initial),depth:0,parent:null,action:null}],known=new Map([[nodes[0].state.join('|'),'n0']]),trace=[];
    let expanded=0,depthCut=false;
    const goalMet=state=>options.goal.every(f=>state.includes(f));
    function finish(status,reason,goalNode){
      let plan=null,path=[];if(goalNode){let node=goalNode;while(node){path.push(node.id);node=node.parent===null?null:nodes[Number(node.parent.slice(1))];}path.reverse();plan=path.slice(1).map(n=>nodes[Number(n.slice(1))].action);}
      return clone({status,reason,plan,path,goalNode:goalNode?.id||null,nodes,trace,expanded,visited:nodes.length,depthLimit:options.maxDepth,stateLimit:options.maxStates});
    }
    if(goalMet(nodes[0].state))return finish('found','goal-already-true',nodes[0]);
    for(let cursor=0;cursor<nodes.length;cursor++){
      const node=nodes[cursor];expanded++;
      for(const action of options.actions){
        const result=applyAction({state:node.state,action});
        if(!result.applicable){trace.push({from:node.id,action:action.id,applicable:false,missing:result.missing,to:null,newState:false});continue;}
        const key=result.after.join('|'),existing=known.get(key);
        if(existing){trace.push({from:node.id,action:action.id,applicable:true,missing:[],to:existing,newState:false});continue;}
        if(node.depth>=options.maxDepth){depthCut=true;trace.push({from:node.id,action:action.id,applicable:true,missing:[],to:null,newState:false,limited:'depth'});continue;}
        if(nodes.length>=options.maxStates){trace.push({from:node.id,action:action.id,applicable:true,missing:[],to:null,newState:false,limited:'states'});return finish('limited','state-limit',null);}
        const child={id:'n'+nodes.length,state:result.after,depth:node.depth+1,parent:node.id,action:action.id};nodes.push(child);known.set(key,child.id);trace.push({from:node.id,action:action.id,applicable:true,missing:[],to:child.id,newState:true});
        if(goalMet(child.state))return finish('found','goal-reached',child);
      }
    }
    return finish(depthCut?'limited':'exhausted',depthCut?'depth-limit':'reachable-states-exhausted',null);
  }
  window.AtlasSTRIPSModel=Object.freeze({applyAction,findPlan});

  const node=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svg=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(value!==undefined)n.textContent=value;return n;};
  const sourceOK=s=>record(s)&&text(s.title)&&text(s.url);
  function validateConfig(c){
    if(!record(c)||!Array.isArray(c.stages)||c.stages.length!==3||!['world','operator','plan'].every(v=>c.stages.some(s=>s.id===v&&text(s.label)&&text(s.text)))||!Array.isArray(c.facts)||!c.facts.every(f=>id(f.id)&&text(f.formula)&&text(f.label))||new Set(c.facts.map(f=>f.id)).size!==c.facts.length||!list(c.baseInitial)||!Array.isArray(c.controls)||!c.controls.every(x=>id(x.id)&&text(x.label)&&typeof x.initial==='boolean'&&list(x.on)&&list(x.off))||!Array.isArray(c.actions)||!c.actions.some(a=>a.id===c.defaultAction)||!record(c.limits)||!Array.isArray(c.depthChoices)||!c.depthChoices.every(x=>Number.isInteger(x)&&x>=0&&x<=20)||!record(c.map)||!Array.isArray(c.map.rooms)||c.map.rooms.length!==3||!sourceOK(c.source)||!text(c.scope)||!Array.isArray(c.evidence)||c.evidence.some(e=>!text(e.title)||!text(e.formula)||!text(e.caption)||!sourceOK(e.source))||!record(c.originalImage)||!text(c.originalImage.src)||!text(c.originalImage.alt)||!text(c.originalImage.title)||!text(c.originalImage.caption)||!text(c.originalImage.credit)||!sourceOK(c.originalImage.source))throw new TypeError('The STRIPS card needs its source, finite domain, map and three stages.');
    const ids=new Set(c.facts.map(f=>f.id)),initial=[...c.baseInitial,...c.controls.flatMap(x=>x.initial?x.on:x.off)];
    if([...initial,...c.goal,...c.actions.flatMap(a=>[...a.preconditions,...a.add,...a.delete])].some(x=>!ids.has(x)))throw new TypeError('Unknown authored fact.');
    findPlan({initial,goal:c.goal,actions:c.actions,...c.limits});
  }
  window.AtlasVisuals.register('strips-planning',{
    mount(host,config){
      validateConfig(config);const root=node('div','strips-planning'),off=[],stageButtons=[],values=Object.fromEntries(config.controls.map(c=>[c.id,c.initial])),labels=new Map(config.facts.map(f=>[f.id,f]));
      let stage='world',state=[],history=[],selected=config.defaultAction,last=null,search,preview=0,maxDepth=config.limits.maxDepth,inspected=null,disposed=false;
      const listen=(n,type,fn)=>{n.addEventListener(type,fn);off.push(()=>n.removeEventListener(type,fn));};
      const button=(text,parent,fn)=>{const b=node('button','',text);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const group=label=>{const g=node('div','stp-controls');g.setAttribute('role','group');g.setAttribute('aria-label',label);return g;};
      const source=s=>{const a=node('a','stp-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const details=(label,content)=>{const d=node('details','stp-details');d.append(node('summary','',label),content);return d;};
      const pane=(content,label)=>{const p=node('div','stp-svg-viewport');p.tabIndex=0;p.setAttribute('role','group');p.setAttribute('aria-label',label);p.append(content);return p;};
      const factText=f=>labels.get(f)?.formula||f;
      const chips=(facts,current)=>{const box=node('div','stp-facts');for(const f of facts){const n=node('span','stp-fact');n.dataset.fact=f;if(current)n.dataset.present=String(current.includes(f));n.append(node('code','',factText(f)),node('small','',labels.get(f)?.label||f));box.append(n);}if(!facts.length)box.append(node('p','stp-note','해당 사실이 없습니다.'));return box;};
      const nav=group('STRIPS의 목표와 계획을 읽는 단계');nav.className='stp-stage-controls';const intro=node('p','stp-stage-text');
      for(const s of config.stages){const b=button(s.label,nav,()=>{stage=s.id;renderStage();});b.dataset.stage=s.id;stageButtons.push(b);}
      const setup=node('section','stp-setup');setup.append(node('h4','','초기 세계를 바꾸어 보기'),node('p','stp-note','아래 조건을 바꾸면 조작한 모형과 계획을 초기 상태에서 다시 시작합니다.'));
      for(const c of config.controls){const wrap=node('label','stp-check'),input=node('input');input.type='checkbox';input.checked=values[c.id];input.dataset.setup=c.id;wrap.append(input,node('span','',c.label));setup.append(wrap);listen(input,'change',()=>{values[c.id]=input.checked;reset();});}
      const world=node('section','stp-panel stp-world'),worldMap=node('div'),stateFacts=node('div'),goalStatus=node('p','stp-keypoint'),relevant=node('div');
      world.append(node('h4','','현재 사실과, 이루려는 목표를 따로 적다'),node('p','stp-prose','원하는 결과를 만들 행동에서 출발하면 그전에 필요한 조건도 보입니다. 현재 상태에 그 조건이 없다면, 먼저 조건을 만들 행동이 필요합니다.'),worldMap,goalStatus,node('h5','','현재 성립하는 사실'),stateFacts,node('h5','','이 목표를 만드는 행동'),relevant);
      const operator=node('section','stp-panel stp-operator'),operatorControls=group('살펴볼 행동과 모형 적용'),select=node('select'),apply=button('선택한 행동을 모형에 적용',operatorControls,()=>{const a=config.actions.find(a=>a.id===selected),result=applyAction({state,action:a});last={action:a.id,...result};if(result.applicable){history.push(state.slice());state=result.after;}recompute();});select.dataset.control='action';select.setAttribute('aria-label','살펴볼 행동');for(const a of config.actions){const o=node('option','',a.label);o.value=a.id;select.append(o);}operatorControls.prepend(select);listen(select,'change',()=>{selected=select.value;renderOperator();});
      const undo=button('모형 한 단계 되돌리기',operatorControls,()=>{if(history.length){state=history.pop();last=null;recompute();}});undo.dataset.control='undo';button('현재 초기 조건으로 되돌리기',operatorControls,reset).dataset.control='reset';
      const operatorMap=node('div'),definition=node('div','stp-effects'),actionStatus=node('p','stp-keypoint'),changes=node('div');
      operator.append(node('h4','','행동은 조건과, 바뀌는 사실을 함께 가진다'),node('p','stp-prose','전제 조건을 모두 충족해야 행동을 적용할 수 있습니다. 적용한 뒤 무엇이 사라지고 무엇이 새로 생기는지, 다른 사실은 유지되는지 살펴보세요.'),operatorControls,operatorMap,definition,actionStatus,changes);
      const plan=node('section','stp-panel stp-plan'),planControls=group('계획 탐색 범위와 미리 보기'),depth=node('select');depth.dataset.control='depth';depth.setAttribute('aria-label','탐색할 최대 행동 수');for(const n of config.depthChoices){const o=node('option','',n+'행동 깊이까지');o.value=String(n);depth.append(o);}depth.value=String(maxDepth);planControls.append(depth);listen(depth,'change',()=>{maxDepth=Number(depth.value);recompute();});button('지금 모형에서 계획 다시 찾기',planControls,recompute).dataset.control='search';
      const planStatus=node('p','stp-keypoint'),planSteps=group('찾은 계획의 단계 선택'),planMap=node('div'),planFacts=node('div'),searchDrawing=node('div'),searchInfo=node('div'),inspectControls=group('찾아본 모형 선택'),inspectSelect=node('select');inspectSelect.dataset.control='inspect';inspectSelect.setAttribute('aria-label','찾아본 모형을 미리 보기');inspectControls.append(inspectSelect);listen(inspectSelect,'change',()=>{inspected=inspectSelect.value||null;renderPreview();drawSearchTree();});
      plan.append(node('h4','','조건을 지키며, 목표까지의 경로를 찾다'),node('p','stp-prose','지금 조작한 모형에서 출발합니다. 이 보기는 행동 수가 적은 층부터 탐색하는 BFS를 사용합니다. 원문 STRIPS의 means–ends 전략과 구분해 읽습니다.'),planControls,planStatus,planSteps,planMap,planFacts,node('h5','','너비 우선 탐색에서 처음 발견한 모형'),searchDrawing,inspectControls,searchInfo);
      const original=node('section','stp-original');original.append(node('h5','',config.originalImage.title));const image=node('img');image.alt=config.originalImage.alt;window.AtlasPublicAssets.setSource(image,config.originalImage.src);const imagePane=node('div','stp-image-viewport');imagePane.tabIndex=0;imagePane.setAttribute('role','group');imagePane.setAttribute('aria-label','원문 STRIPS 탐색 나무, 확대 후 좌우로 이동');imagePane.append(image);const zoom=button('원문 크게 보기',original,()=>{const on=!imagePane.classList.contains('expanded');imagePane.classList.toggle('expanded',on);zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'원문 크기 되돌리기':'원문 크게 보기';});zoom.setAttribute('aria-pressed','false');original.append(imagePane,node('p','stp-prose',config.originalImage.caption),node('p','stp-note',config.originalImage.credit),source(config.originalImage.source));
      const sources=node('div');for(const e of config.evidence){const n=node('section','stp-source-panel');n.append(node('h5','',e.title),node('pre','stp-code',e.formula),node('p','stp-prose',e.caption),source(e.source));sources.append(n);}sources.append(original);
      const scope=node('div');scope.append(node('p','stp-note',config.scope),source(config.source));
      function map(s,title){
        const set=new Set(s),drawing=svg('svg',{viewBox:'0 0 760 320',role:'img','aria-label':title});
        const rooms=config.map.rooms,centers=[125,380,635];
        drawing.append(svg('path',{d:'M220 195 L285 195 M475 195 L540 195',class:'stp-passage'}));
        drawing.append(svg('path',{d:'M125 120 C125 20 635 20 635 120',class:'stp-side'+(set.has(config.map.sideOpen)?' open':'')}),svg('text',{x:380,y:30,'text-anchor':'middle',class:'stp-map-small'},'우회 통로 · '+(set.has(config.map.sideOpen)?'열림':'닫힘')));
        rooms.forEach((r,i)=>{const x=centers[i]-95,g=svg('g');g.append(svg('rect',{x,y:120,width:190,height:170,rx:12,class:'stp-room'}),svg('text',{x:centers[i],y:148,'text-anchor':'middle',class:'stp-room-title'},r.name));if(i===2)g.append(svg('text',{x:centers[i],y:278,'text-anchor':'middle',class:'stp-map-small'},'목표: 상자를 여기에'));drawing.append(g);});
        const doorX=507;drawing.append(svg('path',{d:set.has(config.map.doorOpen)?'M493 178 L514 165':'M507 173 L507 218',class:'stp-door'+(set.has(config.map.doorOpen)?' open':'')}),svg('text',{x:doorX,y:238,'text-anchor':'middle',class:'stp-map-small'},set.has(config.map.doorOpen)?'문 열림':'문 잠김'));
        const robot=rooms.findIndex(r=>set.has(r.at));if(robot>=0){const cx=centers[robot];drawing.append(svg('rect',{x:cx-19,y:180,width:38,height:35,rx:7,class:'stp-robot'}),svg('circle',{cx:cx-7,cy:192,r:3,class:'stp-eye'}),svg('circle',{cx:cx+7,cy:192,r:3,class:'stp-eye'}),svg('path',{d:'M'+cx+' 180 L'+cx+' 172 M'+(cx-12)+' 215 L'+(cx-12)+' 222 M'+(cx+12)+' 215 L'+(cx+12)+' 222',class:'stp-robot-line'}),svg('text',{x:cx,y:240,'text-anchor':'middle',class:'stp-map-small'},'로봇'));if(set.has(config.map.holding))drawing.append(svg('rect',{x:cx+26,y:191,width:25,height:25,rx:2,class:'stp-box'}),svg('text',{x:cx+38,y:208,'text-anchor':'middle',class:'stp-box-label'},'상자'));if(set.has(config.map.hasKey))drawing.append(svg('text',{x:cx,y:169,'text-anchor':'middle',class:'stp-map-small'},'열쇠 보유'));}
        for(const[room,atom]of Object.entries(config.map.box)){if(set.has(atom)){const i=rooms.findIndex(r=>r.id===room),cx=centers[i];drawing.append(svg('rect',{x:cx+35,y:185,width:37,height:34,rx:3,class:'stp-box'}),svg('text',{x:cx+53,y:207,'text-anchor':'middle',class:'stp-box-label'},'상자'));}}
        if(set.has(config.map.keyAt)){const x=centers[0]-53;drawing.append(svg('circle',{cx:x,cy:250,r:6,class:'stp-key'}),svg('path',{d:'M'+(x+6)+' 250 L'+(x+29)+' 250 L'+(x+29)+' 257 M'+(x+21)+' 250 L'+(x+21)+' 255',class:'stp-key'}),svg('text',{x:x+13,y:272,'text-anchor':'middle',class:'stp-map-small'},'열쇠'));}
        const block=node('div');block.append(pane(drawing,title+', 그림을 좌우로 이동'),node('p','stp-note',title+' · 도형은 명시한 모형의 사실을 표시합니다. 실제 로봇 관찰 화면이 아닙니다.'));return block;
      }
      function reset(){state=sorted(new Set([...config.baseInitial,...config.controls.flatMap(c=>values[c.id]?c.on:c.off)]));history=[];last=null;preview=0;recompute();}
      function recompute(){search=findPlan({initial:state,goal:config.goal,actions:config.actions,maxDepth,maxStates:config.limits.maxStates});preview=0;inspected=null;root.dataset.state=state.join(',');for(const[k,v]of Object.entries(values))root.dataset[k]=String(v);root.dataset.goalMet=String(config.goal.every(f=>state.includes(f)));root.dataset.planStatus=search.status;root.dataset.planLength=search.plan===null?'none':String(search.plan.length);renderWorld();renderOperator();renderPlan();renderStage();}
      function renderWorld(){worldMap.replaceChildren(map(state,'지금 조작한 세계 모형'));stateFacts.replaceChildren(chips(state));goalStatus.textContent='목표: '+config.goalText+' · '+(config.goal.every(f=>state.includes(f))?'현재 모형에서 달성':'아직 달성하지 않음');relevant.replaceChildren();for(const a of config.actions.filter(a=>a.add.some(f=>config.goal.includes(f)))){const n=node('section','stp-relevant');n.append(node('h5','',a.label),node('p','stp-note','이 행동은 목표 사실을 추가합니다. 먼저 아래 조건이 필요합니다.'),chips(a.preconditions,state));button('이 행동의 조건과 효과 보기',n,()=>{selected=a.id;select.value=selected;stage='operator';renderOperator();renderStage();});relevant.append(n);}}
      function renderOperator(){select.value=selected;undo.disabled=!history.length;const a=config.actions.find(a=>a.id===selected),check=applyAction({state,action:a});operatorMap.replaceChildren(map(state,'행동을 고르는 현재 모형'));definition.replaceChildren();for(const[key,title]of[['preconditions','필요한 조건'],['delete','삭제할 사실'],['add','추가할 사실']]){const n=node('section','stp-effect');n.append(node('h5','',title),chips(a[key],key==='preconditions'?state:null));definition.append(n);}actionStatus.textContent=check.applicable?'조건을 모두 만족합니다. 이 행동을 모형에 적용할 수 있습니다.':'아직 적용할 수 없습니다. 필요한 조건: '+check.missing.map(factText).join(', ');changes.replaceChildren();if(last){const n=node('section','stp-change');n.append(node('h5','',config.actions.find(a=>a.id===last.action).label+' · 적용 결과'));if(!last.applicable)n.append(node('p','stp-prose','조건이 빠져 있어 모형을 바꾸지 않았습니다.'),chips(last.missing,state));else{n.append(node('p','stp-note','실제로 새로 생긴 사실'),chips(last.added),node('p','stp-note','실제로 사라진 사실'),chips(last.deleted),details('그대로 남은 사실',chips(last.unchanged)));}changes.append(n);}root.dataset.action=selected;root.dataset.applicable=String(check.applicable);root.dataset.history=String(history.length);}
      function renderPlan(){depth.value=String(maxDepth);planSteps.replaceChildren();const found=search.status==='found';planStatus.textContent=found?(search.plan.length?'계획을 찾았습니다 · '+search.plan.length+'행동 · 살펴본 모형 '+search.visited+'개':'이미 목표가 성립합니다 · 필요한 행동 0개'):search.status==='limited'?'정한 탐색 범위에서 멈췄습니다. 그 밖에 계획이 없는지는 아직 판단하지 않습니다.':'이 행동 목록으로 도달 가능한 모형을 모두 살폈지만 목표에 이르는 계획이 없습니다.';if(found){search.path.forEach((id,i)=>{const step=search.nodes.find(n=>n.id===id),label=i===0?'0 · 지금 모형':i+' · '+config.actions.find(a=>a.id===step.action).label;const b=button(label,planSteps,()=>{preview=i;inspected=null;inspectSelect.value='';renderPreview();drawSearchTree();});b.dataset.preview=String(i);});}inspectSelect.replaceChildren();const option=node('option','','계획 단계 미리 보기');option.value='';inspectSelect.append(option);for(const n of search.nodes){const o=node('option','',n.id+' · 깊이 '+n.depth+' · '+(n.action?config.actions.find(a=>a.id===n.action).label:'시작 모형'));o.value=n.id;inspectSelect.append(o);}inspectSelect.value='';renderPreview();drawSearchTree();searchInfo.replaceChildren();const info=node('div');info.append(node('p','stp-note','너비 우선 탐색 · 깊이 제한 '+maxDepth+' · 상태 수 제한 '+config.limits.maxStates+' · 방문 '+search.visited+'개 · 펼친 모형 '+search.expanded+'개'));const byDepth=new Map();for(const n of search.nodes)byDepth.set(n.depth,(byDepth.get(n.depth)||0)+1);for(const[d,count]of byDepth)info.append(node('p','stp-note','깊이 '+d+'에서 처음 발견한 모형 '+count+'개'));searchInfo.append(details('탐색한 모형의 층별 개수',info));}
      function drawSearchTree(){
        const levels=new Map();for(const n of search.nodes){const list=levels.get(n.depth)||[];list.push(n);levels.set(n.depth,list);}const max=Math.max(...levels.keys()),height=105+max*80,positions=new Map(),route=new Set(search.path);
        for(const[d,nodes]of levels)nodes.forEach((n,i)=>positions.set(n.id,{x:(i+1)*760/(nodes.length+1),y:25+d*80}));
        const drawing=svg('svg',{viewBox:'0 0 760 '+height,role:'img','aria-label':'너비 우선 탐색이 처음 발견한 모형의 부모 관계와 깊이'});
        for(const n of search.nodes)if(n.parent!==null){const p=positions.get(n.parent),q=positions.get(n.id),dy=q.y-p.y-36,dx=q.x-p.x,length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length,on=route.has(n.id)&&route.has(n.parent),cls='stp-tree-edge'+(on?' on-path':'');drawing.append(svg('path',{d:'M'+p.x+' '+(p.y+36)+' L'+q.x+' '+q.y,class:cls}),svg('path',{d:'M'+(q.x-7*ux+4*uy)+' '+(q.y-7*uy-4*ux)+' L'+q.x+' '+q.y+' L'+(q.x-7*ux-4*uy)+' '+(q.y-7*uy+4*ux),class:cls}));}
        for(const n of search.nodes){const p=positions.get(n.id),g=svg('g'),current=inspected===n.id||!inspected&&search.path[preview]===n.id,cls='stp-tree-node'+(route.has(n.id)?' on-path':'')+(current?' selected':''),room=config.map.rooms.find(r=>n.state.includes(r.at))?.id.toUpperCase()||'?',box=n.state.includes(config.map.holding)?'운반':Object.entries(config.map.box).find(([,f])=>n.state.includes(f))?.[0].toUpperCase()||'?';g.append(svg('rect',{x:p.x-44,y:p.y,width:88,height:36,rx:6,class:cls}),svg('text',{x:p.x,y:p.y+14,'text-anchor':'middle',class:'stp-tree-title'},n.id+' · 로봇 '+room),svg('text',{x:p.x,y:p.y+28,'text-anchor':'middle',class:'stp-tree-small'},'상자 '+box));drawing.append(g);}
        searchDrawing.replaceChildren(pane(drawing,'BFS 탐색 나무, 좌우로 이동'),node('p','stp-note','같은 층은 같은 행동 수입니다. 선은 모형을 처음 발견한 부모 관계이며, 강조한 경로가 찾은 계획입니다. 다시 방문한 같은 사실 집합은 새 모형으로 늘리지 않습니다.'));
      }
      function renderPreview(){
        root.dataset.preview=String(preview);root.dataset.inspected=inspected||'';
        for(const b of planSteps.children){const on=!inspected&&Number(b.dataset.preview)===preview;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}
        const inspectedNode=inspected?search.nodes.find(n=>n.id===inspected):null;
        if(inspectedNode){planMap.replaceChildren(map(inspectedNode.state,'탐색에서 발견한 '+inspectedNode.id+' · 깊이 '+inspectedNode.depth+' 모형 미리 보기'));planFacts.replaceChildren(chips(inspectedNode.state));return;}
        if(search.status!=='found'){planMap.replaceChildren(map(state,'계획 탐색을 시작한 모형'));planFacts.replaceChildren();return;}
        const n=search.nodes.find(n=>n.id===search.path[preview]);planMap.replaceChildren(map(n.state,'찾은 계획의 '+preview+'번째 모형 미리 보기'));planFacts.replaceChildren(chips(n.state));
      }
      function renderStage(){for(const b of stageButtons){const on=b.dataset.stage===stage;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}world.hidden=stage!=='world';operator.hidden=stage!=='operator';plan.hidden=stage!=='plan';intro.textContent=config.stages.find(s=>s.id===stage).text;root.dataset.stage=stage;}
      root.append(nav,intro,setup,world,operator,plan,details('원문의 계획과 비교하기',sources),details('이 보기의 계산 범위',scope));reset();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of off)remove();root.remove();};
    }
  });
})();
