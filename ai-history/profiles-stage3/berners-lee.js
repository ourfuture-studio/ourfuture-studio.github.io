/* Berners-Lee's biography shares the existing 2001 Semantic Web record. */
(function(){
  'use strict';
  const record=(window.TIMELINE_DATA||[]).find(row=>row.id==='semantic-web');
  if(!record?.content?.article)throw new Error('Berners-Lee profile requires the integrated Semantic Web article.');
  const profiles=window.ATLAS_PEOPLE_PROFILES=window.ATLAS_PEOPLE_PROFILES||[];
  const person={
    id:'tim-berners-lee',name:'Tim Berners-Lee',nameKo:'팀 버너스리',aliases:['Timothy John Berners-Lee','Timothy Berners-Lee','Tim BL','팀 버너스 리','팀 버너스-리'],tags:['symbolic'],
    tagline:'문서를 잇는 웹에서, 지식을 함께 쓰는 웹으로',
    intro:'흩어진 정보를 연결하면, 사람이 다시 찾고 다른 지식과 함께 쓸 수 있지 않을까? 버너스리는 CERN에서 사람·프로그램·문서 사이의 관계를 기록하는 ENQUIRE를 만들었고, 1989년에는 여러 컴퓨터에 나뉜 정보를 하이퍼텍스트로 연결하는 웹을 제안했다. 문서를 이어 놓은 뒤의 질문은 프로그램도 그 안의 관계를 따라 일을 할 수 있는가였다. Hendler·Lassila와 함께 쓴 2001년 시맨틱 웹 글에서는, 데이터가 가리키는 대상과 관계를 식별자로 적고 온톨로지로 개념의 뜻을 명시하는 구상을 설명했다. 프로그램이 여러 출처의 사실을 연결하고 사용자의 조건을 조합하도록 하려는 생각이다. 이는 웹의 모든 내용을 저절로 이해하는 기계의 완성 보고가 아니라, 의미를 함께 정한 데이터를 공개해 서로 다른 프로그램이 활용하게 하려는 비전이었다.',
    works:[{id:'semantic-web',eventId:'semantic-web',year:record.year,dateLabel:record.dateLabel,title:record.subtitle,summary:record.summary,type:'비전·해설 글',track:record.track,people:record.people,authorNote:record.authorNote,sources:record.sources,caveat:record.caveat,content:record.content}]
  };
  if(profiles.some(p=>p.id===person.id))throw new Error('Duplicate Berners-Lee profile: '+person.id);
  profiles.push(person);
})();
