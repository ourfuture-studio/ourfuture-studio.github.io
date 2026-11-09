/* Seq2Seq (2014): a source-based sentence flow, explicitly chosen search
 * probabilities, and a separate structural time-lag comparison. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const copyHypothesis=h=>({tokens:h.tokens.slice(),logScore:h.logScore,probability:h.probability,nodeId:h.nodeId,ended:h.ended});
  function tokenArray(tokens,eos){
    if(!Array.isArray(tokens)||!tokens.length||!tokens.every(hasText)||tokens.includes(eos))throw new TypeError('Tokens must be non-empty strings without the EOS marker.');
  }
  function buildTimeline(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Timeline options are required.');
    const{sourceTokens,targetTokens,eos,reverseSource=false}=options;
    if(!hasText(eos)||typeof reverseSource!=='boolean')throw new TypeError('A distinct EOS marker and boolean source order are required.');
    tokenArray(sourceTokens,eos);tokenArray(targetTokens,eos);
    const order=sourceTokens.map((_,i)=>i);if(reverseSource)order.reverse();
    const frames=[],read=[];
    for(const sourceIndex of order){read.push(sourceTokens[sourceIndex]);frames.push({index:frames.length,phase:'encode',inputToken:sourceTokens[sourceIndex],sourceIndex,readTokens:read.slice(),targetPrefix:[],prediction:null,finished:false});}
    read.push(eos);frames.push({index:frames.length,phase:'handoff',inputToken:eos,sourceIndex:null,readTokens:read.slice(),targetPrefix:[],prediction:null,finished:false});
    const prefix=[];
    for(let i=0;i<=targetTokens.length;i++){
      const prediction=i===targetTokens.length?eos:targetTokens[i];prefix.push(prediction);
      frames.push({index:frames.length,phase:'decode',inputToken:i===0?null:targetTokens[i-1],sourceIndex:null,readTokens:read.slice(),targetPrefix:prefix.slice(),prediction,finished:i===targetTokens.length});
    }
    return frames;
  }
  function lagPairs(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Lag options are required.');
    const{sourceLength,alignments,reverseSource=false,decoderOffset=0}=options;
    if(!Number.isSafeInteger(sourceLength)||sourceLength<1||!Array.isArray(alignments)||!alignments.length||typeof reverseSource!=='boolean'||!Number.isSafeInteger(decoderOffset)||decoderOffset<0)throw new TypeError('Lag comparison needs a positive source length, alignment pairs, source order and nonnegative clock offset.');
    const seen=new Set(),pairs=alignments.map(item=>{
      if(!item||!Number.isSafeInteger(item.sourceIndex)||item.sourceIndex<0||item.sourceIndex>=sourceLength||!Number.isSafeInteger(item.targetIndex)||item.targetIndex<0||!hasText(item.label))throw new RangeError('Alignment indices or label are invalid.');
      const key=item.sourceIndex+':'+item.targetIndex;if(seen.has(key))throw new Error('Duplicate alignment pair.');seen.add(key);
      const sourceTime=reverseSource?sourceLength-1-item.sourceIndex:item.sourceIndex,outputTime=sourceLength+item.targetIndex+decoderOffset,lag=outputTime-sourceTime;
      if(!Number.isSafeInteger(outputTime)||!Number.isSafeInteger(lag))throw new RangeError('The chosen timeline exceeds the safe integer range.');
      return{sourceIndex:item.sourceIndex,targetIndex:item.targetIndex,label:item.label,sourceTime,outputTime,lag};
    });
    const values=pairs.map(p=>p.lag);return{pairs,min:Math.min(...values),mean:values.reduce((sum,value)=>sum+value,0)/values.length,max:Math.max(...values)};
  }
  function beamSearch(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Beam-search options are required.');
    const{nodes,startId,eos,maxSteps,width}=options;
    if(!Array.isArray(nodes)||!nodes.length||!hasText(startId)||!hasText(eos)||!Number.isSafeInteger(width)||width<1||width>16||!Number.isSafeInteger(maxSteps)||maxSteps<1||maxSteps>64)throw new RangeError('Search needs nodes, start/EOS markers, beam width1..16 and step limit1..64.');
    const map=new Map();
    for(const item of nodes){if(!item||!hasText(item.id)||map.has(item.id)||!Array.isArray(item.edges)||!item.edges.length)throw new TypeError('Every search node needs a distinct id and non-empty edges.');map.set(item.id,item);}
    if(!map.has(startId))throw new RangeError('Search start node is missing.');
    for(const item of nodes){let total=0;const tokens=new Set();for(const edge of item.edges){
      if(!edge||!hasText(edge.token)||tokens.has(edge.token)||typeof edge.probability!=='number'||!Number.isFinite(edge.probability)||edge.probability<=0||edge.probability>1)throw new TypeError('Conditional edges need distinct tokens and probabilities in(0,1].');
      tokens.add(edge.token);total+=edge.probability;
      if(edge.token===eos){if(edge.nextId!==null)throw new Error('EOS edges must end at null.');}else if(!hasText(edge.nextId)||!map.has(edge.nextId))throw new Error('A non-EOS edge needs an existing next node.');
    }if(Math.abs(total-1)>1e-9)throw new RangeError('Each node must define a normalized conditional distribution.');}
    let active=[{tokens:[],logScore:0,probability:1,nodeId:startId,ended:false}],completed=[],generation=0;
    const trace=[{step:0,candidates:[],retained:active.map(copyHypothesis),pruned:[],active:active.map(copyHypothesis),completed:[]}];
    for(let step=1;step<=maxSteps&&active.length;step++){
      const candidates=[];
      for(const parent of active)for(const edge of map.get(parent.nodeId).edges){const logScore=parent.logScore+Math.log(edge.probability);candidates.push({tokens:[...parent.tokens,edge.token],logScore,probability:Math.exp(logScore),nodeId:edge.nextId,ended:edge.token===eos,_order:generation++});}
      candidates.sort((a,b)=>b.logScore-a.logScore||a._order-b._order);
      const retained=candidates.slice(0,width),pruned=candidates.slice(width);
      for(const item of retained)if(item.ended)completed.push(item);
      completed.sort((a,b)=>b.logScore-a.logScore||a._order-b._order);
      active=retained.filter(item=>!item.ended);
      trace.push({step,candidates:candidates.map(copyHypothesis),retained:retained.map(copyHypothesis),pruned:pruned.map(copyHypothesis),active:active.map(copyHypothesis),completed:completed.map(copyHypothesis)});
    }
    return{trace,completed:completed.map(copyHypothesis),best:completed.length?copyHypothesis(completed[0]):null,active:active.map(copyHypothesis),reason:active.length?'max-steps':'all-complete'};
  }
  window.AtlasSeq2SeqModel=Object.freeze({buildTimeline,lagPairs,beamSearch});
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const STAGES=['represent','generate','reverse'];
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',MUTED='var(--muted, #777b86)';
  const number=value=>value===0?'0':Math.abs(value)<.0001?value.toExponential(3):value.toFixed(4);
  const sequence=tokens=>tokens.length?tokens.join(' '):'아직 없음';
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'seq2seq-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!STAGES.every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new Error('Seq2Seq needs representation, generation and reversal stages.');
    if(!hasText(config.eos)||!Array.isArray(config.examples)||!config.examples.length||new Set(config.examples.map(e=>e.id)).size!==config.examples.length)throw new Error('Seq2Seq needs a distinct EOS marker and examples.');
    for(const ex of config.examples){if(!ex||!['id','label','translation','scope'].every(k=>hasText(ex[k]))||!hasText(ex.source?.title)||!hasText(ex.source?.url))throw new Error('Examples need their scope and source.');buildTimeline({sourceTokens:ex.sourceTokens,targetTokens:ex.targetTokens,eos:config.eos});}
    const ev=config.evidence;if(!ev||!/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(ev.file)||ev.file.includes('..')||!['title','caption','scope'].every(k=>hasText(ev[k]))||!hasText(ev.source?.title)||!hasText(ev.source?.url)||!hasText(ev.credit?.title)||!hasText(ev.credit?.url))throw new Error('The learned-representation evidence needs a local source image and attribution.');
    const b=config.beam;if(!b||!Array.isArray(b.widths)||!b.widths.length||new Set(b.widths).size!==b.widths.length||!['title','text','scope'].every(k=>hasText(b[k]))||!hasText(b.source?.title)||!hasText(b.source?.url))throw new Error('The chosen probability graph needs widths, scope and source.');
    tokenArray(b.sourceTokens,b.eos);tokenArray(b.referenceTokens,b.eos);for(const width of b.widths)beamSearch({...b,width});
    const r=config.reversal;if(!r||!['title','text','scope'].every(k=>hasText(r[k]))||!hasText(r.source?.title)||!hasText(r.source?.url)||!Array.isArray(r.targetTokens)||!r.targetTokens.length||!r.targetTokens.every(hasText))throw new Error('Reversal needs tokens, alignment scope and source.');
    tokenArray(r.sourceTokens,config.eos);lagPairs({...r,sourceLength:r.sourceTokens.length});if(r.alignments.some(p=>p.targetIndex>=r.targetTokens.length))throw new RangeError('Comparison target indices must name a displayed target.');
    if(!hasText(config.scope)||!hasText(config.source?.title)||!hasText(config.source?.url))throw new Error('Seq2Seq needs the article scope and original source.');
  }
  window.AtlasVisuals.register('sentence-to-sentence',{
    mount(host,config){
      validate(config);
      const root=node('div','seq2seq-language'),listeners=[],stageButtons=[],exampleButtons=[],orderButtons=[],frameButtons=[],widthButtons=[],prefixButtons=[],reversalButtons=[],pairButtons=[];
      let stage='represent',exampleId=config.examples[0].id,reverseSource=false,cursor=0,flowExpanded=false,evidenceExpanded=false,width=config.beam.widths[0],beamStep=0,prefixIndex=0,reverseCompare=false,pairIndex=0,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const mark=(buttons,key,value)=>{for(const button of buttons){const active=String(button.dataset[key])===String(value);button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}};
      const stages=node('div','seq2seq-stage-controls');stages.setAttribute('role','group');stages.setAttribute('aria-label','문장을 다른 문장으로 잇는 단계');
      const stageText=node('p','seq2seq-stage-text'),represent=node('section','seq2seq-represent'),generate=node('section','seq2seq-generate'),reverse=node('section','seq2seq-reverse');
      const exampleControls=node('div','seq2seq-example-controls');exampleControls.setAttribute('role','group');exampleControls.setAttribute('aria-label','문장 흐름 예시 선택');
      const translation=node('p','seq2seq-prose'),orderControls=node('div','seq2seq-order-controls');orderControls.setAttribute('role','group');orderControls.setAttribute('aria-label','인코더가 읽을 입력 순서');
      for(const [value,label] of [[false,'입력 정방향'],[true,'입력 역순']]){const button=node('button','',label);button.type='button';button.dataset.order=String(value);listen(button,'click',()=>{reverseSource=value;cursor=0;updateRepresentation();});orderButtons.push(button);orderControls.append(button);}
      const play=node('div','seq2seq-play-controls'),first=node('button','','처음'),previous=node('button','','이전'),next=node('button','','다음'),last=node('button','','끝');
      for(const [button,label] of [[first,'문장 흐름 처음 보기'],[previous,'문장 흐름 이전 보기'],[next,'문장 흐름 다음 보기'],[last,'문장 흐름 마지막 보기']]){button.type='button';button.setAttribute('aria-label',label);play.append(button);}
      const frameStatus=node('p','seq2seq-frame-status');frameStatus.setAttribute('role','status');frameStatus.setAttribute('aria-live','polite');frameStatus.setAttribute('aria-atomic','true');
      const framePicker=node('details','seq2seq-frame-picker');framePicker.append(node('summary','','보기 단계 직접 고르기'));const frameList=node('div','seq2seq-frame-list');frameList.setAttribute('role','group');frameList.setAttribute('aria-label','읽기·전달·예측 보기');framePicker.append(frameList);
      const maximumFrames=Math.max(...config.examples.map(e=>e.sourceTokens.length+e.targetTokens.length+2));
      for(let i=0;i<maximumFrames;i++){const button=node('button');button.type='button';button.dataset.frame=String(i);listen(button,'click',()=>{cursor=i;updateRepresentation();});frameButtons.push(button);frameList.append(button);}
      const zoomFlow=node('button','seq2seq-zoom','문장 흐름 그림 확대');zoomFlow.type='button';zoomFlow.setAttribute('aria-pressed','false');
      const flowViewport=node('div','seq2seq-flow-viewport'),flow=node('div','seq2seq-flow');flow.setAttribute('aria-label','입력 LSTM에서 표현을 거쳐 출력 LSTM으로 이어지는 흐름');flowViewport.append(flow);
      const prefixStatus=node('div','seq2seq-prefix-status'),readLine=node('p'),conditionLine=node('p'),outputLine=node('p');prefixStatus.append(readLine,conditionLine,outputLine);
      const exampleScope=node('p','seq2seq-scope'),exampleSource=node('div');
      represent.append(exampleControls,translation,orderControls,play,frameStatus,framePicker,zoomFlow,flowViewport,prefixStatus,node('p','seq2seq-mini-note','보기 번호는 읽기·전달·예측 관계를 나눈 설명 단계입니다. 상태의 수치나 물리적인 계산 시간을 재현하지 않습니다. 전달과 첫 예측도 두 보기로 나누어 읽습니다.'),exampleScope,exampleSource);
      const evidence=node('details','seq2seq-evidence');evidence.append(node('summary','','원문이 학습한 문장 표현'));const evidenceBody=node('div');
      const evidenceZoom=node('button','seq2seq-zoom','원문 문장 표현 그림 확대');evidenceZoom.type='button';evidenceZoom.setAttribute('aria-pressed','false');
      const evidencePane=node('div','seq2seq-evidence-viewport'),evidenceImage=node('img');window.AtlasPublicAssets.setSource(evidenceImage,config.evidence.file);evidenceImage.alt=config.evidence.caption;evidenceImage.decoding='async';evidencePane.append(evidenceImage);
      const credit=node('p','seq2seq-credit');credit.append(link(config.evidence.credit.title,config.evidence.credit.url),document.createTextNode(' · '+(config.evidence.credit.note||'')));
      evidenceBody.append(node('h4','',config.evidence.title),node('p','seq2seq-prose',config.evidence.caption),evidenceZoom,node('p','seq2seq-mini-note','확대하면 그림 영역 안에서 좌우로 움직여 읽을 수 있습니다.'),evidencePane,node('p','seq2seq-scope',config.evidence.scope),source(config.evidence.source),credit);evidence.append(evidenceBody);represent.append(evidence);

      const beamControls=node('div','seq2seq-width-controls');beamControls.setAttribute('role','group');beamControls.setAttribute('aria-label','직접 구성한 탐색의 beam 폭');
      const beamPlay=node('div','seq2seq-play-controls'),beamFirst=node('button','','처음'),beamPrevious=node('button','','이전'),beamNext=node('button','','다음'),beamLast=node('button','','끝');
      for(const [button,label] of [[beamFirst,'탐색 처음 보기'],[beamPrevious,'탐색 이전 보기'],[beamNext,'탐색 다음 보기'],[beamLast,'탐색 마지막 보기']]){button.type='button';button.setAttribute('aria-label',label);beamPlay.append(button);}
      const beamStatus=node('p','seq2seq-frame-status');beamStatus.setAttribute('role','status');beamStatus.setAttribute('aria-live','polite');
      const sourceLine=node('p','seq2seq-prose','입력 기호 · '+sequence(config.beam.sourceTokens)),candidateTable=node('div','seq2seq-candidate-table'),beamActive=node('div','seq2seq-hypothesis-list'),beamCompleted=node('div','seq2seq-hypothesis-list'),beamBest=node('div','seq2seq-best');
      generate.append(node('h4','',config.beam.title),node('p','seq2seq-prose',config.beam.text),sourceLine,beamControls,beamPlay,beamStatus,node('h5','','이번에 확장한 후보와 선택'),candidateTable,node('h5','','계속 이어 갈 후보'),beamActive,node('h5','','EOS로 완료해 보관한 후보'),beamCompleted,beamBest);
      const prefixSection=node('section','seq2seq-training-prefix');prefixSection.append(node('h4','','학습의 이전 정답과, 선택한 완료 후보의 접두사'));
      const prefixControls=node('div','seq2seq-prefix-controls');prefixControls.setAttribute('role','group');prefixControls.setAttribute('aria-label','비교할 출력 위치');
      const prefixCards=node('div','seq2seq-prefix-cards');prefixCards.setAttribute('role','status');prefixCards.setAttribute('aria-live','polite');
      for(let i=0;i<=config.beam.referenceTokens.length;i++){const button=node('button','','출력 '+(i+1));button.type='button';button.dataset.prefix=String(i);listen(button,'click',()=>{prefixIndex=i;updatePrefixes();});prefixButtons.push(button);prefixControls.append(button);}
      prefixSection.append(node('p','seq2seq-mini-note','탐색 단계의 현재 1위가 아니라, 이 폭으로 끝까지 탐색해 선택한 완료 후보를 기준으로 비교합니다. 학습 쪽은 준비한 정답 '+sequence(config.beam.referenceTokens)+'의 이전 단어이며 새 학습을 실행한 값이 아닙니다.'),prefixControls,prefixCards);generate.append(prefixSection,node('p','seq2seq-scope',config.beam.scope),source(config.beam.source));

      const reversalControls=node('div','seq2seq-order-controls');reversalControls.setAttribute('role','group');reversalControls.setAttribute('aria-label','시간 간격 비교의 입력 순서');
      for(const [value,label] of [[false,'정방향 비교'],[true,'역순 비교']]){const button=node('button','',label);button.type='button';button.dataset.reverse=String(value);listen(button,'click',()=>{reverseCompare=value;updateReversal();});reversalButtons.push(button);reversalControls.append(button);}
      const pairControls=node('div','seq2seq-pair-controls');pairControls.setAttribute('role','group');pairControls.setAttribute('aria-label','강조할 직접 정한 대응쌍');
      for(const [i,pair] of config.reversal.alignments.entries()){const button=node('button','',pair.label);button.type='button';button.dataset.pair=String(i);listen(button,'click',()=>{pairIndex=i;updateReversal();});pairButtons.push(button);pairControls.append(button);}
      const clock=node('div','seq2seq-clock'),sourceClock=node('div','seq2seq-clock-strip'),connections=node('div','seq2seq-clock-links'),targetClock=node('div','seq2seq-clock-strip');clock.append(node('h5','','읽은 입력 · 왼쪽부터 t=0'),sourceClock,connections,node('h5','','대응 출력 · 첫 출력은 t=N'),targetClock);
      const pairStatus=node('p','seq2seq-selection-status');pairStatus.setAttribute('role','status');pairStatus.setAttribute('aria-live','polite');
      const lagStats=node('div','seq2seq-lag-stats');lagStats.setAttribute('aria-label','현재 입력 순서의 시간 간격 요약');const statValues={};for(const [key,label] of [['min','최소 간격'],['mean','평균 간격'],['max','최대 간격']]){const cell=node('div'),value=node('strong');cell.append(node('span','',label),value);lagStats.append(cell);statValues[key]=value;}
      const lagTable=node('div','seq2seq-lag-table');reverse.append(node('h4','',config.reversal.title),node('p','seq2seq-prose',config.reversal.text),reversalControls,pairControls,clock,pairStatus,lagStats,lagTable,node('p','seq2seq-mini-note','이 비교의 시계는 입력 위치 0…N−1을 읽고, 입력 EOS와 첫 대응 출력의 위치를 t=N으로 둡니다. 위 문장 흐름의 보기 번호와 서로 다른 기준입니다.'),node('p','seq2seq-scope',config.reversal.scope),source(config.reversal.source));

      function selectedExample(){return config.examples.find(e=>e.id===exampleId);}
      function frames(){const ex=selectedExample();return buildTimeline({sourceTokens:ex.sourceTokens,targetTokens:ex.targetTokens,eos:config.eos,reverseSource});}
      function exampleFrameLabel(frame){return frame.phase==='encode'?'읽기 '+frame.inputToken:frame.phase==='handoff'?'EOS · 표현 전달':'예측 '+frame.prediction;}
      function drawFlow(frame){
        const ex=selectedExample(),order=ex.sourceTokens.map((token,index)=>({token,index}));if(reverseSource)order.reverse();order.push({token:config.eos,index:null});
        const encoder=node('section','seq2seq-flow-cell'),bridge=node('section','seq2seq-flow-cell seq2seq-bridge'),decoder=node('section','seq2seq-flow-cell');
        encoder.append(node('h5','','인코더 LSTM'),node('p','seq2seq-mini-note','한 입력씩 읽으며 같은 연결을 반복 사용'));
        const inputs=node('ol','seq2seq-flow-tokens');for(const [i,item] of order.entries()){const cell=node('li');cell.dataset.past=String(i<frame.readTokens.length);cell.dataset.current=String(frame.phase==='encode'?item.index===frame.sourceIndex:frame.phase==='handoff'&&item.index===null);cell.append(node('strong','',item.token),node('span','',item.index===null?'입력 종료':'원래 위치 '+item.index));inputs.append(cell);}encoder.append(inputs);
        const ready=frame.phase!=='encode';bridge.dataset.ready=String(ready);bridge.append(node('h5','',ready?'문장 표현을 전달':'입력을 읽는 중'),node('div','seq2seq-state-symbol',ready?'v':'…'),node('p','seq2seq-mini-note',ready?'마지막 상태로 디코더를 시작':'아직 마지막 입력에 도달하지 않았다'));
        decoder.append(node('h5','','디코더 LSTM'),node('p','seq2seq-mini-note','별도 연결로 이전 출력과 상태를 이어 사용'));
        const outputs=node('ol','seq2seq-flow-tokens');for(const [i,token] of [...ex.targetTokens,config.eos].entries()){const cell=node('li');cell.dataset.past=String(i<frame.targetPrefix.length);cell.dataset.current=String(frame.phase==='decode'&&i===frame.targetPrefix.length-1);cell.append(node('strong','',token),node('span','',i===0?'첫 조건 · v':'이전 출력 · '+ex.targetTokens[i-1]));outputs.append(cell);}decoder.append(outputs);
        const arrow1=node('span','seq2seq-flow-arrow','→'),arrow2=node('span','seq2seq-flow-arrow','→');arrow1.setAttribute('aria-hidden','true');arrow2.setAttribute('aria-hidden','true');flow.replaceChildren(encoder,arrow1,bridge,arrow2,decoder);
      }
      function updateRepresentation(){
        if(disposed)return;const ex=selectedExample(),all=frames();cursor=Math.max(0,Math.min(cursor,all.length-1));const frame=all[cursor];root.dataset.example=exampleId;root.dataset.order=reverseSource?'reverse':'forward';root.dataset.frame=String(cursor);root.dataset.phase=frame.phase;
        mark(exampleButtons,'example',exampleId);mark(orderButtons,'order',String(reverseSource));translation.textContent=ex.translation;exampleScope.textContent=ex.scope;exampleSource.replaceChildren(source(ex.source));
        first.disabled=previous.disabled=cursor===0;next.disabled=last.disabled=cursor===all.length-1;
        frameStatus.textContent='보기 '+(cursor+1)+' / '+all.length+' · '+exampleFrameLabel(frame)+(frame.finished?' · 출력 종료':'');
        for(const [i,button] of frameButtons.entries()){button.hidden=i>=all.length;if(i<all.length){button.textContent=(i+1)+' · '+exampleFrameLabel(all[i]);button.setAttribute('aria-pressed',String(i===cursor));button.classList.toggle('active',i===cursor);}}
        readLine.textContent='지금까지 읽은 입력 · '+sequence(frame.readTokens);
        conditionLine.textContent=frame.phase==='decode'?'이번 예측 이전의 출력 · '+sequence(frame.targetPrefix.slice(0,-1))+(frame.inputToken===null?' · 첫 단어는 v 조건부':' · 직전 입력 '+frame.inputToken):'아직 출력 예측을 시작하지 않았다.';
        outputLine.textContent='현재까지 예측한 출력 · '+sequence(frame.targetPrefix);drawFlow(frame);
      }
      function search(){return beamSearch({...config.beam,width});}
      function hypothesisLine(item,cls){const line=node('div',cls||'seq2seq-hypothesis');line.append(node('strong','',sequence(item.tokens)),node('span','','누적 확률 '+number(item.probability)+' · log '+number(item.logScore)));return line;}
      function updatePrefixes(){
        if(disposed)return;mark(prefixButtons,'prefix',prefixIndex);const result=search(),best=result.best,reference=[...config.beam.referenceTokens,config.beam.eos];
        const training=node('section'),generation=node('section');training.append(node('h5','','학습 · 준비한 정답의 이전 단어'),node('p','seq2seq-prefix-text',sequence(reference.slice(0,prefixIndex))),node('p','','이번 정답 · '+reference[prefixIndex]));
        generation.append(node('h5','','생성 · 선택한 완료 후보의 접두사'));
        if(!best)generation.append(node('p','','이 설정에서는 완료 후보가 없다.'));else{const endedBefore=prefixIndex>=best.tokens.length;generation.append(node('p','seq2seq-prefix-text',sequence(best.tokens.slice(0,Math.min(prefixIndex,best.tokens.length)))),node('p','',endedBefore?'이미 EOS로 끝났으므로 다음 출력을 만들지 않는다.':'이번 선택 · '+best.tokens[prefixIndex]));}
        if(prefixIndex===0){training.append(node('p','seq2seq-mini-note','첫 출력은 이전 단어 없이 v에 조건부다.'));generation.append(node('p','seq2seq-mini-note','별도의 BOS 기호를 여기서 만들지 않는다.'));}prefixCards.replaceChildren(training,generation);
      }
      function updateBeam(){
        if(disposed)return;const result=search();beamStep=Math.max(0,Math.min(beamStep,result.trace.length-1));const frame=result.trace[beamStep],previousFrame=beamStep?result.trace[beamStep-1]:null;root.dataset.width=String(width);root.dataset.beamStep=String(beamStep);mark(widthButtons,'width',width);
        beamFirst.disabled=beamPrevious.disabled=beamStep===0;beamNext.disabled=beamLast.disabled=beamStep===result.trace.length-1;
        beamStatus.textContent='확장 '+beamStep+' / '+(result.trace.length-1)+' · 폭 '+width+' · 계속 '+frame.active.length+'개 · 완료 보관 '+frame.completed.length+'개';
        candidateTable.replaceChildren();if(!frame.candidates.length)candidateTable.append(node('p','seq2seq-empty','아직 출력 후보를 확장하지 않았습니다. 처음에는 빈 접두사 하나를 유지합니다.'));else{
          const pane=node('div','seq2seq-table-viewport');pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확장 후보의 조건부 확률과 누적 점수');const table=node('table'),head=node('thead'),tr=node('tr');for(const title of ['후보 접두사','이번 조건부 확률','누적 확률','누적 log 확률','판정'])tr.append(node('th','',title));head.append(tr);table.append(head);const body=node('tbody'),retained=new Set(frame.retained.map(h=>JSON.stringify(h.tokens)));
          for(const item of frame.candidates){const row=node('tr'),kept=retained.has(JSON.stringify(item.tokens)),prefix=item.tokens.slice(0,-1),parent=previousFrame.active.find(h=>JSON.stringify(h.tokens)===JSON.stringify(prefix)),conditional=parent?Math.exp(item.logScore-parent.logScore):NaN;row.dataset.kept=String(kept);row.dataset.ended=String(item.ended);for(const text of [sequence(item.tokens),number(conditional),number(item.probability),number(item.logScore),kept?(item.ended?'완료로 보관':'계속 유지'):'버림'])row.append(node('td','',text));body.append(row);}table.append(body);pane.append(table);candidateTable.append(pane);
        }
        beamActive.replaceChildren(...(frame.active.length?frame.active.map(h=>hypothesisLine(h)):[node('p','seq2seq-empty','계속 이어 갈 후보가 없습니다.')]));beamCompleted.replaceChildren(...(frame.completed.length?frame.completed.map(h=>hypothesisLine(h,'seq2seq-hypothesis is-complete')):[node('p','seq2seq-empty','아직 보관한 완료 후보가 없습니다.')]));
        beamBest.replaceChildren(node('h5','','이 폭으로 끝까지 탐색해 선택한 완료 후보'),...(result.best?[hypothesisLine(result.best)]:[node('p','','완료 후보가 없습니다.')]),node('p','seq2seq-mini-note','현재 단계의 1위와 구분한 전체 탐색 결과입니다. 직접 정한 조건부 확률의 곱으로 비교하며 길이 보정이나 번역 정확도를 계산하지 않습니다.'));updatePrefixes();
      }
      function updateReversal(){
        if(disposed)return;const r=config.reversal,normal=lagPairs({...r,sourceLength:r.sourceTokens.length,reverseSource:false}),backward=lagPairs({...r,sourceLength:r.sourceTokens.length,reverseSource:true}),current=reverseCompare?backward:normal,selected=current.pairs[pairIndex];root.dataset.reverseCompare=String(reverseCompare);root.dataset.pair=String(pairIndex);mark(reversalButtons,'reverse',String(reverseCompare));mark(pairButtons,'pair',pairIndex);
        sourceClock.style.gridTemplateColumns='repeat('+r.sourceTokens.length+',minmax(0,1fr))';targetClock.style.gridTemplateColumns='repeat('+r.targetTokens.length+',minmax(0,1fr))';
        const order=r.sourceTokens.map((token,index)=>({token,index}));if(reverseCompare)order.reverse();sourceClock.replaceChildren(...order.map((item,time)=>{const cell=node('div');cell.classList.toggle('selected',item.index===selected.sourceIndex);cell.append(node('strong','',item.token),node('span','','t='+time));return cell;}));
        targetClock.replaceChildren(...r.targetTokens.map((token,index)=>{const cell=node('div');cell.classList.toggle('selected',index===selected.targetIndex);cell.append(node('strong','',token),node('span','','t='+(r.sourceTokens.length+index+r.decoderOffset)));return cell;}));
        const paths=current.pairs.map((pair,index)=>{const from=(pair.sourceTime+.5)/r.sourceTokens.length*100,to=(pair.targetIndex+.5)/r.targetTokens.length*100,active=index===pairIndex,color=active?ACCENT:INK;return `<path d="M${from} 3L${to} 92" stroke="${color}" stroke-width="${active?1.5:.5}" stroke-opacity="${active?1:.16}" fill="none"/><path d="M${to-1.5} 87L${to} 92L${to+1.5} 87" stroke="${color}" stroke-width="${active?1.5:.5}" stroke-opacity="${active?1:.16}" fill="none"/>`;}).join('');
        connections.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 96" preserveAspectRatio="none" role="img" aria-label="직접 정한 대응쌍의 연결이며 실제 attention이 아니다.">'+paths+'</svg>';
        pairStatus.textContent=selected.label+' · 입력을 읽은 t='+selected.sourceTime+' → 대응 출력 t='+selected.outputTime+' · 간격 '+selected.lag;
        for(const key of Object.keys(statValues))statValues[key].textContent=Number.isInteger(current[key])?String(current[key]):number(current[key]);
        const table=node('table'),thead=node('thead'),heading=node('tr');for(const title of ['준비한 대응쌍','정방향 간격','역순 간격'])heading.append(node('th','',title));thead.append(heading);table.append(thead);const tbody=node('tbody');for(let i=0;i<normal.pairs.length;i++){const tr=node('tr');tr.dataset.selected=String(i===pairIndex);for(const text of [normal.pairs[i].label,String(normal.pairs[i].lag),String(backward.pairs[i].lag)])tr.append(node('td','',text));tbody.append(tr);}table.append(tbody);lagTable.replaceChildren(table);
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);represent.hidden=stage!=='represent';generate.hidden=stage!=='generate';reverse.hidden=stage!=='reverse';stageText.textContent=config.stages.find(s=>s.id===stage).text;}
      for(const item of config.stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;updateStage();});stageButtons.push(button);stages.append(button);}
      for(const ex of config.examples){const button=node('button','',ex.label);button.type='button';button.dataset.example=ex.id;listen(button,'click',()=>{exampleId=ex.id;cursor=0;updateRepresentation();});exampleButtons.push(button);exampleControls.append(button);}
      listen(first,'click',()=>{cursor=0;updateRepresentation();});listen(previous,'click',()=>{cursor--;updateRepresentation();});listen(next,'click',()=>{cursor++;updateRepresentation();});listen(last,'click',()=>{cursor=frames().length-1;updateRepresentation();});
      listen(zoomFlow,'click',()=>{flowExpanded=!flowExpanded;flowViewport.dataset.expanded=String(flowExpanded);zoomFlow.textContent=flowExpanded?'문장 흐름 그림 전체 보기':'문장 흐름 그림 확대';zoomFlow.setAttribute('aria-pressed',String(flowExpanded));if(flowExpanded){flowViewport.tabIndex=0;flowViewport.setAttribute('role','region');flowViewport.setAttribute('aria-label','확대한 인코더·디코더 흐름');}else{flowViewport.removeAttribute('tabindex');flowViewport.removeAttribute('role');flowViewport.removeAttribute('aria-label');}});
      listen(evidenceZoom,'click',()=>{evidenceExpanded=!evidenceExpanded;evidencePane.dataset.expanded=String(evidenceExpanded);evidenceZoom.textContent=evidenceExpanded?'원문 문장 표현 그림 전체 보기':'원문 문장 표현 그림 확대';evidenceZoom.setAttribute('aria-pressed',String(evidenceExpanded));if(evidenceExpanded){evidencePane.tabIndex=0;evidencePane.setAttribute('role','region');evidencePane.setAttribute('aria-label','확대한 원문 문장 표현 그림');}else{evidencePane.removeAttribute('tabindex');evidencePane.removeAttribute('role');evidencePane.removeAttribute('aria-label');}});
      for(const value of config.beam.widths){const button=node('button','','폭 '+value);button.type='button';button.dataset.width=String(value);listen(button,'click',()=>{width=value;beamStep=0;updateBeam();});widthButtons.push(button);beamControls.append(button);}
      listen(beamFirst,'click',()=>{beamStep=0;updateBeam();});listen(beamPrevious,'click',()=>{beamStep--;updateBeam();});listen(beamNext,'click',()=>{beamStep++;updateBeam();});listen(beamLast,'click',()=>{beamStep=search().trace.length-1;updateBeam();});
      root.append(stages,stageText,represent,generate,reverse,node('p','seq2seq-scope',config.scope),source(config.source));updateRepresentation();updateBeam();updateReversal();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
