/* Bengio2003 Eq(1), W=0, and one unregularized example update. */
(function(){
  'use strict';
  const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),clone=v=>JSON.parse(JSON.stringify(v));
  const keys=(v,list)=>object(v)&&Reflect.ownKeys(v).every(k=>typeof k==='string'&&list.includes(k));
  const dense=(v,max)=>Array.isArray(v)&&v.length<=max&&Array.from(v).every(x=>x!==undefined);
  const finite=v=>typeof v==='number'&&Number.isFinite(v),text=v=>typeof v==='string'&&v.trim().length>0;
  function vector(v,length,label){if(!dense(v,64)||v.length!==length||!v.every(finite))throw new TypeError(label+' must be a finite vector of the required length.');return v.slice();}
  function matrix(v,rows,columns,label){if(!dense(v,32)||v.length!==rows)throw new TypeError(label+' has the wrong row count.');return v.map(row=>vector(row,columns,label));}
  function read(options,extra=[]){
    if(!keys(options,['parameters','context','target',...extra])||!object(options.parameters)||!dense(options.context,4)||!options.context.length)throw new TypeError('Provide a parameter set and a finite fixed-length context.');
    const p=options.parameters;
    if(!keys(p,['C','H','U','d','b'])||!dense(p.C,16)||!p.C.length||!dense(p.C[0],4)||!p.C[0].length||!dense(p.H,8)||!p.H.length)throw new TypeError('C and H require bounded nonempty matrices.');
    const V=p.C.length,m=p.C[0].length,h=p.H.length,n=options.context.length;
    if(options.context.some(i=>!Number.isInteger(i)||i<0||i>=V)||!(options.target===null||Number.isInteger(options.target)&&options.target>=0&&options.target<V))throw new TypeError('Context and target use vocabulary indices.');
    return{parameters:{C:matrix(p.C,V,m,'C'),H:matrix(p.H,h,m*n,'H'),U:matrix(p.U,V,h,'U'),d:vector(p.d,h,'d'),b:vector(p.b,V,'b')},context:options.context.slice(),target:options.target,V,m,h,n};
  }
  const checked=v=>{if(!finite(v))throw new RangeError('A calculated value exceeded finite arithmetic.');return v;};
  const dot=(a,b)=>checked(a.reduce((sum,v,i)=>sum+v*b[i],0));
  function run(s){
    const p=s.parameters,lookup=s.context.map((word,position)=>({word,position,vector:p.C[word].slice()})).reverse(),input=lookup.flatMap(x=>x.vector);
    const preHidden=p.H.map((row,i)=>checked(p.d[i]+dot(row,input))),hidden=preHidden.map(Math.tanh),logits=p.U.map((row,i)=>checked(p.b[i]+dot(row,hidden)));
    const max=Math.max(...logits),weights=logits.map(v=>Math.exp(v-max)),normalizer=weights.reduce((a,b)=>a+b,0),probabilities=weights.map(v=>v/normalizer),loss=s.target===null?null:checked((max-logits[s.target])+Math.log(normalizer));
    return{context:s.context.slice(),lookup,input,preHidden,hidden,logits,probabilities,target:s.target,loss};
  }
  function forward(options){return clone(run(read(options)));}
  function differentiate(s){
    if(s.target===null)throw new TypeError('A target word is required for a learning gradient.');
    const p=s.parameters,f=run(s),dy=f.probabilities.map((v,i)=>v-(i===s.target?1:0));
    const hiddenGradient=Array.from({length:s.h},(_,j)=>checked(p.U.reduce((sum,row,i)=>sum+row[j]*dy[i],0))),preHiddenGradient=hiddenGradient.map((v,j)=>checked(v*(1-f.hidden[j]*f.hidden[j])));
    const inputGradient=Array.from({length:s.n*s.m},(_,k)=>checked(p.H.reduce((sum,row,j)=>sum+row[k]*preHiddenGradient[j],0)));
    const g={C:p.C.map(row=>row.map(()=>0)),H:p.H.map((row,j)=>row.map((_,k)=>checked(preHiddenGradient[j]*f.input[k]))),U:p.U.map((row,i)=>row.map((_,j)=>checked(dy[i]*f.hidden[j]))),d:preHiddenGradient.slice(),b:dy.slice()};
    f.lookup.forEach((item,block)=>{for(let k=0;k<s.m;k++)g.C[item.word][k]=checked(g.C[item.word][k]+inputGradient[block*s.m+k]);});
    return{forward:f,gradients:g,logitGradient:dy,hiddenGradient,preHiddenGradient,inputGradient};
  }
  function gradient(options){return clone(differentiate(read(options)));}
  function step(options){
    const s=read(options,['learningRate']);if(!finite(options.learningRate)||options.learningRate<=0||options.learningRate>1)throw new TypeError('Choose a learning rate greater than0 and at most1.');
    const g=differentiate(s),parameters={};
    for(const key of ['C','H','U'])parameters[key]=s.parameters[key].map((row,i)=>row.map((value,j)=>checked(value-options.learningRate*g.gradients[key][i][j])));
    for(const key of ['d','b'])parameters[key]=s.parameters[key].map((value,i)=>checked(value-options.learningRate*g.gradients[key][i]));
    const after=run({...s,parameters});return clone({parameters,before:g.forward,after,gradients:g.gradients,learningRate:options.learningRate});
  }
  window.AtlasNeuralLanguageModel=Object.freeze({forward,gradient,step});

  const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svg=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(value!==undefined)n.textContent=value;return n;};
  const fmt=(v,n=4)=>Math.abs(v)<.5*10**(-n)?(0).toFixed(n):v.toFixed(n),vectorText=v=>'['+v.map(x=>fmt(x,3)).join(', ')+']';
  const sourced=s=>object(s)&&text(s.title)&&typeof s.url==='string'&&/^https:\/\//u.test(s.url);
  function validate(c){
    if(!object(c)||!dense(c.stages,3)||c.stages.length!==3||!['represent','predict','learn'].every(id=>c.stages.some(s=>s.id===id&&text(s.label)&&text(s.text)))||!sourced(c.source)||!text(c.scope)||!object(c.example))throw new TypeError('Neural language view needs sourced stages and a bounded example.');
    const e=c.example;if(!dense(e.vocabulary,16)||!e.vocabulary.length||e.vocabulary.some(w=>!text(w))||new Set(e.vocabulary).size!==e.vocabulary.length||!dense(e.labels,16)||e.labels.length!==e.vocabulary.length||!e.labels.every(text)||!dense(e.contexts,12)||!e.contexts.length||!e.contexts.every(x=>text(x.id)&&text(x.label)&&text(x.translation)))throw new TypeError('Invalid authored vocabulary or contexts.');
    if(!e.contexts.some(x=>x.id===e.initialContext)||!e.contexts.some(x=>x.id===e.initialComparison)||new Set(e.contexts.map(x=>x.id)).size!==e.contexts.length||!dense(e.targetChoices,16)||!e.targetChoices.length||!e.targetChoices.every(i=>Number.isInteger(i)&&i>=0&&i<e.vocabulary.length)||!e.targetChoices.includes(e.initialTarget)||!dense(e.learningRates,8)||!e.learningRates.length||!e.learningRates.every(r=>finite(r)&&r>0&&r<=1)||!e.learningRates.includes(e.initialRate)||!text(e.scope))throw new TypeError('Invalid initial controls.');
    for(const context of e.contexts){const f=forward({parameters:e.parameters,context:context.words,target:e.initialTarget});if(f.probabilities.length!==e.vocabulary.length||e.parameters.C[0].length!==2)throw new TypeError('Vocabulary and C rows differ, or the two-component view is not supported.');}
    if(c.originalImage&&(!/^[A-Za-z0-9_.-]+\.(?:png|jpe?g|gif)$/u.test(c.originalImage.src)||!['title','caption','alt','credit'].every(k=>text(c.originalImage[k]))||!sourced(c.originalImage.source)))throw new TypeError('Original figure needs complete provenance.');
  }
  window.AtlasVisuals.register('neural-language-representation',{
    mount(host,config){
      validate(config);const e=config.example,root=el('div','neural-language-representation'),listeners=[],stageButtons=[],layerButtons=[],controls={};
      const listen=(n,type,fn)=>{n.addEventListener(type,fn);listeners.push(()=>n.removeEventListener(type,fn));};
      const group=(label,cls='nlm-controls')=>{const n=el('div',cls);n.setAttribute('role','group');n.setAttribute('aria-label',label);return n;};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const pane=(content,label,cls='nlm-svg-viewport')=>{const p=el('div',cls);p.tabIndex=0;p.setAttribute('role','group');p.setAttribute('aria-label',label);p.append(content);return p;};
      const disclosure=(title,content)=>{const d=el('details','nlm-details');d.append(el('summary','',title),content);return d;};
      const source=s=>{const a=el('a','nlm-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const mark=(buttons,key,value)=>{for(const b of buttons){const on=b.dataset[key]===value;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}};
      let stage='represent',contextId=e.initialContext,comparisonId=e.initialComparison,target=e.initialTarget,rate=e.initialRate,updated=false,layer='lookup',activeParameters,current,comparison,before,comparisonBefore,update,gradientResult,disposed=false;
      const nav=group('단어 표현과 다음 단어 예측의 세 단계','nlm-stage-controls'),stageText=el('p','nlm-stage-text'),contextControls=group('같은 매개변수로 읽을 두 문맥','nlm-context-controls');
      const select=(label,choices,parent,key,change)=>{const field=el('label','nlm-field');field.append(el('span','',label));const input=el('select');input.dataset.control=key;for(const [value,title]of choices){const o=el('option','',title);o.value=String(value);input.append(o);}field.append(input);parent.append(field);controls[key]=input;listen(input,'change',()=>{change(input.value);updated=false;recompute();});return input;};
      select('살펴볼 문맥',e.contexts.map(c=>[c.id,c.label]),contextControls,'context',v=>contextId=v);select('비교할 문맥',e.contexts.map(c=>[c.id,c.label]),contextControls,'comparison',v=>comparisonId=v);
      for(const item of config.stages){const b=button(item.label,nav,()=>{stage=item.id;renderStage();});b.dataset.stage=item.id;stageButtons.push(b);}
      const represent=el('section','nlm-panel nlm-represent'),contextSentence=el('p','nlm-sentence'),representationGrid=el('div','nlm-representation-grid'),embeddingTable=el('div'),embeddingPlot=el('div');
      represent.append(el('h4','','조합마다 다른 표를 만들지 않고, 같은 단어의 표현을 다시 쓴다'),el('p','nlm-prose','단어의 사전 번호를 바로 이어 붙이는 대신, 번호로 공유 표 C의 한 행을 찾습니다. 두 문맥에 같은 단어가 있으면 같은 행을 다시 사용합니다.'),contextSentence,representationGrid,el('p','nlm-note','이 사례의 두 성분 좌표를 직접 설정했습니다. 각 축에 ‘동물성’ 같은 의미 이름을 미리 붙이지 않습니다. 원논문의 실제 학습 벡터를 표시한 그림은 아닙니다.'));representationGrid.append(embeddingTable,embeddingPlot);
      const predict=el('section','nlm-panel nlm-predict'),layerControls=group('전방 계산에서 살펴볼 부분'),architecture=el('div'),layerDetail=el('div','nlm-layer-detail'),predictionCharts=el('div','nlm-chart-grid');
      predict.append(el('h4','','표현들을 이어 붙여, 다음 말의 확률을 계산한다'),el('p','nlm-prose','같은 벡터 표와 같은 H·U를 두 문맥에 적용합니다. 문맥의 순서는 위치별 연결에 남으며, 마지막에는 여덟 단어 전체의 점수를 확률로 바꿉니다.'),layerControls,architecture,layerDetail,predictionCharts);
      for(const [id,label]of[['lookup','표 C와 문맥 벡터'],['hidden','tanh 은닉 표현'],['output','softmax 확률']]){const b=button(label,layerControls,()=>{layer=id;renderPredict();});b.dataset.layer=id;layerButtons.push(b);}
      const learn=el('section','nlm-panel nlm-learn'),learningControls=group('정답과 한 번의 학습 설정'),learningStatus=el('p','nlm-keypoint'),learningCharts=el('div','nlm-chart-grid'),parameterChanges=el('div'),parameterNote=el('p','nlm-note');
      learn.append(el('h4','','다음 말을 맞히는 오차가, 표현 표와 예측 함수에 함께 닿는다'),el('p','nlm-prose','살펴볼 문맥의 정답만 한 번 학습합니다. 비교 문맥은 학습에 더하지 않고, 같은 매개변수의 변화가 그 문맥에도 영향을 주는지 읽습니다.'),learningControls,learningStatus,learningCharts,parameterChanges,parameterNote);
      select('이번 문맥의 정답',e.targetChoices.map(i=>[i,e.labels[i]]),learningControls,'target',v=>target=Number(v));select('학습률',e.learningRates.map(r=>[r,String(r)]),learningControls,'learningRate',v=>rate=Number(v));
      const train=button('한 번 학습하기',learningControls,()=>{updated=true;recompute();}),reset=button('시작 값으로 돌아가기',learningControls,()=>{updated=false;recompute();});train.dataset.action='step';reset.dataset.action='reset';
      const original=el('div');
      if(config.originalImage){const item=config.originalImage,figure=el('figure','nlm-original-figure'),img=el('img');img.alt=item.alt;img.loading='lazy';window.AtlasPublicAssets.setSource(img,item.src);const buttons=group('원논문 그림 확대'),zoom=button('원문 크게 보기',buttons,()=>{const on=figure.classList.toggle('expanded');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'화면 너비로 보기':'원문 크게 보기';});zoom.dataset.action='zoom';zoom.setAttribute('aria-pressed','false');figure.append(el('h5','',item.title),buttons,pane(img,'Bengio2003 원문 Fig1, 확대 후 좌우와 위아래로 이동','nlm-original-viewport'),el('figcaption','',item.caption),el('p','nlm-note',item.credit),source(item.source));original.append(figure);}
      const scope=el('div');scope.append(el('p','nlm-note',e.scope),el('p','nlm-note',config.scope),source(config.source));
      function renderStage(){root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;represent.hidden=stage!=='represent';predict.hidden=stage!=='predict';learn.hidden=stage!=='learn';}
      function table(headers,rows,title){const block=el('div','nlm-table-block');block.append(el('h5','',title));const t=el('table'),thead=el('thead'),tr=el('tr');for(const h of headers)tr.append(el('th','',h));thead.append(tr);t.append(thead);const body=el('tbody');for(const row of rows){const r=el('tr');if(row.active)r.classList.add('selected');for(const value of row.cells)r.append(el('td','',String(value)));body.append(r);}t.append(body);block.append(pane(t,title+', 표를 좌우로 이동','nlm-table-viewport'));return block;}
      function plot(){
        const indices=[...new Set(e.contexts.map(c=>c.words.at(-1)))],extent=Math.max(1,...indices.flatMap(i=>activeParameters.C[i].map(Math.abs))),s=svg('svg',{viewBox:'0 0 350 320',role:'img','aria-label':'직접 정한 C표에서 문맥 마지막 단어들의 두 성분 좌표'}),x=v=>42+(v/extent+1)*137,y=v=>267-(v/extent+1)*110;
        s.append(svg('path',{d:'M 32 267 L 327 267 M 42 281 L 42 25',class:'nlm-axis'}),svg('text',{x:295,y:291,class:'nlm-plot-note'},'성분 1'),svg('text',{x:7,y:20,class:'nlm-plot-note'},'성분 2'));
        indices.forEach((i,j)=>{const v=activeParameters.C[i],g=svg('g',{class:'nlm-word-point'+(current.context.includes(i)?' active':'')});g.append(svg('circle',{cx:x(v[0]),cy:y(v[1]),r:6}),svg('text',{x:x(v[0])+9,y:y(v[1])+(j===1?18:-9)},e.vocabulary[i]));s.append(g);});return s;
      }
      function renderRepresent(){
        const c=e.contexts.find(x=>x.id===contextId),other=e.contexts.find(x=>x.id===comparisonId);contextSentence.textContent=c.label+' → ?   /   '+other.label+' → ?';
        const used=new Set([...current.context,...comparison.context]);embeddingTable.replaceChildren(table(['단어','성분 1','성분 2'],activeParameters.C.map((row,i)=>({active:used.has(i),cells:[e.vocabulary[i],...row.map(v=>fmt(v,3))]})),'공유 표 C · 같은 단어는 같은 행'));
        embeddingPlot.replaceChildren(el('h5','','입력으로 쓸 동물 단어의 위치'),pane(plot(),'설정한 단어 벡터의 위치, 좌우로 이동'),el('p','nlm-note','가까운 좌표를 가진 단어를 같은 확률 함수에 넣으면 출력도 가까워질 수 있습니다. 좌표의 가까움이 모든 문맥의 의미가 같다는 뜻은 아닙니다.'));
      }
      function network(){
        const s=svg('svg',{viewBox:'0 0 790 260',role:'img','aria-label':'문맥 단어에서 공유 C표와 은닉층을 거쳐 다음 단어 확률로 가는 경로'}),boxes=[{id:'lookup',x:12,w:220,title:'같은 표 C에서 찾기',lines:current.lookup.map(l=>e.vocabulary[l.word]+' '+vectorText(l.vector))},{id:'hidden',x:290,w:220,title:'a = tanh(d + Hx)',lines:['x = '+vectorText(current.input),'a = '+vectorText(current.hidden)]},{id:'output',x:568,w:210,title:'y = b + Ua → softmax',lines:['후보 '+e.vocabulary.length+'개의 전체 분포','합계 '+fmt(current.probabilities.reduce((a,b)=>a+b,0),6)]}];
        for(const b of boxes){const g=svg('g',{class:'nlm-network-node'+(layer===b.id?' active':'')});g.append(svg('rect',{x:b.x,y:45,width:b.w,height:145,rx:10}),svg('text',{x:b.x+13,y:75,class:'nlm-network-title'},b.title));b.lines.forEach((v,i)=>g.append(svg('text',{x:b.x+13,y:108+i*25,class:'nlm-network-value'},v)));s.append(g);}
        for(const x of [232,510])s.append(svg('path',{d:'M '+x+' 119 L '+(x+55)+' 119 M '+(x+46)+' 113 L '+(x+55)+' 119 L '+(x+46)+' 125',class:'nlm-network-edge'}));
        s.append(svg('text',{x:13,y:224,class:'nlm-plot-note'},'x는 최근 단어부터 이어 붙입니다. 두 문맥 모두 같은 C·H·U·b·d를 사용합니다.'));return s;
      }
      function bars(result,title,beforeResult=null){const card=el('section','nlm-bars');card.append(el('h5','',title));result.probabilities.forEach((p,i)=>{const row=el('div','nlm-probability');row.dataset.word=String(i);if(i===target)row.classList.add('target');row.append(el('span','nlm-word',e.vocabulary[i]));const track=el('div','nlm-track');if(beforeResult){const old=el('span','nlm-bar-before');old.style.width=(beforeResult.probabilities[i]*100)+'%';track.append(old);}const bar=el('span','nlm-bar');bar.style.width=(p*100)+'%';track.append(bar);row.append(track,el('span','nlm-value',(p*100).toFixed(2)+'%'));card.append(row);});if(beforeResult)card.append(el('p','nlm-note','옅은 막대: 갱신 전 · 진한 막대: 갱신 후'));return card;}
      function renderPredict(){
        mark(layerButtons,'layer',layer);architecture.replaceChildren(pane(network(),'표 C에서 다음 단어 확률까지, 그림을 좌우로 이동'));
        layerDetail.replaceChildren();const details=layer==='lookup'?[['문맥 위치',...current.lookup.map(x=>'위치 '+(x.position+1))],['단어',...current.lookup.map(x=>e.vocabulary[x.word])],['조회한 C행',...current.lookup.map(x=>vectorText(x.vector))]]:layer==='hidden'?[['이어 붙인 x',vectorText(current.input)],['d+Hx',vectorText(current.preHidden)],['tanh 결과 a',vectorText(current.hidden)]]:[['후보',...e.vocabulary],['정규화 전 점수 y',...current.logits.map(x=>fmt(x))],['softmax 확률',...current.probabilities.map(x=>fmt(x,6))]];
        const headers=details.map(x=>x[0]),rows=Array.from({length:Math.max(...details.map(x=>x.length))-1},(_,i)=>({cells:details.map(x=>x[i+1]??'')}));layerDetail.append(table(headers,rows,layer==='lookup'?'최근 단어부터 벡터를 이어 붙인다':layer==='hidden'?'은닉 표현의 수치':'모든 단어의 점수를 함께 정규화한다'));
        predictionCharts.replaceChildren(bars(current,e.contexts.find(x=>x.id===contextId).label+' → 다음 단어'),bars(comparison,e.contexts.find(x=>x.id===comparisonId).label+' → 다음 단어'));root.dataset.layer=layer;
      }
      function renderLearn(){
        train.disabled=updated;reset.disabled=!updated;const c=e.contexts.find(x=>x.id===contextId),other=e.contexts.find(x=>x.id===comparisonId);
        learningStatus.textContent=updated?'한 번 갱신했습니다. '+c.label+' → '+e.vocabulary[target]+'의 손실 '+fmt(before.loss)+' → '+fmt(current.loss)+'. 비교 문맥 '+other.label+'는 학습 입력에 더하지 않았습니다.':'이번에 학습할 한 쌍: '+c.label+' → '+e.vocabulary[target]+'. 현재 손실은 '+fmt(before.loss)+'입니다.';
        learningCharts.replaceChildren(bars(current,c.label+(updated?' · 갱신 전후':' · 현재'),updated?before:null),bars(comparison,other.label+(updated?' · 같은 갱신의 영향':' · 비교'),updated?comparisonBefore:null));
        const used=new Set(current.context),rows=e.vocabulary.map((word,i)=>({active:used.has(i),cells:[word,vectorText(e.parameters.C[i]),updated?vectorText(activeParameters.C[i]):'아직 갱신하지 않음',updated?vectorText(activeParameters.C[i].map((v,j)=>v-e.parameters.C[i][j])):'—']}));parameterChanges.replaceChildren(table(['입력 표현 C','시작 값','한 번 갱신 후','ΔC'],rows,'입력에 나온 단어의 C행에 기울기를 모은다'));
        parameterNote.textContent='입력에 없는 C행은 그대로입니다. 출력 쪽 U와 공통 H·b·d는 별도로 갱신됩니다. 비교 문맥의 변화는 매개변수를 공유한 결과이며, 그 문맥의 실제 정답을 더 잘 맞혔다는 성능 판정은 아닙니다.';
        root.dataset.loss=String(current.loss);root.dataset.comparisonTargetProbability=String(comparison.probabilities[target]);root.dataset.targetProbability=String(current.probabilities[target]);
      }
      function recompute(){
        const c=e.contexts.find(x=>x.id===contextId),other=e.contexts.find(x=>x.id===comparisonId);before=forward({parameters:e.parameters,context:c.words,target});comparisonBefore=forward({parameters:e.parameters,context:other.words,target});gradientResult=gradient({parameters:e.parameters,context:c.words,target});update=updated?step({parameters:e.parameters,context:c.words,target,learningRate:rate}):null;activeParameters=update?update.parameters:e.parameters;current=update?update.after:before;comparison=forward({parameters:activeParameters,context:other.words,target});
        controls.context.value=contextId;controls.comparison.value=comparisonId;controls.target.value=String(target);controls.learningRate.value=String(rate);root.dataset.context=contextId;root.dataset.comparison=comparisonId;root.dataset.target=String(target);root.dataset.learningRate=String(rate);root.dataset.updated=String(updated);renderRepresent();renderPredict();renderLearn();
      }
      root.append(nav,stageText,contextControls,represent,predict,learn,disclosure('원논문 Fig.1과 함께 읽기',original),disclosure('이 보기의 범위와 전제',scope));recompute();renderStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const off of listeners)off();root.remove();};
    }
  });
})();
