/* Finite grid examples; not the Kiva controller or a trained DeepFleet model. */
(function(){
 'use strict';
 const width=7,height=5,baseBlocked=[[2,1],[4,1],[2,3],[4,3]];
 const presets=[{id:'cross',label:'교차로에서 만나기',agents:[{id:'A',start:[1,2],goal:[5,2]},{id:'B',start:[3,0],goal:[3,4]},{id:'C',start:[0,4],goal:[6,4]}]},{id:'swap',label:'반대 방향으로 통과하기',agents:[{id:'A',start:[2,2],goal:[3,2]},{id:'B',start:[3,2],goal:[2,2]},{id:'C',start:[0,4],goal:[6,4]}]}];
 const key=p=>p.join(','),same=(a,b)=>a[0]===b[0]&&a[1]===b[1],distance=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
 function scenario(id='cross',closed=false){const source=presets.find(p=>p.id===id);if(!source)throw new RangeError('Unknown grid scenario.');return {width,height,id,agents:source.agents.map(a=>({...a,start:[...a.start],goal:[...a.goal]})),blocked:baseBlocked.map(p=>[...p]).concat(closed?[[3,2]]:[])};}
 function neighbors(p,scene,wait=true){const blocked=new Set(scene.blocked.map(key));return [[1,0],[0,1],[-1,0],[0,-1],...(wait?[[0,0]]:[])].map(([dx,dy])=>[p[0]+dx,p[1]+dy]).filter(([x,y])=>x>=0&&x<scene.width&&y>=0&&y<scene.height&&!blocked.has(key([x,y])));}
 const at=(path,t)=>path[Math.min(t,path.length-1)];
 function findPath(agent,scene,reserved=[],horizon=40){
  if(scene.blocked.some(p=>same(p,agent.start)||same(p,agent.goal)))return null;
  const queue=[{p:agent.start,t:0,path:[agent.start]}],seen=new Set([key(agent.start)+':0']);
  while(queue.length){queue.sort((a,b)=>(a.t+distance(a.p,agent.goal))-(b.t+distance(b.p,agent.goal))||a.t-b.t);const node=queue.shift();
   if(same(node.p,agent.goal)&&reserved.every(path=>{for(let t=node.t;t<=horizon;t++)if(same(at(path,t),node.p))return false;return true;}))return node.path;
   if(node.t>=horizon)continue;
   for(const next of neighbors(node.p,scene,true)){const t=node.t+1,k=key(next)+':'+t;if(seen.has(k))continue;const conflict=reserved.some(path=>same(at(path,t),next)||(same(at(path,t-1),next)&&same(at(path,t),node.p)));if(conflict)continue;seen.add(k);queue.push({p:next,t,path:[...node.path,next]});}
  }
  return null;
 }
 function conflicts(paths){const result=[],horizon=Math.max(0,...paths.map(p=>p.length-1));for(let t=0;t<=horizon;t++)for(let i=0;i<paths.length;i++)for(let j=i+1;j<paths.length;j++){if(same(at(paths[i],t),at(paths[j],t)))result.push({t,i,j,kind:'vertex',position:at(paths[i],t)});else if(t>0&&same(at(paths[i],t-1),at(paths[j],t))&&same(at(paths[j],t-1),at(paths[i],t)))result.push({t,i,j,kind:'edge',position:at(paths[i],t)});}return result;}
 function solve({scenarioId='cross',closed=false,coordinated=true,count=3,reverse=false}={}){const scene=scenario(scenarioId,closed),agents=scene.agents.slice(0,count);if(![2,3].includes(count))throw new RangeError('Choose two or three robots.');if(reverse)agents.reverse();const paths=[];for(const a of agents){const path=findPath(a,scene,coordinated?paths:[]);if(!path)return {scene,agents,paths,complete:false,error:a.id+'의 경로를 제한 시간 안에서 찾지 못했습니다.'};paths.push(path);}const collision=conflicts(paths),moves=paths.reduce((sum,p)=>sum+p.slice(1).filter((x,i)=>!same(x,p[i])).length,0),waits=paths.reduce((sum,p)=>sum+p.slice(1).filter((x,i)=>same(x,p[i])).length,0);return {scene,agents,paths,complete:true,conflicts:collision,makespan:Math.max(...paths.map(p=>p.length-1)),moves,waits};}
 function reach(scene,origin,hops=2){const found=new Map([[key(origin),0]]),queue=[origin];while(queue.length){const p=queue.shift(),depth=found.get(key(p));if(depth>=hops)continue;for(const q of neighbors(p,scene,false))if(!found.has(key(q))){found.set(key(q),depth+1);queue.push(q);}}return [...found.keys()].map(k=>k.split(',').map(Number));}
 function edges(scene){const result=[];for(let y=0;y<height;y++)for(let x=0;x<width;x++){const p=[x,y];if(scene.blocked.some(q=>same(p,q)))continue;for(const q of neighbors(p,scene,false))if(key(p)<key(q))result.push([p,q]);}return result;}
 function nll(probability){if(!(probability>0&&probability<=1))throw new RangeError('An observed-action probability in (0,1] is required.');return -Math.log(probability);}
 function arbitrate(reverse=false){const robots=[{id:'A',position:[2,2],proposal:[3,2]},{id:'B',position:[4,2],proposal:[3,2]}];if(reverse)robots.reverse();const occupied=new Set(robots.map(r=>key(r.position))),decisions=[];for(const r of robots){occupied.delete(key(r.position));const accepted=!occupied.has(key(r.proposal));const final=accepted?r.proposal:r.position;occupied.add(key(final));decisions.push({...r,accepted,final});}return decisions;}
 const models=[
  {id:'rc',name:'RC · Robot-Centric',title:'한 로봇의 주변을 먼저 묶는다',input:'이동 로봇·주변 로봇·정점·물체의 특징',process:['특징별 임베딩','Transformer Encoder','상태·행동 이력의 Decoder Transformer'],output:'다음 행동의 분포 → 별도 환경 모형으로 상태 전이',bias:'자신을 기준으로 정규화한 국소 문맥과 공유 가중치. 주변 표현을 만든 뒤 행동 이력을 자기회귀로 읽는다.',sourcePage:12,figure:7},
  {id:'rf',name:'RF · Robot-Floor',title:'로봇 이력과 바닥 문맥이 서로 참고한다',input:'로봇 상태 토큰 + 고정·반고정 바닥 특징 토큰',process:['로봇 이력의 self-attention','바닥 문맥 cross-attention','다른 로봇 snapshot cross-attention'],output:'로봇별 다음 행동의 분포',bias:'로봇의 시간 이력과 넓은 바닥 문맥을 다른 토큰 흐름으로 표현한다. Figure 8은 decoder-only 변형이다.',sourcePage:13,figure:8},
  {id:'if',name:'IF · Image-Floor',title:'창고 전체를 여러 채널의 격자로 본다',input:'고정 지형·로봇 위치·상태를 채널로 나눈 바닥 텐서',process:['합성곱 공간 인코더','잠재 지도 이력의 Temporal Transformer','공간 디코더·위치별 head'],output:'다음 바닥 상태의 예측',bias:'공간 격자의 규칙성과 병렬 처리를 이용한다. 여기의 image는 카메라 사진이 아닌 상태를 담은 격자다.',sourcePage:15,figure:9},
  {id:'gf',name:'GF · Graph-Floor',title:'통로 연결과 시간의 연결을 보존한다',input:'바닥 정점·이동 엣지·시간 엣지를 가진 그래프',process:['노드·엣지 인코더','메시지 전달 + edge-conditioned attention','여러 예측 head'],output:'움직임·방향·상태 등 여러 예측',bias:'통로의 연결 구조를 입력과 처리에 남긴다. 가까운 이웃의 정보를 모으며 시공간 관계를 표현한다.',sourcePage:17,figure:10}
 ];
 function freeze(o){if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.values(o).forEach(freeze);Object.freeze(o);}return o;}
 window.AtlasAmazonLogisticsCore=freeze({presets,scenario,neighbors,at,same,distance,findPath,conflicts,solve,reach,edges,nll,arbitrate,models});
})();
