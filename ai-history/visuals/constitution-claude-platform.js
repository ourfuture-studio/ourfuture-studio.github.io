/* Authored, source-bound figures. No model, preference scoring, or training is run. */
(function () {
  'use strict';
  const node=(tag,cls,text)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(text!==undefined)element.textContent=text;return element;};
  const svg=(tag,attrs={},text)=>{const element=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))element.setAttribute(k,v);if(text!==undefined)element.textContent=text;return element;};
  const button=(text,fn,cls='')=>{const element=node('button',cls,text);element.type='button';element.addEventListener('click',fn);return element;};
  function mount(host) {
    const core=window.AtlasConstitutionClaudePlatform;
    const root=node('div','constitution-claude-platform');host.append(root);
    let viewId='cai',selected=core.select(viewId,core.getView(viewId).initial);
    let principleId='honesty',exampleStage='revision',showExample=true;
    const tabs=node('div','ccp-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','Constitutional AI·Claude·기업 연결 보기');
    const title=node('h4','ccp-title'),intro=node('p','ccp-intro');
    const drawing=node('div','ccp-drawing');drawing.tabIndex=0;drawing.setAttribute('aria-label','공식 원문을 참고한 역할 개념도. 좁은 화면에서는 가로로 이동할 수 있습니다.');
    const hint=node('p','ccp-drawing-hint','그림을 가로로 밀어 전체 연결을 보고, 항목을 눌러 역할과 근거를 읽으세요.');
    const roles=node('div','ccp-roles');roles.setAttribute('role','group');roles.setAttribute('aria-label','각 항목의 역할과 출처 선택');
    const controls=node('div','ccp-controls');
    const previous=button('← 앞 항목',()=>{selected=core.step(viewId,selected.node.id,-1);renderSelection();});previous.dataset.ccpStep='previous';
    const next=button('다음 항목 →',()=>{selected=core.step(viewId,selected.node.id,1);renderSelection();});next.dataset.ccpStep='next';
    const progress=node('span','ccp-progress');controls.append(previous,progress,next);
    const detail=node('section','ccp-detail');detail.setAttribute('role','region');detail.setAttribute('aria-label','선택한 항목의 역할과 관계');detail.setAttribute('aria-live','polite');
    const toggle=button('원칙 적용 사례 접기',()=>{showExample=!showExample;renderSelection();},'ccp-example-toggle');toggle.dataset.ccpExample='toggle';
    const example=node('section','ccp-example');example.setAttribute('aria-label','직접 작성한 원칙 적용 사례');
    const timeline=node('section','ccp-timeline');timeline.setAttribute('aria-label','연구·제품·문서의 시점');
    const scope=node('p','ccp-scope'),sourceRows=node('div','ccp-source-list'),bridge=node('section','ccp-bridge');
    bridge.append(node('span','ccp-eyebrow','기존 인물·논문·기업 카드에서 이어 읽기'),node('h4','','원칙을 연구한 팀에서, 모델을 배우고 제공하는 기반으로'),node('p','','다리오와 젠슨 황의 기업 기록은 기업·인프라 목록으로 이어집니다. Bai·Kaplan과 원논문은 연구를 읽는 경로로 이동합니다. 인물 카드가 없는 참여자는 선택한 항목의 공식 자료에서 확인할 수 있습니다.'));
    const bridgeLinks=node('div','ccp-bridge-links');
    bridgeLinks.append(personLink('다리오 아모데이','dario-amodei','industry'),eventLink(),personLink('Yuntao Bai','yuntao-bai','all'),personLink('Jared Kaplan','jared-kaplan','all'),workLink('젠슨 황 · NVIDIA·CUDA 상세','jensen-huang','huang-cuda-2006'));
    bridge.append(bridgeLinks);
    root.append(node('span','ccp-eyebrow','HUMAN PRINCIPLES → AI-GENERATED TRAINING SIGNALS → LEARNED BEHAVIOR / CLAUDE'),tabs,title,intro,drawing,hint,roles,controls,detail,toggle,example,timeline,scope,sourceRows,bridge);
    for(const view of core.views){const tab=button(view.label,()=>{viewId=view.id;selected=core.select(viewId,view.initial);render();},'ccp-tab');tab.dataset.ccpView=view.id;tabs.append(tab);}

    function routeLink(label,href,type,payload) {
      const link=node('a','',label+' ↗');link.href=href;
      link.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset();window.dispatchEvent(new CustomEvent(type,{detail:payload}));});
      return link;
    }
    function personLink(label,personId,filter){return routeLink(label+' 인물 카드','#person='+personId+(filter==='industry'?'&filter=industry':''),'atlas:search-result',{kind:'person',personId,filter});}
    function workLink(label,personId,workId){return routeLink(label,'#person='+personId+'&work='+workId+'&filter=industry','atlas:open-work',{personId,workId,filter:'industry'});}
    function eventLink(){return routeLink('Constitutional AI · 원논문 카드','#event=constitutional-ai','atlas:open-event',{id:'constitutional-ai'});}
    function sourceLink(sourceId,label){const source=core.sources[sourceId],link=node('a','',label||source.title+' ↗');link.href=source.url;link.target='_blank';link.rel='noopener noreferrer';return link;}

    function render() {
      const view=core.getView(viewId);title.textContent=view.title;intro.textContent=view.intro;
      for(const tab of tabs.children)tab.setAttribute('aria-pressed',String(tab.dataset.ccpView===viewId));
      roles.replaceChildren();
      view.nodes.forEach((role,index)=>{const choice=button('',()=>{selected=core.select(viewId,role.id);renderSelection();},'ccp-role');choice.dataset.ccpNode=role.id;choice.setAttribute('aria-label',role.label+' · 역할과 근거 보기');choice.append(node('span','ccp-role-number',String(index+1).padStart(2,'0')),node('strong','',role.label),node('span','',role.short));roles.append(choice);});
      scope.textContent=view.scope;
      timeline.replaceChildren();timeline.hidden=viewId!=='claude';
      if(!timeline.hidden){timeline.append(node('span','ccp-eyebrow','하나의 현재 설계도로 합치지 않고, 연구·제품·문서를 시점별로 읽기'));const list=node('div','ccp-milestones');for(const milestone of core.milestones){const item=node('div','ccp-milestone');item.append(node('span','ccp-date',milestone.date),node('strong','',milestone.title),node('p','',milestone.text),sourceLink(milestone.sourceId));list.append(item);}timeline.append(list);}
      renderSelection();
    }
    function renderSelection() {
      const view=core.getView(viewId),role=selected.node;
      for(const choice of roles.children)choice.setAttribute('aria-pressed',String(choice.dataset.ccpNode===role.id));
      previous.disabled=!selected.hasPrevious;next.disabled=!selected.hasNext;progress.textContent=(selected.index+1)+' / '+view.nodes.length;
      detail.replaceChildren();detail.append(node('span','ccp-eyebrow',role.type),node('h5','',role.label));
      const io=node('div','ccp-io');for(const[label,value]of[['들어오는 것',role.input],['이 역할이 하는 일',role.role],['다음에 전하는 것',role.output]]){const item=node('div');item.append(node('span','',label),node('p','',value));io.append(item);}detail.append(io);
      if(viewId==='connections')renderRelationships(role);
      toggle.hidden=viewId!=='cai';toggle.setAttribute('aria-pressed',String(showExample));toggle.textContent=showExample?'원칙 적용 사례 접기':'원칙 적용 사례 함께 보기';
      example.hidden=viewId!=='cai'||!showExample;example.replaceChildren();if(!example.hidden)renderExample();
      sourceRows.replaceChildren();for(const id of new Set([...role.sourceIds,...selected.connections.flatMap(edge=>edge.sourceIds)])){const row=node('div','ccp-source');row.append(sourceLink(id),node('span','',core.sources[id].location));sourceRows.append(row);}
      draw(view);
    }
    function renderRelationships(role) {
      const relationships=node('div','ccp-relationships');relationships.append(node('span','ccp-eyebrow','선택한 항목에서 이어지는 관계'));
      for(const edge of selected.connections){const from=core.nodes.find(n=>n.id===edge.from),to=core.nodes.find(n=>n.id===edge.to);relationships.append(node('p','',from.label+' — '+edge.label+' → '+to.label));}
      if(role.id==='dario')relationships.append(personLink('다리오 아모데이','dario-amodei','industry'));
      if(role.id==='nvidia')relationships.append(workLink('젠슨 황 · NVIDIA·CUDA 상세','jensen-huang','huang-cuda-2006'));
      if(role.id==='daniela')relationships.append(sourceLink('leadership','다니엘라 · 공식 회사 소개 ↗'));
      if(role.id==='amanda')relationships.append(sourceLink('constitution','아만다 · 헌법 문서의 기여문 ↗'));
      if(role.id==='anthropic'||role.id==='claude-company')relationships.append(eventLink());
      detail.append(relationships);
    }
    function renderExample() {
      example.replaceChildren();const item=core.example(principleId);example.dataset.ccpPrinciplePanel=principleId;
      example.append(node('span','ccp-eyebrow','직접 작성한 사례 · 실제 Claude의 응답이나 원논문 예시가 아닙니다'),node('h5','','원하는 행동을, 수정할 사례와 비교할 기준으로 옮기다'));
      const principles=node('div','ccp-principles');principles.setAttribute('role','group');principles.setAttribute('aria-label','직접 작성한 원칙 선택');
      for(const id of core.principleIds){const principle=core.example(id),choice=button(principle.label,()=>{principleId=id;renderExample();},'ccp-principle');choice.dataset.ccpPrinciple=id;choice.setAttribute('aria-pressed',String(principleId===id));principles.append(choice);}example.append(principles);
      const criterion=node('div','ccp-criterion');criterion.dataset.ccpCriterion=principleId;criterion.append(node('span','ccp-eyebrow','이번에 선택한 기준 · 원문의 직접 인용이 아닌 자체 표현'),node('p','',item.criterion));example.append(criterion);
      const stages=node('div','ccp-example-stages');stages.setAttribute('role','group');stages.setAttribute('aria-label','사례를 보는 두 단계');
      for(const[id,label,target]of[['revision','비평·수정 사례','critiques'],['comparison','응답쌍 비교 사례','ai-comparison']]){const choice=button(label,()=>{exampleStage=id;selected=core.select('cai',target);renderSelection();},'ccp-stage');choice.dataset.ccpStage=id;choice.setAttribute('aria-pressed',String(exampleStage===id));stages.append(choice);}example.append(stages);
      const question=node('div','ccp-example-question');question.append(node('span','ccp-eyebrow','가정한 요청'),node('p','',item.request));example.append(question);
      const grid=node('div','ccp-example-grid');
      if(exampleStage==='revision'){
        const draft=node('div','ccp-draft');draft.append(node('span','ccp-eyebrow','초기 응답 · 직접 작성'),node('p','',item.draft));
        const critique=node('div','ccp-critique');critique.dataset.ccpCritique=principleId;critique.append(node('span','ccp-eyebrow','선택한 기준에 비춘 비평 · 직접 작성'),node('p','',item.critique));
        const revision=node('div','ccp-revision');revision.dataset.ccpRevision=principleId;revision.append(node('span','ccp-eyebrow','수정 응답 · 직접 작성'),node('p','',item.revision),node('span','ccp-example-arrow','이런 수정 사례를 모아 지도학습 자료로 이용하는 역할'));
        grid.append(draft,critique,revision);
      }else{
        const a=node('div','ccp-candidate');a.append(node('span','ccp-eyebrow','비교할 응답 A · 직접 작성'),node('p','',item.alternative));
        const b=node('div','ccp-candidate is-preferred');b.append(node('span','ccp-eyebrow','비교할 응답 B · 직접 작성'),node('p','',item.revision));
        const comparison=node('div','ccp-comparison');comparison.dataset.ccpComparison=principleId;comparison.append(node('span','ccp-eyebrow','B를 선호하는 이유 · 직접 작성, 실제 AI 판단 아님'),node('p','',item.comparison),node('span','ccp-example-arrow','이런 비교 자료를 선호모형에 학습시키는 역할 · 실제 보상 점수는 계산하지 않습니다'));
        grid.append(a,b,comparison);
      }
      example.append(grid,node('p','ccp-example-boundary',item.scope));
    }

    function draw(view) {
      drawing.replaceChildren();const positions=view.positions;
      const image=svg('svg',{viewBox:'0 0 940 '+view.height,role:'img','aria-label':view.title+'. 선택한 항목: '+selected.node.label});
      image.append(svg('title',{},view.title),svg('desc',{},view.intro));
      if(viewId==='cai'){
        image.append(svg('rect',{x:190,y:30,width:705,height:120,rx:10,'class':'ccp-svg-phase'}),svg('rect',{x:190,y:250,width:705,height:125,rx:10,'class':'ccp-svg-phase'}),svg('text',{x:210,y:48,'class':'ccp-svg-caption'},'SL · 비평과 수정으로 지도학습 자료 만들기'),svg('text',{x:210,y:267,'class':'ccp-svg-caption'},'RL · AI 무해성 선호 + 인간 유용성 선호'));
      }else image.append(svg('text',{x:23,y:23,'class':'ccp-svg-caption'},viewId==='claude'?'INTENTIONS → TRAINING DATA / LEARNED MODEL → REQUEST / RESPONSE':'PEOPLE / ORGANIZATION / DATED COMPUTE RELATIONSHIPS'));
      for(const edge of view.edges){
        const a=positions[edge.from],b=positions[edge.to],active=edge.from===selected.node.id||edge.to===selected.node.id;
        let dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length;
        const start=[a[0]+ux*38,a[1]+uy*38],end=[b[0]-ux*38,b[1]-uy*38];
        let path='M '+start.join(' ')+' L '+end.join(' ');
        if(edge.id==='sl-compare'){path='M 695 116 C 635 205 395 192 315 288';dx=-80;dy=96;length=Math.hypot(dx,dy);ux=dx/length;uy=dy/length;end[0]=315;end[1]=288;}
        path+=' M '+(end[0]-ux*8-uy*4)+' '+(end[1]-uy*8+ux*4)+' L '+end.join(' ')+' L '+(end[0]-ux*8+uy*4)+' '+(end[1]-uy*8-ux*4);
        image.append(svg('path',{d:path,'class':'ccp-svg-arrow'+(active?' is-connected':'')+(['dated','disclosure','principle'].includes(edge.kind)?' is-dashed':'')+(edge.kind==='human'?' is-human':'')}));
      }
      const captions=viewId==='cai'?[['원칙',79,150]]:[];
      if(viewId==='cai')captions.push(['SL-CAI에서 응답쌍 생성',480,198],['초기 정책',784,201],['사람의 자료도 유지',632,427]);
      if(viewId==='claude')captions.push(['학습 자료 제작',222,58],['학습',485,58],['모델을 이용',728,58],['요청의 문맥',522,195],['관찰·공개',688,190]);
      if(viewId==='connections')captions.push(['공동설립·경영',197,102],['공동설립·운영',196,288],['2024 학습·클라우드',443,111],['개발·제공',552,162],['2026 헌법 집필',863,270],['2025 TPU 확대 발표',460,279],['2025 GPU 이용',365,280]);
      for(const[text,x,y]of captions)image.append(svg('text',{x,y,'text-anchor':'middle','class':'ccp-svg-edge-label'},text));
      for(const role of view.nodes){
        const[x,y]=positions[role.id],group=svg('g',{'class':'ccp-svg-role'+(role.id===selected.node.id?' is-selected':''),'data-ccp-drawing-node':role.id,role:'button',tabindex:'0','aria-label':role.label+' · 역할과 근거 보기','aria-pressed':String(role.id===selected.node.id)});
        group.append(svg('circle',{cx:x,cy:y,r:31,'class':'ccp-icon-disc'}));icon(group,role.icon,x,y);group.append(svg('text',{x,y:y+51,'text-anchor':'middle','class':'ccp-svg-label'},role.label));
        const choose=()=>{selected=core.select(viewId,role.id);renderSelection();};group.addEventListener('click',choose);group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose();}});image.append(group);
      }
      drawing.append(image);if(drawing.clientWidth&&drawing.scrollWidth>drawing.clientWidth)drawing.scrollLeft=Math.max(0,drawing.scrollWidth*positions[selected.node.id][0]/940-drawing.clientWidth/2);
    }
    function icon(group,type,x,y) {
      const path=d=>group.append(svg('path',{d,'class':'ccp-icon-stroke'})),dot=(a,b)=>group.append(svg('circle',{cx:a,cy:b,r:2.1,'class':'ccp-icon-dot'}));
      if(type==='person'||type==='people'){group.append(svg('circle',{cx:x,cy:y-9,r:6,'class':'ccp-icon-stroke'}));path('M '+(x-13)+' '+(y+14)+' Q '+(x-13)+' '+y+' '+x+' '+y+' Q '+(x+13)+' '+y+' '+(x+13)+' '+(y+14));if(type==='people')path('M '+(x+14)+' '+(y-11)+' q 10 1 7 10 M '+(x+16)+' '+(y+3)+' q 9 2 8 12');}
      else if(type==='company'){path('M '+(x-16)+' '+(y+16)+' h 32 M '+(x-12)+' '+(y+16)+' v -29 h 24 v 29 M '+(x-4)+' '+(y+16)+' v -9 h 8 v 9');dot(x-5,y-4);dot(x+5,y-4);}
      else if(type==='model'){for(let i=0;i<3;i++)for(let j=0;j<2;j++){const a=x-15+i*15,b=y-9+j*18;dot(a,b);if(i<2)path('M '+(a+3)+' '+b+' L '+(a+12)+' '+(y-9)+' M '+(a+3)+' '+b+' L '+(a+12)+' '+(y+9));}}
      else if(type==='cloud'){path('M '+(x-16)+' '+(y+11)+' C '+(x-28)+' '+(y+1)+' '+(x-16)+' '+(y-13)+' '+(x-7)+' '+(y-9)+' C '+(x-1)+' '+(y-24)+' '+(x+19)+' '+(y-15)+' '+(x+17)+' '+(y-4)+' C '+(x+31)+' '+(y-1)+' '+(x+25)+' '+(y+15)+' '+(x+15)+' '+(y+12)+' Z');}
      else if(type==='search'){group.append(svg('circle',{cx:x-4,cy:y-4,r:10,'class':'ccp-icon-stroke'}));path('M '+(x+4)+' '+(y+4)+' l 12 12');}
      else if(type==='compare'){path('M '+(x-17)+' '+(y-14)+' h 13 v 28 h -13 z M '+(x+4)+' '+(y-14)+' h 13 v 28 h -13 z M '+(x-11)+' '+(y-5)+' h 3 M '+(x+8)+' '+(y-5)+' h 5 M '+(x-11)+' '+(y+4)+' h 3 M '+(x+8)+' '+(y+4)+' h 5');}
      else if(type==='score'){path('M '+(x-17)+' '+(y+14)+' h 35 M '+(x-12)+' '+(y+10)+' v -11 M '+x+' '+(y+10)+' v -19 M '+(x+12)+' '+(y+10)+' v -28');}
      else if(type==='edit'){path('M '+(x-15)+' '+(y-14)+' h 21 v 29 h -21 z M '+(x-5)+' '+(y+6)+' l 22 -22 5 5 -22 22 -7 2 z');}
      else{path('M '+(x-15)+' '+(y-17)+' h 22 l 8 8 v 26 h -30 z M '+(x+7)+' '+(y-17)+' v 9 h 8 M '+(x-8)+' '+(y-1)+' h 17 M '+(x-8)+' '+(y+7)+' h 13');}
    }
    render();return()=>root.remove();
  }
  window.AtlasVisuals.register('constitution-claude-platform',{mount});
})();
