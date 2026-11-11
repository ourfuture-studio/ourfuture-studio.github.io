(function(){
  'use strict';
  const freeze=o=>{if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.values(o).forEach(freeze);Object.freeze(o);}return o;};
  const paper='https://www.damtp.cam.ac.uk/user/gold/pdfs/teaching/turing1952.pdf';
  const source=(title,page,location)=>({title,url:paper+'#page='+page,location});
  const sources={two:source('§4 · 원문의 두 세포',7,'인쇄 pp.42–43 / PDF pp.7–8. 반응률5X−6Y+1·6X−7Y+1과 이동0.5·4.5, 초기농도와 차이의 지수 성장.'),ring:source('§6 · 고리의 공간 모드',12,'인쇄 pp.47–48 / PDF pp.12–13. 식6.1의 양옆 이웃, 작은 교란의 선형화와 모드별 고유값.'),spectrum:source('Figure 1·§10 · 어느 파장이 덜 감쇠할까?',17,'Figure1 인쇄 p.52. 계산에는 §10 p.64의 a=−2,b=−1.5625,c=2,d=1.5와 p.62의 μ=.5,ν=.25를 사용. γ=0의 작은 교란.'),table:source('Table 1·Figure 3 · 첫 표본 Y',27,'인쇄 pp.62–64 / PDF pp.27–29. Table1 첫 표본의 Y 초기·최종 열20개를 직접 옮김. 단계 선택은 원기록 읽기이며 확률적·비선형 계산 전체의 재실행 아님.'),scope:source('§§1·10·11 · 가정과 생물학적 범위',2,'인쇄 pp.37–38,60–65,71–72. 가정한 morphogen 반응계와 Manchester 계산, 생물학적 설명의 가능성. 실제 생물의 원인 물질 동정과 구분.')};
  const role=(id,label,idea,refs)=>({id,label,idea,refs});
  const views=[
    {id:'two-cells',label:'01 차이를 키우는 반응과 이동',title:'퍼져 나가는 두 물질이, 전체에서는 차이를 키울 수 있다',intro:'원문 §4의 두 세포 예제를 실제 계산합니다. X·Y의 반응식은 그대로 두고, 이동 조건과 작은 시작 차이를 바꾸어 봅니다.',initial:'exchange',nodes:[
      role('reaction','한 세포 안의 반응','한 위치의 X·Y가 서로의 생성·소멸에 영향을 준다. 첫 세포의 원문 초기값에서 반응만의 변화율은 X에0.18,Y에0.22다.',['two']),
      role('exchange','농도 차이에 따른 이동','각 물질은 높은 농도에서 낮은 농도로 이동한다. 원문 계수에서는 첫 세포 밖으로 X가0.06,Y가0.18 이동하지만, 반응까지 합치면 차이는 오히려 커진다.',['two']),
      role('disturbance','완벽한 동일성과 작은 교란','같은 규칙과 완전히 같은 출발점이면 이 결정론적 모형은 계속 같은 상태다. 공간 차이를 키우는 방향이 존재하는 일과, 시작할 차이가 실제로 있는 일을 구분한다.',['two','scope']),
      role('growth','전체의 안정성은 결합해서 본다','원문 조건의 차이 모드에는 성장률2가 있다. 같은 이동 속도나 이동이 없는 비교에서는 장기 고유값이 음수지만, 짧은 시간의 일부 성분 증가는 가능하다.',['two'])
    ]},
    {id:'spatial-modes',label:'02 어느 공간 파장이 남을까?',title:'스무 위치의 차이를, 파장별 성장률로 읽는다',intro:'원문 §10의 γ=0 계수로 모드별 고유값을 다시 계산합니다. 이 조건에서는 모든 성장률이 음수이며, 세 마디 모드가 상대적으로 덜 감쇠합니다.',initial:'growth-rate',nodes:[
      role('neighbours','고리의 이웃 관계','세포0의 양옆에는19와1이 있다. 이웃과의 차이를 더한 국소 연산이 고리 전체의 파동에 어떻게 작용하는지 본다.',['ring']),
      role('spatial-mode','차이를 공간 파동으로 나누기','모드m은 고리 둘레에서m번 오르내리는 성분이다. 여기의 코사인 표시 크기는 직접 정한 값이며 원문 Table1의 농도 기록이 아니다.',['ring']),
      role('marginal-rates','작은 교란에서의 반응률','평형 근처의 반응을2×2행렬로 적고, 선택한 파장에 맞는 확산 항을 뺀다. 큰 최종 무늬 전체를 선형식만으로 설명하지 않는다.',['ring','spectrum']),
      role('growth-rate','음수 성장률과 불안정성을 구별','원문은 모드3의 성장률을 약−0.0034로 적고, 이 화면은 명시 계수로 약−0.003456을 계산한다. 두 값 모두 γ=0에서 음수다. 상대적으로 남는 파장이라는 뜻과, 절대 크기가 계속 증가한다는 뜻은 다르다.',['spectrum'])
    ]},
    {id:'original-record',label:'03 원문 표의 무늬 읽기',title:'원문이 계산한 초기 무늬와 최종 무늬를 대조한다',intro:'Table1의 첫 번째 표본 Y값20개를 Figure3처럼 비교합니다. 아래 단계는 Figure3의 균일 평형 기준과 Table1의 초기·최종 기록을 고르며, 기록 사이를 새로 계산하거나 보간하지 않습니다.',initial:'source-table',nodes:[
      role('source-table','표의 수를 그림으로 읽기','초기·최종 Y열을 직접 옮겨 위치별 농도를 그린다. 인쇄값의 소수 셋째 자리 정밀도를 유지한다.',['table']),
      role('cell-index','같은 세포 번호를 대응하기','선형 그래프의 위치와 고리의 세포 번호를 연결해 읽는다. 세포 번호는 위치를 구분하는 표식이며 실제 조직을 측정한 표본 번호가 아니다.',['table','ring']),
      role('nonlinear','작은 파동과 큰 무늬의 과정','초기 선형 분석에서 나아가 원문은 비선형 반응과 γ의 변화, 농도가0이 되는 제한을 포함해 최종값을 계산한다. 이 화면은 그 전체 절차의 재실행이 아니다.',['table']),
      role('scope','가정한 반응계의 수치 기록','원문의 실제 컴퓨터 계산이 있다는 사실과 실제 생물에서 그 물질·기작을 확인했다는 주장은 구분한다. 이 연구는 AI 학습 성과와 다른 분야의 기록이다.',['scope','table'])
    ]}
  ];
  const cases=[{id:'original',label:'원문 · X0.5 / Y4.5',mu:.5,nu:4.5},{id:'none',label:'직접 비교 · 이동 없음',mu:0,nu:0},{id:'equal',label:'직접 비교 · 둘 다0.5',mu:.5,nu:.5}];
  const epsilons=[0,.005,.02];
  function getCase(id){const c=cases.find(x=>x.id===id);if(!c)throw new RangeError('정해진 이동 조건을 선택하세요.');return c;}
  function twoCells(caseId='original',epsilon=.02,tick=0){
    const spec=getCase(caseId);if(!epsilons.includes(epsilon)||!Number.isInteger(tick)||tick<0||tick>5)throw new RangeError('시작 차이와 표시 시점을 확인하세요.');
    const t=tick*.25,a=5-2*spec.mu,b=-6,c=6,d=-7-2*spec.nu,h=(a+d)/2,q=(a-d)/2,disc=q*q+b*c,delta=Math.sqrt(Math.max(0,disc)),ct=disc===0?1:Math.cosh(delta*t),st=disc===0?t:Math.sinh(delta*t)/delta,k=Math.exp(h*t);
    const x=k*((ct+q*st)*3*epsilon+b*st*epsilon),y=k*(c*st*3*epsilon+(ct-q*st)*epsilon),values=[1+x,1+y,1-x,1-y];
    const reaction=[5*values[0]-6*values[1]+1,6*values[0]-7*values[1]+1,5*values[2]-6*values[3]+1,6*values[2]-7*values[3]+1];
    const exchange=[spec.mu*(values[2]-values[0]),spec.nu*(values[3]-values[1]),spec.mu*(values[0]-values[2]),spec.nu*(values[1]-values[3])];
    return freeze({caseId,epsilon,tick,time:t,values,reaction,exchange,total:reaction.map((v,i)=>v+exchange[i]),difference:[2*x,2*y],eigenvalues:[h+delta,h-delta],scope:'원문 반응식이 유효한 양의 농도 구간의 정확한 선형 해. 비교 이동 조건은 직접 구성.'});
  }
  function mode(m){if(!Number.isInteger(m)||m<0||m>10)throw new RangeError('공간 모드0–10을 선택하세요.');const q=4*Math.sin(Math.PI*m/20)**2,a=-2-.5*q,b=-1.5625,c=2,d=1.5-.25*q,h=(a+d)/2,disc=((a-d)/2)**2+b*c,re=h+(disc>0?Math.sqrt(disc):0),imag=disc<0?Math.sqrt(-disc):0;return freeze({m,q,matrix:[[a,b],[c,d]],growth:re,imaginary:imag,values:Array.from({length:20},(_,r)=>1+.08*Math.cos(2*Math.PI*m*r/20)),allDamped:re<0});}
  const sourceY={homogeneous:Array(20).fill(1),incipient:[.929,.940,.885,.810,.753,.873,1.003,1.000,.896,.775,.820,.907,.886,.854,.904,.976,.957,.820,.675,.811],final:[1.463,1.469,1.255,0,0,1.385,1.622,1.615,1.382,0,0,1.273,1.451,1.442,1.478,1.308,0,0,1.309,1.487]};
  const stages=[{id:'homogeneous',label:'균일 상태 · Y=1'},{id:'incipient',label:'원문 · 초기 무늬'},{id:'final',label:'원문 · 최종 무늬'}];
  function originalRecord(stage='incipient',cell=0){if(!stages.some(s=>s.id===stage)||!Number.isInteger(cell)||cell<0||cell>19)throw new RangeError('기록과 세포 번호를 확인하세요.');return freeze({stage,cell,values:sourceY[stage],selected:sourceY[stage][cell],min:Math.min(...sourceY[stage]),max:Math.max(...sourceY[stage]),newSimulation:false});}
  const getView=id=>{const v=views.find(x=>x.id===id);if(!v)throw new RangeError('알려진 보기를 선택하세요.');return v;};
  const bridges=[{id:'turing1936',personId:'alan-turing',workId:'turing-computable-numbers',label:'1936 · 계산의 절차'},{id:'turing1945',personId:'alan-turing',workId:'turing-ace-proposal',label:'1945 · 실제 계산기 설계'},{id:'turing1948',personId:'alan-turing',workId:'turing-intelligent-machinery',label:'1948 · 기계의 조직과 학습'},{id:'turing1950',personId:'alan-turing',workId:'turing-computing-machinery-intelligence',label:'1950 · 지능을 판단하는 질문'}];
  window.AtlasTuringMorphogenesisDetail=freeze({views,sources,cases,epsilons,twoCells,mode,sourceY,stages,originalRecord,getView,bridges});
})();
