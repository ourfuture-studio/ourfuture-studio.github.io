/* SPARQL2008: authored RDF questions, bindings and graph-pattern evidence. */
(function(){
  'use strict';
  const standard='https://www.w3.org/TR/2008/REC-rdf-sparql-query-20080115/';
  const results='https://www.w3.org/TR/2008/REC-rdf-sparql-XMLres-20080115/';
  const protocol='https://www.w3.org/TR/2008/REC-rdf-sparql-protocol-20080115/';
  const uses='https://www.w3.org/TR/2005/WD-rdf-dawg-uc-20050325/';
  const later='https://www.w3.org/TR/2013/REC-sparql11-overview-20130321/';
  const rdf2004='https://www.w3.org/TR/2004/REC-rdf-concepts-20040210/';
  const schema2004='https://www.w3.org/TR/2004/REC-xmlschema-2-20041028/';
  const ex='https://example.org/atlas/sparql/',xsd='http://www.w3.org/2001/XMLSchema#';
  const iri=value=>({type:'iri',value}),variable=value=>({type:'variable',value});
  const integer=value=>({type:'literal',value:String(value),datatype:xsd+'integer'});
  const t=(id,subject,predicate,object)=>({id,subject,predicate,object});
  const personA=iri(ex+'yeonwoo'),personB=iri(ex+'minji');
  const papers=[1,2,3,4].map(n=>iri(ex+'p'+n));
  const wrote=iri(ex+'wrote'),topic=iri(ex+'topic'),year=iri(ex+'year'),homepage=iri(ex+'homepage');
  const ai=iri(ex+'AIConcept'),biology=iri(ex+'Biology'),home=iri('https://example.org/yeonwoo/');
  const vPerson=variable('person'),vPaper=variable('paper'),vYear=variable('year'),vHome=variable('homepage');
  const triples=[
    t('wrote-p1',personA,wrote,papers[0]),t('wrote-p2',personA,wrote,papers[1]),
    t('wrote-p3',personB,wrote,papers[2]),t('wrote-p4',personB,wrote,papers[3]),
    t('topic-p1',papers[0],topic,ai),t('topic-p2',papers[1],topic,ai),
    t('topic-p3',papers[2],topic,ai),t('topic-p4',papers[3],topic,biology),
    t('year-p1',papers[0],year,integer(2008)),t('year-p2',papers[1],year,integer(2012)),
    t('year-p3',papers[2],year,integer(2018)),t('year-p4',papers[3],year,integer(2012)),
    t('homepage-yeonwoo',personA,homepage,home)
  ];
  const at=(anchor,title)=>({title:'W3C SPARQL (2008) · '+title,url:standard+'#'+anchor});
  window.AtlasEntries.register({
    id:'sparql',
    record:{
      title:'SPARQL · 관계의 모양으로 묻고, 연결에서 답을 찾다',
      subtitle:'SPARQL Query Language for RDF · 스파클 · 패턴과 변수의 대응',
      dateLabel:'2008-01-15 · W3C Recommendation',
      people:["Eric Prud'hommeaux",'Andy Seaborne'],
      organization:'W3C RDF Data Access Working Group',
      authorNote:'Eric Prud’hommeaux와 Andy Seaborne은 2008년 질의 언어 권고안의 편집자다. W3C RDF Data Access Working Group의 표준화 작업을 두 사람의 단독 발명으로 귀속하지 않는다.',
      summary:'찾으려는 대상을 변수로 두고 관계의 패턴을 적는다. RDF 그래프에서 그 패턴을 만족하는 변수의 대응을 찾아 질문의 답으로 돌려준다.',
      detail:'',question:'',related:['rdf','owl','semantic-web','ontology-sharing'],
      sources:[
        {title:'W3C · SPARQL Query Language for RDF · 2008-01-15',url:standard},
        {title:'W3C · SPARQL Query Results XML Format · 2008-01-15',url:results}
      ],
      caveat:'2008년 질의 언어의 패턴 매칭과 결과 대응을 다룬다. 사람·문서·주제 자료는 직접 작성했으며, 자연어 해석이나 자동 OWL 추론의 실행 결과가 아니다.'
    },
    content:{
      article:{
        question:'“AI 주제를 다룬 문서를 누가 썼는가?”\n이 질문을, 관계의 모양으로 적을 수 있을까?',
        opening:[
          '문서 목록에 작성자가 있고, 다른 기록에는 각 문서의 주제가 있다고 하자. “AI 주제를 다룬 문서를 누가 썼는가?”에 답하려면, 작성자에서 문서로 가는 관계와 그 문서에서 AI 주제로 가는 관계를 함께 찾아야 한다. 글에서 ‘AI’라는 단어가 보이는지만 확인해서는 두 관계가 같은 문서를 가리키는지 알 수 없다.',
          'SPARQL의 발상은 찾으려는 관계의 모양을 먼저 적고, 아직 모르는 대상은 변수로 남기는 것이다. 프로그램은 그래프에서 그 빈자리를 채울 대상을 찾는다. 같은 변수가 여러 자리에 나타나면 같은 RDF 항으로 채워야 한다. 이렇게 명시한 지식의 연결에서 질문에 맞는 답을 찾게 하려 했다.',
          '아래에는 두 사람이 네 문서를 작성한 작은 그래프를 직접 구성했다. 질문의 패턴을 관계에 겹쳐 보고, 문서와 작성자의 대응이 어떻게 이어지는지 따라간다. 연도 조건을 더하거나 홈페이지를 선택 정보로 바꾸면, 어떤 답이 남고 어떤 값이 비어 있는지도 확인할 수 있다.'
        ],
        visual:{
          id:'sparql-pattern-query',navLabel:'패턴에서 답으로',
          title:'질문의 빈자리를, 그래프의 연결로 채우다',
          caption:'W3C 2008년 표준의 패턴·변수 대응·결과 정의를 바탕으로 구성한 시각화입니다. 직접 작성한 그래프에서 질문과 일치한 관계, 중간 대응, 최종 답의 근거를 연결해 봅니다.',
          stages:[
            {id:'match',label:'질문의 모양을 적다',text:'어떤 관계를 찾는지 패턴을 고른다. 변수의 빈자리에 어떤 RDF 항이 들어갈 수 있는지 그래프와 함께 읽는다.'},
            {id:'join',label:'같은 대상을 잇다',text:'여러 패턴이 공유하는 변수를 맞춰 결합한다. 같은 문서가 이어지는지 확인하고, 연도 조건을 만족하는 대응만 남긴다.'},
            {id:'answer',label:'답의 모양을 정하다',text:'필수 관계와 선택 관계를 구분하고, 돌려받을 변수를 고른다. 열을 줄일 때 생기는 중복과 DISTINCT의 차이를 살핀다.'}
          ],
          triples,
          terms:[
            {term:personA,label:'연우'},{term:personB,label:'민지'},
            ...papers.map((term,i)=>({term,label:'문서 p'+(i+1)})),
            {term:wrote,label:'작성했다'},{term:topic,label:'주제'},{term:year,label:'연도'},
            {term:homepage,label:'홈페이지'},{term:ai,label:'AI 주제'},{term:biology,label:'생물학 주제'},
            {term:home,label:'연우의 홈페이지'},{term:integer(2008),label:'2008'},
            {term:integer(2012),label:'2012'},{term:integer(2018),label:'2018'}
          ],
          patterns:[t('wrote',vPerson,wrote,vPaper),t('topic',vPaper,topic,ai),t('year',vPaper,year,vYear)],
          initial:{yearEnabled:false,minYear:2010,topic:'ai',homepage:'off',projection:'detail',distinct:false},
          ui:{
            topicPredicate:topic,
            topicChoices:[{id:'ai',label:'AI 주제',term:ai},{id:'biology',label:'생물학 주제',term:biology},{id:'any',label:'어떤 주제든'}],
            yearVariable:'year',yearChoices:[2008,2010,2015,2020],
            homepagePattern:t('homepage',vPerson,homepage,vHome),
            projections:[{id:'detail',label:'사람·문서·연도',select:['person','paper','year']},{id:'person',label:'사람만',select:['person']}]
          },
          evidence:[
            {
              id:'simple-query',title:'표준의 출발점 · 제목 자리를 변수로 남기다',
              formula:'SELECT ?title\nWHERE {\n  <http://example.org/book/book1>\n  <http://purl.org/dc/elements/1.1/title> ?title .\n}',
              caption:'원문 §2.1은 한 책의 제목 자리를 ?title로 두고, 그 자리에 들어갈 값을 찾는다. 이 카드의 질문은 같은 생각을 작성자·문서·주제로 이어지는 여러 패턴으로 확장했다.',
              source:at('WritingSimpleQueries','§2.1 Writing a Simple Query')
            },
            {
              id:'compatible-bindings',title:'형식 정의 · 공유 변수의 대응이 같아야 한다',
              formula:'호환 조건: 모든 공유 변수 v에서 μ₁(v) = μ₂(v)\n\nJoin: 호환되는 두 대응을 하나로 결합\nFilter: 조건이 참인 대응만 유지',
              caption:'§12.1.6의 solution mapping, §12.3의 호환 조건과 §12.4의 Join·Filter를 한국어로 재표현했다. 이 보기에서는 작성 관계의 ?paper와 주제·연도 관계의 ?paper가 같은 RDF 항에 대응해야 한다.',
              source:at('BasicGraphPattern','§§12.1.6·12.3 대응의 호환 · §12.4 SPARQL Algebra')
            },
            {
              id:'optional-projection',title:'결과 정의 · 대응을 남기고, 필요한 열을 고르다',
              formula:'OPTIONAL: 일치하는 값이 없으면 해당 변수는 미결합\n\nSELECT ?person → 연우 / 연우 / 민지\nSELECT DISTINCT ?person → 연우 / 민지',
              caption:'§6.1과 §§9.2–9.3.1을 기본 질문에 적용한 자체 결과 표현이다. AI 주제를 고르고 연도 필터·홈페이지 조회를 끈 경우, 문서 열을 숨기면 연우의 대응이 두 번 나타난다. DISTINCT는 선택한 모든 변수의 대응이 같은 행을 한 번만 남긴다.',
              source:at('modDistinct','§6.1 OPTIONAL · §§9.2–9.3.1 Projection / DISTINCT')
            }
          ],
          source:at('BasicGraphPatterns','§5.1 Basic Graph Patterns · §12 형식 정의'),
          scope:'직접 작성한 RDF 그래프에서 패턴이 일치한 자리와 변수의 대응을 계산한다. 결과 행은 해당 질문과 그래프에 대한 답이며, 그래프에 없는 사실이나 현실 지식의 완전성을 보장하지 않는다.'
        },
        takeaway:{
          title:'질문은 관계의 패턴이고, 답은 그 패턴을 만족하는 변수의 대응이다',
          text:'같은 문서를 가리키는 연결들을 맞추면 작성자·주제·연도를 함께 찾을 수 있다. 필수 관계가 모두 맞는 대응을 남기고, FILTER는 조건에 맞는 대응을 고른다. OPTIONAL은 일치하지 않는 값을 미결합으로 남긴다. 어떤 열을 답으로 고르는지에 따라 중복이 생기므로, 질문의 조건과 결과의 모양을 함께 읽어야 한다.'
        },
        technical:{
          title:'2008년 표준의 패턴과 결과를 더 읽기',
          paragraphs:[
            'RDF·OWL과 이어 읽기: RDF는 관계를 기록하는 구조를, OWL은 정의와 사실에서 따라오는 논리적 귀결을 다룬다. 이 카드는 주어진 그래프에서 질문 패턴을 만족하는 대응을 찾는다. 예를 들어 하위 개념이라는 별도 사실이 있어도, 이 보기에서 OWL 추론을 자동으로 실행해 질의의 답을 늘리지는 않는다. SPARQL의 질의와 별도 의미 설정에 따른 추론을 구분한다.',
            '질문의 표현: 기본 그래프 패턴(Basic Graph Pattern, BGP)은 변수도 들어갈 수 있는 트리플 패턴들의 집합이다. ?person과 ?paper는 사람 이름을 검색하는 문자열이 아니라, 답에서 RDF 항으로 채울 자리다. 변수는 주어·술어·목적어 자리에 올 수 있다. 같은 변수는 한 대응 안에서 같은 항을 가리켜야 한다.',
            '결합의 기준: Join은 공유 변수에서 값이 같은 대응끼리 결합한다. 표시 이름이 같다는 이유로 서로 다른 IRI를 합치지 않는다. 이 보기의 그래프는 중복 트리플을 한 번만 갖는 집합으로 다루지만, 여러 관계 조합이 만들어 낸 결과의 대응은 중복될 수 있다. 그래프의 진술 수와 질의 결과의 행 수는 다른 개수다.',
            '값의 조건: FILTER(?year >= 2010)는 ?year에 대응한 정수 값이 조건을 충족하는지 검사한다. RDF 항의 같은지 여부와 숫자의 크기 비교는 구분한다. 표준 §11에서 필터는 식이 참인 대응만 남기며, 변수 미결합이나 적절하지 않은 자료형으로 발생한 식의 오류도 그 필터를 통과하지 못한다. 이 보기의 연도 자료는 xsd:integer로 직접 적었다. 예를 들어 “02008”과 “2008”은 같은 정수 값이지만 리터럴의 어휘형은 다르다. RDF 자료형 해석은 XML 검증의 공백 정규화를 다시 수행하지 않으므로, 이 보기에서도 숫자 앞뒤의 공백을 임의로 지우지 않는다.',
            '선택 관계와 미결합: OPTIONAL은 홈페이지 패턴과 맞는 값이 있으면 대응을 넓힌다. 여러 값이 일치하면 그만큼 대응이 생길 수 있다. 일치하지 않으면 기존 대응을 남기되 ?homepage는 미결합으로 둔다. 이는 그 사람에게 현실의 홈페이지가 없다는 결론이 아니다. 결과 표의 미결합 표시는 빈 문자열 리터럴이나 별도의 RDF 값도 아니다. Results XML §2.3.1에서도 미결합 변수에는 binding 요소를 넣지 않는다.',
            '어떤 값을 답으로 받을까: SELECT는 결과에 남길 변수들을 고른다. 문서까지 고르면 연우의 두 문서는 다른 행이지만, 사람만 남기면 같은 사람의 대응이 반복된다. DISTINCT는 선택한 전체 변수의 대응을 기준으로 중복을 제거한다. 홈페이지 열을 함께 고르는 경우에는 그 값까지 포함해 비교해야 한다.',
            '화면의 진행 순서와 표준의 의미: 이 보기는 각 패턴의 일치 결과를 차례로 결합해 보여 준다. 이를 모든 SPARQL 처리기가 따라야 하는 내부 실행 순서로 규정하지 않는다. ORDER BY가 없는 질의의 답 순서는 표준이 특정하지 않는다. 화면의 행 배치는 관계와 근거를 읽기 위한 한 표시 순서다.',
            '이 보기의 계산 범위: 정해진 트리플 패턴 목록, 공유 변수의 결합, 정수 임계값 필터, 한 선택 패턴 묶음, 투영과 중복 제거를 다룬다. 필터는 필수 패턴 묶음에 적용한 다음 OPTIONAL을 결합하며, 표시한 질의도 이 묶음을 드러낸다. 임의 SPARQL 문자열의 해석, 전체 자료형 체계, 익명 노드, 연합 질의, 원격 endpoint 호출이나 자연어 질문의 자동 변환은 실행하지 않는다.',
            '언어·결과·통신의 구분: 같은 날 권고된 Query Language는 질문의 구문과 의미를, Query Results XML Format은 변수 대응·불리언 결과의 교환 형식을, Protocol은 질의를 서비스로 전달하고 답을 받는 통신을 다룬다. 이 카드의 표와 근거는 로컬 계산 결과이며, 원격 서비스에 보낸 요청의 응답으로 표시하지 않는다.',
            '2008년과 후속 표준: 이 연표의 날짜는 2008-01-15 권고안이다. 2013년 SPARQL 1.1에서 다루는 집계·속성 경로·연합 질의·갱신 기능을 2008년 카드의 실행 기능으로 섞지 않는다. 2008년 질의 언어 본문에서 설명용 원그림은 확인하지 못했다. 화면의 그래프와 대응 그림은 공식 예시와 정의를 참고해 이 카드를 위해 직접 구성했다.'
          ],
          formula:'직접 작성한 그래프에 대한 질의\n\nPREFIX ex: <https://example.org/atlas/sparql/>\nSELECT ?person ?paper ?year ?homepage\nWHERE {\n  {\n    ?person ex:wrote ?paper .\n    ?paper ex:topic ex:AIConcept .\n    ?paper ex:year ?year .\n    FILTER(?year >= 2010)\n  }\n  OPTIONAL { ?person ex:homepage ?homepage . }\n}\n\n기본 패턴의 대응 → 정수 조건 → 선택 관계의 결합\n→ 선택한 변수만 남김 → DISTINCT를 골랐다면 중복 제거\n\n표의 미결합: 그 패턴에서 변수에 대응한 RDF 항이 없음'
        }
      },
      keyIdeas:[
        {title:'모르는 대상을 변수로 남겨 질문한다',text:'찾는 관계의 구조를 적고, 답으로 받을 대상의 자리를 변수로 둔다. 그래프의 RDF 항을 그 자리에 대응시켜 질문을 만족하는 연결을 찾는다.'},
        {title:'같은 변수로 여러 관계를 묶는다',text:'작성 관계가 가리킨 문서와 주제 관계의 문서가 같은 항인지 맞춘다. 서로 다른 패턴의 대응이 이 공통 자리에서 이어진다.'},
        {title:'필수 조건과 결과의 모양을 구분한다',text:'필수 관계·FILTER·OPTIONAL은 어떤 대응이 남는지를 정하고, SELECT·DISTINCT는 그 대응을 어떤 열과 중복으로 돌려줄지 정한다.'}
      ],
      videos:[],
      references:[
        {title:'W3C · SPARQL Query Language for RDF · 2008',url:standard,location:'표제부: 2008-01-15, 편집자 Eric Prud’hommeaux·Andy Seaborne. Status: RDF Data Access Working Group과 표준화 작업.'},
        {title:'W3C · SPARQL · 패턴과 변수의 출발점',url:standard+'#WritingSimpleQueries',location:'§2.1 책 제목 질의, §2.2 여러 대응, §4.1.3 변수, §5.1 기본 그래프 패턴.'},
        {title:'W3C · SPARQL · 대응의 호환과 결합',url:standard+'#defn_sparqlSolutionMapping',location:'§12.1.6 Solution Mapping, §12.3 호환 조건, §12.3.1 기본 패턴 매칭, §12.4 Join의 의미와 중복 개수.'},
        {title:'W3C · SPARQL · 값의 조건',url:standard+'#termConstraint',location:'§3 RDF Term Constraints, §3.2 숫자 조건, §11.2 필터의 오류 처리, §11.3 연산자와 자료형.'},
        {title:'W3C · SPARQL · 선택 관계와 미결합',url:standard+'#OptionalMatching',location:'§6.1 선택 패턴, §6.2 필터의 위치, §12.4 LeftJoin. 선택 패턴이 맞지 않아도 왼쪽의 대응은 남는다.'},
        {title:'W3C · SPARQL · 투영과 DISTINCT',url:standard+'#modProjection',location:'§9.2 Projection, §9.3 결과의 중복, §9.3.1 DISTINCT. §9.1 ORDER BY 없이 특정 순서가 보장되지 않음.'},
        {title:'W3C · SPARQL Query Results XML Format · 2008',url:results+'#vb-results',location:'§2.3.1: 결과 행의 변수 대응과 RDF 항, 미결합 변수의 binding 요소 생략. 이 보기는 표로 표시하며 XML 직렬화를 구현하지 않는다.'},
        {title:'W3C · SPARQL Protocol for RDF · 2008',url:protocol,location:'Abstract와 §2: 질의를 처리 서비스로 전달하고 결과를 받는 통신. 이 카드의 로컬 계산과 구분한다.'},
        {title:'W3C · RDF Concepts · 2004 자료형',url:rdf2004+'#section-Datatypes',location:'§5 Datatypes: 어휘 공간·값 공간·대응. XML 검증 중 whiteSpace 정규화와 RDF 자료형 해석을 구분한다.'},
        {title:'W3C · XML Schema Datatypes · 2004 정수',url:schema2004+'#integer',location:'§3.3.13.1 integer의 어휘 표현: 선택적인 부호와 숫자들. 값이 같아도 원래 RDF 어휘형이 같다는 뜻은 아니다.'},
        {title:'W3C · RDF Data Access Use Cases · 2005 초안',url:uses+'#u2.1',location:'§2.1 주소 찾기, §2.10 학습 자원 찾기 등 관계로 여러 정보를 함께 찾는 당시 요구. Working Draft이며 2008년 권고와 구분한다.'},
        {title:'W3C · SPARQL 1.1 Overview · 2013 후속 표준',url:later,location:'§2 집계·속성 경로 등 추가 기능, §4 연합 질의, §6 Update. 2008년 카드의 범위와 구분하기 위한 후속 출처.'}
      ]
    }
  });
})();
