/* One independently editable article. Figure reconstruction and local
 * feature calculations live in visuals/lenet-features.js. */
window.AtlasEntries.register({
  id:'lenet',
  record:{
    title:'시각 피질의 아이디어를, 글자를 읽는 망으로',
    summary:'생물 시각계의 국소 수용장과 특징 반응의 계층에서 영감을 얻어 망을 구성하고, 글자 정답의 오차로 특징을 찾는 연결값까지 학습했다.',
    detail:'',question:'',
    caveat:'1998년 LeCun·Bottou·Bengio·Haffner의 종합 논문을 다룬다. 화면은 구조와 일부 계산 원리를 재구성하며, 원래 학습된 LeNet-5의 인식 결과나 성능을 재현하지 않는다.'
  },
  content:{
    article:{
      question:'생물은 어떻게 보고,\n기계는 그 방식에서 무엇을 배울까?',
      opening:[
        'Hubel과 Wiesel은 고양이의 시각 피질에서 시야의 작은 영역에 놓인 선과 경계의 기울기에 따라 반응이 달라지는 뉴런을 연구했다. 이런 국소 수용장과 특징 선택성은 생물의 보는 방식을 신경망의 구조로 옮기는 단서가 됐다.',
        'Fukushima의 Neocognitron은 단순세포·복잡세포의 구상에서 영감을 받아, 특징에 반응하는 층과 그 반응을 모으는 층을 쌓았다. 작은 특징을 찾고, 위치 변화의 영향을 줄이며, 다음 층에서 더 넓은 관계를 다루려는 발상이다.',
        'LeNet은 이 흐름에서 국소 연결·공유 가중치·서브샘플링을 결합한 구조를 쓰고, 문자 정답의 오차를 역전파해 특징을 찾는 연결값까지 학습했다. 시각 시스템에서 가져온 구조의 단서와 경험에서 배우는 방법을 연결한 것이다.'
      ],
      visual:{
        id:'shared-features',navLabel:'시각에서 신경망으로',
        title:'시각 피질의 관찰이, 망의 구조가 되기까지',
        caption:'먼저 시각 자극을 바꿔 뉴런의 반응을 비교한 실험과, 눈에서 시각 피질로 이어지는 경로를 살펴보세요. 그 뒤에 이 관찰이 LeNet의 구조에 어떻게 이어지는지 연결합니다.',
        visionSystem:{
          experiment:{
            eyebrow:'01 · 고양이 시각 피질의 실험',
            title:'같은 선도, 기울기를 바꾸면 반응이 달라졌다',
            intro:'Hubel과 Wiesel은 고양이에게 선 자극을 보여 주며 시각 피질의 한 뉴런에서 활동을 기록했다. 일부 뉴런은 수용장 안에 놓인 선의 특정 기울기에 더 잘 반응했다. 세포가 무엇에 반응하는지를 자극과 함께 비교한 것이다.',
            angles:[
              {value:45,label:'기울어진 선 ∕',text:'선호하는 기울기와 맞는 자극에서는 반응이 강해진다. 장면 전체의 밝기만 보는 것이 아니라, 국소 영역의 특정한 선 구조에 선택적으로 반응하는 세포가 있다는 단서다.'},
              {value:90,label:'세로 선 │',text:'같은 위치의 선도 기울기가 달라지면 반응이 줄어들 수 있다. 여기서는 ∕ 기울기를 선호하는 세포를 가정해 비교한다. 모든 뉴런이 같은 기울기를 선호하는 것은 아니다.'},
              {value:0,label:'가로 선 ─',text:'가로 선에도 같은 강도로 반응하지 않는다. 기울기에 대한 선택성과 선이 놓인 시야의 위치는 구분해서 살펴봐야 한다. 이 그림은 선의 기울기를 바꾸는 비교다.'}
            ],
            scope:'∕ 기울기를 선호하는 세포의 반응 경향을 재구성했습니다. 표시한 발화 틱은 실측 기록이나 발화 횟수가 아닙니다.',
            source:{title:'Hubel·Wiesel (1962) · 인쇄 p.116, Text-fig.4의 자극·반응 비교 참조',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC1359523/'}
          },
          pathway:{
            eyebrow:'02 · 사람 시각 경로의 위치 개요',
            title:'눈에 들어온 빛은, 어디에서 처리될까?',
            intro:'장미에서 온 빛은 망막에서 신경 신호로 바뀐다. 주요 시각 경로를 따라 전달된 신호는 시각 피질의 여러 영역에서 처리된다. 아래 영역을 선택해 신호의 흐름과 각 위치를 함께 살펴보세요.',
            stages:[
              {id:'retina',label:'망막',title:'망막 · 빛을 신경 신호로',text:'눈 뒤쪽의 망막에서 빛을 감지한다. 여러 망막 세포를 거친 신호를 망막 신경절세포가 시신경으로 보낸다. 장미의 사진이 그대로 뇌로 옮겨지는 과정은 아니다.'},
              {id:'lgn',label:'LGN',title:'LGN · 시상 안의 시각 중계핵',text:'외측슬상핵(LGN)은 뇌 깊은 곳의 시상에 있다. 망막에서 온 주요 시각 신호를 받아 1차 시각 피질로 보낸다. 모든 시각 신호가 이 경로 하나로만 전달되는 것은 아니다.'},
              {id:'v1',label:'V1',title:'V1 · 후두엽의 1차 시각 피질',text:'뇌 뒤쪽의 후두엽에 있는 V1에서 위치와 선의 기울기 같은 국소적 시각 특징에 반응하는 세포들을 만난다. 앞의 고양이 실험은 이런 특징 선택성을 이해하는 단서가 됐다.'},
              {id:'higher',label:'그 이후의 영역',title:'여러 시각 영역 · 형태와 관계를 함께 처리',text:'V1 이후에는 여러 시각 영역이 형태·색·움직임 등 다양한 정보를 처리한다. 이 영역들은 병렬·되먹임 연결을 이루며, V2→V3→V4→LOC의 한 줄로만 작동하지 않는다. LOC도 사물의 의미를 최종 판정하는 한 지점으로 보지 않는다.'}
            ],
            scope:'위치와 주요 연결을 보여 주는 개념도입니다. 실제 크기·경계·전체 배선을 재현한 해부도는 아닙니다. 점선과 분기는 되먹임·병렬 연결을 나타냅니다.',
            source:{title:'NIH/NEI · 망막–LGN–시각 피질 경로 설명',url:'https://www.nei.nih.gov/research-and-training/research-news/nih-researchers-identify-brain-circuits-responsible-visual-acuity'}
          },
          layerConnections:{
            title:'시각계의 단서가, LeNet의 각 층에 어떻게 담겼을까?',
            intro:'층을 선택하면 위의 시각계 그림과 아래 LeNet 구조가 함께 강조됩니다. 시각계에서 가져온 발상과, 그 발상을 망에서 구현한 선택을 나란히 읽어 보세요.',
            defaultLayer:'c1',
            scope:'강조한 뇌 부위는 아이디어를 이해하는 배경입니다. 특정 뇌 영역과 LeNet 층이 일대일로 대응한다는 뜻은 아닙니다. LGN을 특정 LeNet 층으로 옮겨 놓지도 않습니다.',
            source:{title:'LeCun 외 (1998) · 저자 보관본 pp.6–8, §II.A–B·Fig.2',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=6'},
            items:[
              {id:'input',label:'입력',size:'32 × 32',idea:'영상의 입력 표현',title:'입력 · 빛 대신, 화소 값에서 출발',visionStage:'retina',kind:'engineering',
                biological:'생물은 망막에서 빛을 신경 신호로 바꾸어 시각 경로에 전달한다. 위의 망막 표시는 입력이 어디서 시작되는지 비교하는 배경이다.',
                implementation:'LeNet-5는 32×32 영상의 화소 값을 받는다. 망막의 세포와 회로를 재현한 입력층은 아니다. 준비된 글자 영상에서 인식을 시작하도록 정한 표현이다.',
                source:{title:'저자 보관본 p.7 · 입력과 Fig.2',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7'}},
              {id:'c1',label:'C1',size:'6 × 28 × 28',idea:'국소 특징 찾기',title:'C1 · 작은 영역에서 찾은 특징을 여러 위치에서',visionStage:'v1',kind:'inspired',
                biological:'시각 피질의 일부 뉴런은 시야의 작은 영역에 놓인 선의 기울기에 선택적으로 반응한다. 국소 수용장과 특징 선택성이 작은 부분에서 특징을 찾는 발상의 단서다.',
                implementation:'각 단위가 입력의 5×5 영역을 본다. 한 지도 안에서는 같은 25개 가중치와 편향을 여러 위치에서 공유하며, 서로 다른 기준을 배우는 6개의 특징 지도를 만든다. 가중치 공유는 망에 넣은 설계 제약이다.',
                source:{title:'저자 보관본 pp.6–7 · 국소 수용장·공유 가중치와 C1',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7'}},
              {id:'s2',label:'S2',size:'6 × 14 × 14',idea:'주변 반응 모으기',title:'S2 · 특징의 정확한 위치를 덜 세밀하게',visionStage:'v1',kind:'inspired',
                biological:'복잡세포의 반응은 선이 수용장 안의 조금 다른 위치에 놓여도 유지되는 경우가 있었다. 주변의 특징 반응을 모아 위치 변화의 영향을 줄인다는 발상이 Neocognitron의 계층과 이어진다.',
                implementation:'C1의 각 지도에서 2×2 반응을 묶는다. 합에 학습 계수를 곱하고 편향과 비선형 함수를 적용해 14×14로 줄인다. 원래 LeNet의 서브샘플링이며 최대 풀링으로 바꿔 읽지 않는다.',
                source:{title:'저자 보관본 pp.6–7 · 서브샘플링과 S2',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7'}},
              {id:'c3',label:'C3',size:'16 × 10 × 10',idea:'특징들의 관계 결합',title:'C3 · 앞서 찾은 부분 특징을 함께',visionStage:'higher',kind:'inspired',
                biological:'작은 특징의 반응을 층을 거치며 결합한다는 계층의 발상이다. 위 그림의 여러 시각 영역은 이 배경을 보여 주며, C3의 특정한 뇌 위치를 가리키지 않는다.',
                implementation:'선택된 S2 지도들의 5×5 영역을 함께 보아 16개 지도를 만든다. 모든 지도를 전부 연결하지 않는 부분 연결은 파라미터 수와 특징의 다양성을 고려한 설계다.',
                source:{title:'저자 보관본 pp.7–8 · C3와 Table I',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7'}},
              {id:'s4',label:'S4',size:'16 × 5 × 5',idea:'결합한 반응 모으기',title:'S4 · 결합한 특징의 위치 정보도 모아서',visionStage:'higher',kind:'inspired',
                biological:'특징을 찾는 단계와 그 반응을 모으는 단계를 반복한다는 계층의 발상을 한 번 더 적용한다. 뇌의 네 번째 시각 영역이라는 뜻의 이름은 아니다.',
                implementation:'C3의 각 지도에서 2×2 영역을 다시 묶어 16개의 5×5 지도를 만든다. 더 넓은 배치의 특징을 다루면서 위치를 표현하는 공간 크기는 줄어든다.',
                source:{title:'저자 보관본 p.8 · S4',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=8'}},
              {id:'c5',label:'C5',size:'120 × 1 × 1',idea:'넓은 특징 조합',title:'C5 · 남은 특징 지도를 넓게 함께',visionStage:'overview',kind:'engineering',
                biological:'부분에서 더 넓은 특징 조합으로 나아간다는 계층의 생각을 배경으로 삼는다. 여기서는 C5에 대응하는 특정 고등 시각 영역을 정해 강조하지 않는다.',
                implementation:'16개 S4 지도 전체에 걸친 5×5 연결로 120개의 1×1 반응을 만든다. 고정된 32×32 입력에서는 완전 연결과 동등하지만 원문은 합성곱층 C5로 설명한다.',
                source:{title:'저자 보관본 p.8 · C5',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=8'}},
              {id:'f6',label:'F6',size:'84',idea:'문자 표현 설계',title:'F6 · 문자를 비교할 표현으로',visionStage:'overview',kind:'engineering',
                biological:'시각계에서 얻은 구조의 단서를 문자인식 과제에 맞추어 이어 가는 부분이다. F6의 84개 단위에 특정한 뇌 영역을 대응시키지는 않는다.',
                implementation:'C5와 완전히 연결된 84개 단위를 둔다. 84라는 크기는 출력의 기준 벡터를 7×12 문자 비트맵으로 설계한 이유와 연결된다. 뇌 영역의 이름이나 세포 수에서 정한 값이 아니다.',
                source:{title:'저자 보관본 p.8 · F6와 7×12 기준 코드',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=8'}},
              {id:'output',label:'출력',size:'10 · RBF',idea:'숫자별 기준과 비교',title:'출력 · 어떤 숫자의 기준과 가까운가',visionStage:'overview',kind:'engineering',
                biological:'앞선 특징층이 시각계에서 얻은 단서를 반영했다면, 마지막 출력은 숫자 분류라는 과제를 마무리하는 설계다. 뇌 속의 단일한 인식 장소를 그린 층은 아니다.',
                implementation:'10개의 RBF 단위가 F6 표현과 숫자별 기준 벡터 사이의 제곱거리를 계산한다. 값이 작을수록 해당 기준과 가깝다. 이 값은 클래스 확률이 아니다.',
                source:{title:'저자 보관본 p.8 · 유클리드 RBF 출력',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=8'}}
            ]
          },
          bridge:{title:'층의 구조와, 그 안에서 배울 특징을 함께',text:'이 구조의 학습 가능한 가중치는 글자 정답에서 얻은 오차로 조정한다. 출력 쪽의 오차가 앞선 특징층의 연결 조정에도 쓰이므로, 국소적으로 무엇을 찾고 어떤 조합을 구분에 사용할지도 학습의 대상이 된다.'}
        },
        stages:[
          {id:'local',label:'작은 영역',text:'한 단위는 작은 이웃 영역을 본다. 가까운 화소들의 관계에서 획 같은 부분 특징을 찾도록 연결 범위를 정했다.'},
          {id:'shared',label:'같은 기준',text:'어느 위치에서도 같은 필터값을 쓴다. 입력을 옆으로 옮기면 특징 지도의 반응 위치도 따라 움직이는 것을 살펴볼 수 있다.'},
          {id:'hierarchy',label:'층의 연결',text:'초기 특징을 모으고 다시 결합하면서 더 넓은 영역의 관계를 다룬다. 아래 그림은 논문 Fig.2의 전체 구조이며, 위 계산은 첫 특징 지도의 원리를 살핀 부분이다.'}
        ],
        scope:'화면의 획과 필터값은 원리를 살펴보도록 직접 정했습니다. LeNet-5의 학습된 가중치나 숫자 인식 결과는 아닙니다.',
        source:{title:'LeCun 외 (1998) · §II.A–B, 저자 보관본 pp.6–8·Fig.2를 바탕으로 재구성',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7'}
      },
      takeaway:{title:'시각에서 얻은 구조의 단서에, 학습을 연결했다',text:'국소 수용장과 특징 반응의 계층이라는 생물 시각계의 아이디어를 망의 설계에 반영했다. 그 구조 안에서 무엇을 보고 글자를 구분할지는 정답의 오차로 학습한다. LeNet을 이해하는 출발점은 이 연결이다.'},
      technical:{
        title:'원문의 구조·공유 가중치·화면 계산 더 읽기',
        paragraphs:[
          '기준은 1998년 종합 논문의 저자 보관 원고다. PDF 자체 쪽수 1–46을 사용하며, 출판본의 2278–2324쪽과 혼용하지 않는다. 1989년 문자인식 논문은 인물별 기록에서 별도로 다룬다.',
          'Fig.2의 흐름은 입력 32×32 → C1 6×28×28 → S2 6×14×14 → C3 16×10×10 → S4 16×5×5 → C5 120×1×1 → F6 84 → 출력 10이다. C1의 각 단위는 입력의 5×5 영역을 받으며, 같은 특징 지도 안에서 25개 가중치와 편향을 공유한다.',
          '화면에서는 직접 구성한 0·1 획 그림과 고정 5×5 필터를 곱해 더한다. 편향과 비선형 활성함수, 이후 층의 학습된 반응은 계산하지 않는다. 위치를 옮겨도 같은 필터를 쓴다는 관계를 보여 주는 계산이며, 완전한 LeNet-5 순전파가 아니다.',
          '원문 §II.A는 입력 이동에 따라 특징 지도도 이동한다고 설명한다. 그 지도 자체가 언제나 같게 유지되는 것은 아니다. 이후의 정보 축약과 특징 결합이 위치 변화에 대한 민감도를 줄이도록 설계됐다.',
          'S2·S4는 2×2 영역을 묶는 서브샘플링 층이다. §II.B의 상세 설명은 네 입력의 합에 학습 가능한 계수를 곱하고 편향을 더한 뒤 비선형 함수를 적용한다. 원래 구조를 현대의 최대 풀링으로 바꾸어 읽지 않는다. C3는 S2의 모든 지도에 완전히 연결되지 않는다.',
          '고정 32×32 입력에서 C5는 16개 S4 지도 전체에 5×5 창을 적용해 120개 반응을 만든다. F6까지는 scaled tanh 계열 비선형성을 쓴다. 마지막의 유클리드 RBF 출력은 클래스별 기준 벡터와의 제곱거리를 계산한다. 값이 작을수록 그 기준과 가까우며 확률을 의미하지 않는다.',
          '원문 p.6은 Hubel·Wiesel의 국소적·방향 선택적 뉴런 연구를 언급하고, 합성곱·서브샘플링 조합을 단순세포·복잡세포에서 영감을 얻은 Neocognitron과 연결한다. Neocognitron의 S/C라는 이름과 LeNet의 C/S라는 이름은 다르다. 이름이 비슷하다는 이유로 층을 같은 기능으로 대응시키지 않는다.',
          'Hubel·Wiesel의 1962년 논문에서 Text-fig.19–20은 반응 특성을 설명하기 위한 연결 가설이다. 실제 배선을 모두 확인한 그림으로 제시하지 않는다. 여기서 그린 생물 시각계와 모형의 관계 역시 개념도다. LeNet의 공유 가중치와 역전파를 뇌의 회로·학습 규칙과 동일시하지 않는다.',
          'LeNet 논문 p.6의 Neocognitron 인용 [32]는 Fukushima·Miyake의 1982년 후속 논문이다. 이 카드는 생물학적 영감과 선행 모형을 배경으로 네 공동저자의 1998년 종합 논문을 다룬다.'
        ],
        formula:'화면의 한 위치 반응 = Σᵤ Σᵥ 입력[y+u, x+v] × 필터[u,v]\n같은 필터를 모든 위치에 적용 → 위치별 반응을 특징 지도에 기록'
      }
    },
    keyIdeas:[
      {title:'획의 정확한 좌표보다, 특징들의 배치를 보려 했다',text:'원문은 위쪽의 가로 획 끝과 모서리, 아래쪽의 세로 획 끝을 함께 보면 숫자 7을 알아볼 수 있다는 예를 든다. 각 특징의 정확한 좌표보다 서로의 대략적인 배치가 인식에 유용하다는 관점이다. 서브샘플링은 위치 정보를 덜 세밀하게 만들어 작은 이동의 영향을 줄이려는 설계다.'},
      {title:'공유한 기준에는 여러 위치의 학습 신호가 모인다',text:'같은 연결값을 여러 위치에서 사용하므로, 학습할 때도 그 위치들의 기여가 같은 파라미터에 모인다. 위치마다 독립된 필터를 따로 두는 것보다 적은 공유값으로 이미지를 살필 수 있다.'},
      {title:'84개의 단위에는 문자 코드의 설계도 담겨 있다',text:'논문은 출력의 기준 벡터를 7×12 문자 비트맵으로 설계해 84개 성분을 썼다. 모양이 닮아 혼동하기 쉬운 문자들의 코드도 비슷하게 두어, 후단의 문맥 판단에 연결하려 했다. F6의 84라는 크기에는 이런 설계 이유가 있다.'},
      {title:'글자를 어디서 자를지도 전체 인식 문제의 일부였다',text:'논문은 잘린 4의 오른쪽을 1로, 잘린 8의 오른쪽을 3으로 볼지 모호한 경우를 든다. 문자 하나씩의 판단과 함께 분할·인식·문맥 모듈을 문자열 전체의 오차로 학습하려는 GTN 구상을 제시한다. 1998년 연구의 범위는 숫자 한 장의 분류보다 넓었다.'}
    ],
    videos:[{title:'MIT 6.S191 (2024): Convolutional Neural Networks',url:'https://www.youtube.com/watch?v=2xqkSUhmmXU',channel:'MIT 6.S191',note:'합성곱과 영상 인식을 다루는 후대의 배경 강의. 1998년 논문 저자의 발표와 구분해서 읽는 자료다.',sourceUrl:'https://introtodeeplearning.com/2024/'}],
    references:[
      {title:'LeCun·Bottou·Bengio·Haffner · Gradient-Based Learning Applied to Document Recognition',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf',location:'저자 보관 원고 자체 쪽수 기준. p.1 문제의식·Fig.1, p.4 분할·전체 시스템 학습, pp.5–6 국소성·공유 가중치·서브샘플링, p.7 Fig.2·C1/S2/C3, p.8 C3/S4/C5/F6·RBF·Fig.3, Appendix C p.41 식 (19) 공유 가중치의 기울기. 해당 본문·도판을 지면으로 확인. 텍스트 추출 글꼴은 깨져 있어 렌더링을 대조했다.'},
      {title:'Hubel·Wiesel (1962) · Receptive Fields, Binocular Interaction and Functional Architecture in the Cat’s Visual Cortex',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC1359523/',location:'원문 인쇄 pp.109–112·Text-fig.2: 수용장과 기울기 선택성. pp.114–117·Text-figs.3–4: 복잡세포의 반응. pp.141–144·Text-figs.19–20: 관찰을 설명하는 잠정적인 계층 연결 모형. 실측한 전체 신경 배선도로 읽지 않는다.'},
      {title:'Fukushima (1980) · Neocognitron: A Self-organizing Neural Network Model for a Mechanism of Pattern Recognition Unaffected by Shift in Position',url:'https://link.springer.com/article/10.1007/BF00344251',location:'초기 Neocognitron 논문. 본문 pp.194–195·Figs.1–3, pp.198–199·Fig.5에서 S/C 계층을 확인. 자기조직화 학습이며 LeNet의 역전파 학습과 구분한다. LeNet의 직접 인용 [32]는 아래 1982년 후속 논문이다.'},
      {title:'Fukushima·Miyake (1982) · Neocognitron: A New Algorithm for Pattern Recognition Tolerant of Deformations and Shifts in Position',url:'https://www.sciencedirect.com/science/article/pii/0031320382900243',location:'LeNet 저자 원고의 인용 [32]. Pattern Recognition 15, 455–469. LeNet p.6에서 단순세포·복잡세포의 발상과 합성곱·서브샘플링 조합을 설명하며 연결한 후속 논문. 이 항목은 서지와 인용 관계를 확인했으며, 본문 도식 확인은 1980년 초기 논문을 사용했다.'},
      {title:'Bottou · 1998 논문 공식 서지',url:'https://bottou.org/papers/lecun-98h',location:'네 공동저자, Proceedings of the IEEE 86(11), 2278–2324, 1998 확인. 46쪽 저자 보관 원고와 출판본의 쪽수 체계를 구분한다.'},
      {title:'NIH/NEI · 망막에서 LGN과 시각 피질로 이어지는 경로',url:'https://www.nei.nih.gov/research-and-training/research-news/nih-researchers-identify-brain-circuits-responsible-visual-acuity',location:'연구기관 본문의 망막–시신경–시상 LGN–시각 피질 경로 설명을 확인했다. 이 기사에서 소개한 동물 실험 결과를 사람 대상 실험 결과로 사용하지 않는다.'},
      {title:'Felleman·Van Essen (1991) · Distributed Hierarchical Processing in the Primate Cerebral Cortex',url:'https://doi.org/10.1093/cercor/1.1.1-a',location:'원문 인쇄 p.14의 상호·병렬·단계 건너뛰는 연결 설명 대조. 주요 대상은 마카크 원숭이다. 여러 영역의 계층을 단일한 직렬 경로로 그리지 않는 근거로 사용한다.'},
      {title:'Malach 외 (1995) · Object-related Activity Revealed by Functional Magnetic Resonance Imaging in Human Occipital Cortex',url:'https://pubmed.ncbi.nlm.nih.gov/7667258/',location:'사람 fMRI 연구의 공식 초록 확인. LO의 사물 관련 반응과 해석 범위를 확인했으며 전체 본문은 대조하지 못했다. LOC를 최종 의미 인식의 단일 지점으로 표시하지 않는다.'},
      {title:'MIT · Introduction to Deep Learning 2024',url:'https://introtodeeplearning.com/2024/',location:'Lecture 3 Deep Computer Vision의 공식 영상 연결 확인. YouTube ID 2xqkSUhmmXU. 재생·전체 시청은 검사하지 않았다.'}
    ]
  }
});
