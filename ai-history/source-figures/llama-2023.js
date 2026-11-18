/* Public original-source access; local excerpts remain in the authoring source. */
window.AtlasPaperArchitecture.register([
  {
    "workId": "llama-2023",
    "key": "llama-2023-original-table2",
    "paper": {
      "title": "LLaMA 2023 · 원논문의 모델 구성표",
      "image": "assets/papers/llama-2023-table2-original.png",
      "width": 1504,
      "height": 432,
      "alt": "LLaMA v1 Table 2 원표. 파라미터 6.7B·13.0B·32.5B·65.2B의 모델은 표현 차원 4096·5120·6656·8192, head 수 32·40·52·64, 층 수 32·40·60·80이다. 앞의 두 모델은 1조 토큰, 뒤의 두 모델은 1.4조 토큰으로 학습했다.",
      "caption": "원표의 params는 연결값의 수, dimension은 위치별 표현의 차원, n heads는 Attention의 head 수, n layers는 반복 블록 수, n tokens는 학습에 사용한 토큰 수다. 모델 이름 7B·33B와 원표의 6.7B·32.5B를 구분한다.",
      "source": "Hugo Touvron 외 · LLaMA: Open and Efficient Foundation Language Models · 2023 v1",
      "url": "https://arxiv.org/pdf/2302.13971v1#page=3",
      "credit": "Table 2 · arXiv v1 PDF 3쪽. 원표 영역을 4배 해상도로 렌더해 발췌했다. 원래 숫자·라벨·배치를 유지했다. arXiv가 표시한 논문 라이선스: CC BY 4.0. 최초 모델 가중치의 비상업 연구 라이선스와는 별개다.",
      "distinction": "v1 논문에는 전체 아키텍처 도판이 없다. 아래 블록 그림은 §2.2와 최초 공식 llama_v1 코드의 연결 순서를 참고해 직접 그린 재구성이다. 학습량 보기의 Figure 1은 원문 곡선이다.",
      "label": "2023 원표 · Table 2",
      "prompt": "각 모델의 구성은 이 원표와 대조할 수 있습니다."
    }
  }
]);
