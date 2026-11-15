/* Two biographies share one independently maintained original YOLO record. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='yolo-v1');
  if(!record?.content?.article)throw new Error('Redmon and Farhadi profiles require the original YOLO article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const shared=()=>({id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'공동연구 논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const people=[
    {id:'joseph-redmon',name:'Joseph Redmon',nameKo:'조셉 레드몬',aliases:['Joseph Chet Redmon','Joe Redmon','조셉 레드먼','조 레드몬'],tags:['neural'],roles:['초기 YOLO 공동연구','Darknet · 신경망 프레임워크'],tagline:'무엇이 어디에 있는지를, 한 신경망의 출력으로',intro:'사람은 장면을 보고 물체의 종류와 위치를 함께 알아챈다. 컴퓨터도 이미지 전체를 한 신경망에 넣어 이 두 답을 동시에 낼 수 있을까? 레드몬은 워싱턴대학교에서 파르하디의 지도를 받으며 컴퓨터 비전을 연구했고, Divvala·Girshick·Farhadi와 초기 YOLO를 발표했다. 물체가 있을 법한 영역을 먼저 따로 찾고 각 영역을 분류하는 대신, 이미지에서 경계 상자의 좌표와 종류에 관한 예측을 함께 내도록 탐지 문제를 회귀로 표현했다. 같은 신경망이 본 장면의 특징에서 위치와 종류를 모두 배우게 하려는 발상이다. 저자 홈페이지는 Darknet과 이후 YOLO 공동연구를 함께 소개한다. 아래에는 그 출발점인 2015년 공개·2016년 CVPR 논문을 하나의 연구 기록으로 연결했다.',works:[shared()]},
    {id:'ali-farhadi',name:'Ali Farhadi',nameKo:'알리 파르하디',aliases:['알리 파하디','알리 파라디'],tags:['neural'],roles:['워싱턴대학교 · 컴퓨터 비전','초기 YOLO 공동연구 · 레드몬 지도'],tagline:'사진의 이름표를 넘어, 장면 속 대상과 위치를 함께',intro:'사진에 물체의 이름을 붙이는 것에서 더 나아가, 무엇이 어디에 있고 어떤 장면을 이루는지 표현할 수 있을까? 파르하디는 물체의 속성·시각적 구절·장면 설명을 연구한 뒤, 워싱턴대학교에서 컴퓨터 비전 연구와 학생 지도를 이어갔다. 레드몬·Divvala·Girshick과 함께 쓴 초기 YOLO는 탐지의 여러 부분을 한 신경망의 출력으로 묶었다. 이미지 전체에서 얻은 특징으로 여러 경계 상자와 종류를 함께 예측하고, 위치의 오차도 종류의 오차와 함께 학습에 반영하는 접근이다. 연구실의 공식 졸업생 기록은 파르하디가 레드몬의 박사과정 지도교수였음을 확인한다. 지도 관계와 논문 공동저술 관계를 각각 연결하고, 같은 원논문 아키텍처를 두 인물 카드에서 공유한다.',works:[shared()]}
  ];
  for(const person of people){if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate YOLO profile: '+person.id);profiles.push(person);}
})();
