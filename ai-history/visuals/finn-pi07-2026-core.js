/* Conditional grouping of authored demonstrations; no trained VLA is run. */
(function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const initial={goal:'left',speed:'steady',quality:'high',subgoal:true,speedTag:true,qualityTag:true,robotData:true,autonomousData:true};
 const demos=[];
 for(const goal of ['left','right'])for(const speed of ['steady','fast'])for(const quality of ['high','low']){const x=goal==='left'?-1.5:1.5,id=[goal,speed,quality].join('-'),source=quality==='high'?'robot':'autonomous',path=[[0,0],[0,.6],[x/2,.8],[x,.6],[x+(quality==='high'?0:.35),quality==='high'?0:.1]];demos.push({id,goal,speed,quality,source,duration:speed==='steady'?6:3,path});}
 const example={initial,demos,inputs:[{id:'subgoal',label:'목표 장면의 위치 조건 사용'},{id:'speedTag',label:'수행 속도 조건 사용'},{id:'qualityTag',label:'수행 품질 조건 사용'},{id:'robotData',label:'직접 만든 로봇 시범 네 개 사용'},{id:'autonomousData',label:'직접 만든 자율 실행 기록 네 개 사용'}],scenarios:[{id:'conditioned',label:'무엇을·어떻게 할지 함께',input:initial},{id:'ambiguous',label:'목표 장면의 조건을 빼면',input:{...initial,subgoal:false}},{id:'mixed-quality',label:'품질이 다른 경험을 구분하지 않으면',input:{...initial,qualityTag:false}},{id:'no-record',label:'요청한 품질의 기록이 없다면',input:{...initial,robotData:false}},{id:'other-goal',label:'다른 목표 장면으로',input:{...initial,goal:'right'}}],source:'https://www.pi.website/download/pi07.pdf#page=4',scope:'직접 만든 여덟 기록을 조건으로 구분하고 좌표의 산술 평균을 구한다. π0.7의 연결값·정책 분포·학습·로봇 제어·성공률을 재현하지 않는다.'};
 function validate(input){if(!input||Object.keys(input).sort().join('|')!==Object.keys(initial).sort().join('|')||!['left','right'].includes(input.goal)||!['steady','fast'].includes(input.speed)||!['high','low'].includes(input.quality)||['subgoal','speedTag','qualityTag','robotData','autonomousData'].some(k=>typeof input[k]!=='boolean'))throw new TypeError('Use the fixed demonstration conditions.');return clone(input);}
 function analyze({input=initial}={}){
  input=validate(input);let rows=demos.slice();const events=[];const push=(kind,message,detail={})=>events.push({index:events.length,kind,message,...clone(detail)});
  push('question','같은 “컵을 놓아”라는 말도 목표 위치와 수행 방식은 다를 수 있다.');
  rows=rows.filter(d=>d.source==='robot'?input.robotData:input.autonomousData);push('sources','사용할 경험의 기록을 모은다.',{ids:rows.map(d=>d.id)});
  for(const [key,enabled,label]of [['goal','subgoal','목표 장면'],['speed','speedTag','수행 속도'],['quality','qualityTag','수행 품질']]){if(input[enabled])rows=rows.filter(d=>d[key]===input[key]);push(key,input[enabled]?label+' 조건을 만족하는 기록을 구분한다.':label+' 조건을 주지 않아 서로 다른 기록을 함께 남긴다.',{ids:rows.map(d=>d.id),enabled:input[enabled],value:input[key]});}
  const meanPath=rows.length?demos[0].path.map((_,i)=>[0,1].map(j=>rows.reduce((n,d)=>n+d.path[i][j],0)/rows.length)):null;
  const status=rows.length===0?'no-record':rows.length===1?'distinguished':'multiple-records';
  push('compare','남은 기록의 차이를 비교한다. 평균 좌표는 학습된 로봇의 예측이 아니다.',{ids:rows.map(d=>d.id),meanPath,status});
  push('action',rows.length?'남은 시범의 행동 묶음을 살핀다.':'이 조건의 시범 기록이 없어 행동 예시를 만들지 않는다.',{ids:rows.map(d=>d.id),meanPath,status});
  return{input,events,ids:rows.map(d=>d.id),meanPath,status,scope:example.scope};
 }
 function verifyRun(run){try{return{valid:same(run,analyze({input:run.input}))};}catch(_){return{valid:false};}}
 function replay(run,index=0){if(!verifyRun(run).valid||!Number.isInteger(index)||index<0||index>=run.events.length)throw new RangeError('Choose an unchanged calculated step.');let ids=[],meanPath=null,status='inspecting';for(const e of run.events.slice(0,index+1)){if(e.ids)ids=e.ids.slice();if(e.meanPath!==undefined)meanPath=clone(e.meanPath);if(e.status)status=e.status;}return{index,event:clone(run.events[index]),complete:index===run.events.length-1,ids,meanPath,status,rows:demos.filter(d=>ids.includes(d.id)).map(clone)};}
 window.AtlasFinnPi07=Object.freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
