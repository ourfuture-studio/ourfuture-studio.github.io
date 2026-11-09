/* The2001 vision and the authored three-source seminar example remain distinct. */
(function(){
  'use strict';
  const paper='https://lassila.org/publications/2001/SciAm.pdf';
  const author='https://lassila.org/publications/2001/SciAm.html';
  const w3c='https://www.w3.org/2001/sw/';
  const at=(page,label)=>({title:'The Semantic Web (2001) · PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const ex='https://example.org/semantic-web/';
  const kg=ex+'topics/knowledge-graph',robotics=ex+'topics/robotics';
  const programKg='https://program.example/topics/kg',programRobot='https://program.example/topics/robotics';
  const y=ex+'people/yeonwoo',j=ex+'people/jimin',s=ex+'people/sua',d=ex+'people/doyun';
  const a=ex+'sessions/kg-intro',b=ex+'sessions/graph-lab',c=ex+'sessions/open-forum',f=ex+'sessions/robot-seminar';
  const va=ex+'venues/stream-a',vb=ex+'venues/stream-b',vc=ex+'venues/forum-c',vd=ex+'venues/hall-d';
  window.AtlasEntries.register({
    id:'semantic-web',
    record:{
      title:'Semantic Web · 흩어진 정보를, 뜻과 관계로 이어 쓰다',
      subtitle:'The Semantic Web · 시맨틱 웹과 여러 출처의 정보 조합',
      dateLabel:'2001-05 · Scientific American 글',
      people:['Tim Berners-Lee','James Hendler','Ora Lassila'],
      authorNote:'Tim Berners-Lee, James Hendler, Ora Lassila가 함께 쓴 2001년 비전·해설 글이다.',
      summary:'웹의 여러 곳에 나뉜 사실을 공통 식별자와 개념·관계의 명세로 연결하고, 프로그램이 사용자의 목표에 맞게 조합하도록 구상했다.',
      detail:'',question:'',related:['ontology-sharing','rdf','owl','sparql'],
      sources:[{title:'Berners-Lee·Hendler·Lassila · The Semantic Web · 2001',url:paper},{title:'Ora Lassila · 저자 공개본과 서지',url:author},{title:'W3C · Semantic Web Activity',url:w3c}],
      caveat:'2001년 글의 비전과 원그림, 이 카드를 위해 작성한 세미나 자료와 조건 결합을 구분한다.'
    },
    content:{
      article:{
        question:'웹페이지 세 곳에 나뉜 정보에서,\n내 조건에 맞는 세미나를 찾을 수 있을까?',
        opening:[
          '세미나 일정은 행사 페이지에, 발표 언어는 발표자 소개에, 참여 방식은 진행 안내에 나뉘어 있다고 하자. 프로그램이 이 정보를 함께 쓰려면 어느 발표·발표자·장소가 같은 대상을 가리키는지 연결할 기준이 필요하다.',
          '2001년 글의 구상은 문서의 웹에 프로그램이 다룰 수 있는 데이터와 뜻의 연결을 덧붙이는 것이었다. RDF로 사실을 적고 온톨로지로 개념 사이의 관계를 명세하면, 여러 출처에서 정보를 모아 목표에 맞게 처리할 발판이 생긴다는 생각이다.',
          '자료마다 다른 말이 쓰일 때는 어떤 개념을 가리키는지도 확인해야 한다. 아래에서는 직접 만든 세 출처를 연결하고, 명시한 주제 대응과 요청 조건을 바꾸며 결론을 뒷받침하는 기록을 읽는다.'
        ],
        visual:{
          id:'semantic-web-composition',navLabel:'세 출처에서 하나의 요청으로',
          title:'정보가 만나고, 개념이 대응하고, 조건이 결합되다',
          caption:'직접 작성한 세 출처의 기록과 개념 대응을 연결해, 요청 조건마다 어떤 근거가 쓰이는지 살펴봅니다.',
          stages:[
            {id:'connect',label:'출처를 연결하다',text:'행사 일정·발표자 소개·진행 안내에 나뉜 기록에서 같은 식별자가 만나는 자리를 찾는다.'},
            {id:'interpret',label:'개념의 대응을 읽다',text:'서로 다른 주제 식별자를 어떤 개념으로 연결할지 명시한다. 이름의 비슷함만으로 뜻을 자동으로 맞추지 않는다.'},
            {id:'compose',label:'요청의 조건을 결합하다',text:'주제·언어·시간·참여 방식의 근거를 함께 살핀다. 명시한 불일치와 필요한 정보가 없는 경우를 구분한다.'}
          ],
          terms:[
            {id:kg,label:'지식그래프'},{id:robotics,label:'로봇공학'},
            {id:programKg,label:'Knowledge Graph'},{id:programRobot,label:'Robotics'},
            {id:y,label:'연우'},{id:j,label:'지민'},{id:s,label:'수아'},{id:d,label:'도윤'},
            {id:a,label:'KG 입문'},{id:b,label:'Graph Lab'},{id:c,label:'열린 포럼'},{id:f,label:'로봇 세미나'},
            {id:va,label:'온라인방 A'},{id:vb,label:'온라인방 B'},{id:vc,label:'포럼 C'},{id:vd,label:'발표장 D'}
          ],
          sources:{
            program:{
              id:'program',label:'행사 일정',description:'각 세션의 발표자·진행 장소·주제 태그와 시작·종료 시각을 적었다.',
              rows:[
                {id:'program-a',session:a,speaker:y,venue:va,topic:programKg,start:600,end:660},
                {id:'program-b',session:b,speaker:j,venue:vb,topic:kg,start:660,end:720},
                {id:'program-c',session:c,speaker:s,venue:vc,topic:kg,start:780,end:840},
                {id:'program-d',session:f,speaker:d,venue:vd,topic:programRobot,start:840,end:900}
              ]
            },
            profiles:{
              id:'profiles',label:'발표자 소개',description:'이 프로그램에서 각 발표자가 공지한 이번 세션의 발표 언어다. 사람의 모든 언어 능력을 뜻하지 않는다.',
              rows:[
                {id:'profile-yeonwoo',person:y,language:'ko'},
                {id:'profile-jimin',person:j,language:'en'},
                {id:'profile-sua',person:s,language:'ko'},
                {id:'profile-doyun',person:d,language:'ko'}
              ]
            },
            venues:{
              id:'venues',label:'진행 안내',description:'세션이 가리키는 진행 장소의 참여 방식을 적었다. 포럼 C의 방식은 기록하지 않았다.',
              rows:[
                {id:'venue-a',venue:va,mode:'online'},
                {id:'venue-b',venue:vb,mode:'online'},
                {id:'venue-c',venue:vc},
                {id:'venue-d',venue:vd,mode:'onsite'}
              ]
            }
          },
          mappings:[
            {id:'mapping-kg',from:programKg,to:kg,note:'이 예시에서 사람이 합의한 주제 대응이다. 프로그램의 Knowledge Graph 태그를 요청 어휘의 지식그래프와 연결한다.'},
            {id:'mapping-robotics',from:programRobot,to:robotics,note:'이 예시에서 사람이 합의한 Robotics와 로봇공학의 대응이다.'}
          ],
          initialRequest:{topic:kg,language:'ko',earliestStart:540,latestEnd:1020,mode:'online'},
          requestOptions:{
            topics:[{value:kg,label:'지식그래프'},{value:robotics,label:'로봇공학'}],
            languages:[{value:'ko',label:'한국어'},{value:'en',label:'영어'}],
            latestEnds:[{value:660,label:'11:00까지'},{value:720,label:'12:00까지'},{value:1020,label:'17:00까지'}],
            modes:[{value:'online',label:'온라인'},{value:'onsite',label:'현장'},{value:'any',label:'방식 제한 없음'}]
          },
          evidence:[
            {
              id:'cook',file:'semantic-web-2001-cook-search.png',title:'원문 도식 · 한 페이지에 없는 답을 여러 관계로 찾다',
              caption:'회사·가족·대학에 관한 조건을 연결해 찾고 있던 인물을 가려내는 구상을 그렸다.',
              scope:'도식은 PDF6 / 인쇄39쪽, 설명 캡션은 앞쪽 PDF5 / 인쇄38쪽에 나뉘어 있다. 기사에서 제시한 가상 검색 사례다.',
              source:at(6,'Cook 관계 도식 · 설명은 PDF p.5'),
              credit:{title:'Scientific American · 2001년 기사 원문 도판',url:paper+'#page=6',note:'이 도판의 개별 저작자는 확인하지 못했다. 원문 페이지 전체를 200dpi로 렌더했으며 그림 안의 내용은 바꾸지 않았다. 설명 캡션은 앞쪽 PDF p.5에서 확인할 수 있다.'}
            },
            {
              id:'agents',file:'semantic-web-2001-intelligent-agents.png',title:'원문 도식 · 온톨로지와 여러 서비스를 거쳐 계획으로',
              caption:'사용자 요청을 받은 에이전트가 개념 정의와 여러 서비스를 참고해 조건을 조합하고, 계획을 사용자에게 돌려주는 구상이다.',
              scope:'원문은 치료 예약을 가상 사례로 사용한다. 도식과 전체 캡션은 PDF8 / 인쇄41쪽에 함께 있다.',
              source:at(8,'에이전트 도식과 전체 캡션 · 인쇄 p.41'),
              credit:{title:'XPLANE · Scientific American (2001) 원문 도식',url:paper+'#page=8',note:'원문 판면의 XPLANE 표기를 확인했다. 도식과 전체 캡션을 200dpi로 렌더해 영역만 잘랐으며, 한국어 해설은 이미지 밖에 붙였다.'}
            }
          ],
          scope:'고정된 세 출처의 자체 자료와 사람이 명시한 개념 대응을 결합한다. 요청에 맞는 후보와 빠진 정보를 확인하며 실제 웹 검색·서비스 예약·온톨로지 발견을 실행하지 않는다.',
          source:at(7,'개념과 어휘의 관계 · 이어지는 PDF p.8–10의 정보 조합 구상')
        },
        takeaway:{
          title:'웹의 정보를 조합하려면, 같은 대상과 관계를 확인할 언어가 필요하다',
          text:'어떤 대상을 가리키는지 연결하고, 서로 다른 개념의 대응을 명시하며, 각 조건을 뒷받침하는 출처를 확인한다. 이렇게 기록의 의미와 결론의 근거를 드러내는 일이 여러 곳의 정보를 함께 쓰는 바탕이 된다.'
        },
        technical:{
          title:'원문에서 말한 비전과 이 보기의 전제를 더 읽기',
          paragraphs:[
            '서지: Tim Berners-Lee, James Hendler, Ora Lassila, The Semantic Web, Scientific American 284(5):34–43, May 2001. 사용한 저자 공개본은 10쪽이며 PDF1–10이 인쇄34–43쪽에 대응한다. 정확한 출판 일자는 확인하지 못해 연표는 월까지만 표시한다.',
            '원문은 생일 축하 광대가 고객의 우편함 주소로 가 버리는 가상 이야기로, 방문할 장소와 우편을 받을 곳을 구별해야 한다고 설명한다(PDF7–8). 반대로 zip code와 postal code처럼 다른 용어의 대응도 명시할 수 있다고 구상한다.',
            '이 보기의 각 발표자는 한 세션에 연결된다. 발표자 소개의 language는 이 프로그램에서 공지한 해당 세션의 언어다. 시간은 같은 날·같은 시간대를 전제로 한 자정 이후 분이며, 시작 시각 이상·종료 시각 이하로 시간 창에 들어오는지 비교한다.',
            '주제 조건은 정한 태그의 정확한 대응을 조회한다. 알려진 다른 태그는 이 요청과 맞지 않지만, 매핑이 없는 다른 식별자는 뜻의 연결을 아직 확인하지 못한 것으로 남긴다. 기록이 없다는 것과 명시한 불일치를 구분하며, 분야 전체가 서로 배타적이라고 추론하지 않는다.',
            '판정의 근거는 자체 자료의 행·식별자 연결·적용 조건이다. 기사가 구상한 일반 증명 교환, 전자서명이나 출처의 진실성 검증을 구현한 것은 아니다. 자료를 빼거나 정의가 부족하면 결론이 달라지는 범위를 살피는 작은 고정 예시다.',
            '2001년의 구상과 후속 표준을 구분한다. 이어 볼 연구의 OWL 권고는 2004년, SPARQL 권고는 2008년이다. 원문은 복잡한 자동 서비스 조합에는 추가 AI 기술도 필요하다고 밝힌다(PDF10). 이 카드의 조건 결합을 그 표준 전체의 실행이나 원문 서비스의 성능 재현으로 표시하지 않는다.'
          ],
          formula:'자체 세미나 보기의 결합\n\n행사 일정의 speaker = 발표자 소개의 person\n행사 일정의 venue = 진행 안내의 venue\n\n명시한 주제 대응 → 요청한 주제\n공지 언어 = 요청 언어\n09:00 ≤ 시작, 종료 ≤ 선택한 종료 시각\n참여 방식 = 요청 방식 또는 방식 제한 없음\n\n조건을 뒷받침하는 기록 / 명시한 불일치 / 필요한 기록 없음'
        }
      },
      keyIdeas:[
        {title:'여러 문서에 나뉜 기록을 같은 대상에 연결한다',text:'세션에서 발표자와 진행 장소의 식별자를 따라가면 다른 소개 문서와 진행 안내를 함께 읽을 수 있다.'},
        {title:'개념의 대응도 공개된 근거가 된다',text:'표현이 다른 주제 태그를 같은 요청 개념에 연결하려면 명시한 대응이 필요하다. 대응을 끄면 그 연결의 부재가 판정에 드러난다.'},
        {title:'목표의 조건과 근거를 함께 살핀다',text:'주제·언어·시간·참여 방식의 조건을 합쳐 후보를 읽고, 어느 출처가 어떤 조건을 뒷받침하는지 확인한다.'}
      ],
      videos:[],
      references:[
        {title:'Berners-Lee·Hendler·Lassila · The Semantic Web · 저자 공개 PDF',url:paper,location:'PDF2 저자·제목, PDF3–4 비전과 가상 예약 사례, PDF7–8 개념·어휘 대응, PDF9–10 에이전트·출처·서비스 조합. 인쇄쪽은 PDF쪽보다 33 크다.'},
        {title:'원문 · Cook 도식의 설명 캡션',url:paper+'#page=5',location:'PDF5 / 인쇄38쪽 하단. 여러 페이지에 분산된 조건을 조합하는 가상 검색 사례의 전체 설명.'},
        {title:'원문 · Cook 관계 도식',url:paper+'#page=6',location:'PDF6 / 인쇄39쪽 전체 도식. 설명 캡션은 앞쪽 PDF5에 있다. 개별 도판 저작자는 확인하지 못했다.'},
        {title:'원문 · 에이전트 도식과 전체 캡션',url:paper+'#page=8',location:'PDF8 / 인쇄41쪽. 온톨로지·여러 서비스·사용자 승인으로 이어지는 가상 시나리오. 판면 XPLANE 크레딧 확인.'},
        {title:'Ora Lassila · 저자 공개본과 출판 정보',url:author,location:'세 공동저자의 순서, Scientific American 284(5):34–43, May 2001.'},
        {title:'W3C · Semantic Web Activity',url:w3c,location:'서로 다른 응용·조직·공동체의 데이터 공유와 결합에 관한 공식 설명. 2013년에 보존된 활동 페이지로 2001년 기사와 시점을 구분한다.'}
      ]
    }
  });
})();
