/* Source-bound ACE design reading, a bounded delay-store phase model and symbolic instruction selection. */
(function(){
  'use strict';
  const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
  const pdf='https://www.npl.co.uk/getattachment/ea5c6585-0929-4713-962c-2306f8dcf1f2/turing-proposal-Alan-LR.pdf?lang=en-US';
  const ref=(title,page,location)=>({title,url:pdf+'#page='+page,location});
  const sources={
    procedure:{title:'Turing (1936) · 계산 절차의 모형',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=2',location:'§1–2 · 인쇄 pp.231–233. 스캔 기호·유한 상태·동작 규칙. ACE의 실제 배선과 일대일로 동일시하지 않고 설계 질문의 변화를 비교.'},
    composition:ref('ACE 제안 · 같은 장치와 구성요소',4,'§1 · 보고서 p.3와 §2 · 보고서 pp.3–4/PDF pp.4–5. 새 문제에 내부 장치를 바꾸지 않는 목표와 DS·TS·IO·OO·LC·CA·선택 trees·clock 등의 제안.'),
    medium:ref('ACE 제안 · 움직이는 신호를 저장하기',5,'§3(ii)–(iii) · 보고서 pp.4–5/PDF pp.5–6. 액체 속 압력파와 수신·증폭·정형·재주입, 0은 펄스 부재·1은 존재.'),
    cycles:ref('ACE 제안 · minor와 major cycle',6,'§3(iii)·§4(i) · 보고서 p.5/PDF p.6. 잠정적으로 minor32bit·major1024bit, 비트 간격1μs·순환1.024ms. 단일 명령이나 수를 담는 낱말.'),
    delaySymbol:ref('ACE 제안 · 재생 클럭을 포함한 지연선 기호',10,'§5(i) · 보고서 p.9/PDF p.10. 내부1024 표기 직사각형과 입출력 화살표, 크기·모양·시간을 표준화하는 재생. 본문 사본의 실제 작은 도식.'),
    serial:ref('ACE 제안 · 비트를 차례로 더하기',11,'§5(vii) · 보고서 p.10/PDF p.11. 최하위 자리부터 들어오는 두 비트와 이전 carry를 합치는 설명. 이 사본에 없는 Fig.10 전체 회로를 복제한 것은 아님.'),
    instructions:ref('ACE 제안 · 기억 속 명령과 조건 분기',12,'§6 · 보고서 p.11/PDF p.12. 지울 수 있는 지연선 기억에 명령을 두고 명령 내용도 계산 대상으로 취급. D×Instruction50+(1−D)×Instruction33을 Instruction1 상자에 저장하는 예.'),
    subsidiary:ref('ACE 제안 · 보조 절차와 복귀 기록',12,'§6 · 보고서 pp.11–12/PDF pp.12–13. 주 절차의 중단 위치를 기록하고 보조 절차 뒤 복구, 기록 목록의 최근 항목·참조와 BURY/UNBURY 표의 재사용.')
  };
  const role=(id,label,input,idea,output,sourceIds)=>({id,label,input,role:idea,output,sourceIds});
  const views=[
    {id:'design',label:'01 계산 절차에서 전자장치로',title:'규칙을 적는 것에서, 그 규칙을 실제로 수행하는 장치로',intro:'1936년의 계산 모형과 1945년의 설계는 다른 질문에 답합니다. ACE 제안에서는 기호를 어떻게 보관하고 선택하며, 전자장치의 시간에 맞추어 연산할지가 구체적인 문제가 됩니다.',initial:'physical-store',nodes:[
      role('procedure','어떤 절차를 수행할까?','기호·상태·규칙으로 적은 계산','1936년 모형은 계산 절차를 분석한다. ACE는 여러 절차를 수행할 실제 장치를 설계한다. 테이프의 각 요소를 전자 부품 하나에 그대로 대응시키기보다, 기록·선택·연산을 어떤 장치로 실현할지 나누어 본다.','절차의 정의에서 장치의 설계 질문으로',['procedure','composition']),
      role('physical-store','DS · 많은 정보를 보관','명령과 수의 기록','제안의 dynamic storage는 수은 지연선을 이용한다. 정보가 액체 속 압력파로 이동하고 다시 주입되어 보존되므로, 종이의 기호와 달리 계속 움직이는 신호를 유지해야 한다.','정보를 유지할 물리적 과정',['composition','medium']),
      role('quick-store','TS · 자주 쓸 정보를 가까이','중간값과 필요한 낱말','원문은 큰 DS와 별도로 빠르게 참조할 TS를 제안한다. 같은 기억 역할이어도 용량·접근 시간·비용이 달라 장치를 나누어 설계한다.','기억의 역할과 접근 조건을 분리',['composition']),
      role('logical-control','LC · 적힌 명령을 작동으로','기억에서 가져올 명령','논리 제어는 명령을 해석하고 효력을 갖게 하는 부분이다. 원문은 LC와 중앙 연산 부분 사이의 경계가 매우 뚜렷하지 않다고도 적는다. 현대 CPU의 고정 단계도를 이 제안 전체에 그대로 덧씌우지 않는다.','적힌 절차가 장치 동작을 정함',['composition','instructions']),
      role('serial-arithmetic','CA · 비트를 차례로 연산','낱말의 비트와 carry','원문의 가산 설명은 최하위 비트부터 두 입력과 앞자리 carry를 받아 한 자리의 합과 다음 carry를 만든다. 수를 한꺼번에 읽는 추상적 덧셈이 실제 신호의 순서와 기억 상태를 요구하는 일이 된다.','논리적 연산과 신호의 시간 순서',['serial']),
      role('programme-change','장치보다 명령표를 바꾸다','새 문제의 계산 절차','ACE의 목표는 새 문제를 위해 내부 장치를 다시 만들지 않고 명령을 준비해 수행하는 것이다. 입력·출력과 선택 장치, 시계도 필요하며, 보관된 명령은 전체 장치가 무엇을 할지 연결한다.','같은 장치로 다른 계산 수행',['composition','instructions'])
    ]},
    {id:'delay-store',label:'02 명령도 기억장치에',title:'기억 속 정보가 움직이면, 언제 읽을지도 설계해야 한다',intro:'원문은 명령 하나나 수 하나를 담는 minor cycle을 잠정32bit로, major cycle을1024bit로 둡니다. 아래는 그 시간·위치 관계만 수동으로 옮겨 보는 직접 구성한 사례입니다.',initial:'shared-store',nodes:[
      role('pressure-wave','액체 속을 이동하는 기록','0·1 펄스의 존재와 부재','지연선은 정보를 압력파로 액체에 보내 끝에서 다시 검출한다. 0은 해당 시점의 펄스 부재, 1은 존재로 표현한다. 저장은 매체 안의 고정된 주소에 글자를 써 놓는 모습과 다르다.','이동하는 물리 신호로 표현된 정보',['medium']),
      role('regeneration','받고 정형해 다시 넣기','지연선을 빠져나온 신호','신호를 그대로 흘려 보내면 정보가 사라진다. 수신·증폭과 표준 형태로의 복원 뒤 시작점에 다시 넣어 순환시킨다. 화면의 폐회로는 이 본문과 원문의1024 지연 기호를 함께 참고해 그렸다.','시간에 걸쳐 보존되는 기억',['medium','delaySymbol']),
      role('word-cycle','낱말과 순환의 크기','32bit 낱말·1024bit major cycle','원문이 설명을 위해 둔 잠정 크기라면 한 major cycle에32개의 낱말이 들어간다. 이 수는 제안의 가정이며 모든 실제 ACE 장치의 완성 사양으로 일반화하지 않는다.','32×32=1024의 위치 관계',['cycles']),
      role('bit-time','한꺼번에 도착하지 않는다','1μs 간격의 비트열','1024개의 비트 시점이 돌아오는 데1.024ms가 걸리는 제안이다. 어떤 낱말을 원하더라도 첫 비트가 나오는 시점을 기다려야 한다. 화면의 선택은 그 낱말 첫 비트의 다음 도착까지를 계산한다.','정보 선택과 기다릴 시간',['cycles','medium']),
      role('shared-store','명령도 수와 같은 기억에','minor cycle의 정보','원문은 단일 명령도 수와 같은 낱말 단위에 들어가며 지울 수 있는 기억에 놓인다고 설명한다. 아래 명령 낱말과 데이터 낱말은 다른 저장 기술이 아니라 사용 역할로 구별한다.','명령 내용도 다룰 수 있는 정보',['cycles','instructions']),
      role('select-time','선택은 시간과 함께','선택한 낱말 번호와 현재 시점','순환 중인 비트에서 필요한 정보를 골라야 한다. 아래 낱말 버튼은 관찰할 첫 비트를 고르며, 실제 ACE의 선택 trees·제어선·명령 부호를 실행하는 장치는 아니다.','읽을 위치와 읽을 순간을 함께 보기',['composition','cycles'])
    ]},
    {id:'instruction-data',label:'03 명령 내용도 계산의 대상으로',title:'무엇을 다음에 할지도, 기억 속 정보로 바꿀 수 있다',intro:'§6의 조건 분기 예를 원문 기호의 뜻에 맞추어 재구성합니다. W33과 W50은 주소 숫자가 아니라 각각 그 번호에 놓인 명령의 전체 내용입니다.',initial:'instruction-content',nodes:[
      role('erasable-orders','명령을 지울 수 있는 기억에','저장된 명령 낱말','명령이 고정 배선이나 한 번 적은 목록에만 머무르지 않으면, 꺼내고 바꾸고 다른 곳에 저장할 수 있다. ACE 제안은 이것이 명령 자체를 구성하는 가능성을 준다고 설명한다.','명령을 다룰 수 있는 계산기',['instructions']),
      role('instruction-content','번호와 내용을 구별','Instruction33·Instruction50의 내용','여기서 W33/W50은 해당 명령 전체의 내용을 표시하는 기호다. D와33·50이라는 주소 숫자를 곱해 새 주소를 얻는 그림으로 바꾸면 원문의 선택 과정을 놓친다.','명령 내용에 대한 선택',['instructions']),
      role('binary-selector','결과 D로 다음 명령을 고르기','조건을 나타내는0 또는1','원문은 D×Instruction50+(1−D)×Instruction33을 계산하자고 한다. D=0이면33번 명령 내용이, D=1이면50번 명령 내용이 남는다. 아래 버튼은 이 두 경우를 직접 비교한다.','계산 결과가 이어질 절차를 정함',['instructions']),
      role('instruction-box','선택한 내용을 Instruction1에','선택된 W33 또는 W50','선택 결과를 Instruction1이라고 이름 붙인 상자에 저장한 뒤, B형 명령으로 그 상자를 따르게 한다. 화면은 이 선택과 저장 관계를 보여 주며 원래 ACE 명령어 집합을 실행하지 않는다.','기억 속 내용을 다음 동작으로 연결',['instructions']),
      role('subsidiary','이미 적은 보조 절차를 재사용','다른 연산에서 쓸 공통 절차','원문은 한 번 적은 연산을 다른 연산의 일부로 호출할 수 있게 하려 한다. 같은 계산을 다시 적는 대신 보조 절차로 나누면, 그 절차로 들어가는 일과 돌아오는 일을 함께 설계해야 한다.','큰 계산을 절차들의 조합으로',['instructions','subsidiary']),
      role('return-note','돌아갈 위치도 기억에 남기기','주 절차를 중단한 위치','원문은 중단 위치의 기록을 목록에 보관하고 최근 기록을 참조해 복귀하는 방식을 설명한다. 기록을 넣고 복원하는 복잡한 동작도 BURY·UNBURY라는 표를 재사용해 처리하자는 구상이다.','저장된 기록과 절차의 재사용',['subsidiary'])
    ]}
  ];
  const delaySpec={wordBits:32,words:32,cycleBits:1024,bitIntervalUs:1,cycleUs:1024,displayLimit:2048,windowBits:16};
  const sampleWords=Array.from({length:32},(_,index)=>({index,usage:index===0?'명령 낱말 · 자체 표시':index===1?'데이터 낱말 · 자체 표시':'다른 낱말 · 자체 표시',bits:index===0?'10110010000101000100000100000010':index===1?'11001000101000100110001000000101':'00000000000000000000000000000000'}));
  function validWord(word){if(!Number.isInteger(word)||word<0||word>=32)throw new RangeError('낱말 번호는0–31입니다.');return word;}
  function readClock(state){if(!state||!Number.isInteger(state.elapsed)||state.elapsed<0||state.elapsed>delaySpec.displayLimit)throw new RangeError('표시 범위의 비트 시점이 필요합니다.');return {elapsed:state.elapsed,targetWord:validWord(state.targetWord)};}
  const initialClock=(word=0)=>freeze({elapsed:0,targetWord:validWord(word)});
  function inspectClock(state){const s=readClock(state),phase=s.elapsed%1024,word=Math.floor(phase/32),bit=phase%32,wait=(s.targetWord*32-phase+1024)%1024;return freeze({...s,phase,word,bit,currentBit:Number(sampleWords[word].bits[bit]),currentUsage:sampleWords[word].usage,targetFirstBit:s.targetWord*32,waitBits:wait,waitUs:wait,elapsedUs:s.elapsed,completeCirculations:Math.floor(s.elapsed/1024),window:Array.from({length:16},(_,offset)=>{const p=(phase+offset)%1024,w=Math.floor(p/32),b=p%32;return {offset,phase:p,word:w,bit:b,value:Number(sampleWords[w].bits[b])};}),scope:'32bit×32낱말의 시점 관계와 직접 만든 비트열만 관찰합니다. 원래 ACE 전체의 명령 실행이나 물리 신호의 재현은 아닙니다.'});}
  function moveClock(state,delta){const s=readClock(state);if(!Number.isInteger(delta)||delta< -1024||delta>1024)throw new RangeError('한 번에 옮길 시점 수는−1024–1024입니다.');return freeze({elapsed:Math.max(0,Math.min(2048,s.elapsed+delta)),targetWord:s.targetWord});}
  const chooseWord=(state,word)=>{const s=readClock(state);return freeze({...s,targetWord:validWord(word)});};
  function selectInstruction(D){if(D!==0&&D!==1)throw new RangeError('조건 D는0 또는1입니다.');return freeze({D,formula:D+' × W50 + '+(1-D)+' × W33',coefficient50:D,coefficient33:1-D,selectedContents:D===0?'W33':'W50',sourceInstructionNumber:D===0?33:50,destination:'Instruction1',fullInstructionExecution:false});}
  const getView=id=>{const v=views.find(v=>v.id===id);if(!v)throw new RangeError('알려진 보기를 선택하세요.');return v;};
  const select=(view,id)=>{const n=getView(view).nodes.find(n=>n.id===id);if(!n)throw new RangeError('현재 보기의 항목을 선택하세요.');return n;};
  const bridges=[{id:'turing1936',personId:'alan-turing',workId:'turing-computable-numbers',label:'1936 · 계산 절차와 보편 기계'},{id:'turing1948',personId:'alan-turing',workId:'turing-intelligent-machinery',label:'1948 · 비조직 기계와 학습 구상'},{id:'turing1950',personId:'alan-turing',workId:'turing-computing-machinery-intelligence',label:'1950 · 모방 게임과 학습하는 기계'}];
  window.AtlasTuringACEDesign=freeze({sources,views,nodes:views.flatMap(v=>v.nodes),delaySpec,sampleWords,initialClock,inspectClock,moveClock,chooseWord,selectInstruction,getView,select,bridges});
})();
