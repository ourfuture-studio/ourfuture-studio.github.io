/* Prepared continuation fragments are revealed; no model or sampling runs here. */
(function(){
  'use strict';
  const LIMIT=1024;
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function tokenList(value,name,allowEmpty){if(!Array.isArray(value)||(!allowEmpty&&!value.length)||value.length>LIMIT||!Array.from(value).every(hasText))throw new TypeError(name+' must be a bounded array of nonempty token strings.');return value.slice();}
  function buildContinuation(options){
    if(!options||typeof options!=='object')throw new TypeError('Continuation options are required.');
    const prompt=tokenList(options.promptTokens,'promptTokens',false),continuation=tokenList(options.continuationTokens,'continuationTokens',true);
    if(prompt.length+continuation.length>LIMIT)throw new RangeError('The prepared prompt and continuation exceed '+LIMIT+' display units.');
    return Array.from({length:continuation.length+1},(_,index)=>({index,promptTokens:prompt.slice(),revealedTokens:continuation.slice(0,index),nextPreparedToken:index<continuation.length?continuation[index]:null,contextTokens:[...prompt,...continuation.slice(0,index)],finished:index===continuation.length}));
  }
  window.AtlasGPT2Model=Object.freeze({buildContinuation});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'gpt2-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['prompt','compare','evidence'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three GPT-2 stages are required.');
    if(!Array.isArray(config.tasks)||!config.tasks.length||new Set(config.tasks.map(t=>t.id)).size!==config.tasks.length)throw new TypeError('Distinct prepared tasks are required.');
    for(const task of config.tasks){
      if(!task||!['id','label','explanation','scope'].every(k=>hasText(task[k]))||!sourced(task.source)||!Array.isArray(task.segments)||!task.segments.length||new Set(task.segments.map(s=>s.id)).size!==task.segments.length||!task.segments.every(s=>s&&['id','label','role','text'].every(k=>hasText(s[k]))))throw new TypeError('Prepared tasks need labeled prompt segments, scope and source.');
      if(buildContinuation(task).length<2)throw new TypeError('The displayed task needs a prepared continuation.');
    }
    const c=config.comparison;
    if(!c||!hasText(c.text)||!['gpt1','gpt2'].every(id=>c[id]&&hasText(c[id].title)&&hasText(c[id].text))||!hasText(c.scope)||!sourced(c.source))throw new TypeError('The protocol comparison needs text and scope.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original evidence needs local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('text-to-task',{
    mount(host,config){
      validate(config);
      const root=node('div','gpt2-multitask'),listeners=[],stageButtons=[],taskButtons=[],protocolButtons=[],evidenceButtons=[];
      let stage='prompt',taskId=config.tasks[0].id,cursor=0,protocol='gpt2',evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'gpt2-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const selected=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(selected));el.classList.toggle('active',selected);}};
      const stages=group('GPT-2의 글 속 과제를 읽는 단계','gpt2-stage-controls'),stageText=node('p','gpt2-stage-text'),prompt=node('section','gpt2-prompt-panel'),compare=node('section','gpt2-compare-panel'),evidence=node('section','gpt2-evidence');
      const tasks=group('글의 형식으로 지정한 세 과제'),taskTitle=node('h4'),taskText=node('p','gpt2-prose'),segments=node('div','gpt2-segments'),model=node('div','gpt2-model'),modelContext=node('p','gpt2-model-context'),output=node('div','gpt2-language-output');
      model.append(node('span','gpt2-fixed-label','θ 고정'),node('strong','','같은 사전학습 디코더'),node('p','','가중치는 그대로 두고, 현재 문맥에 맞춰 읽는 중의 표현을 다시 계산하는 구조입니다.'),modelContext);
      output.append(node('strong','','같은 다음 토큰의 어휘 출력'),node('p','','요약·번역·답변도, 지금까지의 글 뒤에 이어지는 말로 다룹니다. 과제마다 새 출력층을 붙이지 않습니다.'));
      const engineFlow=node('div','gpt2-engine-flow'),engineArrow=node('div','gpt2-engine-arrow');engineArrow.setAttribute('aria-hidden','true');engineArrow.append(node('span','','→'));engineFlow.append(model,engineArrow,output);
      const play=group('직접 준비한 이어쓰기의 보기 위치','gpt2-play-controls'),first=button('처음',play,()=>{cursor=0;updatePrompt();}),previous=button('이전',play,()=>{cursor--;updatePrompt();}),next=button('다음',play,()=>{cursor++;updatePrompt();}),last=button('끝',play,()=>{cursor=timeline().length-1;updatePrompt();});
      for(const [el,label] of [[first,'준비한 이어쓰기 처음 보기'],[previous,'준비한 이어쓰기 이전 보기'],[next,'준비한 이어쓰기 다음 보기'],[last,'준비한 이어쓰기 마지막 보기']])el.setAttribute('aria-label',label);
      const status=node('p','gpt2-selection-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');const revealed=node('div','gpt2-revealed'),tokenDetails=node('details','gpt2-details'),contextTokens=node('div','gpt2-token-row');tokenDetails.append(node('summary','','현재 문맥을 보기 단위로 살펴보기'),contextTokens);
      const taskRange=node('details','gpt2-details'),taskScope=node('p','gpt2-scope'),taskSource=node('div');taskRange.append(node('summary','','이 과제 보기의 조건과 출처'),taskScope,taskSource);
      prompt.append(node('h4','','과제를 글의 앞부분에 담으면, 같은 모형이 이어 쓸 수 있을까?'),tasks,taskTitle,taskText,segments,node('div','gpt2-flow-arrow','↓'),engineFlow,node('p','gpt2-prepared-label','직접 준비한 이어쓰기'),play,status,revealed,node('p','gpt2-feedback','↑ 이어 붙인 말도 다음 위치의 문맥으로 들어갑니다. θ는 그대로입니다.'),tokenDetails,taskRange);

      const protocols=group('과제 적응 때 가중치를 바꾸는지 비교'),protocolTitle=node('h4'),protocolText=node('p','gpt2-prose'),protocolFlow=node('div','gpt2-protocol-flow'),protocolStatus=node('p','gpt2-selection-status');protocolStatus.setAttribute('role','status');protocolStatus.setAttribute('aria-live','polite');
      const comparisonRange=node('details','gpt2-details');comparisonRange.append(node('summary','','원문의 zero-shot과 비교의 범위'),node('p','gpt2-scope',config.comparison.scope),source(config.comparison.source));
      compare.append(node('h4','','과제의 정답으로 가중치를 바꿀까, 문맥으로 과제를 알려 줄까?'),node('p','gpt2-prose',config.comparison.text),protocols,protocolTitle,protocolText,protocolFlow,protocolStatus,node('p','gpt2-keypoint','원문의 zero-shot은 과제별 파라미터 갱신이 없다는 뜻입니다. 문맥에 예시가 전혀 없다는 뜻으로 한정하지 않습니다.'),comparisonRange);

      const evidenceControls=group('GPT-2 원문 그림과 표 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','gpt2-prose'),evidenceScope=node('p','gpt2-scope'),evidenceSource=node('div'),evidenceCredit=node('p','gpt2-credit'),zoom=node('button','gpt2-zoom','원문 자료 확대'),pane=node('div','gpt2-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);
      evidence.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','gpt2-note','확대하면 자료 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);
      const selectedTask=()=>config.tasks.find(t=>t.id===taskId),timeline=()=>buildContinuation(selectedTask());
      function updatePrompt(){
        if(disposed)return;const task=selectedTask(),frames=timeline();cursor=Math.max(0,Math.min(cursor,frames.length-1));const frame=frames[cursor];root.dataset.task=taskId;root.dataset.frame=String(cursor);root.dataset.finished=String(frame.finished);mark(taskButtons,'task',taskId);taskTitle.textContent=task.label;taskText.textContent=task.explanation;taskScope.textContent=task.scope;taskSource.replaceChildren(source(task.source));
        segments.dataset.count=String(task.segments.length);segments.replaceChildren(...task.segments.map(segment=>{const cell=node('section','gpt2-segment');cell.dataset.role=segment.role;cell.append(node('h5','',segment.label),node('p','gpt2-segment-text',segment.text));return cell;}));
        first.disabled=previous.disabled=cursor===0;next.disabled=last.disabled=frame.finished;status.textContent='준비한 이어쓰기 '+cursor+' / '+(frames.length-1)+'개 공개'+(frame.finished?' · 보기 완료':'');
        modelContext.textContent='현재 문맥 · 입력 '+frame.promptTokens.length+'개 + 이어 붙인 '+frame.revealedTokens.length+'개 보기 단위';
        revealed.replaceChildren(...(frame.revealedTokens.length?frame.revealedTokens.map(token=>node('span','gpt2-token is-revealed',token)):[node('p','gpt2-empty','다음을 누르면 준비한 후속 토큰을 하나씩 볼 수 있습니다.')]));
        contextTokens.replaceChildren(...frame.contextTokens.map((token,i)=>node('span','gpt2-token'+(i>=frame.promptTokens.length?' is-revealed':''),token)));
      }
      function updateComparison(){
        if(disposed)return;const selected=config.comparison[protocol];root.dataset.protocol=protocol;mark(protocolButtons,'protocol',protocol);protocolTitle.textContent=selected.title;protocolText.textContent=selected.text;
        const cells=protocol==='gpt1'?[['사전학습한 θ에서 시작','글에서 배운 가중치를 가져옴'],['과제의 정답으로 미세조정','기존 θ와 새 과제 출력층 Wy를 함께 조정'],['그 과제의 출력을 예측','미세조정한 가중치와 과제 출력층 사용']]:[['과제를 담은 문맥','본문·형식·예시·질문을 글로 제공'],['사전학습 θ는 고정','과제별 추가 학습 없이 같은 디코더 사용'],['같은 어휘에서 다음 말','이어지는 토큰으로 과제 출력을 구성']];
        protocolFlow.replaceChildren(...cells.map(([title,text])=>{const cell=node('div');cell.append(node('strong','',title),node('p','',text));return cell;}));protocolStatus.textContent=protocol==='gpt1'?'과제 적응에서 θ 갱신 · 새 과제 출력층 추가':'과제 적응에서 θ 고정 · 기존 LM 어휘 출력 재사용';
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 자료 전체 보기':'원문 자료 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 GPT-2 원문 자료');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;prompt.hidden=stage!=='prompt';compare.hidden=stage!=='compare';evidence.hidden=stage!=='evidence';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const task of config.tasks){const el=button(task.label,tasks,()=>{taskId=task.id;cursor=0;updatePrompt();});el.dataset.task=task.id;taskButtons.push(el);}
      for(const [id,label] of [['gpt1','GPT-1 · 과제별 미세조정'],['gpt2','GPT-2 · 과제별 가중치 고정']]){const el=button(label,protocols,()=>{protocol=id;updateComparison();});el.dataset.protocol=id;protocolButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      const range=node('details','gpt2-details');range.append(node('summary','','이 카드의 구성과 범위'),node('p','gpt2-scope',config.scope),source(config.source));root.append(stages,stageText,prompt,compare,evidence,range);updatePrompt();updateComparison();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
