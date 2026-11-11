/* Discrete native HTML/SVG views of a bounded, actually executed rule table. */
(function(){
  'use strict';
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const svg=(tag,attrs={},text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;};
  const button=(text,fn,cls='')=>{const n=el('button',cls,text);n.type='button';n.addEventListener('click',fn);return n;};
  function mount(host){
    const core=window.AtlasTuringMechanicalProcedure,root=el('div','turing-mechanical-procedure');host.append(root);
    let viewId='procedure',roleId=core.getView(viewId).initial,programId='original',unary=3,history=[core.initial()],transitions=[],lastRun=null;
    const tabs=el('nav','tmp-tabs');tabs.setAttribute('aria-label','계산 절차의 세 보기');
    const title=el('h4','tmp-title'),intro=el('p','tmp-intro'),diagram=el('div','tmp-diagram'),roles=el('div','tmp-roles');roles.setAttribute('role','group');roles.setAttribute('aria-label','핵심 아이디어 선택');
    const detail=el('section','tmp-detail');detail.setAttribute('aria-live','polite');detail.setAttribute('aria-label','선택한 핵심 아이디어와 근거');
    const machine=el('section','tmp-machine'),programBar=el('div','tmp-programs'),inputBar=el('div','tmp-inputs');programBar.setAttribute('role','group');programBar.setAttribute('aria-label','같은 해석기에 주는 동작표');inputBar.setAttribute('role','group');inputBar.setAttribute('aria-label','자체 일진수 입력 길이');
    const machineTitle=el('h5','tmp-machine-title'),machineOrigin=el('p','tmp-origin'),machineGrid=el('div','tmp-machine-grid'),left=el('div','tmp-execution'),right=el('div','tmp-table-panel');
    const status=el('p','tmp-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.dataset.tmpStatus='';
    const configuration=el('div','tmp-configuration'),tape=el('div','tmp-tape-scroll');tape.tabIndex=0;tape.setAttribute('role','region');tape.setAttribute('aria-label','테이프의 열한 칸. 필요한 위치의 주변만 표시합니다. 가로로 이동할 수 있습니다.');
    const output=el('div','tmp-output'),action=el('div','tmp-action'),controls=el('div','tmp-controls'),trace=el('ol','tmp-trace');trace.setAttribute('aria-label','최근 실행한 동작표의 행');
    for(const[id,label,count]of[['back','이전 구성',-1],['reset','처음으로',0],['step','규칙 한 행 실행 →',1],['run8','8회 실행',8],['run16','16회 실행',16]]){const b=button(label,()=>execute(id,count));b.dataset.tmpControl=id;controls.append(b);}
    left.append(configuration,tape,output,action,controls,status,trace);right.append(el('span','tmp-eyebrow','현재 상태 + 읽는 기호 → 동작 + 다음 상태'));
    const table=el('table','tmp-rule-table');table.setAttribute('aria-label','현재 선택한 기계의 동작표');const thead=el('thead'),head=el('tr');for(const text of ['m-상태','읽는 기호','동작 순서','다음 상태'])head.append(el('th','',text));thead.append(head);const tbody=el('tbody');table.append(thead,tbody);const tableLegend=el('p','tmp-table-legend','테두리: 다음에 적용할 행 · 옅은 바탕: 방금 적용한 행');right.append(table,tableLegend);machineGrid.append(left,right);
    const encodingBox=el('section','tmp-encoding'),encodingTitle=el('h5','','동작표를 기호열로, 기호열을 기술수로'),encodingRows=el('div','tmp-encoding-rows'),encodingCode=el('div','tmp-encoding-code');encodingBox.append(el('span','tmp-eyebrow','§5의 전방 부호화 · §7 U 실행과 구분'),encodingTitle,el('p','','상태 qᵢ → D와 i개의 A · 기호 Sⱼ → D와 j개의 C. 빈칸=S₀, 0=S₁, 1=S₂. 아래에서는 원문의 R 단독 행을 P(S₀),R로 정규화한 대응도 볼 수 있습니다.'),encodingRows,encodingCode);
    const scope=el('p','tmp-scope');machine.append(programBar,inputBar,machineTitle,machineOrigin,machineGrid,encodingBox,scope);
    const sources=el('div','tmp-sources'),bridge=el('section','tmp-bridges');bridge.append(el('h5','','표현이 다른 계산, 그리고 이후의 지능 질문'));
    for(const b of core.bridges){const a=el('a','',b.label+' ↗');a.href='#person='+b.personId+'&work='+b.workId;a.dataset.tmpBridge=b.id;a.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset(false);window.dispatchEvent(new CustomEvent('atlas:open-work',{detail:{personId:b.personId,workId:b.workId,filter:'all'}}));});bridge.append(a);}
    root.append(tabs,title,intro,diagram,roles,detail,machine,sources,bridge);
    for(const v of core.views){const b=button(v.label,()=>{viewId=v.id;roleId=v.initial;if(viewId==='source-table'&&programId!=='original')loadProgram('original');renderView();},'tmp-tab');b.dataset.tmpView=v.id;tabs.append(b);}
    for(const p of core.programs){const b=button(p.label,()=>{loadProgram(p.id);renderMachine();});b.dataset.tmpProgram=p.id;programBar.append(b);}
    for(const n of [1,3,5]){const b=button('입력 '+n+'개 → '+(n+1)+'개',()=>{unary=n;loadProgram('unary-plus-one');renderMachine();});b.dataset.tmpUnary=String(n);inputBar.append(b);}
    function state(){return history.at(-1);}
    function loadProgram(id){programId=id;history=[core.initial(id,id==='unary-plus-one'?{unary}: {})];transitions=[];lastRun=null;}
    function execute(id,count){
      if(id==='reset')loadProgram(programId);
      else if(id==='back'){if(history.length>1){history.pop();transitions.pop();}lastRun=null;}
      else{const result=core.run(programId,state(),count);for(const t of result.transitions){transitions.push(t);history.push(t.after);}lastRun=result;}
      renderMachine();
    }
    function choose(id){core.select(viewId,id);roleId=id;renderDetail();renderDiagram();}
    function renderView(){const v=core.getView(viewId);title.textContent=v.title;intro.textContent=v.intro;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.tmpView===viewId));roles.replaceChildren();for(const n of v.nodes){const b=button(n.label,()=>choose(n.id),'tmp-role');b.dataset.tmpNode=n.id;roles.append(b);}machine.hidden=viewId==='procedure';programBar.hidden=viewId!=='universal';encodingBox.hidden=viewId!=='universal';
      // The paper's running machine is the main figure of view02, immediately
      // after its question. Other views retain the conceptual drawing first.
      root.replaceChildren(tabs,title,intro,...(viewId==='source-table'?[machine,diagram,roles,detail]:[diagram,roles,detail,machine]),sources,bridge);
      renderDetail();renderDiagram();if(!machine.hidden)renderMachine();}
    function renderDetail(){
      const n=core.select(viewId,roleId);for(const b of roles.children)b.setAttribute('aria-pressed',String(b.dataset.tmpNode===roleId));
      detail.replaceChildren(el('span','tmp-eyebrow',n.input),el('h5','',n.label),el('p','',n.role),el('p','tmp-result-line','이어지는 것 · '+n.output));
      sources.replaceChildren();for(const id of n.sourceIds){const s=core.sources[id],box=el('div'),a=el('a','',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';box.append(a,el('span','',s.location));sources.append(box);}
    }
    function activeGroup(image,id,label,draw){const group=svg('g',{'data-tmp-drawing-node':id,role:'button',tabindex:'0','aria-label':label,'aria-pressed':String(id===roleId),'class':'tmp-concept'+(id===roleId?' is-selected':'')});draw(group);group.addEventListener('click',()=>choose(id));group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(id);}});image.append(group);}
    function box(g,x,y,w,h,caption){g.append(svg('rect',{x,y,width:w,height:h,rx:7,'class':'tmp-concept-box'}));if(caption)g.append(svg('text',{x:x+15,y:y+24,'class':'tmp-svg-label'},caption));}
    function text(g,x,y,value,cls='tmp-svg-text'){g.append(svg('text',{x,y,'class':cls},value));}
    function arrow(g,x1,y1,x2,y2){g.append(svg('path',{d:'M '+x1+' '+y1+' L '+x2+' '+y2+' m -8 -5 8 5 -8 5','class':'tmp-svg-arrow'}));}
    function renderDiagram(){
      diagram.replaceChildren();diagram.hidden=viewId==='source-table';if(diagram.hidden)return;
      const image=svg('svg',{viewBox:viewId==='procedure'?'0 0 900 520':'0 0 900 220',role:'group','aria-label':viewId==='procedure'?'사람의 종이 계산에서 테이프·스캔칸·상태·동작표로 옮긴 자체 그림':'동작표 자료를 공통 실행기로 읽고 구성을 바꾸는 자체 그림'});
      if(viewId==='procedure'){
        text(image,35,30,'사람이 종이에 계산할 때','tmp-svg-heading');text(image,520,30,'남겨 놓은 기계적 절차','tmp-svg-heading');
        activeGroup(image,'paper','종이 기록과 확장할 테이프',g=>{box(g,35,52,335,118,'종이에 남긴 계산');for(let i=0;i<7;i++)g.append(svg('path',{d:'M '+(52+i*42)+' 90 V 154','class':'tmp-paper-grid'}));for(let i=0;i<3;i++)g.append(svg('path',{d:'M 48 '+(93+i*28)+' H 354','class':'tmp-paper-grid'}));text(g,84,115,'2     7');text(g,68,143,'+ 1     5');g.append(svg('path',{d:'M 319 88 l 8 8 -29 29 -13 5 5 -13 z M 290 117 l 8 8','class':'tmp-eye'}));arrow(g,385,110,495,110);box(g,520,52,335,118,'칸으로 나눈 외부 기록');for(let i=0;i<7;i++){g.append(svg('rect',{x:535+i*43,y:103,width:43,height:41,'class':'tmp-mini-square'}));text(g,548+i*43,130,['0','□','1','□','0','□','…'][i]);}});
        activeGroup(image,'scanned','지금 보는 작은 부분과 스캔칸',g=>{box(g,35,187,335,85,'눈앞에서 한 부분을 읽기');g.append(svg('path',{d:'M 83 235 Q 111 210 139 235 Q 111 260 83 235','class':'tmp-eye'}),svg('circle',{cx:111,cy:235,r:6,'class':'tmp-pupil'}));text(g,165,241,'지금 읽는 자리');arrow(g,385,230,495,230);box(g,520,187,335,85,'§1 · 지금 스캔하는 한 칸');g.append(svg('rect',{x:667,y:218,width:42,height:39,'class':'tmp-mini-selected'}));text(g,681,244,'□');text(g,732,243,'↑ 읽기');});
        activeGroup(image,'memory','기억하는 계산 단계와 유한 상태',g=>{box(g,35,290,335,75,'지금 어느 단계를 하는가');text(g,53,343,'다음 자리 / 받아올림 같은 구분');arrow(g,385,330,495,330);box(g,520,290,335,75,'유한한 m-상태');text(g,540,343,'b   →   c   →   e   →   f');});
        activeGroup(image,'instructions','기호와 상태의 조건에서 동작표의 행으로',g=>{box(g,35,385,335,96,'계산 방법의 규칙');text(g,53,443,'읽기 + 계산 단계 → 다음 행동');arrow(g,385,430,495,430);box(g,520,385,335,96,'동작표 · 상태와 기호를 함께');text(g,540,443,'b + 빈칸  →  P0, R  →  c');});
        // These two small callouts connect the rule selection to its repeated effect.
        activeGroup(image,'local-action','한 행의 쓰기와 이동',g=>{g.append(svg('rect',{x:531,y:483,width:150,height:29,rx:4,'class':'tmp-concept-box'}));text(g,542,503,'쓰기 · 한 칸 이동','tmp-svg-small');});
        activeGroup(image,'configuration','다음 구성으로 반복',g=>{g.append(svg('rect',{x:692,y:483,width:163,height:29,rx:4,'class':'tmp-concept-box'}));text(g,703,503,'새 상태로 다시 읽기','tmp-svg-small');});
      }else{
        const labels=[['table-as-data','동작표 자료',35,38],['standard-description','S.D. 표준 기술',300,38],['description-number','D.N. 기술수',585,38],['same-interpreter','같은 해석기',35,139],['simulation','바뀌는 구성',300,139],['limits','판정의 한계',585,139]];
        for(const[id,label,x,y]of labels)activeGroup(image,id,label,g=>{box(g,x,y,235,62,label);text(g,x+14,y+46,id==='same-interpreter'?'표를 바꾸어 읽기':id==='simulation'?'테이프 + 위치 + 상태':id==='limits'?'유한 관찰과 구분':id==='table-as-data'?'원문표 또는 자체표':id==='standard-description'?'D · A · C · R …':'1 · 2 · 3 · 5 …','tmp-svg-small');});
        arrow(image,272,67,295,67);arrow(image,538,67,580,67);arrow(image,272,168,295,168);arrow(image,538,168,580,168);
      }
      diagram.append(image);
    }
    function renderMachine(){
      const p=core.getProgram(programId),s=state(),current=core.inspect(p,s),last=transitions.at(-1);
      machineTitle.textContent=p.label;machineOrigin.textContent=p.origin;machine.dataset.tmpMachine=programId;inputBar.hidden=viewId!=='universal'||programId!=='unary-plus-one';
      for(const b of programBar.children)b.setAttribute('aria-pressed',String(b.dataset.tmpProgram===programId));for(const b of inputBar.children)b.setAttribute('aria-pressed',String(Number(b.dataset.tmpUnary)===unary));
      configuration.replaceChildren();for(const[label,value,key]of[['행 실행',String(s.steps),'steps'],['현재 m-상태',s.mconfig,'state'],['머리 위치',String(s.head),'head'],['읽는 기호',current.symbol||'□','scanned']]){const cell=el('div');cell.dataset.tmpField=key;cell.append(el('span','',label),el('strong','',value));configuration.append(cell);}
      const cells=el('div','tmp-tape-cells');for(const c of core.tapeWindow(p,s)){const cell=el('div','tmp-tape-cell'+(c.head?' is-head':''));cell.dataset.tmpCell=String(c.position);if(c.head)cell.dataset.tmpHead='true';cell.setAttribute('aria-label',c.position+'번 · '+(c.symbol||'빈칸')+(c.head?' · 현재 읽는 칸':''));cell.append(el('span','tmp-position',String(c.position)),el('strong','',c.symbol||'□'),el('span','tmp-square-role',c.squareRole?c.squareRole+'칸': ' '),el('span','tmp-head-marker',c.head?'↑ 읽기':' '));cells.append(cell);}tape.replaceChildren(cells);if(tape.clientWidth&&tape.scrollWidth>tape.clientWidth){const index=core.tapeWindow(p,s).findIndex(c=>c.head);tape.scrollLeft=Math.max(0,index*58-tape.clientWidth/2+29);}
      output.replaceChildren(el('span','tmp-eyebrow',programId==='original'?'현재까지 테이프에 쓴 figures':'현재 테이프의 일진수'),el('strong','',current.figures||'아직 없음'));output.dataset.tmpFigures=current.figures;
      if(programId==='unary-plus-one')output.append(el('span','tmp-unary-count','1의 개수: '+s.tape.length+(current.status==='halted'?' = 입력 '+unary+' + 1':'')));
      action.replaceChildren();if(last){const o=last.operation;action.append(el('span','tmp-eyebrow','방금 적용한 행 · '+last.rule.state+' / '+(o.read||'None')),el('strong','',last.rule.notation+' → '+o.toState),el('p','','머리 '+o.fromHead+' → '+o.toHead+' · 상태 '+o.fromState+' → '+o.toState));}else action.append(el('span','tmp-eyebrow','아직 실행한 행 없음'));
      action.append(el('p','tmp-next-rule',current.rule&&current.status==='ready'?'다음에 적용할 행: '+current.rule.state+' / '+(current.symbol||'None')+' → '+current.rule.notation+' → '+current.rule.next:current.status==='halted'?'자체 표에 지정한 halt 상태에 도달했습니다.':current.status==='display-limit'?'64행 표시 한도입니다. 다음 행의 유무와 무한 실행을 판정한 결과는 아닙니다.':'이 표에는 현재 조건에 적용할 행이 없습니다.'));
      tbody.replaceChildren();for(const r of p.rules){const row=el('tr');row.dataset.tmpRule=r.id;row.setAttribute('data-tmp-rule-next',String(current.status==='ready'&&current.rule?.id===r.id));row.setAttribute('data-tmp-rule-last',String(last?.rule.id===r.id));const stateCell=el('td'),select=button(r.state,()=>{choose(viewId==='source-table'?'row-'+r.state:'same-interpreter');});select.setAttribute('aria-label',viewId==='source-table'?r.state+' 행의 아이디어 보기':'표를 읽는 공통 실행기 역할 보기');stateCell.append(select);for(const cell of[stateCell,el('td','',r.scanned||'None'),el('td','',r.notation),el('td','',r.next)])row.append(cell);tbody.append(row);}
      for(const b of controls.children)b.disabled=['back','reset'].includes(b.dataset.tmpControl)?history.length===1:current.status!=='ready';
      const suffix=lastRun?' · 이번 요청 '+lastRun.requested+'회 중 '+lastRun.executed+'행 실행':'';status.textContent=s.steps+'행 실행 · '+(current.status==='ready'?'다음 행 대기':current.status==='halted'?'지정한 정지 상태':current.status==='display-limit'?'화면 한도':'적용할 행 없음')+suffix;status.dataset.tmpExecutionStatus=current.status;
      trace.replaceChildren();for(const t of transitions.slice(-4)){const li=el('li');li.append(el('span','',String(t.after.steps).padStart(2,'0')),el('code','',t.before.mconfig+' / '+(t.operation.read||'□')+' → '+t.rule.notation+' → '+t.after.mconfig+' · 머리 '+t.after.head));trace.append(li);}trace.hidden=!transitions.length;
      if(viewId==='universal'){const code=core.encoding(p);encodingRows.replaceChildren();for(const row of code.rows){const r=el('div');r.dataset.tmpEncodedRule=row.ruleId;r.append(el('code','',row.normalized),el('code','',row.sd));encodingRows.append(r);}encodingCode.replaceChildren(el('span','tmp-eyebrow','S.D. · 규칙표의 전방 부호화'),el('code','tmp-sd',code.sd),el('span','tmp-eyebrow','D.N. · A1 C2 D3 L4 R5 N6 ;7'),el('code','tmp-dn',code.dn),el('p','tmp-note',code.scope));}
      scope.textContent=programId==='original'?'원문 표를 참고해 직접 재구성했습니다. 이 예제의 짝수 F칸에는 figure, 홀수 E칸에는 빈칸이 놓입니다. F/E라는 칸 이름과 0·1이라는 기호 종류는 구분합니다. 화면은 주변 11칸과 최대 64행만 다룹니다.':'직접 만든 +1 계산은 지정한 halt 상태로 끝납니다. 원문의 끝없는 figure 출력과 다른 목표입니다. 같은 해석기에 표·초기 테이프만 바꾸어 준 계산이며 원문 U의 S.D. 해독·실행을 재현하지 않습니다.';
    }
    renderView();return()=>root.remove();
  }
  window.AtlasVisuals.register('turing-mechanical-procedure',{mount});
})();
