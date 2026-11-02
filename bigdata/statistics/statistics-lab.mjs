/* Local, seeded educational simulation. No network or progress storage. */
export function randomGenerator(seed=20261102){let state=seed>>>0;return()=>{state+=0x6D2B79F5;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
export const POPULATIONS={
 exponential:{label:'지수분포(Exponential Distribution)',mu:20,sigma:20,unit:'분',draw:r=>-20*Math.log1p(-r())},
 dice:{label:'이산균등분포(Discrete Uniform Distribution) · 공정한 주사위',mu:3.5,sigma:Math.sqrt(35/12),unit:'점',draw:r=>1+Math.floor(6*r())}
};
export function simulate(kind='exponential',n=1,repetitions=2000,seed=20261102){
 if(!POPULATIONS[kind]||![1,5,30,100].includes(n)||!Number.isInteger(repetitions)||repetitions<2)throw new Error('Invalid simulation conditions');
 const population=POPULATIONS[kind],r=randomGenerator(seed),raw=Array.from({length:repetitions},()=>population.draw(r));
 const means=[],meanRandom=randomGenerator(seed);
 for(let k=0;k<repetitions;k++){let sum=0;for(let j=0;j<n;j++)sum+=population.draw(meanRandom);means.push(sum/n)}
 const se=population.sigma/Math.sqrt(n),z=means.map(x=>(x-population.mu)/se);
 return {kind,n,repetitions,seed,mu:population.mu,sigma:population.sigma,se,raw,means,z};
}
const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
const fixed=x=>Number(x.toFixed(2)).toLocaleString('ko-KR');
const normal=x=>Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);
const svgNS='http://www.w3.org/2000/svg';
function element(name,attrs={},content){const e=document.createElementNS(svgNS,name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));if(content!==undefined)e.textContent=content;return e}
export function histogram(values,lower,upper,bins){
 const counts=Array(bins).fill(0),width=(upper-lower)/bins;let outside=0;
 for(const v of values){if(v<lower||v>upper){outside++;continue}counts[Math.min(bins-1,Math.floor((v-lower)/width))]++}
 return {counts,densities:counts.map(c=>c/(values.length*width)),width,outside};
}
function chart(target,values,{lower,upper,bins=28,color='#357b70',title,xLabel,normalCurve=false,center}){
 const h=histogram(values,lower,upper,bins),W=720,H=330,left=72,right=25,top=24,bottom=65,pw=W-left-right,ph=H-top-bottom;
 const max=Math.max(...h.densities,normalCurve?normal(0):0)*1.15||1;
 const x=v=>left+(v-lower)/(upper-lower)*pw,y=v=>top+ph-v/max*ph;
 const svg=element('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':title});
 const desc=element('desc',{},title+' 가로축은 '+xLabel+'이며 세로축은 확률밀도(Probability Density)입니다.');svg.append(desc);
 for(let k=0;k<=3;k++){const v=max*k/3;svg.append(element('line',{x1:left,y1:y(v),x2:W-right,y2:y(v),stroke:'#dce5df','stroke-width':1}));svg.append(element('text',{x:left-10,y:y(v)+7,'text-anchor':'end',class:'clt-axis'},fixed(v)))}
 h.densities.forEach((v,i)=>svg.append(element('rect',{x:x(lower+i*h.width)+.5,y:y(v),width:pw/bins-1,height:ph-(y(v)-top),fill:color,opacity:.78})));
 if(normalCurve){let path='';for(let j=0;j<=160;j++){const v=lower+(upper-lower)*j/160;path+=(j?'L':'M')+x(v)+','+y(normal(v))}svg.append(element('path',{d:path,fill:'none',stroke:'#bc693d','stroke-width':4,'stroke-dasharray':'9 6'}))}
 if(center!==undefined&&center>=lower&&center<=upper)svg.append(element('line',{x1:x(center),x2:x(center),y1:top,y2:top+ph,stroke:'#223a4d','stroke-width':2,'stroke-dasharray':'5 6'}));
 svg.append(element('line',{x1:left,y1:top+ph,x2:W-right,y2:top+ph,stroke:'#688176','stroke-width':2}));
 for(let j=0;j<=4;j++){const value=lower+(upper-lower)*j/4;svg.append(element('text',{x:x(value),y:H-bottom+31,'text-anchor':'middle',class:'clt-axis'},fixed(value)))}
 svg.append(element('text',{x:left+pw/2,y:H-7,'text-anchor':'middle',class:'clt-axis'},xLabel));target.replaceChildren(svg);
 return h;
}
function mount(root){
 const select=root.querySelector('[data-clt-population]'),buttons=[...root.querySelectorAll('[data-clt-n]')];let n=1;
 const render=()=>{
  const p=POPULATIONS[select.value],s=simulate(select.value,n),seLabel=fixed(s.se)+' '+p.unit;
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.cltN)===n)));
  root.querySelector('[data-clt-count]').textContent=String(n);
  root.querySelector('[data-clt-se]').textContent=seLabel;
  root.querySelector('[data-clt-mean]').textContent=fixed(s.mu)+' '+p.unit;
  root.querySelector('[data-clt-observed]').textContent=fixed(mean(s.means))+' '+p.unit;
  root.querySelector('[data-clt-population-name]').textContent=p.label+' · 모표준편차(Population Standard Deviation) σ='+fixed(s.sigma)+' '+p.unit;
  // Both raw-scale charts share a range; no zoom can suggest a false change in width.
  const upper=select.value==='dice'?6.5:Math.ceil(Math.max(...s.raw)/20)*20,lower=select.value==='dice'?.5:0;
  chart(root.querySelector('[data-clt-original]'),s.raw,{lower,upper,bins:select.value==='dice'?6:36,title:'개별 관측의 원자료 분포: '+p.label,xLabel:'개별 값 ('+p.unit+')',center:s.mu});
  chart(root.querySelector('[data-clt-means]'),s.means,{lower,upper,bins:n===1?(select.value==='dice'?6:36):(select.value==='dice'?30:60),color:'#ba704c',title:n+'개씩 평균낸 표본평균의 분포',xLabel:'표본평균 ('+p.unit+')',center:s.mu});
  const standardized=chart(root.querySelector('[data-clt-standardized]'),s.z,{lower:-4,upper:6,bins:42,title:'표준화한 표본평균과 표준정규분포 비교',xLabel:'표준화한 값 Z (단위 없음)',normalCurve:true,center:0});
  root.querySelector('[data-clt-tail]').textContent=standardized.outside?'표준화 그림의 −4~6 범위 밖 '+standardized.outside+'개는 막대에서만 생략했습니다. 평균 계산에는 모두 포함했습니다.':'표준화 그림에는 반복한 평균 2,000개가 모두 표시되어 있습니다.';
  root.querySelector('[data-clt-summary]').textContent=n===1?'n=1이면 평균 하나가 원자료 한 값과 같습니다. 아직 정규분포(Normal Distribution) 모양이 아니어도 자연스럽습니다.':`n=${n}개씩 평균내도 원자료의 모집단(Population)은 바뀌지 않습니다. 평균의 표준오차(SE, Standard Error)는 ${seLabel}입니다. 표준화한 평균의 막대와 정규분포의 점선을 비교해 보세요.`;
  root.dataset.ready='true';
 };
 select.addEventListener('change',render);buttons.forEach(b=>b.addEventListener('click',()=>{n=Number(b.dataset.cltN);render()}));render();
}
if(typeof document!=='undefined'){
 for(const toc of document.querySelectorAll('.statistics-toc-panel'))if(matchMedia('(max-width:760px)').matches)toc.open=false;
 for(const root of document.querySelectorAll('[data-clt-lab]'))mount(root);
}
