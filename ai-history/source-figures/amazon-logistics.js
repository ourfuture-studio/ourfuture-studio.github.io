/* Public original-source access; local excerpts remain in the authoring source. */
window.AtlasPaperArchitecture.register([
  {
    "workId": "kiva-warehouse-coordination-2008",
    "key": "kiva-2007-earlier-control-stack",
    "note": {
      "title": "앞선 2007 학회판 Figure 4 · 다중 에이전트 제어 구조 · 원문에서 보기",
      "body": "작업·자원 배정, 스테이션의 작업 흐름, 로봇의 임무·경로·움직임을 역할로 나눈다. 같은 주제의 2008 AI Magazine 글 Figure 4와 함께 읽는 앞선 학회판 원도판이다. 원도판은 아래 원문 링크에서 확인할 수 있습니다. 이 카드의 자체 시각화와 원자료를 구분해 읽으세요.",
      "source": "Wurman·D’Andrea·Mountz · AAAI/IAAI 2007 학회판",
      "url": "https://cdn.aaai.org/AAAI/2007/AAAI07-282.pdf#page=6",
      "credit": "2007 학회판 PDF6쪽 Figure4를 발췌했다. 아래 카드는 2008 저널 기록이며 이 그림의 판본을 2008로 바꾸어 표기하지 않는다. 2008 원문은 Figure4·Multiagent System·Path Planning 절을 보존 전문으로 대조했다."
    }
  },
  {
    "workId": "amazon-deepfleet-2025",
    "key": "deepfleet-2025-source-map",
    "note": {
      "title": "네 원아키텍처는 아래 RC·RF·IF·GF 선택에서 확인",
      "body": "2025 v1 Figure7–10의 원도판을 아래의 모델 선택과 함께 볼 수 있습니다. 원도판 뒤에는 같은 창고를 각 표현으로 읽도록 직접 그린 격자·관계 그림이 나옵니다.",
      "source": "Amazon Robotics · DeepFleet 2025 v1, Figures 7–10",
      "url": "https://arxiv.org/pdf/2508.08574v1#page=12",
      "credit": "PDF12·13·15·17쪽. v1은25쪽이며 이후 v2/v3의 쪽 번호·내용과 섞지 않습니다."
    }
  },
  {
    "workId": "amazon-deepfleet-2025-rc-source",
    "key": "deepfleet-2025-original-rc",
    "note": {
      "title": "DeepFleet v1 · Figure 7 · RC 원아키텍처 · 원문에서 보기",
      "body": "주변의 로봇·정점·물체 특징에서 Transformer Encoder로 상태 표현을 만들고, 상태·행동 이력의 Decoder Transformer가 다음 행동을 예측한다. 원도판은 아래 원문 링크에서 확인할 수 있습니다. 이 카드의 자체 시각화와 원자료를 구분해 읽으세요.",
      "source": "Amazon Robotics · DeepFleet 2025 v1",
      "url": "https://arxiv.org/pdf/2508.08574v1#page=12",
      "credit": "원문 PDF12쪽 Figure7의 삽입 이미지를 그대로 추출했다. 글자·색·연결·모형의 배치를 새로 그리지 않았다."
    }
  },
  {
    "workId": "amazon-deepfleet-2025-rf-source",
    "key": "deepfleet-2025-original-rf",
    "note": {
      "title": "DeepFleet v1 · Figure 8 · RF 원아키텍처 · 원문에서 보기",
      "body": "로봇 이력의 masked self-attention과 바닥·다른 로봇의 문맥에 대한 cross-attention을 결합하는 decoder-only 구조다. 원도판은 아래 원문 링크에서 확인할 수 있습니다. 이 카드의 자체 시각화와 원자료를 구분해 읽으세요.",
      "source": "Amazon Robotics · DeepFleet 2025 v1",
      "url": "https://arxiv.org/pdf/2508.08574v1#page=13",
      "credit": "원문 PDF13쪽 Figure8의 삽입 이미지를 그대로 추출했다. 글자·색·연결·모형의 배치를 새로 그리지 않았다."
    }
  },
  {
    "workId": "amazon-deepfleet-2025-if-source",
    "key": "deepfleet-2025-original-if",
    "note": {
      "title": "DeepFleet v1 · Figure 9 · IF 원아키텍처 · 원문에서 보기",
      "body": "바닥 상태를 여러 채널의 격자로 만들고, 합성곱 인코더·시간 Transformer·공간 디코더로 다음 상태를 예측한다. 원도판은 아래 원문 링크에서 확인할 수 있습니다. 이 카드의 자체 시각화와 원자료를 구분해 읽으세요.",
      "source": "Amazon Robotics · DeepFleet 2025 v1",
      "url": "https://arxiv.org/pdf/2508.08574v1#page=15",
      "credit": "원문 PDF15쪽 Figure9의 삽입 이미지를 그대로 추출했다. 글자·색·연결·모형의 배치를 새로 그리지 않았다."
    }
  },
  {
    "workId": "amazon-deepfleet-2025-gf-source",
    "key": "deepfleet-2025-original-gf",
    "note": {
      "title": "DeepFleet v1 · Figure 10 · GF 원아키텍처 · 원문에서 보기",
      "body": "노드·엣지 표현, 메시지 전달과 edge-aware attention, 여러 예측 head를 결합한 시공간 그래프 구조다. 원도판은 아래 원문 링크에서 확인할 수 있습니다. 이 카드의 자체 시각화와 원자료를 구분해 읽으세요.",
      "source": "Amazon Robotics · DeepFleet 2025 v1",
      "url": "https://arxiv.org/pdf/2508.08574v1#page=17",
      "credit": "원문 PDF17쪽 Figure10의 삽입 이미지를 그대로 추출했다. 글자·색·연결·모형의 배치를 새로 그리지 않았다."
    }
  }
]);
