/* Three source-bound research views and authored browser arithmetic. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const svg=(tag,attrs={},text)=>{const el=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text!==undefined)el.textContent=text;return el;};
  const button=(text,fn,cls='')=>{const el=node('button',cls,text);el.type='button';el.addEventListener('click',fn);return el;};
  const fmt=n=>Number.isInteger(n)?String(n):n.toFixed(2);
  function mount(host){
    const core=window.AtlasDeepmindGeminiPlatform,root=node('div','deepmind-gemini-platform');host.append(root);
    let viewId='research',selected=core.select(viewId,core.getView(viewId).initial),exampleId='search',branchId='A',searchStage='search',pairIndex=0,modalityId='both',showExample=true;
    const tabs=node('div','dgp-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','DeepMind의 연구·Gemini·기업 연결 보기');
    const title=node('h4','dgp-title'),intro=node('p','dgp-intro');
    const drawing=node('div','dgp-drawing');drawing.tabIndex=0;drawing.setAttribute('aria-label','원논문을 참고한 역할 개념도. 좁은 화면에서는 가로로 이동할 수 있습니다.');
    const hint=node('p','dgp-drawing-hint','그림을 가로로 밀어 전체 연결을 보고, 항목을 눌러 역할과 출처를 읽으세요.');
    const lineage=node('section','dgp-lineage');lineage.setAttribute('aria-label','회사 회고와 향후 구상의 경계');
    const roles=node('div','dgp-roles');roles.setAttribute('role','group');roles.setAttribute('aria-label','각 항목의 역할과 근거 선택');
    const controls=node('div','dgp-controls'),previous=button('← 앞 항목',()=>choose(core.step(viewId,selected.node.id,-1).node.id)),next=button('다음 항목 →',()=>choose(core.step(viewId,selected.node.id,1).node.id)),progress=node('span','dgp-progress');
    previous.dataset.dgpStep='previous';next.dataset.dgpStep='next';controls.append(previous,progress,next);
    const detail=node('section','dgp-detail');detail.setAttribute('role','region');detail.setAttribute('aria-label','선택한 항목의 역할과 관계');detail.setAttribute('aria-live','polite');
    const toggle=button('작은 표현 사례 접기',()=>{showExample=!showExample;renderSelection();},'dgp-example-toggle');toggle.dataset.dgpExample='toggle';
    const example=node('section','dgp-example');example.setAttribute('aria-label','직접 구성한 세 가지 표현 사례');
    const timeline=node('section','dgp-timeline');timeline.setAttribute('aria-label','연구·조직·제품을 나누어 읽는 시점');
    const scope=node('p','dgp-scope'),sources=node('div','dgp-source-list'),bridge=node('section','dgp-bridge');
    bridge.append(node('span','dgp-eyebrow','기존 인물·연구 카드에서 이어 읽기'),node('h4','','세부 연구에서, 그 연구를 수행한 사람과 조직으로'),node('p','','허사비스 인물은 기업·인프라 목록으로 이어집니다. AlphaGo·AlphaFold와 연구자들은 기존 연구·전체 인물 경로에서 읽습니다. 회사의 조직과 연구자의 방법·실험 기여를 구분합니다.'));
    const bridgeLinks=node('div','dgp-bridge-links');bridgeLinks.append(personLink('데미스 허사비스','demis-hassabis','industry'),eventLink('AlphaGo · 연구 카드','alphago'),eventLink('AlphaFold 2 · 연구 카드','alphafold2'),eventLink('Constitutional AI · 연결된 연구','constitutional-ai'),personLink('David Silver','david-silver','all'),personLink('John Jumper','john-jumper','all'),personLink('Oriol Vinyals','oriol-vinyals','all'),personLink('Jeffrey Dean','jeffrey-dean','all'),personLink('Koray Kavukcuoglu','koray-kavukcuoglu','all'));bridge.append(bridgeLinks);
    root.append(node('span','dgp-eyebrow','LEARNED GUIDANCE / STRUCTURED RELATIONS / MULTIMODAL MODELS → RESEARCH AND PRODUCTS'),tabs,title,intro,drawing,hint,lineage,roles,controls,detail,toggle,example,timeline,scope,sources,bridge);
    for(const view of core.views){const tab=button(view.label,()=>{viewId=view.id;selected=core.select(viewId,view.initial);syncExample();render();},'dgp-tab');tab.dataset.dgpView=view.id;tabs.append(tab);}
    function routeLink(label,href,type,payload){const a=node('a','',label+' ↗');a.href=href;a.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset();window.dispatchEvent(new CustomEvent(type,{detail:payload}));});return a;}
    function personLink(label,id,filter){return routeLink(label+' 인물 카드','#person='+id+(filter==='industry'?'&filter=industry':''),'atlas:search-result',{kind:'person',personId:id,filter});}
    function eventLink(label,id){return routeLink(label,'#event='+id,'atlas:open-event',{id});}
    function sourceLink(id,label){const s=core.sources[id],a=node('a','',label||s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;}
    function syncExample(){if(viewId!=='research')return;exampleId=selected.node.id.startsWith('go-')?'search':selected.node.id.startsWith('fold-')?'relations':'modalities';}
    function choose(id){selected=core.select(viewId,id);syncExample();renderSelection();}
    function render(){
      const view=core.getView(viewId);title.textContent=view.title;intro.textContent=view.intro;for(const t of tabs.children)t.setAttribute('aria-pressed',String(t.dataset.dgpView===viewId));
      roles.replaceChildren();view.nodes.forEach((role,index)=>{const b=button('',()=>choose(role.id),'dgp-role');b.dataset.dgpNode=role.id;b.setAttribute('aria-label',role.label+' · 역할과 근거 보기');b.append(node('span','dgp-role-number',String(index+1).padStart(2,'0')),node('strong','',role.label),node('span','',role.short));roles.append(b);});
      scope.textContent=view.scope;renderLineage();timeline.replaceChildren();timeline.hidden=viewId!=='product';
      if(!timeline.hidden){timeline.append(node('span','dgp-eyebrow','같은 설계도가 아니라, 서로 다른 시점의 연구·조직·제품 기록'));const list=node('div','dgp-milestones');for(const m of core.milestones){const item=node('div','dgp-milestone');item.append(node('span','dgp-date',m.date),node('strong','',m.title),node('p','',m.text),sourceLink(m.sourceId));list.append(item);}timeline.append(list);}
      renderSelection();
    }
    function renderLineage(){
      lineage.replaceChildren();lineage.hidden=viewId==='connections';
      if(viewId==='research'){lineage.append(node('span','dgp-eyebrow','점선으로 나누어 읽는 회사의 회고 · 2026.03.10'),node('p','','AlphaGo·AlphaZero의 일부 기법 → Gemini: 공식 회고가 밝힌 제한된 영향 관계입니다. 세 원논문의 전체 구조가 같은 모델이라는 뜻으로 연결하지 않습니다.'),sourceLink('retrospective'));}
      if(viewId==='product'){lineage.append(node('span','dgp-eyebrow','향후 전문 도구 연결의 구상 · 실제 제공 경로와 구분'),node('strong','dgp-future-path','Gemini · 범용 요청  ··· ? ···  AlphaFold · 전문 도구'),node('p','','2026년 회고는 범용 시스템이 AlphaFold 같은 전문 도구를 이용할 수 있다는 구상을 could로 설명합니다. AlphaFold가 현재 Gemini의 기본 내장 도구라는 배치도나 실행 결과가 아닙니다.'),sourceLink('retrospective'));}
    }
    function renderSelection(){
      const view=core.getView(viewId),role=selected.node;
      for(const b of roles.children)b.setAttribute('aria-pressed',String(b.dataset.dgpNode===role.id));previous.disabled=!selected.hasPrevious;next.disabled=!selected.hasNext;progress.textContent=(selected.index+1)+' / '+view.nodes.length;
      detail.replaceChildren();detail.append(node('span','dgp-eyebrow',role.type),node('h5','',role.label));const io=node('div','dgp-io');for(const[label,value]of[['들어오는 것',role.input],['이 역할이 하는 일',role.role],['다음에 전하는 것',role.output]]){const cell=node('div');cell.append(node('span','',label),node('p','',value));io.append(cell);}detail.append(io);
      renderConnections(role);
      toggle.hidden=viewId!=='research';toggle.setAttribute('aria-pressed',String(showExample));toggle.textContent=showExample?'작은 표현 사례 접기':'작은 표현 사례 함께 보기';
      example.hidden=viewId!=='research'||!showExample;example.replaceChildren();if(!example.hidden)renderExample();
      sources.replaceChildren();for(const id of new Set([...role.sourceIds,...selected.connections.flatMap(e=>e.sourceIds)])){const row=node('div','dgp-source');row.append(sourceLink(id),node('span','',core.sources[id].location));sources.append(row);}draw(view);
    }
    function renderConnections(role){
      const list=node('div','dgp-relationships');
      if(viewId==='connections'){list.append(node('span','dgp-eyebrow','선택한 항목의 관계'));for(const edge of selected.connections){const a=core.nodes.find(n=>n.id===edge.from),b=core.nodes.find(n=>n.id===edge.to);list.append(node('p','',a.label+' — '+edge.label+' → '+b.label));}}
      if(role.id==='hassabis')list.append(personLink('데미스 허사비스','demis-hassabis','industry'));
      if(role.id==='go-guidance'||role.id==='go-action')list.append(eventLink('AlphaGo · 연구 카드','alphago'),personLink('David Silver','david-silver','all'));
      if(role.id==='fold-relations'||role.id==='fold-output')list.append(eventLink('AlphaFold 2 · 연구 카드','alphafold2'),personLink('John Jumper','john-jumper','all'));
      if(role.id==='gemini-team'||role.id==='gemini-representation')list.append(personLink('Oriol Vinyals','oriol-vinyals','all'),personLink('Koray Kavukcuoglu','koray-kavukcuoglu','all'));
      if(role.id==='jeff-dean')list.append(personLink('Jeffrey Dean','jeffrey-dean','all'));
      if(role.id==='training-modalities')list.append(eventLink('Constitutional AI · 연결된 연구','constitutional-ai'));
      if(role.id==='google-deepmind')list.append(sourceLink('merger','2023년 Google DeepMind 통합 발표 ↗'));
      if(role.id==='google-company')list.append(sourceLink('googleMerger','Google · 당시 조직과 역할 소개 ↗'));
      if(role.id==='tpu-platform'||role.id==='training-compute')list.append(sourceLink('gemini','Gemini 1.0 · 계산 기반 원문 ↗'));
      if(list.children.length)detail.append(list);
    }
    function renderExample(){
      example.replaceChildren();const data=core.getExample(exampleId);example.dataset.dgpExamplePanel=exampleId;
      example.append(node('span','dgp-eyebrow','직접 정한 작은 사례 · 실제 연구 모델·API 실행 결과 아님'),node('h5','',data.question));
      const choices=node('div','dgp-case-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','직접 구성한 표현 사례 선택');
      for(const id of core.exampleIds){const b=button(core.getExample(id).label,()=>{exampleId=id;selected=core.select('research',{search:'go-guidance',relations:'fold-relations',modalities:'gemini-representation'}[id]);renderSelection();},'dgp-case');b.dataset.dgpCase=id;b.setAttribute('aria-pressed',String(exampleId===id));choices.append(b);}example.append(choices);
      if(exampleId==='search')renderSearchExample();else if(exampleId==='relations')renderRelationExample();else renderModalityExample();
      example.append(node('p','dgp-example-boundary',data.scope));
    }
    function renderSearchExample(){
      const data=core.searchCase(branchId),stageChoices=node('div','dgp-small-tabs');stageChoices.setAttribute('role','group');stageChoices.setAttribute('aria-label','추천과 상대 응수 비교');
      for(const[id,label]of[['prior','지금의 추천만'],['search','상대의 응수까지']]){const b=button(label,()=>{searchStage=id;renderExample();});b.dataset.dgpSearchStage=id;b.setAttribute('aria-pressed',String(searchStage===id));stageChoices.append(b);}example.append(stageChoices);
      const branches=node('div','dgp-small-tabs');branches.setAttribute('role','group');branches.setAttribute('aria-label','작은 게임의 후보 선택');for(const b of data.evaluated){const choice=button(b.id+' · 직접 정한 추천 '+Math.round(b.prior*100)+'%',()=>{branchId=b.id;renderExample();});choice.dataset.dgpBranch=b.id;choice.setAttribute('aria-pressed',String(branchId===b.id));branches.append(choice);}example.append(branches);
      const diagram=svg('svg',{viewBox:'0 0 900 325',role:'img','aria-label':'직접 구성한 작은 두 선수 나무. 추천 확률과 max-min 값을 구분합니다.'});
      diagram.append(svg('text',{x:450,y:28,'text-anchor':'middle','class':'dgp-mini-label'},'내가 고르는 세 후보'),svg('circle',{cx:450,cy:58,r:15,'class':'dgp-mini-root'}));
      data.evaluated.forEach((b,i)=>{const x=150+i*300,active=b.id===branchId;diagram.append(svg('path',{d:'M 450 73 L '+x+' 130','class':'dgp-mini-line'+(active?' is-active':'')}),svg('rect',{x:x-62,y:130,width:124,height:50,rx:8,'class':'dgp-mini-box'+(active?' is-active':'')}),svg('text',{x,y:160,'text-anchor':'middle','class':'dgp-mini-label'},b.id+' · '+Math.round(b.prior*100)+'%'));
        if(searchStage==='search'){b.leaves.forEach((leaf,j)=>{const lx=x-66+j*132;diagram.append(svg('path',{d:'M '+x+' 180 L '+lx+' 236','class':'dgp-mini-line'+(active&&leaf===b.worst?' is-active':'')}),svg('circle',{cx:lx,cy:254,r:23,'class':'dgp-mini-leaf'+(active&&leaf===b.worst?' is-active':'')}),svg('text',{x:lx,y:259,'text-anchor':'middle','class':'dgp-mini-label'},String(leaf)));});diagram.append(svg('text',{x,y:308,'text-anchor':'middle','class':'dgp-mini-label'},'상대가 불리하게 두면 '+b.worst));}
      });const wrap=node('div','dgp-mini-drawing');wrap.append(diagram);example.append(wrap);
      const result=node('div','dgp-computed');result.dataset.dgpSearchResult=searchStage;result.append(node('span','dgp-eyebrow','직접 정한 값으로 계산한 작은 게임의 결과'));
      if(searchStage==='prior')result.append(node('p','','지금의 추천 확률이 가장 큰 후보는 '+data.priorId+'입니다. 다음 상대 응수의 결과는 아직 이 화면에서 비교하지 않습니다.'));
      else result.append(node('p','dgp-formula','선택 '+branchId+': min('+data.branch.leaves.join(', ')+') = '+data.branch.worst),node('p','','세 후보의 최악값을 비교하면 max(1, 4, 2) = 4로 '+data.bestId+'를 고릅니다. 추천 1위 '+data.priorId+'와 다릅니다. 이 작은 max-min 계산은 AlphaGo의 MCTS와 같은 알고리즘이 아닙니다.'));
      example.append(result);
    }
    function renderRelationExample(){
      const data=core.relationCase(pairIndex),choices=node('div','dgp-small-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','작성한 잔기쌍 선택');core.getExample('relations').pairs.forEach((pair,i)=>{const b=button((pair[0]+1)+'번 — '+(pair[1]+1)+'번 쌍',()=>{pairIndex=i;renderExample();});b.dataset.dgpPair=String(i);b.setAttribute('aria-pressed',String(pairIndex===i));choices.append(b);});example.append(choices);
      const grid=node('div','dgp-relation-grid'),shape=node('div','dgp-coordinate-view'),picture=svg('svg',{viewBox:'0 0 390 335',role:'img','aria-label':'직접 정한 다섯 잔기의 좌표를 평면에 투영한 그림'}),project=p=>[65+p[0]*78-p[2]*24,265-p[1]*58-p[2]*24],points=data.coordinates.map(project);
      for(let i=1;i<points.length;i++)picture.append(svg('path',{d:'M '+points[i-1].join(' ')+' L '+points[i].join(' '),'class':'dgp-mini-line'}));
      picture.append(svg('path',{d:'M '+points[data.pair[0]].join(' ')+' L '+points[data.pair[1]].join(' '),'class':'dgp-pair-line'}));
      points.forEach(([x,y],i)=>{const active=data.pair.includes(i);picture.append(svg('circle',{cx:x,cy:y,r:21,'class':'dgp-mini-leaf'+(active?' is-active':'')}),svg('text',{x,y:y+5,'text-anchor':'middle','class':'dgp-mini-label'},data.residues[i]+(i+1)),svg('text',{x,y:y+40,'text-anchor':'middle','class':'dgp-coordinate-label'},'('+data.coordinates[i].join(', ')+')'));});shape.append(node('span','dgp-eyebrow','가정한 좌표 · 임의 단위, 실제 단백질 아님'),picture);
      const tableWrap=node('div','dgp-table-wrap'),table=node('table','dgp-distance-table');table.setAttribute('aria-label','직접 정한 좌표의 쌍 거리 행렬');const head=node('tr');head.append(node('th','',''));for(let j=0;j<5;j++)head.append(node('th','',String(j+1)));table.append(head);
      for(let i=0;i<5;i++){const row=node('tr');row.append(node('th','',String(i+1)));for(let j=0;j<5;j++){const cell=node('td','',fmt(data.matrix[i][j]));if((i===data.pair[0]&&j===data.pair[1])||(j===data.pair[0]&&i===data.pair[1]))cell.className='is-selected';row.append(cell);}table.append(row);}tableWrap.append(node('span','dgp-eyebrow','좌표에서 직접 계산한 쌍 거리'),table);grid.append(shape,tableWrap);example.append(grid);
      const result=node('div','dgp-computed');result.dataset.dgpDistanceResult=String(pairIndex);result.append(node('p','dgp-formula','d('+String(data.pair[0]+1)+', '+String(data.pair[1]+1)+') = √('+data.delta.map(v=>'('+v+')²').join(' + ')+') = '+data.distance.toFixed(3)),node('p','','서열의 순서는 사슬을 따라가고, 쌍의 관계는 공간에서의 배치를 함께 봅니다. AlphaFold 2의 쌍 표현은 이 거리 표 하나보다 훨씬 풍부하며, 여기서는 예측 모델을 실행하지 않습니다.'));example.append(result);
    }
    function renderModalityExample(){
      const data=core.modalityCase(modalityId),choices=node('div','dgp-small-tabs');choices.setAttribute('role','group');choices.setAttribute('aria-label','작성한 입력의 조합 선택');for(const mode of core.getExample('modalities').modes){const b=button(mode.label,()=>{modalityId=mode.id;renderExample();});b.dataset.dgpModality=mode.id;b.setAttribute('aria-pressed',String(modalityId===mode.id));choices.append(b);}example.append(choices);
      const grid=node('div','dgp-modality-grid'),text=node('div','dgp-input-card'+(data.text?'':' is-missing')),image=node('div','dgp-input-card'+(data.image?'':' is-missing'));
      text.append(node('span','dgp-eyebrow','텍스트 입력'),node('p','',data.text?data.question:'이번 조합에서는 질문을 제공하지 않았습니다.'));
      image.append(node('span','dgp-eyebrow','작성한 시각 자료'));
      if(data.image){const chart=svg('svg',{viewBox:'0 0 390 265',role:'img','aria-label':'직접 정한 막대 자료: 월요일 3, 화요일 7, 수요일 5'});chart.append(svg('path',{d:'M 45 25 V 225 H 355','class':'dgp-mini-line'}));data.values.forEach((v,i)=>{const x=90+i*100,h=v.value*25;chart.append(svg('rect',{x:x-25,y:225-h,width:50,height:h,rx:4,'class':'dgp-chart-bar'+(data.maximum?.label===v.label?' is-max':'')}),svg('text',{x,y:215-h,'text-anchor':'middle','class':'dgp-mini-label'},String(v.value)),svg('text',{x,y:250,'text-anchor':'middle','class':'dgp-mini-label'},v.label+'요일'));});image.append(chart);}else image.append(node('p','','이번 조합에서는 수치 자료를 제공하지 않았습니다.'));
      grid.append(text,image);example.append(grid);const result=node('div','dgp-computed');result.dataset.dgpModalityResult=data.modeId;result.append(node('span','dgp-eyebrow','작성 자료와 입력 조합에 관한 설명 · 모델 출력 아님'),node('p','',data.explanation));example.append(result);
    }
    function draw(view){
      drawing.replaceChildren();const image=svg('svg',{viewBox:'0 0 940 '+view.height,role:'img','aria-label':view.title+' · 선택: '+selected.node.label});image.append(svg('title',{},view.title),svg('desc',{},view.intro));
      if(viewId==='research'){for(const[y,label]of[[28,'2016 ALPHAGO · 배운 직관과 탐색'],[193,'2021 ALPHAFOLD 2 · 관계와 구조'],[368,'2023 GEMINI 1.0 · 멀티모달 모델']])image.append(svg('rect',{x:25,y,width:890,height:135,rx:10,'class':'dgp-svg-phase'}),svg('text',{x:43,y:y+19,'class':'dgp-svg-caption'},label));}
      else image.append(svg('text',{x:22,y:23,'class':'dgp-svg-caption'},viewId==='product'?'TRAINING / LEARNED MODEL / REQUEST / APPLICATION / PRODUCT':'PEOPLE / RESEARCH TEAMS / COMPANY / COMPUTE'));
      for(const edge of view.edges){if(edge.kind==='reported')continue;const a=view.positions[edge.from],b=view.positions[edge.to],active=edge.from===selected.node.id||edge.to===selected.node.id;let dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length;const start=[a[0]+ux*36,a[1]+uy*36],end=[b[0]-ux*36,b[1]-uy*36];let path='M '+start.join(' ')+' L '+end.join(' ');
        if(edge.id==='response-tool'){path='M 652 105 C 690 155 690 238 652 287';ux=-.55;uy=.84;end[0]=652;end[1]=287;}
        if(edge.id==='tool-response'){path='M 598 287 C 558 235 558 155 598 105';ux=.55;uy=-.84;end[0]=598;end[1]=105;}
        path+=' M '+(end[0]-ux*8-uy*4)+' '+(end[1]-uy*8+ux*4)+' L '+end.join(' ')+' L '+(end[0]-ux*8+uy*4)+' '+(end[1]-uy*8-ux*4);
        image.append(svg('path',{d:path,'class':'dgp-svg-arrow'+(active?' is-connected':'')+(['dated','optional','disclosure'].includes(edge.kind)?' is-dashed':'')}));
      }
      if(viewId==='product')for(const[text,x,y]of[['학습',245,61],['학습 실행',235,210],['모델',491,61],['이번 문맥',480,203],['호출 제안',721,194],['실행 결과',536,194],['제품 접점',748,61]])image.append(svg('text',{x,y,'text-anchor':'middle','class':'dgp-svg-edge-label'},text));
      if(viewId==='connections')for(const[text,x,y]of[['2010년 출발',180,61],['2023 통합',395,133],['2023 통합',395,279],['공동연구',650,169],['v1 기술 리드',860,112],['학습 기반',790,286]])image.append(svg('text',{x,y,'text-anchor':'middle','class':'dgp-svg-edge-label'},text));
      for(const role of view.nodes){const[x,y]=view.positions[role.id],group=svg('g',{'class':'dgp-svg-role'+(role.id===selected.node.id?' is-selected':''),'data-dgp-drawing-node':role.id,role:'button',tabindex:'0','aria-label':role.label+' · 역할과 근거 보기','aria-pressed':String(role.id===selected.node.id)});group.append(svg('circle',{cx:x,cy:y,r:29,'class':'dgp-icon-disc'}));icon(group,role.icon,x,y);group.append(svg('text',{x,y:y+49,'text-anchor':'middle','class':'dgp-svg-label'},role.label));const chooseRole=()=>choose(role.id);group.addEventListener('click',chooseRole);group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();chooseRole();}});image.append(group);}drawing.append(image);
      if(drawing.clientWidth&&drawing.scrollWidth>drawing.clientWidth)drawing.scrollLeft=Math.max(0,drawing.scrollWidth*view.positions[selected.node.id][0]/940-drawing.clientWidth/2);
    }
    function icon(group,type,x,y){
      const p=d=>group.append(svg('path',{d,'class':'dgp-icon-stroke'})),dot=(a,b)=>group.append(svg('circle',{cx:a,cy:b,r:2.1,'class':'dgp-icon-dot'}));
      if(type==='person'||type==='people'){group.append(svg('circle',{cx:x,cy:y-9,r:6,'class':'dgp-icon-stroke'}));p('M '+(x-13)+' '+(y+14)+' Q '+(x-13)+' '+y+' '+x+' '+y+' Q '+(x+13)+' '+y+' '+(x+13)+' '+(y+14));if(type==='people')p('M '+(x+14)+' '+(y-11)+' q 9 1 6 9 M '+(x+15)+' '+(y+3)+' q 9 2 8 11');}
      else if(type==='company'){p('M '+(x-16)+' '+(y+16)+' h 32 M '+(x-12)+' '+(y+16)+' v -29 h 24 v 29 M '+(x-4)+' '+(y+16)+' v -9 h 8 v 9');dot(x-5,y-4);dot(x+5,y-4);}
      else if(type==='chip'){p('M '+(x-12)+' '+(y-12)+' h 24 v 24 h -24 z');for(let i=-1;i<=1;i++){p('M '+(x+i*8)+' '+(y-19)+' v 7 M '+(x+i*8)+' '+(y+12)+' v 7 M '+(x-19)+' '+(y+i*8)+' h 7 M '+(x+12)+' '+(y+i*8)+' h 7');}}
      else if(type==='model'){for(let i=0;i<3;i++)for(let j=0;j<2;j++){const a=x-15+i*15,b=y-9+j*18;dot(a,b);if(i<2)p('M '+(a+3)+' '+b+' L '+(a+12)+' '+(y-9)+' M '+(a+3)+' '+b+' L '+(a+12)+' '+(y+9));}}
      else if(type==='board'){for(let i=-1;i<=1;i++)p('M '+(x-17)+' '+(y+i*12)+' h 34 M '+(x+i*12)+' '+(y-17)+' v 34');group.append(svg('circle',{cx:x-12,cy:y,r:4,'class':'dgp-icon-dot'}),svg('circle',{cx:x+12,cy:y-12,r:4,'class':'dgp-icon-disc'}));}
      else if(type==='tree'){p('M '+x+' '+(y-13)+' v 11 M '+(x-14)+' '+(y+1)+' h 28 M '+(x-14)+' '+(y+1)+' v 12 M '+(x+14)+' '+(y+1)+' v 12');dot(x,y-15);dot(x-14,y+15);dot(x+14,y+15);}
      else if(type==='chain'||type==='molecule'||type==='geometry'){const points=[[x-17,y+8],[x-7,y-12],[x+9,y-3],[x+17,y+14]];p('M '+points.map(a=>a.join(' ')).join(' L '));for(const a of points)group.append(svg('circle',{cx:a[0],cy:a[1],r:4,'class':'dgp-icon-disc'}));if(type==='geometry')p('M '+(x-17)+' '+(y+8)+' L '+(x+17)+' '+(y+14));}
      else if(type==='chart'){p('M '+(x-17)+' '+(y+14)+' h 35 M '+(x-12)+' '+(y+10)+' v -11 M '+x+' '+(y+10)+' v -19 M '+(x+12)+' '+(y+10)+' v -28');}
      else if(type==='modalities'){p('M '+(x-19)+' '+(y-14)+' h 23 v 25 h -23 z M '+(x-15)+' '+(y+4)+' l 6 -7 6 7 M '+(x+9)+' '+(y-12)+' h 10 M '+(x+9)+' '+(y-3)+' h 10 M '+(x+9)+' '+(y+6)+' h 10');dot(x-12,y-8);}
      else if(type==='tools'){p('M '+(x-15)+' '+(y-13)+' l 10 10 -6 6 -10 -10 M '+(x-7)+' '+(y+7)+' l 17 -17 6 6 -17 17 z');}
      else{p('M '+(x-15)+' '+(y-17)+' h 22 l 8 8 v 26 h -30 z M '+(x+7)+' '+(y-17)+' v 9 h 8 M '+(x-8)+' '+(y-1)+' h 17 M '+(x-8)+' '+(y+7)+' h 13');}
    }
    render();return()=>root.remove();
  }
  window.AtlasVisuals.register('deepmind-gemini-platform',{mount});
})();
