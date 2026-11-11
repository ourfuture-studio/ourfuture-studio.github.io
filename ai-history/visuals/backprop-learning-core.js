/* Batch learning on the 64 six-bit mirror patterns, following equations (1)-(9).
 * Initialization seed is authored here; it is not recoverable from Fig.1.
 * No published learned parameter is used to initialize this learning run. */
(function(){
  'use strict';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const sigmoid=x=>x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));
  const zero=()=>({hiddenWeights:[Array(6).fill(0),Array(6).fill(0)],hiddenBiases:[0,0],outputWeights:[0,0],outputBias:0});
  const cases=Object.freeze(Array.from({length:64},(_,n)=>Object.freeze(Array.from({length:6},(_,i)=>(n>>(5-i))&1))));
  function random(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t^=t+Math.imul(t^(t>>>7),61|t);return((t^(t>>>14))>>>0)/4294967296;};}
  function create(seed=1){
    if(!Number.isInteger(seed))throw new TypeError('Integer initialization seed required.');
    const rand=random(seed),value=()=>.6*rand()-.3;
    return{seed,sweep:0,parameters:{hiddenWeights:[Array.from({length:6},value),Array.from({length:6},value)],hiddenBiases:[value(),value()],outputWeights:[value(),value()],outputBias:value()},velocity:zero()};
  }
  function validate(p){
    const finite=x=>typeof x==='number'&&Number.isFinite(x);
    if(!p||p.hiddenWeights?.length!==2||!p.hiddenWeights.every(a=>a.length===6&&a.every(finite))||p.hiddenBiases?.length!==2||!p.hiddenBiases.every(finite)||p.outputWeights?.length!==2||!p.outputWeights.every(finite)||!finite(p.outputBias))throw new TypeError('Expected finite6-2-1 parameters.');
  }
  function forward(bits,p){
    validate(p);if(bits?.length!==6||!bits.every(x=>x===0||x===1))throw new TypeError('Six binary inputs required.');
    const target=Number(bits.every((x,i)=>x===bits[5-i]));
    const hiddenSums=p.hiddenWeights.map((a,j)=>a.reduce((s,w,i)=>s+w*bits[i],p.hiddenBiases[j]));
    const hidden=hiddenSums.map(sigmoid),outputSum=hidden.reduce((s,y,j)=>s+y*p.outputWeights[j],p.outputBias),output=sigmoid(outputSum),difference=output-target,error=.5*difference*difference;
    const outputDelta=difference*output*(1-output),hiddenDeltas=hidden.map((y,j)=>outputDelta*p.outputWeights[j]*y*(1-y));
    return{inputs:bits.slice(),target,hiddenSums,hidden,outputSum,output,difference,error,outputDelta,hiddenDeltas,gradients:{hiddenWeights:hiddenDeltas.map(d=>bits.map(x=>d*x)),hiddenBiases:hiddenDeltas.slice(),outputWeights:hidden.map(y=>outputDelta*y),outputBias:outputDelta}};
  }
  function batch(p){
    const gradients=zero(),rows=cases.map(bits=>forward(bits,p));
    for(const row of rows){const g=row.gradients;for(let j=0;j<2;j++){for(let i=0;i<6;i++)gradients.hiddenWeights[j][i]+=g.hiddenWeights[j][i];gradients.hiddenBiases[j]+=g.hiddenBiases[j];gradients.outputWeights[j]+=g.outputWeights[j];}gradients.outputBias+=g.outputBias;}
    const sumError=rows.reduce((s,r)=>s+r.error,0);
    return{gradients,rows,sumError,meanError:sumError/64,correct:rows.filter(r=>Number(r.output>=.5)===r.target).length};
  }
  function step(state,rate=.1,momentum=.9){
    if(!state||!Number.isInteger(state.sweep)||!Number.isInteger(state.seed)||!Number.isFinite(rate)||rate<=0||rate>1||!Number.isFinite(momentum)||momentum<0||momentum>=1)throw new TypeError('Invalid batch-learning state or settings.');
    validate(state.parameters);validate(state.velocity);
    const next=clone(state),g=batch(state.parameters).gradients;
    function update(key,j,i){const old=i===undefined?(j===undefined?state.parameters[key]:state.parameters[key][j]):state.parameters[key][j][i],v=i===undefined?(j===undefined?state.velocity[key]:state.velocity[key][j]):state.velocity[key][j][i],grad=i===undefined?(j===undefined?g[key]:g[key][j]):g[key][j][i];const change=-rate*grad+momentum*v;
      if(i!==undefined){next.parameters[key][j][i]=old+change;next.velocity[key][j][i]=change;}else if(j!==undefined){next.parameters[key][j]=old+change;next.velocity[key][j]=change;}else{next.parameters[key]=old+change;next.velocity[key]=change;}}
    for(let j=0;j<2;j++){for(let i=0;i<6;i++)update('hiddenWeights',j,i);update('hiddenBiases',j);update('outputWeights',j);}update('outputBias');next.sweep++;return next;
  }
  function train(state,count,rate=.1,momentum=.9){if(!Number.isInteger(count)||count<0||count>20000)throw new RangeError('Use0-20000 sweeps.');let next=clone(state);for(let i=0;i<count;i++)next=step(next,rate,momentum);return next;}
  function snapshot(state){return{seed:state.seed,sweep:state.sweep,parameters:clone(state.parameters),velocity:clone(state.velocity),...batch(state.parameters)};}
  window.AtlasBackpropLearning=Object.freeze({create,forward,batch,step,train,snapshot,cases,getDefaultSettings:()=>({rate:.1,momentum:.9,seed:1,initialRange:[-.3,.3],patterns:64,criterion:'sum-of-half-squared-errors'})});
})();
