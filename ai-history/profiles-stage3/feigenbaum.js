/* The person profile reuses the existing 1977 knowledge-engineering record. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='expert-systems');
  if(!record?.content?.article)throw new Error('Feigenbaum profile requires the integrated expert-systems article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const person={
    id:'edward-feigenbaum',name:'Edward A. Feigenbaum',nameKo:'에드워드 파이겐바움',aliases:['Edward Albert Feigenbaum','Edward Feigenbaum','Ed Feigenbaum','에드워드 파이겐바움'],tags:['symbolic'],
    tagline:'전문가는 무엇을 알고, 그 지식을 어떻게 사용하는가',
    intro:'파이겐바움은 전문가가 문제를 풀 때 사용하는 지식을 프로그램 안에 어떻게 담을지 연구했다. 학위 연구에서는 사이먼의 지도로 인간이 정보를 구별하고 기억하며 연결하는 과정을 EPAM이라는 프로그램으로 표현했다. Stanford에서는 화학·의학의 문제를 다루며, 전문가가 아는 사실과 경험적 판단을 기호·규칙으로 나타내고 관측 자료와 연결하는 지식공학을 발전시켰다. 1977년 회고의 중심 생각은 전문 분야의 문제를 푸는 힘이 그 분야의 풍부한 지식에서 나온다는 것이었다. 지식을 모으고 고치며, 어떤 근거와 규칙으로 결론을 얻었는지 사용자가 이해하도록 설명하는 일까지 AI 설계의 대상으로 삼았다.',
    works:[{id:'expert-systems',eventId:'expert-systems',year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'연구 회고',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]
  };
  if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Feigenbaum profile: '+person.id);
  profiles.push(person);
})();
