/* Williams' author-derived profile becomes a sourced person introduction.
 * The 1986 paper remains one shared record, including its existing URL. */
(function(){
  'use strict';
  const e=(window.TIMELINE_DATA||[]).find(row=>row.id==='backprop');
  if(!e?.content?.article)throw new Error('Williams profile requires the integrated backprop article.');
  const people=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  if(people.some(person=>person.id==='ronald-williams'))throw new Error('Duplicate Williams profile.');
  const work={id:'backprop',eventId:'backprop',year:e.year,dateLabel:e.dateLabel,title:e.subtitle||'Learning representations by back-propagating errors',summary:e.summary,type:'공동 논문',track:e.track,people:e.people,authorNote:e.authorNote,sources:e.sources,caveat:e.caveat,content:e.content};
  people.push({
    id:'ronald-williams',name:'Ronald J. Williams',nameKo:'로널드 윌리엄스',aliases:['Ronald Williams','Ron Williams','R. J. Williams'],tags:['neural'],
    tagline:'끝의 오차를, 안쪽 연결의 학습 신호로',
    intro:'윌리엄스는 루멜하트·힌턴과 함께 1986년 역전파 논문을 쓴 연구자다. 세 사람의 공동논문은 중간 단위가 무엇에 반응해야 하는지를 사람이 정해 주지 않고, 최종 정답과 출력의 차이에서 각 연결을 고칠 방향을 구했다. 연결이 바뀌면 같은 입력을 표현하는 중간층의 반응도 바뀐다. 지능에 필요한 판단 기준까지 경험에서 배울 수 있을지 묻는 발상이었다. 논문 표제에는 윌리엄스와 루멜하트의 소속이 UC San Diego로 적혀 있으며, 윌리엄스는 같은 해 Northeastern에 합류했다. 이후에는 시간이 흐르며 상태가 바뀌는 순환망의 학습과 강화학습도 연구했다. 아래 연구 기록은 루멜하트·힌턴의 카드와 같은 공동논문으로 연결된다.',
    works:[work]
  });
})();
