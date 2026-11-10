/* One independently editable record. Diagrams and shared layout live elsewhere. */
window.AtlasEntries.register({
  id:'perceptron',
  record:{
    title:'퍼셉트론 · 신호가 반응이 되고, 경험이 판단을 바꾸다',
    summary:'흥분·억제 입력을 합쳐 문턱에 닿으면 활성화되는 단위를 연결했다. 경험이 신호의 영향을 바꾸면, 같은 자극에도 이후의 반응 경향이 달라진다.',
    detail:'',question:'',
    caveat:'가정한 신경계의 인식·연합·일반화를 분석한 모형이다. 인간의 기억 전체를 재현하거나 모든 과제의 학습을 보장한 결과는 아니다.'
  },
  content:{
    article:{
      question:'여러 신호가 모이면,\n어떻게 하나의 반응이 생겨날까?',
      opening:[
        '눈앞의 무늬가 신경세포들의 활동으로 바뀌고, 그 신호들이 다음 세포로 전달된다. 한 뉴런은 여러 입력의 영향을 함께 받는다. 흥분시키는 영향과 억제하는 영향이 모인 결과, 막전위가 발화 문턱에 이르면 활동전위가 생겨 축삭을 따라 전달된다. 하나의 신호만으로 부족해도 여러 신호가 함께 작용하면 반응이 생길 수 있다.',
        '프랭크 로젠블랫은 이런 신경계의 조직에서 지각을 구현할 실마리를 찾았다. 1958년 퍼셉트론의 A단위는 흥분·억제 입력 강도의 합이 정해진 임계값 θ에 도달하면 활성화되고, 그보다 작으면 활성화되지 않는다. 이 단위들을 연결해 감각의 무늬를 내부 활동과 반응으로 이어 보려 했다.',
        '여기서 한 걸음 더 나아간 질문이 학습이다. 어떤 무늬를 경험한 뒤, 왜 비슷한 무늬에 다시 반응하게 될까? 로젠블랫은 기억을 입력의 복사본보다 연결과 연합에 남는 변화에서 찾았다. 활동한 A단위가 내보내는 신호의 영향 V가 달라지면, 같은 자극이 이후 반응에 미치는 힘도 달라질 수 있다.'
      ],
      visual:{
        id:'perceptron-association',navLabel:'지각과 학습',
        title:'신호를 합쳐 반응하고, 경험을 다음 반응에 남기다',
        caption:'입력을 켜고 끄며 흥분·억제 신호의 합과 문턱을 비교하세요. 이어서 이런 단위를 연결한 망에서 경험이 어떻게 남는지 살펴봅니다.',
        threshold:{
          title:'여러 입력의 영향이 모여, 문턱에서 반응을 정한다',
          intro:'신경세포의 신호 통합과 발화에서 가져온 생각을, 입력의 합과 0·1의 반응으로 옮겨 봅니다. 양수는 흥분, 음수는 억제의 기여를 나타냅니다.',
          inputs:[1,0,0],weights:[2,2,-2],threshold:3,
          labels:['흥분 입력 1','흥분 입력 2','억제 입력 3'],
          presets:[
            {id:'one',label:'신호 하나만',inputs:[1,0,0],threshold:3},
            {id:'together',label:'둘이 모이면',inputs:[1,1,0],threshold:3},
            {id:'inhibition',label:'억제 신호도 오면',inputs:[1,1,1],threshold:3},
            {id:'boundary',label:'문턱에 닿으면',inputs:[1,1,0],threshold:4}
          ],
          source:{title:'Rosenblatt (1958) · p.389 조직 규칙2, p.393의 A단위 정의',url:'https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf#page=4'},
          biologySource:{title:'OpenStax Biology 2e · 35.2 신경세포의 신호 전달',url:'https://openstax.org/books/biology-2e/pages/35-2-how-neurons-communicate'},
          scope:'숫자와 세 입력은 이 원리를 읽기 위해 직접 정했습니다. s=Σwᵢxᵢ는 여기서 사용하는 표기이며 원문의 전체 망을 그대로 옮긴 식은 아닙니다. θ 조절은 서로 다른 반응 조건의 비교이며 학습이 아닙니다. 실제 뉴런의 막전위·신호 전달 시간을 계산하지 않습니다.'
        },
        beforeLabel:'경험 전',afterLabel:'경험이 남은 뒤',
        beforeCaption:'특정 반응이 강화되기 전의 상태',
        afterCaption:'연합의 변화가 이후의 반응에 영향을 준다.',
        source:{title:'Rosenblatt (1958) · Fig.1, pp.389–392 참조',url:'https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf#page=4'},
        mappings:[
          {id:'input',label:'입력은 그대로',text:'같은 무늬라도 경험이 남은 뒤의 반응은 달라질 수 있다.'},
          {id:'association',label:'연합에 남은 변화',text:'모형에서는 활성 연합단위의 출력 영향 V가 달라져, 경험의 흔적이 이후 신호에 남는다.'},
          {id:'response',label:'달라지는 반응',text:'어떤 반응을 다시 보일 경향이 커지는 것과 정답을 얻는 것은 구분해야 한다.'}
        ]
      },
      takeaway:{title:'신호의 합이 반응을 만들고, 경험은 다음 반응을 바꾼다',text:'입력의 영향을 모아 문턱에서 활성화를 정하는 단위와, 경험이 신호의 영향을 바꾸는 망을 함께 생각했다. 지금의 반응이 생기는 과정과 학습이 그다음 반응에 남기는 변화를 이어 읽는다.'},
      technical:{
        title:'원논문의 모형과 학습 조건 더 읽기',
        paragraphs:[
          'p.389의 조직 규칙2와 p.393의 정의는 흥분·억제 입력의 합이 임계값 θ와 같거나 클 때 A단위가 활성화된다고 명시한다. 그래서 화면도 s≥θ에서 1을 출력한다. p.392의 분석 대상은 고정 임계값 A단위 모형이다.',
          'Fig.1을 참고한 새 구성도다. Fig.2에서는 투사 영역을 생략한다. Fig.3은 학습 전후가 아닌, 한 자극의 반응 결정 전후다.',
          '앞의 wᵢ는 입력의 영향을 표시하는 자체 표기이고, 뒤의 V는 원논문에서 A단위가 내보내는 신호의 영향이다. 원문에는 α·β·γ 등 변화 체계가 있다. 뒤의 학습 전후 그림은 정량 결과를 재현하지 않는다. R반응의 선택에는 여러 A단위 집합의 경쟁과 억제·피드백도 관여한다.',
          '학습한 자극의 재인식과 새 자극으로의 일반화는 구분한다.',
          '1958년 논문과 전용 장치 Mark I의 공개 시연도 구분한다. 1960년 7월 ONR 소식지는 그해 6월의 첫 공개 시연과 그 이전의 디지털컴퓨터 모사를 따로 기록한다.'
        ]
      }
    },
    keyIdeas:[
      {title:'들어온 신호를 합치는 일과, 활성화되는 일을 나눈다',text:'여러 입력의 기여를 더한 값이 반응의 조건이 된다. 흥분 입력을 더하면 문턱에 닿을 수 있고, 억제 입력이 함께 오면 같은 흥분 신호에도 활성화되지 않을 수 있다.'},
      {title:'발화의 원리에, 경험이 남는 변화를 연결한다',text:'신호를 합쳐 문턱에서 반응하는 발상은 앞선 뉴런 모형에도 있었다. 로젠블랫은 이런 단위를 조직하고, 경험에 따라 신호의 영향과 반응 경향이 달라지는 지각·연합·일반화의 문제를 다뤘다.'},
      {title:'‘반응’에는 신경계 내부의 상태도 포함된다',text:'논문의 반응은 근육 운동만을 뜻하지 않는다. 신경계 내부에서 구별되는 활동 상태도 포함하며, 어떤 상태가 다시 활성화되는지도 설명 대상으로 삼았다.'},
      {title:'무엇을 비슷하게 보는지도 질문했다',text:'지각의 유사성은 입력의 모양만으로 정해지지 않는다. 망의 조직과 자극 경험이 어떤 대상들을 같은 반응으로 묶는지 확률적으로 분석했다.'}
    ],
    videos:[{title:'Lecture 12A: Neural Nets',url:'https://www.youtube.com/watch?v=uXt8qF2Zzfo',channel:'MIT OpenCourseWare',note:'Patrick Winston의 신경망 기초 강의. 1958 원논문을 해설한 저자 발표와는 구분해서 읽는 배경 자료다.',sourceUrl:'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/'}],
    references:[
      {title:'Rosenblatt · The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain',url:'https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf',location:'pp.386–389 기억·인식의 질문과 입장, p.387 반응의 정의; p.389 조직 규칙2·Fig.1; pp.390–392 망의 모형·V·고정 임계값; p.393 흥분·억제의 합과 θ; pp.395–396 재인식·일반화 평가 조건. 본문·도판 확인.'},
      {title:'OpenStax Biology 2e · How Neurons Communicate',url:'https://openstax.org/books/biology-2e/pages/35-2-how-neurons-communicate',location:'시냅스 뒤 흥분·억제 효과의 통합, 발화 문턱과 활동전위의 생물학적 배경. 1958년 퍼셉트론의 수치 실험 자료와 구분한다.'},
      {title:'ONR · Digital Computer Newsletter, July 1960',url:'https://columbia.edu/cu/computinghistory/navynewsletter1960.pdf',location:'인쇄 p.1 Mark I의 1960년6월 첫 공개 시연·기존 컴퓨터 모사, pp.2–3 기억장치·연합단위와 생물학적 대응의 한계. 동시대 기록 확인.'}
    ]
  }
});
