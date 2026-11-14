/* Robinson (1965), printed p.36 Example 2: three fixed general resolvents.
 * Selected literal subsets are unified together, using the preserved unifier.
 * This is a bounded calculation of that published route, not a theorem search.
 */
(function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 const v=value=>({type:'variable',value}),f=(value,...args)=>({type:'function',value,args}),q=(negative,...args)=>({predicate:'Q',negative,args}),c=(id,...literals)=>({id,literals});
 const x=v('x'),y=v('y'),z=v('z'),u=v('u'),w=v('w'),a=v('v');
 const example=freeze({
  id:'robinson-example-2',source:{title:'Robinson (1965) · §6 Example 2 and Commentary',url:'https://web.stanford.edu/class/linguist289/robinson65.pdf#page=14',printedPage:36,pdfPage:14},
  clauses:[c('C1',q(true,x,y,u),q(true,y,z,a),q(true,x,a,w),q(false,u,z,w)),c('C2',q(true,x,y,u),q(true,y,z,a),q(true,u,z,w),q(false,x,a,w)),c('C3',q(false,f('g',x,y),x,y)),c('C4',q(false,x,f('h',x,y),y)),c('C5',q(false,x,y,f('f',x,y))),c('C6',q(true,f('k',x),x,f('k',x)))],
  plans:[{id:'C7',left:'C1',right:'C3',leftSelection:[0,2],rightSelection:[0],expected:c('C7',q(true,v('y1'),v('x6'),v('y1')),q(false,v('y2'),v('x6'),v('y2')))},{id:'C8',left:'C6',right:'C7',leftSelection:[0],rightSelection:[1],expected:c('C8',q(true,v('y1'),v('y2'),v('y1')))},{id:'C9',left:'C4',right:'C8',leftSelection:[0],rightSelection:[0],expected:c('C9')}],
  unused:['C2','C5'],scope:'The original three-step Example 2 route, with selected-subset resolution and bounded unification. No automatic clause search, normalization, equality reasoning, or completeness implementation.'
 });
 const identifier=s=>typeof s==='string'&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)&&s.length<=40;
 function term(t,state={n:0},depth=0){if(++state.n>256||depth>8||!t||!identifier(t.value)||!['variable','constant','function'].includes(t.type))throw new TypeError('A bounded first-order term is required.');if(t.type==='function'){if(!Array.isArray(t.args)||t.args.length<1||t.args.length>4)throw new TypeError('A function needs one to four arguments.');return{type:t.type,value:t.value,args:t.args.map(a=>term(a,state,depth+1))};}return{type:t.type,value:t.value};}
 function clause(input){if(!input||typeof input.id!=='string'||!input.id||input.id.length>120||!Array.isArray(input.literals)||input.literals.length>8)throw new TypeError('A bounded clause is required.');const state={n:0};return{id:input.id,literals:input.literals.map(l=>{if(!l||!identifier(l.predicate)||typeof l.negative!=='boolean'||!Array.isArray(l.args)||l.args.length>4)throw new TypeError('A literal needs a predicate, polarity and at most four arguments.');return{predicate:l.predicate,negative:l.negative,args:l.args.map(t=>term(t,state))};})};}
 function formatTerm(t){return t.type==='function'?t.value+'('+t.args.map(formatTerm).join(', ')+')':t.value;}
 function formatLiteral(l){return(l.negative?'¬':'')+l.predicate+'('+l.args.map(formatTerm).join(', ')+')';}
 function formatClause(input){const literals=Array.isArray(input)?input:input.literals;return literals.length?literals.map(formatLiteral).join(' ∨ '):'□';}
 function rename(input,prefix){const names=new Set();function collect(t){if(t.type==='variable')names.add(t.value);else if(t.type==='function')t.args.forEach(collect);}input.literals.forEach(l=>l.args.forEach(collect));const renaming=[...names].sort().map((from,i)=>({from,to:prefix+(i+1)})),map=new Map(renaming.map(r=>[r.from,r.to]));const change=t=>t.type==='variable'?v(map.get(t.value)):t.type==='function'?f(t.value,...t.args.map(change)):{...t};return{renaming,clause:{id:input.id,literals:input.literals.map(l=>({...l,args:l.args.map(change)}))}};}
 function applyTerm(t,bindings,path=[]){if(path.length>48)throw new RangeError('Substitution exceeds this view.');if(t.type==='variable'&&bindings.has(t.value)){if(path.includes(t.value))throw new TypeError('Cyclic substitution.');return applyTerm(bindings.get(t.value),bindings,[...path,t.value]);}return t.type==='function'?f(t.value,...t.args.map(a=>applyTerm(a,bindings,path))):{...t};}
 const apply=(literals,bindings)=>literals.map(l=>({...l,args:l.args.map(t=>applyTerm(t,bindings))}));
 const unique=literals=>[...new Map(literals.map(l=>[JSON.stringify(l),l])).values()];
 const selection=(indices,length)=>Array.isArray(indices)&&indices.length<=8&&new Set(indices).size===indices.length&&indices.every(i=>Number.isInteger(i)&&i>=0&&i<length);
 function resolveSelected({left,right,leftSelection,rightSelection}){
  left=clause(left);right=clause(right);if(!selection(leftSelection,left.literals.length)||!selection(rightSelection,right.literals.length))throw new TypeError('Select distinct literal indices in both clauses.');
  const l=rename(left,'x'),r=rename(right,'y'),base={left:clone(left),right:clone(right),leftSelection:[...leftSelection],rightSelection:[...rightSelection],leftRenaming:l.renaming,rightRenaming:r.renaming,leftStandardized:l.clause,rightStandardized:r.clause};
  const fail=(reason,extra={})=>clone({...base,resolved:false,reason,substitution:[],trace:[],leftApplied:null,rightApplied:null,remaining:null,resolvent:null,...extra});
  if(!leftSelection.length||!rightSelection.length)return fail('selection-empty');
  const ls=leftSelection.map(i=>l.clause.literals[i]),rs=rightSelection.map(i=>r.clause.literals[i]),anchor=ls[0],all=[...ls,...rs];
  if(ls.some(a=>a.negative!==anchor.negative)||rs.some(a=>a.negative!==rs[0].negative))return fail('mixed-polarity');
  if(anchor.negative===rs[0].negative)return fail('same-polarity');
  if(all.some(a=>a.predicate!==anchor.predicate||a.args.length!==anchor.args.length))return fail('different-predicate');
  const leftTerms=[],rightTerms=[];for(const literal of all.slice(1)){leftTerms.push(...anchor.args);rightTerms.push(...literal.args);}if(leftTerms.length>8)return fail('pair-limit');
  const engine=window.AtlasResolutionModel;if(!engine?.unify)throw new Error('The preserved resolution unifier must load first.');
  const unified=engine.unify({left:leftTerms,right:rightTerms});if(!unified.unifiable)return fail(unified.reason,{trace:unified.trace});
  const bindings=new Map(unified.substitution.map(s=>[s.variable,s.term])),leftApplied=apply(l.clause.literals,bindings),rightApplied=apply(r.clause.literals,bindings),remaining=[...leftApplied.filter((_,i)=>!leftSelection.includes(i)),...rightApplied.filter((_,i)=>!rightSelection.includes(i))],resolvent=unique(remaining),selectedApplied=[...ls,...rs].map(a=>apply([a],bindings)[0]);
  if(!selectedApplied.every(a=>same(a.args,selectedApplied[0].args)))throw new Error('The selected atoms did not unify together.');
  return clone({...base,resolved:true,reason:'resolved',selectedStandardized:[...ls,...rs],selectedApplied,substitution:unified.substitution,trace:unified.trace,leftApplied,rightApplied,remaining,resolvent,duplicatesRemoved:remaining.length-resolvent.length});
 }
 function alphaEquivalent(first,second){
  const left=clause(Array.isArray(first)?{id:'left',literals:first}:first).literals,right=clause(Array.isArray(second)?{id:'right',literals:second}:second).literals;if(left.length!==right.length)return false;
  function matchTerm(a,b,forward,backward){if(a.type!==b.type)return false;if(a.type==='variable'){if(forward.has(a.value))return forward.get(a.value)===b.value;if(backward.has(b.value))return false;forward.set(a.value,b.value);backward.set(b.value,a.value);return true;}if(a.value!==b.value)return false;if(a.type==='function'){if(a.args.length!==b.args.length)return false;return a.args.every((t,i)=>matchTerm(t,b.args[i],forward,backward));}return true;}
  function walk(i,used,forward,backward){if(i===left.length)return true;const a=left[i];for(let j=0;j<right.length;j++){const b=right[j];if(used.has(j)||a.predicate!==b.predicate||a.negative!==b.negative||a.args.length!==b.args.length)continue;const fm=new Map(forward),bm=new Map(backward);if(a.args.every((t,k)=>matchTerm(t,b.args[k],fm,bm))&&walk(i+1,new Set([...used,j]),fm,bm))return true;}return false;}
  return walk(0,new Set(),new Map(),new Map());
 }
 function run(){const memory=new Map(example.clauses.map(c=>[c.id,clone(c)])),steps=[];for(const plan of example.plans){const result=resolveSelected({left:memory.get(plan.left),right:memory.get(plan.right),leftSelection:plan.leftSelection,rightSelection:plan.rightSelection}),produced={id:plan.id,literals:result.resolvent};if(!result.resolved||!alphaEquivalent(produced,plan.expected))throw new Error('The computed original step disagrees with its printed clause.');steps.push({id:plan.id,parentIds:[plan.left,plan.right],expected:clone(plan.expected),calculation:result,produced,alphaEquivalent:true});memory.set(plan.id,clone(produced));}return{example:clone(example),steps,emptyClause:clone(memory.get('C9')),valid:true,unused:[...example.unused],scope:example.scope};}
 function verifyPath(path){try{if(!path||!Array.isArray(path.steps)||path.steps.length!==3||!same(path.example,example))return{valid:false,reason:'source-memory'};const memory=new Map(example.clauses.map(c=>[c.id,clone(c)]));for(let i=0;i<example.plans.length;i++){const plan=example.plans[i],step=path.steps[i];if(step.id!==plan.id||!same(step.parentIds,[plan.left,plan.right]))return{valid:false,reason:'parents'};const result=resolveSelected({left:memory.get(plan.left),right:memory.get(plan.right),leftSelection:plan.leftSelection,rightSelection:plan.rightSelection});if(!result.resolved||!same(step.expected,plan.expected)||!same(step.calculation,result)||!same(step.produced,{id:plan.id,literals:result.resolvent})||!alphaEquivalent(step.produced,plan.expected))return{valid:false,reason:'step'};memory.set(plan.id,clone(step.produced));}return{valid:memory.get('C9').literals.length===0&&same(path.emptyClause,memory.get('C9')),reason:'checked-original-route'};}catch(_){return{valid:false,reason:'malformed-path'};}}
 window.AtlasResolutionOriginal=freeze({getExample:()=>clone(example),resolveSelected,alphaEquivalent,run,verifyPath,formatTerm,formatLiteral,formatClause});
})();
