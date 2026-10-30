/** SQLD browser-only learning records. Choice IDs are stable across display order. */
export const STORAGE_KEY='ourfuture-sqld-learning-v1';
const BAD=new Set(['__proto__','prototype','constructor']);
const MAX_BYTES=2*1024*1024;
const MAX_TIMESTAMP=Date.parse('9999-12-31T23:59:59.999Z');
const clone=x=>JSON.parse(JSON.stringify(x));
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const keys=(x,expected)=>obj(x)&&Object.keys(x).length===expected.length&&Object.keys(x).every(k=>expected.includes(k));
const count=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
const date=x=>typeof x==='string'&&x.length<40&&Number.isFinite(Date.parse(x))&&Date.parse(x)<=MAX_TIMESTAMP&&new Date(x).toISOString()===x;
const empty=()=>({version:1,records:{},lastLocation:null});
const fresh=()=>({read:false,bookmark:false,choice:{attempts:0,correct:0,firstAnswerId:null,firstCorrect:null,lastAnswerId:null,lastCorrect:null,lastAt:null},recall:{checks:0,understood:0,lastUnderstood:null,lastAt:null},updatedAt:null});
function safeTree(x,depth=0){if(depth>16)throw new TypeError('가져오기 자료가 너무 깊게 중첩되었습니다.');if(!obj(x)&&!Array.isArray(x))return;for(const k of Object.keys(x)){if(BAD.has(k))throw new TypeError('허용하지 않는 자료 키가 있습니다.');safeTree(x[k],depth+1)}}
function indexCatalog(catalog){
 if(!Array.isArray(catalog))throw new TypeError('학습 목록이 필요합니다.');const map=new Map();
 for(const row of catalog){if(typeof row.code!=='string'||!row.code||BAD.has(row.code)||map.has(row.code))throw new TypeError('학습 코드가 올바르지 않습니다.');
  if(row.question){const q=row.question;const ids=q.choices?.map(c=>c.id);if(!Array.isArray(ids)||new Set(ids).size!==ids.length||!ids.every(id=>typeof id==='string'&&id&&!BAD.has(id))||!ids.includes(q.answerId))throw new TypeError(row.code+' 보기 ID를 확인하세요.');}
  map.set(row.code,row);
 }return map;
}
export function createProgressStore({catalog,storage,key=STORAGE_KEY}={}){
 const map=indexCatalog(catalog);let state=empty(),warning='',persistent=true,backing=storage;const listeners=new Set();
 const fallback=message=>{persistent=false;warning=message+' 이 화면의 기록은 메모리에만 남습니다.'};
 if(backing===undefined){try{backing=globalThis.window?.localStorage}catch{fallback('브라우저 저장소에 접근할 수 없습니다.')}}
 if(!backing||typeof backing.getItem!=='function'||typeof backing.setItem!=='function'||typeof backing.removeItem!=='function'){backing=null;fallback('사용 가능한 브라우저 저장소가 없습니다.')}
 function requireCode(code){if(!map.has(code))throw new TypeError('목록에 없는 학습 코드입니다.');return map.get(code)}
 function parse(text){
  if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>MAX_BYTES)throw new TypeError('가져오기는 2MB 이하의 학습 기록 파일이어야 합니다.');let value;try{value=JSON.parse(text)}catch{throw new TypeError('학습 기록 파일 형식을 읽을 수 없습니다.')}
  safeTree(value);if(!keys(value,['version','records','lastLocation'])||value.version!==1||!obj(value.records))throw new TypeError('지원하는 SQLD 기록 형식이 아닙니다.');
  if(Object.keys(value.records).length>map.size)throw new TypeError('학습 목록보다 기록 수가 많습니다.');
  const result=empty();
  for(const [code,r]of Object.entries(value.records)){
   const row=requireCode(code);if(!keys(r,['read','bookmark','choice','recall','updatedAt'])||typeof r.read!=='boolean'||typeof r.bookmark!=='boolean'||!date(r.updatedAt))throw new TypeError(code+' 읽음·북마크 기록을 확인하세요.');
   const c=r.choice,a=r.recall;if(!keys(c,['attempts','correct','firstAnswerId','firstCorrect','lastAnswerId','lastCorrect','lastAt'])||!count(c.attempts)||!count(c.correct)||c.correct>c.attempts)throw new TypeError(code+' 객관식 횟수가 올바르지 않습니다.');
   if(c.attempts===0){if(c.correct!==0||[c.firstAnswerId,c.firstCorrect,c.lastAnswerId,c.lastCorrect,c.lastAt].some(v=>v!==null))throw new TypeError(code+' 미응답 기록이 올바르지 않습니다.')}
   else{
    if(!row.question)throw new TypeError(code+'에는 객관식 문항이 없습니다.');const allowed=new Set(row.question.choices.map(v=>v.id));
    for(const name of ['firstAnswerId','lastAnswerId'])if(c[name]!==null&&!allowed.has(c[name]))throw new TypeError(code+' 보기 ID가 현재 문제와 다릅니다.');
    if(typeof c.firstCorrect!=='boolean'||typeof c.lastCorrect!=='boolean'||c.firstCorrect!==(c.firstAnswerId===row.question.answerId)||c.lastCorrect!==(c.lastAnswerId===row.question.answerId)||!date(c.lastAt))throw new TypeError(code+' 채점 기록이 현재 정답과 다릅니다.');
    if(c.attempts===1&&(c.firstAnswerId!==c.lastAnswerId||c.firstCorrect!==c.lastCorrect||c.correct!==Number(c.lastCorrect)))throw new TypeError(code+' 첫 풀이가 서로 다릅니다.');
    if(c.attempts>1){const ends=Number(c.firstCorrect)+Number(c.lastCorrect);if(c.correct<ends||c.correct>c.attempts-2+ends)throw new TypeError(code+' 정답 횟수와 첫·최근 풀이가 다릅니다.');}
    if(Date.parse(c.lastAt)>Date.parse(r.updatedAt))throw new TypeError(code+' 기록 날짜가 올바르지 않습니다.');
   }
   if(!keys(a,['checks','understood','lastUnderstood','lastAt'])||!count(a.checks)||!count(a.understood)||a.understood>a.checks)throw new TypeError(code+' 개념 확인 횟수가 올바르지 않습니다.');
   if(!a.checks){if(a.understood!==0||a.lastUnderstood!==null||a.lastAt!==null)throw new TypeError(code+' 미점검 상태가 올바르지 않습니다.')}
   else if(!row.recall||typeof a.lastUnderstood!=='boolean'||!date(a.lastAt)||a.understood<Number(a.lastUnderstood)||a.understood>a.checks-1+Number(a.lastUnderstood)||Date.parse(a.lastAt)>Date.parse(r.updatedAt))throw new TypeError(code+' 개념 확인 기록이 올바르지 않습니다.');
   result.records[code]=clone(r);
  }
  if(value.lastLocation!==null){if(!keys(value.lastLocation,['code','kind','at'])||!map.has(value.lastLocation.code)||!['theory','choice','recall','lab'].includes(value.lastLocation.kind)||!date(value.lastLocation.at))throw new TypeError('이어 보기 위치가 올바르지 않습니다.');const row=map.get(value.lastLocation.code);if(value.lastLocation.kind==='choice'&&!row.question||value.lastLocation.kind==='recall'&&!row.recall)throw new TypeError('이어 보기 문항이 현재 목록과 다릅니다.');result.lastLocation=clone(value.lastLocation)}
  return result;
 }
 if(backing){try{const text=backing.getItem(key);if(text!==null){try{state=parse(text)}catch(error){warning='저장된 SQLD 기록을 읽지 못해 새 화면으로 시작했습니다. 원래 기록은 별도 보관했습니다. '+error.message;try{backing.setItem(key+'-unreadable-backup',text)}catch{fallback('읽을 수 없는 원래 기록을 보관하지 못했습니다.')}}}}catch{fallback('저장된 학습 기록을 불러오지 못했습니다.')}}
 function notify(){for(const fn of listeners)fn(snapshot())}
 function save(){if(backing&&persistent)try{backing.setItem(key,JSON.stringify(state))}catch{fallback('기록 저장에 실패했습니다.')}notify()}
 function snapshot(){return {state:clone(state),warning,persistent}}
 function record(code){requireCode(code);return state.records[code]??fresh()}
 function stamp(){const times=[Date.now(),...Object.values(state.records).map(r=>Date.parse(r.updatedAt)+1),state.lastLocation?Date.parse(state.lastLocation.at)+1:0];return new Date(Math.min(MAX_TIMESTAMP,Math.max(...times))).toISOString()}
 function edit(code,fn){const r=clone(record(code)),at=stamp();fn(r,at);r.updatedAt=at;state.records[code]=r;save();return clone(r)}
 return {
  getState:()=>clone(state),getRecord:code=>clone(record(code)),getWarning:()=>warning,
  subscribe(fn){listeners.add(fn);fn(snapshot());return()=>listeners.delete(fn)},
  setRead(code,value){if(typeof value!=='boolean')throw new TypeError('읽음 값이 필요합니다.');return edit(code,r=>{r.read=value})},
  setBookmark(code,value){if(typeof value!=='boolean')throw new TypeError('북마크 값이 필요합니다.');return edit(code,r=>{r.bookmark=value})},
  recordChoice(code,answerId){const q=requireCode(code).question;if(!q||answerId!==null&&!q.choices.some(c=>c.id===answerId))throw new TypeError('현재 문제의 보기 ID가 아닙니다.');return edit(code,(r,at)=>{const c=r.choice;if(c.attempts>=1000000)throw new RangeError('이 문항의 기록 횟수 한도에 도달했습니다.');const ok=answerId===q.answerId;if(!c.attempts){c.firstAnswerId=answerId;c.firstCorrect=ok}c.attempts++;c.correct+=Number(ok);c.lastAnswerId=answerId;c.lastCorrect=ok;c.lastAt=at})},
  recordRecall(code,understood){if(!requireCode(code).recall||typeof understood!=='boolean')throw new TypeError('현재 개념 확인의 점검 값이 아닙니다.');return edit(code,(r,at)=>{if(r.recall.checks>=1000000)throw new RangeError('이 개념의 기록 횟수 한도에 도달했습니다.');r.recall.checks++;r.recall.understood+=Number(understood);r.recall.lastUnderstood=understood;r.recall.lastAt=at})},
  visit(code,kind){const row=requireCode(code);if(!['theory','choice','recall','lab'].includes(kind)||kind==='choice'&&!row.question||kind==='recall'&&!row.recall)throw new TypeError('학습 위치가 올바르지 않습니다.');state.lastLocation={code,kind,at:stamp()};save()},
  exportText:()=>JSON.stringify(state,null,2),
  importText(text){const incoming=parse(text);state=incoming;warning='';save();return clone(state)},
  reset(){state=empty();warning='';if(backing)try{backing.removeItem(key);backing.removeItem(key+'-unreadable-backup')}catch{fallback('기록 삭제를 저장하지 못했습니다.')}notify()},
  validateImport:parse,
 };
}

export function learningStats(catalog,state){
 const records=state.records;const selected=catalog.filter(x=>x.selected),questions=catalog.filter(x=>x.question);
 const read=selected.filter(x=>records[x.code]?.read).length;
 const answered=questions.filter(x=>records[x.code]?.choice.attempts>0);
 const firstCorrect=answered.filter(x=>records[x.code].choice.firstCorrect).length;
 const lastCorrect=answered.filter(x=>records[x.code].choice.lastCorrect).length;
 const wrong=answered.filter(x=>records[x.code].choice.lastCorrect===false);
 const recall=catalog.filter(x=>x.recall&&records[x.code]?.recall.lastUnderstood===false);
 const bookmarks=catalog.filter(x=>records[x.code]?.bookmark);
 return {read,selected:selected.length,answered:answered.length,questions:questions.length,firstCorrect,lastCorrect,wrong,recall,bookmarks};
}
