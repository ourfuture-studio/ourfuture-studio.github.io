/* Figure 1 from the dated ICLR 2015 author preprint; original labels retained. */
window.AtlasPaperArchitecture.register([{workId:'goodfellow-adversarial-2015',key:'original-goodfellow-adversarial-2015',paper:{
 title:'ICLR 2015 원문 · 같은 사진처럼 보여도 달라진 GoogLeNet의 판단',image:'assets/papers/goodfellow-adversarial-2015-original.png',width:1380,height:528,
 alt:'Goodfellow·Shlens·Szegedy의 2015년 논문 Figure 1 원도판. 왼쪽은 panda 57.7%로 분류한 입력, 가운데는 손실의 입력 기울기 부호와 .007 배율, 오른쪽은 변화 뒤 gibbon 99.3%로 분류한 입력이다. 가운데 도판 자체의 nematode 8.2% 표시도 원문 그대로 보존했다.',
 caption:'왼쪽 입력에, 가운데의 입력 기울기 부호에 .007을 곱한 변화를 더한다. 사람에게 비슷해 보이는 결과에서도 모델의 분류는 panda에서 gibbon으로 바뀐다. 원문이 제시한 GoogLeNet·ImageNet의 한 사례이며, 가운데 방향 도판의 분류 이름을 공격 목표로 정한 것은 아니다.',
 source:'Ian Goodfellow·Jonathon Shlens·Christian Szegedy · ICLR 2015 · arXiv v3',url:'https://arxiv.org/pdf/1412.6572v3#page=3',
 credit:'Figure 1 · arXiv v3 PDF 3쪽의 그림과 수식·모델 출력 라벨을 발췌했다. 원래 사진·색·연산 기호·숫자를 유지하고 영문 캡션은 그림 밖에서 설명한다. 2014년 첫 공개와 2015년 학회·v3 시점을 구분한다.',
 distinction:'이 원도판은 아키텍처 배치도가 아니라 적대적 입력의 원문 사례다. ε=.007은 해당 모델의 입력 변환 뒤 조건이다. 이 화면이 이미지를 분류하거나 공격을 실행해 얻은 결과가 아니며, 모든 모델의 실패율이나 사람의 지각에 대한 일반 수치가 아니다.',label:'2015 원문 사례 · Figure 1 · GoogLeNet / ImageNet'
}}]);
