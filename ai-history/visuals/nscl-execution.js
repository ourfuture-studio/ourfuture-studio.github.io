/* A typed linear program over authored scores; no visual model or parser is run. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const own=(object,key)=>Object.prototype.hasOwnProperty.call(object,key);
  function scoreVector(value,length,name){if(!Array.isArray(value)||value.length!==length||!Array.from(value).every(x=>Number.isFinite(x)&&x>=0&&x<=1))throw new TypeError(name+' must match the object count and contain finite values in [0,1].');return value.slice();}
  function recordMap(value,name){if(!value||typeof value!=='object'||Array.isArray(value))throw new TypeError(name+' must be a named record.');return Object.entries(value);}
  function executeProgram(options){
    if(!options||typeof options!=='object')throw new TypeError('Execution options are required.');
    const ids=options.objectIds;
    if(!Array.isArray(ids)||!ids.length||ids.length>64||!Array.from(ids).every(hasText)||new Set(ids).size!==ids.length)throw new TypeError('One to sixty-four distinct object ids are required.');
    const concepts=new Map(recordMap(options.conceptScores,'conceptScores').map(([name,values])=>{if(!hasText(name))throw new TypeError('Concept names must be nonempty.');return[name,scoreVector(values,ids.length,'Concept scores')];}));
    const relations=new Map(recordMap(options.relations,'relations').map(([name,rows])=>{if(!hasText(name)||!Array.isArray(rows)||rows.length!==ids.length||!Array.from(rows).every(Array.isArray))throw new TypeError('Relation matrices must have one row per reference object.');return[name,rows.map(row=>scoreVector(row,ids.length,'Relation row'))];}));
    const attributes=new Map(recordMap(options.attributes,'attributes').map(([name,labels])=>{if(!hasText(name)||!Array.isArray(labels)||!labels.length||!Array.from(labels).every(id=>hasText(id)&&concepts.has(id))||new Set(labels).size!==labels.length)throw new TypeError('An attribute must list distinct known concepts.');for(let i=0;i<ids.length;i++)if(!(labels.reduce((sum,label)=>sum+concepts.get(label)[i],0)>0))throw new RangeError('Every object needs positive score mass for each query attribute.');return[name,labels.slice()];}));
    const program=options.program,ops=['scene','filter','unique','relate','query','count'];
    if(!Array.isArray(program)||!program.length||program.length>64||!Array.from(program).every(step=>step&&hasText(step.id)&&ops.includes(step.op))||new Set(program.map(s=>s.id)).size!==program.length||program[0].op!=='scene')throw new TypeError('A linear program needs distinct step ids, a first Scene and supported operations.');
    let state=null;const trace=[];
    const requireType=type=>{if(!state||state.type!==type)throw new TypeError('This operator requires '+type+' input.');};
    for(const [index,step] of program.entries()){
      let argument=null,type,values,labels;
      if(step.op==='scene'){if(index!==0)throw new TypeError('Scene may appear only at the start of this linear program.');type='objectSet';values=ids.map(()=>1);labels=ids.slice();}
      else if(step.op==='filter'){requireType('objectSet');if(!concepts.has(step.concept))throw new TypeError('Filter needs a known concept.');argument=step.concept;type='objectSet';values=state.values.map((x,i)=>Math.min(x,concepts.get(argument)[i]));labels=ids.slice();}
      else if(step.op==='unique'){
        requireType('objectSet');if(!state.values.every(x=>x>0&&x<1))throw new RangeError('Unique uses logit values and requires strict interior membership; no endpoint clipping is added.');
        const logits=state.values.map(x=>Math.log(x)-Math.log1p(-x)),maximum=Math.max(...logits),exps=logits.map(x=>Math.exp(x-maximum)),sum=exps.reduce((a,b)=>a+b,0);type='object';values=exps.map(x=>x/sum);labels=ids.slice();
      }else if(step.op==='relate'){requireType('object');if(!relations.has(step.relation))throw new TypeError('Relate needs a known relation matrix.');argument=step.relation;const matrix=relations.get(argument);type='objectSet';values=ids.map((_,i)=>state.values.reduce((sum,weight,j)=>sum+weight*matrix[j][i],0));labels=ids.slice();}
      else if(step.op==='query'){
        requireType('object');if(!attributes.has(step.attribute))throw new TypeError('Query needs a known attribute.');argument=step.attribute;labels=attributes.get(argument).slice();const rows=ids.map((_,i)=>{const raw=labels.map(label=>concepts.get(label)[i]),sum=raw.reduce((a,b)=>a+b,0);return raw.map(value=>value/sum);});type='categorical';values=labels.map((_,c)=>state.values.reduce((sum,weight,i)=>sum+weight*rows[i][c],0));
      }else{requireType('objectSet');type='count';values=[state.values.reduce((a,b)=>a+b,0)];labels=['count'];}
      state={type,values,labels};trace.push({index,id:step.id,op:step.op,argument,type,values:values.slice(),labels:labels.slice()});
    }
    return{trace,answer:{type:state.type,values:state.values.slice(),labels:state.labels.slice()}};
  }
  window.AtlasNSCLModel=Object.freeze({executeProgram});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const number=value=>Math.abs(value)<.00005?'0.0000':value.toFixed(4);
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function source(item){const el=node('a','nscl-source',item.title+' ↗');el.href=item.url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const human=id=>({sphere:'구',cube:'큐브',cylinder:'원기둥',red:'빨강',blue:'파랑',green:'초록',count:'연속 선택량'}[id]||id);
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['execute','learn'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Execution and learning views are required.');
    const scene=config.scene;
    if(!scene||!Array.isArray(scene.objects)||!scene.objects.length||!scene.objects.every(o=>o&&hasText(o.id)&&hasText(o.label)&&/^#[0-9a-f]{6}$/i.test(o.color)&&['cube','sphere','cylinder'].includes(o.shape)&&hasText(o.material)&&Number.isFinite(o.x)&&o.x>=0&&o.x<=1&&Number.isFinite(o.y)&&o.y>=0&&o.y<=1)||!hasText(scene.scope)||!sourced(scene.source))throw new TypeError('The authored scene needs labeled objects, hex colors and bounded positions.');
    if(!config.model||!hasText(config.model.scope)||!sourced(config.model.source)||!Array.isArray(config.questions)||!config.questions.length||new Set(config.questions.map(q=>q.id)).size!==config.questions.length||!config.questions.some(q=>q.id===config.initialQuestion))throw new TypeError('The score model needs prepared questions and sources.');
    for(const q of config.questions){if(!q||!['id','label','text','answerLabel','scope'].every(k=>hasText(q[k]))||!sourced(q.source))throw new TypeError('Each question needs an authored program, target label and scope.');const out=executeProgram({...config.model,objectIds:scene.objects.map(o=>o.id),program:q.program});if(!['categorical','count'].includes(out.answer.type))throw new TypeError('A displayed question must end in an attribute query or continuous count.');}
    const learning=config.learning;if(!learning||!['text','visualRoute','parserRoute','initialization','scope'].every(k=>hasText(learning[k]))||!sourced(learning.source))throw new TypeError('The two learning routes need descriptions and a source.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original figures need local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('scene-program-execution',{
    mount(host,config){
      validate(config);
      const root=node('div','nscl-execution'),listeners=[],stageButtons=[],questionButtons=[],stepButtons=[],objectViews=[];
      let stage='execute',questionId=config.initialQuestion,cursor=0,selectedObject=config.scene.objects[0].id,evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'nscl-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const active=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(active));el.classList.toggle('active',active);}};
      const range=(label,text,item)=>{const el=node('details','nscl-details');el.append(node('summary','',label),node('p','nscl-scope',text),source(item));return el;};
      const stages=group('장면과 프로그램, 학습의 두 연결','nscl-stage-controls'),stageText=node('p','nscl-stage-text'),questions=group('준비한 질문과 프로그램 선택'),questionText=node('p','nscl-question');
      const execute=node('section','nscl-execute-panel'),learn=node('section','nscl-learn-panel'),workspace=node('div','nscl-workspace'),sceneColumn=node('section','nscl-scene-column'),programColumn=node('section','nscl-program-column');
      const scene=node('div','nscl-scene'),sceneCaption=node('p','nscl-note'),inspector=node('div','nscl-inspector');scene.setAttribute('role','group');scene.setAttribute('aria-label','직접 그린 물체 장면, 물체를 선택해 값 확인');
      sceneColumn.append(node('h5','','직접 그린 장면 · 물체를 눌러 보기'),scene,sceneCaption,inspector);
      const play=group('준비한 프로그램의 실행 위치','nscl-play-controls'),first=button('처음',play,()=>{cursor=0;update();}),previous=button('이전',play,()=>{cursor--;update();}),next=button('다음',play,()=>{cursor++;update();}),last=button('끝',play,()=>{cursor=run().trace.length-1;update();});
      for(const [el,label] of [[first,'프로그램 처음 보기'],[previous,'프로그램 이전 보기'],[next,'프로그램 다음 보기'],[last,'프로그램 마지막 보기']])el.setAttribute('aria-label',label);
      const stepControls=group('고정 프로그램의 단계 직접 선택','nscl-step-controls'),stepStatus=node('p','nscl-selection-status'),operatorText=node('p','nscl-prose'),values=node('div','nscl-values');stepStatus.setAttribute('role','status');stepStatus.setAttribute('aria-live','polite');
      programColumn.append(node('h5','','고정 프로그램과 현재 중간값'),play,stepControls,stepStatus,operatorText,values);workspace.append(sceneColumn,programColumn);
      execute.append(node('p','nscl-prepared-label','장면·질문·점수·프로그램은 직접 정한 보기'),workspace,node('p','nscl-legend','장면의 밝기와 숫자는 현재 soft 값입니다. 0/1로 잘라 고른 물체 목록이 아닙니다.'),range('장면과 점수의 범위',config.scene.scope+'\n'+config.model.scope,config.model.source));
      const questionRange=node('details','nscl-details'),questionScope=node('p','nscl-scope'),questionSource=node('div');questionRange.append(node('summary','','선택한 질문·프로그램의 범위'),questionScope,questionSource);execute.append(questionRange);

      const qaResult=node('div','nscl-qa-result'),visualRoute=node('section'),parserRoute=node('section'),fork=node('div','nscl-learning-fork');visualRoute.append(node('span','nscl-route-label','연속적인 시각·개념 경로'),node('h5','','미분 가능한 실행'),node('p','',config.learning.visualRoute));parserRoute.append(node('span','nscl-route-label','이산적인 프로그램 선택 경로'),node('h5','','정답 보상과 프로그램 탐색'),node('p','',config.learning.parserRoute));fork.append(visualRoute,parserRoute);
      learn.append(node('h4','','답을 확인하는 일이, 시각 개념과 질문 해석의 학습으로'),node('p','nscl-prose',config.learning.text),qaResult,node('div','nscl-flow-arrow','↓'),fork,node('p','nscl-keypoint','프로그램 토큰을 통과하는 미분으로 두 경로를 합치지 않습니다.'),node('p','nscl-initialization',config.learning.initialization),range('사전학습·개념어·QA 학습의 조건',config.learning.scope,config.learning.source));

      const evidence=node('details','nscl-details nscl-evidence');evidence.append(node('summary','','원논문의 개념·실행·학습 그림 보기'));const evidenceBody=node('div'),evidenceControls=group('NS-CL 원문 그림 선택'),evidenceButtons=[],evidenceTitle=node('h4'),evidenceCaption=node('p','nscl-prose'),evidenceScope=node('p','nscl-scope'),evidenceSource=node('div'),evidenceCredit=node('p','nscl-credit'),zoom=node('button','nscl-zoom','원문 그림 확대'),pane=node('div','nscl-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);evidenceBody.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','nscl-note','확대하면 그림 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);evidence.append(evidenceBody);

      function shapeSvg(object){
        const color=object.color,shine=object.material==='metal'?.5:.18;let body;
        if(object.shape==='sphere')body='<ellipse cx="50" cy="71" rx="27" ry="6" fill="currentColor" opacity=".12"/><circle cx="50" cy="41" r="28" fill="'+color+'"/><ellipse cx="41" cy="30" rx="13" ry="9" fill="white" opacity="'+shine+'"/><path d="M32 60 Q60 76 75 49" stroke="black" opacity=".12" stroke-width="5" fill="none"/>';
        else if(object.shape==='cube')body='<ellipse cx="50" cy="74" rx="31" ry="6" fill="currentColor" opacity=".12"/><path d="M22 27L48 12L78 28L51 44Z" fill="'+color+'"/><path d="M22 27L51 44L51 76L22 59Z" fill="'+color+'"/><path d="M51 44L78 28L78 60L51 76Z" fill="'+color+'"/><path d="M22 27L48 12L78 28L51 44Z" fill="white" opacity="'+shine+'"/><path d="M51 44L78 28L78 60L51 76Z" fill="black" opacity=".18"/>';
        else body='<ellipse cx="50" cy="74" rx="29" ry="6" fill="currentColor" opacity=".12"/><path d="M24 23L24 62C24 76 76 76 76 62L76 23Z" fill="'+color+'"/><ellipse cx="50" cy="23" rx="26" ry="10" fill="'+color+'"/><ellipse cx="50" cy="23" rx="26" ry="10" fill="white" opacity="'+shine+'"/><path d="M66 31L66 64" stroke="black" stroke-width="8" opacity=".1"/>';
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 84" aria-hidden="true">'+body+'</svg>';
      }
      for(const object of config.scene.objects){const el=button('',scene,()=>{selectedObject=object.id;update();});el.className='nscl-scene-object';el.dataset.object=object.id;el.setAttribute('aria-label',object.label+' 선택');el.style.left=(12+76*object.x)+'%';el.style.top=(16+66*object.y)+'%';const figure=node('span','nscl-object-figure'),id=node('span','nscl-object-id',object.id),weight=node('span','nscl-object-weight');figure.innerHTML=shapeSvg(object);el.append(figure,id,weight);objectViews.push({object,el,figure,weight});}
      const maxSteps=Math.max(...config.questions.map(q=>q.program.length));for(let i=0;i<maxSteps;i++){const el=button('',stepControls,()=>{cursor=i;update();});el.dataset.step=String(i);stepButtons.push(el);}
      const selectedQuestion=()=>config.questions.find(q=>q.id===questionId),run=()=>executeProgram({...config.model,objectIds:config.scene.objects.map(o=>o.id),program:selectedQuestion().program});
      const typeLabel=type=>({objectSet:'ObjectSet · 정규화하지 않은 소속도',object:'Object · 참조 물체 분포',categorical:'속성 질의의 답 분포',count:'Count · 연속 선택량'}[type]);
      const opLabel=frame=>frame.op+(frame.argument?'('+frame.argument+')':'');
      function outputText(answer){return answer.type==='count'?'연속 선택량 '+number(answer.values[0]):answer.labels.map((label,i)=>human(label)+' '+number(answer.values[i])).join(' · ');}
      function update(){
        if(disposed)return;const q=selectedQuestion(),result=run();cursor=Math.max(0,Math.min(cursor,result.trace.length-1));const frame=result.trace[cursor],sceneFrame=['objectSet','object'].includes(frame.type)?frame:[...result.trace.slice(0,cursor)].reverse().find(s=>['objectSet','object'].includes(s.type));root.dataset.question=questionId;root.dataset.step=String(cursor);root.dataset.type=frame.type;root.dataset.object=selectedObject;mark(questionButtons,'question',questionId);mark(stepButtons,'step',cursor);questionText.textContent=q.text;questionScope.textContent=q.scope;questionSource.replaceChildren(source(q.source));
        first.disabled=previous.disabled=cursor===0;next.disabled=last.disabled=cursor===result.trace.length-1;
        for(const [i,el] of stepButtons.entries()){el.hidden=i>=result.trace.length;if(i<result.trace.length){el.textContent=(i+1)+' · '+opLabel(result.trace[i]);el.setAttribute('aria-current',i===cursor?'step':'false');}}
        for(const [i,view] of objectViews.entries()){view.el.setAttribute('aria-pressed',String(view.object.id===selectedObject));view.el.dataset.selected=String(view.object.id===selectedObject);const weight=sceneFrame.values[i];view.figure.style.opacity=String(.25+.75*weight);view.weight.textContent=number(weight);}
        sceneCaption.textContent=(frame===sceneFrame?'현재 단계':'질의 직전 단계')+'의 '+typeLabel(sceneFrame.type)+'를 장면에 표시합니다.';
        const objectIndex=config.scene.objects.findIndex(o=>o.id===selectedObject),object=config.scene.objects[objectIndex],concepts=node('div','nscl-concept-chips');for(const [label,scores] of Object.entries(config.model.conceptScores)){const chip=node('span','',human(label)+' '+number(scores[objectIndex]));chip.dataset.current=String(frame.op==='filter'&&frame.argument===label);concepts.append(chip);}inspector.replaceChildren(node('strong','',object.label),node('p','nscl-object-attributes',human(object.shape)+' · '+({matte:'무광',rubber:'고무',metal:'금속'}[object.material]||object.material)),node('span','nscl-inspector-label','이 물체에 직접 정한 개념값'),concepts);
        stepStatus.textContent='단계 '+(cursor+1)+' / '+result.trace.length+' · '+opLabel(frame)+' · '+typeLabel(frame.type);
        operatorText.textContent={scene:'모든 물체의 집합 소속도를 1로 시작합니다.',filter:'앞선 집합 소속도와 개념값 중 작은 값을 각 물체에 남깁니다.',unique:'집합값의 logit에 softmax를 적용해 참조 물체 분포로 바꿉니다.',relate:'참조 물체 분포로 관계 행렬의 행을 가중합합니다. 행은 기준, 열은 대상 물체입니다.',query:'각 물체의 해당 속성 개념값을 먼저 정규화한 뒤, 참조 물체 분포로 혼합합니다.',count:'집합 소속도를 합한 연속 선택량입니다. 정수 물체 수로 반올림하지 않습니다.'}[frame.op];
        values.replaceChildren(...frame.values.map((value,i)=>{const row=node('div','nscl-value-row');row.dataset.selected=String(frame.labels[i]===selectedObject);const label=frame.type==='count'?'연속 선택량':human(frame.labels[i]),track=node('div','nscl-value-track'),fill=node('span');fill.style.width=(Math.min(1,value)*100)+'%';track.setAttribute('aria-hidden','true');track.append(fill);row.append(node('span','',label),node('strong','',number(value)));if(frame.type!=='count')row.append(track);return row;}));
        qaResult.replaceChildren(node('span','','선택한 질문의 끝까지 실행한 값'),node('strong','',outputText(result.answer)),node('p','',q.answerLabel));
      }
      function updateEvidence(){if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(source(item.credit),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 NS-CL 원문 그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}}
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;execute.hidden=stage!=='execute';learn.hidden=stage!=='learn';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const q of config.questions){const el=button(q.label,questions,()=>{questionId=q.id;cursor=0;update();});el.dataset.question=q.id;questionButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});root.append(stages,stageText,questions,questionText,execute,learn,evidence,range('자체 장면·실행값과 원래 연구의 구분',config.scope,config.source));update();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
