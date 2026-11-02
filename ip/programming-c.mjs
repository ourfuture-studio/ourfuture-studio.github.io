/**
 * Fixed C11 execution models. These functions do not interpret arbitrary C.
 * modelCast(a=9,b=4): a is an integer -24..24; b is one of ±1, ±2, ±4.
 * modelPointer(initial=5,replacement=11,mode='value'): integers -20..20;
 * mode is value, pointer or retarget. Addresses are symbolic, not byte values.
 * Each result has code, steps[{line,note,...state}], output and inputs.
 */
const DIVISORS=[-4,-2,-1,1,2,4];
const isInt=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
const decimal=n=>Object.is(n,-0)?'-0.00':n.toFixed(2);

export function modelCast(a=9,b=4){
  if(!isInt(a,-24,24)||!DIVISORS.includes(b))throw new RangeError('a must be an integer -24..24 and b must be ±1, ±2 or ±4.');
  const quotient=Math.trunc(a/b)||0,ratio=a/b;
  const code=['#include <stdio.h>','','int main(void) {',`    int a = ${a}, b = ${b};`,'    double late = (double)(a / b);','    double early = (double)a / b;','    printf("%.2f %.2f\\n", late, early);','    return 0;','}'].join('\n');
  const output=`${decimal(quotient)} ${decimal(ratio)}`;
  const steps=[
    {line:4,a,b,quotient:null,convertedA:null,late:null,early:null,output:null,note:`int 변수 a=${a}, b=${b}를 준비했습니다. 두 피연산자의 자료형을 먼저 봅니다.`},
    {line:5,a,b,quotient,convertedA:null,late:null,early:null,output:null,note:`괄호 안 a / b는 int끼리의 정수 나눗셈(Integer Division)입니다. ${a} / ${b}의 몫은 0 방향으로 버린 ${quotient}입니다.`},
    {line:5,a,b,quotient,convertedA:null,late:quotient,early:null,output:null,note:`이미 계산된 int 몫 ${quotient}를 double로 형변환(Cast)해 late에 저장합니다. 버린 소수 부분은 복구되지 않습니다.`},
    {line:6,a,b,quotient,convertedA:a,late:quotient,early:null,output:null,note:`다른 식에서는 나누기 전에 (double)a가 실행됩니다. 한쪽 피연산자가 double이므로 일반 산술 변환(Usual Arithmetic Conversions)에 따라 b도 double로 변환됩니다.`},
    {line:6,a,b,quotient,convertedA:a,late:quotient,early:ratio,output:null,note:`이번 나눗셈은 double끼리 계산하므로 early=${decimal(ratio)}입니다. 저장 변수의 선언보다 /를 실행할 때의 피연산자 자료형이 기준입니다.`},
    {line:7,a,b,quotient,convertedA:a,late:quotient,early:ratio,output,note:`printf가 두 값을 소수점 아래 2자리로 출력했습니다: ${output}.`}
  ];
  return {kind:'c-cast',inputs:{a,b},code,steps,output};
}

export function modelPointer(initial=5,replacement=11,mode='value'){
  if(!isInt(initial,-20,20)||!isInt(replacement,-20,20)||!['value','pointer','retarget'].includes(mode))throw new RangeError('Bounded integers and a known pointer mode are required.');
  const valueMode=mode==='value',retarget=mode==='retarget';
  const signature=valueMode?'int v':'int *p';
  const statements=retarget?[`    int local = ${replacement};`,'    p = &local;']:[valueMode?`    v = ${replacement};`:`    *p = ${replacement};`];
  const mainStart=retarget?8:7,xLine=mainStart+1,callLine=mainStart+2,printLine=mainStart+3;
  const code=['#include <stdio.h>','',`static void change(${signature}) {`,...statements,'}','', 'int main(void) {',`    int x = ${initial};`,`    change(${valueMode?'x':'&x'});`,'    printf("%d\\n", x);','    return 0;','}'].join('\n');
  const output=String(mode==='pointer'?replacement:initial);
  const param=value=>({name:valueMode?'v':'p',type:valueMode?'int':'int *',value,target:valueMode?null:'x'});
  const steps=[
    {line:xLine,x:initial,parameter:null,local:null,output:null,note:`호출자 main에 int 객체 x=${initial}를 만들었습니다. 그림의 &x는 주소를 나타내는 기호입니다.`},
    {line:callLine,x:initial,parameter:param(valueMode?initial:'&x'),local:null,output:null,note:valueMode?`인자(Argument) x의 값 ${initial}를 매개변수(Parameter) v로 복사했습니다. x와 v는 서로 다른 int 객체입니다.`:'인자 &x의 주소값을 포인터 매개변수 p로 복사했습니다. p 자체는 별도 변수이고, p가 가리키는 대상은 호출자의 x입니다.'}
  ];
  if(retarget){
    steps.push({line:4,x:initial,parameter:param('&x'),local:replacement,output:null,note:`함수 안에 별도 지역 객체 local=${replacement}를 만들었습니다. 아직 p는 x를 가리킵니다.`});
    steps.push({line:5,x:initial,parameter:{name:'p',type:'int *',value:'&local',target:'local'},local:replacement,output:null,note:'p = &local은 복사된 포인터 변수 p의 값만 바꿉니다. x에 값을 대입한 것이 아니므로 x는 그대로입니다.'});
  }else{
    steps.push({line:4,x:mode==='pointer'?replacement:initial,parameter:param(valueMode?replacement:'&x'),local:null,output:null,note:valueMode?`v=${replacement}는 복사본 v만 수정합니다. 호출자 x=${initial}에는 영향을 주지 않습니다.`:`역참조(Indirection) *p가 가리키는 객체 x에 ${replacement}를 저장했습니다. p의 주소값을 바꾼 것은 아닙니다.`});
  }
  steps.push({line:retarget?6:5,x:mode==='pointer'?replacement:initial,parameter:null,local:null,output:null,note:'함수 호출이 끝나 매개변수와 함수의 지역 객체의 수명(Lifetime)이 끝났습니다. main의 x는 계속 살아 있습니다.'});
  steps.push({line:printLine,x:mode==='pointer'?replacement:initial,parameter:null,local:null,output,note:`main이 x를 읽어 ${output}을 출력했습니다. C에서는 포인터 인자도 값 전달(Pass by Value)입니다.`});
  return {kind:'c-pointer',inputs:{initial,replacement,mode},code,steps,output};
}

function escapeHtml(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderCode(element,code,line){
  element.innerHTML=code.split('\n').map((text,index)=>`<span class="ipp-c-line${index+1===line?' ipp-c-current':''}"${index+1===line?' aria-current="step"':''}><span class="ipp-c-lineno" aria-hidden="true">${index+1}</span><span>${escapeHtml(text)||' '}</span></span>`).join('');
}
function text(section,name,value){section.querySelector(`[data-c-output="${name}"]`).textContent=value;}
function valueString(value,type='int'){return value===null?'아직 계산 전':type==='double'?decimal(value):String(value);}
function stateBox(label,value,note='',highlight=false){return `<div class="ipp-c-cell${highlight?' ipp-c-changed':''}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>${note?`<small>${escapeHtml(note)}</small>`:''}</div>`;}
function setButtons(section,step,length){section.querySelector('[data-c-action="prev"]').disabled=step===0;section.querySelector('[data-c-action="next"]').disabled=step===length-1;section.querySelector('[data-c-action="finish"]').disabled=step===length-1;}

function mountCast(section){
  if(!section||section.dataset.cMounted)return;
  section.dataset.cMounted='true';
  const aInput=section.querySelector('#ipp-c-a'),bInput=section.querySelector('#ipp-c-b'),error=section.querySelector('[data-c-error]');
  let model=modelCast(),step=0;
  const render=()=>{
    const state=model.steps[step];renderCode(section.querySelector('[data-c-code]'),model.code,state.line);
    text(section,'step',`${step+1} / ${model.steps.length}단계 · 강조한 줄의 계산을 따라가세요.`);
    text(section,'note',state.note);text(section,'output',state.output??'아직 출력하지 않았습니다.');
    section.querySelector('[data-c-output="variables"]').innerHTML=stateBox('a · int',state.a)+stateBox('b · int',state.b)+stateBox('late · double',valueString(state.late,'double'),'나눈 뒤 형변환',step===2)+stateBox('early · double',valueString(state.early,'double'),'나누기 전 형변환',step===4);
    section.querySelector('[data-c-output="late-path"]').innerHTML=stateBox('① int / int',state.quotient===null?'계산 전':String(state.quotient))+ '<span class="ipp-c-arrow" aria-hidden="true">→</span>'+stateBox('② double로 형변환',valueString(state.late,'double'));
    section.querySelector('[data-c-output="early-path"]').innerHTML=stateBox('① (double)a',state.convertedA===null?'계산 전':decimal(state.convertedA))+'<span class="ipp-c-arrow" aria-hidden="true">→</span>'+stateBox('② double / double',valueString(state.early,'double'));
    setButtons(section,step,model.steps.length);
  };
  const update=()=>{try{if(aInput.value.trim()==='')throw new RangeError();model=modelCast(Number(aInput.value),Number(bInput.value));step=0;error.hidden=true;render();}catch{error.hidden=false;error.textContent='a는 −24~24 정수, b는 선택 목록의 0이 아닌 정수로 정해주세요. 그림은 마지막 유효 입력입니다.';}};
  aInput.addEventListener('input',update);bInput.addEventListener('change',update);
  section.querySelector('#ipp-c-cast-preset').addEventListener('change',event=>{const values={source:[9,4],negative:[-9,4],exact:[12,4],negativeDivisor:[9,-4]};const [a,b]=values[event.target.value];aInput.value=a;bInput.value=b;update();});
  for(const button of section.querySelectorAll('[data-c-action]'))button.addEventListener('click',()=>{const action=button.dataset.cAction;if(action==='prev')step=Math.max(0,step-1);if(action==='next')step=Math.min(model.steps.length-1,step+1);if(action==='finish')step=model.steps.length-1;if(action==='reset'){aInput.value=9;bInput.value=4;section.querySelector('#ipp-c-cast-preset').value='source';update();return;}render();});
  render();
}

function mountPointer(section){
  if(!section||section.dataset.cMounted)return;
  section.dataset.cMounted='true';
  const initial=section.querySelector('#ipp-c-initial'),replacement=section.querySelector('#ipp-c-replacement'),mode=section.querySelector('#ipp-c-mode'),error=section.querySelector('[data-c-error]');
  let model=modelPointer(),step=0;
  const render=()=>{
    const state=model.steps[step];renderCode(section.querySelector('[data-c-code]'),model.code,state.line);
    text(section,'step',`${step+1} / ${model.steps.length}단계 · 호출자와 호출된 함수를 나누어 봅니다.`);
    text(section,'note',state.note);text(section,'output',state.output??'아직 출력하지 않았습니다.');
    section.querySelector('[data-c-output="caller"]').innerHTML=stateBox('main의 x · int',state.x,'주소 기호 &x',state.x!==model.inputs.initial);
    let callee=state.parameter?stateBox(`매개변수 ${state.parameter.name} · ${state.parameter.type}`,state.parameter.value,state.parameter.target?`${state.parameter.target}를 가리킴`:'x와 별도 객체'):stateBox('매개변수','없음','호출 전 또는 호출 종료');
    if(state.local!==null)callee+=stateBox('함수의 local · int',state.local,'주소 기호 &local');
    section.querySelector('[data-c-output="callee"]').innerHTML=callee;
    text(section,'pointer-arrow',state.parameter?.target?`포인터 관계: p → ${state.parameter.target}${state.parameter.target==='x'?' (호출자의 객체)':' (함수의 지역 객체)'}`:state.parameter?'값의 복사: x와 v는 별도 int 객체입니다.':'활성 매개변수가 없습니다. main의 x를 확인하세요.');
    setButtons(section,step,model.steps.length);
  };
  const update=()=>{try{if(initial.value.trim()===''||replacement.value.trim()==='')throw new RangeError();model=modelPointer(Number(initial.value),Number(replacement.value),mode.value);step=0;error.hidden=true;render();}catch{error.hidden=false;error.textContent='초기값과 대입값은 −20~20 정수로 입력하세요. 그림은 마지막 유효 입력입니다.';}};
  initial.addEventListener('input',update);replacement.addEventListener('input',update);mode.addEventListener('change',update);
  for(const button of section.querySelectorAll('[data-c-action]'))button.addEventListener('click',()=>{const action=button.dataset.cAction;if(action==='prev')step=Math.max(0,step-1);if(action==='next')step=Math.min(model.steps.length-1,step+1);if(action==='finish')step=model.steps.length-1;if(action==='reset'){initial.value=5;replacement.value=11;mode.value='value';update();return;}render();});
  render();
}

export function mountC(root=document){mountCast(root.querySelector('#c-cast'));mountPointer(root.querySelector('#c-pointer'));}
