/* Rumelhart, Hinton & Williams (1986), Nature, Fig.1, p.534.
 * Published, rounded weights are held fixed. Inputs in the original top-to-
 * bottom order appear left-to-right here. This computes the published net's
 * responses and sensitivities; it does not repeat its training experiment.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)';
  const PARAMETERS=Object.freeze({
    hiddenWeights:Object.freeze([Object.freeze([14.2,-3.6,7.2,-7.2,3.6,-14.2]),Object.freeze([-14.2,3.6,-7.1,7.1,-3.6,14.2])]),
    hiddenBiases:Object.freeze([-1.1,-1.1]),
    outputWeights:Object.freeze([-8.8,-8.8]),outputBias:6.4
  });
  const copy=value=>JSON.parse(JSON.stringify(value));
  const sigmoid=x=>x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));
  const finite=value=>typeof value==='number'&&Number.isFinite(value);
  function validateParameters(p){
    if(!p||!Array.isArray(p.hiddenWeights)||p.hiddenWeights.length!==2||!p.hiddenWeights.every(row=>Array.isArray(row)&&row.length===6&&row.every(finite))||!Array.isArray(p.hiddenBiases)||p.hiddenBiases.length!==2||!p.hiddenBiases.every(finite)||!Array.isArray(p.outputWeights)||p.outputWeights.length!==2||!p.outputWeights.every(finite)||!finite(p.outputBias))throw new TypeError('Expected finite parameters for a 6-2-1 network.');
  }
  /* The optional parameter copy supports independent derivative checks. The UI
   * always uses PARAMETERS. Gradients refer to E = (output - target)^2 / 2;
   * nothing in this module applies a gradient to a connection weight.
   */
  function forward(bits,parameters=PARAMETERS){
    if(!Array.isArray(bits)||bits.length!==6||!bits.every(value=>value===0||value===1))throw new TypeError('Expected six binary inputs.');
    validateParameters(parameters);
    const inputs=bits.slice(),target=Number(inputs.every((value,index)=>value===inputs[5-index]));
    const hiddenSums=parameters.hiddenWeights.map((row,index)=>row.reduce((sum,weight,i)=>sum+weight*inputs[i],parameters.hiddenBiases[index]));
    const hidden=hiddenSums.map(sigmoid);
    const outputSum=hidden.reduce((sum,value,index)=>sum+value*parameters.outputWeights[index],parameters.outputBias),output=sigmoid(outputSum);
    const difference=output-target,error=.5*difference*difference;
    const outputDelta=difference*output*(1-output);
    const hiddenDeltas=hidden.map((value,index)=>outputDelta*parameters.outputWeights[index]*value*(1-value));
    return{inputs,hiddenSums,hidden,outputSum,output,target,error,difference,gradients:{
      hiddenWeights:hiddenDeltas.map(delta=>inputs.map(input=>delta*input)),
      hiddenBiases:hiddenDeltas.slice(),outputWeights:hidden.map(value=>outputDelta*value),outputBias:outputDelta
    }};
  }
  window.AtlasBackpropModel=Object.freeze({forward,getParameters:()=>copy(PARAMETERS)});

  function drawing(state){
    const xs=[44,110,176,244,310,376],hiddenX=[132,288],inputY=224,hiddenY=132,outputX=210,outputY=48;
    const lines=[];
    for(let j=0;j<2;j++)for(let i=0;i<6;i++)lines.push(`<path d="M${xs[i]} ${inputY-11} L${hiddenX[j]} ${hiddenY+22}" stroke="${PARAMETERS.hiddenWeights[j][i]>0?INK:ACCENT}" stroke-width="${(0.7+Math.abs(PARAMETERS.hiddenWeights[j][i])/14.2).toFixed(2)}" stroke-opacity="${state.inputs[i]===1?.46:.17}"/>`);
    const disk=(x,y,value,r,label)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${BG}" stroke="${INK}" stroke-opacity=".5"/><circle cx="${x}" cy="${y}" r="${r}" fill="${ACCENT}" fill-opacity="${(.05+.7*value).toFixed(4)}"/><text x="${x}" y="${y+5}" text-anchor="middle" fill="${INK}" font-size="13" font-family="var(--mono, monospace)">${label}</text>`;
    const arrow=(x,y,rotation)=>`<path d="M-4 -3L3 0L-4 3" transform="translate(${x} ${y}) rotate(${rotation})" fill="none" stroke="${ACCENT}" stroke-width="1.5" stroke-dasharray="none"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" role="img" aria-label="원논문 Fig.1의 여섯 입력, 두 중간 단위, 한 출력. 현재 무늬 ${state.inputs.join('')}의 중간 반응은 ${state.hidden.map(value=>value.toFixed(3)).join('와 ')}이며 모형 출력은 ${state.output.toFixed(3)}이다.">
      <title>무늬에서 중간 표현을 거쳐 대칭 판단으로</title>
      <desc>모든 입력은 두 중간 단위 모두에 연결된다. 두 중간 단위는 전체 무늬의 가중합을 서로 반대 방향으로 살핀다. 원논문의 연결값을 고정해 반응을 계산한다. 점선 화살표는 오차에 대한 민감도를 거슬러 계산하는 방향이다.</desc>
      <rect x="5" y="5" width="410" height="249" rx="11" fill="${SOFT}"/>
      <g class="backprop-forward" fill="none" stroke="${INK}" stroke-linecap="round">
        ${lines.join('')}
        <path d="M132 110L194 66M288 110L226 66" stroke="${ACCENT}" stroke-width="1.8" stroke-opacity=".5"/>
        <path d="M180 70l14-4-4 14M230 80l-4-14 14 4" stroke="${ACCENT}" stroke-width="1.2" stroke-opacity=".55"/>
      </g>
      <g class="backprop-layer backprop-output-layer">
        <text x="210" y="23" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">모형 출력</text>
        ${disk(outputX,outputY,state.output,22,state.output.toFixed(2))}
      </g>
      <g class="backprop-layer backprop-hidden-layer">
        ${hiddenX.map((x,index)=>`<text x="${x}" y="98" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">중간 ${index+1}</text>${disk(x,hiddenY,state.hidden[index],22,state.hidden[index].toFixed(2))}`).join('')}
      </g>
      <g class="backprop-layer backprop-input-layer">
        ${xs.map((x,index)=>disk(x,inputY,state.inputs[index],11,String(index+1))).join('')}
        <path d="M210 193V246" stroke="${ACCENT}" stroke-opacity=".5" stroke-dasharray="3 4"/>
      </g>
      <g class="backprop-backward" fill="none" stroke="${ACCENT}" stroke-width="1.5" stroke-dasharray="4 4">
        <path d="M183 45C96 36 60 62 104 115M237 45C324 36 360 62 316 115"/>
        <path d="M109 145C48 149 28 178 35 205M311 145C372 149 392 178 385 205"/>
        ${arrow(104,115,48)}${arrow(316,115,132)}${arrow(35,205,76)}${arrow(385,205,104)}
      </g>
    </svg>`;
  }

  window.AtlasVisuals.register('backprop-published-fig1',{
    mount(host,config){
      const stages=['perception','feedback','representation'].map(id=>config.stages.find(item=>item.id===id));
      if(stages.some(item=>!item?.label||!item?.text))throw new Error('Backprop visual requires perception, feedback and representation stages.');
      const root=node('div','backprop-comparison'),listeners=[],stageButtons=[],inputButtons=[],presetButtons=[];
      let stage='representation',bits=[1,0,1,1,0,1],disposed=false;
      const controls=node('div','backprop-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','무늬와 내부 표현의 관계 살펴보기');
      const grid=node('div','backprop-grid'),figure=node('figure','backprop-network'),heading=node('figcaption');
      heading.append(node('span','backprop-kicker','PATTERN → REPRESENTATION'),node('h4','','가운데에서는 무엇을 보게 됐을까?'));
      const art=node('div','backprop-drawing');
      const pattern=node('div','backprop-inputs');pattern.setAttribute('role','group');pattern.setAttribute('aria-label','여섯 칸 무늬 바꾸기');
      const presets=node('div','backprop-presets');presets.setAttribute('role','group');presets.setAttribute('aria-label','무늬 선택');
      const weightLegend=node('div','backprop-weight-legend');weightLegend.append(node('span','','연결값의 부호'),node('span','backprop-positive','+ 연결'),node('span','backprop-negative','− 연결'));
      const inputHint=node('p','backprop-input-hint','칸을 눌러 무늬를 바꿔 보세요. 가운데 점선은 대칭축입니다.');
      figure.append(heading,art,pattern,presets,weightLegend,inputHint);

      const explanation=node('div','backprop-concepts');explanation.append(node('span','backprop-kicker','WHAT WAS TAUGHT'),node('h4','','끝의 정답으로, 안쪽의 기준을 배운다'));
      const sections=[];
      function section(group,index,title){const block=node('div','backprop-step');block.dataset.group=group;const body=node('div','backprop-step-body');body.append(node('h5','',title));block.append(node('span','backprop-step-index','0'+index),body);explanation.append(block);sections.push(block);return body;}
      const taught=section('perception',1,'알려 준 것은 대칭 여부'),goal=node('strong','backprop-target');taught.append(goal,node('p','','입력 무늬마다 원하는 최종 답을 준다.'));
      const feedback=section('feedback',2,'중간 단위의 정답은 따로 주지 않았다');feedback.append(node('p','','출력의 차이에서 각 연결이 오차에 미치는 영향을 거슬러 계산한다.'));const discrepancy=node('span','backprop-discrepancy');feedback.append(discrepancy);
      const representations=section('representation',3,'학습 뒤, 서로 반대 방향의 불균형에 반응');
      representations.append(node('p','','두 단위 모두 여섯 입력 전체를 받는다. 마주 보는 칸의 값이 같으면 그 칸들의 가중합이 서로 상쇄된다.'));
      const bars=node('div','backprop-response-bars'),barParts=[];
      for(let i=0;i<2;i++){const row=node('div','backprop-response'),label=node('span','','중간 '+(i+1)),bar=node('span','backprop-bar'),fill=node('span'),value=node('code');bar.setAttribute('aria-hidden','true');bar.append(fill);row.append(label,bar,value);bars.append(row);barParts.push({fill,value});}representations.append(bars);
      const readout=node('div','backprop-readout'),output=node('strong'),judgment=node('span');readout.append(node('span','','모형 출력'),output,judgment);explanation.append(readout);
      grid.append(figure,explanation);
      const result=node('p','backprop-explanation');result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');
      const scope=node('p','backprop-scope',config.scope||'논문 Fig.1의 학습 후 연결값으로 반응을 계산합니다. 새로 학습시키는 화면은 아닙니다.');

      function update(){
        if(disposed)return;
        const state=forward(bits);root.dataset.stage=stage;root.dataset.pattern=bits.join('');root.dataset.target=String(state.target);
        for(const button of stageButtons){const active=button.dataset.stage===stage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const block of sections)block.classList.toggle('is-focus',block.dataset.group===stage);
        for(let i=0;i<inputButtons.length;i++){const button=inputButtons[i];button.setAttribute('aria-pressed',String(bits[i]===1));button.classList.toggle('active',bits[i]===1);button.querySelector('.backprop-bit').textContent=String(bits[i]);}
        for(const button of presetButtons){const active=button.dataset.pattern===bits.join('');button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        // This HTML contains only the locally authored SVG and numeric model values.
        art.innerHTML=drawing(state);
        goal.textContent=state.target===1?'대칭 · 목표 1':'비대칭 · 목표 0';
        discrepancy.textContent='현재 출력과 목표의 차이 '+(state.difference>=0?'+':'')+state.difference.toFixed(3);
        for(let i=0;i<2;i++){barParts[i].fill.style.width=(state.hidden[i]*100).toFixed(3)+'%';barParts[i].value.textContent=state.hidden[i].toFixed(3);}
        output.textContent=state.output.toFixed(3);judgment.textContent=state.output>=.5?'대칭 쪽 반응':'비대칭 쪽 반응';
        result.textContent=stages.find(item=>item.id===stage).text;
      }
      function listen(element,event,handler){element.addEventListener(event,handler);listeners.push(()=>element.removeEventListener(event,handler));}
      for(const item of stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;update();});stageButtons.push(button);controls.append(button);}
      for(let i=0;i<6;i++){const button=node('button','backprop-input');button.type='button';button.setAttribute('aria-label','입력 '+(i+1));button.append(node('span','backprop-bit'),node('span','backprop-bit-index',String(i+1)));listen(button,'click',()=>{bits=bits.map((value,index)=>index===i?1-value:value);update();});inputButtons.push(button);pattern.append(button);}
      for(const [label,values] of [['대칭 무늬',[1,0,1,1,0,1]],['한 칸 다른 무늬',[0,0,1,1,0,1]]]){const button=node('button','',label);button.type='button';button.dataset.pattern=values.join('');listen(button,'click',()=>{bits=values.slice();update();});presetButtons.push(button);presets.append(button);}
      root.append(controls,grid,result,scope);
      if(config.source){const source=node('a','backprop-source',config.source.title+' ↗');source.href=config.source.url;source.target='_blank';source.rel='noopener noreferrer';root.append(source);}
      host.append(root);update();
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();

/* A new run of the same64-pattern task. Published Fig.1 stays an independent view. */
(function(){
  'use strict';
  const make=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const fmt=(x,n=4)=>Math.abs(x)<1e-8?'0':x.toFixed(n),signed=x=>(x>=0?'+':'')+fmt(x),clone=x=>JSON.parse(JSON.stringify(x));
  const choices=[];for(let j=0;j<2;j++)for(let i=0;i<6;i++)choices.push({key:'hiddenWeights:'+j+':'+i,label:'입력 '+(i+1)+' → 중간 '+(j+1)});for(let j=0;j<2;j++)choices.push({key:'outputWeights:'+j,label:'중간 '+(j+1)+' → 출력'});for(let j=0;j<2;j++)choices.push({key:'hiddenBiases:'+j,label:'중간 '+(j+1)+'의 편향'});choices.push({key:'outputBias',label:'출력의 편향'});
  const value=(p,key)=>key.split(':').reduce((o,k)=>o[k],p);
  const diagram=(row,p,selected)=>{
    const xs=[38,102,166,230,294,358],hs=[128,268],inputY=220,hiddenY=123,outputX=198;
    let lines='';for(let j=0;j<2;j++)for(let i=0;i<6;i++){const w=p.hiddenWeights[j][i],active=selected==='hiddenWeights:'+j+':'+i;lines+=`<path d="M${xs[i]} 204L${hs[j]} 145" stroke="${w>=0?'var(--ink)':'var(--accent)'}" stroke-width="${active?4:.6+Math.min(2.2,Math.abs(w)/5)}" opacity="${active?1:.3}"/>`;}
    for(let j=0;j<2;j++){const w=p.outputWeights[j],active=selected==='outputWeights:'+j;lines+=`<path d="M${hs[j]} 102L198 61" stroke="${w>=0?'var(--ink)':'var(--accent)'}" stroke-width="${active?4:1.6}" opacity="${active?1:.5}"/>`;}
    const circle=(x,y,r,v,label)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--bg)" stroke="var(--ink)"/><circle cx="${x}" cy="${y}" r="${r}" fill="var(--accent)" opacity="${.08+.7*v}"/><text x="${x}" y="${y+4}" text-anchor="middle" fill="var(--ink)" font-size="11">${label}</text>`;
    return `<svg viewBox="0 0 396 251" role="img" aria-label="현재 연결값으로 계산한6입력·2중간·1출력의 망. 중간 반응 ${row.hidden.map(x=>fmt(x,3)).join(', ')}, 출력 ${fmt(row.output,3)}"><title>연결이 바뀌면 같은 무늬의 중간 반응도 바뀐다</title><g fill="none">${lines}</g><text x="198" y="14" text-anchor="middle" fill="var(--muted)" font-size="10">출력 · 목표 ${row.target}</text>${circle(198,41,21,row.output,fmt(row.output,2))}${hs.map((x,j)=>`<text x="${x}" y="88" text-anchor="middle" fill="var(--muted)" font-size="10">중간 ${j+1}</text>${circle(x,123,22,row.hidden[j],fmt(row.hidden[j],2))}`).join('')}${xs.map((x,i)=>circle(x,inputY,14,row.inputs[i],row.inputs[i])).join('')}<text x="198" y="248" text-anchor="middle" fill="var(--muted)" font-size="10">여섯 칸의 입력 무늬</text></svg>`;
  };
  function scatter(rows,selected,title){
    const x=v=>38+196*v,y=v=>229-196*v;
    const dots=rows.map(r=>{const chosen=r.inputs.join('')===selected,color=r.target?'var(--accent)':'var(--ink)';return `<circle cx="${x(r.hidden[0]).toFixed(2)}" cy="${y(r.hidden[1]).toFixed(2)}" r="${chosen?5.5:r.target?3.3:2.7}" fill="${chosen?'var(--bg)':color}" stroke="${chosen?'var(--accent)':color}" stroke-width="${chosen?2:.6}" opacity="${chosen?1:r.target?.9:.4}"/>`;}).join('');
    return `<svg viewBox="0 0 272 269" role="img" aria-label="${title}. 전체64무늬의 중간1·2 반응을 좌표로 표시한다. 강조한 점은 현재선택 무늬다."><title>${title}</title><path d="M38 33V229H234" stroke="var(--line)" fill="none"/><path d="M136 33V229M38 131H234" stroke="var(--line)" stroke-dasharray="3 4" fill="none"/><g fill="var(--muted)" font-size="10"><text x="38" y="245">0</text><text x="226" y="245">1</text><text x="24" y="233">0</text><text x="24" y="39">1</text><text x="136" y="263" text-anchor="middle">중간1 반응</text><text x="12" y="131" transform="rotate(-90 12 131)" text-anchor="middle">중간2 반응</text></g>${dots}</svg>`;
  }
  function lossPlot(history){
    const max=Math.max(.001,...history.map(r=>r.loss)),last=Math.max(1,history[history.length-1].sweep),points=history.map(r=>(35+530*r.sweep/last).toFixed(2)+','+(111-87*r.loss/max).toFixed(2)).join(' ');
    return `<svg viewBox="0 0 590 140" role="img" aria-label="화면에서 실제 계산한 학습 반복별 평균 제곱 오차"><title>실제로 실행한 학습의 오차 기록</title><path d="M35 18V111H565" fill="none" stroke="var(--line)"/><polyline points="${points}" stroke="var(--accent)" stroke-width="2" fill="none"/><g font-size="9" fill="var(--muted)"><text x="3" y="27">${fmt(max,3)}</text><text x="20" y="114">0</text><text x="35" y="129">0회</text><text x="563" y="129" text-anchor="end">${last}회</text></g></svg>`;
  }
  function learning(host){
    const core=window.AtlasBackpropLearning;if(!core)throw Error('Load backprop-learning-core.js first.');
    const root=make('div','bpl-learning'),listeners=[];let state=core.create(1),initial=core.snapshot(state),lastBefore=null,bits=[1,0,1,1,0,1],selected='hiddenWeights:0:0',history=[{sweep:0,loss:initial.meanError}],disposed=false;
    const listen=(e,type,fn)=>{e.addEventListener(type,fn);listeners.push(()=>e.removeEventListener(type,fn));};
    const intro=make('div','bpl-intro');intro.append(make('span','backprop-kicker','ERROR → CONNECTIONS → INTERNAL REPRESENTATION'),make('h4','','안쪽에 무엇을 보라고 정해 주지 않고, 끝의 답으로 배우게 한다'),make('p','','망에는 대칭이면1, 비대칭이면0이라는 최종 정답만 줍니다. 중간층의 정답은 주지 않습니다. 오차가 어느 연결을 얼마나 바꿀지 정하는 신호가 되고, 바뀐 연결은 같은 무늬를 다른 내부 반응으로 표현합니다.'));
    const controls=make('div','bpl-training-controls'),seedLabel=make('label','','출발점 '),seed=make('select');seed.setAttribute('aria-label','학습 초기값 선택');seed.dataset.bplSeed='';for(const [v,t]of[[1,'초기값1'],[1986,'다른 초기값1986']]){const o=make('option','',t);o.value=String(v);seed.append(o);}seedLabel.append(seed);controls.append(seedLabel);
    const actions=[];for(const [id,text,n]of[['one','한 번 학습',1],['hundred','100번 학습',100],['finish','2000번까지 학습',2000]]){const b=make('button','',text);b.type='button';b.dataset.bplAction=id;listen(b,'click',()=>advance(id==='finish'?2000-state.sweep:Math.min(n,2000-state.sweep)));actions.push(b);controls.append(b);}const reset=make('button','','처음으로');reset.type='button';reset.dataset.bplAction='reset';controls.append(reset);
    const metrics=make('div','bpl-metrics');const metricParts=[];for(const label of['전체64무늬를 학습한 횟수','무늬당 평균 오차','학습한 무늬의 판단']){const box=make('div'),v=make('strong');box.append(make('span','',label),v);metrics.append(box);metricParts.push(v);}const status=make('p','bpl-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.dataset.bplStatus='';
    const grid=make('div','bpl-grid'),network=make('section','bpl-panel'),networkArt=make('div','bpl-network-art');network.append(make('h4','','같은 무늬, 달라진 중간 표현'),networkArt);
    const inputs=make('div','backprop-inputs');inputs.setAttribute('role','group');inputs.setAttribute('aria-label','학습망의 여섯 입력');const inputButtons=[];for(let i=0;i<6;i++){const b=make('button','backprop-input');b.type='button';b.dataset.bplInput=String(i);b.setAttribute('aria-label','학습 입력 '+(i+1));listen(b,'click',()=>{bits=bits.map((x,k)=>k===i?1-x:x);update();});inputs.append(b);inputButtons.push(b);}network.append(inputs);const presets=make('div','backprop-presets');for(const [label,pattern]of[['대칭 무늬',[1,0,1,1,0,1]],['한 칸 다른 무늬',[0,0,1,1,0,1]]]){const b=make('button','',label);b.type='button';listen(b,'click',()=>{bits=pattern.slice();update();});presets.append(b);}network.append(presets);const reaction=make('p','bpl-reaction');reaction.dataset.bplReaction='';network.append(reaction);
    const legend=make('div','backprop-weight-legend');legend.append(make('span','backprop-positive','+ 연결'),make('span','backprop-negative','− 연결'));network.append(legend);
    const weightPanel=make('section','bpl-panel');weightPanel.append(make('h4','','끝의 오차를, 앞선 연결까지 되짚는다'));const label=make('label','','살펴볼 연결 '),select=make('select');select.setAttribute('aria-label','살펴볼 연결');select.dataset.bplConnection='';for(const c of choices){const o=make('option','',c.label);o.value=c.key;select.append(o);}label.append(select);weightPanel.append(label);
    const path=make('p','bpl-gradient-path');path.dataset.bplGradientPath='';weightPanel.append(path);
    const equation=make('div','bpl-equation');equation.dataset.bplEquation='';weightPanel.append(equation);const updateTable=make('dl','bpl-update-table'),updateParts=[];for(const t of['갱신 전 연결값','64무늬의 오차를 합친 기울기','이전 변화의 영향 · 관성','이번 변화량','갱신 후 연결값']){const dd=make('dd');updateTable.append(make('dt','',t),dd);updateParts.push(dd);}weightPanel.append(updateTable);const caseContribution=make('p','bpl-note');caseContribution.dataset.bplContribution='';weightPanel.append(caseContribution);grid.append(network,weightPanel);
    const repr=make('section','bpl-panel bpl-representations');repr.append(make('h4','','정답의 색을 배우는 것이 아니라, 판단에 쓸 표현을 만든다'),make('p','','각 점은 여섯 칸 무늬 하나입니다. 가로·세로 위치는 중간 두 단위의 반응입니다. 색은 우리가 결과를 읽기 위해 붙였으며, 중간층에 색이나 좌표의 정답을 주지는 않았습니다.'));
    const plots=make('div','bpl-plots'),initialBox=make('figure'),nowBox=make('figure'),initialArt=make('div'),nowArt=make('div'),nowCaption=make('figcaption');initialBox.append(make('figcaption','','학습 전 · 같은 초기값'),initialArt);nowBox.append(nowCaption,nowArt);plots.append(initialBox,nowBox);repr.append(plots,make('p','bpl-legend','● 붉은 점: 대칭8개 · ● 짙은 점: 비대칭56개 · ○ 테두리: 선택한 무늬'));const reprReading=make('p','bpl-reading');reprReading.dataset.bplRepresentation='';repr.append(reprReading);
    const trace=make('section','bpl-panel bpl-trace'),traceArt=make('div');trace.append(make('h4','','오차도, 중간 표현도 실제 계산 결과로 비교한다'),traceArt);
    const settings=make('details','bpl-settings'),summary=make('summary','','이 실행의 초기값·학습 규칙·원논문과의 관계');settings.append(summary,make('p','','6입력·2중간·1출력, sigmoid, 가능한 이진 무늬64개 전체를 사용합니다. 각 무늬의 ½(출력−정답)²를 합친 기울기로 한 번 갱신합니다. 학습률0.1·관성0.9와 초기 범위−0.3~0.3은 원논문 Fig.1·식(9)을 따릅니다. 화면의 평균 오차는 합계 오차를64로 나눈 값이며, 갱신에는 평균이 아닌 합계의 기울기를 씁니다.'),make('p','','초기 난수 생성기 Mulberry32와 초기값 번호1·1986은 이 화면에서 정했습니다. 초기값1은 변화가 잘 보이는 사례로 골랐습니다. 원논문은 난수 시드를 공개하지 않았으므로, 이 실행을 원래 실험의 재현이나 논문에 보고된1425회와 같은 결과로 보지 않습니다. 발표된 학습 후 수치를 시작값으로 사용하지 않습니다.'),make('p','','64개 모두를 학습에 사용하므로 표시한 판단 수는 새로운 입력에 대한 시험 성능이 아닙니다. 다른 초기값에서는2000회 안에 모든 무늬를 구별하지 못할 수 있습니다. 관성이 있으므로 매 한 번의 갱신에서 오차가 반드시 감소하지는 않습니다. 두 중간 단위의 좌표에 사람이 이해하는 개념 이름을 자동으로 붙이는 기능도 아닙니다.'));
    root.append(intro,controls,metrics,status,grid,repr,trace,settings);host.append(root);
    function advance(count){if(disposed||count<=0)return;for(let i=0;i<count;i++){lastBefore=clone(state);state=core.step(state);if(state.sweep%20===0||i===count-1)history.push({sweep:state.sweep,loss:core.batch(state.parameters).meanError});}update();}
    function restart(){state=core.create(Number(seed.value));initial=core.snapshot(state);lastBefore=null;history=[{sweep:0,loss:initial.meanError}];update();}
    function update(){
      const s=core.snapshot(state),row=core.forward(bits,state.parameters),before=lastBefore||state,beforeBatch=core.batch(before.parameters),g=value(beforeBatch.gradients,selected),old=value(before.parameters,selected),priorVelocity=value(before.velocity,selected),change=-.1*g+.9*priorVelocity,after=lastBefore?value(state.parameters,selected):old+change;
      root.dataset.sweep=String(state.sweep);root.dataset.seed=String(state.seed);root.dataset.meanError=String(s.meanError);root.dataset.correct=String(s.correct);metricParts[0].textContent=state.sweep+'회';metricParts[1].textContent=fmt(s.meanError,6);metricParts[2].textContent=s.correct+' / 64개';for(const b of actions)b.disabled=state.sweep>=2000;
      status.textContent=state.sweep===0?'먼저 한 번 학습을 눌러 연결값의 전후 변화를 보고, 반복하면 중간 표현이 어떻게 달라지는지 비교하세요.':state.sweep+'회 학습 뒤 평균 오차 '+fmt(s.meanError,6)+' · 학습에 쓴64개 중 '+s.correct+'개를0.5 기준으로 구별합니다.';
      networkArt.innerHTML=diagram(row,state.parameters,selected);for(let i=0;i<6;i++){inputButtons[i].textContent=String(bits[i]);inputButtons[i].classList.toggle('active',bits[i]===1);inputButtons[i].setAttribute('aria-pressed',String(bits[i]===1));}
      reaction.textContent='목표 '+row.target+' · 현재 출력 '+fmt(row.output,4)+' · 중간 반응 '+row.hidden.map(x=>fmt(x,4)).join(' / ');
      const isHidden=selected.startsWith('hidden'),caseGradient=value(core.forward(bits,before.parameters).gradients,selected);
      path.textContent=isHidden?'출력−정답 → 출력 반응의 기울기 → 뒤쪽 연결의 영향 → 중간 반응의 기울기 → 선택한 연결':'출력−정답 → 출력 반응의 기울기 → 선택한 연결';
      equation.textContent=(lastBefore?'방금 마지막 한 번의 갱신':'현재 기울기 · 아직 연결을 갱신하기 전')+' · Δw = −0.1 × 기울기 + 0.9 × 이전 Δw';
      [old,g,.9*priorVelocity,change,after].forEach((x,i)=>updateParts[i].textContent=(i===4&&!lastBefore?'학습 뒤 표시':i===3?signed(x):fmt(x,6)));updateParts[0].dataset.bplWeightBefore='';updateParts[4].dataset.bplWeightAfter='';
      caseContribution.textContent='이 갱신에서 선택한 무늬 한 개가 기울기에 더하는 값은 '+signed(caseGradient)+'입니다. 실제 갱신에는 이 무늬만이 아니라64개 전체의 기울기를 합칩니다.';
      const pattern=bits.join('');initialArt.innerHTML=scatter(initial.rows,pattern,'학습 전 내부 표현');nowArt.innerHTML=scatter(s.rows,pattern,'현재 내부 표현');nowCaption.textContent='현재 · '+state.sweep+'회 학습';traceArt.innerHTML=lossPlot(history);
      reprReading.textContent=state.sweep===0?'지금은 작은 무작위 연결로 시작한 상태입니다. 출력의 정답을 맞히도록 연결을 바꾸면, 점들의 위치인 내부 반응도 함께 달라집니다.':s.correct===64?'이 출발점에서는 대칭 무늬들이 비슷한 내부 반응으로 모이고, 비대칭 무늬는 다른 반응을 만듭니다. 출력은 이 차이를 읽습니다. 어느 중간 단위에 좌우 차이를 보라고 직접 지정한 것은 아닙니다.':'연결은 이미 바뀌었지만 아직 모든 무늬의 관계를 구별하지 못했습니다. 오차가 줄었다는 것과 원하는 내부 표현을 충분히 찾았다는 것은 구별해 읽습니다.';
    }
    listen(seed,'change',restart);listen(reset,'click',restart);listen(select,'change',()=>{selected=select.value;update();});update();
    return()=>{disposed=true;listeners.forEach(fn=>fn());root.remove();};
  }
  window.AtlasVisuals.register('learning-hidden-representation',{
    mount(host,config){
      const root=make('div','backprop-comparison backprop-workbench'),tabs=make('div','bpl-mode-tabs'),learn=make('div'),published=make('div');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','역전파의 학습과 원논문 결과 비교');let mode='learn';
      const buttons=[];for(const [id,title]of[['learn','01 오차가 연결과 표현을 바꾸다'],['published','02 원논문의 학습 결과와 비교']]){const b=make('button','',title);b.type='button';b.dataset.bplMode=id;b.addEventListener('click',()=>{mode=id;show();});tabs.append(b);buttons.push(b);}
      root.append(tabs,learn,published);host.append(root);const disposeLearn=learning(learn),disposePublished=window.AtlasVisuals.get('backprop-published-fig1').mount(published,config);
      function show(){root.dataset.mode=mode;learn.hidden=mode!=='learn';published.hidden=mode!=='published';buttons.forEach(b=>{const active=b.dataset.bplMode===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});}show();
      return()=>{disposeLearn();disposePublished();root.remove();};
    }
  });
})();
