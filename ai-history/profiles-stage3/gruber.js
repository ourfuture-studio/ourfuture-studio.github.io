/* Gruber's biography shares the existing 1993 ontology-sharing record. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='ontology-sharing');
  if(!record?.content?.article)throw new Error('Gruber profile requires the integrated ontology-sharing article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const person={
    id:'thomas-gruber',name:'Thomas R. Gruber',nameKo:'토머스 그루버',aliases:['Thomas Robert Gruber','Thomas Gruber','Tom Gruber','톰 그루버','토마스 그루버'],tags:['symbolic'],
    tagline:'다른 AI가 함께 쓸 지식, 그 뜻부터 명세하다',
    intro:'서로 다른 AI 프로그램이 지식을 주고받으려면 무엇을 함께 정해야 할까? 그루버는 프로그램이 사용하는 개념·관계·함수의 뜻을 명시해 지식을 공유하려 했다. UMass에서는 전문가의 판단 근거를 실행 가능한 전략 지식으로 옮기는 방법을 연구했고, Stanford KSL에서는 여러 시스템이 그 지식을 함께 쓰는 문제를 다뤘다. 1993년 Ontolingua 논문의 발상은 공통 어휘와 공리를 한 번 명세하고, 각 시스템의 지식 표현 언어로 옮기자는 것이었다. 프로그램들이 같은 대상을 무엇이라 부르고 어떤 관계를 허용하는지 합의한다면, 서로 다른 내부 구현을 사용하면서도 지식을 공유·재사용할 수 있다는 구상이었다.',
    works:[{id:'ontology-sharing',eventId:'ontology-sharing',year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'연구 논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]
  };
  if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Gruber profile: '+person.id);
  profiles.push(person);
})();
