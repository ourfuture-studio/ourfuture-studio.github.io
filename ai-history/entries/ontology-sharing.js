/* Gruber's portability proposal and the later authored OWL-style example stay distinct. */
(function(){
  'use strict';
  const paper='https://tomgruber.org/writing/ontolingua-kaj-1993.pdf';
  const authorPage='https://tomgruber.org/writing/ontolingua-kaj-1993/';
  const primer='https://www.w3.org/TR/2012/REC-owl2-primer-20121211/';
  const at=(page,label)=>({title:'Gruber (1993) · 저자 공개 PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const modern={title:'W3C · OWL2 Primer (2012) · §§4–5·개방 세계 설명',url:primer};
  const credit=(page,figure)=>({title:'Thomas R. Gruber · '+figure+' · 저자 공개본',url:paper+'#page='+page,note:'원그림과 전체 캡션을 200dpi로 렌더해 영역만 잘랐습니다. 그림 안의 표현은 바꾸지 않았으며 설명은 밖에 붙였습니다.'});
  window.AtlasEntries.register({
    id:'ontology-sharing',
    record:{
      title:'온톨로지 · 함께 쓸 개념의 뜻을 명세하다',
      subtitle:'Ontology Sharing / Ontolingua · 온톨로지 공유와 지식의 재사용',
      dateLabel:'1993 · Knowledge Acquisition 논문',
      people:['Thomas R. Gruber'],
      authorNote:'Thomas R. Gruber의 1993년 논문을 중심으로 읽는다. 후대 웹 표준은 별도 연표와 출처로 연결했다.',
      summary:'서로 다른 프로그램도 개념·관계의 공통 명세를 공유할 수 있을까? 함께 쓸 어휘를 정의하고 각 지식 표현 체계로 옮기는 아이디어를 살핀다.',
      detail:'',question:'',related:['knowledge-representation','rdf','semantic-web','owl','sparql'],
      sources:[{title:'Gruber · A Translation Approach to Portable Ontology Specifications',url:paper},{title:'Gruber · 저자 서지와 논문 설명',url:authorPage},{title:'W3C · 후대 추론 보기의 의미론 참고',url:primer}],
      caveat:'1993년 논문의 중심은 공통 개념 명세와 표현 체계 사이의 포터빌리티다. 학생·문서·작성자 예시와 공리 추적은 직접 작성했으며, 후대 OWL 의미론을 참고한 별도 보기다.'
    },
    content:{
      article:{
        question:'두 프로그램이 같은 “학생”과 “논문”을 말한다면,\n정말 같은 뜻을 공유하고 있을까?',
        opening:[
          '학교의 학생 목록과 연구실의 논문 목록을 연결한다고 하자. 한쪽의 “작성자”가 다른 쪽의 “기여자”와 항상 같은 범위일까? 항목 이름을 맞추기 전에, 어떤 사람과 문서를 포함하고 어떤 관계를 뜻하는지 정해야 한다.',
          'Gruber는 개념·관계·함수 등의 어휘를 명시적으로 정의해 지식을 공유하자는 접근을 제시했다. Ontolingua는 공통 형식 KIF의 정의를 각 지식 표현 체계로 번역한다. 서로 다른 추론 도구를 유지하면서도 함께 쓸 개념 명세를 재사용하려는 구상이다.',
          '공유하는 것은 단어 목록만이 아니다. 무엇을 학생으로 부르고, “썼다”가 누구와 어떤 문서를 연결하는지 함께 정한다. 다른 프로그램의 내부 자료 구조를 그대로 복제하는 대신, 그 구조로 표현하려던 개념을 합의하는 문제다.',
          '아래에서는 먼저 두 목록을 공통 개념에 연결한다. 다음 두 단계는 후대 OWL 의미론을 참고한 자체 보기다. 개별 사실과 정의를 결합해 분류를 얻고, 아직 모르는 것과 명시적으로 부정한 것을 구분한다.'
        ],
        visual:{
          id:'shared-conceptualization',navLabel:'공통 개념에서 추론으로',
          title:'같은 개념을 공유하고, 그 정의에서 따라오는 것을 읽다',
          caption:'학생·작성 관계·문서를 직접 정한 두 목록에 대응시킵니다. 이어지는 공리 추적은 Gruber의 번역기 실행이 아니라 후대 의미론을 참고해 구성한 별도 보기입니다.',
          stages:[
            {id:'share',label:'함께 쓸 뜻을 정하다',text:'서로 다른 목록의 항목을 공통 개념에 연결한다. 이름이 비슷하다는 이유만으로 같은 뜻으로 합치지 않는다.'},
            {id:'infer',label:'정의와 사실을 결합하다',text:'학생이라는 사실에서 사람임을 얻고, 작성 관계와 문서의 유형을 함께 확인해 작성자 분류를 살핀다.'},
            {id:'unknown',label:'모름과 부정을 구분하다',text:'빠진 사실은 곧 거짓이 아니다. 명시한 부정과 유도된 분류가 함께 생기면 전제의 충돌을 살핀다.'}
          ],
          share:{
            text:'공통 어휘를 만들려면 두 목록이 무엇을 포함하고 제외하는지부터 확인해야 한다. 다음 연결은 이 화면을 위해 직접 합의한 대응이다.',
            leftLabel:'학교의 학적 목록',rightLabel:'연구실의 문서 목록',
            mappingNote:'항목의 이름을 자동 번역한 결과가 아니다. 두 목록의 범위를 확인하고 사람이 명세한 대응이다.',
            mappings:[
              {id:'student',label:'학생',left:'학적 유형: 재학생',right:'연구 참여자 유형: 학생',shared:'Student',definition:'이 보기에서는 두 목록이 합의한 학생 범위만 같은 개념으로 연결한다.'},
              {id:'wrote',label:'썼다',left:'보고서 작성자 연결',right:'문서 저자 연결',shared:'wrote',definition:'사람과 그 사람이 작성한 문서를 연결한다. 검토·소속 같은 다른 기여 관계와 구분한다.'},
              {id:'paper',label:'논문',left:'문서 종류: 논문',right:'연구 산출물: 논문',shared:'Paper',definition:'이 보기에서 논문으로 분류한 문서다. 모든 보고서나 메모를 자동으로 포함하지 않는다.'}
            ],
            scope:'직접 작성한 목록·대응이다. Gruber의 원문 예제나 KIF 코드가 아니며, 서로 다른 실제 기관의 분류가 일치한다고 가정하지 않는다.',
            source:at(3,'공통 어휘와 표현 체계의 독립성')
          },
          inference:{
            text:'학생은 사람이라는 공리와, 사람이 논문을 썼을 때 작성자로 분류하는 정의를 직접 둔다. 문서의 Paper 유형을 추가하거나 동치 정의를 필요조건으로 바꾸며 어떤 결론이 남는지 비교한다.',
            personLabel:'연우',paperLabel:'문서 p1',
            initial:{student:true,person:false,wrote:true,paper:false,notAuthor:false,definition:'equivalent'},
            scope:'Student·Person·Paper·PaperAuthor·wrote는 이 보기의 고정 어휘다. wrote에 domain/range 공리를 따로 두지 않는다. 꺼진 항목은 명시 사실이 없다는 뜻이며 notAuthor만 명시 부정이다.',
            source:modern
          },
          uncertainty:{
            text:'문서가 Paper인지 적혀 있지 않으면 작성자라고 결론 내릴 근거가 부족하다. 그렇다고 작성자가 아니라고 결론 내릴 수도 없다. 반면 “작성자가 아니다”를 명시하고 작성자임도 따라오면 같은 전제 집합에 충돌이 생긴다.',
            scope:'미정은 참일 가능성의 수치가 아니다. 전제가 충돌한 상태에서는 표시된 긍정 경로만으로 전체 지식의 정합성이나 현실의 진실을 판단하지 않는다.',
            source:modern
          },
          evidence:[
            {id:'portability',file:'gruber-1993-portable-ontology.png',title:'원논문 Fig.1 · 하나의 온톨로지, 여러 응용',caption:'공통 온톨로지를 서로 다른 표현 체계와 응용에 사용하는 가능성을 그린다.',scope:'EXPRESS 등 그림의 모든 대상을 당시 구현이 끝난 번역기로 읽지 않는다. 실제 지원과 추가 가능 대상은 본문에서 구분한다.',source:at(8,'Fig.1 · 인쇄 p.7'),credit:credit(8,'Fig.1')},
            {id:'translation',file:'gruber-1993-translation-architecture.png',title:'원논문 Fig.2 · 공통 표현에서 대상별 번역으로',caption:'관용적인 표현을 인식·정규화한 뒤 각 체계의 번역기로 보낸다.',scope:'원문의 번역 아키텍처다. 모든 KIF 문장이 모든 대상 언어로 손실 없이 옮겨진다는 보장은 아니다.',source:at(17,'Fig.2 · 인쇄 p.16'),credit:credit(17,'Fig.2')}
          ],
          scope:'두 목록의 대응과 작은 공리 추적을 직접 구성했다. 정한 공리의 일부 귀결·전제 충돌을 계산하며 Ontolingua 번역기나 범용 OWL 추론기를 실행하지 않는다. 원그림은 1993년 저자 공개본에서 가져왔다.',
          source:at(6,'§3 · 공유와 포터빌리티; 후대 보기는 별도 W3C 출처')
        },
        takeaway:{
          title:'지식을 함께 쓰려면, 무엇을 뜻하는지부터 함께 정한다',
          text:'같은 단어를 쓰는 일, 공통 정의에 동의하는 일, 그 정의를 각 시스템에서 구현하는 일은 서로 이어져 있다. 이 중 하나만 맞춰서는 나머지가 저절로 해결되지 않는다. 어떤 전제를 공유했고 어느 제약을 옮길 수 있는지까지 드러내야 재사용의 범위를 판단할 수 있다.'
        },
        technical:{
          title:'원문 범위와 추론의 전제를 더 읽기',
          paragraphs:[
            '원문 PDF7은 당시 지원 번역기와 추가 가능한 대상을 구분한다. PDF20은 Ontolingua 자체가 질의를 처리하지 않고, 제한된 대상 언어로 모든 KIF를 옮길 수 없다고 명시한다. 미번역 문장이 있으면 사용자에게 알린다.',
            '따라서 포터빌리티는 모든 도구가 언제나 같은 추론을 완벽히 수행한다는 보장이 아니다. 공유할 공리를 고르고 대상의 표현 범위를 확인해야 한다. 개념 합의와 온톨로지 설계 역시 사람이 해결해야 할 문제로 남는다.',
            '후대 보기의 PaperAuthor 동치 정의는 필요·충분조건을 모두 둔다. 필요조건만 두면 Person이고 Paper를 썼다는 사실만으로 PaperAuthor를 역방향 유도할 수 없다. 개방 세계에서는 사실의 부재와 명시 부정도 구분한다(W3C OWL2 Primer §§4–5).',
            '전용 추적기는 표시한 어휘와 공리만 계산한다. 충돌이 나면 이를 알리고 전제를 다시 살피게 한다. 모순을 포함한 모든 OWL 귀결을 열거하거나 임의의 온톨로지 문서를 검증하는 기능은 아니다.',
            '서지: Thomas R. Gruber, A Translation Approach to Portable Ontology Specifications, Knowledge Acquisition 5(2):199–220,1993. 사용한 27쪽 저자 공개본의 표지는 Stanford KSL92-71, September1992, RevisedApril1993이며 1993년 출판을 명시한다. 아래 PDF쪽수는 저자 공개본 기준으로 인쇄번호보다 1 크다.',
            '참고 PDF Ontology의 정의·공유 이야기와 Father 추론 예시는 이 카드의 질문을 정하는 데 사용했다. 1993년 논문, 2004년 OWL 권고, 2012년 OWL2 Primer의 출처와 시점을 분리했다. Studer 외 1998년 정의 문구를 이 논문의 직접 인용으로 소급하지 않는다.'
          ],
          formula:'후대 의미론을 참고해 직접 정한 공리\n\nStudent ⊑ Person\n\n동치 정의:\nPaperAuthor ≡ Person ⊓ ∃wrote.Paper\n\n필요조건만:\nPaperAuthor ⊑ Person ⊓ ∃wrote.Paper\n\nStudent(연우), wrote(연우,p1), Paper(p1)\n→ 동치 정의일 때 PaperAuthor(연우)\n\n사실 없음 ≠ 명시 부정'
        }
      },
      keyIdeas:[
        {title:'공유 어휘는 단어보다 넓다',text:'클래스 이름만 맞추지 않고 어떤 대상을 포함하며 관계가 무엇을 뜻하는지 명세한다. 다른 목록의 비슷한 이름을 연결할 때도 범위가 같은지 먼저 확인한다.'},
        {title:'공통 명세와 각 도구의 구현을 잇는다',text:'공통 개념을 바탕으로 각 도구의 표현으로 옮긴다. 같은 도구를 강제하지 않지만 대상 표현이 지원하는 제약을 살펴야 한다.'},
        {title:'결론은 명시한 전제에 기대어 나온다',text:'후대 추론 보기에서는 공리의 방향과 빠진 사실 하나가 분류를 바꾼다. 아직 모른다는 표시와 명시한 부정을 구분해 읽는다.'}
      ],
      videos:[],
      references:[
        {title:'Gruber · A Translation Approach to Portable Ontology Specifications',url:paper,location:'저자 공개본 PDF2–3 정의·공유 문제, PDF6–8 §3/Fig.1, PDF17 Fig.2, PDF20 번역 제한·질의 처리 범위. 인쇄번호는 PDF쪽수보다 1 작다.'},
        {title:'Tom Gruber · 논문 서지와 소개',url:authorPage,location:'1993년 Knowledge Acquisition 5(2):199–220. 저자 공개 보고서와 학술지 출판을 구분한다.'},
        {title:'W3C · OWL2 Primer · 2012년 제2판',url:primer,location:'1993년과 구분하는 후대 보기의 출처. §§4–5의 클래스 포함·동치·교집합·존재 제한·부정과 개방 세계 설명.'}
      ]
    }
  });
})();
