import {grade} from './bank.mjs';
export const STORAGE_KEY='ourfuture-ip27-learning-v1';
const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
const id=x=>typeof x==='string'&&/^[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(x)&&!['constructor','__proto__','prototype'].includes(x);
const stamp=x=>typeof x==='string'&&x.length<40&&Number.isFinite(Date.parse(x));
const empty=()=>({version:1,topics:{},answers:{},lastLocation:null});
const clone=x=>JSON.parse(JSON.stringify(x));
function unsafe(x,depth=0){if(depth>15)throw Error('자료 구조가 너무 깊습니다.');if(!x||typeof x!=='object')return;for(const [k,v]of Object.entries(x)){if(['__proto__','prototype','constructor'].includes(k))throw Error('허용하지 않는 키입니다.');unsafe(v,depth+1)}}
export function parseProgress(text){
 if(typeof text!=='string'||new TextEncoder().encode(text).length>2*1024*1024)throw Error('진도 파일은2MB 이하여야 합니다.');
 let d;try{d=JSON.parse(text)}catch{throw Error('JSON 파일을 읽을 수 없습니다.')}unsafe(d);
 if(!object(d)||d.version!==1||!object(d.topics)||!object(d.answers)||Object.keys(d).some(x=>!['version','topics','answers','lastLocation'].includes(x)))throw Error('정처기 공부방 진도 형식(version1)이 아닙니다.');
 for(const [k,v]of Object.entries(d.topics))if(!id(k)||!object(v)||typeof v.read!=='boolean'||typeof v.bookmark!=='boolean'||!stamp(v.updatedAt)||Object.keys(v).some(x=>!['read','bookmark','updatedAt'].includes(x)))throw Error('이론 기록 형식을 확인하세요.');
 for(const [k,v]of Object.entries(d.answers)){
  if(!id(k)||!object(v)||!object(v.revisions)||Object.keys(v).some(x=>x!=='revisions'))throw Error('문제 기록 형식을 확인하세요.');
  for(const [rev,r]of Object.entries(v.revisions)){
   if(!/^[1-9][0-9]{0,8}$/.test(rev)||!object(r)||!Number.isSafeInteger(r.attempts)||r.attempts<1||!Number.isSafeInteger(r.correctCount)||r.correctCount<0||r.correctCount>r.attempts||typeof r.lastCorrect!=='boolean'||!stamp(r.updatedAt)||Object.keys(r).some(x=>!['attempts','correctCount','lastAnswer','lastCorrect','updatedAt'].includes(x)))throw Error('문제 개정 기록을 확인하세요.');
   const a=r.lastAnswer;if(!(typeof a==='string'&&a.length<=2000||typeof a==='number'&&Number.isFinite(a)||Array.isArray(a)&&a.length<=30&&a.every(x=>typeof x==='string'&&x.length<=100)))throw Error('답안 기록을 확인하세요.');
  }
 }
 if(d.lastLocation!==null&&(!object(d.lastLocation)||typeof d.lastLocation.path!=='string'||!/^(?:index|study|practice|lab|experiments|review)\.html(?:\?[^#\s]{0,200})?$|^theory\/[A-Za-z0-9._-]+\.html$/.test(d.lastLocation.path)||!stamp(d.lastLocation.updatedAt)))throw Error('이어서 볼 위치를 확인하세요.');
 return clone(d);
}
export function createStore({storage,key=STORAGE_KEY,now=()=>new Date().toISOString()}={}){
 let backing=storage,originalStorage=storage,state=empty(),warning='';
 try{if(backing===undefined)backing=globalThis.window?.localStorage;originalStorage=backing;if(backing?.getItem(key))state=parseProgress(backing.getItem(key))}catch{warning='저장된 기록을 읽지 못했습니다. 기존 자료를 덮어쓰지 않고 이번 화면에서만 진행합니다.';backing=null}
 function save(){if(!backing){warning||='이 환경에서는 기록을 화면 안에서만 유지합니다.';return}try{backing.setItem(key,JSON.stringify(state))}catch{warning='기록을 저장할 공간이 부족합니다. 진도를 내보내 보관하세요.'}}
 return {
  snapshot:()=>clone(state),warning:()=>warning,
  topic(topicId){return state.topics[topicId]??{read:false,bookmark:false}},
  toggle(topicId,field){if(!id(topicId)||!['read','bookmark'].includes(field))throw Error('이론 기록 요청이 잘못됐습니다.');const v=state.topics[topicId]??{read:false,bookmark:false};state.topics[topicId]={...v,[field]:!v[field],updatedAt:now()};save()},
  record(q,answer){const correct=grade(q,answer);const parent=state.answers[q.id]??{revisions:{}};const old=parent.revisions[String(q.revision)]??{attempts:0,correctCount:0};parent.revisions[String(q.revision)]={attempts:old.attempts+1,correctCount:old.correctCount+Number(correct),lastAnswer:clone(answer),lastCorrect:correct,updatedAt:now()};state.answers[q.id]=parent;save();return correct},
  question(q){return clone(state.answers[q.id]?.revisions[String(q.revision)]??null)},
  previous(q){return Object.keys(state.answers[q.id]?.revisions??{}).some(r=>r!==String(q.revision))},
  location(path){if(typeof path!=='string')return;const test={...empty(),lastLocation:{path,updatedAt:now()}};parseProgress(JSON.stringify(test));state.lastLocation=test.lastLocation;save()},
  export:()=>JSON.stringify(state,null,2),
  import(text){const d=parseProgress(text);for(const [k,v]of Object.entries(d.topics))if(!state.topics[k]||Date.parse(v.updatedAt)>Date.parse(state.topics[k].updatedAt))state.topics[k]=v;for(const [k,v]of Object.entries(d.answers)){state.answers[k]??={revisions:{}};for(const [rev,r]of Object.entries(v.revisions))if(!state.answers[k].revisions[rev]||Date.parse(r.updatedAt)>Date.parse(state.answers[k].revisions[rev].updatedAt))state.answers[k].revisions[rev]=r}if(d.lastLocation&&(!state.lastLocation||Date.parse(d.lastLocation.updatedAt)>Date.parse(state.lastLocation.updatedAt)))state.lastLocation=d.lastLocation;save()},
  clear(){state=empty();backing=originalStorage;warning='';save()}
 };
}
