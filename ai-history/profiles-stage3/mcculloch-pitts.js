/* Two separately editable biographies share the existing 1943 research card. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='mcculloch-pitts');
  if(!record?.content?.article)throw new Error('McCulloch and Pitts profiles require the integrated 1943 article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const work=()=>({id:'mcculloch-pitts',eventId:'mcculloch-pitts',year:record.year,dateLabel:record.dateLabel,title:record.subtitle||'A Logical Calculus',summary:record.summary,type:'공동 논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const rows=[
    {
      id:'warren-mcculloch',name:'Warren McCulloch',nameKo:'워런 매컬럭',aliases:['Warren S. McCulloch','Warren Sturgis McCulloch','워런 맥컬럭'],tags:['neural','symbolic'],
      tagline:'생각을 묻는 질문을, 신경계의 연결로 가져오다',
      intro:'매컬럭은 의학과 신경생리학을 연구하며, 생각을 뇌의 활동과 연결에서 어떻게 설명할 수 있을지 물었다. 예일에서는 피질 영역 사이의 기능적 연결을 연구했고, Illinois Neuropsychiatric Institute에서 피츠와 1943년 논문을 썼다. 두 사람은 신경세포가 발화하는 사건을 참·거짓으로 표현하고, 연결이 만드는 반응을 논리 관계로 읽었다. 신경계에 대한 가정을 명확하게 적으면 어떤 연결이 어떤 계산을 가능하게 하는지 연구할 수 있다는 발상이었다. 이후 MIT RLE에서도 신경계와 정보 처리 연구를 이어갔다. 아래의 공동논문은 피츠의 인물 카드와 같은 기록으로 연결된다.',
      works:[work()]
    },
    {
      id:'walter-pitts',name:'Walter Pitts',nameKo:'월터 피츠',aliases:['Walter H. Pitts','Walter Harry Pitts'],tags:['neural','symbolic'],
      tagline:'신경 활동의 사건을, 시간에 따른 명제로 적다',
      intro:'피츠는 논리와 수학을 독학하며 시카고의 수리생물학 연구 모임에 참여한 연구자였다. 공동연구자 Lettvin은 피츠가 정식 등록 학생이 아닌 상태로 시카고대학교의 강의를 들으며 공부했다고 회고한다. 피츠는 매컬럭과 1943년 논문에서 신경세포의 발화와 연결을 수학적 관계로 표현했다. 어느 시점에 어떤 세포가 활동했는지를 명제로 적고, 그 활동이 뒤의 세포에 어떤 조건으로 이어지는지 논리로 다룬 것이다. 생각에 관한 질문을 신경계의 계산 가능한 모형으로 옮기려는 공동연구였다. 이후 MIT RLE에서도 신경계 연구를 이어갔으며, 아래의 1943년 기록은 매컬럭의 카드와 공유한다.',
      works:[work()]
    }
  ];
  for(const person of rows){if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate 1943 author profile: '+person.id);profiles.push(person);}
})();
