/** Educational state models, separate from the existing question/record modules. */
function validValue(value){return (typeof value==='string'&&value.length>0&&value.length<=20)||(typeof value==='number'&&Number.isFinite(value));}
export function runStackQueue(initialValues=['A','B','C'],operations=[]){
  if(!Array.isArray(initialValues)||initialValues.length>30||initialValues.some(x=>!validValue(x))||!Array.isArray(operations)||operations.length>200)throw new RangeError('Bounded values and operations required.');
  const stack=[...initialValues],queue=[...initialValues],stackOut=[],queueOut=[],states=[];
  const snapshot=(action,removedStack=null,removedQueue=null)=>states.push({action,stack:[...stack],queue:[...queue],removedStack,removedQueue,stackOut:[...stackOut],queueOut:[...queueOut]});
  snapshot('initial');
  for(const operation of operations){
    if(operation.type==='add'){
      if(!validValue(operation.value))throw new TypeError('Invalid element.');
      stack.push(operation.value);queue.push(operation.value);snapshot('add');
    }else if(operation.type==='remove'){
      if(!stack.length){snapshot('empty');continue;}
      const a=stack.pop(),b=queue.shift();stackOut.push(a);queueOut.push(b);snapshot('remove',a,b);
    }else throw new RangeError('Unknown stack/queue operation.');
  }
  return {states,stack:[...stack],queue:[...queue],stackOut:[...stackOut],queueOut:[...queueOut]};
}

export const TREE_PRESETS={
  source:{label:'기존 이론의 4개 노드',tree:{id:'A',left:{id:'B',left:null,right:{id:'D',left:null,right:null}},right:{id:'C',left:null,right:null}}},
  complete:{label:'완전한 3층 이진 트리 7개 노드',tree:{id:'A',left:{id:'B',left:{id:'D',left:null,right:null},right:{id:'E',left:null,right:null}},right:{id:'C',left:{id:'F',left:null,right:null},right:{id:'G',left:null,right:null}}}},
};
export function traversalOrder(tree,mode='inorder'){
  if(!['preorder','inorder','postorder'].includes(mode))throw new RangeError('Unknown traversal.');
  const result=[],seen=new Set();
  function visit(node,depth){
    if(node===null||node===undefined)return;
    if(depth>50||typeof node.id!=='string'||!node.id||seen.has(node.id))throw new TypeError('A bounded binary tree with unique string IDs is required.');
    seen.add(node.id);
    if(mode==='preorder')result.push(node.id);
    visit(node.left,depth+1);
    if(mode==='inorder')result.push(node.id);
    visit(node.right,depth+1);
    if(mode==='postorder')result.push(node.id);
  }
  visit(tree,0);return result;
}

export const PAGE_PRESETS={
  source:{label:'기존 이론: 1, 2, 1, 3, 1, 2',references:[1,2,1,3,1,2]},
  classic:{label:'더 긴 참조열: 7, 0, 1, 2, 0, 3, …',references:[7,0,1,2,0,3,0,4,2,3,0,3]},
  anomaly:{label:'프레임 수 비교: 1, 2, 3, 4, 1, 2, 5, …',references:[1,2,3,4,1,2,5,1,2,3,4,5]},
};
export function simulatePages(references,frameCount=2,policy='FIFO'){
  if(!Array.isArray(references)||references.length>200||references.some(x=>!Number.isInteger(x)||x<0||x>99)||!Number.isInteger(frameCount)||frameCount<1||frameCount>8||!['FIFO','LRU'].includes(policy))throw new RangeError('Invalid page references, frame count or policy.');
  const frames=Array(frameCount).fill(null),steps=[];let order=[],faults=0,hits=0;
  references.forEach((page,index)=>{
    const hit=frames.includes(page);let victim=null,changedFrame=null;
    if(hit){hits++;if(policy==='LRU')order=[...order.filter(x=>x!==page),page];}
    else{
      faults++;changedFrame=frames.indexOf(null);
      if(changedFrame===-1){victim=order.shift();changedFrame=frames.indexOf(victim);}
      frames[changedFrame]=page;order.push(page);
    }
    steps.push({index,page,frames:[...frames],hit,fault:!hit,victim,changedFrame,order:[...order],faults,hits});
  });
  return {steps,faults,hits};
}

const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const output=(root,name,value)=>{root.querySelector(`[data-is-output="${name}"]`).textContent=value;};
const chips=(values,classes='')=>values.map((value,index)=>`<span class="is-chip ${classes}" data-position="${index}">${esc(value)}</span>`).join('')||'<span class="is-empty">비어 있음 (Empty)</span>';

function mountStackQueue(root){
  const panel=root.querySelector('[data-is-stack]');if(!panel||panel.dataset.mounted)return;panel.dataset.mounted='true';
  const initial=['A','B','C'];let operations=[];
  const render=()=>{
    const model=runStackQueue(initial,operations),last=model.states.at(-1);
    panel.querySelector('[data-is-output="stack"]').innerHTML=chips(model.stack);
    panel.querySelector('[data-is-output="queue"]').innerHTML=chips(model.queue);
    output(panel,'stack-out',model.stackOut.join(' → ')||'아직 꺼낸 원소 없음');
    output(panel,'queue-out',model.queueOut.join(' → ')||'아직 꺼낸 원소 없음');
    output(panel,'stack-top',model.stack.length?`top = ${model.stack.at(-1)}`:'top 없음');
    output(panel,'queue-front',model.queue.length?`front = ${model.queue[0]}`:'front 없음');
    output(panel,'stack-status',last.action==='remove'?`같은 동작에서 스택은 ${last.removedStack}, 큐는 ${last.removedQueue}를 꺼냈습니다.`:last.action==='add'?`두 구조의 오른쪽 끝에 같은 값을 추가했습니다. 스택과 큐는 각각 독립된 구조입니다.`:'A → B → C 순서로 넣은 두 구조입니다. 스택은 오른쪽, 큐는 왼쪽에서 꺼냅니다.');
    panel.querySelector('[data-is-action="remove"]').disabled=!model.stack.length;
    panel.querySelector('[data-is-action="add"]').disabled=model.stack.length>=8||operations.length>=40;
    panel.querySelector('[data-is-action="undo"]').disabled=!operations.length;
  };
  panel.querySelector('[data-is-action="add"]').addEventListener('click',()=>{operations.push({type:'add',value:panel.querySelector('#is-stack-value').value});render();});
  panel.querySelector('[data-is-action="remove"]').addEventListener('click',()=>{operations.push({type:'remove'});render();});
  panel.querySelector('[data-is-action="undo"]').addEventListener('click',()=>{operations.pop();render();});
  panel.querySelector('[data-is-action="reset"]').addEventListener('click',()=>{operations=[];render();});
  render();
}

function treeCoordinates(tree){
  const nodes=[];
  function walk(node,x,y,spread,parent=null){if(!node)return;nodes.push({id:node.id,x,y,parent});walk(node.left,x-spread,y+100,spread/2,node.id);walk(node.right,x+spread,y+100,spread/2,node.id);}
  walk(tree,280,45,140);return nodes;
}
function treeDiagram(tree,order,step){
  const nodes=treeCoordinates(tree),positions=new Map(nodes.map(n=>[n.id,n])),visited=new Set(order.slice(0,step)),active=order[step-1];
  const lines=nodes.filter(n=>n.parent).map(n=>{const p=positions.get(n.parent);return `<line x1="${p.x}" y1="${p.y+24}" x2="${n.x}" y2="${n.y-24}"/>`;}).join('');
  const circles=nodes.map(n=>`<g class="is-tree-node${visited.has(n.id)?' is-visited':''}${n.id===active?' is-current':''}"><circle cx="${n.x}" cy="${n.y}" r="25"/><text x="${n.x}" y="${n.y+7}" text-anchor="middle">${esc(n.id)}</text>${visited.has(n.id)?`<text x="${n.x+31}" y="${n.y-22}" class="is-tree-rank">${order.indexOf(n.id)+1}</text>`:''}</g>`).join('');
  return `<svg class="is-tree-svg" viewBox="0 0 560 285" role="img" aria-label="현재 이진 트리와 방문한 노드"><title>이진 트리 순회</title><desc>현재까지 방문한 노드는 초록색이며 현재 노드는 두꺼운 파란 테두리입니다. 방문 순번을 옆에 표시했습니다. 왼쪽 자식이 그림의 왼쪽에 있습니다.</desc><g class="is-tree-edges">${lines}</g>${circles}</svg>`;
}
function mountTree(root){
  const panel=root.querySelector('[data-is-tree]');if(!panel||panel.dataset.mounted)return;panel.dataset.mounted='true';
  let preset='source',mode='inorder',step=0;
  const render=()=>{
    const tree=TREE_PRESETS[preset].tree,order=traversalOrder(tree,mode);step=Math.min(step,order.length);
    panel.querySelector('[data-is-output="tree"]').innerHTML=treeDiagram(tree,order,step);
    panel.querySelector('[data-is-output="traversal"]').innerHTML=chips(order.slice(0,step));
    output(panel,'tree-count',`${step} / ${order.length}개 노드`);
    const rules={preorder:'현재 노드 → 왼쪽 → 오른쪽 (NLR)',inorder:'왼쪽 → 현재 노드 → 오른쪽 (LNR)',postorder:'왼쪽 → 오른쪽 → 현재 노드 (LRN)'};
    output(panel,'tree-rule',rules[mode]);
    output(panel,'tree-status',step?`${step}번째 방문: ${order[step-1]}. 지금까지 ${order.slice(0,step).join(' → ')}.`:'아직 방문하지 않았습니다. 다음 방문을 누르면 결과에 적는 노드가 하나씩 표시됩니다.');
    panel.querySelector('[data-tree-action="back"]').disabled=step===0;
    for(const action of ['next','finish'])panel.querySelector(`[data-tree-action="${action}"]`).disabled=step===order.length;
  };
  panel.querySelector('#is-tree-preset').addEventListener('change',event=>{preset=event.target.value;step=0;render();});
  panel.querySelector('#is-tree-mode').addEventListener('change',event=>{mode=event.target.value;step=0;render();});
  for(const action of ['back','next','finish','reset'])panel.querySelector(`[data-tree-action="${action}"]`).addEventListener('click',()=>{step=action==='back'?Math.max(0,step-1):action==='next'?step+1:action==='finish'?traversalOrder(TREE_PRESETS[preset].tree,mode).length:0;render();});
  render();
}

function pageStateHTML(policy,model,step,frameCount){
  const current=step?model.steps[step-1]:null,frames=current?.frames??Array(frameCount).fill(null),order=current?.order??[];
  const frameHTML=frames.map((page,index)=>`<div class="is-frame${current?.changedFrame===index?' is-frame-changed':''}${current?.hit&&page===current.page?' is-frame-hit':''}"><small>프레임 ${index+1}</small><strong>${page===null?'—':page}</strong></div>`).join('');
  const action=!current?'아직 참조하지 않음':current.hit?`적중(Hit): 페이지 ${current.page}가 이미 있습니다.`:current.victim===null?`부재(Page Fault): 빈 프레임에 ${current.page} 적재`:`부재(Page Fault): ${current.victim} 제거 → ${current.page} 적재`;
  const history=model.steps.slice(0,step).map(s=>`<span class="is-history ${s.hit?'is-hit':'is-fault'}" title="${s.index+1}번째 참조 ${s.page}">${s.page}<b>${s.hit?'H':'F'}</b></span>`).join('')||'<span class="is-empty">참조 전</span>';
  return `<h3>${policy} <small>${policy==='FIFO'?'First-In, First-Out':'Least Recently Used'}</small></h3><div class="is-frames">${frameHTML}</div><p class="is-page-action">${action}</p><p class="is-policy-order">${policy==='FIFO'?'먼저 적재 → 나중 적재':'오래 미사용 → 최근 사용'}: <strong>${order.join(' → ')||'아직 없음'}</strong></p><div class="is-page-totals"><span>부재 <b>${current?.faults??0}</b></span><span>적중 <b>${current?.hits??0}</b></span></div><div class="is-history-row" aria-label="지금까지의 적중과 부재">${history}</div>`;
}
function mountPages(root){
  const panel=root.querySelector('[data-is-pages]');if(!panel||panel.dataset.mounted)return;panel.dataset.mounted='true';
  let preset='source',frameCount=2,step=0;
  const render=()=>{
    const refs=PAGE_PRESETS[preset].references,fifo=simulatePages(refs,frameCount,'FIFO'),lru=simulatePages(refs,frameCount,'LRU');step=Math.min(step,refs.length);
    panel.querySelector('[data-is-output="fifo"]').innerHTML=pageStateHTML('FIFO',fifo,step,frameCount);
    panel.querySelector('[data-is-output="lru"]').innerHTML=pageStateHTML('LRU',lru,step,frameCount);
    panel.querySelector('[data-is-output="references"]').innerHTML=refs.map((page,index)=>`<span class="is-reference${index===step-1?' is-reference-current':''}${index<step?' is-reference-done':''}"><small>${index+1}</small>${page}</span>`).join('');
    output(panel,'page-count',`${step} / ${refs.length}회 참조`);
    const a=step?fifo.steps[step-1]:null,b=step?lru.steps[step-1]:null;
    output(panel,'page-status',step?`${step}번째 페이지 ${refs[step-1]} 참조 뒤, FIFO 부재 ${a.faults}회 · LRU 부재 ${b.faults}회입니다. 다음 교체는 기록 순서와 빈 프레임 유무를 함께 확인하세요.`:'프레임은 처음에 비어 있습니다. 다음 참조를 눌러 한 단계씩 비교하세요.');
    panel.querySelector('[data-page-action="back"]').disabled=step===0;
    for(const action of ['next','finish'])panel.querySelector(`[data-page-action="${action}"]`).disabled=step===refs.length;
  };
  panel.querySelector('#is-page-preset').addEventListener('change',event=>{preset=event.target.value;step=0;render();});
  panel.querySelector('#is-page-frames').addEventListener('change',event=>{frameCount=+event.target.value;step=0;render();});
  for(const action of ['back','next','finish','reset'])panel.querySelector(`[data-page-action="${action}"]`).addEventListener('click',()=>{step=action==='back'?Math.max(0,step-1):action==='next'?step+1:action==='finish'?PAGE_PRESETS[preset].references.length:0;render();});
  render();
}

export function mountStructures(root=document){mountStackQueue(root);mountTree(root);mountPages(root);}
