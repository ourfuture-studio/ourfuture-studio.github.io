/* A finite, two-element model checker for a constructed explanation.
 * R(x,y) is a Boolean relation over {a,b}. This is not a general decision
 * procedure for first-order validity or a reconstruction of Newman's lecture.
 */
(function(){
  'use strict';
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  const domain=freeze(['a','b']);
  const formulas=freeze([
    {id:'forall-exists',notation:'∀x ∃y R(x,y)',label:'각 x마다 적어도 하나의 y',description:'각 대상 x가 관계를 맺는 대상 y를 하나 이상 갖는지 확인합니다. x에 따라 다른 y를 골라도 됩니다.'},
    {id:'exists-forall',notation:'∃y ∀x R(x,y)',label:'모든 x에 공통인 하나의 y',description:'모든 대상 x가 함께 관계를 맺는 같은 대상 y가 적어도 하나 있는지 확인합니다.'}
  ]);
  const byKind=new Map(formulas.map(formula=>[formula.id,formula]));
  const presets=freeze([
    {id:'diagonal',label:'각자 자신을 가리키는 세계',matrix:[[true,false],[false,true]]},
    {id:'common',label:'모두 b를 가리키는 세계',matrix:[[false,true],[false,true]]},
    {id:'missing-row',label:'b는 아무도 가리키지 않는 세계',matrix:[[true,false],[false,false]]},
    {id:'cycle',label:'서로를 가리키는 세계',matrix:[[false,true],[true,false]]},
    {id:'empty',label:'관계가 하나도 없는 세계',matrix:[[false,false],[false,false]]},
    {id:'full',label:'모든 관계가 있는 세계',matrix:[[true,true],[true,true]]}
  ]);
  function matrixCopy(matrix){
    if(!Array.isArray(matrix)||matrix.length!==2||!matrix.every(row=>Array.isArray(row)&&row.length===2&&row.every(value=>typeof value==='boolean')))throw new TypeError('두 대상 a·b 사이의 관계를 2×2 불리언 배열로 입력해야 합니다.');
    // Array.every skips holes; explicit indices also rule out sparse relations.
    for(let x=0;x<2;x++)for(let y=0;y<2;y++)if(typeof matrix[x]?.[y]!=='boolean')throw new TypeError('관계의 네 칸은 모두 true 또는 false여야 합니다.');
    return [[matrix[0][0],matrix[0][1]],[matrix[1][0],matrix[1][1]]];
  }
  function formulaFor(kind){const formula=byKind.get(kind);if(!formula)throw new RangeError('지원하는 문장은 forall-exists 또는 exists-forall입니다.');return formula;}
  function evaluate(matrix,kind='forall-exists'){
    const formula=formulaFor(kind),copy=matrixCopy(matrix);
    const rows=domain.map((x,xi)=>{const values=domain.map((y,yi)=>({y,value:copy[xi][yi]})),ys=values.filter(item=>item.value).map(item=>item.y);return {x,values,witnessYs:ys,satisfied:ys.length>0};});
    const columns=domain.map((y,yi)=>{const values=domain.map((x,xi)=>({x,value:copy[xi][yi]})),xs=values.filter(item=>item.value).map(item=>item.x);return {y,values,matchingXs:xs,allX:xs.length===domain.length};});
    const commonYs=columns.filter(column=>column.allX).map(column=>column.y);
    const traceRows=domain.flatMap((x,xi)=>domain.map((y,yi)=>({x,y,value:copy[xi][yi]})));
    const result=kind==='forall-exists'?rows.every(row=>row.satisfied):commonYs.length>0;
    return freeze({kind,formula,matrix:copy,result,witnesses:{perX:rows.map(row=>({x:row.x,ys:row.witnessYs.slice(),satisfied:row.satisfied})),commonYs},traceRows,rows,columns});
  }
  function compare(matrix){
    const copy=matrixCopy(matrix),forallExists=evaluate(copy,'forall-exists'),existsForall=evaluate(copy,'exists-forall');
    return freeze({matrix:copy,forallExists,existsForall,quantifierSwapCounterexample:forallExists.result&&!existsForall.result,reverseImplication:!existsForall.result||forallExists.result});
  }
  function enumerate(){
    const models=[];
    for(let mask=0;mask<16;mask++){
      const bitString=mask.toString(2).padStart(4,'0'),bits=[...bitString].map(bit=>bit==='1'),matrix=[[bits[0],bits[1]],[bits[2],bits[3]]],comparison=compare(matrix);
      models.push({id:'model-'+bitString,mask,bitString,matrix,forallExists:comparison.forallExists.result,existsForall:comparison.existsForall.result,quantifierSwapCounterexample:comparison.quantifierSwapCounterexample});
    }
    return freeze({scope:'두 대상 a·b와 관계 R 하나로 한정한 모든 16개 세계',domain,size:16,models,counts:{forallExists:models.filter(model=>model.forallExists).length,existsForall:models.filter(model=>model.existsForall).length,quantifierSwapCounterexamples:models.filter(model=>model.quantifierSwapCounterexample).length}});
  }
  function boundedFamilyCheck(kind){
    formulaFor(kind);const family=enumerate(),field=kind==='forall-exists'?'forallExists':'existsForall',counterexampleIds=family.models.filter(model=>!model[field]).map(model=>model.id);
    return freeze({kind,scope:family.scope,domainSize:2,modelsChecked:16,holdsInAllModels:counterexampleIds.length===0,counterexampleIds,isGeneralValidityDecision:false});
  }
  // Turing (1936), §3 Example I, printed p.233 (MIT PDF page4).
  // Latin b,c,e,f stand for the source's fraktur m-configurations. Each
  // listed rule scans a blank. The display must not invent nonblank rules.
  const sourceMachineRules=freeze([
    {mconfig:'b',scanned:'',write:'0',move:1,next:'c',notation:'P0, R'},
    {mconfig:'c',scanned:'',write:null,move:1,next:'e',notation:'R'},
    {mconfig:'e',scanned:'',write:'1',move:1,next:'f',notation:'P1, R'},
    {mconfig:'f',scanned:'',write:null,move:1,next:'b',notation:'R'}
  ]);
  const machineSource=freeze({url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=4',location:'§3, Example I, printed p.233',scope:'Four source rules for the blank scanned symbol; b,c,e,f are Latin renderings of fraktur m-configurations. The finite trace is not a general Entscheidungsproblem decision procedure.'});
  const machineStepLimit=16;
  function readMachine(state){
    if(!state||typeof state!=='object'||Array.isArray(state)||!Array.isArray(state.tape)||state.tape.length<1||state.tape.length>machineStepLimit+1||!Number.isInteger(state.head)||state.head<0||state.head>=state.tape.length||state.head>machineStepLimit||!sourceMachineRules.some(rule=>rule.mconfig===state.mconfig)||!Number.isInteger(state.steps)||state.steps<0||state.steps>machineStepLimit)throw new TypeError('기계 상태는 유한한 테이프, 머리 위치, b·c·e·f 중 상태, 0–16 단계 수를 가져야 합니다.');
    const tape=[];for(let index=0;index<state.tape.length;index++){const value=state.tape[index];if(!['','0','1'].includes(value))throw new TypeError('테이프 기호는 빈칸, 0, 1만 허용됩니다.');tape.push(value);}
    return {tape,head:state.head,mconfig:state.mconfig,steps:state.steps};
  }
  function initialMachine(){return freeze({tape:[''],head:0,mconfig:'b',steps:0});}
  function machineStep(state){
    const before=freeze(readMachine(state));
    if(before.steps>=machineStepLimit||before.head>=machineStepLimit)return freeze({before,after:before,rule:null,status:'step-limit'});
    const rule=sourceMachineRules.find(rule=>rule.mconfig===before.mconfig&&rule.scanned===before.tape[before.head]);
    if(!rule)return freeze({before,after:before,rule:null,status:'no-listed-rule'});
    const tape=before.tape.slice();if(rule.write!==null)tape[before.head]=rule.write;const head=before.head+rule.move;if(head===tape.length)tape.push('');
    const after=freeze({tape,head,mconfig:rule.next,steps:before.steps+1});
    return freeze({before,after,rule,status:'stepped'});
  }
  function machineTrace(options={}){
    if(!options||typeof options!=='object'||Array.isArray(options)||Object.keys(options).some(key=>key!=='steps'))throw new TypeError('steps 옵션만 지정할 수 있습니다.');
    const count=options.steps===undefined?8:options.steps;if(!Number.isInteger(count)||count<0||count>machineStepLimit)throw new RangeError('표시 단계 수는 0–16의 정수여야 합니다.');
    const initial=initialMachine(),steps=[];let state=initial;
    for(let index=0;index<count;index++){const result=machineStep(state);if(result.status!=='stepped')return freeze({initial,steps,state,printedSymbols:state.tape.filter(Boolean).join(''),lastPrinted:state.tape.filter(Boolean).join(''),status:result.status});steps.push(result);state=result.after;}
    return freeze({initial,steps,state,printedSymbols:state.tape.filter(Boolean).join(''),lastPrinted:state.tape.filter(Boolean).join(''),status:'step-limit'});
  }
  window.AtlasNewmanDecision=freeze({domain,formulas,presets,evaluate,compare,enumerate,boundedFamilyCheck,sourceMachineRules,machineSource,machineStepLimit,initialMachine,machineStep,machineTrace});
})();
