/* Authored token sequences and logits illustrate the objectives, not a GPT-1 run. */
(function(){
  'use strict';
  const LIMIT=512;
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const finite=value=>{if(!Number.isFinite(value))throw new RangeError('The chosen values overflow the calculation.');return value;};
  const index=(value,length,name)=>{if(!Number.isSafeInteger(value)||value<0||value>=length)throw new RangeError(name+' must name an existing position.');return value;};
  function tokens(value,name,min=1){
    if(!Array.isArray(value)||value.length<min||value.length>LIMIT||!value.every(hasText))throw new TypeError(name+' must contain '+min+' to '+LIMIT+' nonempty token strings.');
    return value.slice();
  }
  function causalTargets(options){
    if(!options||typeof options!=='object')throw new TypeError('Token options are required.');
    const input=tokens(options.tokens,'tokens',2);
    return input.slice(0,-1).map((_,i)=>({index:i,inputIndex:i,targetIndex:i+1,prefixTokens:input.slice(0,i+1),allowedIndices:Array.from({length:i+1},(_,j)=>j),blockedIndices:Array.from({length:input.length-i-1},(_,j)=>i+j+1),targetToken:input[i+1]}));
  }
  function serializeTask(options){
    if(!options||typeof options!=='object')throw new TypeError('Task options are required.');
    const {kind,fields,markers}=options;
    if(!['classification','entailment','similarity','choice'].includes(kind)||!fields||typeof fields!=='object'||!markers||!['start','delimiter','extract'].every(k=>hasText(markers[k]))||new Set([markers.start,markers.delimiter,markers.extract]).size!==3)throw new TypeError('A supported task, fields and three distinct markers are required.');
    const reserved=[markers.start,markers.delimiter,markers.extract];
    const content=(value,name)=>{const result=tokens(value,name);if(result.some(t=>reserved.includes(t)))throw new RangeError('Task content must not contain a reserved marker.');return result;};
    const row=(id,label,parts)=>{const values=[markers.start,...parts,markers.extract];if(values.length>LIMIT)throw new RangeError('A serialized task row exceeds '+LIMIT+' tokens.');return{id,label,tokens:values,extractIndex:values.length-1};};
    let rows,combine;
    if(kind==='classification'){rows=[row(kind,'분류할 문장',content(fields.text,'text'))];combine='single';}
    else if(kind==='entailment'){rows=[row(kind,'전제 → 가설',[...content(fields.premise,'premise'),markers.delimiter,...content(fields.hypothesis,'hypothesis')])];combine='single';}
    else if(kind==='similarity'){
      const first=content(fields.first,'first'),second=content(fields.second,'second');
      rows=[row('forward','첫 문장 → 둘째 문장',[...first,markers.delimiter,...second]),row('reverse','둘째 문장 → 첫 문장',[...second,markers.delimiter,...first])];combine='sum-representations';
    }else{
      const context=content(fields.context,'context'),question=content(fields.question,'question');
      if(!Array.isArray(fields.answers)||!fields.answers.length||fields.answers.length>16||!fields.answers.every(a=>a&&hasText(a.id)&&hasText(a.label))||new Set(fields.answers.map(a=>a.id)).size!==fields.answers.length)throw new TypeError('Choices need one to sixteen distinct answer ids and labels.');
      rows=fields.answers.map(answer=>row(answer.id,answer.label,[...context,...question,markers.delimiter,...content(answer.tokens,'answer tokens')]));combine='choice-softmax';
    }
    return{kind,rows,combine};
  }
  function distribution(logits,target,name){
    if(!Array.isArray(logits)||!logits.length||logits.length>LIMIT||!logits.every(Number.isFinite))throw new TypeError(name+' must be a nonempty finite logit vector.');
    index(target,logits.length,name+' target');
    const maximum=Math.max(...logits),exponentials=logits.map(value=>Math.exp(value-maximum)),sum=exponentials.reduce((a,b)=>a+b,0),probs=exponentials.map(value=>value/sum);
    const nll=finite(finite(maximum-logits[target])+Math.log(sum));
    return{probs,nll,gradient:probs.map((p,i)=>p-(i===target?1:0))};
  }
  function objective(options){
    if(!options||typeof options!=='object')throw new TypeError('Objective options are required.');
    const lambda=options.lambda;
    if(!Number.isFinite(lambda)||lambda<0)throw new RangeError('lambda must be finite and nonnegative.');
    const task=distribution(options.taskLogits,options.targetIndex,'taskLogits');
    if(!Array.isArray(options.lmLogits)||!options.lmLogits.length||options.lmLogits.length>LIMIT||!Array.isArray(options.lmTargets)||options.lmTargets.length!==options.lmLogits.length)throw new TypeError('LM logits and targets need matching nonempty rows.');
    const width=options.lmLogits[0]?.length;
    if(!options.lmLogits.every(row=>Array.isArray(row)&&row.length===width))throw new TypeError('LM logits must have a fixed vocabulary width.');
    const lm=options.lmLogits.map((row,i)=>distribution(row,options.lmTargets[i],'lmLogits'));
    const lmNll=lm.reduce((sum,item)=>finite(sum+item.nll),0),weightedLm=finite(lambda*lmNll),jointNll=finite(task.nll+weightedLm);
    return{taskProbs:task.probs,taskNll:task.nll,lmTokenProbs:lm.map(item=>item.probs),lmTokenNll:lm.map(item=>item.nll),lmNll,weightedLm,jointNll,gradTaskLogits:task.gradient,gradLmLogits:lm.map(item=>item.gradient.map(value=>lambda===0?0:finite(lambda*value)))};
  }
  window.AtlasGPT1Model=Object.freeze({causalTargets,serializeTask,objective});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const number=value=>Math.abs(value)<.00005?'0.0000':value.toFixed(4);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const sourced=value=>value&&hasText(value.title)&&hasText(value.url);
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'gpt1-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['experience','transfer','evidence'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three GPT-1 stages are required.');
    const ex=config.experience;if(!ex||!['translation','scope'].every(k=>hasText(ex[k]))||!sourced(ex.source))throw new TypeError('The text example needs scope and source.');causalTargets(ex);
    const tr=config.transfer;
    if(!tr||!Array.isArray(tr.tasks)||!tr.tasks.length||new Set(tr.tasks.map(t=>t.id)).size!==tr.tasks.length||!tr.tasks.every(t=>t&&['id','label','output','explanation','scope'].every(k=>hasText(t[k]))&&sourced(t.source))||!hasText(tr.scope)||!sourced(tr.source))throw new TypeError('Transfer tasks need labeled inputs, output descriptions, scope and source.');
    for(const task of tr.tasks)serializeTask({...task,markers:tr.markers});
    const loss=tr.loss;
    if(!loss||!Array.isArray(loss.taskLabels)||!loss.taskLabels.length||!loss.taskLabels.every(hasText)||loss.taskLabels.length!==loss.taskLogits?.length||!Array.isArray(loss.lmVocabulary)||!loss.lmVocabulary.length||!loss.lmVocabulary.every(hasText)||!Array.isArray(loss.lambdaValues)||!loss.lambdaValues.length||new Set(loss.lambdaValues).size!==loss.lambdaValues.length||!loss.lambdaValues.includes(loss.initialLambda)||!hasText(loss.scope)||!sourced(loss.source))throw new TypeError('The separate loss example needs labels, settings and scope.');
    for(const lambda of loss.lambdaValues){objective({...loss,lambda});if(loss.lmLogits.some(row=>row.length!==loss.lmVocabulary.length))throw new RangeError('LM labels must match the logit vocabulary.');}
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original figures need local files, captions and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs a scope and source.');
  }
  window.AtlasVisuals.register('language-to-task',{
    mount(host,config){
      validate(config);
      const root=node('div','gpt1-transfer'),listeners=[],stageButtons=[],frameButtons=[],taskButtons=[],lambdaButtons=[],evidenceButtons=[];
      let stage='experience',cursor=0,taskId=(config.transfer.tasks.find(t=>t.kind==='classification')||config.transfer.tasks[0]).id,lambda=config.transfer.loss.initialLambda,evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const frames=causalTargets(config.experience);
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'gpt1-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const selected=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(selected));el.classList.toggle('active',selected);}};
      const stages=group('GPT-1이 문장에서 과제로 배우는 단계','gpt1-stage-controls'),stageText=node('p','gpt1-stage-text'),experience=node('section','gpt1-experience'),transfer=node('section','gpt1-task-transfer'),evidence=node('section','gpt1-evidence');
      const play=group('다음 토큰의 학습 위치','gpt1-play-controls'),first=button('처음',play,()=>{cursor=0;updateExperience();}),previous=button('이전',play,()=>{cursor--;updateExperience();}),next=button('다음',play,()=>{cursor++;updateExperience();}),last=button('끝',play,()=>{cursor=frames.length-1;updateExperience();});
      for(const [el,label] of [[first,'다음 토큰 처음 보기'],[previous,'다음 토큰 이전 보기'],[next,'다음 토큰 다음 보기'],[last,'다음 토큰 마지막 보기']])el.setAttribute('aria-label',label);
      const frameStatus=node('p','gpt1-selection-status');frameStatus.setAttribute('role','status');frameStatus.setAttribute('aria-live','polite');
      const prefix=node('div','gpt1-token-row'),future=node('div','gpt1-token-row'),target=node('div','gpt1-next-target'),pretrainFlow=node('div','gpt1-pretrain-flow');
      const framePicker=node('details','gpt1-details'),frameList=group('다음 토큰 위치 직접 선택');framePicker.append(node('summary','','학습 위치 직접 고르기'),frameList);
      for(const frame of frames){const el=button((frame.inputIndex+1)+' · '+config.experience.tokens[frame.inputIndex]+' → '+frame.targetToken,frameList,()=>{cursor=frame.index;updateExperience();});el.dataset.frame=String(frame.index);frameButtons.push(el);}
      experience.append(node('h4','','문장의 다음 말 자체를, 학습의 정답으로'),node('p','gpt1-prose','문장에 따로 과제 이름이나 분류표를 붙이지 않아도, 앞부분 뒤에 실제로 나온 말은 다음 토큰 예측의 정답이 됩니다. 여러 문장에서 이 예측의 오차를 줄이며, 이후 과제에 옮겨 쓸 표현을 학습하려 했습니다.'),node('p','gpt1-prose',config.experience.translation),play,frameStatus,node('h5','','디코더에 주어진 앞부분'),prefix,node('h5','','이 위치에서 아직 참고할 수 없는 말'),future,pretrainFlow,target,node('p','gpt1-feedback','↑ 다음 말을 더 잘 예측하도록, 기존 디코더 θ와 단어·위치 표현 및 LM 출력 연결을 학습'),node('p','gpt1-note','오른쪽의 정답은 손실을 계산하는 데 쓰며, 현재 예측의 입력으로 미리 넣지 않습니다. 이 화면의 단어 분할은 직접 정했고 실제 GPT-1 BPE를 실행한 결과가 아닙니다.'),framePicker,node('p','gpt1-scope',config.experience.scope),source(config.experience.source));

      const tasks=group('원문에서 바꾼 네 가지 과제 입력'),taskTitle=node('h4'),taskExplanation=node('p','gpt1-prose'),taskRows=node('div','gpt1-task-rows'),combine=node('div','gpt1-combine'),taskOutput=node('p','gpt1-output-description'),taskScope=node('p','gpt1-scope'),taskSource=node('div');
      const lineage=node('div','gpt1-lineage');
      for(const [heading,text] of [['먼저 언어를 학습한 θ','12개 decoder block과 학습한 단어·위치 표현'],['각 과제의 시작점으로','같은 사전학습 가중치에서 과제별로 별도 시작'],['정답 과제에 맞게 조정','기존 디코더 θ + 새 Wy + 새 특수 기호 표현']]){const cell=node('div');cell.append(node('strong','',heading),node('p','',text));lineage.append(cell);}
      const updateDiagram=node('div','gpt1-update-diagram');
      for(const [heading,text] of [['기존 디코더 θ','↑ 과제 손실의 기울기를 뒤로 전달해 기존 가중치도 갱신'],['추가된 출력층 Wy','↑ 정답 종류에 맞게 새 출력 연결을 학습'],['특수 기호의 표현','↑ Start·Delim·Extract의 새 입력 표현도 학습']]){const cell=node('div');cell.append(node('strong','',heading),node('p','',text));updateDiagram.append(cell);}
      const lossDetails=node('details','gpt1-details');lossDetails.append(node('summary','','별도 분류 예시 · 과제 손실과 LM 보조항 확인'));const lossBody=node('div'),lambdaControls=group('별도 분류 계산의 LM 보조항 계수'),lossValues=node('div','gpt1-loss-values'),lossTables=node('div');
      lossBody.append(node('p','gpt1-prose','아래 점수(logit)는 손실의 합을 추적하도록 직접 정했습니다. 위 문장을 실제 GPT-1에 넣어 얻은 값이나, 디코더의 표현을 고정해 분류층만 학습한 실험 결과가 아닙니다.'),lambdaControls,lossValues,node('p','gpt1-note','λ를 바꾸면 같은 점수에서 손실을 합산하는 기준이 달라집니다. 이 값으로 λ가 다른 모형의 성능을 비교하지 않습니다.'),lossTables,node('p','gpt1-note','표의 기울기는 점수(logit)에 대한 국소 미분입니다. 디코더 전체의 역전파나 가중치 갱신을 이 화면에서 실행하지 않습니다. 실제 미세조정은 기존 θ에도 학습 신호를 전달합니다.'),node('p','gpt1-scope',config.transfer.loss.scope),source(config.transfer.loss.source));lossDetails.append(lossBody);
      transfer.append(node('h4','','언어를 배운 가중치를, 과제의 출발점으로'),lineage,node('p','gpt1-prose','같은 디코더의 표현을 쓰되, 입력을 과제에 맞게 배열하고 정답을 예측하는 출력층을 더합니다. 미세조정에서는 출력층만이 아니라 기존 디코더 가중치도 함께 바뀝니다.'),tasks,taskTitle,taskExplanation,taskRows,combine,taskOutput,node('p','gpt1-note','LM 출력은 어휘에서 다음 토큰의 확률을 구하고, Wy 출력은 선택한 과제의 정답 종류나 후보의 점수를 구합니다. 두 출력이 구분됩니다.'),node('h5','','과제 정답으로 다시 배우는 파라미터'),updateDiagram,node('p','gpt1-prose','정답으로 가중치를 다시 조정하는 미세조정입니다. 몇 개의 예시를 입력에 넣고 가중치를 고정한 채 답하게 하는 방식과 구분합니다.'),node('p','gpt1-note','과제 선택은 각각 별도로 미세조정한 설정을 비교합니다. 유사도 두 방향과 선택형 여러 후보는 해당 과제 안에서 같은 디코더 가중치를 공유합니다. 여기서 각 과제를 실제 재학습하지는 않습니다.'),lossDetails,taskScope,taskSource,node('p','gpt1-scope',config.transfer.scope),source(config.transfer.source));

      const evidenceControls=group('GPT-1 원문 그림 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','gpt1-prose'),evidenceScope=node('p','gpt1-scope'),evidenceSource=node('div'),evidenceCredit=node('p','gpt1-credit'),zoom=node('button','gpt1-zoom','원문 그림 확대'),pane=node('div','gpt1-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);
      evidence.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','gpt1-note','확대하면 그림 영역 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);

      function pill(text,cls){return node('span','gpt1-token'+(cls?' '+cls:''),text);}
      function table(headers,rows,label,minWidth){const viewport=node('div','gpt1-table-viewport');viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label',label);const el=node('table'),thead=node('thead'),tr=node('tr');for(const h of headers)tr.append(node('th','',h));thead.append(tr);el.append(thead);const body=node('tbody');for(const values of rows){const line=node('tr');for(const value of values)line.append(node('td','',String(value)));body.append(line);}el.append(body);if(minWidth)el.style.minWidth=minWidth+'px';viewport.append(el);return viewport;}
      function updateExperience(){
        if(disposed)return;cursor=Math.max(0,Math.min(cursor,frames.length-1));const frame=frames[cursor];root.dataset.frame=String(cursor);mark(frameButtons,'frame',cursor);first.disabled=previous.disabled=cursor===0;next.disabled=last.disabled=cursor===frames.length-1;
        frameStatus.textContent='예측 위치 '+(cursor+1)+' / '+frames.length+' · '+frame.prefixTokens.join(' ')+' 다음의 정답은 '+frame.targetToken;
        prefix.replaceChildren(...frame.prefixTokens.map((t,i)=>pill(t,i===frame.inputIndex?'is-current':'')));
        future.replaceChildren(...frame.blockedIndices.map(i=>pill(config.experience.tokens[i],i===frame.targetIndex?'is-target is-blocked':'is-blocked')));
        const decoder=node('div','gpt1-backbone-box'),lm=node('div','gpt1-head-box');decoder.append(node('strong','','공유 decoder θ'),node('p','','지금까지의 앞부분에서 마지막 위치의 표현을 만듭니다.'));lm.append(node('strong','','다음 토큰을 예측하는 LM 출력'),node('p','','문장에 실제로 이어진 말을 더 높은 확률로 예측하도록 학습합니다.'));pretrainFlow.replaceChildren(decoder,node('div','gpt1-flow-arrow','↓'),lm);
        target.replaceChildren(node('span','','본문에서 얻은 다음 정답'),node('strong','',frame.targetToken));
      }
      function updateTask(){
        if(disposed)return;const task=config.transfer.tasks.find(t=>t.id===taskId),serialized=serializeTask({...task,markers:config.transfer.markers});root.dataset.task=taskId;root.dataset.kind=task.kind;mark(taskButtons,'task',taskId);taskTitle.textContent=task.label;taskExplanation.textContent=task.explanation;taskScope.textContent=task.scope;taskSource.replaceChildren(source(task.source));taskRows.replaceChildren();
        const special=new Set(Object.values(config.transfer.markers));
        for(const row of serialized.rows){const card=node('section','gpt1-input-row'),values=node('div','gpt1-token-row');card.append(node('h5','',row.label));for(const [i,value] of row.tokens.entries()){const token=pill(value,special.has(value)?'is-marker':'');if(i===row.extractIndex)token.classList.add('is-extract');values.append(token);}card.append(values,node('p','gpt1-row-route','같은 과제 디코더 θ → 마지막 Extract 위치의 표현 h'));taskRows.append(card);}
        const description=serialized.combine==='sum-representations'?'정방향 h + 역방향 h → 표현을 합한 뒤 Wy로 과제 출력을 계산합니다. 두 확률을 평균하지 않습니다.':serialized.combine==='choice-softmax'?'후보마다 Extract의 표현으로 점수를 만들고, 후보 전체의 점수에 softmax를 적용합니다. 후보들은 같은 디코더와 출력 연결을 공유합니다.':'Extract 위치의 표현 h → 추가한 출력층 Wy → 과제의 정답 종류를 예측합니다.';
        combine.replaceChildren(node('strong','','표현에서 과제 출력으로'),node('p','',description));taskOutput.textContent='이 입력의 출력 종류 · '+task.output;lossDetails.hidden=task.kind!=='classification';
      }
      function updateLoss(){
        if(disposed)return;const loss=config.transfer.loss,result=objective({...loss,lambda});root.dataset.lambda=String(lambda);mark(lambdaButtons,'lambda',lambda);lossValues.replaceChildren();
        for(const [label,value] of [['과제 NLL',result.taskNll],['LM 토큰 NLL의 합',result.lmNll],['λ × LM NLL',result.weightedLm],['합친 NLL',result.jointNll]]){const cell=node('div');cell.append(node('span','',label),node('strong','',number(value)));lossValues.append(cell);}
        lossTables.replaceChildren(node('p','gpt1-formula','최소화할 손실 = 과제 NLL + λ × Σ LM 토큰 NLL'),node('h5','','별도 분류의 점수와 정답'),table(['분류','직접 정한 logit','softmax 확률','∂과제 NLL / ∂logit','정답'],loss.taskLabels.map((label,i)=>[label,number(loss.taskLogits[i]),number(result.taskProbs[i]),number(result.gradTaskLogits[i]),i===loss.targetIndex?'정답':'']), '별도 분류 손실의 직접 계산',640));
        for(let i=0;i<loss.lmLogits.length;i++)lossTables.append(node('h5','','LM 예측 '+(i+1)+' · 정답 '+loss.lmVocabulary[loss.lmTargets[i]]+' · NLL '+number(result.lmTokenNll[i])),table(['LM 후보','직접 정한 logit','softmax 확률','∂합친 NLL / ∂logit','정답'],loss.lmVocabulary.map((word,j)=>[word,number(loss.lmLogits[i][j]),number(result.lmTokenProbs[i][j]),number(result.gradLmLogits[i][j]),j===loss.lmTargets[i]?'정답':'']), 'LM 위치 '+(i+1)+'의 손실과 국소 미분',640));
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 GPT-1 원문 그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;experience.hidden=stage!=='experience';transfer.hidden=stage!=='transfer';evidence.hidden=stage!=='evidence';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const task of config.transfer.tasks){const el=button(task.label,tasks,()=>{taskId=task.id;updateTask();});el.dataset.task=task.id;taskButtons.push(el);}
      for(const value of config.transfer.loss.lambdaValues){const el=button('λ = '+value,lambdaControls,()=>{lambda=value;updateLoss();});el.dataset.lambda=String(value);lambdaButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      root.append(stages,stageText,experience,transfer,evidence,node('p','gpt1-scope',config.scope),source(config.source));updateExperience();updateTask();updateLoss();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
