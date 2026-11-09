/* Five dated symbolic-AI milestones. Standards editors are not sole inventors. */
(function(){
  'use strict';
  const events=window.TIMELINE_DATA;
  const refs={
    gruber:'https://tomgruber.org/writing/ontolingua-kaj-1993.pdf',
    rdf:'https://www.w3.org/TR/1999/REC-rdf-syntax-19990222/',
    semantic:'https://lassila.org/publications/2001/SciAm.pdf',
    owl:'https://www.w3.org/TR/2004/REC-owl-features-20040210/',
    sparql:'https://www.w3.org/TR/2008/REC-rdf-sparql-query-20080115/'
  };
  const additions=[
    {
      id:'ontology-sharing',year:1993,dateLabel:'1993 · Knowledge Acquisition 논문',track:'symbolic',
      title:'온톨로지 · 서로 다른 시스템이 개념을 공유하려면',subtitle:'Ontology Sharing / Ontolingua · A Translation Approach to Portable Ontology Specifications',
      people:['Thomas R. Gruber'],authorNote:'1993년 논문의 저자는 Thomas R. Gruber다. 이후 웹 표준의 편집자와 이 논문의 저자를 구분한다.',
      summary:'개념·관계의 뜻을 공통 형식으로 명세하고, 서로 다른 지식 표현 체계에서 재사용하려 한 연구다.',detail:'',question:'같은 단어를 쓴다고 같은 개념을 공유한 것일까?',visual:'ontology',
      sources:[{title:'Gruber · 1993 논문 저자 공개본',url:refs.gruber}],
      caveat:'1993년 온톨로지 공유와, 후대 OWL 의미론을 참고해 직접 만든 추론 보기를 구분한다.',related:['knowledge-representation','rdf','owl']
    },
    {
      id:'rdf',year:1999,dateLabel:'1999-02-22 · W3C Recommendation',track:'symbolic',
      title:'RDF · 자원 사이의 관계를 교환하다',subtitle:'Resource Description Framework · Model and Syntax Specification',
      people:['Ora Lassila','Ralph R. Swick'],organization:'W3C',authorNote:'Ora Lassila와 Ralph R. Swick은 이 권고안의 편집자다. RDF 전체를 두 사람의 단독 발명으로 귀속하지 않는다.',
      summary:'웹 자원에 대한 주장을 공통 데이터 모델로 표현해, 응용 사이에서 정보를 주고받는다.',
      detail:'1999년 RDF 권고안은 데이터 모델과 이를 전달하는 XML 구문을 구분했다. 같은 관계 구조를 다른 문법으로 표현할 수 있다는 관점을 담는다.',
      question:'표현 문법이 달라도 같은 관계를 전달할 수 있을까?',visual:'ontology',
      sources:[{title:'W3C · RDF Model and Syntax · 1999-02-22',url:refs.rdf}],
      caveat:'1999년 권고안과 RDF1.1·JSON-LD 등 후대 문서를 구분한다. 자원 식별자가 있다고 의미 합의나 추론 전체가 자동 해결되지는 않는다.',related:['ontology-sharing','semantic-web','sparql'],
      content:{
        keyIdeas:[{title:'문서의 위치에서, 자원에 대한 주장으로',text:'문서가 어디에 있는지를 넘어 무엇이 무엇과 어떤 관계를 맺는지 적는다. 공유할 관계 구조를 갖추면 서로 다른 응용이 같은 데이터를 읽을 기준을 만들 수 있다.'},{title:'모델과 문법을 나누어 본다',text:'정보를 표현하는 구조와 파일에 적는 문법은 다르다. 1999년 문서의 XML 구문을 RDF라는 데이터 모델 전체와 동일시하지 않는다.'}],
        example:{title:'작성자와 문서를 연결한다',text:'직접 만든 예로, 문서 p1의 작성자가 연우라고 적는다. 사람과 문서를 식별하고 작성자 관계를 붙이면, 문서 제목에 사람 이름을 섞어 적는 것과 다른 구조가 생긴다.',steps:['연우와 문서 p1을 각각 식별한다.','문서 p1에서 연우로 작성자 관계를 연결한다.','같은 관계가 다른 표기에서도 유지되는지 살핀다.']},
        theory:{text:'1999년 문서 §2는 기본 모델, §5는 형식 모델을 다룬다. 해당 문서는 RDF 자체가 추론 메커니즘을 규정하지 않는다는 범위도 설명한다.'},videos:[],
        references:[{title:'RDF Model and Syntax Specification · 1999',url:refs.rdf,location:'권고 날짜·편집자는 헤더. §1의 모델/구문 구분과 추론 범위, §2 Basic RDF, §5 Formal Model.'}]
      }
    },
    {
      id:'semantic-web',year:2001,dateLabel:'2001-05 · Scientific American 글',track:'symbolic',
      title:'Semantic Web · 관계를 따라 정보를 조합하다',subtitle:'The Semantic Web · 시맨틱 웹',
      people:['Tim Berners-Lee','James Hendler','Ora Lassila'],authorNote:'Tim Berners-Lee, James Hendler, Ora Lassila가 함께 쓴 글이다. 2001년은 이 글의 출판 시점이다.',
      summary:'사람이 읽는 웹 문서에 명시적인 개념·관계를 연결해, 프로그램도 정보를 결합하도록 하자는 비전이다.',
      detail:'2001년 글은 RDF·온톨로지와 소프트웨어 에이전트의 관계를 설명한다. 예약을 조율하는 에이전트 이야기는 제안된 시나리오이며 실제 서비스의 성능 평가가 아니다.',
      question:'서로 다른 페이지의 정보가 어떤 관계인지 프로그램에 알려 주려면?',visual:'ontology',
      sources:[{title:'Berners-Lee·Hendler·Lassila · The Semantic Web',url:refs.semantic},{title:'Lassila · 저자 서지와 원문 링크',url:'https://lassila.org/publications/2001/SciAm.html'}],
      caveat:'2001년을 이 비전의 최초 착상으로 단정하지 않는다. 형식적인 의미 표현이 인간과 같은 이해나 현실 정보의 정확성을 보장하지 않는다.',related:['ontology-sharing','rdf','owl'],
      content:{
        keyIdeas:[{title:'사람이 읽는 문서를 프로그램도 연결한다',text:'예약 시간과 장소가 다른 페이지에 적혀 있다면, 어느 값이 어떤 대상을 가리키는지부터 맞춰야 한다. 글은 정보의 관계를 명시해 자동 처리를 돕는 웹을 구상했다.'},{title:'같은 말과 같은 개념을 구분한다',text:'직접 만든 예에서 “기관”이 학교를 뜻할 수도, 행정 조직을 뜻할 수도 있다. 이름이 같다는 이유만으로 합치기보다 개념의 정의와 연결 근거를 확인한다.'}],
        example:{title:'서로 다른 목록을 함께 읽는다',text:'직접 작성한 문서 목록과 연구자 목록에서 같은 사람을 연결한다고 하자. 사람의 식별자, 작성 관계, 기관 개념의 범위를 맞춰야 어느 문서를 어떤 기관과 연결할지 판단할 수 있다.'},
        theory:{text:'서지: Scientific American 284(5):34–43, May2001. 저자 공개 PDF의 온톨로지 설명과 에이전트 시나리오는 제안과 구현 결과를 구분해 읽는다.'},videos:[],
        references:[{title:'The Semantic Web · 저자 공개 PDF',url:refs.semantic,location:'PDF3의 비전 설명, PDF6–7 Ontologies, PDF7의 에이전트 시나리오.'},{title:'Ora Lassila · 출판 정보',url:'https://lassila.org/publications/2001/SciAm.html',location:'세 공동저자의 순서, Scientific American 권호·쪽수·2001년5월.'}]
      }
    },
    {
      id:'owl',year:2004,dateLabel:'2004-02-10 · W3C Recommendation',track:'symbolic',
      title:'OWL · 개념의 관계와 제약을 명시하다',subtitle:'Web Ontology Language · 웹 온톨로지 언어',
      people:['Deborah L. McGuinness','Frank van Harmelen'],organization:'W3C Web Ontology Working Group',authorNote:'표시한 두 인물은 2004년 OWL Overview 문서의 편집자다. OWL은 W3C 작업반이 개발한 권고 문서 집합이다.',
      summary:'클래스·속성과 그 관계를 형식적으로 적어, 주어진 지식에서 어떤 결론이 따라오는지 다룬다.',
      detail:'2004년 OWL은 RDF/RDFS보다 풍부한 어휘와 형식 의미론을 제공했다. 서로 다른 표현 범위를 가진 OWL Lite·DL·Full을 구분했다.',
      question:'조건을 적었다는 사실과 그 조건으로 결론을 얻는 일은 어떻게 연결될까?',visual:'ontology',
      sources:[{title:'W3C · OWL Overview · 2004-02-10',url:refs.owl}],
      caveat:'2004년 OWL과 2009년 OWL2를 구분한다. 모든 OWL 언어에서 추론의 결정 가능성이나 효율성이 보장되는 것은 아니다.',related:['ontology-sharing','rdf','sparql'],
      content:{
        keyIdeas:[{title:'선을 그리는 데서 공리를 적는 일로',text:'관계선에 이름만 붙이는 것과, 클래스 포함·동치·서로 배타적이라는 조건을 정하는 일은 다르다. OWL은 이런 표현에 형식적인 의미를 부여한다.'},{title:'언어의 표현 범위를 확인한다',text:'표현할 수 있는 내용과 추론의 계산 성질은 함께 살펴야 한다. 2004년의 Lite·DL·Full을 구분하고, 후대 OWL2 프로파일을 같은 시점으로 섞지 않는다.'}],
        example:{title:'학생이라는 사실에서 무엇을 얻을까',text:'직접 정한 Student⊑Person 공리와 Student(연우) 사실을 두면 Person(연우)이 따라온다. 개별 사실과 범주 관계를 결합해 새 분류를 얻는다.'},
        theory:{text:'OWL Overview는 소개 문서이며 형식적인 규정은 Semantics and Abstract Syntax에 있다. 임의의 절차적 규칙과 OWL의 클래스·속성 공리를 동일시하지 않는다.'},videos:[],
        references:[{title:'OWL Web Ontology Language Overview · 2004',url:refs.owl,location:'헤더·Status의 날짜, 편집자·작업반. §1.2 Why OWL, §1.3의 세 하위 언어.'}]
      }
    },
    {
      id:'sparql',year:2008,dateLabel:'2008-01-15 · W3C Recommendation',track:'symbolic',
      title:'SPARQL · 관계 그래프에 질문하다',subtitle:'SPARQL Query Language for RDF · 스파클',
      people:["Eric Prud'hommeaux",'Andy Seaborne'],organization:'W3C RDF Data Access Working Group',authorNote:'Eric Prud’hommeaux와 Andy Seaborne은 이 권고안의 편집자다. 문서 편집과 언어 전체의 발명을 구분한다.',
      summary:'RDF 그래프에서 조건에 맞는 연결 패턴을 찾아, 변수에 대응하는 값을 결과로 돌려준다.',
      detail:'2008년 권고안은 RDF 질의의 문법과 의미를 규정했다. 그래프 패턴을 결합하고 필요한 값의 조건을 지정해 결과를 구성한다.',
      question:'문서와 작성자를 함께 찾으려면 어떤 연결 패턴을 물어야 할까?',visual:'code',
      sources:[{title:'W3C · SPARQL Query Language · 2008-01-15',url:refs.sparql}],
      caveat:'그래프 패턴 질의와 별도 설정의 추론을 구분한다. SERVICE 기반 연합 질의 등 SPARQL1.1 기능은 2013년 후속 권고다.',related:['rdf','owl','ontology-sharing'],
      content:{
        keyIdeas:[{title:'값 하나보다 연결의 모양을 묻는다',text:'문서가 특정 사람과 작성 관계로 연결되고, 그 사람이 학생 유형을 갖는 패턴을 찾는다. 변수는 조건을 만족하는 대상에 대응한다.'},{title:'질의와 추론은 같은 단계가 아니다',text:'무슨 관계를 질의할지와 어떤 귀결을 미리 또는 함께 계산할지는 구분한다. 질의가 어떤 그래프와 의미 설정을 대상으로 실행되는지 확인해야 한다.'}],
        example:{title:'학생이 쓴 문서를 찾는 패턴',text:'아래는 직접 만든 질의다. Student 유형과 wrote 관계가 그래프에서 매칭되는 사람·문서를 찾는다.',steps:['?person이 Student 유형인 패턴을 적는다.','같은 ?person이 ?paper와 wrote로 연결되는 패턴을 결합한다.','두 조건을 만족하는 변수의 대응을 결과로 읽는다.']},
        theory:{text:'2008년 문서의 §2·§5를 참고한 자체 패턴이다. 명시되지 않은 유형을 자동 추론한다고 가정하지 않는다.',formula:'PREFIX ex: <https://example.org/atlas/>\nSELECT ?person ?paper WHERE {\n  ?person a ex:Student .\n  ?person ex:wrote ?paper .\n}'},videos:[],
        references:[{title:'SPARQL Query Language for RDF · 2008',url:refs.sparql,location:'날짜·편집자는 헤더. §2 Making Simple Queries, §5 Graph Patterns.'},{title:'SPARQL1.1 Federated Query · 2013',url:'https://www.w3.org/TR/2013/REC-sparql11-federated-query-20130321/',location:'2008년과 구분하는 후속 문서. SERVICE와 여러 endpoint에 걸친 질의.'}]
      }
    }
  ];
  if(!Array.isArray(events)||additions.some(a=>events.some(e=>e.id===a.id)))throw new Error('Ontology milestones require the timeline and unique event IDs.');
  events.push(...additions);
})();
