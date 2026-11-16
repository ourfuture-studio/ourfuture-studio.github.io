/* Two researcher biographies reuse one independently maintained DeepProbLog article. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='deepproblog');
  if(!record?.content?.article)throw new Error('DeepProbLog author profiles require the canonical 2018 article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const shared=()=>({id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'공동연구 논문',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content});
  const people=[
    {
      id:'luc-de-raedt',name:'Luc De Raedt',nameKo:'',aliases:[],tags:['hybrid'],
      roles:['학습과 추론의 결합 · 확률 논리 프로그래밍','DeepProbLog 공동연구'],
      tagline:'배워서 알아본 것과, 규칙으로 아는 것을 한 프로그램에',
      intro:'사진에서 대상을 알아보는 능력과, 그 대상들 사이의 관계를 따져 답을 찾는 능력을 어떻게 함께 구현할까? De Raedt는 논리·확률·학습을 연결하는 프로그래밍을 연구해 왔다. 1991년 KU Leuven에서 컴퓨터과학 박사학위를 받았고, 프라이부르크대학교의 기계학습·자연어처리 연구실과 KU Leuven에서 연구했다. Manhaeve·Dumančić·Kimmig·Demeester와 발표한 2018년 DeepProbLog는 기존 확률 논리 언어 ProbLog에 신경 술어를 더했다. 신경망이 낸 여러 인식 후보의 확률을 논리 프로그램에 전달해, 규칙에 맞는 답의 확률을 계산하는 발상이다. 덧셈 규칙은 사람이 적고, 그림이 어느 숫자인지는 신경망이 배운다. 최종 합에 대한 오차를 신경망까지 돌려보내므로 인식과 추론을 하나의 학습 과정으로 묶을 수 있다. 아래 기록은 다섯 저자의 공동연구와 원논문 그림을 공유한다. De Raedt와 Demeester의 별표는 공동 마지막 저자 표시다.',
      works:[shared()]
    },
    {
      id:'robin-manhaeve',name:'Robin Manhaeve',nameKo:'',aliases:[],tags:['hybrid'],
      roles:['신경망과 확률 논리의 결합','DeepProbLog 공동연구 · 소프트웨어 개발'],
      tagline:'두 그림의 합만 알려 주어도, 숫자를 알아보게 배울 수 있을까',
      intro:'숫자 그림 두 장과 두 숫자의 합만 알려 주면, 컴퓨터는 각 그림의 숫자를 알아보는 법도 배울 수 있을까? Manhaeve가 공동연구한 DeepProbLog의 덧셈 과제는 이 질문을 다룬다. 신경망은 각 그림을 0부터 9까지의 확률로 표현하고, 논리 프로그램은 덧셈 규칙에 맞는 조합에서 답의 확률을 구한다. 최종 합에 대한 손실의 변화가 신경 술어를 거쳐 신경망의 연결값을 바꾸게 한다. 이 과제에서는 개별 숫자의 정답표 없이도 합의 정답으로 인식기를 학습한다. Manhaeve는 KU Leuven에서 도로 이용자 탐지·분류를 다룬 석사논문을 쓴 뒤, 2017–2021년 DTAI에서 신경 확률 논리 프로그래밍을 박사 주제로 연구했다. 본인 소개는 박사과정 중 DeepProbLog를 개발했다고 설명하며, 2018년 원논문은 Dumančić·Kimmig·Demeester·De Raedt를 포함한 다섯 명의 공동저술이다. 아래 원논문 기반 화면에서 인식 후보를 남긴 채 추론하는 과정과, 답의 오차가 인식으로 돌아가는 과정을 함께 볼 수 있다.',
      works:[shared()]
    }
  ];
  for(const person of people){if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate DeepProbLog author profile: '+person.id);profiles.push(person);}
})();
