/* ImageNet (2009): concepts, varied visual examples, and human verification.
 * Photo examples are separately licensed assets, not claimed ImageNet samples.
 * This viewer does not train a classifier or re-create the original HIT process.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)',MUTED='var(--muted, #777b86)';
  const STAGES=Object.freeze(['meaning','collect','verify']);
  const DECISIONS=Object.freeze({include:'포함',exclude:'제외',defer:'보류'});

  function graphMap(nodes){
    if(!Array.isArray(nodes)||!nodes.length)throw new TypeError('Concept nodes must be a non-empty array.');
    const map=new Map();
    for(const item of nodes){
      if(!item||!hasText(item.id)||map.has(item.id)||!Array.isArray(item.parentIds)||!item.parentIds.every(hasText)||new Set(item.parentIds).size!==item.parentIds.length)throw new Error('Concept nodes require distinct ids and parent ids.');
      map.set(item.id,item);
    }
    for(const item of nodes)for(const id of item.parentIds)if(!map.has(id))throw new Error('Missing concept parent: '+id);
    const finished=new Set(),visiting=new Set();
    function visit(id){if(visiting.has(id))throw new Error('Concept graph contains a cycle.');if(finished.has(id))return;visiting.add(id);for(const parent of map.get(id).parentIds)visit(parent);visiting.delete(id);finished.add(id);}
    for(const id of map.keys())visit(id);
    return map;
  }
  function ancestorIds(nodes,targetId){
    const map=graphMap(nodes);if(!map.has(targetId))throw new RangeError('Unknown concept target: '+targetId);
    const seen=new Set(),result=[];
    function visit(id){for(const parent of map.get(id).parentIds)if(!seen.has(parent)){seen.add(parent);result.push(parent);visit(parent);}}
    visit(targetId);return result;
  }
  function summarizeReview(candidateIds,decisions){
    if(!Array.isArray(candidateIds)||!candidateIds.every(hasText)||new Set(candidateIds).size!==candidateIds.length)throw new TypeError('Candidate ids must be distinct strings.');
    if(Object.prototype.toString.call(decisions)!=='[object Object]')throw new TypeError('Review decisions must be an object keyed by candidate id.');
    const allowed=new Set(candidateIds),summary={total:candidateIds.length,include:0,exclude:0,defer:0,unreviewed:0};
    for(const [id,decision] of Object.entries(decisions)){if(!allowed.has(id))throw new RangeError('Unknown review candidate: '+id);if(!Object.hasOwn(DECISIONS,decision))throw new RangeError('Unknown review decision: '+decision);summary[decision]++;}
    summary.unreviewed=summary.total-summary.include-summary.exclude-summary.defer;return summary;
  }
  function lookupConfidence(rows,yes,no){
    if(!Number.isInteger(yes)||yes<0||!Number.isInteger(no)||no<0)throw new RangeError('Vote counts must be non-negative integers.');
    if(!Array.isArray(rows)||!rows.length)throw new TypeError('Confidence rows must be a non-empty array.');
    const seen=new Set();let width=null;
    for(const row of rows){
      if(!row||!Number.isInteger(row.yes)||row.yes<0||!Number.isInteger(row.no)||row.no<0||!Array.isArray(row.values)||!row.values.length||!row.values.every(value=>typeof value==='number'&&Number.isFinite(value)&&value>=0&&value<=1))throw new TypeError('Confidence rows need counts and bounded values.');
      const key=row.yes+':'+row.no;if(seen.has(key))throw new Error('Duplicate confidence row.');seen.add(key);
      if(width!==null&&row.values.length!==width)throw new Error('Confidence columns must have a consistent width.');width=row.values.length;
    }
    const row=rows.find(item=>item.yes===yes&&item.no===no);if(!row)throw new RangeError('No published confidence row for these counts.');
    return{yes:row.yes,no:row.no,values:row.values.slice()};
  }
  window.AtlasImageNetModel=Object.freeze({ancestorIds,summarizeReview,lookupConfidence});

  const escape=value=>String(value).replace(/[&<>"']/g,character=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[character]));
  function representativePath(map,id){const result=[id];let current=map.get(id);while(current.parentIds.length){const parent=current.parentIds[0];result.unshift(parent);current=map.get(parent);}return result;}
  function treeDrawing(nodes,concepts,selectedId){
    const map=graphMap(nodes),paths=concepts.map(item=>representativePath(map,item.id));
    let common=0;while(paths.every(path=>path[common]!==undefined&&path[common]===paths[0][common]))common++;
    const height=Math.max(...paths.map(path=>path.length))*66+32,positions=new Map(),drawn=new Set();
    for(let level=0;level<common;level++)positions.set(paths[0][level],{x:380,y:42+level*66});
    for(let index=0;index<paths.length;index++)for(let level=common;level<paths[index].length;level++)positions.set(paths[index][level],{x:index===0?190:570,y:42+level*66});
    const active=new Set([...ancestorIds(nodes,selectedId),selectedId]),edges=[];
    for(const path of paths)for(let index=1;index<path.length;index++){
      const key=path[index-1]+'>'+path[index];if(drawn.has(key))continue;drawn.add(key);
      const from=positions.get(path[index-1]),to=positions.get(path[index]),highlight=active.has(path[index-1])&&active.has(path[index]);
      edges.push(`<path d="M${from.x} ${from.y+23}V${to.y-33}H${to.x}V${to.y-24}" fill="none" stroke="${highlight?ACCENT:INK}" stroke-opacity="${highlight?.85:.18}" stroke-width="${highlight?2.5:1.5}"/><path d="M${to.x-4} ${to.y-30}L${to.x} ${to.y-24}L${to.x+4} ${to.y-30}" fill="none" stroke="${highlight?ACCENT:INK}" stroke-opacity="${highlight?.85:.18}" stroke-width="1.4"/>`);
    }
    const boxes=[...positions].map(([id,position])=>{
      const item=map.get(id),selected=id===selectedId,highlight=active.has(id),elision=item.kind==='elision';
      const text=escape(item.label||item.id),caption=elision?'중간 개념 생략':text;
      return `<g><rect x="${position.x-119}" y="${position.y-23}" width="238" height="46" rx="${elision?19:6}" fill="${selected?ACCENT:BG}" stroke="${highlight?ACCENT:INK}" stroke-opacity="${highlight?1:.2}" stroke-width="${selected?2:1}" ${elision?'stroke-dasharray="4 4"':''}/><text x="${position.x}" y="${position.y+5}" text-anchor="middle" fill="${selected?BG:highlight?INK:MUTED}" font-size="${elision?13:15}">${elision?'… '+caption+' …':text}</text></g>`;
    }).join('');
    const selectedPath=representativePath(map,selectedId).map(id=>map.get(id).kind==='elision'?'중간 개념 생략':map.get(id).label).join(' → ');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 ${height}" role="img" aria-label="의미별 개념의 대표 경로. 현재 ${escape(concepts.find(item=>item.id===selectedId).label)} 선택."><title>같은 단어를 서로 다른 개념의 경로에 놓기</title><desc>${escape(selectedPath)}. 중간 단계가 생략된 대표 경로이며 WordNet 전체 관계를 그린 것은 아니다.</desc>${edges.join('')}${boxes}</svg>`;
  }
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!STAGES.every(id=>config.stages.some(item=>item.id===id&&hasText(item.label)&&hasText(item.text))))throw new Error('ImageNet viewer requires meaning, collect and verify stages.');
    const map=graphMap(config.nodes);
    if(!Array.isArray(config.concepts)||config.concepts.length!==2||new Set(config.concepts.map(item=>item.id)).size!==2||!config.concepts.every(item=>item&&map.has(item.id)&&hasText(item.synsetId)&&hasText(item.label)&&hasText(item.definition)))throw new Error('Two concepts must name graph leaves and distinct senses.');
    if(!Array.isArray(config.candidates)||!config.candidates.length||new Set(config.candidates.map(item=>item.id)).size!==config.candidates.length)throw new Error('Image candidates require distinct ids.');
    for(const item of config.candidates){
      if(!hasText(item.id)||!hasText(item.title)||!hasText(item.description)||!hasText(item.file)||!/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(item.file)||item.file.includes('..')||!Array.isArray(item.synsetIds)||!item.synsetIds.every(hasText)||!['author','license','licenseUrl','sourceUrl'].every(key=>hasText(item.credit?.[key])))throw new Error('Every candidate needs a local image, meaning ids and credit.');
    }
    const confidence=config.confidence;
    if(!confidence||!['title','intro','scope'].every(key=>hasText(confidence[key]))||!Array.isArray(confidence.labels)||confidence.labels.length!==2||!confidence.labels.every(hasText)||!hasText(confidence.source?.title)||!hasText(confidence.source?.url))throw new Error('Published confidence example needs two labeled columns and a source.');
    const first=lookupConfidence(confidence.rows,confidence.rows?.[0]?.yes,confidence.rows?.[0]?.no);if(first.values.length!==confidence.labels.length)throw new Error('Confidence labels must match the values.');
    if(!hasText(config.scope)||!hasText(config.source?.title)||!hasText(config.source?.url))throw new Error('ImageNet viewer needs scope and source.');
    if(config.milestones&&(!Array.isArray(config.milestones)||!config.milestones.every(item=>item&&(Number.isInteger(item.year)||hasText(item.year))&&hasText(item.title)&&hasText(item.detail))))throw new Error('Milestones need a year and description.');
  }
  function asset(file){return window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;}
  function link(title,url,cls){const element=node('a',cls,title);element.href=url;element.target='_blank';element.rel='noopener noreferrer';return element;}
  function credit(item,compact=false){
    const box=node(compact?'details':'div','imagenet-credit');if(compact)box.append(node('summary','','사진 출처'));
    const line=node('p');line.append(document.createTextNode(item.credit.author+' · '),link(item.credit.license,item.credit.licenseUrl),document.createTextNode(' · '),link('원본',item.credit.sourceUrl));box.append(line);
    if(hasText(item.credit.changes))box.append(node('p','',item.credit.changes));return box;
  }
  function photo(item,cls,compactCredit=false){const figure=node('figure',cls),image=node('img');image.src=asset(item.file);image.alt=item.description;image.decoding='async';figure.append(image,node('figcaption','',item.title),credit(item,compactCredit));return figure;}

  window.AtlasVisuals.register('concept-experience',{
    mount(host,config){
      validate(config);
      const root=node('div','imagenet-experience'),listeners=[],stageButtons=[],conceptButtons=[],candidateButtons=[],decisionButtons=[],confidenceButtons=[];
      const graph=graphMap(config.nodes),candidateIds=config.candidates.map(item=>item.id),reviews={},selectedByConcept={};
      for(const item of config.concepts){reviews[item.id]={};selectedByConcept[item.id]=(config.candidates.find(candidate=>candidate.synsetIds.includes(item.synsetId))||config.candidates[0]).id;}
      let stage='meaning',conceptId=config.concepts[0].id,confidenceIndex=0,expanded=false,disposed=false;
      function listen(element,type,handler){element.addEventListener(type,handler);listeners.push(()=>element.removeEventListener(type,handler));}
      const stagesBar=node('div','imagenet-stage-controls');stagesBar.setAttribute('role','group');stagesBar.setAttribute('aria-label','의미와 시각 경험을 모으는 단계');
      const conceptBar=node('section','imagenet-concept-bar');conceptBar.append(node('span','imagenet-kicker','ONE WORD · TWO MEANINGS'),node('h4','','같은 crane도, 어느 뜻의 사진일까?'));
      const concepts=node('div','imagenet-concept-controls');concepts.setAttribute('role','group');concepts.setAttribute('aria-label','crane의 의미 선택');
      const definition=node('p','imagenet-definition');definition.setAttribute('role','status');definition.setAttribute('aria-live','polite');definition.setAttribute('aria-atomic','true');conceptBar.append(concepts,definition);

      const meaning=node('section','imagenet-meaning');meaning.setAttribute('aria-label','단어와 의미별 개념 경로');
      meaning.append(node('h4','','단어의 뜻을 나누어, 개념의 자리에 놓는다'),node('p','imagenet-intro','이미지를 모으기 전에 어떤 뜻의 사례를 찾는지 정한다. 같은 문자열도 서로 다른 개념에 연결될 수 있다.'));
      const zoomBar=node('div','imagenet-zoom-controls'),zoom=node('button','imagenet-zoom','계층 그림 확대');zoom.type='button';zoom.setAttribute('aria-pressed','false');zoomBar.append(zoom,node('span','','확대하면 좌우로 움직여 볼 수 있습니다.'));
      const tree=node('div','imagenet-tree'),pathText=node('p','imagenet-path-text');
      meaning.append(zoomBar,tree,pathText,node('h5','','이 의미로 묶은 서로 다른 모습'));
      const meaningPhotos=node('div','imagenet-meaning-photos');meaning.append(meaningPhotos,node('p','imagenet-scope','개념과 사례를 살펴보도록 별도로 고른 사진입니다. ImageNet에 수록된 원본 표본이라는 뜻은 아닙니다.'));

      const collect=node('section','imagenet-collect');collect.setAttribute('aria-label','내 예시 사진 검토');
      collect.append(node('h4','','찾아온 사진을, 이 뜻의 사례로 남겨도 될까?'),node('p','imagenet-intro','아래 후보를 하나씩 살펴보고 현재 고른 의미에 포함할지 표시해 보세요. 다른 의미의 사진이나 비슷해 보이는 다른 대상도 섞여 있습니다.'));
      const thumbnails=node('div','imagenet-candidates');thumbnails.setAttribute('role','group');thumbnails.setAttribute('aria-label','살펴볼 사진 후보');
      for(const item of config.candidates){
        const card=node('div','imagenet-candidate'),image=node('img');image.src=asset(item.file);image.alt=item.description;image.decoding='async';
        const button=node('button','',item.title+' 살펴보기');button.type='button';button.dataset.candidate=item.id;button.setAttribute('aria-pressed','false');listen(button,'click',()=>{selectedByConcept[conceptId]=item.id;updateReview();});candidateButtons.push(button);card.append(image,button);thumbnails.append(card);
      }
      const currentPhoto=node('div','imagenet-current-photo'),currentDescription=node('p','imagenet-candidate-description'),reviewControls=node('div','imagenet-review-controls');reviewControls.setAttribute('role','group');reviewControls.setAttribute('aria-label','현재 의미에 대한 내 판단');
      for(const [value,label] of Object.entries(DECISIONS)){const button=node('button','',label);button.type='button';button.dataset.decision=value;listen(button,'click',()=>{reviews[conceptId][selectedByConcept[conceptId]]=value;updateReview();});decisionButtons.push(button);reviewControls.append(button);}
      const reviewStatus=node('p','imagenet-review-status');reviewStatus.setAttribute('role','status');reviewStatus.setAttribute('aria-live','polite');reviewStatus.setAttribute('aria-atomic','true');
      const summary=node('div','imagenet-summary');summary.setAttribute('aria-label','현재 의미의 예시 검토 현황');
      const summaryValues={};for(const [key,label] of [['include','포함'],['exclude','제외'],['defer','보류'],['unreviewed','미검토']]){const box=node('div'),value=node('strong');box.append(node('span','',label),value);summaryValues[key]=value;summary.append(box);}
      const basket=node('div','imagenet-basket');
      collect.append(thumbnails,currentPhoto,currentDescription,reviewControls,reviewStatus,node('h5','','내 예시 검토 현황'),summary,node('h5','','내가 이 의미에 포함한 사진'),basket,node('p','imagenet-scope','포함·제외·보류는 이 화면에서 직접 표시한 판단입니다. 원래 ImageNet의 검수 결과나 분류 모형의 예측·정확도를 계산한 것이 아닙니다.'));

      const verify=node('section','imagenet-verify');verify.setAttribute('aria-label','원문 Fig.7의 별도 신뢰도 사례');
      verify.append(node('span','imagenet-kicker','PUBLISHED EXAMPLE · FIG. 7'),node('h4','',config.confidence.title),node('p','imagenet-intro',config.confidence.intro));
      const voteControls=node('div','imagenet-vote-controls');voteControls.setAttribute('role','group');voteControls.setAttribute('aria-label','원문 표에서 읽을 찬성·반대 응답 수');
      for(const [index,row] of config.confidence.rows.entries()){const button=node('button','','찬성 '+row.yes+' · 반대 '+row.no);button.type='button';button.dataset.row=String(index);listen(button,'click',()=>{confidenceIndex=index;updateConfidence();});confidenceButtons.push(button);voteControls.append(button);}
      const confidencePanel=node('div','imagenet-confidence-panel');confidencePanel.setAttribute('role','status');confidencePanel.setAttribute('aria-live','polite');confidencePanel.setAttribute('aria-atomic','true');
      const confidenceValues=[],confidenceFills=[];for(const [index,label] of config.confidence.labels.entries()){const box=node('div','imagenet-confidence-item'),value=node('strong'),bar=node('div','imagenet-confidence-bar'),fill=node('span');box.dataset.column=String(index);bar.append(fill);box.append(node('span','',label),value,bar,node('small','','원문에서 추정한 신뢰도'));confidenceValues.push(value);confidenceFills.push(fill);confidencePanel.append(box);}
      verify.append(voteControls,confidencePanel,node('p','imagenet-confidence-note','같은 응답 수에서도 범주에 따라 원문의 신뢰도 값이 다르다. 표에 없는 조합은 이 화면에서 새로 계산하지 않는다.'),node('p','imagenet-scope',config.confidence.scope),link(config.confidence.source.title+' ↗',config.confidence.source.url,'imagenet-source'));

      const stageText=node('p','imagenet-stage-text'),scope=node('p','imagenet-scope',config.scope);
      function updateStage(){if(disposed)return;root.dataset.stage=stage;for(const button of stageButtons){const selected=button.dataset.stage===stage;button.setAttribute('aria-pressed',String(selected));button.classList.toggle('active',selected);}conceptBar.hidden=stage==='verify';meaning.hidden=stage!=='meaning';collect.hidden=stage!=='collect';verify.hidden=stage!=='verify';stageText.textContent=config.stages.find(item=>item.id===stage).text;}
      function updateMeaning(){
        if(disposed)return;const selected=config.concepts.find(item=>item.id===conceptId);root.dataset.concept=conceptId;
        for(const button of conceptButtons){const active=button.dataset.concept===conceptId;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        definition.textContent=selected.label+' · '+selected.synsetId+' — '+selected.definition;
        tree.innerHTML=treeDrawing(config.nodes,config.concepts,conceptId);
        pathText.textContent='선택한 대표 경로: '+representativePath(graph,conceptId).map(id=>graph.get(id).kind==='elision'?'…':graph.get(id).label).join(' → ');
        const matching=config.candidates.filter(item=>item.synsetIds.includes(selected.synsetId));meaningPhotos.replaceChildren(...matching.map(item=>photo(item,'imagenet-example-photo',true)));
      }
      function updateReview(){
        if(disposed)return;const selected=config.candidates.find(item=>item.id===selectedByConcept[conceptId]),decision=reviews[conceptId][selected.id],meaningLabel=config.concepts.find(item=>item.id===conceptId).label;
        for(const button of candidateButtons){const active=button.dataset.candidate===selected.id;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        for(const button of decisionButtons){const active=button.dataset.decision===decision;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}
        currentPhoto.replaceChildren(photo(selected,'imagenet-large-photo'));currentDescription.textContent=selected.description;
        reviewStatus.textContent=decision?meaningLabel+'의 사례로 '+DECISIONS[decision]+' 표시한 후보입니다.':'아직 검토하지 않은 후보입니다. 현재 기준은 '+meaningLabel+'입니다.';
        const counts=summarizeReview(candidateIds,reviews[conceptId]);for(const key of Object.keys(summaryValues))summaryValues[key].textContent=String(counts[key]);
        const included=config.candidates.filter(item=>reviews[conceptId][item.id]==='include');basket.replaceChildren(...(included.length?included.map(item=>photo(item,'imagenet-basket-photo',true)):[node('p','imagenet-empty','포함으로 표시한 사진이 여기에 모입니다.')]));
      }
      function updateConfidence(){if(disposed)return;const selected=config.confidence.rows[confidenceIndex],row=lookupConfidence(config.confidence.rows,selected.yes,selected.no);for(const button of confidenceButtons){const active=Number(button.dataset.row)===confidenceIndex;button.setAttribute('aria-pressed',String(active));button.classList.toggle('active',active);}for(let index=0;index<row.values.length;index++){confidenceValues[index].textContent=row.values[index].toFixed(2);confidenceFills[index].style.width=(row.values[index]*100)+'%';}}
      for(const item of config.stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;listen(button,'click',()=>{stage=item.id;updateStage();});stageButtons.push(button);stagesBar.append(button);}
      for(const item of config.concepts){const button=node('button','',item.label);button.type='button';button.dataset.concept=item.id;listen(button,'click',()=>{conceptId=item.id;updateMeaning();updateReview();});conceptButtons.push(button);concepts.append(button);}
      listen(zoom,'click',()=>{expanded=!expanded;tree.dataset.expanded=String(expanded);zoom.textContent=expanded?'계층 그림 전체 보기':'계층 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){tree.tabIndex=0;tree.setAttribute('role','region');tree.setAttribute('aria-label','확대한 의미별 개념 경로');}else{tree.removeAttribute('tabindex');tree.removeAttribute('role');tree.removeAttribute('aria-label');}});
      root.append(stagesBar,conceptBar,meaning,collect,verify,stageText,scope,link(config.source.title+' ↗',config.source.url,'imagenet-source'));
      if(config.milestones?.length){const history=node('section','imagenet-milestones');history.append(node('h4','','데이터·평가·모형은 서로 다른 기록'));const list=node('ol');for(const item of config.milestones){const row=node('li');row.append(node('span','imagenet-year',String(item.year)),node('h5','',item.title),node('p','',item.detail));list.append(row);}history.append(list);root.append(history);}
      updateMeaning();updateReview();updateConfidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
