/* Vision observation and pathway viewer. Artwork is provided separately by
 * AtlasVisionArt; this module owns only local UI state, text, and cleanup.
 * Loading the file does not create DOM nodes, run timers, or request assets.
 */
(function(){
  'use strict';
  const ANGLES=Object.freeze([0,45,90]);
  const PATHWAY=Object.freeze(['retina','lgn','v1','higher']);
  const LAYERS=Object.freeze(['input','c1','s2','c3','s4','c5','f6','output']);
  const node=(tag,cls,text)=>{const element=document.createElement(tag);if(cls)element.className=cls;if(text!==undefined)element.textContent=text;return element;};
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function validateSection(section,name){
    if(!section||!['eyebrow','title','intro','scope'].every(key=>hasText(section[key]))||!hasText(section.source?.title)||!hasText(section.source?.url))throw new Error('Vision system requires '+name+' headings, description, scope and source.');
  }
  function validate(config){
    validateSection(config?.experiment,'experiment');validateSection(config?.pathway,'pathway');
    const angles=config.experiment.angles;
    if(!Array.isArray(angles)||angles.length!==ANGLES.length||!ANGLES.every(value=>angles.filter(item=>item.value===value&&hasText(item.label)&&hasText(item.text)).length===1))throw new Error('Vision experiment requires distinct 0, 45 and 90 degree choices with labels and text.');
    const stages=config.pathway.stages;
    if(!Array.isArray(stages)||stages.length!==PATHWAY.length||!PATHWAY.every(id=>stages.filter(item=>item.id===id&&hasText(item.label)&&hasText(item.title)&&hasText(item.text)).length===1))throw new Error('Vision pathway requires distinct retina, lgn, v1 and higher stages with labels, titles and text.');
    if(!hasText(config.bridge?.title)||!hasText(config.bridge?.text))throw new Error('Vision system requires a bridge title and text.');
    if(config.layerConnections){
      const layers=config.layerConnections;
      if(!['title','intro','scope'].every(key=>hasText(layers[key]))||!LAYERS.includes(layers.defaultLayer)||!hasText(layers.source?.title)||!hasText(layers.source?.url))throw new Error('Vision layer connections require headings, scope, source and a valid default layer.');
      if(!Array.isArray(layers.items)||layers.items.length!==LAYERS.length||!LAYERS.every(id=>layers.items.filter(item=>item?.id===id&&['label','size','idea','title','biological','implementation'].every(key=>hasText(item[key]))&&['retina','v1','higher','overview'].includes(item.visionStage)&&['inspired','engineering'].includes(item.kind)&&(!item.source||(hasText(item.source.title)&&hasText(item.source.url)))).length===1))throw new Error('Vision layer connections require all eight distinct LeNet layers with descriptions and evidence scope.');
    }
    if(typeof window.AtlasVisionArt?.experiment!=='function'||typeof window.AtlasVisionArt?.pathway!=='function')throw new Error('AtlasVisionArt must be loaded before mounting the vision system.');
  }
  function sourceLink(config){
    const link=node('a','vision-system-source',config.title+' ↗');link.href=config.url;link.target='_blank';link.rel='noopener noreferrer';return link;
  }
  function mount(host,config,options={}){
    validate(config);
    if(options.onLayerSelect!==undefined&&typeof options.onLayerSelect!=='function')throw new TypeError('onLayerSelect must be a function.');
    const root=node('div','vision-system'),listeners=[],angleButtons=[],stageButtons=[],layerButtons=[];
    const angleChoices=config.experiment.angles,stageChoices=PATHWAY.map(id=>config.pathway.stages.find(item=>item.id===id));
    const layerConfig=config.layerConnections,layerChoices=layerConfig?LAYERS.map(id=>layerConfig.items.find(item=>item.id===id)):[];
    let angle=angleChoices[0].value,stage=stageChoices[0].id,selectedLayer=null,disposed=false;
    function listen(element,handler){element.addEventListener('click',handler);listeners.push(()=>element.removeEventListener('click',handler));}
    function zoomControls(art,name){
      const controls=node('div','vision-system-zoom-controls'),button=node('button','vision-system-choice vision-system-zoom'),hint=node('span','vision-system-zoom-hint','확대하면 좌우로 움직여 볼 수 있습니다.');
      button.type='button';let expanded=false;
      function update(){
        const label=name+(expanded?' 전체 보기':' 확대');
        button.textContent=label;button.setAttribute('aria-label',label);button.setAttribute('aria-pressed',String(expanded));button.classList.toggle('active',expanded);
        art.dataset.expanded=String(expanded);
        if(expanded){art.setAttribute('tabindex','0');art.setAttribute('role','region');art.setAttribute('aria-label','확대한 '+name);}
        else{art.removeAttribute('tabindex');art.removeAttribute('role');art.removeAttribute('aria-label');}
      }
      listen(button,()=>{if(disposed)return;expanded=!expanded;update();});update();controls.append(button,hint);return controls;
    }
    function section(part,kind){
      const container=node('section','vision-system-section vision-system-'+kind);container.setAttribute('aria-label',part.title);
      const header=node('header','vision-system-header');header.append(node('span','vision-system-eyebrow',part.eyebrow),node('h4','vision-system-title',part.title),node('p','vision-system-intro',part.intro));
      container.append(header);root.append(container);return container;
    }
    const experiment=section(config.experiment,'experiment');
    const experimentControls=node('div','vision-system-controls vision-system-angle-controls');experimentControls.setAttribute('role','group');experimentControls.setAttribute('aria-label','자극으로 제시하는 선의 기울기');
    const experimentArt=node('div','vision-system-art vision-system-experiment-art');
    const experimentStatus=node('p','vision-system-status vision-system-angle-status');experimentStatus.setAttribute('role','status');experimentStatus.setAttribute('aria-live','polite');experimentStatus.setAttribute('aria-atomic','true');
    experiment.append(experimentControls,zoomControls(experimentArt,'실험 그림'),experimentArt,experimentStatus,node('p','vision-system-scope',config.experiment.scope),sourceLink(config.experiment.source));

    const pathway=section(config.pathway,'pathway');
    const pathwayControls=node('div','vision-system-controls vision-system-pathway-controls');pathwayControls.setAttribute('role','group');pathwayControls.setAttribute('aria-label','시각 정보 경로에서 살펴볼 단계');
    const pathwayArt=node('div','vision-system-art vision-system-pathway-art');
    const pathwayStatus=node('div','vision-system-status vision-system-pathway-status');pathwayStatus.setAttribute('role','status');pathwayStatus.setAttribute('aria-live','polite');pathwayStatus.setAttribute('aria-atomic','true');
    const stageTitle=node('h5','vision-system-stage-title'),stageText=node('p','vision-system-stage-text');pathwayStatus.append(stageTitle,stageText);
    pathway.append(pathwayControls,zoomControls(pathwayArt,'경로 그림'),pathwayArt);
    let inspector=null,layerStatus=null,layerEmpty=null,layerDetails=null,layerTag=null,layerTitle=null,biologicalText=null,implementationText=null,layerSource=null;
    if(layerConfig){
      inspector=node('section','vision-system-layer-inspector');inspector.setAttribute('aria-label',layerConfig.title);
      inspector.append(node('h5','vision-system-layer-title',layerConfig.title),node('p','vision-system-layer-intro',layerConfig.intro));
      const rail=node('div','vision-system-layer-rail');rail.setAttribute('role','group');rail.setAttribute('aria-label','시각계의 단서와 연결해 살펴볼 LeNet 층');
      for(const item of layerChoices){
        const button=node('button','vision-system-layer-button');button.type='button';button.dataset.layer=item.id;
        button.append(node('strong','',item.label),node('span','vision-system-layer-idea',item.idea),node('span','vision-system-layer-size',item.size));
        listen(button,()=>selectLayer(item.id,{notify:true}));layerButtons.push(button);rail.append(button);
      }
      layerStatus=node('div','vision-system-layer-status');layerStatus.setAttribute('role','status');layerStatus.setAttribute('aria-live','polite');layerStatus.setAttribute('aria-atomic','true');
      layerEmpty=node('p','vision-system-layer-empty','층을 선택하면 시각계의 단서와 LeNet의 설계를 함께 볼 수 있습니다.');
      layerDetails=node('div','vision-system-layer-details');layerTag=node('span','vision-system-layer-tag');layerTitle=node('h6','vision-system-layer-heading');
      const columns=node('div','vision-system-layer-columns'),biological=node('div','vision-system-layer-column'),implementation=node('div','vision-system-layer-column');
      biologicalText=node('p');implementationText=node('p');biological.append(node('h6','','시각계의 단서'),biologicalText);implementation.append(node('h6','','LeNet의 설계'),implementationText);columns.append(biological,implementation);
      layerDetails.append(layerTag,layerTitle,columns);layerStatus.append(layerEmpty,layerDetails);
      layerSource=sourceLink(layerConfig.source);
      inspector.append(rail,layerStatus,node('p','vision-system-scope vision-system-layer-scope',layerConfig.scope),layerSource);pathway.append(inspector);
    }
    pathway.append(pathwayStatus,node('p','vision-system-scope',config.pathway.scope),sourceLink(config.pathway.source));

    const bridge=node('aside','vision-system-bridge');bridge.append(node('h4','',config.bridge.title),node('p','',config.bridge.text));root.append(bridge);
    function updateExperiment(){
      if(disposed)return;
      root.dataset.angle=String(angle);
      for(const button of angleButtons){const selected=Number(button.dataset.angle)===angle;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('active',selected);}
      // Only the companion module's locally generated SVG is inserted here.
      experimentArt.innerHTML=window.AtlasVisionArt.experiment(angle);
      experimentStatus.textContent=angleChoices.find(item=>item.value===angle).text;
    }
    function updatePathway(){
      if(disposed)return;
      root.dataset.pathway=stage;
      for(const button of stageButtons){const selected=button.dataset.pathway===stage;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('active',selected);}
      pathwayArt.innerHTML=window.AtlasVisionArt.pathway(stage);
      const selected=stageChoices.find(item=>item.id===stage);stageTitle.textContent=selected?.title||'시각 경로의 개요';stageText.textContent=selected?.text||'선택한 층은 특정한 뇌 영역을 복제한 것으로 대응시키지 않습니다.';
      pathwayStatus.hidden=selectedLayer!==null;
    }
    function updateLayer(){
      if(!layerConfig||disposed)return;
      root.dataset.layer=selectedLayer||'';inspector.dataset.active=String(selectedLayer!==null);
      for(const button of layerButtons){const selected=button.dataset.layer===selectedLayer;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('active',selected);}
      layerEmpty.hidden=selectedLayer!==null;layerDetails.hidden=selectedLayer===null;layerSource.hidden=selectedLayer===null;
      if(selectedLayer===null)return;
      const item=layerChoices.find(choice=>choice.id===selectedLayer),source=item.source||layerConfig.source;
      layerTag.textContent=item.kind==='engineering'?'공학적 설계':'시각계에서 얻은 단서';layerTag.dataset.kind=item.kind;
      layerTitle.textContent=item.title;biologicalText.textContent=item.biological;implementationText.textContent=item.implementation;
      layerSource.textContent=source.title+' ↗';layerSource.href=source.url;
    }
    function selectLayer(id,{scroll=false,notify=false}={}){
      if(disposed)return;
      const item=layerChoices.find(choice=>choice.id===id);
      if(!item)throw new RangeError('Unknown or unavailable LeNet connection layer: '+id);
      selectedLayer=id;stage=item.visionStage;updatePathway();updateLayer();
      if(notify)options.onLayerSelect?.(id);
      // Keep the brain drawing and the inspector together in the viewport.
      if(scroll)pathwayArt.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches?'auto':'smooth',block:'start'});
    }
    for(const item of angleChoices){const button=node('button','vision-system-choice',item.label);button.type='button';button.dataset.angle=String(item.value);listen(button,()=>{angle=item.value;updateExperiment();});angleButtons.push(button);experimentControls.append(button);}
    for(const item of stageChoices){const button=node('button','vision-system-choice',item.label);button.type='button';button.dataset.pathway=item.id;listen(button,()=>{stage=item.id;selectedLayer=null;updatePathway();updateLayer();if(layerConfig)options.onLayerSelect?.(null);});stageButtons.push(button);pathwayControls.append(button);}
    updateExperiment();host.append(root);
    if(layerConfig)selectLayer(layerConfig.defaultLayer,{notify:true});else updatePathway();
    const dispose=()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    // Programmatic selection is silent: callers can synchronize a second view
    // without producing a callback loop. User rail/pathway actions notify once.
    dispose.selectLayer=(id,settings={})=>selectLayer(id,{scroll:settings.scroll===true});
    return dispose;
  }
  window.AtlasVisionSystem=Object.freeze({mount});
})();
