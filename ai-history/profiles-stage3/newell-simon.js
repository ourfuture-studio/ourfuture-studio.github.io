/* Separate biographies share the existing Logic Theorist research record. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='logic-theorist');
  if(!record?.content?.article)throw new Error('Newell and Simon profiles require the integrated Logic Theorist article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const work=()=>({id:'logic-theorist',eventId:'logic-theorist',year:record.year,dateLabel:record.dateLabel,title:record.subtitle||'Logic Theory Machine',summary:record.summary,type:'공동 논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const rows=[
    {
      id:'allen-newell',name:'Allen Newell',nameKo:'앨런 뉴얼',aliases:['앨런 뉴웰','알렌 뉴얼'],tags:['symbolic'],
      tagline:'답을 모르면서도, 다음에 생각할 길을 고르는 기계',
      intro:'뉴얼은 사람이 문제를 풀 때 어떤 중간 생각을 만들고 어느 길부터 살피는지 연구했다. 물리학을 공부한 뒤 RAND와 Carnegie에서 사이먼·J. C. Shaw와 협력하며, 컴퓨터를 수만 계산하는 장치에서 기호와 관계를 다루는 장치로 보았다. Logic Theorist에서는 목표와 알려진 식을 기억하고, 유망한 후보를 골라 규칙으로 변환하는 과정을 명세했다. 지능을 이미 정해진 답의 목록보다 문제를 푸는 표현·탐색·선택의 과정에서 연구하려는 발상이었다. 1956년 명세의 저자는 뉴얼·사이먼이며, 쇼의 공동 작업과 컴퓨터 실현 공헌은 원문 각주에 명시된다. 이 공동연구는 이후 GPS 등의 문제 해결 연구로 이어졌다.',
      works:[work()]
    },
    {
      id:'herbert-simon',name:'Herbert A. Simon',nameKo:'허버트 사이먼',aliases:['Herbert Simon','Herbert Alexander Simon','허버트 A. 사이먼'],tags:['symbolic'],
      tagline:'인간의 판단을, 조사할 수 있는 문제 해결 과정으로',
      intro:'사이먼은 모든 정보를 모으고 모든 가능성을 계산하기 어려운 상황에서 사람이 어떻게 결정하는지 물었다. 정치학에서 출발해 행정·경제·심리학을 연구했고, 뉴얼·J. C. Shaw와는 생각의 과정을 컴퓨터 프로그램으로 적어 연구했다. Logic Theorist는 목표를 기호로 나타내고, 알려진 식과 비교하며, 쓸 만한 경로와 중간 문제를 선택한다. 옳은 추론 규칙만 적는 데서 더 나아가 어느 규칙을 언제 살필지를 문제 해결의 일부로 다룬 것이다. 쇼는 컴퓨터 실현에도 참여했고, 세 사람이 저술한 1957년 보고는 JOHNNIAC의 실행 자료로 그 과정을 조사한다. 이 프로그램이 모든 인간 사고를 설명했다는 뜻은 아니며, 구체적인 문제 해결 과정을 명세하고 시험하려는 연구였다.',
      works:[work()]
    }
  ];
  for(const person of rows){if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Logic Theorist author profile: '+person.id);profiles.push(person);}
})();
