/* Official CUDA roles, source-bound connections and transparent browser arithmetic. */
(function(){
  'use strict';
  const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
  function shape(a){if(!Array.isArray(a)||!a.length||!Array.isArray(a[0])||!a[0].length||a.some(r=>!Array.isArray(r)||r.length!==a[0].length||r.some(x=>!Number.isFinite(x))))throw new TypeError('Use a nonempty rectangular finite matrix.');return[a.length,a[0].length];}
  function transpose(a){const[m,n]=shape(a);return Array.from({length:n},(_,j)=>Array.from({length:m},(_,i)=>a[i][j]));}
  function multiply(a,b){const[m,k]=shape(a),[bk,n]=shape(b);if(k!==bk)throw new RangeError('Inner dimensions must match.');return Array.from({length:m},(_,i)=>Array.from({length:n},(_,j)=>a[i].reduce((s,x,t)=>s+x*b[t][j],0)));}
  function zip(a,b,fn){const[m,n]=shape(a),[bm,bn]=shape(b);if(m!==bm||n!==bn)throw new RangeError('Matrix shapes must match.');return a.map((r,i)=>r.map((x,j)=>fn(x,b[i][j])));}
  const scale=(a,s)=>{shape(a);if(!Number.isFinite(s))throw new TypeError('Finite scalar required.');return a.map(r=>r.map(x=>x*s));};
  function residual(x,w,t){return zip(multiply(x,w),t,(a,b)=>a-b);}
  function loss(x,w,t){const r=residual(x,w,t);return r.flat().reduce((s,v)=>s+v*v,0)/(2*r.length);}
  function gradient(x,w,t){return scale(multiply(transpose(x),residual(x,w,t)),1/x.length);}
  function sampleGradients(x,w,t){const r=residual(x,w,t);return x.map((row,i)=>multiply(transpose([row]),[r[i]]));}
  function allReduceSum(xs){if(!Array.isArray(xs)||!xs.length)throw new TypeError('One or more matrices required.');shape(xs[0]);return xs.slice(1).reduce((s,a)=>zip(s,a,(x,y)=>x+y),xs[0].map(r=>r.slice()));}
  function sgdStep(w,g,rate){if(!Number.isFinite(rate)||rate<0)throw new RangeError('Use a finite nonnegative step size.');return zip(w,g,(v,d)=>v-rate*d);}
  function dotCell(a,b,row,col,through){const[m,k]=shape(a),[bk,n]=shape(b);if(k!==bk||!Number.isInteger(row)||!Number.isInteger(col)||row<0||row>=m||col<0||col>=n||!Number.isInteger(through)||through<0||through>=k)throw new RangeError('Choose an existing output cell and reduction index.');const terms=a[row].map((v,i)=>({k:i,left:v,right:b[i][col],product:v*b[i][col]}));return freeze({row,col,through,terms,partial:terms.slice(0,through+1).reduce((s,t)=>s+t.product,0),result:terms.reduce((s,t)=>s+t.product,0),logicalBlock:{x:0,y:row},logicalThread:{x:col,y:0}});}
  const fixture=freeze({x:[[1,2,1],[0,1,2]],w:[[1,0],[0,1],[1,1]],target:[[1,2],[1,1]],rate:.1});
  function example(){const {x,w,target,rate}=fixture,z=multiply(x,w),localGradients=sampleGradients(x,w,target),summed=allReduceSum(localGradients),averaged=scale(summed,1/x.length);return freeze({x,w,target,rate,z,residual:residual(x,w,target),loss:loss(x,w,target),localGradients,summed,averaged,updated:sgdStep(w,averaged,rate),scope:'직접 정한 작은 행렬의 곱·기울기·한 번의 갱신을 브라우저에서 계산합니다. 실제 CUDA·GPU 실행, 대형 신경망 학습, 장치 통신이나 성능 측정 결과가 아닙니다.'});}
  const sources={
    introduction:{title:'NVIDIA · CUDA Introduction',url:'https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html',location:'현행 가이드 · GPU의 데이터 병렬 계산과 CPU/GPU의 서로 다른 역할. 확인 2026-11-10'},
    programming:{title:'NVIDIA · CUDA Programming Model',url:'https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/programming-model.html',location:'§1.2.1–1.2.2 · host/device, kernel, thread block·grid·SM과 스케줄링. 확인 2026-11-10'},
    early:{title:'NVIDIA · CUDA Programming Guide 1.0',url:'https://developer.download.nvidia.com/compute/cuda/1.0/NVIDIA_CUDA_Programming_Guide_1.0.pdf',location:'2007-06-23 · Ch.6, 인쇄 pp.57–59·Fig.6-1. Block이 출력 부분행렬을, thread가 원소를 맡는 초기 예시. 자체 수치는 원문 데이터가 아님'},
    matrix:{title:'NVIDIA · Fully-Connected Layers',url:'https://docs.nvidia.com/deeplearning/performance/dl-performance-fully-connected/index.html',location:'§2 · 순전파·입력 기울기·가중치 기울기의 GEMM 표현, Fig.2. 성능 수치는 재현하지 않는다. 확인 2026-11-10'},
    performance:{title:'NVIDIA · CUDA Best Practices Guide',url:'https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html',location:'데이터 전송·메모리 최적화·계산 자원, 성능 최적화의 조건. 작은 자체 행렬은 효율 측정용 예제가 아니다. 확인 2026-11-10'},
    nccl:{title:'NVIDIA · NCCL Collective Operations',url:'https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/collectives.html',location:'AllReduce · 각 rank의 원소별 합을 모든 rank에 돌려준다. 합산 뒤 평균은 이 사례의 별도 계산. 확인 2026-11-10'},
    timeline:{title:'NVIDIA · Corporate Timeline',url:'https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/',location:'1993 공동설립·3D 그래픽스, 2006 CUDA 항목. 후속 제품 전체를 이때로 소급하지 않는다. 확인 2026-11-10'},
    alexnet:{title:'Krizhevsky·Sutskever·Hinton · AlexNet 원논문',url:'https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf',location:'2012 · §1의 GPU 구현·공개 코드 각주, §3.2·Fig.2 두 GPU의 망 분할. 자체 데이터 병렬 예시와 다른 분할 방식'},
    partnership:{title:'NVIDIA·Palantir · 공식 협력 발표',url:'https://nvidianews.nvidia.com/news/nvidia-palantir-ai-enterprise-data-intelligence',location:'2025-10-28 · 가속 계산·CUDA-X·Nemotron과 Ontology/AIP의 통합 발표. 성능·고객 효과의 독립 검증과 구분'},
  };
  const nodes=[
    {id:'repeated-math',label:'반복되는 많은 계산',short:'그래픽스에서 데이터 병렬 계산으로',icon:'grid',type:'출발한 발상',input:'많은 화소·원소에 적용할 비슷한 계산',role:'한 데이터의 계산을 복잡하게 만드는 것뿐 아니라, 많은 데이터에 적용할 일을 나누어 처리하는 데 GPU의 처리 자원을 활용한다.',output:'나누어 실행할 수 있는 계산',sourceIds:['introduction','programming']},
    {id:'kernel-work',label:'Kernel과 출력의 위치',short:'같은 코드가 서로 다른 원소를 맡기',icon:'code',type:'프로그램과 인덱스',input:'계산할 데이터와 kernel 코드',role:'CUDA kernel의 여러 논리 thread가 자신의 인덱스로 맡은 데이터를 정한다. 자체 행렬곱에서는 출력 한 칸을 한 thread에 대응시킨다.',output:'각 thread가 맡을 출력 위치',sourceIds:['programming','early']},
    {id:'thread-hierarchy',label:'Thread·Block·Grid',short:'논리적인 작업의 묶음',icon:'grid',type:'프로그래밍 모델',input:'출력별로 나눈 작업',role:'Thread는 block 안에, block은 grid 안에 조직된다. 이 논리적 구성이 물리 코어 하나와 thread 하나의 일대일 대응이나 모든 작업의 동시 실행을 뜻하지는 않는다.',output:'GPU가 자원에 맞춰 실행할 작업 묶음',sourceIds:['programming','early']},
    {id:'memory-schedule',label:'메모리와 실행 자원',short:'계산할 값이 제때 도착해야 한다',icon:'memory',type:'데이터 공급과 제약',input:'작업 묶음과 사용할 값',role:'GPU는 SM과 메모리 자원에 맞춰 작업을 실행한다. 메모리 접근·재사용·동기화·분기와 전송도 실제 성능에 영향을 준다. 아래 작은 배열은 속도 비교가 아니다.',output:'자원·데이터 이동을 함께 고려한 실행',sourceIds:['programming','performance']},
    {id:'host-batch',label:'배치와 가중치를 준비',short:'입력·매개변수는 다른 데이터',icon:'tables',type:'CPU와 데이터 공급',input:'학습 예제와 현재 모델의 매개변수',role:'Host는 작업을 준비하고 GPU가 쓸 데이터와 kernel 실행을 연결한다. 입력 배치, 가중치와 목표값을 구분한다. 실제 메모리 공유·전송 방식은 환경과 설정에 따라 다르다.',output:'GPU 계산에 사용할 입력과 가중치',sourceIds:['programming','matrix']},
    {id:'forward-products',label:'순전파의 행렬 계산',short:'입력으로 현재의 출력을 구하기',icon:'model',type:'신경망의 계산',input:'입력 배치 X와 가중치 W',role:'선형층의 순전파는 행렬곱으로 표현된다. 실제 네트워크에는 편향·활성함수와 다른 연산도 있으며 이 자체 사례는 Z=XW 한 층만 계산한다.',output:'현재 가중치가 만든 중간 출력 Z',sourceIds:['matrix','performance']},
    {id:'backward-gradients',label:'오차에서 기울기로',short:'출력·목표와 가중치의 관계',icon:'gradient',type:'역전파에서 필요한 계산',input:'출력 Z, 직접 정한 목표 T, 가중치',role:'학습은 오차가 가중치에 따라 어떻게 변하는지 구한다. 선형층의 입력·가중치 기울기에도 행렬곱이 나타난다. 목표값과 기울기, 가중치는 서로 다른 역할이다.',output:'가중치를 어느 방향으로 바꿀지 나타내는 기울기',sourceIds:['matrix']},
    {id:'gradient-exchange',label:'여러 GPU의 기울기를 모으기',short:'분담한 샘플의 결과를 합산',icon:'network',type:'데이터 병렬과 통신',input:'같은 가중치로 서로 다른 샘플에서 구한 기울기',role:'자체 예시는 두 GPU에 샘플 하나씩을 배정한 데이터 병렬을 가정한다. AllReduce SUM은 각 기울기의 원소별 합을 모두에게 돌려주며, 그 뒤 두 샘플의 평균을 별도로 계산한다.',output:'각 GPU가 함께 사용할 평균 기울기',sourceIds:['nccl','matrix']},
    {id:'parameter-update',label:'갱신과 다음 계산',short:'계산·통신·데이터가 한 흐름으로',icon:'status',type:'한 번의 매개변수 갱신',input:'평균 기울기와 학습률',role:'같은 갱신 규칙으로 가중치를 바꾸고 다음 배치의 계산으로 이어간다. 큰 학습 작업에서는 계산 장치, 메모리, 데이터 공급, 라이브러리와 통신이 함께 필요하다.',output:'다음 계산에 사용할 가중치',sourceIds:['matrix','nccl','performance']},
    {id:'jensen',label:'젠슨 황',short:'NVIDIA 공동설립 · 기업·플랫폼의 경로',icon:'person',type:'인물과 조직의 역할',input:'그래픽스와 계산 플랫폼의 사업',role:'공동설립자의 경영·플랫폼 구축과 개발팀·연구자의 기여를 나누어 읽는다. NVIDIA의 연혁은 세 공동설립자를 함께 기록한다.',output:'NVIDIA와 후속 계산 기반의 기업 기록',sourceIds:['timeline']},
    {id:'nvidia',label:'NVIDIA',short:'GPU와 계산 소프트웨어의 기반',icon:'company',type:'기업',input:'그래픽스·계산 장치와 소프트웨어의 문제',role:'1993년 3D 그래픽스 기업의 출발, 2006년 CUDA, 후속 AI 계산 기반을 연도별로 나누어 본다.',output:'GPU·CUDA와 후속 소프트웨어 기반',sourceIds:['timeline','programming']},
    {id:'cuda-platform',label:'CUDA',short:'GPU 계산을 프로그램으로 연결',icon:'code',type:'프로그래밍 플랫폼',input:'GPU에서 수행할 병렬 계산',role:'CUDA는 CPU와 GPU를 연결하는 프로그래밍 모델과 도구의 기반이다. 후속 CUDA-X·AI 라이브러리는 시점과 역할을 따로 읽어야 한다.',output:'GPU 계산을 이용할 응용·연구와 소프트웨어',sourceIds:['programming','timeline']},
    {id:'alexnet-research',label:'AlexNet 연구',short:'2012 · 연구자들의 두 GPU 구현',icon:'model',type:'연구와 플랫폼의 만남',input:'이미지와 신경망을 학습할 계산 자원',role:'원논문은 3GB 메모리 제약 때문에 망을 두 GPU에 나누고 CUDA로 구현한 구조를 설명한다. 위 자체 데이터 병렬과 같은 분할은 아니며 모델의 저자는 연구자들이다.',output:'기존 AlexNet 카드에서 읽을 연구 아이디어',sourceIds:['alexnet']},
    {id:'palantir',label:'Palantir',short:'2025 · NVIDIA와 회사 간 협력',icon:'company',type:'기업 · 날짜가 있는 발표',input:'기업 데이터와 운영 AI의 연결',role:'2025-10-28 두 회사의 협력 발표는 NVIDIA 가속 계산·CUDA-X·Nemotron을 Palantir Ontology/AIP에 연결하는 방향과 제품 통합을 설명한다.',output:'카프 카드에서 이어 읽을 업무 기반',sourceIds:['partnership']},
    {id:'ontology-aip',label:'Ontology·AIP',short:'계산 기반을 업무의 맥락에 연결',icon:'links',type:'업무 운영 플랫폼',input:'업무의 데이터·관계·행동과 AI 기반',role:'가속 계산의 역할과 업무의 의미·행동을 표현하는 운영 계층은 다른 층이다. 회사의 통합 발표를 모든 고객의 효과나 성능이 독립 검증됐다는 뜻으로 바꾸지 않는다.',output:'데이터·AI를 실제 업무와 연결하는 구조',sourceIds:['partnership']}
  ];
  const edge=(id,from,to,kind,label,sourceIds)=>({id,from,to,kind,label,sourceIds});
  const edges=[
    edge('math-kernel','repeated-math','kernel-work','concept','반복 계산의 분해',['programming']),
    edge('kernel-hierarchy','kernel-work','thread-hierarchy','concept','논리 작업의 배치',['programming','early']),
    edge('hierarchy-resources','thread-hierarchy','memory-schedule','concept','자원에 맞춘 실행',['programming']),
    edge('batch-forward','host-batch','forward-products','calculation','입력과 가중치',['matrix']),
    edge('forward-backward','forward-products','backward-gradients','calculation','출력과 목표의 차이',['matrix']),
    edge('backward-exchange','backward-gradients','gradient-exchange','communication','각 샘플의 기울기',['nccl']),
    edge('exchange-update','gradient-exchange','parameter-update','update','합산 뒤 별도 평균',['nccl']),
    edge('update-next','parameter-update','host-batch','feedback','다음 배치로',['matrix']),
    edge('jensen-nvidia','jensen','nvidia','cofounder','공동설립',['timeline']),
    edge('nvidia-cuda','nvidia','cuda-platform','platform','계산 플랫폼',['timeline']),
    edge('cuda-alexnet','cuda-platform','alexnet-research','research-use','2012 CUDA 구현',['alexnet']),
    edge('nvidia-palantir','nvidia','palantir','dated-cooperation','2025 협력 발표',['partnership']),
    edge('palantir-aip','palantir','ontology-aip','platform','업무 플랫폼',['partnership']),
    edge('cuda-aip','cuda-platform','ontology-aip','dated-integration','2025 CUDA-X 등 통합',['partnership'])
  ];
  const views=[
    {id:'parallel',label:'01 반복 계산을 병렬 작업으로',title:'한 프로그램의 많은 작업에, 서로 다른 데이터 위치를 맡기다',intro:'행렬곱의 출력 네 칸을 논리 thread 네 개에 나누어 봅니다. 같은 코드가 자신의 인덱스로 다른 행·열을 읽는 발상을 따라갑니다.',nodeIds:['repeated-math','kernel-work','thread-hierarchy','memory-schedule'],edgeIds:['math-kernel','kernel-hierarchy','hierarchy-resources'],initial:'repeated-math',scope:'논리 thread·block·grid를 직접 구성한 작은 예시입니다. 물리 코어와 일대일 대응하지 않으며 네 작업이 실제로 동시에 실행됐다는 시간표가 아닙니다.'},
    {id:'training',label:'02 AI 학습과 여러 GPU의 기반',title:'학습에는 곱셈뿐 아니라, 데이터와 기울기가 오가는 길도 필요하다',intro:'같은 작은 선형층에서 출력·목표·기울기·갱신을 나누어 읽습니다. 두 GPU의 데이터 병렬을 가정한 산술로 합산과 평균의 차이도 봅니다.',nodeIds:['host-batch','forward-products','backward-gradients','gradient-exchange','parameter-update'],edgeIds:['batch-forward','forward-backward','backward-exchange','exchange-update','update-next'],initial:'host-batch',scope:'두 샘플을 하나씩 분담한 데이터 병렬의 자체 산술입니다. AlexNet 원논문의 망 분할과는 다릅니다. 브라우저 계산은 실제 CUDA·GPU·통신 실행이나 성능 측정이 아닙니다.'},
    {id:'connections',label:'03 기업·플랫폼·연구를 연결',title:'GPU를 쓰는 연구와, 기업의 업무 플랫폼으로 이어지는 경로',intro:'공동설립·플랫폼·연구의 이용은 실선, 2025년 NVIDIA·Palantir 협력과 통합 발표는 점선으로 나누어 표시합니다.',nodeIds:['jensen','nvidia','cuda-platform','alexnet-research','palantir','ontology-aip'],edgeIds:['jensen-nvidia','nvidia-cuda','cuda-alexnet','nvidia-palantir','palantir-aip','cuda-aip'],initial:'nvidia',scope:'1993년 기업 설립, 2006년 CUDA 기록, 2012년 연구, 2025년 회사 간 발표를 구분합니다. 후속 라이브러리·제품을 2006년 기술로 소급하거나 연구를 기업가 개인의 발명으로 돌리지 않습니다.'}
  ];
  const byId=new Map(nodes.map(n=>[n.id,n])),edgeById=new Map(edges.map(e=>[e.id,e]));
  for(const n of nodes)if(!n.sourceIds.length||n.sourceIds.some(id=>!sources[id]))throw new TypeError('Each role needs evidence.');
  for(const e of edges)if(!byId.has(e.from)||!byId.has(e.to)||e.from===e.to||!e.sourceIds.length||e.sourceIds.some(id=>!sources[id]))throw new TypeError('Connections need valid endpoints and evidence.');
  for(const v of views)if(v.nodeIds.some(id=>!byId.has(id))||v.edgeIds.some(id=>!edgeById.has(id)||![edgeById.get(id).from,edgeById.get(id).to].every(n=>v.nodeIds.includes(n))))throw new TypeError('Visible connections need visible endpoints.');
  function getView(id){const v=views.find(v=>v.id===id);if(!v)throw new RangeError('Unknown CUDA view.');return freeze({...v,nodes:v.nodeIds.map(id=>byId.get(id)),edges:v.edgeIds.map(id=>edgeById.get(id))});}
  function select(viewId,nodeId){const v=getView(viewId),index=v.nodeIds.indexOf(nodeId);if(index<0)throw new RangeError('Select a visible role.');return freeze({viewId,index,node:v.nodes[index],connections:v.edges.filter(e=>e.from===nodeId||e.to===nodeId),hasPrevious:index>0,hasNext:index<v.nodes.length-1});}
  function step(viewId,nodeId,direction){if(direction!==1&&direction!==-1)throw new RangeError('Step one role at a time.');const s=select(viewId,nodeId),v=getView(viewId);return select(viewId,v.nodeIds[Math.max(0,Math.min(v.nodeIds.length-1,s.index+direction))]);}
  window.AtlasCudaAiInfrastructure=freeze({sources,nodes,edges,views,fixture,shape,multiply,transpose,loss,gradient,sampleGradients,allReduceSum,sgdStep,dotCell,example,getView,select,step});
})();
