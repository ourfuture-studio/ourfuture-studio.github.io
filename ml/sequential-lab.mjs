// Small teaching model: subsequence membership, not an implementation of PrefixSpan.
export const SEQUENCES = Object.freeze([
  Object.freeze({id:'S1', items:Object.freeze(['A','B','C'])}),
  Object.freeze({id:'S2', items:Object.freeze(['A','D','B','C'])}),
  Object.freeze({id:'S3', items:Object.freeze(['B','A','C'])}),
  Object.freeze({id:'S4', items:Object.freeze(['A','C','B'])})
]);

export function findOccurrence(sequence, pattern, allowGaps=true) {
  if(!pattern.length) return null;
  if(!allowGaps) {
    for(let start=0;start+pattern.length<=sequence.length;start++) {
      if(pattern.every((item,i)=>sequence[start+i]===item)) return pattern.map((_,i)=>start+i);
    }
    return null;
  }
  const positions=[];
  for(let i=0, j=0;i<sequence.length;i++) {
    if(sequence[i]===pattern[j]) {
      positions.push(i); j++;
      if(j===pattern.length) return positions;
    }
  }
  return null;
}

export function analyze(records, pattern, allowGaps=true, minimum=50) {
  if(!Number.isFinite(minimum)||minimum<0||minimum>100) throw new RangeError('Minimum support must be between 0 and 100.');
  const rows=records.map(record=>({...record,positions:findOccurrence(record.items,pattern,allowGaps)}));
  const count=rows.filter(row=>row.positions!==null).length;
  const support=records.length ? count/records.length : null;
  return {rows,count,total:records.length,support,frequent:support!==null&&support*100>=minimum};
}

if(typeof document!=='undefined') {
  const pattern=document.getElementById('sequence-pattern');
  const gaps=document.getElementById('sequence-gaps');
  const minimum=document.getElementById('sequence-minsup');
  const result=document.getElementById('sequence-result');
  const tbody=document.getElementById('sequence-rows');
  function render() {
    const value=analyze(SEQUENCES,[...pattern.value],gaps.checked,Number(minimum.value));
    document.getElementById('sequence-condition').textContent=`찾는 순서: ${[...pattern.value].join(' → ')}. ${gaps.checked?'중간 활동을 건너뛸 수 있습니다.':'바로 이어지는 활동만 인정합니다.'}`;
    result.textContent=`${value.total}개 기록 중 ${value.count}개에 포함됩니다. 지지도는 ${value.support*100}%이며 최소 지지도 ${minimum.value}%를 ${value.frequent?'만족합니다.':'만족하지 않습니다.'}`;
    tbody.replaceChildren(...value.rows.map(row=>{
      const tr=document.createElement('tr');
      const name=document.createElement('td');name.textContent=row.id;
      const trackCell=document.createElement('td');
      const track=document.createElement('div');track.className='sequence-track';
      track.setAttribute('aria-label',`${row.id}의 기록: ${row.items.join(' 다음 ')}`);
      row.items.forEach((item,i)=>{
        if(i){const arrow=document.createElement('span');arrow.className='sequence-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='→';track.append(arrow);}
        const event=document.createElement('span');event.className='sequence-event'+(row.positions?.includes(i)?' matched':'');event.textContent=item;track.append(event);
      });
      trackCell.append(track);
      const outcome=document.createElement('td');outcome.textContent=row.positions!==null?'포함':'미포함';
      tr.append(name,trackCell,outcome);return tr;
    }));
  }
  [pattern,gaps,minimum].forEach(control=>control.addEventListener('change',render));
  document.getElementById('sequence-reset').addEventListener('click',()=>{pattern.value='AB';gaps.checked=true;minimum.value='50';render();});
  render();
}
