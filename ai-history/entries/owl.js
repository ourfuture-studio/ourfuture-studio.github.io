/* OWL2004 definitions and an authored seminar example; no OWL2 features. */
(function(){
  'use strict';
  const overview='https://www.w3.org/TR/2004/REC-owl-features-20040210/';
  const guide='https://www.w3.org/TR/2004/REC-owl-guide-20040210/';
  const reference='https://www.w3.org/TR/2004/REC-owl-ref-20040210/';
  const semantics='https://www.w3.org/TR/2004/REC-owl-semantics-20040210/';
  const direct=semantics+'direct.html';
  const uses='https://www.w3.org/TR/2004/REC-webont-req-20040210/';
  const at=(url,anchor,title)=>({title,url:url+'#'+anchor});
  window.AtlasEntries.register({
    id:'owl',
    record:{
      title:'OWL · 개념을 정의하고, 사실에서 결론을 이끌다',
      subtitle:'Web Ontology Language · 개념·관계의 논리와 추론',
      dateLabel:'2004-02-10 · W3C Recommendation',
      people:['Deborah L. McGuinness','Frank van Harmelen'],
      organization:'W3C',
      authorNote:'Deborah L. McGuinness와 Frank van Harmelen은 2004년 Overview의 편집자다. OWL은 W3C Web Ontology Working Group이 개발한 표준이며, 두 사람의 단독 발명으로 귀속하지 않는다.',
      summary:'개념이 성립하는 조건과 개념 사이의 관계를 논리로 명세하고, 개별 사실에서 분류·관계에 관한 결론을 추론하도록 했다.',
      detail:'',question:'',related:['ontology-sharing','rdf','semantic-web','sparql','deepproblog','nscl'],
      sources:[
        {title:'W3C · OWL Overview · 2004-02-10',url:overview},
        {title:'W3C · OWL Guide · 2004-02-10',url:guide},
        {title:'W3C · OWL Semantics and Abstract Syntax · 2004-02-10',url:semantics}
      ],
      caveat:'2004년 OWL의 정의와 의미론을 다룬다. 세미나·주제 자료와 연결 그림은 이 카드를 위해 직접 작성했으며, 후대 OWL2의 기능과 구분한다.'
    },
    content:{
      article:{
        question:'개념의 뜻을 논리로 적으면,\n적지 않은 결론도 이끌어낼 수 있을까?',
        opening:[
          '어떤 세미나에 AI 주제가 하나 있다고 하자. 이 사실로 그 세미나가 AI 주제를 포함한다고 말할 수 있다. 그렇다면 AI 주제만 다룬다고도 말할 수 있을까? 두 문장의 차이를 프로그램이 다루려면, ‘하나라도 있다’와 ‘모두 그렇다’를 다른 조건으로 표현해야 한다.',
          'OWL의 구상은 개념과 관계의 뜻을 논리적으로 명세하고, 개별 대상에 관해 적은 사실을 그 정의와 함께 추론하는 것이다. 하위 개념의 대상을 상위 개념으로 분류하거나, 여러 조건을 충족한 대상을 새 개념에 포함할 수 있다. 이렇게 분류와 판단의 기준을 명시하고 그 기준에서 결론을 이끌어내는 방식으로 지적인 정보 처리를 구현하려 했다.',
          '2004년 Guide는 메뉴와 취향에 맞는 와인을 찾는 에이전트 이야기로 시작한다. 와인의 종류·제조자·음식 사이의 관계를 정의해 두면 검색어만으로는 드러나지 않는 조건을 다룰 수 있다는 구상이다. 아래에서는 같은 논리를 직접 만든 세미나와 주제에 적용하고, 결론의 근거와 아직 단정할 수 없는 경우를 함께 읽는다.'
        ],
        visual:{
          id:'owl-logical-definitions',navLabel:'정의에서 결론으로',
          title:'하나라도 AI인가, 모두 AI인가',
          caption:'W3C 2004년 표준의 정의를 바탕으로 재구성한 그림입니다. 직접 작성한 세미나·주제 사실을 바꾸며, 정의·추론 근거·추가로 가능한 상황을 연결해 봅니다.',
          stages:[
            {id:'define',label:'개념을 정의하다',text:'‘AI 주제를 포함한 세미나’와 ‘AI 주제만 다루는 세미나’를 서로 다른 논리식으로 적는다. 정의가 양방향인지, 필요한 조건만 적었는지도 구분한다.'},
            {id:'infer',label:'사실에서 결론으로',text:'세미나와 주제의 기록을 바꾸고, 어느 정의와 사실이 분류를 뒷받침하는지 따라간다. 빠진 분류가 논리적으로 따라오는 자리도 찾는다.'},
            {id:'compare',label:'다른 상황도 가능한가',text:'같은 기록과 양립하는 다른 상황을 살핀다. 미확정인 결론과 서로 모순되는 전제를 구분한다.'}
          ],
          initialFacts:['seminar','topic-link','symbolic-topic'],
          initialDefinition:'equivalent',
          evidence:[
            {
              id:'wine',title:'Guide의 와인 예시 · 하나 이상과 전부',
              formula:'∃ hasMaker.Winery\n와이너리인 제조자가 하나 이상 있다.\n\n∀ hasMaker.Winery\n제조자가 있다면 모두 와이너리다.',
              caption:'Guide §3.4.1의 Wine·hasMaker·Winery 예시를 기호와 한국어로 재구성했다. ∀ 조건만으로 제조자의 존재가 보장되지 않고, ∃ 조건은 다른 종류의 제조자까지 배제하지 않는다.',
              source:at(guide,'term_restriction_class','W3C OWL Guide (2004) · §3.4.1 allValuesFrom, someValuesFrom')
            },
            {
              id:'restrictions',title:'형식 의미론 · 관계의 대상을 양화한다',
              formula:'x ∈ ∃R.C  ⇔  ∃y: R(x,y) ∧ C(y)\n\nx ∈ ∀R.C  ⇔  ∀y: R(x,y) → C(y)',
              caption:'규범 문서 §3.2의 EC Extension Table을 익숙한 집합·논리 표기로 다시 썼다. R은 관계, C는 개념, x와 y는 개별 대상이다. 이 의미를 hasTopic과 AIConcept에 대응했다.',
              source:at(direct,'3.2','W3C OWL Semantics (2004) · §3.2 EC Extension Table')
            },
            {
              id:'class-axioms',title:'형식 의미론 · 개념 사이의 조건',
              formula:'A ⊑ B : A의 모든 대상은 B에도 속한다.\nA ≡ B : A와 B에 속하는 대상이 같다.\nA ⊓ B : A와 B를 모두 충족한다.\nA ⊓ B = ∅ : 둘에 동시에 속할 수 없다.',
              caption:'§3.2의 교집합과 §3.3 Axiom Table의 SubClassOf·EquivalentClasses·DisjointClasses를 재표현했다. 그림의 기호는 원문 도판을 복제한 것이 아니라, 이 정의들을 연결하기 위해 직접 구성했다.',
              source:at(direct,'3.3','W3C OWL Semantics (2004) · §§3.2–3.3 교집합과 개념 공리')
            }
          ],
          source:at(guide,'term_restriction_class','W3C OWL Guide (2004) · §3.4.1과 §4.1·§5.1·§5.3'),
          scope:'직접 작성한 세미나·주제 자료에서 ∃·∀·교집합·포함·동치·서로소의 차이를 살핀다. 기록과 양립하는 상황을 함께 비교하며, 구체적인 범위와 전제는 아래 원문·수식 더 읽기에 적었다.'
        },
        takeaway:{
          title:'추론은 개념의 정의와 사실이 함께 뒷받침하는 결론이다',
          text:'AI 주제가 하나 있다는 것과 주제가 모두 AI라는 것은 다르다. 양방향 정의는 조건을 충족한 대상을 분류하게 하지만, 필요한 조건만 적은 문장은 반대 방향의 분류까지 허용하지 않는다. 기록과 양립하는 다른 상황이 남아 있으면 결론도 미확정으로 남는다.'
        },
        technical:{
          title:'2004년 표준의 정의와 이 보기의 전제를 더 읽기',
          paragraphs:[
            '지식의 표현과 추론: Guide §1은 온톨로지의 클래스·속성·개별 대상에 관한 기술에서, 문서에 문자 그대로 적혀 있지 않은 논리적 귀결을 얻는다고 설명한다. 이는 정의와 사실을 전제로 한 결론이다. 전제가 현실에서 참인지까지 표준이 확인해 주는 것은 아니다.',
            '하위 개념과 교집합: SymbolicTopic ⊑ AIConcept는 기호주의 주제로 분류한 대상이 AI 개념에도 속한다는 조건이다. Seminar ⊓ ∃hasTopic.AIConcept는 세미나라는 조건과 AI 주제가 하나 이상 있다는 조건을 함께 충족하는 대상의 집합이다. 이름이 비슷하다는 이유로 포함 관계를 자동으로 정하지 않는다.',
            '필요조건과 양방향 정의: SomeAISeminar ⊑ Seminar ⊓ ∃hasTopic.AIConcept만 적으면 SomeAISeminar의 대상에 필요한 조건을 말한다. 오른쪽 조건을 충족한 모든 대상이 그 이름의 클래스라고 결론 내릴 수는 없다. ≡로 적어야 오른쪽에서 왼쪽으로도 분류된다. Guide §4.1은 이 차이를 TexasThings 예시로 설명한다.',
            '하나 이상과 전부: owl:someValuesFrom에 해당하는 ∃hasTopic.AIConcept는 AI 주제가 하나 이상 있음을 요구한다. 다른 종류의 주제가 함께 있는 것도 허용한다. owl:allValuesFrom에 해당하는 ∀hasTopic.AIConcept는 연결된 주제가 있다면 모두 AI 개념이어야 한다는 조건이다. 이것만으로 주제의 존재를 요구하지 않는다. 주제 연결을 기록하지 않은 것과 주제가 실제로 하나도 없다는 사실은 다르다.',
            '열린 세계와 미확정: Guide §2는 열린 세계 가정을 설명한다. 알려진 AI 주제 하나만 보인다고 모든 주제를 다 안다고 가정하지 않는다. 추가 주제가 AI가 아닌 상황도 현재 전제와 양립할 수 있으면 ‘AI 주제만’이라는 결론은 따라오지 않는다. 반대로 OnlyAISeminar라는 사실과 ∀ 정의, 주제 연결이 주어지면 그 주제를 AIConcept로 분류할 수 있다.',
            '부정과 모순: 이 예시의 NonAIConcept는 AIConcept와 서로소라고 명시한 별도 클래스이며, 모든 AI 바깥 대상을 열거한 여집합은 아니다. AIConcept와 NonAIConcept에 동시에 속한다는 전제가 생기면 만족하는 해석이 없다. 화면은 이 상태를 전제 충돌로 표시하고, 정상적인 새 결론처럼 사용하지 않는다. 일관된 전제에서 긍정도 부정도 따라오지 않는 미확정과 구분한다.',
            '보기에 사용한 범위: 고정된 세미나와 주제, 표시하지 않은 추가 주제의 가능성을 두고 정해진 질문을 비교한다. 일반 OWL 파일을 입력받아 모든 문장을 처리하는 추론기는 아니다. 서로 다른 이름의 개체가 반드시 다르다고 가정하지 않으며, hasTopic에 전역 domain·range를 붙여 빠진 분류를 채우지도 않는다. 같은 주제가 어느 클래스에도 아직 속하지 않은 가능성을 남겨, ‘AI라고 알려지지 않음’을 ‘AI가 아님’으로 바꾸지 않는다.',
            'OWL Lite·DL·Full: Overview §1.3과 Reference §8은 2004년의 세 하위 언어를 구분한다. Lite는 제한된 표현을, DL은 표현의 사용 제약 아래 완전한 추론과 결정 가능성을, Full은 RDF의 자유로운 표현을 허용하되 같은 계산 보장을 두지 않는다. 이 카드의 서로소 등은 2004년 OWL DL의 표현으로 설명한다. OWL2의 프로파일·추가 기능이나 현대 추론기의 성능을 2004년 결과로 제시하지 않는다.',
            '원문과 시각화: 확인한 2004년 Overview·Guide·Reference·Semantics·Use Cases 본문에는 논리를 설명하는 원그림이 없었다. 위 도형과 세미나 사례는 W3C의 정의를 바탕으로 직접 구성했다. 원문 예시·표·공식 정의의 위치를 함께 연결했으며, 원문 그림 번호를 새로 붙이지 않았다.'
          ],
          formula:'직접 작성한 세미나·주제 보기\n\nSymbolicTopic ⊑ AIConcept\nAIConcept ⊓ NonAIConcept = ∅\n\nSomeAISeminar ≡ Seminar ⊓ ∃hasTopic.AIConcept\nOnlyAISeminar ≡ Seminar ⊓ ∀hasTopic.AIConcept\n\nSeminar(s), hasTopic(s,t), SymbolicTopic(t)\n  → AIConcept(t)\n  → SomeAISeminar(s)\n  ↛ OnlyAISeminar(s)\n\n일관된 전제의 모든 해석에서 참 → 따라오는 결론\n긍정·부정 어느 쪽도 따라오지 않음 → 미확정\n전제를 함께 만족하는 해석이 없음 → 전제 충돌'
        }
      },
      keyIdeas:[
        {title:'개념이 성립하는 조건을 논리로 적는다',text:'클래스 이름에 설명을 붙이는 데서 나아가, 포함 관계·관계값의 조건·교집합·서로소처럼 추론에 사용할 조건을 명세한다.'},
        {title:'정의의 방향이 가능한 결론을 바꾼다',text:'A가 되려면 B여야 한다는 조건과, B이면 A이기도 하다는 양방향 정의를 구분한다. 사실이 같은 경우에도 어떤 정의를 적었는지에 따라 분류가 달라진다.'},
        {title:'모르는 것과 모순되는 것을 나눈다',text:'추가 정보가 가능한 열린 세계에서는 기록에 없다는 이유만으로 거짓이라 하지 않는다. 서로 양립할 수 없는 전제는 별도로 드러낸다.'}
      ],
      videos:[],
      references:[
        {title:'W3C · OWL Overview · 2004년 권고',url:overview,location:'표제부: 2004-02-10 및 Overview 편집자. §1.2 목적, §1.3 OWL Lite·DL·Full. 2009년 OWL2 안내는 후대 상태 공지다.'},
        {title:'W3C · OWL Guide · 개념과 사실의 논리적 귀결',url:guide+'#Introduction',location:'§1 와인 추천 에이전트와 논리적 귀결, §2 열린 세계, §3.1 클래스·개별 대상.'},
        {title:'W3C · OWL Guide · allValuesFrom과 someValuesFrom',url:guide+'#term_restriction_class',location:'§3.4.1 Wine·hasMaker·Winery 예시와 비교 표. ∀는 존재를 요구하지 않고, ∃는 다른 종류의 관계값을 배제하지 않는다.'},
        {title:'W3C · OWL Guide · 필요조건과 충분조건',url:guide+'#equivalentClass1',location:'§4.1 TexasThings 예시. subClassOf와 equivalentClass에 따른 함의의 방향.'},
        {title:'W3C · OWL Guide · 교집합과 서로소',url:guide+'#ComplexClasses',location:'§5.1.1 intersectionOf, §5.3 disjointWith. 두 클래스의 서로소가 다른 모든 클래스 쌍의 서로소를 뜻하지는 않는다.'},
        {title:'W3C · OWL Reference · 표현의 상세 정의',url:reference+'#Restriction',location:'§3.1.2.1.1–2 allValuesFrom·someValuesFrom, §§3.1.3·3.2 클래스 공리, §5.2 개체 이름, §8 하위 언어 제약.'},
        {title:'W3C · OWL Semantics · 관계 조건과 개념 공리',url:direct+'#3.2',location:'규범 §3.2 EC Extension Table의 교집합·전칭·존재 제한, §3.3 Axiom Table의 포함·동치·서로소·사실.'},
        {title:'W3C · OWL Semantics · 일관성과 함의',url:direct+'#3.4',location:'규범 §3.4: 전제를 만족하는 해석이 존재할 때 일관적이며, 전제를 만족하는 모든 해석이 결론을 만족할 때 함의한다.'},
        {title:'W3C · OWL Use Cases and Requirements',url:uses,location:'§2.5 에이전트와 서비스, §3.4 모순 탐지, §3.5 표현력과 추론 효율의 균형.'}
      ]
    }
  });
})();
