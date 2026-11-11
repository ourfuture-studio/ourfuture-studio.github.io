/* LeCun, Bottou, Bengio & Haffner (1998), author preprint pp.6–8, Fig.2.
 * The architecture is redrawn from the paper. The 32x32 stroke and the two
 * fixed 5x5 kernels below are independently constructed inspection examples,
 * not learned LeNet-5 parameters. Only valid cross-correlation is calculated:
 * no nonlinearity, subsampling, classifier, training, or recognition score.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)';
  const SIZE=32,WINDOW=5,MAP=28;
  const BASE_ROW=Object.freeze([-1,0,2,0,-1]);
  const FILTERS=Object.freeze({vertical:'세로 획',horizontal:'가로 획'});
  const ARCHITECTURE=Object.freeze([
    Object.freeze({id:'input',label:'입력',size:'32 × 32',kind:'image'}),
    Object.freeze({id:'c1',label:'C1',size:'6 × 28 × 28',kind:'conv'}),
    Object.freeze({id:'s2',label:'S2',size:'6 × 14 × 14',kind:'sub'}),
    Object.freeze({id:'c3',label:'C3',size:'16 × 10 × 10',kind:'conv'}),
    Object.freeze({id:'s4',label:'S4',size:'16 × 5 × 5',kind:'sub'}),
    Object.freeze({id:'c5',label:'C5',size:'120 × 1 × 1',kind:'conv'}),
    Object.freeze({id:'f6',label:'F6',size:'84',kind:'dense'}),
    Object.freeze({id:'output',label:'출력',size:'10 · RBF',kind:'output'})
  ]);
  const grid=(size,value=0)=>Array.from({length:size},()=>Array(size).fill(value));
  function makeInput(dx=0){
    if(!Number.isInteger(dx)||dx<-8||dx>8)throw new RangeError('Input shift must be an integer between -8 and 8.');
    const input=grid(SIZE);
    // An invented, block-like 4, kept away from the image boundary.
    for(let y=8;y<=23;y++)for(let x=22;x<=23;x++)input[y][x+dx]=1;
    for(let y=8;y<=16;y++)for(let x=9;x<=10;x++)input[y][x+dx]=1;
    for(let y=16;y<=17;y++)for(let x=9;x<=23;x++)input[y][x+dx]=1;
    return input;
  }
  function getKernel(id='vertical'){
    if(!Object.hasOwn(FILTERS,id))throw new RangeError('Unknown inspection filter: '+id);
    // Positive and negative totals are +1 and -1. The scale remains fixed
    // when the input moves, and the same coefficients apply at every point.
    return Array.from({length:WINDOW},(_,y)=>Array.from({length:WINDOW},(_,x)=>(id==='vertical'?BASE_ROW[x]:BASE_ROW[y])/10));
  }
  function validateInput(input){
    if(!Array.isArray(input)||input.length!==SIZE||!input.every(row=>Array.isArray(row)&&row.length===SIZE&&row.every(v=>v===0||v===1)))throw new TypeError('Expected a 32x32 binary input.');
  }
  function validateKernel(kernel){
    if(!Array.isArray(kernel)||kernel.length!==WINDOW||!kernel.every(row=>Array.isArray(row)&&row.length===WINDOW&&row.every(v=>typeof v==='number'&&Number.isFinite(v))))throw new TypeError('Expected a finite 5x5 kernel.');
  }
  function convolve(input,kernel){
    validateInput(input);validateKernel(kernel);
    return Array.from({length:MAP},(_,y)=>Array.from({length:MAP},(_,x)=>{
      let value=0;
      for(let ky=0;ky<WINDOW;ky++)for(let kx=0;kx<WINDOW;kx++)value+=input[y+ky][x+kx]*kernel[ky][kx];
      return Math.abs(value)<1e-12?0:value;
    }));
  }
  function inspect({shift=0,filter='vertical',x=20,y=12}={}){
    if(shift!==0&&shift!==2)throw new RangeError('Inspection shift must be 0 or 2.');
    if(!Number.isInteger(x)||!Number.isInteger(y)||x<0||x>=MAP||y<0||y>=MAP)throw new RangeError('Inspection position must be inside the 28x28 response map.');
    const input=makeInput(shift),kernel=getKernel(filter),response=convolve(input,kernel);
    const patch=input.slice(y,y+WINDOW).map(row=>row.slice(x,x+WINDOW));
    return{input,response,kernel,patch,score:response[y][x],x,y,shift,filter};
  }
  window.AtlasLeNetModel=Object.freeze({makeInput,getKernel,convolve,inspect});

  function matrixDrawing(values,x,y,response=false){
    const n=values.length,side=272,cell=side/n,cells=[];
    for(let row=0;row<n;row++)for(let col=0;col<n;col++){
      const value=values[row][col],magnitude=Math.min(1,Math.abs(value));
      const color=response?(value<0?INK:ACCENT):INK;
      cells.push(`<rect x="${(24+col*cell).toFixed(3)}" y="${(11+row*cell).toFixed(3)}" width="${(cell+.025).toFixed(3)}" height="${(cell+.025).toFixed(3)}" fill="${color}" fill-opacity="${response?magnitude.toFixed(4):value}"/>`);
    }
    const marks=[];
    for(let i=0;i<=n;i++)marks.push(`<path d="M${(24+i*cell).toFixed(3)} 11V283M24 ${(11+i*cell).toFixed(3)}H296"/>`);
    const bx=24+x*cell,by=11+y*cell,width=response?cell:WINDOW*cell;
    const aria=response?'28행 28열 반응 지도. 같은 5×5 필터를 모든 유효 위치에 적용한 합이다.':'32행 32열의 직접 만든 획 그림. 강조된 5×5 창의 값만 현재 위치의 계산에 사용된다.';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 295" role="img" aria-label="${aria}">
      <title>${response?'같은 필터의 위치별 반응':'작은 영역을 보는 입력의 검사창'}</title>
      <desc>${response?'반응 지도는 입력이 이동하면 함께 이동한다. 양의 반응은 버건디, 음의 반응은 잉크색이며 각 지도는 같은 색상 범위를 쓴다. 분류 결과나 확률이 아니다.':'획은 데이터셋의 실제 손글씨가 아닌 자체 구성이다. 한 번에 5×5 영역을 검사하고 창을 이동해 같은 계수를 다시 쓴다.'}</desc>
      <rect x="24" y="11" width="272" height="272" rx="1" fill="${BG}"/>
      ${cells.join('')}
      <g stroke="${INK}" stroke-opacity=".08" stroke-width=".45" fill="none">${marks.join('')}</g>
      <rect x="${bx.toFixed(3)}" y="${by.toFixed(3)}" width="${width.toFixed(3)}" height="${width.toFixed(3)}" fill="${ACCENT}" fill-opacity="${response?0:.075}" stroke="${BG}" stroke-width="5"/>
      <rect class="lenet-window" x="${bx.toFixed(3)}" y="${by.toFixed(3)}" width="${width.toFixed(3)}" height="${width.toFixed(3)}" fill="none" stroke="${ACCENT}" stroke-width="2.4"/>
    </svg>`;
  }
  function kernelDrawing(kernel){
    const cells=[];
    for(let y=0;y<WINDOW;y++)for(let x=0;x<WINDOW;x++){
      const value=kernel[y][x];cells.push(`<rect x="${x*8+1}" y="${y*8+1}" width="7" height="7" fill="${value<0?INK:value>0?ACCENT:BG}" fill-opacity="${value===0?1:Math.abs(value)/.2}" stroke="${INK}" stroke-opacity=".12" stroke-width=".5"/>`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" role="img" aria-label="현재 선택한 고정 5×5 필터. 이 25개 계수를 모든 위치에서 공유한다.">${cells.join('')}</svg>`;
  }

  // Independently drawn conceptual diagrams. These do not reproduce a cortical
  // experiment, an anatomical wiring diagram, or measured response values.
  // Parameter sharing and backpropagation appear only in the model panels.
  function inspirationDrawing(id){
    const diagrams={
      cortex:{
        title:'작은 시야와 방향에 따른 선택 반응의 개념도',
        desc:'시야의 일부를 점선 원으로 표시하고, 그 안의 기울어진 선과 방향에 선택적으로 반응하는 단위를 잇는다. 선은 정보의 관계를 나타내며 해부학적 배선이나 실제 발화 기록이 아니다.',
        drawing:`<rect x="12" y="20" width="130" height="116" rx="7" fill="${BG}" stroke="${INK}" stroke-opacity=".28"/>
          <path d="M30 45V72M104 112H125" fill="none" stroke="${INK}" stroke-opacity=".2" stroke-width="5" stroke-linecap="round"/>
          <circle cx="77" cy="78" r="32" fill="${ACCENT}" fill-opacity=".05" stroke="${ACCENT}" stroke-width="1.7" stroke-dasharray="4 4"/>
          <path d="M64 99L90 57" fill="none" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>
          <path d="M154 78H186M179 72L186 78L179 84" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="237" cy="78" r="34" fill="${SOFT}" stroke="${INK}" stroke-width="1.5"/>
          <circle cx="237" cy="78" r="25" fill="${ACCENT}" fill-opacity=".07" stroke="${ACCENT}" stroke-opacity=".55"/>
          <path d="M224 99L250 57" fill="none" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>`
      },
      neocognitron:{
        title:'Neocognitron의 S세포층과 C세포층을 잇는 개념도',
        desc:'S층에서 특징을 찾고, C층에서 같은 특징의 서로 가까운 위치 반응을 모으는 관계를 S와 C의 두 쌍으로 나타낸 별도의 신경망 모형이다. 실제 세포나 측정값을 나타내지 않는다.',
        drawing:`<g fill="${BG}" stroke="${INK}" stroke-opacity=".28" stroke-width="1.2">
            <rect x="16" y="43" width="44" height="66" rx="4"/><rect x="21" y="38" width="44" height="66" rx="4"/>
            <rect x="88" y="43" width="44" height="66" rx="4"/>
            <rect x="158" y="43" width="44" height="66" rx="4"/><rect x="163" y="38" width="44" height="66" rx="4"/>
            <rect x="230" y="43" width="44" height="66" rx="4"/>
          </g>
          <g fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round">
            <path d="M31 83L44 60M46 90L57 71"/><path d="M173 80L183 61L195 80M177 91H194"/>
          </g>
          <g fill="${ACCENT}" fill-opacity=".55"><circle cx="102" cy="67" r="3"/><circle cx="117" cy="73" r="3"/><circle cx="108" cy="88" r="3"/>
            <circle cx="244" cy="67" r="3"/><circle cx="259" cy="73" r="3"/><circle cx="250" cy="88" r="3"/></g>
          <g fill="none" stroke="${ACCENT}" stroke-opacity=".55" stroke-width="1.3"><ellipse cx="109" cy="77" rx="18" ry="25"/><ellipse cx="251" cy="77" rx="18" ry="25"/></g>
          <g fill="none" stroke="${INK}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M69 76H81M77 72L81 76L77 80M137 76H151M147 72L151 76L147 80M211 76H223M219 72L223 76L219 80"/></g>
          <g fill="${INK}" font-family="sans-serif" font-size="14" text-anchor="middle"><text x="43" y="132">S</text><text x="110" y="132">C</text><text x="185" y="132">S</text><text x="252" y="132">C</text></g>`
      },
      lenet:{
        title:'LeNet에서 특징층을 잇고 오차를 거슬러 보내는 개념도',
        desc:'입력 그림에서 C와 S 특징층을 거쳐 문자 출력으로 이어지는 순방향을 실선으로 표시한다. 출력 쪽의 오차가 앞선 층의 학습에 영향을 주는 역방향은 점선이다. 이는 신경망의 설계이며 뇌에서 측정한 학습 경로가 아니다.',
        drawing:`<g fill="${BG}" stroke="${INK}" stroke-opacity=".3" stroke-width="1.2"><rect x="12" y="36" width="49" height="69" rx="4"/>
            <rect x="100" y="40" width="33" height="58" rx="3"/><rect x="105" y="35" width="33" height="58" rx="3"/>
            <rect x="147" y="47" width="29" height="45" rx="3"/><rect x="152" y="42" width="29" height="45" rx="3"/>
            <rect x="222" y="41" width="53" height="58" rx="5"/></g>
          <path d="M45 49V91M27 49V74H45" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <g fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"><path d="M114 72L127 51M115 81L129 65M160 69L170 53"/></g>
          <path d="M258 53V87M240 53V73H258" fill="none" stroke="${ACCENT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          <g fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M68 70H91M85 64L91 70L85 76M188 70H214M208 64L214 70L208 76"/></g>
          <path d="M249 110V123H121V101M115 107L121 101L127 107" fill="none" stroke="${ACCENT}" stroke-width="1.7" stroke-dasharray="4 4" stroke-linecap="round" stroke-linejoin="round"/>
          <g fill="${INK}" font-family="sans-serif" font-size="13" text-anchor="middle"><text x="121" y="26">C</text><text x="166" y="32">S</text></g>`
      }
    };
    const diagram=diagrams[id];
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 155" role="img" aria-label="${diagram.title}"><title>${diagram.title}</title><desc>${diagram.desc}</desc>${diagram.drawing}</svg>`;
  }
  function inspirationSection(config){
    const ids=['cortex','neocognitron','lenet'];
    const items=ids.map(id=>config.items?.find(item=>item.id===id));
    if(!config.title||items.some(item=>!item?.eyebrow||!item?.title||!item?.text))throw new Error('LeNet inspiration requires a title and cortex, neocognitron and lenet items.');
    const section=node('section','lenet-inspiration');section.setAttribute('aria-label',config.title);
    section.append(node('h4','lenet-inspiration-title',config.title));
    const cards=node('div','lenet-inspiration-grid');
    for(const item of items){
      const figure=node('figure','lenet-inspiration-card');figure.dataset.inspiration=item.id;
      const caption=node('figcaption');caption.append(node('span','lenet-kicker',item.eyebrow),node('h5','',item.title));
      const drawing=node('div','lenet-inspiration-drawing');drawing.innerHTML=inspirationDrawing(item.id);
      figure.append(caption,drawing,node('p','lenet-inspiration-text',item.text));cards.append(figure);
    }
    section.append(cards,node('p','lenet-inspiration-note',config.note||'관찰과 설계의 관계를 설명하는 자체 개념도다. 해부학적 연결도나 실제 발화 기록이 아니다.'));
    if(config.sources?.length){
      const sources=node('ul','lenet-inspiration-sources');sources.setAttribute('aria-label','관찰과 모형의 원문');
      for(const item of config.sources){const link=node('a','',item.title+' ↗');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';const li=node('li');li.append(link);sources.append(li);}
      section.append(sources);
    }
    return section;
  }

  window.AtlasVisuals.register('shared-features',{
    mount(host,config){
      const stages=['local','shared','hierarchy'].map(id=>config.stages.find(s=>s.id===id));
      if(stages.some(s=>!s?.label||!s?.text))throw new Error('LeNet visual requires local, shared and hierarchy stages.');
      const root=node('div','lenet-comparison'),listeners=[],stageButtons=[],positionButtons=[],filterButtons=[],scanButtons=[],layerButtons=[];
      let stage='shared',shift=0,filter='vertical',scan=2,disposed=false;
      const scanPositions=[{label:'왼쪽',x:7},{label:'가운데',x:14},{label:'오른쪽',x:20}];
      const controls=node('div','lenet-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','작은 영역에서 전체 인식으로 살펴보기');
      const maps=node('div','lenet-map-grid');
      function panel(kicker,title,cls){
        const figure=node('figure','lenet-map-panel '+cls),caption=node('figcaption');caption.append(node('span','lenet-kicker',kicker),node('h4','',title));
        const drawing=node('div','lenet-map');figure.append(caption,drawing);maps.append(figure);return{figure,drawing};
      }
      const input=panel('INPUT · 32 × 32','작은 창으로 획의 일부를 본다','lenet-input-panel');
      const response=panel('RESPONSE · 28 × 28','같은 기준을 모든 위치에 쓴다','lenet-response-panel');
      const positions=node('div','lenet-options');positions.setAttribute('role','group');positions.setAttribute('aria-label','획 그림의 위치');
      const inputNote=node('p','lenet-map-note');input.figure.append(positions,inputNote);
      const filters=node('div','lenet-options');filters.setAttribute('role','group');filters.setAttribute('aria-label','공유할 필터 선택');
      const score=node('p','lenet-map-note lenet-score');response.figure.append(filters,score);
      const inspectBar=node('div','lenet-inspection');
      const scanGroup=node('div','lenet-scan');scanGroup.setAttribute('role','group');scanGroup.setAttribute('aria-label','검사할 창 위치');scanGroup.append(node('span','lenet-small-label','창 위치'));
      const kernelBox=node('div','lenet-kernel-box'),kernelArt=node('span','lenet-kernel'),kernelText=node('span','lenet-kernel-text');kernelBox.append(kernelArt,kernelText);
      inspectBar.append(scanGroup,kernelBox);
      const legend=node('div','lenet-legend');legend.append(node('span','','반응값'),node('span','lenet-negative','−1'),node('span','lenet-zero','0'),node('span','lenet-positive','+1'),node('span','lenet-legend-note','색 범위는 두 위치에서 같다'));
      const result=node('p','lenet-explanation');result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');
      const architecture=node('section','lenet-architecture');architecture.setAttribute('aria-label','논문 Fig.2의 LeNet-5 구조');
      architecture.append(node('h4','','LeNet-5 · 논문 Fig.2의 구조'));
      const steps=node('ol','lenet-layers');
      for(const [index,layer] of ARCHITECTURE.entries()){
        const item=node('li','lenet-layer');item.dataset.layer=layer.id;item.dataset.kind=layer.kind;
        const button=node('button','lenet-layer-button');button.type='button';button.dataset.layer=layer.id;button.setAttribute('aria-pressed','false');button.setAttribute('aria-label',layer.label+' · '+layer.size+' · 층 선택');
        const icon=node('span','lenet-stack');icon.setAttribute('aria-hidden','true');for(let n=0;n<(layer.kind==='image'?1:3);n++)icon.append(node('i'));
        button.append(node('span','lenet-layer-number',String(index+1).padStart(2,'0')),icon,node('strong','',layer.label),node('span','lenet-layer-size',layer.size));item.append(button);steps.append(item);layerButtons.push({button,item});
      }
      architecture.append(steps,node('p','lenet-architecture-note','위 계산은 첫 특징맵의 원리를 살핀 부분이다. 전체 망의 학습 결과를 표시한 것은 아니다.'));
      if(config.visionSystem?.layerConnections)architecture.append(node('p','lenet-architecture-link-note','층을 선택하면 위의 시각계 그림과 LeNet의 설계 설명을 함께 살펴볼 수 있습니다.'));
      const scope=node('p','lenet-scope',config.scope||'화면의 획과 필터값은 원리를 살펴보도록 직접 정했습니다. LeNet-5의 학습된 가중치나 숫자 인식 결과는 아닙니다.');
      function listen(element,event,handler){element.addEventListener(event,handler);listeners.push(()=>element.removeEventListener(event,handler));}
      function update(){
        if(disposed)return;
        const state=inspect({shift,filter,x:scanPositions[scan].x+shift,y:12});
        root.dataset.stage=stage;root.dataset.shift=String(shift);root.dataset.filter=filter;root.dataset.scan=String(scan);
        for(const button of stageButtons){const active=button.dataset.stage===stage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const button of positionButtons){const active=Number(button.dataset.shift)===shift;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const button of filterButtons){const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const button of scanButtons){const active=Number(button.dataset.scan)===scan;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        // Only locally generated SVG and bounded numeric results are inserted.
        input.drawing.innerHTML=matrixDrawing(state.input,state.x,state.y,false);
        response.drawing.innerHTML=matrixDrawing(state.response,state.x,state.y,true);
        kernelArt.innerHTML=kernelDrawing(state.kernel);
        kernelText.textContent=FILTERS[filter]+' · 같은 5×5 계수';
        inputNote.textContent='강조한 5×5 창의 시작: 가로 '+(state.x+1)+', 세로 '+(state.y+1);
        score.textContent='이 창의 반응 '+(state.score>0?'+':'')+state.score.toFixed(3);
        const chosen=stages.find(s=>s.id===stage);
        result.textContent=chosen.text+' '+(shift===2?'획과 함께 강조한 창·반응 위치도 오른쪽 두 칸으로 옮겼다.':'획의 위치를 바꾸어 반응 지도의 위치를 비교해 보세요.');
      }
      for(const item of stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;update();});stageButtons.push(button);controls.append(button);}
      for(const [label,value] of [['원래 위치',0],['오른쪽 두 칸',2]]){const button=node('button','',label);button.type='button';button.dataset.shift=String(value);listen(button,'click',()=>{shift=value;update();});positionButtons.push(button);positions.append(button);}
      for(const [id,label] of Object.entries(FILTERS)){const button=node('button','',label);button.type='button';button.dataset.filter=id;listen(button,'click',()=>{filter=id;update();});filterButtons.push(button);filters.append(button);}
      for(const [index,item] of scanPositions.entries()){const button=node('button','',item.label);button.type='button';button.dataset.scan=String(index);listen(button,'click',()=>{scan=index;update();});scanButtons.push(button);scanGroup.append(button);}
      let composite=null,disposeVision=null;
      function selectArchitectureLayer(id){
        root.dataset.layer=id||'';
        for(const entry of layerButtons){const selected=entry.button.dataset.layer===id;entry.button.setAttribute('aria-pressed',String(selected));entry.button.classList.toggle('active',selected);entry.item.dataset.selected=String(selected);}
      }
      for(const entry of layerButtons)listen(entry.button,'click',()=>{selectArchitectureLayer(entry.button.dataset.layer);if(config.visionSystem?.layerConnections)disposeVision?.selectLayer(entry.button.dataset.layer,{scroll:true});});
      if(config.visionSystem){
        if(typeof window.AtlasVisionSystem?.mount!=='function')throw new Error('AtlasVisionSystem must be loaded before mounting the LeNet vision view.');
        composite=node('div','lenet-visual-composite');
        const visionHost=node('div','lenet-vision-host');composite.append(visionHost);
        root.dataset.layerLinks=String(Boolean(config.visionSystem.layerConnections));
        disposeVision=window.AtlasVisionSystem.mount(visionHost,config.visionSystem,{onLayerSelect:selectArchitectureLayer});
        root.append(node('h4','lenet-investigation-heading','LeNet의 설계에서 살펴보기'));
      }else if(config.inspiration)root.append(inspirationSection(config.inspiration),node('h4','lenet-investigation-heading','LeNet의 설계에서 살펴보기'));
      root.append(controls,maps,inspectBar,legend,result,architecture,scope);
      if(config.source){const source=node('a','lenet-source',config.source.title+' ↗');source.href=config.source.url;source.target='_blank';source.rel='noopener noreferrer';root.append(source);}
      if(composite){composite.append(root);host.append(composite);}else host.append(root);update();
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();if(disposeVision){disposeVision();disposeVision=null;}root.remove();if(composite)composite.remove();};
    }
  });
})();
