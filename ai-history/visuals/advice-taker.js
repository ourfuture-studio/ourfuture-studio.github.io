/* McCarthy (1959), Programs with Common Sense, section 2, pp.6–8.
 * The original has equations and a deduction list, not a map. This SVG is a
 * new diagram of that example. Routes remain possible actions, never events
 * which have occurred. The four-node dependency trace follows the supplied
 * example; it is not a general theorem prover or the historical Advice Taker.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)';

  /* The first two results are conditional possibilities, not claims that I
   * am already in the car. (9),(10) supply the movement conditions; (13),(15)
   * supply the effects; (16) composes the plan; (17) selects its first action.
   * Removing knowledge leaves these consequences unsupported, not false.
   */
  function evaluate(options={}){
    const known=new Set(['desk-in-home','home-in-county','airport-in-county','walkable-home','drivable-county','movement-effects','compose-rule','action-rule']);
    if(options.carLocationKnown!==false)known.add('car-in-home');
    if(options.currentPositionKnown!==false)known.add('I-at-desk');
    if(options.goalKnown!==false)known.add('want-airport');
    const rules=[
      {id:'walking',needs:['desk-in-home','car-in-home','walkable-home']},
      {id:'driving',needs:['car-in-home','home-in-county','airport-in-county','drivable-county']},
      {id:'plan',needs:['walking','driving','movement-effects','compose-rule']},
      {id:'action',needs:['plan','I-at-desk','want-airport','action-rule']}
    ];
    let changed=true;
    while(changed){changed=false;for(const rule of rules)if(!known.has(rule.id)&&rule.needs.every(id=>known.has(id))){known.add(rule.id);changed=true;}}
    return Object.fromEntries(rules.map(rule=>[rule.id,known.has(rule.id)]));
  }
  window.AtlasAdviceTrace=Object.freeze({evaluate});

  function drawing(){
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 265" role="img" aria-label="같은 지역 안의 집과 공항, 집 안의 책상과 차. 나는 책상에 있으며, 걷기와 운전은 아직 실행하지 않은 계획이다.">
      <title>책상에서 공항까지, 원문의 장소 관계와 가능한 이동</title>
      <desc>지역 county 안에 집 home과 공항 airport가 있다. 책상 desk와 차 car는 집에 있다. 나는 책상에 그대로 표시한다. 점선은 가능한 걷기와 운전 경로이며 도착 사실을 뜻하지 않는다.</desc>
      <rect x="10" y="10" width="400" height="245" rx="15" fill="${SOFT}" stroke="${INK}" stroke-opacity=".2"/>
      <text x="28" y="35" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">같은 지역 · county</text>
      <g class="advice-home">
        <rect x="28" y="52" width="222" height="174" rx="12" fill="${BG}" stroke="${INK}" stroke-opacity=".45"/>
        <path d="M43 74l10-8 10 8v12H43Z" fill="none" stroke="${INK}" stroke-width="1.4"/>
        <text x="73" y="81" fill="${INK}" font-size="13" font-family="var(--sans, sans-serif)">집 · home</text>
        <g class="advice-desk">
          <rect x="49" y="115" width="52" height="9" rx="2" fill="${INK}" fill-opacity=".1" stroke="${INK}" stroke-width="1.5"/>
          <path d="M54 124v17m42-17v17" stroke="${INK}" stroke-width="1.5"/>
          <circle cx="75" cy="103" r="8" fill="${ACCENT}"/>
          <text x="75" y="106" text-anchor="middle" fill="${BG}" font-size="9" font-family="var(--mono, monospace)">I</text>
          <text x="75" y="164" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">책상 · desk</text>
          <text x="75" y="186" text-anchor="middle" fill="${ACCENT}" font-size="11" font-family="var(--sans, sans-serif)">지금 나는 여기</text>
        </g>
        <g class="advice-car">
          <path d="M166 118l7-14h25l9 14m-45 0h49v19h-49Z" fill="${SOFT}" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="173" cy="138" r="5" fill="${BG}" stroke="${INK}" stroke-width="1.5"/><circle cx="200" cy="138" r="5" fill="${BG}" stroke="${INK}" stroke-width="1.5"/>
          <text x="187" y="164" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">차 · car</text>
          <text class="advice-car-unknown" x="187" y="186" text-anchor="middle" fill="${ACCENT}" font-size="11" font-family="var(--sans, sans-serif)">위치 정보 미제공</text>
        </g>
      </g>
      <g class="advice-airport" fill="none" stroke="${INK}" stroke-width="1.5" stroke-linejoin="round">
        <path d="M307 120h64v28h-64Zm8-12h48v12h-48Zm19-11h10v11h-10Z" fill="${BG}"/>
        <path d="M320 130h5m7 0h5m7 0h5m7 0h5m-19 8v10"/>
      </g>
      <text x="339" y="173" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">공항 · airport</text>
      <text x="339" y="194" text-anchor="middle" fill="${ACCENT}" font-size="11" font-family="var(--sans, sans-serif)">가고 싶은 곳</text>
      <g class="advice-route advice-walk" fill="none" stroke="${ACCENT}" stroke-width="1.7" stroke-dasharray="4 4">
        <path d="M107 125h44"/><path d="M144 120l7 5-7 5" stroke-dasharray="none"/>
      </g>
      <text class="advice-route-label advice-walk" x="129" y="112" text-anchor="middle" fill="${ACCENT}" font-size="10" font-family="var(--sans, sans-serif)">걷기</text>
      <g class="advice-route advice-drive" fill="none" stroke="${ACCENT}" stroke-width="1.7" stroke-dasharray="4 4">
        <path d="M211 124C243 91 272 91 298 123"/><path d="M290 120l8 3-1-9" stroke-dasharray="none"/>
      </g>
      <text class="advice-route-label advice-drive" x="260" y="91" text-anchor="middle" fill="${ACCENT}" font-size="10" font-family="var(--sans, sans-serif)">운전</text>
      <text x="28" y="244" fill="${INK}" fill-opacity=".65" font-size="10" font-family="var(--sans, sans-serif)">점선: 아직 실행하지 않은 이동</text>
    </svg>`;
  }

  window.AtlasVisuals.register('advice-to-action',{
    mount(host,config){
      const stages=['knowledge','plan','action'].map(id=>config.stages.find(s=>s.id===id));
      if(stages.some(s=>!s?.label||!s?.text))throw new Error('Advice visual requires knowledge, plan and action stages.');
      const root=node('div','advice-comparison'),listeners=[],buttons=[];
      let stage='plan',disposed=false;
      const controls=node('div','advice-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','지식에서 행동까지 살펴보기');
      const premise=node('div','advice-premise'),label=node('label','advice-premise-label'),checkbox=node('input');checkbox.type='checkbox';checkbox.checked=true;
      label.append(checkbox,node('span','',config.premiseLabel||'차의 위치 정보 포함'));
      const premiseNote=node('p','advice-premise-note');premise.append(label,premiseNote);

      const grid=node('div','advice-grid'),scene=node('figure','advice-scene'),sceneTitle=node('figcaption');
      sceneTitle.append(node('span','advice-kicker','SITUATION'),node('h4','','같은 상황, 기호로 적은 지식'));
      const art=node('div','advice-map');art.innerHTML=drawing();
      const facts=node('div','advice-facts');
      const factPosition=node('code','','at(I, desk)'),factCar=node('code','advice-car-fact','at(car, home)'),factGoal=node('code','advice-goal','want(at(I, airport))');
      facts.append(factPosition,factCar,factGoal);
      scene.append(sceneTitle,art,facts);
      const proof=node('div','advice-proof');proof.append(node('span','advice-kicker','REASONING'),node('h4','','알고 있는 것에서 다음 행동으로'));

      function step(number,title,group){const row=node('div','advice-step');row.dataset.group=group;const body=node('div','advice-step-body');row.append(node('span','advice-step-index',number),body);body.append(node('h5','',title));proof.append(row);return{row,body};}
      const knowledge=step('01','사실과 목표를 함께 둔다','knowledge');
      knowledge.body.append(node('p','','나는 책상에 있다. 공항에 가고 싶다.'));
      const conditions=step('02','이동할 수 있는 조건을 잇는다','plan');
      const walkingLabel=node('p','advice-condition-label','내가 책상에 있다면 · 걷기 가능'),drivingLabel=node('p','advice-condition-label','내가 차에 있다면 · 운전 가능');
      const walking=node('code','advice-condition'),driving=node('code','advice-condition');conditions.body.append(walkingLabel,walking,drivingLabel,driving);
      const plan=step('03','두 행동을 하나의 계획으로','plan'),planText=node('p','advice-plan-chain');plan.body.append(planText);
      const action=step('04','먼저 할 행동을 이끌어낸다','action'),command=node('code','advice-command'),commandMeaning=node('p','advice-command-meaning');action.body.append(command,commandMeaning);
      grid.append(scene,proof);
      const result=node('p','advice-explanation');result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');
      const scope=node('p','advice-source-scope','원문의 공항 사례에서 전제와 결론의 연결을 따라 그렸습니다.');

      function update(){
        if(disposed)return;
        const state=evaluate({carLocationKnown:checkbox.checked});root.dataset.stage=stage;root.dataset.carKnown=String(checkbox.checked);
        for(const button of buttons){const active=button.dataset.stage===stage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const row of [knowledge,conditions,plan,action])row.row.classList.toggle('is-focus',row.row.dataset.group===stage);
        conditions.row.classList.toggle('is-unsupported',!state.walking||!state.driving);plan.row.classList.toggle('is-unsupported',!state.plan);action.row.classList.toggle('is-unsupported',!state.action);
        factCar.textContent=checkbox.checked?'at(car, home)':'차 위치: 알려 주지 않음';
        walking.textContent=state.walking?'at(I, desk) → can(go(desk, car, walking))':'걷기 조건을 도출하지 못함';
        driving.textContent=state.driving?'at(I, car) → can(go(home, airport, driving))':'운전 조건을 도출하지 못함';
        walkingLabel.hidden=!state.walking;drivingLabel.hidden=!state.driving;
        planText.textContent=state.plan?'책상 → 차 → 공항':'이 전제들로는 계획을 잇지 못한다';
        command.textContent=state.action?'do(go(desk,car,walking))':'행동 명령이 도출되지 않음';
        commandMeaning.textContent=state.action?'먼저, 책상에서 차로 걸어가라.':'계획에 필요한 지식이 아직 부족하다.';
        premiseNote.textContent=checkbox.checked?'위치 정보 하나를 빼면, 어떤 결론이 남을까요?':(config.premiseNote||'차가 없다는 뜻이 아니라, 그 위치를 알려 주지 않은 상태입니다.');
        const selected=stages.find(s=>s.id===stage);
        result.textContent=checkbox.checked?selected.text:'차의 위치를 모르면 이 사례의 걷기·운전 조건을 연결할 수 없습니다. 결론을 얻지 못한 것과 공항에 갈 수 없다는 것은 다릅니다.';
      }
      for(const item of stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;const click=()=>{stage=item.id;update();};button.addEventListener('click',click);listeners.push(()=>button.removeEventListener('click',click));buttons.push(button);controls.append(button);}
      const changed=()=>update();checkbox.addEventListener('change',changed);listeners.push(()=>checkbox.removeEventListener('change',changed));
      root.append(controls,premise,grid,result,scope);
      if(config.source){const source=node('a','advice-source',config.source.title+' ↗');source.href=config.source.url;source.target='_blank';source.rel='noopener noreferrer';root.append(source);}
      host.append(root);update();
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
