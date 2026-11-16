/* A specified two-action special case of Williams' stochastic-unit update.
 * Exact expectations enumerate both actions; no environment or policy is sampled. */
(function(){
 'use strict';
 const presets=Object.freeze({
  'better-b':Object.freeze({id:'better-b',label:'A도 양수 보상, B는 더 큰 보상',rewards:Object.freeze([1,3])}),
  'better-a':Object.freeze({id:'better-a',label:'보상이 더 큰 쪽을 A로 바꾸기',rewards:Object.freeze([3,1])}),
  equal:Object.freeze({id:'equal',label:'두 행동의 보상이 같은 경우',rewards:Object.freeze([2,2])})
 });
 const rates=Object.freeze([.1,.3,.6]),starts=Object.freeze([.2,.5,.8]),maxSteps=12;
 function sigmoid(theta){if(!Number.isFinite(theta))throw TypeError('A finite logit is required.');if(theta>=0)return 1/(1+Math.exp(-theta));const e=Math.exp(theta);return e/(1+e);}
 function logit(p){if(!Number.isFinite(p)||p<=0||p>=1)throw TypeError('The initial probability must be between zero and one.');return Math.log(p/(1-p));}
 function validateRewards(rewards){if(!Array.isArray(rewards)||rewards.length!==2||!rewards.every(Number.isFinite))throw TypeError('Two finite rewards are required.');}
 function expectedReturn(theta,rewards){validateRewards(rewards);const p=sigmoid(theta);return(1-p)*rewards[0]+p*rewards[1];}
 function expectedGradient(theta,rewards){validateRewards(rewards);const p=sigmoid(theta);return p*(1-p)*(rewards[1]-rewards[0]);}
 function baselineValue(theta,rewards,mode){if(!['zero','mean'].includes(mode))throw TypeError('Unknown baseline.');return mode==='zero'?0:expectedReturn(theta,rewards);}
 function outcome({theta,rewards,baseline='mean',action}){
  validateRewards(rewards);if(action!==0&&action!==1)throw TypeError('Action must be zero or one.');
  const p=sigmoid(theta),b=baselineValue(theta,rewards,baseline),reward=rewards[action],advantage=reward-b,score=action-p;
  return Object.freeze({action,probability:action===1?p:1-p,reward,baseline:b,advantage,score,gradient:advantage*score});
 }
 function analyze({theta,rewards,baseline='mean'}){
  const outcomes=[0,1].map(action=>outcome({theta,rewards,baseline,action})),mean=outcomes.reduce((s,o)=>s+o.probability*o.gradient,0),variance=outcomes.reduce((s,o)=>s+o.probability*(o.gradient-mean)**2,0);
  return Object.freeze({theta,p:sigmoid(theta),expectedReward:expectedReturn(theta,rewards),expectedGradient:expectedGradient(theta,rewards),mean,variance,baseline:baselineValue(theta,rewards,baseline),outcomes:Object.freeze(outcomes)});
 }
 function step({theta,rewards,baseline='mean',action,rate=.1}){
  if(!rates.includes(rate))throw TypeError('Choose a displayed learning rate.');const result=outcome({theta,rewards,baseline,action}),delta=rate*result.gradient,thetaAfter=theta+delta;
  if(!Number.isFinite(thetaAfter))throw TypeError('The update must remain finite.');
  return Object.freeze({...result,rate,delta,thetaBefore:theta,thetaAfter,pBefore:sigmoid(theta),pAfter:sigmoid(thetaAfter),expectedRewardBefore:expectedReturn(theta,rewards),expectedRewardAfter:expectedReturn(thetaAfter,rewards)});
 }
 window.AtlasReinforceCore=Object.freeze({presets,rates,starts,maxSteps,sigmoid,logit,expectedReturn,expectedGradient,baselineValue,outcome,analyze,step});
})();
