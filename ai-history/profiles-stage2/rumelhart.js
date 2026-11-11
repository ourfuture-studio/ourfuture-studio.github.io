/* Rumelhart's existing author profile, promoted without duplicating the paper. */
(function(){
  'use strict';
  const e=(window.TIMELINE_DATA||[]).find(r=>r.id==='backprop');
  if(!e?.content?.article)throw new Error('Rumelhart profile requires the integrated backprop article.');
  if((window.ATLAS_PEOPLE_PROFILES||[]).some(p=>p.id==='david-rumelhart'))throw new Error('Duplicate Rumelhart profile.');
  const work={id:'backprop',eventId:'backprop',year:e.year,dateLabel:e.dateLabel,title:e.subtitle||'Learning representations by back-propagating errors',summary:e.summary,type:'공동 논문',track:e.track,people:e.people,authorNote:e.authorNote,sources:e.sources,caveat:e.caveat,content:e.content};
  window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  window.ATLAS_PEOPLE_PROFILES.push({
    id:'david-rumelhart',name:'David E. Rumelhart',nameKo:'데이비드 루멜하트',aliases:['David Rumelhart','David Everett Rumelhart'],tags:['neural','foundations'],
    tagline:'끝의 정답에서, 안쪽의 표현을 배우는 연결로',
    intro:'루멜하트는 심리학과 수학을 공부하고 인간의 지각·언어·기억을 계산 모형으로 설명하려 했다. 완성된 개념을 규칙으로 적는 데서 더 나아가, 많은 단위의 활동과 학습된 연결에서 사고에 쓸 표현이 어떻게 생기는지 물었다. UC San Diego와 Stanford에서 연구했으며, McClelland와 병렬분산처리의 인지 모형을 발전시켰다. 1986년에는 Hinton·Williams와 함께 최종 출력의 오차로 중간층의 연결까지 바꾸는 학습을 설명했다. 아래 공동논문 카드에서는 발표된 망의 결과와, 같은 과제를 다른 초기값에서 새로 학습하는 과정을 구분해 읽는다.',
    works:[work]
  });
})();
