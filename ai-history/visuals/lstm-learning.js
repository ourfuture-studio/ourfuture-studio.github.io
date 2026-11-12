/* Own experiment and source-led views. Historical cell comparison stays intact. */
(function(){
 'use strict';
 const M=window.AtlasLSTMLearning;
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const fmt=(n,d=6)=>Math.abs(n)<1e-8&&n!==0?n.toExponential(3):n.toFixed(d);
 const signed=n=>(n>=0?'+':'')+fmt(n);
 const A='var(--accent, #7a1f2e)',I='var(--ink, #1b2340)',B='var(--bg, #fcf9f1)',S='var(--soft, #f5f0e5)',L='var(--line, #ddd7ca)';
 const names={candidate:'쓰기 후보',inputGate:'입력 게이트',outputGate:'출력 게이트',readout:'판독층'};
 const feature={signal:'신호',writeCue:'기록 표시',readCue:'읽기 표시',bias:'편향',cellOutput:'셀 출력'};
 const parameterLabel=p=>names[p.key]+' · '+feature[p.feature];
 const text=(x,y,s,size=11,color=I,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}">${s}</text>`;
 function unfolded(run,time,credit){
  const f=run.frames,w=900,cw=132,x=i=>28+i*150,cy=128;
  let body=`<rect width="${w}" height="338" rx="8" fill="${S}"/>`;
  body+=text(25,25,credit?'나중의 오차 → 과거 시점의 기여 → 공유 연결값 갱신':'같은 연결값을 다섯 시점에 반복해서 사용한다',12,I,'start');
  f.forEach((q,j)=>{const xx=x(j),on=j===time;
   if(j<4)body+=`<path d="M${xx+cw} ${cy} H${x(j+1)}" stroke="${I}" stroke-width="2"/><path d="M${x(j+1)-5} ${cy-4} l5 4 -5 4" fill="none" stroke="${I}"/>`;
   body+=`<rect x="${xx}" y="70" width="${cw}" height="146" rx="7" fill="${B}" stroke="${on?A:L}" stroke-width="${on?2:1}"/>`;
   body+=text(xx+cw/2,51,'t'+(j+1)+' · '+(q.kind==='write'?'기록':q.kind==='read'?'읽기':'방해 입력'),11,on?A:I);
   body+=text(xx+cw/2,94,'입력 '+(q.inputs[0]>0?'+':'')+q.inputs[0],11);
   body+=text(xx+cw/2,119,'쓰기 문 '+q.inputGate.toFixed(3),10,A);
   body+=text(xx+cw/2,146,'상태 '+q.state.toFixed(3),13);
   body+=text(xx+cw/2,173,'출력 문 '+q.outputGate.toFixed(3),10);
   body+=text(xx+cw/2,198,q.hasLoss?'셀 출력 '+q.cellOutput.toFixed(3):'중간 출력은 채점 안 함',9,q.hasLoss?A:I);
   if(credit){
    body+=text(xx+cw/2,254,'∂E/∂s'+(j+1)+' = '+fmt(q.credit.state,4),10,A);
    body+=text(xx+cw/2,281,'입력 문 민감도 '+fmt(q.credit.inputGateSum,4),9);
    body+=text(xx+cw/2,302,'출력 문 민감도 '+fmt(q.credit.outputGateSum,4),9);
   }else body+=text(xx+cw/2,255,q.hasLoss?'이때만 정답 제공':'정답 없음',10,q.hasLoss?A:I);
  });
  body+=`<path d="M760 128 H785" stroke="${A}" stroke-width="2"/><rect x="785" y="84" width="98" height="120" rx="6" fill="${B}" stroke="${A}"/>`;
  body+=text(834,107,'별도 판독',10,A)+text(834,133,run.output.toFixed(4),15,A)+text(834,158,'목표 '+run.target,10)+text(834,184,'오차 '+fmt(run.error,4),9);
  if(credit)body+=`<path d="M830 220 V232 H94" fill="none" stroke="${A}" stroke-width="2"/><path d="M101 227 l-7 5 7 5" fill="none" stroke="${A}"/>`+text(430,328,'CEC 내부의 전달 미분은 1 · 전체 연결값의 기울기는 게이트·후보·입력에 따라 달라진다',10,A);
  else body+=text(447,305,'이것은 새로 실행하는 한 셀 망이다. 원논문의 학습 실험이나 전체 순환 구조를 재현하지 않는다.',10);
  return `<svg viewBox="0 0 ${w} 338" role="img" aria-label="다섯 시점의 LSTM. 마지막에만 목표 ${run.target}, 현재 예측 ${run.output.toFixed(4)}, 오차 ${fmt(run.error)}. ${credit?'늦은 오차가 상태 경로를 따라 앞선 입력 게이트와 후보에 연결된다.':''}"><title>${credit?'끝의 오차에서 앞선 기록의 기여를 계산하다':'입력 줄을 끝까지 읽은 뒤 정답을 받다'}</title>${body}</svg>`;
 }
 function lossChart(history){
  const w=760,h=210,left=55,top=20,bottom=170,maxX=Math.max(1,history.at(-1).sweep),maxY=Math.max(.001,...history.map(r=>r.loss))*1.08;
  const points=history.map(p=>(left+(w-left-24)*p.sweep/maxX).toFixed(2)+','+(bottom-(bottom-top)*p.loss/maxY).toFixed(2)).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="실제로 계산한 학습 횟수별 평균 오차. 시작 ${fmt(history[0].loss)}, 현재 ${fmt(history.at(-1).loss)}"><title>이 실행에서 실제 계산한 오차</title><path d="M${left} ${top} V${bottom} H${w-24}" fill="none" stroke="${L}"/><polyline points="${points}" fill="none" stroke="${A}" stroke-width="2.3"/>${text(left-8,top+4,fmt(maxY,3),10,I,'end')}${text(left-8,bottom+4,'0',10,I,'end')}${text(left,bottom+22,'0회',10)}${text(w-26,bottom+22,maxX+'회',10,I,'end')}${text(405,205,'훈련 줄 16개에 대한 평균 ½(예측−정답)²',10)}</svg>`;
 }
 function valueList(rows){const d=el('dl','ltl-values');for(const [label,value,accent]of rows){d.append(el('dt','',label));const v=el('dd',accent?'is-accent':'',value);d.append(v);}return d;}
 function table(headers,rows){const wrap=el('div','ltl-table-wrap'),t=el('table'),head=el('thead'),tr=el('tr');headers.forEach(x=>tr.append(el('th','',x)));head.append(tr);const body=el('tbody');for(const row of rows){const r=el('tr');if(row.current)r.dataset.current='true';row.values.forEach(x=>r.append(el('td','',x)));body.append(r);}t.append(head,body);wrap.append(t);wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','가로로 이동할 수 있는 계산 표');return wrap;}
 window.AtlasVisuals.register('gated-memory-learning',{
  mount(host,config){
   if(!M)throw Error('LSTM learning core is required');
   let state=M.create(1),initial=M.create(1),mode='sequence',caseId=10,time=0,parameter='inputGate.1',expanded=false,disposed=false,lastUpdate=null,manualCleanup=null;
   let summary=M.snapshot(state),history=[{sweep:0,loss:summary.meanError}];
   const listeners=[],root=el('div','ltl-learning'),modes=el('div','ltl-modes'),intro=el('section','ltl-intro'),toolbar=el('section','ltl-toolbar'),controls=el('div','ltl-controls'),metrics=el('div','ltl-metrics'),selection=el('div','ltl-selection'),body=el('section','ltl-body'),manual=el('section','ltl-original');
   const listen=(n,event,fn)=>{n.addEventListener(event,fn);listeners.push(()=>n.removeEventListener(event,fn));};
   const button=(label,action)=>{const b=el('button','',label);b.type='button';if(action)b.dataset.ltlAction=action;return b;};
   const views=[['sequence','01 끝에서만 주는 정답'],['credit','02 오차가 돌아가는 길'],['learned','03 기억하는 법의 변화'],['original','04 1997년 셀 따라가기']];
   modes.setAttribute('role','group');modes.setAttribute('aria-label','기억과 실제 학습 살펴보기');
   for(const [id,label]of views){const b=button(label);b.dataset.ltlMode=id;listen(b,'click',()=>{mode=id;update();});modes.append(b);}
   intro.append(el('span','ltl-kicker','DELAYED ERROR → SHARED CONNECTIONS → GATES'),el('h4','','마지막의 정답으로, 처음에 무엇을 남길지 배우게 한다'),el('p','','처음 신호를 본 뒤 방해 입력 세 개를 지나 마지막에만 정답을 줍니다. 시간마다 같은 연결값을 다시 쓰므로, 끝의 오차에서 각 시점의 기여를 모아 그 공유 연결값을 고칩니다. 바뀐 연결로 같은 입력 줄을 다시 흘리면 쓰기 후보·게이트·기억 상태도 달라집니다.'));
   const seed=el('select');seed.setAttribute('aria-label','LSTM 학습 초기값');for(const n of [1,1986]){const o=el('option','','초기값 '+n);o.value=n;seed.append(o);}const seedLabel=el('label','','출발점');seedLabel.append(seed);controls.append(seedLabel);
   const one=button('한 번 학습','one'),hundred=button('100번 학습','hundred'),finish=button('1000번까지 학습','finish'),reset=button('처음으로','reset');controls.append(one,hundred,finish,reset);
   function metric(label,key){const n=el('div','ltl-metric'),v=el('strong');v.dataset.ltlMetric=key;n.append(el('span','',label),v);metrics.append(n);return v;}
   const sweepValue=metric('16개 입력 줄을 함께 학습한 횟수','sweep'),lossValue=metric('입력 줄당 평균 오차','loss'),correctValue=metric('훈련 줄의 마지막 판단','correct');
   const status=el('p','ltl-status');status.setAttribute('aria-live','polite');status.setAttribute('role','status');
   const sample=el('select');sample.setAttribute('aria-label','살펴볼 LSTM 입력 줄');for(const c of M.cases){const o=el('option','',(c.signal===1?'+1':'−1')+' 기록 · 방해 '+c.distractors.map(x=>x===1?'+':'−').join(' '));o.value=c.id;sample.append(o);}sample.value=caseId;
   const sampleLabel=el('label','','학습 자료 16개 중 살펴볼 입력 줄');sampleLabel.append(sample);
   const connection=el('select');connection.setAttribute('aria-label','LSTM에서 살펴볼 연결');for(const p of M.parameterInfo){const o=el('option','',parameterLabel(p));o.value=p.id;connection.append(o);}connection.value=parameter;const connectionLabel=el('label','','모든 시점에서 함께 쓰는 연결값');connectionLabel.append(connection);selection.append(sampleLabel,connectionLabel);
   toolbar.append(el('h5','','작은 무작위 연결에서 직접 학습하기'),controls,metrics,status,selection);
   const scope=el('details','ltl-scope');scope.append(el('summary','','이 실행의 구조·학습 규칙·원논문과의 관계'));
   scope.append(el('p','','1997년의 입력·출력 게이트, 고정된 1의 상태 자기연결과 함수 g·h를 참고한 한 셀 망입니다. 후보와 게이트에는 외부 입력만 넣고, 셀 출력을 읽는 sigmoid 판독층은 셀 갱신 뒤 별도 단계로 계산합니다. 원문의 일반 순환망 전체와 전역 시간 인덱스를 그대로 실행한 실험이 아닙니다. 망각 게이트는 넣지 않았습니다.'));
   scope.append(el('pre','','입력 = [신호, 기록 표시, 읽기 표시, 1]\nzₜ = 4σ(aᶻₜ) − 2,  iₜ = σ(aⁱₜ),  oₜ = σ(aᵒₜ)\nsₜ = sₜ₋₁ + iₜzₜ,  cₜ = oₜ[2σ(sₜ) − 1]\n별도 판독: ŷ = σ(wᵧc₅ + bᵧ)\nE = ½(ŷ − 목표)² · 마지막에서만 채점\nΔw = −1 × 16개 줄의 평균 기울기 + 0.9 × 이전 Δw'));
   scope.append(el('p','','훈련 자료는 처음 신호 ±1과 방해 신호 세 개 ±1의 가능한 조합 16개입니다. 마지막 읽기 요청의 신호는 0이며, 처음 +1이면 목표 1, −1이면 목표 0입니다. 예측이 0.5 이상이면 1로 판단합니다. 기록·읽기 표시는 입력으로 주지만 어느 게이트를 얼마나 열지는 정답으로 주지 않습니다. 중간 출력에는 채점이 없어, 이전 출력 게이트가 닫혀야 한다는 행동을 배웠다고 말할 수 없습니다.'));
   scope.append(el('p','','14개 연결값은 Mulberry32의 표시된 초기값 번호로 [−0.3, 0.3]에서 만듭니다. 한 번 학습할 때 16개 줄의 기울기를 평균해 학습률 1·관성 0.9로 갱신합니다. 매 줄의 상태는 0에서 시작합니다. 그래프와 수치는 이 화면에서 새로 계산한 훈련 결과이며 원논문의 성능·일반화 결과가 아닙니다.'));
   scope.append(el('p','','원논문은 일부 재귀 경로를 자르는 학습을 사용합니다. 이 망은 후보·게이트를 나갔다 셀로 돌아오는 재귀를 제외해, Appendix A의 누적 미분과 전체 시간축 미분이 일치합니다. CEC 내부 미분 1은 전체 망이나 모든 연결의 기울기가 항상 1이라는 뜻이 아닙니다.'));
   const proof=el('figure','ltl-source-proof');proof.append(el('span','ltl-kicker','ORIGINAL PAPER · APPENDIX A'),el('h5','','앞선 입력 게이트의 기여를 남기는 누적 미분'));
   const proofImage=el('img');proofImage.src='assets/papers/lstm-1997-eligibility-original.png';proofImage.alt='1997년 LSTM 원논문 식 A.23. 입력 게이트 연결에 대한 상태의 미분을 이전 시점의 미분과 현재 기여의 합으로 적었다.';proofImage.loading='lazy';
   const proofViewer=el('div','ltl-proof-viewer');proofViewer.dataset.expanded='false';proofViewer.append(proofImage);const proofZoom=button('원문 수식 확대','proof-zoom');proofZoom.setAttribute('aria-expanded','false');listen(proofZoom,'click',()=>{const on=proofViewer.dataset.expanded!=='true';proofViewer.dataset.expanded=String(on);proofZoom.setAttribute('aria-expanded',String(on));proofZoom.textContent=on?'원문 수식 전체 보기':'원문 수식 확대';if(on){proofViewer.tabIndex=0;proofViewer.setAttribute('role','region');proofViewer.setAttribute('aria-label','확대한 원논문 A.23 수식');}else{proofViewer.removeAttribute('tabindex');proofViewer.removeAttribute('role');proofViewer.removeAttribute('aria-label');}});proof.append(proofZoom,proofViewer);
   proof.append(el('p','','원논문 식 A.23 · 인쇄 p.1773 / PDF 39쪽. 원본 수식 영역을 발췌했습니다. 이전에 남긴 미분에 이번 입력 게이트의 기여를 더하는 구조를 읽습니다. 위의 시간 그림·수치·번역식은 별도로 만든 새 계산입니다.'));
   const source=el('a','','Hochreiter·Schmidhuber (1997) · Appendix A ↗');source.href='https://web.stanford.edu/class/psych209/Readings/HochreiterSchmidthuber97LSTM.pdf#page=39';source.target='_blank';source.rel='noopener noreferrer';proof.append(source);
   root.append(modes,intro,toolbar,body,manual,scope,proof);host.append(root);
   function addArt(panel,run,credit){const zoom=el('div','ltl-zoom'),b=button(expanded?'시간 그림 전체 보기':'시간 그림 확대','zoom');b.setAttribute('aria-expanded',String(expanded));zoom.append(b,el('span','','확대한 그림은 가로로 이동할 수 있습니다.'));const art=el('div','ltl-art');art.dataset.expanded=String(expanded);art.innerHTML=unfolded(run,time,credit);if(expanded){art.tabIndex=0;art.setAttribute('role','region');art.setAttribute('aria-label','확대한 LSTM 시간 그림');}b.addEventListener('click',()=>{expanded=!expanded;update();});panel.append(zoom,art);}
   function ticks(panel,run){const bar=el('div','ltl-ticks');bar.setAttribute('role','group');bar.setAttribute('aria-label','기여를 살펴볼 시점');for(const f of run.frames){const b=button('');b.dataset.ltlTime=String(f.index);b.setAttribute('aria-pressed',String(time===f.index));b.append(el('span','','t'+(f.index+1)),el('strong','',f.kind==='write'?'처음 기록':f.kind==='read'?'마지막 읽기':'방해 '+f.index));b.addEventListener('click',()=>{time=f.index;update();});bar.append(b);}panel.append(bar);}
   function sequenceView(run,before){const p=el('section','ltl-panel');p.append(el('h4','','단서를 남길 때는, 정답을 아직 모른다'),el('p','','기록 표시·읽기 표시는 관찰할 입력입니다. 게이트의 정답을 따로 주지 않고 마지막 판단만 채점합니다. 시점을 눌러 같은 연결이 다른 입력에서 어떤 반응을 만드는지 보세요.'));addArt(p,run,false);ticks(p,run);const f=run.frames[time];p.append(valueList([['선택 시점','t'+(time+1)+' · '+f.label],['들어온 신호',String(f.inputs[0])],['입력 게이트의 열림',fmt(f.inputGate)],['쓰기 후보',fmt(f.candidate)],['상태에 더한 값',fmt(f.write)],['남아 있는 상태',fmt(f.state),true],['이 시점의 정답',f.hasLoss?'목표 '+run.target:'제공하지 않음']]));p.append(el('p','ltl-explanation','기억 상태는 한 줄을 읽는 동안 달라지는 값입니다. 연결값은 여러 줄에서 받은 오차를 모아 바꿉니다. '+(state.sweep?'현재 그림은 '+state.sweep+'회 학습한 연결에 같은 입력을 다시 흘린 결과입니다.':'현재는 아직 학습하기 전입니다. 한 번 학습으로 연결의 변화를 먼저 살펴보세요.')));body.append(p);}
   function creditView(run,before){const p=el('section','ltl-panel');p.append(el('h4','','끝에서 틀린 만큼, 앞선 기록의 기여를 되짚는다'),el('p','','최종 판독의 오차가 출력 게이트·상태의 변환을 거쳐 셀 상태로 들어옵니다. 이 한 셀 망의 상태 경로는 시점마다 1로 이어지고, 각 시점의 후보·입력 게이트에는 그때의 입력과 반응에 맞는 서로 다른 기울기가 생깁니다.'));addArt(p,run,true);ticks(p,run);
    const info=M.parameterInfo.find(q=>q.id===parameter),f=run.frames[time],key=info.key,j=info.index,contribution=f.gradientContribution[key][j],grad=summary.gradients[key][j],w=state.parameters[key][j],change=-grad+.9*state.velocity[key][j];
    const grid=el('div','ltl-grid'),a=el('section','ltl-panel'),b=el('section','ltl-panel');a.append(el('h5','','한 입력 줄 안에서, 여러 시점의 기여를 모은다'),valueList([['선택한 공유 연결',parameterLabel(info)],['t'+(time+1)+'의 상태 민감도 ∂E/∂sₜ',fmt(f.credit.state)],['t'+(time+1)+'에서 이 연결의 기울기 기여',signed(contribution),true],['이 입력 줄의 시점별 기여 합',signed(run.gradients[key][j])]]));
    if(['candidate','inputGate'].includes(key))a.append(valueList([['t'+(time+1)+'의 상태 미분 새 기여',signed(f.eligibilityIncrement[key][j])],['t'+(time+1)+'까지 쌓인 상태 미분',signed(f.eligibility[key][j])],['최종 상태 미분 × 최종 상태 민감도',signed(run.eligibilityGradients[key][j]),true]]));
    a.append(el('p','ltl-table-note',key==='outputGate'?'이전 출력 게이트는 이 망의 다음 상태로 돌아가지 않습니다. 중간에 손실도 없으므로 그 시점의 출력 게이트 기여는 0이며, 마지막 출력 게이트만 판독 오차를 받습니다.':key==='readout'?'판독층은 마지막 셀 출력을 읽은 뒤 한 번 계산합니다. 앞선 시점에는 판독층에 줄 정답이나 기울기 기여가 없습니다.':'앞선 시점의 기여를 따로 보존하는 누적 미분과, 마지막에서 거꾸로 따라오는 계산은 이 외부 입력 전용 구조에서 같은 기울기를 줍니다.'));
    b.append(el('h5','','16개 줄을 모아, 하나의 연결값을 고친다'),valueList([['현재 공유 연결값',fmt(w)],['16개 줄의 평균 기울기',signed(grad),true],['이전 변화의 영향 · 관성',signed(.9*state.velocity[key][j])],['다음 한 번 학습의 변화량',signed(change)],['다음 갱신 후 연결값',fmt(w+change),true]]));
    if(lastUpdate)b.append(valueList([['마지막 갱신 전',fmt(lastUpdate.before.parameters[key][j])],['마지막 갱신 후',fmt(lastUpdate.after.parameters[key][j])],['실제로 바뀐 양',signed(lastUpdate.after.parameters[key][j]-lastUpdate.before.parameters[key][j]),true]]));
    grid.append(a,b);p.append(grid,table(['시점','상태 민감도','입력 문 민감도','출력 문 민감도','선택 연결 기여'],run.frames.map(q=>({current:q.index===time,values:['t'+(q.index+1),fmt(q.credit.state,5),fmt(q.credit.inputGateSum,5),fmt(q.credit.outputGateSum,5),fmt(q.gradientContribution[key][j],5)]}))),el('p','ltl-explanation','이미 지나간 상태값을 소급해서 바꾸는 것이 아닙니다. 각 시점의 기여를 합해 모든 시점이 공유하는 연결값을 수정하고, 같은 입력 줄을 다시 계산합니다. 이전 출력 게이트까지 모두 학습 신호가 흐른다고 그리지 않습니다.'));body.append(p);
   }
   function learnedView(run,before){const p=el('section','ltl-panel');p.append(el('h4','','연결이 바뀌면, 남기는 방식도 바뀐다'),el('p','','다섯 시점 모두 같은 연결을 사용하지만 입력이 다릅니다. 기록 표시가 있는 처음과 방해 입력에서 입력 게이트가 어떻게 달라졌는지, 같은 줄의 학습 전·현재 반응을 비교하세요.'));
    const gate=el('section','ltl-panel');gate.append(el('h5','','입력 게이트 · 직접 정한 열림이 아닌 계산한 반응'),el('p','ltl-table-note','왼쪽은 학습 전, 오른쪽은 현재입니다. 게이트의 목표값을 따로 주지 않았습니다.'));
    run.frames.forEach((f,j)=>{const row=el('div','ltl-gate-row');row.append(el('span','','t'+(j+1)+' '+(j===0?'기록':j===4?'읽기':'방해')));for(const [value,now]of [[before.frames[j].inputGate,false],[f.inputGate,true]]){const box=el('div',now?'ltl-gate-now':''),bar=el('div','ltl-gate-bar'),fill=el('i');fill.style.width=value*100+'%';bar.append(fill);box.append(el('span','',value.toFixed(4)),bar);row.append(box);}gate.append(row);});p.append(gate);
    p.append(table(['시점','처음 상태','현재 상태','처음 입력 문','현재 입력 문','현재 출력 문'],run.frames.map((f,j)=>({values:['t'+(j+1),fmt(before.frames[j].state,4),fmt(f.state,4),fmt(before.frames[j].inputGate,4),fmt(f.inputGate,4),fmt(f.outputGate,4)]}))),el('p','ltl-table-note','상태의 양·음 부호 자체에 정답 의미를 고정하지 않습니다. 후보와 판독층이 함께 학습하므로 부호가 반대여도 같은 최종 판단을 만들 수 있습니다. 중간 출력은 채점하지 않았습니다.'));
    p.append(valueList([['같은 줄 · 처음의 최종 예측',fmt(before.output)],['같은 줄 · 현재의 최종 예측',fmt(run.output),true],['이 줄의 목표',String(run.target)],['같은 줄 · 처음 오차',fmt(before.error)],['같은 줄 · 현재 오차',fmt(run.error),true]]));
    const chart=el('div','ltl-art');chart.innerHTML=lossChart(history);p.append(el('h5','','실제로 실행한 학습의 기록'),chart,el('p','ltl-explanation','학습한 16개 줄에 대한 기록입니다. 새로운 길이·다른 자료·실제 언어를 기억하는 성능으로 확대하지 않습니다. 선택한 초기값과 실행 횟수에 따라 게이트·내부 상태가 달라집니다.'));body.append(p);
   }
   function update(){if(disposed)return;root.dataset.mode=mode;root.dataset.sweep=String(state.sweep);root.dataset.seed=String(state.seed);root.dataset.case=String(caseId);root.dataset.time=String(time);root.dataset.parameter=parameter;summary=M.snapshot(state);const run=M.forward(M.cases[caseId],state.parameters),before=M.forward(M.cases[caseId],initial.parameters);
    for(const b of modes.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.ltlMode===mode));toolbar.hidden=mode==='original';intro.hidden=mode==='original';body.hidden=mode==='original';manual.hidden=mode!=='original';proof.hidden=mode==='original';scope.hidden=mode==='original';connectionLabel.hidden=mode!=='credit';
    sweepValue.textContent=state.sweep+'회';lossValue.textContent=fmt(summary.meanError);correctValue.textContent=summary.correct+' / '+summary.patterns+'개';finish.disabled=state.sweep>=1000;one.disabled=state.sweep>=1000;hundred.disabled=state.sweep>=1000;status.textContent=state.sweep?'실제로 '+state.sweep+'회 갱신했습니다. 마지막에서만 받은 정답으로 후보·게이트·판독층 연결을 함께 학습했습니다.':'아직 연결을 갱신하지 않았습니다. 한 번 학습을 누르면 16개 줄의 오차에서 연결값을 한 번 고칩니다.';
    body.replaceChildren();if(mode==='sequence')sequenceView(run,before);else if(mode==='credit')creditView(run,before);else if(mode==='learned')learnedView(run,before);else if(!manualCleanup){manualCleanup=window.AtlasVisuals.get('gated-memory').mount(manual,{...config,scope:'이 별도 보기는 후보와 게이트값을 직접 정해 1997년 셀의 전달을 비교합니다. 앞의 학습 보기에서 얻은 연결값이나 원논문의 학습된 가중치를 실행하는 화면이 아닙니다.'});}
   }
   function learn(count){if(disposed)return;count=Math.min(count,1000-state.sweep);if(count<=0)return;const old=state;for(let i=0;i<count;i++){const before=state;state=M.step(state);if(i===count-1)lastUpdate={before,after:state};if(state.sweep%10===0||i===count-1)history.push({sweep:state.sweep,loss:M.batch(state.parameters).meanError});}root.dataset.lastBatchFrom=String(old.sweep);update();}
   function restart(){state=M.create(Number(seed.value));initial=M.create(Number(seed.value));summary=M.snapshot(state);history=[{sweep:0,loss:summary.meanError}];lastUpdate=null;update();}
   listen(one,'click',()=>learn(1));listen(hundred,'click',()=>learn(100));listen(finish,'click',()=>learn(1000-state.sweep));listen(reset,'click',restart);listen(seed,'change',restart);listen(sample,'change',()=>{caseId=Number(sample.value);update();});listen(connection,'change',()=>{parameter=connection.value;update();});update();
   return()=>{if(disposed)return;disposed=true;for(const stop of listeners)stop();if(manualCleanup)manualCleanup();root.remove();};
  }
 });
})();
