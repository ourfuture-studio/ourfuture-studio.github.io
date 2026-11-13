/* A finite, authored proof search using formulas and inference ideas in P-868.
 * The 2.08 chaining example uses known 2.07/1.2/2.01 schemas. Candidate order,
 * shallow structural score and per-candidate budget are new settings, not LT logs.
 */
(function(){
 'use strict';
 const copy=x=>JSON.parse(JSON.stringify(x));
 const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 const atom=name=>({type:'atom',name}),meta=name=>({type:'meta',name}),not=arg=>({type:'not',arg}),or=(left,right)=>({type:'or',left,right}),implies=(left,right)=>({type:'implies',left,right});
 function valid(x,depth=0){return !!x&&depth<24&&(['atom','meta'].includes(x.type)?typeof x.name==='string'&&/^[A-Za-z][A-Za-z0-9_]*$/.test(x.name):x.type==='not'?valid(x.arg,depth+1):['or','implies'].includes(x.type)&&valid(x.left,depth+1)&&valid(x.right,depth+1));}
 function equal(a,b){return !!a&&!!b&&a.type===b.type&&(['atom','meta'].includes(a.type)?a.name===b.name:a.type==='not'?equal(a.arg,b.arg):equal(a.left,b.left)&&equal(a.right,b.right));}
 function format(x){if(!valid(x))throw new TypeError('A bounded propositional expression is required.');if(['atom','meta'].includes(x.type))return x.name;if(x.type==='not')return '¬'+(['atom','meta'].includes(x.arg.type)?format(x.arg):'('+format(x.arg)+')');const part=y=>['or','implies'].includes(y.type)?'('+format(y)+')':format(y);return part(x.left)+(x.type==='or'?' ∨ ':' → ')+part(x.right);}
 function ground(x){return x.type==='meta'?false:x.type==='atom'?true:x.type==='not'?ground(x.arg):ground(x.left)&&ground(x.right);}
 function matchTemplate(pattern,target){
  if(!valid(pattern)||!valid(target))throw new TypeError('Valid pattern and target expressions are required.');
  const bindings=Object.create(null);
  function walk(a,b){if(a.type==='meta'){if(Object.hasOwn(bindings,a.name))return equal(bindings[a.name],b);bindings[a.name]=copy(b);return true;}if(a.type!==b.type)return false;if(a.type==='atom')return a.name===b.name;if(a.type==='not')return walk(a.arg,b.arg);return walk(a.left,b.left)&&walk(a.right,b.right);}
  return walk(pattern,target)?Object.fromEntries(Object.entries(bindings).map(([k,v])=>[k,copy(v)])):null;
 }
 function substitute(pattern,bindings={}){if(!valid(pattern)||!bindings||typeof bindings!=='object'||Object.values(bindings).some(x=>!valid(x)))throw new TypeError('Valid expression substitutions are required.');if(pattern.type==='meta')return copy(Object.hasOwn(bindings,pattern.name)?bindings[pattern.name]:pattern);if(pattern.type==='atom')return copy(pattern);if(pattern.type==='not')return not(substitute(pattern.arg,bindings));return{type:pattern.type,left:substitute(pattern.left,bindings),right:substitute(pattern.right,bindings)};}
 const P=atom('P'),Q=atom('Q'),R=atom('R'),p=atom('p');
 const cases=freeze([
  {id:'chaining-208',label:'원문 2.08 · p → p',goal:implies(p,p),methods:['chaining'],origin:'paper-example-new-search',source:'P-868 인쇄 pp.43–44 / PDF pp.44–45',description:'알려진 2.07과 1.2를 이어 2.08을 만드는 원문 사례다. 여기서는 직접 맞춤과 chaining을 사용하며 후보를 방문하는 순서는 새로 정한다.',sources:[
   {id:'2.01',label:'정리 2.01',kind:'theorem-schema',formula:implies(implies(meta('p'),not(meta('p'))),not(meta('p')))},
   {id:'1.2',label:'공리 1.2',kind:'axiom-schema',formula:implies(or(meta('p'),meta('p')),meta('p'))},
   {id:'2.07',label:'정리 2.07',kind:'theorem-schema',formula:implies(meta('p'),or(meta('p'),meta('p')))}
  ]},
  {id:'detachment',label:'자체 예 · 전제에서 Q를 구하기',goal:Q,methods:['detachment'],origin:'authored-premise-example',source:'P-868 인쇄 pp.38–39의 detachment 발상을 바탕으로 별도 구성',description:'P와 P→Q를 전제로 주고 Q를 구한다. 직접 맞춤과 detachment을 사용하는 작은 전제 집합이며 원프로그램의 정리나 당시 실행 로그가 아니다.',sources:[
   {id:'r-to-q',label:'주어진 전제 1',kind:'premise',formula:implies(R,Q)},
   {id:'p-to-q',label:'주어진 전제 2',kind:'premise',formula:implies(P,Q)},
   {id:'p-given',label:'주어진 전제 3',kind:'premise',formula:P}
  ]}
 ]);
 function getCase(id='chaining-208',includePremise=true){const c=cases.find(x=>x.id===id);if(!c)throw new RangeError('Unknown finite proof-search case.');const out=copy(c);if(id==='detachment'&&!includePremise)out.sources=out.sources.filter(s=>s.id!=='p-given');out.includePremise=includePremise;return out;}
 function structureScore(source,goal){const a=source.formula,b=goal,shape=x=>x.type==='meta'?'atom':x.type;let score=shape(a)===shape(b)?1:0;if(a.left&&b.left&&shape(a.left)===shape(b.left))score+=2;if(a.right&&b.right&&shape(a.right)===shape(b.right))score+=1;return score;}
 function ordered(sources,goal,policy){return sources.map((source,index)=>({source,index,score:structureScore(source,goal)})).sort((a,b)=>policy==='structure'?b.score-a.score||a.index-b.index:a.index-b.index);}
 function leaf(source,bindings,conclusion){return{rule:source.kind==='premise'?'given':'substitution',sourceId:source.id,bindings:copy(bindings),conclusion:copy(conclusion),children:[]};}
 function checkInference(rule,premises,conclusion){
  if(!valid(conclusion)||!Array.isArray(premises)||!premises.every(x=>valid(x)&&ground(x)))return{valid:false,reason:'유효한 전제식과 결론식이 필요하다.'};
  if(rule==='chaining'){if(premises.length!==2||premises.some(x=>x.type!=='implies'))return{valid:false,reason:'chaining에는 두 함의식이 필요하다.'};const [a,b]=premises;const middle=equal(a.right,b.left),ends=conclusion.type==='implies'&&equal(a.left,conclusion.left)&&equal(b.right,conclusion.right);return{valid:middle&&ends,reason:!middle?'앞 함의의 끝과 뒤 함의의 시작이 다르다.':!ends?'이어 붙인 양 끝이 목표와 다르다.':'중간식이 같고 양 끝이 목표와 일치한다.'};}
  if(rule==='detachment'){if(premises.length!==2||premises[0].type!=='implies')return{valid:false,reason:'detachment에는 함의식과 그 앞부분에 해당하는 식이 필요하다.'};const [a,b]=premises,antecedent=equal(a.left,b),end=equal(a.right,conclusion);return{valid:antecedent&&end,reason:!antecedent?'주어진 식이 함의의 앞부분과 다르다.':!end?'함의의 뒷부분이 결론과 다르다.':'함의의 앞부분을 확보해 그 뒷부분을 얻었다.'};}
  return{valid:false,reason:'허용하지 않은 추론 규칙이다.'};
 }
 function verifyProof(proof,sources){
  if(!Array.isArray(sources)||new Set(sources.map(s=>s.id)).size!==sources.length)throw new TypeError('A unique finite source memory is required.');const steps=[],seen=new Set();
  function verify(n,depth=0){if(!n||typeof n!=='object'||depth>24||seen.has(n)||!valid(n.conclusion)||!ground(n.conclusion)){steps.push({rule:n?.rule||'invalid',valid:false,reason:'손상되었거나 미완성인 증명식이다.'});return false;}seen.add(n);let ok=false,reason;
   if(['given','substitution'].includes(n.rule)){const s=sources.find(s=>s.id===n.sourceId);if(!s){reason='기억 목록에 없는 출처다.';}else{try{const instantiated=substitute(s.formula,n.bindings||{});ok=(!n.children||Array.isArray(n.children)&&n.children.length===0)&&ground(instantiated)&&equal(instantiated,n.conclusion)&&(n.rule==='given'?s.kind==='premise':s.kind!=='premise');}catch(_){ok=false;}reason=ok?'알려진 식의 같은 변수에 같은 식을 넣어 일치했다.':'출처식·균일한 치환·결론이 일치하지 않는다.';}}
   else{const children=Array.isArray(n.children)?n.children:[],childOK=children.map(c=>verify(c,depth+1)),inference=checkInference(n.rule,children.map(c=>c?.conclusion),n.conclusion);ok=childOK.length===2&&childOK.every(Boolean)&&inference.valid;reason=inference.reason;}
   steps.push({rule:n.rule,sourceId:n.sourceId||null,conclusion:format(n.conclusion),valid:ok,reason});seen.delete(n);return ok;
  }
  const isValid=verify(proof);return{valid:isValid,steps};
 }
 function search({caseId='chaining-208',policy='structure',budget=16,maxDepth=4,includePremise=true}={}){
  if(!['structure','listed'].includes(policy)||!Number.isInteger(budget)||budget<1||budget>64||!Number.isInteger(maxDepth)||maxDepth<1||maxDepth>6||typeof includePremise!=='boolean')throw new RangeError('Use a finite policy,1-64 candidate checks and a1-6 goal-depth limit.');
  const c=getCase(caseId,includePremise),events=[],nodes=[];let used=0;
  const push=e=>{events.push({index:events.length,...copy(e)});return events.length-1;};
  function solve(goal,parentId=null,depth=0,path=[]){
   const node={id:'n'+nodes.length,parentId,depth,goal:copy(goal),bornAt:events.length};nodes.push(node);push({kind:'goal',nodeId:node.id,parentId,depth,goal:format(goal),message:parentId?'새 중간 목표를 문제 목록에 둔다.':'증명할 목표에서 탐색을 시작한다.'});
   const key=format(goal);if(depth>maxDepth||path.includes(key)){const status=depth>maxDepth?'depth-limited':'cycle-pruned';push({kind:'close',nodeId:node.id,status,message:depth>maxDepth?'새로 정한 깊이 한도에서 이 가지를 멈춘다.':'같은 목표가 현재 경로에서 반복되어 이 가지를 멈춘다.'});return{status,nodeId:node.id};}
   let limited=false;
   for(const candidate of ordered(c.sources,goal,policy)){
    if(used>=budget){push({kind:'close',nodeId:node.id,status:'budget-exhausted',message:'새로 정한 후보 검사 예산을 다 썼다. 목표가 거짓이라는 판정은 아니다.'});return{status:'budget-exhausted',nodeId:node.id};}
    const s=candidate.source,bindings=matchTemplate(s.formula,goal);used++;
    if(bindings){const p=leaf(s,bindings,goal);push({kind:'candidate',nodeId:node.id,sourceId:s.id,sourceFormula:format(s.formula),score:candidate.score,method:'direct',outcome:'matched',checks:used,message:'알려진 식을 균일하게 치환하면 현재 목표와 일치한다.'});push({kind:'close',nodeId:node.id,status:'proved',proof:p,message:'이 목표의 증명 근거를 확보했다.'});return{status:'proved',proof:p,nodeId:node.id};}
    let method=null,b=null,nextGoal=null,known=null;
    if(c.methods.includes('chaining')&&goal.type==='implies'&&s.formula.type==='implies'){b=matchTemplate(s.formula.left,goal.left);if(b){const f=substitute(s.formula,b);if(ground(f)){method='chaining';known=f;nextGoal=implies(f.right,goal.right);}}}
    if(c.methods.includes('detachment')&&!method&&s.formula.type==='implies'){b=matchTemplate(s.formula.right,goal);if(b){const f=substitute(s.formula,b);if(ground(f)){method='detachment';known=f;nextGoal=f.left;}}}
    push({kind:'candidate',nodeId:node.id,sourceId:s.id,sourceFormula:format(s.formula),score:candidate.score,method:method||'none',outcome:method?'subgoal':'mismatch',checks:used,nextGoal:nextGoal?format(nextGoal):null,message:method==='chaining'?'시작 부분이 맞는다. 남은 연결을 새 중간 목표로 만든다.':method==='detachment'?'뒷부분이 목표와 맞는다. 그 앞부분을 새 중간 목표로 만든다.':'이 제한된 맞춤에서는 직접 증명이나 다음 연결을 만들지 못했다.'});
    if(!method)continue;
    const child=solve(nextGoal,node.id,depth+1,[...path,key]);
    if(child.status==='proved'){const first=leaf(s,b,known),proof={rule:method,sourceId:null,conclusion:copy(goal),children:method==='chaining'?[first,child.proof]:[first,child.proof]};const verification=verifyProof(proof,c.sources);if(!verification.valid)throw new Error('Generated inference failed independent rule checking.');push({kind:'combine',nodeId:node.id,childId:child.nodeId,sourceId:s.id,rule:method,conclusion:format(goal),message:method==='chaining'?'중간식이 같은 두 함의의 양 끝을 이어 목표를 얻었다.':'앞부분을 확보했으므로 함의의 뒷부분인 목표를 얻었다.'});push({kind:'close',nodeId:node.id,status:'proved',proof,message:'허용된 추론 규칙으로 이 목표를 닫는다.'});return{status:'proved',proof,nodeId:node.id};}
    if(child.status==='budget-exhausted'){push({kind:'close',nodeId:node.id,status:'budget-exhausted',message:'중간 목표가 예산 안에서 끝나지 않아 상위 목표도 멈춘다.'});return{status:'budget-exhausted',nodeId:node.id};}
    if(child.status==='depth-limited'||child.status==='cycle-pruned')limited=true;
    push({kind:'backtrack',nodeId:node.id,childId:child.nodeId,sourceId:s.id,message:'이 가지에서 목표를 얻지 못했다. 다음 후보로 돌아간다.'});
   }
   const status=limited?'depth-limited':'not-found';push({kind:'close',nodeId:node.id,status,message:limited?'깊이·반복 제한이 있어 이 실행에서 증명을 찾지 못했다.':'이 유한 기억과 제한된 방법의 후보를 모두 살폈지만 증명을 찾지 못했다. 목표가 거짓이라는 뜻은 아니다.'});return{status,nodeId:node.id};
  }
  const result=solve(c.goal),verification=result.proof?verifyProof(result.proof,c.sources):null;
  push({kind:'result',nodeId:'n0',status:result.status,checks:used,message:result.status==='proved'?'생성한 증명이 출처식·치환·추론 검사를 통과했다.':result.status==='budget-exhausted'?'후보 검사 예산을 모두 써 멈췄다.':'설정한 기억과 방법 안에서 증명을 확보하지 못했다.'});
  return{caseId,case:c,policy,budget,maxDepth,includePremise,status:result.status,candidateChecks:used,nodes,events,proof:result.proof||null,verification,scope:'New finite candidate order, shallow structure score and candidate-check budget; not the historical LT execution order, NAW/W cost, complete theorem store or exhaustive substitution procedure.'};
 }
 function replay(result,step=0){if(!result?.events||!Number.isInteger(step)||step<0||step>=result.events.length)throw new RangeError('A recorded search step is required.');const nodes=new Map();let checks=0,status='running',proof=null;
  for(const e of result.events.slice(0,step+1)){if(e.kind==='goal'){const original=result.nodes.find(n=>n.id===e.nodeId);nodes.set(e.nodeId,{...copy(original),status:'open',candidateId:null});}if(e.kind==='candidate'){checks=e.checks;const n=nodes.get(e.nodeId);if(n){n.status=e.outcome==='matched'?'matched':e.outcome==='subgoal'?'waiting':'searching';n.candidateId=e.sourceId;}}if(e.kind==='close'){const n=nodes.get(e.nodeId);if(n)n.status=e.status;if(e.nodeId==='n0'&&e.status==='proved')proof=copy(e.proof);}if(e.kind==='backtrack'){const n=nodes.get(e.nodeId);if(n)n.status='searching';}if(e.kind==='result')status=e.status;}
  return{step,event:copy(result.events[step]),nodes:[...nodes.values()],checks,status,proof,complete:step===result.events.length-1};
 }
 function inferenceExample(proof,tamper=false){if(!proof||!['chaining','detachment'].includes(proof.rule))return null;const premises=proof.children.map(c=>copy(c.conclusion));if(tamper){if(proof.rule==='chaining')premises[1].left=atom('r');else premises[1]=atom('R');}return{rule:proof.rule,premises,conclusion:copy(proof.conclusion),tampered:tamper,...checkInference(proof.rule,premises,proof.conclusion)};}
 window.AtlasLogicSearch=freeze({atom,meta,not,or,implies,format,equal,matchTemplate,substitute,cases,getCase,structureScore,search,replay,verifyProof,checkInference,inferenceExample});
})();
