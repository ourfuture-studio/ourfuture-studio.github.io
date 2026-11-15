/* Gruber1993 AUTHOR necessary conditions and bounded target-feature inspection.
 * This computes a small reconstructed fragment, not an Ontolingua/OWL runtime. */
(function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 const url='https://tomgruber.org/writing/ontolingua-kaj-1993.pdf';
 const axioms=[
  {id:'person',label:'AUTHOR라면 Person이다',formula:'(subclass-of author person)',meaning:'AUTHOR(a) → Person(a)'},
  {id:'name-cardinality',label:'AUTHOR.NAME 값은 정확히 하나다',formula:'(slot-value-cardinality author author.name 1)',meaning:'AUTHOR(a) → |AUTHOR.NAME(a)| = 1'},
  {id:'name-type',label:'이름값은 biblio-name에 속한다',formula:'(slot-value-type author author.name biblio-name)',meaning:'AUTHOR(a) ∧ AUTHOR.NAME(a,n) → BIBLIO-NAME(n)'},
  {id:'document-minimum',label:'AUTHOR.DOCUMENTS 값은 하나 이상이다',formula:'(minimum-slot-cardinality author author.documents 1)',meaning:'AUTHOR(a) → |AUTHOR.DOCUMENTS(a)| ≥ 1'},
  {id:'same-name-values',label:'두 이름 관계의 값은 같다',formula:'(same-slot-values author author.name person.name)',meaning:'AUTHOR(a) → [AUTHOR.NAME(a,n) ↔ PERSON.NAME(a,n)]'}
 ];
 const initial={author:true,person:false,authorName:true,personName:false,secondAuthorName:false,differentNames:false,notBiblioName:false,document:true};
 const example=freeze({id:'gruber-author',definition:'necessary-only',axioms,initial,
  inputs:[{id:'author',label:'a를 AUTHOR로 명시'},{id:'person',label:'a를 Person으로 명시'},{id:'authorName',label:'AUTHOR.NAME(a,n1)을 명시'},{id:'personName',label:'PERSON.NAME(a,n1)을 명시'},{id:'secondAuthorName',label:'AUTHOR.NAME(a,n2)도 명시'},{id:'differentNames',label:'n1과 n2가 서로 다르다고 명시'},{id:'notBiblioName',label:'n1은 biblio-name이 아니라고 명시'},{id:'document',label:'AUTHOR.DOCUMENTS(a,d1)을 명시'}],
  targets:[{id:'loom',label:'원문의 Loom 예시',supports:axioms.map(a=>a.id),source:url+'#page=14',note:'원문의 :primitive는 충분조건 정의로 뒤집지 않는다. :the, :at-least, :same-as를 포함한다.'},{id:'kee',label:'원문의 KEE 프레임 예시',supports:axioms.filter(a=>a.id!=='same-name-values').map(a=>a.id),source:url+'#page=15',note:'이름 값의 일치는 KEE 선언만으로 표현하지 못한다. 본문은 attached procedure의 필요를 설명하지만 그 코드나 실행은 인쇄하지 않는다.'}],
  mappings:{loom:{person:':primitive person','name-cardinality':':the author.name biblio-name','name-type':':the author.name biblio-name','document-minimum':':at-least 1 author.documents','same-name-values':':same-as author.name person.name'},kee:{person:'Superclasses PERSON','name-cardinality':'AUTHOR.NAME · Min.Cardinality 1 / Max.Cardinality 1','name-type':'AUTHOR.NAME · ValueClass BIBLIO-NAME','document-minimum':'AUTHOR.DOCUMENTS · Min.Cardinality 1','same-name-values':'선언으로 미표현 · attached procedure 필요'}},
  scenarios:[{id:'shared-name',label:'이름 관계를 공유하기',input:initial},{id:'only-conditions',label:'조건만 있어도 AUTHOR일까?',input:{...initial,author:false,person:true,personName:true}},{id:'missing-values',label:'이름·문서 값이 미기록',input:{...initial,authorName:false,document:false}},{id:'two-symbols',label:'두 이름 기호 · 다름은 미명시',input:{...initial,secondAuthorName:true}},{id:'different-values',label:'서로 다른 두 이름값',input:{...initial,secondAuthorName:true,differentNames:true}}],
  source:{definition:url+'#page=12',canonical:url+'#page=19',query:url+'#page=13'},
  queryIllustration:{query:'(ask ?x (author.documents ?x society-of-mind))',possibleAnswer:'author-423455',boundary:'원문은 might return이라고 제시한 예시다. 실제 데이터베이스 질의 로그나 Ontolingua 자체의 질의 실행 결과가 아니다.'},
  scope:'Published AUTHOR necessary conditions and translated feature examples, with hypothetical finite assertions. Positive records and explicit AUTHOR commitments only; no general negative consequence, contraposition, refutation or consistency decision. No native Ontolingua/Loom/KEE runtime, full KIF translation, or general OWL reasoning. KEE is not asserted to have been an implemented translator.'
 });
 const allFeatures=axioms.map(a=>a.id);
 function solve(input,features){const use=id=>features.includes(id),authorNames=new Set(),personNames=new Set(),events=[],parent=new Map([['n1','n1'],['n2','n2']]);let person=input.person;const biblio=new Set(),obligations=[];
  if(input.authorName)authorNames.add('n1');if(input.secondAuthorName)authorNames.add('n2');if(input.personName)personNames.add('n1');
  const find=x=>parent.get(x)===x?x:find(parent.get(x)),join=(a,b)=>{a=find(a);b=find(b);if(a!==b)parent.set(b,a);};
  const asserted=[];if(input.author)asserted.push('AUTHOR(a)');if(input.person)asserted.push('Person(a)');for(const n of authorNames)asserted.push('AUTHOR.NAME(a,'+n+')');for(const n of personNames)asserted.push('PERSON.NAME(a,'+n+')');if(input.document)asserted.push('AUTHOR.DOCUMENTS(a,d1)');if(input.differentNames)asserted.push('n1 ≠ n2');if(input.notBiblioName)asserted.push('¬BIBLIO-NAME(n1)');
  const snapshot=()=>({author:input.author,person,authorNames:[...authorNames],personNames:[...personNames],biblioNames:[...biblio],sameNames:find('n1')===find('n2'),documentKnown:input.document,obligations:clone(obligations)});
  const push=(kind,axiomId,message)=>events.push({kind,axiomId:axiomId||null,message,state:snapshot()});
  push('facts',null,'명시한 사실에서 출발한다. 체크하지 않은 항목은 사실이 없다는 뜻이다.');
  if(input.author){
   if(use('person')){person=true;push('commitment','person','AUTHOR라는 명시에서 Person이라는 필요조건을 얻는다.');}
   if(use('same-name-values')){const both=[...new Set([...authorNames,...personNames])];both.forEach(n=>{authorNames.add(n);personNames.add(n);});push('commitment','same-name-values','AUTHOR에 대해 두 이름 관계의 값을 함께 사용한다. 한쪽의 명시 값을 다른 쪽 관계에도 전달한다.');}
   if(use('name-cardinality')){const names=[...authorNames];for(const n of names.slice(1))join(names[0],n);obligations.push({id:'name-exists',minimum:1,maximum:1,knownValues:names,distinctKnownCount:new Set(names.map(find)).size,unresolved:names.length===0});push('commitment','name-cardinality',names.length>1?'이름값은 하나여야 한다. 두 기호가 같은 값을 가리키는 동일성 요구를 얻는다.':'이름값은 정확히 하나여야 한다. 실제 값이 미기록이어도 존재 요구는 사라지지 않는다.');}
   if(use('name-type')){authorNames.forEach(n=>biblio.add(n));push('commitment','name-type','AUTHOR.NAME으로 연결된 값의 biblio-name 유형을 얻는다. 문서값에 별도 유형 제약을 추가하지 않는다.');}
   if(use('document-minimum')){obligations.push({id:'document-exists',minimum:1,knownValues:input.document?['d1']:[],unresolved:!input.document});push('commitment','document-minimum','문서 관계의 값은 하나 이상 존재해야 한다. 이 요구만으로 구체적인 문서 식별자를 만들어 내지는 않는다.');}
  }else push('no-reverse',null,'AUTHOR라고 명시하지 않았다. Person·이름·문서 조건만으로 AUTHOR를 역추론하지 않는다.');
  const conflicts=[];if(input.differentNames&&find('n1')===find('n2'))conflicts.push({id:'distinct-name-conflict',premises:['이름값 최대 1','n1 = n2','n1 ≠ n2']});if(input.notBiblioName&&[...biblio].some(n=>find(n)===find('n1')))conflicts.push({id:'name-type-conflict',premises:['BIBLIO-NAME(n1)','¬BIBLIO-NAME(n1)']});
  const state=snapshot(),queries=conflicts.length?{author:'inconsistent',person:'inconsistent',personName:'inconsistent'}:{author:input.author?'entailed':'not-derived',person:person?'entailed':'not-derived',personName:personNames.has('n1')||personNames.has('n2')&&find('n1')===find('n2')?'entailed':'not-derived'};
  return{...state,asserted,conflicts,queries,status:conflicts.length?'inconsistent':!input.author?'author-not-asserted':obligations.some(o=>o.unresolved)?'open-values':'no-detected-conflict',events};
 }
 function analyze({input=initial,target='loom'}={}){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).length!==Object.keys(initial).length||Reflect.ownKeys(input).some(k=>typeof k!=='string'||!Object.hasOwn(initial,k)||typeof input[k]!=='boolean'))throw new TypeError('Provide the eight explicit assertion choices.');const profile=example.targets.find(t=>t.id===target);if(!profile)throw new RangeError('Choose a published target example.');input=clone(input);const source=solve(input,allFeatures),translated=solve(input,profile.supports),events=[];const push=e=>events.push({index:events.length,...clone(e)});
  push({kind:'goal',message:'함께 쓸 AUTHOR의 뜻을 정하고, 이 약속이 대상 표현에 남는지 살펴본다.',state:null});source.events.forEach(push);
  for(const axiom of axioms){const supported=profile.supports.includes(axiom.id);push({kind:'translation',axiom:clone(axiom),supported,target,expression:example.mappings[target][axiom.id],message:supported?'원문 대상 예시에서 이 제약에 대응하는 표현을 확인한다.':'이 제약은 대상의 선언만으로 표현되지 않는다. 절차 보완 필요를 알리며 보존됐다고 단정하지 않는다.'});}
  const missing=axioms.filter(a=>!profile.supports.includes(a.id)).map(a=>a.id);push({kind:'result',status:source.status,portability:missing.length?'requires-procedure':'all-shown-constraints',missing,message:missing.length?'이 대상의 선언만으로 이름 관계 일치 약속이 남지 않는다. 예시 절차가 없으므로 완전한 보존으로 표시하지 않는다.':'원문 예시의 다섯 제약을 이 제한된 검사에서 모두 대응시켰다. 전체 KIF나 모든 추론의 번역 보장을 뜻하지 않는다.'});
  return{example:clone(example),input,target,source,translated,missing,events,portability:missing.length?'requires-procedure':'all-shown-constraints',scope:example.scope};
 }
 function replay(result,index=0){if(!result||!Array.isArray(result.events)||!Number.isInteger(index)||index<0||index>=result.events.length)throw new RangeError('Select a calculated inspection step.');let state=null,status='inspecting',portability=null;const translations=[];for(const e of result.events.slice(0,index+1)){if(e.state)state=clone(e.state);if(e.kind==='translation')translations.push({id:e.axiom.id,supported:e.supported,expression:e.expression});if(e.kind==='result'){status=e.status;portability=e.portability;}}return{index,event:clone(result.events[index]),state,translations,status,portability,complete:index===result.events.length-1,source:status==='inspecting'?null:clone(result.source),translated:status==='inspecting'?null:clone(result.translated)};}
 function verifyRun(result){try{return{valid:equal(result,analyze({input:result.input,target:result.target}))};}catch(_){return{valid:false};}}
 window.AtlasOntologyOriginal=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
