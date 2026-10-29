(() => {
  const $=id=>document.getElementById(id);
  let data,episode,variant,queryIndex=0,worker=null,serial=0,generation=0,busy=false,pending=new Map(),reviewedDataset=true;
  function status(text,type=''){ $('status').textContent=text;$('status').className='status '+type; }
  function setBusy(value){busy=value;for(const id of ['run','run-all','reset-data','reset-sql','prev','next'])$(id).disabled=value;$('episode-select').disabled=value;$('sql').disabled=value;for(const b of document.querySelectorAll('#variants button,#query-tabs button'))b.disabled=value;}
  function stopWorker(){if(worker)worker.terminate();worker=null;for(const p of pending.values()){clearTimeout(p.timer);p.reject(new Error('실행기를 다시 시작했습니다.'));}pending.clear();}
  function request(type,payload={}){
    return new Promise((resolve,reject)=>{
      if(!worker)return reject(new Error('실행기가 없습니다. 다시 불러와 주세요.'));
      const id=++serial;
      const timer=setTimeout(()=>{pending.delete(id);stopWorker();$('reload').hidden=false;reject(new Error('실행 시간이 길어 중단했습니다. 실행기를 다시 불러오면 원본 자료로 시작합니다.'));},type==='init'?20000:5000);
      pending.set(id,{resolve,reject,timer});worker.postMessage({id,type,...payload});
    });
  }
  function createWorker(){
    stopWorker();worker=new Worker('engine-worker.js');
    worker.onmessage=event=>{const p=pending.get(event.data.id);if(!p)return;clearTimeout(p.timer);pending.delete(event.data.id);p.resolve(event.data);};
    worker.onerror=()=>{status('SQL 실행기를 불러오지 못했습니다. 다시 불러오기를 눌러 주세요.','error');$('reload').hidden=false;stopWorker();setBusy(false);};
  }
  function cell(value){
    const td=document.createElement('td');
    if(value===null){const em=document.createElement('em');em.className='null';em.textContent='NULL';td.append(em);}
    else if(value===''){td.textContent="'' (빈 문자열)";}
    else{td.textContent=String(value);if(typeof value==='number')td.className='number';}
    return td;
  }
  function makeTable(columns,values,label){
    const wrap=document.createElement('div');wrap.className='table-wrap';
    const table=document.createElement('table');table.setAttribute('aria-label',label);
    const head=document.createElement('thead'),tr=document.createElement('tr');
    for(const column of columns){const th=document.createElement('th');th.scope='col';th.textContent=column;tr.append(th);}head.append(tr);
    const body=document.createElement('tbody');for(const row of values){const r=document.createElement('tr');for(const value of row)r.append(cell(value));body.append(r);}table.append(head,body);wrap.append(table);return wrap;
  }
  function showTables(tables){
    const target=$('source-tables');target.replaceChildren();
    for(const table of tables){
      const caption=document.createElement('div');caption.className='table-caption';const code=document.createElement('code');code.textContent=table.name;const count=document.createElement('small');count.textContent=table.error?'표를 읽을 수 없음':table.values.length+(table.truncated?'행 이상':'행');caption.append(code,count);target.append(caption);
      if(table.note){const note=document.createElement('div');note.className='muted';note.textContent=table.note;target.append(note);}
      if(table.error){const error=document.createElement('p');error.className='muted';error.textContent=table.error;target.append(error);}
      else{target.append(makeTable(table.columns,table.values,table.name+' 원본 자료'));if(!table.values.length){const empty=document.createElement('p');empty.className='muted';empty.textContent='이 표에는 행이 없습니다.';target.append(empty);}}
    }
  }
  function showResult(sql,response,label,append=false,reviewed=false){
    const target=$('results');if(!append)target.replaceChildren();
    const section=document.createElement('section');section.className='result-block';
    const heading=document.createElement('div');heading.className='result-heading';const title=document.createElement('h2');title.textContent=label+' 실행 결과';heading.append(title);section.append(heading);
    const scope=document.createElement('p');scope.className='muted result-scope';scope.dataset.scope=reviewed?'reviewed':'custom';scope.textContent=reviewed?'등록 문제 · Oracle 19c 문서 대조 범위의 고정 입력':'자유 실험 · Oracle 결과 미대조';section.append(scope);
    const executed=document.createElement('pre');executed.className='result-sql';executed.textContent=sql;section.append(executed);
    if(!response.ok){const error=document.createElement('p');error.className='sql-error';error.textContent='SQL 오류: '+response.error;section.append(error);}
    else if(!response.results.length){const text=document.createElement('p');text.className='empty-result';text.textContent='실행했습니다. 조회 결과 표가 없는 문장입니다. 왼쪽 입력 자료의 변화를 확인하세요.';section.append(text);}
    else for(const result of response.results){
      const count=document.createElement('p');count.className='muted';count.textContent=result.truncated?'처음 200행 표시 · 추가 결과가 있습니다':'결과 '+result.values.length+'행';section.append(count,makeTable(result.columns,result.values,'SQL 실행 결과'));
      if(!result.values.length){const empty=document.createElement('p');empty.className='empty-result';empty.textContent='조건을 통과한 결과 행이 없습니다.';section.append(empty);}
    }
    if(response.trace?.results){const detail=document.createElement('details');detail.className='trace-view';const summary=document.createElement('summary');summary.textContent='계산에 들어간 값과 조건 판정 보기';detail.append(summary);const note=document.createElement('p');note.className='muted';note.textContent=response.trace.title;detail.append(note);for(const result of response.trace.results)detail.append(makeTable(result.columns,result.values,'기본 예제 계산 보조 표'));section.append(detail);}
    target.append(section);if(response.tables)showTables(response.tables);
  }
  function syncQuery(){
    $('sql').value=variant.queries[queryIndex].sql;
    document.querySelectorAll('#query-tabs button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===queryIndex)));
    if($('results').childElementCount)status('선택한 SQL을 다시 실행하면 결과가 갱신됩니다.','stale');
  }
  function queryTabs(){
    const tabs=$('query-tabs');tabs.replaceChildren();
    variant.queries.forEach((q,index)=>{const button=document.createElement('button');button.type='button';button.textContent=q.label;button.setAttribute('aria-pressed',String(index===queryIndex));button.addEventListener('click',()=>{queryIndex=index;syncQuery();});tabs.append(button);});
    $('run-all').hidden=variant.queries.length<2;$('run-all').textContent=episode.topicId?'등록 쿼리 모두 실행':'기본 A/B 함께 실행';syncQuery();
  }
  async function loadVariant(id,{keepSql=false}={}){
    const token=++generation;const previous=$('sql').value;
    variant=episode.variants.find(v=>v.id===id)||episode.variants[0];queryIndex=0;reviewedDataset=true;
    for(const button of document.querySelectorAll('#variants button'))button.setAttribute('aria-pressed',String(button.dataset.id===variant.id));
    $('results').replaceChildren();$('variant-note').textContent=episode.topicId?variant.explanation:(variant.id==='base'?'원래 입력입니다. 결과를 예상한 뒤 SQL을 실행해 보세요.':'원본에서 독립적으로 적용한 조건입니다. 실행 후 아래 풀이와 비교해 보세요.');
    queryTabs();if(keepSql)$('sql').value=previous;
    status('입력 자료와 SQL 실행기를 준비하는 중입니다.');$('reload').hidden=true;setBusy(true);createWorker();
    try{
      const response=await request('init',{schema:episode.schema,setup:variant.setup,tables:episode.tables});
      if(token!==generation)return;if(!response.ok)throw new Error(response.error);
      showTables(response.tables);$('engine').textContent='SQLite '+response.version+' · 이 브라우저에서 실행';
      $('dataset').textContent=episode.datasetVersion+' · 변경은 현재 페이지에서만 유지';
      status('준비되었습니다. 결과를 예상하고 실행해 보세요.');
    }catch(error){if(token===generation){status(error.message,'error');$('reload').hidden=false;}}
    finally{if(token===generation)setBusy(false);}
  }
  function setEpisode(id,replace=false){
    episode=data.episodes.find(e=>e.id===id)||data.episodes[0];
    if(id!==episode.id)status('알 수 없는 문제 번호여서 첫 문제를 열었습니다.');
    const url=new URL(location.href);url.searchParams.set('episode',episode.id);history[replace?'replaceState':'pushState']({},'',url);
    $('episode-select').value=episode.id;$('episode-label').textContent='SQLD · '+(episode.theoryNumber?'이론 '+String(episode.theoryNumber).padStart(2,'0'):'문제 '+String(episode.number).padStart(2,'0'))+' · '+episode.id;
    $('scope-note').textContent=episode.compatibilityNote||'등록된 문제는 Oracle 19c 문서와 동작을 대조한 공통 개념입니다. 고정 입력의 값·행 수·NULL을 비교하며, 자유 편집 결과는 별도 실험입니다.';
    $('oracle-download').hidden=!episode.oracleDownload;if(episode.oracleDownload)$('oracle-download').href=episode.oracleDownload;
    document.title=episode.title+' · SQL 실험실';$('title').replaceChildren(document.createTextNode(episode.title));const dot=document.createElement('span');dot.className='dot';dot.textContent='.';$('title').append(dot);
    $('lede').textContent=episode.lede;$('question').textContent=episode.question;$('explanation').open=false;
    const body=$('explanation-body');body.replaceChildren();for(const text of episode.explanation){const p=document.createElement('p');p.textContent=text;body.append(p);}
    $('boundary').textContent=episode.boundary;$('challenge').textContent=episode.challenge;
    const sources=$('sources');sources.replaceChildren();for(const source of episode.oracleReview.sources){const a=document.createElement('a');a.href=source.url;a.textContent=source.label;a.target='_blank';a.rel='noopener noreferrer';sources.append(a);}
    $('theory-preview').href='theory/'+episode.id+'.html';
    $('theory-link').hidden=!episode.theoryUrl;if(episode.theoryUrl)$('theory-link').href=episode.theoryUrl;
    const variants=$('variants');variants.replaceChildren();for(const v of episode.variants){const button=document.createElement('button');button.type='button';button.textContent=v.label;button.dataset.id=v.id;button.setAttribute('aria-pressed',String(v.id==='base'));button.addEventListener('click',()=>loadVariant(v.id));variants.append(button);}
    loadVariant('base');
  }
  async function run(all=false){
    if(busy)return;if(!$('sql').value.trim()){status('실행할 SQL을 입력해 주세요.','error');return;}
    const known=variant.queries.find(q=>q.sql.trim()===$('sql').value.trim());
    if(!all&&!known)reviewedDataset=false;
    const reviewed=reviewedDataset&&(all||Boolean(known));
    const queries=all?variant.queries.map(q=>({sql:q.sql,label:q.label,trace:q.trace})):[{sql:$('sql').value,label:'SQL',trace:known?.trace}];
    setBusy(true);status('SQL을 실행하는 중입니다.');$('results').replaceChildren();let success=true;
    try{
      for(let i=0;i<queries.length;i++){
        const q=queries[i],response=await request('run',{sql:q.sql,trace:q.trace});showResult(q.sql,response,q.label,true,reviewed);
        if(!response.ok){success=false;status('SQL 오류가 있습니다. 실행한 문장과 오류를 확인해 주세요.','error');break;}
      }
      if(success)status('실행 완료 · 아래 표는 방금 실행한 SQL의 결과입니다.');
    }catch(error){status(error.message,'error');}finally{setBusy(false);}
  }
  $('run').addEventListener('click',()=>run());$('run-all').addEventListener('click',()=>run(true));
  $('reset-sql').addEventListener('click',syncQuery);$('reset-data').addEventListener('click',()=>loadVariant(variant.id,{keepSql:true}));$('reload').addEventListener('click',()=>loadVariant('base'));
  $('sql').addEventListener('input',()=>{if($('results').childElementCount)status('SQL이 수정되었습니다. 아래 결과는 이전 실행값입니다. 다시 실행해 주세요.','stale');});
  $('sql').addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();run();}});
  $('episode-select').addEventListener('change',event=>setEpisode(event.target.value));
  $('prev').addEventListener('click',()=>{const i=data.episodes.indexOf(episode);setEpisode(data.episodes[(i-1+data.episodes.length)%data.episodes.length].id);});
  $('next').addEventListener('click',()=>{const i=data.episodes.indexOf(episode);setEpisode(data.episodes[(i+1)%data.episodes.length].id);});
  window.addEventListener('popstate',()=>{if(data)setEpisode(new URLSearchParams(location.search).get('episode'),true);});
  $('copy-link').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);status('이 문제 주소를 복사했습니다.');}catch{status('주소창의 링크를 복사해 주세요.');}});
  let themeMode=0;const themeValues=['auto','light','dark'];const initial=new URLSearchParams(location.search).get('theme');if(themeValues.includes(initial))themeMode=themeValues.indexOf(initial);
  function theme(){const value=themeValues[themeMode];if(value==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=value;$('theme').textContent='테마: '+['자동','밝게','어둡게'][themeMode];}
  theme();$('theme').addEventListener('click',()=>{themeMode=(themeMode+1)%3;theme();});
  fetch('episodes.json?v=topics-20261029-v2').then(response=>{if(!response.ok)throw new Error('문제 자료를 불러오지 못했습니다.');return response.json();}).then(result=>{
    data=result;const select=$('episode-select');for(const ep of data.episodes){const option=document.createElement('option');option.value=ep.id;option.textContent=(ep.theoryNumber?'이론 '+String(ep.theoryNumber).padStart(2,'0'):String(ep.number).padStart(2,'0'))+' · '+ep.title;select.append(option);}
    setEpisode(new URLSearchParams(location.search).get('episode')||'E001',true);
  }).catch(error=>{status(error.message+' 페이지를 새로고침해 주세요.','error');});
})();
