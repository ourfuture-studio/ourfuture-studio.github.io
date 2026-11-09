/* A new research event. Detailed content stays in entries/instructgpt.js. */
(function(){
  'use strict';
  const events=window.ATLAS_MODERN_EVENTS;
  if(!Array.isArray(events)||events.some(event=>event.id==='instructgpt'))throw new Error('InstructGPT needs the modern catalog and a unique event id.');
  events.push({
    id:'instructgpt',year:2022,dateLabel:'2022-01-27 · 공식 소개 / 2022-03-04 · 첫 원고 / NeurIPS 2022',track:'neural',
    title:'InstructGPT · 사람의 시범과 선호로 지시 따르기',subtitle:'InstructGPT · Training language models to follow instructions with human feedback',
    people:['Long Ouyang','Jeff Wu','Xu Jiang','Diogo Almeida'],
    authorNote:'Long Ouyang을 포함한 20명의 공동연구다. 연결한 네 인물은 전체 참여자의 일부이며, 별표의 Primary authors는 동등 기여 표시와 다르다. 전체 저자와 역할 주석은 논문 더 읽기에 적었다.',
    summary:'사람의 시범으로 지도 미세조정하고, 답변 비교에서 보상모형을 배운 뒤 그 피드백으로 지시를 더 잘 따르도록 정책을 조정한 연구.',detail:'',question:'',visual:'attention',
    sources:[{title:'Ouyang 외 · NeurIPS 2022 출판본',url:'https://proceedings.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf'}],
    caveat:'',related:['gpt3','gpt2','constitutional-ai']
  });
})();
