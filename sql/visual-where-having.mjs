/** Educational row/group pipeline. No database, records or network are accessed. */
export const WHERE_HAVING_FIXTURES={
  basic:{label:'기본: 고객별 주문 2건씩',rows:[{id:'O1',customer:'A',amount:100},{id:'O2',customer:'A',amount:10},{id:'O3',customer:'B',amount:60},{id:'O4',customer:'B',amount:60},{id:'O5',customer:'C',amount:30},{id:'O6',customer:'C',amount:20}]},
  nulls:{label:'NULL 금액·NULL 고객 포함',rows:[{id:'O1',customer:'A',amount:100},{id:'O2',customer:'A',amount:null},{id:'O3',customer:'B',amount:null},{id:'O4',customer:'B',amount:null},{id:'O5',customer:null,amount:60},{id:'O6',customer:null,amount:20}]},
  empty:{label:'입력 행이 없는 표',rows:[]},
};
const DEFAULTS={mode:'both',rowThreshold:25,groupThreshold:100};
function config(state={}){
  const result={...DEFAULTS,...state};
  if(!['none','where','having','both'].includes(result.mode)||!Number.isFinite(result.rowThreshold)||!Number.isFinite(result.groupThreshold))throw new RangeError('Invalid WHERE/HAVING configuration.');
  return result;
}
export function evaluateWhereHaving(rows,state={}){
  const settings=config(state),usesWhere=['where','both'].includes(settings.mode),usesHaving=['having','both'].includes(settings.mode);
  const input=rows.map(row=>{
    if(typeof row.id!=='string'||!(row.customer===null||typeof row.customer==='string')||!(row.amount===null||Number.isFinite(row.amount)))throw new TypeError('Rows require a string id, string/null customer and finite amount/null.');
    return {...row};
  });
  const passesWhere=row=>!usesWhere||(row.amount!==null&&row.amount>=settings.rowThreshold);
  const afterWhere=input.filter(passesWhere),whereRemoved=input.filter(row=>!passesWhere(row));
  const map=new Map();
  for(const row of afterWhere){
    const key=row.customer;
    if(!map.has(key))map.set(key,{customer:key,rows:[],sourceIds:[],total:null,rowCount:0,nonNullCount:0});
    const group=map.get(key);group.rows.push({...row});group.sourceIds.push(row.id);group.rowCount++;
    if(row.amount!==null){group.total=(group.total??0)+row.amount;group.nonNullCount++;}
  }
  const groups=[...map.values()].sort((a,b)=>a.customer===null?b.customer===null?0:1:b.customer===null?-1:a.customer<b.customer?-1:a.customer>b.customer?1:0);
  for(const group of groups)group.passesHaving=!usesHaving||(group.total!==null&&group.total>=settings.groupThreshold);
  const output=groups.filter(group=>group.passesHaving),havingRemoved=groups.filter(group=>!group.passesHaving);
  return {settings,usesWhere,usesHaving,input,afterWhere,whereRemoved,groups,output,havingRemoved};
}
export function sqlForWhereHaving(state={}){
  const s=config(state);
  return 'SELECT customer, COUNT(*) AS row_count,\n       COUNT(amount) AS amount_count, SUM(amount) AS total\nFROM visual_orders'+(['where','both'].includes(s.mode)?`\nWHERE amount >= ${s.rowThreshold}`:'')+'\nGROUP BY customer'+(['having','both'].includes(s.mode)?`\nHAVING SUM(amount) >= ${s.groupThreshold}`:'')+'\nORDER BY customer NULLS LAST;';
}
export function fixtureSQL(preset='basic'){
  const rows=WHERE_HAVING_FIXTURES[preset]?.rows;
  if(!rows)throw new RangeError('Unknown teaching fixture.');
  const literal=value=>value===null?'NULL':typeof value==='number'?String(value):"'"+value.replaceAll("'","''")+"'";
  return 'CREATE TABLE visual_orders (id VARCHAR2(12), customer VARCHAR2(12), amount NUMBER);\n'+rows.map(row=>`INSERT INTO visual_orders VALUES (${literal(row.id)}, ${literal(row.customer)}, ${literal(row.amount)});`).join('\n');
}

const esc=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const text=value=>value===null?'NULL':String(value);
const customerLabel=customer=>customer===null?'고객 NULL':`고객 ${customer}`;
const color=customer=>customer===null?'null':customer==='A'?'a':customer==='B'?'b':customer==='C'?'c':'other';
function rowCards(rows,retainedIds=null){
  if(!rows.length)return '<p class="wh-empty">입력 행 없음</p>';
  return rows.map(row=>{
    const removed=retainedIds&&!retainedIds.has(row.id);
    return `<div class="wh-row wh-color-${color(row.customer)}${removed?' wh-removed':''}" data-wh-row="${esc(row.id)}"><span class="wh-row-id">${esc(row.id)}</span><strong>${esc(customerLabel(row.customer))}</strong><span class="wh-amount">${esc(text(row.amount))}</span>${removed?'<span class="wh-row-state">제외</span>':''}</div>`;
  }).join('');
}
function groupCards(groups,showHaving=false){
  if(!groups.length)return '<p class="wh-empty">만들어진 그룹 없음</p>';
  return groups.map(group=>`<div class="wh-group wh-color-${color(group.customer)}${showHaving&&!group.passesHaving?' wh-removed':''}"><div><strong>${esc(customerLabel(group.customer))}</strong><span class="wh-group-total">SUM = ${esc(text(group.total))}</span></div><p>${group.rows.map(row=>`<span class="wh-mini-row">${esc(row.id)}: ${esc(text(row.amount))}</span>`).join('')}</p><small>COUNT(*) ${group.rowCount} · COUNT(amount) ${group.nonNullCount}${showHaving?' · '+(group.passesHaving?'그룹 유지':'그룹 제외'):''}</small></div>`).join('');
}
function mountPanel(panel){
  if(panel.dataset.whMounted==='true')return;
  panel.dataset.whMounted='true';
  const state={...DEFAULTS,preset:'basic'};
  const get=name=>panel.querySelector(`[data-wh-output="${name}"]`);
  const render=()=>{
    const result=evaluateWhereHaving(WHERE_HAVING_FIXTURES[state.preset].rows,state);
    const retained=new Set(result.afterWhere.map(row=>row.id));
    get('input').innerHTML=rowCards(result.input);
    get('where').innerHTML=rowCards(result.input,retained);
    get('groups').innerHTML=groupCards(result.groups);
    get('having').innerHTML=groupCards(result.groups,true);
    get('from-count').textContent=`${result.input.length}행`;
    get('where-count').textContent=`${result.afterWhere.length}행 유지 · ${result.whereRemoved.length}행 제외`;
    get('group-count').textContent=`${result.groups.length}그룹`;
    get('having-count').textContent=`${result.output.length}그룹 유지 · ${result.havingRemoved.length}그룹 제외`;
    get('where-rule').textContent=result.usesWhere?`amount ≥ ${state.rowThreshold}인 원본 행만 유지`:'WHERE 조건 생략: 모든 입력 행 유지';
    get('having-rule').textContent=result.usesHaving?`SUM(amount) ≥ ${state.groupThreshold}인 그룹만 유지`:'HAVING 조건 생략: 모든 그룹 유지';
    get('result-body').innerHTML=result.output.map(group=>`<tr><th scope="row">${esc(text(group.customer))}</th><td>${group.rowCount}</td><td>${group.nonNullCount}</td><td>${esc(text(group.total))}</td><td>${group.sourceIds.map(esc).join(', ')}</td></tr>`).join('');
    get('result-empty').hidden=result.output.length>0;
    get('result-count').textContent=`최종 ${result.output.length}행`;
    get('sql').textContent=sqlForWhereHaving(state);
    get('fixture-sql').textContent=fixtureSQL(state.preset);
    get('status').textContent=`${result.input.length}개 입력 행 → WHERE 뒤 ${result.afterWhere.length}행 → GROUP BY ${result.groups.length}그룹 → HAVING 뒤 ${result.output.length}개 결과 행. WHERE는 각 행의 금액을, HAVING은 그룹의 합계를 비교합니다.`;
    const nonNullRows=result.afterWhere.filter(row=>row.amount!==null).length;
    get('null-note').textContent=state.preset==='nulls'?`NULL 금액은 WHERE 비교에서 UNKNOWN이 되어 제외됩니다(WHERE를 켠 경우). SUM은 NULL 금액을 제외합니다. 남은 ${result.afterWhere.length}행 중 합계에 쓰이는 금액은 ${nonNullRows}개이며, 금액이 전부 NULL인 그룹의 SUM은 NULL입니다. NULL 고객 값들은 같은 그룹으로 묶입니다.`:'각 색은 같은 고객 그룹입니다. 빗금과 “제외” 표시는 해당 단계에서 사라지는 행 또는 그룹입니다. 이미 WHERE에서 제외된 행은 뒤의 SUM에 들어가지 않습니다.';
  };
  for(const input of panel.querySelectorAll('[data-wh-number]'))input.addEventListener('input',()=>{
    if(input.value===''||!input.checkValidity())return;
    const name=input.dataset.whNumber;state[name]=Number(input.value);
    panel.querySelector(`[data-wh-range="${name}"]`).value=input.value;render();
  });
  for(const input of panel.querySelectorAll('[data-wh-range]'))input.addEventListener('input',()=>{
    const name=input.dataset.whRange;state[name]=Number(input.value);
    panel.querySelector(`[data-wh-number="${name}"]`).value=input.value;render();
  });
  for(const input of panel.querySelectorAll('[data-wh-select]'))input.addEventListener('change',()=>{state[input.dataset.whSelect]=input.value;render();});
  const setAll=values=>{
    Object.assign(state,values);
    for(const input of panel.querySelectorAll('[data-wh-number],[data-wh-range],[data-wh-select]'))input.value=state[input.dataset.whNumber||input.dataset.whRange||input.dataset.whSelect];
    render();
  };
  panel.querySelector('[data-wh-reset]').addEventListener('click',()=>setAll({...DEFAULTS,preset:'basic'}));
  panel.querySelector('[data-wh-demo]').addEventListener('click',()=>setAll({preset:'basic',mode:'where',rowThreshold:50,groupThreshold:50}));
  render();
}
export function mountWhereHaving(root=document){root.querySelectorAll('[data-sqlv-where-having]').forEach(mountPanel);}
