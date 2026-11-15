/* Authored spatial-context arithmetic. No learned world model, API or reconstruction runs. */
(function(){
 'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const surfaces=[{id:'front',label:'앞쪽 가림판',min:-.8,max:.8,z:3},{id:'left-mark',label:'뒤쪽 왼 표식',min:-.85,max:-.25,z:6},{id:'right-mark',label:'뒤쪽 오른 표식',min:.25,max:.85,z:6}];
 const worlds=[{id:'gold-teal',label:'왼쪽 금색 · 오른쪽 청록',colors:{front:'slate','left-mark':'gold','right-mark':'teal'}},{id:'gold-rose',label:'왼쪽 금색 · 오른쪽 분홍',colors:{front:'slate','left-mark':'gold','right-mark':'rose'}},{id:'navy-teal',label:'왼쪽 남색 · 오른쪽 청록',colors:{front:'slate','left-mark':'navy','right-mark':'teal'}},{id:'navy-rose',label:'왼쪽 남색 · 오른쪽 분홍',colors:{front:'slate','left-mark':'navy','right-mark':'rose'}}];
 const cameras=[{id:'front',label:'정면 카메라',x:0},{id:'left',label:'왼쪽 카메라',x:-1.8},{id:'right',label:'오른쪽 카메라',x:1.8}];
 const initial={references:1,context:'shared',camera:'left',hypothesis:'gold-teal'};
 function render(worldId,cameraId){
  const world=worlds.find(w=>w.id===worldId),camera=cameras.find(c=>c.id===cameraId);if(!world||!camera)throw new RangeError('Choose one of the four authored scenes and three cameras.');
  const pixels=[];
  for(let u=-10;u<=10;u++){
   const hits=surfaces.filter(p=>{const x=camera.x+u*p.z/12;return x>=p.min-1e-10&&x<=p.max+1e-10;}).sort((a,b)=>a.z-b.z);
   pixels.push({u,surfaceId:hits[0]?.id||null,color:hits.length?world.colors[hits[0].id]:'background',depth:hits[0]?.z||null,occluded:hits.slice(1).map(p=>p.id)});
  }
  return{cameraId,worldId,pixels};
 }
 const observations=cameras.map(c=>({id:'ref-'+c.id,cameraId:c.id,label:c.label+'의 가상 관측',pixels:render('gold-teal',c.id).pixels.map(p=>({u:p.u,color:p.color,surfaceId:p.surfaceId}))}));
 const example=freeze({surfaces,worlds,cameras,observations,initial,focalLength:12,pixelRange:[-10,10],source:{architecture:'https://worldlabs.ai/blog/atlas',release:'https://worldlabs.ai/atlas',realtime:'https://worldlabs.ai/blog/atlas-realtime'},scope:'같은 고정 배치에서 가림판 뒤 두 표식의 색만 다른 네 가설을 비교한다. 장면 좌표와 카메라는 직접 정한 값이고, 관측 영상은 그 가상 장면에서 계산했다. 실제 Atlas·확산·학습·깊이 추정·3D 재구성이나 API를 실행하지 않는다.'});
 function validate(options){
  if(options===undefined)return clone(initial);if(!options||typeof options!=='object'||Array.isArray(options)||Reflect.ownKeys(options).some(k=>typeof k!=='string'||!Object.hasOwn(initial,k)))throw new TypeError('Provide only the four authored spatial-context settings.');
  const o={...initial,...options};if(![1,2,3].includes(o.references)||!['shared','latest'].includes(o.context)||!cameras.some(c=>c.id===o.camera)||!worlds.some(w=>w.id===o.hypothesis))throw new RangeError('Choose bounded reference, context, camera and scene options.');return o;
 }
 function compare(worldId,refs){
  return refs.map(ref=>{const predicted=render(worldId,ref.cameraId).pixels;const mismatches=ref.pixels.filter((p,i)=>p.color!==predicted[i].color).map(p=>p.u);return{referenceId:ref.id,matches:21-mismatches.length,total:21,mismatches};});
 }
 function analyze(options){
  const input=validate(options),selected=observations.slice(0,input.references),effective=input.context==='shared'?selected:selected.slice(-1),active=new Set(effective.map(r=>r.id));
  const compatibility=worlds.map(w=>{const checks=compare(w.id,effective);return{id:w.id,label:w.label,compatible:checks.every(c=>!c.mismatches.length),checks};});
  const compatible=compatibility.filter(c=>c.compatible).map(c=>c.id),observedIds=[...new Set(effective.flatMap(r=>r.pixels.map(p=>p.surfaceId).filter(Boolean)))].sort();
  const target=render(input.hypothesis,input.camera),alternatives=compatible.map(w=>render(w,input.camera));
  const pixels=target.pixels.map((p,i)=>({...p,observed:observedIds.includes(p.surfaceId),alternativeColors:[...new Set(alternatives.map(v=>v.pixels[i].color))],ambiguous:new Set(alternatives.map(v=>v.pixels[i].color)).size>1}));
  const status=compatible.includes(input.hypothesis)?'agrees-with-inputs':'conflicts-with-inputs',events=[],push=e=>events.push({index:events.length,...clone(e)});
  push({kind:'goal',message:'같은 공간의 다른 관측을 모으면, 아직 보지 못한 부분에 대한 가설이 어떻게 줄어들까?'});
  const read=[];
  for(const ref of selected){if(active.has(ref.id))read.push(ref);push({kind:'reference',referenceId:ref.id,used:active.has(ref.id),activeIds:read.map(r=>r.id),compatibleIds:worlds.filter(w=>compare(w.id,read).every(c=>!c.mismatches.length)).map(w=>w.id),observedIds:[...new Set(read.flatMap(r=>r.pixels.map(p=>p.surfaceId).filter(Boolean)))].sort(),message:active.has(ref.id)?ref.label+'을 공간 문맥에 남긴다.':ref.label+'은 최근 한 장만 남기는 조건에서 제외한다.'});}
  push({kind:'projection',target, message:'카메라 위치와 직접 준 깊이로 광선을 계산한다. 같은 가림판과 표식을 다시 조회한다.'});
  push({kind:'occlusion',pixels,message:'각 광선에서 가장 가까운 면을 선택한다. 뒤쪽 표식은 정면에서 가려져 있었다.'});
  push({kind:'comparison',compatibility,compatibleIds:compatible,observedIds,message:'표시한 관측의 색과 다른 가설을 구분한다. 보이지 않은 표식에 대한 선택은 관측 근거와 같지 않다.'});
  push({kind:'conclusion',status,message:status==='agrees-with-inputs'?'선택한 가설은 입력 관측과 맞는다. 남은 가설 수는 이 네 가지 비교 범위의 값이다.':'선택한 가설은 입력 관측의 일부와 다르다. 새 관측을 무시한 상상을 재구성의 증거로 쓰지 않는다.'});
  return{input,selected:clone(selected),effective:clone(effective),compatibility,compatibleIds:compatible,observedIds,target,pixels,status,events,scope:example.scope};
 }
 function verifyRun(run){try{return{valid:same(run,analyze(run.input))};}catch(_){return{valid:false};}}
 function replay(run,index=0){
  if(!verifyRun(run).valid)throw new TypeError('Only an unchanged verified context calculation can be replayed.');if(!Number.isInteger(index)||index<0||index>=run.events.length)throw new RangeError('Choose an available context step.');
  const s={index,event:clone(run.events[index]),complete:index===run.events.length-1,activeIds:[],compatibleIds:worlds.map(w=>w.id),observedIds:[],target:null,pixels:[],compatibility:[],status:'inspecting'};
  for(const e of run.events.slice(0,index+1)){if(e.kind==='reference'){s.activeIds=clone(e.activeIds);s.compatibleIds=clone(e.compatibleIds);s.observedIds=clone(e.observedIds);}if(e.kind==='projection')s.target=clone(e.target);if(e.kind==='occlusion')s.pixels=clone(e.pixels);if(e.kind==='comparison'){s.compatibility=clone(e.compatibility);s.compatibleIds=clone(e.compatibleIds);s.observedIds=clone(e.observedIds);}if(e.kind==='conclusion')s.status=e.status;}
  return s;
 }
 window.AtlasFeiAtlas2026=freeze({getExample:()=>clone(example),render,analyze,replay,verifyRun});
})();
