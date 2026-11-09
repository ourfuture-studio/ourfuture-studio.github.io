/* A finite, authored proof fragment. This viewer is not a general OWL reasoner. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const withParticle=(text,closed,open)=>{const last=text.charCodeAt(text.length-1),digit=text.slice(-1),hasFinal=last>=0xac00&&last<=0xd7a3?(last-0xac00)%28!==0:/[013678]/.test(digit);return text+(hasFinal?closed:open);};
  const fact={student:'Student(y)',person:'Person(y)',wrote:'wrote(y,p1)',paper:'Paper(p1)',notAuthor:'¬PaperAuthor(y)',author:'PaperAuthor(y)'};
  function evaluateResearchGraph(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('The research fixture options must be an object.');
    for(const key of ['student','person','wrote','paper','notAuthor'])if(typeof options[key]!=='boolean')throw new TypeError(key+' must state whether an assertion is present.');
    if(!['equivalent','necessary-only'].includes(options.definition))throw new TypeError('The author definition must be equivalent or necessary-only.');
    const input={student:options.student,person:options.person,wrote:options.wrote,paper:options.paper,notAuthor:options.notAuthor,definition:options.definition};
    const asserted=['student','person','wrote','paper','notAuthor'].filter(key=>input[key]).map(key=>fact[key]),inferred=[],proofs=[];
    const isPerson=input.person||input.student;
    if(input.student&&!input.person){inferred.push(fact.person);proofs.push({id:'person-from-student',conclusion:fact.person,premises:[fact.student],rule:'student-subclass-person'});}
    const positiveEntailed=input.definition==='equivalent'&&isPerson&&input.wrote&&input.paper,negativeEntailed=input.notAuthor;
    if(positiveEntailed){inferred.push(fact.author);proofs.push({id:'author-from-definition',conclusion:fact.author,premises:[fact.person,fact.wrote,fact.paper],rule:'author-equivalence'});}
    const consistent=!(positiveEntailed&&negativeEntailed);
    if(!consistent)proofs.push({id:'conflict-author',conclusion:'inconsistent',premises:[fact.author,fact.notAuthor],rule:'class-complement-conflict'});
    const queryStatus=!consistent?'inconsistent':positiveEntailed?'entailed':negativeEntailed?'refuted':'unknown';
    const missing=[];if(!isPerson)missing.push(fact.person);if(!input.wrote)missing.push(fact.wrote);if(!input.paper)missing.push(fact.paper);
    return{input,asserted,inferred,proofs,positiveEntailed,negativeEntailed,consistent,queryStatus,missing};
  }
  window.AtlasOntologyModel=Object.freeze({evaluateResearchGraph});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const sourced=value=>value&&hasText(value.title)&&hasText(value.url);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function source(item){const el=node('a','ontology-source',item.title+' ↗');el.href=item.url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  function validate(config){
    if(!config||!Array.isArray(config.stages)||config.stages.length!==3||!['share','infer','unknown'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('The ontology viewer needs share, infer and unknown stages.');
    const s=config.share;
    if(!s||!['text','leftLabel','rightLabel','mappingNote','scope'].every(key=>hasText(s[key]))||!sourced(s.source)||!Array.isArray(s.mappings)||!s.mappings.length||s.mappings.length>12||new Set(s.mappings.map(m=>m.id)).size!==s.mappings.length||!s.mappings.every(m=>m&&['id','label','left','right','shared','definition'].every(key=>hasText(m[key]))))throw new TypeError('Shared vocabulary mappings need authored names, definitions and sources.');
    const i=config.inference;if(!i||!['text','personLabel','paperLabel','scope'].every(key=>hasText(i[key]))||!sourced(i.source))throw new TypeError('The inference fixture needs names, scope and source.');evaluateResearchGraph(i.initial);
    if(!config.uncertainty||!['text','scope'].every(key=>hasText(config.uncertainty[key]))||!sourced(config.uncertainty.source))throw new TypeError('The open-world comparison needs text and source.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(key=>hasText(e[key]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original evidence needs local images and per-image credit.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs an overall scope and source.');
  }
  window.AtlasVisuals.register('shared-conceptualization',{
    mount(host,config){
      validate(config);
      const root=node('div','ontology-sharing'),listeners=[],stageButtons=[],mappingButtons=[],definitionButtons=[],scenarioButtons=[],proofButtons=[],evidenceButtons=[],checks={};
      let stage='share',mappingId=config.share.mappings[0].id,input={...config.inference.initial},proofStep='definition',evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const person=config.inference.personLabel,paper=config.inference.paperLabel,personTopic=withParticle(person,'은','는'),personSubject=withParticle(person,'이','가'),paperTopic=withParticle(paper,'은','는'),paperObject=withParticle(paper,'을','를');
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'ontology-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const current=String(el.dataset[key])===String(value);el.classList.toggle('active',current);el.setAttribute('aria-pressed',String(current));}};
      const range=(title,text,item)=>{const el=node('details','ontology-details');el.append(node('summary','',title),node('p','ontology-scope',text),source(item));return el;};
      const stages=group('공유하는 뜻에서 논리적 결과까지 세 보기','ontology-stage-controls'),stageText=node('p','ontology-stage-text');

      const share=node('section','ontology-share-panel'),mappingControls=group('직접 작성한 공통 어휘 선택'),shareFlow=node('div','ontology-share-flow'),leftSystem=node('section','ontology-local-system'),rightSystem=node('section','ontology-local-system'),sharedConcept=node('section','ontology-shared-concept'),leftTerm=node('strong'),rightTerm=node('strong'),sharedName=node('strong'),sharedDefinition=node('p');
      leftSystem.append(node('span','ontology-eyebrow',config.share.leftLabel),leftTerm);rightSystem.append(node('span','ontology-eyebrow',config.share.rightLabel),rightTerm);sharedConcept.append(node('span','ontology-eyebrow','함께 참조하는 명세'),sharedName,sharedDefinition);
      const intoLeft=node('div','ontology-share-arrow'),intoRight=node('div','ontology-share-arrow');intoLeft.setAttribute('aria-hidden','true');intoRight.setAttribute('aria-hidden','true');intoLeft.append(node('span','','→'));intoRight.append(node('span','','←'));shareFlow.append(leftSystem,intoLeft,sharedConcept,intoRight,rightSystem);
      share.append(node('h4','','표현이 달라도, 같은 뜻을 함께 참조하다'),node('p','ontology-prose',config.share.text),mappingControls,shareFlow,node('p','ontology-mapping-note',config.share.mappingNote),node('p','ontology-keypoint','공유할 것은 이름만이 아닙니다. 어떤 개념이고 다른 개념과 어떻게 이어지는지도 함께 정합니다.'),range('공통 어휘 보기의 출처와 범위',config.share.scope,config.share.source));

      const reasoning=node('section','ontology-reasoning-panel'),reasoningTitle=node('h4'),reasoningIntro=node('p','ontology-prose'),scenarios=group('미확인·추론·명시적 부정·모순 비교','ontology-scenario-controls');
      reasoning.append(node('span','ontology-era-label','후대의 W3C OWL 표현을 참고한 자체 보기'),reasoningTitle,reasoningIntro,scenarios);
      const paperToggle=node('label','ontology-primary-toggle'),paperCheck=node('input'),paperToggleText=node('span');paperCheck.type='checkbox';paperCheck.dataset.fact='paper';paperToggleText.append(node('strong','','사실 추가 · '+paperTopic+' Paper다'),node('span','','선택을 해제하면 부정이 아니라, 이 타입 정보가 없는 상태입니다.'));paperToggle.append(paperCheck,paperToggleText);checks.paper=paperCheck;reasoning.append(paperToggle);
      const definitionControls=group('PaperAuthor 정의의 논리 방향','ontology-definition-controls');reasoning.append(definitionControls);
      const factsEditor=node('details','ontology-facts-editor');factsEditor.append(node('summary','','이 보기에 적힌 사실 직접 바꾸기'));const factOptions=node('div','ontology-fact-options');
      for(const [key,label] of [['student',personTopic+' Student다'],['person',personTopic+' Person이다'],['wrote',personSubject+' '+paperObject+' 썼다'],['notAuthor',personTopic+' PaperAuthor가 아니라고 명시']]){const wrap=node('label'),el=node('input');el.type='checkbox';el.dataset.fact=key;checks[key]=el;wrap.append(el,node('span','',label));factOptions.append(wrap);listen(el,'change',()=>{input[key]=el.checked;updateReasoning();});}
      factsEditor.append(factOptions,node('p','ontology-note','체크하지 않은 사실은 기록하지 않은 것입니다. 마지막 항목만 PaperAuthor에 대한 명시적인 부정을 추가합니다.'));reasoning.append(factsEditor);listen(paperCheck,'change',()=>{input.paper=paperCheck.checked;updateReasoning();});

      const workspace=node('div','ontology-workspace'),schema=node('section','ontology-schema'),graph=node('section','ontology-instance-graph');
      const studentClass=node('div','ontology-class-node'),personClass=node('div','ontology-class-node');studentClass.append(node('strong','','Student'),node('span','','학생'));personClass.append(node('strong','','Person'),node('span','','사람'));const hierarchy=node('div','ontology-hierarchy');hierarchy.append(studentClass,node('div','ontology-small-arrow','↓ 모든 학생은 사람'),personClass);
      const definitionBox=node('div','ontology-author-definition'),definitionFormula=node('p','ontology-formula'),definitionExplanation=node('p');definitionBox.append(node('strong','','PaperAuthor · 논문 작성자'),definitionFormula,definitionExplanation);schema.append(node('h5','','클래스와 관계에 대한 약속'),hierarchy,definitionBox,node('p','ontology-note','wrote의 목적어를 자동으로 Paper로 정하는 range 공리는 이 보기에 없습니다.'));
      const graphRow=node('div','ontology-graph-row'),personColumn=node('div','ontology-entity-column'),paperColumn=node('div','ontology-entity-column'),personNode=node('div','ontology-individual'),paperNode=node('div','ontology-individual ontology-paper-individual'),personTypes=node('div','ontology-type-tags'),paperTypes=node('div','ontology-type-tags'),relation=node('div','ontology-relation'),relationName=node('span'),relationArrow=node('span','ontology-relation-line');personNode.append(node('span','','이름 y'),node('strong','',person));paperNode.append(node('span','','이름 p1'),node('strong','',paper));personColumn.append(personNode,personTypes);paperColumn.append(paperNode,paperTypes);relation.append(relationName,relationArrow);graphRow.append(personColumn,relation,paperColumn);
      const membership=node('div','ontology-membership'),membershipLine=node('div','ontology-membership-line'),membershipText=node('strong'),negativeTag=node('p','ontology-negative-assertion');membership.append(membershipLine,membershipText);graph.append(node('h5','','개별 대상에 대해 적힌 사실'),graphRow,membership,negativeTag,node('p','ontology-legend','실선 테두리 · 명시한 사실 / 점선 테두리 · 명세에서 추론한 사실'));workspace.append(schema,graph);reasoning.append(workspace);
      const result=node('div','ontology-query-result'),resultQuestion=node('span','',personTopic+' PaperAuthor인가?'),resultLabel=node('strong'),resultText=node('p');result.append(resultQuestion,resultLabel,resultText);result.setAttribute('role','status');result.setAttribute('aria-live','polite');reasoning.append(result);
      const proofControls=group('결론을 뒷받침하는 근거 살펴보기','ontology-proof-controls'),proofView=node('section','ontology-proof-view'),proofTitle=node('h5'),proofText=node('p'),proofFacts=node('ul','ontology-proof-facts');proofView.append(proofTitle,proofText,proofFacts);reasoning.append(proofControls,proofView);
      const reasoningRange=node('div');reasoning.append(reasoningRange);

      const evidence=node('details','ontology-details ontology-evidence');evidence.append(node('summary','','원논문과 후대 명세의 연결 보기'));const evidenceBody=node('div'),evidenceControls=group('온톨로지 공유 원문 자료 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','ontology-prose'),evidenceScope=node('p','ontology-scope'),evidenceSource=node('div'),evidenceCredit=node('p','ontology-credit'),zoom=node('button','ontology-zoom','원문 그림 확대'),pane=node('div','ontology-evidence-viewport'),image=node('img');zoom.type='button';image.decoding='async';image.loading='lazy';pane.append(image);evidenceBody.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','ontology-note','확대하면 그림 영역 안에서 움직여 원문을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);evidence.append(evidenceBody);

      function updateMapping(){
        if(disposed)return;const selected=config.share.mappings.find(m=>m.id===mappingId);root.dataset.mapping=mappingId;mark(mappingButtons,'mapping',mappingId);leftTerm.textContent=selected.left;rightTerm.textContent=selected.right;sharedName.textContent=selected.shared;sharedDefinition.textContent=selected.definition;
      }
      const base={student:true,person:false,wrote:true,paper:false,notAuthor:false,definition:'equivalent'};
      const cases=[{id:'unknown',label:'정보가 없음',input:{...base}},{id:'entailed',label:'근거 충족',input:{...base,paper:true}},{id:'refuted',label:'명시적 부정',input:{...base,notAuthor:true}},{id:'inconsistent',label:'근거 충돌',input:{...base,paper:true,notAuthor:true}}];
      function tag(label,kind){const el=node('span','ontology-type-tag',label);el.dataset.kind=kind;return el;}
      function updateReasoning(){
        if(disposed)return;const model=evaluateResearchGraph(input);root.dataset.queryStatus=model.queryStatus;root.dataset.definition=input.definition;root.dataset.proof=proofStep;for(const [key,el] of Object.entries(checks))el.checked=input[key];mark(definitionButtons,'definition',input.definition);mark(proofButtons,'proof',proofStep);const selectedCase=cases.find(item=>Object.keys(base).every(key=>item.input[key]===input[key]));mark(scenarioButtons,'scenario',selectedCase?.id||'custom');
        const equivalent=input.definition==='equivalent';definitionFormula.textContent='PaperAuthor '+(equivalent?'≡':'⊑')+' Person ∧ (wrote SOME Paper)';definitionExplanation.textContent=equivalent?'이 조건을 만족하면 PaperAuthor이며, PaperAuthor라면 이 조건을 만족합니다.':'PaperAuthor라면 이 조건을 만족합니다. 조건만으로 PaperAuthor라고 역추론할 수는 없습니다.';
        personTypes.replaceChildren();if(input.student)personTypes.append(tag('Student · 명시','asserted'));if(input.person)personTypes.append(tag('Person · 명시','asserted'));else if(input.student)personTypes.append(tag('Person · 추론','inferred'));if(!input.student&&!input.person)personTypes.append(tag('타입 미기록','missing'));
        paperTypes.replaceChildren(tag(input.paper?'Paper · 명시':'Paper 타입 미기록',input.paper?'asserted':'missing'));relation.dataset.present=String(input.wrote);relationName.textContent=input.wrote?'wrote · 썼다':'관계 미기록';relationArrow.textContent=input.wrote?'→':'···';
        membership.dataset.status=model.queryStatus;membership.hidden=!model.positiveEntailed;membershipText.textContent='PaperAuthor · 추론';negativeTag.hidden=!input.notAuthor;negativeTag.textContent='명시한 부정 · '+personTopic+' PaperAuthor가 아니다';
        schema.dataset.highlight=proofStep;graph.dataset.highlight=proofStep;result.dataset.status=model.queryStatus;
        const states={unknown:['미확인','현재 명세와 사실만으로는 작성자인지, 아닌지 어느 쪽도 결론 낼 수 없습니다.'],entailed:['추론됨','작성한 대상이 Paper라는 사실까지 확인되어, 동치 정의에 따라 PaperAuthor가 됩니다.'],refuted:['명시적으로 부정됨','PaperAuthor가 아니라는 사실을 직접 적었습니다. 정보가 없어서 내린 부정이 아닙니다.'],inconsistent:['명세와 사실이 충돌함','같은 대상이 PaperAuthor이면서 아니어야 합니다. 이 상태에서는 두 근거의 충돌을 먼저 확인합니다.']};resultLabel.textContent=states[model.queryStatus][0];resultText.textContent=states[model.queryStatus][1];
        const pretty=value=>value.replaceAll('Student(y)',personTopic+' Student').replaceAll('Person(y)',personTopic+' Person').replaceAll('wrote(y,p1)',personSubject+' '+paperObject+' 썼다').replaceAll('Paper(p1)',paperTopic+' Paper').replaceAll('¬PaperAuthor(y)',personTopic+' PaperAuthor가 아니다').replaceAll('PaperAuthor(y)',personTopic+' PaperAuthor');
        proofFacts.replaceChildren();
        if(proofStep==='person'){
          proofTitle.textContent='① 사람이라는 근거';proofText.textContent=input.person?'Person이라는 사실을 직접 기록했습니다.':input.student?'Student라는 사실과 Student ⊑ Person 공리에서 Person을 추론합니다.':'Person을 직접 적지도, Student라는 근거를 적지도 않았습니다. 타입 정보가 없는 상태입니다.';
          for(const text of input.person?[fact.person]:input.student?[fact.student,'Student ⊑ Person',fact.person]:['Person 타입의 근거 없음'])proofFacts.append(node('li','',pretty(text)));
        }else if(proofStep==='witness'){
          proofTitle.textContent='② Paper를 쓴 관계의 근거';proofText.textContent=input.wrote&&input.paper?'썼다는 관계와 그 대상의 Paper 타입이 함께 있어, Paper를 하나 이상 썼다는 조건이 성립합니다.':!input.wrote?'누구에게 어떤 관계가 있는지 기록하지 않았습니다. Paper 타입만 있어도 wrote 관계가 생기지는 않습니다.':'썼다는 관계는 있지만 그 대상이 Paper인지 기록하지 않았습니다. 관계의 이름만으로 목적어의 타입을 확정하지 않습니다.';
          proofFacts.append(node('li','',input.wrote?pretty(fact.wrote):'wrote 관계의 근거 없음'),node('li','',input.paper?pretty(fact.paper):'Paper 타입의 근거 없음'));
        }else{
          proofTitle.textContent='③ 정의의 방향과 최종 결과';
          proofText.textContent=!model.consistent?'동치 정의로 얻은 양성 근거와 직접 적은 부정이 충돌합니다. 사실이나 정의를 다시 검토해야 합니다.':!equivalent?'필요조건은 한 방향입니다. Person이고 Paper를 썼다는 근거를 모아도, 이 공리만으로 PaperAuthor를 역추론하지 않습니다.':model.positiveEntailed?'사람이라는 근거와 Paper를 쓴 관계를 함께 만족하여, 동치 정의의 역방향을 적용합니다.':input.notAuthor?'명시한 부정이 있습니다. 작성자를 도출할 양성 근거는 현재 충분하지 않습니다.':'정의를 적용할 근거가 아직 모이지 않았습니다. 빠진 기록은 거짓을 뜻하지 않습니다.';
          const items=model.positiveEntailed?[...model.proofs.find(p=>p.id==='author-from-definition').premises,'PaperAuthor ≡ Person ∧ (wrote SOME Paper)',fact.author]:!equivalent?['PaperAuthor ⊑ Person ∧ (wrote SOME Paper)','조건 → PaperAuthor 방향은 주어지지 않음']:model.missing.map(value=>'미기록 · '+pretty(value));
          for(const text of items)proofFacts.append(node('li','',pretty(text)));if(input.notAuthor)proofFacts.append(node('li','',pretty(fact.notAuthor)));
        }
        result.dataset.positive=String(model.positiveEntailed);result.dataset.negative=String(model.negativeEntailed);paperToggle.dataset.present=String(input.paper);
      }
      function updateStage(){
        if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;share.hidden=stage!=='share';reasoning.hidden=stage==='share';scenarios.hidden=stage!=='unknown';reasoningTitle.textContent=stage==='unknown'?'모른다는 것과, 아니라고 안다는 것을 나누다':'기록 하나가 더해지면, 새 분류가 따라 나오다';reasoningIntro.textContent=stage==='unknown'?config.uncertainty.text:config.inference.text;reasoningRange.replaceChildren(range('이 논리 보기의 출처와 범위',stage==='unknown'?config.uncertainty.scope:config.inference.scope,stage==='unknown'?config.uncertainty.source:config.inference.source));
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(source(item.credit),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));pane.scrollLeft=0;pane.scrollTop=0;if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 온톨로지 공유 원문 자료');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const item of config.share.mappings){const el=button(item.label,mappingControls,()=>{mappingId=item.id;updateMapping();});el.dataset.mapping=item.id;mappingButtons.push(el);}
      for(const [id,label] of [['equivalent','동치 정의 · ↔'],['necessary-only','필요조건만 · →']]){const el=button(label,definitionControls,()=>{input.definition=id;updateReasoning();});el.dataset.definition=id;definitionButtons.push(el);}
      for(const item of cases){const el=button(item.label,scenarios,()=>{input={...item.input};proofStep='definition';updateReasoning();});el.dataset.scenario=item.id;scenarioButtons.push(el);}
      for(const [id,label] of [['person','① 사람 근거'],['witness','② 쓴 대상'],['definition','③ 정의 적용']]){const el=button(label,proofControls,()=>{proofStep=id;updateReasoning();});el.dataset.proof=id;proofButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      root.append(stages,stageText,share,reasoning,evidence,range('자체 보기와 연구 원문의 구분',config.scope,config.source));updateMapping();updateReasoning();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
