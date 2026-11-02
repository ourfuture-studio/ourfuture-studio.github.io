/** Row-provenance JOIN model. This educational model does not execute Oracle SQL.
 * Definitions: https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Joins.html
 * NULL comparison: https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Nulls.html
 */
const LEFT=[{id:'A1',key:10,label:'가온'},{id:'A2',key:20,label:'나래'},{id:'A3',key:30,label:'다온'}];
const RIGHT=[{id:'B1',key:10,label:'주문201',status:'PAID'},{id:'B2',key:20,label:'주문202',status:'WAIT'},{id:'B3',key:40,label:'주문203',status:'PAID'}];
export const JOIN_FIXTURES={
  basic:{label:'기본: 일치 2쌍·양쪽 미일치',left:LEFT,right:RIGHT},
  duplicate:{label:'중복 키: A1에 B1·B4가 연결',left:LEFT,right:[...RIGHT,{id:'B4',key:10,label:'주문204',status:'PAID'}]},
  nulls:{label:'NULL 키: 양쪽에 NULL 1행씩',left:[...LEFT,{id:'A4',key:null,label:'라온'}],right:[...RIGHT,{id:'B4',key:null,label:'주문204',status:'PAID'}]},
};
const TYPES=['inner','left','right','full','cross'];
const FILTERS=['none','on','where'];
export function evaluateJoin(left,right,type='left',filter='none'){
  if(!Array.isArray(left)||!Array.isArray(right)||!TYPES.includes(type)||!FILTERS.includes(filter))throw new RangeError('Unknown JOIN configuration.');
  if(type==='cross'&&filter==='on')throw new RangeError('CROSS JOIN has no ON clause.');
  const rows=[],usedRight=new Set();
  left.forEach(a=>{
    const matches=right.map((b,index)=>({b,index})).filter(({b})=>
      (type==='cross'||(a.key!==null&&a.key!==undefined&&b.key!==null&&b.key!==undefined&&a.key===b.key))&&
      (filter!=='on'||b.status==='PAID'));
    for(const {b,index} of matches){rows.push({left:a,right:b,kind:'match'});usedRight.add(index);}
    if(!matches.length&&(type==='left'||type==='full'))rows.push({left:a,right:null,kind:'left-only'});
  });
  if(type==='right'||type==='full')right.forEach((b,index)=>{if(!usedRight.has(index))rows.push({left:null,right:b,kind:'right-only'});});
  return filter==='where'?rows.filter(row=>row.right!==null&&row.right.status==='PAID'):rows;
}
export function sqlForJoin(type='left',filter='none'){
  if(!TYPES.includes(type)||!FILTERS.includes(filter)||(type==='cross'&&filter==='on'))throw new RangeError('Unknown JOIN configuration.');
  const join={inner:'INNER JOIN',left:'LEFT OUTER JOIN',right:'RIGHT OUTER JOIN',full:'FULL OUTER JOIN',cross:'CROSS JOIN'}[type];
  return `SELECT a.a_id, a.join_key AS a_key, a.row_label,\n       b.b_id, b.join_key AS b_key, b.payment_status\nFROM visual_a a ${join} visual_b b${type==='cross'?'':'\n  ON a.join_key = b.join_key'+(filter==='on'?" AND b.payment_status = 'PAID'":'')}${filter==='where'?"\nWHERE b.payment_status = 'PAID'":''}\nORDER BY a.a_id NULLS LAST, b.b_id NULLS LAST;`;
}
export function fixtureSQL(preset='basic'){
  const fixture=JOIN_FIXTURES[preset];if(!fixture)throw new RangeError('Unknown fixture.');
  const q=value=>value===null?'NULL':typeof value==='number'?String(value):`'${String(value).replaceAll("'","''")}'`;
  return 'CREATE TABLE visual_a (a_id VARCHAR2(2) PRIMARY KEY, join_key NUMBER, row_label VARCHAR2(20));\nCREATE TABLE visual_b (b_id VARCHAR2(2) PRIMARY KEY, join_key NUMBER, row_label VARCHAR2(20), payment_status VARCHAR2(4));\n'+fixture.left.map(a=>`INSERT INTO visual_a VALUES (${q(a.id)}, ${q(a.key)}, ${q(a.label)});`).join('\n')+'\n'+fixture.right.map(b=>`INSERT INTO visual_b VALUES (${q(b.id)}, ${q(b.key)}, ${q(b.label)}, ${q(b.status)});`).join('\n');
}
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cell=value=>value===null?'<span class="sqlv-null">NULL</span>':esc(value);
const JOIN_NAMES={inner:'내부 조인(Inner Join)',left:'왼쪽 외부 조인(Left Outer Join)',right:'오른쪽 외부 조인(Right Outer Join)',full:'완전 외부 조인(Full Outer Join)',cross:'교차 조인(Cross Join)'};

function portraitDiagram(fixture,rows,selected){
  const aY=index=>66+index*51,bBase=66+fixture.left.length*51+59,bY=index=>bBase+index*51;
  const chosen=rows[selected],selectedA=chosen?.left?.id,selectedB=chosen?.right?.id;
  const source=(row,index,side)=>{
    const cy=side==='left'?aY(index):bY(index),used=rows.some(pair=>(side==='left'?pair.left:pair.right)?.id===row.id);
    const active=row.id===(side==='left'?selectedA:selectedB);
    return `<g class="sqlv-join-source${used?'':' sqlv-join-dropped'}${active?' sqlv-join-selected':''}" data-source-id="${row.id}"><rect x="14" y="${cy-22}" width="282" height="43" rx="6"/><text x="25" y="${cy-5}" class="sqlv-join-row-label">${esc(row.id)} · ${esc(row.label)}${side==='right'?' · '+esc(row.status):''}</text><text x="25" y="${cy+13}" class="sqlv-join-key">join_key = ${row.key===null?'NULL':esc(row.key)}</text></g>`;
  };
  const edges=rows.map((row,index)=>({row,index})).sort((a,b)=>(a.index===selected)-(b.index===selected)).map(({row,index})=>{
    const ly=row.left?aY(fixture.left.findIndex(a=>a.id===row.left.id)):null,ry=row.right?bY(fixture.right.findIndex(b=>b.id===row.right.id)):null;
    const cls=`sqlv-join-edge${index===selected?' sqlv-join-active':''}`;
    if(row.left&&row.right){const lane=316+(index%6)*10;return `<path class="${cls}" d="M296 ${ly} L${lane-6} ${ly} Q${lane} ${ly},${lane} ${ly+8} L${lane} ${ry-8} Q${lane} ${ry},${lane-6} ${ry} L296 ${ry}" data-pair="${row.left.id}:${row.right.id}"/>`;}
    const cy=ly??ry;
    return `<path class="${cls} sqlv-join-padding" d="M296 ${cy} L317 ${cy}"/><text x="320" y="${cy+4}" class="sqlv-join-padding-label">${row.left?'B':'A'} = NULL</text>`;
  }).join('');
  return `<svg class="sqlv-join-svg" data-layout="portrait" viewBox="0 0 390 ${bBase+fixture.right.length*51+8}" role="img" aria-label="A표와 B표의 행 대응과 NULL 보완"><title>원본 행을 위아래로 놓고 연결</title><desc>위는 A표, 아래는 B표입니다. 오른쪽 연결선이 실제로 출력된 행 쌍을 이으며 선택한 결과의 두 원본은 파란 테두리입니다. 상대가 없는 보존 행의 NULL 보완은 주황 점선으로 표시합니다.</desc><text x="14" y="25" class="sqlv-join-table-title">A · 왼쪽 표 (Left Table)</text><text x="14" y="${bBase-36}" class="sqlv-join-table-title">B · 오른쪽 표 (Right Table)</text>${edges}${fixture.left.map((row,i)=>source(row,i,'left')).join('')}${fixture.right.map((row,i)=>source(row,i,'right')).join('')}</svg>`;
}

function diagram(fixture,rows,selected,mobile=false){
  if(mobile)return portraitDiagram(fixture,rows,selected);
  const count=Math.max(fixture.left.length,fixture.right.length),height=112+count*72;
  const y=index=>100+index*72;
  const selectedRow=rows[selected];
  const selectedA=selectedRow?.left?.id,selectedB=selectedRow?.right?.id;
  const source=(row,index,side)=>{
    const used=rows.some(pair=>(side==='left'?pair.left:pair.right)?.id===row.id);
    const isSelected=row.id===(side==='left'?selectedA:selectedB);
    const x=side==='left'?16:454;
    return `<g class="sqlv-join-source${used?'':' sqlv-join-dropped'}${isSelected?' sqlv-join-selected':''}" data-source-id="${row.id}"><rect x="${x}" y="${y(index)-27}" width="250" height="56" rx="7"/><text x="${x+12}" y="${y(index)-5}" class="sqlv-join-row-label">${esc(row.id)} · ${esc(row.label)}${side==='right'?' · '+esc(row.status):''}</text><text x="${x+12}" y="${y(index)+17}" class="sqlv-join-key">join_key = ${row.key===null?'NULL':esc(row.key)}</text></g>`;
  };
  const edges=rows.map((row,index)=>{
    const ly=row.left?y(fixture.left.findIndex(a=>a.id===row.left.id)):null;
    const ry=row.right?y(fixture.right.findIndex(b=>b.id===row.right.id)):null;
    const current=index===selected;
    const cls=`sqlv-join-edge${current?' sqlv-join-active':''}`;
    if(row.left&&row.right)return `<path class="${cls}" d="M266 ${ly} C338 ${ly},382 ${ry},454 ${ry}" data-pair="${row.left.id}:${row.right.id}"/>`;
    if(row.left)return `<path class="${cls} sqlv-join-padding" d="M266 ${ly} C300 ${ly},314 ${ly-16},342 ${ly-16}"/><text x="360" y="${ly-22}" text-anchor="middle" class="sqlv-join-padding-label">B = NULL</text>`;
    return `<path class="${cls} sqlv-join-padding" d="M454 ${ry} C420 ${ry},410 ${ry+16},382 ${ry+16}"/><text x="360" y="${ry+33}" text-anchor="middle" class="sqlv-join-padding-label">A = NULL</text>`;
  }).join('');
  return `<svg class="sqlv-join-svg" viewBox="0 0 720 ${height}" role="img" aria-label="A표와 B표의 행 대응과 NULL 보완"><title>행마다 어떤 상대와 연결되는지 보기</title><desc>선택한 조인 규칙에 따라 두 표의 행 쌍을 만듭니다. 교차 조인은 모든 조합을, 등호 조인은 키 비교가 TRUE인 쌍을 연결합니다. 실선은 출력된 실제 행 쌍, 주황 점선은 외부 조인으로 반대쪽을 NULL로 보완한 행입니다. 선택한 결과 행의 출처는 파란 테두리와 진한 선으로 표시합니다.</desc><text x="16" y="25" class="sqlv-join-table-title">A · 왼쪽 표 (Left Table)</text><text x="454" y="25" class="sqlv-join-table-title">B · 오른쪽 표 (Right Table)</text><text x="360" y="53" text-anchor="middle" class="sqlv-join-condition">${rows.length?'행을 연결해 결과 생성':'조건을 통과한 행 없음'}</text>${edges}${fixture.left.map((row,i)=>source(row,i,'left')).join('')}${fixture.right.map((row,i)=>source(row,i,'right')).join('')}</svg>`;
}

export function mountJoins(root=document){
  const panel=root.matches?.('[data-sqlv-joins]')?root:root.querySelector('[data-sqlv-joins]');
  if(!panel||panel.dataset.joinMounted)return;
  panel.dataset.joinMounted='true';
  const mobile=window.matchMedia('(max-width:650px)');
  const state={preset:'basic',type:'left',filter:'none',selected:0};
  const type=panel.querySelector('#sqlv-join-type'),preset=panel.querySelector('#sqlv-join-preset'),filter=panel.querySelector('#sqlv-join-filter');
  const write=(name,value)=>{panel.querySelector(`[data-join-output="${name}"]`).textContent=value;};
  const render=()=>{
    const fixture=JOIN_FIXTURES[state.preset],rows=evaluateJoin(fixture.left,fixture.right,state.type,state.filter);
    if(state.selected>=rows.length)state.selected=0;
    filter.querySelector('option[value="on"]').disabled=state.type==='cross';
    const match=rows.filter(row=>row.kind==='match').length;
    write('count',`${rows.length}행`);write('count-detail',`실제 행 쌍 ${match}개 + NULL 보완 행 ${rows.length-match}개`);
    panel.querySelector('[data-join-output="diagram"]').innerHTML=diagram(fixture,rows,state.selected,mobile.matches);
    panel.querySelector('[data-join-output="sql"]').textContent=sqlForJoin(state.type,state.filter);
    panel.querySelector('[data-join-output="fixture-sql"]').textContent=fixtureSQL(state.preset);
    const explanation={inner:'ON 조건이 TRUE인 행 쌍만 출력합니다. 상대가 없거나 비교 결과가 UNKNOWN인 행은 나오지 않습니다.',left:'A의 각 행을 기준으로 상대를 찾습니다. 여러 B행이 맞으면 여러 번 출력하고, 맞는 B행이 없으면 B쪽 열을 NULL로 보완합니다.',right:'B의 각 행을 남깁니다. 맞는 A행이 없으면 A쪽 열을 NULL로 보완합니다.',full:'양쪽에서 조건에 맞지 않은 행도 각각 남기고, 없는 반대쪽 열을 NULL로 보완합니다.',cross:'등호 조건 없이 A의 모든 행과 B의 모든 행을 짝짓습니다. NULL 키가 있어도 행 조합에 참여합니다.'}[state.type];
    const filterExplanation=state.filter==='on'?" 추가 조건 b.payment_status = 'PAID'도 ON에서 평가합니다. 외부 조인은 그 조건을 통과할 상대가 없는 보존 쪽 행도 NULL로 보완합니다.":state.filter==='where'?" 조인 결과에 WHERE b.payment_status = 'PAID'를 적용합니다. WAIT는 FALSE, NULL 보완 행의 조건은 UNKNOWN이므로 둘 다 제거합니다.":'';
    const fixtureExplanation=state.preset==='duplicate'?' 키10의 A1은 B1·B4 두 행과 연결됩니다. 조인은 키의 집합이 아니라 행 쌍을 만들므로 A1도 두 번 나옵니다.':state.preset==='nulls'&&state.type!=='cross'?' A4와 B4의 키가 모두 NULL이어도 NULL = NULL은 UNKNOWN이므로 서로 연결되지 않습니다.':'';
    write('explanation',explanation+filterExplanation+fixtureExplanation);
    const tbody=panel.querySelector('[data-join-output="result-body"]');
    tbody.innerHTML=rows.map((row,index)=>`<tr${index===state.selected?' class="sqlv-join-result-selected"':''}><th scope="row"><button type="button" data-select-pair="${index}" aria-pressed="${index===state.selected}" aria-label="결과 ${index+1}행의 원본 연결 강조">${index+1}행</button></th><td>${cell(row.left?.id??null)}</td><td>${cell(row.left?.key??null)}</td><td>${cell(row.right?.id??null)}</td><td>${cell(row.right?.key??null)}</td><td>${cell(row.right?.status??null)}</td></tr>`).join('');
    panel.querySelector('[data-join-output="empty"]').hidden=rows.length>0;
    write('selection',rows.length?`선택한 ${state.selected+1}행: ${rows[state.selected].left?.id??'A쪽 NULL 보완'} ↔ ${rows[state.selected].right?.id??'B쪽 NULL 보완'}`:'출력 행이 없습니다. 조건이나 조인 종류를 바꿔 보세요.');
    write('state',`${JOIN_NAMES[state.type]} · ${JOIN_FIXTURES[state.preset].label} · 결과 ${rows.length}행`);
  };
  type.addEventListener('change',()=>{state.type=type.value;if(state.type==='cross'&&state.filter==='on'){state.filter='none';filter.value='none';}state.selected=0;render();});
  preset.addEventListener('change',()=>{state.preset=preset.value;state.selected=0;render();});
  filter.addEventListener('change',()=>{state.filter=filter.value;state.selected=0;render();});
  panel.querySelector('[data-join-output="result-body"]').addEventListener('click',event=>{const button=event.target.closest('[data-select-pair]');if(button){state.selected=+button.dataset.selectPair;render();panel.querySelector(`[data-select-pair="${state.selected}"]`).focus();}});
  panel.querySelector('#sqlv-join-reset').addEventListener('click',()=>{Object.assign(state,{preset:'basic',type:'left',filter:'none',selected:0});type.value='left';preset.value='basic';filter.value='none';render();});
  mobile.addEventListener('change',render);
  render();
}
