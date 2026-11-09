/* Prepared critiques and preference directions are examples, not AI outputs or soft targets. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function prepareRevision(options){
    if(!options||typeof options!=='object'||!['draft','problemText','critique','revisedAnswer'].every(key=>hasText(options[key])))throw new TypeError('A draft, exact problem fragment, critique and revised answer are required.');
    const {draft,problemText,critique,revisedAnswer}=options,at=draft.indexOf(problemText);
    if(at<0)throw new RangeError('The authored problem fragment must occur in the draft.');
    return{parts:[{text:draft.slice(0,at),highlighted:false},{text:problemText,highlighted:true},{text:draft.slice(at+problemText.length),highlighted:false}],critique,revisedAnswer};
  }
  function preparePreference(options){
    if(!options||typeof options!=='object')throw new TypeError('Preference options are required.');
    const {candidates,preferredId,explanation}=options;
    if(!Array.isArray(candidates)||candidates.length!==2||!Array.from(candidates).every(c=>c&&hasText(c.id)&&hasText(c.text))||new Set(candidates.map(c=>c.id)).size!==2)throw new TypeError('The prepared comparison needs exactly two distinct nonempty responses.');
    if(!candidates.some(c=>c.id===preferredId)||!hasText(explanation))throw new TypeError('The prepared direction must name one response and provide an explanation.');
    return{preferredId,otherId:candidates.find(c=>c.id!==preferredId).id,candidates:candidates.map(({id,text})=>({id,text})),explanation};
  }
  window.AtlasConstitutionalModel=Object.freeze({prepareRevision,preparePreference});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const sourced=value=>value&&hasText(value.title)&&hasText(value.url);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function source(item){const el=node('a','constitutional-source',item.title+' ↗');el.href=item.url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['revise','preference'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Revision and preference stages are required.');
    const c=config.constitution;if(!c||!Array.isArray(c.principles)||!c.principles.length||new Set(c.principles.map(p=>p.id)).size!==c.principles.length||!c.principles.every(p=>p&&['id','label','text'].every(k=>hasText(p[k]))&&sourced(p.source))||!hasText(c.scope)||!sourced(c.source))throw new TypeError('The authored principles need labels, scope and sources.');
    const r=config.revision;if(!r||!['request','draft','text','scope'].every(k=>hasText(r[k]))||!sourced(r.source)||!Array.isArray(r.variants)||new Set(r.variants.map(v=>v.principleId)).size!==r.variants.length)throw new TypeError('Revision needs a shared draft and distinct prepared principle cases.');
    const p=config.preference;if(!p||!['context','text','scope'].every(k=>hasText(p[k]))||!sourced(p.source)||!Array.isArray(p.candidates)||!p.candidates.every(c=>hasText(c.label))||!Array.isArray(p.judgments)||new Set(p.judgments.map(j=>j.principleId)).size!==p.judgments.length)throw new TypeError('Preference needs a shared context, labeled responses and authored judgments.');
    for(const principle of c.principles){const variant=r.variants.find(v=>v.principleId===principle.id),judgment=p.judgments.find(j=>j.principleId===principle.id);if(!variant||!judgment)throw new TypeError('Every principle needs a revision and preference case.');prepareRevision({...variant,draft:r.draft});preparePreference({...judgment,candidates:p.candidates});}
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original evidence needs local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('constitutional-feedback',{
    mount(host,config){
      validate(config);
      const root=node('div','constitutional-feedback'),listeners=[],stageButtons=[],principleButtons=[],learningButtons=[],evidenceButtons=[];
      let stage='revise',principleId=config.constitution.principles[0].id,learning='preference',evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'constitutional-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const selected=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(selected));el.classList.toggle('active',selected);}};
      const range=(label,text,item)=>{const el=node('details','constitutional-details');el.append(node('summary','',label),node('p','constitutional-scope',text),source(item));return el;};
      const stages=group('원칙을 비평과 피드백으로 사용하는 두 단계','constitutional-stage-controls'),stageText=node('p','constitutional-stage-text'),principles=node('section','constitutional-principles'),principleControls=group('준비한 원칙 선택'),principleText=node('p','constitutional-principle-text'),principleSource=node('div');principles.append(node('span','constitutional-eyebrow','사람이 정한 원칙을 기준으로'),principleControls,principleText,principleSource);
      const revise=node('section','constitutional-revise-panel'),preference=node('section','constitutional-preference-panel');
      const request=node('div','constitutional-request');request.append(node('span','','요청'),node('p','',config.revision.request));const draft=node('div','constitutional-draft'),draftText=node('p');draft.append(node('span','','같은 준비 초안'),draftText);
      const revisionFlow=node('div','constitutional-revision-flow'),critique=node('section','constitutional-critique'),revised=node('section','constitutional-revised'),critiqueText=node('p'),revisedText=node('p'),revisionArrow=node('div','constitutional-revision-arrow');critique.append(node('h5','','비평'),critiqueText);revised.append(node('h5','','수정 답변'),revisedText);revisionArrow.setAttribute('aria-hidden','true');revisionArrow.append(node('span','','→'));revisionFlow.append(critique,revisionArrow,revised);
      const revisionStatus=node('p','constitutional-selection-status');revisionStatus.setAttribute('role','status');revisionStatus.setAttribute('aria-live','polite');
      const slInputs=node('div','constitutional-training-inputs');for(const [title,text] of [['원래 요청과 수정 답변들','각 수정 단계의 응답을 지도학습 자료로'],['기존 도움됨 응답 자료','사람 피드백을 사용한 helpfulness 자료도 혼합']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));slInputs.append(cell);}const slModel=node('div','constitutional-training-model');slModel.append(node('strong','','SL-CAI · 지도 미세조정'),node('p','','수정된 응답을 목표로, 훈련에서 응답모형 가중치를 조정'));
      revise.append(node('h4','','원칙을 읽고 비평한 뒤, 답변을 다시 쓰게 하다'),node('p','constitutional-prose',config.revision.text),request,draft,node('p','constitutional-prepared-label','직접 준비한 비평과 수정'),revisionFlow,revisionStatus,node('h5','','답변을 고친 보기에서, 가중치를 배우는 훈련으로'),slInputs,node('div','constitutional-flow-arrow','↓'),slModel,node('p','constitutional-note','비평은 응답을 고치는 과정에 쓰고, 지도학습에는 원래 요청과 수정 응답을 연결합니다. 화면의 문장 변경과 훈련의 가중치 갱신은 구분됩니다.'),range('비평·수정과 SL-CAI의 범위',config.revision.scope,config.revision.source));

      const comparisonContext=node('div','constitutional-request');comparisonContext.append(node('span','','두 응답에서 같은 맥락'),node('p','',config.preference.context));const candidateCards=node('div','constitutional-candidates'),judgment=node('div','constitutional-judgment'),judgmentDirection=node('strong'),judgmentText=node('p');judgment.append(node('span','','선호 방향을 보여 주는 준비 판정'),judgmentDirection,judgmentText);judgment.setAttribute('role','status');judgment.setAttribute('aria-live','polite');
      const pmInputs=node('div','constitutional-training-inputs');for(const [title,text] of [['원칙을 참조한 AI 비교 자료','원문의 평가 설정에 따른 선호 확률 정보'],['사람의 도움됨 선호 자료','helpfulness 목표의 기존 인간 피드백도 유지']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));pmInputs.append(cell);}
      const learningControls=group('선호모형과 응답 정책의 학습 역할'),learningRoles=node('div','constitutional-learning-roles'),learningStatus=node('p','constitutional-selection-status');learningStatus.setAttribute('role','status');learningStatus.setAttribute('aria-live','polite');
      preference.append(node('h4','','원칙으로 응답을 비교한 자료를, 학습 피드백으로 쓰다'),node('p','constitutional-prose',config.preference.text),comparisonContext,candidateCards,judgment,node('p','constitutional-note','이 화면의 A/B 선택은 방향을 보여 주는 자체 예시입니다. 원문의 선호모형 학습에 사용한 확률 목표를 이 선택 기호로 대체하지 않습니다.'),node('h5','','원문에서 조합한 선호 학습 자료'),pmInputs,learningControls,learningRoles,learningStatus,range('준비 판정·soft label·RLAIF의 범위',config.preference.scope,config.preference.source));

      const evidence=node('details','constitutional-details constitutional-evidence');evidence.append(node('summary','','원논문의 구성과 결과 보기'));const evidenceBody=node('div'),evidenceControls=group('Constitutional AI 원문 그림 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','constitutional-prose'),evidenceScope=node('p','constitutional-scope'),evidenceSource=node('div'),evidenceCredit=node('p','constitutional-credit'),zoom=node('button','constitutional-zoom','원문 그림 확대'),pane=node('div','constitutional-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);evidenceBody.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','constitutional-note','확대하면 그림 영역 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);evidence.append(evidenceBody);

      function updatePrinciple(){
        if(disposed)return;const principle=config.constitution.principles.find(p=>p.id===principleId),variant=config.revision.variants.find(v=>v.principleId===principleId),prepared=prepareRevision({...variant,draft:config.revision.draft});root.dataset.principle=principleId;mark(principleButtons,'principle',principleId);principleText.textContent=principle.text;principleSource.replaceChildren(source(principle.source));draftText.replaceChildren(...prepared.parts.map(part=>part.highlighted?node('mark','constitutional-highlight',part.text):document.createTextNode(part.text)));critiqueText.textContent=prepared.critique;revisedText.textContent=prepared.revisedAnswer;revisionStatus.textContent='선택한 원칙 · '+principle.label+' · 초안의 표시와 준비한 수정 방향을 비교';updatePreference();
      }
      function updatePreference(){
        if(disposed)return;const p=config.preference,j=p.judgments.find(j=>j.principleId===principleId),prepared=preparePreference({...j,candidates:p.candidates});root.dataset.preferred=prepared.preferredId;candidateCards.replaceChildren(...p.candidates.map(candidate=>{const card=node('section');card.dataset.preferred=String(candidate.id===prepared.preferredId);card.append(node('h5','',candidate.label),node('p','',candidate.text));return card;}));judgmentDirection.textContent='준비한 방향 · '+p.candidates.find(c=>c.id===prepared.preferredId).label;judgmentText.textContent=prepared.explanation;
      }
      function updateLearning(){
        if(disposed)return;root.dataset.learning=learning;mark(learningButtons,'learning',learning);const pmTraining=learning==='preference';learningRoles.replaceChildren();for(const [title,state,text] of [['선호모형(PM)',pmTraining?'학습 대상':'고정',pmTraining?'AI 비교와 사람의 도움됨 선호를 학습':'응답 정책에 보상을 주는 기준으로 사용'],['응답 정책',pmTraining?'이 단계의 갱신 대상 아님':'학습 대상',pmTraining?'비교할 응답을 제공':'고정한 선호모형의 피드백으로 강화학습']]){const cell=node('div');cell.dataset.learning=String(state==='학습 대상');cell.append(node('span','',state),node('strong','',title),node('p','',text));learningRoles.append(cell);}learningStatus.textContent=pmTraining?'원문의 선호 자료 → 선호모형 학습':'고정한 선호모형 → 응답 정책의 RLAIF';
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;image.src=asset(item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));const credit=source(item.credit);evidenceCredit.replaceChildren(credit,document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 Constitutional AI 원문 그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;revise.hidden=stage!=='revise';preference.hidden=stage!=='preference';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const principle of config.constitution.principles){const el=button(principle.label,principleControls,()=>{principleId=principle.id;updatePrinciple();});el.dataset.principle=principle.id;principleButtons.push(el);}
      for(const [id,label] of [['preference','선호모형을 학습할 때'],['policy','응답 정책을 학습할 때']]){const el=button(label,learningControls,()=>{learning=id;updateLearning();});el.dataset.learning=id;learningButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      const principleRange=range('사람이 정한 원칙과 이 카드의 범위',config.constitution.scope,config.constitution.source),cardRange=range('자체 예시와 실제 연구의 구분',config.scope,config.source);root.append(stages,stageText,principles,revise,preference,evidence,principleRange,cardRange);updatePrinciple();updateLearning();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
