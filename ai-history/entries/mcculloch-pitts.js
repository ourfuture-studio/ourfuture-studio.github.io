/* Edit this file to revise this card. Layout lives in article-view.js;
 * its diagrams live in visuals/. Dates and coauthors stay in the timeline. */
window.AtlasEntries.register({
  id:'mcculloch-pitts',
  record:{
    title:'뇌의 연결을 수학으로 옮기다',
    summary:'신경세포의 활동과 연결로 생각을 설명할 수 있을지, 수학으로 질문했다.',
    detail:'',
    question:'',
    caveat:'가정한 신경망과 논리식의 대응이며, 인간 사고 전체의 구현은 아니다.'
  },
  content:{
    article:{
      question:'생각을 이해하려면,\n뇌의 무엇을 수학으로 옮겨야 할까?',
      opening:[
        '사람은 뇌로 보고, 기억하고, 판단한다. 그렇다면 생각을 이해하는 출발점도 뇌를 이루는 신경세포와 그 연결에서 찾을 수 있지 않을까?',
        '1943년 매컬럭과 피츠는 뉴런의 활동 여부와 뉴런들이 연결된 방식을 수학으로 표현했다. 신경세포 하나의 활동을 하나의 명제에 대응시키고, 연결된 세포들의 반응을 논리 관계로 읽은 것이다.'
      ],
      visual:{
        id:'neuron-to-logic',
        title:'뇌의 뉴런과 논문의 수학적 모델',
        caption:'신경세포의 어떤 성질을 모델에 남겼는지 눌러 비교해 보세요.',
        biologyCaption:'신호를 주고받는 세포들의 연결',
        modelCaption:'이 연결은 ‘둘 다’라는 논리 관계를 표현한다.',
        anatomySource:{title:'OpenStax · Neurons and Glial Cells, Figure 35.3',url:'https://openstax.org/books/biology-2e/pages/35-1-neurons-and-glial-cells'},
        modelSource:{title:'McCulloch·Pitts (1943) · Figure 1c, pp.130–131',url:'https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf#page=16'},
        mappings:[
          {id:'cell',label:'하나의 뉴런',biology:'여러 신호를 받는 신경세포',model:'하나의 계산 단위',text:'신호를 받아 반응하는 세포의 성질을 수학적 단위로 옮겼다.'},
          {id:'signal',label:'활동의 유무',biology:'신경세포가 발화하는 사건',model:'참 또는 거짓으로 표현되는 명제',text:'특정 시점의 발화를 하나의 명제로 나타냈다.'},
          {id:'connection',label:'뉴런 사이의 연결',biology:'시냅스로 이어지는 신호의 관계',model:'논리 관계로 표현되는 연결',text:'연결 구조가 만드는 반응과 논리 관계의 대응을 연구했다.'}
        ]
      },
      takeaway:{title:'신경망과 논리가 한 모델에서 만났다',text:'뇌의 연결에서 출발한 관점과, 사고를 형식화하는 논리의 관점이 한 모델에서 만났다.'},
      technical:{
        title:'논문의 그림과 수식을 더 읽기',
        paragraphs:[
          '원논문 Figure 1c의 연결을 다시 그렸다. 이전 시점의 뉴런 1·2가 모두 활동하면 뉴런 3이 활동하는 관계다.',
          'Nᵢ(t)는 뉴런 i의 발화 명제다. 한 시간 간격은 시냅스 지연 단위이며, 수식은 현대 기호로 옮겼다.',
          'p.118의 고정 연결·이진 활동·억제 가정, p.117의 형식적 대응과 생리적 설명의 구분을 함께 읽는다.'
        ],
        formula:'N₃(t) ↔ N₁(t − 1) ∧ N₂(t − 1)'
      }
    },
    keyIdeas:[
      {title:'뇌의 활동을 수학으로 묻는 한 방법',text:'신경망의 동작을 논리식으로 설명하고, 조건에 맞는 논리식에 대응하는 신경망을 구성할 수 있음을 보였다.'},
      {title:'전체의 능력을, 단위들의 연결에서 찾았다',text:'개별 세포의 반응에서 연결된 전체의 계산 능력으로 질문을 넓혔다. 어떤 연결이 어떤 계산을 가능하게 하는지 연구할 길을 연 것이다.'}
    ],
    videos:[],
    references:[
      {title:'McCulloch·Pitts · A Logical Calculus of the Ideas Immanent in Nervous Activity',url:'https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf',location:'p.115 초록·도입, p.117 신경 활동과 명제의 대응, p.118 모형 가정, pp.120–121 구성 정리, p.130 Figure 1c·p.131 대응식. 본문과 도판 확인.'},
      {title:'OpenStax Biology 2e · 35.1 Neurons and Glial Cells',url:'https://openstax.org/books/biology-2e/pages/35-1-neurons-and-glial-cells',location:'Figure 35.3 및 수상돌기·세포체·축삭·시냅스 설명 참조. 화면의 뉴런 구조도는 자체 제작.'}
    ]
  }
});
