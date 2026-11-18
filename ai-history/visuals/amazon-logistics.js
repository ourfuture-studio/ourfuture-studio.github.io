/* Authored finite examples alongside separately credited original figures. */
(function(){
 'use strict';
 const n=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 const s=(tag,attrs={},text)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;};
 const button=(label,fn,id)=>{const b=n('button','',label);b.type='button';if(id)b.dataset.logControl=id;b.addEventListener('click',fn);return b;};
 const p=(text,cls='log-prose')=>n('p',cls,text);
 const colors=['#ba765a','#4b8c86','#8c79b2'];
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 const point=([x,y])=>[55+x*62,45+y*62];
 const line=(g,a,b,cls)=>{const[x1,y1]=point(a),[x2,y2]=point(b);g.append(s('path',{d:`M${x1},${y1}L${x2},${y2}`,class:cls}));};
 function viewport(g,label){const box=n('div','log-viewport');box.tabIndex=0;box.setAttribute('role','region');box.setAttribute('aria-label',label+' · 좁은 화면에서 가로 이동');box.append(g);return box;}
 function label(g,x,y,txt,cls='log-svg-text'){g.append(s('text',{x,y,class:cls,'text-anchor':'middle'},txt));}
 function grid(core,scene,agents,{paths=null,t=0,highlight=[],graph=false,channel='all',edges=false,collisions=[]}={}){
  const state=agents.map((a,i)=>a.id+' 현재('+String(paths?core.at(paths[i],t):a.start)+'), 목표('+a.goal+')').join('. '),now=collisions.filter(c=>c.t===t);
  const g=s('svg',{viewBox:'0 0 482 340',role:'img','aria-label':'직접 만든 7×5 창고 격자. 사각형은 통로, 진한 칸은 선반 구역. '+(paths?'시각'+t+'. ':'')+state+'. '+(now.length?'이 시각 충돌'+now.length+'건.':'')});g.append(s('title',{},'직접 만든 7×5 창고 격자'));
  for(let y=0;y<scene.height;y++)for(let x=0;x<scene.width;x++){
   const pos=[x,y],blocked=scene.blocked.some(b=>same(b,pos)),[cx,cy]=point(pos),active=highlight.some(b=>same(b,pos));
   if(graph&&!blocked){g.append(s('circle',{cx,cy,r:active?11:6,class:'log-graph-node'+(active?' is-active':'')}));}
   else g.append(s('rect',{x:cx-26,y:cy-26,width:52,height:52,rx:9,class:blocked?'log-wall':'log-cell'+(active?' is-active':'')}));
   if(blocked&&!graph)label(g,cx,cy+4,'선반','log-wall-label');
  }
  if(graph||edges)for(const[a,b]of core.edges(scene))line(g,a,b,'log-graph-edge');
  if(paths)paths.forEach((path,i)=>{const d=path.map((v,j)=>{const[x,y]=point(v);return(j?'L':'M')+x+','+y;}).join('');g.append(s('path',{d,fill:'none',stroke:colors[agents[i].id.charCodeAt(0)-65],class:'log-route'}));});
  agents.forEach((a,i)=>{const color=colors[a.id.charCodeAt(0)-65],current=paths?core.at(paths[i],t):a.start,[gx,gy]=point(a.goal),[cx,cy]=point(current);
   if(channel==='all'||channel==='goal'){g.append(s('rect',{x:gx-17,y:gy-17,width:34,height:34,rx:7,fill:'none',stroke:color,'stroke-width':2,'stroke-dasharray':'4 3'}));label(g,gx,gy+5,a.id+'·목표','log-goal-text');}
   if(channel==='all'||channel==='robot'){g.append(s('circle',{cx,cy,r:19,fill:color,class:'log-robot'}));label(g,cx,cy+5,a.id,'log-robot-label');}
  });
  for(const c of collisions.filter(c=>c.t===t)){const[cx,cy]=point(c.position);g.append(s('circle',{cx,cy,r:27,class:'log-conflict'}));label(g,cx,cy-32,c.kind==='edge'?'서로 자리 바꾸기 충돌':'같은 칸 충돌','log-conflict-text');}
  label(g,241,330,paths?'실선: 계획한 경로 · 점선 상자: 목적지':'직접 정한 상태 · 실제 창고 자료가 아님','log-svg-note');return g;
 }
 function choices(items,selected,change,prefix){const box=n('div','log-options');for(const[value,text]of items){const b=button(text,()=>change(value),prefix+'-'+value);b.setAttribute('aria-pressed',String(value===selected));box.append(b);}return box;}
 function table(heads,rows,caption){const wrap=n('div','log-table-wrap');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label',caption+' · 좁은 화면에서 가로 이동');const t=n('table'),cap=n('caption','',caption),head=n('thead'),hr=n('tr'),body=n('tbody');for(const h of heads){const th=n('th','',h);th.scope='col';hr.append(th);}head.append(hr);for(const row of rows){const tr=n('tr');for(const c of row)tr.append(n('td','',c));body.append(tr);}t.append(cap,head,body);wrap.append(t);return wrap;}
 function cards(items){const wrap=n('div','log-cards');for(const[title,copy]of items){const card=n('section','log-card');card.append(n('h5','',title),p(copy));wrap.append(card);}return wrap;}
 function flow(items){const wrap=n('ol','log-flow');for(const[title,copy]of items){const item=n('li');item.append(n('strong','',title),n('span','',copy));wrap.append(item);}return wrap;}
 function mount(host,kind){
  const core=window.AtlasAmazonLogisticsCore;if(!core)throw Error('Logistics core must load first.');
  const root=n('div','amazon-logistics'),nav=n('nav','log-nav'),body=n('div','log-body'),live=p('','log-live');let sourceCleanup=null;
  const titles=kind==='kiva'?['01 재고가 사람에게 온다','02 같은 통로를 함께 쓰려면','03 배정·계획·제어의 경계']:['01 네 표현, 네 아키텍처','02 예측과 이동 허용을 나눈다','03 논문 평가와 운영 발표'];
  let stage=0,scenarioId='cross',coordinated=true,count=3,closed=false,reverse=false,t=0,model='rc',selectedRobot='A',channel='all',hops=2,probability=.6,priority=false;
  const announce=txt=>{live.textContent=txt;};
  nav.setAttribute('aria-label',kind==='kiva'?'Kiva의 세 관점':'DeepFleet의 세 관점');live.setAttribute('role','status');live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');
  titles.forEach((title,i)=>{const b=button(title,()=>{stage=i;render();announce(title+' 화면을 표시했습니다.');},'stage-'+i);b.dataset.logStage=i;nav.append(b);});
  root.append(nav,p(kind==='kiva'?'원문에서 읽은 역할을 직접 만든 격자에 연결합니다. 이 예는2008 Kiva의 전체 알고리즘·로봇 동역학·실제 생산성을 재현하지 않습니다.':'원논문의 네 도판과 직접 만든 상태 표현을 구분합니다. 여기의 확률·위치·경로는 학습된 DeepFleet의 출력이나 실제 운영 결과가 아닙니다.','log-scope'),body,live);host.append(root);
  function render(){const focus=document.activeElement?.dataset.logControl;sourceCleanup?.();sourceCleanup=null;body.replaceChildren();root.dataset.logKind=kind;root.dataset.logStage=stage;for(const b of nav.children)b.setAttribute('aria-pressed',String(Number(b.dataset.logStage)===stage));(kind==='kiva'?[goods,paths,control]:[architectures,predict,validation])[stage]();if(focus)root.querySelector('[data-log-control="'+focus+'"]')?.focus({preventScroll:true});}
  function goods(){
   body.append(n('h4','','사람이 선반을 찾아다니는 대신, 선반을 작업자에게 가져온다'),p('한 주문을 빨리 처리하는 경로만으로는 충분하지 않다. 어떤 재고 선반을 어느 작업대에 보낼지, 어떤 로봇이 가져올지, 통로를 어떻게 나눠 쓸지가 함께 맞아야 한다.'));
   body.append(flow([['주문과 재고','작업대가 처리할 주문과 필요한 물품을 찾는다.'],['자원 배정','Job Manager가 작업대·선반·로봇의 이용 가능성과 비용을 고려한다.'],['이동과 작업','로봇은 선반 밑으로 들어가 들어 올린 뒤 작업대에 가져온다.'],['다음 보관 위치','사용한 선반을 다시 놓을 위치도 운영 효율에 영향을 준다.']]));
   const g=s('svg',{viewBox:'0 0 760 250',role:'img','aria-label':'왼쪽 선반을 로봇이 들어 올려 오른쪽 작업자에게 가져오는 직접 만든 도식'});g.append(s('title',{},'재고가 작업자에게 오는 goods-to-person 도식'));
   for(const x of[55,135,215]){g.append(s('rect',{x,y:55,width:54,height:95,rx:9,class:'log-shelf'}));for(const yy of[85,115])g.append(s('path',{d:`M${x+5},${yy}H${x+49}`,class:'log-shelf-rule'}));}
   g.append(s('path',{d:'M300,155H560',class:'log-goods-arrow'}));label(g,420,133,'선반을 싣고 이동');g.append(s('rect',{x:358,y:55,width:54,height:95,rx:9,class:'log-shelf'}));g.append(s('rect',{x:349,y:151,width:72,height:25,rx:12,class:'log-goods-robot'}));g.append(s('circle',{cx:360,cy:179,r:7,class:'log-wheel'}),s('circle',{cx:410,cy:179,r:7,class:'log-wheel'}));
   g.append(s('rect',{x:575,y:136,width:85,height:12,rx:3,class:'log-station'}),s('path',{d:'M585,148V195M650,148V195',class:'log-person-line'}),s('circle',{cx:693,cy:79,r:18,class:'log-person'}),s('path',{d:'M693,100V153M693,115L655,132M693,153L678,195M693,153L710,195',class:'log-person-line'}));label(g,160,220,'이동식 재고 선반');label(g,385,220,'운반 로봇');label(g,655,220,'작업대와 작업자');body.append(viewport(g,'goods-to-person의 흐름'));
   body.append(p('2008 원문 · 인쇄9–14쪽 문제 설정·시스템, Figure3 레이아웃, Figure4 제어 계층. 위 도식의 모양과 배치는 직접 만들었습니다. Amazon의 Kiva 인수는2012년의 별도 기록입니다.','log-source'));
  }
  function paths(){
   body.append(n('h4','','각자 가장 짧은 길이, 함께 쓸 수 있는 길은 아니다'),p('작은 격자에서 독립 경로와 우선순위 예약 경로를 비교한다. 같은 시각의 같은 칸과 반대 방향의 자리 교환을 확인하고, 앞서 계획한 경로를 예약하면 다른 로봇은 기다리거나 우회한다.'));
   body.append(choices([['cross','교차로'],['swap','서로 반대 방향']],scenarioId,v=>{scenarioId=v;t=0;render();},'scenario'),choices([[true,'시간별 공간 예약'],[false,'각자 독립 경로']],coordinated,v=>{coordinated=v;t=0;render();announce(v?'시간별 공간 예약을 적용했습니다.':'독립 경로에는 충돌이 남을 수 있습니다.');},'reservation'));
   const options=n('div','log-options');for(const[v,text,fn,id]of[[count===3,'로봇 3대',()=>{count=count===3?2:3;t=0;render();},'count'],[closed,'가운데 통로 닫기',()=>{closed=!closed;t=0;render();},'closed'],[reverse,'예약 순서 뒤집기',()=>{reverse=!reverse;t=0;render();},'reverse']]){const b=button(text,fn,id);b.setAttribute('aria-pressed',String(v));options.append(b);}body.append(options);
   const result=core.solve({scenarioId,coordinated,count,closed,reverse});
   if(!result.complete){body.append(p('경로를 찾지 못했습니다. '+result.error+' 이 배치에서는 닫힌 칸이 출발지나 목적지를 막을 수 있습니다. 통로를 열거나 교차로 배치를 선택해 주세요.','log-error'));body.append(viewport(grid(core,result.scene,result.agents),'경로가 막힌 격자'));return;}
   t=Math.min(t,result.makespan);const diagram=n('div','log-grid-result'),status=n('div','log-callout');
   const draw=()=>{diagram.replaceChildren(viewport(grid(core,result.scene,result.agents,{paths:result.paths,t,collisions:result.conflicts}),'시간별 로봇 이동'));status.replaceChildren(n('strong','',`시각 ${t} / ${result.makespan}`),p(result.conflicts.some(c=>c.t===t)?'이 시각에 충돌이 있습니다. 위치 또는 이동 방향을 함께 봅니다.':t===result.makespan?'모든 로봇이 목적지에 도착했습니다.':'원으로 표시한 현재 위치와 점선 목적지를 비교합니다.'));};
   const time=n('label','log-slider'),span=n('span','',`시각 t · 0부터${result.makespan}까지`),input=n('input');input.type='range';input.min=0;input.max=result.makespan;input.step=1;input.value=t;input.dataset.logControl='time';input.addEventListener('input',()=>{t=Number(input.value);draw();announce('표시 시각: '+t);});time.append(span,input);const actions=n('div','log-options');actions.append(button('처음',()=>{t=0;input.value=t;draw();announce('시각0을 표시했습니다.');},'reset'),button('한 단계',()=>{t=Math.min(t+1,result.makespan);input.value=t;draw();announce('표시 시각: '+t);},'next'));
   body.append(time,actions,diagram,status,cards([['충돌 '+result.conflicts.length+'건','현재 계획의 시공간 충돌 수. 같은 칸 충돌과 서로 자리 바꾸기를 센다.'],['총 이동 '+result.moves+'칸','모든 로봇이 이동한 격자 변의 수. 실제 거리·전력·처리량이 아니다.'],['대기 '+result.waits+'회','경로 안에서 한 시각 동안 같은 위치를 유지한 횟수. 목적지 도착 뒤의 유지 시간은 제외한다.']]));draw();
   body.append(p('직접 만든 계산 · 작은 시간 확장 격자에서 앞 로봇의 경로와 목적지를 예약하는 순차 계획입니다. 예약 순서를 바꾸면 우회와 완료 시각도 달라질 수 있으며 최적 다중 로봇 계획을 보장하지 않습니다.2008 논문의 A* 경로 계획·중앙 배정과 같은 알고리즘이라고 주장하지 않습니다.','log-source'));
  }
  function control(){
   body.append(n('h4','','누가 무엇을 정하는지 나누면, 한 번의 이동이 업무와 이어진다'),flow([['Job Manager','주문·선반·작업대·로봇의 배정.2008 원문은 효용 기반 휴리스틱으로 설명한다.'],['Station Agent','작업대의 주문과 물품 처리 흐름을 관리한다.'],['Drive Task Manager','이동·들어 올리기·내려놓기 등의 임무를 순서로 연결한다.'],['Path Planning','알려진 통로 그래프에서 목적지로 갈 경로를 찾는다.'],['Motion Control','실제 이동과 정지·회전을 제어한다. 격자 경로만으로 물리적 안전이 보장되지는 않는다.']]));
   body.append(cards([['논리·계획의 관점','물품·작업대·경로·행동을 명시하고 목표와 자원 제약에 맞춰 작업을 선택한다. 이 카드는 신경망 논문으로 분류하지 않는다.'],['2008년 Kiva와2012년 Amazon','시스템 논문은 인수 전 Kiva 연구다.2012년3월19일 인수 합의 발표와5월1일 실제 인수 완료를 구분한다.'],['DeepAR와 DeepFleet로 읽기','수요의 미래를 예측하는 일, 재고를 옮길 작업을 정하는 일, 여러 로봇의 상호작용을 예측하는 일은 서로 다른 문제다. 아래 연결은 실제 제품 간 통합을 뜻하지 않는다.']]));
   body.append(reading('DeepAR · 수요를 분포로 예측하기','valentin-flunkert','amazon-deepar-2017'),reading('DeepFleet · 로봇군의 미래를 표현하기','ameya-agaskar','amazon-deepfleet-2025'),p('원문 위치 · 2008 인쇄14–16쪽 제어 계층·Path Planning·Resource Allocation. 공통 원도판 패널은 앞선2007 학회판의 Figure4이며 판본을 명시합니다.','log-source'));
  }
  function reading(text,personId,workId){return button(text,()=>{window.dispatchEvent(new CustomEvent('atlas:open-work',{detail:{personId,workId}}));},'read-'+workId);}
  function architectures(){
   const m=core.models.find(x=>x.id===model);body.append(n('h4','','같은 창고를 로봇 중심·바닥 중심·격자·그래프로 표현한다'),p('무엇을 토큰으로 만들고 어떤 관계를 보존할지에 따라 모델의 가정이 달라진다. 먼저 원아키텍처를 읽고, 아래의 같은 작은 장면을 다른 표현으로 본다.'));
   body.append(choices(core.models.map(m=>[m.id,m.name]),model,v=>{model=v;render();announce('선택한 설계: '+core.models.find(m=>m.id===v).name);},'model'));
   const paper=n('div','log-paper');body.append(paper);if(window.AtlasPaperArchitecture){const mounted=window.AtlasPaperArchitecture.mount(paper,'deepfleet-2025-original-'+model);sourceCleanup=typeof mounted==='function'?mounted:()=>mounted?.remove();}else paper.append(p('원도판 모듈을 불러오지 못했습니다. 아래 참고문헌의 v1 PDF에서 Figure'+m.figure+'를 확인할 수 있습니다.','log-source'));
   const authored=n('section','log-authored');authored.append(n('span','log-eyebrow','같은 장면으로 직접 재구성'),n('h5','',m.title),p(m.bias));const scene=core.scenario(),agents=scene.agents,selected=agents.find(a=>a.id===selectedRobot);let highlight=[],graph=false;
   if(model==='rc'){authored.append(choices(agents.map(a=>[a.id,'기준 로봇 '+a.id]),selectedRobot,v=>{selectedRobot=v;render();},'robot'));highlight=core.reach(scene,selected.start,1);authored.append(p('색이 있는 인접 칸은 기준 로봇의 국소 문맥을 나타냅니다. 실제 RC의 위치·방향 정규화나 Transformer 가중치를 계산한 것이 아닙니다.','log-note'));}
   else if(model==='rf'){highlight=agents.map(a=>a.start);authored.append(p('로봇별 이력 토큰과 고정된 바닥 토큰, 다른 로봇의 스냅숏을 별도로 두고 서로 참고합니다. 이 그림의 연결은 실제 attention 가중치가 아닙니다.','log-note'));}
   else if(model==='if'){authored.append(choices([['all','채널 합쳐 보기'],['robot','로봇 위치 채널'],['goal','목표 위치 채널']],channel,v=>{channel=v;render();},'channel'));authored.append(p('같은 좌표 위에 여러 종류의 정보를 채널로 쌓습니다. 로봇·목표 채널을 바꿔도 선반 배경은 좌표를 맞춰 보기 위한 참조로 남깁니다. 카메라 사진에서 물체를 인식하는 모델을 뜻하지 않습니다.','log-note'));}
   else{graph=true;highlight=core.reach(scene,selected.start,hops);authored.append(choices([[1,'이웃 1단계'],[2,'이웃 2단계'],[3,'이웃 3단계']],hops,v=>{hops=v;render();},'hops'));authored.append(p('A에서 통로 엣지를 따라 닿는 노드만 강조합니다. 실제 GF의 학습된 메시지·시간 엣지·출력을 재현하지 않습니다. 시간 관계도 원도판 Figure10에서 함께 읽습니다.','log-note'));}
   const g=grid(core,scene,agents,{highlight,graph,channel:model==='if'?channel:'all'});if(model==='rf'){for(const a of agents.slice(1))line(g,agents[0].start,a.start,'log-context-link');}authored.append(viewport(g,m.name+'의 직접 만든 입력 표현'),flow([['입력',m.input],['처리',m.process.join(' → ')],['출력',m.output]]));body.append(authored,p('원문 위치 · v1 Figure'+m.figure+' (PDF'+m.sourcePage+'쪽), §§5–8. 위 원도판과 자체 격자 사이에는 모형의 표현을 읽는 대응만 있으며 실제 학습 결과의 비교는 없습니다.','log-source'));
  }
  function predict(){
   body.append(n('h4','','관찰된 행동을 맞히는 학습과, 충돌 없이 움직이게 하는 조건은 다르다'),p('RC의 행동 모형은 주어진 이력 뒤에 실제로 관찰된 행동의 확률을 높이도록 배운다. 학습 중에는 관측한 앞 행동을 입력하고, 미래 궤적을 굴릴 때는 예측한 행동과 환경 전이를 잇는다. 보상을 최대화하는 강화학습이라고 바꾸어 설명하지 않는다.'));
   body.append(flow([['학습 · 관측 이력','실제 기록의 앞 상태·행동을 조건으로 준다.'],['행동 분포','다음 행동들의 확률을 출력한다. 관측 행동의 −log 확률을 줄인다.'],['롤아웃 · 예측 행동','예측에서 선택한 행동이 다음 입력과 위치에 영향을 준다.'],['별도 환경 모형','회전·이동·적재 상태를 갱신하고 공간 점유·예약 제약을 적용한다.']]));
   const calc=n('div','log-callout'),slider=n('label','log-slider'),input=n('input');input.type='range';input.min=.05;input.max=.95;input.step=.05;input.value=probability;input.dataset.logControl='probability';slider.append(n('span','','가정한 관측 행동: 기다리기 · 그 행동에 준 확률 p'),input);const update=()=>{calc.replaceChildren(n('strong','',`p(wait) = ${probability.toFixed(2)} → −log p = ${core.nll(probability).toFixed(3)}`),p('확률은 직접 정했습니다. 이 한 행동의 손실 계산은 학습 방향을 설명하며 학습된 모델의 성능이나 불확실성 보정을 보여 주지 않습니다.'));};input.addEventListener('input',()=>{probability=Number(input.value);update();});body.append(slider,calc);update();
   const arbitration=n('section','log-authored'),b=button(priority?'B부터 검사':'A부터 검사',()=>{priority=!priority;render();announce('예약 검사 순서: '+(priority?'B, A':'A, B'));},'priority');b.setAttribute('aria-pressed',String(priority));arbitration.append(n('h5','','두 로봇이 같은 빈 칸으로 가려 하면?'),p('아래 제안은 직접 정한 것입니다. 먼저 검사한 로봇이 빈 칸을 예약하면 다른 로봇은 대기합니다. 예측 모형이 제안한 행동 자체가 실행 허가를 뜻하지 않습니다.'),b);
   const rows=core.arbitrate(priority).map(r=>[r.id,`(${r.position}) → (${r.proposal})`,r.accepted?'예약 후 이동':'점유 충돌 · 대기',`(${r.final})`]);arbitration.append(table(['로봇','정한 행동 제안','환경 모형의 판정','다음 위치'],rows,'직접 만든 한 시각의 순차 예약'));body.append(arbitration,p('원문 위치 · v1 PDF11–12 §5.2 Behavior Cloning/teacher forcing/NLL, §5.3 environment model의 정점 예약과 wait 처리. 이 최소 사례는 물리적 안전 제어나 RC 환경 모형 전체의 구현이 아닙니다.','log-source'));
  }
  function validation(){
   body.append(n('h4','','미래 궤적을 잘 맞혔다는 것과, 실제 운영이 개선됐다는 것은 다른 검증이다'),cards([['2025.06.30 · 공식 운영 발표','Amazon은 로봇군의 이동 조정이 이동 효율을10% 높였다고 발표했다. 이 회사 발표의 수치를 아래 격자에서 계산하거나 재현하지 않는다.'],['2025.08 · 원고 v1의 평가','감춰 둔7일·7개 바닥의 기록에서60초 미래를 롤아웃한다. 실제 기록과 예측의 위치·상태·타이밍 및 지연 특성 차이를 잰다.'],['직접 만든 작은 격자','경로 충돌·대기·완료 시각을 계산한다. 예측 정확도·운영 처리량·공식10% 개선의 대체 지표가 아니다.']]));
   body.append(table(['지표 / 조건','무엇을 비교하는가','해석 경계'],[['DTW position / state / timing','예측 궤적과 실제 궤적의 시공간 차이','인간 작업 처리량이나 배송 시간 단축이 아님'],['CDE · Congestion Delay Error','실제·예측 궤적의 지연 특성 차이','숫자가 낮을수록 예측 오차가 작다는 뜻, 운영 개선율이 아님'],['RC / RF / IF / GF 비교','Table2의 위치·상태·타이밍·혼잡 예측','모형 크기·훈련 시간·자료 문맥이 달라 구조 하나만의 효과를 분리하지 못함']],'원문 Table2를 읽을 때의 비교 대상'));
   body.append(p('v1 Table2에서는 RC가 위치·상태·혼잡 오차에서, RF가 타이밍 오차에서 더 작은 값을 보인다. GF는 비교한 모델 중 파라미터 수가 작다. 이 결과를 모든 창고·모든 예산에서의 구조 우열로 일반화하지 않는다.'),flow([['Kiva2008 · 작업과 길의 조율','명시한 임무·통로·배정·계획으로 여러 로봇을 함께 움직인다.'],['DeepAR2017 · 수요의 미래','여러 시계열의 공유 패턴에서 확률적인 미래 수요를 표현한다.'],['DeepFleet2025 · 상호작용의 미래','로봇군의 이동 기록을 예측하여 혼잡·계획과 관련된 미래 상태를 연구한다.']]));
   body.append(reading('Kiva · 명시한 자원과 경로의 조율','peter-r-wurman','kiva-warehouse-coordination-2008'),reading('DeepAR · 여러 수요 이력의 공유 모델','valentin-flunkert','amazon-deepar-2017'),p('읽기 경로 · 수요·재고·물류의 역할이 만나는 문제를 비교합니다. 이 세 연구가 실제 Amazon의 한 파이프라인으로 통합됐다고 주장하지 않습니다. 원문 위치 · v1 PDF6–7 §4·Table2, Amazon Science Evaluation,6월 공식 운영 발표.','log-source'));
  }
  render();return()=>{sourceCleanup?.();root.remove();};
 }
 window.AtlasVisuals.register('amazon-kiva-coordination',{mount:host=>mount(host,'kiva')});
 window.AtlasVisuals.register('amazon-deepfleet-designs',{mount:host=>mount(host,'fleet')});
})();
