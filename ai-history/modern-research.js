/* Modern research additions for AI Atlas.
 * Primary manuscripts/reports checked on 2026-11-06; selected sections only.
 * Dates refer to the named work, not a person's present employment.
 * Examples are educational constructions, not reproduced experimental outputs.
 * YouTube entries are verified title/channel links; no full-video review implied.
 */
(() => {
  'use strict';
  const ref = (title, url, location) => ({ title, url, ...(location ? { location } : {}) });
  const sources = {
    neuralLM: ref('A Neural Probabilistic Language Model · JMLR 2003', 'https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf', '§1.1, §2, Fig.1'),
    sparse: ref('Sparse Filtering · NIPS 2011 원문', 'https://proceedings.neurips.cc/paper/2011/file/192fc044e74dffea144f9ac5dc9f3395-Paper.pdf', '§3–4, Eq.1, §5'),
    word2vec: ref('Efficient Estimation of Word Representations in Vector Space · 2013', 'https://arxiv.org/html/1301.3781v3', '§3.1–3.2, §4–5'),
    wordPhrases: ref('Distributed Representations of Words and Phrases and their Compositionality · NIPS 2013', 'https://arxiv.org/html/1310.4546v1', '§2.2–2.3, §4–5'),
    seq2seq: ref('Sequence to Sequence Learning with Neural Networks · NIPS 2014', 'https://arxiv.org/html/1409.3215v3', '§2, Fig.1, §3.3'),
    gan: ref('Generative Adversarial Nets · NIPS 2014', 'https://arxiv.org/html/1406.2661v1', '§3, Eq.1, §4, §6'),
    maml: ref('Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks · ICML 2017', 'https://proceedings.mlr.press/v70/finn17a/finn17a.pdf', '§2, Eq.1–3, Algorithm 1, §5'),
    genome: ref('Visual Genome · IJCV 2017 저자 기관 원문', 'https://ir.cwi.nl/pub/25535/25535.pdf', '표지, 초록, §1의 연구 동기'),
    genomeRecord: ref('Visual Genome · 2016 사전공개 서지·초록', 'https://arxiv.org/abs/1602.07332', '저자·2016-02-23 사전공개·초록'),
    txl: ref('Transformer-XL · ACL 2019', 'https://aclanthology.org/P19-1285.pdf', 'p.2978 동등 기여 주석, §3.1–3.3, Fig.2'),
    gpt3: ref('Language Models are Few-Shot Learners · NeurIPS 2020', 'https://arxiv.org/html/2005.14165v4', '§2.4, Fig.1.2, §4–5, Author Contributions'),
    cai: ref('Constitutional AI: Harmlessness from AI Feedback · 2022', 'https://arxiv.org/html/2212.08073v1', '§1.2–1.4, §3–4, §6–7, Fig.1'),
    dit: ref('Scalable Diffusion Models with Transformers · 2023 원고', 'https://arxiv.org/html/2212.09748v2', '§3.1–3.2, §4–5, Fig.3'),
    ditVenue: ref('DiT · ICCV 2023 공식 서지', 'https://openaccess.thecvf.com/content/ICCV2023/html/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.html', '저자·학회·2023-10 출판 기록'),
    sora: ref('Video generation models as world simulators · OpenAI 2024 기술보고', 'https://openai.com/index/video-generation-models-as-world-simulators/', 'Turning visual data into patches, Scaling transformers, Discussion, Authors'),
    imagenet: ref('ImageNet: A Large-Scale Hierarchical Image Database · CVPR 2009', 'https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf', '저자·초록·§1'),
    transformer: ref('Attention Is All You Need · NeurIPS 2017', 'https://arxiv.org/html/1706.03762v7', '저자·§3.1–3.2, Eq.1'),
    alexnet: ref('ImageNet Classification with Deep Convolutional Neural Networks · NIPS 2012', 'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf', '저자·§1–2'),
    pi05: ref('π0.5: a Vision-Language-Action Model with Open-World Generalization · 2025', 'https://arxiv.org/html/2504.16054v1', 'IV-A–D, V, VI, Appendix A-A Contributions, A-B 평가 기준'),
    pi05Team: ref('Physical Intelligence · π0.5 연구팀 발표', 'https://www.pi.website/blog/pi05', '2025-04-22 · 공동저자 명단과 일반화의 범위'),
    kimiK2: ref('Kimi K2: Open Agentic Intelligence · 2025 v1 보고서', 'https://arxiv.org/html/2507.20534v1', '§2.3, §3.1–3.2, §4–5, Appendix A Contributions, B 도구 호출 형식')
  };
  const videos = {
    words: { title: 'Lecture 2 | Word Vector Representations: word2vec', url: 'https://www.youtube.com/watch?v=ERibwqs9p38', channel: 'Stanford University School of Engineering', note: 'CS224N 공식 강의. CBOW·Skip-gram 등의 심화 설명이며 Mikolov의 발표 영상은 아니다.', sourceUrl: 'https://www.youtube.com/watch?v=ERibwqs9p38' },
    maml: { title: 'Stanford CS330: Deep Multi-task and Meta Learning | 2020 | Lecture 4 - Optimization Meta-Learning', url: 'https://www.youtube.com/watch?v=2a_LSOIlHLI', channel: 'Stanford Online', note: '최적화 기반 메타학습 강의. 2020 강의의 2022 업로드이며 2017 논문 발표와 구분한다.', sourceUrl: 'https://cs330.stanford.edu/' },
    generative: { title: 'Lecture 13 | Generative Models', url: 'https://www.youtube.com/watch?v=5WoItGTWV54', channel: 'Stanford University School of Engineering', note: 'CS231n 공식 강의. GAN·VAE·자기회귀 생성 모형을 비교한다. Goodfellow의 원논문 발표 영상은 아니다.', sourceUrl: 'https://www.youtube.com/watch?v=5WoItGTWV54' },
    score: { title: 'Stanford CS236: Deep Generative Models I 2023 I Lecture 13 - Score Based Models', url: 'https://www.youtube.com/watch?v=8G-OsDs1RLI', channel: 'Stanford Online', note: 'Stefano Ermon의 score 기반 생성 모형 강의. 확산 모형의 심화 배경이며 DiT·Sora 연구팀의 발표는 아니다.', sourceUrl: 'https://www.youtube.com/watch?v=8G-OsDs1RLI' }
  };
  const content = (keyIdeas, theory, example, story, references, videoList = []) => ({
    keyIdeas, theory, example, ...(story ? { story } : {}), videos: videoList, references
  });
  const story = (title, text, source) => ({ title, text, source, kind: '연구 맥락' });

  const events = [
    {
      id: 'neural-language-model', year: 2003, dateLabel: '2003 · JMLR 논문', track: 'neural',
      title: '단어 표현과 다음 단어 확률을 함께 배우다', subtitle: 'A Neural Probabilistic Language Model',
      people: ['Yoshua Bengio', 'Réjean Ducharme', 'Pascal Vincent', 'Christian Jauvin'],
      summary: '단어를 벡터로 바꾸는 표와 문맥에서 다음 단어를 예측하는 함수를 함께 학습한다.',
      detail: '본 적 없는 단어 조합을 n-gram 빈도만으로 처리하기 어렵다는 문제에서 출발한다. 유사한 문맥이 학습한 표현을 공유하게 한다.',
      question: '훈련에 없던 문장에도 높은 확률을 줄 수 있는 이유는 무엇일까?', visual: 'network',
      sources: [sources.neuralLM], caveat: '고정 길이 문맥의 신경 언어모형이다. 단어 벡터나 언어 이해 전체를 처음 발명했다는 주장은 아니다.',
      related: ['word2vec', 'lstm', 'gpt3'],
      content: content([
        { title: '표현 공유', text: '단어마다 별도 기호만 두지 않고 학습 가능한 연속 벡터를 둔다.' },
        { title: '공동 학습', text: '다음 단어 예측 오차가 단어 벡터와 확률 모형의 계수를 함께 바꾼다.' }
      ], { text: '문장 확률을 앞 문맥에 조건부인 다음 단어 확률들의 곱으로 분해한다. 논문의 망은 유한 문맥을 사용한다.', formula: 'P(w₁…wₜ) = ∏ᵢ P(wᵢ | w₁…wᵢ₋₁)' },
      { title: '교육용 예시 · 처음 보는 조합', text: '“고양이가 잔다”와 “강아지가 뛴다”를 보았다고 가정한다. 동물 단어의 표현이 비슷하면 새 조합에도 일부 학습 신호를 공유할 수 있다.', steps: ['단어 ID를 벡터로 바꾼다.', '문맥으로 후보 확률을 구한다.', '정답 오차로 두 부분을 갱신한다.'] },
      story('빈도표의 조합 수', '저자들은 단어 수와 문맥 길이가 늘면서 가능한 조합이 폭증하는 차원의 저주를 연구 동기로 제시했다.', sources.neuralLM), [sources.neuralLM])
    },
    {
      id: 'sparse-filtering', year: 2011, dateLabel: '2011 · NIPS 논문', track: 'neural',
      title: '적은 특징이 반응하도록 표현을 배우다', subtitle: 'Sparse Filtering',
      people: ['Jiquan Ngiam', 'Pang Wei Koh', 'Zhenghao Chen', 'Sonia Bhaskar', 'Andrew Y. Ng'],
      summary: '정규화한 특징 반응의 희소성을 목적함수로 삼아 지도 없이 표현을 학습한다.',
      detail: '데이터 분포를 복원하는 모형 대신 특징 행렬의 성질에 초점을 맞춘다. Andrew Ng를 포함한 다섯 공동저자의 연구다.',
      question: '특징을 모두 크게 만들지 않고 선택적으로 반응하게 하려면?', visual: 'network',
      sources: [sources.sparse], caveat: '원문의 단일 하이퍼파라미터 주장은 이 학습 목적의 설정에 관한 것이다. 전체 분류 파이프라인의 튜닝이 없다는 뜻은 아니다.',
      related: ['lenet', 'alexnet', 'neural-language-model'],
      content: content([
        { title: '두 방향 정규화', text: '특징별 반응을 정규화한 뒤 예제별 반응도 정규화한다.' },
        { title: '희소한 반응', text: '한 예제에서 적은 특징이 주로 반응하도록 정규화된 벡터의 L1 크기를 줄인다.' }
      ], { text: '특징별·예제별 L2 정규화를 거친 반응 f̂에 L1 목적을 적용한다. 입력 재구성 오차를 최소화하는 방식과 다르다.', formula: 'min_W Σᵢ ‖f̂⁽ⁱ⁾‖₁' },
      { title: '교육용 예시 · 특징 반응표', text: '가로선·세로선·모서리 특징이 있는 세 그림을 가정한다. 정규화 전후의 반응표를 비교하면 일부 특징에만 반응이 집중되는 뜻을 볼 수 있다.' },
      story('튜닝 부담에서 출발', '서론은 여러 비지도 특징학습법의 하이퍼파라미터 부담을 동기로 들고, 자연 이미지·STL-10·TIMIT에서 평가한다.', sources.sparse), [sources.sparse])
    },
    {
      id: 'word2vec', year: 2013, dateLabel: '2013 · 연구 원고·NIPS 후속 논문', track: 'neural',
      title: '문맥을 예측하며 단어 지도를 만들다', subtitle: 'Word2Vec · CBOW / Skip-gram',
      people: ['Tomas Mikolov', 'Kai Chen', 'Greg Corrado', 'Jeffrey Dean', 'Ilya Sutskever'],authorNote:'수록한 2013년 두 문헌의 참여 인물. Ilya Sutskever는 후속 Distributed Representations 논문의 공동저자이며 초기 Efficient Estimation 원고의 저자는 아니다. 전체 저자 순서는 각 원문 참조.',
      summary: '주변 단어와 중심 단어의 예측 문제로 단어 벡터를 학습한다.',
      detail: '초기 원고는 CBOW와 Skip-gram을, 후속 논문은 negative sampling·빈번한 단어의 subsampling·구 단위 표현을 다룬다.',
      question: '사전의 뜻풀이 없이 어떤 단어가 비슷하게 쓰이는지 배울 수 있을까?', visual: 'memory',
      sources: [sources.word2vec, sources.wordPhrases], caveat: '한 단어에 고정 벡터를 두므로 문맥별 다의어를 직접 구분하지 못한다. 벡터 유추가 항상 성립하거나 참된 관계를 증명하는 것은 아니다.',
      related: ['neural-language-model', 'seq2seq', 'transformer'],
      content: content([
        { title: 'CBOW', text: '주변 단어의 표현으로 중심 단어를 예측한다.' },
        { title: 'Skip-gram', text: '중심 단어에서 가까이 등장하는 단어를 예측한다.' },
        { title: '후속 확장', text: 'Negative sampling은 관측 문맥과 뽑은 부정 예를 구분하는 학습을 사용한다.' }
      ], { text: 'Skip-gram은 중심 단어가 주어졌을 때 창 안의 문맥 단어들의 로그확률을 높인다. 두 논문의 기여와 공동저자 목록은 구분한다.', formula: 'Σₜ Σⱼ log P(wₜ₊ⱼ | wₜ),  0 < |j| ≤ c' },
      { title: '교육용 예시 · 문맥 창', text: '“작은 고양이가 창가에서 잔다”에서 중심을 “고양이”로 선택한다. 창 크기를 바꾸며 어떤 학습 쌍이 생기는지 비교한다. 좌표는 예시이며 실제 학습 벡터가 아니다.', steps: ['중심 단어를 고른다.', '창 안의 단어와 쌍을 만든다.', '공유된 벡터를 갱신한다.'] },
      story('Air Canada라는 한 덩어리', '후속 논문은 단어의 개별 의미를 더하는 것만으로 고유한 구의 의미를 표현하기 어렵다는 문제를 들며 구 단위 학습을 제시한다.', sources.wordPhrases), [sources.word2vec, sources.wordPhrases], [videos.words])
    },
    {
      id: 'seq2seq', year: 2014, dateLabel: '2014 · NIPS 논문', track: 'neural',
      title: '한 시퀀스를 다른 시퀀스로 옮기다', subtitle: 'Sequence to Sequence Learning',
      people: ['Ilya Sutskever', 'Oriol Vinyals', 'Quoc V. Le'],
      summary: 'LSTM 인코더가 만든 표현에서 LSTM 디코더가 길이가 다른 출력 시퀀스를 생성한다.',
      detail: '영어–프랑스어 번역을 평가하며 고정 차원 입력·출력의 제약을 다룬다. 후대 attention 구조와 이 논문의 고정 벡터 구조를 구분한다.',
      question: '입력과 출력의 단어 수가 달라도 한 모형으로 연결할 수 있을까?', visual: 'memory',
      sources: [sources.seq2seq], caveat: '동시기 인코더–디코더 연구도 있었다. 모든 seq2seq의 단독 최초나 현대 번역기의 완성형으로 소개하지 않는다.',
      related: ['lstm', 'word2vec', 'transformer'],
      content: content([
        { title: '인코더', text: '입력 토큰을 차례로 읽어 고정 차원 벡터에 담는다.' },
        { title: '디코더', text: '입력 표현과 앞선 출력 토큰에 조건부로 다음 토큰을 예측한다.' }
      ], { text: '출력 시퀀스의 확률을 앞서 생성한 출력과 입력 표현 v에 조건부인 확률로 나눈다.', formula: 'P(y | x) = ∏ₜ P(yₜ | y₁…yₜ₋₁, v(x))' },
      { title: '교육용 예시 · 두 토큰에서 세 토큰으로', text: '짧은 입력을 읽는 단계와 종료 토큰까지 출력을 만드는 단계를 나눠 본다. 준비한 토큰 경로는 실제 번역 모형의 출력이 아니다.' },
      story('입력을 거꾸로 읽은 실험', '§3.3은 목표 문장은 유지하고 원문 단어 순서를 뒤집으면 단기 의존성이 늘어 학습이 쉬워졌다고 보고한다. 모든 번역에 필요한 규칙이라는 뜻은 아니다.', sources.seq2seq), [sources.seq2seq])
    },
    {
      id: 'gan', year: 2014, dateLabel: '2014 · NIPS 논문', track: 'neural',
      title: '생성자와 판별자가 함께 달라지다', subtitle: 'Generative Adversarial Nets',
      people: ['Ian J. Goodfellow', 'Jean Pouget-Abadie', 'Mehdi Mirza', 'Bing Xu', 'David Warde-Farley', 'Sherjil Ozair', 'Aaron Courville', 'Yoshua Bengio'],
      summary: '생성 모형과 진짜·생성 표본을 구분하는 모형을 적대적인 목적 아래 학습한다.',
      detail: '생성자는 무작위 입력을 표본으로 바꾸고 판별자는 훈련 데이터와 생성 표본을 구분한다. 두 모형의 목표가 연결된다.',
      question: '정답 이미지와 일대일로 비교하지 않고 생성자를 어떻게 가르칠까?', visual: 'network',
      sources: [sources.gan], caveat: '이론적 균형의 존재가 유한 신경망의 안정적인 학습을 보장하지 않는다. 모드 붕괴와 학습 불안정성을 따로 본다.',
      related: ['backprop', 'dit', 'sora'],
      content: content([
        { title: '생성자 G', text: '무작위 입력 z를 표본으로 바꾸며 판별자를 속이는 방향으로 바뀐다.' },
        { title: '판별자 D', text: '실제 데이터와 현재 생성자의 출력을 구분하도록 바뀐다.' }
      ], { text: '두 모형의 minimax 목표가 맞물린다. 실용 학습에서 생성자의 대체 목적도 논의한다.', formula: 'min_G max_D Eₓ[log D(x)] + E_z[log(1 − D(G(z)))]' },
      { title: '교육용 예시 · 두 봉우리의 분포', text: '진짜 점들이 두 군집에 있다고 가정한다. 생성 점이 한 군집에만 모이면 그럴듯한 표본이 있어도 분포의 다양성을 놓칠 수 있다.' },
      story('원문에 등장한 비유', '서론은 위조범과 이를 구분하는 경찰을 비유로 사용한다. 이는 역할을 설명하는 비유이며 실제 연구 탄생의 개인 일화는 아니다.', sources.gan), [sources.gan], [videos.generative])
    },
    {
      id: 'maml', year: 2017, dateLabel: '2017 · ICML 논문', track: 'neural',
      title: '새 과제에 빨리 적응할 출발점을 배우다', subtitle: 'Model-Agnostic Meta-Learning · MAML',
      people: ['Chelsea Finn', 'Pieter Abbeel', 'Sergey Levine'],
      summary: '여러 과제에서 조금씩 갱신한 뒤의 성능이 좋아지도록 공통 초기 매개변수를 학습한다.',
      detail: '과제 안에서 적응하는 갱신과 과제들을 가로질러 초기값을 바꾸는 갱신을 구분한다. 분류·회귀·강화학습 설정에서 평가했다.',
      question: '새 과제를 배우기 전의 초기값도 학습할 수 있을까?', visual: 'network',
      sources: [sources.maml], caveat: 'model-agnostic은 모든 모델·모든 과제에서 성공한다는 뜻이 아니다. 논문은 경사 기반 학습을 할 수 있는 모형과 과제 분포를 전제로 한다.',
      related: ['backprop', 'gpt3', 'dreamcoder'],
      content: content([
        { title: '안쪽 갱신', text: '새 과제의 소수 예제로 그 과제의 매개변수 θ′를 구한다.' },
        { title: '바깥쪽 갱신', text: '적응 뒤의 별도 예제 손실을 줄이도록 공통 초기값 θ를 바꾼다.' }
      ], { text: '학습 목표는 갱신 전의 점수보다 적응 뒤의 점수다. 원래 MAML은 이 갱신 연산을 통해서도 미분한다.', formula: 'θ′ᵢ = θ − α∇θ Lᵀⁱ(θ);  min_θ Σᵢ Lᵀⁱ(θ′ᵢ)' },
      { title: '교육용 예시 · 여러 사인 곡선', text: '진폭과 위상이 다른 과제들을 가정한다. 새 곡선의 점 몇 개로 적응한 뒤, 보지 않은 점에서 오차를 확인한다.' },
      story('고정된 학습기가 아니라 좋은 초기값', '저자들은 별도의 학습 규칙을 만드는 대신 기존 경사하강으로 쉽게 미세조정할 수 있는 초기값을 학습하는 선택을 설명한다.', sources.maml), [sources.maml], [videos.maml])
    },
    {
      id: 'visual-genome', year: 2017, dateLabel: '2016 사전공개 · 2017 IJCV', track: 'neural',
      title: '사물 이름을 넘어 관계를 기록하다', subtitle: 'Visual Genome',
      people: ['Ranjay Krishna', 'Yuke Zhu', 'Oliver Groth', 'Justin Johnson', 'Kenji Hata', 'Joshua Kravitz', 'Stephanie Chen', 'Yannis Kalantidis', 'Li-Jia Li', 'David A. Shamma', 'Michael S. Bernstein', 'Fei-Fei Li'],
      summary: '이미지의 객체·속성·관계·영역 설명과 질문–답을 촘촘히 주석한 데이터셋이다.',
      detail: '이미지 한 장에 단일 범주를 붙이는 과제에서 더 나아가, 객체 사이의 상호작용을 학습·평가할 자료를 구축했다.',
      question: '“사람”과 “말”이 있다는 것만으로 누가 무엇을 타는지 알 수 있을까?', visual: 'scene',
      sources: [sources.genome, sources.genomeRecord], caveat: '관계를 주석한 데이터의 구축이다. 관계선 자체가 논리적 귀결이나 일반적인 장면 추론의 성공을 뜻하지 않는다.',
      related: ['imagenet', 'nscl', 'knowledge-representation'],
      content: content([
        { title: '객체와 속성', text: '무엇이 있는지와 어떤 성질인지 구분해 적는다.' },
        { title: '관계', text: '두 객체가 어떻게 연결되는지 주어–관계–목적어로 적는다.' }
      ], { text: '장면 그래프는 객체 노드와 관계 간선으로 주석을 표현할 수 있다. 관측된 관계와 별도 규칙으로 도출한 사실은 구분해야 한다.', formula: '(사람, 타고 있다, 말)' },
      { title: '교육용 예시 · 같은 객체, 다른 관계', text: '사람과 자전거가 등장하는 두 장면을 가정한다. “타다”와 “옆에 서다”를 바꾸면 객체 목록이 같아도 설명과 답은 달라진다.' },
      story('관계를 위한 자료가 부족했다', '초록과 서론은 이미지 분류용 자료만으로 객체의 풍부한 상호작용을 다루기 어렵다는 문제를 구축 동기로 든다.', sources.genome), [sources.genome, sources.genomeRecord])
    },
    {
      id: 'transformer-xl', year: 2019, dateLabel: '2019 · ACL 논문', track: 'neural',
      title: '앞 구간의 상태를 다음 구간에 전달하다', subtitle: 'Transformer-XL',
      people: ['Zihang Dai', 'Zhilin Yang', 'Yiming Yang', 'Jaime Carbonell', 'Quoc V. Le', 'Ruslan Salakhutdinov'],
      summary: '이전 구간의 은닉상태를 메모리로 재사용하고 상대 위치 표현으로 순서의 혼동을 줄인다.',
      detail: 'Zihang Dai와 Zhilin Yang은 원문에서 동등 기여로 명시된다. 고정 길이 구간 경계에서 문맥이 끊기는 언어모형 문제를 다룬다.',
      question: '문장을 잘라 처리할 때 앞 구간의 문맥을 어떻게 가져올까?', visual: 'attention',
      sources: [sources.txl], caveat: '저장한 상태와 메모리 길이에는 계산 제약이 있다. 무한한 문맥을 정확히 기억하는 장치나 사실 검증기가 아니다.',
      related: ['transformer', 'lstm', 'gpt3'],
      content: content([
        { title: '구간 간 메모리', text: '이전 구간의 은닉상태를 현재 구간의 attention 계산에 활용한다.' },
        { title: '상대 위치', text: '상태를 재사용할 때 토큰 위치가 뒤섞이지 않도록 상대 거리를 다룬다.' }
      ], { text: '이전 상태는 학습 시 역전파를 멈춘 메모리로 붙이고 현재 구간을 계산한다. 원문 Fig.2는 일반 Transformer와의 차이를 보여 준다.', formula: '메모리 = stop-gradient(이전 구간 은닉상태)' },
      { title: '교육용 예시 · 두 구간의 이야기', text: '첫 구간에 등장한 이름을 다음 구간에서 다시 가리킨다고 가정한다. 이전 상태를 제공하는 경우와 구간마다 초기화하는 경우의 정보 경로를 비교한다.' },
      story('잘린 구간의 첫 단어', '서론은 문장 경계와 무관하게 자른 구간의 첫 토큰이 필요한 문맥을 잃는 현상을 context fragmentation으로 설명한다.', sources.txl), [sources.txl])
    },
    {
      id: 'gpt3', year: 2020, dateLabel: '2020 · NeurIPS 논문', track: 'neural',
      title: '예시를 문맥에 넣어 과제를 지정하다', subtitle: 'Language Models are Few-Shot Learners · GPT-3',
      people: ['Tom B. Brown','Benjamin Mann','Ilya Sutskever','Dario Amodei'],authorNote:'GPT-3 공동연구의 일부 참여 인물: Tom B. Brown, Benjamin Mann, Ilya Sutskever, Dario Amodei. 전체 공동저자는 원문 참조.',
      summary: '추가 경사 갱신 없이 지시와 몇 개의 예시를 입력 문맥으로 제공해 여러 과제를 평가했다.',
      detail: '모델 크기와 zero-shot·one-shot·few-shot 설정을 비교한다. 연구팀의 다양한 기여를 한 사람의 단독 업적으로 합치지 않는다.',
      question: '새 예시를 읽는 것과 가중치를 다시 학습하는 것은 어떻게 다를까?', visual: 'attention',
      sources: [sources.gpt3], caveat: '문맥 내 예시 제공은 해당 평가에서의 가중치 갱신과 다르다. 데이터 오염·편향·추론 실패 등의 한계를 논문도 다룬다.',
      related: ['transformer', 'maml', 'constitutional-ai'],
      content: content([
        { title: '문맥 내 과제 지정', text: '지시와 입출력 예시를 프롬프트에 넣고 다음 출력을 이어 간다.' },
        { title: '갱신 유무', text: 'Few-shot 평가는 같은 모델의 가중치를 유지한 채 예시 수를 바꾼다.' }
      ], { text: '사전학습된 자기회귀 모형이 과제 설명과 예시를 문맥으로 받는다. MAML처럼 새 과제의 경사로 초기값을 수정하는 절차가 아니다.', formula: 'P(답 | 지시, 예시₁, …, 새 입력; 고정된 θ)' },
      { title: '교육용 예시 · 예시 개수 바꾸기', text: '“기쁨→긍정” 같은 분류 예시를 0개·1개·여러 개 제시하는 입력 구성을 비교한다. 준비한 답은 실제 GPT-3 호출 결과가 아니다.' },
      story('성능과 오염을 함께 검사', '§4는 웹 자료로 학습한 모델의 평가 문항 중복을 점검하고 §5는 여전히 어려운 과제를 기록한다.', sources.gpt3), [sources.gpt3])
    },
    {
      id: 'constitutional-ai', year: 2022, dateLabel: '2022 · 연구 원고 공개', track: 'neural',
      title: '명시한 원칙으로 응답을 비평하고 수정하다', subtitle: 'Constitutional AI',
      people: ['Yuntao Bai','Jared Kaplan','Dario Amodei'],authorNote:'Anthropic 공동연구의 일부 참여 인물: Yuntao Bai, Jared Kaplan, Dario Amodei. Amodei의 RL 인프라 개발 공동 리드 역할은 원문 기여문 확인. 전체 공동저자는 원문 참조.',
      summary: '원칙에 따른 자기 비평·수정과 AI가 만든 선호 비교를 학습에 이용한다.',
      detail: '지도학습 단계와 AI 선호에 기반한 강화학습 단계를 나눈다. §7은 아이디어·실험·집필·인프라의 기여를 구분한다.',
      question: '예시마다 사람이 평가하는 대신 원칙을 주면 무엇이 달라질까?', visual: 'constraints',
      sources: [sources.cai], caveat: '자연어 원칙은 형식 논리 증명이나 안전 보장이 아니다. 초기 helpful 모델에는 인간 피드백을 사용했다. “인간 감독 없음”으로 요약하지 않는다.',
      related: ['gpt3', 'ltn', 'alphaproof'],
      content: content([
        { title: '비평과 수정', text: '원칙을 보고 응답을 비평·수정한 자료로 지도 미세조정을 한다.' },
        { title: 'AI의 선호 비교', text: '모델이 원칙에 따라 응답 쌍을 비교하고 선호 모형과 RL 학습에 이용한다.' }
      ], { text: '원칙을 참조하는 학습 절차이며 기호 추론 엔진의 규칙 적용과 다르다. 원하는 행동 기준의 선택은 여전히 인간의 결정이다.' },
      { title: '교육용 예시 · 근거 없는 단정 고치기', text: '“확인되지 않은 정보를 단정하지 않는다”는 원칙을 가정한다. 과장된 답을 비평하고 불확실성을 드러내는 답으로 수정하는 단계를 비교한다.' },
      story('누가 무엇을 맡았나', '§7은 Bai의 방법 개발·주요 실험, Kaplan과 Bai의 집필, Amodei와 McCandlish의 RL 인프라 개발 리드를 별도로 기록한다.', sources.cai), [sources.cai])
    },
    {
      id: 'dit', year: 2023, dateLabel: '2022 사전공개 · 2023 ICCV', track: 'neural',
      title: '확산 모형의 몸체를 Transformer로 바꾸다', subtitle: 'Diffusion Transformers · DiT',
      people: ['William Peebles', 'Saining Xie'],
      summary: '잠재 공간의 이미지 패치를 Transformer로 처리하는 확산 모형을 연구했다.',
      detail: 'U-Net 대신 Transformer를 사용하고 모델 깊이·폭·패치 크기와 계산량의 관계를 비교했다. 2022 원고와 2023 ICCV 출판을 구분한다.',
      question: '노이즈를 제거하는 모형도 패치 토큰을 처리하는 Transformer가 될 수 있을까?', visual: 'network',
      sources: [sources.dit, sources.ditVenue], caveat: '조건부 ImageNet 생성의 해당 설정에서 평가한 결과다. 이미지·영상의 물리적 정확성이나 모든 과제의 우월성을 보장하지 않는다.',
      related: ['transformer', 'gan', 'sora'],
      content: content([
        { title: '잠재 패치', text: '압축한 이미지 표현을 작은 패치 토큰들로 나눈다.' },
        { title: '조건부 잡음 예측', text: '노이즈 수준과 범주 등의 조건을 받아 확산 과정의 예측을 수행한다.' }
      ], { text: '확산 학습의 잡음 예측기를 Transformer로 구현한다. 패치 수를 늘리면 토큰 수와 attention 계산도 달라진다.', formula: 'εθ(zₜ, t, c) : 잠재 토큰 + 시간 단계 + 조건 → 잡음 예측' },
      { title: '교육용 예시 · 같은 격자, 다른 패치', text: '작은 이미지 격자를 큰 패치와 작은 패치로 나눠 토큰 수를 센다. 격자 애니메이션은 DiT 체크포인트의 실제 생성 결과가 아니다.' },
      story('구조 선택을 실험하다', '서론은 확산 모형에서 U-Net 구조가 꼭 필요한지 묻고, §5는 Transformer 크기와 패치 크기를 바꾼 실험을 제시한다.', sources.dit), [sources.dit, sources.ditVenue], [videos.score])
    },
    {
      id: 'sora', year: 2024, dateLabel: '2024-02-15 · 기술보고', track: 'neural',
      title: '영상도 시공간 패치로 표현하다', subtitle: 'Video generation models as world simulators',
      people: ['Tim Brooks', 'Bill Peebles', 'Connor Holmes', 'Will DePue', 'Yufei Guo', 'Li Jing', 'David Schnurr', 'Joe Taylor', 'Troy Luhman', 'Eric Luhman', 'Clarence Ng', 'Ricky Wang', 'Aditya Ramesh'],
      summary: '길이와 해상도가 다른 영상·이미지를 시공간 잠재 패치로 표현해 확산 Transformer로 학습했다.',
      detail: '이 카드는 최초 Sora 기술보고의 표현 방식과 공개된 한계를 다룬다. 후속 제품의 기능·공개 여부·현재 조직 상태와 구분한다.',
      question: '가로 영상·세로 영상·정지 이미지를 같은 입력 단위로 묶을 수 있을까?', visual: 'scene',
      sources: [sources.sora], caveat: '보고서는 세부 모델·구현을 공개하지 않았고 기본적인 물리 상호작용의 실패도 제시했다. 제목의 world simulator를 물리 이해의 검증된 완성으로 읽지 않는다.',
      related: ['dit', 'transformer', 'visual-genome'],
      content: content([
        { title: '시공간 압축', text: '영상을 시간·공간 방향으로 압축한 잠재 표현으로 바꾼다.' },
        { title: '가변 크기 패치열', text: '잠재 표현의 패치들을 토큰으로 다뤄 길이·화면비가 다른 자료를 연결한다.' }
      ], { text: '보고서는 텍스트 조건과 노이즈가 섞인 시공간 패치로부터 깨끗한 패치를 예측하는 확산 Transformer를 설명한다.' },
      { title: '교육용 예시 · 영상 상자 자르기', text: '가로·세로·시간 축이 있는 작은 블록을 패치로 나눠 본다. 패치 배열이 영상 크기와 길이에 대응함을 보여 주는 도식이다.' },
      story('보이는 일관성과 물리 정확성', 'Discussion은 유리 파손과 음식 섭취 뒤의 상태 변화 등을 잘못 표현하는 사례를 한계로 든다.', sources.sora), [sources.sora], [videos.score])
    },
    {
      id: 'pi05', year: 2025, dateLabel: '2025-04-22 · 연구 원고 공개', track: 'neural',
      title: '여러 자료로 배운 행동을 새 집에서 수행하다', subtitle: 'π0.5 · Vision-Language-Action Model',
      people: ['Chelsea Finn'], authorNote:'연결한 인물: Chelsea Finn · Physical Intelligence 공동연구팀 전체 저자는 원문 참조. Finn의 기여는 Appendix A-A 확인.',
      summary: '로봇 행동·웹 자료·하위과제 예측 등의 자료를 함께 학습해 새 장소의 조작 과제를 평가했다.',
      detail: '관측과 지시에서 하위과제를 언어로 예측하고 연속 행동으로 연결한다. Finn은 부록의 개인별 기여 명단에 포함되어 최근 연구 카드로 선정했다.',
      question: '배운 집과 다른 집에서도 물체·지시·행동을 연결할 수 있을까?', visual: 'planning',
      sources: [sources.pi05, sources.pi05Team],
      caveat: '평가 과제 유형은 학습 자료에 포함되며 새 장소·배치에서 평가했다. 낯선 손잡이·가려진 관측 등에 실패하며, 모든 집·새 기술에 대한 자율성을 검증한 것은 아니다.',
      related: ['maml', 'nscl', 'sora'],
      content: content([
        { title: '이질적 자료의 공동 학습', text: '여러 로봇의 행동 자료와 웹의 시각·언어 자료, 하위과제 예측을 함께 사용한다.' },
        { title: '언어에서 연속 행동으로', text: '예측한 하위과제와 현재 관측을 바탕으로 action chunk를 생성한다.' }
      ], { text: '같은 모델이 언어 하위과제와 행동 분포를 표현한다. 최종 연속 행동에는 flow matching을 사용한다. 상위 언어 출력이 형식 논리 증명은 아니다.', formula: 'P(행동, 하위과제 | 관측, 지시)\n= P(행동 | 관측, 하위과제) P(하위과제 | 관측, 지시)' },
      { title: '교육용 예시 · 새 주방의 접시', text: '“접시를 정리해”라는 지시에서 “접시 집기”를 예측하고 연속 이동 명령으로 잇는 흐름을 따라간다. 화면 도식은 로봇을 제어하거나 원모델을 실행하지 않는다.' },
      story('Finn의 참여를 확인한 위치', 'Appendix A-A는 Finn을 데이터 수집·운영, 주석·추가 자료, 정책학습·연구, 집필·도식의 공동 기여자로 기록한다.', sources.pi05), [sources.pi05, sources.pi05Team])
    },
    {
      id: 'kimi-k2', year: 2025, dateLabel: '2025-07-28 · 기술보고 v1', track: 'neural',
      title: '도구를 호출하고 결과를 이어 쓰는 모델', subtitle: 'Kimi K2: Open Agentic Intelligence',
      people: ['Zhilin Yang'], authorNote:'단체저자: Kimi Team · 연결한 인물 Zhilin Yang은 Appendix A 기여자 명단에 포함. 개인별 설계 책임은 확인하지 못함.',
      summary: 'MoE 언어모형과 도구 사용 궤적·환경 상호작용을 활용한 후학습을 보고했다.',
      detail: 'Appendix A의 기여자 명단에 Yang이 있어 프로필에 연결한다. 명단은 성 기준 알파벳순이며, 그의 세부 설계·실험 책임은 이 명단만으로 확인할 수 없다.',
      question: '텍스트를 쓰는 모델이 도구 실행 결과를 어떻게 다음 판단에 사용할까?', visual: 'program',
      sources: [sources.kimiK2],
      caveat: '2025 v1의 방법·평가를 다룬다. 회사 전체 성과를 Yang의 단독 발명으로 귀속하지 않으며, 도구 호출을 형식 증명·항상 성공하는 자율 실행과 동일시하지 않는다.',
      related: ['transformer-xl', 'gpt3', 'constitutional-ai'],
      content: content([
        { title: 'MoE의 선택적 계산', text: '모든 expert를 매 토큰 동일하게 쓰는 대신 일부를 선택해 계산한다.' },
        { title: '도구 사용의 학습 자료', text: '도구 호출과 결과가 이어지는 궤적을 합성·검수하고 실제·합성 환경의 피드백도 학습에 이용한다.' }
      ], { text: 'Appendix B는 도구 선언·모델의 호출·도구 결과를 별도 메시지 구성요소로 정의한다. 호출 요청 생성과 외부 도구의 실행은 다른 동작이다.', formula: '도구 선언 → 모델의 호출 요청 → 외부 실행 결과 → 후속 응답' },
      { title: '교육용 예시 · 합계를 도구로 확인하기', text: '모델이 가상의 재고 합계 계산을 요청하고 도구 결과를 받은 뒤 답을 작성하는 경로를 본다. 준비된 계산 예시이며 Kimi K2의 실제 응답이나 벤치마크 재현이 아니다.' },
      story('팀 보고서와 개인 기여의 경계', '본문 저자는 Kimi Team이며 Appendix A는 Yang을 포함한 기여자를 나열한다. 이 연결의 근거와 확인하지 못한 개인별 책임을 함께 남겼다.', sources.kimiK2), [sources.kimiK2])
    }
  ];
  window.ATLAS_MODERN_EVENTS = events;

  const allEvents = new Map([...(window.TIMELINE_DATA || []), ...events].map(event => [event.id, event]));
  const work = (personId, eventId, overrides = {}) => {
    const event = allEvents.get(eventId);
    if (!event) throw new Error(`AI Atlas modern profile: missing event ${eventId}`);
    return {
      id: `${personId}-${eventId}`, eventId, year: event.year, dateLabel: event.dateLabel,
      title: event.subtitle, summary: event.summary, type: ['sora','kimi-k2'].includes(eventId) ? '기술보고' : ['constitutional-ai','pi05'].includes(eventId) ? '연구 원고' : '연구논문',
      track: event.track, people: event.people, authorNote:event.authorNote, sources: event.sources, caveat: event.caveat,
      ...(event.content ? { content: event.content } : {}), ...overrides
    };
  };
  const profile = (id, name, nameKo, tagline, roles, intro, eventIds, extra = {}) => ({
    id, name, nameKo, tagline, roles, intro, focus: true, tags: ['neural'],
    works: eventIds.map(eventId => work(id, eventId)), ...extra
  });
  window.ATLAS_MODERN_PROFILES = [
    profile('dario-amodei', 'Dario Amodei', '다리오 아모데이', '언어모형 학습과 AI 피드백 연구',
      ['GPT-3 공동저자', 'Constitutional AI 공동저자·RL 인프라 개발 공동 리드'],
      '공개 논문의 저자·기여문으로 확인한 연구를 연결한다. Constitutional AI의 아이디어·실험·집필을 혼자 맡은 것으로 서술하지 않는다.',
      ['gpt3', 'constitutional-ai']),
    profile('william-peebles', 'William Peebles', '윌리엄 피블스', '확산 Transformer와 영상의 시공간 표현',
      ['DiT 공동저자 (Saining Xie와 공동연구)', '2024 Sora 기술보고 공동저자 Bill Peebles'],
      '이미지 잠재 패치의 생성 구조에서 영상 시공간 패치로 이어지는 대표 연구를 읽는다. 논문 성과와 후속 제품·현재 직함을 구분한다.',
      ['dit', 'sora'], { aliases: ['Bill Peebles', 'William (Bill) Peebles'] }),
    profile('chelsea-finn', 'Chelsea Finn', '첼시 핀', '메타학습에서 새 환경의 로봇 행동으로',
      ['MAML 공동저자 (Pieter Abbeel·Sergey Levine와 공동연구)', '2025 π0.5 공동저자·정책학습/연구·데이터/주석·집필 기여'],
      '빠르게 적응할 초기값을 배우는 MAML과 새 장소에서 로봇 행동을 평가한 π0.5를 연결한다. 2025 원문의 공동저자·개인별 기여문을 선정 근거로 삼는다.',
      ['maml', 'pi05']),
    profile('yang-zhilin', 'Zhilin Yang', '양즈린', '긴 문맥의 언어모형과 도구 사용의 후학습',
      ['Transformer-XL 공동저자·Zihang Dai와 동등 기여', '2025 Kimi K2 팀 보고서의 기여자 명단에 포함'],
      'Transformer-XL과 Kimi K2를 연결한다. K2는 팀 저자 보고서이며 부록에서 Yang의 참여를 확인했다. 회사 경영 역할에서 세부 알고리즘·실험의 책임을 추정하지 않는다.',
      ['transformer-xl', 'kimi-k2'], { aliases: ['Yang Zhilin', '양즈린'] }),
    profile('ilya-sutskever', 'Ilya Sutskever', '일리야 수츠케버', '이미지 분류에서 시퀀스·언어모형으로',
      ['AlexNet 공동저자', 'Seq2Seq 공동저자', 'Word2Vec 후속 논문·GPT-3 공동저자'],
      'Krizhevsky·Hinton과의 이미지 분류, Vinyals·Le와의 시퀀스 학습, 언어모형 공동연구를 구분해 읽는다.',
      ['alexnet', 'seq2seq', 'gpt3']),
    profile('ian-goodfellow', 'Ian J. Goodfellow', '이안 굿펠로', '생성자와 판별자의 적대적 학습',
      ['2014 GAN 논문 공동저자'],
      '여덟 공동저자의 GAN 논문을 중심으로 생성 목적과 판별 목적의 관계를 살펴본다. 균형의 이론과 실제 학습 안정성을 구분한다.',
      ['gan']),
    profile('tomas-mikolov', 'Tomas Mikolov', '토마스 미콜로프', '문맥 예측으로 학습하는 단어 벡터',
      ['CBOW·Skip-gram 연구 공동저자', 'Negative sampling·구 표현 후속 논문 공동저자'],
      '2013년의 초기 원고와 후속 논문을 구분한다. 후속 논문에는 Ilya Sutskever가 참여했으며 초기 원고와 저자 목록이 다르다.',
      ['word2vec'], { aliases: ['Tomáš Mikolov'] }),
    profile('ashish-vaswani', 'Ashish Vaswani', '아시시 바스와니', 'Attention을 중심에 둔 시퀀스 구조',
      ['2017 Transformer 논문 공동저자'],
      '여덟 공동저자의 Attention Is All You Need를 연결한다. 기존 연표의 Transformer 카드를 재사용하며 attention 자체의 단독 최초 발명으로 소개하지 않는다.',
      ['transformer']),
    profile('andrew-ng', 'Andrew Y. Ng', '앤드루 응', '비지도 특징학습의 목적과 표현',
      ['Sparse Filtering 공동저자'],
      '교육·산업 활동과 구분해 원문으로 확인한 특징학습 연구를 연결한다. Sparse Filtering은 Jiquan Ngiam 등 다섯 공동저자의 연구다.',
      ['sparse-filtering'], { aliases: ['Andrew Ng'] }),
    profile('fei-fei-li', 'Fei-Fei Li', '페이페이 리', '시각 인식을 위한 데이터와 관계 주석',
      ['ImageNet 데이터 논문 공동저자', 'Visual Genome 데이터 논문 공동저자'],
      '분류용 이미지 자료와 객체·속성·관계 자료의 구축을 연결한다. 데이터 구축, 신경망 모델 개발, 계산 기반의 기여를 구분한다.',
      ['imagenet', 'visual-genome'], { aliases: ['Li Fei-Fei'] }),
    profile('yoshua-bengio', 'Yoshua Bengio', '요슈아 벤지오', '단어 표현과 생성 모형의 학습',
      ['신경 확률 언어모형 공동저자', '문자인식 종합 논문·GAN 공동저자'],
      '학습 가능한 단어 표현과 확률 예측을 함께 다룬 연구를 중심으로 문자인식과 생성 모형의 공동연구까지 이어 읽는다.',
      ['lenet', 'neural-language-model', 'gan'])
  ];
})();
