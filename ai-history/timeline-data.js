/* Research milestones for the local AI Atlas prototype.
 * Years identify the named publication or documented event, not a person's life.
 * Related entries are reading connections, not claims of direct influence.
 */
window.TIMELINE_DATA = [
  {
    id: 'mcculloch-pitts', year: 1943, dateLabel: '1943 · 논문 출판', track: 'neural',
    title: '신경세포를 논리로 적다', subtitle: 'A Logical Calculus',
    people: ['Warren McCulloch', 'Walter Pitts'],
    summary: '신경 활동을 단순한 계산 단위로 적고, 그 연결을 명제논리와 이어 보았다.',
    detail: 'McCulloch와 Pitts는 켜짐과 꺼짐으로 단순화한 신경 모형을 연결해 논리적 계산을 설명했다. 신경망과 논리는 처음부터 완전히 떨어진 두 세계만은 아니었다.',
    question: '두 신호가 모두 들어올 때만 반응하는 회로를 만들 수 있을까?',
    visual: 'neuron',
    sources: [{ title: 'McCulloch & Pitts, 1943 · 원문', url: 'https://home.csulb.edu/~cwallis/382/readings/482/mccolloch.logical.calculus.ideas.1943.pdf' }],
    caveat: '고정된 계산 모형이며, 사례를 보고 가중치를 학습하는 방법은 아니다.',
    related: ['perceptron', 'advice-taker', 'kbann']
  },
  {
    id: 'logic-theorist', year: 1956, dateLabel: '1956 · RAND 명세 문서', track: 'symbolic',
    title: '증명을 탐색 문제로 바꾸다', subtitle: 'Logic Theory Machine',
    people: ['Allen Newell', 'Herbert A. Simon'],
    summary: '논리식과 추론 규칙을 기호로 적고, 정리에 이르는 경로를 탐색한다.',
    detail: 'Newell과 Simon은 Logic Theory Machine의 구조를 기술하며 증명을 찾는 문제를 기호 처리와 탐색으로 다루었다. 모든 후보를 똑같이 살피기보다 유망한 경로를 고르는 휴리스틱이 중요한 역할을 맡았다.',
    question: '가능한 경로가 많다면, 어떤 길부터 살펴봐야 할까?',
    visual: 'search',
    sources: [{ title: 'Newell & Simon, 1956 · RAND P-868', url: 'https://www.rand.org/pubs/papers/P868.html' }],
    caveat: '이 문서는 시스템 명세다. 실제 구현에는 J. C. Shaw의 기여도 있으며 구현 기록과 구분해야 한다.',
    related: ['resolution', 'strips', 'dreamcoder']
  },
  {
    id: 'perceptron', year: 1958, dateLabel: '1958 · 학술 논문 출판', track: 'neural',
    title: '예시를 보고 기준을 바꾸다', subtitle: 'The Perceptron',
    people: ['Frank Rosenblatt'],
    summary: '정답 예시를 바탕으로 연결 값을 바꾸는 학습 모형을 제시했다.',
    detail: 'Rosenblatt는 입력에서 출력을 결정하는 연결을 경험에 따라 조정하는 퍼셉트론을 연구했다. 작은 학습 규칙으로 판단 경계가 움직이지만, 한 개의 선형 경계로 표현할 수 없는 문제도 있다.',
    question: '정답을 더 많이 보여 주면 어떤 문제든 구분할 수 있을까?',
    visual: 'perceptron',
    sources: [{ title: 'Rosenblatt, 1958 · 논문 서지', url: 'https://pubmed.ncbi.nlm.nih.gov/13602029/' }],
    caveat: '1958은 대표 학술 논문의 출판 연도다. 1957년 연구·보고서 기록과 구분한다.',
    related: ['mcculloch-pitts', 'backprop', 'lenet']
  },
  {
    id: 'advice-taker', year: 1959, dateLabel: '1958 발표 · 1959 출판', track: 'symbolic',
    title: '기계에게 사실과 규칙을 주다', subtitle: 'Programs with Common Sense',
    people: ['John McCarthy'],
    summary: '지식을 논리 문장으로 적고, 그 문장에서 따라 나오는 결론을 구한다.',
    detail: 'McCarthy는 상식적 지식을 문장으로 주고 그 결과를 추론하는 Advice Taker를 제안했다. 프로그램의 절차를 모두 직접 적는 방식과 달리, 무엇이 참인지와 무엇이 따라 나오는지를 분리해 생각했다.',
    question: '사실 하나를 더 적으면, 기계가 새롭게 알 수 있는 것은 무엇일까?',
    visual: 'logic',
    sources: [{ title: 'McCarthy · 저자 원문과 출판 기록', url: 'https://www-formal.stanford.edu/jmc/mcc59.html' }],
    caveat: '당시 완성된 범용 지능이 아니라, 지식과 추론을 다루는 프로그램의 제안이다.',
    related: ['resolution', 'prolog', 'knowledge-representation']
  },
  {
    id: 'resolution', year: 1965, dateLabel: '1965 · 논문 출판', track: 'symbolic',
    title: '증명의 한 단계를 기계화하다', subtitle: 'The Resolution Principle',
    people: ['J. Alan Robinson'],
    summary: '논리식의 모순을 찾아 증명하는 resolution을 자동 정리증명의 기반으로 다룬다.',
    detail: 'Robinson은 논리식을 절 형태로 바꾸고 서로 반대되는 항을 결합하는 resolution 원리를 제시했다. 변수의 값을 맞추는 치환과 추론 단계를 기계가 처리할 수 있도록 구성했다.',
    question: '서로 모순되는 두 문장을 연결하면 어떤 결론이 남을까?',
    visual: 'proof',
    sources: [{ title: 'Robinson, 1965 · JACM 원문', url: 'https://web.stanford.edu/class/linguist289/robinson65.pdf' }],
    caveat: '논리적 완전성은 모든 문제를 빠르게 해결할 수 있다는 뜻이 아니다.',
    related: ['logic-theorist', 'prolog', 'alphaproof']
  },
  {
    id: 'strips', year: 1971, dateLabel: '1971 · IJCAI 논문 발표', track: 'symbolic',
    title: '목표까지의 행동을 계획하다', subtitle: 'STRIPS',
    people: ['Richard Fikes', 'Nils J. Nilsson'],
    summary: '현재 상태와 목표, 행동의 조건과 효과에서 실행할 순서를 찾는다.',
    detail: 'STRIPS는 세계의 상태를 표현하고 행동을 적용할 때 어떤 사실이 추가되거나 사라지는지 적는다. 이 모형 안에서 목표 상태에 도달하는 행동 순서를 탐색한다.',
    question: '문을 열기 전에 열쇠를 가져와야 한다면, 계획은 어떻게 달라질까?',
    visual: 'planning',
    sources: [{ title: 'Fikes & Nilsson, 1971 · IJCAI 원문', url: 'https://ijcai.org/proceedings/1971/63' }],
    caveat: '모형 속의 계획이 성공했다는 사실과 실제 로봇의 행동 성공은 다르다.',
    related: ['logic-theorist', 'dreamcoder', 'alphageometry']
  },
  {
    id: 'prolog', year: 1972, dateLabel: '1972 · 초기 Prolog', track: 'symbolic',
    title: '지식을 적고 질문을 실행하다', subtitle: 'Logic Programming · Prolog',
    people: ['Alain Colmerauer', 'Philippe Roussel', 'Robert Kowalski'],
    summary: '사실과 규칙으로 프로그램을 적고, 질의를 해결하는 계산으로 이어 간다.',
    detail: 'Marseille와 Edinburgh의 연구 교류 속에서 논리 프로그래밍과 초기 Prolog가 형성되었다. 논리 문장이 뜻하는 관계와 프로그램이 실제로 후보를 탐색하는 순서는 함께 살펴봐야 한다.',
    question: '규칙의 순서를 바꾸면 뜻은 같아도 실행 과정은 달라질까?',
    visual: 'code',
    sources: [
      { title: 'Computer History Museum · Prolog 원자료', url: 'https://softwarepreservation.computerhistory.org/prolog/' },
      { title: 'Kowalski · 연구 기록', url: 'https://www.doc.ic.ac.uk/~rak/papers/rak.html' }
    ],
    caveat: '표시한 인물은 형성 과정의 참여자다. 이들이 같은 논문의 공동저자라는 뜻은 아니다.',
    related: ['advice-taker', 'resolution', 'deepproblog']
  },
  {
    id: 'frames', year: 1974, dateLabel: '1974 · 연구 메모', track: 'symbolic',
    title: '상황을 틀과 빈칸으로 담다', subtitle: 'A Framework for Representing Knowledge',
    people: ['Marvin Minsky'],
    summary: '익숙한 상황을 프레임과 슬롯, 기본값으로 표현하는 방법을 제안했다.',
    detail: 'Minsky는 전형적인 상황의 구조를 프레임으로 표현하고 그 안에 슬롯과 기본값을 두는 방식을 제안했다. 새로운 정보가 들어오면 예상했던 기본값을 바꾸거나 다른 프레임을 선택할 수 있다.',
    question: '늘 그렇다고 생각한 정보에 예외가 생기면, 무엇을 바꿔야 할까?',
    visual: 'frames',
    sources: [{ title: 'Minsky, 1974 · 저자 원문', url: 'https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/Frames/frames.html' }],
    caveat: '프레임은 기본값과 예외도 다루므로 엄격한 논리규칙만으로 설명할 수 없다.',
    related: ['knowledge-representation', 'nscl', 'advice-taker']
  },
  {
    id: 'expert-systems', year: 1977, dateLabel: '1977 · 전문가시스템 연구 회고', track: 'symbolic',
    title: '전문가의 지식을 프로그램으로', subtitle: 'The Art of Artificial Intelligence',
    people: ['Edward A. Feigenbaum'],
    summary: '특정 분야의 지식을 후보 생성과 검사에 활용하는 연구를 정리했다.',
    detail: 'Feigenbaum은 DENDRAL 등의 사례에서 전문 지식이 문제 해결에 맡는 역할을 설명했다. DENDRAL의 화학 연구와 MYCIN의 규칙·설명 연구는 여러 분야 연구자들의 협업으로 이루어졌다.',
    question: '전문가의 판단을 적으려면, 규칙 이외에 무엇이 더 필요할까?',
    visual: 'expert',
    sources: [
      { title: 'Feigenbaum, 1977 · IJCAI 발표 원문', url: 'https://ijcai.org/proceedings/1977/231' },
      { title: 'Buchanan & Shortliffe 편, 1984 · MYCIN 저서', url: 'https://www.shortliffe.net/Buchanan-Shortliffe-1984/MYCIN%20Book.htm' }
    ],
    caveat: '1977은 이 회고 발표의 연도이며 DENDRAL이나 MYCIN의 탄생 연도가 아니다.',
    related: ['frames', 'knowledge-representation', 'kbann']
  },
  {
    id: 'knowledge-representation', year: 1982, dateLabel: '1982 · AAAI 논문 발표', track: 'symbolic',
    title: '개념과 사실을 나누어 표현하다', subtitle: 'Competence in Knowledge Representation',
    people: ['Ronald J. Brachman', 'Hector J. Levesque'],
    summary: '개념을 정의하는 체계와 세계에 대해 알고 있는 사실의 기능을 구분한다.',
    detail: 'Brachman과 Levesque는 용어의 체계와 불완전한 세계 지식을 다루는 데 필요한 서로 다른 기능을 논의했다. 관계를 그려 보여 주는 것과 표현의 의미에 따라 결론을 구하는 일은 구분해야 한다.',
    question: '기록에 없다는 것은 거짓이라는 뜻일까, 아직 모른다는 뜻일까?',
    visual: 'ontology',
    sources: [{ title: 'Brachman & Levesque, 1982 · AAAI 원문', url: 'https://cdn.aaai.org/AAAI/1982/AAAI82-045.pdf' }],
    caveat: '화면에 그린 관계선 자체가 OWL 추론기의 실행 결과인 것은 아니다.',
    related: ['advice-taker', 'frames', 'ltn']
  },
  {
    id: 'backprop', year: 1986, dateLabel: '1986 · Nature 논문 출판', track: 'neural',
    title: '출력의 오차를 연결의 변화로', subtitle: 'Learning Representations by Back-propagating Errors',
    people: ['David E. Rumelhart', 'Geoffrey E. Hinton', 'Ronald J. Williams'],
    summary: '최종 출력의 오차에서 각 연결의 기울기를 구해 중간층의 표현을 학습한다.',
    detail: 'Rumelhart, Hinton, Williams는 오차를 줄이는 가중치 갱신과 은닉표현 학습을 설명했다. 각 중간층에 목표값을 따로 주지 않아도 계산 경로의 미분을 이용할 수 있다.',
    question: '틀린 답 하나에서 어떤 연결을 얼마나 바꿀지 어떻게 알 수 있을까?',
    visual: 'network',
    sources: [
      { title: 'Rumelhart, Hinton & Williams, 1986 · Nature', url: 'https://doi.org/10.1038/323533a0' },
      { title: 'Hinton · 관련 논문 목록', url: 'https://www.cs.toronto.edu/~hinton/backprop.html' }
    ],
    caveat: '1985 기술보고서와 1986 학술 논문은 별도 기록이다. 한 사람의 단독 최초 발명으로 소개하지 않는다.',
    related: ['perceptron', 'lenet', 'kbann']
  },
  {
    id: 'kbann', year: 1990, dateLabel: '1990 · AAAI 논문 발표', track: 'hybrid',
    title: '규칙을 신경망의 출발점으로', subtitle: 'Knowledge-Based Artificial Neural Networks',
    people: ['Geoffrey G. Towell', 'Jude W. Shavlik', 'Michiel O. Noordewier'],
    summary: '미리 가진 규칙으로 망을 구성하고, 사례를 사용해 연결 값을 조정한다.',
    detail: 'KBANN은 계층적인 규칙을 신경망의 구조와 초기 가중치로 옮긴 뒤 사례를 통해 수정한다. 명시적인 지식과 데이터 학습을 잇는 연구가 1990년대에도 진행되고 있었다.',
    question: '처음부터 알고 있는 규칙을 주면 학습은 어디서 시작할까?',
    visual: 'bridge',
    sources: [{ title: 'Towell, Shavlik & Noordewier, 1990 · AAAI 원문', url: 'https://aaai.org/Papers/AAAI/1990/AAAI90-129.pdf' }],
    caveat: '비재귀적 명제 규칙과 해당 평가 과제의 조건에서 제시한 방법이다.',
    related: ['expert-systems', 'backprop', 'cilp']
  },
  {
    id: 'lstm', year: 1997, dateLabel: '1997 · 논문 출판', track: 'neural',
    title: '시간을 건너 정보를 남기다', subtitle: 'Long Short-Term Memory',
    people: ['Sepp Hochreiter', 'Jürgen Schmidhuber'],
    summary: '시간 간격이 긴 입력 사이에서 정보를 학습하고 유지하는 문제를 다룬다.',
    detail: 'Hochreiter와 Schmidhuber는 긴 시간 간격에서 오차 신호가 약해지는 문제를 다루기 위해 LSTM을 제시했다. 입력이 지나간 뒤에도 필요한 상태를 유지하는 구조를 탐구했다.',
    question: '지금 들어온 정보 중 무엇을 나중까지 남겨 두어야 할까?',
    visual: 'memory',
    sources: [{ title: 'Hochreiter & Schmidhuber, 1997 · 저자 원문', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' }],
    caveat: '1997년 초기 구조와 이후 추가된 forget gate 등을 같은 버전으로 섞지 않는다.',
    related: ['backprop', 'transformer', 'alexnet']
  },
  {
    id: 'lenet', year: 1998, dateLabel: '1998 · 종합 논문 출판', track: 'neural',
    title: '같은 필터로 여러 위치를 보다', subtitle: 'Gradient-Based Learning Applied to Document Recognition',
    people: ['Yann LeCun', 'Léon Bottou', 'Yoshua Bengio', 'Patrick Haffner'],
    summary: '지역적인 연결과 가중치 공유를 이용해 문자인식을 학습하는 방법을 설명한다.',
    detail: 'LeCun과 공동연구자들은 문자인식 시스템에서 합성곱 신경망과 전체 시스템 학습을 설명했다. 같은 필터를 여러 위치에 적용하면 위치마다 모든 연결을 따로 학습하는 방식과 다른 구조를 얻는다.',
    question: '글자가 조금 움직여도 같은 모양을 찾으려면 어떻게 해야 할까?',
    visual: 'convolution',
    sources: [{ title: 'LeCun 외, 1998 · 저자 원문', url: 'https://leon.bottou.org/publications/pdf/ieee-1998.pdf' }],
    caveat: '1998년은 이 종합 논문의 출판 연도다. 1989년 선행 문자인식 연구와 구분한다.',
    related: ['backprop', 'imagenet', 'alexnet']
  },
  {
    id: 'cilp', year: 1999, dateLabel: '1999 · 논문 출판', track: 'hybrid',
    title: '논리와 학습을 왕복하다', subtitle: 'C-IL²P',
    people: ["Artur d’Avila Garcez", 'Gerson Zaverucha'],
    summary: '논리 프로그램을 망으로 옮기고, 학습 뒤 수정된 프로그램을 추출한다.',
    detail: 'C-IL²P는 논리 프로그램의 지식을 신경망으로 옮겨 사례와 함께 학습하는 체계를 제시했다. 학습된 망에서 수정된 논리 프로그램을 추출하며 두 표현 사이의 연결을 다룬다.',
    question: '사례를 통해 달라진 지식을 다시 규칙으로 읽을 수 있을까?',
    visual: 'bridge',
    sources: [{ title: 'Garcez & Zaverucha, 1999 · 저자 공개본', url: 'https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf' }],
    caveat: 'KBANN과 연결되는 연구 흐름이지만 동일한 알고리즘은 아니다.',
    related: ['kbann', 'prolog', 'ltn']
  },
  {
    id: 'imagenet', year: 2009, dateLabel: '2009 · CVPR 데이터 논문', track: 'neural',
    title: '비교할 수 있는 이미지의 기반', subtitle: 'ImageNet',
    people: ['Jia Deng', 'Wei Dong', 'Richard Socher', 'Li-Jia Li', 'Kai Li', 'Li Fei-Fei'],
    summary: '이미지를 개념의 계층에 따라 모으고 정리하는 대규모 데이터베이스를 제시했다.',
    detail: 'ImageNet 연구팀은 WordNet의 개념 계층을 바탕으로 이미지 데이터베이스를 구축했다. 모델의 발전을 읽을 때는 알고리즘과 함께 데이터 구축과 평가의 역할도 살펴봐야 한다.',
    question: '무엇을 모으고 어떻게 분류했는지가 학습 결과를 바꿀까?',
    visual: 'dataset',
    sources: [{ title: 'Deng 외, 2009 · ImageNet 데이터 논문', url: 'https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf' }],
    caveat: '2009는 데이터 논문 연도다. 프로젝트 시작이나 챌린지 시작을 같은 날짜로 표시하지 않는다.',
    related: ['alexnet', 'lenet', 'nscl']
  },
  {
    id: 'alexnet', year: 2012, dateLabel: '2012 · NeurIPS 논문 발표', track: 'neural',
    title: '데이터와 깊은 망, GPU의 만남', subtitle: 'AlexNet',
    people: ['Alex Krizhevsky', 'Ilya Sutskever', 'Geoffrey E. Hinton'],
    summary: '큰 이미지 데이터와 GPU 계산을 활용해 깊은 합성곱 신경망을 학습했다.',
    detail: 'Krizhevsky, Sutskever, Hinton은 ImageNet 분류를 위한 깊은 합성곱 신경망을 제시했다. 이 사례는 모델 구조와 데이터, 계산 자원, 학습 설정을 함께 살펴볼 때 이해할 수 있다.',
    question: '모델이 커지는 데에는 아이디어 외에 어떤 조건이 필요할까?',
    visual: 'network',
    sources: [{ title: 'Krizhevsky, Sutskever & Hinton, 2012 · 학회 원문', url: 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf' }],
    caveat: '세 공동저자의 연구이며, 성과를 한 명이나 하나의 구성요소에만 귀속하지 않는다.',
    related: ['imagenet', 'lenet', 'transformer']
  },
  {
    id: 'transformer', year: 2017, dateLabel: '2017 · NeurIPS 논문 발표', track: 'neural',
    title: '단어들이 서로를 참고하다', subtitle: 'Attention Is All You Need',
    people: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Łukasz Kaiser', 'Illia Polosukhin'],
    summary: 'attention을 중심으로 입력 사이의 관계를 계산하는 Transformer를 제시했다.',
    detail: 'Vaswani와 공동연구자들은 순환 구조 대신 attention을 중심으로 구성한 Transformer를 제시했다. 질의·키·값의 계산을 통해 입력의 다른 위치에서 정보를 모은다.',
    question: '한 단어를 해석할 때 문장의 어느 부분을 참고해야 할까?',
    visual: 'attention',
    sources: [{ title: 'Vaswani 외, 2017 · 논문 본문', url: 'https://arxiv.org/html/1706.03762v7' }],
    caveat: 'attention 자체의 최초 제안은 아니다. attention 가중치가 곧 인간의 설명이나 인과 근거인 것도 아니다.',
    related: ['lstm', 'alphageometry', 'alphaproof']
  },
  {
    id: 'deepproblog', year: 2018, dateLabel: '2018 · NeurIPS 논문 발표', track: 'hybrid',
    title: '신경망이 읽고 논리가 더하다', subtitle: 'DeepProbLog',
    people: ['Robin Manhaeve', 'Sebastijan Dumančić', 'Angelika Kimmig', 'Thomas Demeester', 'Luc De Raedt'],
    summary: '신경망이 낸 확률을 논리 프로그램에 연결하고, 최종 질의로 학습한다.',
    detail: 'DeepProbLog는 신경망의 출력을 신경 술어의 확률로 논리 프로그램에 연결한다. 숫자 이미지의 합처럼 지각과 규칙 계산이 함께 필요한 문제에서 전체 질의의 결과로 학습할 수 있다.',
    question: '숫자를 확신하지 못할 때, 덧셈의 답도 확률로 나타낼 수 있을까?',
    visual: 'probability',
    sources: [{ title: 'Manhaeve 외, 2018 · NeurIPS 원문', url: 'https://proceedings.neurips.cc/paper/2018/file/dc5d637ed5e62c36ecb73b654b05ba2a-Paper.pdf' }],
    caveat: '확률을 손으로 바꾸는 교육 화면은 원리 시뮬레이션이며 전체 학습을 재현한 것은 아니다.',
    related: ['prolog', 'perceptron', 'nscl']
  },
  {
    id: 'nscl', year: 2019, dateLabel: '2019 · ICLR 논문', track: 'hybrid',
    title: '본 장면에 질문을 실행하다', subtitle: 'Neuro-Symbolic Concept Learner',
    people: ['Jiayuan Mao', 'Chuang Gan', 'Pushmeet Kohli', 'Joshua B. Tenenbaum', 'Jiajun Wu'],
    summary: '장면의 객체 표현, 질문의 프로그램, 준기호 실행기를 함께 연결한다.',
    detail: 'NS-CL은 장면을 객체 중심으로 표현하고 질문을 실행 프로그램으로 바꾸는 모듈을 연결했다. 장면 속 물체를 고르고 관계를 따라가며 개수를 세는 계산을 수행한다.',
    question: '“빨간 구 왼쪽의 물체”라는 말을 계산의 단계로 바꾸면?',
    visual: 'scene',
    sources: [{ title: 'Mao 외, 2019 · 논문 본문', url: 'https://arxiv.org/html/1904.12584' }],
    caveat: '이미지·질문·답과 사전학습 조건이 있다. 아무 지도 없이 일반 장면을 이해했다고 쓰지 않는다.',
    related: ['frames', 'imagenet', 'deepproblog']
  },
  {
    id: 'dreamcoder', year: 2021, dateLabel: '2021 · PLDI 논문 발표', track: 'hybrid',
    title: '프로그램을 찾고 조각을 재사용하다', subtitle: 'DreamCoder',
    people: ['Kevin Ellis', 'Catherine Wong', 'Maxwell Nye', 'Mathias Sablé-Meyer', 'Lucas Morales', 'Luke Hewitt', 'Luc Cary', 'Armando Solar-Lezama', 'Joshua B. Tenenbaum'],
    summary: '신경망의 탐색 안내와 반복해서 쓸 프로그램 라이브러리를 함께 학습한다.',
    detail: 'DreamCoder는 주어진 과제를 해결하는 프로그램을 찾고 반복되는 구조를 라이브러리로 묶는다. 신경망은 유망한 프로그램을 찾는 탐색을 안내하며 새 라이브러리와 함께 학습된다.',
    question: '여러 번 쓴 계산 조각을 이름 붙이면 다음 문제는 쉬워질까?',
    visual: 'program',
    sources: [{ title: 'Ellis 외, 2021 · PLDI 원문', url: 'https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf' }],
    caveat: '기본 언어와 원시 연산이 주어진다. 작은 브라우저 설명 예제는 전체 학습 체계가 아니다.',
    related: ['logic-theorist', 'strips', 'nscl']
  },
  {
    id: 'ltn', year: 2022, dateLabel: '2022 · 학술지 논문 출판', track: 'hybrid',
    title: '논리를 학습의 조건으로 삼다', subtitle: 'Logic Tensor Networks',
    people: ['Samy Badreddine', "Artur d’Avila Garcez", 'Luciano Serafini', 'Michael Spranger'],
    summary: '논리 문장의 만족도를 신경 계산과 연결해 데이터와 제약을 함께 다룬다.',
    detail: 'Logic Tensor Networks는 Real Logic을 이용해 술어와 함수, 논리식을 미분 가능한 계산에 연결한다. 데이터에 맞추는 일과 논리적 제약을 만족시키는 일을 학습 과정에서 함께 다룬다.',
    question: '예시가 적을 때, 이미 알고 있는 조건도 학습에 넣을 수 있을까?',
    visual: 'constraints',
    sources: [
      { title: 'Badreddine 외, 2022 · 논문 본문', url: 'https://arxiv.org/html/2012.13635v4' },
      { title: 'Logic Tensor Networks · 공식 코드', url: 'https://github.com/logictensornetworks/logictensornetworks' }
    ],
    caveat: '퍼지 진릿값은 확률이나 고전 논리의 증명 성공과 다르다.',
    related: ['cilp', 'knowledge-representation', 'deepproblog']
  },
  {
    id: 'alphageometry', year: 2024, dateLabel: '2024 · Nature 논문 출판', track: 'hybrid',
    title: '보조선은 제안하고 증명은 추론하다', subtitle: 'AlphaGeometry',
    people: ['Trieu H. Trinh', 'Yuhuai Wu', 'Quoc V. Le', 'He He', 'Thang Luong'],
    summary: '신경 언어모델의 보조 구성 제안과 기호 추론 엔진을 연결한다.',
    detail: 'AlphaGeometry에서는 기호 추론만으로 진행하기 어려울 때 신경 언어모델이 보조 구성을 제안한다. 새 점과 관계가 주어지면 추론 엔진이 추가 결론을 도출하며 기하 증명을 탐색한다.',
    question: '어떤 보조선을 그어야 막힌 증명을 다시 이어 갈 수 있을까?',
    visual: 'geometry',
    sources: [
      { title: 'Trinh 외, 2024 · Nature 원문', url: 'https://www.nature.com/articles/s41586-023-06747-5' },
      { title: 'AlphaGeometry · 공식 코드', url: 'https://github.com/google-deepmind/alphageometry' }
    ],
    caveat: '기하 문제와 해당 표현의 범위에서 작동한다. 보조선 재생 화면은 원모델 실행이 아니다.',
    related: ['transformer', 'strips', 'alphaproof']
  },
  {
    id: 'alphaproof', year: 2025, dateLabel: '2025 · Nature 논문 출판', track: 'hybrid',
    title: '증명 후보를 형식 언어로 검증하다', subtitle: 'AlphaProof',
    people: ['Thomas Hubert', 'Rishi Mehta', 'Laurent Sartran'],
    summary: '증명 전술의 제안, Lean의 실행·검증, 탐색과 강화학습을 연결한다.',
    detail: 'AlphaProof는 형식화된 증명 상태에서 전술을 제안하고 Lean 환경에서 실행해 다음 상태와 검증 결과를 얻는다. 이 피드백을 탐색과 강화학습에 연결한다.',
    question: '그럴듯한 증명과 검증을 통과한 증명을 어떻게 구분할까?',
    visual: 'lean',
    sources: [{ title: 'Hubert 외, 2025 · Nature 원문·전체 저자', url: 'https://www.nature.com/articles/s41586-025-09833-y' }],
    caveat: '공동연구팀 중 첫 세 저자를 표시했다. Lean이 확인하는 것은 형식화된 명제의 증명이며 자연어 해석의 정확성은 별도다.',
    related: ['resolution', 'transformer', 'alphageometry']
  }
];
