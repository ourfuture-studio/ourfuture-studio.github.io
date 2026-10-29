import labs from './modules/registry.js';
const $ = s => document.querySelector(s);
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = value => Array.isArray(value) ? value : value ? [value] : [];
const labels = {1:'변수·상수·함수',2:'거듭제곱·제곱근',3:'다항식·삼각함수·총합과 총곱',4:'선형대수'};
const parts = {1:'01',2:'02',3:'03',4:'04'};
const fmt = value => typeof value === 'number' ? Number.isFinite(value) ? (Math.abs(value)>0 && Math.abs(value)<1e-5 ? value.toExponential(4) : Number(value.toFixed(6)).toLocaleString('ko-KR',{maximumFractionDigits:6})) : '정의되지 않음' : String(value);
let meta;
try { meta=await fetch('connections.json').then(r=>{if(!r.ok)throw Error('연결 목록을 읽을 수 없습니다.');return r.json();}); } catch(error) { const host=$('#lab-root')||$('#catalog');host.innerHTML='<div class="error"><p>파일을 불러오지 못했습니다. 페이지를 새로고침한 뒤 다시 시도해 주세요.</p></div>';throw error; }
if ($('#catalog')) {
  $('#catalog').innerHTML = Object.entries(labels).map(([part,title])=>`<section><div class="part-heading"><h2>${part}부 · ${title}</h2><span>${labs.filter(x=>x.part===Number(part)).length}개 체험</span></div><div class="cards">${labs.filter(x=>x.part===Number(part)).map(lab=>`<a class="card" href="lab.html?lab=${lab.id}"><span class="tag">${lab.id}</span><h3>${escape(lab.title)}</h3><p>${escape(lab.question)}</p><span class="go">예상하고 바꿔 보기 →</span></a>`).join('')}</div></section>`).join('');
} else {
  try { await startLab(); } catch(error) { $('#lab-root').innerHTML='<div class="error"><h1>체험을 불러오지 못했습니다.</h1><p>페이지를 새로고침한 뒤 다시 시도해 주세요.</p><p>'+escape(error.message)+'</p><a href="index.html">목차로</a></div>'; $('#main').setAttribute('aria-busy','false');console.error(error); }
}

async function startLab() {
  const params = new URLSearchParams(location.search), id=params.get('lab')||'M01', lab=labs.find(x=>x.id===id);
  if(!lab)throw Error('목록에 없는 체험 ID입니다.');
  document.title=`${lab.id} · ${lab.title} | AI 수학`;
  const values=Object.fromEntries(lab.controls.map(c=>[c.id,c.value]));
  for(const c of lab.controls){const raw=params.get(c.id);if(raw!==null&&Number.isFinite(Number(raw)))values[c.id]=snap(Number(raw),c);}
  const index=labs.indexOf(lab), existing=meta.existing.filter(x=>x.lesson_ids.some(id=>lab.lessonIds.includes(id)));
  $('#lab-root').innerHTML=`<section class="lab-head"><p class="eyebrow">${lab.id} · ${lab.part}부 ${labels[lab.part]}</p><h1>${escape(lab.title)}</h1><p class="question">${escape(lab.question)}</p><p class="quiet">먼저 알면 좋아요 · ${escape(lab.prerequisite)}</p></section><div class="lab-grid"><aside><section class="panel"><p class="step-label">01 · 예상한 뒤 입력 바꾸기</p><h2>한 번에 하나씩 바꿔요</h2><div id="controls">${lab.controls.map(c=>`<div class="control"><label for="range-${c.id}">${escape(c.label)}</label><div class="input-row"><input type="range" id="range-${c.id}" data-control="${c.id}" min="${c.min}" max="${c.max}" step="${c.step}" value="${values[c.id]}"><input aria-label="${escape(c.label)} 숫자 입력" id="number-${c.id}" type="number" data-number="${c.id}" min="${c.min}" max="${c.max}" step="${c.step}" value="${values[c.id]}"></div><div class="bounds"><span>${c.min}</span><span>${c.max}</span></div></div>`).join('')}</div><h3>비교·경계 예제</h3><div class="preset-list">${lab.presets.map(p=>`<button type="button" data-preset="${p.id}" aria-pressed="false">${escape(p.label)}</button>`).join('')}</div><button type="button" class="reset" id="reset">처음 값으로</button><p class="save-note">현재 입력은 주소에 담깁니다. 새로 열어도 같은 입력을 볼 수 있어요.</p></section><section class="panel"><p class="step-label">직접 해 볼 순서</p><ol class="instructions">${list(lab.tryThis).map(s=>'<li>'+escape(s)+'</li>').join('')}</ol></section></aside><div><section class="panel"><p class="step-label">02 · 수식과 그림 연결하기</p><h2 class="figure-title">${escape(lab.title)}</h2><p id="input-summary" class="input-summary"></p><div id="warning" class="warning" role="status" hidden></div><div class="mathbox" id="formula" tabindex="0" aria-label="정의와 관계식"></div><p class="math-hint">긴 수식은 좌우로 밀어 읽을 수 있습니다.</p><div id="calculation" class="mathbox calculation-box" tabindex="0" aria-label="현재 숫자 대입식"></div><p id="substitution" class="substitution"></p><p id="plot-message" class="plot-message" role="status" hidden></p><dl id="figure-comparison" class="figure-comparison" hidden></dl><svg id="chart" class="chart" viewBox="0 0 640 430" role="img" aria-labelledby="chart-title chart-description"></svg><div id="legend" class="legend"></div><p id="plot-note" class="plot-note"></p></section><section class="panel"><details id="results"><summary class="result-summary">03 · 내 예상과 계산을 비교해요</summary><dl id="metrics" class="metrics"></dl><h3>계산 순서</h3><ol id="steps" class="steps"></ol><div class="condition-block"><h3>성립 조건·주의</h3><ul id="conditions" class="conditions"></ul></div><div id="target" class="target"></div></details></section><section class="panel"><p class="step-label">04 · 학습 연결·다음 응용</p><div>${list(lab.explain).map(s=>'<p>'+escape(s)+'</p>').join('')}</div><div class="lesson-links">${lab.lessonIds.map(id=>`<a href="guide.html#${id.toLowerCase()}">${escape(meta.lessons.find(row=>row.id===id)?.title||id)} 학습 연결 ↗</a>`).join('')}</div>${existing.length?existing.map(v=>`<details class="existing-card"><summary><span class="badge">${escape(v.label)}</span><a href="${escape(v.url)}" target="_blank" rel="noopener">${escape(v.title)} ↗</a></summary><p>${escape(v.why)}</p><p><b>먼저 배울 것</b> · ${escape(v.prerequisites)}</p><p><b>읽는 범위</b> · ${escape(v.limits)}</p></details>`).join(''):'<p class="quiet">기초 계산을 익힌 뒤 후속 AI 응용으로 이어갑니다.</p>'}</section></div></div><nav class="lab-nav" aria-label="체험 이동">${index?'<a href="lab.html?lab='+labs[index-1].id+'">← '+labs[index-1].id+' 이전 체험</a>':'<a href="index.html">전체 목차</a>'}${index<labs.length-1?'<a href="lab.html?lab='+labs[index+1].id+'">'+labs[index+1].id+' 다음 체험 →</a>':'<a href="index.html">전체 목차 →</a>'}</nav>`;
  // Classic deferred KaTeX loads before module execution in the local document.
  if(!globalThis.katex)throw Error('수식 표시 파일을 읽지 못했습니다.');
  const sync=()=>{for(const c of lab.controls){$('#range-'+c.id).value=values[c.id];$('#number-'+c.id).value=values[c.id];}for(const b of document.querySelectorAll('[data-preset]')){const p=lab.presets.find(p=>p.id===b.dataset.preset);b.setAttribute('aria-pressed',String(lab.controls.every(c=>values[c.id]===(p.values[c.id]??c.value))));}};
  const update=()=>{
    const result=lab.compute(values);
    if(lab.id==='M16')for(const key of ['ux','uy','s']){const inactive=values.mode===0?key==='s':key!=='s';for(const prefix of ['range-','number-']){const control=$('#'+prefix+key);control.disabled=inactive;control.title=inactive?'현재 모드에서는 사용하지 않는 입력입니다.':'';control.closest('.control').classList.toggle('inactive',inactive);}}
    globalThis.__mathLab={id:lab.id,values:{...values},result};
    $('#warning').hidden=!result.warning;$('#warning').textContent=result.warning?'조건 확인 · '+result.warning:'';
    $('#input-summary').textContent='현재 입력 · '+lab.controls.filter(c=>lab.id!=='M16'||!(['ux','uy','s'].includes(c.id))||(values.mode===0?c.id!=='s':c.id==='s')).map(c=>c.label.replace(/\s*\([^)]*\)/g,'')+' = '+fmt(values[c.id])).join(' · ');
    renderMath($('#formula'),result.formulaTex);$('#calculation').hidden=!result.calculationTex;if(result.calculationTex)renderMath($('#calculation'),result.calculationTex);
    $('#substitution').textContent=result.formulaText;
    $('#figure-comparison').hidden=lab.id!=='M12';$('#figure-comparison').innerHTML=lab.id==='M12'?result.metrics.slice(-2).map(m=>'<div><dt>'+escape(m.label)+'</dt><dd>'+escape(fmt(m.value))+'</dd></div>').join(''):'';
    $('#metrics').innerHTML=result.metrics.map(m=>`<div class="metric"><dt>${escape(m.label)}</dt><dd>${escape(fmt(m.value))}</dd></div>`).join('');
    $('#steps').innerHTML=list(result.steps).map(s=>'<li>'+escape(s)+'</li>').join('');$('#conditions').innerHTML=list(result.conditions).map(s=>'<li>'+escape(s)+'</li>').join('');
    $('#target').innerHTML=result.target?`<details><summary>${escape(result.target.prompt)}</summary><p><b>확인</b> · ${escape(result.target.expected)}</p></details>`:'입력을 하나 바꾸고 계산을 다시 예상해 보세요.';
    drawPlot($('#chart'),result.plot,lab);$('#legend').innerHTML=[...(result.plot?.curves||[]),...(result.plot?.points||[])].map(c=>`<span><i style="background:${escape(c.color||'#245f93')}"></i>${escape(c.label)}</span>`).join('');
    const equal=result.plot?.aspect==='equal'||['M08','M10','M13','M14','M15','M16'].includes(lab.id), discrete=result.plot?.curves?.some(c=>c.connect===false);
    $('#plot-message').hidden=!result.plot?.message;$('#plot-message').textContent=result.plot?.message||'';
    $('#plot-note').textContent=(equal?'가로·세로 1단위 길이가 같습니다. ':'두 축의 표시 범위와 단위 간격을 확인하세요. ')+(discrete?'정수 입력에서 계산한 점입니다. 점 사이는 계산하지 않습니다. ':'곡선은 표시 범위 안의 표본점을 연결합니다. ')+'소수는 반올림한 근삿값입니다.';
    sync();const q=new URLSearchParams({lab:lab.id,...Object.fromEntries(Object.entries(values).map(([k,v])=>[k,String(v)]))});history.replaceState(null,'','?'+q);$('#main').setAttribute('aria-busy','false');
  };
  for(const c of lab.controls){$('#range-'+c.id).addEventListener('input',e=>{values[c.id]=snap(Number(e.target.value),c);update();});$('#number-'+c.id).addEventListener('change',e=>{values[c.id]=Number.isFinite(Number(e.target.value))?snap(Number(e.target.value),c):c.value;update();});}
  for(const b of document.querySelectorAll('[data-preset]'))b.addEventListener('click',()=>{const p=lab.presets.find(p=>p.id===b.dataset.preset);for(const c of lab.controls)values[c.id]=p.values[c.id]??c.value;update();});
  $('#reset').addEventListener('click',()=>{for(const c of lab.controls)values[c.id]=c.value;update();});
  const updateHint=()=>{const hint=$('.math-hint');if(hint)hint.hidden=!['#formula','#calculation'].some(selector=>{const e=$(selector);return e&&!e.hidden&&e.scrollWidth>e.clientWidth+2;});};
  window.addEventListener('resize',updateHint);
  document.fonts.ready.then(updateHint);
  $('#controls').addEventListener('input',()=>requestAnimationFrame(updateHint));
  for(const button of document.querySelectorAll('[data-preset],#reset'))button.addEventListener('click',()=>requestAnimationFrame(updateHint));
  update();requestAnimationFrame(updateHint);
}
function snap(value,c){return Number(Math.min(c.max,Math.max(c.min,c.min+Math.round((value-c.min)/c.step)*c.step)).toFixed(10));}
function renderMath(element,tex){globalThis.katex.render(tex,element,{displayMode:true,throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'});element.dataset.latex=tex;}
function drawPlot(svg,plot,lab){
  const NS='http://www.w3.org/2000/svg',W=640,H=430,pad={l:65,r:27,t:34,b:48};svg.replaceChildren();
  const add=(name,attrs,parent=svg,text=null)=>{const e=document.createElementNS(NS,name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(text!==null)e.textContent=text;parent.appendChild(e);return e;};
  add('title',{id:'chart-title'},svg,lab.title+'의 계산 그래프');add('desc',{id:'chart-description'},svg,'선과 점의 이름은 그래프 아래 범례에서 확인합니다. 입력·출력과 조건의 정확한 값은 계산 패널에 표시합니다.');
  let[x0,x1]=plot.xRange,[y0,y1]=plot.yRange;if(![x0,x1,y0,y1].every(Number.isFinite)||x0===x1||y0===y1)throw Error('좌표 범위가 올바르지 않습니다.');
  const equal=plot.aspect==='equal'||['M08','M10','M13','M14','M15','M16'].includes(lab.id),iw=W-pad.l-pad.r,ih=H-pad.t-pad.b;
  if(equal){const scale=Math.min(iw/(x1-x0),ih/(y1-y0)),dx=iw/scale-(x1-x0),dy=ih/scale-(y1-y0);x0-=dx/2;x1+=dx/2;y0-=dy/2;y1+=dy/2;}
  const sx=x=>pad.l+(x-x0)/(x1-x0)*iw,sy=y=>H-pad.b-(y-y0)/(y1-y0)*ih;
  svg.dataset.equalAspect=String(equal);svg.dataset.scaleX=String(iw/(x1-x0));svg.dataset.scaleY=String(ih/(y1-y0));
  const defs=add('defs',{}),clip=add('clipPath',{id:'plot-clip'},defs);add('rect',{x:pad.l,y:pad.t,width:iw,height:ih},clip);
  if(plot.region==='plane')add('rect',{x:pad.l,y:pad.t,width:iw,height:ih,fill:'#ede7f6','data-solution-region':'plane'});
  for(const t of ticks(x0,x1,6)){const x=sx(t);add('line',{x1:x,y1:pad.t,x2:x,y2:H-pad.b,stroke:'#e1e6ee','stroke-width':1});add('text',{x,y:H-pad.b+22,'text-anchor':'middle'},svg,tickFormat(t));}
  for(const t of ticks(y0,y1,5)){const y=sy(t);add('line',{x1:pad.l,y1:y,x2:W-pad.r,y2:y,stroke:'#e1e6ee','stroke-width':1});add('text',{x:pad.l-10,y:y+4,'text-anchor':'end'},svg,tickFormat(t));}
  if(y0<=0&&y1>=0)add('line',{x1:pad.l,y1:sy(0),x2:W-pad.r,y2:sy(0),stroke:'#64738b','stroke-width':1.6});if(x0<=0&&x1>=0)add('line',{x1:sx(0),y1:pad.t,x2:sx(0),y2:H-pad.b,stroke:'#64738b','stroke-width':1.6});
  const axisLabels={M01:['개수 n (개)','비용 C(n) (원)'],M05:['정수 지수 n','거듭제곱 값'],M07:['입력 x','출력 y'],M09:['입력 x','출력 f(x)'],M11:['x (라디안)','출력 y'],M12:['첨자 i','항·부분합']};
  const axis=axisLabels[lab.id]||['x','y'];add('text',{x:W-pad.r,y:H-8,'text-anchor':'end'},svg,axis[0]);add('text',{x:pad.l,y:18},svg,axis[1]);
  const shapes=add('g',{'clip-path':'url(#plot-clip)'});
  const sameEndpoints=(a,b)=>a.length===2&&b.length===2&&a.every(p=>b.some(q=>Math.abs(p[0]-q[0])<1e-9&&Math.abs(p[1]-q[1])<1e-9));
  for(const[cindex,c]of(plot.curves||[]).entries()){
    const color=c.color||'#245f93',overlap=(plot.curves||[]).slice(0,cindex).some(previous=>sameEndpoints(c.points,previous.points));
    let marker=null;
    if(c.arrow&&c.points.length>=2&&Math.hypot(c.points.at(-1)[0]-c.points[0][0],c.points.at(-1)[1]-c.points[0][1])>1e-12){marker='arrow-'+cindex;const def=add('marker',{id:marker,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:7,markerHeight:7,orient:'auto-start-reverse',markerUnits:'strokeWidth'},defs);add('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:color},def);}
    if(c.connect!==false){let d='',started=false;for(const p of c.points){if(!Array.isArray(p)||!p.every(Number.isFinite)){started=false;continue;}d+=(started?'L':'M')+sx(p[0]).toFixed(3)+','+sy(p[1]).toFixed(3)+' ';started=true;}const attrs={d,fill:'none',stroke:color,'stroke-width':cindex===0?2.8:2.4,'stroke-linejoin':'round','stroke-dasharray':overlap||c.dashed||/기준|원래|원본/.test(c.label)?'7 5':'none','data-curve':cindex};if(marker)attrs['marker-end']='url(#'+marker+')';add('path',attrs,shapes);}
    if(c.markers||c.connect===false)for(const p of c.points)if(Array.isArray(p)&&p.every(Number.isFinite))add('circle',{cx:sx(p[0]),cy:sy(p[1]),r:3.6,fill:color,stroke:'white','stroke-width':1.1,'data-sample':cindex},shapes);
  }
  for(const[pindex,p]of(plot.points||[]).entries()){if(!Number.isFinite(p.x)||!Number.isFinite(p.y))continue;const x=sx(p.x),y=sy(p.y);add('circle',{cx:x,cy:y,r:5,fill:p.color||'#7a1f2e',stroke:'white','stroke-width':1.5},shapes);if(x>=pad.l&&x<=W-pad.r&&y>=pad.t&&y<=H-pad.b){const short=p.label.length>25?p.label.slice(0,24)+'…':p.label;add('text',{x:Math.max(pad.l+4,Math.min(W-pad.r-8,x+(x>W*.68?-9:9))),y:Math.max(pad.t+14,Math.min(H-pad.b-7,y+(pindex%2?20:-11))),'text-anchor':x>W*.68?'end':'start',class:'point-label'},shapes,short);}}
}
function ticks(min,max,count){const rough=(max-min)/count,power=10**Math.floor(Math.log10(rough)),scaled=rough/power,step=(scaled<=1?1:scaled<=2?2:scaled<=5?5:10)*power;const out=[];for(let t=Math.ceil(min/step)*step;t<=max+step*1e-9&&out.length<30;t+=step)out.push(Math.abs(t)<step*1e-9?0:t);return out;}
function tickFormat(t){return Math.abs(t)>0&&Math.abs(t)<.001?t.toExponential(1):Number(t.toPrecision(6)).toLocaleString('ko-KR',{maximumFractionDigits:6});}
