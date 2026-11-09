/* Shot count changes the prepared input, never the weights or a claimed score. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function buildShotPrompt(options){
    if(!options||typeof options!=='object'||!['instruction','outputLabel','queryInput'].every(key=>hasText(options[key]))||typeof options.inputLabel!=='string'||(options.inputLabel!==''&&!hasText(options.inputLabel)))throw new TypeError('Instruction, an input label string, an output label and a new query are required.');
    const {instruction,inputLabel,outputLabel,queryInput,shots}=options,demonstrations=options.demonstrations;
    if(!Array.isArray(demonstrations)||!Array.from(demonstrations).every(item=>item&&['id','input','output'].every(key=>hasText(item[key])))||new Set(demonstrations.map(item=>item.id)).size!==demonstrations.length)throw new TypeError('Demonstrations need distinct ids and nonempty inputs and outputs.');
    if(!Number.isSafeInteger(shots)||shots<0||shots>demonstrations.length)throw new RangeError('shots must be an integer from zero to the number of demonstrations.');
    const inputLine=value=>inputLabel===''?value:inputLabel+' '+value;
    const outputSeparator=inputLabel===''?' ':'\n';
    const chosen=demonstrations.slice(0,shots),segments=[{id:'instruction',role:'instruction',text:instruction},...chosen.map(item=>({id:'example-'+item.id,role:'demonstration',text:inputLine(item.input)+outputSeparator+outputLabel+' '+item.output})),{id:'query',role:'query',text:inputLine(queryInput)+outputSeparator+outputLabel}];
    return{shots,usedExampleIds:chosen.map(item=>item.id),segments,promptText:segments.map(segment=>segment.text).join('\n\n')};
  }
  window.AtlasGPT3Model=Object.freeze({buildShotPrompt});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'gpt3-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['shots','compare','evidence'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three GPT-3 stages are required.');
    if(!Array.isArray(config.shotCounts)||!config.shotCounts.length||new Set(config.shotCounts).size!==config.shotCounts.length||!config.shotCounts.includes(config.initialShots)||!Array.isArray(config.tasks)||!config.tasks.length||new Set(config.tasks.map(t=>t.id)).size!==config.tasks.length)throw new TypeError('The viewer needs distinct tasks and selectable shot counts.');
    for(const task of config.tasks){if(!task||!['id','label','preparedAnswer','explanation','scope'].every(key=>hasText(task[key]))||!sourced(task.source))throw new TypeError('Every task needs a prepared answer, explanation, scope and source.');for(const shots of config.shotCounts)buildShotPrompt({...task,shots});}
    const c=config.comparison;if(!c||!hasText(c.text)||!['finetune','incontext'].every(id=>c[id]&&hasText(c[id].title)&&hasText(c[id].text))||!hasText(c.scope)||!sourced(c.source))throw new TypeError('The training comparison needs text and sources.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(key=>hasText(e[key]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original evidence needs local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('examples-in-context',{
    mount(host,config){
      validate(config);
      const root=node('div','gpt3-incontext'),listeners=[],stageButtons=[],taskButtons=[],shotButtons=[],protocolButtons=[],evidenceButtons=[];
      let stage='shots',taskId=config.tasks[0].id,shots=config.initialShots,answerOpen=false,protocol='incontext',evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'gpt3-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const selected=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(selected));el.classList.toggle('active',selected);}};
      const stages=group('GPT-3의 문맥 속 예시를 읽는 단계','gpt3-stage-controls'),stageText=node('p','gpt3-stage-text'),shotPanel=node('section','gpt3-shots-panel'),compare=node('section','gpt3-compare-panel'),evidence=node('section','gpt3-evidence');
      const tasks=group('문맥에 넣을 과제 선택'),shotControls=group('입력 문맥에 넣는 정답 예시의 수','gpt3-shot-controls'),taskTitle=node('h4'),taskText=node('p','gpt3-prose'),shotStatus=node('p','gpt3-selection-status'),segments=node('div','gpt3-segments');shotStatus.setAttribute('role','status');shotStatus.setAttribute('aria-live','polite');
      const model=node('div','gpt3-model'),modelContext=node('p','gpt3-model-context'),output=node('div','gpt3-language-output');model.append(node('span','gpt3-fixed-label','사전학습 θ 고정'),node('strong','','같은 디코더에서 문맥을 읽다'),node('p','','입력 예시가 달라지면 읽는 중의 표현은 달라질 수 있지만, 그 예시로 가중치를 갱신하지 않습니다.'),modelContext);output.append(node('strong','','같은 다음 토큰의 어휘 출력'),node('p','','과제마다 새 출력층을 붙이는 대신, 입력의 형식에 맞는 뒤의 말을 이어 쓰도록 합니다.'));
      const engine=node('div','gpt3-engine-flow'),engineArrow=node('div','gpt3-engine-arrow');engineArrow.setAttribute('aria-hidden','true');engineArrow.append(node('span','','→'));engine.append(model,engineArrow,output);
      const answerControls=group('모델 출력과 구분한 준비한 답'),answerButton=button('준비한 답 보기',answerControls,()=>{answerOpen=!answerOpen;updateAnswer();}),answer=node('div','gpt3-prepared-answer');answerButton.setAttribute('aria-expanded','false');
      const taskRange=node('details','gpt3-details'),taskScope=node('p','gpt3-scope'),taskSource=node('div');taskRange.append(node('summary','','이 예시와 shot 수의 범위'),taskScope,taskSource);
      shotPanel.append(node('h4','','몇 개의 정답 예시를, 새 질문 앞에 놓아 보면?'),tasks,taskTitle,taskText,shotControls,shotStatus,segments,node('div','gpt3-flow-arrow','↓'),engine,node('p','gpt3-keypoint','바뀌는 것은 입력의 예시 수입니다. 새 질문과 지시문, 배운 가중치는 그대로 둡니다.'),answerControls,answer,taskRange);

      const protocols=group('정답 예시를 사용하는 두 방법'),protocolTitle=node('h4'),protocolText=node('p','gpt3-prose'),protocolFlow=node('div','gpt3-protocol-flow'),protocolStatus=node('p','gpt3-selection-status');protocolStatus.setAttribute('role','status');protocolStatus.setAttribute('aria-live','polite');const comparisonRange=node('details','gpt3-details');comparisonRange.append(node('summary','','비교하는 학습·평가 조건'),node('p','gpt3-scope',config.comparison.scope),source(config.comparison.source));
      compare.append(node('h4','','예시로 가중치를 학습할까, 예시를 문맥으로 읽힐까?'),node('p','gpt3-prose',config.comparison.text),protocols,protocolTitle,protocolText,protocolFlow,protocolStatus,node('p','gpt3-keypoint','문맥에 맞춰 중간 표현을 계산하는 변화와, 학습으로 저장된 가중치를 바꾸는 변화는 다릅니다.'),comparisonRange);

      const evidenceControls=group('GPT-3 원문 자료 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','gpt3-prose'),evidenceScope=node('p','gpt3-scope'),evidenceSource=node('div'),evidenceCredit=node('p','gpt3-credit'),zoom=node('button','gpt3-zoom','원문 자료 확대'),pane=node('div','gpt3-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);
      evidence.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','gpt3-note','확대하면 자료 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);
      const selectedTask=()=>config.tasks.find(task=>task.id===taskId);
      function updateShots(){
        if(disposed)return;const task=selectedTask(),prepared=buildShotPrompt({...task,shots});root.dataset.task=taskId;root.dataset.shots=String(shots);mark(taskButtons,'task',taskId);mark(shotButtons,'shots',shots);taskTitle.textContent=task.label;taskText.textContent=task.explanation;taskScope.textContent=task.scope;taskSource.replaceChildren(source(task.source));shotStatus.textContent='지시문 1개 · 문맥 예시 '+shots+'개 · 같은 새 질문 1개';segments.dataset.many=String(shots>1);
        segments.replaceChildren(...prepared.segments.map((segment,i)=>{const cell=node('section','gpt3-segment');cell.dataset.role=segment.role;const label=segment.role==='instruction'?'모든 shot에서 같은 지시문':segment.role==='query'?'모든 shot에서 같은 새 질문':'문맥에 넣은 정답 예시 '+i;cell.append(node('h5','',label),node('p','gpt3-segment-text',segment.text));return cell;}));modelContext.textContent='현재 입력 · 지시문 + '+shots+'개 예시 + 새 질문. θ는 고정';updateAnswer();
      }
      function updateAnswer(){if(disposed)return;const task=selectedTask();root.dataset.answerOpen=String(answerOpen);answerButton.textContent=answerOpen?'준비한 답 접기':'준비한 답 보기';answerButton.setAttribute('aria-expanded',String(answerOpen));answer.hidden=!answerOpen;answer.replaceChildren(node('span','','직접 준비한 답'),node('strong','',task.preparedAnswer));}
      function updateComparison(){
        if(disposed)return;const item=config.comparison[protocol];root.dataset.protocol=protocol;mark(protocolButtons,'protocol',protocol);protocolTitle.textContent=item.title;protocolText.textContent=item.text;
        const steps=protocol==='finetune'?[['정답이 있는 학습 예시','예측 오차를 계산할 자료로 사용'],['가중치를 갱신','오차를 역전파해 기존 파라미터 등을 조정'],['조정한 가중치로 새 질문','학습 뒤의 파라미터로 과제 수행']]:[['입력 앞부분의 정답 예시','예시의 입력·출력을 문맥에 포함'],['가중치는 고정','지금 문맥에 맞춰 중간 표현을 계산'],['같은 새 질문 뒤를 이어 쓰기','그 질문의 정답은 입력에 넣지 않음']];
        protocolFlow.replaceChildren(...steps.map(([title,text])=>{const cell=node('div');cell.append(node('strong','',title),node('p','',text));return cell;}));protocolStatus.textContent=protocol==='finetune'?'정답 예시 → 학습 오차 → 가중치 갱신':'정답 예시 → 현재 입력 문맥 · 가중치 갱신 없음';
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 자료 전체 보기':'원문 자료 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 GPT-3 원문 자료');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;shotPanel.hidden=stage!=='shots';compare.hidden=stage!=='compare';evidence.hidden=stage!=='evidence';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const task of config.tasks){const el=button(task.label,tasks,()=>{taskId=task.id;answerOpen=false;updateShots();});el.dataset.task=task.id;taskButtons.push(el);}
      for(const count of config.shotCounts){const label=count===0?'zero-shot · 예시 0개':count===1?'one-shot · 예시 1개':'few-shot · 예시 '+count+'개',el=button(label,shotControls,()=>{shots=count;answerOpen=false;updateShots();});el.dataset.shots=String(count);shotButtons.push(el);}
      for(const [id,label] of [['finetune','정답 예시로 미세조정'],['incontext','정답 예시를 문맥에']]){const el=button(label,protocols,()=>{protocol=id;updateComparison();});el.dataset.protocol=id;protocolButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      const range=node('details','gpt3-details');range.append(node('summary','','이 카드의 구성과 범위'),node('p','gpt3-scope',config.scope),source(config.source));root.append(stages,stageText,shotPanel,compare,evidence,range);updateShots();updateComparison();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
