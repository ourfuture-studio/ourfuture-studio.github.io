/* Finite authored probabilities illustrate a design distinction, not Scientist AI training. */
(function(){
 'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),freeze=o=>{if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.values(o).forEach(freeze);Object.freeze(o);}return o;};
 const overview='https://lawzero.org/sites/default/files/publications/81/safetyargumentblogpost_2.pdf';
 const formal='https://lawzero.org/sites/default/files/publications/99/safety-honesty-disinterested-ai-predictor_4.pdf';
 const initial={evidence:'measurement',context:'routine',prior:0.2,alpha:1,feedback:false};
 const example=freeze({initial,question:'내일 전시실 조명이 꺼질까?',hypotheses:[{id:'fault',label:'회로 이상 가설',flicker:0.7,outage:0.8},{id:'normal',label:'정상 회로 가설',flicker:0.1,outage:0.05}],reportReliability:0.6,
  contexts:{routine:{label:'일반 안내 상황',release:{fault:0.10,normal:0.03},abstain:{fault:0.08,normal:0.02}},crowded:{label:'혼잡에 민감한 안내 상황',release:{fault:0.60,normal:0.08},abstain:{fault:0.08,normal:0.02}}},
  scenarios:[{id:'observed',label:'직접 측정한 깜빡임',input:initial},{id:'reported',label:'누군가 그렇게 말했다면',input:{...initial,evidence:'claim'}},{id:'no-evidence',label:'관측 기록이 없다면',input:{...initial,evidence:'none'}},{id:'consequence',label:'같은 예측 · 공개 상황 변경',input:{...initial,context:'crowded'}},{id:'feedback',label:'결과 보상을 학습에 넣으면',input:{...initial,feedback:true}}],
  source:{overview,formal,context:formal+'#page=4',prediction:formal+'#page=4',guardrail:formal+'#page=25'},
  boundary:'두 가설·확률표·보고 신뢰도·위험 사건·임계치는 직접 만든 값이다. 신경망·문장 파서·실험실·학습 보상·Scientist AI 전체나 안전 정리를 실행하지 않는다. 위험 사건은 가상 안내로 인한 전시실 혼잡으로 한정한다.'});
 function validate(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(k=>!Object.hasOwn(initial,k))||Object.keys(initial).some(k=>!Object.hasOwn(value,k)))throw TypeError('Provide the five explicit finite settings.');
  const v=clone(value);if(!['measurement','claim','none'].includes(v.evidence)||!['routine','crowded'].includes(v.context)||![0.2,0.5,0.8].includes(v.prior)||!Number.isFinite(v.alpha)||v.alpha<0||v.alpha>4||typeof v.feedback!=='boolean')throw TypeError('Invalid authored-model setting.');return v;
 }
 const logit=p=>Math.log(p/(1-p));
 function analyze(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options)||Object.keys(options).some(k=>k!=='input'))throw TypeError('Provide input only.');
  const input=validate(options.input===undefined?initial:options.input),h=example.hypotheses,prior=[input.prior,1-input.prior],r=example.reportReliability;
  const likelihood=h.map(x=>input.evidence==='none'?1:input.evidence==='measurement'?x.flicker:r*x.flicker+(1-r)*(1-x.flicker));
  const weights=likelihood.map((p,i)=>p*prior[i]),normalizer=weights.reduce((a,b)=>a+b,0),posterior=weights.map(w=>w/normalizer);
  const prediction=posterior.reduce((sum,w,i)=>sum+w*h[i].outage,0),c=example.contexts[input.context];
  const harmRelease=posterior[0]*c.release.fault+posterior[1]*c.release.normal,harmAbstain=posterior[0]*c.abstain.fault+posterior[1]*c.abstain.normal,excess=Math.max(0,logit(harmRelease)-logit(harmAbstain)),wouldRelease=excess<input.alpha;
  const status=input.feedback?'outside-design':wouldRelease?'passed-authored-gate':'withheld';
  const evidence=input.evidence==='none'?'추가 관측을 명시하지 않았다.':input.evidence==='measurement'?'직접 측정: 조명이 깜빡였다.':'발화 기록: 보고자 A가 “조명이 깜빡였다”고 말했다.';
  const result={input,evidence,prior,likelihood,weights,normalizer,posterior,prediction,harmRelease,harmAbstain,excess,wouldRelease,status,events:[]};
  const push=(kind,message,payload)=>result.events.push({index:result.events.length,kind,message,...clone(payload||{})});
  push('question','세상을 원하는 방향으로 바꾸는 선택과, 관측에서 무엇이 따라오는지 예측하는 일을 구분한다.');
  push('context','무엇을 보았고 누가 무엇을 말했는지 서로 다른 기록으로 둔다.',{evidence});
  push('hypotheses','생성기가 제안할 수 있는 두 가설을 직접 정했다. 아직 어느 쪽이 참인지 확정하지 않는다.',{prior});
  push('posterior','가설별 관측 가능성과 사전확률을 곱하고 정규화한다.',{likelihood,weights,normalizer,posterior});
  push('prediction','가설별 소등 확률을 가설의 사후확률로 평균한다.',{prediction});
  push('consequences','같은 예측을 공개할 때와 보류할 때의 가상 혼잡 확률을 각각 계산한다.',{harmRelease,harmAbstain});
  push('guardrail','공개와 보류의 위험 로그오즈 차이를 설정한 문턱과 비교한다.',{excess,wouldRelease});
  push('output',input.feedback?'결과의 좋고 나쁨을 학습 보상으로 넣는 경로는 이 원문 설계 조건 밖이다.':wouldRelease?'이 가상 확률표에서 설정한 검사 문턱을 통과했다. 실제 안전의 입증은 아니다.':'이 가상 확률표에서 설정한 문턱을 넘어 출력을 보류한다.',{status});
  return result;
 }
 function verifyRun(run){try{return{valid:same(run,analyze({input:run.input}))};}catch(_){return{valid:false};}}
 function replay(run,index=0){
  if(!Number.isInteger(index)||index<0||index>=8)throw RangeError('Select one calculated step.');if(!verifyRun(run).valid)throw TypeError('The trace no longer matches its finite calculation.');
  const state={index,event:clone(run.events[index]),complete:index===7,stage:run.events[index].kind,status:'inspecting',input:clone(run.input),evidence:null,prior:null,likelihood:null,weights:null,normalizer:null,posterior:null,prediction:null,harmRelease:null,harmAbstain:null,excess:null,wouldRelease:null};
  for(const event of run.events.slice(0,index+1))for(const[k,v]of Object.entries(event))if(!['index','kind','message'].includes(k))state[k]=clone(v);
  return state;
 }
 window.AtlasBengioScientist2026=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
