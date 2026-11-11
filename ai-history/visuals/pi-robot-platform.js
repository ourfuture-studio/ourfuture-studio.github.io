/* Source-bound conceptual figures and small authored arithmetic, no model/API calls. */
(function(){
 'use strict';
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
 const svg=(tag,attrs={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;return el;};
 const button=(text,fn,cls='')=>{const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;};
 function mount(host){
  const core=window.AtlasPiRobotPlatform,root=node('div','pi-robot-platform');host.append(root);
  let viewId=core.views[0].id,selected=core.select(viewId,core.getView(viewId).initial),exampleId=core.examples[0].id,choiceId=core.examples[0].choices[0].id,exampleOpen=true;
  const tabs=node('div','prp-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label',core.title+' · 세 가지 보기');
  const title=node('h4','prp-title'),intro=node('p','prp-intro'),drawing=node('div','prp-drawing');drawing.tabIndex=0;drawing.setAttribute('aria-label','원문을 참고해 직접 그린 역할 그림. 작은 화면에서는 가로로 이동할 수 있습니다.');
  const hint=node('p','prp-hint','그림을 가로로 밀어 전체 연결을 보고, 항목을 눌러 의미와 근거를 읽으세요.');
  const roles=node('div','prp-roles');roles.setAttribute('role','group');roles.setAttribute('aria-label','항목의 핵심 아이디어와 근거 선택');
  const controls=node('div','prp-controls'),previous=button('← 앞 항목',()=>choose(core.step(viewId,selected.node.id,-1).node.id)),next=button('다음 항목 →',()=>choose(core.step(viewId,selected.node.id,1).node.id)),progress=node('span','prp-progress');previous.dataset.prpStep='previous';next.dataset.prpStep='next';controls.append(previous,progress,next);
  const detail=node('section','prp-detail');detail.setAttribute('role','region');detail.setAttribute('aria-label','선택한 항목의 아이디어와 관계');detail.setAttribute('aria-live','polite');
  const exampleToggle=button('작은 사례 접기',()=>{exampleOpen=!exampleOpen;renderExample();},'prp-example-toggle');exampleToggle.dataset.prpExampleToggle='';
  const example=node('section','prp-example');example.setAttribute('aria-label','직접 구성한 작은 표현·계산 사례');
  const scope=node('p','prp-scope'),sources=node('div','prp-sources'),bridge=node('section','prp-bridge');
  bridge.append(node('span','prp-eyebrow','기존 연구와 인물·기업에서 이어 읽기'),node('h4','','방법의 근거에서, 그 방법을 연구한 사람과 조직으로'),node('p','','공동연구는 원논문으로, 회사 역할·협력은 공식 발표로 확인합니다. ‘비교 읽기’는 다른 접근을 함께 읽는 링크이며 새 회사 협력 관계를 뜻하지 않습니다.'));
  const links=node('div','prp-bridge-links');for(const link of core.bridges)links.append(routeLink(link));bridge.append(links);
  root.append(node('span','prp-eyebrow','LEARNING REPRESENTATIONS / RESEARCH QUESTIONS / ORGANIZATIONS AND CONDITIONS'),tabs,title,intro,drawing,hint,roles,controls,detail,exampleToggle,example,scope,sources,bridge);
  for(const view of core.views){const b=button(view.label,()=>{viewId=view.id;selected=core.select(viewId,view.initial);const index=core.views.indexOf(view);if(index<2){exampleId=core.examples[index].id;choiceId=core.examples[index].choices[0].id;}render();},'prp-tab');b.dataset.prpView=view.id;tabs.append(b);}
  function routeLink(link){
   const href=link.type==='event'?'#event='+link.eventId:'#person='+link.personId+(link.type==='work'?'&work='+link.workId:'')+(link.filter==='industry'?'&filter=industry':'');
   const a=node('a','',link.label+' ↗');a.href=href;a.dataset.prpBridge=link.id;
   a.addEventListener('click',e=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();window.AtlasSearch?.reset();
    if(link.type==='event')window.dispatchEvent(new CustomEvent('atlas:open-event',{detail:{id:link.eventId}}));
    else window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:link.type==='work'?'work':'person',personId:link.personId,workId:link.workId,filter:link.filter}}));
   });return a;
  }
  function choose(id){selected=core.select(viewId,id);renderSelection();}
  function render(){
   const view=core.getView(viewId);title.textContent=view.title;intro.textContent=view.intro;scope.textContent=view.scope;
   for(const tab of tabs.children)tab.setAttribute('aria-pressed',String(tab.dataset.prpView===viewId));
   roles.replaceChildren();view.nodes.forEach((r,index)=>{const b=button('',()=>choose(r.id),'prp-role');b.dataset.prpNode=r.id;b.setAttribute('aria-label',r.label+' · 아이디어와 근거 보기');b.append(node('span','prp-number',String(index+1).padStart(2,'0')),node('strong','',r.label),node('span','',r.short));roles.append(b);});renderSelection();
  }
  function renderSelection(){
   const view=core.getView(viewId),r=selected.node,index=view.nodes.findIndex(x=>x.id===r.id);
   for(const b of roles.children)b.setAttribute('aria-pressed',String(b.dataset.prpNode===r.id));previous.disabled=index===0;next.disabled=index===view.nodes.length-1;progress.textContent=(index+1)+' / '+view.nodes.length;
   detail.replaceChildren(node('span','prp-eyebrow',r.short),node('h5','',r.label));const cells=node('div','prp-io');
   for(const[label,value]of[['어떤 문제·경험에서',r.input],['핵심 아이디어와 역할',r.role],['무엇으로 이어지는가',r.output]]){const cell=node('div');cell.append(node('span','',label),node('p','',value));cells.append(cell);}detail.append(cells);
   const related=node('div','prp-relationships');for(const edge of selected.connections){const from=view.nodes.find(n=>n.id===edge.from),to=view.nodes.find(n=>n.id===edge.to);related.append(node('p','',from.label+' — '+edge.label+' → '+to.label));}if(related.children.length)detail.append(related);
   sources.replaceChildren();for(const id of new Set([...r.sourceIds,...selected.connections.flatMap(e=>e.sourceIds)])){const s=core.sources[id],item=node('div','prp-source'),a=node('a','',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';item.append(a,node('span','',s.location));sources.append(item);}
   draw(view);renderExample();
  }
  function draw(view){
   drawing.replaceChildren();const image=svg('svg',{viewBox:'0 0 940 '+view.height,role:'img','aria-label':view.title+' · 선택: '+selected.node.label});image.append(svg('title',{},view.title),svg('desc',{},view.intro));
   if(view.bands)for(const band of view.bands)image.append(svg('rect',{x:24,y:band.y,width:892,height:145,rx:9,'class':'prp-band'}),svg('text',{x:42,y:band.y+20,'class':'prp-svg-caption'},band.label));
   else image.append(svg('text',{x:25,y:25,'class':'prp-svg-caption'},view.label));
   for(const edge of view.edges){const a=view.positions[edge.from],b=view.positions[edge.to],dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length,start=[a[0]+ux*35,a[1]+uy*35],end=[b[0]-ux*35,b[1]-uy*35],active=edge.from===selected.node.id||edge.to===selected.node.id;
    const path='M '+start.join(' ')+' L '+end.join(' ')+' M '+(end[0]-ux*9-uy*4)+' '+(end[1]-uy*9+ux*4)+' L '+end.join(' ')+' L '+(end[0]-ux*9+uy*4)+' '+(end[1]-uy*9-ux*4);
    image.append(svg('path',{d:path,'class':'prp-arrow'+(active?' is-connected':'')+(edge.kind!=='method'?' is-dashed':'')}),svg('text',{x:(a[0]+b[0])/2+uy*13,y:(a[1]+b[1])/2-ux*13,'text-anchor':'middle','class':'prp-edge-label'},edge.label));
   }
   for(const r of view.nodes){const[x,y]=view.positions[r.id],g=svg('g',{'data-prp-drawing-node':r.id,role:'button',tabindex:'0','aria-label':r.label+' · 아이디어와 근거 보기','aria-pressed':String(r.id===selected.node.id),'class':'prp-svg-role'+(r.id===selected.node.id?' is-selected':'')});g.append(svg('circle',{cx:x,cy:y,r:29,'class':'prp-disc'}));icon(g,r.icon,x,y);g.append(svg('text',{x,y:y+51,'text-anchor':'middle','class':'prp-svg-label'},r.label));g.addEventListener('click',()=>choose(r.id));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(r.id);}});image.append(g);}drawing.append(image);
   if(drawing.clientWidth&&drawing.scrollWidth>drawing.clientWidth)drawing.scrollLeft=Math.max(0,drawing.scrollWidth*view.positions[selected.node.id][0]/940-drawing.clientWidth/2);
  }
  function renderExample(){
   const hidden=core.views.indexOf(core.getView(viewId))===2;exampleToggle.hidden=hidden;exampleToggle.setAttribute('aria-expanded',String(exampleOpen));exampleToggle.textContent=exampleOpen?'작은 사례 접기':'작은 사례 함께 보기';example.hidden=hidden||!exampleOpen;example.replaceChildren();if(example.hidden)return;
   const spec=core.examples.find(e=>e.id===exampleId),result=core.calculate(exampleId,choiceId);choiceId=result.choiceId;example.dataset.prpExamplePanel=exampleId;
   example.append(node('span','prp-eyebrow','직접 정한 작은 사례 · 실제 모형·로봇·API 실행 결과 아님'),node('h5','',spec.question));
   const cases=node('div','prp-case-tabs');cases.setAttribute('role','group');cases.setAttribute('aria-label','작은 사례 선택');for(const item of core.examples){const b=button(item.label,()=>{exampleId=item.id;choiceId=item.choices[0].id;viewId=core.views[core.examples.indexOf(item)].id;selected=core.select(viewId,core.getView(viewId).initial);render();},'prp-case');b.dataset.prpCase=item.id;b.setAttribute('aria-pressed',String(item.id===exampleId));cases.append(b);}example.append(cases);
   const choices=node('div','prp-choices');choices.setAttribute('role','group');choices.setAttribute('aria-label',spec.label+' · 가정 선택');for(const item of spec.choices){const b=button(item.label,()=>{choiceId=item.id;renderExample();});b.dataset.prpChoice=item.id;b.setAttribute('aria-pressed',String(item.id===result.choiceId));choices.append(b);}example.append(choices);
   const picture=node('div','prp-case-drawing');drawExample(picture,result);example.append(picture);
   const computed=node('div','prp-computed');computed.dataset.prpResult=result.choiceId;computed.append(node('strong','',result.headline),node('p','prp-formula',result.formula),node('p','',result.note));example.append(computed,node('p','prp-boundary',spec.scope));
  }
  function drawExample(container,result){
   const image=svg('svg',{viewBox:'0 0 760 300',role:'img','aria-label':'직접 정한 작은 사례 · '+result.headline});
   
   if(result.type==='adaptation'){
    const px=value=>85+(value+2)*90;image.append(svg('text',{x:28,y:28,'class':'prp-mini-label'},'원논문 Fig.1의 적응·시작점 구분을 참고한 한 변수 사례'));
    result.rows.forEach((r,i)=>{const y=75+i*82;image.append(svg('path',{d:'M 70 '+y+' H 690','class':'prp-axis'}),svg('circle',{cx:px(r.target),cy:y,r:9,'class':'prp-target'}),svg('circle',{cx:px(result.theta),cy:y,r:7,'class':'prp-start'}),svg('path',{d:'M '+px(result.theta)+' '+(y-15)+' H '+px(r.adapted),'class':'prp-adapt-line'}),svg('circle',{cx:px(r.adapted),cy:y-15,r:6,'class':'prp-adapted'}),svg('text',{x:28,y:y+5,'class':'prp-mini-label'},r.label),svg('text',{x:85,y:y+31,'class':'prp-mini-small'},'목표 '+r.target+' · 적응 '+r.adapted.toFixed(2)+' · 손실 '+r.after.toFixed(3)));});
   }else{
    const px=ms=>60+ms*.48;image.append(svg('text',{x:28,y:30,'class':'prp-mini-label'},'준비된 명령 1000ms · 지연 수치는 직접 가정'));
    image.append(svg('path',{d:'M 60 240 H 700','class':'prp-axis'}),svg('rect',{x:60,y:80,width:480,height:60,rx:5,'class':'prp-bar is-selected'}),svg('text',{x:80,y:115,'class':'prp-mini-label'},'기존 명령 버퍼 · 0–1000ms'),svg('path',{d:'M '+px(result.latency)+' 55 V 235','class':'prp-arrival'}),svg('text',{x:Math.max(80,px(result.latency)-75),y:195,'class':'prp-mini-label'},'새 결과 '+result.latency+'ms'));
    if(result.gap)image.append(svg('rect',{x:px(1000),y:80,width:result.gap*.48,height:60,'class':'prp-gap'}),svg('text',{x:px(1000)+5,y:160,'class':'prp-mini-small'},'가정한 공백 '+result.gap+'ms'));
    for(const ms of [0,500,1000])image.append(svg('text',{x:px(ms),y:267,'text-anchor':'middle','class':'prp-mini-small'},ms+'ms'));
   }

   container.append(image);
  }
  function icon(g,type,x,y){
   const p=d=>g.append(svg('path',{d,'class':'prp-icon'})),dot=(a,b,r=2)=>g.append(svg('circle',{cx:a,cy:b,r,'class':'prp-dot'}));
   if(type==='person'||type==='people'){g.append(svg('circle',{cx:x,cy:y-9,r:6,'class':'prp-icon'}));p('M '+(x-13)+' '+(y+14)+' Q '+(x-13)+' '+y+' '+x+' '+y+' Q '+(x+13)+' '+y+' '+(x+13)+' '+(y+14));if(type==='people')p('M '+(x+14)+' '+(y-11)+' q 9 1 6 9 M '+(x+15)+' '+(y+3)+' q 9 2 8 11');}
   else if(type==='company'){p('M '+(x-16)+' '+(y+16)+' h 32 M '+(x-12)+' '+(y+16)+' v -29 h 24 v 29 M '+(x-4)+' '+(y+16)+' v -9 h 8 v 9');dot(x-5,y-4);dot(x+5,y-4);}
   else if(type==='chip'){p('M '+(x-12)+' '+(y-12)+' h 24 v 24 h -24 z');for(let i=-1;i<=1;i++)p('M '+(x+i*8)+' '+(y-19)+' v 7 M '+(x+i*8)+' '+(y+12)+' v 7 M '+(x-19)+' '+(y+i*8)+' h 7 M '+(x+12)+' '+(y+i*8)+' h 7');}
   else if(type==='model'){for(let i=0;i<3;i++)for(let j=0;j<2;j++){const a=x-15+i*15,b=y-9+j*18;dot(a,b);if(i<2)p('M '+(a+3)+' '+b+' L '+(a+12)+' '+(y-9)+' M '+(a+3)+' '+b+' L '+(a+12)+' '+(y+9));}}
   else if(type==='robot'){p('M '+(x-15)+' '+(y-12)+' h 30 v 24 h -30 z M '+x+' '+(y-12)+' v -6 M '+(x-20)+' '+(y-4)+' v 12 M '+(x+20)+' '+(y-4)+' v 12 M '+(x-7)+' '+(y+12)+' v 6 M '+(x+7)+' '+(y+12)+' v 6');dot(x-6,y-4,2.5);dot(x+6,y-4,2.5);p('M '+(x-6)+' '+(y+5)+' h 12');}
   else if(type==='image'){p('M '+(x-18)+' '+(y-14)+' h 36 v 28 h -36 z M '+(x-14)+' '+(y+9)+' l 10 -12 10 12 8 -8');dot(x+8,y-7,3);}
   else if(type==='chart'){p('M '+(x-17)+' '+(y+15)+' h 35 M '+(x-12)+' '+(y+10)+' v -11 M '+x+' '+(y+10)+' v -19 M '+(x+12)+' '+(y+10)+' v -28');}
   else if(type==='check'){p('M '+(x-17)+' '+y+' l 11 12 24 -26');}
   else if(type==='question'){g.append(svg('text',{x,y:y+10,'text-anchor':'middle','class':'prp-question'},'?'));}
   else if(type==='tools'){p('M '+(x-15)+' '+(y-13)+' l 10 10 -6 6 -10 -10 M '+(x-7)+' '+(y+7)+' l 17 -17 6 6 -17 17 z');}
   else if(type==='tokens'){for(let i=-1;i<=1;i++){p('M '+(x+i*13-5)+' '+(y-8)+' h 10 v 16 h -10 z');}}
   else{p('M '+(x-15)+' '+(y-17)+' h 22 l 8 8 v 26 h -30 z M '+(x+7)+' '+(y-17)+' v 9 h 8 M '+(x-8)+' '+(y-1)+' h 17 M '+(x-8)+' '+(y+7)+' h 13');}
  }
  render();return()=>root.remove();
 }
 window.AtlasVisuals.register('pi-robot-platform',{mount});
})();
