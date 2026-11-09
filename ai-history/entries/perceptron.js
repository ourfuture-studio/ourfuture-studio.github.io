/* One independently editable record. Diagrams and shared layout live elsewhere. */
window.AtlasEntries.register({
  id:'perceptron',
  record:{
    title:'경험이 판단을 바꾸는 기계',
    summary:'기억을 자극과 반응 사이의 연합 변화로 보고, 경험에서 인식이 달라지는 모형을 제안했다.',
    detail:'',question:'',
    caveat:'가정한 신경계의 인식·연합·일반화를 분석한 모형이다. 인간의 기억 전체를 재현하거나 모든 과제의 학습을 보장한 결과는 아니다.'
  },
  content:{
    article:{
      question:'한 번의 경험은,\n다음 판단에 어떻게 남을까?',
      opening:[
        '어떤 무늬를 본 뒤에는, 비슷한 무늬를 다시 만났을 때의 반응이 달라질 수 있다. 그 경험은 어디에, 어떤 모습으로 남는 걸까?',
        '로젠블랫은 기억을 입력의 복사본보다, 자극이 특정 반응으로 이어지는 연결과 연합의 변화에서 찾았다. 퍼셉트론은 경험이 인식과 행동을 바꾸는 과정을 설명하려는 모형이었다.'
      ],
      visual:{
        id:'perceptron-association',navLabel:'지각과 학습',
        title:'같은 자극, 경험이 남긴 다른 반응 경향',
        caption:'두 그림은 감각 S·투사 AⅠ·연합 AⅡ·반응 R의 조직을 공유합니다. 무엇이 달라졌는지 눌러 비교해 보세요.',
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
      takeaway:{title:'배움을, 연합에 남는 변화로 생각하기',text:'연결된 단위가 무엇을 계산할 수 있는가에서, 경험이 그 이후의 반응을 어떻게 바꾸는가로 질문을 이어 간다.'},
      technical:{
        title:'원논문의 모형과 학습 조건 더 읽기',
        paragraphs:[
          'Fig.1을 참고한 새 구성도다. Fig.2에서는 투사 영역을 생략한다. Fig.3은 학습 전후가 아닌, 한 자극의 반응 결정 전후다.',
          'V는 연합단위 출력의 영향이다. α·β·γ 등 변화 체계가 있으며, 화면은 정량 결과를 재현하지 않는다.',
          '학습한 자극의 재인식과 새 자극으로의 일반화는 구분한다.',
          '1958년 논문과 전용 장치 Mark I의 공개 시연도 구분한다. 1960년 7월 ONR 소식지는 그해 6월의 첫 공개 시연과 그 이전의 디지털컴퓨터 모사를 따로 기록한다.'
        ]
      }
    },
    keyIdeas:[
      {title:'‘반응’에는 신경계 내부의 상태도 포함된다',text:'논문의 반응은 근육 운동만을 뜻하지 않는다. 신경계 내부에서 구별되는 활동 상태도 포함하며, 어떤 상태가 다시 활성화되는지도 설명 대상으로 삼았다.'},
      {title:'무엇을 비슷하게 보는지도 질문했다',text:'지각의 유사성은 입력의 모양만으로 정해지지 않는다. 망의 조직과 자극 경험이 어떤 대상들을 같은 반응으로 묶는지 확률적으로 분석했다.'}
    ],
    videos:[{title:'Lecture 12A: Neural Nets',url:'https://www.youtube.com/watch?v=uXt8qF2Zzfo',channel:'MIT OpenCourseWare',note:'Patrick Winston의 신경망 기초 강의. 1958 원논문을 해설한 저자 발표와는 구분해서 읽는 배경 자료다.',sourceUrl:'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/'}],
    references:[
      {title:'Rosenblatt · The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain',url:'https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf',location:'pp.386–389 기억·인식의 질문과 입장, p.387 반응의 정의; p.389 Fig.1; pp.390–392 모형과V; pp.395–396 재인식·일반화 평가 조건. 본문·도판 확인.'},
      {title:'ONR · Digital Computer Newsletter, July 1960',url:'https://columbia.edu/cu/computinghistory/navynewsletter1960.pdf',location:'인쇄 p.1 Mark I의 1960년6월 첫 공개 시연·기존 컴퓨터 모사, pp.2–3 기억장치·연합단위와 생물학적 대응의 한계. 동시대 기록 확인.'}
    ]
  }
});
