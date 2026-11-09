/* Selected research profiles for AI Atlas.
 * This is a curated selection, not a complete bibliography.
 * Work tracks describe the selected contribution, not a permanent camp for a person.
 * eventId links a work to the original 24-event timeline without duplicating it.
 * Additional works checked against author manuscripts or publisher records on 2026-11-06.
 */
window.ATLAS_PEOPLE_PROFILES = [
  {
    id: 'john-mccarthy',
    name: 'John McCarthy',
    nameKo: '존 매카시',
    tagline: '상식 추론과 기호 계산의 형식화',
    tags: ['symbolic', 'foundations'],
    intro: '지식을 문장으로 표현하고 그 결과를 추론하는 문제를 연구했다. 상식 프로그램, Lisp, 행동의 논리를 잇는 대표 연구를 선정했다.',
    works: [
      {
        id: 'mccarthy-common-sense-1959', year: 1959,
        dateLabel: '1958 발표 · 1959 출판',
        title: '상식으로 추론하는 프로그램',
        summary: '사실과 지식을 논리 문장으로 주고 그 결과를 추론하는 Advice Taker를 제안했다. 절차를 모두 적는 일과 무엇이 참인지 표현하는 일을 구분한다.',
        type: '학회발표·논문', track: 'symbolic',
        people: ['John McCarthy'],
        sources: [{ title: 'Programs with Common Sense · 저자 원문·연대 설명', url: 'https://www-formal.stanford.edu/jmc/mcc59.html' }],
        eventId: 'advice-taker',
        caveat: '1959는 출판 연도다. 1958 발표와 구분하며, 당시 완성된 범용 지능으로 소개하지 않는다.'
      },
      {
        id: 'mccarthy-lisp-1960', year: 1960,
        dateLabel: '1960 · Communications of the ACM',
        title: '기호식의 재귀 함수와 Lisp',
        summary: '기호식을 S-expression으로 표현하고 그 위의 함수를 재귀적으로 정의하는 계산 체계를 설명했다. Lisp의 표현과 인터프리터를 다루며 기호를 계산하는 기반을 제시한다.',
        type: '학술논문', track: 'foundations',
        people: ['John McCarthy'],
        sources: [
          { title: 'Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I · 출판 기록', url: 'https://www-formal.stanford.edu/jmc/recursive.html' },
          { title: '저자 원문 · Introduction', url: 'https://www-formal.stanford.edu/jmc/recursive/node1.html' }
        ],
        caveat: '1960년 논문의 내용과 이후 여러 Lisp 구현의 기능을 구분한다. 프로그래밍 언어 자체가 상식 추론 시스템인 것은 아니다.'
      },
      {
        id: 'mccarthy-hayes-1969', year: 1969,
        dateLabel: '1969 · Machine Intelligence 4',
        title: '행동과 지식을 논리로 다루다',
        summary: 'Patrick Hayes와 함께 상황·행동·지식·전략을 형식화하고, 전략이 목표를 이루는지 논리적으로 다루는 문제를 검토했다. 행동 뒤에도 바뀌지 않는 사실을 적어야 하는 프레임 문제도 논의한다.',
        type: '논문', track: 'symbolic',
        people: ['John McCarthy', 'Patrick J. Hayes'],
        sources: [
          { title: 'Some Philosophical Problems from the Standpoint of Artificial Intelligence · 저자 원문', url: 'https://www-formal.stanford.edu/jmc/mcchay69/mcchay69.html' },
          { title: '원문 · The Frame Problem', url: 'https://www-formal.stanford.edu/jmc/mcchay69/node17.html' }
        ],
        caveat: '형식화와 미해결 문제를 함께 제시한 연구다. 상식 추론이나 프레임 문제 전체를 해결했다는 뜻은 아니다.'
      }
    ]
  },
  {
    id: 'marvin-minsky',
    name: 'Marvin Minsky',
    nameKo: '마빈 민스키',
    tagline: '문제 해결과 여러 지식 표현의 연결',
    tags: ['foundations', 'symbolic', 'hybrid'],
    intro: '탐색과 학습, 상황의 표현, 서로 다른 계산 방식의 결합을 다루었다. 한 진영에 고정하기보다 주장이 달라지는 대표 저작을 연도순으로 읽는다.',
    works: [
      {
        id: 'minsky-steps-1961', year: 1961,
        dateLabel: '1961 · Proceedings of the IRE',
        title: '인공지능의 문제들을 나누어 보다',
        summary: '당시의 문제 해결 연구를 탐색·패턴인식·학습·계획·귀납으로 나누어 검토했다. 학습과 문제 구조를 이용해 탐색의 부담을 줄이는 방법을 논의한다.',
        type: '종설', track: 'foundations',
        people: ['Marvin Minsky'],
        sources: [
          { title: 'Steps Toward Artificial Intelligence · 저자 공개 원문', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/steps.html' },
          { title: 'Proceedings of the IRE 49(1), January 1961 · 원문 사본', url: 'https://www.mit.edu/~kepner/Academic-ML-Papers/Ancient/Minsky1960.pdf' }
        ],
        caveat: '1960은 원고 접수 연도이며, 표시한 1961은 학술지 출판 연도다. 여러 연구를 검토한 종설이지 단일 시스템의 실험 보고가 아니다.'
      },
      {
        id: 'minsky-frames-1974', year: 1974,
        dateLabel: '1974 · 연구 메모',
        title: '프레임으로 상황을 표현하다',
        summary: '전형적인 상황을 프레임으로 나타내고, 슬롯과 기본값을 통해 기대하는 정보를 담는 방식을 제안했다. 새 정보에 따라 기본값이나 선택한 프레임을 바꾸는 문제를 다룬다.',
        type: '연구보고서', track: 'symbolic',
        people: ['Marvin Minsky'],
        sources: [{ title: 'A Framework for Representing Knowledge · 저자 원문', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/Frames/frames.html' }],
        eventId: 'frames',
        caveat: '프레임에는 기본값과 예외가 포함된다. 이를 엄격한 논리규칙만으로 설명하거나 후대의 모든 객체 표현과 동일시하지 않는다.'
      },
      {
        id: 'minsky-symbolic-connectionist-1990', year: 1990,
        dateLabel: '1990 수록 · 1991 AI Magazine 재수록',
        title: '기호와 연결주의를 함께 쓰자는 제안',
        summary: '기호 처리와 연결주의를 서로 배타적인 선택으로 보는 관점을 비판했다. 서로 다른 표현이 가진 제약을 보완하도록 여러 구성요소를 연결하는 연구를 제안한다.',
        type: '논설·책의 장', track: 'hybrid',
        people: ['Marvin Minsky'],
        sources: [{ title: 'Logical vs. Analogical or Symbolic vs. Connectionist or Neat vs. Scruffy · 저자 원문', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/SymbolicVs.Connectionist.html' }],
        caveat: '결합을 지지한 연구 관점이다. 특정 결합 알고리즘의 성능을 실험으로 검증한 논문으로 읽지 않는다.'
      }
    ]
  },
  {
    id: 'geoffrey-hinton',
    name: 'Geoffrey E. Hinton',
    nameKo: '제프리 힌턴',
    tagline: '학습 절차와 여러 층의 표현',
    tags: ['neural'],
    intro: '공동연구자들과 가중치 학습, 깊은 생성 모형, 이미지 분류를 연구했다. 개별 방법 논문과 이후의 종설을 구분해 대표 연구를 선정했다.',
    works: [
      {
        id: 'hinton-backprop-1986', year: 1986,
        dateLabel: '1986 · Nature',
        title: '역전파로 중간층의 표현을 학습하다',
        summary: '출력 오차에서 각 연결의 기울기를 구해 가중치를 바꾸는 절차와 은닉표현 학습을 설명했다. 중간층의 정답을 별도로 주지 않고 최종 목표에서 학습 신호를 얻는다.',
        type: '학술논문', track: 'neural',
        people: ['David E. Rumelhart', 'Geoffrey E. Hinton', 'Ronald J. Williams'],
        sources: [
          { title: 'Learning Representations by Back-propagating Errors · Nature', url: 'https://doi.org/10.1038/323533a0' },
          { title: 'Hinton · 관련 논문 목록', url: 'https://www.cs.toronto.edu/~hinton/backprop.html' }
        ],
        eventId: 'backprop',
        caveat: '1985 기술보고서와 1986 학술 논문은 별도 기록이다. 역전파를 Hinton 한 사람의 단독 최초 발명으로 소개하지 않는다.'
      },
      {
        id: 'hinton-deep-belief-2006', year: 2006,
        dateLabel: '2006 · Neural Computation',
        title: '깊은 믿음망을 층별로 학습하다',
        summary: 'Simon Osindero, Yee-Whye Teh와 함께 깊은 생성 모형을 한 층씩 구성하는 학습 절차를 제시했다. 층별 학습으로 초기값을 얻은 뒤 전체 모형을 미세 조정한다.',
        type: '학술논문', track: 'neural',
        people: ['Geoffrey E. Hinton', 'Simon Osindero', 'Yee-Whye Teh'],
        sources: [{ title: 'A Fast Learning Algorithm for Deep Belief Nets · 저자 원문', url: 'https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf' }],
        caveat: '제시한 생성 모형과 학습 설정의 연구다. 모든 깊은 신경망에 층별 사전학습이 필요하다는 뜻은 아니다.'
      },
      {
        id: 'hinton-alexnet-2012', year: 2012,
        dateLabel: '2012 · NeurIPS',
        title: '큰 이미지 데이터와 합성곱망의 학습',
        summary: 'Alex Krizhevsky, Ilya Sutskever와 함께 ImageNet 분류를 위한 깊은 합성곱 신경망을 제시했다. 모델 구조와 학습 설정, 데이터, GPU 계산을 함께 살펴볼 사례다.',
        type: '학회논문', track: 'neural',
        people: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
        sources: [{ title: 'ImageNet Classification with Deep Convolutional Neural Networks · 학회 원문', url: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf' }],
        eventId: 'alexnet',
        caveat: '세 공동저자의 연구다. 데이터 구축과 모델 연구, 계산 기반의 기여를 한 사람의 업적으로 합치지 않는다.'
      },
      {
        id: 'hinton-deep-learning-review-2015', year: 2015,
        dateLabel: '2015 · Nature 종설',
        title: '딥러닝의 표현 학습을 정리하다',
        summary: 'Yann LeCun, Yoshua Bengio와 함께 여러 층의 표현 학습과 역전파, 합성곱망, 순환망의 연구를 종합했다. 기존 방법의 작동 방식과 적용 영역을 연결해 설명한다.',
        type: '종설', track: 'neural',
        people: ['Yann LeCun', 'Yoshua Bengio', 'Geoffrey Hinton'],
        sources: [
          { title: 'Deep Learning · 저자 제공 Nature 원문', url: 'https://www.cs.utoronto.ca/~hinton/absps/NatureDeepReview.pdf' },
          { title: 'Deep Learning · 출판사 DOI', url: 'https://doi.org/10.1038/nature14539' }
        ],
        caveat: '기존 연구를 종합한 종설이다. 논문에 소개된 여러 방법을 세 저자가 2015년에 처음 제안한 것으로 읽지 않는다.'
      }
    ]
  },
  {
    id: 'yann-lecun',
    name: 'Yann LeCun',
    nameKo: '얀 르쿤',
    tagline: '문자인식과 구조를 활용하는 신경망',
    tags: ['neural'],
    intro: '문자인식에서 과제의 구조를 신경망에 반영하고 시스템을 학습하는 방법을 공동연구했다. 1989년의 인식 연구와 1998년의 종합 논문을 선정했다.',
    works: [
      {
        id: 'lecun-handwritten-1989', year: 1989,
        dateLabel: '1989 · NeurIPS 학회 연도',
        title: '손글씨 숫자를 역전파로 인식하다',
        summary: '정규화된 손글씨 숫자 이미지를 입력받는 신경망에 역전파를 적용했다. 과제에 맞춘 망 구조의 제약과 비교적 적은 전처리를 함께 사용했다.',
        type: '학회논문', track: 'neural',
        people: ['Yann LeCun', 'Bernhard E. Boser', 'John S. Denker', 'Donnie Henderson', 'Richard E. Howard', 'Wayne E. Hubbard', 'Lawrence D. Jackel'],
        sources: [{ title: 'Handwritten Digit Recognition with a Back-Propagation Network · 공식 학회 기록', url: 'https://proceedings.neurips.cc/paper/1989/hash/53c3bce66e43be4f209556518c2fcb54-Abstract.html' }],
        caveat: '이 항목은 NIPS 1989의 학회 논문이다. 같은 해의 Neural Computation 논문과 제목·출판 형태를 구분한다.'
      },
      {
        id: 'lecun-document-1998', year: 1998,
        dateLabel: '1998 · Proceedings of the IEEE',
        title: '문서 인식 시스템을 경사 기반으로 학습하다',
        summary: 'Léon Bottou, Yoshua Bengio, Patrick Haffner와 함께 문서 인식의 신경망과 전체 시스템 학습을 설명했다. 지역 연결과 가중치 공유를 사용하는 합성곱망을 다룬다.',
        type: '학술논문', track: 'neural',
        people: ['Yann LeCun', 'Léon Bottou', 'Yoshua Bengio', 'Patrick Haffner'],
        sources: [
          { title: 'Gradient-Based Learning Applied to Document Recognition · 저자 원문', url: 'https://leon.bottou.org/publications/pdf/ieee-1998.pdf' },
          { title: 'Bottou · 공식 서지', url: 'https://bottou.org/papers/lecun-98h' }
        ],
        eventId: 'lenet',
        caveat: '1998은 이 종합 논문의 출판 연도다. 합성곱이나 가중치 공유가 그해 처음 등장했다는 뜻은 아니다.'
      }
    ]
  },
  {
    id: 'artur-garcez',
    name: 'Artur d’Avila Garcez',
    nameKo: '아르투르 다빌라 가르세즈',
    tagline: '논리 표현과 신경 학습 사이의 연결',
    tags: ['hybrid'],
    intro: '논리 프로그램을 신경망에 연결하고 학습과 추론을 함께 다루는 연구에 참여했다. 개별 방법, 공동저서, 후속 체계를 보여 주는 대표 저작을 선정했다.',
    works: [
      {
        id: 'garcez-cilp-1999', year: 1999,
        dateLabel: '1999 · 학술 논문',
        title: '논리 프로그램과 학습을 왕복하다',
        summary: 'Gerson Zaverucha와 함께 논리 프로그램을 신경망으로 옮기고 사례로 학습한 뒤 수정된 프로그램을 추출하는 C-IL²P를 제시했다.',
        type: '학술논문', track: 'hybrid',
        people: ['Artur d’Avila Garcez', 'Gerson Zaverucha'],
        sources: [{ title: 'The Connectionist Inductive Learning and Logic Programming System · 저자 공개본', url: 'https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf' }],
        eventId: 'cilp',
        caveat: '명시한 논리 표현과 학습 체계의 연구다. 임의의 프로그램 전체를 완전히 학습하거나 추출한다는 뜻은 아니다.'
      },
      {
        id: 'garcez-cognitive-reasoning-2008', year: 2008,
        dateLabel: '2008 초판 발행 · ©2009',
        title: '신경망으로 논리적 추론을 다루다',
        summary: 'Luís Lamb, Dov Gabbay와 함께 학습과 추론을 연결하는 신경 모형을 정리한 저서를 출간했다. 논리·시간·지식 등 여러 표현을 신경 계산과 연결하는 방법을 다룬다.',
        type: '공동저서', track: 'hybrid',
        people: ['Artur S. d’Avila Garcez', 'Luís C. Lamb', 'Dov M. Gabbay'],
        sources: [{ title: 'Neural-Symbolic Cognitive Reasoning · 출판사 서지·목차', url: 'https://link.springer.com/book/10.1007/978-3-540-73246-4' }],
        caveat: '출판사 표지는 ©2009이며 전자책·양장 초판 발행일은 2008년 10월이다. 서지·목차에 따른 개요이며 책 전체의 결과를 재검증한 것은 아니다.'
      },
      {
        id: 'garcez-ltn-2022', year: 2022,
        dateLabel: '2022 · Artificial Intelligence',
        title: '논리 문장의 만족도를 학습에 연결하다',
        summary: 'Samy Badreddine, Luciano Serafini, Michael Spranger와 함께 Real Logic을 이용하는 Logic Tensor Networks를 제시했다. 논리식의 만족도를 미분 가능한 계산과 연결한다.',
        type: '학술논문', track: 'hybrid',
        people: ['Samy Badreddine', 'Artur d’Avila Garcez', 'Luciano Serafini', 'Michael Spranger'],
        sources: [
          { title: 'Logic Tensor Networks · 논문 본문', url: 'https://arxiv.org/html/2012.13635v4' },
          { title: 'Logic Tensor Networks · 공식 코드', url: 'https://github.com/logictensornetworks/logictensornetworks' }
        ],
        eventId: 'ltn',
        caveat: '퍼지 진릿값은 확률이나 고전 논리의 증명 성공과 다르다. 2020년 사전공개본과 2022년 학술지 출판을 구분한다.'
      }
    ]
  },
  {
    id: 'joshua-tenenbaum',
    name: 'Joshua B. Tenenbaum',
    nameKo: '조슈아 테넨바움',
    tagline: '장면·개념·프로그램으로 이어지는 학습',
    tags: ['hybrid'],
    intro: '장면의 개념과 실행 프로그램, 프로그램 탐색을 연결한 공동연구에 참여했다. 전체 연구 이력 가운데 시각 질문과 프로그램 학습의 두 사례를 선정했다.',
    works: [
      {
        id: 'tenenbaum-nscl-2019', year: 2019,
        dateLabel: '2019 · ICLR 논문',
        title: '장면과 질문을 계산 단계로 연결하다',
        summary: '객체 중심의 장면 표현, 질문을 실행 프로그램으로 바꾸는 파서, 준기호 실행기를 연결했다. 장면 속 대상을 선택하고 관계를 따라가며 답을 구하는 NS-CL의 공동연구다.',
        type: '학회논문', track: 'hybrid',
        people: ['Jiayuan Mao', 'Chuang Gan', 'Pushmeet Kohli', 'Joshua B. Tenenbaum', 'Jiajun Wu'],
        sources: [{ title: 'The Neuro-Symbolic Concept Learner · 논문 본문', url: 'https://arxiv.org/html/1904.12584' }],
        eventId: 'nscl',
        caveat: '이미지·질문·답과 사전학습 조건이 있다. 지각이나 개념을 아무 지도 없이 일반적으로 습득한 결과로 확대하지 않는다.'
      },
      {
        id: 'tenenbaum-dreamcoder-2021', year: 2021,
        dateLabel: '2021 · PLDI',
        title: '프로그램을 찾고 공통 조각을 배우다',
        summary: '문제를 푸는 프로그램을 탐색하고 반복되는 구조를 라이브러리로 묶는 DreamCoder의 공동연구다. 신경망의 탐색 안내와 재사용 가능한 프로그램 조각의 학습을 연결한다.',
        type: '학회논문', track: 'hybrid',
        people: ['Kevin Ellis', 'Catherine Wong', 'Maxwell Nye', 'Mathias Sablé-Meyer', 'Lucas Morales', 'Luke Hewitt', 'Luc Cary', 'Armando Solar-Lezama', 'Joshua B. Tenenbaum'],
        sources: [{ title: 'DreamCoder · PLDI 원문', url: 'https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf' }],
        eventId: 'dreamcoder',
        caveat: '기본 언어와 원시 연산이 주어진다. 해당 평가 영역의 결과를 모든 종류의 프로그램 자동 작성으로 확대하지 않는다.'
      }
    ]
  }
];
