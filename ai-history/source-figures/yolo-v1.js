/* Original CVPR2016 architecture, kept separate from the interactive redraw. */
window.AtlasPaperArchitecture.register([{workId:'yolo-v1',key:'original-yolo-v1-architecture',paper:{
  title:'YOLO 원논문 · 종류와 위치를 함께 내는24개 합성곱층과 두 완전연결층',
  image:'assets/papers/yolo-v1-architecture-original.png',width:1500,height:642,
  alt:'CVPR2016 YOLO 논문 Figure3의 원래 아키텍처와 전체 캡션.448×448 색 입력에서24개 합성곱층과 두 완전연결층을 거쳐7×7×30 출력으로 이어진다.',
  caption:'입력 이미지를 합성곱층으로 표현하고 두 완전연결층에서 상자 좌표·신뢰도와 종류에 관한 출력을 함께 낸다.1×1 축소와3×3 합성곱을 번갈아 쓰며, 원문 괄호의 반복도24개 층에 포함된다. 마지막30은30종류가 아니라2×5개의 상자 값과20종류 값을 합한 깊이다.',
  source:'Joseph Redmon·Santosh Divvala·Ross Girshick·Ali Farhadi · You Only Look Once · CVPR2016',
  url:'https://openaccess.thecvf.com/content_cvpr_2016/papers/Redmon_You_Only_Look_CVPR_2016_paper.pdf#page=3',
  credit:'Figure3 · 공식 PDF p.3 / 인쇄781쪽. 원도식과 전체 설명 캡션을 한 영역으로 렌더해 발췌했다. 원래 선·라벨·수치·색을 바꾸지 않았다.',
  distinction:'이 자료는 초기 YOLO의 원논문 아키텍처다. 아래의 직접 그린 격자와 고정 예측표는 구조의 의미를 읽는 별도 계산이며 실제 합성곱·가중치·학습·사진 탐지를 실행한 결과가 아니다.224×224는 분류 사전학습,448×448는 탐지 입력을 가리킨다.',
  label:'원논문 아키텍처 · Figure3'
}}]);
