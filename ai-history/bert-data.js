/* A research event, with its detailed content kept in entries/bert.js. */
(function(){
  'use strict';
  const events=window.ATLAS_MODERN_EVENTS;
  if(!Array.isArray(events)||events.some(event=>event.id==='bert'))throw new Error('BERT needs the modern catalog and a unique event id.');
  events.push({
    id:'bert',year:2018,dateLabel:'2018-10-11 · 첫 원고 / 2019-06 · NAACL 출판',track:'neural',
    title:'BERT · 양방향 문맥 표현',subtitle:'BERT · Pre-training of Deep Bidirectional Transformers for Language Understanding',
    people:['Jacob Devlin','Ming-Wei Chang','Kenton Lee','Kristina Toutanova'],
    summary:'2018년 처음 공개하고 2019년 NAACL에 출판한 양방향 언어 표현 사전학습 연구.',detail:'',question:'',visual:'attention',
    sources:[{title:'Devlin·Chang·Lee·Toutanova · NAACL 2019 원문',url:'https://aclanthology.org/N19-1423/'},{title:'2018-10-11 · arXiv 첫 공개 기록',url:'https://arxiv.org/abs/1810.04805'}],
    caveat:'',related:['word2vec','transformer','gpt1']
  });
})();
