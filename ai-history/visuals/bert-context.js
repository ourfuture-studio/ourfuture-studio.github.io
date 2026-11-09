/* These views show access and authored corruption plans, not learned attention values. */
(function(){
  'use strict';
  const LIMIT=512;
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function tokens(value,name){if(!Array.isArray(value)||!value.length||value.length>LIMIT||!value.every(hasText))throw new TypeError(name+' must contain one to '+LIMIT+' nonempty token strings.');return value.slice();}
  const index=(value,length)=>{if(!Number.isSafeInteger(value)||value<0||value>=length)throw new RangeError('The selected index must name an existing token.');return value;};
  function contextAccess(options){
    if(!options||typeof options!=='object')throw new TypeError('Context options are required.');
    const input=tokens(options.tokens,'tokens'),focusIndex=index(options.focusIndex,input.length),mode=options.mode;
    if(!['bert','gpt'].includes(mode))throw new TypeError('Context mode must be bert or gpt.');
    const allowedIndices=[],blockedIndices=[];
    for(let i=0;i<input.length;i++)(mode==='bert'||i<=focusIndex?allowedIndices:blockedIndices).push(i);
    return{tokens:input,focusIndex,mode,allowedIndices,blockedIndices};
  }
  function prepareMlm(options){
    if(!options||typeof options!=='object')throw new TypeError('MLM options are required.');
    const originalTokens=tokens(options.tokens,'tokens'),maskToken=options.maskToken;
    if(!hasText(maskToken)||!Array.isArray(options.selections)||options.selections.length>originalTokens.length)throw new TypeError('MLM needs a mask token and a bounded explicit selection plan.');
    const selections=options.selections.map(item=>{if(!item||!['mask','random','same'].includes(item.kind))throw new TypeError('Selections must name mask, random or same.');index(item.index,originalTokens.length);if(item.kind==='random'&&!hasText(item.replacement))throw new TypeError('A random-token example must supply its chosen replacement.');return{index:item.index,kind:item.kind,replacement:item.replacement};});
    if(new Set(selections.map(s=>s.index)).size!==selections.length)throw new RangeError('A token position may be selected only once.');
    selections.sort((a,b)=>a.index-b.index);
    const inputTokens=originalTokens.slice(),targets=selections.map(item=>{const originalToken=originalTokens[item.index],inputToken=item.kind==='mask'?maskToken:item.kind==='random'?item.replacement:originalToken;inputTokens[item.index]=inputToken;return{index:item.index,kind:item.kind,originalToken,inputToken};});
    return{originalTokens,inputTokens,selectedIndices:targets.map(t=>t.index),lossIndices:targets.map(t=>t.index),targets};
  }
  function serializeSegments(options){
    if(!options||typeof options!=='object')throw new TypeError('Segment options are required.');
    const sentenceA=tokens(options.sentenceA,'sentenceA'),sentenceB=tokens(options.sentenceB,'sentenceB'),markers=options.markers;
    if(!markers||!hasText(markers.cls)||!hasText(markers.sep)||markers.cls===markers.sep)throw new TypeError('Two distinct CLS and SEP marker strings are required.');
    if([...sentenceA,...sentenceB].some(token=>token===markers.cls||token===markers.sep))throw new RangeError('Sentence content must not contain a reserved marker.');
    const input=[markers.cls,...sentenceA,markers.sep,...sentenceB,markers.sep];
    if(input.length>LIMIT)throw new RangeError('The serialized sentence pair exceeds '+LIMIT+' tokens.');
    const firstSep=sentenceA.length+1;
    return{tokens:input,segmentIds:input.map((_,i)=>i<=firstSep?0:1),positionIds:input.map((_,i)=>i),clsIndex:0,separatorIndices:[firstSep,input.length-1]};
  }
  window.AtlasBERTModel=Object.freeze({contextAccess,prepareMlm,serializeSegments});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'bert-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['context','pretrain','evidence'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three BERT stages are required.');
    const c=config.context;
    if(!c||!Array.isArray(c.examples)||!c.examples.length||new Set(c.examples.map(e=>e.id)).size!==c.examples.length||!c.examples.every(e=>e&&['id','label','text','scope'].every(k=>hasText(e[k]))&&sourced(e.source))||!Array.isArray(c.modes)||!['bert','gpt'].every(id=>c.modes.some(m=>m.id===id&&hasText(m.label)&&hasText(m.text)))||!hasText(c.scope)||!sourced(c.source))throw new TypeError('Context needs examples, two modes and sources.');
    for(const e of c.examples)contextAccess({...e,mode:'bert'});
    const p=config.pretrain;
    if(!p||!p.example||!hasText(p.example.scope)||!sourced(p.example.source)||!prepareMlm(p.example).targets.length||!hasText(p.scope)||!sourced(p.source))throw new TypeError('Pretraining needs an authored nonempty corruption plan and scope.');
    const r=p.rates;
    if(!r||!['population','selected','conditionalSlots','mask','random','same'].every(k=>Number.isSafeInteger(r[k])&&r[k]>=0)||r.population<1||r.population>200||r.selected<1||r.selected>r.population||r.conditionalSlots<1||r.conditionalSlots>200||r.mask+r.random+r.same!==r.conditionalSlots||!hasText(r.text)||!sourced(r.source))throw new TypeError('The two rate illustrations need valid counts and scope.');
    const n=p.nsp;if(!n||!Array.isArray(n.examples)||!n.examples.length||new Set(n.examples.map(e=>e.id)).size!==n.examples.length||!n.examples.every(e=>e&&['id','label','explanation'].every(k=>hasText(e[k]))&&typeof e.isNext==='boolean')||!hasText(n.scope)||!sourced(n.source))throw new TypeError('NSP needs authored sentence pairs, labels and scope.');for(const e of n.examples)serializeSegments({...e,markers:n.markers});
    if(!p.finetune||!hasText(p.finetune.text)||!hasText(p.finetune.scope)||!sourced(p.finetune.source))throw new TypeError('Fine-tuning needs a text and source.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original evidence needs local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('masked-context',{
    mount(host,config){
      validate(config);
      const root=node('div','bert-context'),listeners=[],stageButtons=[],exampleButtons=[],modeButtons=[],selectionButtons=[],nspButtons=[],evidenceButtons=[];
      let stage='context',exampleId=config.context.examples[0].id,mode='bert',selectedIndex=prepareMlm(config.pretrain.example).targets[0].index,nspId=config.pretrain.nsp.examples[0].id,evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'bert-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const selected=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(selected));el.classList.toggle('active',selected);}};
      const pill=(text,cls)=>node('span','bert-token'+(cls?' '+cls:''),text);
      const stages=group('BERT의 문맥 학습을 읽는 단계','bert-stage-controls'),stageText=node('p','bert-stage-text'),context=node('section','bert-context-panel'),pretrain=node('section','bert-pretrain-panel'),evidence=node('section','bert-evidence');
      const examples=group('같은 단어 뒤의 문맥 바꾸기'),modes=group('표현을 만들 때 참고할 수 있는 방향'),contextText=node('p','bert-prose'),modeText=node('p','bert-prose'),focus=node('div','bert-focus'),contextTokens=node('div','bert-access-tokens'),contextStatus=node('p','bert-selection-status'),contextSource=node('div');contextStatus.setAttribute('role','status');contextStatus.setAttribute('aria-live','polite');
      const contextRange=node('details','bert-details');contextRange.append(node('summary','','이 그림의 범위'),node('p','bert-scope',config.context.scope),contextSource,source(config.context.source));
      const contextFlow=node('div','bert-flow-connection');contextFlow.append(node('div','bert-flow-arrow','↓'),node('p','bert-flow-label','문맥 정보를 모아 표현'));
      context.append(node('h4','','단어 하나보다, 앞뒤 문맥에서 표현을 만들다'),node('p','bert-prose','bank 앞부분은 같아도, 뒤에 돈을 예금하거나 강가에 간다는 말이 오면 읽는 문맥이 달라집니다.'),examples,contextText,modes,modeText,contextTokens,contextFlow,focus,contextStatus,node('p','bert-legend','● 참고 가능 · × 현재 위치에서 참고 차단 · 강조 테두리는 표현을 만드는 위치입니다. 비중이나 확률을 표시하는 색이 아닙니다.'),node('p','bert-note','이 보기의 bank는 가리지 않은 입력입니다. 현재 자기 위치는 두 방식 모두 참고할 수 있습니다.'),contextRange);

      const original=node('div','bert-token-row'),corrupted=node('div','bert-token-row'),mlmControls=group('선택한 예측 대상의 입력 변형 방식'),mlmStatus=node('p','bert-selection-status'),mlmExplanation=node('p','bert-prose'),mlmTarget=node('div','bert-mlm-target'),lossLabels=node('div','bert-token-row');mlmStatus.setAttribute('role','status');mlmStatus.setAttribute('aria-live','polite');
      const mlmFlow=node('div','bert-mlm-flow');for(const [title,text] of [['바꾼 입력을 읽는 BERT','선택 위치에서도 앞뒤 모든 위치를 참고'],['선택 위치의 어휘 예측','그 위치에 원래 있던 토큰을 정답으로'],['MLM 손실','선택된 위치의 예측 오차로 가중치를 학습']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));mlmFlow.append(cell);}
      const mlmRange=node('details','bert-details');mlmRange.append(node('summary','','이 입력 예시의 범위'),node('p','bert-scope',config.pretrain.example.scope),node('p','bert-note','색과 테두리는 독자가 선택 위치를 비교하는 표시이며, 선택 여부를 BERT에 추가 입력으로 주지 않습니다.'),source(config.pretrain.example.source));
      pretrain.append(node('h4','','단어를 가리고, 원래의 말을 되찾도록 배우다'),node('p','bert-prose','본문 토큰 중 15%를 예측 대상으로 고릅니다. 선택된 경우의 80%는 [MASK], 10%는 임의 토큰, 10%는 원래 입력을 그대로 사용합니다. 어느 경우든 학습의 정답은 바꾸기 전의 토큰입니다.'),node('p','bert-note','세 처리 방식을 하나씩 보도록 직접 고른 예입니다. 비율을 적용해 추첨한 표본이 아닙니다.'),node('h5','','바꾸기 전의 원문'),original,mlmControls,node('h5','','BERT에 실제로 주는 입력'),corrupted,mlmStatus,mlmExplanation,mlmTarget,mlmFlow,node('h5','','MLM 손실을 계산하는 정답 위치'),lossLabels,node('p','bert-note','선택되지 않은 위치도 문맥으로 쓰지만, 직접적인 MLM 손실은 선택된 위치에만 계산합니다. [MASK]는 토큰 치환이며 attention 연결 차단과 구분합니다.'),mlmRange);

      const rates=node('details','bert-details');rates.append(node('summary','','15% 선택과, 선택된 경우의 80·10·10을 나눠 보기'));const rateBody=node('div'),selectionGrid=node('div','bert-rate-grid'),conditionalGrid=node('div','bert-rate-grid');selectionGrid.setAttribute('role','img');conditionalGrid.setAttribute('role','img');
      const r=config.pretrain.rates,selectedSet=new Set(Array.from({length:r.selected},(_,i)=>Math.floor(i*r.population/r.selected)));
      for(let i=0;i<r.population;i++){const cell=node('span','bert-rate-cell'+(selectedSet.has(i)?' is-selected':''));cell.setAttribute('aria-hidden','true');selectionGrid.append(cell);}
      const kinds=[...Array(r.mask).fill('mask'),...Array(r.random).fill('random'),...Array(r.same).fill('same')];for(const kind of kinds){const cell=node('span','bert-rate-cell is-'+kind);cell.setAttribute('aria-hidden','true');conditionalGrid.append(cell);}
      selectionGrid.setAttribute('aria-label',r.population+'개 중 '+r.selected+'개를 예측 대상으로 고르는 비율 설명');conditionalGrid.setAttribute('aria-label','별도 '+r.conditionalSlots+'칸에서 MASK '+r.mask+'개, 임의 토큰 '+r.random+'개, 그대로 '+r.same+'개인 조건부 비율 설명');
      rateBody.append(node('h5','','전체에서 예측 대상으로 선택 · '+r.selected+' / '+r.population),selectionGrid,node('p','bert-legend','강조 칸은 선택, 빈 칸은 비선택입니다. 배치는 비율을 보이도록 정했습니다.'),node('h5','','선택된 경우의 입력 변형 · 별도 '+r.conditionalSlots+'칸'),conditionalGrid,node('p','bert-legend','진한 채움 [MASK] '+r.mask+'개 · 옅은 채움 임의 토큰 '+r.random+'개 · 테두리만 그대로 '+r.same+'개'),node('p','bert-prose',r.text),node('p','bert-note','위 두 격자는 서로 다른 비율 설명입니다. 앞의 '+r.selected+'개에 뒤의 고정 개수를 그대로 배정한 표본이 아닙니다. 실제 선택·치환의 확률을 보여 주며, 모든 문장마다 같은 개수가 나와야 한다는 규칙으로 읽지 않습니다.'),source(r.source));rates.append(rateBody);pretrain.append(rates);

      const nsp=node('details','bert-details');nsp.append(node('summary','','다른 사전학습 목표 · 다음 문장인지 구분하기(NSP)'));const nspBody=node('div'),nspControls=group('직접 준비한 NSP 문장 쌍'),nspTokens=node('div','bert-token-row'),nspStatus=node('p','bert-selection-status'),nspExplanation=node('p','bert-prose');nspStatus.setAttribute('role','status');nspStatus.setAttribute('aria-live','polite');
      nspBody.append(nspControls,nspTokens,node('p','bert-legend','A 구간과 B 구간을 구분하는 segment 표현을 더하고, 위치 표현도 함께 학습합니다. [CLS]의 표현으로 IsNext / NotNext를 예측합니다.'),nspStatus,nspExplanation,node('p','bert-note','여기의 IsNext / NotNext는 직접 준비한 문장 쌍에 붙인 정답입니다. BERT가 실제 판정한 값이나 학습된 확률을 보여 주지 않습니다.'),node('p','bert-scope',config.pretrain.nsp.scope),source(config.pretrain.nsp.source));nsp.append(nspBody);pretrain.append(nsp);

      const finetune=node('details','bert-details');finetune.append(node('summary','','사전학습한 표현을, 과제의 정답으로 미세조정하기'));const fineBody=node('div'),fineFlow=node('div','bert-finetune-flow');
      for(const [title,text] of [['토큰·구간·위치의 표현','단어 표현에 학습한 segment·position 표현을 더함'],['사전학습한 BERT θ','같은 초기 가중치에서 각 과제별 미세조정'],['과제에 맞는 출력 연결','[CLS]는 문장·문장쌍 분류, 위치별 표현은 태깅·질의응답 등에 연결']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));fineFlow.append(cell);}
      fineBody.append(node('p','bert-prose',config.pretrain.finetune.text),fineFlow,node('p','bert-feedback','↑ 과제의 정답 오차로, 추가 출력층과 기존 BERT 가중치를 함께 조정'),node('p','bert-scope',config.pretrain.finetune.scope),source(config.pretrain.finetune.source));finetune.append(fineBody);const pretrainRange=node('details','bert-details');pretrainRange.append(node('summary','','학습 목표와 표시 범위'),node('p','bert-scope',config.pretrain.scope),source(config.pretrain.source));pretrain.append(finetune,pretrainRange);

      const evidenceControls=group('BERT 원문 그림 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','bert-prose'),evidenceScope=node('p','bert-scope'),evidenceSource=node('div'),evidenceCredit=node('p','bert-credit'),zoom=node('button','bert-zoom','원문 그림 확대'),pane=node('div','bert-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);
      evidence.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','bert-note','확대하면 그림 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);

      function updateContext(){
        if(disposed)return;const ex=config.context.examples.find(e=>e.id===exampleId),access=contextAccess({...ex,mode}),allowed=new Set(access.allowedIndices);root.dataset.example=exampleId;root.dataset.mode=mode;root.dataset.focus=String(ex.focusIndex);mark(exampleButtons,'example',exampleId);mark(modeButtons,'mode',mode);contextText.textContent=ex.text;modeText.textContent=config.context.modes.find(m=>m.id===mode).text;contextSource.replaceChildren(source(ex.source));
        focus.replaceChildren(node('span','','표현을 만드는 위치 '+ex.focusIndex),node('strong','',ex.tokens[ex.focusIndex]),node('span','',mode==='bert'?'앞과 뒤의 입력을 함께 참고':'현재 위치까지의 앞부분을 참고'));
        contextTokens.replaceChildren(...ex.tokens.map((token,i)=>{const cell=node('div','bert-access-token');cell.dataset.allowed=String(allowed.has(i));cell.dataset.focus=String(i===ex.focusIndex);cell.append(node('span','','위치 '+i),node('strong','',token),node('span','',allowed.has(i)?'● 참고 가능':'× 참고 차단'));return cell;}));
        contextStatus.textContent='참고 가능한 위치 '+access.allowedIndices.length+'개 · 차단 위치 '+access.blockedIndices.length+'개';
      }
      function updateMlm(){
        if(disposed)return;const result=prepareMlm(config.pretrain.example),selected=result.targets.find(t=>t.index===selectedIndex);root.dataset.mlmIndex=String(selectedIndex);root.dataset.mlmKind=selected.kind;mark(selectionButtons,'mlmIndex',selectedIndex);const selectedSet=new Set(result.selectedIndices);
        original.replaceChildren(...result.originalTokens.map((token,i)=>pill(token,i===selectedIndex?'is-focus':'')));
        corrupted.replaceChildren(...result.inputTokens.map((token,i)=>pill(token,(selectedSet.has(i)?'is-selected ':'')+(i===selectedIndex?'is-focus':''))));
        const label={mask:'[MASK]로 바꾸기',random:'임의 토큰으로 바꾸기',same:'입력을 그대로 두기'}[selected.kind];mlmStatus.textContent='선택 위치 '+selected.index+' · '+label+' · 이 위치는 MLM 손실에 포함됩니다.';
        mlmExplanation.textContent=selected.kind==='mask'?'입력에는 [MASK]를 주지만, 정답에는 그 자리에 원래 있던 토큰을 둡니다.':selected.kind==='random'?'입력에는 임의 치환의 예시로 정한 토큰을 줍니다. 손실의 정답에는 원래 토큰을 그대로 둡니다.':'입력은 원래 토큰 그대로입니다. 그래도 예측 대상으로 선택된 위치이므로, 이 위치의 MLM 예측 손실을 계산합니다.';
        const input=node('div'),labelBox=node('div');input.append(node('span','','지금 입력에 있는 토큰'),node('strong','',selected.inputToken));labelBox.append(node('span','','손실에서 비교하는 원래 정답'),node('strong','',selected.originalToken));mlmTarget.replaceChildren(input,labelBox);
        lossLabels.replaceChildren(...result.originalTokens.map((token,i)=>pill(i+' · '+(selectedSet.has(i)?token+' [MLM 정답]':'직접 MLM 손실 없음'),selectedSet.has(i)?'is-selected':'is-muted')));
      }
      function updateNsp(){
        if(disposed)return;const n=config.pretrain.nsp,ex=n.examples.find(e=>e.id===nspId),serialized=serializeSegments({...ex,markers:n.markers});root.dataset.nsp=nspId;mark(nspButtons,'nsp',nspId);const markerSet=new Set([n.markers.cls,n.markers.sep]);
        nspTokens.replaceChildren(...serialized.tokens.map((token,i)=>{const cell=pill(token,(serialized.segmentIds[i]===0?'is-segment-a':'is-segment-b')+(markerSet.has(token)?' is-marker':''));cell.title='위치 '+i+' · segment '+serialized.segmentIds[i];return cell;}));nspStatus.textContent='직접 지정한 NSP 정답 · '+(ex.isNext?'IsNext':'NotNext');nspExplanation.textContent=ex.explanation;
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;image.src=asset(item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 BERT 원문 그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;context.hidden=stage!=='context';pretrain.hidden=stage!=='pretrain';evidence.hidden=stage!=='evidence';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const ex of config.context.examples){const el=button(ex.label,examples,()=>{exampleId=ex.id;updateContext();});el.dataset.example=ex.id;exampleButtons.push(el);}
      for(const m of config.context.modes){const el=button(m.label,modes,()=>{mode=m.id;updateContext();});el.dataset.mode=m.id;modeButtons.push(el);}
      for(const target of prepareMlm(config.pretrain.example).targets){const label={mask:'가리기',random:'임의 토큰',same:'그대로'}[target.kind],el=button('위치 '+target.index+' · '+label,mlmControls,()=>{selectedIndex=target.index;updateMlm();});el.dataset.mlmIndex=String(target.index);selectionButtons.push(el);}
      for(const ex of config.pretrain.nsp.examples){const el=button(ex.label,nspControls,()=>{nspId=ex.id;updateNsp();});el.dataset.nsp=ex.id;nspButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      const cardRange=node('details','bert-details');cardRange.append(node('summary','','이 카드의 구성과 범위'),node('p','bert-scope',config.scope),source(config.source));root.append(stages,stageText,context,pretrain,evidence,cardRange);updateContext();updateMlm();updateNsp();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
