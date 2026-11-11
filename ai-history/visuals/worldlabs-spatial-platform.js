/* Three source-bound views, with authored camera and compositing arithmetic. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const svg=(tag,attrs={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;return el;};
  const button=(text,fn,cls='')=>{const el=node('button',cls,text);el.type='button';el.addEventListener('click',fn);return el;};
  const fmt=value=>Number.isInteger(value)?String(value):value.toFixed(2);
  function mount(host){
    const core=window.AtlasWorldlabsSpatialPlatform,root=node('div','worldlabs-spatial-platform');host.append(root);
    let viewId='research',selected=core.select(viewId,core.getView(viewId).initial),caseId='projection',cameraId='center',orderId='red-front',showExample=true;
    const tabs=node('div','wsp-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','World Labs의 표현·제품·기업 관계 보기');
    const title=node('h4','wsp-title'),intro=node('p','wsp-intro');
    const drawing=node('div','wsp-drawing');drawing.tabIndex=0;drawing.setAttribute('aria-label','원논문과 공식 발표를 참고한 역할 개념도. 좁은 화면에서는 가로로 이동할 수 있습니다.');
    const hint=node('p','wsp-drawing-hint','그림을 가로로 밀고 항목을 눌러 역할과 원문 근거를 읽으세요. 점선은 비교·조건·발표의 경계를 표시합니다.');
    const roles=node('div','wsp-roles');roles.setAttribute('role','group');roles.setAttribute('aria-label','공간 모형 각 항목의 역할과 근거 선택');
    const controls=node('div','wsp-controls'),previous=button('← 앞 항목',()=>choose(core.step(viewId,selected.node.id,-1).node.id)),next=button('다음 항목 →',()=>choose(core.step(viewId,selected.node.id,1).node.id)),progress=node('span','wsp-progress');previous.dataset.wspStep='previous';next.dataset.wspStep='next';controls.append(previous,progress,next);
    const detail=node('section','wsp-detail');detail.setAttribute('role','region');detail.setAttribute('aria-label','선택한 공간 항목의 역할과 관계');detail.setAttribute('aria-live','polite');
    const toggle=button('두 공간 사례 접기',()=>{showExample=!showExample;renderSelection();},'wsp-example-toggle');toggle.dataset.wspExample='toggle';
    const example=node('section','wsp-example');example.setAttribute('aria-label','직접 구성한 두 공간 표현 사례');
    const timeline=node('section','wsp-timeline');timeline.setAttribute('aria-label','연구·제품·거래 발표의 시점을 나누어 읽기');
    const scope=node('p','wsp-scope'),sources=node('div','wsp-source-list'),bridge=node('section','wsp-bridge');
    bridge.append(node('span','wsp-eyebrow','기존 인물·연구에서 이어 읽기'),node('h4','','데이터 연구에서 공간·로봇·계산 기반의 질문으로'),node('p','','ImageNet·Visual Genome은 기존 연구 카드로 이어집니다. 황·핀·피블스 카드는 서로 다른 문제를 비교하는 읽기 연결입니다. 이 연결 자체를 개인의 협업·지도 관계로 주장하지 않습니다.'));
    const bridgeLinks=node('div','wsp-bridge-links');for(const item of core.bridges){const a=routeLink(item);a.dataset.wspBridge=item.id;bridgeLinks.append(a);}bridge.append(bridgeLinks);
    root.append(node('span','wsp-eyebrow','OBJECTS / RELATIONS / SPACE → WORLDS / PRODUCTS / EVIDENCE'),tabs,title,intro,drawing,hint,roles,controls,detail,toggle,example,timeline,scope,sources,bridge);
    for(const view of core.views){const b=button(view.label,()=>{viewId=view.id;selected=core.select(viewId,view.initial);render();},'wsp-tab');b.dataset.wspView=view.id;tabs.append(b);}
    function routeLink(item){
      const href=item.type==='event'?'#event='+item.eventId:'#person='+item.personId+(item.workId?'&work='+item.workId:'')+(item.filter==='industry'?'&filter=industry':'');
      const a=node('a','',item.label+' ↗');a.href=href;a.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset();if(item.type==='event')window.dispatchEvent(new CustomEvent('atlas:open-event',{detail:{id:item.eventId}}));else if(item.type==='work')window.dispatchEvent(new CustomEvent('atlas:open-work',{detail:{personId:item.personId,workId:item.workId,filter:item.filter}}));else window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:'person',personId:item.personId,filter:item.filter}}));});return a;
    }
    function sourceLink(id){const source=core.sources[id],a=node('a','',source.title+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';return a;}
    function choose(id){selected=core.select(viewId,id);renderSelection();}
    function render(){
      const view=core.getView(viewId);title.textContent=view.title;intro.textContent=view.intro;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.wspView===viewId));
      roles.replaceChildren();view.nodes.forEach((role,index)=>{const b=button('',()=>choose(role.id),'wsp-role');b.dataset.wspNode=role.id;b.setAttribute('aria-label',role.label+' · 역할과 근거 보기');b.append(node('span','wsp-role-number',String(index+1).padStart(2,'0')),node('strong','',role.label),node('span','',role.short));roles.append(b);});
      scope.textContent=view.scope;timeline.replaceChildren();timeline.hidden=viewId==='research';
      if(!timeline.hidden){timeline.append(node('span','wsp-eyebrow','모형·제품·연구 미리보기·조건부 계약은 다른 사건'));const list=node('div','wsp-milestones');for(const item of core.milestones){const cell=node('div','wsp-milestone');cell.append(node('span','wsp-date',item.date),node('strong','',item.title),node('p','',item.text),sourceLink(item.sourceId));list.append(cell);}timeline.append(list);}
      renderSelection();
    }
    function renderSelection(){
      const view=core.getView(viewId),role=selected.node;for(const b of roles.children)b.setAttribute('aria-pressed',String(b.dataset.wspNode===role.id));previous.disabled=!selected.hasPrevious;next.disabled=!selected.hasNext;progress.textContent=(selected.index+1)+' / '+view.nodes.length;
      detail.replaceChildren();detail.append(node('span','wsp-eyebrow',role.type),node('h5','',role.label));const io=node('div','wsp-io');for(const[label,value]of[['들어오는 것',role.input],['이 역할이 하는 일',role.role],['다음에 전하는 것',role.output]]){const cell=node('div');cell.append(node('span','',label),node('p','',value));io.append(cell);}detail.append(io);
      if(viewId==='connections'){const relations=node('div','wsp-relationships');for(const edge of selected.connections){const from=core.nodes.find(x=>x.id===edge.from),to=core.nodes.find(x=>x.id===edge.to);relations.append(node('p','',from.label+' — '+edge.label+' → '+to.label));}if(role.id==='amd')relations.append(node('p','wsp-announcement','조건부 발표 · 예상 종결은 2026년 말, 승인 등 조건 충족 필요. 완료된 인수·취임으로 표시하지 않습니다.'));detail.append(relations);}
      if(role.id==='nvidia')detail.append(routeLink(core.bridges.find(x=>x.id==='work-huang-cuda')));
      toggle.hidden=viewId!=='research';toggle.setAttribute('aria-pressed',String(showExample));toggle.textContent=showExample?'두 공간 사례 접기':'두 공간 사례 함께 보기';example.hidden=viewId!=='research'||!showExample;example.replaceChildren();if(!example.hidden)renderExample();
      sources.replaceChildren();for(const id of new Set([...role.sourceIds,...selected.connections.flatMap(x=>x.sourceIds)])){const cell=node('div','wsp-source');cell.append(sourceLink(id),node('span','',core.sources[id].location));sources.append(cell);}draw(view);
    }
    function renderExample(){
      const data=core.getExample(caseId);example.replaceChildren();example.dataset.wspExamplePanel=caseId;example.append(node('span','wsp-eyebrow','직접 정한 작은 공간 · 실제 모형·API 출력 아님'),node('h5','',data.question));
      const choices=node('div','wsp-case-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','직접 구성한 공간 사례 선택');for(const id of core.exampleIds){const b=button(core.getExample(id).label,()=>{caseId=id;renderExample();},'wsp-case');b.dataset.wspCase=id;b.setAttribute('aria-pressed',String(caseId===id));choices.append(b);}example.append(choices);
      if(caseId==='projection')renderProjection();else renderCompositing();example.append(node('p','wsp-example-boundary',data.scope));
    }
    function renderProjection(){
      const data=core.projectionCase(cameraId),choices=node('div','wsp-small-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','직접 정한 카메라 위치 선택');for(const camera of core.getExample('projection').cameras){const b=button(camera.label,()=>{cameraId=camera.id;renderExample();});b.dataset.wspCamera=camera.id;b.setAttribute('aria-pressed',String(cameraId===camera.id));choices.append(b);}example.append(choices);
      const picture=svg('svg',{viewBox:'0 0 820 350',role:'img','aria-label':'직접 정한 두 점과 카메라를 위에서 본 배치, 그리고 그 점들의 수평 영상 좌표'});picture.append(svg('rect',{x:15,y:12,width:375,height:320,rx:9,'class':'wsp-case-box'}),svg('rect',{x:420,y:12,width:385,height:320,rx:9,'class':'wsp-case-box'}),svg('text',{x:33,y:38,'class':'wsp-svg-caption'},'위에서 본 X–Z 배치 · 임의 단위'),svg('text',{x:440,y:38,'class':'wsp-svg-caption'},'영상의 수평 좌표 u · f=120'));
      const cameraX=145+data.camera.x*65,cameraY=285;picture.append(svg('path',{d:'M 55 285 H 350 M 55 285 V 65','class':'wsp-mini-axis'}),svg('text',{x:348,y:306,'class':'wsp-mini-label'},'X'),svg('text',{x:36,y:68,'class':'wsp-mini-label'},'Z'));
      for(const point of data.projected){const x=145+point.x*65,y=285-point.z*23.75;picture.append(svg('path',{d:'M '+cameraX+' '+cameraY+' L '+x+' '+y,'class':'wsp-case-ray',stroke:point.color}),svg('circle',{cx:x,cy:y,r:8,fill:point.color}),svg('text',{x:x+12,y:y-8,'class':'wsp-mini-label'},point.label+' ('+point.x+', '+point.z+')'));}
      picture.append(svg('rect',{x:cameraX-14,y:cameraY-10,width:28,height:20,rx:4,'class':'wsp-camera'}),svg('text',{x:cameraX,y:320,'text-anchor':'middle','class':'wsp-mini-label'},'카메라 Cx='+data.camera.x));
      picture.append(svg('path',{d:'M 465 178 H 765 M 610 112 V 225','class':'wsp-mini-axis'}),svg('text',{x:610,y:250,'text-anchor':'middle','class':'wsp-mini-label'},'u=0'));
      for(const point of [...data.projected].reverse()){const x=610+point.u;picture.append(svg('circle',{cx:x,cy:178,r:point.id==='far'?13:6,fill:point.id==='far'?'none':point.color,stroke:point.color,'stroke-width':3}),svg('text',{x:455,y:285+(point.id==='near'?0:22),'class':'wsp-mini-label'},point.label+': u='+fmt(point.u)));}
      const drawing=node('div','wsp-mini-drawing');drawing.append(picture);example.append(drawing);
      const result=node('div','wsp-computed');result.dataset.wspProjectionResult=cameraId;result.append(node('p','wsp-formula','u = f(X − Cx) / Z'),node('p','','가까운 점: 120 × (1 − '+data.camera.x+') / 4 = '+fmt(data.projected[0].u)+' · 먼 점: 120 × (2 − '+data.camera.x+') / 8 = '+fmt(data.projected[1].u)),node('p','',data.overlap?'두 점은 u=30에서 겹칩니다. 이 시점의 한 화소만으로 어느 깊이인지 정할 수 없습니다.':'두 영상 좌표의 차이는 '+fmt(data.separation)+'입니다. 정면에 비해 가까운 점의 영상 위치가 더 크게 움직입니다.'));example.append(result);
    }
    function renderCompositing(){
      const data=core.compositingCase(orderId),choices=node('div','wsp-small-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','직접 정한 앞뒤 순서 선택');for(const mode of core.getExample('compositing').modes){const b=button(mode.label,()=>{orderId=mode.id;renderExample();});b.dataset.wspOrder=mode.id;b.setAttribute('aria-pressed',String(orderId===mode.id));choices.append(b);}example.append(choices);
      const layers=node('div','wsp-layer-grid');for(const [i,layer]of data.contributions.entries()){const cell=node('div','wsp-layer'),swatch=node('div','wsp-swatch');swatch.style.backgroundColor='rgb('+layer.color.map(x=>Math.round(x*255)).join(',')+')';cell.append(node('span','wsp-eyebrow',(i===0?'앞':'뒤')+' · '+layer.label),swatch,node('p','','α='+fmt(layer.alpha)+' · 앞을 통과한 비율 T='+fmt(layer.before)),node('p','','이 색의 기여 Tα='+fmt(layer.weight)));layers.append(cell);}const output=node('div','wsp-layer wsp-final-color'),swatch=node('div','wsp-swatch');swatch.style.backgroundColor='rgb('+data.rgb.join(',')+')';swatch.setAttribute('role','img');swatch.setAttribute('aria-label','직접 계산한 한 화소의 색 RGB '+data.rgb.join(', '));output.append(node('span','wsp-eyebrow','계산한 한 화소'),swatch,node('p','','RGB('+data.rgb.join(', ')+')'),node('p','','흰 배경의 기여 '+fmt(data.backgroundWeight)));layers.append(output);example.append(layers);
      const result=node('div','wsp-computed');result.dataset.wspCompositeResult=orderId;result.append(node('p','wsp-formula','C = Σᵢ cᵢ αᵢ ∏ⱼ<ᵢ (1−αⱼ) + T끝 C배경'),node('p','','앞에서 뒤로 누적한 가중치: '+data.contributions.map(x=>x.label+' '+fmt(x.weight)).join(' + ')+' + 흰 배경 '+fmt(data.backgroundWeight)),node('p','','RGB('+data.rgb.join(', ')+') · 깊이 순서와 투과율이 영상의 가림에 영향을 줍니다. 이것은 장면을 이해하거나 물리적 행동을 예측한 점수가 아닙니다.'));example.append(result);
    }
    function draw(view){
      drawing.replaceChildren();const picture=svg('svg',{viewBox:'0 0 940 '+view.height,role:'img','aria-label':view.title+' · 선택: '+selected.node.label});picture.append(svg('title',{},view.title),svg('desc',{},view.intro));
      if(viewId==='research')for(const[y,label]of[[18,'의미의 자료 · WHAT / RELATIONS'],[193,'서로 다른 공간 표현의 원논문 · RAYS / FIELD / SPLATS'],[373,'새 시점·생성과 행동의 경계 · VIEW / WORLD / ACTION']])picture.append(svg('rect',{x:24,y,width:892,height:142,rx:9,'class':'wsp-svg-phase'}),svg('text',{x:40,y:y+20,'class':'wsp-svg-caption'},label));
      else picture.append(svg('text',{x:23,y:23,'class':'wsp-svg-caption'},viewId==='product'?'INPUT / GENERATED SPACE / EDIT / RENDER / REQUEST':'PEOPLE / RESEARCH / COMPANY / INVESTMENT / CONDITIONAL AGREEMENT'));
      for(const edge of view.edges){const a=view.positions[edge.from],b=view.positions[edge.to],active=edge.from===selected.node.id||edge.to===selected.node.id;const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),start=[a[0]+dx/length*36,a[1]+dy/length*36];let ux=dx/length,uy=dy/length,end=[b[0]-ux*36,b[1]-uy*36],d='M '+start.join(' ')+' L '+end.join(' ');if(edge.id==='rays-splats'){d='M 170 235 C 310 155 650 155 772 235';end=[772,235];const tangent=Math.hypot(122,80);ux=122/tangent;uy=80/tangent;}d+=' M '+(end[0]-ux*8-uy*4)+' '+(end[1]-uy*8+ux*4)+' L '+end.join(' ')+' L '+(end[0]-ux*8+uy*4)+' '+(end[1]-uy*8-ux*4);picture.append(svg('path',{d,'class':'wsp-svg-arrow'+(active?' is-connected':'')+(['comparison','condition','announced','listed'].includes(edge.kind)?' is-dashed':'')}));if(active){const y=edge.id==='rays-splats'?178:(a[1]+b[1])/2-10;picture.append(svg('text',{x:(a[0]+b[0])/2,y,'text-anchor':'middle','class':'wsp-svg-edge-label'},edge.label));}}
      for(const role of view.nodes){const[x,y]=view.positions[role.id],group=svg('g',{'class':'wsp-svg-role'+(role.id===selected.node.id?' is-selected':''),'data-wsp-drawing-node':role.id,role:'button',tabindex:'0','aria-label':role.label+' · 역할과 근거 보기','aria-pressed':String(role.id===selected.node.id)});group.append(svg('circle',{cx:x,cy:y,r:29,'class':'wsp-icon-disc'}));icon(group,role.icon,x,y);group.append(svg('text',{x,y:y+49,'text-anchor':'middle','class':'wsp-svg-label'},role.label));group.addEventListener('click',()=>choose(role.id));group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(role.id);}});picture.append(group);}drawing.append(picture);
      if(drawing.clientWidth&&drawing.scrollWidth>drawing.clientWidth)drawing.scrollLeft=Math.max(0,drawing.scrollWidth*view.positions[selected.node.id][0]/940-drawing.clientWidth/2);
    }
    function icon(group,type,x,y){const path=d=>group.append(svg('path',{d,'class':'wsp-icon-stroke'})),dot=(a,b)=>group.append(svg('circle',{cx:a,cy:b,r:2.2,'class':'wsp-icon-dot'}));
      if(type==='person'||type==='people'){group.append(svg('circle',{cx:x,cy:y-9,r:6,'class':'wsp-icon-stroke'}));path('M '+(x-13)+' '+(y+14)+' Q '+(x-13)+' '+y+' '+x+' '+y+' Q '+(x+13)+' '+y+' '+(x+13)+' '+(y+14));if(type==='people')path('M '+(x+13)+' '+(y-12)+' q 11 1 7 10 M '+(x+15)+' '+(y+3)+' q 9 2 8 11');}
      else if(type==='chip'){path('M '+(x-12)+' '+(y-12)+' h 24 v 24 h -24 z');for(let i=-1;i<=1;i++)path('M '+(x+i*8)+' '+(y-19)+' v 7 M '+(x+i*8)+' '+(y+12)+' v 7 M '+(x-19)+' '+(y+i*8)+' h 7 M '+(x+12)+' '+(y+i*8)+' h 7');}
      else if(type==='camera'){path('M '+(x-18)+' '+(y-11)+' h 36 v 24 h -36 z M '+(x-10)+' '+(y-11)+' l 4 -6 h 12 l 4 6');group.append(svg('circle',{cx:x,cy:y+1,r:7,'class':'wsp-icon-stroke'}));}
      else if(type==='eye'){path('M '+(x-20)+' '+y+' Q '+x+' '+(y-22)+' '+(x+20)+' '+y+' Q '+x+' '+(y+22)+' '+(x-20)+' '+y);group.append(svg('circle',{cx:x,cy:y,r:6,'class':'wsp-icon-stroke'}));}
      else if(type==='points'){for(const[a,b]of[[-13,-10],[6,-15],[17,2],[8,15],[-12,12],[0,1]]){group.append(svg('ellipse',{cx:x+a,cy:y+b,rx:6,ry:3,'class':'wsp-icon-stroke'}));}}
      else if(type==='world'){path('M '+x+' '+(y-20)+' l 18 10 v 21 l -18 10 -18 -10 v -21 z M '+(x-18)+' '+(y-10)+' l 18 11 18 -11 M '+x+' '+(y+1)+' v 20');}
      else if(type==='model'){for(let i=0;i<3;i++)for(let j=0;j<2;j++){const a=x-15+i*15,b=y-9+j*18;dot(a,b);if(i<2)path('M '+(a+3)+' '+b+' L '+(a+12)+' '+(y-9)+' M '+(a+3)+' '+b+' L '+(a+12)+' '+(y+9));}}
      else if(type==='relations'){for(const[a,b]of[[-15,-10],[15,-10],[0,15]])group.append(svg('circle',{cx:x+a,cy:y+b,r:5,'class':'wsp-icon-stroke'}));path('M '+(x-10)+' '+(y-10)+' h 20 M '+(x-12)+' '+(y-5)+' l 9 15 M '+(x+12)+' '+(y-5)+' l -9 15');}
      else if(type==='company'){path('M '+(x-16)+' '+(y+16)+' h 32 M '+(x-12)+' '+(y+16)+' v -29 h 24 v 29');dot(x-5,y-5);dot(x+5,y-5);path('M '+(x-4)+' '+(y+16)+' v -8 h 8 v 8');}
      else if(type==='chart'){path('M '+(x-17)+' '+(y+15)+' h 35 M '+(x-12)+' '+(y+11)+' v -11 M '+x+' '+(y+11)+' v -19 M '+(x+12)+' '+(y+11)+' v -28');}
      else if(type==='code'){path('M '+(x-8)+' '+(y-11)+' l -11 11 11 11 M '+(x+8)+' '+(y-11)+' l 11 11 -11 11 M '+(x+3)+' '+(y-17)+' l -6 34');}
      else if(type==='tools'){path('M '+(x-17)+' '+(y-14)+' l 11 11 -5 6 -12 -11 M '+(x-7)+' '+(y+7)+' l 17 -17 6 6 -17 17 z');}
      else if(type==='target'){group.append(svg('circle',{cx:x,cy:y,r:17,'class':'wsp-icon-stroke'}),svg('circle',{cx:x,cy:y,r:8,'class':'wsp-icon-stroke'}));dot(x,y);}
      else{path('M '+(x-17)+' '+(y-14)+' h 34 v 28 h -34 z M '+(x-12)+' '+(y+8)+' l 8 -10 8 8 8 -12');dot(x-8,y-6);}
    }
    render();return()=>root.remove();
  }
  window.AtlasVisuals.register('worldlabs-spatial-platform',{mount});
})();
