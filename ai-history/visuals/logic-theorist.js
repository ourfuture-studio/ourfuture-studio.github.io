/* Newell & Simon (1956), RAND P-868, printed p.26: theorem 2.01.
 * A new drawing of the goal, selected axioms, and the published three-line proof.
 * The comparison is not a replay of the historical program's candidate order.
 * Trees retain negation in leaf labels, rather than adding a separate level.
 */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)';

  /* AST: {type:'meta'|'atom',name}, {type:'not',arg}, or
   * {type:'or'|'implies',left,right}. A meta is an axiom placeholder;
   * an atom in the goal is data, even if it has the same printed name.
   * Substitution replaces each original meta once, without substituting again
   * inside its replacement. This makes p := not-p finite and uniform.
   */
  const meta=name=>({type:'meta',name}),atom=name=>({type:'atom',name});
  const not=arg=>({type:'not',arg}),or=(left,right)=>({type:'or',left,right}),implies=(left,right)=>({type:'implies',left,right});
  const clone=value=>JSON.parse(JSON.stringify(value));
  const equal=(a,b)=>{
    if(!a||!b||a.type!==b.type)return false;
    if(a.type==='meta'||a.type==='atom')return a.name===b.name;
    if(a.type==='not')return equal(a.arg,b.arg);
    return equal(a.left,b.left)&&equal(a.right,b.right);
  };
  const AXIOMS={
    '1.2':implies(or(meta('p'),meta('p')),meta('p')),
    '1.3':implies(meta('p'),or(meta('q'),meta('p'))),
    '1.4':implies(or(meta('p'),meta('q')),or(meta('q'),meta('p')))
  };
  const goal=implies(implies(atom('p'),not(atom('p'))),not(atom('p')));
  // Expand only the left implication by its definition: p -> not-p = not-p or not-p.
  const expandedGoal=implies(or(not(atom('p')),not(atom('p'))),not(atom('p')));

  function matchTemplate(pattern,target){
    const bindings=Object.create(null);
    function match(a,b){
      if(!a||!b)return false;
      if(a.type==='meta'){
        if(Object.hasOwn(bindings,a.name))return equal(bindings[a.name],b);
        bindings[a.name]=clone(b);return true;
      }
      if(a.type!==b.type)return false;
      if(a.type==='atom')return a.name===b.name;
      if(a.type==='not')return match(a.arg,b.arg);
      if(a.type!=='or'&&a.type!=='implies')return false;
      return match(a.left,b.left)&&match(a.right,b.right);
    }
    return match(pattern,target)?Object.fromEntries(Object.entries(bindings).map(([key,value])=>[key,clone(value)])):null;
  }
  function substitute(pattern,bindings={}){
    if(pattern.type==='meta')return clone(Object.hasOwn(bindings,pattern.name)?bindings[pattern.name]:pattern);
    if(pattern.type==='atom')return clone(pattern);
    if(pattern.type==='not')return not(substitute(pattern.arg,bindings));
    return{type:pattern.type,left:substitute(pattern.left,bindings),right:substitute(pattern.right,bindings)};
  }
  function format(expression){
    if(expression.type==='meta'||expression.type==='atom')return expression.name;
    if(expression.type==='not')return '¬'+(expression.arg.type==='meta'||expression.arg.type==='atom'?format(expression.arg):'('+format(expression.arg)+')');
    const part=child=>['or','implies'].includes(child.type)?'('+format(child)+')':format(child);
    return part(expression.left)+(expression.type==='or'?' ∨ ':' → ')+part(expression.right);
  }
  function getProof(axiomId='1.2'){
    if(!Object.hasOwn(AXIOMS,axiomId))throw new RangeError('Unknown comparison axiom: '+axiomId);
    const axiom=clone(AXIOMS[axiomId]),bindings=matchTemplate(axiom,expandedGoal);
    const substituted=bindings?substitute(axiom,bindings):null;
    const matched=Boolean(substituted&&equal(substituted,expandedGoal));
    return{
      matched,axiomId,axiom,goal:clone(goal),expandedGoal:clone(expandedGoal),
      substitution:bindings||{},substitutionText:bindings?Object.entries(bindings).map(([name,value])=>name+' ↦ '+format(value)).join(', '):'',
      substituted,
      lines:matched?[format(axiom),format(substituted),format(goal)]:[]
    };
  }
  window.AtlasLogicProof=Object.freeze({getProof,matchTemplate,substitute,format});

  function drawing(axiomId){
    const branch=(a,b)=>`<path d="M${a[0]} ${a[1]+13} L${b[0]} ${b[1]-15}"/>`;
    const point=(x,y,label,leaf=false)=>`<g class="${leaf?'logic-tree-leaf':'logic-tree-operator'}"><circle cx="${x}" cy="${y}" r="${leaf?17:14}" fill="${leaf?SOFT:BG}" stroke="${leaf?ACCENT:INK}" stroke-opacity="${leaf?.55:.4}"/><text x="${x}" y="${y+6}" text-anchor="middle" fill="${leaf?ACCENT:INK}" font-family="var(--serif, serif)" font-size="18">${label}</text></g>`;
    function tree(id,offset){
      const root=[offset+98,48],left=[offset+58,98],right=[offset+143,98],ll=[offset+35,151],lr=[offset+81,151],rl=[offset+121,151],rr=[offset+166,151];
      let paths=branch(root,left)+branch(root,right),nodes=point(...root,'→');
      if(id==='goal'||id==='1.2'){
        paths+=branch(left,ll)+branch(left,lr);
        nodes+=point(...left,id==='goal'?'→':'∨')+point(...right,id==='goal'?'¬p':'p',true)+point(...ll,'p',true)+point(...lr,id==='goal'?'¬p':'p',true);
      }else if(id==='1.3'){
        paths+=branch(right,rl)+branch(right,rr);
        nodes+=point(...left,'p',true)+point(...right,'∨')+point(...rl,'q',true)+point(...rr,'p',true);
      }else{
        paths+=branch(left,ll)+branch(left,lr)+branch(right,rl)+branch(right,rr);
        nodes+=point(...left,'∨')+point(...right,'∨')+point(...ll,'p',true)+point(...lr,'q',true)+point(...rl,'q',true)+point(...rr,'p',true);
      }
      return `<g fill="none" stroke="${INK}" stroke-opacity=".4" stroke-width="1.3">${paths}</g>${nodes}`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" class="logic-tree-svg" viewBox="0 0 420 185" role="img" aria-label="목표 정리 2.01과 공리 ${axiomId}의 구조 비교. 부정은 잎의 ¬p로 표시한다.">
      <title>목표와 공리 ${axiomId}의 기호 구조</title>
      <desc>목표는 왼쪽 가지가 다시 두 기호로 갈라지고 오른쪽은 ¬p인 식이다. ${axiomId==='1.2'?'공리 1.2도 같은 갈래 모양이지만 연결사와 잎의 표기가 다르다. 적법한 치환과 정의치환이 더 필요하다.':'선택한 공리의 가지 모양을 비교한다. 이 한 번의 치환 비교가 실패해도 정리가 거짓이라는 뜻은 아니다.'}</desc>
      <rect x="3" y="3" width="414" height="179" rx="10" fill="${SOFT}"/>
      <path d="M210 16V171" stroke="${INK}" stroke-opacity=".12"/>
      <text x="101" y="22" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">목표 · 2.01</text>
      <text x="311" y="22" text-anchor="middle" fill="${INK}" font-size="12" font-family="var(--sans, sans-serif)">공리 · ${axiomId}</text>
      ${tree('goal',0)}${tree(axiomId,210)}
    </svg>`;
  }

  function appendFormula(host,expression){
    function text(value,cls){host.append(node('span',cls||'',value));}
    function render(value,wrap=false){
      if(wrap)text('(');
      if(value.type==='meta'||value.type==='atom')text(value.name,'logic-symbol');
      else if(value.type==='not'&&['atom','meta'].includes(value.arg.type))text('¬'+value.arg.name,'logic-symbol');
      else if(value.type==='not'){text('¬');render(value.arg,true);}
      else{render(value.left,['or','implies'].includes(value.left.type));text(value.type==='or'?' ∨ ':' → ');render(value.right,['or','implies'].includes(value.right.type));}
      if(wrap)text(')');
    }
    host.replaceChildren();render(expression);
  }

  window.AtlasVisuals.register('proof-as-search',{
    mount(host,config){
      const stages=['structure','substitute','proof'].map(id=>config.stages.find(stage=>stage.id===id));
      if(stages.some(stage=>!stage?.label||!stage?.text))throw new Error('Logic visual requires structure, substitute and proof stages.');
      const root=node('div','logic-comparison'),listeners=[],stageButtons=[],axiomButtons=[];
      let stage='substitute',axiomId='1.2',disposed=false;
      const controls=node('div','logic-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','증명의 구조와 치환 살펴보기');
      const grid=node('div','logic-grid'),structure=node('figure','logic-structure'),heading=node('figcaption');
      heading.append(node('span','logic-kicker','CANDIDATE'),node('h4','','구조는 단서가 된다'));
      const target=node('div','logic-target');target.append(node('span','','증명할 정리 2.01'),node('code','',format(goal)));
      const tree=node('div','logic-tree');
      const candidates=node('div','logic-candidates');candidates.setAttribute('role','group');candidates.setAttribute('aria-label','비교할 공리 선택');
      const selected=node('code','logic-selected-formula');
      structure.append(heading,target,tree,candidates,selected);
      if(config.legend)structure.append(node('p','logic-legend',config.legend));

      const proof=node('div','logic-proof');proof.append(node('span','logic-kicker','VERIFICATION'),node('h4','','같은 변수를, 모든 자리에서 똑같이'));
      const proofBody=node('div','logic-proof-body'),rows=[];
      const definitions=[['structure','공리에서 시작한다'],['substitute','모든 p 자리에 ¬p를 넣는다'],['proof','왼쪽 식을 정의에 따라 다시 쓴다']];
      definitions.forEach(([group,title],index)=>{
        const row=node('div','logic-step');row.dataset.group=group;
        const body=node('div','logic-step-body'),formula=node('code','logic-proof-formula');
        body.append(node('h5','',title),formula);row.append(node('span','logic-step-index','0'+(index+1)),body);proofBody.append(row);rows.push({row,body,formula});
      });
      rows[2].body.append(node('p','logic-definition','p → ¬p는 정의상 ¬p ∨ ¬p와 같다.'));
      const confirmation=node('p','logic-confirmation','허용된 변환을 거쳐 목표 정리와 일치했다.');proofBody.append(confirmation);
      const unsupported=node('div','logic-unsupported');unsupported.hidden=true;
      unsupported.append(node('h5','','이 후보는 한 번의 치환으로 맞지 않는다'),node('p','','목표의 왼쪽 함의를 정의로 펼친 식과 비교합니다. 같은 변수에는 같은 식을 넣어야 합니다.'),node('code','logic-expanded-goal',format(expandedGoal)),node('p','','이 비교에서 증명이 이어지지 않았습니다. 다른 증명 경로가 없거나 정리가 거짓이라는 뜻은 아닙니다.'));
      proof.append(proofBody,unsupported);grid.append(structure,proof);
      const result=node('p','logic-explanation');result.setAttribute('role','status');result.setAttribute('aria-live','polite');result.setAttribute('aria-atomic','true');
      const scope=node('p','logic-scope','원문 정리 2.01의 구조와 증명을 새로 그렸습니다. 세 공리의 선택은 비교 조작이며, 원실행의 방문 순서를 표시하지 않습니다.');

      function update(){
        if(disposed)return;
        const current=getProof(axiomId);root.dataset.stage=stage;root.dataset.axiom=axiomId;root.dataset.matched=String(current.matched);
        for(const button of stageButtons){const active=button.dataset.stage===stage;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        for(const button of axiomButtons){const active=button.dataset.axiom===axiomId;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));}
        // Only locally generated, fixed-label SVG is inserted as HTML.
        tree.innerHTML=drawing(axiomId);selected.textContent='공리 '+axiomId+'  '+format(current.axiom);
        proofBody.hidden=!current.matched;unsupported.hidden=current.matched;
        if(current.matched){
          appendFormula(rows[0].formula,current.axiom);appendFormula(rows[1].formula,current.substituted);appendFormula(rows[2].formula,current.goal);
          for(const item of rows)item.row.classList.toggle('is-focus',item.row.dataset.group===stage);
        }
        const explanation=stages.find(item=>item.id===stage).text;
        result.textContent=current.matched?explanation:'이 공리는 목표를 정의로 펼친 식에 한 번의 동일 치환으로 맞지 않습니다. 후보를 고르는 단서와, 증명이 성립하는지는 따로 확인해야 합니다.';
      }
      for(const item of stages){const button=node('button','',item.label);button.type='button';button.dataset.stage=item.id;const click=()=>{stage=item.id;update();};button.addEventListener('click',click);listeners.push(()=>button.removeEventListener('click',click));stageButtons.push(button);controls.append(button);}
      for(const id of Object.keys(AXIOMS)){const button=node('button','','공리 '+id);button.type='button';button.dataset.axiom=id;const click=()=>{axiomId=id;update();};button.addEventListener('click',click);listeners.push(()=>button.removeEventListener('click',click));axiomButtons.push(button);candidates.append(button);}
      root.append(controls,grid,result,scope);
      if(config.source){const source=node('a','logic-source',config.source.title+' ↗');source.href=config.source.url;source.target='_blank';source.rel='noopener noreferrer';root.append(source);}
      host.append(root);update();
      return()=>{if(disposed)return;disposed=true;for(const remove of listeners)remove();root.remove();};
    }
  });
})();
