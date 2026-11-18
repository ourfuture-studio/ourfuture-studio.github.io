/* Four views connect the original model figure to independently authored numbers. */
(function(){
  'use strict';
  const n=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const s=(tag,attrs={},text)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e;};
  const fixed=x=>Number(x).toFixed(1);
  const button=(text,fn,id)=>{const b=n('button','',text);b.type='button';if(id)b.dataset.deepControl=id;b.addEventListener('click',fn);return b;};
  function svg(label,w=760,h=320){const g=s('svg',{viewBox:`0 0 ${w} ${h}`,role:'img','aria-label':label});g.append(s('title',{},label));return g;}
  function line(g,x1,y1,x2,y2,cls='deep-edge'){g.append(s('path',{d:`M${x1},${y1}L${x2},${y2}`,class:cls}));}
  function text(g,x,y,value,cls='deep-svg-text',anchor='start'){g.append(s('text',{x,y,class:cls,'text-anchor':anchor},value));}
  function path(g,values,x,y,cls){let d='',open=false;values.forEach((v,i)=>{if(v===null){open=false;return;}d+=(open?'L':'M')+x(i)+','+y(v);open=true;});g.append(s('path',{d,class:cls}));}
  function block(title,copy){const b=n('section','deep-block');b.append(n('h5','',title));if(copy)b.append(n('p','',copy));return b;}
  function slider(label,min,max,step,value,changed,id){const box=n('label','deep-slider'),top=n('span'),out=n('output','',String(value)),input=n('input');top.append(n('span','',label),out);input.type='range';input.min=min;input.max=max;input.step=step;input.value=value;input.dataset.deepControl=id;input.addEventListener('input',()=>{out.value=input.value;out.textContent=input.value;changed(Number(input.value));});box.append(top,input);return box;}
  function viewport(g,label){const v=n('div','deep-viewport');v.tabIndex=0;v.setAttribute('role','region');v.setAttribute('aria-label',label+' · 그림 안에서 가로 이동');v.append(g);return v;}
  function table(headers,rows){const wrap=n('div','deep-table-wrap');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','단계별 계산값 · 좁은 화면에서는 가로 이동');const t=n('table'),thead=n('thead'),tr=n('tr');for(const h of headers){const th=n('th','',h);th.scope='col';tr.append(th);}thead.append(tr);const tbody=n('tbody');for(const cells of rows){const row=n('tr');for(const c of cells)row.append(n('td','',String(c)));tbody.append(row);}t.append(thead,tbody);wrap.append(t);return wrap;}
  function mount(host){
    const core=window.AtlasAmazonDeepARCore;if(!core)throw new Error('DeepAR calculation core required.');
    const root=n('div','amazon-deepar'),nav=n('nav','deep-nav'),body=n('div','deep-body'),live=n('p','deep-live');
    nav.setAttribute('aria-label','DeepAR의 네 관점');live.setAttribute('role','status');live.setAttribute('aria-live','polite');live.setAttribute('aria-atomic','true');
    const stages=['01 여러 이력이 배우는 규칙','02 한 숫자에서 분포로','03 관측값과 샘플의 차이','04 여러 미래와 분위수'];
    let stage=0,shared=true,selected='c',distribution='gaussian',mu=11,sigma=1.6,alpha=.2,mode='training',step=1,seed=7;
    const announce=value=>{live.textContent=value;};
    for(let i=0;i<stages.length;i++){const b=button(stages[i],()=>{stage=i;render();announce(stages[i]+' 화면을 표시했습니다.');},'stage-'+i);b.dataset.deepStage=i;nav.append(b);}
    root.append(nav,n('p','deep-scope','직접 정한 작은 사례 · 원논문 도판과 별도로 만든 그림입니다. 수치 계산은 가우시안 자기회귀식이며, LSTM을 학습한 결과가 아닙니다.'),body,live);host.append(root);
    function render(){root.dataset.deepStage=stage;for(const b of nav.children)b.setAttribute('aria-pressed',String(Number(b.dataset.deepStage)===stage));body.replaceChildren();[sharing,density,feedback,paths][stage]();}
    function sharing(){
      body.append(n('h4','','서로 다른 이력, 함께 학습하는 연결값'),n('p','deep-prose','시계열을 한 줄로 붙이거나 값을 합치는 대신, 각 이력의 상태를 따로 만들면서 같은 갱신 규칙을 배운다. 짧은 이력은 관련 대상에서 배운 패턴을 활용할 수 있다.'));
      const controls=n('div','deep-options'),diagram=n('div','deep-sharing'),detail=n('div','deep-callout');
      const choices=[button('공유 모형 · 같은 Θ',()=>{shared=true;update();},'sharing-common'),button('대상별 모형 · 서로 다른 Θ',()=>{shared=false;update();},'sharing-separate')];controls.append(...choices);body.append(controls,diagram,detail);
      function update(){const active=document.activeElement?.dataset.deepControl;choices.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0?shared:!shared)));diagram.replaceChildren();diagram.dataset.deepSharing=shared?'shared':'separate';
        const inputs=n('div','deep-series-list'),middle=n('div','deep-model-column'),outputs=n('div','deep-series-list');
        for(const item of core.series){
          const b=button('',()=>{selected=item.id;update();announce('선택한 시계열: '+item.label);},'series-'+item.id);b.className='deep-series';b.setAttribute('aria-pressed',String(selected===item.id));b.append(n('strong','',item.label),n('span','',`규모 ÷${item.scale}로 그린 패턴`));
          const g=svg(item.label+'의 직접 정한 이력',220,72);path(g,item.values.map(v=>v===null?null:v/item.scale),i=>8+i*15,v=>65-v*3,'deep-history');b.append(g);inputs.append(b);
          const out=n('div','deep-output'+(selected===item.id?' is-selected':''));out.append(n('strong','',`개별 상태 h${item.id.toUpperCase()}`),n('span','',shared?'같은 Θ + 자기 이력 → 자기 분포':'자기 Θ + 자기 이력 → 자기 분포'));outputs.append(out);
        }
        if(shared){const model=n('div','deep-model');model.append(n('span','deep-eyebrow','공유하는 것'),n('strong','','RNN · Θ'),n('p','','A·B·C에서 받은 학습 신호로 같은 연결값을 조정'));middle.append(model);}else for(const item of core.series){const model=n('div','deep-model deep-model-small');model.append(n('strong','','RNN · Θ'+item.id.toUpperCase()),n('p','','이 대상의 이력으로 학습'));middle.append(model);}
        diagram.append(inputs,middle,outputs);const item=core.series.find(x=>x.id===selected);detail.replaceChildren(n('strong','','선택한 시계열: '+item.label),n('p','',shared?'공유 Θ는 같아도, 입력 이력과 상태 h는 대상마다 다릅니다. 공통 패턴의 활용 가능성을 보여 주는 구조도이며 여기서 학습 전후의 정확도를 계산하지 않습니다.':'각 모형은 자기 시계열의 이력만으로 연결값을 추정합니다. 이 비교는 정보 공유의 구조를 구분하며, 개별 모형이 모든 상황에서 불리하다는 성능 비교가 아닙니다.'));if(active?.startsWith('series-'))diagram.querySelector('[data-deep-control="'+active+'"]')?.focus({preventScroll:true});
      }
      update();body.append(n('p','deep-source-note','원문 위치 · v1 PDF 2쪽 §2, 3쪽 §3·Figure 2, 4쪽 §3.4. 위 3개 시계열은 직접 정했습니다. 규모 차이를 보이도록 나눈 그림이 원논문의 전체 재척도화 절차는 아닙니다.'));
    }
    function density(){
      body.append(n('h4','','내일 “11”이라는 말에, 얼마나 흔들릴지도 더하다'),n('p','deep-prose','RNN의 상태는 다음 값 자체가 아니라 분포를 정하는 수로 바뀐다. 실수에는 연속 밀도를, 개수에는 0·1·2…의 확률을 사용할 수 있다. 아래 값은 신경망이 배운 출력 대신 직접 조절한다.'));
      const controls=n('div','deep-options'),sliders=n('div','deep-sliders'),plot=n('div','deep-density'),result=n('div','deep-callout');
      const choices=[button('가우시안 · 실수 값',()=>{distribution='gaussian';renderDensity();},'density-gaussian'),button('음이항 · 개수',()=>{distribution='negative-binomial';renderDensity();},'density-count')];controls.append(...choices);body.append(controls,sliders,plot,result);
      function renderDensity(){choices.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0?distribution==='gaussian':distribution!=='gaussian')));sliders.replaceChildren(slider('평균 μ',6,16,.5,mu,v=>{mu=v;draw();},'mean'),distribution==='gaussian'?slider('표준편차 σ',.6,3.4,.2,sigma,v=>{sigma=v;draw();},'sigma'):slider('분산을 키우는 α',.05,.8,.05,alpha,v=>{alpha=v;draw();},'alpha'));draw();}
      function draw(){plot.replaceChildren();const isGaussian=distribution==='gaussian',g=svg(isGaussian?'직접 정한 가우시안 확률밀도':'직접 정한 음이항 확률질량',760,300),left=55,right=720,bottom=245,top=35,maxX=isGaussian?24:40;
        const points=isGaussian?Array.from({length:241},(_,i)=>({x:i/10,p:core.gaussianPDF(i/10,mu,sigma)})):core.negativeBinomial(mu,alpha,40).map((p,x)=>({x,p}));const maxP=Math.max(...points.map(p=>p.p))*1.12,x=v=>left+v/maxX*(right-left),y=v=>bottom-v/maxP*(bottom-top);
        line(g,left,bottom,right,bottom);line(g,left,top,left,bottom);for(let v=0;v<=maxX;v+=isGaussian?4:5)text(g,x(v),270,String(v),'deep-svg-small','middle');text(g,left,20,isGaussian?'확률밀도 · 높이 자체가 한 값의 확률은 아님':'확률질량 · 각 막대가 그 개수의 확률');
        if(isGaussian){path(g,points.map(p=>p.p),i=>x(points[i].x),y,'deep-density-line');}else for(const p of points)g.append(s('rect',{x:x(p.x)-4,y:y(p.p),width:8,height:bottom-y(p.p),class:'deep-pmf-bar'}));
        line(g,x(mu),30,x(mu),bottom,'deep-dashed');text(g,x(mu)+8,48,'μ = '+fixed(mu),'deep-svg-text');plot.append(g);
        result.replaceChildren(n('strong','',isGaussian?`μ=${fixed(mu)}, σ=${fixed(sigma)} → 분산 ${fixed(sigma*sigma)}`:`μ=${fixed(mu)}, α=${alpha.toFixed(2)} → 분산 ${fixed(mu+alpha*mu*mu)}`),n('p','',isGaussian?'평균을 유지하고 σ를 키우면 같은 중심에서 가능한 값이 더 넓게 퍼집니다. 가우시안은 음수도 가능한 실수 분포입니다. 판매 “개수”에 그대로 붙여 쓰지 않도록 아래 음이항 보기와 구분하세요.':'평균이 같아도 α가 커지면 분산이 커집니다. 막대는 비음수 정수의 확률이며, 40보다 큰 꼬리도 존재합니다. 오른쪽에서 잘랐다고 남은 막대를 다시 정규화하지 않았습니다.'));
        root.dataset.deepDistribution=distribution;
      }
      renderDensity();body.append(n('p','deep-source-note','원문 위치 · v1 §§3.1–3.2, PDF 3–4쪽. 분포의 가정과 학습된 예측의 보정 성능은 별도 문제입니다.'));
    }
    function feedback(){
      body.append(n('h4','','학습은 관측값으로, 예측은 뽑은 값으로 다음 칸을 연다'),n('p','deep-prose','원도판의 아래 입력 z와 위의 samples를 연결해 보자. 학습 구간의 정답은 과거에 관찰한 값이다. 실제 미래 예측에서는 그 값을 알 수 없어 직전에 뽑은 샘플을 넣는다.'));
      const controls=n('div','deep-options'),figure=n('div'),rows=n('div'),detail=n('div','deep-callout');
      const choices=[button('학습 · 관측값 입력',()=>{mode='training';update();},'feedback-training'),button('예측 · 샘플 입력',()=>{mode='rollout';update();},'feedback-rollout')];controls.append(...choices);
      const steps=n('div','deep-steps');steps.setAttribute('role','group');steps.setAttribute('aria-label','확인할 예측 단계');for(let i=1;i<=6;i++)steps.append(button(i+'번째',()=>{step=i;update();},'step-'+i));body.append(controls,steps,figure,detail,rows);
      function update(){choices.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0?mode==='training':mode==='rollout')));for(const b of steps.children)b.setAttribute('aria-pressed',String(b.dataset.deepControl==='step-'+step));const trajectory=core.trajectory({sigma,seed,mode}),r=trajectory[step-1],g=svg('선택한 단계의 입력과 다음 값의 분포',780,275);
        for(const[x,label,value]of[[20,'이전 값',fixed(r.previous)],[215,'공유 갱신 규칙','Θ는 고정'],[410,'다음 값의 분포','μ '+fixed(r.mu)],[605,mode==='training'?'관측한 정답':'뽑은 샘플',fixed(mode==='training'?r.actual:r.sample)]]){g.append(s('rect',{x,y:80,width:150,height:80,rx:10,class:'deep-node'}));text(g,x+75,108,label,'deep-svg-small','middle');text(g,x+75,138,value,'deep-svg-value','middle');if(x<605){line(g,x+150,120,x+190,120);text(g,x+175,115,'→','deep-svg-text','middle');}}
        text(g,290,40,'이전 상태 h + 알려진 특징 x = '+r.knownFeature,'deep-svg-small','middle');line(g,290,47,290,80);g.append(s('path',{d:'M680,165V207H95V165',class:'deep-feedback'}));text(g,390,232,mode==='training'?'다음 단계에는 관측한 실제 값을 넣는다':'다음 단계에는 이 샘플을 넣는다','deep-svg-text','middle');figure.replaceChildren(viewport(g,'관측값과 샘플 되먹임'));
        detail.replaceChildren(n('strong','',`${step}번째 · 이전 입력 ${fixed(r.previous)} → 평균 ${fixed(r.mu)}`),n('p','',mode==='training'?`이 구간은 이미 관찰한 과거입니다. 실제 정답 ${fixed(r.actual)}에 대한 음의 로그 우도는 ${r.nll.toFixed(3)}입니다. 그 오차로 분포와 RNN의 연결값을 조정하는 것이 논문의 학습이며, 이 작은 화면은 연결값을 업데이트하지 않습니다.`:`평균을 그대로 다음 입력으로 고정하지 않고 ${fixed(r.sample)}을 뽑았습니다. 이 값이 다음 단계의 평균에도 영향을 줍니다. 화면의 수는 고정 난수와 직접 정한 식으로 계산했습니다.`));
        rows.replaceChildren(table(['단계','이전 입력','알려진 x','μ','다음에 넣을 값'],trajectory.map(r=>[r.t,fixed(r.previous),r.knownFeature,fixed(r.mu),fixed(mode==='training'?r.actual:r.sample)])));root.dataset.deepMode=mode;root.dataset.deepStep=step;
      }
      update();body.append(n('p','deep-formula','직접 정한 식 · μₜ = 10 + 0.55(zₜ₋₁ − 10) + xₜ, σ = '+fixed(sigma)),n('p','deep-source-note','원문 위치 · v1 Figure 2, §3의 ancestral sampling, §3.2 식(2). 위 그림에서 Θ는 구조상의 자리이며 수치 계산은 RNN 대신 공개한 1차 자기회귀식을 씁니다.'));
    }
    function paths(){
      body.append(n('h4','','한 미래를 고르는 대신, 가능한 경로를 모아 읽다'),n('p','deep-prose','앞에서 뽑힌 값이 뒤의 분포에 영향을 주므로 한 경로 안의 시점들을 함께 유지한다. 160개 경로를 만들고 각 날짜와 6일 합의 분위수를 따로 계산한다.'));
      const controls=n('div','deep-path-controls'),chart=n('div'),stats=n('div','deep-stats'),numbers=n('div');controls.append(slider('샘플을 퍼뜨리는 σ',.6,3.4,.2,sigma,v=>{sigma=v;update();},'path-sigma'),button('다른 샘플 경로 보기',()=>{seed+=37;update();announce('고정식은 유지하고 난수만 바꾸었습니다.');},'resample'));body.append(controls,chart,stats,numbers);
      function update(){const e=core.ensemble({sigma,seed}),g=svg('160개 가상 미래 경로와 시점별 10–90% 범위',760,345),all=e.paths.flat().concat(core.observed[0]),min=Math.floor(Math.min(...all))-1,max=Math.ceil(Math.max(...all))+1,left=48,right=710,top=35,bottom=280,x=t=>left+t/6*(right-left),y=v=>bottom-(v-min)/(max-min)*(bottom-top);
        line(g,left,bottom,right,bottom);for(let i=0;i<=6;i++)text(g,x(i),303,i?'+'+i+'일':'마지막 관측','deep-svg-small','middle');for(let i=0;i<=4;i++){const v=min+(max-min)*i/4;line(g,left,y(v),right,y(v),'deep-grid');text(g,left-9,y(v)+4,fixed(v),'deep-svg-small','end');}
        const band=e.bands.map(b=>`${x(b.t)},${y(b.high)}`).concat([...e.bands].reverse().map(b=>`${x(b.t)},${y(b.low)}`)).join(' ');g.append(s('polygon',{points:band,class:'deep-band'}));for(const p of e.paths.slice(0,20))path(g,[core.observed[0],...p],x,y,'deep-sample-path');path(g,e.bands.map(b=>b.median),i=>x(i+1),y,'deep-median');g.append(s('circle',{cx:x(0),cy:y(core.observed[0]),r:5,class:'deep-observed'}));text(g,52,20,'직접 만든 자기회귀식 · y축 자동 조정','deep-svg-small');chart.replaceChildren(g);
        stats.replaceChildren();for(const[label,value,explain]of[['6일 합의 중앙값',fixed(e.total.median),'경로별 합산 → 그 합들의 50% 분위수'],['6일 합의 90% 분위수',fixed(e.total.high),'경로별 합산 → 그 합들의 90% 분위수'],['날짜별 90% 분위수의 합',fixed(e.sumOfMarginalHigh),'날짜별 요약을 더한 값 · 위와 다른 계산']]){const b=n('div');b.append(n('span','',label),n('strong','',value),n('p','',explain));stats.append(b);}
        numbers.replaceChildren(n('div','deep-chart-key'));const key=numbers.firstChild;for(const cls of['band','median','path']){const label=n('span','deep-key deep-key-'+cls,cls==='band'?'시점별 10–90%':cls==='median'?'시점별 중앙값':'일부 샘플 경로');key.append(label);}numbers.append(table(['미래','10% 분위수','50% 분위수','90% 분위수'],e.bands.map(b=>['+'+b.t+'일',fixed(b.low),fixed(b.median),fixed(b.high)])),n('p','deep-callout','같은 평균을 기준으로도 가능한 미래는 여러 갈래다. 이 색 띠는 각 날짜의 범위이며, 6일 전체가 동시에 띠 안에 들 확률을 뜻하지 않는다. 이 가상 모형이 실제 수요의 불확실성을 올바르게 추정했다고 검증한 결과도 아니다.'));root.dataset.deepSeed=seed;root.dataset.deepSigma=sigma;
      }
      update();body.append(n('p','deep-source-note','원문 위치 · v1 §3의 joint samples와 기간 합의 quantile, AWS 2018 출시 글의 Probabilistic forecasts. 색 띠는 160개 샘플의 경험적 분위수입니다. 가우시안은 실수 분포이므로 음수 경로도 허용합니다.'));
    }
    render();return()=>root.remove();
  }
  window.AtlasVisuals.register('amazon-deepar-forecast',{mount});
})();
