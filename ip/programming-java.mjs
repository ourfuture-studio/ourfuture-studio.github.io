/** Fixed Java SE 17 examples. No compiler, code evaluation, network or storage. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const allowed=(value,values,name)=>{if(!values.includes(value))throw new RangeError('Unsupported '+name);return value;};
const smallInt=(value,name)=>{if(typeof value!=='number'||!Number.isInteger(value)||value< -9||value>99)throw new RangeError(name+' must be an integer from -9 to 99');return value;};

/** @returns {{code:string,output:string,signature:string,implementation:string,steps:Array}} */
export function modelDispatch({argumentType='Object',objectType='B'}={}){
  allowed(argumentType,['Object','String'],'argument type');allowed(objectType,['A','B'],'object type');
  const signature=`f(${argumentType})`,implementation=`${objectType}.${signature}`,output=objectType+(argumentType==='Object'?'O':'S');
  const code=['public class Main {',' static class A {','  String f(Object x){ return "AO"; }','  String f(String x){ return "AS"; }',' }',' static class B extends A {','  @Override String f(Object x){ return "BO"; }','  @Override String f(String x){ return "BS"; }',' }',' public static void main(String[] args) {',`  A a = new ${objectType}();`,`  ${argumentType} x = "sun";`,'  System.out.println(a.f(x));',' }','}'].join('\n');
  const methodLine=(objectType==='A'?3:7)+(argumentType==='String'?1:0);
  const steps=[
    {line:0,phase:'준비',label:'아직 실행 전입니다. 먼저 컴파일 시점의 선택을 확인합니다.',signature:null,receiver:null,argument:false,implementation:null,output:''},
    {line:13,phase:'① 컴파일 시점',label:`인자 표현식 x의 자료형은 ${argumentType}입니다. ${signature}를 선택합니다. 이 단계에서는 객체를 실행해 검사하지 않습니다.`,signature,receiver:null,argument:false,implementation:null,output:''},
    {line:11,phase:'② 실행 시점',label:`new ${objectType}()로 실제 ${objectType} 객체를 만들고, A형 변수 a에 그 참조값을 저장합니다.`,signature,receiver:objectType,argument:false,implementation:null,output:''},
    {line:12,phase:'② 실행 시점',label:`x는 String 객체 "sun"을 가리킵니다. 이미 선택된 시그니처 ${signature}는 그대로입니다.`,signature,receiver:objectType,argument:true,implementation:null,output:''},
    {line:methodLine,phase:'② 실행 시점',label:`a가 가리키는 실제 ${objectType} 객체에서 ${signature}의 구현을 찾습니다. 실행할 구현은 ${implementation}입니다.`,signature,receiver:objectType,argument:true,implementation,output:''},
    {line:13,phase:'② 실행 시점',label:`${implementation}가 "${output}"를 반환해 표준 출력에 표시합니다.`,signature,receiver:objectType,argument:true,implementation,output}
  ];
  return {code,output,signature,implementation,steps};
}

/** mode mutate: shared field update; reassign: move b; separate: copy int into new Box. */
export function modelReference({mode='mutate',initial=2,changed=7}={}){
  allowed(mode,['mutate','reassign','separate'],'reference mode');smallInt(initial,'initial');smallInt(changed,'changed');
  const separate=mode==='separate',reassign=mode==='reassign';
  const createB=separate?'Box b = new Box(a.n);':'Box b = a;';
  const change=reassign?`b = new Box(${changed});`:`b.n = ${changed};`;
  const code=['public class Main {',' static class Box {','  int n; Box(int n){ this.n=n; }',' }',' public static void main(String[] args) {',`  Box a = new Box(${initial});`,`  ${createB}`,`  ${change}`,'  System.out.println(a.n + " " + b.n);',' }','}'].join('\n');
  const start={line:0,label:'아직 지역 변수 a와 b를 초기화하지 않았습니다.',a:null,b:null,objects:[],output:''};
  const aStep={line:6,label:`Object #1을 만들고 n=${initial}로 초기화합니다. a가 #1을 가리킵니다.`,a:1,b:null,objects:[{id:1,n:initial}],output:''};
  const bStep={line:7,label:separate?'n의 int 값을 복사해 Object #2를 새로 만듭니다. a와 b는 서로 다른 객체를 가리킵니다.':'a의 참조값을 b에 복사합니다. 두 변수가 같은 Object #1을 가리킵니다.',a:1,b:separate?2:1,objects:separate?[{id:1,n:initial},{id:2,n:initial}]:[{id:1,n:initial}],output:''};
  const finalObjects=mode==='mutate'?[{id:1,n:changed}]:[{id:1,n:initial},{id:2,n:changed}];
  const finalB=mode==='mutate'?1:2;
  const changeStep={line:8,label:reassign?`Object #2(n=${changed})를 만들고 b의 참조를 옮깁니다. a는 계속 #1을 가리킵니다.`:`b가 가리키는 Object #${finalB}의 필드 n을 ${changed}로 수정합니다. 변수의 참조는 옮기지 않습니다.`,a:1,b:finalB,objects:finalObjects,output:''};
  const output=`${mode==='mutate'?changed:initial} ${changed}`;
  const printStep={...changeStep,line:9,label:`a가 가리키는 객체와 b가 가리키는 객체의 n을 차례로 읽습니다. 출력은 ${output}입니다.`,output};
  return {code,output,steps:[start,aStep,bStep,changeStep,printStep]};
}

function codeHtml(code,line){return '<code>'+code.split('\n').map((s,i)=>`<span class="ipp-java-line${i+1===line?' ipp-java-line-active':''}"><span class="ipp-java-line-number" aria-hidden="true">${i+1}</span>${esc(s)||' '}</span>`).join('')+'</code>';}
function bindButtons(section,prefix,count,getStep,setStep,render){
  const prev=section.querySelector(`#${prefix}-prev`),next=section.querySelector(`#${prefix}-next`),end=section.querySelector(`#${prefix}-end`),reset=section.querySelector(`#${prefix}-reset`);
  prev.addEventListener('click',()=>{setStep(Math.max(0,getStep()-1));render();});next.addEventListener('click',()=>{setStep(Math.min(count()-1,getStep()+1));render();});end.addEventListener('click',()=>{setStep(count()-1);render();});reset.addEventListener('click',()=>{setStep(0);render();});
  return ()=>{prev.disabled=getStep()===0;next.disabled=getStep()===count()-1;end.disabled=getStep()===count()-1;reset.disabled=getStep()===0;};
}
function mountDispatch(section){
  if(section.dataset.javaMounted)return;section.dataset.javaMounted='true';
  let model=modelDispatch(),step=0,buttons=()=>{};
  function render(){const s=model.steps[step];section.querySelector('[data-j-dispatch-code]').innerHTML=codeHtml(model.code,s.line);section.querySelector('[data-j-dispatch-status]').textContent=`${step} / ${model.steps.length-1} · ${s.phase} — ${s.label}`;section.querySelector('[data-j-dispatch-output]').textContent=s.output||'(아직 출력 없음)';section.querySelector('[data-j-dispatch-state]').innerHTML=`<div class="ipp-java-card${s.signature?' ipp-java-card-active':''}"><small>① 컴파일 · 선택한 시그니처 (Signature)</small><b>${esc(s.signature||'아직 선택 전')}</b><span>인자 표현식 자료형: ${esc(section.querySelector('#java-argument-type').value)}</span></div><div class="ipp-java-arrow" aria-hidden="true">↓</div><div class="ipp-java-card"><small>② 실행 · 수신 객체 (Receiver Object)</small><strong>${s.receiver?'a → 실제 '+esc(s.receiver)+' 객체':'a 초기화 전'}</strong><span>${s.argument?'x → String 객체 "sun"':'x 초기화 전'}</span></div><div class="ipp-java-arrow" aria-hidden="true">↓</div><div class="ipp-java-card${s.implementation?' ipp-java-card-active':''}"><small>실행할 구현 (Implementation)</small><b>${esc(s.implementation||'아직 호출 전')}</b></div>`;buttons();}
  buttons=bindButtons(section,'java-dispatch',()=>model.steps.length,()=>step,v=>{step=v;},render);
  for(const id of ['java-argument-type','java-object-type'])section.querySelector('#'+id).addEventListener('change',()=>{model=modelDispatch({argumentType:section.querySelector('#java-argument-type').value,objectType:section.querySelector('#java-object-type').value});step=0;render();});render();
}
function mountReference(section){
  if(section.dataset.javaMounted)return;section.dataset.javaMounted='true';
  let model=modelReference(),step=0,buttons=()=>{};
  function render(){const s=model.steps[step];section.querySelector('[data-j-reference-code]').innerHTML=codeHtml(model.code,s.line);section.querySelector('[data-j-reference-status]').textContent=`${step} / ${model.steps.length-1} · ${s.label}`;section.querySelector('[data-j-reference-output]').textContent=s.output||'(아직 출력 없음)';const variable=(name,id)=>`<div class="ipp-java-var">참조 변수 (Reference Variable)<strong>${name} ${id?'→ #'+id:'· 초기화 전'}</strong></div>`;section.querySelector('[data-j-reference-state]').innerHTML=`<div class="ipp-java-variables">${variable('a',s.a)}${variable('b',s.b)}</div><div class="ipp-java-arrow" aria-hidden="true">↓</div><div class="ipp-java-objects">${s.objects.length?s.objects.map(o=>`<div class="ipp-java-object">Box Object #${o.id}<strong>n = ${o.n}</strong><span>이 객체를 가리키는 변수: ${[s.a===o.id?'a':'',s.b===o.id?'b':''].filter(Boolean).join(', ')||'없음'}</span></div>`).join(''):'<div class="ipp-java-empty">아직 Box 객체를 만들지 않았습니다.</div>'}</div>`;buttons();}
  buttons=bindButtons(section,'java-reference',()=>model.steps.length,()=>step,v=>{step=v;},render);
  const change=()=>{const a=section.querySelector('#java-reference-initial').value,b=section.querySelector('#java-reference-changed').value,error=section.querySelector('#java-reference-error');try{if(a.trim()===''||b.trim()==='')throw new RangeError('empty');model=modelReference({mode:section.querySelector('#java-reference-mode').value,initial:Number(a),changed:Number(b)});error.hidden=true;step=0;render();}catch{error.hidden=false;}};
  section.querySelector('#java-reference-mode').addEventListener('change',change);for(const id of ['java-reference-initial','java-reference-changed'])section.querySelector('#'+id).addEventListener('input',change);render();
}
export function mountJava(root=document){const dispatch=root.querySelector('#java-dispatch'),reference=root.querySelector('#java-reference');if(dispatch)mountDispatch(dispatch);if(reference)mountReference(reference);}
