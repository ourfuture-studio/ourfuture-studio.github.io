/* A historical research-preview event; the launch article credits an organization. */
(function(){
  'use strict';
  const events=window.ATLAS_MODERN_EVENTS;
  if(!Array.isArray(events)||events.some(event=>event.id==='chatgpt'))throw new Error('ChatGPT needs the modern catalog and a unique event id.');
  events.push({
    id:'chatgpt',year:2022,dateLabel:'2022-11-30 · 최초 연구 프리뷰',track:'neural',
    title:'ChatGPT · OpenAI의 대화형 AI 연구 프리뷰',subtitle:'챗GPT(챗지피티) · Introducing ChatGPT · 2022 연구 프리뷰',
    people:[],organization:'OpenAI',
    authorNote:'공식 글의 저자는 OpenAI다. 별도 Acknowledgments만으로 개인별 기여를 정하지 않아 개인 프로필을 연결하지 않았다.',
    summary:'이전 말과 정정·추가 요청을 함께 읽는 대화에서, 지금 원하는 응답을 어떻게 만들게 할지 살펴보는 기록이다.',detail:'',question:'',visual:'attention',
    sources:[{title:'OpenAI · Introducing ChatGPT · 2022-11-30',url:'https://openai.com/index/chatgpt/'}],
    caveat:'2022년 공식 소개의 방법과 한계를 다룬다. 화면의 대화·답변·순위는 직접 작성했으며 실제 모델 응답이나 성능 평가가 아니다.',
    related:['instructgpt','gpt3','constitutional-ai']
  });
})();
