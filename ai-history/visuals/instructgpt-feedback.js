/* Fixed authored responses, scores and categorical distributions expose objectives only. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const finite=value=>{if(!Number.isFinite(value))throw new RangeError('The chosen values overflow the calculation.');return value;};
  function rankingLoss(options){
    if(!options||typeof options!=='object')throw new TypeError('Ranking options are required.');
    const {candidates,ranking}=options;
    if(!Array.isArray(candidates)||candidates.length<2||!Array.from(candidates).every(c=>c&&hasText(c.id)&&Number.isFinite(c.score))||new Set(candidates.map(c=>c.id)).size!==candidates.length)throw new TypeError('A comparison needs at least two distinct candidate ids and finite scores.');
    if(!Array.isArray(ranking)||ranking.length!==candidates.length||new Set(ranking).size!==ranking.length||!Array.from(ranking).every(id=>candidates.some(c=>c.id===id)))throw new TypeError('The ranking must be a complete permutation of candidate ids.');
    const scoreById=new Map(candidates.map(c=>[c.id,c.score])),gradients=new Map(candidates.map(c=>[c.id,0])),pairs=[],count=candidates.length*(candidates.length-1)/2;
    let meanNll=0;
    for(let i=0;i<ranking.length-1;i++)for(let j=i+1;j<ranking.length;j++){
      const winnerId=ranking[i],loserId=ranking[j],margin=finite(scoreById.get(winnerId)-scoreById.get(loserId)),exp=Math.exp(-Math.abs(margin)),probability=margin>=0?1/(1+exp):exp/(1+exp),nll=finite(Math.max(0,-margin)+Math.log1p(exp)),winnerGradient=(margin>=0?-exp/(1+exp):-1/(1+exp))/count;
      pairs.push({winnerId,loserId,margin,probability,nll});meanNll=finite(meanNll+nll/count);gradients.set(winnerId,gradients.get(winnerId)+winnerGradient);gradients.set(loserId,gradients.get(loserId)-winnerGradient);
    }
    return{pairs,meanNll,gradScores:candidates.map(c=>({id:c.id,gradient:gradients.get(c.id)}))};
  }
  function distribution(values,name,strictPositive){
    if(!Array.isArray(values)||values.length<2||!Array.from(values).every(p=>Number.isFinite(p)&&p<=1&&(strictPositive?p>0:p>=0))||Math.abs(values.reduce((sum,p)=>sum+p,0)-1)>1e-9)throw new TypeError(name+' must be a normalized finite probability vector.');
    return values.slice();
  }
  function policyObjective(options){
    if(!options||typeof options!=='object')throw new TypeError('Policy options are required.');
    const policy=distribution(options.policy,'policy',false),reference=distribution(options.reference,'reference',true),rewards=options.rewards,beta=options.beta;
    if(reference.length!==policy.length||!Array.isArray(rewards)||rewards.length!==policy.length||!Array.from(rewards).every(Number.isFinite))throw new TypeError('Policy, reference and finite reward rows must match.');
    if(!Number.isFinite(beta)||beta<0)throw new RangeError('beta must be finite and nonnegative.');
    let expectedReward=0,kl=0;
    const terms=policy.map((probability,index)=>{const referenceProbability=reference[index],reward=rewards[index],logRatio=probability===0?null:Math.log(probability)-Math.log(referenceProbability),weightedReward=finite(probability*reward),klTerm=probability===0?0:finite(probability*logRatio);expectedReward=finite(expectedReward+weightedReward);kl=finite(kl+klTerm);return{index,probability,referenceProbability,reward,logRatio,weightedReward,klTerm};});
    const penalty=finite(beta*kl),objective=finite(expectedReward-penalty);
    return{expectedReward,kl,penalty,objective,terms};
  }
  window.AtlasInstructGPTModel=Object.freeze({rankingLoss,policyObjective});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const number=value=>value===null?'—':Math.abs(value)<.00005?'0.0000':value.toFixed(4);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function link(title,url,cls){const el=node('a',cls,title);el.href=url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const source=item=>link(item.title+' ↗',item.url,'instructgpt-source');
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['sft','reward','policy'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text)))||!hasText(config.request))throw new TypeError('Three stages and one shared request are required.');
    for(const key of ['sft','reward','policy'])if(!config[key]||!hasText(config[key].text)||!hasText(config[key].scope)||!sourced(config[key].source))throw new TypeError('Every stage needs text, scope and source.');
    if(!hasText(config.sft.demonstration))throw new TypeError('SFT needs a prepared human demonstration.');
    const r=config.reward;rankingLoss({candidates:r.candidates,ranking:r.initialRanking});if(!r.candidates.every(c=>hasText(c.label)&&hasText(c.text)))throw new TypeError('Every prepared answer needs its label and text.');
    const p=config.policy;if(!Array.isArray(p.policies)||!p.policies.length||new Set(p.policies.map(x=>x.id)).size!==p.policies.length||!p.policies.every(x=>x&&hasText(x.id)&&hasText(x.label))||!p.policies.some(x=>x.id===p.initialPolicy)||!Array.isArray(p.betaValues)||!p.betaValues.length||new Set(p.betaValues).size!==p.betaValues.length||!p.betaValues.includes(p.initialBeta))throw new TypeError('The toy objective needs prepared policy distributions and coefficients.');
    for(const policy of p.policies)for(const beta of p.betaValues)policyObjective({policy:policy.probabilities,reference:p.reference,rewards:r.candidates.map(c=>c.score),beta});
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(k=>hasText(e[k]))&&/^[-A-Za-z0-9_.]+\.(?:png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original figures need local images and attribution.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs a scope and source.');
  }
  window.AtlasVisuals.register('human-feedback',{
    mount(host,config){
      validate(config);
      const root=node('div','instructgpt-feedback'),listeners=[],stageButtons=[],policyButtons=[],betaButtons=[],evidenceButtons=[],candidateRows=new Map();
      let stage='sft',ranking=config.reward.initialRanking.slice(),policyId=config.policy.initialPolicy,beta=config.policy.initialBeta,evidenceId=config.evidence[0].id,expanded=false,disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'instructgpt-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const on=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(on));el.classList.toggle('active',on);}};
      const stages=group('사람 피드백으로 지시를 배우는 세 단계','instructgpt-stage-controls'),stageText=node('p','instructgpt-stage-text'),request=node('div','instructgpt-request'),sft=node('section','instructgpt-sft-panel'),reward=node('section','instructgpt-reward-panel'),policy=node('section','instructgpt-policy-panel');request.append(node('span','','세 단계에서 같은 요청'),node('p','',config.request));
      const demonstration=node('div','instructgpt-demonstration');demonstration.append(node('span','','사람이 쓴 시범 답변'),node('p','',config.sft.demonstration));
      const sftFlow=node('div','instructgpt-flow');for(const [title,text] of [['요청과 시범 문장','사람이 원하는 답변의 형태를 먼저 작성'],['같은 어휘에서 시범을 예측','시범의 다음 토큰 확률을 높이는 지도 학습'],['시범으로 조정한 정책','기존 언어모형의 가중치 θ를 조정']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));sftFlow.append(cell);}
      const sftRange=node('details','instructgpt-details');sftRange.append(node('summary','','시범과 SFT의 범위'),node('p','instructgpt-scope',config.sft.scope),source(config.sft.source));sft.append(node('h4','','좋은 답변을, 사람이 먼저 써서 보여 주다'),node('p','instructgpt-prose',config.sft.text),demonstration,sftFlow,node('p','instructgpt-param-state','원문 학습의 역할 · 정책 θ 갱신'),sftRange);

      const rankingList=node('div','instructgpt-ranking-list'),rankingStatus=node('p','instructgpt-selection-status');rankingStatus.setAttribute('role','status');rankingStatus.setAttribute('aria-live','polite');const rankingDetails=node('details','instructgpt-details'),rankingNumbers=node('div');rankingDetails.append(node('summary','','고정한 점수에서, 이 순위의 손실 계산'),node('p','instructgpt-note','사람은 답변의 순서를 비교합니다. 아래 스칼라 점수는 계산을 보이도록 직접 정해 고정했습니다. 순서를 바꾸면 이 점수에 대한 손실과 국소 미분만 달라집니다.'),rankingNumbers);
      const rewardRange=node('details','instructgpt-details');rewardRange.append(node('summary','','비교와 보상모형의 범위'),node('p','instructgpt-scope',config.reward.scope),source(config.reward.source));
      reward.append(node('h4','','답을 비교한 순서에서, 선호를 예측하는 모형을 배우다'),node('p','instructgpt-prose',config.reward.text),node('p','instructgpt-note','위아래 버튼으로 선호 순위를 바꿔 보세요. 점수는 그대로 두고, 바뀐 순위가 어떤 학습 목표를 주는지 비교합니다.'),rankingList,rankingStatus,node('p','instructgpt-param-state','원문 학습의 역할 · 비교 자료로 보상모형 φ 갱신'),rankingDetails,rewardRange);
      for(const candidate of config.reward.candidates){const row=node('section','instructgpt-candidate'),title=node('h5'),text=node('p','instructgpt-response',candidate.text),controls=group(candidate.label+'의 선호 순위 이동','instructgpt-rank-controls'),up=button('↑ 올리기',controls,()=>move(candidate.id,-1)),down=button('↓ 내리기',controls,()=>move(candidate.id,1));up.setAttribute('aria-label',candidate.label+' 순위 올리기');down.setAttribute('aria-label',candidate.label+' 순위 내리기');row.append(title,text,controls);candidateRows.set(candidate.id,{row,title,up,down});}

      const roles=node('div','instructgpt-roles');for(const [title,text,fixed] of [['정책 θ','보상이 높은 답을 더 선택하도록 조정',false],['보상모형 φ','답변에 점수를 주는 모형은 동결',true],['SFT 참조 정책','현재 정책과의 KL을 비교할 기준으로 고정',true]]){const cell=node('div');cell.dataset.fixed=String(fixed);cell.append(node('span','',fixed?'고정':'갱신 대상'),node('strong','',title),node('p','',text));roles.append(cell);}
      const policyControls=group('직접 정한 답변 선택 분포'),betaControls=group('SFT 참조와의 KL 벌점 계수'),policyStatus=node('p','instructgpt-selection-status'),distributions=node('div','instructgpt-distributions'),objectiveValues=node('div','instructgpt-objective-values');policyStatus.setAttribute('role','status');policyStatus.setAttribute('aria-live','polite');
      const policyDetails=node('details','instructgpt-details'),policyNumbers=node('div');policyDetails.append(node('summary','','작은 선택지 목표와, 원문 PPO·PPO-ptx 구분'),node('p','instructgpt-formula','작은 선택지의 목표 = Σ p(답) × 고정 보상 − β KL(p || SFT 참조)\nKL(p || q) = Σ p(답) log[p(답) / q(답)]'),policyNumbers,node('p','instructgpt-note','이 계산은 정해 둔 답변 선택지 전체에서 구한 정확한 KL과 평균 보상입니다. 실제 토큰 생성·PPO rollout·value 모형·가중치 갱신을 실행하지 않습니다.'),node('p','instructgpt-note','β를 바꾸면 목표의 가중치도 달라집니다. 서로 다른 β의 총목적값을 모형 성능의 순위로 비교하지 않습니다.'),node('p','instructgpt-note','PPO clipping은 rollout을 모은 이전 정책 대비 확률비를 대리 목적식에서 잘라 사용하는 최적화 장치입니다. 실제 확률비를 그 범위 안으로 강제 고정한다는 뜻은 아닙니다. 여기의 고정 SFT 참조와 비교하는 KL 항과는 다른 역할입니다. 원문의 PPO-ptx는 여기에 사전학습 텍스트의 언어모형 목표도 섞으며, 아래 작은 계산에는 그 항을 넣지 않았습니다.'));
      const policyRange=node('details','instructgpt-details');policyRange.append(node('summary','','정책 학습 보기의 범위'),node('p','instructgpt-scope',config.policy.scope),source(config.policy.source));
      policy.append(node('h4','','사람 선호를 보상으로 쓰되, 원래 답변 방식과의 거리도 살피다'),node('p','instructgpt-prose',config.policy.text),roles,node('h5','','직접 정한 분포로 목표만 비교'),policyControls,betaControls,policyStatus,distributions,objectiveValues,node('p','instructgpt-note','분포 버튼은 비교할 숫자를 고르는 조작입니다. 방금의 사람 순위로 보상 점수나 정책을 즉시 학습한 결과를 만들지 않습니다.'),policyDetails,policyRange);

      const evidence=node('details','instructgpt-details instructgpt-evidence');evidence.append(node('summary','','원논문의 세 단계와 결과 보기'));const evidenceBody=node('div'),evidenceControls=group('InstructGPT 원문 자료 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','instructgpt-prose'),evidenceScope=node('p','instructgpt-scope'),evidenceSource=node('div'),evidenceCredit=node('p','instructgpt-credit'),zoom=node('button','instructgpt-zoom','원문 자료 확대'),pane=node('div','instructgpt-evidence-viewport'),image=node('img');zoom.type='button';zoom.setAttribute('aria-pressed','false');image.decoding='async';pane.append(image);evidenceBody.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','instructgpt-note','확대하면 자료 안에서 좌우로 움직여 원문 라벨을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);evidence.append(evidenceBody);

      function table(headers,rows,label,width){const viewport=node('div','instructgpt-table-viewport');viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label',label);const el=node('table'),thead=node('thead'),tr=node('tr');for(const value of headers)tr.append(node('th','',value));thead.append(tr);el.append(thead);const body=node('tbody');for(const values of rows){const line=node('tr');for(const value of values)line.append(node('td','',String(value)));body.append(line);}el.append(body);if(width)el.style.minWidth=width+'px';viewport.append(el);return viewport;}
      function move(id,direction){if(disposed)return;const from=ranking.indexOf(id),to=from+direction;if(to<0||to>=ranking.length)return;const next=ranking.slice();[next[from],next[to]]=[next[to],next[from]];ranking=next;updateRanking();}
      function updateRanking(){
        if(disposed)return;const candidates=config.reward.candidates,result=rankingLoss({candidates,ranking});root.dataset.ranking=ranking.join(',');
        for(const [position,id] of ranking.entries()){const item=candidateRows.get(id),candidate=candidates.find(c=>c.id===id);item.title.textContent=(position+1)+'위 · '+candidate.label;item.up.disabled=position===0;item.down.disabled=position===ranking.length-1;item.row.dataset.rank=String(position+1);}rankingList.replaceChildren(...ranking.map(id=>candidateRows.get(id).row));rankingStatus.textContent='현재 순위 · '+ranking.map(id=>candidates.find(c=>c.id===id).label).join(' > ')+' · 비교쌍 '+result.pairs.length+'개';
        rankingNumbers.replaceChildren(node('p','instructgpt-number-summary','이 고정 점수에서의 평균 비교 NLL · '+number(result.meanNll)),table(['답변','직접 정한 고정 점수','∂평균 NLL / ∂점수'],candidates.map(c=>[c.label,number(c.score),number(result.gradScores.find(g=>g.id===c.id).gradient)]),'고정 보상 점수와 국소 미분',530),table(['선호한 답 > 다른 답','점수 차','비교 모형의 σ(차이)','쌍 NLL'],result.pairs.map(pair=>[pair.winnerId+' > '+pair.loserId,number(pair.margin),number(pair.probability),number(pair.nll)]),'순위의 모든 비교쌍과 손실',620),node('p','instructgpt-note','σ(점수 차)는 이 비교 모형에서 사용하는 확률입니다. 답변이 사실일 확률이나, 사람의 순위가 진실이라는 확률이 아닙니다. 숫자 미분은 점수에서의 국소 학습 신호입니다.'));
      }
      function updatePolicy(){
        if(disposed)return;const selected=config.policy.policies.find(p=>p.id===policyId),candidates=config.reward.candidates,result=policyObjective({policy:selected.probabilities,reference:config.policy.reference,rewards:candidates.map(c=>c.score),beta});root.dataset.policy=policyId;root.dataset.beta=String(beta);mark(policyButtons,'policy',policyId);mark(betaButtons,'beta',beta);policyStatus.textContent='비교 분포 · '+selected.label+' · β = '+beta+' · 보상 점수와 SFT 참조는 고정';
        distributions.replaceChildren(...candidates.map((candidate,i)=>{const cell=node('div','instructgpt-probability-card'),track=node('div','instructgpt-track'),fill=node('span');fill.style.width=(selected.probabilities[i]*100)+'%';track.setAttribute('aria-hidden','true');track.append(fill);cell.append(node('strong','',candidate.label),node('span','','선택 분포 '+(selected.probabilities[i]*100).toFixed(1)+'%'),track,node('small','','고정 SFT 참조 '+(config.policy.reference[i]*100).toFixed(1)+'% · 고정 보상 '+number(candidate.score)));return cell;}));
        objectiveValues.replaceChildren();for(const [label,value] of [['평균 고정 보상',result.expectedReward],['KL(p || SFT 참조)',result.kl],['β × KL',result.penalty],['보상 − β × KL',result.objective]]){const cell=node('div');cell.append(node('span','',label),node('strong','',number(value)));objectiveValues.append(cell);}
        policyNumbers.replaceChildren(table(['답변','p','고정 q','고정 r','log(p/q)','p·r','p·log(p/q)'],result.terms.map(term=>[candidates[term.index].label,number(term.probability),number(term.referenceProbability),number(term.reward),number(term.logRatio),number(term.weightedReward),number(term.klTerm)]),'세 선택지의 보상과 KL 항',850));
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;window.AtlasPublicAssets.setSource(image,item.file);image.alt=item.caption;evidenceSource.replaceChildren(source(item.source));evidenceCredit.replaceChildren(link(item.credit.title,item.credit.url),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);zoom.textContent=expanded?'원문 자료 전체 보기':'원문 자료 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 InstructGPT 원문 자료');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;sft.hidden=stage!=='sft';reward.hidden=stage!=='reward';policy.hidden=stage!=='policy';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const p of config.policy.policies){const el=button(p.label,policyControls,()=>{policyId=p.id;updatePolicy();});el.dataset.policy=p.id;policyButtons.push(el);}
      for(const value of config.policy.betaValues){const el=button('β = '+value,betaControls,()=>{beta=value;updatePolicy();});el.dataset.beta=String(value);betaButtons.push(el);}
      for(const item of config.evidence){const el=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});el.dataset.evidence=item.id;evidenceButtons.push(el);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});
      const range=node('details','instructgpt-details');range.append(node('summary','','이 카드의 구성과 범위'),node('p','instructgpt-scope',config.scope),source(config.source));root.append(stages,stageText,request,sft,reward,policy,evidence,range);updateRanking();updatePolicy();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
