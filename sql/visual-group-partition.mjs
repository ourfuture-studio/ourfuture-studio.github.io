/** Educational aggregate/analytic comparison; not an Oracle execution receipt.
 * https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Aggregate-Functions.html
 * https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/Analytic-Functions.html
 */
const BASIC=[
  {id:'O01',customer:'C01',category:'책',amount:10},
  {id:'O02',customer:'C02',category:'문구',amount:20},
  {id:'O03',customer:'C01',category:'문구',amount:30},
  {id:'O04',customer:'C03',category:'책',amount:40},
  {id:'O05',customer:'C02',category:'책',amount:50},
  {id:'O06',customer:'C03',category:'문구',amount:60},
];
export const GROUP_FIXTURES={
  basic:{label:'기본: 주문 6행·고객 3명',rows:BASIC},
  nulls:{label:'NULL: 같은 NULL 키·금액이 없는 행',rows:[
    {id:'O01',customer:'C01',category:'책',amount:10},
    {id:'O02',customer:null,category:'책',amount:20},
    {id:'O03',customer:'C01',category:'문구',amount:null},
    {id:'O04',customer:null,category:'문구',amount:30},
    {id:'O05',customer:'C03',category:null,amount:null},
    {id:'O06',customer:'C03',category:null,amount:null},
  ]},
  duplicate:{label:'같은 금액: 별도 주문도 각각 계산',rows:[...BASIC,{id:'O07',customer:'C01',category:'책',amount:10}]},
  empty:{label:'빈 표: 주문이 0행',rows:[]},
};
const KEYS=['customer','category'],AGGREGATES=['sum','countAll','countAmount','avg'];
const cmp=(a,b)=>a===b?0:a===null?-1:b===null?1:a<b?-1:1;
function validate(groupKey,aggregate){if(!KEYS.includes(groupKey)||!AGGREGATES.includes(aggregate))throw new RangeError('Unknown grouping key or aggregate.');}
export function evaluateGroupPartition(rows,groupKey='customer',aggregate='sum'){
  validate(groupKey,aggregate);
  if(!Array.isArray(rows))throw new TypeError('Expected rows.');
  const map=new Map();
  for(const row of rows){
    const key=row[groupKey]??null;
    if(!map.has(key))map.set(key,[]);
    map.get(key).push({...row});
  }
  const groups=[...map.entries()].sort(([a],[b])=>cmp(a,b)).map(([key,members],index)=>{
    const values=members.map(row=>row.amount).filter(value=>value!==null&&value!==undefined);
    const total=values.reduce((a,b)=>a+b,0);
    const value=aggregate==='countAll'?members.length:aggregate==='countAmount'?values.length:values.length===0?null:aggregate==='avg'?total/values.length:total;
    return {key,sourceIds:members.map(row=>row.id),rows:members,value,index};
  });
  const groupRows=groups.map(({key,value,sourceIds})=>({key,value,sourceIds:[...sourceIds]}));
  const partitionRows=rows.map(row=>{
    const key=row[groupKey]??null,group=groups.find(g=>g.key===key);
    return {...row,key,value:group.value,sourceIds:[...group.sourceIds]};
  }).sort((a,b)=>cmp(a.id,b.id));
  return {groups,groupRows,partitionRows,inputCount:rows.length,groupCount:groups.length};
}
const aggregateSQL=aggregate=>({sum:'SUM(amount)',countAll:'COUNT(*)',countAmount:'COUNT(amount)',avg:'AVG(amount)'}[aggregate]);
export function sqlForGroupPartition(groupKey='customer',aggregate='sum'){
  validate(groupKey,aggregate);const fn=aggregateSQL(aggregate);
  return {group:`SELECT ${groupKey} AS group_key, ${fn} AS group_value\nFROM visual_group_orders\nGROUP BY ${groupKey}\nORDER BY ${groupKey} NULLS FIRST;`,partition:`SELECT order_id, ${groupKey} AS group_key, amount,\n       ${fn} OVER (PARTITION BY ${groupKey}) AS group_value\nFROM visual_group_orders\nORDER BY order_id;`};
}
export function fixtureSQL(preset='basic'){
  const fixture=GROUP_FIXTURES[preset];if(!fixture)throw new RangeError('Unknown fixture.');
  const quote=value=>value===null?'NULL':typeof value==='number'?String(value):`'${String(value).replaceAll("'","''")}'`;
  return 'CREATE TABLE visual_group_orders (\n  order_id VARCHAR2(8) PRIMARY KEY,\n  customer VARCHAR2(8), category VARCHAR2(20), amount NUMBER\n);\n'+fixture.rows.map(row=>`INSERT INTO visual_group_orders VALUES (${[row.id,row.customer,row.category,row.amount].map(quote).join(', ')});`).join('\n');
}
const esc=value=>String(value??'NULL').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const val=value=>value===null||value===undefined?'<span class="gp-null">NULL</span>':esc(typeof value==='number'?Number(value.toFixed(4)):value);
const keyLabel=key=>key==='customer'?'고객':'구분';
const aggregateLabel=key=>({sum:'합계',countAll:'행 수',countAmount:'금액이 있는 행 수',avg:'평균'}[key]);
function calculation(group,aggregate){
  const nonnull=group.rows.filter(row=>row.amount!==null&&row.amount!==undefined),sum=nonnull.reduce((a,row)=>a+row.amount,0);
  if(aggregate==='countAll')return `${group.rows.length}개 행 모두 계산`;
  if(aggregate==='countAmount')return `금액이 NULL이 아닌 ${nonnull.length}개 행`;
  if(!nonnull.length)return '금액이 모두 NULL → 결과 NULL';
  return aggregate==='avg'?`${sum} ÷ ${nonnull.length} (NULL 제외)`:`${nonnull.map(row=>row.amount).join(' + ')} (NULL 제외)`;
}
function mountPanel(panel){
  if(panel.dataset.gpMounted)return;panel.dataset.gpMounted='true';
  const state={preset:'basic',key:'customer',aggregate:'sum',selected:0};
  const output=(name,value)=>{panel.querySelector(`[data-gp-output="${name}"]`).textContent=value;};
  function render(){
    const fixture=GROUP_FIXTURES[state.preset],model=evaluateGroupPartition(fixture.rows,state.key,state.aggregate);
    if(state.selected>=model.groups.length)state.selected=0;
    const selected=model.groups[state.selected],selectedIds=new Set(selected?.sourceIds??[]);
    output('input-count',`${model.inputCount}행`);output('group-count',`${model.groupCount}행`);output('partition-count',`${model.partitionRows.length}행`);
    panel.querySelector('[data-gp-output="source"]').innerHTML=fixture.rows.map(row=>{
      const group=model.groups.find(g=>g.key===(row[state.key]??null));
      return `<button type="button" class="gp-source-row gp-color-${group.index%4}${selectedIds.has(row.id)?' gp-selected':''}" data-gp-select="${group.index}" aria-label="${esc(row.id)}가 속한 그룹 강조"><strong>${esc(row.id)}</strong><span>${esc(keyLabel(state.key))} ${val(row[state.key])}</span><span>금액 ${val(row.amount)}</span></button>`;
    }).join('')||'<p class="gp-empty">원본 행이 없습니다.</p>';
    panel.querySelector('[data-gp-output="groups"]').innerHTML=model.groups.map(group=>`<button type="button" class="gp-group gp-color-${group.index%4}${group.index===state.selected?' gp-selected':''}" data-gp-select="${group.index}" aria-pressed="${group.index===state.selected}"><strong>${esc(keyLabel(state.key))} ${val(group.key)}</strong><span class="gp-group-members">${group.rows.map(row=>`<span>${esc(row.id)} · ${val(row.amount)}</span>`).join('')}</span><span class="gp-calculation">${esc(aggregateLabel(state.aggregate))}: ${val(group.value)}<small>${esc(calculation(group,state.aggregate))}</small></span></button>`).join('')||'<p class="gp-empty">GROUP BY로 만들 그룹이 없습니다.</p>';
    panel.querySelector('[data-gp-output="group-body"]').innerHTML=model.groupRows.map((row,index)=>`<tr class="gp-color-${index%4}${index===state.selected?' gp-result-selected':''}"><th scope="row"><button type="button" data-gp-select="${index}" aria-label="GROUP BY ${esc(keyLabel(state.key))} ${esc(row.key)} 그룹의 원본 강조">${val(row.key)}</button></th><td>${val(row.value)}</td></tr>`).join('');
    panel.querySelector('[data-gp-output="partition-body"]').innerHTML=model.partitionRows.map(row=>{
      const group=model.groups.find(g=>g.key===row.key);
      return `<tr class="gp-color-${group.index%4}${group.index===state.selected?' gp-result-selected':''}"><th scope="row"><button type="button" data-gp-select="${group.index}" aria-label="PARTITION BY ${esc(row.id)}의 원본 그룹 강조">${esc(row.id)}</button></th><td>${val(row.key)}</td><td>${val(row.amount)}</td><td>${val(row.value)}</td></tr>`;
    }).join('');
    for(const el of panel.querySelectorAll('[data-gp-empty]'))el.hidden=model.inputCount!==0;
    output('selection',selected?`선택한 ${keyLabel(state.key)} ${selected.key??'NULL'} 그룹의 원본: ${selected.sourceIds.join(' · ')}. 두 결과의 색이 같은 행을 비교하세요.`:'원본 0행 → GROUP BY 결과도 0행, PARTITION BY 결과도 0행입니다.');
    const sql=sqlForGroupPartition(state.key,state.aggregate);output('group-sql',sql.group);output('partition-sql',sql.partition);output('fixture-sql',fixtureSQL(state.preset));
    output('status',`${fixture.label} · ${keyLabel(state.key)}별 ${aggregateLabel(state.aggregate)}: 원본 ${model.inputCount}행 → GROUP BY ${model.groupCount}행 / PARTITION BY ${model.partitionRows.length}행.`);
  }
  for(const [id,name] of [['gp-preset','preset'],['gp-key','key'],['gp-aggregate','aggregate']])panel.querySelector('#'+id).addEventListener('change',event=>{state[name]=event.target.value;state.selected=0;render();});
  panel.addEventListener('click',event=>{const button=event.target.closest('[data-gp-select]');if(button){
    const label=button.getAttribute('aria-label'),isGroup=button.classList.contains('gp-group');
    state.selected=+button.dataset.gpSelect;render();
    const replacement=label?[...panel.querySelectorAll('[data-gp-select]')].find(el=>el.getAttribute('aria-label')===label):isGroup?panel.querySelector(`.gp-group[data-gp-select="${state.selected}"]`):null;
    replacement?.focus({preventScroll:true});
  }});
  panel.querySelector('#gp-reset').addEventListener('click',()=>{Object.assign(state,{preset:'basic',key:'customer',aggregate:'sum',selected:0});panel.querySelector('#gp-preset').value='basic';panel.querySelector('#gp-key').value='customer';panel.querySelector('#gp-aggregate').value='sum';render();});
  render();
}
export function mountGroupPartition(root=document){root.querySelectorAll('[data-sqlv-group-partition]').forEach(mountPanel);}
