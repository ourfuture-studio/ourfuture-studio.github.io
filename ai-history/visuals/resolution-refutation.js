/* Resolution steps and a finite ground fragment. Not a complete first-order prover. */
(function(){
  'use strict';
  const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),clone=v=>JSON.parse(JSON.stringify(v));
  const keys=(v,allowed)=>record(v)&&Reflect.ownKeys(v).every(k=>typeof k==='string'&&allowed.includes(k));
  const dense=(v,max)=>Array.isArray(v)&&v.length<=max&&Array.from(v).every(x=>x!==undefined);
  const name=v=>typeof v==='string'&&/^[A-Za-z_][A-Za-z0-9_]*$/u.test(v)&&v.length<=40;
  const text=v=>typeof v==='string'&&v.trim().length>0&&v.length<=240;
  function readTerm(value,state={nodes:0},depth=0){
    if(++state.nodes>256||depth>8||!record(value)||!name(value.value)||!['variable','constant','function'].includes(value.type))throw new TypeError('Unsupported first-order term.');
    if(value.type==='function'){
      if(!keys(value,['type','value','args'])||!dense(value.args,4)||!value.args.length)throw new TypeError('A function term needs one to four arguments.');
      return{type:value.type,value:value.value,args:value.args.map(t=>readTerm(t,state,depth+1))};
    }
    if(!keys(value,['type','value']))throw new TypeError('Variables and constants have no argument list.');
    return{type:value.type,value:value.value};
  }
  function readLiteral(value,state={nodes:0}){
    if(!keys(value,['predicate','negative','args'])||!name(value.predicate)||typeof value.negative!=='boolean'||!dense(value.args,4))throw new TypeError('A literal needs a predicate, polarity and arguments.');
    return{predicate:value.predicate,negative:value.negative,args:value.args.map(t=>readTerm(t,state))};
  }
  function readClause(value){
    if(!keys(value,['id','literals'])||!text(value.id)||!dense(value.literals,8))throw new TypeError('A clause needs an id and at most eight literals.');
    const state={nodes:0};return{id:value.id,literals:value.literals.map(l=>readLiteral(l,state))};
  }
  const termText=t=>t.type==='function'?t.value+'('+t.args.map(termText).join(',')+')':t.value;
  const atomKey=l=>l.predicate+'('+l.args.map(termText).join(',')+')';
  const termKey=t=>JSON.stringify(t.type==='function'?[t.type,t.value,t.args.map(termKey)]:[t.type,t.value]);
  const typedAtomKey=l=>JSON.stringify([l.predicate,l.args.map(termKey)]);
  const literalKey=l=>JSON.stringify([l.negative,typedAtomKey(l)]);
  const uniqueLiterals=literals=>[...new Map(literals.map(l=>[literalKey(l),l])).entries()].sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0).map(([,l])=>l);
  const clauseKey=literals=>JSON.stringify(uniqueLiterals(literals).map(literalKey));
  const tautology=literals=>literals.some(l=>literals.some(r=>l.negative!==r.negative&&typedAtomKey(l)===typedAtomKey(r)));
  function replace(t,substitution,depth=0,state={nodes:0}){
    if(depth>48||++state.nodes>4096)throw new RangeError('This term substitution exceeds the view limit.');
    if(t.type==='variable'&&substitution.has(t.value))return replace(substitution.get(t.value),substitution,depth+1,state);
    if(t.type==='function')return{type:t.type,value:t.value,args:t.args.map(a=>replace(a,substitution,depth+1,state))};
    return{...t};
  }
  const occurs=(variable,t)=>t.type==='variable'?t.value===variable:t.type==='function'&&t.args.some(a=>occurs(variable,a));
  function unifyTerms(left,right){
    const substitution=new Map(),trace=[],queue=left.map((t,i)=>[t,right[i]]);
    const finish=(unifiable,reason)=>({unifiable,reason,substitution:unifiable?[...substitution].sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0).map(([variable,t])=>({variable,term:replace(t,substitution)})):[],trace,leftApplied:unifiable?left.map(t=>replace(t,substitution)):null,rightApplied:unifiable?right.map(t=>replace(t,substitution)):null});
    while(queue.length){
      const [first,second]=queue.shift(),a=replace(first,substitution),b=replace(second,substitution);
      if(termKey(a)===termKey(b)){trace.push({left:a,right:b,action:'equal'});continue;}
      if(a.type==='variable'||b.type==='variable'){
        const v=a.type==='variable'?a:b,t=a.type==='variable'?b:a;
        if(occurs(v.value,t)){trace.push({left:a,right:b,action:'occurs-check'});return finish(false,'occurs-check');}
        substitution.set(v.value,t);trace.push({left:a,right:b,action:'bind',variable:v.value,term:t});continue;
      }
      if(a.type!==b.type||a.value!==b.value||a.type!=='function'||a.args.length!==b.args.length){trace.push({left:a,right:b,action:'clash'});return finish(false,'term-clash');}
      trace.push({left:a,right:b,action:'decompose'});queue.unshift(...a.args.map((t,i)=>[t,b.args[i]]));
    }
    return finish(true,'unified');
  }
  function unify(options){
    if(!keys(options,['left','right'])||!dense(options.left,8)||!dense(options.right,8)||options.left.length!==options.right.length)throw new TypeError('Unification compares two equal-length lists of terms.');
    const state={nodes:0},left=options.left.map(t=>readTerm(t,state)),right=options.right.map(t=>readTerm(t,state));
    return clone(unifyTerms(left,right));
  }
  function renameClause(clause,prefix){
    const renaming=new Map();
    const term=t=>{if(t.type==='variable'){if(!renaming.has(t.value))renaming.set(t.value,prefix+t.value);return{type:'variable',value:renaming.get(t.value)};}return t.type==='function'?{...t,args:t.args.map(term)}:{...t};};
    return{literals:clause.literals.map(l=>({...l,args:l.args.map(term)})),renaming:[...renaming].map(([from,to])=>({from,to}))};
  }
  function resolve(options){
    if(!keys(options,['left','right','leftPivot','rightPivot']))throw new TypeError('Choose two clauses and a literal index in each.');
    const left=readClause(options.left),right=readClause(options.right);
    if(!Number.isInteger(options.leftPivot)||!Number.isInteger(options.rightPivot)||options.leftPivot<0||options.leftPivot>=left.literals.length||options.rightPivot<0||options.rightPivot>=right.literals.length)throw new TypeError('A pivot must select a literal in its parent clause.');
    const l=renameClause(left,'L_'),r=renameClause(right,'R_'),a=l.literals[options.leftPivot],b=r.literals[options.rightPivot];
    const base={leftRenaming:l.renaming,rightRenaming:r.renaming,leftPivot:options.leftPivot,rightPivot:options.rightPivot};
    const failed=reason=>clone({...base,resolved:false,reason,substitution:[],trace:[],leftApplied:null,rightApplied:null,resolvent:null,tautology:false});
    if(a.negative===b.negative)return failed('same-polarity');
    if(a.predicate!==b.predicate||a.args.length!==b.args.length)return failed('different-predicate');
    const result=unifyTerms(a.args,b.args);
    if(!result.unifiable)return clone({...base,...result,resolved:false,leftApplied:null,rightApplied:null,resolvent:null,tautology:false});
    const sub=new Map(result.substitution.map(s=>[s.variable,s.term]));
    const apply=literals=>literals.map(l=>({...l,args:l.args.map(t=>replace(t,sub))}));
    const leftApplied=apply(l.literals),rightApplied=apply(r.literals),resolvent=uniqueLiterals([...leftApplied.filter((_,i)=>i!==options.leftPivot),...rightApplied.filter((_,i)=>i!==options.rightPivot)]);
    return clone({...base,resolved:true,reason:'resolved',substitution:result.substitution,trace:result.trace,leftApplied,rightApplied,resolvent,tautology:tautology(resolvent)});
  }
  function analyze(options){
    if(!keys(options,['clauses','goal','negateGoal'])||!dense(options.clauses,16)||typeof options.negateGoal!=='boolean')throw new TypeError('Provide finite ground clauses, a ground goal and its negation choice.');
    const clauses=options.clauses.map(readClause),goal=readLiteral(options.goal),ids=new Set();
    const ground=t=>t.type!=='variable'&&(t.type!=='function'||t.args.every(ground));
    for(const c of clauses){if(ids.has(c.id))throw new TypeError('Clause ids must be unique.');ids.add(c.id);if(c.literals.some(l=>!l.args.every(ground)))throw new TypeError('The finite closure requires ground clauses.');}
    if(!goal.args.every(ground))throw new TypeError('The finite closure requires a ground goal.');
    const atomMap=new Map();for(const l of [...clauses.flatMap(c=>c.literals),goal])atomMap.set(atomKey(l),{...l,negative:false});
    if(atomMap.size>5)throw new RangeError('The finite ground view is limited to five atoms.');
    const atoms=[...atomMap].sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0).map(([key,literal])=>({key,literal}));
    const satisfies=(l,model)=>model[atomKey(l)]!==l.negative,baseModels=[];
    for(let mask=0;mask<2**atoms.length;mask++){const model=Object.fromEntries(atoms.map((a,i)=>[a.key,Boolean(mask&(1<<i))]));if(clauses.every(c=>c.literals.some(l=>satisfies(l,model))))baseModels.push(model);}
    const models=baseModels.filter(m=>!options.negateGoal||!satisfies(goal,m));
    const goalStatus=!baseModels.length?'inconsistent-premises':baseModels.every(m=>satisfies(goal,m))?'entailed':baseModels.every(m=>!satisfies(goal,m))?'refuted':'undetermined';
    const freshId=prefix=>{let id=prefix,n=1;while(ids.has(id))id=prefix+'-'+(++n);ids.add(id);return id;};
    const initialClauses=clauses.map(c=>({...c,literals:uniqueLiterals(c.literals),kind:'premise',parents:[],pivots:[],sourceIds:[c.id]}));
    if(options.negateGoal){const id=freshId('negated-goal');initialClauses.push({id,literals:[{...goal,negative:!goal.negative}],kind:'negated-goal',parents:[],pivots:[],sourceIds:[id]});}
    const pool=[],byKey=new Map(),derived=[];
    for(const c of initialClauses){if(tautology(c.literals))continue;const k=clauseKey(c.literals);if(byKey.has(k)){const first=byKey.get(k);first.sourceIds=[...new Set([...first.sourceIds,...c.sourceIds])].sort();}else{const node=clone(c);pool.push(node);byKey.set(k,node);}}
    let emptyClauseId=pool.find(c=>!c.literals.length)?.id||null;
    search:for(let i=0;i<pool.length&&!emptyClauseId;i++)for(let j=0;j<i;j++){
      const left=pool[j],right=pool[i];
      for(let a=0;a<left.literals.length;a++)for(let b=0;b<right.literals.length;b++){
        const p=left.literals[a],q=right.literals[b];if(p.negative===q.negative||atomKey(p)!==atomKey(q))continue;
        const literals=uniqueLiterals([...left.literals.filter((_,k)=>k!==a),...right.literals.filter((_,k)=>k!==b)]),k=clauseKey(literals);
        if(tautology(literals)||byKey.has(k))continue;
        const id=freshId('resolvent-'+(derived.length+1)),node={id,literals,kind:'resolvent',parents:[left.id,right.id],pivots:[a,b],sourceIds:[...new Set([...left.sourceIds,...right.sourceIds])].sort()};
        pool.push(node);byKey.set(k,node);derived.push(node);if(!literals.length){emptyClauseId=id;break search;}
      }
    }
    const wanted=new Set(),byId=new Map(pool.map(c=>[c.id,c]));
    const visit=id=>{if(wanted.has(id))return;wanted.add(id);for(const p of byId.get(id).parents)visit(p);};
    if(emptyClauseId)visit(emptyClauseId);
    const proof=pool.filter(c=>wanted.has(c.id));
    return clone({atoms,baseModels,models,baseConsistent:baseModels.length>0,goalStatus,contradiction:models.length===0,initialClauses,derived,proof,emptyClauseId,closureComplete:emptyClauseId===null});
  }
  window.AtlasResolutionModel=Object.freeze({unify,resolve,analyze});

  const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svg=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(value!==undefined)n.textContent=value;return n;};
  const sourced=s=>record(s)&&text(s.title)&&typeof s.url==='string'&&/^https:\/\//u.test(s.url);
  const variableText=t=>t.type==='variable'&&/^[LR]_/u.test(t.value)?t.value.slice(2)+(t.value.startsWith('L_')?'ᴸ':'ᴿ'):t.value;
  const displayTerm=t=>t.type==='function'?t.value+'('+t.args.map(displayTerm).join(', ')+')':variableText(t);
  const displayLiteral=l=>(l.negative?'¬':'')+l.predicate+'('+l.args.map(displayTerm).join(', ')+')';
  const displayClause=literals=>literals.length?literals.map(displayLiteral).join(' ∨ '):'□';
  function validate(c){
    if(!record(c)||!dense(c.stages,3)||c.stages.length!==3||!['refute','unify','derive'].every(id=>c.stages.some(s=>s.id===id&&text(s.label)&&text(s.text)))||!dense(c.premises,8)||!c.premises.length||!record(c.initial)||!dense(c.initial.enabled,8)||typeof c.initial.negateGoal!=='boolean'||!text(c.goalText)||!sourced(c.source)||!text(c.scope)||!dense(c.unificationCases,8)||!c.unificationCases.length||!dense(c.evidence,6))throw new TypeError('Resolution needs its stages, clauses, goal, sourced cases and scope.');
    const ids=new Set();for(const p of c.premises){if(!text(p.id)||!text(p.label)||ids.has(p.id)||p.clause.id!==p.id)throw new TypeError('Premise ids and clause ids must agree.');ids.add(p.id);readClause(p.clause);if(p.firstOrderClause)readClause(p.firstOrderClause);}
    if(c.initial.enabled.some(id=>!ids.has(id))||new Set(c.initial.enabled).size!==c.initial.enabled.length)throw new TypeError('Unknown or duplicate enabled premise.');
    analyze({clauses:c.premises.map(p=>p.clause),goal:c.goal,negateGoal:c.initial.negateGoal});
    for(const item of c.unificationCases){if(!text(item.id)||!text(item.label)||!text(item.explanation))throw new TypeError('Unification cases need labels and explanations.');resolve({left:item.left,right:item.right,leftPivot:item.leftPivot,rightPivot:item.rightPivot});}
    for(const e of c.evidence)if(!['id','title','formula','caption'].every(k=>text(e[k]))||!sourced(e.source))throw new TypeError('Formula evidence needs its source.');
    if(c.legend&&!dense(c.legend,12))throw new TypeError('Invalid legend.');
    if(c.originalImage&&(!/^[A-Za-z0-9_.-]+\.(?:png|jpe?g|gif)$/u.test(c.originalImage.src)||!['title','alt','caption','credit'].every(k=>typeof c.originalImage[k]==='string'&&c.originalImage[k].length)||!sourced(c.originalImage.source)))throw new TypeError('Original source image needs complete provenance.');
  }
  window.AtlasVisuals.register('resolution-refutation',{
    mount(host,config){
      validate(config);
      const root=el('div','resolution-refutation'),listeners=[],stageButtons=[],caseButtons=[],premiseInputs=new Map();
      const listen=(n,event,fn)=>{n.addEventListener(event,fn);listeners.push(()=>n.removeEventListener(event,fn));};
      const group=(label,cls='rsn-controls')=>{const n=el('div',cls);n.setAttribute('role','group');n.setAttribute('aria-label',label);return n;};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const source=s=>{const a=el('a','rsn-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const pane=(content,label,cls='rsn-svg-viewport')=>{const p=el('div',cls);p.tabIndex=0;p.setAttribute('role','group');p.setAttribute('aria-label',label);p.append(content);return p;};
      const disclosure=(title,content)=>{const d=el('details','rsn-details');d.append(el('summary','',title),content);return d;};
      const mark=(buttons,key,value)=>{for(const b of buttons){const active=b.dataset[key]===String(value);b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}};
      let enabled=new Set(config.initial.enabled),negateGoal=config.initial.negateGoal,stage='refute',caseId=config.unificationCases[0].id,leftPivot=config.unificationCases[0].leftPivot,rightPivot=config.unificationCases[0].rightPivot,step=0,model,proofSteps=[],disposed=false;
      const nav=group('Resolution의 아이디어와 증명 단계','rsn-stage-controls'),stageText=el('p','rsn-stage-text');
      for(const item of config.stages){const b=button(item.label,nav,()=>{stage=item.id;renderStage();});b.dataset.stage=item.id;stageButtons.push(b);}
      const refute=el('section','rsn-panel rsn-refute'),premises=el('div','rsn-premises'),goal=el('div','rsn-goal'),negationWrap=el('label','rsn-check'),negation=el('input'),setStatus=el('p','rsn-keypoint');negation.type='checkbox';negation.dataset.control='negateGoal';
      refute.append(el('h4','','목표의 반대가, 알고 있는 사실과 함께 성립할 수 있을까?'),el('p','rsn-prose','알고 있는 내용과 보이고 싶은 문장을 기호로 적습니다. 목표의 반대까지 함께 가정했을 때 어떤 경우에도 성립할 수 없다면, 그 반대 가정을 버릴 근거가 생깁니다.'),premises,goal,negationWrap,setStatus);
      for(const p of config.premises){
        const card=el('section','rsn-premise'),label=el('label','rsn-check'),input=el('input');input.type='checkbox';input.dataset.premise=p.id;label.append(input,el('span','',p.label));card.append(label);
        if(p.firstOrderClause){card.append(el('code','rsn-clause','∀x ['+displayClause(p.firstOrderClause.literals)+']'),el('p','rsn-note','같은 규칙을 atlas에 적용한 절 · x ↦ atlas'));}
        card.append(el('code','rsn-clause',displayClause(p.clause.literals)));premises.append(card);premiseInputs.set(p.id,input);listen(input,'change',()=>{input.checked?enabled.add(p.id):enabled.delete(p.id);step=0;recompute();});
      }
      goal.append(el('span','rsn-label','보이고 싶은 문장'),el('strong','',config.goalText),el('code','rsn-clause',displayLiteral(config.goal)));
      negationWrap.append(negation,el('span','','목표의 반대도 함께 가정한다 · '+displayLiteral({...config.goal,negative:!config.goal.negative})));listen(negation,'change',()=>{negateGoal=negation.checked;step=0;recompute();});
      const connective=el('div','rsn-connectives');connective.append(el('p','','절 안의 ∨ : 하나 이상이 참이면 된다.'),el('p','','절들 사이의 ∧ : 모든 절을 함께 만족해야 한다.'),el('p','','□ : 참으로 만들 리터럴이 없는 빈 절이다. 절이 하나도 없는 집합과 다르다.'));refute.append(connective);
      if(config.legend?.length){const legend=el('div','rsn-legend');for(const item of config.legend)legend.append(el('p','',item.symbol+' · '+item.text));refute.append(disclosure('기호와 이 사례의 의미',legend));}
      const unifyView=el('section','rsn-panel rsn-unify'),cases=group('단일화와 resolution 사례'),parents=el('div','rsn-parent-grid'),leftView=el('section','rsn-parent'),rightView=el('section','rsn-parent'),pivots=group('맞춰 볼 리터럴 선택'),leftSelect=el('select'),rightSelect=el('select'),unifyStatus=el('p','rsn-keypoint'),substitution=el('div','rsn-substitution'),unifyTrace=el('div'),resolvent=el('div','rsn-resolvent'),caseExplanation=el('p','rsn-note');
      leftSelect.dataset.control='leftPivot';rightSelect.dataset.control='rightPivot';const ll=el('label','rsn-field'),rl=el('label','rsn-field');ll.append(el('span','','왼쪽 절에서 고를 리터럴'),leftSelect);rl.append(el('span','','오른쪽 절에서 고를 리터럴'),rightSelect);pivots.append(ll,rl);parents.append(leftView,rightView);
      unifyView.append(el('h4','','같은 관계를 가리키도록, 변수의 자리를 맞춘다'),el('p','rsn-prose','반대 기호만 지우는 것으로는 충분하지 않습니다. 두 리터럴이 같은 대상을 가리키도록 하나의 일관된 치환을 찾아야 합니다. 찾은 치환은 남아 있는 리터럴에도 모두 적용합니다.'),cases,parents,pivots,unifyStatus,substitution,unifyTrace,resolvent,caseExplanation,el('p','rsn-note','두 절의 변수는 먼저 서로 다른 이름으로 바꿉니다. xᴸ와 xᴿ는 각 절에 속한 변수입니다. 선택한 리터럴을 맞출 수 있을 때에만 남은 리터럴을 결합해 새 절을 만듭니다.'));
      for(const item of config.unificationCases){const b=button(item.label,cases,()=>{caseId=item.id;leftPivot=item.leftPivot;rightPivot=item.rightPivot;renderUnify();});b.dataset.case=item.id;caseButtons.push(b);}
      listen(leftSelect,'change',()=>{leftPivot=Number(leftSelect.value);renderUnify();});listen(rightSelect,'change',()=>{rightPivot=Number(rightSelect.value);renderUnify();});
      const derive=el('section','rsn-panel rsn-derive'),progress=group('반박 증명 진행','rsn-progress'),progressLabel=el('p','rsn-progress-label'),drawing=el('div','rsn-proof-drawing'),stepDetails=el('div','rsn-step-details'),outcome=el('div','rsn-outcome'),modelsView=el('div','rsn-models');
      derive.append(el('h4','','두 절에서 새 절을 얻고, 모순까지 이어 간다'),el('p','rsn-prose','어느 절들을 결합했는지와 어떤 반대 리터럴을 맞췄는지 남깁니다. 빈 절까지 이어지는 경로가 반박 증명입니다. 아래에서는 atlas에 관한 절들의 유한한 경우를 살핍니다.'),progress,progressLabel,drawing,stepDetails,outcome,modelsView);
      const back=button('이전 단계',progress,()=>{step=Math.max(0,step-1);renderDerive();}),next=button('다음 절 도출',progress,()=>{step=Math.min(proofSteps.length,step+1);renderDerive();}),finish=button('증명 경로 끝까지',progress,()=>{step=proofSteps.length;renderDerive();});back.dataset.action='back';next.dataset.action='next';finish.dataset.action='finish';
      const evidence=el('div','rsn-evidence');for(const item of config.evidence){const card=el('section','rsn-evidence-card');card.append(el('h5','',item.title),el('pre','rsn-code',item.formula),el('p','rsn-prose',item.caption),source(item.source));evidence.append(card);}
      if(config.originalImage){const item=config.originalImage,figure=el('figure','rsn-original-figure'),image=el('img');image.alt=item.alt;image.loading='lazy';window.AtlasPublicAssets.setSource(image,item.src);const controls=group('원문 지면 확대'),zoom=button('원문 크게 보기',controls,()=>{const expanded=figure.classList.toggle('is-expanded');zoom.setAttribute('aria-pressed',String(expanded));zoom.textContent=expanded?'화면 너비로 보기':'원문 크게 보기';});zoom.dataset.action='zoom';zoom.setAttribute('aria-pressed','false');figure.append(el('h5','',item.title),controls,pane(image,'Robinson 원문 수학 표, 확대 후 좌우와 위아래로 이동','rsn-original-viewport'),el('figcaption','',item.caption),el('p','rsn-note',item.credit),source(item.source));evidence.append(figure);}
      const scope=el('div');scope.append(el('p','rsn-note',config.scope),el('p','rsn-note','atlas에 관한 유한한 절 집합은 변수 없는 경우를 끝까지 비교합니다. 이 경우의 반례와, 일반적인 1차 논리 탐색에서 아직 증명을 찾지 못한 상황은 다릅니다. 원논문의 일반화된 resolution 전체를 실행하는 증명기로 표시하지 않습니다.'),source(config.source));
      function renderStage(){root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;refute.hidden=stage!=='refute';unifyView.hidden=stage!=='unify';derive.hidden=stage!=='derive';}
      function renderUnify(){
        const c=config.unificationCases.find(c=>c.id===caseId);mark(caseButtons,'case',caseId);
        leftSelect.replaceChildren();rightSelect.replaceChildren();for(const [select,clause,value]of[[leftSelect,c.left,leftPivot],[rightSelect,c.right,rightPivot]]){clause.literals.forEach((l,i)=>{const option=el('option','',displayLiteral(l));option.value=String(i);select.append(option);});select.value=String(value);}
        const result=resolve({left:c.left,right:c.right,leftPivot,rightPivot});root.dataset.case=caseId;root.dataset.unifiable=String(result.resolved);root.dataset.unifyReason=result.reason;
        const parent=(clause,index)=>{const line=el('code','rsn-clause');clause.literals.forEach((l,i)=>{if(i)line.append(el('span','rsn-or',' ∨ '));const part=el('span','rsn-literal'+(i===index?' selected':'')+(i===index&&result.resolved?' removed':''),displayLiteral(l));part.dataset.literal=String(i);line.append(part);});return line;};
        leftView.replaceChildren(el('h5','','왼쪽 절 · '+c.left.id),parent(c.left,leftPivot));rightView.replaceChildren(el('h5','','오른쪽 절 · '+c.right.id),parent(c.right,rightPivot));
        const reasons={'same-polarity':'둘 다 긍정이거나 둘 다 부정입니다. 반대되는 리터럴을 골라야 합니다.','different-predicate':'술어나 인수의 개수가 달라 같은 관계로 맞출 수 없습니다.','term-clash':'한 변수의 모든 자리를 일관되게 맞출 수 없습니다.','occurs-check':'변수 자신을 포함한 항을 그 변수에 넣는 순환 치환은 허용하지 않습니다.'};
        unifyStatus.textContent=result.resolved?'두 리터럴의 인수를 맞추는 치환을 찾았습니다. 선택한 한 쌍을 없애고 나머지에 같은 치환을 적용합니다.':reasons[result.reason]||'이 두 리터럴은 맞출 수 없습니다.';
        substitution.replaceChildren(el('h5','','일관되게 적용할 치환'));if(result.resolved){substitution.append(el('code','rsn-clause',result.substitution.length?'{ '+result.substitution.map(s=>variableText({type:'variable',value:s.variable})+' ↦ '+displayTerm(s.term)).join(', ')+' }':'{ } · 추가 치환이 필요 없음'));}else substitution.append(el('p','rsn-note','이 비교에서는 단일자를 얻지 못했습니다.'));
        const list=el('ol','rsn-trace');for(const item of result.trace){const li=el('li'),labels={equal:'이미 같은 항',bind:'변수에 항을 대응',decompose:'함수의 인수를 나누어 비교',clash:'서로 다른 항의 충돌','occurs-check':'자기 자신을 포함하는 순환 발생'};li.append(el('code','',displayTerm(item.left)+'  ≐  '+displayTerm(item.right)),el('span','',labels[item.action]));list.append(li);}unifyTrace.replaceChildren(disclosure('인수의 구조를 어떻게 맞췄나',list));
        resolvent.replaceChildren(el('h5','','남은 리터럴을 합친 결과'));if(result.resolved){resolvent.append(el('code','rsn-clause',displayClause(result.resolvent)));if(result.tautology)resolvent.append(el('p','rsn-note','이 결과는 반대 리터럴을 함께 포함하는 항진절입니다. 빈 절이 아닙니다.'));}else resolvent.append(el('p','rsn-note','선택한 쌍에서 새 절을 도출하지 않습니다.'));
        const defaultPivots=leftPivot===c.leftPivot&&rightPivot===c.rightPivot;caseExplanation.dataset.explanation=defaultPivots?'case-default':'selected-pair';caseExplanation.textContent=defaultPivots?c.explanation:'현재 선택한 쌍: '+displayLiteral(c.left.literals[leftPivot])+' / '+displayLiteral(c.right.literals[rightPivot])+'. '+(result.resolved?'이 선택에서 얻은 치환을 나머지 리터럴에도 모두 적용했습니다.':reasons[result.reason]||'이 선택에서는 새 절을 도출하지 않습니다.');
      }
      function proofSvg(nodes,visible){
        const width=800,initial=nodes.filter(n=>n.kind!=='resolvent'),derived=nodes.filter(n=>n.kind==='resolvent'),height=Math.max(240,160+derived.length*112),s=svg('svg',{viewBox:'0 0 '+width+' '+height,role:'img','aria-label':'전제와 목표의 반대에서 빈 절로 이어지는 resolution 증명 그래프'}),positions=new Map();
        if(!nodes.length){s.append(svg('text',{x:400,y:110,'text-anchor':'middle',class:'rsn-empty-square'},'∅'),svg('text',{x:400,y:146,'text-anchor':'middle',class:'rsn-node-formula'},'함께 놓은 절이 없는 집합 · 모순을 뜻하는 □와 다릅니다.'));return s;}
        initial.forEach((n,i)=>positions.set(n.id,{x:12+i*(776/Math.max(1,initial.length)),y:18,w:Math.min(188,776/Math.max(1,initial.length)-8),h:108}));derived.forEach((n,i)=>positions.set(n.id,{x:275,y:166+i*112,w:250,h:84}));
        for(const [i,n]of derived.entries()){const child=positions.get(n.id),shown=i<visible;for(const id of n.parents){const p=positions.get(id);if(!p)continue;const sx=p.x+p.w/2,sy=p.y+p.h,tx=child.x+child.w/2,ty=child.y;let d;if(ty-sy<90)d='M '+sx+' '+sy+' C '+sx+' '+(sy+22)+' '+tx+' '+(ty-22)+' '+tx+' '+ty;else{const lane=sx<tx?220:620;d='M '+sx+' '+sy+' C '+lane+' '+(sy+18)+' '+lane+' '+(ty-20)+' '+tx+' '+ty;}const g=svg('g',{class:'rsn-proof-edge'+(shown?' active':''),'data-parent':id,'data-child':n.id});g.append(svg('path',{d}),svg('path',{d:'M '+(tx-5)+' '+(ty-9)+' L '+tx+' '+ty+' L '+(tx+5)+' '+(ty-9)}));s.append(g);}}
        for(const n of nodes){const p=positions.get(n.id),index=derived.findIndex(d=>d.id===n.id),shown=index<0||index<visible,g=svg('g',{class:'rsn-proof-node'+(shown?' active':' pending')+(!n.literals.length?' empty':''),'data-clause-id':n.id,'data-kind':n.kind});const label=n.kind==='negated-goal'?'목표의 반대':index>=0?'새 절 '+(index+1):'주어진 절 '+(initial.indexOf(n)+1);g.append(svg('rect',{x:p.x,y:p.y,width:p.w,height:p.h,rx:9}),svg('text',{x:p.x+11,y:p.y+21,class:'rsn-node-id'},label));const lines=n.literals.length?n.literals.map(displayLiteral):['□'];lines.forEach((line,i)=>g.append(svg('text',{x:p.x+11,y:p.y+(n.literals.length?43+i*18:64),class:!n.literals.length?'rsn-empty-square':'rsn-node-formula'},line+(i<lines.length-1?' ∨':''))));s.append(g);}
        return s;
      }
      function renderDerive(){
        step=Math.max(0,Math.min(step,proofSteps.length));root.dataset.step=String(step);root.dataset.proofSteps=String(proofSteps.length);back.disabled=step===0;next.disabled=step===proofSteps.length;finish.disabled=step===proofSteps.length;progressLabel.textContent=step+' / '+proofSteps.length+' 도출 단계';
        const all=model.emptyClauseId?model.proof:[...model.initialClauses,...proofSteps];drawing.replaceChildren(pane(proofSvg(all,step),'resolution 증명 경로, 좌우로 이동'),el('p','rsn-note','화살표는 두 부모 절에서 새 절로 향합니다. 옅은 절은 아직 펼치지 않은 도출 단계입니다.'));
        stepDetails.replaceChildren();if(step){const node=proofSteps[step-1],byId=new Map([...model.initialClauses,...model.derived].map(n=>[n.id,n])),left=byId.get(node.parents[0]),right=byId.get(node.parents[1]);stepDetails.append(el('h5','','이번에는 어느 두 절을 결합했나'),el('code','rsn-clause',displayClause(left.literals)),el('code','rsn-clause',displayClause(right.literals)),el('p','rsn-note','맞춘 리터럴: '+displayLiteral(left.literals[node.pivots[0]])+'  /  '+displayLiteral(right.literals[node.pivots[1]])),el('code','rsn-clause','→ '+displayClause(node.literals)));}else stepDetails.append(el('p','rsn-note',model.initialClauses.length?'현재 함께 둔 절들을 먼저 놓았습니다. 다음 절 도출을 눌러 한 단계씩 따라가 보세요.':'함께 놓은 절이 없습니다. 이 빈 집합 자체는 모순이 아닙니다.'));
        outcome.replaceChildren();const completed=Boolean(model.emptyClauseId)&&step===proofSteps.length;root.dataset.proofComplete=String(completed);outcome.dataset.status=!model.baseConsistent?'inconsistent':completed?'refuted':model.models.length?'model':'pending';
        if(!model.baseConsistent)outcome.append(el('h5','','목표를 묻기 전부터 전제가 충돌합니다'),el('p','','원래 전제 자체를 함께 만족시킬 수 없습니다. 이 모순을 새로운 목표만의 증명으로 읽지 않습니다.'));
        else if(completed)outcome.append(el('h5','','□ · 모든 절을 함께 참으로 만들 수 없습니다'),el('p','','원래 전제와 목표의 반대가 충돌했습니다. 이 전제들 아래에서는 목표의 반대가 성립할 수 없으므로 목표가 따라옵니다.'));
        else if(model.emptyClauseId)outcome.append(el('h5','','빈 절까지 이어지는 경로를 펼쳐 보세요'),el('p','','두 부모 절의 남은 리터럴을 이어 가며, 어디에서 더는 참으로 만들 리터럴이 없어지는지 확인합니다.'));
        else if(!negateGoal)outcome.append(el('h5','','아직 목표의 반대를 추가하지 않았습니다'),el('p','','현재 전제들을 만족하는 해석이 있습니다. 목표의 반대를 함께 두는 반박 증명과 구분합니다.'));
        else outcome.append(el('h5','','현재 전제를 지키면서 목표가 거짓인 해석이 있습니다'),el('p','','이 유한한 절 집합에서는 빈 절이 나오지 않았고, 아래 해석이 모든 전제를 만족합니다. 빠진 전제의 현실 값을 거짓이라고 단정한 것은 아닙니다.'));
        modelsView.replaceChildren();if(!model.emptyClauseId&&model.models.length){const candidate=model.models[0],block=el('div','rsn-model-table');block.append(el('h5','',negateGoal?'전제를 만족하는 한 반례':'전제를 만족하는 한 해석'));const table=el('table'),body=el('tbody');for(const atom of model.atoms){const tr=el('tr');tr.append(el('th','',displayLiteral(atom.literal)),el('td','',candidate[atom.key]?'이 해석에서 참':'이 해석에서 거짓'));body.append(tr);}table.append(body);block.append(pane(table,'한 해석의 참과 거짓, 표를 좌우로 이동','rsn-table-viewport'));modelsView.append(block);}
      }
      function recompute(){
        model=analyze({clauses:config.premises.filter(p=>enabled.has(p.id)).map(p=>p.clause),goal:config.goal,negateGoal});proofSteps=(model.emptyClauseId?model.proof:model.derived).filter(n=>n.kind==='resolvent');for(const[id,input]of premiseInputs)input.checked=enabled.has(id);negation.checked=negateGoal;root.dataset.enabled=[...enabled].sort().join(',');root.dataset.negateGoal=String(negateGoal);root.dataset.contradiction=String(model.contradiction);root.dataset.goalStatus=model.goalStatus;root.dataset.closureComplete=String(model.closureComplete);setStatus.textContent='현재 함께 둔 전제 '+enabled.size+'개'+(negateGoal?' + 목표의 반대 1개':' · 목표의 반대는 아직 더하지 않음')+'. 체크를 끈 전제는 이번 판단에 사용하지 않습니다. 거짓이라고 선언한 것이 아닙니다.';renderDerive();
      }
      root.append(nav,stageText,refute,unifyView,derive,disclosure('원논문의 정의와 증명 예시를 함께 읽기',evidence),disclosure('이 보기의 범위와 전제',scope));recompute();renderUnify();renderStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const off of listeners)off();root.remove();};
    }
  });
})();
