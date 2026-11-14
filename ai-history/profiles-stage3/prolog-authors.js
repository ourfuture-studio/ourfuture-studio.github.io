/* Two biographies share the existing historical Prolog record, not one joint paper. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='prolog');
  if(!record?.content?.article)throw new Error('Prolog author profiles require the integrated Prolog article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const work=()=>({id:'prolog',eventId:'prolog',year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'연구 흐름',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const rows=[
    {
      id:'robert-kowalski',name:'Robert Kowalski',nameKo:'로버트 코왈스키',aliases:['Robert Anthony Kowalski','Robert A. Kowalski','Bob Kowalski','로버트 코왈스키'],tags:['symbolic'],
      tagline:'논리의 규칙을, 질문을 푸는 절차로 읽다',
      intro:'코왈스키는 논리로 적은 지식을 컴퓨터가 실행할 수 있을지 연구했다. 수학과 수리논리를 공부한 뒤 에든버러에서 자동 정리증명을 연구하며, 결론을 얻으려면 필요한 조건을 해결하라는 절차적 읽기에 주목했다. 하나의 규칙은 관계의 뜻을 나타내면서, 큰 목표를 여러 하위 목표로 바꾸는 프로그램으로도 읽을 수 있다. 1971–1972년 마르세유의 콜메로에와 교류하면서 문법·자연어 처리와 목표 지향적 증명을 연결했다. 1974년의 단독 논문에서는 함의를 절차 선언으로, 증명을 계산으로 해석하는 관점을 설명했다.',
      works:[work()]
    },
    {
      id:'alain-colmerauer',name:'Alain Colmerauer',nameKo:'알랭 콜메로에',aliases:['Alain Marie Albert Colmerauer','알랭 콜메라우어'],tags:['symbolic'],
      tagline:'문장을 분석하고 답하는 일을, 하나의 논리 언어로',
      intro:'콜메로에는 사람이 쓴 문장의 구조와 의미를 컴퓨터가 다루고, 그 내용에 관한 질문에 답하게 하려 했다. 그르노블의 구문 분석과 몬트리올의 자동 번역 연구를 거쳐, 마르세유에서는 프랑스어 소통과 논리적 추론을 한 체계로 연결하는 프로젝트를 시작했다. 문법과 의미를 논리로 나타내고, 질문을 풀기 위해 규칙을 실행한다면 언어 처리와 추론이 같은 계산 안에서 만날 수 있다는 발상이었다. 코왈스키와의 교류, 루셀의 초기 인터프리터 구현, 파세로·카누이 등의 응용 개발이 이 과정에 함께했다. 초기 Prolog는 이 언어·응용의 상호작용 속에서 만들어졌다.',
      works:[work()]
    }
  ];
  for(const person of rows){if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Prolog author profile: '+person.id);profiles.push(person);}
})();
