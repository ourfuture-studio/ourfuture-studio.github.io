/* Public original-source access; local excerpts remain in the authoring source. */
window.AtlasPaperArchitecture.register([
  {
    "workId": "vit-2020",
    "key": "vit-2020-official-figure1",
    "paper": {
      "title": "ViT · 원논문 Figure 1과 같은 공식 아키텍처 그림",
      "image": "assets/papers/vit-2020-official-figure1.png",
      "width": 930,
      "height": 485,
      "alt": "Vision Transformer 공식 Figure 1. 왼쪽 이미지를 패치로 나누고 같은 선형 투영을 적용한 뒤 패치와 위치 임베딩, 별도 class embedding을 Transformer encoder에 넣는다. class 위치의 출력이 분류 head로 이어진다. 오른쪽 encoder는 입력에서 Norm, multi-head Attention, 잔차 더하기, Norm, MLP, 잔차 더하기를 L번 반복한다.",
      "caption": "왼쪽 아래의 이미지 조각이 펼쳐진 벡터를 거쳐 입력열이 된다. 별표가 붙은 0번은 이미지에서 잘라 낸 패치가 아니라 별도의 class embedding이다. 오른쪽은 회색 encoder 상자를 펼친 구조이며, 두 개의 +는 잔차 경로를 나타낸다.",
      "source": "Dosovitskiy 외 12명 · Google Research, Brain Team · Vision Transformer",
      "url": "https://github.com/google-research/vision_transformer/blob/main/vit_figure.png",
      "credit": "공식 저장소 vit_figure.png를 그대로 보존했다. v1 PDF 3쪽 Figure 1의 구조·라벨과 대조했으며 구성과 색을 바꾸지 않았다. 공식 저장소 Apache-2.0 LICENSE 원문을 assets/papers/vit-2020-official-LICENSE.txt에도 함께 보존했다. 논문 arXiv v1 자체는 CC BY로 표시하지 않는다.",
      "distinction": "이 그림은 연구팀이 공개한 원래 모델 개요다. 아래의 한국어 설명·16×16 RGB 그림·작은 행렬·Attention 계산은 직접 구성했으며, 실제 학습된 ViT의 출력이나 특징을 표시한 것이 아니다.",
      "label": "원논문 Figure 1 · 연구팀 공식 이미지"
    }
  }
]);
