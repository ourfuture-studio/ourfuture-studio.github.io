/* A dated code-model research background and the shared Qwen3 team article. */
(function(){
 'use strict';
 const record=(window.TIMELINE_DATA||[]).find(e=>e.id==='qwen3');if(!record?.content?.article)throw Error('Binyuan Hui profile requires the Qwen3 source article.');
 const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
 const person={
  id:'binyuan-hui',name:'Binyuan Hui',nameKo:'후이빈위안',aliases:['Hui Binyuan','후이 빈위안','빈위안 후이'],tags:['neural'],roles:['Qwen2.5-Coder · 2024년 공동연구','Qwen3 · 2025년 Core Contributors'],
  tagline:'코드를 이어 쓰는 능력에서, 문제에 맞게 추론하는 능력으로',
  intro:'말로 적은 요구를 실행할 수 있는 코드로 바꾸려면, 모델은 무엇을 배워야 할까? 후이빈위안은 코드와 자연어를 연결하는 언어모델 연구에 참여했다. 2024년 Qwen2.5-Coder 첫 보고서는 그를 동등한 핵심 기여를 한 네 공동저자 가운데 한 명으로 표시하고, 파일과 저장소 문맥에서 코드의 다음 부분이나 비어 있는 부분을 예측하는 학습을 설명한다. 본인 소개는 코드를 실행해 결과를 확인할 수 있다는 점에서 자율 코딩을 지능 연구의 과제로 제시한다. 이는 연구자가 밝힌 목표이며, 자율 코딩을 해결하면 일반지능이 완성된다는 검증 결과는 아니다. 2025년 Qwen3에는 린쥔양·저우징런 등을 포함한 팀과 함께 참여했다. 아래 원논문 그림에서는 한 모델이 긴 추론과 직접 응답을 함께 익히는 사후학습 경로를 살펴본다. 이 인물 기록은 확인한 2024–2025년 공동연구를 중심으로 구성했다.',
  works:[{id:record.id,eventId:record.id,year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'팀 공동연구·기술 보고서',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]
 };
 if(profiles.some(p=>p.id===person.id))throw Error('Duplicate Binyuan Hui profile.');profiles.push(person);
})();
