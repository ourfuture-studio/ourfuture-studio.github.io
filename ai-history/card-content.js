/* Deeper reading for the original 24 milestones.
 * Small examples are authored teaching models, not reproductions of the cited experiments.
 * Video notes describe metadata and course-page checks, not full viewing or playback QA.
 */
window.ATLAS_CARD_CONTENT = {
  'mcculloch-pitts': {
    keyIdeas: [
      { title: '연결이 계산을 정한다', text: '각 단위를 켜짐과 꺼짐으로 단순화하고, 들어오는 신호와 억제 연결로 다음 상태를 정한다. 여러 단위를 연결하면 개별 반응을 넘어 논리식에 대응하는 계산을 만들 수 있다.' },
      { title: '논리적 대응과 생물학적 설명', text: '논문은 특정 가정 아래 신경망과 논리식의 관계를 연구한다. 이 형식적 대응이 실제 뇌의 생리 작용 전체를 설명한다는 뜻은 아니다. 연구자들은 그 차이를 본문에서 직접 구분했다.' }
    ],
    theory: { text: '교육용 단순화에서는 입력 합이 문턱에 도달할 때 출력을 켠다. 문턱과 연결이 고정되어 있으므로 같은 입력은 같은 출력을 만든다. 원논문의 억제와 시간 지연 가정은 별도로 읽어야 한다.', formula: 'y = 1[x₁ + x₂ ≥ 2],  x₁,x₂ ∈ {0,1}' },
    example: { title: '두 사람이 모두 준비했을 때 켜지는 표시등', text: '두 준비 신호를 각각 0과 1로 적는다. 문턱을 2로 정하면 한 명만 준비했을 때는 표시등이 꺼지고, 둘 다 준비했을 때만 켜진다. 문턱을 1로 바꾸면 다른 조건을 표현한다.', steps: ['입력 (0,0), (1,0), (0,1), (1,1)을 비교한다.', '고정 문턱을 2에서 1로 바꾸고 출력표를 다시 읽는다.', '사례를 보고 값을 학습한 과정은 없었음을 확인한다.'] },
    story: { title: '처음부터 닿아 있던 신경과 논리', text: '논문은 신경 활동의 관계를 명제논리로 다루는 문제에서 출발한다. 두 접근을 완전히 분리된 진영의 역사로만 설명하기 어려운 구체적인 초기 사례다.', kind: '연구 맥락', source: { title: 'McCulloch·Pitts 원문 p.115, p.117', url: 'https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf' } },
    videos: [],
    references: [{ title: 'A Logical Calculus of the Ideas Immanent in Nervous Activity', url: 'https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf', location: '인쇄 p.115 초록, p.117 형식적 대응의 범위, p.118 가정, p.120–121 회로와 논리식' }]
  },
  'logic-theorist': {
    keyIdeas: [
      { title: '증명을 찾는 일도 탐색이다', text: '이미 가진 논리식과 적용할 수 있는 규칙에서 새로운 식을 만든다. 목표 정리에 닿는 경로를 찾으면 그 경로가 증명의 후보가 된다. 규칙의 올바름과 어느 후보부터 살필지는 서로 다른 문제다.' },
      { title: '휴리스틱은 순서를 안내한다', text: '가능한 후보를 모두 같은 순서로 조사하면 탐색이 커질 수 있다. Logic Theory Machine의 명세는 유망한 방향을 고르는 휴리스틱을 적극적으로 사용한다. 안내가 유용하더라도 모든 문제를 빠르게 풀 수 있다는 보장은 아니다.' }
    ],
    theory: { text: '탐색에서는 현재 가진 식, 적용 가능한 변환, 목표가 필요하다. 같은 규칙이라도 후보를 확장하는 순서가 바뀌면 목표에 이르기까지 살피는 경로의 수가 달라질 수 있다.' },
    example: { title: 'A에서 C로 가는 작은 증명 지도', text: 'A가 참이고 A이면 B, B이면 C라는 규칙이 있다고 하자. A에서 B를 얻고 다시 C를 얻는 경로를 표시한다. 목표 C와 무관한 D·E 규칙을 추가하면 탐색 순서의 차이를 비교할 수 있다.', steps: ['A와 두 규칙을 준비한다.', '각 단계에서 사용할 규칙을 하나 고른다.', 'C에 이르는 경로와 옆길을 비교한다. 이 예시는 원시스템의 실행 로그가 아니다.'] },
    story: { title: '명세 문서와 구현의 기록', text: '1956년 RAND P-868은 시스템을 형식적인 의사 코드로 기술하는 명세 문서다. 이를 곧바로 실제 컴퓨터의 실행 결과로 읽지 않으며, 구현 과정의 J. C. Shaw 기여도 별도 기록으로 살핀다.', kind: '연구 맥락', source: { title: 'RAND P-868 문서 설명', url: 'https://www.rand.org/pubs/papers/P868.html' } },
    videos: [],
    references: [{ title: 'The Logic Theory Machine: A Complex Information Processing System', url: 'https://www.rand.org/pubs/papers/P868.html', location: 'RAND의 본문 설명: 휴리스틱, 형식 명세, 컴퓨터 구현과의 구분. 원문 PDF는 이미지 스캔.' }]
  },
  'perceptron': {
    keyIdeas: [
      { title: '판단과 학습을 구분한다', text: '현재 연결 값으로 답을 계산하는 것이 판단이고, 정답과 비교해 연결 값을 바꾸는 것이 학습이다. 학습이 끝난 뒤의 결정 경계만 보면 어떤 예시와 순서로 그 값이 만들어졌는지는 알 수 없다.' },
      { title: '반복보다 표현이 먼저 막힐 수도 있다', text: '오늘날 입문에서 쓰는 단일 선형 퍼셉트론은 하나의 선형 경계로 분류한다. XOR처럼 그 경계로 나눌 수 없는 배치는 반복만 늘려 해결되지 않는다. 이 조건을 신경망 전체의 불가능성으로 넓혀 읽어서는 안 된다.' }
    ],
    theory: { text: '아래 식은 현대적인 단일 퍼셉트론 설명을 위한 표기다. 입력 x, 정답 t, 예측 y, 학습률 η를 구분한다. 1958년 논문이 연구한 지각·연상·반응 모형 전체를 이 한 식으로 대체하지 않는다.', formula: 'z = w·x + b;  y = 1[z > 0];  w ← w + η(t − y)x' },
    example: { title: '틀린 점 하나가 경계를 움직이면', text: '두 특징을 가진 점과 정답 표지를 준비한다. 틀린 점을 만날 때만 정해 둔 규칙으로 가중치를 바꾸고 경계가 이동하는 모습을 본다. 같은 네 점을 AND와 XOR 표지로 번갈아 읽으면 데이터와 표현 구조의 차이가 드러난다.', steps: ['입력·정답·초기 가중치·제시 순서를 고정한다.', '예측과 정답이 다른지 확인한다.', '갱신 전후 경계와 여전히 틀린 점을 함께 표시한다.'] },
    videos: [{ title: 'Lecture 12A: Neural Nets', url: 'https://www.youtube.com/watch?v=uXt8qF2Zzfo', channel: 'MIT OpenCourseWare', note: 'Patrick Winston의 신경망 기초 강의. 공식 설명에서 신경망과 역전파 범위를 확인했으며 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/' }],
    references: [{ title: 'Rosenblatt, The Perceptron, 1958 원문', url: 'https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf', location: '인쇄 p.386 도입의 지각·기억·행동 질문, 원문 모형 설명. 위 수식과 XOR 조작은 별도 교육용 단순화.' }, { title: '1958년 학술 논문 서지', url: 'https://pubmed.ncbi.nlm.nih.gov/13602029/', location: 'Psychological Review 65(6), 386–408. 초록은 제공하지 않는 서지 페이지.' }]
  },
  'advice-taker': {
    keyIdeas: [
      { title: '절차 대신 사실을 더해 본다', text: '모든 행동 순서를 새로 프로그램하는 대신 사실과 관계를 문장으로 알려 주고, 이미 가진 규칙에서 따라 나오는 결론을 구하려는 제안이다. 말로 요청한다는 사실보다 문장을 어떤 형식과 의미로 표현하는지가 핵심이다.' },
      { title: '추론 규칙만 있어서는 부족하다', text: '무엇을 알고 있는지뿐 아니라 지금 문제에 관련된 전제를 어떻게 모을지도 필요하다. McCarthy는 모든 지식에 한꺼번에 추론을 적용하면 너무 오래 걸린다고 설명하며, 전제 선택과 휴리스틱의 역할을 남겨 두었다.' }
    ],
    theory: { text: '논리적 귀결은 전제가 주어졌을 때 따르는 결론이다. 전제를 현실에서 어떻게 확인했는지와 추론이 올바른지는 구분해야 한다.', formula: 'KB = {P(a), ∀x(P(x) → Q(x))}  ⇒  KB ⊨ Q(a)' },
    example: { title: '메뉴에 필요한 재료를 알려 주기', text: '라테에는 우유가 필요하고 오늘 우유를 사용할 수 있다는 사실을 적는다. 별도로 모든 필수 재료를 사용할 수 있을 때만 준비 가능으로 표시한다는 규칙을 둔다. 재고 미확인과 재고 0을 서로 다른 상태로 남겨야 결론의 조건이 분명해진다.', steps: ['용어와 식별자를 먼저 맞춘다.', '확인한 사실만 넣는다.', '어느 사실과 규칙이 결론에 쓰였는지 표시한다.'] },
    story: { title: '공항으로 가는 예시의 역할', text: '원문은 책상에서 자동차로 걸어가고 공항까지 운전하는 예시로 형식화와 행동 연결을 설명한다. 동시에 필요한 전제를 고르고 추론하는 휴리스틱에는 완전한 답을 주지 못했다고 적는다.', kind: '연구 맥락', source: { title: 'The Construction of the Advice Taker', url: 'https://www-formal.stanford.edu/jmc/mcc59/node2.html' } },
    videos: [],
    references: [{ title: 'Programs with Common Sense · Introduction', url: 'https://www-formal.stanford.edu/jmc/mcc59/node1.html', location: '선언적 문장과 절차, 제안의 목표, 경험 학습과 표현의 관계' }, { title: 'The Construction of the Advice Taker', url: 'https://www-formal.stanford.edu/jmc/mcc59/node2.html', location: '특징 3의 추론·전제 선택, 공항 예시와 미해결 휴리스틱' }]
  },
  'resolution': {
    keyIdeas: [
      { title: '목표의 부정을 더해 모순을 찾는다', text: '전제에서 목표가 따르는지 보려면 전제에 목표의 부정을 추가하고 모순이 생기는지 조사할 수 있다. Resolution은 절에서 서로 반대되는 리터럴을 연결해 새 절을 만드는 추론 규칙이다.' },
      { title: '변수를 맞추는 일도 계산한다', text: 'P(x)와 P(a)를 연결하려면 x를 a로 치환하는 식의 맞춤이 필요하다. Robinson은 치환과 추론을 기계적으로 처리하는 체계를 제시했다. 완전성은 적절한 탐색에서 모순을 찾을 수 있다는 성질이며 계산 시간의 보장은 아니다.' }
    ],
    theory: { text: '가장 작은 명제논리 예시에서는 P가 참이거나 Q가 참이라는 절과 P가 거짓이라는 절에서 Q를 얻는다. 1차 논리에서는 항의 치환과 변수 처리가 추가된다. 모순이 없는 경우에도 탐색이 끝나지 않을 수 있으므로 시간 제한과 미해결 상태를 별도로 남긴다.', formula: '(P ∨ Q), ¬P  ⟹  Q;     Q, ¬Q  ⟹  □' },
    example: { title: '결론을 부정했다가 빈 절에 도달하기', text: 'P(a), 그리고 모든 x에 대해 P(x)이면 Q(x)라는 전제를 두고 Q(a)를 확인한다. Q(a)의 부정을 더한 뒤 x=a로 맞춰 Q(a)를 얻으면 두 절이 충돌한다. 빈 절은 그 전제와 부정 목표를 동시에 만족시킬 수 없음을 나타낸다.', steps: ['목표의 부정을 추가한다.', '치환할 항과 반대 리터럴을 고른다.', '도출 경로를 남기고 빈 절 여부를 확인한다.'] },
    videos: [],
    references: [{ title: 'A Machine-Oriented Logic Based on the Resolution Principle', url: 'https://web.stanford.edu/class/linguist289/robinson65.pdf', location: '초록·§1, 절·치환·resolution 체계와 완전성 및 탐색 논의' }]
  },
  'strips': {
    keyIdeas: [
      { title: '행동에는 조건과 효과가 있다', text: '문을 연다는 이름만 적어서는 계획을 만들기 어렵다. 열쇠를 가지고 있어야 한다는 조건, 열린 문이 된다는 효과처럼 행동 전후의 차이를 명시한다. STRIPS는 이러한 연산자로 세계 모형을 바꾸는 순서를 찾는다.' },
      { title: '모형의 성공과 실행의 성공', text: '계획기는 주어진 모형에서 목표를 만족하는 경로를 찾는다. 실제로 열쇠가 부러졌거나 문이 고장 났다면 관찰과 실행 확인이 더 필요하다. 기호 계획의 결과만으로 현실의 성공을 완료 처리하지 않는다.' }
    ],
    theory: { text: '교육용 고전 계획 모형에서는 현재 사실 집합에서 삭제 목록을 빼고 추가 목록을 더한다. 적용 전에 행동의 전제 조건을 확인한다. 원논문은 1차 논리 세계 모형과 정리증명기를 함께 사용한다.', formula: 'S′ = (S ∖ Delete(action)) ∪ Add(action)' },
    example: { title: '열쇠를 줍고 문을 열기', text: '시작 상태에는 열쇠가 탁자 위에 있고 문은 잠겨 있다. 줍기는 손에 열쇠가 있다는 사실을 추가하고, 열기는 그 사실을 전제로 문의 잠금을 바꾼다. 행동 이름의 순서만 바꿔서는 같은 결과가 나오지 않는다.', steps: ['열기부터 시도해 누락된 조건을 찾는다.', '줍기 후 삭제·추가되는 사실을 표시한다.', '열기를 적용하고 목표 상태를 확인한다.'] },
    story: { title: '이동뿐 아니라 바뀌지 않는 것도 적어야 했다', text: '원문은 물체 밀기 등의 행동에 전제·삭제·추가 목록을 붙인다. 이는 행동 뒤 세계의 어떤 사실이 달라지는지 명시적으로 관리하는 방식이다.', kind: '연구 맥락', source: { title: 'STRIPS 원문 연산자 설명', url: 'https://ijcai.org/proceedings/1971/0063.pdf' } },
    videos: [],
    references: [{ title: 'STRIPS: A New Approach to the Application of Theorem Proving to Problem Solving', url: 'https://ijcai.org/proceedings/1971/0063.pdf', location: '초록, 세계 모형과 연산자 설명, PDF p.5의 add/delete 목록과 push 예시' }]
  },
  'prolog': {
    keyIdeas: [
      { title: '관계와 질문으로 프로그램을 읽는다', text: '사실과 규칙을 적은 뒤 어떤 값이 관계를 만족하는지 묻는다. 규칙의 변수는 여러 대상에 적용할 수 있고, 질의의 변수를 채우는 답이 계산의 결과가 된다. 논리적 의미와 실제 실행 순서는 구분해 살펴야 한다.' },
      { title: '탐색 순서가 종료와 비용을 바꾼다', text: 'Prolog의 계산은 절을 선택하고 하위 목표를 풀며 필요하면 되돌아가는 방식으로 진행한다. 논리적으로 같은 관계를 표현해도 재귀 규칙이나 목표의 순서에 따라 답을 찾는 속도와 종료 여부가 달라질 수 있다.' }
    ],
    theory: { text: 'Horn 절에서 머리는 결론, 몸체는 그 결론을 얻기 위해 풀어야 할 목표다. 표준 Prolog의 구체적인 제어를 논리 프로그램 전체의 유일한 실행법으로 일반화하지 않는다.', formula: 'ancestor(X,Y) :- parent(X,Y).\nancestor(X,Y) :- parent(X,Z), ancestor(Z,Y).' },
    example: { title: '부모 기록에서 조상을 묻기', text: 'parent(mina,jun)과 parent(jun,su)를 두고 ancestor(mina,Who)를 묻는다. 첫 규칙에서는 jun을, 재귀 규칙을 따라서는 su를 답할 수 있다. 순환 관계를 추가하면 재방문과 종료 문제도 드러난다.', steps: ['질의의 변수를 규칙과 맞춘다.', '새 하위 목표를 만든다.', '답을 찾거나 이전 선택으로 돌아가는 경로를 표시한다.'] },
    story: { title: '언어의 형성은 한 편의 공동논문이 아니다', text: '1972년 Marseille의 초기 구현과 Edinburgh 연구자들과의 전후 교류를 구분한다. Colmerauer·Roussel·Kowalski를 함께 표시하는 것은 이 형성 과정을 읽기 위해서이며 단일 논문의 저자 명단을 뜻하지 않는다.', kind: '연구 맥락', source: { title: 'Kowalski의 공식 연구 기록', url: 'https://www.doc.ic.ac.uk/~rak/papers/rak.html' } },
    videos: [],
    references: [{ title: 'Prolog and Logic Programming Historical Sources Archive', url: 'https://softwarepreservation.computerhistory.org/prolog/', location: 'Marseille·Edinburgh 구현, 설계·매뉴얼·원자료 목록' }, { title: 'Robert Kowalski · Logic for Problem Solving 및 초기 논문', url: 'https://www.doc.ic.ac.uk/~rak/papers/rak.html', location: '1972 형성 과정 설명, 1974 Predicate Logic as Programming Language, 1979 Algorithm = Logic + Control 서지' }]
  },
  'frames': {
    keyIdeas: [
      { title: '상황의 구조를 함께 기억한다', text: '프레임은 방에 들어가기나 생일잔치처럼 전형적인 상황을 담는 자료 구조다. 대상 이름만 나열하기보다 슬롯, 관계, 예상되는 정보와 그 정보가 맞지 않을 때의 처리를 함께 둔다.' },
      { title: '기본값은 확인한 사실이 아니다', text: '아직 보지 않은 자리에 전형적인 값을 넣으면 빠르게 상황을 해석할 수 있다. 하지만 새 관찰과 충돌하면 값을 바꾸거나 다른 프레임을 골라야 한다. Minsky는 기본값을 가설적인 설명으로 제안하며 편견을 만들 위험도 논의했다.' }
    ],
    theory: { text: '슬롯의 기본값, 관찰 값, 확정된 제약을 구분한다. 예외를 만나 바꾸는 기본값을 언제나 참인 보편 명제로 취급하면 잘못된 결론이 생긴다.' },
    example: { title: '카페의 주문 틀에 예외를 넣으면', text: '주문 프레임에 음료, 크기, 우유 종류라는 슬롯을 둔다. 우유 종류의 기본값을 일반 우유로 정했더라도 고객이 귀리 음료를 요청하면 관찰 값을 우선한다. 기본값을 자동으로 채운 것과 확인한 선택을 색으로 나누어 볼 수 있다.', steps: ['빈 슬롯에 기본값을 넣는다.', '새 주문 정보를 추가한다.', '어떤 값이 관찰 때문에 바뀌었는지 표시한다.'] },
    story: { title: '질문을 더 많이 남긴 제안', text: '1974년 메모의 도입은 이론이 완성됐다고 선언하지 않는다. 작은 지식 조각만으로 상식적 사고를 설명하기 어렵다는 문제를 제기하고, 여러 표현 연구를 프레임이라는 구조로 모아 보려 한다.', kind: '연구 맥락', source: { title: 'Minsky, Frames 도입', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/Frames/frames.html' } },
    videos: [],
    references: [{ title: 'A Framework for Representing Knowledge', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/Frames/frames.html', location: 'FRAMES 도입의 프레임·슬롯 설명, §1.11 DEFAULT ASSIGNMENTS' }]
  },
  'expert-systems': {
    keyIdeas: [
      { title: '분야 지식이 후보를 줄인다', text: '어떤 결론을 낼 수 있는지는 추론 절차뿐 아니라 넣어 둔 전문 지식에도 달려 있다. 지식을 얻고, 표현하고, 문제에 맞게 사용하는 과정이 지식공학의 과제가 된다. 특정 분야의 성과를 모든 분야의 지능으로 넓혀 읽지 않는다.' },
      { title: '이유를 설명하려면 사용한 지식을 남긴다', text: '어떤 규칙과 관찰로 후보를 택했는지 기록하면 결론을 검토할 수 있다. 규칙의 적용 경로를 보여 주는 것과 그 규칙이 현실에서 타당한지는 별개다. 지식의 갱신과 적용 범위 검토도 필요하다.' }
    ],
    theory: { text: '규칙 기반 시스템은 확인된 조건과 규칙을 연결해 결론 후보를 만든다. 불확실성을 다루는 방식은 시스템마다 다르므로 DENDRAL과 MYCIN을 하나의 동일한 알고리즘으로 설명하지 않는다.' },
    example: { title: '프린터 고장의 질문 순서', text: '종이가 없으면 보충을, 종이가 있고 대기 작업이 멈췄으면 작업 상태 확인을 권하는 작은 규칙집을 만든다. 처음부터 모든 고장을 진단한다고 가정하지 않는다. 확인하지 않은 전원 상태를 거짓으로 채우지 말고 추가 질문으로 남긴다.', steps: ['질문에 대한 확인된 답만 기록한다.', '적용된 규칙과 탈락한 후보를 표시한다.', '규칙이 없는 경우에는 판단 보류를 반환한다.'] },
    story: { title: '전문가와 함께 지식을 옮기는 작업', text: 'Feigenbaum의 1977년 발표는 Stanford 연구의 사례를 통해 지식의 획득·표현·사용과 설명을 논의한다. 이 연도는 DENDRAL이나 MYCIN이 처음 만들어진 해를 뜻하지 않는다.', kind: '연구 맥락', source: { title: 'The Art of Artificial Intelligence', url: 'https://ijcai.org/proceedings/1977/231' } },
    videos: [{ title: 'Reasoning: Goal Trees and Rule-Based Expert Systems', url: 'https://www.youtube.com/watch?v=leXa7EKUPFk', channel: 'MIT OpenCourseWare', note: '공식 강의 설명은 블록 쌓기·동물 식별·전문가 지식 추출을 다룬다. 연구 원문과 연결해 읽는 기초 강의이며 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://learn.mit.edu/video/10795/lecture-3-reasoning-goal-trees-and-rule-based-expert-systems?playlist=10792' }],
    references: [{ title: 'The Art of Artificial Intelligence: Themes and Case Studies of Knowledge Engineering', url: 'https://ijcai.org/proceedings/1977/0231.pdf', location: '초록, INTRODUCTION과 지식공학 사례 논의' }]
  },
  'knowledge-representation': {
    keyIdeas: [
      { title: '용어의 뜻과 현재 사실을 나눈다', text: '어떤 대상이 무엇에 속하는지 말하려면 개념의 정의와 관계가 필요하다. 특정 대상에 관해 지금 알고 있는 사실은 그 용어 체계와 다른 기능을 맡는다. 그림의 노드와 선만으로 의미가 결정되지는 않는다.' },
      { title: '불완전한 지식으로도 질문해야 한다', text: '실제 작업에서는 자료가 한꺼번에 모두 주어지지 않는다. 기록이 없다는 이유만으로 거짓이라고 결론 내리면 현재 지식과 실제 세계를 혼동한다. 저자들은 전문 용어의 복잡성과 불완전한 세계 지식을 함께 다루는 표현 체계를 논의했다.' }
    ],
    theory: { text: '개념의 정의를 관리하는 기능과 세계에 관한 문장을 저장·질의하는 기능을 구분해 읽는다. 아래의 열린 지식 예시는 그 차이를 설명하는 작은 논리 모형이며 OWL 추론기를 실행한 결과가 아니다. 대상이 없다는 결론과 대상의 존재 여부를 아직 모른다는 상태도 구분한다.', formula: 'Student(민아) → Person(민아);  미기록 ≠ 거짓' },
    example: { title: '학생이라는 사실에서 무엇을 알 수 있나', text: '학생은 사람이라는 정의와 민아는 학생이라는 사실이 있으면 민아는 사람이라고 결론 낼 수 있다. 준에 관한 기록이 없다면 준이 사람이 아니라는 결론은 나오지 않는다. 새 사실을 넣었을 때만 질의 결과가 바뀌는 지점을 본다.', steps: ['정의와 개별 사실을 서로 다른 칸에 둔다.', '정의에 따라 따라오는 사실을 표시한다.', '참·거짓·아직 모름을 구분한다.'] },
    videos: [],
    references: [{ title: 'Competence in Knowledge Representation', url: 'https://cdn.aaai.org/AAAI/1982/AAAI82-045.pdf', location: '§1 도입, §2 Two Kinds of Adequacy 및 개념·사실 기능과 불완전성 논의' }]
  },
  'backprop': {
    keyIdeas: [
      { title: '최종 손실에서 각 연결의 기울기를 구한다', text: '출력 오차가 어느 연결 값의 변화에 얼마나 민감한지 연쇄법칙으로 계산한다. 은닉층마다 정답을 따로 지정하지 않아도 최종 손실과 계산 경로가 있으면 기울기를 전달할 수 있다.' },
      { title: '기울기 계산과 갱신은 별도 단계다', text: '역전파는 미분 가능한 계산에서 기울기를 효율적으로 구하는 방법이다. 값을 실제로 바꾸려면 학습률과 최적화 규칙을 더 정해야 한다. 작은 손실 감소가 모든 입력에서의 성능 개선을 뜻하지는 않는다.' }
    ],
    theory: { text: 'w가 출력 y에, y가 손실 L에 영향을 준다면 두 미분을 곱한다. 여러 경로가 같은 값으로 모이면 그 경로의 기여를 더한다. 비미분 연산을 포함할 때는 적용 조건을 따로 검토해야 한다.', formula: '∂L/∂w = (∂L/∂y)(∂y/∂w);   w ← w − η ∂L/∂w' },
    example: { title: '곱셈 하나에서 손실을 거슬러 가기', text: 'y=wx, L=(y−t)²/2로 정한다. x=2, w=1, t=3이면 y=2이고 기울기는 −2다. 학습률을 0.1로 두어 w를 1.2로 바꾸면 같은 입력의 손실은 0.5에서 0.18이 된다. 이 계산은 한 예시의 한 번 갱신이다.', steps: ['순전파 값과 손실을 계산한다.', '기울기 −2를 계산한다.', '가중치를 갱신하고 같은 입력의 손실을 다시 구한다.'] },
    story: { title: '공동연구와 발표 버전을 함께 읽기', text: '1986년 Nature 논문은 Rumelhart·Hinton·Williams의 공동연구다. 논문은 가중치 조정으로 은닉표현이 형성되는 점을 설명한다. 1985년 기술보고서와 정식 학술 논문의 연도를 구분한다.', kind: '연구 맥락', source: { title: 'Hinton의 공식 역전파 논문 목록', url: 'https://www.cs.toronto.edu/~hinton/backprop.html' } },
    videos: [{ title: 'Lecture 12A: Neural Nets', url: 'https://www.youtube.com/watch?v=uXt8qF2Zzfo', channel: 'MIT OpenCourseWare', note: '역전파 기초 강의. 공식 강의 설명으로 주제를 대조했으며 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/resources/lecture-12a-neural-nets/' }],
    references: [{ title: 'Learning Representations by Back-propagating Errors', url: 'https://doi.org/10.1038/323533a0', location: '1986년 Nature 서지·초록의 연결 갱신과 은닉표현 설명. 위 숫자는 별도 교육용 산술.' }, { title: 'Hinton · Backpropagation Learning', url: 'https://www.cs.toronto.edu/~hinton/backprop.html', location: '공동저자, 1986년 Nature 논문과 PDP 장의 서지' }]
  },
  'kbann': {
    keyIdeas: [
      { title: '규칙이 초기 구조를 만든다', text: '알고 있는 규칙의 사실·중간 결론·최종 결론을 입력·은닉·출력 단위로 옮긴다. 의존 관계는 연결이 되고 규칙의 조건에 맞춰 초기 가중치와 편향을 정한다. 출발점에 전문 지식을 넣는 방식이다.' },
      { title: '규칙을 고정하지 않고 사례로 수정한다', text: '초기 지식이 완전하거나 항상 맞을 필요는 없다는 설정에서 출발한다. 추가 단위와 연결을 마련하고 사례로 망을 갱신한다. 다만 1990년 체계는 비재귀적 명제 규칙이라는 조건을 두므로 임의의 논리 프로그램을 그대로 다루지는 않는다.' }
    ],
    theory: { text: '결합은 먼저 규칙을 망으로 번역하고, 그다음 데이터로 연결을 조정하는 위치에서 일어난다. 학습 후 망의 출력과 처음 입력한 규칙이 항상 같은 뜻을 유지한다고 가정해서는 안 된다.' },
    example: { title: '초기 규칙을 지도로 주고 예외를 더하기', text: 'A와 B가 모두 참이면 C라는 규칙으로 세 입력·출력의 대응을 그린다. 이후 C의 정답과 어긋나는 예시를 추가하고 어떤 연결을 조정할 여지가 있는지 비교한다. 실제 갱신 결과를 미리 만들어 성능 개선으로 제시하지 않는다.', steps: ['규칙과 초기 연결의 대응을 표시한다.', '학습에 쓸 입력과 정답을 별도 목록으로 둔다.', '초기 규칙의 예측과 예시가 충돌하는 곳을 찾는다.'] },
    story: { title: '분자생물학 지식도 초기 규칙에 들어갔다', text: '원문의 promoter 인식 실험에서 초기 규칙은 생물학자인 공동저자 Noordewier가 관련 문헌에서 마련했다고 기록한다. 신경망 연구자만의 작업으로 설명하면 지식의 출처와 협업이 사라진다.', kind: '연구 맥락', source: { title: 'KBANN 원문 Experimenting with KBANN', url: 'https://cdn.aaai.org/AAAI/1990/AAAI90-129.pdf' } },
    videos: [],
    references: [{ title: 'Refinement of Approximate Domain Theories by Knowledge-Based Neural Networks', url: 'https://cdn.aaai.org/AAAI/1990/AAAI90-129.pdf', location: '도입의 적용 제한, The KBANN Algorithm, Table 1–2, Experimenting with KBANN의 promoter 과제와 지식 출처' }]
  },
  'lstm': {
    keyIdeas: [
      { title: '시간을 거슬러 가는 신호의 문제', text: '순환 신경망에서 오래전 입력을 학습하려면 여러 시간 단계를 거쳐 오차의 영향을 전달해야 한다. 이 신호가 매우 작아지거나 커지는 조건에서는 긴 간격의 의존 관계를 학습하기 어렵다.' },
      { title: '상태를 유지하는 통로와 게이트', text: '초기 LSTM은 특별한 단위 안에서 오차 흐름을 유지하고, 곱셈 게이트로 그 통로에 접근하는 방식을 연구했다. 정보를 담는 상태와 천천히 바뀌는 가중치가 맡는 역할을 나누어 읽는다.' }
    ],
    theory: { text: '상태를 유지하는 경로와 정보를 쓰고 읽는 경로를 나누는 것이 직관의 출발점이다. 오늘날 흔한 forget gate를 포함한 도식을 1997년 초기 구조와 동일한 버전으로 설명하지 않는다.' },
    example: { title: '표시한 숫자를 나중에 다시 답하기', text: '입력 줄에서 별표가 붙은 숫자 하나를 기억한 뒤 마지막 물음표에서 그 숫자를 답하는 장난감 과제를 만든다. 중간의 무관한 숫자가 늘어날수록 정보 보존이 왜 필요한지 드러난다. 이 재생은 원논문의 학습 실행이 아니다.', steps: ['별표 숫자를 상태 칸에 기록한다.', '무관한 입력이 들어와도 필요한 상태를 남긴다.', '마지막 요청에서 저장한 값을 읽는다.'] },
    story: { title: '긴 시간 간격을 겨냥한 실험', text: '1997년 논문은 인공적으로 만든 순차 과제에서 지연된 신호를 학습하는 문제를 평가했다. 이 결과를 아무 실제 시계열에서도 항상 잘 기억한다는 주장으로 일반화하지 않는다.', kind: '연구 맥락', source: { title: 'Hochreiter·Schmidhuber, 1997 초록·도입', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' } },
    videos: [{ title: 'MIT 6.S191 (2024): Recurrent Neural Networks, Transformers, and Attention', url: 'https://www.youtube.com/watch?v=dqoEU9Ac3ek', channel: 'Alexander Amini · MIT 6.S191', note: 'Ava Amini 강의. 공식 설명의 37:15 LSTM 구간을 확인했다. 후대 구조를 포함하는 보충 강의이며 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://www.youtube.com/watch?v=dqoEU9Ac3ek' }],
    references: [{ title: 'Long Short-Term Memory', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf', location: '초록과 §1의 오차 역류 문제·LSTM 구상·인공 데이터 실험 범위. 직접 PDF 재접근은 시간 초과여서 색인된 원문 발췌와 공식 서지를 대조.' }, { title: 'JKU · 저자 공식 연구 목록', url: 'https://www.jku.at/en/institute-for-machine-learning/research/publications/older/', location: '1997년 Neural Computation 논문 공동저자·권호' }]
  },
  'lenet': {
    keyIdeas: [
      { title: '위치마다 같은 계산을 적용한다', text: '작은 영역만 연결하고 같은 가중치를 여러 위치에서 공유하면 위치마다 별도의 연결을 전부 학습하는 구조와 달라진다. 이미지 안에서 반복되는 지역 패턴을 찾는 데 알맞은 가정을 넣는 셈이다.' },
      { title: '부분 계산을 전체 목표에 연결한다', text: '문자인식은 숫자 하나를 분류하는 일 외에도 영역 추출·분할·인식 등의 단계가 필요하다. 1998년 논문은 CNN과 여러 모듈을 포함하는 문서인식 시스템의 학습을 함께 다룬다.' }
    ],
    theory: { text: '아래는 작은 필터와 격자의 값을 곱해 더하는 교육용 연산이다. 필터의 값을 사람이 정해 보여 주는 것과 실제 데이터에서 필터를 학습시키는 것은 다른 단계다.', formula: 'feature(i,j) = Σᵤ Σᵥ image(i+u,j+v) · kernel(u,v)' },
    example: { title: '세로선을 찾는 작은 창', text: '0과 1로 만든 격자 위에 세로선에 반응하는 필터를 놓고 한 칸씩 움직인다. 각 위치의 곱셈과 합을 특징맵에 기록한다. 입력을 옮겼을 때 어느 반응도 함께 옮겨지는지 보고, 풀링을 덧붙이면 어떤 정보가 줄어드는지 비교한다.', steps: ['필터의 값과 크기를 고정한다.', '창이 덮는 격자만 계산한다.', '특징맵과 원본 위치를 연결해 읽는다.'] },
    story: { title: '단일 알고리즘보다 넓은 문서인식 문제', text: 'LeCun·Bottou·Bengio·Haffner의 종합 논문은 손글씨 숫자 비교와 실제 문서 시스템을 함께 설명한다. 1998년은 그 논문의 출판 연도이며 초기 CNN 연구 전체의 시작을 뜻하지 않는다.', kind: '연구 맥락', source: { title: '저자 공식 논문 기록', url: 'https://bottou.org/papers/lecun-98h' } },
    videos: [{ title: 'MIT 6.S191 (2024): Convolutional Neural Networks', url: 'https://www.youtube.com/watch?v=2xqkSUhmmXU', channel: 'Alexander Amini · MIT 6.S191', note: '공식 설명에서 18:53 특징 추출·합성곱과 37:10 비선형성·풀링 범위를 확인했다. 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://www.youtube.com/watch?v=2xqkSUhmmXU' }],
    references: [{ title: 'Gradient-Based Learning Applied to Document Recognition', url: 'https://leon.bottou.org/publications/pdf/ieee-1998.pdf', location: '초록·도입의 문자인식·CNN·다중 모듈 설명. PDF 텍스트의 글꼴 깨짐이 있어 원문 수치·그림은 옮기지 않았다.' }, { title: 'Bottou · 논문 서지', url: 'https://bottou.org/papers/lecun-98h', location: '네 공동저자와 Proceedings of the IEEE 86(11), 1998년' }]
  },
  'cilp': {
    keyIdeas: [
      { title: '프로그램에서 신경망으로', text: '배경 지식을 명제 논리 프로그램으로 주고 이를 신경망으로 번역한 뒤 사례로 학습한다. 기호 지식을 학습의 출발점에 넣는다는 점에서 무작위 초기화만 사용하는 방식과 다른 설정이다.' },
      { title: '학습 뒤 다시 규칙을 읽는다', text: 'C-IL²P는 수정된 망에서 논리 프로그램을 추출해 달라진 지식을 설명하는 단계도 다룬다. 입력 규칙, 학습된 망, 추출한 규칙을 각각 확인해야 무엇이 유지되고 무엇이 바뀌었는지 평가할 수 있다.' }
    ],
    theory: { text: '결합의 흐름은 논리 프로그램 → 신경망 번역 → 사례 학습 → 수정 프로그램 추출이다. 어떤 논리 프로그램과 의미론을 다루는지의 조건이 있으므로 임의의 자연어 규칙을 제한 없이 왕복한다고 해석하지 않는다.' },
    example: { title: '출발 규칙과 추출 규칙을 나란히 읽기', text: 'A와 B에서 C를 결론 내리는 작은 규칙을 출발점으로 둔다. 학습 사례에서 예외가 발견됐다고 가정하고 수정 후보에 추가 조건 D를 적어 본다. 새 규칙이 사례를 얼마나 설명하는지와 기존 사례를 잃는지를 따로 비교한다.', steps: ['원래 규칙을 보존한다.', '학습에 쓸 사례와 확인용 사례를 나눈다.', '수정 후보를 두 사례 집합에서 검토한다. 후보 작성은 원시스템의 추출 실행이 아니다.'] },
    story: { title: '설명 가능한 수정 지식을 겨냥한 결합', text: '원문 초록은 배경 지식에서 출발한 망을 사례로 다듬고 수정된 논리 프로그램을 추출하는 흐름을 명시한다. 계산생물학의 DNA 분석을 평가 대상으로 사용했다.', kind: '연구 맥락', source: { title: 'City Research Online 저자 공개본', url: 'https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf' } },
    videos: [],
    references: [{ title: 'The Connectionist Inductive Learning and Logic Programming System', url: 'https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf', location: '색인된 저자 공개본의 초록: 프로그램 번역·학습·추출·계산생물학 평가. PDF 직접 열기는 시간 초과로 전체 정리·증명을 대조하지 못함.' }, { title: 'City Research Online · 정식 출판 서지', url: 'https://openaccess.city.ac.uk/id/eprint/301/', location: 'Applied Intelligence 11(1), 59–77, 1999년 공동저자·DOI' }]
  },
  'imagenet': {
    keyIdeas: [
      { title: '이미지와 범주의 연결도 연구 결과다', text: 'ImageNet은 WordNet의 개념 계층을 바탕으로 이미지를 수집·정리한 데이터베이스다. 무엇을 하나의 범주로 묶고 어떤 사례를 모을지가 학습과 평가의 문제 설정을 만든다.' },
      { title: '데이터·도전과제·모델을 구분한다', text: '2009년 데이터 논문, 이후의 ILSVRC 평가, 2012년 AlexNet 모델은 서로 다른 기록이다. 같은 이름이 등장해도 이미지 수·분류 수·분할이 동일하다고 가정하지 말고 사용한 버전을 확인해야 한다.' }
    ],
    theory: { text: '분류 데이터에서는 이미지와 표지의 대응 외에도 분할과 평가 기준을 정해야 한다. 같은 원천의 거의 같은 이미지가 학습과 평가에 함께 들어가면 새 사례에 대한 능력을 과대평가할 수 있다.' },
    example: { title: '우산 사진을 어떻게 모았는가', text: '열린 우산만 우산으로 모은 자료와 접힌 우산·실내외 사례를 함께 모은 자료를 비교한다고 가정한다. 두 자료의 범주 이름이 같아도 어떤 입력을 대표하는지는 다르다. 사진 수와 다양성, 확인용 사례를 별도 표로 읽는다.', steps: ['범주에 포함할 조건을 적는다.', '같은 원천의 사진은 같은 분할에 둔다.', '배경·형태가 달라진 확인용 사례를 준비한다.'] },
    story: { title: '이미지를 개념 계층에 모으는 작업', text: '데이터 논문의 저자는 Deng·Dong·Socher·Li-Jia Li·Kai Li·Li Fei-Fei다. Fei-Fei Li 한 명의 공헌으로 축소하지 않고 데이터 구축의 공동연구와 이후 모델 연구를 연결해 읽는다.', kind: '연구 맥락', source: { title: 'ImageNet 2009 데이터 논문', url: 'https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf' } },
    videos: [{ title: 'How we teach computers to understand pictures | Fei Fei Li', url: 'https://www.youtube.com/watch?v=40riCqvRoMs', channel: 'TED', note: 'Fei-Fei Li가 이미지 데이터와 시각 인식을 설명하는 공식 TED 영상. 제목·발표자·설명으로 범위를 확인했으며 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://www.youtube.com/watch?v=40riCqvRoMs' }],
    references: [{ title: 'ImageNet: A Large-Scale Hierarchical Image Database', url: 'https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf', location: '색인된 원문의 저자·초록·§1 WordNet과 데이터 구축 설명. 직접 PDF 열기는 시간 초과. 위 분할 예시는 별도 교육 설계.' }]
  },
  'alexnet': {
    keyIdeas: [
      { title: '구조·데이터·계산을 함께 본다', text: '깊은 합성곱망을 큰 이미지 데이터에서 학습하려면 충분한 표현력과 계산 자원이 필요했다. 논문은 ReLU, GPU 구현, 데이터 증강, dropout 등 여러 선택을 함께 설명한다. 하나의 구성요소만으로 전체 결과를 설명하지 않는다.' },
      { title: '맞춘 학습 사례와 새 사례를 나눈다', text: '큰 모델은 학습 사례에 지나치게 맞춰질 수 있다. 규제와 데이터 증강은 이를 다루는 방법이며 결과는 분리된 데이터에서 확인해야 한다. 논문의 비교를 읽을 때 평가 연도와 분할도 함께 확인한다.' }
    ],
    theory: { text: 'dropout은 학습 중 일부 단위의 출력을 확률적으로 사용하지 않는 규제 방식이다. 임의의 연결을 지운 한 장의 그림이 전체 학습 효과를 증명하는 것은 아니다.' },
    example: { title: '같은 모델을 서로 다른 조건에서 비교하기', text: '작은 모형을 같은 입력·분할에서 학습한다고 가정하고 데이터 양과 증강 여부를 한 번에 하나씩 바꾼 비교표를 만든다. 계산 시간과 학습·확인 손실을 함께 남긴다. 숫자를 미리 채워 AlexNet의 실제 실험 결과처럼 보이지 않게 한다.', steps: ['비교할 조건 하나를 정한다.', '나머지 입력·분할·학습 예산을 맞춘다.', '측정한 결과와 미실행 칸을 구분한다.'] },
    story: { title: '논문이 명시한 자원의 조건', text: '원문은 GPU 계산과 큰 데이터의 가용성을 학습 조건으로 설명하고 계산 자원에 따른 제한도 적는다. 세 공동저자의 모델 연구를 데이터 구축과 계산 기반의 역사에 함께 놓을 이유다.', kind: '연구 맥락', source: { title: 'AlexNet 원문 §1–4', url: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf' } },
    videos: [],
    references: [{ title: 'ImageNet Classification with Deep Convolutional Neural Networks', url: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf', location: '§1 도입, §2 데이터, §3 구조·GPU·ReLU, §4 과적합 완화. 학회 웹 초록과 PDF의 숫자가 달라 PDF를 기준으로 읽고 카드에는 성능 수치를 생략.' }]
  },
  'transformer': {
    keyIdeas: [
      { title: '각 위치에서 다른 위치의 정보를 모은다', text: '질의와 키의 점수에서 가중치를 만들고 값 벡터를 가중합한다. Self-attention에서는 같은 입력열 안의 위치들이 서로를 참고한다. 단어의 뜻을 사전에서 하나 골라 붙이는 것과 다른 계산이다.' },
      { title: '병렬화에는 조건이 있다', text: '원논문은 순환·합성곱 대신 attention을 중심으로 encoder–decoder를 구성했다. 위치 정보와 출력 쪽 마스크도 필요하다. 학습의 병렬 계산과 생성할 다음 토큰을 순서대로 고르는 과정은 구분해야 한다.' }
    ],
    theory: { text: 'Q와 K의 내적으로 점수를 계산하고 크기를 조정한 뒤 softmax를 적용한다. 가중치를 V에 곱해 정보를 모은다. Attention 값만으로 모델 판단의 인과적 이유를 확정하지 않는다.', formula: 'Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V' },
    example: { title: '세 위치 중 어디의 값을 모을까', text: '길이가 같은 작은 질의·키 벡터를 직접 정하고 세 점수를 계산한다. 한 점수만 키웠을 때 softmax 가중치와 최종 가중합이 함께 변하는지 본다. 사람이 넣은 벡터는 학습된 언어 이해의 결과가 아니다.', steps: ['Q·K·V의 크기와 값을 확인한다.', '점수와 정규화한 가중치를 나란히 놓는다.', '가중합과 마스크 적용 전후를 비교한다.'] },
    story: { title: 'Attention의 역사와 Transformer의 제안', text: '논문은 앞선 attention 연구를 배경으로 소개한다. Transformer를 제안한 8명의 공동연구와 attention 자체의 선행연구를 구분하면 한 사람이 모든 구성요소를 만들었다는 오해를 피할 수 있다.', kind: '연구 맥락', source: { title: 'Attention Is All You Need §2–3', url: 'https://arxiv.org/html/1706.03762v7' } },
    videos: [{ title: 'MIT 6.S191 (2024): Recurrent Neural Networks, Transformers, and Attention', url: 'https://www.youtube.com/watch?v=dqoEU9Ac3ek', channel: 'Alexander Amini · MIT 6.S191', note: '공식 영상 설명의 44:00 이후 attention 강의 범위를 확인했다. 전체 시청 검수는 하지 않았다.', sourceUrl: 'https://www.youtube.com/watch?v=dqoEU9Ac3ek' }],
    references: [{ title: 'Attention Is All You Need', url: 'https://arxiv.org/html/1706.03762v7', location: '§2 Background, §3.1 decoder 마스크, §3.2 Attention과 식(1), §3.5 위치 정보' }]
  },
  'deepproblog': {
    keyIdeas: [
      { title: '지각의 불확실성을 프로그램으로 넘긴다', text: '숫자 이미지가 무엇인지 신경망이 확률로 출력하고, 논리 프로그램은 그 가능한 값을 사용한다. 지각 결과를 하나로 확정해 넘기는 대신 최종 질의가 참일 확률까지 계산할 수 있다.' },
      { title: '최종 답에서 지각 부분을 학습한다', text: '논문의 덧셈 과제에서는 각 숫자의 정답 대신 두 이미지의 합을 학습 신호로 쓸 수 있다. 덧셈 규칙은 주어지고 신경 술어를 학습한다. 어떤 지식을 미리 주었는지 함께 밝혀야 공정한 비교가 된다.' }
    ],
    theory: { text: '아래 식은 두 지각 결과가 독립이라고 가정한 교육용 덧셈 모형이다. 같은 확률 사건을 공유하는 일반 논리 프로그램에서는 단순히 각 증명의 확률을 더하면 중복을 셀 수 있다.', formula: 'P(S=s) = Σₐ P(A=a)P(B=s−a)  [독립 가정]' },
    example: { title: '1일 수도 2일 수도 있는 숫자의 합', text: '첫 이미지의 값이 1일 확률을 0.7, 2일 확률을 0.3으로 두고 두 번째 값은 2라고 확정한다. 합 3의 확률은 0.7, 합 4는 0.3이다. 확률을 바꾸면 합의 분포도 달라지지만 덧셈 규칙 자체는 그대로다.', steps: ['확률의 합이 1인지 확인한다.', '가능한 숫자 조합을 열거한다.', '합이 같은 조합의 확률을 모은다.'] },
    story: { title: '규칙을 신경망 안에 모두 넣는 대신', text: '논문 도입은 기존 확률 논리 언어 ProbLog를 출발점으로 삼아 신경 술어를 추가하는 선택을 설명한다. 결합 위치가 어디인지 분명하게 볼 수 있는 사례다.', kind: '연구 맥락', source: { title: 'DeepProbLog §1–2', url: 'https://proceedings.neurips.cc/paper/2018/file/dc5d637ed5e62c36ecb73b654b05ba2a-Paper.pdf' } },
    videos: [],
    references: [{ title: 'DeepProbLog: Neural Probabilistic Logic Programming', url: 'https://proceedings.neurips.cc/paper/2018/file/dc5d637ed5e62c36ecb73b654b05ba2a-Paper.pdf', location: '§1–2 신경 술어와 덧셈 규칙, §6 T1 이미지 쌍·합 표지의 학습 조건' }]
  },
  'nscl': {
    keyIdeas: [
      { title: '질문을 실행할 작은 프로그램으로 바꾼다', text: '이미지에서 객체 중심 표현을 만들고 질문을 필터·관계·개수 세기 같은 연산의 조합으로 바꾼다. 프로그램의 중간 결과를 따라가면 최종 답에 어떤 객체가 포함됐는지 살펴볼 수 있다.' },
      { title: '학습 신호와 사전학습을 구분한다', text: '이미지·질문·답의 쌍으로 시각·언어 모듈을 학습하지만 모든 구성요소가 아무 지도 없이 시작하는 것은 아니다. 논문은 사전학습한 객체 제안 모듈과 시각 특징망을 사용한다. 자연스러운 지도라는 제목을 무지도 학습으로 읽지 않는다.' }
    ],
    theory: { text: '객체를 고르는 연산과 관계를 따라가는 연산을 조합한다. 실제 체계의 개념값과 준기호 실행은 미분 가능한 표현을 포함하므로 여기서 보여 주는 딱 잘린 객체 목록과 완전히 같지는 않다.', formula: '장면 → 빨간 객체 선택 → 구 선택 → 왼쪽 관계 → 개수 세기' },
    example: { title: '빨간 구 왼쪽에는 몇 개가 있나', text: '색·모양·위치를 미리 정한 물체 다섯 개를 놓는다. 먼저 빨간 구를 하나 고르고 그 왼쪽 물체만 남긴 뒤 개수를 센다. 물체 위치를 옮기면 어느 단계의 결과가 바뀌는지 비교할 수 있다.', steps: ['질문의 기준 객체가 하나인지 확인한다.', '각 필터와 관계 연산의 결과를 표시한다.', '마지막 숫자와 포함된 객체 목록을 함께 본다.'] },
    story: { title: '실행 흔적과 학습을 연결한 설계', text: '원문 §3은 객체 표현·의미 파서·실행기의 역할을 나누고, §3.1은 사전학습 Mask R-CNN과 ResNet 특징을 명시한다. 해석 가능한 실행 흔적이 있다는 설명은 이런 입력 조건과 함께 읽어야 한다.', kind: '연구 맥락', source: { title: 'NS-CL §3.1 Model details', url: 'https://arxiv.org/html/1904.12584' } },
    videos: [],
    references: [{ title: 'The Neuro-Symbolic Concept Learner', url: 'https://arxiv.org/html/1904.12584', location: '§3 전체 구조, §3.1 시각 사전학습·개념·DSL·준기호 실행, §3.2 이미지·질문·답 학습, 부록 A·C·F.2의 ImageNet 사전학습 조건' }]
  },
  'dreamcoder': {
    keyIdeas: [
      { title: '예시에서 프로그램을 탐색한다', text: '입출력 예시를 만족하는 프로그램을 주어진 언어 안에서 찾는다. 신경망은 다음에 조사할 가능성이 높은 프로그램을 안내하고, 프로그램을 실행해 과제 조건과 맞는지 확인한다.' },
      { title: '재사용할 조각과 탐색 안내를 함께 배운다', text: '여러 해법에 반복되는 구조를 라이브러리의 새 구성요소로 묶는다. 달라진 언어에서 생성하거나 다시 사용한 과제로 신경망을 학습하며 이 과정을 반복한다. 처음의 원시 연산과 언어가 주어진다는 조건도 중요하다.' }
    ],
    theory: { text: '프로그램 라이브러리는 무엇을 간단히 표현할지 바꾸고, 신경 탐색 정책은 어디를 먼저 찾을지 바꾼다. 반복 조각에 이름만 붙인 화면은 이 둘을 함께 학습한 실험 결과가 아니다.' },
    example: { title: '여러 목록에서 마지막 값을 빼기', text: '몇 개의 목록 변환 해법에 reverse·tail·reverse가 반복된다고 가정한다. 이를 dropLast라는 새 조각으로 묶으면 다음 해법을 더 짧게 적을 수 있다. 입력 길이와 빈 목록의 처리 조건을 정해야 같은 기능인지 비교할 수 있다.', steps: ['해법들에서 공통 부분을 찾는다.', '새 조각의 입력·출력과 빈 입력 처리를 정의한다.', '새 과제에서 조각을 재사용해 본다.'] },
    story: { title: '잠과 꿈은 계산 단계의 이름', text: '논문의 wake–sleep은 프로그램을 찾는 단계와 라이브러리·신경 안내를 갱신하는 반복 절차를 가리킨다. 사람이 꿈꾸는 방식이 재현됐다는 생물학적 주장으로 읽지 않는다.', kind: '연구 맥락', source: { title: 'DreamCoder 초록·방법', url: 'https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf' } },
    videos: [],
    references: [{ title: 'DreamCoder: Bootstrapping Inductive Program Synthesis with Wake-Sleep Library Learning', url: 'https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf', location: '초록, §1과 wake–sleep·라이브러리 학습 방법. PLDI 2021 버전이며 2020 arXiv 제목과 구분.' }]
  },
  'ltn': {
    keyIdeas: [
      { title: '논리식을 미분 가능한 값으로 연결한다', text: 'Real Logic에서는 대상·함수·술어를 수치 표현에 대응시키고 논리식의 만족도를 계산한다. 학습은 데이터와 지식에 관한 식들의 만족도를 높이는 매개변수를 찾는 과정으로 구성할 수 있다.' },
      { title: '퍼지값과 확률은 다르다', text: '0과 1 사이의 값이 나온다는 이유만으로 그 값을 사건의 확률이라고 해석하지 않는다. 어떤 논리 연산자와 집계 함수를 쓰는지에 따라 식의 의미와 최적화가 달라진다. 높은 만족도도 고전 논리의 증명 성공과 동일하지 않다.' }
    ],
    theory: { text: '아래는 product 방식의 AND를 택한 작은 퍼지 논리 예시다. 이 연산을 모든 LTN 설정의 유일한 정의로 취급하지 않으며, 만족도 집계와 학습 목적을 함께 확인한다.', formula: 'AND(a,b) = a·b;   0.8 AND 0.5 = 0.4' },
    example: { title: '두 조건을 얼마나 만족하는가', text: '두 술어의 만족도를 각각 0.8과 0.5로 정하고 AND를 계산한다. 두 번째 값을 0.9로 바꿨을 때 결합값은 0.72가 된다. 이는 선택한 퍼지 연산의 산술이며 실제 사례를 보고 학습한 모델의 신뢰도가 아니다.', steps: ['술어값과 선택한 연산을 적는다.', '결합식의 만족도를 계산한다.', '최소값 방식 등 다른 연산과 비교하면 의미도 달라짐을 확인한다.'] },
    story: { title: '정확히 어느 제약을 넣었는지 남기기', text: '논문 §3은 지식의 표현·학습·질의·추론을 구분한다. 데이터에 맞추었다는 결과와 어떤 논리식을 얼마나 만족했는지를 함께 읽어야 결합의 역할을 평가할 수 있다.', kind: '연구 맥락', source: { title: 'Logic Tensor Networks §3', url: 'https://arxiv.org/html/2012.13635v4' } },
    videos: [],
    references: [{ title: 'Logic Tensor Networks', url: 'https://arxiv.org/html/2012.13635v4', location: '§2.2.3 논리 연산, §2.4 Stable Product Real Logic, §3.2 학습 목적, 부록 B 퍼지 연산' }, { title: 'Logic Tensor Networks 공식 코드', url: 'https://github.com/logictensornetworks/logictensornetworks', location: '구현·예제의 공식 저장소. 이 카드에서는 코드를 실행하지 않음.' }]
  },
  'alphageometry': {
    keyIdeas: [
      { title: '보조 구성을 제안하는 역할', text: '기호 추론 엔진은 현재 점과 관계에서 새 결론을 찾는다. 더 진행하기 어려울 때 신경 언어모델이 보조점을 제안해 문제의 표현을 확장한다. 제안과 그 뒤의 추론을 구분하면 결합이 필요한 위치를 볼 수 있다.' },
      { title: '데이터가 없다는 뜻은 아니다', text: '논문은 사람의 증명 시연 대신 기호 엔진으로 만든 합성 자료를 사용한다. 연구 범위는 표현 가능한 유클리드 평면 기하 문제이며 모든 수학 분야를 푸는 범용 체계로 일반화할 수 없다.' }
    ],
    theory: { text: '현재 전제에서 추론 → 막힘 확인 → 보조 구성 후보 → 확장된 전제에서 다시 추론의 순환이다. 그림이 그럴듯해 보여도 관계를 정당화하는 단계가 있어야 증명으로 사용할 수 있다.' },
    example: { title: '변의 중점을 새 점으로 추가하기', text: '삼각형의 한 변 BC에 중점 D를 추가한다고 하자. 중점이라는 구성에서 B·D·C의 공선 관계와 BD=DC를 새 전제로 쓸 수 있다. 이 정보가 목표에 도움이 되는지는 별도로 확인한다. 점을 추가했다는 사실만으로 목표가 증명되지는 않는다.', steps: ['처음의 점과 전제를 보존한다.', '보조점 D와 정의를 추가한다.', '새로 얻은 관계와 실제 목표에 사용한 관계를 구분한다.'] },
    story: { title: '원논문 그림도 줄여 그린 설명이다', text: '논문의 그림 1은 신경모델의 보조점과 기호 엔진의 출력을 나누어 보여 준다. 일부 긴 증명은 설명을 위해 편집했다고 명시하므로 짧은 재생 화면을 전체 실행 로그와 같다고 읽지 않는다.', kind: '연구 맥락', source: { title: 'AlphaGeometry 본문·그림 1 설명', url: 'https://www.nature.com/articles/s41586-023-06747-5' } },
    videos: [],
    references: [{ title: 'Solving Olympiad Geometry without Human Demonstrations', url: 'https://www.nature.com/articles/s41586-023-06747-5', location: '문제 범위·합성 자료·신경모델과 기호 엔진 설명, Fig.1과 캡션의 중점 예시·축약 고지' }, { title: 'AlphaGeometry 공식 코드', url: 'https://github.com/google-deepmind/alphageometry', location: '문제 표현·추론 구현을 읽을 공식 저장소. 카드의 예시는 원모델 실행이 아님.' }]
  },
  'alphaproof': {
    keyIdeas: [
      { title: '후보 생성과 증명 확인을 연결한다', text: '신경망은 현재 증명 상태에서 유망한 전술과 가치를 제안한다. Lean 환경이 전술을 실행해 새 가정과 남은 목표를 반환하면 탐색이 다음 후보를 선택한다. 최종 증명 항은 Lean의 커널에서 확인된다.' },
      { title: '검증된 대상은 형식화한 명제다', text: '자연어 문제를 형식 언어로 옮기는 과정과 그 형식 명제의 증명을 찾는 과정은 다르다. 잘못 옮긴 명제를 올바르게 증명할 수도 있으므로 커널 통과만으로 자연어 해석까지 보장되지는 않는다.' }
    ],
    theory: { text: '증명 상태는 이미 가진 가정과 남은 목표로 이루어진다. 행동은 전술이며 실행 결과에 따라 상태가 바뀐다. 문법이 맞는 문자열, 전술의 성공, 전체 목표가 닫힌 증명을 단계별로 구분한다.', formula: '(가정, 목표) ─전술 실행→ (새 가정, 남은 목표)' },
    example: { title: 'P와 Q를 가졌다면 순서를 바꾸기', text: 'P∧Q를 가정하고 Q∧P를 목표로 둔다. 가정에서 P와 Q를 각각 꺼내고 목표의 첫 자리에 Q, 둘째에 P를 넣는다. 이 논리 설명은 증명 구조를 보여 주며 Lean을 실행하거나 커널 검증을 수행한 결과는 아니다.', steps: ['가정과 목표를 별도 칸에 둔다.', '필요한 두 하위 목표를 만든다.', '각 목표를 채웠는지 확인하고 실제 검증 여부는 별도로 표시한다.'] },
    story: { title: '검사할 수 있는 환경을 학습에 쓰기', text: '논문은 Lean 안의 증명 과정을 순차적 의사결정 문제로 정의한다. 탐색과 강화학습을 연결하지만 당시 대회 문제의 풀이에는 인간 참가자보다 훨씬 긴 계산 시간이 들었다고 설명한다.', kind: '연구 맥락', source: { title: 'AlphaProof 본문 · Lean RL environment', url: 'https://www.nature.com/articles/s41586-025-09833-y' } },
    videos: [],
    references: [{ title: 'Olympiad-Level Formal Mathematical Reasoning with Reinforcement Learning', url: 'https://www.nature.com/articles/s41586-025-09833-y', location: 'AlphaProof, The Lean RL environment, Fig.1, Methods의 Lean environment 및 형식 증명 항 설명' }]
  }
};
