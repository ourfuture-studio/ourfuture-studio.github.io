/* Refine the existing CUDA platform record; retain the 1993 and 2025 records. */
(function(){
  'use strict';
  const person=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='jensen-huang');
  const work=person?.works.find(w=>w.id==='huang-cuda-2006');
  if(!work)throw new Error('The existing Jensen Huang / CUDA record is required.');
  const history='https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/';
  const introduction='https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html';
  const programming='https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/programming-model.html';
  const practices='https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html';
  const dense='https://docs.nvidia.com/deeplearning/performance/dl-performance-fully-connected/index.html';
  const blas='https://docs.nvidia.com/cuda/cublas/index.html';
  const cudnn='https://developer.nvidia.com/cuda/cuda-x-libraries/cudnn';
  const nccl='https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/overview.html';
  const collectives='https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/collectives.html';
  const originalGuide='https://developer.download.nvidia.com/compute/cuda/1.0/NVIDIA_CUDA_Programming_Guide_1.0.pdf';
  const alexnet='https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf';
  const palantir='https://nvidianews.nvidia.com/news/nvidia-palantir-ai-enterprise-data-intelligence';
  const priorSources=work.sources.map(s=>({...s}));
  const content={article:{
    question:'수많은 연결값을 배우는 계산을,\n어떻게 GPU의 병렬 계산으로 옮길까?',
    evidenceLabel:'공식 자료 더 읽기',referencesLabel:'CUDA 공식 문서·학습 계산 자료·원논문과 기업 발표',
    opening:[
      '신경망이 이미지를 구별하려면 입력을 연결값과 곱해 다음 표현을 만들고, 정답과의 오차가 각 연결값에 얼마나 관련되는지 계산해 값을 바꾸어야 한다. 입력과 연결값이 많아지면 이런 곱셈과 덧셈도 반복해서 커진다. 학습의 아이디어가 있어도 그 계산을 감당할 수 있어야 더 큰 모형과 많은 사례를 시험할 수 있다.',
      'GPU는 원래 화면을 그리는 많은 작업을 처리하도록 발전했다. 장면과 이미지의 여러 부분에 비슷한 계산을 적용하는 구조를, 그래픽스 밖의 큰 수치 계산에도 쓸 수 없을까? NVIDIA는 CUDA로 이 경로를 열었다. CPU도 병렬 처리를 하지만, GPU는 많은 비슷한 작업의 총처리량을 높이는 데 초점을 둔 설계라는 차이를 활용하는 발상이다.',
      'CUDA는 개발자가 어떤 데이터를 어느 계산에 맡길지 표현하는 소프트웨어 기반이다. CPU 쪽 프로그램이 계산과 자료 이동을 준비하고, GPU에서 실행할 함수를 여러 논리적 작업으로 나눈다. GPU를 단순히 빠른 부품으로 붙이는 데서 끝나는 것이 아니라, 문제를 나누어 표현하고 자료를 공급할 방법까지 함께 만드는 것이다.',
      '아래의 작은 예시에서는 입력 X와 연결값 W를 곱해 출력 네 칸을 만든다. 각 출력은 입력의 한 행과 연결값의 한 열을 곱해 더한 값이다. X와 W가 준비되어 있다면 서로 다른 출력 칸을 맡은 작업들은 같은 규칙으로 각자 계산할 수 있다. 이 나눌 수 있는 반복 구조가 GPU 계산과 만나는 접점이다.',
      '신경망에서는 같은 종류의 계산이 예측을 만드는 순전파뿐 아니라 입력과 연결값의 기울기를 구하는 과정에도 나타난다. cuBLAS와 cuDNN 같은 라이브러리는 이런 수치 연산을 활용할 소프트웨어 층을 제공한다. 2012년 AlexNet 원논문은 큰 망을 두 GPU에 나누어 학습한 사례를 보여 준다. 모델·학습법을 만든 연구자와 계산 기반을 제공한 회사의 역할이 여기서 만난다.',
      '모형과 자료가 커지면 한 GPU 안의 계산만으로 이야기가 끝나지 않는다. 여러 GPU에 자료와 모형을 배치하고, 필요한 계산 결과를 교환하며, 다음 학습 단계에 맞추어야 한다. 아래 그림은 작은 행렬의 분해에서 학습의 기울기와 통신, 회사·연구·업무 플랫폼의 연결까지 이어진다. 젠슨 황의 회사 경영, CUDA 개발팀의 기술, 연구자의 모형을 서로 다른 역할로 읽어 보자.'
    ],
    visual:{id:'cuda-ai-infrastructure',navLabel:'GPU·학습·인프라',title:'반복되는 계산을 나누고, 학습과 인프라로 연결하다',caption:'작은 행렬곱의 출력 칸을 선택해 입력·연결값·곱과 합을 살펴보세요. 학습과 여러 GPU의 기울기 교환, 기업·연구 연결을 이어서 볼 수 있습니다. 작은 행렬·목표·갱신 값은 직접 구성해 브라우저에서 산술을 계산하며 실제 CUDA 실행이나 GPU 성능 측정 결과와 구분합니다.'},
    takeaway:{title:'학습할 모형과, 그 계산을 실행할 기반이 함께 필요하다',text:'신경망의 입력·연결값·기울기를 큰 배열의 반복 계산으로 표현하면 GPU의 병렬 처리와 연결할 수 있다. CUDA와 연산·통신 라이브러리는 그 계산을 장치와 시스템에서 실행하는 기반을 맡는다. 모형의 발상, 계산의 분해, 자료 이동과 통신을 함께 보아야 GPU가 AI 학습의 기반이 된 경로를 읽을 수 있다.'},
    technical:{title:'논리적 계산, 실제 실행, 원논문의 사례를 나누어 읽기',paragraphs:[
      '이 기록의 2006년은 NVIDIA 연혁과 현행 CUDA Introduction이 명시한 CUDA 도입 시점이다. 별도로 확인한 초기 Programming Guide v1.0의 표지 날짜는 2007-06-23이다. 도입 기록과 문서의 시점을 나누고, 현행 스레드 실행·라이브러리·통신 기능 전체를 2006년 제품의 구성으로 옮기지 않는다. NVIDIA의 1993년 공동설립과 2025년 GTC 기록은 기존 별도 항목에 남긴다.',
      '스레드는 계산을 맡기는 논리적 실행 단위이며 물리적 GPU 코어 한 개와 일대일로 대응하는 표가 아니다. CUDA는 스레드를 블록과 그리드로 묶어 표현하고, 실제 하드웨어는 가용 자원에 맞추어 블록과 warp를 실행한다. 현행 Programming Model은 블록 사이의 실행 순서를 보장하지 않는다고 설명한다. 출력 칸을 나누었다는 그림을 모든 스레드가 같은 순간에 끝난다는 뜻으로 해석하지 않는다.',
      'CPU와 GPU는 서로 다른 역할을 함께 맡는다. 공식 가이드는 CPU 쪽 host와 GPU 쪽 device, 각각의 메모리와 자료 이동을 구분한다. GPU 안에서도 레지스터·공유 메모리·장치 메모리의 위치와 재사용이 계산 비용에 영향을 준다. 이미 필요한 값이 메모리에 준비되어 있다는 가정과 그 값을 읽고 옮기는 실제 비용을 구분해야 한다.',
      '2007년 초기 가이드 Chapter 6의 Figure 6-1은 블록이 출력의 부분 행렬을, 블록 안의 스레드가 그 부분의 한 원소를 계산하는 행렬곱을 보여 준다. 아래 X(2×3)와 W(3×2), 출력(2×2)은 이 분해를 살펴보도록 직접 정한 작은 수다. 실제 라이브러리가 큰 행렬을 처리하는 타일·명령·메모리 배치 전체를 그대로 재현한 모형은 아니다.',
      '작은 학습 예시는 편향과 활성함수를 생략한 선형층을 사용한다. 직접 정한 목표와 출력 사이의 제곱오차를 각 샘플에서 절반으로 계산한 뒤 두 샘플의 평균을 목적함수로 삼는다. 시각화의 순전파·기울기·연결값 갱신은 이 식에 따른 JavaScript 산술이다. 실제 CUDA 커널, GPU 실행, 대형 신경망 학습이나 속도 비교를 실행한 결과로 표시하지 않는다.',
      'NVIDIA의 Fully-Connected Layers 자료는 순전파·입력 활성값의 기울기·연결값의 기울기가 행렬곱으로 표현되는 방식을 나눈다. cuBLAS는 GPU에서 사용하는 선형대수 루틴을, cuDNN은 신경망의 순전파·역전파 등에 쓰는 연산을 제공한다. 라이브러리가 학습 목표나 올바른 자료를 대신 정하는 것은 아니며 신경망의 모든 연산이 동일한 행렬곱 한 종류로 끝나는 것도 아니다.',
      'AlexNet 원논문의 저자는 Alex Krizhevsky·Ilya Sutskever·Geoffrey Hinton이다. §3.2는 GTX 580 한 장의 메모리가 3GB라 망의 크기가 제한되어 두 GPU에 모형을 나누었고, 일부 층에서만 통신하도록 구성했다고 설명한다. 이것은 원논문의 모형 분할 사례다. 아래의 두 GPU가 같은 W를 두고 서로 다른 샘플의 기울기를 계산하는 자체 자료 병렬 예시와 같은 방법으로 표시하지 않는다.',
      'NCCL은 여러 GPU의 데이터를 모으고 줄이는 집단 통신을 제공한다. AllReduce의 SUM은 각 장치가 낸 같은 위치의 값을 더한 결과를 모든 참여 장치에 전달한다. 자체 사례에서는 샘플 하나씩을 맡은 두 GPU의 기울기를 합한 뒤, 두 샘플의 평균이라는 목적함수에 맞춰 별도로 2로 나눈다. 이 평균화와 학습률은 이 예시의 선택이며 SUM 호출이 모든 학습에 필요한 평균·최적 갱신을 자동으로 정하는 것은 아니다.',
      '실제 성능은 연산량만으로 결정되지 않는다. 병렬로 나누기 어려운 구간, CPU의 자료 준비, 장치 메모리 용량·대역폭, 전송과 장치 사이 통신이 전체 작업을 제한할 수 있다. Best Practices Guide가 다루는 병렬화 범위와 자료 이동·메모리 접근을 함께 확인해야 한다. 화면의 단계 선택이나 작은 산술 결과로 몇 배 빨라진다는 수치를 만들지 않는다.',
      '2025-10-28 NVIDIA·Palantir 발표는 가속 계산·CUDA-X 라이브러리·Nemotron과 Ontology/AIP의 연결을 설명하는 회사 간 근거다. 이 발표의 제품 통합과 향후 방향을 독립적으로 검증한 업무 성과로 바꾸지 않는다. 황·카프의 경영 역할, 회사의 협력, CUDA와 라이브러리를 만든 개발팀, AlexNet을 연구한 저자는 서로 다른 종류의 연결이다.'
    ]}
  },keyIdeas:[
    {title:'큰 계산에서 같은 규칙을 적용할 부분을 찾는다',text:'입력과 연결값을 곱하는 작업을 출력의 여러 칸으로 나누어 본다. 많은 비슷한 계산을 맡기는 구조가 GPU와 맞닿지만, 먼저 필요한 값과 다음 계산이 의존하는 결과를 구분해야 한다.'},
    {title:'병렬 하드웨어와 계산을 표현할 소프트웨어를 잇는다',text:'CUDA는 개발자가 GPU에 맡길 계산과 자료를 표현하는 기반이다. 스레드·블록이라는 논리적 분해와 실제 장치의 실행을 구분하고, 반복되는 연산에는 라이브러리의 구현을 활용한다.'},
    {title:'예측뿐 아니라 배우기 위한 기울기도 계산해야 한다',text:'학습은 출력 한 번을 만드는 일에서 끝나지 않는다. 오차가 연결값에 얼마나 관련되는지 구하고 값을 바꾸는 계산이 반복된다. 행렬곱·메모리·통신이 이 반복을 감당하는 위치를 함께 읽는다.'},
    {title:'칩·연구·제품·업무는 다른 역할로 연결된다',text:'AlexNet의 연구와 GPU 사용, CUDA 개발팀의 플랫폼, NVIDIA와 Palantir의 회사 협력을 같은 종류의 발명이나 성과로 합치지 않는다. 관련 카드를 따라가면 계산 기반이 연구와 조직의 운영에 이어지는 경로를 살펴볼 수 있다.'}
  ],videos:[],references:[
    {title:'NVIDIA · Corporate Timeline',url:history,location:'1993 공동설립과 2006 GPU Computing·CUDA. 회사의 연혁으로 기술·기업 사건의 시점을 확인했다. 조회 2026-11-10.'},
    {title:'CUDA Programming Guide · Introduction',url:introduction,location:'§1.1.1 The Graphics Processing Unit · §1.1.2 The Benefits of Using GPUs. 그래픽스 병렬 작업에서 범용 GPU 계산으로, CPU와 GPU의 설계 목표. 조회 2026-11-10.'},
    {title:'CUDA Programming Guide · Programming Model',url:programming,location:'§1.2.1 Heterogeneous Systems · §1.2.2 GPU Hardware Model · Warps and SIMT. host/device·메모리·스레드 블록·실행 순서의 범위. 조회 2026-11-10.'},
    {title:'CUDA C++ Best Practices Guide',url:practices,location:'Assessing Your Application · Data Transfer Between Host and Device · Coalesced Access to Global Memory. 병렬화 가능한 범위와 실제 자료 이동 비용. 조회 2026-11-10.'},
    {title:'NVIDIA · Fully-Connected Layers User’s Guide',url:dense,location:'§2 Fully-Connected Layer · Table 1과 Figure 2. 순전파·입력 기울기·연결값 기울기의 행렬곱 표현. 조회 2026-11-10.'},
    {title:'NVIDIA · cuBLAS Documentation',url:blas,location:'§1 Introduction. CUDA 위 GPU 선형대수 루틴과 GEMM 계열. 이 카드에서는 특정 버전의 처리량을 인용하지 않는다. 조회 2026-11-10.'},
    {title:'NVIDIA · CUDA Deep Neural Network library',url:cudnn,location:'cuDNN 도입부. 신경망용 연산과 순전파·역전파 루틴의 역할. 현행 기능을 2006년 구성으로 소급하지 않는다. 조회 2026-11-10.'},
    {title:'NVIDIA NCCL · Overview',url:nccl,location:'NCCL Overview. 여러 GPU와 노드의 집단 통신 라이브러리, 연결망과 통신 연산의 역할. 조회 2026-11-10.'},
    {title:'NVIDIA NCCL · Collective Operations',url:collectives,location:'AllReduce. SUM 등 축약 연산의 결과를 모든 rank에 저장하는 정의. 자체 예시의 평균화와 구분했다. 조회 2026-11-10.'},
    {title:'NVIDIA CUDA Programming Guide v1.0',url:originalGuide,location:'표지 2007-06-23; Chapter 6, printed pp.57–59, Figure 6-1(printed p.58/PDF p.70). 블록별 부분 행렬과 스레드별 출력 원소 계산의 원자료.'},
    {title:'Krizhevsky·Sutskever·Hinton · AlexNet 원논문',url:alexnet,location:'2012 · 제목·저자와 §3.2 Training on Multiple GPUs, Figure 2. 3GB 메모리 제약·두 GPU의 모형 분할·선택한 층 사이 통신. 자체 자료 병렬 예시와 구분했다.'},
    {title:'NVIDIA·Palantir · Operational AI 협력 발표',url:palantir,location:'2025-10-28 · News Summary·Advancing Operational Intelligence. CUDA-X·가속 계산·Nemotron과 Palantir Ontology/AIP의 연결을 다룬 회사 발표. 독립적인 효과 검증과 구분한다.'}
  ]};
  person.tagline='GPU의 병렬 계산을 AI 학습과 인프라로 잇는 기업';
  person.intro='NVIDIA 공동설립에서 출발해 그래픽스의 병렬 계산이 CUDA와 연산·통신 소프트웨어를 거쳐 AI 학습의 기반으로 이어지는 과정을 살펴본다. 황의 경영 역할, CUDA 개발팀, 모형을 연구한 저자와 후속 기업 협력을 날짜와 역할로 나누어 읽는다.';
  Object.assign(work,{title:'CUDA: GPU의 병렬 계산에서 AI 학습·인프라로',dateLabel:'2006년 CUDA 도입에서 출발 · 2007년 초기 가이드 · 후속 학습·통신 기반',type:'기업·계산 플랫폼·공식 기술자료',summary:'많은 입력과 연결값의 반복 계산을 GPU에 나누어 맡기고, CUDA·연산 라이브러리·여러 GPU의 통신으로 신경망 학습을 감당하려는 발상을 살펴본다. 작은 행렬 산술, AlexNet의 원논문 사례, Palantir와의 회사 협력을 구분해 연결한다.',caveat:'2006년은 CUDA 도입 기록의 기준 연도다. 작은 행렬·기울기·갱신은 직접 구성한 브라우저 산술이며 실제 CUDA 실행·GPU 속도 비교·대형 신경망 학습 결과와 구분한다.',content,sources:[...priorSources,{title:'NVIDIA · 신경망의 행렬곱 계산',url:dense},{title:'NVIDIA NCCL · 집단 통신',url:collectives},{title:'NVIDIA·Palantir · 2025년 협력 발표',url:palantir}]});
  window.ATLAS_HUANG_REVISION={personId:person.id,workId:work.id,visualId:'cuda-ai-infrastructure',sourceVersion:'0.45'};
})();
