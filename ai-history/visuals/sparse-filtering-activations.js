/* Sparse Filtering: a bounded, deterministic objective calculation, not a corpus experiment. */
(function(){
  'use strict';
  const clone=v=>JSON.parse(JSON.stringify(v)),finite=v=>typeof v==='number'&&Number.isFinite(v),obj=v=>v&&typeof v==='object'&&!Array.isArray(v),txt=v=>typeof v==='string'&&v.trim().length>0;
  const dense=(v,n)=>Array.isArray(v)&&v.length>0&&v.length<=n&&Array.from(v).every(x=>x!==undefined);
  const check=v=>{if(!finite(v))throw new RangeError('Calculated value is not finite.');return v;};
  const dot=(a,b)=>check(a.reduce((s,v,i)=>s+v*b[i],0)),norm=a=>check(Math.hypot(...a));
  function read(o,extra=[]){
    if(!obj(o)||Reflect.ownKeys(o).some(k=>!['X','W',...extra].includes(k))||!dense(o.X,8)||!dense(o.X[0],16)||!dense(o.W,8))throw new TypeError('Provide bounded X and W matrices.');
    const D=o.X.length,M=o.X[0].length,F=o.W.length;
    const matrix=(v,r,c)=>{if(!dense(v,r)||v.length!==r||v.some(row=>!dense(row,c)||row.length!==c||!row.every(finite)))throw new TypeError('Finite rectangular matrices required.');return v.map(row=>row.slice());};
    return{X:matrix(o.X,D,M),W:matrix(o.W,F,D),D,M,F};
  }
  function run(s){
    const Z=s.W.map(w=>Array.from({length:s.M},(_,i)=>dot(w,s.X.map(row=>row[i])))),F=Z.map(row=>row.map(z=>check(Math.sqrt(check(z*z+1e-8))))),rowNorms=F.map(norm),rowNormalized=F.map((row,j)=>row.map(v=>v/rowNorms[j]));
    const columnNorms=Array.from({length:s.M},(_,i)=>norm(rowNormalized.map(row=>row[i]))),normalized=rowNormalized.map(row=>row.map((v,i)=>v/columnNorms[i])),costs=Array.from({length:s.M},(_,i)=>check(normalized.reduce((sum,row)=>sum+row[i],0))),loss=check(costs.reduce((a,b)=>a+b,0));
    return{Z,F,rowNorms,rowNormalized,columnNorms,normalized,costs,loss,epsilon:1e-8};
  }
  function differentiate(s){
    const f=run(s),dT=f.normalized.map(row=>row.map((a,i)=>(1-a*f.costs[i])/f.columnNorms[i])),dF=dT.map((row,j)=>{const projection=dot(row,f.rowNormalized[j]);return row.map((v,i)=>(v-f.rowNormalized[j][i]*projection)/f.rowNorms[j]);}),dZ=dF.map((row,j)=>row.map((v,i)=>check(v*f.Z[j][i]/f.F[j][i]))),gradient=dZ.map(row=>s.X.map(x=>dot(row,x)));
    return{forward:f,gradient};
  }
  function forward(o){return clone(run(read(o)));}
  function gradient(o){return clone(differentiate(read(o)));}
  function step(o){
    const s=read(o,['learningRate']);if(!finite(o.learningRate)||o.learningRate<=0||o.learningRate>1)throw new TypeError('Learning rate must be in (0,1].');
    const g=differentiate(s);let rate=o.learningRate,W=s.W.map(r=>r.slice()),after=g.forward,accepted=false,attempts=0;
    for(;attempts<16;attempts++,rate/=2){const candidate=s.W.map((row,j)=>row.map((v,k)=>check(v-rate*g.gradient[j][k]))),result=run({...s,W:candidate});if(result.loss<g.forward.loss-1e-12){W=candidate;after=result;accepted=true;attempts++;break;}}
    return clone({W,before:g.forward,after,gradient:g.gradient,accepted,learningRate:accepted?rate:0,attempts});
  }
  window.AtlasSparseFilteringModel=Object.freeze({forward,gradient,step});

  const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svg=(tag,a={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(a))n.setAttribute(k,String(v));if(tag==='svg'&&typeof a.viewBox==='string'){const nativeWidth=Number(a.viewBox.trim().split(/[\s,]+/)[2]);if(Number.isFinite(nativeWidth)&&nativeWidth>0)n.style.minWidth=nativeWidth+'px';}if(value!==undefined)n.textContent=value;return n;};
  const fmt=(v,n=4)=>v.toFixed(n),source=s=>obj(s)&&txt(s.title)&&typeof s.url==='string'&&/^https:\/\//.test(s.url);
  function validate(c){
    if(!obj(c)||!dense(c.stages,3)||c.stages.length!==3||!['respond','balance','compete'].every(id=>c.stages.some(s=>s.id===id&&txt(s.label)&&txt(s.text)))||!source(c.source)||!txt(c.scope)||!obj(c.example))throw new TypeError('Sourced stages and an example required.');
    const e=c.example;if(!dense(e.samples,16)||!e.samples.every(txt)||!dense(e.features,8)||!e.features.every(txt)||!dense(e.presets,8)||!e.presets.every(p=>txt(p.id)&&txt(p.label)&&txt(p.explanation))||!e.presets.some(p=>p.id===e.initialPreset)||new Set(e.presets.map(p=>p.id)).size!==e.presets.length||!dense(e.gains,8)||!e.gains.every(v=>finite(v)&&v>0&&v<=10)||!e.gains.includes(e.initialGain)||!txt(e.scope))throw new TypeError('Invalid fixture controls.');
    for(const p of e.presets){const f=forward({X:e.X,W:p.W});if(f.F.length!==2||f.F.length!==e.features.length||e.X[0].length!==e.samples.length||e.X.length!==2)throw new TypeError('This view uses two features and two input components.');}
    if(c.originalImage&&(!/^[\w.-]+\.png$/.test(c.originalImage.src)||!['title','caption','credit','alt'].every(k=>txt(c.originalImage[k]))||!source(c.originalImage.source)))throw new TypeError('Original diagram provenance required.');
  }
  window.AtlasVisuals.register('sparse-filtering-activations',{
    mount(host,c){
      validate(c);const e=c.example,root=el('div','sparse-filtering-activations'),off=[],buttons=[],controls={},panels={};let disposed=false,stage='respond',preset=e.initialPreset,gain=e.initialGain,sample=0,updated=false,current,W,update;
      const listen=(n,t,fn)=>{n.addEventListener(t,fn);off.push(()=>n.removeEventListener(t,fn));};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const pane=(node,label,cls='sf-svg-viewport')=>{const p=el('div',cls);p.tabIndex=0;p.setAttribute('role','group');p.setAttribute('aria-label',label);p.append(node);return p;};
      const link=s=>{const a=el('a','sf-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const details=(title,body)=>{const d=el('details','sf-details');d.append(el('summary','',title),body);return d;};
      const select=(label,options,key,change)=>{const field=el('label','sf-field'),n=el('select');field.append(el('span','',label),n);n.dataset.control=key;for(const[v,t]of options){const o=el('option','',t);o.value=String(v);n.append(o);}controls[key]=n;listen(n,'change',()=>{change(n.value);updated=false;render();});return field;};
      const nav=el('div','sf-stage-controls');nav.setAttribute('role','group');nav.setAttribute('aria-label','희소한 표현을 만드는 세 관점');const stageText=el('p','sf-stage-text');
      for(const s of c.stages){const b=button(s.label,nav,()=>{stage=s.id;renderStage();});b.dataset.stage=s.id;buttons.push(b);}
      const fields=el('div','sf-controls');fields.append(select('특징을 보는 방향',e.presets.map(p=>[p.id,p.label]),'preset',v=>preset=v),select('첫 특징의 크기',e.gains.map(v=>[v,v+'배']),'gain',v=>gain=Number(v)),select('집중해서 볼 입력',e.samples.map((v,i)=>[i,v]),'sample',v=>sample=Number(v)));
      const presetText=el('p','sf-prose');
      for(const id of ['respond','balance','compete'])panels[id]=el('section','sf-panel');
      const raw=el('div'),inputs=el('div'),balanced=el('div'),balanceNote=el('p','sf-prose'),competition=el('div'),geometry=el('div'),cost=el('p','sf-cost'),selected=el('p','sf-prose'),learning=el('div','sf-learning'),status=el('p','sf-status');
      panels.respond.append(el('h4','','먼저, 무엇에 반응하는가?'),el('p','sf-prose','입력마다 정답 이름을 달지 않고, 두 특징이 여섯 입력에 얼마나 반응하는지 살핍니다. 행은 한 특징의 여러 경험, 열은 한 입력을 함께 표현하는 특징들입니다.'),inputs,raw);
      panels.balance.append(el('h4','','늘 크게 반응하는 특징이 독점하지 않도록'),el('p','sf-prose','먼저 한 특징의 반응을 모든 입력에 걸쳐 묶어 길이를 구합니다. 그 길이로 같은 행 전체를 나누면, 특징마다 반응 크기의 출발선을 맞출 수 있습니다.'),balanced,balanceNote);
      const actions=el('div','sf-actions'),train=button('이 목적을 줄이는 방향으로 한 번 갱신',actions,()=>{updated=true;render();}),reset=button('시작 값으로 돌아가기',actions,()=>{updated=false;render();});train.dataset.action='step';reset.dataset.action='reset';
      learning.append(el('h5','','반응을 깎는 것이 아니라, 반응을 만드는 W를 바꾼다'),el('p','sf-note','두 정규화를 모두 거쳐 계산한 기울기로 W를 한 번 바꿉니다. 정해 둔 시작 보폭에서 최대 열여섯 번 줄이며, 목적값이 감소한 경우만 반영합니다. 원문의 L-BFGS 학습을 재현한 것은 아닙니다.'),actions,status);
      panels.compete.append(el('h4','','같은 길이에서, 적은 특징에 반응을 모은다'),el('p','sf-prose','각 입력의 특징 벡터를 길이 1로 맞춘 뒤 성분의 절댓값을 더합니다. 둘이 비슷하게 반응하면 합이 크고, 한쪽에 집중되면 작습니다. 모두를 0으로 만드는 지름길은 열 정규화가 막습니다.'),competition,cost,geometry,selected,learning);
      function table(matrix,extras,title){
        const block=el('div','sf-table-block'),t=el('table'),head=el('tr');for(const h of ['특징 / 입력',...e.samples,...extras.map(v=>v.label)])head.append(el('th','',h));const thead=el('thead');thead.append(head);t.append(thead);const body=el('tbody');
        matrix.forEach((row,j)=>{const tr=el('tr');tr.append(el('th','',e.features[j]));row.forEach((v,i)=>{const td=el('td','',fmt(v));td.dataset.value=String(v);td.classList.toggle('selected',i===sample);const max=Math.max(...matrix.flat(),1e-8);td.style.setProperty('--activity',String(v/max));tr.append(td);});for(const extra of extras)tr.append(el('td','',fmt(extra.values[j])));body.append(tr);});t.append(body);block.append(el('h5','',title),pane(t,title+'， 표를 좌우로 이동','sf-table-viewport'));return block;
      }
      function inputDiagram(){
        const s=svg('svg',{viewBox:'0 0 680 265',role:'img','aria-label':'두 입력 성분과 선택한 두 필터의 방향'}),origin=[115,217],scale=145;
        s.append(svg('path',{d:'M 70 217 L 290 217 M 115 235 L 115 27',class:'sf-axis'}),svg('text',{x:244,y:241,class:'sf-label'},'입력 성분 1'),svg('text',{x:35,y:21,class:'sf-label'},'입력 성분 2'));
        for(let i=0;i<e.samples.length;i++){const x=origin[0]+scale*e.X[0][i],y=origin[1]-scale*e.X[1][i];s.append(svg('circle',{cx:x,cy:y,r:i===sample?7:4,class:i===sample?'sf-selected-point':'sf-point'}),svg('text',{x:x+8,y:y+(i%2?15:-9),class:'sf-label'},'입력 '+(i+1)));}
        W.forEach((w,j)=>{const n=Math.hypot(...w),x=435+w[0]/n*115,y=180-w[1]/n*115;s.append(svg('path',{d:'M 435 180 L '+x+' '+y,class:'sf-filter-'+j}),svg('text',{x:340,y:215+j*22,class:'sf-label'},e.features[j]+' W=['+w.map(v=>fmt(v,3)).join(', ')+']'));});
        s.append(svg('text',{x:340,y:30,class:'sf-label'},'화살표는 방향, 아래 숫자는 실제 W'),svg('circle',{cx:435,cy:180,r:3,class:'sf-point'}));return s;
      }
      function circle(){
        const s=svg('svg',{viewBox:'0 0 410 345',role:'img','aria-label':'정규화된 두 특징의 단위원 위치와 L1 합'}),x=v=>58+270*v,y=v=>291-240*v;
        s.append(svg('path',{d:'M 46 291 L 355 291 M 58 305 L 58 26',class:'sf-axis'}),svg('path',{d:'M '+x(1)+' '+y(0)+' A 270 240 0 0 0 '+x(0)+' '+y(1),class:'sf-circle'}));
        for(const k of [1,1.2,Math.SQRT2]){const a=Math.max(0,k-1),b=Math.min(1,k);s.append(svg('path',{d:'M '+x(a)+' '+y(k-a)+' L '+x(b)+' '+y(k-b),class:'sf-level'}));}
        for(let i=0;i<e.samples.length;i++){const a=current.normalized[0][i],b=current.normalized[1][i];s.append(svg('circle',{cx:x(a),cy:y(b),r:i===sample?7:4,class:i===sample?'sf-selected-point':'sf-point'}));if(i===sample)s.append(svg('text',{x:95,y:328,class:'sf-label'},'선택한 입력: ('+fmt(a,3)+', '+fmt(b,3)+')'));}
        s.append(svg('text',{x:290,y:314,class:'sf-label'},'특징 1'),svg('text',{x:8,y:21,class:'sf-label'},'특징 2'),svg('text',{x:194,y:55,class:'sf-label'},'점선: 같은 L1 합'));return s;
      }
      function renderStage(){root.dataset.stage=stage;for(const b of buttons){const on=b.dataset.stage===stage;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}stageText.textContent=c.stages.find(s=>s.id===stage).text;for(const[k,p]of Object.entries(panels))p.hidden=k!==stage;}
      function render(){
        const p=e.presets.find(p=>p.id===preset),start=p.W.map((row,j)=>row.map(v=>v*(j===0?gain:1)));update=updated?step({X:e.X,W:start,learningRate:.2}):null;W=update?update.W:start;current=update?update.after:forward({X:e.X,W});
        controls.preset.value=preset;controls.gain.value=String(gain);controls.sample.value=String(sample);presetText.textContent=p.explanation;inputs.replaceChildren(pane(inputDiagram(),'입력과 특징 방향, 그림을 좌우로 이동'));raw.replaceChildren(table(current.F,[{label:'행 L2 길이',values:current.rowNorms}],'F · 입력과 W의 반응'));
        balanced.replaceChildren(table(current.rowNormalized,[{label:'제곱합',values:current.rowNormalized.map(r=>dot(r,r))}],'행 정규화 · 같은 특징의 여섯 반응을 묶는다'));balanceNote.textContent='행 정규화 뒤 각 행의 제곱합은 1입니다. 여섯 입력에서의 평균 제곱은 1/6입니다. 첫 특징의 크기를 바꿔 앞 단계와 비교해 보세요. ε 때문에 아주 작은 반응에서는 정확한 배율 불변이 아닙니다.';
        competition.replaceChildren(table(current.normalized,[],'열 정규화 · 한 입력의 두 반응을 묶는다'));cost.textContent='전체 L1 목적값 '+fmt(current.loss)+'   ·   입력당 평균 '+fmt(current.loss/e.samples.length);geometry.replaceChildren(pane(circle(),'각 입력의 두 특징 벡터와 단위원, 그림을 좌우로 이동'));selected.textContent=e.samples[sample]+': 정규화된 두 반응의 합은 '+fmt(current.costs[sample])+'. 두 특징일 때 한 입력의 합은 1 이상 √2 이하입니다. 길이는 같아도, 한쪽으로 모일수록 합은 작아집니다.';
        train.disabled=updated;reset.disabled=!updated;status.textContent=!updated?'아직 W를 바꾸지 않았습니다.':update.accepted?'목적값 '+fmt(update.before.loss)+' → '+fmt(update.after.loss)+'， 실제 보폭 '+fmt(update.learningRate)+'. 이 여섯 입력의 목적값 감소이며 인식 성능을 평가한 결과가 아닙니다.':'이 시작점에서는 설정한 탐색 안에서 감소를 찾지 못해 W를 유지했습니다. 최적 표현을 찾았다는 뜻은 아닙니다.';
        root.dataset.preset=preset;root.dataset.gain=String(gain);root.dataset.sample=String(sample);root.dataset.updated=String(updated);root.dataset.loss=String(current.loss);renderStage();
      }
      const original=el('div');if(c.originalImage){const v=c.originalImage,f=el('figure','sf-original'),img=el('img');window.AtlasPublicAssets.setSource(img,v.src);img.alt=v.alt;img.loading='lazy';const actions=el('div','sf-actions'),zoom=button('원문 크게 보기',actions,()=>{const on=f.classList.toggle('expanded');zoom.textContent=on?'화면 너비로 보기':'원문 크게 보기';zoom.setAttribute('aria-pressed',String(on));});zoom.dataset.action='zoom';zoom.setAttribute('aria-pressed','false');f.append(el('h5','',v.title),actions,pane(img,'원논문 도식, 확대 후 좌우로 이동','sf-original-viewport'),el('figcaption','',v.caption),el('p','sf-note',v.credit),link(v.source));original.append(f);}
      const scope=el('div');scope.append(el('p','sf-note',e.scope),el('p','sf-note',c.scope),link(c.source));root.append(nav,stageText,fields,presetText,...Object.values(panels),details('원논문 Fig.1과 함께 읽기',original),details('수치 계산의 범위와 전제',scope));render();host.append(root);return()=>{if(disposed)return;disposed=true;for(const fn of off)fn();root.remove();};
    }
  });
})();
