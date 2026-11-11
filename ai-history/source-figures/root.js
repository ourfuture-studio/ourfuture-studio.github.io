/* Original-source figures; edit each workId entry independently. */
window.AtlasPaperArchitecture.register([
  {
    "workId": "chatgpt",
    "key": "chatgpt-original",
    "paper": {
      "title": "ChatGPT · 공식 자료의 세 학습 단계",
      "alt": "OpenAI 공식 ChatGPT 소개 글의 도식. 사람의 시범으로 지도 미세조정, 여러 답변의 순위로 보상모형 학습, PPO로 보상을 이용한 정책 조정을 세 단계로 표시한다.",
      "caption": "사람이 답변 시범을 작성하고, 여러 답변을 비교해 선호를 알려주며, 그 피드백으로 응답 방식을 조정하는 흐름입니다. 공식 그림의 세 단계를 아래의 대화 시범·선호 비교 설명과 연결해 보세요.",
      "source": "OpenAI · Introducing ChatGPT (2022-11-30)",
      "url": "https://openai.com/index/chatgpt/",
      "credit": "공식 소개 글 Methods의 원본 도식. 페이지에 포함된 이미지의 원래 구성과 라벨을 유지했습니다. 논문 Figure 번호가 있는 도판은 아닙니다.",
      "distinction": "이 그림은 공식 자료가 설명한 학습 흐름입니다. 아래의 한국어 대화·응답 비교는 직접 만든 사례이며, 원래 훈련 표본이나 실제 SFT·RM·PPO 실행 결과가 아닙니다.",
      "image": "assets/papers/chatgpt-original.png",
      "width": 1940,
      "height": 1153,
      "label": "공식 자료 도판"
    }
  },
  {
    "workId": "sora",
    "key": "sora-original",
    "paper": {
      "title": "Sora · 영상을 시공간 패치로 바꾸는 공식 도식",
      "alt": "OpenAI 2024년 Sora 기술 보고서 Figure Patches. 입력 영상이 압축망을 지나 잠재 표현이 되고, 시공간 패치로 분해되어 토큰이 되는 원본 흐름도.",
      "caption": "해상도와 길이가 다른 영상을 같은 크기로 잘라 맞추는 대신, 먼저 압축된 잠재 표현으로 바꾼 뒤 시공간 패치를 토큰으로 다루려는 발상입니다. 원본의 영상→압축 표현→패치 흐름을 아래의 작은 배열 예시와 연결합니다.",
      "source": "OpenAI · Video generation models as world simulators (2024-02-15)",
      "url": "https://openai.com/index/video-generation-models-as-world-simulators/",
      "credit": "공식 기술 보고서 Turning visual data into patches의 Figure Patches 이미지. 원본의 구성과 라벨을 유지했습니다. 번호가 붙은 논문 Figure는 아닙니다. 투명한 원본 이미지는 선과 화살표가 보이도록 어두운 바탕에 표시합니다.",
      "distinction": "공식 보고서는 전체 모델과 구현의 세부 사항을 공개하지 않았습니다. 아래 패치 크기·배열 순서·패딩 계산은 직접 구성한 설명이며, Sora의 실제 인코더·디코더나 생성 과정을 실행하지 않습니다.",
      "image": "assets/papers/sora-original.png",
      "width": 2031,
      "height": 378,
      "label": "공식 자료 도판",
      "background": "#111111"
    }
  }
]);
