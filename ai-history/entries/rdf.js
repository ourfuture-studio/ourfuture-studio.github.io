/* RDF's1999 relationship model, with a separately dated RDF 1.1/Turtle example. */
(function(){
  'use strict';
  const standard='https://www.w3.org/TR/1999/REC-rdf-syntax-19990222/';
  const concepts='https://www.w3.org/TR/2014/REC-rdf11-concepts-20140225/';
  const turtle='https://www.w3.org/TR/2014/REC-turtle-20140225/';
  const license='https://www.w3.org/copyright/document-license-2023/';
  const ex='https://example.org/atlas/',dc='http://purl.org/dc/elements/1.1/';
  const iri=value=>({type:'iri',value});
  const literal=value=>({type:'literal',value,language:'ko'});
  const triple=(subject,predicate,object)=>({subject,predicate,object});
  const person=iri(ex+'yeonwoo'),otherPerson=iri(ex+'yeonwoo-2'),paper=iri(ex+'p1'),lab=iri(ex+'lab');
  const creator=iri(dc+'creator'),title=iri(dc+'title'),memberOf=iri(ex+'memberOf'),name=iri(ex+'name');
  const personName=literal('연우'),paperTitle=literal('관계로 읽는 지식');
  const created=triple(paper,creator,person),titled=triple(paper,title,paperTitle),named=triple(person,name,personName),member=triple(person,memberOf,lab);
  const at=(anchor,label)=>({title:'W3C RDF (1999) · '+label,url:standard+'#'+anchor});
  const modern={title:'W3C RDF 1.1 Concepts (2014) · §§1.3·1.6·1.8·3',url:concepts};
  const notice='W3C Recommendation 22 February 1999. Copyright ©1997,1998,1999 W3C (MIT, INRIA, Keio), All Rights Reserved. 원본 GIF를 변경 없이 싣고 한국어 해설은 밖에 붙였습니다.';
  window.AtlasEntries.register({
    id:'rdf',
    record:{
      title:'RDF · 지식을 관계로 적고, 함께 읽다',
      subtitle:'Resource Description Framework · 주어·술어·목적어로 이어지는 지식',
      dateLabel:'1999-02-22 · W3C Recommendation',
      people:['Ora Lassila','Ralph R. Swick'],
      authorNote:'Ora Lassila와 Ralph R. Swick은 1999년 권고안의 편집자다. W3C의 표준화 작업과 문서 편집 역할을 구분해 읽는다.',
      summary:'문서·사람·기관에 관한 지식을 주어·술어·목적어의 관계로 적는다. 공통 식별자를 쓰면 서로 다른 목록의 관계를 한 그래프로 이어 읽을 수 있다.',
      detail:'',question:'',related:['ontology-sharing','semantic-web','owl','sparql'],
      sources:[{title:'W3C · RDF Model and Syntax Specification ·1999',url:standard},{title:'W3C · RDF 1.1 Concepts and Abstract Syntax ·2014',url:concepts},{title:'W3C · RDF 1.1 Turtle ·2014',url:turtle}],
      caveat:'연표는 1999년 권고를 가리킨다. 아래의 IRI·언어 태그·집합·Turtle 표기는 2014년 RDF 1.1 문서도 참고했다. 관계와 목록은 직접 작성했으며 실제 인물·기관의 관측 자료가 아니다.'
    },
    content:{
      article:{
        question:'“누가 무엇을 만들었는가”라는 지식을,\n다른 프로그램도 같은 관계로 읽게 할 수 있을까?',
        opening:[
          '사람은 “이 문서의 작성자는 연우이고, 연우는 이 연구실에 소속되어 있다”는 두 설명을 이어 읽는다. 프로그램이 같은 연결을 따라가려면 어느 문서와 사람을 말하는지, 작성과 소속이 어떤 관계인지 구별할 수 있어야 한다.',
          'RDF의 중심 아이디어는 지식을 대상과 관계에 대한 작은 진술로 적는 것이다. 무엇에 관한 말인지 주어를 정하고, 어떤 관계인지 술어를 붙이며, 그 관계가 가리키는 목적어를 연결한다. 진술들이 대상을 공유하면 하나의 그래프가 된다.',
          '각 프로그램의 목록 모양을 같게 만드는 대신, 교환할 지식의 공통 구조를 정한다. 같은 대상을 같은 식별자로 가리키고 관계의 어휘를 공유하면, 다른 곳에서 적은 진술도 이어 읽을 발판이 생긴다. 이름의 철자만 맞추는 일과는 다른 문제다.'
        ],
        visual:{
          id:'rdf-knowledge-graph',navLabel:'문장에서 공유 그래프로',
          title:'하나의 관계를 적고, 다른 지식에 연결하다',
          caption:'문서·사람·연구실에 관한 자체 진술을 따라갑니다.1999년 표준의 관계 모형을 출발점으로 삼고, 식별자와 교환 표기는 후대 RDF 1.1·Turtle 문서와 연결합니다.',
          stages:[
            {id:'express',label:'관계를 적다',text:'하나의 진술에서 주어·술어·목적어를 골라 보고, 화살표가 어느 대상에서 어디로 향하는지 읽는다.'},
            {id:'identify',label:'대상을 구별하다',text:'화면에 같은 이름이 보이는 것과 같은 RDF 식별자를 쓰는 것을 구분한다. 이름 문자열과 그 이름을 가진 대상도 다르다.'},
            {id:'share',label:'목록을 연결하다',text:'서로 다른 두 목록에서 같은 식별자가 만나는 자리를 찾는다. 관계를 합쳐 읽되 같은 진술을 두 번 세지 않는다.'}
          ],
          terms:[
            {term:paper,label:'문서 p1',description:'이 보기에서 선택한 한 문서의 식별자'},
            {term:person,label:'연우',description:'두 목록이 함께 참조하는 사람의 식별자'},
            {term:otherPerson,label:'연우',description:'화면의 이름은 같지만 별개의 RDF 식별자'},
            {term:lab,label:'우리미래 연구실',description:'이 보기의 연구실 식별자'},
            {term:creator,label:'작성자',description:'DCMI creator 어휘를 사용한 관계'},
            {term:title,label:'제목',description:'DCMI title 어휘를 사용한 관계'},
            {term:memberOf,label:'소속',description:'이 보기에서 직접 정한 memberOf 관계'},
            {term:name,label:'이름',description:'이 보기에서 직접 정한 name 관계'},
            {term:personName,label:'“연우” · 한국어 문자열',description:'사람의 식별자가 아니라 언어 태그가 붙은 이름 값'},
            {term:paperTitle,label:'“관계로 읽는 지식”',description:'문서 제목으로 적은 한국어 문자열'}
          ],
          statements:[
            {id:'creator',label:'문서의 작성자',sentence:'문서 p1의 작성자는 연우다.',triple:created},
            {id:'title',label:'문서의 제목',sentence:'문서 p1의 제목은 “관계로 읽는 지식”이다.',triple:titled},
            {id:'membership',label:'사람의 소속',sentence:'연우는 우리미래 연구실에 소속되어 있다.',triple:member}
          ],
          identity:{
            text:'목록 A와 B가 모두 “연우”라고 적었다고 하자. 같은 식별자를 썼는지 먼저 확인한다. 두 식별자가 다르다는 사실만으로 현실의 두 사람이 다르다고 증명되는 것도 아니다.',
            cases:[
              {id:'same-iri',label:'같은 식별자',left:person,right:person,explanation:'같은 전체 IRI가 두 번 나타납니다. 이 보기에서는 같은 RDF 항으로 묶고 두 목록의 관계를 그 자리에 연결합니다.'},
              {id:'same-label',label:'이름만 같음',left:person,right:otherPerson,explanation:'화면의 이름은 둘 다 연우이지만 전체 IRI는 다릅니다. 이름만 보고 자동으로 합치지 않으며, 현실에서 같은 대상인지는 추가 근거가 필요합니다.'},
              {id:'iri-literal',label:'대상과 이름 값',left:person,right:personName,explanation:'사람을 가리키는 IRI와 “연우”라는 한국어 문자열은 다른 RDF 항입니다. 이름 값만으로 특정 사람의 식별자가 되지는 않습니다.'}
            ]
          },
          sharing:{
            text:'문서 목록에는 작성자와 제목이 있고, 소속 목록에는 사람과 연구실의 관계가 있다. 두 목록이 연우를 같은 식별자로 가리키면, 문서에서 작성자를 거쳐 연구실까지 관계를 따라갈 수 있다.',
            graphs:[
              {id:'documents',label:'A · 문서 목록',triples:[created,titled,named]},
              {id:'memberships',label:'B · 소속 목록',triples:[member,named]}
            ],
            focus:person,question:'이 문서의 작성자는 어느 연구실과 연결되는가?',
            explanation:'문서 p1 → 작성자 연우 → 소속 연구실의 두 관계를 이어 읽습니다. 입력 진술 5개 중 이름 진술 1개가 중복되어 고유 진술은 4개입니다. 관계를 합치는 일은 새 소속 사실을 추론해 만들어 내는 일과 구분합니다.'
          },
          syntax:{
            text:'같은 관계를 전체 IRI로 적거나 접두어로 줄여 적어 봅니다. 접두어는 전체 IRI를 줄이는 표기이며 관계의 뜻을 새로 만드는 이름이 아닙니다. 이 패널은 2014년 RDF 1.1 Turtle을 참고했습니다.',
            prefixes:[{label:'ex',iri:ex},{label:'dc',iri:dc}],
            source:{title:'W3C · RDF 1.1 Turtle (2014) · §§2.1–2.5',url:turtle}
          },
          evidence:[
            {id:'simple',file:'rdf-1999-simple-statement.gif',title:'공식 표준 Fig.1 · 하나의 진술',caption:'문서 자원에서 Creator 관계를 따라 이름 문자열로 향한다. 타원은 자원, 사각형은 문자열 값이다.',scope:'1999년 §2.1.1의 원그림이다. 이 그림의 목적어는 사람의 식별자가 아니라 이름 리터럴이다.',source:at('basic','§2.1.1 · Figure 1'),credit:{title:'W3C · Fig.1 원본 GIF·문서 상태',url:standard,note:notice}},
            {id:'identified',file:'rdf-1999-identified-creator.gif',title:'공식 표준 Fig.3 · 이름에서 식별된 대상으로',caption:'작성자를 식별자로 가리킨 뒤 그 자원에 이름과 전자우편 값을 덧붙인다. 같은 대상에 관한 여러 진술이 이어진다.',scope:'직원 식별자 85740은 표준의 예시에 쓰인 URI다. Fig.1의 이름 리터럴과 Fig.3의 식별된 자원을 구별해 읽는다.',source:at('basic','§2.1.1 · Figure 3'),credit:{title:'W3C · Fig.3 원본 GIF·문서 상태',url:standard,note:notice}}
          ],
          scope:'표시한 진술은 직접 작성했다. IRI와 리터럴의 정확한 항 동일성을 비교하고 트리플 집합을 합친다. 빈 노드·임의 문서 파싱·RDFS/OWL 추론은 이 보기의 범위에 포함하지 않는다. 목록별 색과 출처 표시는 화면의 자료 관리 정보다.',
          source:at('basic','§§2.1–2.2 · 관계 모형과 교환 구문')
        },
        takeaway:{
          title:'지식이 만나는 자리는, 같은 대상을 가리키는 관계다',
          text:'문서와 사람, 사람과 기관의 관계를 각각 적어도 같은 식별자를 공유하면 연결할 수 있다. RDF가 마련한 것은 그 관계를 함께 표현하고 교환할 구조다. 어떤 관계를 쓸지, 누구를 같은 대상으로 볼지, 적힌 주장이 현실에 맞는지는 별도로 확인해야 한다.'
        },
        technical:{
          title:'표준의 판본과 표현 범위를 더 읽기',
          paragraphs:[
            '1999년 권고는 자원·속성·진술을 정의하고, 데이터 모형과 XML 교환 구문을 나눈다(§§1–2). 문서는 특정 분야의 어휘 전체나 추론 메커니즘을 규정하지 않는다. 본문 §2.1의 주어·술어·목적어 역할과 화살표 방향을 이 카드의 출발점으로 삼았다.',
            '1999년 §5의 형식 튜플은 {predicate,subject,object} 순서로 인쇄되어 있다. 오늘 흔히 쓰는 S-P-O 표기와 혼동하지 않는다. 이 카드의 순서는 주어·술어·목적어이며 RDF 1.1 Concepts(2014)§3.1의 관례와도 일치한다.',
            'RDF 1.1 Concepts는 주어에 IRI 또는 빈 노드, 술어에 IRI, 목적어에 IRI·리터럴·빈 노드를 허용한다. IRI의 동일성은 문자열 비교로 판단하며 임의로 대소문자·슬래시를 정규화하지 않는다(§§3.1–3.2). 이 보기의 입력은 절대 IRI와 리터럴로 한정한다.',
            '접두어와 진술을 적는 순서는 문서를 쓰기 위한 선택이다. 실제 그래프는 트리플의 집합이므로 같은 진술을 반복해서 적어도 별개의 지식 두 개로 세지 않는다(RDF 1.1 Concepts §§1.5–1.8). 두 문서를 합칠 때 빈 노드가 있으면 식별자 범위도 다뤄야 하므로, 이 보기는 빈 노드가 없는 예제를 사용한다.',
            'IRI가 다르다는 것은 RDF 항이 다르다는 뜻이며 현실의 대상이 반드시 다르다는 주장이 아니다. IRI와 같은 철자의 문자열 값도 서로 다른 항이다. 그래프를 합치는 과정에서 이름 유사도나 같은 페이지로의 이동만으로 대상을 합치지 않는다.',
            'Turtle은 RDF를 적는 구체적인 문법 중 하나다. 이 패널의 전체 IRI와 접두어 표기는 RDF 1.1 Turtle(2014)을 참고했으며 1999년에 Turtle이 권고되었다고 소급하지 않는다. creator와 title은 DCMI의 어휘를 사용하고 name과 memberOf는 예시를 위해 정의했다.',
            '화면이 계산하는 것은 진술의 항 동일성과 합집합, 같은 식별자에 연결된 관계다. 실제 외부 목록을 검색하거나 임의의 자연어를 RDF로 변환하지 않는다. 관계가 없다는 이유로 그 관계가 거짓이라고 판정하지도 않는다. RDFS·OWL의 추가 귀결과 SPARQL 질의는 이어 볼 연구에서 구분한다.'
          ],
          formula:'자체 진술의 S-P-O\n\n문서 p1 — 작성자 → 연우\n연우 — 소속 → 우리미래 연구실\n\n(subject, predicate, object)\n\nA의 관계 ∪ B의 관계 = 공유 그래프\n같은 트리플 반복 ≠ 고유 진술 증가\n같은 화면 이름 ≠ 자동 동일 대상\n\n1999년 §5의 튜플 인쇄 순서는 {predicate, subject, object}'
        }
      },
      keyIdeas:[
        {title:'지식을 대상 사이의 관계로 적는다',text:'진술 하나는 주어·술어·목적어로 나뉜다. 주어에서 목적어로 향하는 관계들이 대상을 공유하면 그래프를 이룬다.'},
        {title:'이름 값과 대상의 식별자를 구별한다',text:'사람을 가리키는 식별자와 “연우”라는 문자열 값은 서로 다른 역할을 한다. 여러 목록의 이름이 같다는 이유만으로 대상을 합치지 않는다.'},
        {title:'파일의 모양보다 교환할 관계를 공유한다',text:'표기가 달라도 같은 트리플을 표현할 수 있다. 두 목록이 같은 식별자를 쓰면 각각 적은 관계를 그 자리에서 이어 읽을 수 있다.'}
      ],
      videos:[],
      references:[
        {title:'W3C · RDF Model and Syntax Specification ·1999-02-22',url:standard,location:'헤더의 권고 날짜·편집자. §1의 공유 목표·모형/구문·추론 범위, §2.1의 세 역할과 Fig.1·3, §2.2의 XML 표기, §5의 {pred,sub,obj} 인쇄 순서.'},
        {title:'W3C · RDF 1.1 Concepts and Abstract Syntax ·2014-02-25',url:concepts,location:'§§1.1·1.3·1.6·1.8의 그래프·식별·여러 그래프·교환 문서. §§3.1–3.4의 항과 동일성. 후대 의미와 용어를 참고한 자체 보기.'},
        {title:'W3C · RDF 1.1 Turtle ·2014-02-25',url:turtle,location:'§§2.1–2.5의 트리플, 접두어와 전체 IRI, 리터럴 표기.1999년의 교환 문법으로 소급하지 않는다.'},
        {title:'DCMI · Creator 어휘',url:'https://www.dublincore.org/specifications/dublin-core/dcmi-terms/elements11/creator/',location:'자체 예시에 사용한 creator의 식별자와 정의. RDF 자체가 정한 모든 분야의 관계 목록과 구분한다.'},
        {title:'DCMI · Title 어휘',url:'https://www.dublincore.org/specifications/dublin-core/dcmi-terms/elements11/title/',location:'자체 예시에 사용한 title의 식별자와 정의.'},
        {title:'W3C · 원그림 문서 이용 조건',url:license,location:'원본 문서 링크·기존 저작권 표기·문서 상태를 함께 제공한다. 두 GIF의 픽셀과 내부 글자는 수정하지 않았다.'}
      ]
    }
  });
})();
