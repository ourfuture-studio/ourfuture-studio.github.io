/* Turing 1936 §3 Example I, an authored unary successor and §5 forward encoding.
 * A pure, bounded table interpreter; not a reconstruction of the §7 machine U.
 */
(function(){
  'use strict';
  const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
  const limits=freeze({steps:64,nonblank:128,coordinate:256,window:11,rules:32,states:16});
  const sources=freeze({
    machine:{title:'Turing (1936) · 기계와 완전한 구성',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=2',location:'§1–2 · 인쇄 pp.231–233. 한 칸의 스캔 기호와 유한 m-상태, 완전한 구성과 figures/다른 기호의 구분.'},
    example:{title:'Turing (1936) · Example I의 네 행',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=4',location:'§3 · 인쇄 p.233, PDF p.4. b/c/e/f는 프락투어 m-상태의 라틴 전사. 네 행 모두 None(빈칸) 조건.'},
    squares:{title:'Turing (1936) · F칸과 E칸',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=6',location:'§3 · 인쇄 p.235. 번갈아 쓰는 F/E칸의 위치 역할. F칸이라는 이름 자체가 언제나 0·1만 허용한다는 뜻은 아님.'},
    encoding:{title:'Turing (1936) · 표준 기술과 기술수',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=11',location:'§5 · 인쇄 pp.239–241. q_i→DA^i, S_j→DC^j, S.D.와 D.N. 부호화. PDF p.12의 Example I 문자열·숫자를 대조.'},
    universal:{title:'Turing (1936) · 보편 기계의 구성',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=12',location:'§6 · 인쇄 pp.241–242와 §7 도입 p.243. S.D.를 입력으로 받아 같은 figure 수열을 계산하는 U. §7의 전체 표는 p.246까지 이어지며 이 화면은 원문 U의 동작표를 실행하지 않음.'},
    circle:{title:'Turing (1936) · circle-free와 판정의 한계',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=4',location:'§2 · 인쇄 p.233, §8 · pp.246–248. circle-free는 무한히 많은 figure를 쓰는 성질. 유한 실행·무한 움직임·현대적 정지를 같은 정의로 합치지 않음.'},
    human:{title:'Turing (1936) · 사람의 계산을 분석한 논증',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=20',location:'§9 I · 인쇄 pp.249–252. 한 번에 관찰하는 칸 수 B·유한 상태·이동 거리 L의 한도에서 단순한 계산 절차로 분석. 뇌의 생물학적 복제가 아님.'},
    decision:{title:'Turing (1936) · 결정문제로 이어지는 결과',url:'https://people.csail.mit.edu/brooks/idocs/Turing_Paper_1936.pdf#page=30',location:'§11 · 인쇄 pp.259–262. 보편 기계의 구성과 모든 논리식의 증명 가능성 판정은 다른 문제.'}
  });
  const role=(id,label,input,idea,output,sourceIds)=>({id,label,input,role:idea,output,sourceIds});
  const views=freeze([
    {id:'procedure',label:'01 사람의 계산에서 기계적 절차로',title:'종이에 계산하는 사람에게서, 무엇을 남겨야 할까?',intro:'계산의 결과보다 그 사람이 한 번에 무엇을 보고, 무엇을 기억하고, 어떤 규칙으로 다음 행동을 정하는지 분리합니다.',initial:'scanned',nodes:[
      role('paper','기억을 종이에 남기다','종이에 쓴 기호와 중간 결과','머릿속에 모든 값을 보관하는 대신 종이에 표시를 남긴다. 튜링은 이 외부 기록을 칸으로 나눈 테이프로 표현했다. 모형에는 마지막 칸을 미리 정하지 않고 필요한 만큼 기록을 이어 쓸 수 있게 둔다.','필요할 때 더 사용할 수 있는 기록 공간',['human','machine']),
      role('scanned','눈앞에서 읽는 기호','지금 관찰하는 작은 부분','§1의 기계는 지금 스캔하는 한 칸의 기호만 직접 읽는다. §9의 정당화에서는 사람이 한 번에 관찰할 수 있는 B칸의 한도에서 출발해 단순 모형으로 옮긴다.','이번 규칙에 주어지는 스캔 기호',['human','machine']),
      role('memory','유한한 m-상태','같은 기호라도 달라지는 계산 단계','지금 무엇을 하는 중인지 유한한 상태로 구분한다. 상태는 숫자 전체를 숨겨 넣는 무한한 기억이 아니라 다음 동작을 구별하는 역할을 맡는다.','현재 기호와 함께 규칙을 고르는 조건',['machine','human']),
      role('instructions','기호와 상태로 규칙을 고르다','m-상태와 스캔 기호의 쌍','동작표의 조건이 맞는 행을 찾는다. §2의 configuration은 이 조건쌍이며, 테이프 전체·스캔 위치·m-상태를 포함한 complete configuration과 구분된다.','이번에 적용할 동작표의 한 행',['machine','example']),
      role('local-action','작은 쓰기·이동·상태 변경','선택한 행의 동작','현재 칸에 기호를 쓰거나 지우고, 스캔 위치를 한 칸 옮기며 상태를 바꾼다. 원문 표의 P0,R 같은 한 행에는 쓰기와 이동이 차례로 포함된다.','변경한 기호·새 머리 위치·새 상태',['machine','example']),
      role('configuration','다음 구성을 다시 읽다','테이프 기록·스캔 위치·상태','한 행을 실행한 결과가 다음 행의 입력 조건을 만든다. 같은 국소 절차의 반복으로 긴 계산을 표현하려 한 것이며 사람의 지능 전체를 정의한 그림은 아니다.','계속 이어 갈 수 있는 계산 절차',['machine','human'])
    ]},
    {id:'source-table',label:'02 원논문 동작표를 실행하기',title:'네 행을 따라가면, 빈칸 사이에 0과 1이 남는다',intro:'§3 Example I의 네 행을 직접 재구성했습니다. None은 빈칸 조건입니다. 조건 열을 아예 비워 두는 원문의 모든 기호 조건과 다릅니다.',initial:'row-b',nodes:[
      role('blank-start','빈 테이프에서 시작','원문의 초기 m-상태 b','처음에는 테이프가 비어 있고 b에서 시작한다. 화면의 칸 번호 0은 위치를 읽기 위해 직접 정한 기준이다.','b와 빈칸이 첫 행을 선택',['example']),
      role('row-b','b: 0을 쓰고 오른쪽으로','b · None','P0를 실행한 뒤 R로 한 칸 옮기고 c로 바뀐다. 다음 칸은 아직 비어 있으며 지금 쓴 0은 이전 칸에 남는다.','0이 있는 칸과 c 상태',['example']),
      role('row-c','c: 쓰지 않고 오른쪽으로','c · None','현재 빈칸에는 아무것도 쓰지 않고 R만 실행한 뒤 e로 바뀐다. 숫자 사이에 빈칸이 생기는 이유다.','빈칸을 건너 e 상태',['example']),
      role('row-e','e: 1을 쓰고 오른쪽으로','e · None','P1 다음에 R을 실행하고 f로 바뀐다. b와 같은 빈칸을 읽었어도 상태가 달라 다른 숫자를 쓴다.','다음 figure 1과 f 상태',['example']),
      role('row-f','f: 빈칸을 지나 b로','f · None','R로 한 칸 옮기고 b로 되돌아간다. 네 행이 반복될 때 숫자가 놓이는 칸과 그 사이 칸이 번갈아 나타난다.','다음 0을 쓸 새 위치',['example']),
      role('figures','숫자만 읽으면 0101…','테이프의 0·1과 중간 빈칸','이 예제에서 figure는 0과 1이다. 짝수 칸에 figure가 놓이고 그 사이의 E칸은 비어 있다. F/E는 칸의 역할이고 figures/다른 기호는 기호의 종류다.','원문이 계산하는 figure 수열',['machine','example','squares'])
    ]},
    {id:'universal',label:'03 기계의 설명도 입력으로',title:'기계를 바꾸는 대신, 읽게 할 동작표를 바꿀 수 있을까?',intro:'아래 공통 실행기는 규칙표를 자료로 읽습니다. 원문의 S.D./D.N. 전방 부호화도 대조하지만, §7의 U 자체를 실행하는 것은 아닙니다.',initial:'table-as-data',nodes:[
      role('table-as-data','동작표를 자료로 적다','유한한 상태·기호·동작의 표','계산의 절차가 유한한 표라면 그 표 자체도 기호열로 적을 수 있다. 화면에서는 원문 네 행과 직접 만든 일진수 +1 표를 같은 형식의 자료로 교체한다.','다른 계산을 지정하는 입력 자료',['encoding','universal']),
      role('standard-description','S.D.: 표의 표준 기술','정규화한 표의 각 행','상태 q_i를 D와 i개의 A, 기호 S_j를 D와 j개의 C로 적고 행 사이에 세미콜론을 둔다. 원문의 R 단독 행도 빈칸을 다시 쓰는 PS0,R로 정규화할 수 있다.','유한 알파벳으로 적은 기계의 설명',['encoding']),
      role('description-number','D.N.: 설명을 숫자로','S.D.의 A C D L R N ;','각 문자를 1·2·3·4·5·6·7로 바꾸면 기술수가 된다. 모든 정수가 유효한 기계의 기술수인 것은 아니며, 같은 수열을 만드는 다른 표는 다른 기술수를 가질 수 있다.','표를 지시하는 수의 표현',['encoding']),
      role('same-interpreter','한 실행기로 다른 표 읽기','바꾼 규칙표와 초기 기록','공통 해석기는 현재 상태와 읽은 기호로 행을 찾아 같은 쓰기·이동·상태 변경을 수행한다. 이 현대식 구현은 설명을 입력으로 읽는 발상을 보여 준다.','원문 수열 또는 자체 일진수 +1',['universal','encoding']),
      role('simulation','바뀌는 구성을 함께 기록','현재 테이프·머리 위치·m-상태','§6은 계산 대상 기계의 완전한 구성을 기술하고 그 변화와 새 figure를 기록하는 구성으로 U의 발상을 설명한다. 여기서는 그 역할을 상태 패널과 실행 기록으로 나누어 보인다.','다음에 모사할 구성',['universal','machine']),
      role('limits','계산 가능성과 판정의 한계','정해진 실행과 임의 기계의 질문','원문 예제는 계속 새 figure를 쓰고, 자체 +1 표는 지정한 정지 상태에 도달한다. 무한히 움직이면서 figure를 더 쓰지 않는 기계도 circular일 수 있다. 유한 실행 한도는 임의 기계의 circle-free 판정이나 정지 증명이 아니다.','정해진 계산과 보편 판정의 구별',['circle','decision'])
    ]}
  ]);
  const rule=(id,state,scanned,write,move,next)=>({id,state,scanned,write,move,next,notation:(write===null?'':write===''?'E, ':'P'+write+', ')+(move===0?'N':move===1?'R':'L')});
  const programs=freeze([
    {id:'original',label:'원문 · 네 상태의 0101…',origin:'Turing (1936) §3 Example I',states:['b','c','e','f'],haltStates:[],initialState:'b',initialHead:0,initialTape:[],rules:[rule('b-blank','b','','0',1,'c'),rule('c-blank','c','',null,1,'e'),rule('e-blank','e','','1',1,'f'),rule('f-blank','f','',null,1,'b')],sourceIds:['example'],scope:'원문 네 행·빈칸 조건을 보존했습니다. b/c/e/f는 라틴 전사입니다. 쓰기 없는 R 행과 숫자 사이 빈칸을 유지합니다.'},
    {id:'unary-plus-one',label:'자체 · 일진수에 1 더하기',origin:'직접 구성한 두 상태 표 · 원논문 Example I가 아님',states:['scan','halt'],haltStates:['halt'],initialState:'scan',initialHead:0,initialTape:[[0,'1'],[1,'1'],[2,'1']],rules:[rule('scan-one','scan','1','1',1,'scan'),rule('append-one','scan','','1',0,'halt')],sourceIds:['universal'],scope:'scan과 halt 두 상태를 직접 정했습니다. 연속한 1을 따라 오른쪽으로 가서 첫 빈칸에 1을 쓰고 지정한 정지 상태로 갑니다. 실제 일진수 길이의 +1 계산입니다.'}
  ]);
  const textSymbol=x=>['','0','1'].includes(x);
  function getProgram(id){const p=programs.find(p=>p.id===id);if(!p)throw new RangeError('알려진 기계 표를 선택하세요.');return p;}
  function programRead(value){
    const p=typeof value==='string'?getProgram(value):value;
    if(!p||typeof p!=='object'||!Array.isArray(p.states)||!p.states.length||p.states.length>limits.states||new Set(p.states).size!==p.states.length||!p.states.every(s=>typeof s==='string'&&/^[A-Za-z][A-Za-z0-9-]{0,20}$/.test(s))||!Array.isArray(p.haltStates)||p.haltStates.some(s=>!p.states.includes(s))||!p.states.includes(p.initialState)||!Array.isArray(p.rules)||p.rules.length>limits.rules)throw new TypeError('유한한 상태와 동작표가 필요합니다.');
    for(const state of p.states)if(typeof state!=='string'||!/^[A-Za-z][A-Za-z0-9-]{0,20}$/.test(state))throw new TypeError('상태의 이름을 빠짐없이 적어야 합니다.');
    for(const state of p.haltStates)if(!p.states.includes(state))throw new TypeError('정지 상태도 정의한 상태여야 합니다.');
    const pairs=new Set(),ids=new Set();for(const r of p.rules){if(!r||typeof r.id!=='string'||!r.id||ids.has(r.id))throw new TypeError('동작표의 각 행에는 서로 다른 이름이 필요합니다.');const key=r.state+'|'+r.scanned;if(!p.states.includes(r.state)||!p.states.includes(r.next)||p.haltStates.includes(r.state)||!textSymbol(r.scanned)||!(r.write===null||textSymbol(r.write))||![-1,0,1].includes(r.move)||pairs.has(key))throw new TypeError('결정적인 한 칸 동작표가 필요합니다.');pairs.add(key);ids.add(r.id);}return p;
  }
  function readState(program,state){
    const p=programRead(program);if(!state||typeof state!=='object'||!Array.isArray(state.tape)||state.tape.length>limits.nonblank||!p.states.includes(state.mconfig)||!Number.isInteger(state.head)||Math.abs(state.head)>limits.coordinate||!Number.isInteger(state.steps)||state.steps<0||state.steps>limits.steps)throw new TypeError('표시 범위 안의 테이프·위치·상태가 필요합니다.');
    const positions=new Set(),tape=[];for(const pair of state.tape){if(!Array.isArray(pair)||pair.length!==2||!Number.isInteger(pair[0])||Math.abs(pair[0])>limits.coordinate||!['0','1'].includes(pair[1])||positions.has(pair[0]))throw new TypeError('서로 다른 위치의 0·1 기록이 필요합니다.');positions.add(pair[0]);tape.push([pair[0],pair[1]]);}tape.sort((a,b)=>a[0]-b[0]);return {tape,head:state.head,mconfig:state.mconfig,steps:state.steps};
  }
  function initial(program='original',options={}){
    const p=programRead(program);if(!options||typeof options!=='object'||Array.isArray(options)||Object.keys(options).some(k=>k!=='unary'))throw new TypeError('일진수 길이 옵션만 사용합니다.');
    let tape=p.initialTape||[];if(Object.hasOwn(options,'unary')){if(p.id!=='unary-plus-one'||!Number.isInteger(options.unary)||options.unary<0||options.unary>31)throw new RangeError('자체 일진수 길이는 0–31입니다.');tape=Array.from({length:options.unary},(_,i)=>[i,'1']);}
    return freeze(readState(p,{tape,head:p.initialHead??0,mconfig:p.initialState,steps:0}));
  }
  function scanned(state){return state.tape.find(x=>x[0]===state.head)?.[1]||'';}
  function inspect(program,state){
    const p=programRead(program),s=readState(p,state),symbol=scanned(s),r=p.rules.find(r=>r.state===s.mconfig&&r.scanned===symbol)||null;
    const status=p.haltStates.includes(s.mconfig)?'halted':s.steps>=limits.steps?'display-limit':!r?'no-listed-rule':'ready';
    return freeze({state:s,symbol,rule:r,status,figures:s.tape.map(x=>x[1]).join(''),nonblank:s.tape.length,decidesArbitraryHalting:false});
  }
  function step(program,state){
    const p=programRead(program),current=inspect(p,state),before=current.state;
    if(current.status!=='ready')return freeze({before,after:before,rule:null,status:current.status});
    const r=current.rule,tape=new Map(before.tape);if(r.write!==null){if(r.write==='')tape.delete(before.head);else tape.set(before.head,r.write);}
    const head=before.head+r.move;if(Math.abs(head)>limits.coordinate||tape.size>limits.nonblank)return freeze({before,after:before,rule:null,status:'display-limit'});
    const after=readState(p,{tape:[...tape],head,mconfig:r.next,steps:before.steps+1});
    return freeze({before,after,rule:r,status:'stepped',operation:{read:current.symbol,write:r.write,move:r.move,fromState:before.mconfig,toState:r.next,fromHead:before.head,toHead:head}});
  }
  function run(program,state,count){
    programRead(program);readState(program,state);if(!Number.isInteger(count)||count<0||count>limits.steps)throw new RangeError('실행 횟수는 0–64의 정수입니다.');
    const transitions=[];let current=state,stopReason='count-complete';
    for(let i=0;i<count;i++){const t=step(program,current);if(t.status!=='stepped'){stopReason=t.status;break;}transitions.push(t);current=t.after;}
    const final=inspect(program,current);if(final.status!=='ready')stopReason=final.status;
    return freeze({state:final.state,transitions,requested:count,executed:transitions.length,stopReason,decidesArbitraryHalting:false});
  }
  function tapeWindow(program,state){
    const s=readState(program,state),start=s.head<6&&s.head>=0?0:s.head-5;
    return freeze(Array.from({length:limits.window},(_,i)=>{const position=start+i;return{position,symbol:s.tape.find(x=>x[0]===position)?.[1]||'',head:position===s.head,squareRole:programRead(program).id==='original'?(position%2===0?'F':'E'):null};}));
  }
  function encoding(program='original'){
    const p=programRead(program),q=s=>'D'+'A'.repeat(p.states.indexOf(s)+1),sym=s=>'D'+'C'.repeat(s===''?0:s==='0'?1:2),rows=p.rules.map(r=>{const written=r.write===null?r.scanned:r.write,move=r.move===1?'R':r.move===-1?'L':'N',normalized='q'+(p.states.indexOf(r.state)+1)+' S'+(r.scanned===''?0:r.scanned==='0'?1:2)+' P(S'+(written===''?0:written==='0'?1:2)+'),'+move+' q'+(p.states.indexOf(r.next)+1),sd=q(r.state)+sym(r.scanned)+sym(written)+move+q(r.next)+';';return{ruleId:r.id,normalized,sd};});
    const sd=rows.map(r=>r.sd).join(''),digits={A:'1',C:'2',D:'3',L:'4',R:'5',N:'6',';':'7'},dn=[...sd].map(c=>digits[c]).join('');
    return freeze({rows,sd,dn,executesEncodedU:false,scope:'§5의 정규화·전방 부호화만 계산합니다. 실행기는 이 문자열을 해독하지 않고 위의 현대식 규칙표 자료를 읽습니다.'});
  }
  const getView=id=>{const v=views.find(v=>v.id===id);if(!v)throw new RangeError('알려진 보기를 선택하세요.');return v;};
  const select=(viewId,id)=>{const v=getView(viewId),n=v.nodes.find(n=>n.id===id);if(!n)throw new RangeError('현재 보기의 항목을 선택하세요.');return n;};
  const bridges=freeze([
    {id:'church',type:'work',personId:'alonzo-church',workId:'church-calculability-1936',label:'처치 · 수를 함수로 표현하는 계산'},
    {id:'newman',type:'work',personId:'max-newman',workId:'newman-decision-1935',label:'뉴먼 · 결정문제의 질문'},
    {id:'turing1950',type:'work',personId:'alan-turing',workId:'turing-computing-machinery-intelligence',label:'튜링 1950 · 학습하는 기계의 질문'}
  ]);
  window.AtlasTuringMechanicalProcedure=freeze({limits,sources,views,nodes:views.flatMap(v=>v.nodes),programs,bridges,getView,select,getProgram,initial,inspect,step,run,tapeWindow,encoding});
})();
