/** Interactive fixed-axis distribution plots. All computations stay in the page. */
import {tPDF,tCDF,tSF,tQuantile,chiSquarePDF,chiSquareCDF,chiSquareSF,chiSquareQuantile,fPDF,fCDF,fSF,fQuantile} from './distribution-math.mjs?v=4140ecb8e5fe';

const DEFAULTS={
  t:{df:5,stat:2.5,alpha:.05,tail:'two-sided',area:'alpha',xmax:5,ymax:.45},
  chi:{df:4,stat:10,alpha:.05,tail:'greater',area:'alpha',xmax:30,ymax:.3},
  f:{df1:3,df2:20,stat:3,alpha:.05,tail:'greater',area:'alpha',xmax:6,ymax:1.5},
};
const normalPDF=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
const fmt=(x,digits=3)=>!Number.isFinite(x)?(x>0?'∞':x<0?'−∞':'—'):Math.abs(x)>=10000?x.toExponential(3):x.toLocaleString('en-US',{maximumFractionDigits:digits});
const prob=x=>x===0?'≈0 (수치 정밀도 범위)':x===1?'1':x<.0001?x.toExponential(3):x>.99999?`1 − ${(1-x).toExponential(3)}`:x.toFixed(5);
const point=x=>Number(x).toFixed(3);
const esc=x=>String(x).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

export function distributionModel(kind,state){
  if(kind==='t') return {pdf:x=>tPDF(x,state.df),cdf:x=>tCDF(x,state.df),sf:x=>tSF(x,state.df),quantile:p=>tQuantile(p,state.df),reference:normalPDF,name:'t분포(Student’s t-Distribution)',symbol:'t'};
  if(kind==='chi') return {pdf:x=>chiSquarePDF(x,state.df),cdf:x=>chiSquareCDF(x,state.df),sf:x=>chiSquareSF(x,state.df),quantile:p=>chiSquareQuantile(p,state.df),reference:x=>chiSquarePDF(x,4),name:'카이제곱분포(Chi-Square Distribution)',symbol:'χ²'};
  if(kind==='f') return {pdf:x=>fPDF(x,state.df1,state.df2),cdf:x=>fCDF(x,state.df1,state.df2),sf:x=>fSF(x,state.df1,state.df2),quantile:p=>fQuantile(p,state.df1,state.df2),reference:x=>fPDF(x,3,20),name:'F분포(F Distribution)',symbol:'F'};
  throw new RangeError('Unknown distribution');
}

function upperTailQuantile(model,p){
  if(p===0)return Infinity;
  if(!(p>0&&p<=.5))throw new RangeError('Upper-tail probability must be in (0, .5].');
  // All uses here ask for an upper equal-tail point, at or above zero.
  // Inverting SF directly avoids 1-p rounding to one for tiny lower tails.
  if(model.sf(0)===p)return 0;
  let lo=0,hi=1;
  while(model.sf(hi)>p){lo=hi;hi*=2;if(!Number.isFinite(hi))return Infinity;}
  for(let i=0;i<120;i++){
    const mid=lo+(hi-lo)/2;
    if(mid===lo||mid===hi)break;
    if(model.sf(mid)>p)lo=mid;else hi=mid;
  }
  return lo+(hi-lo)/2;
}

export function tailSummary(kind,state){
  const model=distributionModel(kind,state),{alpha,tail,stat}=state;
  const left=model.cdf(stat),right=model.sf(stat);
  let p,critical,alphaAreas,pAreas;
  if(tail==='greater'){
    p=right;critical=[model.quantile(1-alpha)];alphaAreas=[[critical[0],Infinity]];pAreas=[[stat,Infinity]];
  }else if(tail==='less'){
    p=left;critical=[model.quantile(alpha)];alphaAreas=[[-Infinity,critical[0]]];pAreas=[[-Infinity,stat]];
  }else{
    p=Math.min(1,2*Math.min(left,right));
    critical=[model.quantile(alpha/2),model.quantile(1-alpha/2)];
    alphaAreas=[[-Infinity,critical[0]],[critical[1],Infinity]];
    // Equal-tail two-sided p: the observed tail plus an equally probable opposite tail.
    if(left<=right) pAreas=[[-Infinity,stat],[upperTailQuantile(model,left),Infinity]];
    else pAreas=[[-Infinity,model.quantile(right)],[stat,Infinity]];
  }
  return {p,critical,alphaAreas,pAreas,reject:p<=alpha};
}

function draw(svg,kind,state,result){
  const model=distributionModel(kind,state),left=kind==='t'?-state.xmax:0,right=state.xmax;
  const box={left:62,right:650,top:45,bottom:292,width:588,height:247};
  const X=x=>box.left+(x-left)/(right-left)*box.width;
  // Values above the visible y range stay outside the clip; they are not flattened.
  const Y=d=>Math.max(-2000,box.bottom-(d/state.ymax)*box.height);
  const at=x=>model.pdf(x);
  const points=(fn,lo,hi,count=600)=>{
    const positive=kind!=='t';
    return Array.from({length:count+1},(_,i)=>{
      const fraction=i/count;
      let x=lo+(hi-lo)*(positive&&lo===0?fraction*fraction:fraction);
      // Singular chi/F densities at zero are represented by their right-hand curve.
      if(positive&&x===0)x=Math.min(hi*1e-8,1e-8);
      const d=fn(x);
      return {x,d,y:Y(d)};
    }).filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
  };
  const curve=fn=>points(fn,left,right).map((p,i)=>`${i?'L':'M'}${point(X(p.x))},${point(p.y)}`).join(' ');
  const areaPath=(lo,hi)=>{
    lo=Math.max(left,lo);hi=Math.min(right,hi);
    if(!(lo<hi))return '';
    const vertices=points(at,lo,hi,240);
    if(!vertices.length)return '';
    return `M${point(X(lo))},${box.bottom} ${vertices.map(p=>`L${point(X(p.x))},${point(p.y)}`).join(' ')} L${point(X(hi))},${box.bottom} Z`;
  };
  const selectedAreas=state.area==='alpha'?result.alphaAreas:result.pAreas;
  const shaded=selectedAreas.map(([lo,hi])=>`<path class="${state.area==='alpha'?'dg-shade-alpha':'dg-shade-p'}" d="${areaPath(lo,hi)}"/>`).join('');
  const current=curve(model.pdf),reference=curve(model.reference);
  const criticalLines=result.critical.filter(c=>c>=left&&c<=right).map((c,i)=>{
    const labelY=state.tail==='two-sided'&&result.critical.length===2&&Math.abs(X(result.critical[1])-X(result.critical[0]))<115?64+i*23:65;
    return `<line class="dg-critical-line" x1="${X(c)}" x2="${X(c)}" y1="${box.top}" y2="${box.bottom}"/><text class="dg-critical-label" x="${X(c)}" y="${labelY}" text-anchor="middle">${fmt(c)}</text>`;
  }).join('');
  const observed=Math.max(left,Math.min(right,state.stat));
  const statOutside=state.stat<left||state.stat>right;
  const observedLine=`<line class="dg-observed-line" x1="${X(observed)}" x2="${X(observed)}" y1="${box.top+45}" y2="${box.bottom}"/><text class="dg-observed-label" x="${X(observed)}" y="27" text-anchor="${observed>right*.78?'end':observed<left*.78?'start':'middle'}">${statOutside?(state.stat<left?'← ':'→ '):''}${model.symbol} = ${fmt(state.stat)}</text>`;
  const xTicks=kind==='t'?[-state.xmax,-state.xmax/2,0,state.xmax/2,state.xmax]:Array.from({length:6},(_,i)=>left+(right-left)*i/5);
  const yTicks=[0,.5,1].map(f=>state.ymax*f);
  const axes=`<line class="dg-axis-line" x1="${box.left}" x2="${box.right}" y1="${box.bottom}" y2="${box.bottom}"/><line class="dg-axis-line" x1="${box.left}" x2="${box.left}" y1="${box.top}" y2="${box.bottom}"/>${xTicks.map(x=>`<line class="dg-axis-line" x1="${X(x)}" x2="${X(x)}" y1="${box.bottom}" y2="${box.bottom+6}"/><text class="dg-tick" x="${X(x)}" y="${box.bottom+25}" text-anchor="middle">${fmt(x,1)}</text>`).join('')}${yTicks.map(d=>`<text class="dg-tick" x="${box.left-9}" y="${Y(d)+5}" text-anchor="end">${fmt(d,2)}</text>`).join('')}<text class="dg-axis-title dg-y-title" x="15" y="174" text-anchor="middle" transform="rotate(-90 15 174)">확률밀도 (Probability Density)</text><text class="dg-axis-title" x="356" y="345" text-anchor="middle">${model.symbol} · 검정통계량 (Test Statistic)</text>`;
  const clip=`dg-clip-${kind}`;
  svg.setAttribute('viewBox','0 0 700 360');
  svg.setAttribute('data-domain-min',left);svg.setAttribute('data-domain-max',right);svg.setAttribute('data-ymax',state.ymax);
  svg.innerHTML=`<title>${esc(model.name)} 자유도 비교</title><desc>${esc(model.name)}. ${kind==='f'?`분자 자유도 ${state.df1}, 분모 자유도 ${state.df2}`:`자유도 ${state.df}`}. 관측 통계량 ${state.stat}, p값 ${result.p}. 점선은 고정된 기준 분포입니다. 표시 범위 밖의 꼬리는 수치 확률 계산에 포함합니다.</desc><defs><clipPath id="${clip}"><rect x="${box.left}" y="${box.top}" width="${box.width}" height="${box.height}"/></clipPath></defs>${axes}<g clip-path="url(#${clip})">${shaded}<path class="dg-reference-curve" d="${reference}"/><path class="dg-density" d="${current}"/>${criticalLines}</g>${observedLine}`;
  // Explicit finite-window coverage and singular-density reporting protect interpretation.
  const mass=Math.max(0,Math.min(1,model.cdf(right)-model.cdf(left)));
  const criticalOutside=result.critical.filter(c=>c<left||c>right);
  const sampled=points(at,left,right);
  const clippedTop=sampled.some(p=>p.d>state.ymax);
  const singular=(kind==='chi'&&state.df<2)||(kind==='f'&&state.df1<2);
  const notes=[`축 고정: x ${fmt(left)}~${fmt(right)}, 밀도 0~${fmt(state.ymax)}. 표시 범위 밖의 확률은 ${prob(1-mass)}입니다.`];
  if(statOutside)notes.push(`관측값 ${fmt(state.stat)}은 가로축 밖이며, 파란 화살표로 방향을 표시했습니다.`);
  if(criticalOutside.length)notes.push(`임계값 ${criticalOutside.map(c=>fmt(c)).join(', ')}은 가로축 밖입니다. 축 범위 조절에서 넓힐 수 있습니다.`);
  if(singular)notes.push('원점에서 밀도가 무한대로 발산합니다. 양의 x에서 곡선을 시작하며 세로축 위쪽 부분은 잘립니다.');
  else if(clippedTop)notes.push('현재 곡선의 봉우리가 세로축 밖입니다. 축 범위 조절에서 밀도 최댓값을 높이면 전체 봉우리를 볼 수 있습니다.');
  return notes.join(' ');
}

function mountPanel(panel){
  const kind=panel.dataset.distribution,state={...DEFAULTS[kind]};
  // Keep the two defining controls next to the mobile plot. The additional
  // test/axis controls remain available in an ordinary keyboardable disclosure.
  const controls=panel.querySelector('.dg-controls');
  const extra=document.createElement('details');extra.className='dg-advanced';
  const extraSummary=document.createElement('summary');
  extraSummary.textContent='검정·면적·축 설정 더 보기';
  const extraGrid=document.createElement('div');extraGrid.className='dg-advanced-grid';
  [...controls.children].slice(2).forEach(control=>extraGrid.append(control));
  extra.append(extraSummary,extraGrid);controls.append(extra);
  const desktop=window.matchMedia('(min-width:751px)');
  const adapt=()=>{extra.open=desktop.matches;};
  adapt();desktop.addEventListener('change',adapt);
  const output=(name,value)=>{panel.querySelector(`[data-output="${name}"]`).textContent=value;};
  const sync=(name,active=null)=>{
    panel.querySelectorAll(`[data-number="${name}"],[data-range="${name}"],[data-select="${name}"],[data-number-select="${name}"]`).forEach(input=>{if(input!==active)input.value=state[name];});
  };
  const render=()=>{
    const result=tailSummary(kind,state),model=distributionModel(kind,state);
    output('stat',fmt(state.stat));output('p',prob(result.p));output('critical',result.critical.map(x=>fmt(x)).join(' / '));
    const direction=state.tail==='two-sided'?'양측 등꼬리':state.tail==='less'?'왼쪽 꼬리':'오른쪽 꼬리';
    output('area-note',state.area==='alpha'?`주황 기각역: ${direction} 면적의 합 α = ${prob(state.alpha)}${state.tail==='two-sided'?` (각 꼬리 ${prob(state.alpha/2)})`:''}.`:`초록 p값 영역: ${direction}에서 관측값 이상으로 극단적인 결과의 확률 p = ${prob(result.p)}. 전체 확률은 화면 밖 꼬리까지 포함합니다.`);
    output('decision',`p = ${prob(result.p)} ${result.reject?'≤':'>'} α = ${prob(state.alpha)} → 귀무가설을 ${result.reject?'기각합니다 (Reject H₀).':'기각하지 못합니다 (Fail to Reject H₀).'} 자유도는 ${kind==='f'?`분자 ${state.df1}, 분모 ${state.df2}`:state.df}입니다.`);
    output('axis-note',draw(panel.querySelector('svg'),kind,state,result));
    panel.querySelector('svg').setAttribute('data-p-value',result.p);
    panel.querySelector('svg').setAttribute('data-df',kind==='f'?`${state.df1},${state.df2}`:state.df);
  };
  panel.querySelectorAll('[data-number],[data-range]').forEach(input=>input.addEventListener('input',()=>{
    if(input.value===''||!input.checkValidity())return;
    const name=input.dataset.number||input.dataset.range;
    state[name]=+input.value;sync(name,input);render();
  }));
  panel.querySelectorAll('[data-select],[data-number-select]').forEach(input=>input.addEventListener('change',()=>{
    const name=input.dataset.select||input.dataset.numberSelect;
    state[name]=input.dataset.numberSelect?+input.value:input.value;sync(name,input);render();
  }));
  panel.querySelector('[data-reset]').addEventListener('click',()=>{
    Object.assign(state,DEFAULTS[kind]);Object.keys(state).forEach(name=>sync(name));render();
  });
  render();
}

export function initializeDistributions(root=document){
  const panels=root.querySelectorAll('[data-distribution]');
  panels.forEach(mountPanel);
  const status=root.querySelector('#dg-status');
  if(status)status.textContent='그래프가 준비됐습니다. 자유도와 관측값을 바꾸면 곡선·임계값·p값이 즉시 바뀝니다.';
}
if(typeof document!=='undefined')initializeDistributions();
