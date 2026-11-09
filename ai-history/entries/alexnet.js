/* A separately maintained article: original 2012 architecture and author figures.
 * The interactive structural viewer lives in visuals/alexnet-vision.js. */
(function(){
  'use strict';
  const paper='https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf';
  const source=(page,label)=>({title:'Krizhevsky·Sutskever·Hinton (2012) · PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const figureCredit={title:'Krizhevsky·Sutskever·Hinton (2012) · Alex Krizhevsky 제공',url:'https://cave.cs.toronto.edu/kriz/',note:'저자 페이지에서 재사용을 허용한 그림 파일을 변경 없이 사용했습니다. 강조 테두리와 확대는 이 화면의 조작입니다.'};
  window.AtlasEntries.register({
    id:'alexnet',
    record:{
      title:'사물을 알아보는 특징을, 여러 층에서 배우다',
      summary:'작은 시각적 단서를 여러 층에서 결합하고, 사물 라벨의 오차로 필터와 분류 연결을 함께 학습했다. 큰 이미지 자료와 GPU 계산, ReLU, 증강·dropout으로 자연사진 인식의 학습 규모를 넓혔다.',
      detail:'',question:'',
      sources:[{title:'Krizhevsky·Sutskever·Hinton (2012) · NIPS 원문',url:paper}],
      caveat:'2012년 공식 논문 PDF를 기준으로 한다. 층별 창은 연결 구조의 공간 범위를 비교하며 실제 활성값·시선·학습된 유효 수용장이 아니다. 첫 층 필터와 특징공간 이웃은 저자 제공 원그림이다. 화면에서 새 모형을 학습하거나 사진을 분류하지 않는다.'
    },
    content:{
      article:{
        question:'사물을 구별하는 데 필요한 특징까지,\n경험에서 배울 수 있을까?',
        opening:[
          '날개를 접은 새와 날고 있는 새는 모습이 다르다. 같은 사물도 자세·크기·조명·배경에 따라 화소 값이 크게 달라진다. 이런 변화 속에서 무엇을 같은 사물의 단서로 볼지, 그 기준을 어떻게 얻을지가 자연사진 인식의 문제였다.',
          'LeNet은 작은 영역의 특징과 그 조합을 정답에서 학습했다. AlexNet은 국소 연결과 공유 필터라는 이 구조를 더 깊고 넓게 구성해, ImageNet의 많은 사물 범주를 구별하는 데 사용했다. 입력 가까이에서 특징을 찾는 기준부터 마지막에 범주를 고르는 연결까지, 같은 분류 목표를 향해 배우게 한 것이다.',
          '다섯 합성곱층은 앞선 특징의 반응을 다시 결합하고, 세 완전연결층은 모인 표현을 사물 범주의 판단으로 이어 준다. 연구팀은 두 GPU에 계산을 나누고 ReLU로 큰 망을 학습하는 부담을 줄이려 했다. 증강과 dropout은 많은 연결이 본 사진에만 맞춰지는 문제를 다루었다. 구조·경험·학습 방법을 함께 설계한 접근이다.'
        ],
        visual:{
          id:'learned-vision',navLabel:'특징을 배우는 시각',
          title:'작은 시각 단서가, 사물을 판단할 표현이 되기까지',
          caption:'층을 선택해 앞선 반응을 얼마나 넓게 결합할 수 있는지 살펴보세요. 이어서 실제 학습 필터와 마지막 은닉 표현의 이웃 검색을 보고, 이런 망을 크게 학습하기 위한 선택을 연결합니다.',
          stages:[
            {id:'combine',label:'단서를 결합하다',text:'작은 영역의 반응을 다음 층이 다시 조합한다. 깊이를 따라 참조할 수 있는 입력 범위가 넓어지고, 마지막에는 모인 특징 전체를 범주 판단에 사용한다.'},
            {id:'learned',label:'무엇을 배웠나',text:'구조만 그려 놓은 그림에서 한 걸음 더 나아가, 원논문이 공개한 실제 학습 결과를 본다. 입력 필터의 가중치와 마지막 은닉 표현의 유사성은 서로 다른 증거다.'},
            {id:'train',label:'크게 학습하려면',text:'표현력이 큰 망은 계산·최적화·과적합 문제도 함께 만든다. 각 선택이 어느 문제를 다루며 망의 어디와 연결되는지 비교해 보자.'}
          ],
          spatialLayers:[
            {id:'conv1',kernel:11,stride:4},{id:'pool1',kernel:3,stride:2},
            {id:'conv2',kernel:5,stride:1},{id:'pool2',kernel:3,stride:2},
            {id:'conv3',kernel:3,stride:1},{id:'conv4',kernel:3,stride:1},
            {id:'conv5',kernel:3,stride:1},{id:'pool5',kernel:3,stride:2}
          ],
          layers:[
            {id:'input',label:'입력',kind:'input',size:'224 × 224 × 3',title:'사진의 RGB 값에서 출발하다',idea:'사람이 정한 입력·구조와, 학습으로 얻는 연결값',text:'색 사진의 화소를 입력으로 받는다. 국소 연결과 가중치 공유는 연구자가 넣은 구조다. 그 구조 안에서 어떤 무늬에 반응하고 어떤 조합을 쓸지는 사물 라벨을 맞히는 학습으로 조정한다.',source:source(2,'§1–2, 입력 준비')},
            {id:'conv1',label:'C1',kind:'conv',size:'96개 필터 · 11 × 11 · 간격 4',title:'작은 영역을 보는 기준을 배우다',idea:'같은 필터를 여러 위치에 적용',text:'첫 층의 한 필터는 RGB 세 채널의 11×11 영역을 함께 본다. 같은 가중치를 위치마다 공유하고, 서로 다른 기준을 학습하는 96개 필터를 둔다. 실제로 배운 기준은 다음 화면의 원문 Fig.3에서 살펴볼 수 있다.',source:source(4,'§3.5, Fig.2는 p.5')},
            {id:'pool1',label:'P1',kind:'pool',size:'최대 풀링 · 3 × 3 · 간격 2',title:'근처에서 강한 특징 반응을 모으다',idea:'특징의 정확한 위치를 덜 세밀하게',text:'C1 뒤의 반응 정규화를 거친 각 지도에서 주변 3×3 반응의 최댓값을 모은다. 인접 창은 겹친다. 반응을 모으는 이 단계는 새로운 필터를 학습하는 합성곱층과 구분한다.',source:source(4,'§3.3–3.5')},
            {id:'conv2',label:'C2',kind:'conv',size:'256개 필터 · 5 × 5',title:'앞서 찾은 특징의 배치를 결합하다',idea:'화소 대신, 앞층의 여러 반응을 입력으로',text:'첫 단계에서 찾은 특징들을 5×5 위치 범위에 걸쳐 함께 본다. 두 GPU 중 같은 쪽에 있는 이전 지도들에 연결해 256개 필터를 구성했다. 입력 사진까지 거슬러 올라가면 첫 층보다 넓은 범위의 단서를 조합할 수 있다.',source:source(5,'§3.5, Fig.2')},
            {id:'pool2',label:'P2',kind:'pool',size:'최대 풀링 · 3 × 3 · 간격 2',title:'결합한 특징의 주변 반응도 모으다',idea:'공간의 해상도와 결합 범위를 함께 바꾸다',text:'C2 뒤의 반응 정규화와 최대 풀링을 거쳐 공간 위치 수를 줄인다. 다음 층은 더 넓어진 입력 간격을 가진 반응들을 다시 결합한다. 모양이 달라져도 항상 같은 답을 보장하는 연산은 아니다.',source:source(4,'§3.3–3.5')},
            {id:'conv3',label:'C3',kind:'conv',size:'384개 필터 · 3 × 3',title:'두 GPU 쪽의 특징을 함께 결합하다',idea:'서로 나누어 계산한 특징의 교환',text:'이 층은 C2의 양쪽 GPU에 있는 지도 전체와 연결된다. 더 넓은 시각적 맥락을 조합할 수 있는 구조지만, 특정 필터를 눈·귀 같은 부품이라고 미리 정하지 않는다.',source:source(5,'§3.5, Fig.2')},
            {id:'conv4',label:'C4',kind:'conv',size:'384개 필터 · 3 × 3',title:'같은 공간 위에서 특징을 다시 조합하다',idea:'공간 크기가 같아도 표현의 계산은 깊어진다',text:'C3의 반응을 다시 3×3으로 결합한다. 중간에 풀링 없이 합성곱을 이어도 이전 특징들의 관계를 더 넓게 참조하게 된다. C4는 같은 GPU 쪽의 C3 지도들에 연결된다.',source:source(5,'§3.5')},
            {id:'conv5',label:'C5',kind:'conv',size:'256개 필터 · 3 × 3',title:'분류에 쓸 시각적 조합을 한 번 더',idea:'층의 기능을 정답에서 함께 조정',text:'같은 GPU 쪽의 C4 지도들에서 여러 반응을 결합해 256개 지도를 만든다. 각각이 무엇을 나타내는지는 학습된 연결과 입력에 달려 있다. 이 화면은 고층의 활성 지도를 임의로 그리지 않고 구조의 결합 범위를 보여 준다.',source:source(5,'§3.5')},
            {id:'pool5',label:'P5',kind:'pool',size:'최대 풀링 · 3 × 3 · 간격 2',title:'마지막 합성곱 반응을 모아 넘기다',idea:'공간에 펼친 특징에서 전체 결합으로',text:'C5의 각 지도에서 강한 주변 반응을 모은다. 이렇게 모인 공간·채널의 특징이 다음 완전연결층으로 들어간다. 원문에서 가중치를 학습하는 여덟 층을 셀 때 풀링은 따로 둔다.',source:source(4,'§3.5, Fig.2는 p.5')},
            {id:'fc6',label:'FC6',kind:'fc',size:'4,096개 은닉 단위',title:'모인 특징 전체를 함께 사용하다',idea:'여러 위치·채널의 반응을 하나의 표현으로',text:'마지막 풀링이 낸 특징 전체와 연결된다. 각 은닉 단위는 서로 다른 조합을 학습할 수 있다. 학습할 때 dropout을 적용한 첫 번째 완전연결층이다.',source:source(5,'§3.5, §4.2는 p.6')},
            {id:'fc7',label:'FC7',kind:'fc',size:'4,096개 은닉 단위',title:'분류 직전의 표현도 학습하다',idea:'사진을 비교할 수 있는 특징 벡터',text:'FC6의 반응 전체를 받아 또 다른 표현을 만든다. 원문 Fig.4는 이 마지막 4,096차원 은닉 표현 사이의 거리로 비슷한 훈련 사진을 찾았다. 화면의 두 번째 자료에서 그 실제 사례를 본다.',source:source(8,'§6.1, Fig.4')},
            {id:'fc8',label:'FC8',kind:'output',size:'1,000개 범주 → softmax',title:'배운 표현을 사물 범주의 판단으로',idea:'정답 라벨과 비교할 출력',text:'마지막 연결이 1,000개 범주에 대한 출력을 만들고 softmax가 그 분포를 구성한다. 정답 라벨의 확률을 높이는 학습 목표가 이 출력과 앞선 특징을 만드는 연결들을 함께 조정한다.',source:source(4,'§3.5, 학습은 §5')}
          ],
          sample:{file:'imagenet-crane-flight.jpg',title:'연결 범위를 비교할 별도 예시 사진',description:'날개를 펴고 날고 있는 세 마리 두루미류의 사진 위에서 중앙 비교 창의 크기를 바꾼다.',credit:{author:'Prasan Shrestha',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',sourceUrl:'https://commons.wikimedia.org/wiki/File:The_Common_Crane.jpg',changes:'정사각형 자르기로 표시 · 증강 화면에서는 자르기 위치·좌우 방향을 변경'}},
          receptiveScope:'창은 입력 한 변을 원문 표기의 224로 두고, 커널 크기와 간격에서 구한 구조상 연결 범위의 크기만 중앙에서 비교합니다. 실제 특징 지도 좌표·경계 처리를 투영한 창이나 학습된 유효 수용장이 아닙니다. 완전연결층은 앞선 특징 전체의 결합으로 표시합니다.',
          feedback:{title:'정답의 차이가, 특징을 찾는 연결까지 돌아간다',text:'사물 라벨과 출력의 차이에서 얻은 신호를 역전파해 앞선 연결값들도 바꾼다. 분류를 위한 표현을 여러 층에서 함께 학습하는 연결이다. 화살표는 학습 관계를 나타내며 이 화면에서 훈련을 실행하지 않는다.'},
          evidenceViews:[
            {id:'filters',label:'첫 층의 학습 필터',file:'alexnet-conv1-96.png',title:'실제로 학습된 96개의 첫 층 필터',caption:'작은 타일 하나가 RGB 입력의 11×11×3 가중치를 시각화한 한 필터다. 선의 방향이나 색 변화에 대응하는 무늬를 볼 수 있다. 사진을 넣었을 때의 반응 지도와는 다른 그림이다.',
              groups:[
                {id:'all',label:'96개 전체',text:'첫 합성곱층이 학습한 서로 다른 입력 기준을 나란히 본다. 모든 필터를 사람이 의미별로 이름 붙여 정한 것은 아니다.'},
                {id:'top',label:'위쪽 48개',text:'위쪽 세 줄은 GPU 한쪽에서 배운 필터다. 저자들은 이 그룹에서 대체로 색에 덜 의존하는 방향·주파수 패턴을 관찰했다. 한 타일마다 같은 기능이라고 단정하지 않는다.'},
                {id:'bottom',label:'아래쪽 48개',text:'아래쪽 세 줄에서는 색에 더 특정적인 필터를 관찰했다. 두 GPU에 방향·색 기능을 미리 배정한 것이 아니다. 연결이 나뉜 조건에서 이런 분화가 학습 후 나타났다는 저자 관찰이다.'}
              ],scope:'학습된 가중치의 원그림을 그대로 사용합니다. 위·아래 강조는 관찰할 영역을 고르는 조작이며 가중치나 계산 결과를 바꾸지 않습니다.',source:source(6,'Fig.3, 관찰 해석은 p.7 §6.1'),credit:figureCredit},
            {id:'neighbors',label:'마지막 표현으로 찾기',file:'alexnet-test-similar.png',title:'자세가 달라도, 배운 표현에서 가까울 수 있을까?',caption:'원문 Fig.4 오른쪽 패널이다. 각 행의 맨 왼쪽은 시험 사진, 오른쪽 여섯 장은 마지막 은닉층의 4,096차원 표현에서 유클리드 거리가 가까운 훈련 사진이다. 화소가 같은지 대신 배운 특징 공간에서 비교했다.',scope:'논문이 고른 정성 사례입니다. 이 그림만으로 모든 사진에서 의미를 이해했다거나, 이 화면이 새 이웃을 검색했다고 결론 내리지 않습니다. 표시된 사진 묶음과 순서는 원자료 그대로입니다.',source:source(8,'§6.1, Fig.4 오른쪽 패널'),credit:figureCredit}
          ],
          designs:[
            {id:'relu',label:'ReLU',title:'큰 양의 입력에서도 기울기를 남기는 비선형성',text:'양수는 그대로 내보내고 음수는 0으로 만든다. 양의 영역에서 출력이 포화하지 않는 성질을 사용해 깊은 망의 학습을 빠르게 진행하려 했다. 아래 입력을 고르면 함수 값이 어떻게 바뀌는지 볼 수 있다.',layerIds:['conv1','conv2','conv3','conv4','conv5','fc6','fc7'],scope:'입력·출력은 함수의 직접 계산입니다. 학습 속도나 분류 성능의 실험값이 아닙니다. 원문 Fig.1의 속도 비교는 별도의 CIFAR-10 4층 망 조건입니다.',source:source(3,'§3.1, Fig.1')},
            {id:'gpu',label:'두 GPU',title:'두 계산 장치에 나누되, 하나의 망으로',text:'GPU 한 장의 메모리에 넣기 어려운 큰 망을 둘로 나누었다. 일부 층에서는 같은 쪽 특징만 사용하고, 필요한 층에서는 양쪽 특징을 교환했다. 두 개의 독립 분류기를 그린 그림이 아니다.',layerIds:['conv1','conv2','conv3','conv4','conv5','fc6','fc7','fc8'],scope:'숫자는 각 GPU 쪽의 필터·은닉 단위 수이며 마지막 출력은 전체 1,000범주입니다. 실제 하드웨어 배선이나 메모리 배치를 재현한 도면은 아닙니다.',source:source(5,'Fig.2, §3.2는 p.3')},
            {id:'augmentation',label:'데이터 증강',title:'같은 사물의 다른 보임도 만나게 하다',text:'사진에서 잘라 보는 위치와 좌우 방향을 바꾸어, 같은 라벨이 다른 화소 배열로도 나타나게 했다. 본 사진의 한 배치만 기억하는 경향을 줄이려는 선택이다. 변환 뒤에도 대상과 라벨이 유지되는지 살펴야 한다.',layerIds:['input'],scope:'같은 예시 사진을 다른 자르기·좌우 반전으로 보여 줍니다. 원문의 무작위 표본·RGB PCA 증강·학습 결과를 재현하지 않습니다.',source:source(5,'§4.1, RGB 변형은 p.6')},
            {id:'dropout',label:'Dropout',title:'특정한 다른 단위에만 기대지 않도록',text:'학습할 때 첫 두 완전연결층의 은닉 출력을 각각 확률 0.5로 끈다. 어떤 단위가 빠져도 유용한 특징을 배우도록 하려는 발상이다. 시험할 때는 전체를 사용하고 출력을 0.5배 한다는 원문의 방식을 나누어 본다.',layerIds:['fc6','fc7'],scope:'몇 개의 대표 단위와 직접 정한 끔 패턴으로 관계를 그렸습니다. 4,096개 단위를 모두 표시하거나 무작위 훈련을 수행한 것은 아닙니다. 시험의 0.5배 표시는 원문의 방식입니다.',source:source(6,'§4.2')}
          ],
          gpu:{title:'한 망을 나눈 두 경로',caption:'C2·C4·C5는 같은 쪽만, C3과 완전연결층은 양쪽 특징을 함께 받는다. 각 행의 숫자는 분할된 수이며, 첫 화면의 층 숫자는 합계다.',layers:[
            {id:'conv1',label:'C1',perGroup:48,connect:'split'},
            {id:'conv2',label:'C2',perGroup:128,connect:'same'},
            {id:'conv3',label:'C3',perGroup:192,connect:'all'},
            {id:'conv4',label:'C4',perGroup:192,connect:'same'},
            {id:'conv5',label:'C5',perGroup:128,connect:'same'},
            {id:'fc6',label:'FC6',perGroup:2048,connect:'all'},
            {id:'fc7',label:'FC7',perGroup:2048,connect:'all'},
            {id:'fc8',label:'FC8',perGroup:1000,connect:'merge'}
          ]},
          scope:'구조와 학습 관계를 그린 자체 도식, 원논문에서 실제 배운 필터·검색 사례를 구분해 표시합니다. 연결 범위를 보는 별도 사진은 ImageNet 표본이나 AlexNet의 새 예측 결과가 아닙니다.',
          source:source(5,'Fig.2 구조, Fig.3·4는 pp.6·8')
        },
        takeaway:{title:'특징을 만드는 기준까지, 분류의 경험에서 배우다',text:'국소 연결·공유 필터라는 구조 위에서 여러 층의 표현을 사물 라벨로 함께 학습했다. 데이터의 크기, 계산 방법, 최적화와 과적합 억제가 이 표현 학습을 큰 자연사진 과제로 확장하는 조건이었다.'},
        technical:{
          title:'원문 구조·범위 계산·학습 조건을 더 읽기',
          paragraphs:[
            '기준은 NIPS 2012 공식 PDF 9쪽 판본이다. 구조는 Fig.2(p.5), 첫 층의 학습 필터는 Fig.3(p.6), 예측과 특징공간 이웃 사례는 Fig.4(p.8)다. 학회 웹페이지의 초록과 PDF의 일부 규모·성능 수치가 달라 이 카드에서는 PDF의 표현과 조건을 따른다.',
            '가중치를 학습하는 층은 합성곱 5개와 완전연결 3개다. 합성곱 필터 수는 96·256·384·384·256, 은닉 완전연결층은 각각 4,096개, 마지막 출력은 1,000범주다. 첫 두 합성곱 뒤에는 반응 정규화와 최대 풀링이, 다섯 번째 뒤에는 최대 풀링이 있다. 도식의 선택에서는 공간 범위를 바꾸지 않는 ReLU·정규화를 별도 가중치층으로 세지 않는다.',
          'ReLU 보기는 합성곱·은닉 완전연결층에서 그 기능을 살피고, 마지막은 FC8의 출력에서 softmax로 이어지는 관계를 표시한다. 원문 §3.5는 모든 합성곱·완전연결층에 ReLU를 적용한다고 쓰지만, 이번에 검토한 공식 코드 보관 자료에서는 당시 ImageNet 실행 설정을 확인하지 못했다. 후대 구현으로 원문의 마지막 활성화를 확정해 그리지 않는다.',
            '범위 계산은 입력에서 r=1, j=1로 시작한다. 커널 한 변 k와 간격 s를 지날 때 r을 r+(k−1)j로, j를 sj로 바꾼다. C1부터 공간층을 따라 11·19·51·67·99·131·163·195를 얻는다. 이는 한 단위의 연결을 거슬러 올라갈 때 가능한 공간 범위의 한 변이다. 실제로 영향을 준 영역, 경계의 잘림, 패딩, 필터 가중치 크기를 계산한 결과는 아니다.',
            '원문은 입력을 224×224×3으로 쓰고 Fig.2의 첫 지도에 55를 표시한다. 11 커널·간격 4에 무패딩 floor 공식을 바로 적용하면 54가 되어 그대로 일치하지 않는다. 첫 층 뉴런 수에 관한 캡션 숫자도 그림의 곱과 맞지 않는다. 입력을 조용히 227로 바꾸거나 원문 수치를 정확한 실행 재현이라고 제시하지 않는다. 화면의 범위 계산은 출력 지도 크기·정밀 좌표 원점과 분리했다.',
            '§2는 ImageNet 전체와 ILSVRC의 1,000범주 부분집합을 구분한다. 대부분의 실험은 시험 라벨을 사용할 수 있던 2010판을 사용했고 2012년 대회 결과도 따로 보고했다. 약 120만 장의 훈련 자료를 쓴 이 논문 조건은 2009년 ImageNet 데이터 논문 당시의 전체 규모와 같지 않다.',
            '§4.1은 256×256 사진에서 224×224 부분을 무작위로 자르고 좌우를 반전하는 증강, RGB 주성분을 이용한 변형을 설명한다. 시험에서는 네 모서리와 중앙의 다섯 자르기 및 각 좌우 반전, 총 열 개의 softmax 예측을 평균했다. 화면의 세 사진 변형은 이 절의 발상을 보여 주는 직접 정한 표시이며 시험 예측의 평균을 실행하지 않는다.',
            '§4.2의 dropout은 첫 두 완전연결층에 적용한다. 원문에서는 학습 중 출력을 확률 0.5로 0으로 만들고, 시험에서는 전체 단위의 출력을 0.5배 한다. 후대 구현에서 흔한 학습 중 2배 보정 방식을 원문의 화면에 섞지 않았다. 끔 패턴은 설명을 위해 직접 고르며 원래 훈련 실행에서 뽑힌 마스크가 아니다.',
            '§6.1은 두 GPU에서 필터의 성향이 다르게 나타났다고 관찰한다. GPU 번호는 바꿀 수 있으며 이 전문화를 사전에 지정하지 않았다고 설명한다. Fig.4 오른쪽은 마지막 4,096차원 은닉 표현의 유클리드 거리로 고른 훈련 사진들이다. 선택된 정성 예시는 표현의 성질을 살피는 자료이며 모든 장면의 의미 이해를 검증한 시험은 아니다.',
            'Table 2의 2012년 단일 CNN top-5 오차 18.2%는 검증 집합 값이고, 일곱 CNN을 결합한 15.3%는 시험 집합 값이다. 후자 중 두 CNN은 더 큰 Fall 2011 자료의 사전학습과 추가 합성곱층을 사용했다. 분할·모형 수·추가 데이터가 달라 이 두 수의 차이를 한 구성요소의 효과로 읽지 않는다. 이 화면은 해당 학습이나 평가를 다시 실행하지 않았다.'
          ],
          formula:'공간 범위: r′ = r + (k − 1)j,  j′ = sj\nReLU: f(x) = max(0, x)\n원문의 dropout: 학습 중 P(출력 끄기)=0.5, 시험 중 출력×0.5'
        }
      },
      keyIdeas:[
        {title:'사물의 규칙 대신, 규칙을 배울 구조를 마련하다',text:'국소 연결은 가까운 화소들의 관계를, 공유 필터는 같은 시각적 무늬가 다른 위치에도 나타난다는 가정을 망에 담는다. 연구자는 이런 구조를 선택하고 사물 라벨을 제공한다. 그 안에서 어떤 특징과 조합이 분류에 유용한지 연결값을 배운다.'},
        {title:'뒤의 판단을 위해, 앞의 특징도 달라진다',text:'최종 분류 오차는 입력 가까이의 필터를 조정하는 신호로도 쓰인다. 특징을 만드는 단계와 그 특징으로 판단하는 단계를 함께 학습한다. 첫 층의 방향·색 무늬와 마지막 표현에서의 사진 유사성은 이 과정을 서로 다른 위치에서 살펴보는 자료다.'},
        {title:'깊이를 늘리는 일과, 학습할 수 있게 만드는 일',text:'큰 망은 여러 특징 조합을 표현할 여지를 주지만 계산 시간·메모리·과적합도 늘린다. GPU 분할과 ReLU, 증강과 dropout은 서로 다른 제약에 대응한다. 하나만으로 전체 결과를 설명하기보다 함께 쓴 조건을 읽어야 한다.'},
        {title:'더 넓게 보는 연결이, 곧 의미 이해는 아니다',text:'층을 거치며 구조상 참조할 수 있는 공간은 넓어진다. 그 안의 어느 단서를 실제로 쓰는지는 학습된 가중치와 입력에 달려 있다. 원문은 일부 학습 필터와 이웃 검색 사례를 보여 주지만, 모든 고층 단위의 의미를 눈·귀·사물 순서로 확정하지 않는다.'}
      ],
      videos:[{title:'Stanford CS231n (2017) · CNN Architectures',url:'https://www.youtube.com/watch?v=DAOcjicFr1Y',channel:'Stanford University School of Engineering',note:'공식 일정의 Lecture 9에서 연결한 후대 구조 비교 강의. 2012년 원저자 발표와 구분한다. 제목·공식 일정의 영상 연결을 확인했으며 현재 재생·전체 시청은 검사하지 않았다.',sourceUrl:'https://cs231n.stanford.edu/2017/syllabus.html'}],
      references:[
        {title:'Krizhevsky·Sutskever·Hinton (2012) · ImageNet Classification with Deep Convolutional Neural Networks',url:paper,location:'PDF pp.1–2: 자연사진의 변화·구조 가정·데이터. p.3 Fig.1: 별도 CIFAR-10 ReLU 비교. pp.4–5 §3.5·Fig.2: 구조와 GPU 연결. pp.5–6: 증강·dropout·Fig.3. pp.7–8 §6.1·Fig.4: 필터 성향과 은닉 표현의 이웃. p.7 Table 2: 2012년 모형·분할별 결과. PDF pp.1–8을 렌더링해 대조했다.'},
        {title:'Alex Krizhevsky · 저자 페이지와 그림 재사용 허용',url:'https://cave.cs.toronto.edu/kriz/',location:'2012 논문 아래의 그림 재사용 허용 문구와 제공 ZIP 연결을 직접 확인했다. CC 라이선스로 임의 변환하지 않는다. conv1-96.png와 test-similar.png를 변경 없이 사용하고 원논문·제공자를 표시한다.'},
        {title:'저자 제공 · 2012 논문 원그림 묶음',url:'https://cave.cs.toronto.edu/kriz/convpaper_figures.zip',location:'ZIP의 conv1-96.png는 Fig.3, test-similar.png는 Fig.4 오른쪽 패널이다. arch-final.pdf·test-preds.png도 포함하지만 배포 카드에는 사용한 두 PNG만 넣었다. 원본 ZIP과 허용 문구의 기록은 로컬 research-assets에 보존했다.'},
        {title:'저자 페이지에서 연결한 cuda-convnet · 공식 코드 보관 파일',url:'https://storage.googleapis.com/google-code-archive-source/v2/code.google.com/cuda-convnet/source-archive.zip',location:'408개 항목의 공식 Google Code 보관 자료에서 설정·문서·Python 파일을 검색하고 예시 설정을 읽었다. 2012 ImageNet 실행 설정은 찾지 못했다. 포함된 CIFAR 예시로 AlexNet의 최종 활성화를 확정하지 않는다. 코드를 실행한 검토는 아니다.'},
        {title:'LeCun 외 (1998) · Gradient-Based Learning Applied to Document Recognition',url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf',location:'앞 LeNet 카드에서 검토한 종합 논문을 연결한다. 두 논문의 국소 연결·공유 필터와 정답 기반 학습을 비교하는 자료다. LeNet의 원래 서브샘플링을 AlexNet의 최대 풀링과 동일하게 보지 않는다.'},
        {title:'Stanford CS231n 2017 · 공식 일정',url:'https://cs231n.stanford.edu/2017/syllabus.html',location:'May 2 Lecture 9 CNN Architectures의 공식 YouTube 연결 DAOcjicFr1Y를 대조했다. 후대 배경 강의이며 현재 재생이나 전체 시청을 확인한 것은 아니다.'}
      ]
    }
  });
})();
