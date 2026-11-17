/* A sourced researcher introduction shares the existing AlexNet article. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='alexnet');
  if(!record?.content?.article)throw new Error('Krizhevsky profile requires the canonical AlexNet article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  if(profiles.some(person=>person.id==='alex-krizhevsky'))throw new Error('Duplicate Krizhevsky profile.');
  profiles.push({
    id:'alex-krizhevsky',name:'Alex Krizhevsky',nameKo:'',aliases:[],tags:['neural'],
    roles:['시각 표현 학습','GPU 합성곱 구현','AlexNet 공동연구'],
    tagline:'무엇을 볼 것인지까지, 사진의 정답에서 배우다',
    intro:'같은 사물도 자세·빛·배경이 바뀌면 다른 화소 무늬가 된다. 컴퓨터는 그 변화 속에서 무엇을 같은 사물의 단서로 삼아야 할까? Krizhevsky는 작은 컬러 영상에서 여러 층의 특징을 배우는 2009년 석사논문을 공개했고, Vinod Nair·Geoffrey Hinton과 CIFAR-10·100 자료를 만들었다. CUDA로 합성곱과 신경망 학습을 구현한 작업도 저자 홈페이지에 남아 있다. 2012년에는 Ilya Sutskever·Hinton과 함께 이 연구 방향을 ImageNet의 큰 자연사진 분류 문제로 확장했다. AlexNet은 가까운 영역을 함께 보는 연결과 위치마다 공유하는 필터를 여러 층으로 쌓았다. 어떤 무늬에 반응하고 그 반응을 어떻게 조합할지는 사물 라벨의 오차로 필터와 분류 연결을 함께 바꾸며 배웠다. 두 GPU의 계산과 ReLU는 큰 망을 학습하는 부담을, 증강과 dropout은 본 사진에만 맞춰지는 문제를 다루었다. 아래에서는 세 사람의 공동논문을 따라 원래 아키텍처, 실제 학습 필터, 두 GPU의 연결을 함께 살펴볼 수 있다.',
    works:[{id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'공동연구 논문',track:record.track,people:record.people,sources:record.sources,caveat:record.caveat,content:record.content}]
  });
})();
