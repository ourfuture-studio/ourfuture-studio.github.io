/* A finite projection of the displayed OWL 2004 class axioms, not a general OWL reasoner. */
(function(){
  'use strict';
  const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),text=v=>typeof v==='string'&&v.trim().length>0;
  const keys=['seminar','topicLink','symbolicTopic','topicAI','topicNonAI','otherLink','otherAI','otherNonAI','extraAI','extraNotAI','someAI','onlyAI'];
  const factKeys={'seminar':'seminar','topic-link':'topicLink','symbolic-topic':'symbolicTopic','ai-topic':'topicAI','non-ai-topic':'topicNonAI','other-link':'otherLink','other-ai-topic':'otherAI','other-non-ai-topic':'otherNonAI','some-ai-seminar':'someAI','only-ai-seminar':'onlyAI'};
  const factNames={'seminar':'s1은 세미나다','topic-link':'s1의 주제로 t1이 있다','symbolic-topic':'t1은 기호주의 주제다','ai-topic':'t1은 AI 개념이다','non-ai-topic':'t1은 비AI 개념이다','other-link':'s1의 주제로 t2도 있다','other-ai-topic':'t2는 AI 개념이다','other-non-ai-topic':'t2는 비AI 개념이다','some-ai-seminar':'s1은 AI 주제를 포함한 세미나다','only-ai-seminar':'s1은 AI 주제만 다루는 세미나다'};
  const cache={};
  function interpretations(definition){
    if(cache[definition])return cache[definition];const worlds=[];
    for(let mask=0;mask<4096;mask++){
      const w={};for(let i=0;i<keys.length;i++)w[keys[i]]=Boolean(mask&(1<<i));
      if(w.symbolicTopic&&!w.topicAI||w.topicAI&&w.topicNonAI||w.otherAI&&w.otherNonAI)continue;
      w.some=w.topicLink&&w.topicAI||w.otherLink&&w.otherAI||w.extraAI;
      w.all=(!w.topicLink||w.topicAI)&&(!w.otherLink||w.otherAI)&&!w.extraNotAI;
      w.hasTopic=w.topicLink||w.otherLink||w.extraAI||w.extraNotAI;
      const someCondition=w.seminar&&w.some,onlyCondition=w.seminar&&w.all;
      if(w.someAI&&!someCondition||definition==='equivalent'&&w.someAI!==someCondition||w.onlyAI!==onlyCondition)continue;
      worlds.push({mask,world:w});
    }
    cache[definition]=worlds;return worlds;
  }
  function trace(facts,definition){
    const known=new Map(facts.map(id=>[id,{facts:[id],axioms:[]}])),proof=[];
    const add=(id,premises,rule,conclusion)=>{if(known.has(id)||!premises.every(p=>known.has(p)))return false;const fs=new Set(),axs=new Set([rule]);for(const p of premises){for(const f of known.get(p).facts)fs.add(f);for(const a of known.get(p).axioms)axs.add(a);}known.set(id,{facts:[...fs].sort(),axioms:[...axs].sort()});proof.push({id,rule,premises:premises.slice(),conclusion});return true;};
    let changed=true;while(changed){changed=false;
      for(const [id,ps,rule,line]of[
        ['ai-topic',['symbolic-topic'],'symbolic-is-ai','기호주의 주제는 AI 개념에 포함되므로, t1은 AI 개념이다.'],
        ['seminar',['only-ai-seminar'],'only-definition','AI 주제만 다루는 세미나라는 분류에는 세미나라는 조건이 포함된다.'],
        ['seminar',['some-ai-seminar'],'some-necessary','AI 주제를 포함한 세미나라는 분류에는 세미나라는 조건이 포함된다.'],
        ['ai-topic',['only-ai-seminar','topic-link'],'all-values-from','모든 주제가 AI 개념이고 t1이 주제이므로, t1은 AI 개념이다.'],
        ['other-ai-topic',['only-ai-seminar','other-link'],'all-values-from','모든 주제가 AI 개념이고 t2가 주제이므로, t2는 AI 개념이다.'],
        ['some-witness',['topic-link','ai-topic'],'some-values-from','주제로 연결된 t1이 AI 개념이므로, AI 주제가 하나 이상 있다.'],
        ['some-witness',['other-link','other-ai-topic'],'some-values-from','주제로 연결된 t2가 AI 개념이므로, AI 주제가 하나 이상 있다.'],
        ['some-witness',['some-ai-seminar'],'some-necessary','AI 주제를 포함한 세미나라는 분류에서 AI 주제의 존재가 따라온다.'],
        ...(definition==='equivalent'?[['some-ai-seminar',['seminar','some-witness'],'some-equivalent','세미나이며 AI 주제가 있으므로, 동치 정의에 따라 AI 주제를 포함한 세미나로 분류된다.']]:[])
      ])if(add(id,ps,rule,line))changed=true;
    }
    const conflicts=[];for(const [positive,negative,name]of[['ai-topic','non-ai-topic','t1'],['other-ai-topic','other-non-ai-topic','t2']])if(known.has(positive)&&known.has(negative)){const p=known.get(positive),n=known.get(negative);conflicts.push({id:name+'-disjoint',facts:[...new Set([...p.facts,...n.facts])].sort(),axioms:[...new Set([...p.axioms,...n.axioms,'ai-disjoint-non-ai'])].sort(),conclusion:name+(name==='t1'?'을':'를')+' AI 개념과 비AI 개념에 동시에 넣을 수 없다.'});}
    return{proof,conflicts};
  }
  function analyze(options){
    if(!record(options)||Object.keys(options).some(k=>!['facts','definition'].includes(k))||!['equivalent','necessary'].includes(options.definition)||!Array.isArray(options.facts)||options.facts.length>10||Array.from(options.facts).some(f=>typeof f!=='string'||!Object.hasOwn(factKeys,f))||new Set(options.facts).size!==options.facts.length)throw new TypeError('Provide one supported definition direction and unique displayed fact ids.');
    const facts=options.facts.slice().sort(),definition=options.definition;let required=0;for(const f of facts)required|=1<<keys.indexOf(factKeys[f]);
    const models=interpretations(definition).filter(m=>(m.mask&required)===required),queries={};
    const choose=list=>{if(!list.length)return null;let best=list[0],score=Infinity;for(const item of list){const w=item.world;let n=0;for(let i=0;i<keys.length;i++)if(w[keys[i]]&&!(required&(1<<i)))n+=keys[i].startsWith('extra')?4:1;if(n<score){best=item;score=n;}}return{...best.world};};
    for(const key of ['someAI','onlyAI','topicAI','hasTopic']){const yes=models.filter(m=>m.world[key]),no=models.filter(m=>!m.world[key]);queries[key]={status:!models.length?'inconsistent':!no.length?'entailed':!yes.length?'refuted':'undetermined',witness:choose(yes),countermodel:choose(no)};}
    const traced=trace(facts,definition);return{definition,facts,consistent:models.length>0,modelCount:models.length,queries,proof:models.length?traced.proof:[],conflicts:traced.conflicts};
  }
  window.AtlasOWLModel=Object.freeze({analyze});

  const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svgEl=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(value!==undefined)n.textContent=value;return n;};
  const sourced=s=>s&&text(s.title)&&text(s.url),statusNames={entailed:'정의와 사실에서 따라옴',refuted:'성립하지 않음이 따라옴',undetermined:'현재 사실로는 결정할 수 없음',inconsistent:'전제에 충돌이 있음'};
  const queryNames={someAI:'AI 주제를 포함한 세미나인가?',onlyAI:'AI 주제만 다루는 세미나인가?',topicAI:'t1은 AI 개념인가?',hasTopic:'주제가 하나 이상 존재하는가?'};
  function validate(config){
    if(!record(config)||!Array.isArray(config.stages)||config.stages.length!==3||!['define','infer','compare'].every(id=>config.stages.some(s=>s.id===id&&text(s.label)&&text(s.text)))||!sourced(config.source)||!text(config.scope))throw new TypeError('OWL view needs three stages, its scope and a source.');
    analyze({facts:config.initialFacts,definition:config.initialDefinition});
    if(!Array.isArray(config.evidence)||!config.evidence.length||config.evidence.some(e=>!e||!['id','title','formula','caption'].every(k=>text(e[k]))||!sourced(e.source)))throw new TypeError('OWL evidence needs sourced formula cards.');
  }
  function sourceLink(source){const a=el('a','owl-source',source.title+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';return a;}
  function graph(world,asserted,mode){
    const height=world.extraAI||world.extraNotAI?294:mode==='facts'?250:200,derived=(id)=>mode==='facts'&&!asserted.includes(id)?' (추론)':'';
    const svg=svgEl('svg',{viewBox:'0 0 680 '+height,role:'img','aria-label':mode==='model'?'정의와 사실에 일관되는 해석의 예':'세미나와 주제의 관계'});
    const line=(y,dashed)=>svg.append(svgEl('path',{d:'M 188 138 C 273 138 270 '+y+' 352 '+y,fill:'none',class:'owl-svg-edge'+(dashed?' owl-svg-dashed':'')}),svgEl('path',{d:'M 342 '+(y-5)+' L 352 '+y+' L 342 '+(y+5),fill:'none',class:'owl-svg-edge'}));
    const node=(x,y,w,h,title,sub,cls)=>{const g=svgEl('g');g.append(svgEl('rect',{x,y,width:w,height:h,rx:12,class:'owl-svg-node '+cls}),svgEl('text',{x:x+15,y:y+27,class:'owl-svg-title'},title));if(Array.isArray(sub)){sub.forEach((line,i)=>g.append(svgEl('text',{x:x+15,y:y+45+i*16,class:'owl-svg-small'},line)));}else g.append(svgEl('text',{x:x+15,y:y+48,class:'owl-svg-small'},sub));svg.append(g);return g;};
    node(18,104,170,68,'대상 s1',world.seminar?'Seminar'+derived('seminar'):mode==='model'?'이 해석에서는 세미나 아님':'세미나 분류 미기록','owl-svg-seminar');
    const t1Types=[world.symbolicTopic?'기호주의 주제':null,world.topicAI?'AI 개념'+derived('ai-topic'):null,world.topicNonAI?'비AI 개념':null].filter(Boolean);
    node(352,24,306,68,'주제 t1',t1Types.join(' · ')||(mode==='model'?'AI·비AI 두 클래스에 속하지 않음':'분류 미기록'),world.topicAI?'owl-svg-ai':world.topicNonAI?'owl-svg-other':'');
    if(world.topicLink)line(58,mode==='model'&&!asserted.includes('topic-link'));else if(mode==='facts'){svg.append(svgEl('text',{x:214,y:65,class:'owl-svg-small'},'관계 미기록'));}
    if(world.otherLink||world.otherAI||world.otherNonAI){node(352,119,306,68,'주제 t2',[world.otherAI?'AI 개념'+derived('other-ai-topic'):null,world.otherNonAI?'비AI 개념':null].filter(Boolean).join(' · ')||(mode==='model'?'AI·비AI 두 클래스에 속하지 않음':'분류 미기록'),world.otherAI?'owl-svg-ai':world.otherNonAI?'owl-svg-other':'');if(world.otherLink)line(153,mode==='model'&&!asserted.includes('other-link'));}
    const extras=[];if(world.extraAI)extras.push('기록에 없는 AI 주제');if(world.extraNotAI)extras.push('기록에 없는 AI가 아닌 주제');
    if(extras.length){node(352,214,306,68,'추가 주제가 있는 경우',extras,'owl-svg-extra');line(248,true);}
    svg.append(svgEl('text',{x:214,y:135,class:'owl-svg-predicate'},world.topicLink||world.otherLink||extras.length?'hasTopic':mode==='model'?'주제 관계 없음':'주제 관계 미기록'));
    if(mode==='facts'){const count=asserted.length;svg.append(svgEl('text',{x:18,y:206,class:'owl-svg-small'},'직접 기록한 사실 '+count+'개'),svgEl('text',{x:18,y:229,class:'owl-svg-small'},'(추론): 정의와 사실에서 얻은 분류'));}
    return svg;
  }
  function graphPane(world,asserted,mode,label){const pane=el('div','owl-graph-viewport');pane.tabIndex=0;pane.setAttribute('role','group');pane.setAttribute('aria-label',label);pane.append(graph(world,asserted,mode));return pane;}
  window.AtlasVisuals.register('owl-logical-definitions',{
    mount(host,config){
      validate(config);const root=el('div','owl-logical-definitions'),listeners=[],stageButtons=[],definitionButtons=[],queryButtons=[],presetButtons=[],inputs=new Map();
      const listen=(n,event,fn)=>{n.addEventListener(event,fn);listeners.push(()=>n.removeEventListener(event,fn));};
      const group=(label,cls='owl-controls')=>{const n=el('div',cls);n.setAttribute('role','group');n.setAttribute('aria-label',label);return n;};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const mark=(buttons,key,value)=>{for(const b of buttons){const active=b.dataset[key]===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}};
      const disclosure=(label,child)=>{const d=el('details','owl-details');d.append(el('summary','',label),child);return d;};
      let facts=new Set(config.initialFacts),definition=config.initialDefinition,stage='define',query='onlyAI',model,disposed=false;
      const nav=group('OWL의 정의와 추론을 살펴보는 단계','owl-stage-controls'),stageText=el('p','owl-stage-text');
      const define=el('section','owl-panel'),definitionControl=group('개념을 정의하는 방향','owl-definition-controls'),definitionNote=el('p','owl-keypoint'),formula=el('div','owl-definition-formula'),concepts=el('div','owl-concepts');
      define.append(el('h4','','분류 이름에, 판단할 수 있는 조건을 담다'),el('p','owl-prose','“AI 세미나”라는 이름만 적는 대신, 무엇이 그 개념에 속하는지 논리식으로 정합니다. 프로그램은 사람이 적지 않은 분류도 이 정의와 사실에서 이끌어낼 수 있습니다.'),concepts,definitionControl,formula,definitionNote);
      const included=el('div','owl-inclusion'),outer=el('div','owl-class-ai');outer.append(el('strong','','AI 개념 · AIConcept'),el('div','owl-class-symbolic','기호주의 주제 · SymbolicTopic'));included.append(outer,el('span','owl-disjoint-mark','겹치지 않음'),el('div','owl-class-other','비AI 개념 · NonAIConcept'));concepts.append(included,el('p','owl-note','기호주의 주제는 AI 개념에 포함됩니다. 이 보기에서는 AI 개념과 비AI 개념을 서로소로 정의하며, 어느 쪽에도 속하지 않는 개념도 허용합니다.'));
      for(const[value,label]of[['equivalent','동치 정의 ≡'],['necessary','필요조건만 정의 ⊑']]){const b=button(label,definitionControl,()=>{definition=value;recompute();});b.dataset.definition=value;definitionButtons.push(b);}
      const quantifiers=el('div','owl-quantifiers');for(const[symbol,title,expr,copy]of[['∃','AI 주제를 포함한 세미나','Seminar ⊓ ∃hasTopic.AIConcept','AI인 주제가 하나 이상 존재해야 합니다.'],['∀','AI 주제만 다루는 세미나','Seminar ⊓ ∀hasTopic.AIConcept','연결된 주제가 있다면 모두 AI여야 합니다. 주제가 존재한다는 조건은 따로 없습니다.']]){const n=el('section','owl-quantifier');n.append(el('span','owl-symbol',symbol),el('h5','',title),el('code','',expr),el('p','',copy));quantifiers.append(n);}define.append(quantifiers,el('p','owl-note','W3C 2004의 클래스 포함·동치·교집합·관계 제한 정의를 바탕으로 구성한 시각화입니다.'));
      const infer=el('section','owl-panel'),presets=group('추론 사례 선택','owl-presets'),factGrid=el('div','owl-fact-grid'),drawing=el('div','owl-graph'),results=el('div','owl-results'),proof=el('section','owl-proof'),conflict=el('section','owl-conflict');
      infer.append(el('h4','','정의와 사실을 함께 놓으면, 새 분류가 따라온다'),el('p','owl-prose','기록한 사실을 켜고 끄며 결론과 그 근거를 확인해 보세요. 사실을 적지 않은 것과 그 사실이 거짓이라는 것은 다릅니다.'),presets,factGrid,drawing,results,proof,conflict);
      const scenarios=[
        {id:'symbolic',label:'기호주의 주제 하나',facts:['seminar','topic-link','symbolic-topic'],definition:'equivalent'},
        {id:'untyped',label:'모든 주제가 AI라는 정의',facts:['only-ai-seminar','topic-link'],definition:'equivalent'},
        {id:'mixed',label:'비AI 주제도 연결',facts:['seminar','topic-link','symbolic-topic','other-link','other-non-ai-topic'],definition:'equivalent'},
        {id:'empty',label:'주제를 기록하지 않음',facts:['seminar'],definition:'equivalent'},
        {id:'conflict',label:'정의와 사실의 충돌',facts:['only-ai-seminar','other-link','other-non-ai-topic'],definition:'equivalent'}
      ];
      for(const scenario of scenarios){const b=button(scenario.label,presets,()=>{facts=new Set(scenario.facts);definition=scenario.definition;recompute();});b.dataset.preset=scenario.id;presetButtons.push(b);}
      for(const id of Object.keys(factKeys)){const label=el('label','owl-fact'),input=el('input');input.type='checkbox';input.dataset.fact=id;label.append(input,el('span','',factNames[id]));factGrid.append(label);inputs.set(id,input);listen(input,'change',()=>{input.checked?facts.add(id):facts.delete(id);recompute();});}
      const comparison=el('section','owl-panel'),queries=group('정의에서 따라오는지 확인할 결론 선택','owl-query-controls'),comparisonStatus=el('div','owl-comparison-status'),modelGrid=el('div','owl-model-grid'),comparisonNote=el('p','owl-keypoint');
      comparison.append(el('h4','','기록에 없는 주제가 더 있다면, 결론이 달라질까?'),el('p','owl-prose','“AI 주제가 있다”와 “주제가 모두 AI다”는 다른 주장입니다. 현재 사실을 모두 지키면서도 결론이 달라지는 해석이 가능한지 살펴봅니다.'),queries,comparisonStatus,modelGrid,comparisonNote);
      for(const[key,label]of Object.entries(queryNames)){const b=button(label,queries,()=>{query=key;renderComparison();});b.dataset.query=key;queryButtons.push(b);}
      const evidence=el('div','owl-evidence');for(const item of config.evidence){const card=el('section','owl-evidence-card');card.append(el('h5','',item.title),el('pre','owl-code',item.formula),el('p','owl-prose',item.caption),sourceLink(item.source));evidence.append(card);}
      const scope=el('div');scope.append(el('p','owl-note',config.scope),el('p','owl-note','추가 주제는 AI인 경우와 AI가 아닌 경우의 존재 여부로 표현합니다. 비AI라는 이름의 클래스는 AI의 여집합과 같다고 가정하지 않습니다. 그림의 이름이 다르다는 이유로 실제 대상도 다르다고 가정하지 않습니다. 이 클래스·관계 조건에 한정한 해석을 비교하며, 임의의 OWL 문서를 실행하는 추론기는 아닙니다.'),sourceLink(config.source));
      for(const item of config.stages){const b=button(item.label,nav,()=>{stage=item.id;renderStage();});b.dataset.stage=item.id;stageButtons.push(b);}
      function renderStage(){root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;define.hidden=stage!=='define';infer.hidden=stage!=='infer';comparison.hidden=stage!=='compare';}
      function recompute(){
        model=analyze({facts:[...facts],definition});root.dataset.definition=definition;root.dataset.consistent=String(model.consistent);root.dataset.facts=model.facts.join(',');mark(definitionButtons,'definition',definition);
        for(const[id,input]of inputs)input.checked=facts.has(id);for(const b of presetButtons){const s=scenarios.find(x=>x.id===b.dataset.preset),same=s.definition===definition&&s.facts.length===facts.size&&s.facts.every(f=>facts.has(f));b.classList.toggle('active',same);b.setAttribute('aria-pressed',String(same));}
        formula.replaceChildren(el('strong','','AI 주제를 포함한 세미나'),el('span','owl-equivalence',definition==='equivalent'?'⇄':'→'),el('span','','세미나이며, AI 주제가 하나 이상 존재'));definitionNote.textContent=definition==='equivalent'?'≡는 양쪽 방향을 약속합니다. 오른쪽 조건을 확인하면 왼쪽 개념에 속한다는 결론도 얻습니다.':'⊑는 왼쪽에서 오른쪽으로만 갑니다. 오른쪽 조건을 만족해도, 그 사실만으로 왼쪽 분류를 얻을 수는 없습니다.';
        const w={seminar:facts.has('seminar')||model.consistent&&(facts.has('some-ai-seminar')||facts.has('only-ai-seminar')),topicLink:facts.has('topic-link'),symbolicTopic:facts.has('symbolic-topic'),topicAI:model.queries.topicAI.status==='entailed'||facts.has('ai-topic'),topicNonAI:facts.has('non-ai-topic'),otherLink:facts.has('other-link'),otherAI:facts.has('other-ai-topic')||model.consistent&&facts.has('only-ai-seminar')&&facts.has('other-link'),otherNonAI:facts.has('other-non-ai-topic'),extraAI:false,extraNotAI:false};drawing.replaceChildren(graphPane(w,model.facts,model.consistent?'facts':'conflict','세미나 관계 그림, 좌우로 이동'),el('p','owl-note',model.consistent?'직접 기록한 관계와 그 관계에서 따라온 분류를 표시합니다. 그리지 않은 관계가 없다고 단정하지 않습니다. 좁은 화면에서는 그림을 옆으로 움직여 읽을 수 있습니다.':'서로 충돌하는 입력 기록만 표시합니다. 새 분류는 확정하지 않습니다.'));
        results.replaceChildren();for(const key of ['someAI','onlyAI']){const q=model.queries[key],n=el('section','owl-result');n.dataset.status=q.status;n.append(el('h5','',key==='someAI'?'AI 주제를 포함한 세미나':'AI 주제만 다루는 세미나'),el('strong','',statusNames[q.status]));results.append(n);root.dataset[key+'Status']=q.status;}
        proof.replaceChildren(el('h5','','어떤 근거로 결론이 이어졌나'));const list=el('ol','owl-proof-list');for(const step of model.proof){const item=el('li');item.dataset.rule=step.rule;item.append(el('p','',step.conclusion),el('span','owl-rule-label',ruleLabel(step.rule)));list.append(item);}if(!model.proof.length)list.append(el('li','','현재 기록에서 새로 이끌어낼 분류나 존재 조건이 없습니다.'));proof.append(list);proof.hidden=!model.consistent;
        conflict.replaceChildren(el('h5','','이 전제들은 동시에 성립할 수 없습니다.'));for(const c of model.conflicts){const n=el('div','owl-conflict-item');n.append(el('p','',c.conclusion));const ul=el('ul');for(const f of c.facts)ul.append(el('li','',factNames[f]));ul.append(el('li','','AI 개념과 비AI 개념은 서로소라는 정의'));n.append(ul);conflict.append(n);}conflict.append(el('p','owl-note','충돌하는 전제를 먼저 수정해야 합니다. 이 상태에서 새 분류를 확정하지 않습니다.'));conflict.hidden=model.consistent;renderComparison();
      }
      function ruleLabel(id){return({'symbolic-is-ai':'클래스 포함 · rdfs:subClassOf','only-definition':'동치 정의와 교집합 · owl:equivalentClass / owl:intersectionOf','some-necessary':'개념의 필요조건','all-values-from':'관계의 모든 값 제한 · owl:allValuesFrom','some-values-from':'관계값의 존재 · owl:someValuesFrom','some-equivalent':'동치 정의의 충분조건'}[id]||id);}
      function modelCard(title,w,value){const n=el('section','owl-model-card');n.dataset.kind=value;n.append(el('h5','',title));if(w){n.append(el('p','owl-model-truth',queryNames[query]+' → '+(value==='true'?'참':'거짓')),graphPane(w,model.facts,'model',title+'의 관계 그림, 좌우로 이동'));const parts=[],addedNamedLink=w.topicLink&&!facts.has('topic-link')||w.otherLink&&!facts.has('other-link');if(!w.hasTopic)parts.push('연결된 주제가 없는 해석');if(addedNamedLink)parts.push('기록에 없는 주제 연결을 포함한 해석');if(w.extraAI)parts.push('기록에 없는 AI 주제가 있는 해석');if(w.extraNotAI)parts.push('기록에 없는 AI가 아닌 주제가 있는 해석');n.append(el('p','owl-model-caption',parts.join(' · ')||'현재 기록과 양립하도록 관계와 분류를 채운 한 해석'));if(addedNamedLink||w.extraAI||w.extraNotAI)n.append(el('p','owl-note','점선은 기록에 없지만 이 해석에 포함한 주제 연결입니다.'));if(query==='onlyAI'&&!w.hasTopic)n.append(el('p','owl-note','주제가 없으면 “모든 주제가 AI다”라는 조건을 어기는 주제도 없습니다. 이 보편 조건 자체는 주제의 존재를 요구하지 않습니다.'));}else n.append(el('p','owl-model-empty',model.consistent?'현재 정의와 사실을 모두 지키면서 이 결론을 '+(value==='true'?'참으로':'거짓으로')+' 만드는 해석이 없습니다.':'충돌하는 전제 아래에서는 일관된 해석을 구성할 수 없습니다.'));return n;}
      function renderComparison(){const q=model.queries[query];mark(queryButtons,'query',query);root.dataset.query=query;root.dataset.queryStatus=q.status;comparisonStatus.dataset.status=q.status;comparisonStatus.replaceChildren(el('h5','',queryNames[query]),el('strong','',statusNames[q.status]));modelGrid.replaceChildren(modelCard('결론이 참인 해석',q.witness,'true'),modelCard('결론이 거짓인 해석',q.countermodel,'false'));
        comparisonNote.textContent=!model.consistent?'서로소 정의와 충돌하는 사실이 있어 결론을 비교할 수 없습니다. 이전 보기에서 충돌한 기록을 확인하세요.':q.status==='undetermined'?'두 해석 모두 현재의 정의와 사실을 지킵니다. 결론이 양쪽으로 달라질 수 있으므로 현재 정보만으로는 확정할 수 없습니다.':q.status==='entailed'?'현재 정의와 사실을 모두 지키는 해석에서 이 결론은 항상 참입니다. ‘결론이 참인 해석’은 그중 한 가지를 보여줍니다.':'현재 정의와 사실을 모두 지키는 해석에서 이 결론은 항상 거짓입니다. ‘결론이 거짓인 해석’은 그중 한 가지를 보여줍니다.';
      }
      root.append(nav,stageText,define,infer,comparison,disclosure('공식 표준의 정의와 비교하기',evidence),disclosure('이 보기의 범위와 전제',scope));host.append(root);recompute();renderStage();
      return()=>{if(disposed)return;disposed=true;for(const off of listeners)off();root.remove();};
    }
  });
})();
