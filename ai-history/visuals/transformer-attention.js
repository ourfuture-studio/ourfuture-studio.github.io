/* Chosen matrices make the arithmetic inspectable. They are not learned 2017 weights. */
(function(){
  'use strict';
  const LIMIT=256;
  const hasText=x=>typeof x==='string'&&x.trim().length>0;
  const integer=(x,name,min=1,max=LIMIT)=>{if(!Number.isSafeInteger(x)||x<min||x>max)throw new RangeError(name+' is outside its supported integer range.');return x;};
  const finite=x=>{if(!Number.isFinite(x))throw new RangeError('The chosen values overflow the computation.');return x;};
  function matrix(value,name){
    if(!Array.isArray(value)||!value.length||value.length>LIMIT||!Array.isArray(value[0])||!value[0].length||value[0].length>LIMIT)throw new TypeError(name+' must be a nonempty bounded matrix.');
    const columns=value[0].length;
    if(!value.every(row=>Array.isArray(row)&&row.length===columns&&row.every(Number.isFinite)))throw new TypeError(name+' must be a rectangular finite matrix.');
    return value.map(row=>row.slice());
  }
  const zeros=(rows,columns)=>Array.from({length:rows},()=>Array(columns).fill(0));
  function product(left,right){
    if(left[0].length!==right.length)throw new RangeError('Matrix projection dimensions must match.');
    return left.map(row=>right[0].map((_,j)=>row.reduce((sum,value,k)=>finite(sum+finite(value*right[k][j])),0)));
  }
  function scaledDotAttention(options){
    if(!options||typeof options!=='object')throw new TypeError('Attention options are required.');
    const queries=matrix(options.queries,'queries'),keys=matrix(options.keys,'keys'),values=matrix(options.values,'values');
    if(queries[0].length!==keys[0].length||keys.length!==values.length)throw new RangeError('Queries and keys need the same width, and keys and values the same row count.');
    let mask=null;
    if(options.mask!==undefined){
      if(!Array.isArray(options.mask)||options.mask.length!==queries.length||!options.mask.every(row=>Array.isArray(row)&&row.length===keys.length&&row.every(x=>typeof x==='boolean')))throw new TypeError('The mask must match query by key positions and contain booleans.');
      mask=options.mask.map(row=>row.slice());
      if(mask.some(row=>!row.some(Boolean)))throw new RangeError('Every query needs at least one permitted key.');
    }
    const divisor=Math.sqrt(queries[0].length);
    const scores=queries.map(q=>keys.map(k=>finite(q.reduce((sum,value,d)=>finite(sum+finite(value*k[d])),0)/divisor)));
    const weights=scores.map((row,i)=>{
      const maximum=Math.max(...row.filter((_,j)=>!mask||mask[i][j]));
      const exponentials=row.map((score,j)=>mask&&!mask[i][j]?0:Math.exp(score-maximum));
      const denominator=exponentials.reduce((sum,value)=>sum+value,0);
      return exponentials.map(value=>value/denominator);
    });
    const output=weights.map(row=>values[0].map((_,d)=>row.reduce((sum,weight,j)=>finite(sum+finite(weight*values[j][d])),0)));
    return{scores,weights,output};
  }
  function causalMask(options){
    if(!options||typeof options!=='object')throw new TypeError('Mask options are required.');
    const queryLength=integer(options.queryLength,'queryLength'),keyLength=integer(options.keyLength,'keyLength'),offset=options.offset===undefined?0:integer(options.offset,'offset',0,LIMIT);
    return Array.from({length:queryLength},(_,i)=>Array.from({length:keyLength},(_,j)=>j<=i+offset));
  }
  function positionalEncoding(options){
    if(!options||typeof options!=='object')throw new TypeError('Position options are required.');
    const length=integer(options.length,'length'),dimension=integer(options.dimension,'dimension'),base=options.base===undefined?10000:options.base;
    if(dimension%2!==0)throw new RangeError('Sinusoidal position pairs require an even dimension.');
    if(!Number.isFinite(base)||base<=0)throw new RangeError('The positional base must be positive and finite.');
    return Array.from({length},(_,position)=>Array.from({length:dimension},(_,d)=>{const angle=finite(position/finite(Math.pow(base,2*Math.floor(d/2)/dimension)));return d%2?Math.cos(angle):Math.sin(angle);}));
  }
  function contextualize(options){
    if(!options||typeof options!=='object')throw new TypeError('Context options are required.');
    const embedding=matrix(options.inputVectors,'inputVectors'),dimension=embedding[0].length,usePositions=options.usePositions===undefined?true:options.usePositions;
    if(typeof usePositions!=='boolean')throw new TypeError('usePositions must be boolean.');
    if(!Array.isArray(options.heads)||!options.heads.length||options.heads.length>LIMIT||options.heads.some(h=>!h||!hasText(h.id))||new Set(options.heads.map(h=>h.id)).size!==options.heads.length)throw new TypeError('Heads need distinct nonempty ids.');
    const scaledInput=embedding.map(row=>row.map(value=>finite(value*Math.sqrt(dimension))));
    const positions=usePositions?positionalEncoding({length:embedding.length,dimension}):zeros(embedding.length,dimension);
    const input=scaledInput.map((row,i)=>row.map((value,d)=>finite(value+positions[i][d])));
    const heads=options.heads.map(head=>{
      const WQ=matrix(head.WQ,'WQ'),WK=matrix(head.WK,'WK'),WV=matrix(head.WV,'WV');
      if(WQ.length!==dimension||WK.length!==dimension||WV.length!==dimension||WQ[0].length!==WK[0].length)throw new RangeError('Each head projects the input width into matching query/key widths and a value width.');
      const queries=product(input,WQ),keys=product(input,WK),values=product(input,WV),attention=scaledDotAttention({queries,keys,values});
      return{id:head.id,queries,keys,values,...attention};
    });
    const concatenated=input.map((_,i)=>heads.flatMap(head=>head.output[i]));
    if(concatenated[0].length>LIMIT)throw new RangeError('The concatenated head width exceeds its supported range.');
    const projection=matrix(options.outputProjection,'outputProjection');
    if(projection.length!==concatenated[0].length||projection[0].length!==dimension)throw new RangeError('The output projection must map concatenated heads back to the input width.');
    const output=product(concatenated,projection);
    return{scaledInput,positions,input,heads,concatenated,output};
  }
  window.AtlasTransformerModel=Object.freeze({scaledDotAttention,causalMask,positionalEncoding,contextualize});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const number=value=>Math.abs(value)<.00005?'0.0000':value.toFixed(4);
  const vector=row=>'['+row.map(number).join(', ')+']';
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'transformer-source');
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['attend','structure','evidence'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three Transformer stages are required.');
    const c=config.calculation;
    if(!c||!Array.isArray(c.examples)||!c.examples.length||new Set(c.examples.map(e=>e.id)).size!==c.examples.length||!hasText(c.scope)||!sourced(c.source)||!Array.isArray(c.heads)||!c.heads.every(h=>hasText(h.label)))throw new TypeError('Calculation examples need labels, matrices, scope and source.');
    for(const ex of c.examples){if(!ex||!['id','label','translation'].every(k=>hasText(ex[k]))||!Array.isArray(ex.tokens)||!ex.tokens.length||!ex.tokens.every(hasText)||ex.tokens.length!==ex.inputVectors?.length)throw new TypeError('Every example needs tokens and matching input rows.');integer(c.initialQuery,'initialQuery',0,ex.tokens.length-1);contextualize({inputVectors:ex.inputVectors,heads:c.heads,outputProjection:c.outputProjection});}
    const s=config.structure;
    if(!s||!['sourceTokens','decoderInputTokens','expectedTokens'].every(k=>Array.isArray(s[k])&&s[k].length&&s[k].every(hasText))||s.decoderInputTokens.length!==s.expectedTokens.length||!Array.isArray(s.modes)||!['encoder','decoder','cross'].every(id=>s.modes.some(m=>m.id===id&&['label','title','text'].every(k=>hasText(m[k]))&&sourced(m.source)))||!hasText(s.scope)||!sourced(s.source))throw new TypeError('The architecture needs source, shifted decoder inputs, targets and three sourced modes.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Evidence needs local original figures and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs a scope and original source.');
  }
  window.AtlasVisuals.register('word-in-context',{
    mount(host,config){
      validate(config);
      const root=node('div','transformer-attention'),listeners=[],stageButtons=[],exampleButtons=[],headButtons=[],queryButtons=[],modeButtons=[],structureButtons=[],evidenceButtons=[];
      let stage='attend',exampleId=config.calculation.examples[0].id,headId=config.calculation.heads[0].id,queryIndex=config.calculation.initialQuery,usePositions=true,modeId='encoder',structureIndex=Math.min(1,config.structure.sourceTokens.length-1),evidenceId=config.evidence[0].id,evidenceExpanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const mark=(buttons,key,value)=>{for(const button of buttons){const on=String(button.dataset[key])===String(value);button.setAttribute('aria-pressed',String(on));button.classList.toggle('active',on);}};
      const group=(label,cls)=>{const el=node('div',cls||'transformer-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(text,parent,fn)=>{const el=node('button','',text);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const stages=group('Transformer의 문맥 표현을 읽는 단계','transformer-stage-controls'),stageText=node('p','transformer-stage-text');
      const attend=node('section','transformer-attend'),structure=node('section','transformer-structure'),evidence=node('section','transformer-evidence');
      const examples=group('비교할 입력 문장'),translation=node('p','transformer-prose'),positionControls=group('입력의 위치 정보'),positionToggle=button('위치 정보 켜짐',positionControls,()=>{usePositions=!usePositions;updateAttention();});positionToggle.setAttribute('aria-pressed','true');
      const queries=group('새 표현을 만들 query 위치','transformer-query-controls'),heads=group('살펴볼 Attention Head'),queryStatus=node('p','transformer-selection-status');queryStatus.setAttribute('role','status');queryStatus.setAttribute('aria-live','polite');
      const diagram=node('div','transformer-attention-viewport'),diagramInner=node('div','transformer-attention-diagram');diagram.append(diagramInner);diagram.tabIndex=0;diagram.setAttribute('role','region');diagram.setAttribute('aria-label','선택한 위치가 다른 위치의 값을 모으는 계산');
      const outputs=node('div','transformer-outputs'),comparison=node('div','transformer-comparison');
      const calculations=node('details','transformer-details');calculations.append(node('summary','','직접 정한 수치와 행렬로 계산 확인'));const calculationBody=node('div');calculations.append(calculationBody);
      const positions=node('details','transformer-details');positions.append(node('summary','','순서와 여러 head는 어디에 들어갈까?'));
      positions.append(node('p','transformer-prose','단어 벡터 E에 √d_model을 곱하고, 위치마다 다른 sine·cosine 값을 더해 X를 만듭니다. 각 head는 서로 다른 WQ·WK·WV로 X를 투영합니다. 여기서는 두 head의 출력을 붙인 뒤 WO로 다시 네 성분으로 바꿉니다.'),node('p','transformer-formula','PE(pos, 2i) = sin(pos / 10000^(2i/d))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d))'),node('p','transformer-note','이 화면의 위치 번호는 0부터 시작합니다. 두 head와 각 벡터 성분에 문법·의미 역할 이름을 붙이지 않았습니다. 의미가 정해진 축이나 원모형에서 배운 가중치를 표시하는 것이 아닙니다.'));
      attend.append(examples,translation,positionControls,queries,heads,queryStatus,diagram,node('p','transformer-note','선의 비중은 이 head가 어느 위치의 V를 얼마나 섞는지를 나타냅니다. 다음 단어의 확률이나, 사람이 해석한 정답 관계의 확률이 아닙니다.'),outputs,comparison,calculations,positions,node('p','transformer-scope',config.calculation.scope),source(config.calculation.source));

      const modes=group('세 attention 블록의 참고 범위'),modeTitle=node('h4'),modeText=node('p','transformer-prose'),structureQueries=group('참고 범위를 확인할 query 위치','transformer-query-controls'),architecture=node('div','transformer-architecture'),access=node('div','transformer-access'),structureStatus=node('div','transformer-structure-status'),modeSource=node('div');
      structureStatus.setAttribute('role','status');structureStatus.setAttribute('aria-live','polite');
      structure.append(modes,modeTitle,modeText,structureQueries,architecture,node('p','transformer-legend','행은 Q를 만드는 위치, 열은 K·V를 가져오는 위치입니다. ● 가능은 참고할 수 있음, × 차단은 참고할 수 없음을 뜻합니다. 이 표는 확률 heatmap이 아닙니다.'),access,structureStatus,modeSource,node('p','transformer-scope',config.structure.scope),source(config.structure.source));

      const evidenceControls=group('원문 그림 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','transformer-prose'),evidenceScope=node('p','transformer-scope'),evidenceSource=node('div'),evidenceCredit=node('p','transformer-credit'),evidenceZoom=node('button','transformer-zoom','원문 그림 확대'),evidencePane=node('div','transformer-evidence-viewport'),evidenceImage=node('img');evidenceZoom.type='button';evidenceZoom.setAttribute('aria-pressed','false');evidenceImage.decoding='async';evidencePane.append(evidenceImage);
      evidence.append(evidenceControls,evidenceTitle,evidenceCaption,evidenceZoom,node('p','transformer-note','확대하면 그림 영역 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),evidencePane,evidenceScope,evidenceSource,evidenceCredit);

      const selectedExample=()=>config.calculation.examples.find(e=>e.id===exampleId);
      const calculate=ex=>contextualize({inputVectors:ex.inputVectors,heads:config.calculation.heads,outputProjection:config.calculation.outputProjection,usePositions});
      function table(headers,rows,label,minWidth){
        const pane=node('div','transformer-table-viewport');pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label',label);const el=node('table'),head=node('thead'),line=node('tr');for(const title of headers)line.append(node('th','',title));head.append(line);el.append(head);const body=node('tbody');for(const row of rows){const tr=node('tr');for(const value of row)tr.append(node('td','',String(value)));body.append(tr);}el.append(body);if(minWidth)el.style.minWidth=minWidth+'px';pane.append(el);return pane;
      }
      function drawAttention(ex,result,head){
        const weights=head.weights[queryIndex],selected=node('div','transformer-query-box');selected.append(node('span','','Q를 만드는 위치 '+queryIndex),node('strong','',ex.tokens[queryIndex]),node('span','',vector(head.queries[queryIndex])));
        const links=node('div','transformer-attention-links'),maximum=Math.max(...weights),width=ex.tokens.length*100;
        links.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+width+' 100" preserveAspectRatio="none" role="img" aria-label="query에서 각 key와 value 위치로 이어지는 직접 계산한 attention 비중">'+weights.map((weight,i)=>'<path d="M'+(width/2)+' 3 Q'+(width/2)+' 48 '+(i*100+50)+' 95" fill="none" stroke="var(--accent)" stroke-width="'+(1+weight*10)+'" stroke-opacity="'+(.2+.8*weight/maximum)+'"/>').join('')+'</svg>';
        const references=node('div','transformer-reference-row');references.style.gridTemplateColumns='repeat('+ex.tokens.length+',minmax(0,1fr))';
        for(let i=0;i<ex.tokens.length;i++){const cell=node('div','transformer-reference'),track=node('div','transformer-weight-track'),fill=node('span','transformer-weight-fill');cell.dataset.selected=String(i===queryIndex);track.setAttribute('aria-hidden','true');fill.style.width=(weights[i]*100)+'%';track.append(fill);cell.append(node('span','','위치 '+i),node('strong','',ex.tokens[i]),node('b','',(weights[i]*100).toFixed(2)+'%'),node('span','','K·V 참고 비중'),track,node('small','',vector(head.values[i])));references.append(cell);}
        diagramInner.replaceChildren(selected,node('div','transformer-mobile-direction','↓\n참고할 각 위치의 V'),links,references);
      }
      function drawNumbers(ex,result,head){
        const headConfig=config.calculation.heads.find(h=>h.id===headId);
        calculationBody.replaceChildren(node('h5','','입력 E에서 위치를 더한 X로'),table(['위치·단어','E','E × √d','PE','X'],ex.tokens.map((token,i)=>[i+' · '+token,vector(ex.inputVectors[i]),vector(result.scaledInput[i]),vector(result.positions[i]),vector(result.input[i])]),'단어 입력과 위치값의 합',1000));
        for(const key of ['WQ','WK','WV'])calculationBody.append(node('h5','',headConfig.label+' · '+key),table(['입력 성분',...headConfig[key][0].map((_,i)=>'투영 성분 '+(i+1))],headConfig[key].map((row,i)=>[i+1,...row.map(number)]),key+' 직접 정한 행렬',340));
        calculationBody.append(node('h5','','선택한 query · '+vector(head.queries[queryIndex])),node('p','transformer-formula','score(i,j) = Q_i · K_j / √d_k\nweight(i,j) = softmax_j(score(i,j))\nz_i = Σ_j weight(i,j) V_j'),table(['참고 위치','K','V','Q·K / √d_k','섞는 비중','비중 × V'],ex.tokens.map((token,i)=>[i+' · '+token,vector(head.keys[i]),vector(head.values[i]),number(head.scores[queryIndex][i]),number(head.weights[queryIndex][i]),vector(head.values[i].map(v=>v*head.weights[queryIndex][i]))]),'선택한 query의 점수와 가중합',960));
        calculationBody.append(node('h5','','여러 head를 붙여 출력 투영'),table(['부분','선택 위치의 값'],[...result.heads.map(h=>[config.calculation.heads.find(c=>c.id===h.id).label,vector(h.output[queryIndex])]),['concat',vector(result.concatenated[queryIndex])],['concat × WO',vector(result.output[queryIndex])]],'여러 head 출력의 결합',620),node('h5','','직접 정한 WO'),table(['붙인 성분',...config.calculation.outputProjection[0].map((_,i)=>'출력 성분 '+(i+1))],config.calculation.outputProjection.map((row,i)=>[i+1,...row.map(number)]),'출력 투영 행렬',500));
      }
      function updateAttention(){
        if(disposed)return;const ex=selectedExample(),result=calculate(ex),head=result.heads.find(h=>h.id===headId);queryIndex=Math.max(0,Math.min(queryIndex,ex.tokens.length-1));root.dataset.example=exampleId;root.dataset.query=String(queryIndex);root.dataset.head=headId;root.dataset.positions=String(usePositions);
        mark(exampleButtons,'example',exampleId);mark(headButtons,'head',headId);mark(queryButtons,'query',queryIndex);translation.textContent=ex.translation;positionToggle.textContent=usePositions?'위치 정보 켜짐':'위치 정보 꺼짐';positionToggle.setAttribute('aria-pressed',String(usePositions));
        for(const [i,button] of queryButtons.entries()){button.hidden=i>=ex.tokens.length;if(i<ex.tokens.length)button.textContent=i+' · '+ex.tokens[i];}
        queryStatus.textContent='선택한 단어 '+ex.tokens[queryIndex]+' · 위치 '+queryIndex+'에서 다른 위치의 값을 모읍니다. '+config.calculation.heads.find(h=>h.id===headId).label+' · 위치 정보 '+(usePositions?'포함':'제외');
        drawAttention(ex,result,head);drawNumbers(ex,result,head);
        const headOutput=node('div'),finalOutput=node('div');headOutput.append(node('span','',config.calculation.heads.find(h=>h.id===headId).label+'의 가중합 z'),node('strong','',vector(head.output[queryIndex])));finalOutput.append(node('span','','모든 head를 붙여 WO로 바꾼 출력'),node('strong','',vector(result.output[queryIndex])));outputs.replaceChildren(headOutput,finalOutput,node('p','transformer-note','이 값은 attention 블록의 출력입니다. Add & Norm, 위치별 feed-forward 등 이후 처리를 거친 완성된 층의 표현이나 번역 결과는 아닙니다.'));
        comparison.replaceChildren(node('h5','','같은 단어라도, 위치와 문맥을 바꾸면?'));
        const repeated=ex.tokens.flatMap((token,i)=>token===ex.tokens[queryIndex]?[i]:[]);
        if(repeated.length>1)comparison.append(node('p','transformer-prose','현재 단어 '+ex.tokens[queryIndex]+'의 입력 E는 위치 '+repeated.join('·')+'에서 같습니다.'),table(['위치','단어 입력 E','attention 블록 출력'],repeated.map(i=>[i,vector(ex.inputVectors[i]),vector(result.output[i])]),'같은 단어의 위치별 attention 출력 비교',760),node('p','transformer-note',usePositions?'위치값이 다르므로 같은 단어의 Q·K·V도 달라질 수 있습니다. 위치 정보를 꺼 같은 query 입력에서 생기는 차이를 비교해 보세요.':'위치 정보를 끄면 동일한 단어 입력은 같은 Q가 됩니다. 한 문장 안에서 같은 K·V 집합을 참고하므로 이 계산의 출력도 같습니다.'));
        const anchor=config.calculation.initialQuery,baseline=config.calculation.examples[0],other=config.calculation.examples.find(e=>e.id!==baseline.id);
        if(other&&anchor<baseline.tokens.length&&anchor<other.tokens.length){const a=calculate(baseline),b=calculate(other);comparison.append(node('p','transformer-prose','고정 비교 · 두 문장에서 위치 '+anchor+'에 있는 단어 '+baseline.tokens[anchor]+'의 표현을 확인합니다. 다른 위치의 입력을 바꾸면, 이 위치에서 모으는 값도 달라집니다.'),table(['입력 문장','이 위치의 E','이 위치의 attention 블록 출력'],[[baseline.tokens.join(' '),vector(baseline.inputVectors[anchor]),vector(a.output[anchor])],[other.tokens.join(' '),vector(other.inputVectors[anchor]),vector(b.output[anchor])]],'다른 위치를 바꾼 두 문장의 같은 위치 비교',900));}
      }
      function updateStructure(){
        if(disposed)return;const s=config.structure,mode=s.modes.find(m=>m.id===modeId),queryTokens=modeId==='encoder'?s.sourceTokens:s.decoderInputTokens,keyTokens=modeId==='decoder'?s.decoderInputTokens:s.sourceTokens;structureIndex=Math.max(0,Math.min(structureIndex,queryTokens.length-1));root.dataset.mode=modeId;root.dataset.structureQuery=String(structureIndex);mark(modeButtons,'mode',modeId);mark(structureButtons,'structureQuery',structureIndex);modeTitle.textContent=mode.title;modeText.textContent=mode.text;modeSource.replaceChildren(source(mode.source));
        for(const [i,button] of structureButtons.entries()){button.hidden=i>=queryTokens.length;if(i<queryTokens.length)button.textContent=i+' · '+queryTokens[i];}
        const queryBox=node('div','transformer-architecture-query'),keyBox=node('div','transformer-architecture-key'),arrow=node('div','transformer-architecture-arrow','←');queryBox.append(node('span','','Q · 새 표현을 만드는 쪽'),node('strong','',modeId==='encoder'?'인코더의 현재 층 입력':modeId==='decoder'?'디코더의 현재 층 입력':'디코더의 앞선 masked self-attention 처리 뒤 표현'),node('p','',queryTokens.map((t,i)=>(i===structureIndex?'〔'+t+'〕':t)).join(' ')));keyBox.append(node('span','','K·V · 참고하는 쪽'),node('strong','',modeId==='cross'?'인코더가 출력한 모든 위치의 표현':modeId==='encoder'?'같은 인코더 층의 입력':'같은 디코더 층의 입력'),node('p','',keyTokens.join(' ')));architecture.replaceChildren(queryBox,arrow,keyBox);
        const mask=modeId==='decoder'?causalMask({queryLength:queryTokens.length,keyLength:keyTokens.length}):Array.from({length:queryTokens.length},()=>Array(keyTokens.length).fill(true)),pane=node('div','transformer-table-viewport');pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','query와 key 위치의 참고 가능 여부');const table=node('table','transformer-access-table'),head=node('thead'),header=node('tr');header.append(node('th','','Q ↓ / K·V →'));for(const [j,token] of keyTokens.entries())header.append(node('th','',j+' · '+token));head.append(header);table.append(head);const body=node('tbody');for(const [i,token] of queryTokens.entries()){const row=node('tr');row.dataset.selected=String(i===structureIndex);row.append(node('th','',i+' · '+token));for(const permitted of mask[i]){const cell=node('td','',permitted?'● 가능':'× 차단');cell.dataset.allowed=String(permitted);row.append(cell);}body.append(row);}table.append(body);pane.append(table);access.replaceChildren(pane);
        structureStatus.replaceChildren(node('h5','','선택한 query 위치 '+structureIndex+' · '+queryTokens[structureIndex]));
        if(modeId==='encoder')structureStatus.append(node('p','transformer-prose','입력 문장 전체의 위치를 참고해 이 위치의 새 표현을 만듭니다. 출력 문장의 정답 단어를 이 행렬에 넣지 않습니다.'));
        else structureStatus.append(node('p','transformer-prose','지금까지 디코더에 넣은 말 · '+s.decoderInputTokens.slice(0,structureIndex+1).join(' ')),node('p','transformer-prose','이번에 예측할 정답 · '+s.expectedTokens[structureIndex]+' · 이 정답은 해당 위치의 디코더 입력에 아직 넣지 않았습니다.'),node('p','transformer-note',modeId==='cross'?'이 교차 참고의 Q는 디코더 표현, K·V는 인코더 출력입니다. 위 단어 이름은 위치를 구별하는 표식이며, 원시 단어 벡터를 곧바로 교차 attention 출력으로 계산한 그림이 아닙니다.':'학습 중에도 나중 위치의 정답 정보를 이 위치에서 훔쳐 보지 않도록, 오른쪽의 디코더 입력을 가립니다. 시작 기호를 앞에 둔 입력과 예측할 정답은 한 칸 어긋납니다.'));
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(evidenceImage,item.file);evidenceImage.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));evidencePane.dataset.expanded=String(evidenceExpanded);evidenceZoom.textContent=evidenceExpanded?'원문 그림 전체 보기':'원문 그림 확대';evidenceZoom.setAttribute('aria-pressed',String(evidenceExpanded));if(evidenceExpanded){evidencePane.tabIndex=0;evidencePane.setAttribute('role','region');evidencePane.setAttribute('aria-label','확대한 Transformer 원문 그림');}else{evidencePane.removeAttribute('tabindex');evidencePane.removeAttribute('role');evidencePane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;attend.hidden=stage!=='attend';structure.hidden=stage!=='structure';evidence.hidden=stage!=='evidence';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const ex of config.calculation.examples){const el=button(ex.label,examples,()=>{exampleId=ex.id;updateAttention();});el.dataset.example=ex.id;exampleButtons.push(el);}
      const maxTokens=Math.max(...config.calculation.examples.map(e=>e.tokens.length));for(let i=0;i<maxTokens;i++){const el=button('',queries,()=>{queryIndex=i;updateAttention();});el.dataset.query=String(i);queryButtons.push(el);}
      for(const h of config.calculation.heads){const el=button(h.label,heads,()=>{headId=h.id;updateAttention();});el.dataset.head=h.id;headButtons.push(el);}
      for(const mode of config.structure.modes){const el=button(mode.label,modes,()=>{modeId=mode.id;updateStructure();});el.dataset.mode=mode.id;modeButtons.push(el);}
      const maxStructure=Math.max(config.structure.sourceTokens.length,config.structure.decoderInputTokens.length);for(let i=0;i<maxStructure;i++){const el=button('',structureQueries,()=>{structureIndex=i;updateStructure();});el.dataset.structureQuery=String(i);structureButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;evidenceExpanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(evidenceZoom,'click',()=>{evidenceExpanded=!evidenceExpanded;updateEvidence();});
      root.append(stages,stageText,attend,structure,evidence,node('p','transformer-scope',config.scope),source(config.source));updateAttention();updateStructure();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
