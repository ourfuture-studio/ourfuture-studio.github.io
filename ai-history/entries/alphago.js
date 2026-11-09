/* AlphaGo2016: learned policy/value guidance and explicit search, without claiming a Go engine or trained network run. */
(function(){
 'use strict';
 const paper='https://storage.googleapis.com/deepmind-media/alphago/AlphaGoNaturePaper.pdf';
 const source=(page,title)=>({title:'Silver 외 (2016) · '+title,url:paper+'#page='+page});
 const authors=['David Silver','Aja Huang','Christopher J. Maddison','Arthur Guez','Laurent Sifre','George van den Driessche','Julian Schrittwieser','Ioannis Antonoglou','Veda Panneershelvam','Marc Lanctot','Sander Dieleman','Dominik Grewe','John Nham','Nal Kalchbrenner','Ilya Sutskever','Timothy Lillicrap','Madeleine Leach','Koray Kavukcuoglu','Thore Graepel','Demis Hassabis'];
 const edge=(id,label,to,prior,rollout=prior)=>({id,label,to,prior,rollout});
 const nodes=[{id:'root',label:'처음 국면',player:1,value:0,edges:[edge('moveA','A','A',.60),edge('moveB','B','B',.25),edge('moveC','C','C',.15)]}];
 const branches=[{id:'A',value:.6,policy:[.7,.3],children:[{value:.7,rewards:[1,1]},{value:-.6,rewards:[-1,-1]}]},{id:'B',value:.2,policy:[.6,.4],children:[{value:.4,rewards:[1,0]},{value:.5,rewards:[1,-1]}]},{id:'C',value:0,policy:[.5,.5],children:[{value:.2,rewards:[1,-1]},{value:-.1,rewards:[0,-1]}]}];
 for(const branch of branches){nodes.push({id:branch.id,label:branch.id+' 뒤',player:-1,value:branch.value,edges:branch.children.map((_,i)=>edge(branch.id+'reply'+(i+1),branch.id+' 응수'+(i+1),branch.id+(i+1),branch.policy[i]))});branch.children.forEach((child,i)=>{const id=branch.id+(i+1);nodes.push({id,label:id,player:1,value:child.value,edges:child.rewards.map((_,j)=>edge(id+'play'+(j+1),id+' 진행'+(j+1),id+'end'+(j+1),j===0?.8:.2))});child.rewards.forEach((reward,j)=>nodes.push({id:id+'end'+(j+1),label:id+' 마지막'+(j+1),player:0,reward,edges:[]}));});}
 window.AtlasEntries.register({id:'alphago',record:{
  title:'AlphaGo · 배운 직관으로, 다음에 읽을 수를 정하다',subtitle:'Mastering the game of Go with deep neural networks and tree search',dateLabel:'2016-01 · Nature 논문',people:authors,
  authorNote:'David Silver와 Aja Huang은 원논문에서 동등 기여로 표시한 공동 제1저자다.20명 공동저자의 Nature529, pp.484–489 논문이며 Hassabis 한 사람의 발명으로 설명하지 않는다.2016년1월 논문의 Fan Hui 평가와 같은 해3월 이세돌 대국을 구분한다.',
  summary:'정책망은 읽어 볼 수의 분포를 주고 가치망은 국면을 평가했다. 이를 빠른 대국 전개와 나무 탐색에 연결해, 모든 수를 끝까지 계산하지 않으면서 다음 수를 찾게 했다.',detail:'',question:'',related:['backprop','alexnet','alphageometry'],
  sources:[{title:'Silver 외2016 · DeepMind 공개 원논문',url:paper},{title:'Google Research · 공식 출판 기록',url:'https://research.google/pubs/mastering-the-game-of-go-with-deep-neural-networks-and-tree-search/'}],
  caveat:'학습한 평가·정책과 명시적 탐색을 결합한 넓은 의미의 결합 연구다. 고전 논리 규칙을 학습한 좁은 의미의 신경 기호 시스템으로 단정하지 않는다. 아래는 작성한 작은 게임의 실제 탐색이며19×19바둑·학습 신경망을 실행한 결과가 아니다.'
 },content:{article:{
  question:'유망해 보이는 수를 배운 뒤에도,\n그다음에 일어날 일을 더 읽어 볼 수 있을까?',
  opening:[
   '바둑에서 가능한 모든 수를 마지막까지 읽기는 어렵다. 그렇다고 지금 그럴듯해 보이는 한 수만 바로 고르면 상대의 응수에서 드러나는 약점을 놓칠 수 있다. AlphaGo는 배운 직관으로 탐색을 안내하고, 탐색에서 얻은 결과로 그 직관을 다시 검토하게 했다.',
   '정책망은 지금 국면에서 어떤 수를 고려할지 분포를 준다. 이는 탐색의 폭을 줄이는 도움이다. 가치망은 더 읽은 국면에서 누가 유리할지 평가한다. 이는 모든 가지를 끝까지 펼쳐야 하는 깊이의 부담을 줄인다.2016년 AlphaGo는 빠른 정책으로 마지막까지 전개한 결과도 함께 사용했다. 서로 다른 두 평가를 섞어 나무의 경로에 되돌려 쌓았다.',
   '배움은 대국 전에 정책과 평가를 만들고, 탐색은 현재 국면에서 그 안내를 사용해 다음 수를 고른다. 사람의 기보를 예측하는 지도학습, 자기 대국의 승패를 이용한 강화학습, 자기 대국 국면의 가치를 예측하는 학습은 서로 다른 역할을 했다. 아래에서는 실제 바둑판 대신 작은 두 선수 게임을 끝까지 계산할 수 있게 만들어, 직관과 탐색이 어떻게 다른 결정을 낳을 수 있는지 살핀다.'
  ],
  visual:{id:'alphago-guided-search',navLabel:'직관과 탐색',title:'어디를 읽을지 안내하고, 읽어 본 결과로 판단을 바꾸다',caption:'처음 후보 A·B·C의 정책·가치·빠른 전개 분포와 마지막 결과는 모두 직접 정했습니다. 선택 점수, 경로, 평가 혼합, 방문수 갱신을 실제 계산하며 원논문의 네 단계와 연결합니다.',
   stages:[{id:'guide',label:'1 · 폭과 깊이의 안내',text:'정책은 어떤 수를 먼저 볼지, 가치는 더 읽은 국면을 어떻게 평가할지 안내한다. 배운 값은 탐색을 대신하는 정답이 아니다.'},{id:'simulate',label:'2 · 한 경로를 읽다',text:'현재 차례 기준의 선택 점수로 잎까지 가고, 가치와 빠른 전개를 평가한 뒤 그 경로의 방문수·평균을 갱신한다.'},{id:'decide',label:'3 · 누적 방문으로 고르다',text:'정책만 바로 따르는 결정과 탐색 뒤 최대 방문수로 고른 결정을 비교한다. 유한 게임의 완전한 해답은 별도로 확인한다.'}],
   game:{root:'root',nodes},initial:{budget:0,cpuct:1.5,lambda:.5,policyMode:'authored',seed:7},
   originalImage:{src:'alphago-2016-search-cycle.png',title:'원논문 Figure3 · 선택·확장·평가·되돌림 갱신',alt:'AlphaGo2016 Figure3의 네 도식. a 선택, b 확장, c 가치망과 빠른 전개 평가, d 경로에 결과를 되돌려 갱신하는 구조.',caption:'Figure3의 도식 네 패널만 원문 그대로 발췌했다. (a) Q와 정책 prior의 탐색 보너스로 경로를 선택하고, (b) 새 국면의 정책으로 후속 수의 분포를 얻고, (c) 가치와 빠른 전개로 잎을 평가하며, (d) 경로의 평가를 갱신한다. 원문 설명문은 그림 밖의 이 한국어 설명으로 바꾸었다.',credit:'David Silver 등20명, Nature529, 2016, 인쇄 p.486 / PDF p.3, Figure3(a–d). 원문 도식의 수식·배치를 보존한 발췌. 공개 재사용 라이선스는 확인하지 못했다.',source:source(3,'Figure3 · Monte Carlo tree search')},
   source:source(3,'검색 본문·Figure3와 Methods'),scope:'게임 나무는3단계·22상태·12종료 결과로 직접 작성했다. 마지막 결과+1·0·−1은 처음 선수 기준이며 실제 바둑 점수나 승률이 아니다. 고정 난수 시드로 빠른 전개를 샘플링한다. 모든 가치·정책은 작성한 표의 값이고 신경망 추론·학습을 실행하지 않는다. 직렬 탐색·즉시 확장·한 종류의 방문 통계를 사용하므로 원문의 병렬·비동기 APV-MCTS 전체 구현과 구분한다.'
  },
  takeaway:{title:'학습한 직관이 탐색할 곳을 좁히고, 탐색은 그 직관을 다시 시험한다',text:'AlphaGo는 후보를 제안하는 정책, 국면을 평가하는 가치, 마지막까지 전개하는 빠른 정책을 나무 탐색에 결합했다. 무엇을 먼저 볼지 배운 능력과, 현재 국면의 후속 경로를 실제 조사하는 계산이 서로 다른 일을 맡는다.'},
  technical:{title:'2016년 AlphaGo와 이 유한 탐색의 대응',paragraphs:[
   '논문과 평가 시점: 원논문은 Nature529, pp.484–489, 2016년1월 출판이다. 보고한 전문 기사 평가는 Fan Hui와의 대국이다.2016년3월 이세돌 대국이나2017년 AlphaGo Zero의 결과·학습 절차를 이 논문의 실험으로 옮기지 않는다. 원논문 PDF에는 본문6쪽 뒤 Methods와 ExtendedData가 이어져 총20쪽이다.',
   '어떤 표현을 배웠나: 본문pp.484–485와 Figure1은 사람의 기보에서 SL 정책 p_σ를 학습하고, 자기 대국의 승패를 최대화하도록 RL 정책 p_ρ를 개선하며, 그 자기 대국 국면에서 결과를 예측하는 가치망 v_θ를 학습하는 순서를 제시한다. 가치망은 완벽한 두 선수의 최적 결과 자체를 안다는 뜻이 아니라 학습한 대국 정책 아래의 결과를 근사한다.',
   '탐색에서 쓰는 정책의 구분:2016원문은 나무의 prior에 SL 정책 p_σ를 사용하고, 빠른 전개에는 더 가벼운 p_π를 사용한다. RL 정책을 그대로 모든 탐색의 prior로 썼다고 쓰지 않는다. 더 강한 RL 정책은 가치 학습에 필요한 자기 대국 자료를 만드는 데도 쓰였다. 서로 다른 정책의 목적과 실행 비용이 다르다.',
   '정책은 폭을, 가치는 깊이를 안내한다: 본문p.484는 정책이 행동 분포를 주어 고려할 가지를 줄이고, 가치가 국면을 평가해 그 아래 모든 수를 펼치는 부담을 줄인다고 설명한다. 여기의 작은 게임은 A·B·C 정책(.60,.25,.15)와 상태별 평가를 직접 정했다. 정책의 가장 큰 값은 그 수가 최적이라는 증명이 아니며, 값의 크기를 실제 AlphaGo의 착수 확률로 표시하지 않는다.',
   '한 경로의 선택: Methods Selection은 Q+u를 크게 하는 행동을 선택하고 u=c_puct·P·sqrt(형제 방문수 합)/(1+N)을 사용한다. 이 카드는 이를 직렬·단일 방문 통계로 계산한다. 방문수 합이0이면 보너스도0이므로 점수가 같은 경우 높은 prior, 그다음 작성한 순서를 따르는 자체 동률 규칙을 사용한다. c는0·.5·1.5·3 중 선택하며 원문의 실제 최적 설정을 재현한다고 주장하지 않는다.',
   '상대도 좋은 응수를 찾는다: 이 게임은 두 선수가 번갈아 움직이는 제로섬 게임이다. 내부 저장 Q는 처음 선수 기준의 평균이다. 상대 차례의 선택 점수에서는−Q를 써서 상대에게 유리한 수를 고른다. 모든 층에서 처음 선수에게 좋은 수만 고르면 상대가 협조하는 다른 문제가 된다. 이 관점의 부호는 코드와 표에서 함께 검사한다.',
   '잎 평가와 되돌림: 본문p.486은 V=(1−λ)v_θ+λz_L로 가치와 마지막 전개 결과를 섞는다. 이 카드에서는 고정 난수 시드의 분포 샘플링으로 실제 유한 전개를 끝까지 진행하고 결과를 얻는다. λ=0이면 가치만, λ=1이면 빠른 전개만 사용한다. 이미 종료 상태면 작성한 게임 결과를 사용한다. 방문 경로의 N을 늘리고 합계W에서 Q=W/N을 계산한다. 신경망의 가중치를 바꾸는 학습 갱신과 다른, 현재 탐색의 통계 갱신이다.',
   '완전한 작은 해답과 비교: 모든12종료 결과를 열거해 처음 선수는 최대·상대는 최소를 택하는 minimax 값을 별도로 구하면, A는−1, B는+1, C는0이다. 이 완전한 값은 탐색의 가치 추정이나 선택 점수에 사용하지 않고 비교에만 사용한다. 유한 예산의 탐색이 언제나 이 해답에 도달하거나 한 번 더 탐색할 때마다 개선된다는 보장은 하지 않는다.',
   '원래 APV-MCTS와 차이: Methods는 rollout·value 통계를 별도로 누적하고 비동기 평가를 혼합한다. virtual loss로 병렬 경로 중복을 조절하고, 방문 문턱과 계산 대기열에 맞춰 확장한다. 이 카드는 매번 처음 만난 비종료 잎을 즉시 확장하고, 가치·전개를 같은 직렬 단계에서 평가한다. placeholder 정책, 비동기 GPU 평가, 트리 재사용, 실제 바둑 규칙 엔진은 구현하지 않는다.',
   '결합 연구라는 분류의 의미: 이 카드는 신경 학습과 명시적 탐색을 결합한 넓은 연구 흐름에 AlphaGo를 둔다. 고전 논리 프로그램이나 지식 그래프와 신경망을 연결한 연구와 동일한 좁은 정의를 가정하지 않는다. 이 사례가 보여 주는 연결은 배운 정책·평가와 게임 나무 탐색이다.'
  ],formula:'선택: 현재 차례의 Q + u\nu = c·P·sqrt(형제 방문수 합)/(1+N)\n\n잎 평가 V = (1−λ)·가치 + λ·빠른 전개 결과\nN ← N+1\nW ← W+V\nQ ← W/N\n\n이 보기의 저장 Q: 처음 선수 기준\n상대 차례의 선택: −Q + u\n다음 수: 루트에서 누적 방문수가 가장 큰 행동\n\n정책 prior ≠ 최적 수의 증명\n탐색 통계의 갱신 ≠ 신경망의 학습 갱신'}
 },keyIdeas:[{title:'유망한 수를 배우고, 더 읽을 곳을 정한다',text:'정책은 행동 분포를 주어 탐색의 폭을 안내한다. prior와 실제 방문 결과는 다른 정보다.'},{title:'끝까지 읽지 않고도 국면을 평가한다',text:'가치망의 근사 평가와 빠른 전개의 결과를 섞어 잎에서 평가를 얻는다. 한 가지 평가만 쓰는 경우도 비교한다.'},{title:'상대의 응수와 방문 기록으로 결정을 고친다',text:'현재 차례에 유리한 경로를 조사하고 결과를 되돌려 쌓는다. 마지막에는 루트의 누적 방문수로 다음 수를 고른다.'}],videos:[],references:[
  {title:'Silver 외 · AlphaGo 원논문 ·2016',url:paper,location:'Nature529:484–489, DOI10.1038/nature16961.20쪽 공개 PDF, 본문6쪽+Methods·ExtendedData. 표제·20저자·동등 기여는 PDFp.1.'},
  {title:'AlphaGo · 학습의 단계와 역할',url:paper+'#page=1',location:'본문pp.484–486 / PDFpp.1–3, Figure1과 SL·RL정책·가치 학습. 나무 prior의 SL정책과 가치 자료의 RL정책을 구분.'},
  {title:'AlphaGo · Figure3와 혼합 평가',url:paper+'#page=3',location:'본문p.486 / PDFp.3. 정책+가치의 탐색, 네 단계, V=(1−λ)v+λz. 도식 패널만 발췌.'},
  {title:'AlphaGo · Methods의 APV-MCTS',url:paper+'#page=7',location:'Methods, PDFpp.7–8. Selection·Evaluation·Backup·Expansion, PUCT, 별도 value·rollout 통계, virtual loss, 비동기 확장, 최대 방문수 결정.'},
  {title:'Google Research · 공식 서지와 공동저자',url:'https://research.google/pubs/mastering-the-game-of-go-with-deep-neural-networks-and-tree-search/',location:'논문명·Nature2016·공동저자 대조.'},
  {title:'Google DeepMind · AlphaGo 연구 소개',url:'https://deepmind.google/research/alphago/',location:'정책·가치와 탐색의 역할, Fan Hui2015경기와2016년3월 이세돌 대국의 시점 구분. 원논문의 방법·수치를 대신하는 자료로 사용하지 않음.'}
 ]}});
})();

