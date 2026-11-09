/* Hochreiter & Schmidhuber (1997), Fig.1, printed p.1744.
 * A constructed scalar trace uses the paper's state/output form. Candidate z
 * is already transformed by g; gate outputs are chosen, not learned. There is
 * no forget gate. The separate derivative comparison follows only one path.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(text!==undefined)element.textContent=text;return element;};
  const finite=value=>typeof value==='number'&&Number.isFinite(value);
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)',MUTED='var(--muted, #777b86)';
  const GAPS=Object.freeze([3,12,48]);
  function step({state,candidate,inputGate,outputGate}={}){
    if(!finite(state))throw new TypeError('State must be finite.');
    if(!finite(candidate)||candidate< -2||candidate>2)throw new RangeError('Candidate must be a finite transformed value between -2 and 2.');
    if(!finite(inputGate)||inputGate<0||inputGate>1||!finite(outputGate)||outputGate<0||outputGate>1)throw new RangeError('Gate outputs must be between 0 and 1.');
    const write=inputGate*candidate,nextState=state+write;
    if(!finite(nextState))throw new RangeError('State update must stay finite.');
    const exposed=Math.tanh(nextState/2),output=outputGate*exposed;
    return{previousState:state,candidate,inputGate,outputGate,write,state:nextState,exposed,output,carryDerivative:1};
  }
  function trace(frames,initialState=0){
    if(!Array.isArray(frames))throw new TypeError('Frames must be an array.');
    if(!finite(initialState))throw new TypeError('Initial state must be finite.');
    let state=initialState;
    return frames.map((frame,index)=>{if(!frame||typeof frame!=='object')throw new TypeError('Each frame must contain candidate and gate outputs.');const result=step({state,candidate:frame.candidate,inputGate:frame.inputGate,outputGate:frame.outputGate});state=result.state;return{...result,index,label:typeof frame.label==='string'?frame.label:'',kind:typeof frame.kind==='string'?frame.kind:''};});
  }
  function makeScenario({gap=12,allowDistractors=false,blockRead=false}={}){
    if(!GAPS.includes(gap))throw new RangeError('Gap must be 3, 12, or 48.');
    if(typeof allowDistractors!=='boolean'||typeof blockRead!=='boolean')throw new TypeError('Scenario switches must be boolean.');
    const frames=[{candidate:.8,inputGate:1,outputGate:0,label:'남길 신호',kind:'write'}];
    for(let n=0;n<gap;n++)frames.push({candidate:n%2===0?.6:-.4,inputGate:allowDistractors?1:0,outputGate:0,label:'무관한 입력 '+(n+1),kind:'distractor'});
    frames.push({candidate:0,inputGate:0,outputGate:blockRead?0:1,label:'읽기 요청',kind:'read'});
    return frames;
  }
  function gradientPath({steps,factor=.5}={}){
    if(!Number.isInteger(steps)||steps<0||steps>1000)throw new RangeError('Steps must be an integer from 0 to 1000.');
    if(!finite(factor))throw new TypeError('Path factor must be finite.');
    const values=[1];let product=1;
    for(let n=0;n<steps;n++){product*=factor;if(!finite(product))throw new RangeError('Path product must stay finite.');values.push(product);}
    return{steps,factor,values,product};
  }
  window.AtlasLSTMModel=Object.freeze({step,trace,makeScenario,gradientPath});
  const number=value=>Math.abs(value)<1e-12?'0.000':value.toFixed(3);
  const tiny=value=>value!==0&&Math.abs(value)<.001?value.toExponential(3):value.toFixed(3);
  const arrow=(d,color=INK,opacity=1,width=2)=>`<path d="${d}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const label=(x,y,text,size=14,color=INK)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}">${text}</text>`;
  function drawing(state){
    const writing=state.inputGate>0,reading=state.outputGate>0;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 330" role="img" aria-label="시점 ${state.index+1}. 쓰기 게이트 ${state.inputGate}, 읽기 게이트 ${state.outputGate}. 내부 상태 ${number(state.state)}, 외부 출력 ${number(state.output)}.">
      <title>쓰기와 읽기를 따로 조절하는 1997년 기억 셀</title>
      <desc>입력 게이트가 곱해진 쓰기 후보를 이전 상태에 더한다. 상태의 자기연결 값은 1이고 한 시점의 지연이 있다. 상태를 h로 변환한 값에 출력 게이트를 곱해 밖으로 보낸다. 그림의 후보와 게이트 값은 직접 정한 것으로 학습 결과가 아니다.</desc>
      <rect x="24" y="63" width="654" height="154" rx="10" fill="${SOFT}" stroke="${INK}" stroke-opacity=".23"/>
      ${label(73,83,'기억 셀',11,MUTED)}
      <path d="M411 116C459 28 310 28 359 116" fill="none" stroke="${ACCENT}" stroke-width="2.3"/>
      ${arrow('M348 108L359 116L360 102',ACCENT,1,1.9)}
      ${label(385,22,'연결값 1 · 한 시점 지연',13,ACCENT)}
      ${label(105,105,'쓰기 후보 z',13)}
      <rect x="53" y="119" width="104" height="54" rx="6" fill="${BG}" stroke="${INK}" stroke-opacity=".3"/>
      ${label(105,153,number(state.candidate),23)}
      ${arrow('M165 145H217M208 139L217 145L208 151',INK,writing?.9:.25)}
      <circle cx="235" cy="145" r="16" fill="${BG}" stroke="${writing?ACCENT:INK}" stroke-width="1.8"/>
      ${label(235,151,'×',21,writing?ACCENT:INK)}
      ${arrow('M252 145H345M336 139L345 145L336 151',ACCENT,writing?1:.2,2.6)}
      <circle cx="385" cy="145" r="38" fill="${BG}" stroke="${ACCENT}" stroke-width="2"/>
      ${label(385,136,'상태 s',12,ACCENT)}${label(385,158,number(state.state),20,ACCENT)}
      ${arrow('M424 145H513M504 139L513 145L504 151',INK,.75)}
      <circle cx="542" cy="145" r="25" fill="${BG}" stroke="${INK}" stroke-opacity=".5"/>
      ${label(542,152,'h',22)}
      ${label(542,105,'상태를 읽을 표현',12,MUTED)}
      ${arrow('M568 145H616M607 139L616 145L607 151',INK,reading?.85:.25)}
      <circle cx="634" cy="145" r="16" fill="${BG}" stroke="${reading?ACCENT:INK}" stroke-width="1.8"/>
      ${label(634,151,'×',21,reading?ACCENT:INK)}
      ${arrow('M651 145H696M687 139L696 145L687 151',ACCENT,reading?1:.2,2.6)}
      ${label(719,108,'밖의 출력 y',12)}${label(719,154,number(state.output),19,reading?ACCENT:MUTED)}
      <rect x="183" y="245" width="104" height="55" rx="6" fill="${writing?ACCENT:BG}" stroke="${writing?ACCENT:INK}" stroke-opacity="${writing?1:.4}"/>
      ${label(235,266,'쓰기 게이트 i',12,writing?BG:INK)}${label(235,289,number(state.inputGate),18,writing?BG:INK)}
      ${arrow('M235 244V163M229 173L235 163L241 173',writing?ACCENT:INK,writing?.9:.3)}
      <rect x="582" y="245" width="104" height="55" rx="6" fill="${reading?ACCENT:BG}" stroke="${reading?ACCENT:INK}" stroke-opacity="${reading?1:.4}"/>
      ${label(634,266,'읽기 게이트 o',12,reading?BG:INK)}${label(634,289,number(state.outputGate),18,reading?BG:INK)}
      ${arrow('M634 244V163M628 173L634 163L640 173',reading?ACCENT:INK,reading?.9:.3)}
      ${label(385,195,'이전 상태 + 통과한 쓰기',11,MUTED)}
    </svg>`;
  }
  function derivativeDrawing(steps){
    const count=Math.min(steps,7),xs=Array.from({length:count+1},(_,i)=>65+i*(610/Math.max(count,1)));
    function row(y,factor,color){return xs.map((x,i)=>`<circle cx="${x.toFixed(1)}" cy="${y}" r="15" fill="${BG}" stroke="${color}" stroke-opacity=".55"/>${label(x,y+5,i===count?'지금':'',13,color)}${i>0?arrow(`M${(x-17).toFixed(1)} ${y}H${(xs[i-1]+17).toFixed(1)}M${(xs[i-1]+25).toFixed(1)} ${y-5}L${(xs[i-1]+17).toFixed(1)} ${y}L${(xs[i-1]+25).toFixed(1)} ${y+5}`,color,.75,1.7)+label((x+xs[i-1])/2,y-12,String(factor),12,color):''}`).join('');}
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 212" role="img" aria-label="기록 뒤 읽기까지 ${steps}번 전달되는 내부 경로의 민감도 비교. 단계마다 0.5인 경로의 곱은 ${tiny(gradientPath({steps}).product)}, CEC 내부의 1인 경로는 1이다."><title>기억 상태의 값과 구분한, 역방향 민감도의 통로</title><desc>오른쪽에서 왼쪽으로 민감도를 전달한다. 0.5와 1은 각 경로의 국소 미분값이다. 긴 경로는 일부 연결만 그리며 계산은 모든 전달 횟수를 사용한다. 전체 LSTM의 미분이나 학습 성공률이 아니다.</desc>${label(370,24,'오차에서 앞선 시점으로 · 내부 경로의 민감도',15)}${row(80,.5,INK)}${row(163,1,ACCENT)}${label(370,115,steps>7?`${steps}번 중 일부 연결만 표시`:`${steps}번 전달`,11,MUTED)}</svg>`;
  }
  function visibleIndices(length,current){
    if(length<=7)return Array.from({length},(_,index)=>index);
    return [...new Set([0,1,Math.floor((length-1)/2),length-2,length-1,current])].sort((a,b)=>a-b);
  }
  window.AtlasVisuals.register('gated-memory',{
    mount(host,config){
      const stageIds=['remember','read','credit'],stages=stageIds.map(id=>config.stages?.find(item=>item.id===id));
      if(stages.some(item=>!item?.label||!item?.text))throw new Error('LSTM visual requires remember, read and credit stages.');
      const root=node('div','lstm-memory'),listeners=[],stageButtons=[],gapButtons=[];
      let gap=12,allowDistractors=false,blockRead=false,stage='remember',current=0,expanded=false,disposed=false;
      let frames=makeScenario({gap,allowDistractors,blockRead}),states=trace(frames);
      const stagesBar=node('div','lstm-stage-controls');stagesBar.setAttribute('role','group');stagesBar.setAttribute('aria-label','기억과 학습 신호 살펴보기');
      const scenario=node('section','lstm-scenario');scenario.append(node('span','lstm-kicker','A SIGNAL ACROSS TIME'),node('h4','','필요한 정보를 남기고, 나중에 꺼내 쓴다면?'),node('p','lstm-intro','남길 신호 하나를 받은 뒤 무관한 입력을 지나갑니다. 쓰기와 읽기의 문을 따로 조절하며 상태가 어디에 남는지 살펴보세요.'));
      const choices=node('div','lstm-scenario-options'),gaps=node('div','lstm-gap-controls');gaps.setAttribute('role','group');gaps.setAttribute('aria-label','사이에 오는 무관한 입력 개수');gaps.append(node('span','lstm-small-label','사이의 입력'));
      const switches=node('div','lstm-switches'),noiseButton=node('button','', '무관한 입력도 쓰기'),readButton=node('button','','마지막 읽기 막기');noiseButton.type=readButton.type='button';noiseButton.setAttribute('aria-pressed','false');readButton.setAttribute('aria-pressed','false');switches.append(noiseButton,readButton);choices.append(gaps,switches);scenario.append(choices);
      const timeline=node('div','lstm-timeline');timeline.setAttribute('role','group');timeline.setAttribute('aria-label','시간순 입력과 선택한 시점');
      const navigation=node('div','lstm-navigation'),prev=node('button','','이전 입력'),next=node('button','','다음 입력'),jumpWrite=node('button','','신호 기록'),jumpHold=node('button','','기다리는 중'),jumpRead=node('button','','나중에 읽기');for(const button of [prev,next,jumpWrite,jumpHold,jumpRead])button.type='button';navigation.append(prev,jumpWrite,jumpHold,jumpRead,next);
      const scene=node('section','lstm-scene');scene.setAttribute('aria-label','시간을 지나는 1997년 LSTM 기억 셀');
      const moment=node('div','lstm-moment'),momentTitle=node('h4'),momentText=node('p');moment.append(node('span','lstm-kicker','INPUT → STATE → OUTPUT'),momentTitle,momentText);
      const zoomBar=node('div','lstm-zoom-bar'),zoom=node('button','','기억 셀 그림 확대'),zoomHint=node('span','','확대하면 좌우로 움직여 볼 수 있습니다.');zoom.type='button';zoom.setAttribute('aria-pressed','false');zoomBar.append(zoom,zoomHint);
      const art=node('div','lstm-cell-art');
      const metrics=node('div','lstm-metrics');metrics.setAttribute('aria-label','현재 내부 상태와 외부 출력');
      const internal=node('div','lstm-metric'),external=node('div','lstm-metric'),stateValue=node('strong'),outputValue=node('strong');internal.append(node('span','','안에 남은 상태 s'),stateValue,node('small','','기억 셀 안의 활성값'));external.append(node('span','','밖으로 보낸 출력 y'),outputValue,node('small','','출력문 × h(상태)'));metrics.append(internal,external);
      const status=node('p','lstm-explanation');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
      scene.append(moment,zoomBar,art,metrics,status,node('p','lstm-state-note','상태는 입력을 따라 바뀌는 활성값입니다. 학습 중 조정되는 연결 가중치와 구분해서 읽습니다. 출력은 상태를 h로 변환한 값이므로 처음 신호 0.8과 그대로 같지는 않습니다.'));
      const credit=node('section','lstm-credit');credit.setAttribute('aria-label','CEC 내부의 역방향 민감도 비교');credit.hidden=true;
      const creditArt=node('div','lstm-credit-art'),creditTitle=node('h4','','나중의 오차가, 앞선 연결의 학습에 닿으려면?'),creditText=node('p','lstm-intro','상태를 남기는 것과, 그 상태를 만들었던 연결을 학습하는 것은 함께 풀어야 할 문제입니다. 여기서는 역방향 민감도가 한 경로에서 어떤 값들을 거쳐 곱해지는지만 비교합니다.');
      const creditSteps=node('p','lstm-credit-steps'),creditMetrics=node('div','lstm-gradient-metrics');
      function gradientMetric(title,cls){const box=node('div','lstm-gradient-metric '+cls),value=node('strong'),bar=node('div','lstm-gradient-bar'),fill=node('span');bar.append(fill);box.append(node('span','',title),value,bar);creditMetrics.append(box);return{value,fill};}
      const ordinary=gradientMetric('단계마다 0.5인 경로의 예','lstm-ordinary'),carousel=gradientMetric('CEC 내부의 1인 경로','lstm-carousel');
      credit.append(node('span','lstm-kicker','STATE ≠ DERIVATIVE'),creditTitle,creditText,creditSteps,creditArt,creditMetrics,node('p','lstm-credit-scope','이 수치는 기억 상태의 값이 아니라 경로를 따라 전해지는 민감도입니다. 후보와 게이트를 고정해 본 CEC 내부 자기연결의 미분이 1이라는 비교이며, 모든 게이트·출력 경로를 합친 전체 LSTM 기울기가 항상 1이라는 뜻은 아닙니다. 읽기 문을 닫으면 바깥 오차가 셀 상태로 들어오는 경로도 막히지만, 여기서는 그 안쪽 자기연결만 비교합니다.'));
      const stageText=node('p','lstm-stage-explanation');
      const scope=node('p','lstm-scope',config.scope||'쓰기 후보와 게이트는 직접 정한 값입니다. 원논문의 학습된 가중치나 실험 결과를 재현하지 않습니다.');
      function listen(element,event,handler){element.addEventListener(event,handler);listeners.push(()=>element.removeEventListener(event,handler));}
      function drawTimeline(){
        timeline.replaceChildren();let previous=-1;
        for(const index of visibleIndices(states.length,current)){
          if(previous>=0&&index-previous>1){const omitted=node('span','lstm-omitted',`… ${index-previous-1}개 …`);omitted.setAttribute('aria-label',`${previous+2}번째부터 ${index}번째까지 생략해 표시`);timeline.append(omitted);}
          const item=states[index],button=node('button','lstm-time-button');button.type='button';button.dataset.index=String(index);button.setAttribute('aria-label',`${index+1}번째 입력 · ${item.label}`);button.setAttribute('aria-pressed',String(index===current));button.classList.toggle('active',index===current);button.classList.toggle('is-future',index>current);button.append(node('span','lstm-time-index','t'+(index+1)),node('strong','',item.kind==='write'?'남길 신호':item.kind==='read'?'읽기 요청':'무관한 입력'),node('span','lstm-time-value',number(item.candidate)));timeline.append(button);previous=index;
        }
      }
      function update(){
        if(disposed)return;
        frames=makeScenario({gap,allowDistractors,blockRead});states=trace(frames);current=Math.min(current,states.length-1);
        const value=states[current],chosen=stages.find(item=>item.id===stage);root.dataset.stage=stage;root.dataset.gap=String(gap);root.dataset.index=String(current);root.dataset.allowDistractors=String(allowDistractors);root.dataset.blockRead=String(blockRead);
        for(const button of stageButtons){const active=button.dataset.stage===stage;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        for(const button of gapButtons){const active=Number(button.dataset.gap)===gap;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        for(const [button,active] of [[noiseButton,allowDistractors],[readButton,blockRead]]){button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        prev.disabled=current===0;next.disabled=current===states.length-1;drawTimeline();
        momentTitle.textContent=`t${current+1} · ${value.label}`;
        momentText.textContent=value.kind==='write'?'남길 신호를 쓰고, 아직 밖으로 읽어 보내지는 않습니다.':value.kind==='read'?'이제 남겨 둔 상태를 읽어 보낼지 결정합니다.':'새 입력이 와도, 쓰기 문을 닫으면 이전 상태가 남습니다.';
        art.innerHTML=drawing(value);stateValue.textContent=number(value.state);outputValue.textContent=number(value.output);
        status.textContent=(value.inputGate===0?'쓰기 문이 닫혀 있어 이번 후보를 더하지 않습니다. ':`쓰기 문을 통과한 ${number(value.write)}을 이전 상태에 더합니다. `)+(value.outputGate===0?'읽기 문이 닫혀 있어 외부 출력은 0입니다. 그래도 내부 상태는 남습니다.':`읽기 문이 열려 h(${number(value.state)}) = ${number(value.output)}을 밖으로 보냅니다.`);
        const steps=gap+1,p=.5;creditSteps.textContent=`첫 기록 뒤 읽기까지 ${steps}번 전달 · 중간 입력 ${gap}개 + 마지막 읽기 시점`;
        creditArt.innerHTML=derivativeDrawing(steps);const weak=gradientPath({steps,factor:p}),steady=gradientPath({steps,factor:1});ordinary.value.textContent=`0.5^${steps} = ${tiny(weak.product)}`;ordinary.fill.style.width=(weak.product*100)+'%';carousel.value.textContent=`1^${steps} = ${tiny(steady.product)}`;carousel.fill.style.width='100%';
        scene.hidden=stage==='credit';credit.hidden=stage!=='credit';stageText.textContent=chosen.text;
      }
      for(const item of stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;if(stage==='remember')current=0;else if(stage==='read')current=states.length-1;update();});stageButtons.push(button);stagesBar.append(button);}
      for(const count of GAPS){const button=node('button','',count+'개');button.type='button';button.dataset.gap=String(count);listen(button,'click',()=>{const atEnd=current===states.length-1;gap=count;if(atEnd)current=gap+1;update();});gapButtons.push(button);gaps.append(button);}
      listen(noiseButton,'click',()=>{allowDistractors=!allowDistractors;update();});listen(readButton,'click',()=>{blockRead=!blockRead;update();});
      listen(timeline,'click',event=>{const button=event.target.closest('button[data-index]');if(!button||!timeline.contains(button))return;current=Number(button.dataset.index);if(stage==='credit')stage='remember';update();});
      function jump(index){current=index;if(stage==='credit')stage='remember';update();}
      listen(prev,'click',()=>jump(Math.max(0,current-1)));listen(next,'click',()=>jump(Math.min(states.length-1,current+1)));listen(jumpWrite,'click',()=>jump(0));listen(jumpHold,'click',()=>jump(Math.max(1,Math.floor((states.length-1)/2))));listen(jumpRead,'click',()=>jump(states.length-1));
      listen(zoom,'click',()=>{expanded=!expanded;art.dataset.expanded=String(expanded);zoom.textContent=expanded?'기억 셀 그림 전체 보기':'기억 셀 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){art.tabIndex=0;art.setAttribute('role','region');art.setAttribute('aria-label','확대한 기억 셀 그림');}else{art.removeAttribute('tabindex');art.removeAttribute('role');art.removeAttribute('aria-label');}});
      root.append(stagesBar,scenario,timeline,navigation,scene,credit,stageText,scope);
      if(config.source){const link=node('a','lstm-source',config.source.title+' ↗');link.href=config.source.url;link.target='_blank';link.rel='noopener noreferrer';root.append(link);}
      host.append(root);update();
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
