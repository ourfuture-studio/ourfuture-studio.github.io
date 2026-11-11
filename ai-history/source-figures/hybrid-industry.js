/* Original-source figures; edit each workId entry independently. */
window.AtlasPaperArchitecture.register([
  {
    "workId": "kbann",
    "key": "kbann-original",
    "paper": {
      "title": "규칙이 초기 신경망으로 옮겨지는 원도판",
      "image": "assets/papers/kbann-original.png",
      "width": 1401,
      "height": 395,
      "alt": "KBANN Figure 1의 규칙·의존 그래프·가중 신경망 세 패널",
      "caption": "규칙 집합, 의존 관계, 초기 신경망을 나란히 그렸다. 논리 규칙으로 연결과 문턱값을 준비한 뒤 사례로 가중치를 조정한다.",
      "source": "Towell, Shavlik & Noordewier · AAAI 1990, Fig.1",
      "url": "https://cdn.aaai.org/AAAI/1990/AAAI90-129.pdf#page=3",
      "credit": "Towell, Shavlik & Noordewier · AAAI 1990, Fig.1",
      "distinction": "아래 상호작용은 별도 사례다. 원도판의 규칙과 망이 영구히 같은 논리적 증명을 수행한다는 뜻은 아니다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "minsky-symbolic-connectionist-1990",
    "key": "minsky-symbolic-connectionist-1990-original",
    "paper": {
      "title": "기호적 구조와 분산 연결을 대비한 원도판",
      "image": "assets/papers/minsky-symbolic-connectionist-1990-original.png",
      "width": 260,
      "height": 203,
      "alt": "기호적 사람과 연결된 사람을 대비한 민스키 원문 Figure 1의 두 패널",
      "caption": "원문의 Figure 1은 구조를 부분으로 나누는 접근과 연결에서 성질이 나타나는 접근을 대비한다. 민스키는 한 표현만 고집하기보다 여러 표현과 이를 고르는 장치를 함께 연구하자고 제안했다.",
      "source": "Marvin Minsky · Logical vs. Analogical / Symbolic vs. Connectionist, Fig.1",
      "url": "https://www.mit.edu/~dxh/marvin/web.media.mit.edu/~minsky/papers/SymbolicVs.Connectionist.html",
      "credit": "Marvin Minsky · Logical vs. Analogical / Symbolic vs. Connectionist, Fig.1",
      "distinction": "1990년 논설의 개념 삽화다. 실행된 결합 모델의 아키텍처나 검증된 뇌 구조가 아니다. 원본의 낮은 해상도를 유지했다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "cilp",
    "key": "cilp-original",
    "paper": {
      "title": "논리 프로그램을 순환 신경망으로 옮긴 구조",
      "image": "assets/papers/cilp-original.png",
      "width": 743,
      "height": 537,
      "alt": "C-IL²P Figure 3의 입력층, 은닉층, 출력층과 되먹임 연결",
      "caption": "입력·은닉·출력층에 논리 프로그램을 담고, 출력의 일부를 다시 입력으로 돌린다. 반복 계산과 사례 학습을 같은 연결 구조에서 다루려 했다.",
      "source": "d’Avila Garcez & Zaverucha · The Connectionist Inductive Learning and Logic Programming System, Fig.3",
      "url": "https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf#page=14",
      "credit": "d’Avila Garcez & Zaverucha · The Connectionist Inductive Learning and Logic Programming System, Fig.3",
      "distinction": "원도판의 B·C·D 등 기호는 해당 논문의 프로그램이다. 아래 작은 사례와 실제 학습 결과를 혼동하지 않는다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "garcez-cognitive-reasoning-2008",
    "key": "garcez-cognitive-reasoning-2008-original",
    "paper": {
      "title": "여러 세계의 신경망을 연결한 선행 논문 구조",
      "image": "assets/papers/garcez-cognitive-reasoning-2008-original.png",
      "width": 784,
      "height": 726,
      "alt": "세 세계의 C-IL²P 신경망과 세계 사이 연결로 이루어진 Connectionist Modal Logic Figure 3",
      "caption": "각 세계 안의 논리 계산을 C-IL²P 신경망이 맡고, 세계 사이의 접근 관계를 망 사이 연결로 표현한다. 2008년 책에서 다루는 결합 추론의 선행 2007년 논문 Figure 3이다.",
      "source": "d’Avila Garcez et al. · Connectionist Modal Logic (2007), Fig.3",
      "url": "https://openaccess.city.ac.uk/id/eprint/314/2/Connectionist_modal_logic.pdf#page=12",
      "credit": "d’Avila Garcez et al. · Connectionist Modal Logic (2007), Fig.3",
      "distinction": "2008년 책의 도판으로 제시하지 않는다. 확인한 책 발췌 Chapter 1에는 관련 구조도가 없어, 카드에서도 인용한 선행 논문의 실제 도판을 연결했다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "alphago",
    "key": "alphago-original",
    "paper": {
      "title": "정책망과 가치망의 학습을 함께 보여 준 구조",
      "image": "assets/papers/alphago-original.png",
      "width": 1421,
      "height": 495,
      "alt": "AlphaGo Figure 1의 지도학습·강화학습·가치 학습 과정과 정책망·가치망 구조",
      "caption": "사람의 기보로 정책을 배우고, 자기 대국에서 정책과 가치 평가를 준비한다. 정책망은 다음 수 후보를, 가치망은 국면의 승리 가능성을 다루며 탐색을 안내한다.",
      "source": "Silver et al. · Nature 529 (2016), Fig.1",
      "url": "https://storage.googleapis.com/deepmind-media/alphago/AlphaGoNaturePaper.pdf#page=2",
      "credit": "Silver et al. · Nature 529 (2016), Fig.1",
      "distinction": "아래 탐색 조작은 원논문의 신경망이나 몬테카를로 탐색 전체를 실행한 것이 아니다. 원도판의 학습 경로와 별도로 읽는다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "deepproblog",
    "key": "deepproblog-original",
    "paper": {
      "title": "인식·논리·손실을 연결한 학습 흐름",
      "image": "assets/papers/deepproblog-original.png",
      "width": 1729,
      "height": 917,
      "alt": "DeepProbLog Figure 2 전체: 학습 흐름, 동전 프로그램, 질의 win의 SDD",
      "caption": "신경망의 출력 확률을 논리 프로그램에 넣고, 질의의 확률과 미분을 계산해 손실을 다시 전달한다. 아래 두 패널은 같은 동전 사례의 프로그램과 계산 회로다.",
      "source": "Manhaeve et al. · DeepProbLog (2018), Fig.2",
      "url": "https://arxiv.org/pdf/1805.10872v2#page=5",
      "credit": "Manhaeve et al. · DeepProbLog (2018), Fig.2",
      "distinction": "원도판은 동전 사례다. 카드의 숫자 인식 사례는 같은 연결 원리를 풀어 쓴 별도 구성이다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "nscl",
    "key": "nscl-original",
    "paper": {
      "title": "장면·개념·질문 프로그램을 함께 학습한 구조",
      "image": "assets/papers/nscl-original.png",
      "width": 1729,
      "height": 571,
      "alt": "NS-CL Figure 2의 시각 표현, 개념 임베딩, 의미 파싱, 기호 추론과 역전파",
      "caption": "장면의 물체 표현과 개념을 만들고, 질문을 실행할 프로그램으로 해석한다. 답의 차이가 시각 표현과 문장 해석을 고치는 학습 신호로 돌아간다.",
      "source": "Mao et al. · ICLR 2019, Fig.2",
      "url": "https://nscl.csail.mit.edu/data/papers/2019ICLR-NSCL.pdf#page=3",
      "credit": "Mao et al. · ICLR 2019, Fig.2",
      "distinction": "원도판은 예측 Cylinder와 정답 Box가 다른 학습 장면이다. 올바른 답을 낸 성공 사례로 제시하지 않는다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "dreamcoder",
    "key": "dreamcoder-original",
    "paper": {
      "title": "탐색·추상화·꿈 학습이 순환하는 전체 구조",
      "image": "assets/papers/dreamcoder-original.png",
      "width": 1500,
      "height": 1310,
      "alt": "DreamCoder Figure 3의 Wake 탐색, 추상화를 통한 라이브러리 갱신, Fantasies·Replays로 인식망을 학습하는 Dreaming과 중앙 확률 그래프",
      "caption": "문제와 라이브러리를 바탕으로 인식망의 도움을 받아 프로그램을 탐색한다. 찾은 프로그램의 공통 구조를 새 함수로 묶고, 찾았던 프로그램과 라이브러리에서 샘플한 프로그램으로 인식망을 다시 학습한다.",
      "source": "Ellis et al. · PLDI 2021, Fig.3",
      "url": "https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf#page=4",
      "credit": "Ellis et al. · PLDI 2021, Fig.3",
      "distinction": "원논문의 전체 학습 구조다. 그림 오른쪽의 긴 원문 설명은 제외하고 과정도 전체를 발췌했다. 카드의 조립 조작은 실제 DreamCoder 합성기나 인식망 학습을 실행한 결과가 아니다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "ltn",
    "key": "ltn-original",
    "paper": {
      "title": "논리 기호를 텐서 계산으로 연결한 원도판",
      "image": "assets/papers/ltn-original.png",
      "width": 1087,
      "height": 406,
      "alt": "Logic Tensor Networks Figure 1의 기호에서 텐서 함수와 술어로 이어지는 grounding 그래프",
      "caption": "개체·변수·함수·술어를 텐서와 미분 가능한 연산에 대응시킨다. 이렇게 만든 논리식의 충족도를 학습의 목적에 연결한다.",
      "source": "Badreddine et al. · Logic Tensor Networks (2022), Fig.1",
      "url": "https://openaccess.city.ac.uk/id/eprint/27580/1/2012.13635.pdf#page=8",
      "credit": "Badreddine et al. · Logic Tensor Networks (2022), Fig.1",
      "distinction": "신경망 전체 배치도가 아니라 기호와 텐서의 대응을 설명하는 원도판이다. 아래 조작의 수치는 별도 계산이다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "alphageometry",
    "key": "alphageometry-original",
    "paper": {
      "title": "보조 구성을 제안하는 모델과 기호 추론의 순환",
      "image": "assets/papers/alphageometry-original.png",
      "width": 1922,
      "height": 470,
      "alt": "AlphaGeometry Figure 1 a–d의 문제, 언어 모델과 기호 추론기, 보조 구성과 풀이",
      "caption": "기호 추론만으로 해결하지 못하면 언어 모델이 보조 구성을 제안한다. 새 점과 선을 더한 뒤 기호 추론기가 다시 증명을 진행한다.",
      "source": "Trinh et al. · Nature 625 (2024), Fig.1 a–d · CC BY 4.0",
      "url": "https://www.nature.com/articles/s41586-023-06747-5#Fig1",
      "credit": "Trinh et al. · Nature 625 (2024), Fig.1 a–d · CC BY 4.0",
      "distinction": "원본 Figure 1의 위쪽 a–d를 발췌했다. 언어 모델의 제안이 곧 증명이라는 뜻은 아니며, 아래 IMO 예제 e–f는 이 발췌에 포함하지 않았다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "alphaproof",
    "key": "alphaproof-original",
    "paper": {
      "title": "형식 검증기·증명망·탐색의 전체 구조",
      "image": "assets/papers/alphaproof-original.png",
      "width": 1773,
      "height": 1102,
      "alt": "AlphaProof Figure 1 전체: Lean 환경, 증명망, 탐색 트리",
      "caption": "Lean이 현재 목표와 전술의 결과를 확인하고, 증명망이 다음 전술과 유망함을 제안한다. 탐색은 여러 증명 상태를 확장하며 검증 가능한 경로를 찾는다.",
      "source": "Hubert et al. · AlphaProof, Nature, Fig.1",
      "url": "https://www.nature.com/articles/s41586-025-09833-y#Fig1",
      "credit": "Hubert et al. · AlphaProof, Nature, Fig.1",
      "distinction": "2024년 공개 연구를 다룬 2025년 온라인 원논문 도판이며 권호는 2026년이다. 카드의 명제 예시는 원도판의 수론 증명을 실행한 것이 아니다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "huang-nvidia-1993",
    "key": "huang-nvidia-1993-original",
    "paper": {
      "title": "그래픽 파이프라인에서 병렬 계산으로",
      "image": "assets/papers/huang-nvidia-1993-original.png",
      "width": 500,
      "height": 328,
      "alt": "GPU Gems Figure 28-1의 시스템 메모리, 비디오 메모리, 온칩 캐시와 그래픽 처리 단계",
      "caption": "CPU가 보낸 작업과 그래픽 데이터를 여러 처리 단계가 이어 받는다. 그래픽 처리를 위한 병렬 계산 기반이 이후 범용 GPU 계산과 AI 인프라로 확장된다.",
      "source": "Cem Cebenoyan · NVIDIA GPU Gems (2004), Fig.28-1",
      "url": "https://developer.nvidia.com/gpugems/gpugems/part-v-performance-and-practicalities/chapter-28-graphics-pipeline-performance",
      "credit": "Cem Cebenoyan · NVIDIA GPU Gems (2004), Fig.28-1",
      "distinction": "1993년 설립 당시 칩의 구조도가 아니라 2004년 공식 기술서의 그래픽 파이프라인이다. AI 모델의 구조도와도 구별한다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "karp-palantir-2003",
    "key": "karp-palantir-2003-original",
    "paper": {
      "title": "데이터·논리·행동을 묶는 Ontology의 공식 개요",
      "image": "assets/papers/karp-palantir-2003-original.png",
      "width": 1600,
      "height": 900,
      "alt": "Palantir Ontology System의 사람·에이전트, 데이터·논리·행동 및 보안 계층",
      "caption": "Ontology는 데이터의 의미와 관계, 계산 논리, 실행할 행동을 하나의 운영 계층에 연결한다. 사람과 에이전트는 보안·거버넌스 경계 안에서 이 계층을 사용한다.",
      "source": "Palantir · Ontology overview, 공식 문서",
      "url": "https://www.palantir.com/docs/foundry/ontology/overview",
      "credit": "Palantir · Ontology overview, 공식 문서",
      "distinction": "2026-11-11 확인한 현재 문서의 개념도다. 2003년 설립 당시 시스템이나 특정 고객의 실제 배치를 복원한 그림이 아니다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "huang-cuda-2006",
    "key": "huang-cuda-2006-original",
    "paper": {
      "title": "호스트·그리드·블록·스레드의 원래 구성",
      "image": "assets/papers/huang-cuda-2006-original.png",
      "width": 951,
      "height": 1273,
      "alt": "CUDA Programming Guide v1.0 Figure 2-1의 호스트, 두 커널, 그리드·블록·스레드 계층",
      "caption": "CPU 쪽 호스트가 커널을 요청하면 GPU는 스레드 블록들의 그리드로 작업을 표현한다. 큰 계산을 여러 데이터 조각에 나누는 프로그래밍 모형이 신경망 계산의 기반으로 이어졌다.",
      "source": "NVIDIA · CUDA Programming Guide v1.0 (2007-06-23), Fig.2-1",
      "url": "https://developer.download.nvidia.com/compute/cuda/1.0/NVIDIA_CUDA_Programming_Guide_1.0.pdf#page=21",
      "credit": "NVIDIA · CUDA Programming Guide v1.0 (2007-06-23), Fig.2-1",
      "distinction": "2006년 CUDA 도입과 2007년 지침서 발행을 구분한다. 논리적 작업 구성도이며 물리 GPU 코어 배치나 처리 속도를 뜻하지 않는다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "luckey-oculus-2012",
    "key": "luckey-oculus-2012-original",
    "paper": {
      "title": "머리의 자세에서 두 눈의 가상 카메라로",
      "image": "assets/papers/luckey-oculus-2012-original.png",
      "width": 2667,
      "height": 1500,
      "alt": "Oculus 개발 발표의 머리 좌표축, 중앙 시점과 두 눈 위치를 나타낸 원도판",
      "caption": "중앙 시점의 위치·방향에 눈까지의 벡터를 더해 양안 렌더링 위치를 만든다. 사용자의 움직임을 화면 계산에 연결하는 기하 관계다.",
      "source": "Tom Forsyth · Developing VR for Oculus Rift, GDC Europe 2014, slide 37",
      "url": "https://media.gdcvault.com/gdceurope2014/Presentations/830373_Tom_Forsyth.pdf#page=37",
      "credit": "Tom Forsyth · Developing VR for Oculus Rift, GDC Europe 2014, slide 37",
      "distinction": "2014년 개발 자료의 시점 계산 그림이다. 2012년 첫 제품의 전체 구조도나 AI 인식 모델로 제시하지 않는다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "wang-scale-2016",
    "key": "wang-scale-2016-original",
    "paper": {
      "title": "데이터 품질을 세 수준에서 확인하는 공식 흐름",
      "image": "assets/papers/wang-scale-2016-original.png",
      "width": 1200,
      "height": 675,
      "alt": "Scale 공식 자료의 작업·데이터셋·작업자 수준 검토가 학습 데이터로 모이는 과정",
      "caption": "개별 주석의 규칙 준수, 데이터셋의 범위와 다양성, 작업자의 적합성을 각각 확인해 학습 데이터를 만든다. 사람의 작업을 모델 개발에 연결하는 데이터 기반이다.",
      "source": "Scale AI · How We Engineer World-Class Data at Scale (2026)",
      "url": "https://scale.com/blog/data-quality",
      "credit": "Scale AI · How We Engineer World-Class Data at Scale (2026)",
      "distinction": "2016년 설립 당시의 내부 공정도가 아니라 2026년 회사가 설명한 품질 관리 과정이다. 그림의 체크 표시는 독립적인 품질 검증 결과가 아니다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "luckey-anduril-2017",
    "key": "luckey-anduril-2017-original",
    "paper": {
      "title": "현장 자산·Lattice API·운영자를 잇는 경계",
      "image": "assets/papers/luckey-anduril-2017-original.png",
      "width": 1600,
      "height": 899,
      "alt": "Anduril 공식 SDK 그림의 통합 시스템, Lattice 시스템, 운영자와 API 호출 방향",
      "caption": "현장 자산과 데이터 피드가 엔티티·객체·작업 API로 연결되고, 운영자는 Lattice UI에서 이를 다룬다. 자산 상태를 읽는 경로와 작업을 지시하는 경로가 나뉘어 있다.",
      "source": "Anduril · Lattice SDK overview, 공식 개발 문서",
      "url": "https://developer.anduril.com/guides/concepts/overview",
      "credit": "Anduril · Lattice SDK overview, 공식 개발 문서",
      "distinction": "현재 공개 SDK의 통합 경계와 호출 관계다. 2017년 당시의 내부 모델, 무기 제어 전체, 특정 현장의 실제 배치도를 뜻하지 않는다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "hassabis-gemini-2023",
    "key": "hassabis-gemini-2023-original",
    "paper": {
      "title": "여러 입력과 출력을 하나의 Transformer에 연결",
      "image": "assets/papers/hassabis-gemini-2023-original.png",
      "width": 1214,
      "height": 560,
      "alt": "Gemini 1.0 Figure 2의 다양한 입력, 토큰, Transformer와 텍스트·이미지 디코더",
      "caption": "텍스트·오디오·이미지·비디오를 토큰 표현으로 연결하고 Transformer에서 함께 처리한다. 보고서의 개요는 텍스트와 이미지 출력을 위한 디코더도 구분한다.",
      "source": "Gemini Team · Gemini: A Family of Highly Capable Multimodal Models (2023), Fig.2",
      "url": "https://arxiv.org/pdf/2312.11805v1#page=4",
      "credit": "Gemini Team · Gemini: A Family of Highly Capable Multimodal Models (2023), Fig.2",
      "distinction": "2023년 Gemini 보고서의 개념도다. 모든 앱과 API가 당시 이 모든 입출력을 공개했다는 뜻이나 AlphaGo에서 직접 이어 붙인 모델이라는 뜻은 아니다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "karp-aip-2023",
    "key": "karp-aip-2023-original",
    "paper": {
      "title": "AI의 제안을 실제 행동에 연결하기 전의 통제",
      "image": "assets/papers/karp-aip-2023-original.png",
      "width": 2466,
      "height": 1608,
      "alt": "Palantir 공식 Action Connectivity 그림의 사람·AI 협업, 행동 통제·검토·시뮬레이션과 외부 시스템",
      "caption": "사람과 AI의 작업은 Ontology에서 행동으로 연결되며, 검토·통제·시뮬레이션을 거쳐 외부 업무 시스템과 이어진다. 답변 생성과 업무 실행은 같은 단계가 아니다.",
      "source": "Palantir · Platform overview, Action Connectivity for Human+AI Teaming",
      "url": "https://www.palantir.com/docs/foundry/platform-overview/overview",
      "credit": "Palantir · Platform overview, Action Connectivity for Human+AI Teaming",
      "distinction": "현재 공식 문서의 업무 연결 개요다. 2023년 출시 시점 화면이나 고객 권한을 우회한 자동 실행 장면이 아니다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "fei-worldlabs-2024",
    "key": "fei-worldlabs-2024-original",
    "paper": {
      "title": "입력에서 편집 가능한 3D 세계로 이어지는 공식 과정",
      "image": "assets/papers/fei-worldlabs-2024-original.png",
      "width": 2667,
      "height": 1067,
      "alt": "Marble 공식 도판의 여러 입력, 세계 모델, 3D 세계, 편집·확장 루프와 출력 형태",
      "caption": "문장·한 장 또는 여러 장의 이미지·비디오·3D 장면을 세계 모델에 넣는다. 만들어진 3D 세계를 편집·확장하고 이미지·비디오·Gaussian Splats·메시로 활용하는 흐름이다.",
      "source": "World Labs · Marble: A Multimodal World Model (2025-11-12)",
      "url": "https://worldlabs.ai/blog/marble-world-model",
      "credit": "World Labs · Marble: A Multimodal World Model (2025-11-12)",
      "distinction": "2024년 회사 설립 이후 공개한 2025년 제품의 입출력 개요다. 내부 신경망의 층별 구조나 NeRF·Gaussian Splatting 논문의 저자 관계를 뜻하지 않는다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "finn-physical-intelligence-2024",
    "key": "finn-physical-intelligence-2024-original",
    "paper": {
      "title": "시각·언어 표현에서 로봇 행동으로 이어지는 구조",
      "image": "assets/papers/finn-physical-intelligence-2024-original.png",
      "width": 1437,
      "height": 415,
      "alt": "π0 Figure 3의 학습 데이터, 사전학습 VLM, 행동 전문가와 여러 로봇 형태",
      "caption": "사전학습한 시각·언어 모델에 카메라 관측과 지시를 넣고, 로봇 상태와 행동 전문가를 연결한다. Flow matching으로 다음 행동 묶음을 생성해 서로 다른 로봇을 제어하려 했다.",
      "source": "Physical Intelligence · π0: A Vision-Language-Action Flow Model for General Robot Control, Fig.3",
      "url": "https://www.physicalintelligence.company/download/pi0.pdf#page=4",
      "credit": "Physical Intelligence · π0: A Vision-Language-Action Flow Model for General Robot Control, Fig.3",
      "distinction": "Chelsea Finn은 공동 연구진의 한 명이다. 2024년 π0 원논문의 전체 구조이며, 카드의 장난감 행동 계산이나 후속 π0.5의 결과와 구별한다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "huang-gtc-2025",
    "key": "huang-gtc-2025-original",
    "paper": {
      "title": "추론 서비스를 나누어 조정하는 Dynamo의 공식 개요",
      "image": "assets/papers/huang-gtc-2025-original.png",
      "width": 1920,
      "height": 1080,
      "alt": "NVIDIA Dynamo 공식 그림의 API server, GPU planner, smart router, cache manager와 communication library",
      "caption": "API 서버·GPU 계획·요청 라우팅·캐시·통신을 별도 계층으로 보여 준다. 이미 학습한 모델의 응답 작업을 여러 GPU 자원에 배분하는 소프트웨어 기반이다.",
      "source": "NVIDIA · Dynamo announcement, 2025-03-18",
      "url": "https://nvidianews.nvidia.com/news/nvidia-dynamo-open-source-library-accelerates-and-scales-ai-reasoning-models",
      "credit": "NVIDIA · Dynamo announcement, 2025-03-18",
      "distinction": "발표 자료의 소프트웨어 계층 개요다. GPU 내부 아키텍처, 실제 배선, 이 화면에서 측정한 처리량을 보여 주는 그림이 아니다.",
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "yang-kimi-platform-2025",
    "key": "yang-kimi-platform-2025-original",
    "paper": {
      "title": "도구 사용 경험을 만드는 원논문의 학습 데이터 흐름",
      "image": "assets/papers/yang-kimi-platform-2025-original.png",
      "width": 1135,
      "height": 351,
      "alt": "Kimi K2 Figure 8의 도구 명세·에이전트·과제 생성과 다중 에이전트 궤적 합성·검증",
      "caption": "실제·합성 도구 명세에서 에이전트와 과제를 만들고, 여러 역할의 모델로 도구 사용 궤적을 생성한다. 검증과 필터링을 거친 경험을 학습 데이터로 모은다.",
      "source": "Kimi Team · Kimi K2: Open Agentic Intelligence (2025), Fig.8",
      "url": "https://arxiv.org/pdf/2507.20534v1#page=10",
      "credit": "Kimi Team · Kimi K2: Open Agentic Intelligence (2025), Fig.8",
      "distinction": "모델을 위한 도구 사용 데이터 합성 과정이다. Kimi API 요청의 실시간 처리 구조나 실제 서버 배치도를 뜻하지 않는다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "amodei-anthropic-2021",
    "key": "amodei-anthropic-2021-original",
    "paper": {
      "title": "원칙으로 비평·수정하고 선호 학습으로 연결한 원도판",
      "image": "assets/papers/amodei-anthropic-2021-original.png",
      "width": 2145,
      "height": 850,
      "alt": "Constitutional AI Figure 1의 원칙 기반 자기 비평·수정, 선호 모델과 강화학습 두 단계",
      "caption": "원칙을 참고해 답변을 비평하고 고친 자료로 지도학습한다. 이어 AI의 비교 판단으로 선호 모델을 만들고 강화학습에 연결하는 두 단계를 보여 준다.",
      "source": "Bai et al. · Constitutional AI (2022), Fig.1",
      "url": "https://arxiv.org/pdf/2212.08073v1#page=2",
      "credit": "Bai et al. · Constitutional AI (2022), Fig.1",
      "distinction": "2021년 Anthropic 설립과 2022년 논문을 구분한다. Dario Amodei 개인이 이 모든 단계를 혼자 고안했다는 뜻이나 현재 Claude의 내부 구조 전체가 아니다.",
      "label": "원논문 도판"
    }
  },
  {
    "workId": "peebles-sora-development-2024",
    "key": "peebles-sora-development-2024-original",
    "paper": {
      "title": "비디오를 시공간 패치로 바꾸는 공식 원도판",
      "image": "assets/papers/peebles-sora-development-2024-original.png",
      "width": 2031,
      "height": 378,
      "alt": "Sora 2024 공식 보고서의 비디오, 시각 인코더, 잠재 패치와 토큰 변환 흐름",
      "caption": "비디오를 시각 인코더로 압축한 뒤 시공간 패치로 나누어 토큰으로 다룬다. 길이와 해상도가 다른 영상을 공통 단위로 표현하려 했던 출발점이다.",
      "source": "OpenAI · Video generation models as world simulators (2024-02-15)",
      "url": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "credit": "OpenAI · Video generation models as world simulators (2024-02-15)",
      "distinction": "William Peebles가 참여한 공동 개발 연구의 공식 입력 표현도다. 전체 Sora 내부 구조나 2025년 Sora 2 제품 구현을 공개한 그림은 아니다.",
      "label": "공식 자료 도판",
      "background": "#111111"
    }
  },
  {
    "workId": "thiel-capital-infrastructure-2003",
    "key": "thiel-capital-infrastructure-2003-original",
    "note": {
      "title": "설립·자본의 연결은 역할을 기록한 원문으로",
      "body": "공식 소개는 틸의 Palantir 공동창업·의장 역할과 Founders Fund 파트너 경력을 구분한다. 이 관계는 공개된 인물·투자 기록을 따라 읽으며, 없는 조직도를 원도판처럼 덧붙이지 않는다.",
      "source": "Founders Fund · Peter Thiel",
      "url": "https://foundersfund.com/team/peter-thiel/",
      "credit": "공식 인물 소개 · 조회 2026-11-11"
    }
  },
  {
    "workId": "musk-openai-2015",
    "key": "musk-openai-2015-original",
    "note": {
      "title": "2015년의 목적·역할·후원 약정을 원문으로",
      "body": "설립 공지는 연구진·자문진·공동의장·후원자를 구분해 기록한다. 머스크의 당시 역할과 연구기관을 만든 목적은 이 산문에서 읽을 수 있으며, 이후 모델의 구조도로 대신하지 않는다.",
      "source": "OpenAI · Introducing OpenAI",
      "url": "https://openai.com/index/introducing-openai/",
      "credit": "공식 설립 공지 · 2015-12-11"
    }
  },
  {
    "workId": "musk-grok-2023",
    "key": "musk-grok-2023-original",
    "note": {
      "title": "모델과 검색 도구의 경계를 설명한 공식 모델 카드",
      "body": "Grok-1 모델 카드는 다음 토큰 예측을 배운 Transformer와 후속 피드백 학습을 설명한다. 웹 검색은 배포 때 연결하는 도구로 구분한다. 확인한 공개 자료에 전체 구조도가 없어 이 정의를 원문으로 연결한다.",
      "source": "xAI · Grok-1 Model Card",
      "url": "https://x.ai/news/grok/model-card",
      "credit": "공식 모델 카드 · 2023-11-03"
    }
  },
  {
    "workId": "sutskever-ssi-2024",
    "key": "sutskever-ssi-2024-original",
    "note": {
      "title": "안전과 능력을 함께 다루겠다는 연구 목표",
      "body": "SSI 공식 소개는 안전과 능력을 함께 연구한다는 목표와 하나의 연구 과제에 집중하는 방식을 밝힌다. 공개되지 않은 모델 구조나 학습법을 과거 논문의 그림으로 추정하지 않는다.",
      "source": "Safe Superintelligence Inc. · 공식 소개",
      "url": "https://ssi.inc/",
      "credit": "공식 소개 본문 · 조회 2026-11-11"
    }
  },
  {
    "workId": "wang-meta-2025",
    "key": "wang-meta-2025-original",
    "note": {
      "title": "2025년 조직 전환은 당시 발표의 범위로",
      "body": "공식 발표는 Meta의 Scale 소수지분 투자, Wang의 합류, MSL의 연구·제품·인프라 역할을 설명한다. 공개된 정확도 그래프는 조직도나 데이터 이전의 증거가 아니므로, 이 관계는 원문과 날짜를 함께 읽는다.",
      "source": "Scale · Meta 투자와 Wang 합류 공지",
      "url": "https://scale.com/blog/scale-ai-announces-next-phase-of-company-evolution",
      "credit": "공식 공지 · 2025-06-12; Meta 실적발표 · 2025-07-30"
    }
  },
  {
    "workId": "musk-xai-spacex-2026",
    "key": "musk-xai-spacex-2026-original",
    "note": {
      "title": "인수 사실과 궤도 컴퓨팅 계획을 구분해 읽기",
      "body": "공식 공지는 2026년 2월 인수를 알린다. 이후 투자설명서는 통합이 진행 중이며 궤도 계산 기반은 개발 계획이라고 설명한다. 이 범위를 넘어 가동 중인 통합 아키텍처를 그리지 않는다.",
      "source": "SpaceX · 2026년 공식 투자설명서 §1.3.3",
      "url": "https://content.spacex.com/cms-assets/FINAL_Documents%20and%20Updates/SpaceX%20-%20EU%20Prospectus%20%28Approved%20by%20Bafin%29%20-%20June%205%2C%202026.pdf#page=23",
      "credit": "공식 투자설명서 · 2026-06-05, 인쇄 p.10 / PDF 23쪽"
    }
  }
]);
