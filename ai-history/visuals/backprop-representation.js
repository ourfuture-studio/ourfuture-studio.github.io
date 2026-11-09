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

  window.AtlasVisuals.register('learning-hidden-representation',{
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
