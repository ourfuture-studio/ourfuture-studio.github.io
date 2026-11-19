/* Code-native illustrations and computed planar examples, not an Optimus replica. */
(function(){
 'use strict';
 const n=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
 const s=(tag,attrs={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;return el;};
 const text=(g,x,y,value,cls='opt-svg-text',anchor='middle')=>g.append(s('text',{x,y,class:cls,'text-anchor':anchor},value));
 const button=(label,fn,id)=>{const b=n('button','',label);b.type='button';b.dataset.optControl=id;b.addEventListener('click',fn);return b;};
 const p=(value,cls='opt-prose')=>n('p',cls,value),fmt=value=>value.toFixed(3),xy=v=>'('+v.map(fmt).join(', ')+')';
 const point=([x,y])=>[230+x*400,370-y*400];
 function choices(items,value,change,id){const box=n('div','opt-options');for(const[v,label]of items){const b=button(label,()=>change(v),id+'-'+v);b.setAttribute('aria-pressed',String(v===value));box.append(b);}return box;}
 function slider(label,min,max,step,value,change,id){const box=n('label','opt-slider'),row=n('span'),out=n('output','',String(value)),input=n('input');input.type='range';input.min=min;input.max=max;input.step=step;input.value=value;input.dataset.optControl=id;input.setAttribute('aria-label',label);row.append(n('span','',label),out);input.addEventListener('input',()=>{out.value=input.value;out.textContent=input.value;change(Number(input.value));});box.append(row,input);return box;}
 function callout(title,copy){const box=n('div','opt-callout');box.append(n('strong','',title),p(copy));return box;}
 function flow(items){const ol=n('ol','opt-flow');for(const[title,copy]of items){const li=n('li');li.append(n('strong','',title),n('span','',copy));ol.append(li);}return ol;}
 function cards(items){const box=n('div','opt-cards');for(const[title,copy]of items){const c=n('section','opt-card');c.append(n('h5','',title),p(copy));box.append(c);}return box;}
 function diagram(core,{geometry,target,workspace=false,recorded=null,trace=null,obstacle=null,ghost=false,proposal=null}){
  const hand=geometry?.hand,summary=(target?'목표 '+xy(target)+'. ':'')+(hand?'손끝 '+xy(hand)+'. ':'')+(ghost?'목표를 풀지 못해 참조 자세를 표시. ':'');
  const g=s('svg',{viewBox:'0 0 800 490',role:'img','aria-label':'직접 만든 두 관절 평면 팔. '+summary});g.append(s('title',{},'자체 두 링크 팔의 좌표와 움직임'));
  if(workspace){g.append(s('circle',{cx:230,cy:370,r:320,class:'opt-workspace'}),s('circle',{cx:230,cy:370,r:40,class:'opt-inner'}));text(g,480,74,'도달 영역: 0.10 ≤ r ≤ 0.80m','opt-svg-note');}
  for(let x=-.4;x<=1.2;x+=.2){const[cx]=point([x,0]);g.append(s('path',{d:`M${cx},45V460`,class:'opt-grid-line'}));}
  for(let y=-.2;y<=.8;y+=.2){const[,cy]=point([0,y]);g.append(s('path',{d:`M50,${cy}H740`,class:'opt-grid-line'}));}
  g.append(s('path',{d:'M50,370H740M230,460V40',class:'opt-axis'}));text(g,735,391,'x (m)','opt-svg-note');text(g,244,44,'y','opt-svg-note');text(g,242,391,'0','opt-svg-note');
  /* Friendly invented silhouette; it does not assert Tesla physical dimensions. */
  g.append(s('rect',{x:122,y:280,width:82,height:62,rx:24,class:'opt-head'}),s('rect',{x:131,y:293,width:64,height:33,rx:15,class:'opt-face'}),s('circle',{cx:149,cy:308,r:5,class:'opt-eye'}),s('circle',{cx:178,cy:308,r:5,class:'opt-eye'}),s('path',{d:'M154,319Q163,324 173,319',class:'opt-smile'}),s('rect',{x:152,y:342,width:24,height:13,rx:6,class:'opt-joint'}),s('rect',{x:130,y:355,width:75,height:83,rx:23,class:'opt-body'}),s('path',{d:'M147,438V461M188,438V461',class:'opt-leg'}),s('path',{d:'M205,370H230',class:'opt-arm-base'}));
  if(obstacle){const[cx,cy]=point(obstacle.center);g.append(s('circle',{cx,cy,r:obstacle.radius*400,class:'opt-obstacle'}),s('circle',{cx,cy,r:(obstacle.radius+.02)*400,class:'opt-obstacle-margin'}));text(g,cx,cy-40,'장애물 + 자체 여유 반경','opt-svg-note');}
  if(trace){const d=trace.map((v,i)=>{const[x,y]=point(v.position);return(i?'L':'M')+x+','+y;}).join('');g.append(s('path',{d,class:'opt-trace'}));}
  if(recorded){const[cx,cy]=point(recorded);g.append(s('circle',{cx,cy,r:9,class:'opt-recorded'}));text(g,cx,cy-17,'시범의 손끝','opt-svg-note');}
  if(geometry){const[ex,ey]=point(geometry.elbow),[hx,hy]=point(geometry.hand),group=s('g',{class:ghost?'opt-ghost':''});group.append(s('path',{d:`M230,370L${ex},${ey}L${hx},${hy}`,class:'opt-arm'}),s('circle',{cx:230,cy:370,r:14,class:'opt-joint'}),s('circle',{cx:ex,cy:ey,r:12,class:'opt-joint'}),s('circle',{cx:hx,cy:hy,r:11,class:'opt-hand'}),s('path',{d:`M${hx-7},${hy-12}L${hx-14},${hy-5}M${hx+7},${hy-12}L${hx+14},${hy-5}`,class:'opt-gripper'}));g.append(group);text(g,ex-15,ey-18,'팔꿈치','opt-svg-note');}
  if(target){const[cx,cy]=point(target);g.append(s('rect',{x:cx-11,y:cy-11,width:22,height:22,rx:5,class:'opt-object'}));text(g,cx,cy+30,'현재 목표','opt-svg-note');}
  if(proposal&&geometry){const[a,b]=point(geometry.hand),[c,d]=point(proposal);g.append(s('path',{d:`M${a},${b}L${c},${d}`,class:'opt-rejected'}),s('circle',{cx:c,cy:d,r:9,class:'opt-rejected-point'}));}
  text(g,480,476,'길이·좌표·몸 모양은 자체 설정 · 실제 Optimus 치수가 아님','opt-svg-note');return g;
 }
 function viewport(g){const box=n('div','opt-viewport');box.tabIndex=0;box.setAttribute('role','region');box.setAttribute('aria-label','계산한 팔 그림 · 좁은 화면에서는 가로 이동');box.append(g);return box;}
 function mount(host){
  const core=window.AtlasTeslaOptimusCore;if(!core)throw Error('Load Optimus core first.');const root=n('div','tesla-optimus'),nav=n('nav','opt-nav'),body=n('div','opt-body-panel'),live=p('','opt-live');
  const stages=['01 관찰·시범·행동의 연결','02 몸이 닿을 수 있는 곳','03 배우기와 검증을 나눈다'];let stage=0,frame=0,shift=false,feedback=true,mode='target',x=.55,y=.15,branch=1,q1=50,q2=-70,caseId='same',guard=true,index=0;
  nav.setAttribute('aria-label','Optimus를 읽는 세 관점');live.setAttribute('role','status');live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');const announce=value=>{live.textContent=value;};
  stages.forEach((title,i)=>{const b=button(title,()=>{stage=i;render();announce(title+' 화면을 표시했습니다.');},'stage-'+i);b.dataset.optStage=i;nav.append(b);});
  root.append(nav,p('공식 개발 자료를 읽기 위해 직접 만든 계산 · 실제 Optimus의 망·전신 제어·실험 결과를 재현하지 않습니다.','opt-scope'),body,live);host.append(root);
  function render(){const focus=document.activeElement?.dataset.optControl;body.replaceChildren();root.dataset.optStage=stage;for(const b of nav.children)b.setAttribute('aria-pressed',String(Number(b.dataset.optStage)===stage));[learning,kinematics,execution][stage]();if(focus)root.querySelector('[data-opt-control="'+focus+'"]')?.focus({preventScroll:true});}
  function learning(){
   body.append(n('h4','','움직임을 기록하는 단계와, 지금의 장면에서 행동하는 단계를 나눈다'),p('사람의 행동 기록은 학습에 쓸 자료가 될 수 있다. 실행할 때는 현재 물체와 자기 몸의 상태를 다시 읽어야 한다. 같은 시범의 끝 위치를 반복하는 경우와 현재 물체 위치를 반영하는 경우를 비교한다.'));
   body.append(flow([['관찰','장면의 물체와 몸의 상태를 읽는다.'],['시범 데이터','관찰과 사람의 행동을 대응시켜 기록한다.'],['배운 행동','새 관찰에서 다음 움직임을 제안한다.'],['실행 피드백','상태 변화를 다시 관찰하고 결과를 확인한다.']]));
   body.append(choices([[false,'기준 장면'],[true,'물체를 오른쪽으로 이동']],shift,v=>{shift=v;render();announce(v?'현재 물체를0.12m 옮긴 자체 사례입니다.':'기준 장면입니다.');},'shift'),choices([[true,'현재 위치를 반영하는 자체 보정'],[false,'시범 좌표 그대로 재생']],feedback,v=>{feedback=v;render();},'feedback'));
   const picture=n('div'),result=n('div');function update(){const r=core.replay({frame,shift,feedback});root.dataset.optFrame=frame;root.dataset.optFeedback=feedback;picture.replaceChildren(viewport(diagram(core,{geometry:r.geometry,target:r.object,recorded:r.recorded})));result.replaceChildren(callout(`기록 ${frame+1}/4 · ${r.phase}`,`표시 손끝 ${xy(r.hand)}m · 현재 물체 ${xy(r.object)}m · 거리 ${fmt(r.error)}m. ${feedback?'물체 이동량을 단계에 따라 더하는 자체 보정식을 썼습니다.':'기록한 손끝 좌표는 현재 물체가 바뀌어도 그대로입니다.'}`));}
   body.append(slider('직접 정한 시범 기록',0,3,1,frame,v=>{frame=v;update();},'frame'),picture,result,p('그림의 네 좌표와 보정식은 직접 정했습니다. 데이터로 모델을 학습하거나 Tesla의 관찰→행동 함수를 실행한 결과가 아닙니다. “배운 행동”은 역할을 설명하는 이름이며 공개된 모델 층·가중치의 도식이 아닙니다.','opt-note'));update();
   body.append(cards([['공식 설명으로 확인한 부분','2023 Sort & Stretch는 영상 입력에서 제어 출력으로 이어지는 end-to-end 학습을 회사의 주장으로 소개한다.'],['자료 수집의 근거','현재 공식 공고는 물체 조작·정한 경로·모션 캡처·기록과 품질 피드백을 적는다. 과거 전 시점의 수집 방법을 확정하지 않는다.'],['원격조작과 학습의 구분','시범을 기록하는 사람, 실행을 보조하는 사람, 학습한 모델의 독립 실행은 다르다. 특정 시연의 자율성은 그 시연의 조건을 따로 확인해야 한다.']]));
  }
  function kinematics(){
   body.append(n('h4','','같은 손끝 위치에도 다른 팔꿈치 자세가 있다'),p('목표 좌표를 관절 각도로 바꾸는 역기구학과, 관절 각도에서 손끝을 구하는 순기구학을 비교한다. 길이0.45m·0.35m의 평면 팔을 직접 가정했다.'));
   body.append(choices([['target','목표 좌표 → 관절 각도'],['joint','관절 각도 → 손끝 좌표']],mode,v=>{mode=v;render();},'mode'));
   const controls=n('div','opt-control-grid'),picture=n('div'),result=n('div');
   if(mode==='target'){controls.append(slider('목표 x (m)',-.35,.95,.01,x,v=>{x=v;update();},'target-x'),slider('목표 y (m)',-.15,.75,.01,y,v=>{y=v;update();},'target-y'));body.append(choices([[1,'팔꿈치 분기 +'],[-1,'팔꿈치 분기 −']],branch,v=>{branch=v;render();},'branch'));}
   else controls.append(slider('첫 관절 θ₁ (도)',-90,160,1,q1,v=>{q1=v;update();},'q1'),slider('둘째 관절 θ₂ (도)',-170,170,1,q2,v=>{q2=v;update();},'q2'));
   body.append(controls,picture,result);
   function update(){if(mode==='target'){const r=core.inverse(x,y,branch),reference=r.reachable?r:core.forward(core.rad(q1),core.rad(q2));picture.replaceChildren(viewport(diagram(core,{geometry:reference,target:[x,y],workspace:true,ghost:!r.reachable})));result.replaceChildren(r.reachable?callout(`θ₁ = ${core.deg(r.q1).toFixed(1)}° · θ₂ = ${core.deg(r.q2).toFixed(1)}°`,`순기구학으로 되돌린 손끝 ${xy(r.hand)}m · 목표와 오차 ${Math.hypot(r.hand[0]-x,r.hand[1]-y).toExponential(1)}m. 두 분기는 같은 손끝과 다른 팔꿈치를 만들 수 있습니다.`):callout('목표에 닿을 수 없습니다 · '+r.reason,`목표의 중심 거리 ${fmt(r.radius)}m. 도달 범위는0.10–0.80m입니다. 회색 팔은 현재의 참조 자세이며 이 목표를 푼 결과가 아닙니다.`));root.dataset.optReachable=r.reachable;}
    else{const r=core.forward(core.rad(q1),core.rad(q2));picture.replaceChildren(viewport(diagram(core,{geometry:r,workspace:true})));result.replaceChildren(callout('관절 각도에서 손끝 위치로',`θ₁=${q1}°, θ₂=${q2}° → 팔꿈치 ${xy(r.elbow)}m → 손끝 ${xy(r.hand)}m. θ₂는 첫 링크에 대한 상대 각도입니다.`));root.dataset.optReachable='joint';}}
   update();body.append(p('실제 Optimus의 팔 길이·관절 한계·하중이 아닙니다. 도달 가능은 이 평면 기하에서의 조건이며 팔 전체 충돌·모터 토크·몸의 균형·미끄러짐을 검증하지 않습니다. 완전히 펴진 경계에서는 두 분기가 합쳐집니다.','opt-note'),n('pre','opt-formula','x = L₁ cos θ₁ + L₂ cos(θ₁ + θ₂)\ny = L₁ sin θ₁ + L₂ sin(θ₁ + θ₂)\n도달 거리: |L₁ − L₂| ≤ r ≤ L₁ + L₂'));
  }
  function execution(){
   body.append(n('h4','','행동 제안 뒤에, 현재 조건에서의 실행 검증을 둔다'),p('같은 목표 추종식을 반복하되 물체 이동과 장애물·도달 범위를 바꿔 본다. 아래 계산은 학습한 정책 대신 사람이 정한 이동식이다. 실패 시 멈출 뿐 새로운 우회 경로를 자동으로 계획하지 않는다.'));
   body.append(choices(core.cases.map(c=>[c.id,c.label]),caseId,v=>{caseId=v;index=0;render();announce('검사 조건: '+core.cases.find(c=>c.id===v).label);},'case'),choices([[true,'현재 물체 위치 피드백'],[false,'과거 목표 고정']],feedback,v=>{feedback=v;index=0;render();},'loop'),choices([[true,'도달·손끝 경로 제약 검사'],[false,'제약을 끄고 결과 보기']],guard,v=>{guard=v;index=0;render();},'guard'));
   const r=core.rollout({caseId,feedback,guard}),picture=n('div'),status=n('div');index=Math.min(index,r.trace.length-1);
   const time=slider('표시 실행 단계',0,r.trace.length-1,1,index,v=>{index=v;update();},'step'),actions=n('div','opt-options');actions.append(button('처음',()=>{index=0;render();},'reset'),button('한 단계',()=>{index=Math.min(index+1,r.trace.length-1);render();announce('실행 단계: '+index);},'next'),button('마지막 결과',()=>{index=r.trace.length-1;render();announce('반복 계산의 마지막 결과입니다.');},'last'));
   body.append(time,actions,picture,status);
   function update(){const state=r.trace[index],pose=core.inverse(...state.position),reference=pose.reachable?pose:core.forward(core.rad(50),core.rad(-70));root.dataset.optCase=caseId;root.dataset.optStep=index;root.dataset.optGuard=guard;picture.replaceChildren(viewport(diagram(core,{geometry:reference,target:r.case.object,obstacle:r.case.obstacle,trace:r.trace.slice(0,index+1),ghost:!pose.reachable,proposal:state.proposal})));status.replaceChildren(callout(`단계 ${index}/${r.trace.length-1} · ${state.event}`,`현재 손끝 ${xy(state.position)}m · 목표까지 ${fmt(state.error)}m. ${state.violations.length?'검사에 걸린 조건: '+state.violations.join(', '):'이 최소 검사의 위반은 없습니다.'}${!pose.reachable?' 회색 팔은 도달 불가 좌표를 대신하는 참조 자세입니다.':''}`));}
   update();body.append(cards([['이번 조건의 마지막 결과',r.stopped?'제약 때문에 정지했다. 새 경로나 목표·자세를 검토할 필요가 있다.':r.violations?'제약을 끈 계산에 위반이 남았다. 좌표가 목표 근처여도 이 팔이 실행 가능한 경로나 자세라는 뜻은 아니다.':r.reached?'손끝이 목표 근처에 도착했다. 잡기·접촉·작업 완료를 검증한 결과는 아니다.':'남긴 반복 안에서 목표에 도착하지 못했다. 표시한 오차로 확인한다.'],['검사 범위','손끝 이동 선분과 원형 장애물, 고정 평면 팔의 도달 거리만 검사한다. 팔·손가락·몸통 충돌과 전신 균형은 생략한다.'],['반복 검증에서 더 필요한 것','성공률·사람 개입·다른 물체와 환경·접촉 힘·중단 조건을 따로 정하고 비교해야 한다. 여기서 실제 로봇 실험을 수행하지 않았다.']]));
   body.append(flow([['2022 · 프로토타입','공식 AI Day의 개발 단계 공개.'],['2023 · 개발 영상','Sort & Stretch와Gen2는 별도 날짜·공식 설명의 범위.'],['2026Q3 · 제조 보고','Fremont 생산 시작 보고, California Early Ramp·Texas Construction. 일반 작업 자율성의 입증과 구분.']]),p('최신 상태 확인:2026-11-19 ·2025 회계연도10-K(2026 공시)의 당시 미상업화와2026Q3의 제조 보고를 나누어 기록합니다. 제조 시작·개발 목표·편집 시연·독립 실행 성능은 서로 다른 근거입니다.','opt-note'));
  }
  render();return()=>root.remove();
 }
 window.AtlasVisuals.register('tesla-optimus-2022-detail',{mount});
})();
