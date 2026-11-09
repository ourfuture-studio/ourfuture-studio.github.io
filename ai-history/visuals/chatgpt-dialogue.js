/* Authored messages and explicit references show input scope, never model inference. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  function turnList(value){
    if(!Array.isArray(value)||!value.length||!Array.from(value).every(t=>t&&hasText(t.id)&&['user','assistant'].includes(t.role)&&hasText(t.text))||new Set(value.map(t=>t.id)).size!==value.length)throw new TypeError('Messages need distinct ids, user/assistant roles and nonempty text.');
    return value.map(({id,role,text})=>({id,role,text}));
  }
  function dialogueContext(options){
    if(!options||typeof options!=='object')throw new TypeError('Dialogue options are required.');
    const all=turnList(options.turns),mode=options.mode,last=all[all.length-1];
    if(last.role!=='user')throw new TypeError('The input dialogue must end with the current user message.');
    if(!['full','last'].includes(mode))throw new TypeError('Dialogue mode must be full or last.');
    const selected=mode==='full'?all:[last],included=new Set(selected.map(t=>t.id));
    return{turns:selected.map(t=>({...t})),includedTurnIds:selected.map(t=>t.id),omittedTurnIds:all.filter(t=>!included.has(t.id)).map(t=>t.id),lastUserId:last.id};
  }
  function rankedPairs(options){
    if(!options||typeof options!=='object')throw new TypeError('Preference options are required.');
    const {candidateIds,ranking}=options;
    if(!Array.isArray(candidateIds)||candidateIds.length<2||!Array.from(candidateIds).every(hasText)||new Set(candidateIds).size!==candidateIds.length)throw new TypeError('At least two distinct candidate ids are required.');
    if(!Array.isArray(ranking)||ranking.length!==candidateIds.length||new Set(ranking).size!==ranking.length||!Array.from(ranking).every(id=>candidateIds.includes(id)))throw new TypeError('The ranking must be a complete permutation of candidate ids.');
    const result=[];for(let i=0;i<ranking.length-1;i++)for(let j=i+1;j<ranking.length;j++)result.push({preferredId:ranking[i],otherId:ranking[j]});return result;
  }
  window.AtlasChatGPTModel=Object.freeze({dialogueContext,rankedPairs});

  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const sourced=item=>item&&hasText(item.title)&&hasText(item.url);
  function source(item){const el=node('a','chatgpt-source',item.title+' ↗');el.href=item.url;el.target='_blank';el.rel='noopener noreferrer';return el;}
  const roleName=role=>role==='user'?'사용자':'답변자';
  function validate(config){
    if(!config||!Array.isArray(config.stages)||!['context','demonstration','preference'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('Three dialogue stages are required.');
    const d=config.dialogue;
    if(!d||!hasText(d.preparedReply)||!hasText(d.scope)||!sourced(d.source))throw new TypeError('The dialogue needs a prepared reply, scope and source.');dialogueContext({turns:d.turns,mode:'full'});
    if(!Array.isArray(d.references)||!d.references.length||new Set(d.references.map(r=>r.id)).size!==d.references.length||!d.references.every(r=>r&&['id','label','mentionTurnId','mentionText','sourceTurnId','sourceText'].every(k=>hasText(r[k]))&&d.turns.some(t=>t.id===r.mentionTurnId&&t.text.includes(r.mentionText))&&d.turns.some(t=>t.id===r.sourceTurnId&&t.text.includes(r.sourceText))))throw new TypeError('References must identify exact authored message fragments.');
    const s=config.demonstration;
    if(!s||!['suggestionText','text','scope'].every(k=>hasText(s[k]))||!sourced(s.source)||!s.convertedExample||!hasText(s.convertedExample.instruction)||!hasText(s.convertedExample.response))throw new TypeError('Demonstrations need prepared dialogue, suggestion and conversion examples.');turnList(s.trainerDialogue);
    const p=config.preference;
    if(!p||!['targetMessageId','text','scope'].every(k=>hasText(p[k]))||!sourced(p.source)||!Array.isArray(p.candidates)||!p.candidates.every(c=>c&&['id','label','text'].every(k=>hasText(c[k]))))throw new TypeError('Preference needs a fixed response slot and prepared candidates.');
    dialogueContext({turns:p.contextTurns,mode:'full'});if(p.contextTurns.some(t=>t.id===p.targetMessageId))throw new TypeError('The response slot must be separate from its preceding context.');rankedPairs({candidateIds:p.candidates.map(c=>c.id),ranking:p.initialRanking});
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The viewer needs scope and source.');
  }
  window.AtlasVisuals.register('dialogue-feedback',{
    mount(host,config){
      validate(config);
      const root=node('div','chatgpt-dialogue'),listeners=[],stageButtons=[],modeButtons=[],referenceButtons=[],speakerButtons=[],candidateButtons=[],feedbackButtons=[],candidateRows=new Map();
      let stage='context',mode='full',referenceId=config.dialogue.references[0].id,replyOpen=false,speaker='assistant',suggestionOpen=false,ranking=config.preference.initialRanking.slice(),candidateId=config.preference.initialRanking[0],feedbackMode='reward',disposed=false;
      const listen=(el,type,fn)=>{el.addEventListener(type,fn);listeners.push(()=>el.removeEventListener(type,fn));};
      const group=(label,cls)=>{const el=node('div',cls||'chatgpt-controls');el.setAttribute('role','group');el.setAttribute('aria-label',label);return el;};
      const button=(label,parent,fn)=>{const el=node('button','',label);el.type='button';listen(el,'click',fn);parent.append(el);return el;};
      const mark=(buttons,key,value)=>{for(const el of buttons){const on=String(el.dataset[key])===String(value);el.setAttribute('aria-pressed',String(on));el.classList.toggle('active',on);}};
      const range=(label,text,item)=>{const el=node('details','chatgpt-details');el.append(node('summary','',label),node('p','chatgpt-scope',text),source(item));return el;};
      const stages=group('대화를 이어 답하도록 학습하는 세 연결','chatgpt-stage-controls'),stageText=node('p','chatgpt-stage-text'),context=node('section','chatgpt-context-panel'),demonstration=node('section','chatgpt-demonstration-panel'),preference=node('section','chatgpt-preference-panel');
      const modes=group('입력으로 제공하는 대화 범위'),references=group('앞선 대화에 연결할 조건 선택'),contextChat=node('div','chatgpt-messages'),contextStatus=node('p','chatgpt-selection-status'),referenceNote=node('p','chatgpt-reference-note');contextChat.setAttribute('role','group');contextChat.setAttribute('aria-label','현재 입력으로 보여 주는 대화');contextStatus.setAttribute('role','status');contextStatus.setAttribute('aria-live','polite');
      const replyControls=group('전체 대화 기준으로 준비한 후속 답변'),replyButton=button('준비한 답 보기',replyControls,()=>{replyOpen=!replyOpen;updateReply();}),reply=node('div','chatgpt-prepared-reply');replyButton.setAttribute('aria-expanded','false');
      context.append(node('h4','','마지막 말의 “그 조건”은, 어디에서 왔을까?'),modes,references,contextChat,contextStatus,referenceNote,node('p','chatgpt-legend','강조는 작성자가 연결해 둔 표현과 참조 부분입니다.'),replyControls,reply,range('이 대화와 참조 표시의 범위',config.dialogue.scope,config.dialogue.source));

      const speakers=group('대화 시범에서 사람이 쓰는 역할'),trainerChat=node('div','chatgpt-messages'),speakerStatus=node('p','chatgpt-selection-status');speakerStatus.setAttribute('role','status');speakerStatus.setAttribute('aria-live','polite');
      const suggestionDetails=node('details','chatgpt-details');suggestionDetails.append(node('summary','','답변을 쓰는 데 보조 제안을 활용하기'));const suggestionBody=node('div'),suggestionControls=group('직접 준비한 보조 제안'),suggestionButton=button('제안 보기',suggestionControls,()=>{suggestionOpen=!suggestionOpen;updateSuggestion();}),suggestion=node('div','chatgpt-suggestion');suggestionButton.setAttribute('aria-expanded','false');suggestionBody.append(suggestionControls,suggestion,node('p','chatgpt-note','제안을 그대로 정답으로 쓰는 동작이 아니라, 시범을 작성하는 사람의 보조 자료로 연결합니다.'));suggestionDetails.append(suggestionBody);
      const converted=node('details','chatgpt-details');converted.append(node('summary','','지시·응답 자료를 대화 형식으로 옮기기'));const conversion=node('div','chatgpt-conversion'),before=node('section'),after=node('section'),conversionArrow=node('div','chatgpt-conversion-arrow');conversionArrow.setAttribute('aria-hidden','true');conversionArrow.append(node('span','','→'));before.append(node('h5','','준비한 지시·응답 쌍'),node('p','chatgpt-conversion-label','지시'),node('p','',config.demonstration.convertedExample.instruction),node('p','chatgpt-conversion-label','응답'),node('p','',config.demonstration.convertedExample.response));after.append(node('h5','','사용자·답변자 메시지로 배치'));conversion.append(before,conversionArrow,after);converted.append(conversion);
      const trainingInputs=node('div','chatgpt-training-inputs');for(const [title,text] of [['사람이 쓴 대화 시범','사용자와 답변자 양쪽 역할'],['대화 형식으로 옮긴 자료','기존 지시·응답 자료와 혼합']]){const cell=node('div');cell.append(node('strong','',title),node('p','',text));trainingInputs.append(cell);}
      const sft=node('div','chatgpt-training-model');sft.append(node('strong','','대화에 응답하도록 SFT'),node('p','','시범의 답을 예측하며 응답모형 가중치를 조정'));
      demonstration.append(node('h4','','사람이 대화의 양쪽을 쓰며, 응답의 시범을 만들다'),node('p','chatgpt-prose',config.demonstration.text),speakers,trainerChat,speakerStatus,suggestionDetails,converted,trainingInputs,node('div','chatgpt-flow-arrow','↓'),sft,range('대화 시범과 자료 구성의 범위',config.demonstration.scope,config.demonstration.source));

      const fixedContext=node('details','chatgpt-details');fixedContext.append(node('summary','','이 답변 앞의 같은 대화 보기'));const preferenceChat=node('div','chatgpt-messages');fixedContext.append(preferenceChat);
      const target=node('div','chatgpt-response-slot'),targetLabel=node('strong');target.append(node('span','','비교할 답변자 응답 자리'),targetLabel,node('p','','아래 후보들은 같은 앞 대화에 이어질 답변입니다.'));
      const candidates=node('div','chatgpt-candidates'),rankingStatus=node('p','chatgpt-selection-status'),pairList=node('div','chatgpt-pairs');rankingStatus.setAttribute('role','status');rankingStatus.setAttribute('aria-live','polite');
      const feedbackControls=group('비교 자료를 사용하는 학습 단계'),feedbackRoles=node('div','chatgpt-feedback-roles'),feedbackStatus=node('p','chatgpt-selection-status');feedbackStatus.setAttribute('role','status');feedbackStatus.setAttribute('aria-live','polite');
      preference.append(node('h4','','대화 전체가 아니라, 같은 자리의 답변을 비교하다'),node('p','chatgpt-prose',config.preference.text),fixedContext,target,candidates,rankingStatus,pairList,node('h5','','선호 비교에서, 응답 정책을 조정하는 학습으로'),feedbackControls,feedbackRoles,feedbackStatus,node('p','chatgpt-note','여기서 바꾸는 것은 준비한 비교 자료와 강조 대상입니다.'),range('후보 비교와 정책 학습의 범위',config.preference.scope,config.preference.source));
      for(const candidate of config.preference.candidates){const row=node('section','chatgpt-candidate'),title=node('h5'),text=node('p','chatgpt-response',candidate.text),controls=group(candidate.label+' 후보의 선택과 순위 이동','chatgpt-candidate-controls'),select=button('이 후보 강조',controls,()=>{candidateId=candidate.id;updatePreference();}),up=button('↑ 올리기',controls,()=>move(candidate.id,-1)),down=button('↓ 내리기',controls,()=>move(candidate.id,1));select.setAttribute('aria-label',candidate.label+' 응답 자리 강조');select.dataset.candidate=candidate.id;candidateButtons.push(select);up.setAttribute('aria-label',candidate.label+' 순위 올리기');down.setAttribute('aria-label',candidate.label+' 순위 내리기');row.append(title,text,controls);candidateRows.set(candidate.id,{row,title,up,down});}

      function highlighted(text,fragment,kind){const p=node('p');if(!fragment){p.textContent=text;return p;}const at=text.indexOf(fragment);if(at<0){p.textContent=text;return p;}p.append(document.createTextNode(text.slice(0,at)),node('mark','chatgpt-highlight is-'+kind,fragment),document.createTextNode(text.slice(at+fragment.length)));return p;}
      function bubble(turn,reference,selectedSpeaker){const el=node('section','chatgpt-bubble');el.dataset.role=turn.role;el.dataset.message=turn.id;if(selectedSpeaker)el.dataset.selected=String(turn.role===selectedSpeaker);el.append(node('span','chatgpt-role',roleName(turn.role)));const mention=reference&&turn.id===reference.mentionTurnId,origin=reference&&turn.id===reference.sourceTurnId;el.append(highlighted(turn.text,mention?reference.mentionText:origin?reference.sourceText:null,mention?'mention':'source'));return el;}
      function updateContext(){
        if(disposed)return;const d=config.dialogue,result=dialogueContext({turns:d.turns,mode}),reference=d.references.find(r=>r.id===referenceId),sourcePresent=result.includedTurnIds.includes(reference.sourceTurnId);root.dataset.mode=mode;root.dataset.reference=referenceId;root.dataset.referencePresent=String(sourcePresent);mark(modeButtons,'mode',mode);mark(referenceButtons,'reference',referenceId);contextChat.replaceChildren(...result.turns.map(turn=>bubble(turn,reference)));contextStatus.textContent=(mode==='full'?'전체 대화':'마지막 질문만')+' · 입력 메시지 '+result.turns.length+'개 · '+reference.label;
        referenceNote.textContent=sourcePresent?'선택한 조건의 참조 부분이 이 입력 대화 안에 있습니다.':'이 입력에서는 선택한 조건의 앞선 참조 부분이 빠집니다.';updateReply();
      }
      function updateReply(){if(disposed)return;root.dataset.replyOpen=String(replyOpen);replyButton.textContent=replyOpen?'준비한 답 접기':'준비한 답 보기';replyButton.setAttribute('aria-expanded',String(replyOpen));reply.hidden=!replyOpen;reply.replaceChildren(node('span','','전체 대화를 바탕으로 직접 준비한 답'),node('p','',config.dialogue.preparedReply));}
      function updateSpeaker(){if(disposed)return;root.dataset.speaker=speaker;mark(speakerButtons,'speaker',speaker);trainerChat.replaceChildren(...config.demonstration.trainerDialogue.map(turn=>bubble(turn,null,speaker)));speakerStatus.textContent='강조한 시범 역할 · '+roleName(speaker)+' · 두 역할의 문장은 사람이 작성하는 시범';}
      function updateSuggestion(){if(disposed)return;root.dataset.suggestionOpen=String(suggestionOpen);suggestionButton.textContent=suggestionOpen?'제안 접기':'제안 보기';suggestionButton.setAttribute('aria-expanded',String(suggestionOpen));suggestion.hidden=!suggestionOpen;suggestion.replaceChildren(node('span','','보조 제안 자리를 보여 주는 준비 문장'),node('p','',config.demonstration.suggestionText));}
      function move(id,direction){if(disposed)return;const from=ranking.indexOf(id),to=from+direction;if(to<0||to>=ranking.length)return;const next=ranking.slice();[next[from],next[to]]=[next[to],next[from]];ranking=next;updatePreference();}
      function updatePreference(){
        if(disposed)return;const p=config.preference,pairs=rankedPairs({candidateIds:p.candidates.map(c=>c.id),ranking});root.dataset.ranking=ranking.join(',');root.dataset.candidate=candidateId;root.dataset.feedbackTarget=p.targetMessageId;mark(candidateButtons,'candidate',candidateId);targetLabel.textContent='지금 강조한 후보 · '+p.candidates.find(c=>c.id===candidateId).label;
        for(const [i,id] of ranking.entries()){const item=candidateRows.get(id),candidate=p.candidates.find(c=>c.id===id);item.title.textContent=(i+1)+'위 · '+candidate.label;item.row.dataset.selected=String(id===candidateId);item.up.disabled=i===0;item.down.disabled=i===ranking.length-1;}candidates.replaceChildren(...ranking.map(id=>candidateRows.get(id).row));rankingStatus.textContent='준비한 선호 순서 · '+ranking.map(id=>p.candidates.find(c=>c.id===id).label).join(' > ');pairList.replaceChildren(...pairs.map(pair=>{const el=node('span','chatgpt-pair',p.candidates.find(c=>c.id===pair.preferredId).label+' ≻ '+p.candidates.find(c=>c.id===pair.otherId).label);el.dataset.selected=String(pair.preferredId===candidateId||pair.otherId===candidateId);return el;}));
      }
      function updateFeedback(){
        if(disposed)return;root.dataset.feedbackMode=feedbackMode;mark(feedbackButtons,'feedback',feedbackMode);const rewardTraining=feedbackMode==='reward';feedbackRoles.replaceChildren();for(const [title,state,text] of [['보상모형',rewardTraining?'학습 대상':'고정',rewardTraining?'비교에서 선호한 답을 예측하도록 학습':'응답 후보를 평가하는 기준으로 사용'],['응답모형',rewardTraining?'이 단계의 갱신 대상 아님':'학습 대상',rewardTraining?'비교할 답변 후보를 제공':'보상 피드백으로 응답 정책을 조정']]){const cell=node('div');cell.dataset.learning=String(state==='학습 대상');cell.append(node('span','',state),node('strong','',title),node('p','',text));feedbackRoles.append(cell);}feedbackStatus.textContent=rewardTraining?'후보의 선호 비교 → 보상모형 학습':'고정한 보상모형 → 응답 정책의 PPO 학습';
      }
      function updateStage(){if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;context.hidden=stage!=='context';demonstration.hidden=stage!=='demonstration';preference.hidden=stage!=='preference';}
      for(const item of config.stages){const el=button(item.label,stages,()=>{stage=item.id;updateStage();});el.dataset.stage=item.id;stageButtons.push(el);}
      for(const [id,label] of [['full','전체 대화를 입력'],['last','마지막 질문만 입력']]){const el=button(label,modes,()=>{mode=id;replyOpen=false;updateContext();});el.dataset.mode=id;modeButtons.push(el);}
      for(const reference of config.dialogue.references){const el=button(reference.label,references,()=>{referenceId=reference.id;replyOpen=false;updateContext();});el.dataset.reference=reference.id;referenceButtons.push(el);}
      for(const [id,label] of [['user','사용자 역할 시범'],['assistant','답변자 역할 시범']]){const el=button(label,speakers,()=>{speaker=id;updateSpeaker();});el.dataset.speaker=id;speakerButtons.push(el);}
      for(const [id,label] of [['reward','비교 자료로 보상모형 학습'],['policy','보상으로 응답모형 학습']]){const el=button(label,feedbackControls,()=>{feedbackMode=id;updateFeedback();});el.dataset.feedback=id;feedbackButtons.push(el);}
      after.append(bubble({id:'converted-user',role:'user',text:config.demonstration.convertedExample.instruction}),bubble({id:'converted-assistant',role:'assistant',text:config.demonstration.convertedExample.response}));preferenceChat.append(...config.preference.contextTurns.map(turn=>bubble(turn)));
      root.append(stages,stageText,context,demonstration,preference,range('2022년 공개자료와 이 화면의 범위',config.scope,config.source));updateContext();updateSpeaker();updateSuggestion();updatePreference();updateFeedback();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
