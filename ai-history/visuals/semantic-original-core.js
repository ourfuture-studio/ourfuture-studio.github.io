/* A finite reconstruction of the2001 Semantic Web scenario, not a Web agent.
 * Source records, identity joins and explicit term correspondence are inspectable.
 * Fictional providers and times illustrate one appointment option, not care advice. */
(function(){
 'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const url='https://lassila.org/publications/2001/SciAm.pdf',base='https://example.org/semantic-original/';
 const therapy=base+'concepts/physical-therapy',localTherapy=base+'directory/physio',otherTherapy=base+'concepts/dental-care',plan=base+'plans/example-plan';
 const providers=['a','b','c','d'].map((id,i)=>({id,uri:base+'providers/'+id,label:'가상 기관 '+['A','B','C','D'][i]}));
 const p=id=>providers.find(p=>p.id===id).uri;
 const initial={directory:true,insurance:true,ratings:true,availability:true,calendars:true,mapping:true,ratingRecord:true,joinIdentity:true};
 const sources=[
  {id:'directory',label:'기관 안내',description:'같은 기관을 가리키는 URI, 제공 서비스와 엄마 집에서의 가상 거리를 적었다. 실제 지도에서 측정한 값이 아니다.',rows:[
   {id:'d-a',provider:p('a'),treatment:localTherapy,miles:12,text:'기관 A · physio · 엄마 집에서12mile'},
   {id:'d-b',provider:p('b'),treatment:therapy,miles:8,text:'기관 B · physical-therapy · 엄마 집에서8mile'},
   {id:'d-c',provider:p('c'),treatment:therapy,miles:9,text:'기관 C · physical-therapy · 엄마 집에서9mile'},
   {id:'d-d',provider:p('d'),treatment:therapy,miles:24,text:'기관 D · physical-therapy · 엄마 집에서24mile'}
  ]},
  {id:'insurance',label:'보험 적용 기록',description:'기관 URI와 예시 보험의 적용 여부를 명시한다. 목록에 없으면 미확인이며 적용 제외로 바꾸지 않는다.',rows:[
   {id:'i-a',provider:p('a'),plan,covered:true,text:'기관 A · 예시 보험 적용'},
   {id:'i-b',provider:p('b'),plan,covered:false,text:'기관 B · 예시 보험 적용 제외를 명시'},
   {id:'i-c',provider:p('c'),plan,covered:true,text:'기관 C · 예시 보험 적용'},
   {id:'i-d',provider:p('d'),plan,covered:true,text:'기관 D · 예시 보험 적용'}
  ]},
  {id:'ratings',label:'평가 기록',description:'원문에서 말한 excellent 또는 very good이라는 조건을 단순 분류로 비교한다. 기록의 진실성을 검증하는 기능은 없다.',rows:[
   {id:'r-a',provider:p('a'),rating:'excellent',text:'기관 A · excellent'},
   {id:'r-b',provider:p('b'),rating:'very-good',text:'기관 B · very good'},
   {id:'r-c',provider:p('c'),text:'기관 C · 평가값 미기록'},
   {id:'r-d',provider:p('d'),rating:'excellent',text:'기관 D · excellent'}
  ]},
  {id:'availability',label:'기관의 가용 시간',description:'가상 하루의 예약 가능 시간창이다. 실제 예약 가능성을 확인하거나 자리를 잡아 두지 않는다.',rows:[
   {id:'t-a',provider:p('a'),windows:[[810,870]],text:'기관 A · 13:30–14:30'},
   {id:'t-b',provider:p('b'),windows:[[600,660],[810,870]],text:'기관 B · 10:00–11:00 / 13:30–14:30'},
   {id:'t-c',provider:p('c'),windows:[[600,660],[810,870]],text:'기관 C · 10:00–11:00 / 13:30–14:30'},
   {id:'t-d',provider:p('d'),windows:[[600,660],[810,870]],text:'기관 D · 10:00–11:00 / 13:30–14:30'}
  ]},
  {id:'calendars',label:'동행자의 일정',description:'Lucy나 Pete 중 한 사람이 연속30분 동행할 수 있으면 후보로 둔다. 두 사람이 동시에 참석할 필요는 없다.',rows:[
   {id:'c-lucy',person:'lucy',uri:base+'people/lucy',windows:[[540,660],[780,840]],text:'Lucy · 09:00–11:00 / 13:00–14:00'},
   {id:'c-pete',person:'pete',uri:base+'people/pete',windows:[[600,720],[840,900]],text:'Pete · 10:00–12:00 / 14:00–15:00'}
  ]}
 ];
 const requests=[
  {id:'original',label:'원문의 조건에서 출발',maxMiles:20,window:[540,1020],duration:30},
  {id:'nearby',label:'거리 조건을10mile 이내로',maxMiles:10,window:[540,1020],duration:30},
  {id:'morning',label:'오전 시간으로 좁히기',maxMiles:20,window:[540,720],duration:30}
 ];
 const example=freeze({id:'lucy-pete-information-composition',providers,sources,initial,
  inputs:[
   {id:'directory',label:'기관 안내를 함께 읽기'},
   {id:'insurance',label:'보험 적용 기록을 함께 읽기'},
   {id:'ratings',label:'평가 기록을 함께 읽기'},
   {id:'availability',label:'기관의 가용 시간을 함께 읽기'},
   {id:'calendars',label:'Lucy·Pete의 일정을 함께 읽기'},
   {id:'mapping',label:'physio와 physical-therapy의 대응을 명시'},
   {id:'ratingRecord',label:'기관 A의 평가값을 기록'},
   {id:'joinIdentity',label:'보험 기록의 기관 A가 같은 URI를 사용'}
  ],
  requests,
  scenarios:[
   {id:'connected',label:'연결한 기록에서 계획 후보로',input:initial,request:'original'},
   {id:'no-mapping',label:'개념의 대응이 없다면',input:{...initial,mapping:false},request:'original'},
   {id:'rating-missing',label:'평가값을 아직 모른다면',input:{...initial,ratingRecord:false},request:'original'},
   {id:'same-label',label:'이름은 같고 URI는 다르다면',input:{...initial,joinIdentity:false},request:'original'},
   {id:'no-calendar',label:'동행자의 일정을 읽지 않는다면',input:{...initial,calendars:false},request:'original'},
   {id:'nearby',label:'거리를 더 가깝게 요청',input:initial,request:'nearby'},
   {id:'morning',label:'오전으로 다시 요청',input:initial,request:'morning'}
  ],
  terms:[{id:therapy,label:'요청의 physical-therapy'},{id:localTherapy,label:'기관 안내의 physio'},{id:otherTherapy,label:'다른 서비스 개념'}],
  mapping:{id:'therapy-correspondence',from:localTherapy,to:therapy,label:'이 보기에서 명시한 서비스 개념의 대응'},
  goal:{treatment:therapy,plan,ratings:['excellent','very-good'],distanceOrigin:'엄마의 집'},
  source:{scenario:url+'#page=3',ontology:url+'#page=7',architecture:url+'#page=8'},
  boundary:'2001년 글은 미래의 가상 시나리오다. 기관 A–D, URI, 거리, 시간과30분 길이는 이 보기를 위해 직접 만들었다. 원문의 전체 치료 횟수·주기·비용·이동시간을 계산하지 않고, 한 동행자가 함께할 수 있는 단일 시간 후보만 비교한다.',
  scope:'A finite authored reconstruction of the2001 vision. Five fixed sources, exact URI joins, one explicitly stated term correspondence, distance/coverage/rating checks and a provider-versus-one-caregiver time intersection. Missing records remain unknown; an explicit failed condition rejects this request. This is not Web search, ontology discovery, full RDF/OWL reasoning, insurance or clinical advice, source truth/signature verification, negotiation, reservation or booking.'
 });
 function validateInput(input){
  if(!input||typeof input!=='object'||Array.isArray(input)||Reflect.ownKeys(input).length!==Object.keys(initial).length||Reflect.ownKeys(input).some(k=>typeof k!=='string'||!Object.hasOwn(initial,k)||typeof input[k]!=='boolean'))throw new TypeError('Provide all eight finite source and correspondence choices.');
  return clone(input);
 }
 const sourceRef=(sourceId,row,fields)=>({kind:'source',sourceId,rowId:row.id,fields:fields.slice()});
 const absent=(sourceId,providerUri,fields,reason)=>({kind:'missing',sourceId,providerUri,fields:fields.slice(),reason});
 function effectiveSources(input){
  const result=clone(sources);
  for(const source of result){source.available=input[source.id];if(!source.available){source.rows=[];continue;}
   if(source.id==='ratings'&&!input.ratingRecord){delete source.rows[0].rating;source.rows[0].text='기관 A · 평가값 미기록';}
   if(source.id==='insurance'&&!input.joinIdentity){source.rows[0].provider=base+'providers/a-other';source.rows[0].text='기관 A라는 같은 표시 이름 · 다른 URI의 보험 기록';}
  }
  return result;
 }
 function windowsFor(providerWindows,calendars,request){
  const slots=[];
  for(const pw of providerWindows)for(const person of calendars)for(const cw of person.windows){
   const start=Math.max(pw[0],cw[0],request.window[0]),end=Math.min(pw[1],cw[1],request.window[1]);
   if(end-start<request.duration)continue;
   const found=slots.find(s=>s.start===start&&s.end===end);
   if(found){if(!found.caregivers.includes(person.person))found.caregivers.push(person.person);}
   else slots.push({start,end,caregivers:[person.person]});
  }
  slots.sort((a,b)=>a.start-b.start||a.end-b.end);for(const slot of slots)slot.caregivers.sort();return slots;
 }
 function calculateCandidate(provider,sourceList,request,input){
  const byId=new Map(sourceList.map(s=>[s.id,s])),find=(sourceId)=>byId.get(sourceId).rows.find(r=>r.provider===provider.uri),directory=find('directory'),insurance=find('insurance'),rating=find('ratings'),availability=find('availability'),calendars=byId.get('calendars').rows;
  const joins={},checks=[];for(const [sourceId,row]of [['directory',directory],['insurance',insurance],['ratings',rating],['availability',availability]])joins[sourceId]=row?{sourceId,rowId:row.id,uri:provider.uri}:null;
  joins.calendars=calendars.map(row=>({sourceId:'calendars',rowId:row.id,person:row.person}));
  const add=(id,state,reason,evidence,extra={})=>checks.push({id,state,reason,evidence,...extra});
  if(!directory)add('treatment','unknown','directory-unavailable',[absent('directory',provider.uri,['treatment'],'source-unavailable')]);
  else if(directory.treatment===therapy)add('treatment','pass','same-treatment-uri',[sourceRef('directory',directory,['provider','treatment'])],{resolved:therapy});
  else if(input.mapping&&directory.treatment===localTherapy)add('treatment','pass','explicit-treatment-correspondence',[sourceRef('directory',directory,['provider','treatment']),{kind:'mapping',mappingId:example.mapping.id}],{resolved:therapy});
  else add('treatment','unknown','treatment-correspondence-unrecorded',[sourceRef('directory',directory,['provider','treatment']),{kind:'missing-mapping',from:directory.treatment,to:therapy}]);
  if(!insurance)add('insurance','unknown',byId.get('insurance').available?'insurance-identity-unmatched':'insurance-source-unavailable',[absent('insurance',provider.uri,['covered'],byId.get('insurance').available?'no-same-uri-row':'source-unavailable')]);
  else add('insurance',insurance.covered?'pass':'fail',insurance.covered?'coverage-explicit':'noncoverage-explicit',[sourceRef('insurance',insurance,['provider','plan','covered'])],{covered:insurance.covered});
  if(!directory)add('distance','unknown','distance-unrecorded',[absent('directory',provider.uri,['miles'],'source-unavailable')]);
  else add('distance',directory.miles<=request.maxMiles?'pass':'fail',directory.miles<=request.maxMiles?'within-authored-distance':'outside-authored-distance',[sourceRef('directory',directory,['provider','miles'])],{miles:directory.miles,maxMiles:request.maxMiles});
  if(!rating||!Object.hasOwn(rating,'rating'))add('rating','unknown','rating-unrecorded',[rating?sourceRef('ratings',rating,['provider','rating']):absent('ratings',provider.uri,['rating'],'source-unavailable')]);
  else add('rating',example.goal.ratings.includes(rating.rating)?'pass':'fail',example.goal.ratings.includes(rating.rating)?'accepted-rating-recorded':'other-rating-recorded',[sourceRef('ratings',rating,['provider','rating'])],{rating:rating.rating});
  let slots=[];
  if(!availability||!byId.get('calendars').available)add('schedule','unknown',!availability?'availability-unrecorded':'caregiver-calendar-unavailable',[...(!availability?[absent('availability',provider.uri,['windows'],'source-unavailable')]:[sourceRef('availability',availability,['provider','windows'])]),...(!byId.get('calendars').available?[absent('calendars',provider.uri,['windows'],'source-unavailable')]:calendars.map(r=>sourceRef('calendars',r,['person','windows'])))],{slots:[]});
  else{slots=windowsFor(availability.windows,calendars,request);add('schedule',slots.length?'pass':'fail',slots.length?'provider-and-one-caregiver-overlap':'no-sufficient-overlap',[sourceRef('availability',availability,['provider','windows']),...calendars.map(r=>sourceRef('calendars',r,['person','windows']))],{slots:clone(slots),duration:request.duration});}
  const status=checks.some(c=>c.state==='fail')?'rejected':checks.some(c=>c.state==='unknown')?'unknown':'accepted';
  const proposal=status==='accepted'?{start:slots[0].start,end:slots[0].start+request.duration,caregivers:slots[0].caregivers.slice()}:null;
  return{...clone(provider),joins,checks,status,slots,proposal};
 }
 function analyze(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options)||Reflect.ownKeys(options).some(k=>typeof k!=='string'||!['input','request'].includes(k)))throw new TypeError('Provide finite source choices and one named request only.');
  let {input=initial,request='original'}=options;
  input=validateInput(input);const requestSpec=example.requests.find(r=>r.id===request);if(!requestSpec)throw new RangeError('Choose one of the three explicitly dated request presets.');
  const effective=effectiveSources(input),candidates=providers.map(provider=>calculateCandidate(provider,effective,requestSpec,input)),events=[];
  const push=event=>events.push({index:events.length,...clone(event)});
  push({kind:'goal',message:'문서의 단어만 찾는 대신, 엄마의 요청을 개념과 조건으로 명시한다.',request:requestSpec});
  for(const source of effective)push({kind:'source',sourceId:source.id,available:source.available,rowIds:source.rows.map(r=>r.id),message:source.available?source.label+'의 기록을 읽는다. 같은 기관은 URI로 연결한다.':source.label+'를 읽지 않는다. 필요한 항목은 미확인으로 남긴다.'});
  push({kind:'mapping',enabled:input.mapping,mapping:input.mapping?example.mapping:null,message:input.mapping?'physio를 요청의 physical-therapy에 연결하는 대응을 명시한다.':'서로 다른 두 서비스 URI의 대응을 명시하지 않았다. 표시 이름으로 뜻을 추측하지 않는다.'});
  for(const candidate of candidates){
   push({kind:'join',providerId:candidate.id,joins:candidate.joins,message:candidate.label+'의 URI를 각 출처의 기관 URI와 정확히 연결한다.'});
   for(const check of candidate.checks)push({kind:'check',providerId:candidate.id,check,message:candidate.label+' · '+{treatment:'서비스 개념',insurance:'보험 적용',distance:'엄마 집에서의 거리',rating:'평가 기록',schedule:'기관과 동행자의 시간'}[check.id]+' 조건을 '+{pass:'뒷받침하는 기록을 확인했다.',fail:'명시한 기록이 충족하지 않는다.',unknown:'판단할 기록이 부족하다.'}[check.state]});
   push({kind:'decision',providerId:candidate.id,status:candidate.status,proposal:candidate.proposal,message:candidate.label+' · '+{accepted:'표시한 모든 조건을 충족하는 시간 후보가 있다.',rejected:'명시한 불일치가 있어 이 요청의 후보에서 제외한다.',unknown:'실패가 명시되지 않았지만 필요한 기록이 없어 후보를 확정하지 못한다.'}[candidate.status]});
  }
  const plans=candidates.filter(c=>c.status==='accepted').map(c=>({providerId:c.id,uri:c.uri,label:c.label,...clone(c.proposal),evidence:c.checks.flatMap(check=>check.evidence),status:'awaiting-user-review'}));
  const counts={accepted:candidates.filter(c=>c.status==='accepted').length,rejected:candidates.filter(c=>c.status==='rejected').length,unknown:candidates.filter(c=>c.status==='unknown').length};
  push({kind:'approval',status:plans.length?'ready-for-review':'no-ready-plan',approval:'required',plans,message:plans.length?'근거와 함께 시간 후보를 사용자에게 보여 준다. 승인·예약·결제는 실행하지 않는다.':'현재 기록과 조건에서는 확정할 시간 후보가 없다. 미확인 기록과 명시한 불일치를 구분해 보여 준다.'});
  return{example:clone(example),input,request,requestSpec:clone(requestSpec),sources:effective,candidates,counts,events,plans,approval:'required',scope:example.scope};
 }
 function verifyRun(result){try{return{valid:equal(result,analyze({input:result.input,request:result.request}))};}catch(_){return{valid:false};}}
 function replay(result,index=0){
  if(!result||!Array.isArray(result.events)||!Number.isInteger(index)||index<0||index>=result.events.length)throw new RangeError('Select a calculated source-composition step.');
  if(!verifyRun(result).valid)throw new TypeError('Only a verified, unchanged finite calculation can be replayed.');
  const state={index,event:clone(result.events[index]),complete:index===result.events.length-1,status:'inspecting',sourceIds:[],mappingVisible:false,mappingEnabled:false,providers:providers.map(p=>({...clone(p),joins:null,checks:[],status:'uninspected',slots:[],proposal:null})),plans:[],approval:null,request:clone(result.requestSpec)};
  for(const event of result.events.slice(0,index+1)){
   if(event.kind==='source'&&event.available)state.sourceIds.push(event.sourceId);
   if(event.kind==='mapping'){state.mappingVisible=true;state.mappingEnabled=event.enabled;}
   const provider=event.providerId?state.providers.find(p=>p.id===event.providerId):null;
   if(event.kind==='join'){provider.joins=clone(event.joins);provider.status='inspecting';}
   if(event.kind==='check'){provider.checks.push(clone(event.check));if(event.check.id==='schedule')provider.slots=clone(event.check.slots);}
   if(event.kind==='decision'){provider.status=event.status;provider.proposal=clone(event.proposal);}
   if(event.kind==='approval'){state.status=event.status;state.plans=clone(event.plans);state.approval=event.approval;}
  }
  state.counts={accepted:state.providers.filter(p=>p.status==='accepted').length,rejected:state.providers.filter(p=>p.status==='rejected').length,unknown:state.providers.filter(p=>p.status==='unknown').length,uninspected:state.providers.filter(p=>p.status==='uninspected'||p.status==='inspecting').length};
  return state;
 }
 window.AtlasSemanticOriginal=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
