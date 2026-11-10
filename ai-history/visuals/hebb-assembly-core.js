/* An independently constructed calculation model, not Hebb's 1949 equation.
 * Pair participation is supplied as an assumption, never inferred from coactivity.
 * The assembly uses symmetric bounded weights and synchronous threshold updates;
 * it is not a biophysical simulation or a reconstruction of a published experiment.
 */
(function(){
  'use strict';
  const labels=Object.freeze(['A','B','C','D','E']);
  const defaults=Object.freeze({initialWeight:.1,eta:.2,trainingRepetitions:3,threshold:.5,clamp:false,maxSteps:8});
  const limits=Object.freeze({weightMin:0,weightMax:1,repetitions:16,recallSteps:32});
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  const round=value=>Math.round(value*1e12)/1e12;
  function finite(value,min,max,label){if(typeof value!=='number'||!Number.isFinite(value)||value<min||value>max)throw new RangeError(label+' must be a finite number from '+min+' to '+max+'.');return value;}
  function integer(value,min,max,label){if(!Number.isInteger(value)||value<min||value>max)throw new RangeError(label+' must be an integer from '+min+' to '+max+'.');return value;}
  function binary(value){if(value===true||value===1)return 1;if(value===false||value===0)return 0;throw new TypeError('Activity values must be true/false or exact0/1.');}
  function patternCopy(value){if(!Array.isArray(value)||value.length!==labels.length)throw new TypeError('A five-unit activity pattern is required.');const copy=[];for(let i=0;i<labels.length;i++)copy.push(binary(value[i]));return copy;}
  function weightsCopy(value){
    if(!Array.isArray(value)||value.length!==labels.length)throw new TypeError('A5×5weight matrix is required.');
    const copy=[];for(let i=0;i<labels.length;i++){if(!Array.isArray(value[i])||value[i].length!==labels.length)throw new TypeError('Everyweight row must have five entries.');const row=[];for(let j=0;j<labels.length;j++)row.push(finite(value[i][j],0,1,'Weight'));copy.push(row);}
    for(let i=0;i<labels.length;i++){if(copy[i][i]!==0)throw new TypeError('Self-connection weights must remain zero.');for(let j=0;j<labels.length;j++)if(copy[i][j]!==copy[j][i])throw new TypeError('This assembly model requires symmetric weights.');}
    return copy;
  }
  function initialWeights(){return freeze(labels.map((_,i)=>labels.map((_,j)=>i===j?0:defaults.initialWeight)));}
  function pairUpdate(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Pair options are required.');
    const before=finite(options.weight,0,1,'Weight'),a=binary(options.a),b=binary(options.b),eta=finite(options.eta===undefined?.15:options.eta,0,1,'Learning increment');
    if(typeof options.participates!=='boolean')throw new TypeError('Participation must be an explicitly supplied Boolean assumption.');
    const participates=options.participates,eligible=a===1&&b===1&&participates,requestedDelta=eligible?eta:0,after=requestedDelta>0?Math.min(1,Math.max(before,round(before+requestedDelta))):before;
    const condition=eligible?'participating-coactivity':a&&b?'coactive-participation-not-specified':'not-coactive';
    return freeze({before,after,delta:round(after-before),requestedDelta,a,b,participates,eligible,condition,clipped:before+requestedDelta>1});
  }
  function train(weights,pattern,options={}){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Training options must be an object.');
    const before=weightsCopy(weights),activity=patternCopy(pattern),eta=finite(options.eta===undefined?defaults.eta:options.eta,0,1,'Learning increment'),repetitions=integer(options.repetitions===undefined?1:options.repetitions,0,limits.repetitions,'Training repetitions');
    let current=before.map(row=>row.slice());const history=[];
    for(let exposure=1;exposure<=repetitions;exposure++){
      const previous=current.map(row=>row.slice()),updates=[];
      for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const increment=eta*activity[i]*activity[j],weight=increment>0?Math.min(1,Math.max(previous[i][j],round(previous[i][j]+increment))):previous[i][j];current[i][j]=current[j][i]=weight;updates.push({from:i,to:j,fromLabel:labels[i],toLabel:labels[j],before:previous[i][j],after:weight,delta:round(weight-previous[i][j])});}
      history.push({exposure,before:previous,after:current.map(row=>row.slice()),updates});
    }
    const updates=[];for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++)updates.push({from:i,to:j,fromLabel:labels[i],toLabel:labels[j],before:before[i][j],after:current[i][j],delta:round(current[i][j]-before[i][j])});
    return freeze({before,after:current,pattern:activity,eta,repetitions,updates,history,formula:'Δwᵢⱼ = η xᵢ xⱼ; bounded at1; wᵢᵢ =0',scope:'Constructed symmetric coactivity model. The equation and parameter values are not quoted from Hebb1949.'});
  }
  function recall(weights,cue,options={}){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Recall options must be an object.');
    const matrix=weightsCopy(weights),initial=patternCopy(cue),threshold=finite(options.threshold===undefined?defaults.threshold:options.threshold,Number.EPSILON,4,'Threshold'),clamp=options.clamp===undefined?defaults.clamp:options.clamp,maxSteps=integer(options.maxSteps===undefined?defaults.maxSteps:options.maxSteps,0,limits.recallSteps,'Recall step bound');
    if(typeof clamp!=='boolean')throw new TypeError('Clamp must be a Boolean.');
    let state=initial.slice(),status='step-limit',cycleStart=null,cycleLength=null;const steps=[],seen=new Map([[state.join(''),0]]);
    for(let index=1;index<=maxSteps;index++){
      const before=state.slice(),inputs=matrix.map(row=>round(row.reduce((sum,weight,j)=>sum+weight*before[j],0))),after=inputs.map((input,i)=>clamp&&initial[i]===1?1:Number(input>=threshold)),changedIndices=after.flatMap((value,i)=>value===before[i]?[]:[i]);
      steps.push({index,before,inputs,after:after.slice(),clampedIndices:clamp?initial.flatMap((value,i)=>value?[i]:[]):[],changedIndices});state=after;
      if(changedIndices.length===0){status='stable';break;}
      const key=after.join('');if(seen.has(key)){status='cycle';cycleStart=seen.get(key);cycleLength=index-cycleStart;break;}seen.set(key,index);
    }
    return freeze({weights:matrix,cue:initial.slice(),initial,threshold,clamp,maxSteps,steps,state,status,cycleStart,cycleLength,scope:clamp?'Positive cue units are held externally throughout the trace.':'The cue is only the initial activity; no external unit is held active after it.'});
  }
  const pairPresets=freeze([
    {id:'participating',label:'A가 B의 발화에 참여한 반복',a:1,b:1,participates:true},
    {id:'a-only',label:'A만 활성',a:1,b:0,participates:false},
    {id:'b-only',label:'B만 활성',a:0,b:1,participates:false},
    {id:'coactive-only',label:'공동활동만 주어지고 참여는 정하지 않음',a:1,b:1,participates:false}
  ]);
  window.AtlasHebbAssembly=freeze({labels,defaults,limits,pairPresets,pairUpdate,initialWeights,train,recall});
})();
