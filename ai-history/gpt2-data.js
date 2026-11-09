/* One event; its detailed article is shared with the participating profiles. */
(function(){
  'use strict';
  const events=window.ATLAS_MODERN_EVENTS;
  if(!Array.isArray(events)||events.some(event=>event.id==='gpt2'))throw new Error('GPT-2 needs the modern catalog and a unique event id.');
  const event={
    id:'gpt2',year:2019,dateLabel:'2019-02-14 · 기술 보고서·공식 발표',track:'neural',
    title:'GPT-2 · 추가 미세조정 없는 과제 전이',subtitle:'GPT-2 · Language Models are Unsupervised Multitask Learners',
    people:['Alec Radford','Jeffrey Wu','Rewon Child','David Luan','Dario Amodei','Ilya Sutskever'],
    authorNote:'Alec Radford · Jeffrey Wu · Rewon Child · David Luan · Dario Amodei · Ilya Sutskever. 원문의 *는 Radford·Wu, **는 Amodei·Sutskever 각각의 동등 기여를 표시한다.',
    summary:'2019년, 과제별 파라미터·구조 변경 없이 언어모형을 여러 과제에 적용한 연구.',detail:'',question:'',visual:'attention',
    sources:[{title:'Radford 외 · 2019 GPT-2 공식 보고서',url:'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf'}],
    caveat:'',related:['gpt1','bert','gpt3']
  };
  events.push(event);
  for(const id of ['dario-amodei','ilya-sutskever']){
    const person=(window.ATLAS_MODERN_PROFILES||[]).find(profile=>profile.id===id);
    if(!person||person.works.some(work=>(work.eventId||work.id)==='gpt2'))throw new Error('GPT-2 needs one shared work for '+id);
    person.works.push({id:id+'-gpt2-2019',eventId:event.id,year:event.year,dateLabel:event.dateLabel,title:event.subtitle,summary:event.summary,type:'기술 보고서',track:event.track,people:event.people.slice(),authorNote:event.authorNote,sources:event.sources.map(source=>({...source})),caveat:''});
    person.roles.push('GPT-2 공동저자');
  }
})();
