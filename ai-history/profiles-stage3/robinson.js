/* The person biography refers to the existing, independently maintained paper. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='resolution');
  if(!record?.content?.article)throw new Error('Robinson profile requires the integrated Resolution article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const person={
    id:'alan-robinson',name:'J. Alan Robinson',nameKo:'앨런 로빈슨',aliases:['John Alan Robinson','J. A. Robinson','J.A. Robinson','존 앨런 로빈슨'],tags:['symbolic'],
    tagline:'기계가 다룰 추론의 모양을 설계하다',
    intro:'로빈슨은 고전학과 철학을 공부한 뒤 듀폰에서 프로그래밍을 익혔고, Argonne에서 논리적 증명을 기계로 찾는 문제를 연구했다. 핵심 질문은 주어진 지식에서 결론을 찾으려면 추론을 어떤 계산으로 표현해야 하는가였다. 컴퓨터가 여러 기호를 처리할 수 있다는 점에 주목해, 식의 변수를 맞추는 치환과 논리적 결합을 Resolution이라는 하나의 추론 단계로 묶었다. 지식에 목표의 부정을 더하고 모순으로 이어지는 증명을 찾는 방식으로, 기호로 표현한 지식에서 결론을 끌어내도록 하려는 접근이었다. 1963년에 구상·작성한 연구는 1965년 논문으로 출판됐다. 논리적 근거가 있다고 해서 탐색이 언제나 빠르다는 뜻은 아니며, 어떤 추론을 먼저 시도할지도 별도의 연구 문제였다. 이후 매카시가 이 논문의 절차를 Lisp로 구현한 이야기는 아래 관계도에서 이어 볼 수 있다.',
    works:[{id:'resolution',eventId:'resolution',year:record.year,dateLabel:record.dateLabel,title:record.subtitle||'A Machine-Oriented Logic Based on the Resolution Principle',summary:record.summary,type:'논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]
  };
  if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Resolution author profile: '+person.id);
  profiles.push(person);
})();
