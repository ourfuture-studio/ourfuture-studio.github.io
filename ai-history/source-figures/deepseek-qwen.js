/* Original paper excerpts, with the earlier GRPO source identified separately. */
window.AtlasPaperArchitecture.register([
  {workId:'deepseek-v3',key:'original-deepseek-v3',paper:{
    title:'2024 DeepSeek-V3 원문 · MLA와 희소 전문가를 연결한 구조',
    image:'assets/papers/deepseek-v3-original.png',width:1374,height:1116,
    alt:'2024년 DeepSeek-V3 보고서 Figure 2의 원도판. 왼쪽 Transformer 블록의 Attention은 오른쪽 아래 MLA로, Feed-Forward Network는 오른쪽 위 DeepSeekMoE로 확대된다. MLA에는 압축한 잠재 표현과 추론 중 저장하는 항목이, MoE에는 공유 전문가와 라우터가 고르는 전문가가 표시되어 있다.',
    caption:'왼쪽은 반복되는 Transformer 블록이고 오른쪽은 그 두 부분을 펼친 그림이다. MLA는 문맥을 참고하는 Attention에서 압축한 잠재 표현을 활용해 KV 캐시를 줄인다. DeepSeekMoE는 모든 토큰이 거치는 공유 전문가와 라우터가 토큰마다 선택하는 전문가의 출력을 합친다. 문맥을 유지하는 캐시 메모리와 토큰마다 활성화할 전문가 계산을 줄이려 한 설계를 함께 볼 수 있다.',
    source:'DeepSeek-AI · DeepSeek-V3 Technical Report · 2024, arXiv v1',
    url:'https://arxiv.org/pdf/2412.19437v1#page=7',
    credit:'Figure 2 · 2024년 v1 공식 PDF 7쪽. 도식 부분을 원문에서 렌더해 발췌했다. 선·기호·라벨·색을 바꾸지 않았고 긴 영문 캡션은 그림 밖에 두었다.',
    distinction:'이 그림은 원문의 모델 구조다. 아래 해설은 그 구조를 읽기 위한 설명이며 실제 모델의 학습·추론 실행 결과가 아니다. 전문가 일부를 선택하는 계산과 Attention의 KV 캐시 압축은 서로 다른 설계 요소다.',
    label:'2024 원문 아키텍처 · Figure 2'
  }},
  {workId:'deepseek-r1',key:'original-deepseek-r1-grpo-predecessor',paper:{
    title:'2024 DeepSeekMath 원문 · R1이 채택한 GRPO의 앞선 설계',
    image:'assets/papers/deepseek-r1-original.png',width:1824,height:764,
    alt:'2024년 DeepSeekMath Figure 4의 PPO와 GRPO 비교 원도판. 위 PPO에는 가치 모델과 GAE가 있고, 아래 GRPO에는 같은 질문에서 생성한 여러 출력과 각 점수, 그룹 계산이 있다. 오른쪽 범례는 학습하는 모델과 고정한 모델을 구분한다. 2025년 R1 보고서 자체의 그림은 아니다.',
    caption:'이 도식은 2024년 DeepSeekMath가 제안한 PPO·GRPO 비교다. GRPO는 같은 질문에서 얻은 여러 답변의 점수를 함께 사용해 각 답변의 상대적 이점을 계산하고 별도 가치 모델을 두지 않는다. 2025년 R1은 이 방법을 채택했다. 다만 이 선행 도식의 Reward Model 상자를 R1-Zero의 학습 구성으로 그대로 읽으면 안 된다. R1-Zero는 검증 가능한 정확도와 형식에 관한 규칙 기반 보상을 사용한다.',
    source:'Zhihong Shao·Peiyi Wang·Qihao Zhu 외 · DeepSeekMath · 2024, arXiv v1',
    url:'https://arxiv.org/pdf/2402.03300v1#page=13',
    credit:'2024년 DeepSeekMath Figure 4 · v1 공식 PDF 13쪽. 2025년 DeepSeek-R1 v1 PDF 5쪽 §2.2.1에서 채택한 선행 방법의 원도판이다. R1 v1에 실린 그림이 아니다. 원래 라벨·색·기호를 유지해 도식만 발췌했다.',
    distinction:'2024년 방법의 원도판과 2025년 R1의 적용 조건을 구분한다. R1 원문의 수식은 v1 PDF 5쪽 §2.2.1, R1-Zero의 보상 설명은 6쪽 §2.2.2에서 확인할 수 있다. 이 화면은 GRPO 업데이트나 R1 추론을 실제로 실행하지 않는다.',
    label:'2024 선행 원문 · DeepSeekMath Figure 4'
  }},
  {workId:'qwen3',key:'original-qwen3',paper:{
    title:'2025 Qwen3 원문 · 사고·비사고 모드를 잇는 사후학습 경로',
    image:'assets/papers/qwen3-original.png',width:1828,height:744,
    alt:'2025년 Qwen3 보고서 Figure 1의 사후학습 원도판. 위쪽 대형 모델 경로는 Long-CoT Cold Start, Reasoning RL, Thinking Mode Fusion, General RL의 네 단계를 거친다. 아래 경량 모델 경로는 대형 모델에서 이어지는 Strong-to-Weak Distillation을 사용한다.',
    caption:'위쪽 네 단계는 긴 추론 예시로 출발해 추론 강화학습을 진행하고, 사고·비사고 응답을 함께 다루는 학습과 범용 강화학습으로 잇는다. 아래쪽은 큰 모델의 능력을 작은 모델로 옮기는 별도 증류 경로다. 이 그림은 모델 내부의 층 배치가 아니라, 보고서가 제시한 모델군별 사후학습의 경로를 보여준다.',
    source:'Qwen Team · Qwen3 Technical Report · 2025, arXiv v1',
    url:'https://arxiv.org/pdf/2505.09388v1#page=9',
    credit:'Figure 1 · 2025년 v1 공식 PDF 9쪽. 사후학습 파이프라인의 원도판을 발췌했다. 원래 라벨·색·연결을 유지하고 영문 캡션은 그림 밖에 두었다.',
    distinction:'이 자료는 Qwen3의 사후학습 경로다. 모든 크기의 모델이 같은 네 단계를 직접 거쳤다는 뜻은 아니며, 모델군의 층 구조나 실제 학습 실행 화면도 아니다. 해설은 2025년 v1의 범위로 한정한다.',
    label:'2025 원문 학습 파이프라인 · Figure 1'
  }}
]);
