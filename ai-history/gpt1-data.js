/* One new research record. Detailed prose lives only in entries/gpt1.js. */
(function(){
  'use strict';
  const events=window.ATLAS_MODERN_EVENTS;
  if(!Array.isArray(events)||events.some(event=>event.id==='gpt1'))throw new Error('GPT-1 needs the modern catalog and a unique event id.');
  const event={
    id:'gpt1',year:2018,dateLabel:'2018-06-11 · 연구 원고·공식 발표',track:'neural',
    title:'GPT-1 · Generative Pre-Training',subtitle:'GPT-1 · Improving Language Understanding by Generative Pre-Training',
    people:['Alec Radford','Karthik Narasimhan','Tim Salimans','Ilya Sutskever'],
    summary:'2018년 생성적 사전학습과 과제별 지도 미세조정 연구.',detail:'',question:'',visual:'attention',
    sources:[{title:'Radford·Narasimhan·Salimans·Sutskever · 2018 공식 원고',url:'https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf'}],
    caveat:'',related:['transformer','word2vec','gpt3']
  };
  events.push(event);
  const person=(window.ATLAS_MODERN_PROFILES||[]).find(profile=>profile.id==='ilya-sutskever');
  if(!person||person.works.some(work=>(work.eventId||work.id)==='gpt1'))throw new Error('GPT-1 needs one shared Ilya work record.');
  person.works.push({id:'ilya-sutskever-gpt1-2018',eventId:event.id,year:event.year,dateLabel:event.dateLabel,title:event.subtitle,summary:event.summary,type:'연구 원고',track:event.track,people:event.people.slice(),sources:event.sources.map(source=>({...source})),caveat:''});
  person.roles.push('GPT-1 공동저자');
})();
