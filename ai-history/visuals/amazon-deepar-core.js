/* Transparent small calculations; this is not a trained DeepAR or an LSTM. */
(function(){
  'use strict';
  const series=Object.freeze([
    {id:'a',label:'상품 A · 긴 이력',scale:1,values:[8,9,10,12,15,13,9,8,10,11,14,16,13,10]},
    {id:'b',label:'상품 B · 큰 규모',scale:8,values:[64,80,72,96,120,112,80,72,88,96,128,120,104,80]},
    {id:'c',label:'상품 C · 짧은 이력',scale:1.5,values:[null,null,null,null,null,null,null,null,null,null,21,24,19.5,15]}
  ].map(s=>Object.freeze({...s,values:Object.freeze(s.values)})));
  const observed=Object.freeze([12,9,11,15,12,13,11]);
  const effects=Object.freeze([0,0,2,2,0,0]);
  function rng(seed){let x=seed>>>0;return()=>{x=(1664525*x+1013904223)>>>0;return(x+.5)/4294967296;};}
  function normal(random){return Math.sqrt(-2*Math.log(random()))*Math.cos(2*Math.PI*random());}
  function quantile(values,q){if(!values.length||q<0||q>1)throw new RangeError('A nonempty array and q in [0,1] are required.');const a=[...values].sort((a,b)=>a-b),i=(a.length-1)*q,j=Math.floor(i);return a[j]+(a[Math.min(j+1,a.length-1)]-a[j])*(i-j);}
  function gaussianPDF(z,mu,sigma){if(!(sigma>0))throw new RangeError('sigma must be positive.');return Math.exp(-.5*((z-mu)/sigma)**2)/(sigma*Math.sqrt(2*Math.PI));}
  function gaussianNLL(z,mu,sigma){if(!(sigma>0))throw new RangeError('sigma must be positive.');return .5*Math.log(2*Math.PI)+Math.log(sigma)+.5*((z-mu)/sigma)**2;}
  function negativeBinomial(mu,alpha,max=55){
    if(!(mu>0&&alpha>0)||!Number.isInteger(max)||max<0)throw new RangeError('Positive mean/shape and a nonnegative integer limit required.');
    const r=1/alpha,p=1/(1+alpha*mu),pmf=[p**r];
    for(let z=0;z<max;z++)pmf.push(pmf[z]*(z+r)/(z+1)*(1-p));
    return pmf;
  }
  const mean=(previous,t)=>10+.55*(previous-10)+effects[t];
  function trajectory({sigma=1.6,seed=7,mode='rollout'}={}){
    if(!(sigma>0)||!['rollout','training'].includes(mode))throw new TypeError('A positive sigma and training/rollout mode are required.');
    const random=rng(seed),rows=[];let previous=observed[0];
    for(let t=0;t<effects.length;t++){
      if(mode==='training')previous=observed[t];
      const mu=mean(previous,t),sample=mu+sigma*normal(random),actual=observed[t+1];
      rows.push({t:t+1,previous,knownFeature:effects[t],mu,sigma,sample,actual,nll:gaussianNLL(actual,mu,sigma)});
      previous=sample;
    }
    return rows;
  }
  function ensemble({sigma=1.6,seed=7,count=160}={}){
    if(!Number.isInteger(count)||count<2||count>1000)throw new RangeError('count must be 2..1000.');
    const paths=Array.from({length:count},(_,i)=>trajectory({sigma,seed:(seed+i*7919)>>>0}).map(r=>r.sample));
    const bands=effects.map((_,t)=>({t:t+1,low:quantile(paths.map(p=>p[t]),.1),median:quantile(paths.map(p=>p[t]),.5),high:quantile(paths.map(p=>p[t]),.9)}));
    const totals=paths.map(p=>p.reduce((a,b)=>a+b,0));
    return {paths,bands,total:{low:quantile(totals,.1),median:quantile(totals,.5),high:quantile(totals,.9)},sumOfMarginalHigh:bands.reduce((a,b)=>a+b.high,0)};
  }
  window.AtlasAmazonDeepARCore=Object.freeze({series,observed,effects,quantile,gaussianPDF,gaussianNLL,negativeBinomial,trajectory,ensemble,mean});
})();
