/* AlexNet: source-based architecture and evidence, with explicitly chosen
 * inspection inputs. No learned activations, classification scores or training
 * run are invented. Paper evidence images remain independent from the example.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)',MUTED='var(--muted, #777b86)';
  const STAGES=['combine','learned','train'];
  const RELU_INPUTS=Object.freeze([-2,-1,0,1,2]);
  const MASKS=Object.freeze([Object.freeze([1,0,1,0,0,1,0,1]),Object.freeze([0,1,0,1,1,0,1,0])]);
  function receptiveFields(layers){
    if(!Array.isArray(layers))throw new TypeError('Spatial layers must be an array.');
    const seen=new Set();let receptiveField=1,jump=1;
    return layers.map(layer=>{
      if(!layer||!hasText(layer.id)||seen.has(layer.id)||!Number.isSafeInteger(layer.kernel)||layer.kernel<1||!Number.isSafeInteger(layer.stride)||layer.stride<1)throw new TypeError('Spatial layers need distinct ids and positive integer kernel/stride.');
      seen.add(layer.id);receptiveField+=(layer.kernel-1)*jump;jump*=layer.stride;
      if(!Number.isSafeInteger(receptiveField)||!Number.isSafeInteger(jump))throw new RangeError('Spatial extent exceeds safe integer range.');
      return{id:layer.id,receptiveField,jump};
    });
  }
  function rectify(values){
    if(!Array.isArray(values)||!values.every(value=>typeof value==='number'&&Number.isFinite(value)))throw new TypeError('ReLU inputs must be finite numbers.');
    return values.map(value=>Math.max(0,value));
  }
  window.AtlasAlexNetModel=Object.freeze({receptiveFields,rectify});
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  function source(item){return link(item.title+' ↗',item.url,'alexnet-source');}
  function sampleCredit(item){const credit=node('p','alexnet-credit');credit.append(document.createTextNode(item.credit.author+' · '),link(item.credit.license,item.credit.licenseUrl),document.createTextNode(' · '),link('원본',item.credit.sourceUrl),document.createTextNode(' · '+(item.credit.changes||'')));return credit;}
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!STAGES.every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new Error('AlexNet viewer requires combine, learned and train stages.');
    receptiveFields(config.spatialLayers);
    if(!Array.isArray(config.layers)||!config.layers.length||new Set(config.layers.map(l=>l.id)).size!==config.layers.length||!config.layers.every(l=>hasText(l.id)&&hasText(l.label)&&hasText(l.title)&&hasText(l.idea)&&hasText(l.text)&&hasText(l.size)&&hasText(l.source?.title)&&hasText(l.source?.url)))throw new Error('Every architecture layer needs an id, description, size and source.');
    const layerIds=new Set(config.layers.map(l=>l.id));for(const item of config.spatialLayers)if(!layerIds.has(item.id))throw new Error('Spatial layer is missing from the architecture.');
    if(!hasText(config.sample?.file)||!/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(config.sample.file)||config.sample.file.includes('..')||!['title','description'].every(k=>hasText(config.sample[k]))||!['author','license','licenseUrl','sourceUrl'].every(k=>hasText(config.sample.credit?.[k])))throw new Error('AlexNet example photo requires a local file, description and credit.');
    if(!Array.isArray(config.evidenceViews)||!['filters','neighbors'].every(id=>config.evidenceViews.some(v=>v.id===id&&['label','file','title','caption','scope'].every(k=>hasText(v[k]))&&hasText(v.source?.title)&&hasText(v.source?.url)&&hasText(v.credit?.title)&&hasText(v.credit?.url))))throw new Error('AlexNet viewer needs the two paper evidence views and their sources.');
    for(const view of config.evidenceViews)if(!/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(view.file)||view.file.includes('..'))throw new Error('Evidence images must use local asset basenames.');
    if(!Array.isArray(config.designs)||!['relu','gpu','augmentation','dropout'].every(id=>config.designs.some(d=>d.id===id&&hasText(d.label)&&hasText(d.title)&&hasText(d.text)&&Array.isArray(d.layerIds)&&d.layerIds.every(l=>layerIds.has(l))&&hasText(d.scope)&&hasText(d.source?.title)&&hasText(d.source?.url))))throw new Error('AlexNet viewer needs sourced ReLU, GPU, augmentation and dropout designs.');
    if(!config.gpu||!Array.isArray(config.gpu.layers)||config.gpu.layers.length<2||!config.gpu.layers.every(l=>hasText(l.id)&&hasText(l.label)&&['split','same','all','merge'].includes(l.connect)))throw new Error('GPU diagram requires labeled layers and connection types.');
    if(!hasText(config.feedback?.title)||!hasText(config.feedback?.text)||!hasText(config.receptiveScope)||!hasText(config.scope)||!hasText(config.source?.title)||!hasText(config.source?.url))throw new Error('AlexNet viewer requires learning feedback, range scope and original source.');
  }
  function reluDrawing(input){
    const output=rectify([input])[0],x=180+input*54,y=176-output*54;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 245" role="img" aria-label="ReLU 함수에서 입력 ${input}, 출력 ${output}. 성능 곡선이 아닌 함수의 모양."><title>양의 입력은 그대로, 음의 입력은 0으로</title><path d="M48 176H318M180 202V42" fill="none" stroke="${MUTED}" stroke-width="1"/><path d="M72 176H180L288 68" fill="none" stroke="${ACCENT}" stroke-width="3"/><g fill="${MUTED}" font-size="12" text-anchor="middle"><text x="72" y="197">−2</text><text x="126" y="197">−1</text><text x="181" y="219">0</text><text x="234" y="197">1</text><text x="288" y="197">2</text><text x="321" y="195">x</text><text x="195" y="46">y</text></g><path d="M${x} 176V${y}H180" fill="none" stroke="${ACCENT}" stroke-dasharray="4 4" stroke-opacity=".5"/><circle cx="${x}" cy="${y}" r="7" fill="${ACCENT}" stroke="${BG}" stroke-width="2"/></svg>`;
  }
  function gpuDrawing(config){
    const layers=config.layers,n=layers.length,width=Math.max(880,n*114+30),step=(width-100)/(n-1),top=96,bottom=224,mid=160,positions=[],boxes=[],edges=[];
    for(let i=0;i<n;i++){
      const layer=layers[i],x=50+i*step,merged=layer.id==='input'||layer.connect==='merge',ys=merged?[mid]:[top,bottom];positions.push({x,ys});
      for(const [g,y] of ys.entries()){
        boxes.push(`<rect x="${x-30}" y="${y-27}" width="60" height="54" rx="5" fill="${BG}" stroke="${ACCENT}" stroke-opacity=".7"/><text x="${x}" y="${y-5}" fill="${INK}" font-size="12" text-anchor="middle">${esc(layer.label)}</text><text x="${x}" y="${y+14}" fill="${MUTED}" font-size="11" text-anchor="middle">${esc(layer.perGroup??'')}</text>`);
      }
      if(i){const previous=positions[i-1];for(const [fromIndex,fromY] of previous.ys.entries())for(const [toIndex,toY] of ys.entries()){
        if(layer.connect==='same'&&fromIndex!==toIndex)continue;
        const cross=previous.ys.length===2&&ys.length===2&&fromIndex!==toIndex;
        edges.push(`<path d="M${previous.x+30} ${fromY}L${x-30} ${toY}" fill="none" stroke="${cross?ACCENT:INK}" stroke-opacity="${cross?.65:.3}" stroke-width="${cross?1.7:1.2}" ${cross?'stroke-dasharray="4 3"':''}/>`);
      }}
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 308" role="img" aria-label="하나의 망을 두 GPU에 나눈 연결 개요. 같은 쪽 연결과 두 쪽을 함께 받는 연결을 구분한다."><title>하나의 망, 필요한 층에서만 두 GPU가 연결된다</title><rect x="12" y="44" width="${width-24}" height="103" rx="8" fill="${SOFT}"/><rect x="12" y="175" width="${width-24}" height="103" rx="8" fill="${SOFT}"/><text x="20" y="30" fill="${MUTED}" font-size="12">위쪽 · GPU 1</text><text x="20" y="297" fill="${MUTED}" font-size="12">아래쪽 · GPU 2</text>${edges.join('')}${boxes.join('')}</svg>`;
  }
  function dropoutDrawing(mask,test){
    const circles=[],connections=[];for(let i=0;i<8;i++){
      const x=29+i*39,active=test||mask[i];connections.push(`<path d="M${x} 104L165 158" stroke="${active?ACCENT:MUTED}" stroke-opacity="${active?.4:.12}" fill="none" ${active?'':'stroke-dasharray="3 4"'}/>`);
      circles.push(`<circle cx="${x}" cy="84" r="13" fill="${active?ACCENT:BG}" stroke="${active?ACCENT:MUTED}" stroke-opacity="${active?1:.4}"/><text x="${x}" y="${test?119:87}" text-anchor="middle" fill="${test?MUTED:active?BG:MUTED}" font-size="${test?10:13}">${test?'×0.5':active?'':'×'}</text>`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 196" role="img" aria-label="${test?'시험 시에는 모든 단위를 쓰고 출력을 0.5배 하는 원문의 방식.':'훈련 중에는 직접 정한 마스크로 대표 단위의 일부를 끈 그림.'}"><title>${test?'시험 · 전체를 쓰되 출력은 0.5배':'훈련 · 일부 단위를 잠시 빼고 배운다'}</title><text x="165" y="31" fill="${INK}" text-anchor="middle" font-size="13">${test?'시험 · 모든 단위를 사용':'훈련 · 직접 고른 마스크'}</text>${connections.join('')}${circles.join('')}<rect x="136" y="155" width="58" height="24" rx="5" fill="${SOFT}" stroke="${MUTED}" stroke-opacity=".3"/><text x="165" y="172" text-anchor="middle" fill="${MUTED}" font-size="11">다음 계산</text></svg>`;
  }
  window.AtlasVisuals.register('learned-vision',{
    mount(host,config){
      validate(config);
      const root=node('div','alexnet-vision'),listeners=[],stageButtons=[],layerButtons=[],viewButtons=[],designButtons=[],groupButtons=[],reluButtons=[],cropButtons=[],maskButtons=[];
      const fields=new Map(receptiveFields(config.spatialLayers).map(row=>[row.id,row]));
      let stage='combine',layerId='conv1',viewId='filters',designId='relu',groupId='all',reluInput=1,crop='center',maskIndex=0,disposed=false;
      const expanded={filters:false,neighbors:false},evidencePanels=new Map();
      function listen(el,type,handler){el.addEventListener(type,handler);listeners.push(()=>el.removeEventListener(type,handler));}
      function mark(buttons,key,value){for(const button of buttons){const selected=button.dataset[key]===value;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('active',selected);}}
      const stages=node('div','alexnet-stage-controls');stages.setAttribute('role','group');stages.setAttribute('aria-label','특징을 배우는 시각 살펴보기');
      const stageText=node('p','alexnet-stage-text');
      const combine=node('section','alexnet-combine'),learned=node('section','alexnet-learned'),train=node('section','alexnet-train');
      const architecture=node('section','alexnet-architecture');architecture.setAttribute('aria-label','원문에 따른 층별 구조');architecture.append(node('h4','','부분의 반응을, 다음 층에서 함께 본다'));
      const layerList=node('ol','alexnet-layers');
      for(const [index,item] of config.layers.entries()){
        const li=node('li'),button=node('button','alexnet-layer-button');li.dataset.layer=item.id;li.dataset.kind=item.kind;button.type='button';button.dataset.layer=item.id;
        const stack=node('span','alexnet-layer-stack');for(let i=0;i<3;i++)stack.append(node('i'));
        const order=node('span','alexnet-layer-order',String(index+1).padStart(2,'0'));order.setAttribute('aria-hidden','true');button.append(order,node('strong','',item.label),stack,node('span','alexnet-layer-size',item.size));listen(button,'click',()=>{layerId=item.id;updateLayer();});layerButtons.push(button);li.append(button);layerList.append(li);
      }
      architecture.append(layerList,node('p','alexnet-mini-note','번호와 화살표를 따라 왼쪽에서 오른쪽으로, 다음 줄로 이어 읽습니다. 학습하는 8개 층과 그 사이의 풀링을 나누어 표시합니다. 쌓인 판은 지도·벡터를 나타내는 기호이며 실제 활성값을 그린 것이 아닙니다.'));
      const combineArchitecture=node('div'),trainArchitecture=node('div');combine.append(combineArchitecture);
      const inspection=node('div','alexnet-inspection'),sample=node('figure','alexnet-sample'),sampleImageWrap=node('div','alexnet-sample-wrap'),sampleImage=node('img'),range=node('div','alexnet-range');sampleImage.src=asset(config.sample.file);sampleImage.alt=config.sample.description;sampleImage.decoding='async';range.setAttribute('aria-hidden','true');sampleImageWrap.append(sampleImage,range);sample.append(sampleImageWrap,node('figcaption','',config.sample.title),sampleCredit(config.sample));
      const layerDescription=node('div','alexnet-layer-description'),layerTitle=node('h4'),layerIdea=node('p','alexnet-layer-idea'),layerBody=node('p'),rangeValue=node('p','alexnet-range-value'),rangeNote=node('p','alexnet-mini-note'),layerSource=node('div');layerDescription.setAttribute('role','status');layerDescription.setAttribute('aria-live','polite');layerDescription.setAttribute('aria-atomic','true');layerDescription.append(layerTitle,layerIdea,layerBody,rangeValue,rangeNote,layerSource);inspection.append(sample,layerDescription);
      const feedback=node('aside','alexnet-feedback');feedback.append(node('span','alexnet-feedback-arrow','←'),node('h4','',config.feedback.title),node('p','',config.feedback.text));combine.append(inspection,node('p','alexnet-scope',config.receptiveScope),feedback);
      const viewControls=node('div','alexnet-view-controls');viewControls.setAttribute('role','group');viewControls.setAttribute('aria-label','원문에서 볼 학습 결과');learned.append(viewControls);
      for(const view of config.evidenceViews){
        const button=node('button','',view.label);button.type='button';button.dataset.view=view.id;listen(button,'click',()=>{viewId=view.id;updateEvidence();});viewButtons.push(button);viewControls.append(button);
        const panel=node('section','alexnet-evidence-panel');panel.dataset.evidence=view.id;panel.append(node('h4','',view.title),node('p','alexnet-evidence-caption',view.caption));
        if(view.id==='filters'){
          const groups=node('div','alexnet-filter-controls');groups.setAttribute('role','group');groups.setAttribute('aria-label','원문 필터 그림의 GPU 영역');const definitions=view.groups||config.filters?.groups||[];
          for(const item of definitions){const button=node('button','',item.label);button.type='button';button.dataset.group=item.id;listen(button,'click',()=>{groupId=item.id;updateGroups();});groupButtons.push(button);groups.append(button);}panel.append(groups);
        }
        const zoom=node('button','alexnet-zoom',view.label+' 확대');zoom.type='button';zoom.setAttribute('aria-pressed','false');
        const pane=node('div','alexnet-evidence-viewport'),frame=node('div','alexnet-evidence-image'),image=node('img'),selection=node('div','alexnet-filter-selection');image.src=asset(view.file);image.alt=view.caption;image.decoding='async';selection.setAttribute('aria-hidden','true');frame.append(image);if(view.id==='filters')frame.append(selection);pane.append(frame);pane.dataset.evidence=view.id;
        listen(zoom,'click',()=>{expanded[view.id]=!expanded[view.id];pane.dataset.expanded=String(expanded[view.id]);zoom.textContent=view.label+(expanded[view.id]?' 전체 보기':' 확대');zoom.setAttribute('aria-pressed',String(expanded[view.id]));if(expanded[view.id]){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 '+view.label);}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}});
        const groupText=node('p','alexnet-group-text');groupText.setAttribute('role','status');groupText.setAttribute('aria-live','polite');panel.append(zoom,node('p','alexnet-mini-note','확대하면 그림 영역 안에서 좌우로 움직여 볼 수 있습니다.'),pane);if(view.id==='filters')panel.append(groupText);
        const credit=node('p','alexnet-credit');credit.append(link(view.credit.title,view.credit.url),document.createTextNode(' · '+(view.credit.note||'')));panel.append(node('p','alexnet-scope',view.scope),source(view.source),credit);learned.append(panel);evidencePanels.set(view.id,{panel,pane,frame,selection,groupText});
      }
      const designControls=node('div','alexnet-design-controls');designControls.setAttribute('role','group');designControls.setAttribute('aria-label','큰 망을 학습시키기 위한 설계');
      const designTitle=node('h4'),designText=node('p','alexnet-design-text'),designScope=node('p','alexnet-scope'),designSource=node('div'),feature=node('div','alexnet-feature');train.append(designControls,designTitle,designText,trainArchitecture,feature,designScope,designSource);
      const reluPanel=node('section','alexnet-relu'),reluOptions=node('div','alexnet-small-controls'),reluPicture=node('div','alexnet-relu-picture'),reluResult=node('p','alexnet-result');reluResult.setAttribute('role','status');reluResult.setAttribute('aria-live','polite');reluOptions.setAttribute('role','group');reluOptions.setAttribute('aria-label','ReLU에 넣어 볼 값');
      for(const value of RELU_INPUTS){const button=node('button','','x = '+String(value));button.type='button';button.dataset.input=String(value);listen(button,'click',()=>{reluInput=value;updateReLU();});reluButtons.push(button);reluOptions.append(button);}reluPanel.append(reluOptions,reluPicture,reluResult,node('p','alexnet-mini-note','직접 고른 입력에 함수 y=max(0,x)를 적용합니다. 학습 속도나 인식 성능을 측정한 곡선이 아닙니다.'));
      const gpuPanel=node('section','alexnet-gpu'),gpuZoom=node('button','alexnet-zoom','두 GPU 연결 그림 확대'),gpuPane=node('div','alexnet-gpu-viewport');let gpuExpanded=false;gpuZoom.type='button';gpuZoom.setAttribute('aria-pressed','false');gpuPane.innerHTML=gpuDrawing(config.gpu);listen(gpuZoom,'click',()=>{gpuExpanded=!gpuExpanded;gpuPane.dataset.expanded=String(gpuExpanded);gpuZoom.textContent=gpuExpanded?'두 GPU 연결 그림 전체 보기':'두 GPU 연결 그림 확대';gpuZoom.setAttribute('aria-pressed',String(gpuExpanded));if(gpuExpanded){gpuPane.tabIndex=0;gpuPane.setAttribute('role','region');gpuPane.setAttribute('aria-label','확대한 두 GPU의 연결');}else{gpuPane.removeAttribute('tabindex');gpuPane.removeAttribute('role');gpuPane.removeAttribute('aria-label');}});gpuPanel.append(node('h4','',config.gpu.title||''),node('p','alexnet-evidence-caption',config.gpu.caption||''),gpuZoom,gpuPane,node('p','alexnet-mini-note','각 상자의 수는 해당 GPU 쪽의 지도·단위 수입니다. 선은 연결 범위의 개요이며 실제 통신량이나 개별 가중치가 아닙니다.'));
      const augmentationPanel=node('section','alexnet-augmentation'),cropControls=node('div','alexnet-small-controls'),cropPictures=node('div','alexnet-crop-pictures');cropControls.setAttribute('role','group');cropControls.setAttribute('aria-label','같은 사진의 표시 변형');
      const cropImages=[];for(const title of ['중앙을 자른 기준 사진','선택한 표시 변형']){const figure=node('figure'),frame=node('div','alexnet-crop-frame'),image=node('img');image.src=asset(config.sample.file);image.alt=config.sample.description;frame.append(image);figure.append(frame,node('figcaption','',title));cropImages.push(image);cropPictures.append(figure);}
      for(const [id,label] of [['center','중앙 자르기'],['left','왼쪽 자르기'],['flip','좌우 반전']]){const button=node('button','',label);button.type='button';button.dataset.crop=id;listen(button,'click',()=>{crop=id;updateCrop();});cropButtons.push(button);cropControls.append(button);}augmentationPanel.append(cropControls,cropPictures,sampleCredit(config.sample),node('p','alexnet-mini-note','직접 고른 별도 사진의 화면 표시를 바꿉니다. 원래의 무작위 패치 추출·RGB PCA 증강 전체나 학습 실행을 재현한 것은 아닙니다.'));
      const dropoutPanel=node('section','alexnet-dropout'),maskControls=node('div','alexnet-small-controls'),dropoutPictures=node('div','alexnet-dropout-pictures'),trainDropout=node('div'),testDropout=node('div');maskControls.setAttribute('role','group');maskControls.setAttribute('aria-label','설명 그림에 적용할 직접 정한 훈련 마스크');
      for(let i=0;i<MASKS.length;i++){const button=node('button','','훈련 마스크 '+(i+1));button.type='button';button.dataset.mask=String(i);listen(button,'click',()=>{maskIndex=i;updateDropout();});maskButtons.push(button);maskControls.append(button);}dropoutPictures.append(trainDropout,testDropout);dropoutPanel.append(maskControls,dropoutPictures,node('p','alexnet-mini-note','8개 대표 단위와 직접 정한 두 마스크로 역할을 그립니다. 원래 단위 수나 실제로 뽑힌 훈련 마스크가 아닙니다. 시험의 ×0.5 표시는 논문의 방식이며, 훈련 때 ×2 하는 방식으로 바꿔 표시하지 않습니다.'));
      const featurePanels={relu:reluPanel,gpu:gpuPanel,augmentation:augmentationPanel,dropout:dropoutPanel};for(const [id,panel] of Object.entries(featurePanels)){panel.dataset.feature=id;feature.append(panel);}
      function updateLayer(){
        if(disposed)return;const layer=config.layers.find(l=>l.id===layerId),rf=fields.get(layerId),all=layer.kind==='fc'||layer.kind==='output'||layer.kind==='input',extent=all?224:rf?.receptiveField||1;
        root.dataset.layer=layerId;mark(layerButtons,'layer',stage==='train'?'':layerId);for(const button of layerButtons)button.disabled=stage==='train';for(const li of layerList.children)li.dataset.designActive=String(stage==='train'&&config.designs.find(d=>d.id===designId).layerIds.includes(li.dataset.layer));
        layerTitle.textContent=layer.title;layerIdea.textContent=layer.idea;layerBody.textContent=layer.text;layerSource.replaceChildren(source(layer.source));
        const fraction=Math.min(1,extent/224)*100;range.style.width=fraction+'%';range.style.height=fraction+'%';range.dataset.full=String(all);rangeValue.textContent=all?(layer.kind==='input'?'입력 사진 전체에서 출발':'앞선 특징 전체를 함께 연결'):'구조상 참조 범위 '+extent+' × '+extent+' · 이웃 중심 간격 '+rf.jump;
        rangeNote.textContent=all?'이 창은 실제 활성값이나 분류 결과를 표시하지 않습니다.':'커널과 간격을 누적한 이론상 범위입니다. 실제로 영향을 준 화소를 측정한 값이나 정확한 좌표 투영이 아닙니다.';
      }
      function updateGroups(){if(disposed)return;const view=config.evidenceViews.find(v=>v.id==='filters'),groups=view.groups||config.filters?.groups||[],item=groups.find(g=>g.id===groupId);mark(groupButtons,'group',groupId);const evidence=evidencePanels.get('filters');evidence.frame.dataset.group=groupId;evidence.groupText.textContent=item?.text||'';}
      function updateEvidence(){if(disposed)return;root.dataset.evidence=viewId;mark(viewButtons,'view',viewId);for(const [id,value] of evidencePanels)value.panel.hidden=id!==viewId;}
      function updateReLU(){if(disposed)return;mark(reluButtons,'input',String(reluInput));reluPicture.innerHTML=reluDrawing(reluInput);reluResult.textContent='입력 '+reluInput+' → ReLU 출력 '+rectify([reluInput])[0];}
      function updateCrop(){if(disposed)return;mark(cropButtons,'crop',crop);cropImages[1].style.objectPosition=crop==='left'?'left center':'center';cropImages[1].style.transform=crop==='flip'?'scaleX(-1)':'none';}
      function updateDropout(){if(disposed)return;mark(maskButtons,'mask',String(maskIndex));trainDropout.innerHTML=dropoutDrawing(MASKS[maskIndex],false);testDropout.innerHTML=dropoutDrawing(MASKS[maskIndex],true);}
      function updateDesign(){if(disposed)return;root.dataset.design=designId;mark(designButtons,'design',designId);const design=config.designs.find(d=>d.id===designId);designTitle.textContent=design.title;designText.textContent=design.text;designScope.textContent=design.scope;designSource.replaceChildren(source(design.source));for(const [id,panel] of Object.entries(featurePanels))panel.hidden=id!==designId;updateLayer();}
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);combine.hidden=stage!=='combine';learned.hidden=stage!=='learned';train.hidden=stage!=='train';stageText.textContent=config.stages.find(s=>s.id===stage).text;if(stage==='train')trainArchitecture.append(architecture);else combineArchitecture.append(architecture);updateLayer();}
      for(const item of config.stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;updateStage();});stageButtons.push(button);stages.append(button);}
      for(const item of config.designs){const button=node('button','',item.label);button.type='button';button.dataset.design=item.id;listen(button,'click',()=>{designId=item.id;updateDesign();});designButtons.push(button);designControls.append(button);}
      root.append(stages,stageText,combine,learned,train,node('p','alexnet-scope',config.scope),source(config.source));updateLayer();updateGroups();updateEvidence();updateReLU();updateCrop();updateDropout();updateDesign();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
