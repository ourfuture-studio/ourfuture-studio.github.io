/* A new, deliberately reduced 1997-form LSTM experiment, not a paper replay.
 * One cell; no forget gate; only external inputs enter the candidate and gates.
 * The cell's self-connection is 1. A target is supplied only at the final read.
 * For this topology Appendix A.12 eligibility and full BPTT coincide exactly.
 * Earlier output gates do not influence the future state: their credit is zero.
 * A separate same-step readout follows the cell; the paper's global clock is
 * not reproduced. Training does not constrain outputs before the final read.
 */
(function(){
  'use strict';
  const copy=value=>JSON.parse(JSON.stringify(value));
  const finite=value=>typeof value==='number'&&Number.isFinite(value);
  const sigmoid=value=>value>=0?1/(1+Math.exp(-value)):Math.exp(value)/(1+Math.exp(value));
  const keys=Object.freeze(['candidate','inputGate','outputGate','readout']);
  const sizes=Object.freeze({candidate:4,inputGate:4,outputGate:4,readout:2});
  const features=Object.freeze(['signal','writeCue','readCue','bias']);
  const parameterInfo=Object.freeze(keys.flatMap(key=>Array.from({length:sizes[key]},(_,index)=>Object.freeze({id:key+'.'+index,key,index,feature:key==='readout'?(index===0?'cellOutput':'bias'):features[index]}))));
  const zero=()=>({candidate:[0,0,0,0],inputGate:[0,0,0,0],outputGate:[0,0,0,0],readout:[0,0]});
  const dot=(weights,inputs)=>weights.reduce((sum,w,index)=>sum+w*inputs[index],0);
  function random(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
  function validate(parameters){
    if(!parameters||!keys.every(key=>Array.isArray(parameters[key])&&parameters[key].length===sizes[key]&&parameters[key].every(finite)))throw new TypeError('Expected fourteen finite parameters for a single 1997-form cell and a readout.');
  }
  function flatten(parameters){validate(parameters);return keys.flatMap(key=>parameters[key]);}
  function fromFlat(values){if(!Array.isArray(values)||values.length!==14||!values.every(finite))throw new TypeError('Fourteen finite parameter values required.');let offset=0;return Object.fromEntries(keys.map(key=>{const row=values.slice(offset,offset+sizes[key]);offset+=sizes[key];return[key,row];}));}
  function makeSequence({signal=1,distractors=[1,-1,1]}={}){
    if(signal!==1&&signal!==-1)throw new RangeError('The remembered signal must be +1 or -1.');
    if(!Array.isArray(distractors)||distractors.length>64||!distractors.every(x=>x===1||x===-1))throw new RangeError('Use up to64 distractors, each +1 or -1.');
    const frames=[{kind:'write',label:'남길 신호',inputs:[signal,1,0,1]}];
    distractors.forEach((value,index)=>frames.push({kind:'distractor',label:'방해 입력 '+(index+1),inputs:[value,0,0,1]}));
    frames.push({kind:'read',label:'읽기 요청',inputs:[0,0,1,1]});
    return{signal,distractors:distractors.slice(),target:signal===1?1:0,frames};
  }
  function validateSequence(sequence){
    if(!sequence||!Array.isArray(sequence.frames)||sequence.frames.length<2||sequence.frames.length>66||![0,1].includes(sequence.target)||!sequence.frames.every(frame=>Array.isArray(frame.inputs)&&frame.inputs.length===4&&frame.inputs.every(finite)))throw new TypeError('A finite sequence and a final binary target are required.');
  }
  const cases=Object.freeze(Array.from({length:16},(_,index)=>{
    const sequence=makeSequence({signal:index<8?-1:1,distractors:Array.from({length:3},(_,j)=>(index>>(2-j))&1?1:-1)});
    sequence.id=index;sequence.distractors=Object.freeze(sequence.distractors);sequence.frames=Object.freeze(sequence.frames.map(frame=>Object.freeze({...frame,inputs:Object.freeze(frame.inputs)})));return Object.freeze(sequence);
  }));
  function create(seed=1){
    if(!Number.isInteger(seed))throw new TypeError('An integer initialization seed is required.');
    const rand=random(seed),parameters=fromFlat(Array.from({length:14},()=>.6*rand()-.3));
    return{seed,sweep:0,parameters,velocity:zero()};
  }
  function forward(sequence,parameters){
    validate(parameters);validateSequence(sequence);
    let state=0,eligibilityCandidate=[0,0,0,0],eligibilityInput=[0,0,0,0];
    const frames=sequence.frames.map((source,index)=>{
      const inputs=source.inputs.slice(),candidateSum=dot(parameters.candidate,inputs),inputGateSum=dot(parameters.inputGate,inputs),outputGateSum=dot(parameters.outputGate,inputs);
      const candidateSigmoid=sigmoid(candidateSum),candidate=4*candidateSigmoid-2,candidateDerivative=4*candidateSigmoid*(1-candidateSigmoid),inputGate=sigmoid(inputGateSum),outputGate=sigmoid(outputGateSum);
      const previousState=state,write=inputGate*candidate;state+=write;
      const exposedSigmoid=sigmoid(state),exposed=2*exposedSigmoid-1,exposedDerivative=2*exposedSigmoid*(1-exposedSigmoid),cellOutput=outputGate*exposed,outputSum=parameters.readout[0]*cellOutput+parameters.readout[1],output=sigmoid(outputSum);
      const candidateEligibilityIncrement=inputs.map(x=>inputGate*candidateDerivative*x),inputGateEligibilityIncrement=inputs.map(x=>candidate*inputGate*(1-inputGate)*x);
      eligibilityCandidate=eligibilityCandidate.map((old,j)=>old+candidateEligibilityIncrement[j]);eligibilityInput=eligibilityInput.map((old,j)=>old+inputGateEligibilityIncrement[j]);
      return{index,kind:source.kind||'',label:source.label||'',inputs,candidateSum,inputGateSum,outputGateSum,candidate,candidateDerivative,inputGate,outputGate,previousState,write,state,carryDerivative:1,exposed,exposedDerivative,cellOutput,outputSum,output,hasLoss:index===sequence.frames.length-1,eligibility:{candidate:eligibilityCandidate.slice(),inputGate:eligibilityInput.slice()},eligibilityIncrement:{candidate:candidateEligibilityIncrement,inputGate:inputGateEligibilityIncrement}};
    });
    const last=frames[frames.length-1],difference=last.output-sequence.target,error=.5*difference*difference,outputDelta=difference*last.output*(1-last.output),cellOutputCredit=outputDelta*parameters.readout[0],finalStateCredit=cellOutputCredit*last.outputGate*last.exposedDerivative,gradients=zero();
    let stateCredit=finalStateCredit;
    for(let t=frames.length-1;t>=0;t--){
      const frame=frames[t],localOutputCredit=frame.hasLoss?cellOutputCredit:0,candidateCredit=stateCredit*frame.inputGate*frame.candidateDerivative,inputGateCredit=stateCredit*frame.candidate*frame.inputGate*(1-frame.inputGate),outputGateCredit=localOutputCredit*frame.exposed*frame.outputGate*(1-frame.outputGate);
      const contribution={candidate:frame.inputs.map(x=>candidateCredit*x),inputGate:frame.inputs.map(x=>inputGateCredit*x),outputGate:frame.inputs.map(x=>outputGateCredit*x),readout:frame.hasLoss?[outputDelta*frame.cellOutput,outputDelta]:[0,0]};
      for(const key of keys)for(let j=0;j<sizes[key];j++)gradients[key][j]+=contribution[key][j];
      frame.error=frame.hasLoss?error:0;frame.difference=frame.hasLoss?difference:null;
      frame.credit={output:frame.hasLoss?outputDelta:0,cellOutput:localOutputCredit,state:stateCredit,candidateSum:candidateCredit,inputGateSum:inputGateCredit,outputGateSum:outputGateCredit};
      frame.gradientContribution=contribution;
      // No extra recurrent candidate/gate inputs exist in this reduced graph.
      stateCredit*=frame.carryDerivative;
    }
    const eligibilityGradients={candidate:last.eligibility.candidate.map(x=>finalStateCredit*x),inputGate:last.eligibility.inputGate.map(x=>finalStateCredit*x),outputGate:gradients.outputGate.slice(),readout:gradients.readout.slice()};
    return{signal:sequence.signal,target:sequence.target,distractors:sequence.distractors?.slice()||[],frames,output:last.output,difference,error,correct:Number(last.output>=.5)===sequence.target,outputDelta,finalStateCredit,gradients,eligibilityGradients};
  }
  function batch(parameters){
    validate(parameters);const rows=cases.map(sequence=>forward(sequence,parameters)),sumGradients=zero();
    for(const row of rows)for(const key of keys)for(let j=0;j<sizes[key];j++)sumGradients[key][j]+=row.gradients[key][j];
    const gradients=Object.fromEntries(keys.map(key=>[key,sumGradients[key].map(value=>value/rows.length)])),sumError=rows.reduce((sum,row)=>sum+row.error,0);
    return{gradients,sumGradients,rows,sumError,meanError:sumError/rows.length,correct:rows.filter(row=>row.correct).length,patterns:rows.length};
  }
  function step(state,rate=1,momentum=.9){
    if(!state||!Number.isInteger(state.seed)||!Number.isInteger(state.sweep)||state.sweep<0||!finite(rate)||rate<=0||rate>10||!finite(momentum)||momentum<0||momentum>=1)throw new TypeError('Invalid learning state or settings.');
    validate(state.parameters);validate(state.velocity);const next=copy(state),gradients=batch(state.parameters).gradients;
    for(const key of keys)for(let j=0;j<sizes[key];j++){const change=-rate*gradients[key][j]+momentum*state.velocity[key][j];next.parameters[key][j]+=change;next.velocity[key][j]=change;}
    next.sweep++;return next;
  }
  function train(state,count,rate=1,momentum=.9){if(!Number.isInteger(count)||count<0||count>20000)throw new RangeError('Use0-20000 training sweeps.');let next=copy(state);for(let i=0;i<count;i++)next=step(next,rate,momentum);return next;}
  function snapshot(state){validate(state.parameters);return{seed:state.seed,sweep:state.sweep,parameters:copy(state.parameters),velocity:copy(state.velocity),...batch(state.parameters)};}
  const getDefaultSettings=()=>({seed:1,rate:1,momentum:.9,initialRange:[-.3,.3],patterns:16,distractors:3,sequenceLength:5,parameters:14,exampleSweeps:1000,criterion:'mean-of-final-half-squared-errors',candidateFunction:'4*sigmoid(a)-2',stateOutputFunction:'2*sigmoid(c)-1',gradientScope:'Exact for this external-input-only cell; Appendix A.12 eligibility equals BPTT. Not a replay of the paper experiments.',clockScope:'A separate same-step readout is used, rather than the full paper clock.',outputScope:'Only the final read has a target; earlier outputs are not constrained.'});
  window.AtlasLSTMLearning=Object.freeze({create,makeSequence,forward,batch,step,train,snapshot,flatten,fromFlat,cases,parameterInfo,getDefaultSettings});
})();
