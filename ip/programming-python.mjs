/* Fixed Python 3.13 example models. No interpreter, network, or stored state.
   modelCopy({mode:'assignment'|'shallow'|'deep',value:integer}) -> {code,states,output,...}.
   modelSlice({start:integer|null,stop:integer|null,step:nonzero integer}) ->
   {source,indices,result,rangeValues,normalized,code,states,output} for six fixed values. */
const pyRepr=v=>JSON.stringify(v).replaceAll(',',', ');
const copyValue=v=>JSON.parse(JSON.stringify(v));
const html=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function modelCopy({mode='shallow',value=9}={}){
  if(!['assignment','shallow','deep'].includes(mode)||!Number.isSafeInteger(value)||value< -99||value>99)throw new RangeError('Unsupported copy model input');
  const expression={assignment:'a',shallow:'a.copy()',deep:'copy.deepcopy(a)'}[mode];
  const code=[...(mode==='deep'?['import copy']:[]),'a = [[1], [2]]',`b = ${expression}`,`b[0].append(${value})`,'b.append([7])','print(a)','print(b)'];
  const states=[];let a=null,b=null,output=[],line=0;
  const save=description=>states.push({line:++line,description,a:copyValue(a),b:copyValue(b),outerSame:mode==='assignment'&&b!==null,innerShared:mode!=='deep'&&b!==null,output:[...output]});
  if(mode==='deep')save('copy 모듈을 가져왔습니다. 다음 복사 단계에서 copy.deepcopy(a)를 호출합니다. a와 b는 아직 만들지 않았습니다.');
  a=[[1],[2]];save('a가 바깥 리스트 O1을 가리키고, O1은 내부 리스트 N1과 N2를 가리킵니다.');
  b=mode==='assignment'?a:mode==='shallow'?[...a]:copyValue(a);save(mode==='assignment'?'a와 b가 같은 바깥 리스트 O1을 가리킵니다.':mode==='shallow'?'b의 바깥 리스트 O2는 새 객체지만, N1·N2는 a와 함께 가리킵니다.':'b의 바깥 리스트 O2와 내부 리스트 N3·N4가 새 객체입니다.');
  b[0].push(value);save(mode==='deep'?'b가 가리키는 새 내부 리스트 N3만 바뀝니다.':'b[0]이 가리키는 N1을 수정합니다. a에서도 같은 내부 객체의 변화를 봅니다.');
  b.push([7]);save(mode==='assignment'?'a와 b가 같은 바깥 리스트를 가리키므로 [7]도 함께 보입니다.':'b의 바깥 리스트 O2에 [7]을 추가합니다. a의 바깥 리스트 O1은 늘어나지 않습니다.');
  output.push(pyRepr(a));save('a의 현재 값을 출력했습니다.');output.push(pyRepr(b));save('b의 현재 값을 출력했습니다.');
  return{mode,value,code,states,output:output.join('\n')};
}
function boundary(v){if(v===null||v===undefined)return null;if(!Number.isSafeInteger(v)||v< -99||v>99)throw new RangeError('start/stop must be -99..99 or null');return v;}
export function modelSlice({start=1,stop=5,step=2}={}){
  start=boundary(start);stop=boundary(stop);if(!Number.isSafeInteger(step)||!step||step< -99||step>99)throw new RangeError('step must be nonzero -99..99');
  const source=[10,20,30,40,50,60],n=source.length,forward=step>0;
  const norm=(v,isStart)=>{if(v===null)return forward?(isStart?0:n):(isStart?n-1:-1);let x=v<0?v+n:v;return forward?Math.min(n,Math.max(0,x)):Math.min(n-1,Math.max(-1,x));};
  const first=norm(start,true),last=norm(stop,false),indices=[];
  for(let i=first;forward?i<last:i>last;i+=step)indices.push(i);
  let rangeValues=null;if(start!==null&&stop!==null){rangeValues=[];for(let v=start;forward?v<stop:v>stop;v+=step)rangeValues.push(v);}
  const show=v=>v===null?'':String(v),expr=`a[${show(start)}:${show(stop)}:${step}]`;
  const code=['a = [10, 20, 30, 40, 50, 60]',`result = ${expr}`,'print(result)'];
  if(rangeValues!==null)code.push(`print(list(range(${start}, ${stop}, ${step})))`);
  const states=[{line:1,selected:[],current:null,output:[],description:'원본 리스트의 인덱스는 0부터 5까지입니다. 아직 선택한 칸은 없습니다.'},{line:2,selected:[],current:null,output:[],description:`길이 6을 기준으로 시작 ${first}, 종료 경계 ${last}, 간격 ${step}로 해석했습니다. 종료 경계는 포함하지 않습니다.`}];
  const picked=[];for(const i of indices){picked.push(i);states.push({line:2,selected:[...picked],current:i,output:[],description:`인덱스 ${i}의 값 ${source[i]}을 선택했습니다. 선택 순서: ${picked.join(' → ')}.`});}
  const result=indices.map(i=>source[i]),output=[pyRepr(result)];states.push({line:3,selected:[...picked],current:null,output:[...output],description:indices.length?'선택한 값으로 새 리스트를 만들어 출력했습니다. 원본은 바뀌지 않습니다.':'시작과 진행 방향이 종료 경계 조건을 만족하지 않아 빈 리스트를 출력합니다.'});
  if(rangeValues!==null){output.push(pyRepr(rangeValues));states.push({line:4,selected:[...picked],current:null,output:[...output],description:'두 번째 출력은 range가 생성한 정수입니다. 음수 인덱스의 길이 보정이나 범위 자르기는 적용하지 않습니다.'});}
  return{source,indices,result,rangeValues,normalized:[first,last,step],code,states,output:output.join('\n')};
}
function drawCode(el,code,line){el.innerHTML=code.map((text,i)=>`<span class="ipp-py-line${i+1===line?' is-current':''}"${i+1===line?' aria-current="step"':''}><span class="ipp-py-line-number" aria-hidden="true">${i+1}</span>${html(text)}</span>`).join('');}
function graph(s){
  if(!s.a)return'<p>아직 리스트 객체가 없습니다.</p>';
  let text='<div class="ipp-py-variables"><span class="ipp-py-ref">a → O1</span>'+(s.b?`<span class="ipp-py-ref">b → ${s.outerSame?'O1':'O2'}</span>`:'')+'</div>';
  const outer=(name,list,childPrefix)=>`<div class="ipp-py-object"><strong>바깥 리스트 ${name}</strong>${list.map((_,i)=>`<span class="ipp-py-node">[${i}] → ${i<2?'N'+(childPrefix+i):'N5'}</span>`).join('')}</div>`;
  text+=outer('O1',s.a,1);if(s.b&&!s.outerSame)text+=outer('O2',s.b,s.innerShared?1:3);
  const nodes=[['N1',s.a[0]],['N2',s.a[1]]];if(s.b&&!s.innerShared)nodes.push(['N3',s.b[0]],['N4',s.b[1]]);if(s.b?.length===3)nodes.push(['N5',s.b[2]]);
  text+='<div class="ipp-py-object"><strong>내부 리스트 객체</strong>'+nodes.map(([id,list])=>`<span class="ipp-py-node">${id}: ${html(pyRepr(list))}</span>`).join('')+'</div>';
  return text;
}
export function mountPython(root=document){
  const copy=root.querySelector('#python-copy');if(copy&&!copy.dataset.pyMounted){copy.dataset.pyMounted='true';let position=0;
    const read=()=>modelCopy({mode:copy.querySelector('#ipp-copy-mode').value,value:Number(copy.querySelector('#ipp-copy-value').value)});
    const paint=()=>{const m=read(),s=m.states[position];drawCode(copy.querySelector('[data-py-copy-output=code]'),m.code,s.line);copy.querySelector('[data-py-copy-output=graph]').innerHTML=graph(s);copy.querySelector('[data-py-copy-output=output]').textContent=s.output.length?s.output.join('\n'):'아직 출력 없음';copy.querySelector('[data-py-copy-output=step]').textContent=`${position+1} / ${m.states.length}단계 · ${s.description}`;copy.querySelector('[data-py-copy=prev]').disabled=position===0;copy.querySelector('[data-py-copy=next]').disabled=position===m.states.length-1;copy.querySelector('[data-py-copy=end]').disabled=position===m.states.length-1;};
    copy.querySelectorAll('select').forEach(e=>e.addEventListener('change',()=>{position=0;paint();}));copy.querySelectorAll('[data-py-copy]').forEach(e=>e.addEventListener('click',()=>{const action=e.dataset.pyCopy;position=action==='reset'?0:action==='end'?read().states.length-1:Math.max(0,Math.min(read().states.length-1,position+(action==='next'?1:-1)));paint();}));paint();
  }
  const slice=root.querySelector('#python-slice');if(slice&&!slice.dataset.pyMounted){slice.dataset.pyMounted='true';let position=0,model=modelSlice();const fields=['start','stop','step'];
    const parse=text=>text.trim()===''||text.trim().toLowerCase()==='none'?null:/^-?\d+$/.test(text.trim())?Number(text):NaN;
    const paint=()=>{const m=model,s=m.states[position];drawCode(slice.querySelector('[data-py-slice-output=code]'),m.code,s.line);slice.querySelector('[data-py-slice-output=cells]').innerHTML=m.source.map((v,i)=>`<div class="ipp-py-cell${s.selected.includes(i)?' is-selected':''}${s.current===i?' is-current':''}"><small>index ${i}</small><strong>${v}</strong><small>${i-6}</small></div>`).join('');slice.querySelector('[data-py-slice-output=normalized]').textContent=`슬라이스 경계 해석: start = ${m.normalized[0]}, stop = ${m.normalized[1]}, step = ${m.normalized[2]}`;slice.querySelector('[data-py-slice-output=selected]').textContent=`선택한 실제 인덱스: ${pyRepr(s.selected)}`;slice.querySelector('[data-py-slice-output=output]').textContent=s.output.length?s.output.join('\n'):'아직 출력 없음';slice.querySelector('[data-py-slice-output=step]').textContent=`${position+1} / ${m.states.length}단계 · ${s.description}`;slice.querySelector('[data-py-slice=prev]').disabled=position===0;slice.querySelector('[data-py-slice=next]').disabled=position===m.states.length-1;slice.querySelector('[data-py-slice=end]').disabled=position===m.states.length-1;};
    const update=()=>{const error=slice.querySelector('[data-py-slice-output=error]');try{const args=Object.fromEntries(fields.map(k=>[k,k==='step'?Number(slice.querySelector('#ipp-slice-'+k).value):parse(slice.querySelector('#ipp-slice-'+k).value)]));model=modelSlice(args);position=0;error.hidden=true;paint();}catch{error.hidden=false;error.textContent='시작·종료는 -99~99 정수 또는 None으로 입력하세요. 간격은 0이 될 수 없습니다. 아래는 마지막 유효 입력의 추적입니다.';}};
    fields.forEach(k=>slice.querySelector('#ipp-slice-'+k).addEventListener(k==='step'?'change':'input',update));
    slice.querySelector('#ipp-slice-preset').addEventListener('change',e=>{const presets={forward:['1','5','2'],negative:['-1','-7','-2'],reverse:['None','None','-1'],empty:['None','-1','-1'],clipped:['-9','9','2']};presets[e.target.value].forEach((v,i)=>slice.querySelector('#ipp-slice-'+fields[i]).value=v);update();});
    slice.querySelectorAll('[data-py-slice]').forEach(e=>e.addEventListener('click',()=>{const a=e.dataset.pySlice;position=a==='reset'?0:a==='end'?model.states.length-1:Math.max(0,Math.min(model.states.length-1,position+(a==='next'?1:-1)));paint();}));paint();
  }
}
