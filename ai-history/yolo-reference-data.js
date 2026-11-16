/* Limited original-paper excerpts, read with surrounding commentary and source links. */
window.AtlasYoloReferenceData=[
  {
    "id": "joint-output",
    "title": "원논문 Figure 2 · 한 장면에서 위치와 종류를 함께 내다",
    "image": "assets/papers/yolo-v1-joint-output-original.png",
    "width": 960,
    "height": 608,
    "alt": "초기 YOLO 원논문 Figure 2. 개와 자전거가 있는 입력의 격자에서 여러 박스와 신뢰도, 종류 확률 지도를 거쳐 최종 탐지로 이어지는 원래 도식.",
    "caption": "왼쪽의 장면 전체가 입력이다. 가운데 위의 박스·신뢰도와 아래의 종류 지도는 같은 신경망 출력의 서로 다른 부분을 나타내며, 오른쪽에서 종류와 위치를 가진 탐지로 함께 읽힌다. 격자는 이미지를 여러 장으로 따로 잘라 독립적으로 인식한다는 뜻이 아니다.",
    "source": "Redmon·Divvala·Girshick·Farhadi · You Only Look Once · CVPR 2016",
    "url": "https://openaccess.thecvf.com/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf#page=2",
    "credit": "Figure 2 · PDF p.2 / 인쇄 780쪽. 원도식의 사진·격자·선·화살표·라벨을 그대로 발췌했다. 원래 영어 캡션은 이미지에 중복 수록하지 않고 위의 한국어 해설과 원문 링크로 연결한다.",
    "reading": [
      "무엇이 어디에 있는지를 한 출력으로 정의한 발상을 먼저 읽는다. 두 갈래 화살표는 서로 다른 탐지기를 각각 실행한다는 뜻이 아니다.",
      "가운데의 많은 박스는 후보이고, 오른쪽은 처리 뒤의 최종 탐지다. 이 원도식의 실제 사진과 결과는 아래에서 직접 정한 수치 사례와 구분한다."
    ]
  },
  {
    "id": "detection-examples",
    "title": "원논문 Figure 6 · 실제 탐지와 눈에 보이는 오인식",
    "image": "assets/papers/yolo-v1-detection-examples-original.png",
    "width": 1517,
    "height": 453,
    "alt": "초기 YOLO Figure 6에서 고른 두 패널. 왼쪽은 해변의 배와 사람에 boat와 person 박스를 표시하고, 오른쪽은 두 자동차를 car로 표시하면서 공중에 뜬 사람을 aeroplane으로 오인한 결과다.",
    "caption": "왼쪽은 배와 사람의 종류·위치를 함께 표시한 사례다. 오른쪽은 자동차 두 대를 찾았지만 공중에 뜬 사람을 비행기(aeroplane)로 잘못 분류했다. 박스가 그려졌다는 사실과 장면을 올바르게 이해했다는 판단은 구분해야 한다.",
    "source": "Redmon·Divvala·Girshick·Farhadi · You Only Look Once · CVPR 2016",
    "url": "https://openaccess.thecvf.com/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf#page=8",
    "credit": "Figure 6 · PDF p.8 / 인쇄 786쪽. 아래 줄 셋째 패널(배·사람)을 왼쪽에, 둘째 패널(자동차·사람 오인)을 오른쪽에 놓았다. 원래 사진과 class 라벨·박스는 변경하지 않고 두 패널만 발췌해 흰 여백으로 구분했다. 원도판에 숫자 confidence는 인쇄되어 있지 않으며 새 값을 덧붙이지 않았다.",
    "reading": [
      "이는 저자들이 원논문에서 제시한 초기 YOLO의 정성적 결과이며 이 사이트가 모델을 새로 실행한 화면이 아니다.",
      "사람을 비행기로 오인한 사례는 원문의 Figure 6 설명에도 언급된다. 이 두 장면만으로 전체 데이터셋의 정확도나 일반화 성능을 판단하지 않는다."
    ]
  }
];
