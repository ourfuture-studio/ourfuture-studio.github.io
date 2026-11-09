(function () {
  'use strict';
  const $=id=>document.getElementById(id);
  const core=window.AtlasSearchCore;
  const index=core.createIndex(window.TIMELINE_DATA,window.AtlasPeople.profiles);
  const state={query:'',scope:'all',limit:8,results:null};
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};

  function choose(record){
    $('search-results').hidden=true;
    window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:record}));
    $('search-count').textContent='결과 다시 보기';
  }
  function resultButton(record){
    const b=node('button','global-search-result');b.type='button';b.dataset.resultId=record.id;b.dataset.resultKind=record.kind;
    const marker=node('span','search-result-marker mono',record.kind==='person'?'인물':String(record.year));
    const copy=node('span','search-result-copy');copy.append(node('strong','',record.title));
    if(record.subtitle&&record.subtitle!==record.title)copy.append(node('span','search-result-subtitle',record.subtitle));
    if(record.kind==='work'&&record.summary)copy.append(node('span','search-result-description',record.summary));
    b.append(marker,copy,node('span','search-result-arrow','↗'));
    b.setAttribute('aria-label',(record.kind==='person'?'인물 ':'연구 '+record.year+'년 ')+record.title+' 열기');
    b.addEventListener('click',()=>choose(record));return b;
  }
  function group(kind,records,title){
    const el=node('section','search-result-group');el.dataset.kind=kind;
    const heading=node('h3','');heading.append(document.createTextNode(title),node('span','mono',String(records.length)));el.append(heading);
    const list=node('div','search-result-list');const limit=state.scope==='all'&&kind==='person'&&state.limit===8?4:state.limit;
    records.slice(0,limit).forEach(r=>list.append(resultButton(r)));el.append(list);return el;
  }
  function render(){
    const q=state.query.trim();$('search-close').hidden=!q;$('search-shortcut').hidden=!!q;
    $('search-count').hidden=!q;
    if(!q){state.results=null;$('search-results').hidden=true;$('search-count').textContent='';$('search-examples').hidden=false;$('search-result-groups').replaceChildren();$('search-more').hidden=true;return;}
    $('search-examples').hidden=true;
    const results=core.search(index,q,state.scope);state.results=results;
    const people=results.people||[],works=results.works||[];
    $('search-results').hidden=false;
    $('search-count').textContent=String(results.total)+'개 결과';
    $('search-results-summary').textContent='인물 '+people.length+'명 · 연구 기록 '+works.length+'개';
    const groups=$('search-result-groups');groups.replaceChildren();
    const firstWorks=/\d{4}/.test(q);
    const addPeople=()=>{if(people.length&&state.scope!=='work')groups.append(group('person',people,'인물'));};
    const addWorks=()=>{if(works.length&&state.scope!=='person')groups.append(group('work',works,'연구 기록'));};
    if(firstWorks){addWorks();addPeople();}else{addPeople();addWorks();}
    groups.classList.toggle('two-groups',groups.childElementCount===2);
    $('search-empty').hidden=results.total>0;
    $('search-more').hidden=!(works.length>state.limit||people.length>(state.scope==='all'&&state.limit===8?4:state.limit));
    for(const b of document.querySelectorAll('[data-search-scope]')){const active=b.dataset.searchScope===state.scope;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}
  }
  function search(query){state.query=query;state.limit=8;$('search-input').value=query;render();}
  function reset(focus=false){state.query='';state.scope='all';state.limit=8;$('search-input').value='';render();if(focus)$('search-input').focus();}
  $('search-input').addEventListener('input',e=>search(e.target.value));
  $('search-input').addEventListener('focus',()=>{if(state.query.trim())render();});
  $('search-input').addEventListener('keydown',e=>{
    if(e.key==='Escape'){e.preventDefault();reset(true);}
    else if(!state.query.trim())return;
    else if(e.key==='ArrowDown'){render();const first=$('search-result-groups').querySelector('button');if(first){e.preventDefault();first.focus();}}
    else if(e.key==='Enter'){
      e.preventDefault();render();if(state.results?.total===1)choose([...(state.results.people||[]),...(state.results.works||[])][0]);
    }
  });
  $('search-close').addEventListener('click',()=>reset(true));
  $('search-count').addEventListener('click',render);
  $('search-hide').addEventListener('click',()=>{$('search-results').hidden=true;$('search-count').textContent='결과 다시 보기';$('search-count').focus({preventScroll:true});});
  $('search-open').addEventListener('click',()=>{$('search-input').focus();$('search-input').select();if(state.query.trim())render();});
  document.querySelectorAll('[data-search-example]').forEach(b=>b.addEventListener('click',()=>{state.scope='all';search(b.dataset.searchExample);const heading=$('search-results').querySelector('h2');heading.tabIndex=-1;heading.focus({preventScroll:true});}));
  document.querySelectorAll('[data-search-scope]').forEach(b=>b.addEventListener('click',()=>{state.scope=b.dataset.searchScope;state.limit=8;render();}));
  $('search-more').addEventListener('click',()=>{const before=new Set([...$('search-result-groups').querySelectorAll('button')].map(b=>b.dataset.resultId));state.limit+=12;render();const target=[...$('search-result-groups').querySelectorAll('button')].find(b=>!before.has(b.dataset.resultId))||$('search-more');if(!target.hidden)target.focus({preventScroll:true});});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!document.querySelector('dialog[open]')&&!e.target.closest('input,textarea,[contenteditable="true"]')){e.preventDefault();$('search-input').focus();}});
  window.AtlasSearch={search,reset,hide:()=>{$('search-results').hidden=true;},get index(){return index;}};
  render();
})();
