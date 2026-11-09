/* Word2Vec: prediction direction, a chosen small softmax step, and independent
 * original-paper evidence. No semantic coordinates or benchmark scores invented. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const zeros=(rows,cols)=>Array.from({length:rows},()=>Array(cols).fill(0));
  const copy=matrix=>matrix.map(row=>row.slice());
  const MODES=['cbow','skipgram'],STAGES=['context','update','relations'];
  function contextWindow(tokens,centerIndex,radius){
    if(!Array.isArray(tokens)||!tokens.length||!tokens.every(hasText))throw new TypeError('Tokens must be a non-empty string array.');
    if(!Number.isSafeInteger(centerIndex)||centerIndex<0||centerIndex>=tokens.length)throw new RangeError('Center index is outside the sentence.');
    if(!Number.isSafeInteger(radius)||radius<1)throw new RangeError('Context radius must be a positive integer.');
    const contextIndices=[];for(let i=Math.max(0,centerIndex-radius);i<=Math.min(tokens.length-1,centerIndex+radius);i++)if(i!==centerIndex)contextIndices.push(i);
    return{centerIndex,contextIndices};
  }
  function matrixShape(matrix){
    if(!Array.isArray(matrix)||!matrix.length||!Array.isArray(matrix[0])||!matrix[0].length)throw new TypeError('Vectors must be a non-empty rectangular matrix.');
    const width=matrix[0].length;
    if(!matrix.every(row=>Array.isArray(row)&&row.length===width&&row.every(value=>typeof value==='number'&&Number.isFinite(value))))throw new TypeError('Vectors must be a finite rectangular matrix.');
    return{rows:matrix.length,cols:width};
  }
  function finite(value){if(!Number.isFinite(value))throw new RangeError('The chosen parameters overflow the numeric computation.');return value;}
  function forward(inputVectors,outputVectors,inputIds,targetId){
    const dimension=inputVectors[0].length,projection=Array(dimension).fill(0),count=inputIds.length;
    for(const id of inputIds)for(let d=0;d<dimension;d++)projection[d]=finite(projection[d]+inputVectors[id][d]/count);
    const logits=outputVectors.map(row=>{let total=0;for(let d=0;d<dimension;d++)total=finite(total+row[d]*projection[d]);return total;});
    const maximum=Math.max(...logits),exponentials=logits.map(value=>Math.exp(value-maximum)),normalizer=exponentials.reduce((a,b)=>a+b,0);
    const probabilities=exponentials.map(value=>value/normalizer),loss=finite((maximum-logits[targetId])+Math.log(normalizer));
    return{projection,logits,probabilities,loss};
  }
  function softmaxStep(options){
    if(!options||typeof options!=='object'||Array.isArray(options))throw new TypeError('Softmax step requires an options object.');
    const{inputVectors,outputVectors,inputIds,targetId,mode,learningRate}=options,inputShape=matrixShape(inputVectors),outputShape=matrixShape(outputVectors);
    if(inputShape.rows!==outputShape.rows||inputShape.cols!==outputShape.cols)throw new RangeError('Input and output vector tables need matching dimensions.');
    if(!MODES.includes(mode))throw new RangeError('Unknown prediction mode.');
    if(!Array.isArray(inputIds)||!inputIds.length||!inputIds.every(id=>Number.isSafeInteger(id)&&id>=0&&id<inputShape.rows))throw new RangeError('Input ids must be a non-empty array of vocabulary indices.');
    if(mode==='skipgram'&&inputIds.length!==1)throw new RangeError('One Skip-gram pair has exactly one input id.');
    if(!Number.isSafeInteger(targetId)||targetId<0||targetId>=inputShape.rows)throw new RangeError('Target id is outside the vocabulary.');
    if(typeof learningRate!=='number'||!Number.isFinite(learningRate)||learningRate<=0||learningRate>1)throw new RangeError('Learning rate must be greater than zero and at most one.');
    const before=forward(inputVectors,outputVectors,inputIds,targetId),inputGradients=zeros(inputShape.rows,inputShape.cols),outputGradients=zeros(inputShape.rows,inputShape.cols),projectionGradient=Array(inputShape.cols).fill(0);
    for(let j=0;j<inputShape.rows;j++){
      const error=before.probabilities[j]-(j===targetId?1:0);
      for(let d=0;d<inputShape.cols;d++){
        outputGradients[j][d]=finite(error*before.projection[d]);
        projectionGradient[d]=finite(projectionGradient[d]+error*outputVectors[j][d]);
      }
    }
    for(const id of inputIds)for(let d=0;d<inputShape.cols;d++)inputGradients[id][d]=finite(inputGradients[id][d]+projectionGradient[d]/inputIds.length);
    const updatedInputVectors=inputVectors.map((row,i)=>row.map((value,d)=>finite(value-learningRate*inputGradients[i][d])));
    const updatedOutputVectors=outputVectors.map((row,i)=>row.map((value,d)=>finite(value-learningRate*outputGradients[i][d])));
    const after=forward(updatedInputVectors,updatedOutputVectors,inputIds,targetId);
    return{...before,inputGradients,outputGradients,updatedInputVectors,updatedOutputVectors,after};
  }
  window.AtlasWord2VecModel=Object.freeze({contextWindow,softmaxStep});
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'word2vec-source');
  const number=value=>Math.abs(value)>0&&Math.abs(value)<.0001?value.toExponential(2):value.toFixed(4);
  const vector=value=>'['+value.map(number).join(', ')+']';
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!STAGES.every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new Error('Word2Vec requires three sourced stages.');
    if(!Array.isArray(config.modes)||!MODES.every(id=>config.modes.some(m=>m.id===id&&['label','title','text'].every(k=>hasText(m[k]))&&hasText(m.source?.title)&&hasText(m.source?.url))))throw new Error('Word2Vec requires CBOW and Skip-gram descriptions.');
    const ex=config.example;
    if(!ex||!Array.isArray(ex.vocabulary)||!ex.vocabulary.length||!ex.vocabulary.every(hasText)||new Set(ex.vocabulary).size!==ex.vocabulary.length||!Array.isArray(ex.sentences)||!ex.sentences.length||new Set(ex.sentences.map(s=>s.id)).size!==ex.sentences.length)throw new Error('Word2Vec requires distinct vocabulary and sentence ids.');
    if(!ex.sentences.every(s=>hasText(s.id)&&hasText(s.label)&&hasText(s.translation)&&Array.isArray(s.tokens)&&s.tokens.length>=2&&s.tokens.every(t=>ex.vocabulary.includes(t))))throw new Error('Example sentences must use the displayed vocabulary.');
    if(!Array.isArray(ex.radii)||!ex.radii.length||!ex.radii.every(r=>Number.isSafeInteger(r)&&r>=1)||!ex.radii.includes(ex.initialRadius)||!MODES.includes(ex.initialMode)||!hasText(ex.scope)||!hasText(ex.source?.title)||!hasText(ex.source?.url))throw new Error('The example needs context settings, scope and a source.');
    for(const sentence of ex.sentences)contextWindow(sentence.tokens,ex.initialCenter,ex.initialRadius);
    const shape=matrixShape(ex.inputVectors);if(shape.rows!==ex.vocabulary.length||shape.cols!==2)throw new Error('The displayed example uses two components for each vocabulary word.');
    softmaxStep({inputVectors:ex.inputVectors,outputVectors:ex.outputVectors,inputIds:[0],targetId:0,mode:'skipgram',learningRate:ex.learningRate});
    const evidence=config.evidence;
    if(!evidence||!/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(evidence.file)||evidence.file.includes('..')||!['title','caption','scope','questionScope'].every(k=>hasText(evidence[k]))||!hasText(evidence.source?.title)||!hasText(evidence.source?.url)||!hasText(evidence.credit?.title)||!hasText(evidence.credit?.url)||!Array.isArray(evidence.questionCases)||!evidence.questionCases.length||!evidence.questionCases.every(c=>['id','label','a','b','c','answer','text'].every(k=>hasText(c[k]))&&hasText(c.source?.title)&&hasText(c.source?.url)))throw new Error('Relations need original evidence and sourced evaluation cases.');
    if(config.publications&&!config.publications.every(p=>hasText(p.id)&&hasText(String(p.year))&&hasText(p.title)&&Array.isArray(p.authors)&&p.authors.every(hasText)&&hasText(p.detail)&&hasText(p.source?.title)&&hasText(p.source?.url)))throw new Error('Publication cards require authors, date, scope and source.');
    if(!hasText(config.scope)||!hasText(config.source?.title)||!hasText(config.source?.url))throw new Error('The viewer requires a scope statement and original source.');
  }
  window.AtlasVisuals.register('context-representation',{
    mount(host,config){
      validate(config);
      const ex=config.example,root=node('div','word2vec-context'),listeners=[],stageButtons=[],modeButtons=[],sentenceButtons=[],radiusButtons=[],tokenButtons=[],targetButtons=[],caseButtons=[];
      const vocabularyIds=new Map(ex.vocabulary.map((word,id)=>[word,id])),maximumLength=Math.max(...ex.sentences.map(s=>s.tokens.length));
      let stage='context',mode=ex.initialMode,sentenceId=ex.sentences[0].id,centerIndex=ex.initialCenter,radius=ex.initialRadius,selectedContextIndex=null,stepped=false,caseId=config.evidence.questionCases[0].id,answerOpen=false,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      function mark(buttons,key,value){for(const button of buttons){const on=String(button.dataset[key])===String(value);button.setAttribute('aria-pressed',String(on));button.classList.toggle('active',on);}}
      const stageControls=node('div','word2vec-stage-controls');stageControls.setAttribute('role','group');stageControls.setAttribute('aria-label','문맥에서 단어 표현을 배우는 단계');
      const stageText=node('p','word2vec-stage-text');
      const common=node('section','word2vec-controls');common.setAttribute('aria-label','예측 방향과 문맥 선택');
      const modeControls=node('div','word2vec-mode-controls');modeControls.setAttribute('role','group');modeControls.setAttribute('aria-label','Word2Vec 예측 모형');
      const modeTitle=node('h4'),modeText=node('p','word2vec-prose'),modeSource=node('div');common.append(modeControls,modeTitle,modeText,modeSource);
      const sentenceControls=node('div','word2vec-sentence-controls');sentenceControls.setAttribute('role','group');sentenceControls.setAttribute('aria-label','직접 구성한 문장 선택');
      const sentenceTranslation=node('p','word2vec-translation'),tokenList=node('div','word2vec-tokens');tokenList.setAttribute('role','group');tokenList.setAttribute('aria-label','중심으로 선택할 단어 위치');
      const radiusControls=node('div','word2vec-radius-controls');radiusControls.setAttribute('role','group');radiusControls.setAttribute('aria-label','앞뒤 문맥 폭');
      const targetControls=node('div','word2vec-target-controls');targetControls.setAttribute('role','group');targetControls.setAttribute('aria-label','이번에 예측할 문맥 위치');
      const selectionStatus=node('p','word2vec-selection-status');selectionStatus.setAttribute('role','status');selectionStatus.setAttribute('aria-live','polite');selectionStatus.setAttribute('aria-atomic','true');
      common.append(sentenceControls,sentenceTranslation,node('p','word2vec-mini-note','단어를 누르면 중심 위치가 바뀝니다. 같은 the도 문장의 위치를 나누어 표시합니다.'),tokenList,radiusControls,targetControls,selectionStatus);
      const contextPanel=node('section','word2vec-context-panel');contextPanel.append(node('h4','','어떤 말을 보고, 어떤 말을 예측할까?'));
      const direction=node('div','word2vec-direction');direction.setAttribute('aria-label','원문 Fig.1을 참고한 예측 방향');
      contextPanel.append(direction,node('p','word2vec-mini-note','입력 표 W_in과 출력 표 W_out은 별도의 파라미터입니다. 동일한 단어가 반복되면 입력 표의 같은 행을 다시 읽습니다.'),source(config.source));
      const updatePanel=node('section','word2vec-update-panel');updatePanel.append(node('h4','','예측의 차이가, 단어를 나타내는 숫자도 바꾼다'));
      const stepDescription=node('p','word2vec-prose'),stepControls=node('div','word2vec-step-controls'),stepButton=node('button','','한 번 업데이트'),resetButton=node('button','','초기 값으로 되돌리기');stepButton.type=resetButton.type='button';stepControls.append(stepButton,resetButton);
      const stepStatus=node('div','word2vec-step-status');stepStatus.setAttribute('role','status');stepStatus.setAttribute('aria-live','polite');stepStatus.setAttribute('aria-atomic','true');
      const projectionStatus=node('p','word2vec-projection-status'),distribution=node('div','word2vec-distribution');distribution.setAttribute('aria-label','작은 전체 softmax에서 계산한 단어별 확률');
      const details=node('details','word2vec-parameter-details'),detailBody=node('div');details.append(node('summary','','입력·출력 표의 전후 값과 기울기'),detailBody);
      updatePanel.append(stepDescription,stepControls,stepStatus,projectionStatus,node('p','word2vec-mini-note','회색은 갱신 전, 강조색은 한 번 갱신 후의 직접 계산입니다. 이 일곱 후보의 분포를 계산하며 원래 말뭉치의 성능을 표시하지 않습니다.'),distribution,details,node('p','word2vec-scope',ex.scope),source(ex.source));
      const relations=node('section','word2vec-relations');relations.append(node('h4','',config.evidence.title),node('p','word2vec-prose',config.evidence.caption));
      const zoom=node('button','word2vec-zoom','원문 PCA 그림 확대');zoom.type='button';zoom.setAttribute('aria-pressed','false');
      const evidencePane=node('div','word2vec-evidence-viewport'),evidenceImage=node('img');window.AtlasPublicAssets.setSource(evidenceImage,config.evidence.file);evidenceImage.alt=config.evidence.caption;evidenceImage.decoding='async';evidencePane.append(evidenceImage);
      const evidenceCredit=node('p','word2vec-credit');evidenceCredit.append(link(config.evidence.credit.title,config.evidence.credit.url),document.createTextNode(' · '+(config.evidence.credit.note||'')));
      relations.append(zoom,node('p','word2vec-mini-note','확대하면 그림 영역 안에서 좌우로 움직여 읽을 수 있습니다.'),evidencePane,node('p','word2vec-scope',config.evidence.scope),source(config.evidence.source),evidenceCredit);
      const questions=node('section','word2vec-questions');questions.append(node('h4','','원문은 어떤 관계로 표현을 시험했을까?'));
      const questionControls=node('div','word2vec-case-controls');questionControls.setAttribute('role','group');questionControls.setAttribute('aria-label','원문 평가 문항의 관계 유형');
      const analogy=node('p','word2vec-analogy'),equation=node('p','word2vec-equation'),questionText=node('p','word2vec-prose'),answerButton=node('button','','평가용 정답 보기'),answer=node('p','word2vec-answer'),questionSource=node('div');answerButton.type='button';answerButton.setAttribute('aria-expanded','false');answer.setAttribute('role','status');answer.setAttribute('aria-live','polite');
      questions.append(questionControls,analogy,equation,questionText,answerButton,answer,questionSource,node('p','word2vec-scope',config.evidence.questionScope));relations.append(questions);
      if(config.publications?.length){const publications=node('section','word2vec-publications');publications.append(node('h4','','같은 2013년, 두 문헌의 역할을 나누어 읽기'));const list=node('div','word2vec-publication-list');for(const p of config.publications){const card=node('article');card.append(node('span','word2vec-year',String(p.year)),node('h5','',p.title),node('p','word2vec-authors',p.authors.join(' · ')),node('p','word2vec-prose',p.detail),source(p.source));list.append(card);}publications.append(list);relations.append(publications);}
      function current(){const sentence=ex.sentences.find(s=>s.id===sentenceId),context=contextWindow(sentence.tokens,centerIndex,radius);if(!context.contextIndices.includes(selectedContextIndex))selectedContextIndex=context.contextIndices[0];return{sentence,context};}
      function calculation(){const{sentence,context}=current();const inputIds=mode==='cbow'?context.contextIndices.map(index=>vocabularyIds.get(sentence.tokens[index])):[vocabularyIds.get(sentence.tokens[centerIndex])],targetId=vocabularyIds.get(sentence.tokens[mode==='cbow'?centerIndex:selectedContextIndex]);return{...softmaxStep({inputVectors:ex.inputVectors,outputVectors:ex.outputVectors,inputIds,targetId,mode,learningRate:ex.learningRate}),inputIds,targetId};}
      function vectorItem(word,position,selected){const item=node('div','word2vec-vector-item');item.classList.toggle('selected',!!selected);item.append(node('strong','',word),node('span','','위치 '+position),node('small','','W_in['+word+']'));return item;}
      function drawDirection(){
        const{sentence,context}=current(),input=node('section','word2vec-direction-cell'),projection=node('section','word2vec-direction-cell word2vec-direction-projection'),output=node('section','word2vec-direction-cell');
        input.append(node('h5','','입력 단어'),node('p','word2vec-mini-note','공유한 입력 표에서 행을 꺼낸다'));
        const inputStack=node('div','word2vec-vector-stack');if(mode==='cbow')for(const index of context.contextIndices)inputStack.append(vectorItem(sentence.tokens[index],index,false));else inputStack.append(vectorItem(sentence.tokens[centerIndex],centerIndex,true));input.append(inputStack);
        projection.append(node('h5','','표현을 사용'),node('div','word2vec-projection-symbol','h'),node('strong','',mode==='cbow'?'문맥 입력 벡터의 평균':'중심의 입력 벡터'),node('p','word2vec-mini-note',mode==='cbow'?'여러 위치가 같은 단어라면 같은 행이 여러 번 기여한다.':'같은 중심이라면 문맥의 어느 위치를 정답으로 골라도 이 표현은 같다.'));
        output.append(node('h5','',mode==='cbow'?'예측할 중심 단어':'예측할 문맥 위치'),node('p','word2vec-mini-note','별도의 출력 표 W_out으로 후보를 비교'));
        const targets=node('div','word2vec-direction-targets');if(mode==='cbow'){const t=node('div','word2vec-direction-target selected');t.append(node('strong','',sentence.tokens[centerIndex]),node('span','','위치 '+centerIndex+' · 정답'));targets.append(t);}else for(const index of context.contextIndices){const t=node('div','word2vec-direction-target');t.classList.toggle('selected',index===selectedContextIndex);t.append(node('strong','',sentence.tokens[index]),node('span','','위치 '+index+(index===selectedContextIndex?' · 현재 정답':'')));targets.append(t);}output.append(targets);
        const firstArrow=node('span','word2vec-direction-arrow','→'),secondArrow=node('span','word2vec-direction-arrow','→');firstArrow.setAttribute('aria-hidden','true');secondArrow.setAttribute('aria-hidden','true');direction.replaceChildren(input,firstArrow,projection,secondArrow,output);
      }
      function parameterTable(title,before,gradients,after){
        const box=node('section','word2vec-matrix-section');box.append(node('h5','',title));const pane=node('div','word2vec-matrix-viewport');pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label',title+' 전후 값 표');const table=node('table'),head=node('thead'),tr=node('tr');for(const title of ['단어','갱신 전 [성분 1, 2]','손실의 기울기','한 번 갱신 후'])tr.append(node('th','',title));head.append(tr);table.append(head);const body=node('tbody');for(let i=0;i<ex.vocabulary.length;i++){const row=node('tr');row.dataset.changed=String(before[i].some((value,d)=>Math.abs(value-after[i][d])>1e-12));row.append(node('th','',ex.vocabulary[i]),node('td','',vector(before[i])),node('td','',vector(gradients[i])),node('td','',vector(after[i])));body.append(row);}table.append(body);pane.append(table);box.append(pane);return box;
      }
      function updateComputation(){
        const result=calculation(),{sentence,context}=current(),target=ex.vocabulary[result.targetId];
        stepButton.disabled=stepped;root.dataset.stepped=String(stepped);
        stepDescription.textContent=mode==='cbow'?'문맥의 '+context.contextIndices.length+'개 위치를 평균해 중심 단어 '+target+'를 예측합니다. 같은 입력 행의 반복 사용도 함께 계산합니다.':'중심 단어 '+sentence.tokens[centerIndex]+'에서 문맥 위치 '+selectedContextIndex+'의 '+target+'를 예측하는 한 쌍입니다. 다른 문맥 쌍의 손실을 모두 합친 한 번의 훈련은 아닙니다.';
        stepStatus.replaceChildren(node('strong','','정답 · '+target),node('span','','갱신 전 손실 '+number(result.loss)+(stepped?' → 갱신 후 '+number(result.after.loss):' · 아직 갱신 전')));
        projectionStatus.textContent='사용하는 표현 h · '+vector(result.projection)+(stepped?' → '+vector(result.after.projection):'')+' · 성분에 의미 이름을 미리 붙이지 않았다.';
        distribution.replaceChildren();for(let j=0;j<ex.vocabulary.length;j++){const row=node('div','word2vec-probability-row');row.dataset.target=String(j===result.targetId);const name=node('span','word2vec-probability-word',ex.vocabulary[j]+(j===result.targetId?' · 정답':'')),bars=node('div','word2vec-probability-bars'),before=node('span','word2vec-probability-before');before.style.width=(result.probabilities[j]*100)+'%';bars.append(before);if(stepped){const after=node('span','word2vec-probability-after');after.style.width=(result.after.probabilities[j]*100)+'%';bars.append(after);}bars.setAttribute('aria-hidden','true');row.append(name,bars,node('span','word2vec-probability-number',number(result.probabilities[j])+(stepped?' → '+number(result.after.probabilities[j]):'')));distribution.append(row);}
        detailBody.replaceChildren();if(stepped){detailBody.append(parameterTable('입력 표현 · W_in',ex.inputVectors,result.inputGradients,result.updatedInputVectors),parameterTable('출력 표현 · W_out',ex.outputVectors,result.outputGradients,result.updatedOutputVectors),node('p','word2vec-mini-note','두 표의 기울기는 갱신 전 값에서 구한 뒤 동시에 적용했습니다. 강조한 행은 이 한 번의 계산에서 값이 바뀐 행입니다.'));}else detailBody.append(node('p','word2vec-mini-note','한 번 업데이트를 누르면 입력·출력 표의 갱신 전 값, 기울기, 갱신 후 값을 비교할 수 있습니다.'));
      }
      function updateExample(){
        if(disposed)return;const{sentence,context}=current(),modeDescription=config.modes.find(m=>m.id===mode);root.dataset.mode=mode;root.dataset.sentence=sentenceId;root.dataset.center=String(centerIndex);root.dataset.radius=String(radius);root.dataset.target=String(mode==='cbow'?centerIndex:selectedContextIndex);
        mark(modeButtons,'mode',mode);mark(sentenceButtons,'sentence',sentenceId);mark(radiusButtons,'radius',radius);modeTitle.textContent=modeDescription.title;modeText.textContent=modeDescription.text;modeSource.replaceChildren(source(modeDescription.source));sentenceTranslation.textContent=sentence.translation;
        for(let index=0;index<maximumLength;index++){const button=tokenButtons[index],valid=index<sentence.tokens.length;button.hidden=!valid;if(!valid)continue;button.replaceChildren(node('span','word2vec-token-position',String(index)),node('strong','',sentence.tokens[index]));button.setAttribute('aria-label','위치 '+index+' · '+sentence.tokens[index]+' 중심으로 선택');button.setAttribute('aria-pressed',String(index===centerIndex));button.classList.toggle('is-center',index===centerIndex);button.classList.toggle('is-context',context.contextIndices.includes(index));}
        targetControls.hidden=mode!=='skipgram';for(let index=0;index<maximumLength;index++){const button=targetButtons[index],valid=context.contextIndices.includes(index);button.hidden=!valid;if(!valid)continue;button.textContent='위치 '+index+' · '+sentence.tokens[index];button.setAttribute('aria-pressed',String(index===selectedContextIndex));button.classList.toggle('active',index===selectedContextIndex);}
        selectionStatus.textContent='중심 · '+sentence.tokens[centerIndex]+'(위치 '+centerIndex+') / 문맥 · '+context.contextIndices.map(index=>sentence.tokens[index]+'('+index+')').join(', ')+' / '+(mode==='cbow'?'예측할 정답 · '+sentence.tokens[centerIndex]:'선택한 문맥 정답 · '+sentence.tokens[selectedContextIndex]+'(위치 '+selectedContextIndex+')');
        drawDirection();updateComputation();
      }
      function resetExample(){stepped=false;updateExample();}
      function updateQuestion(){if(disposed)return;const question=config.evidence.questionCases.find(c=>c.id===caseId);mark(caseButtons,'case',caseId);analogy.textContent=question.a+' : '+question.b+' :: '+question.c+' : ?';equation.textContent='비교할 표현 · v('+question.b+') − v('+question.a+') + v('+question.c+')';questionText.textContent=question.text;answerButton.setAttribute('aria-expanded',String(answerOpen));answerButton.textContent=answerOpen?'평가용 정답 접기':'평가용 정답 보기';answer.hidden=!answerOpen;answer.textContent='평가 문항에 정해 둔 정답 · '+question.answer;questionSource.replaceChildren(source(question.source));}
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;common.hidden=stage==='relations';contextPanel.hidden=stage!=='context';updatePanel.hidden=stage!=='update';relations.hidden=stage!=='relations';}
      for(const item of config.stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;updateStage();});stageButtons.push(button);stageControls.append(button);}
      for(const item of config.modes){const button=node('button','',item.label);button.type='button';button.dataset.mode=item.id;listen(button,'click',()=>{mode=item.id;resetExample();});modeButtons.push(button);modeControls.append(button);}
      for(const item of ex.sentences){const button=node('button','',item.label);button.type='button';button.dataset.sentence=item.id;listen(button,'click',()=>{sentenceId=item.id;selectedContextIndex=null;resetExample();});sentenceButtons.push(button);sentenceControls.append(button);}
      for(const value of ex.radii){const button=node('button','','앞뒤 '+value+'단어');button.type='button';button.dataset.radius=String(value);listen(button,'click',()=>{radius=value;resetExample();});radiusButtons.push(button);radiusControls.append(button);}
      for(let index=0;index<maximumLength;index++){const button=node('button','word2vec-token');button.type='button';button.dataset.index=String(index);listen(button,'click',()=>{centerIndex=index;selectedContextIndex=null;resetExample();});tokenButtons.push(button);tokenList.append(button);const target=node('button','');target.type='button';target.dataset.contextIndex=String(index);listen(target,'click',()=>{selectedContextIndex=index;resetExample();});targetButtons.push(target);targetControls.append(target);}
      listen(stepButton,'click',()=>{if(stepped)return;stepped=true;updateComputation();});listen(resetButton,'click',()=>{stepped=false;updateComputation();});
      listen(zoom,'click',()=>{expanded=!expanded;evidencePane.dataset.expanded=String(expanded);zoom.setAttribute('aria-pressed',String(expanded));zoom.textContent=expanded?'원문 PCA 그림 전체 보기':'원문 PCA 그림 확대';if(expanded){evidencePane.tabIndex=0;evidencePane.setAttribute('role','region');evidencePane.setAttribute('aria-label','확대한 원문 PCA 그림');}else{evidencePane.removeAttribute('tabindex');evidencePane.removeAttribute('role');evidencePane.removeAttribute('aria-label');}});
      for(const question of config.evidence.questionCases){const button=node('button','',question.label);button.type='button';button.dataset.case=question.id;listen(button,'click',()=>{caseId=question.id;answerOpen=false;updateQuestion();});caseButtons.push(button);questionControls.append(button);}listen(answerButton,'click',()=>{answerOpen=!answerOpen;updateQuestion();});
      root.append(stageControls,stageText,common,contextPanel,updatePanel,relations,node('p','word2vec-scope',config.scope),source(config.source));updateExample();updateQuestion();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
