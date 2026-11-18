(function () {
  'use strict';
  const $=id=>document.getElementById(id), core=window.AtlasCompanyCore;
  const state={companies:[],selected:'google',record:'',view:'timeline',q:'',type:'all',from:'',to:'',ready:false,failed:false};
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const label=c=>c.nameKo||c.name, companyById=id=>state.companies.find(c=>c.id===id);
  const profiles=window.AtlasPeople.profiles, personById=id=>profiles.find(p=>p.id===id);
  const works=new Map();for(const p of profiles)for(const w of p.works)if(!works.has(w.id))works.set(w.id,{person:p,work:w});
  const timeline=new Map((window.TIMELINE_DATA||[]).map(e=>[e.id,e]));
  for(const e of timeline.values())if(!works.has(e.id))works.set(e.id,{person:null,work:e});
  function button(text,fn,cls=''){const b=node('button',cls,text);b.type='button';b.addEventListener('click',fn);return b;}
  function link(text,url){const a=node('a','',text+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
  function mark(c){
    const initials=c.name.replace(/[^a-z0-9]/gi,'').slice(0,2),m=node('span','co-mark');m.setAttribute('aria-hidden','true');m.style.setProperty('--co-accent',c.accent);
    if(c.logo?.src){
      const img=node('img');img.src=c.logo.src+(c.logo.sha256?'?v='+c.logo.sha256.slice(0,12):'');img.alt=(c.logo.label||c.name)+' 로고';img.width=c.logo.width;img.height=c.logo.height;img.loading='lazy';img.decoding='async';
      m.classList.add('has-logo');if(c.logo.width/c.logo.height>1.8)m.classList.add('co-logo-wide');m.style.setProperty('--co-logo-bg',c.logo.background||'#ffffff');
      img.addEventListener('error',()=>{m.replaceChildren(document.createTextNode(initials));m.classList.remove('has-logo','co-logo-wide');},{once:true});m.append(img);
    }else m.textContent=initials;
    return m;
  }
  function route(push=false){
    const p=new URLSearchParams({company:state.selected});if(state.record)p.set('record',state.record);if(state.view==='connections')p.set('view',state.view);
    if(state.q)p.set('cq',state.q);if(state.type!=='all')p.set('kind',state.type);if(state.from)p.set('from',state.from);if(state.to)p.set('to',state.to);
    const hash='#'+p;try{if(hash!==location.hash)history[push?'pushState':'replaceState'](null,'',hash);}catch{}
  }
  function open(companyId,recordId='',view='timeline',filters=null){
    if(!companyById(companyId))return;
    Object.assign(state,{selected:companyId,record:recordId,view,q:'',type:'all',from:'',to:''},filters||{});syncControls();render();route(true);
    window.dispatchEvent(new CustomEvent('atlas:open-companies'));
    $('company-panel').scrollIntoView({block:'start',behavior:'instant'});
  }
  function openRoute(params){
    state.selected=core.ids.includes(params.get('company'))?params.get('company'):state.selected;
    state.record=params.get('record')||'';state.view=params.get('view')==='connections'?'connections':'timeline';
    state.q=params.get('cq')||'';state.type=core.types[params.get('kind')]?params.get('kind'):'all';
    state.from=/^\d{4}$/.test(params.get('from')||'')?params.get('from'):'';state.to=/^\d{4}$/.test(params.get('to')||'')?params.get('to'):'';
    if(state.ready){syncControls();render();}
  }
  function syncControls(){for(const [id,key] of [['company-query','q'],['company-kind','type'],['company-from','from'],['company-to','to']]){$(id).value=state[key];if(key==='from'||key==='to'){$(id).setCustomValidity('');$(id).removeAttribute('aria-invalid');}}}
  function personButton(id,text){const p=personById(id);return p?button(text||p.nameKo||p.name,()=>window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:'person',personId:id}})),'co-pill co-person-link'):null;}
  function workButton(workId,companyId,recordId){
    const found=works.get(workId);if(!found)return null;
    const {person,work}=found;
    return button(work.title+' ↗',()=>{
      const returnFilters={q:state.q,type:state.type,from:state.from,to:state.to},returnView=state.view;
      window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:'work',personId:person?.id,workId:work.id,eventId:timeline.has(work.id)?work.id:work.eventId}}));
      if($('detail-dialog').open){const back=button(label(companyById(companyId))+' 연표로 돌아가기',()=>{$('detail-dialog').close();open(companyId,recordId,returnView,returnFilters);},'co-return');$('detail-person-links').append(back);}
    },'co-work-link');
  }
  function appendPersonLinks(panel,personId){
    panel.querySelector('.co-person-companies')?.remove();
    const companies=state.companies.filter(c=>c.people.some(p=>p.id===personId)||c.events.some(e=>(e.peopleIds||[]).includes(personId)));
    if(!companies.length)return;
    const box=node('section','co-person-companies');box.append(node('h3','','함께 볼 회사·연구조직'));
    const links=node('div','co-pills');for(const c of companies)links.append(button(label(c)+' 연표 ↗',()=>open(c.id),'co-pill'));box.append(links);
    const intro=panel.querySelector('.person-intro')||panel.querySelector('.person-hero');intro?.after(box);
  }
  function keepSelectedCompanyVisible(){
    const list=$('company-list'),active=list?.querySelector('.active');if(!active||$('companies-shell').hidden)return;
    const r=active.getBoundingClientRect(),box=list.getBoundingClientRect();
    if(matchMedia('(max-width:700px)').matches){if(r.left<box.left||r.right>box.right)list.scrollLeft+=r.left-box.left-(box.width-r.width)/2;}
    else if(r.top<box.top||r.bottom>box.bottom)list.scrollTop+=r.top-box.top-(box.height-r.height)/2;
  }
  function renderCatalog(){
    const list=$('company-list'),top=list.scrollTop,left=list.scrollLeft;list.replaceChildren();
    let count=0;
    for(const c of state.companies){
      const events=core.filterEvents(c,state);if(!events.length)continue;count++;
      const b=button('',()=>{state.selected=c.id;state.record='';render();route(true);$('company-list').querySelector('[data-company="'+c.id+'"]')?.focus({preventScroll:true});$('company-panel').scrollIntoView({block:'start',behavior:'instant'});},'co-index-item');b.dataset.company=c.id;
      b.classList.toggle('active',state.selected===c.id);b.setAttribute('aria-pressed',String(state.selected===c.id));
      const copy=node('span','co-index-copy');copy.append(node('strong','',label(c)),node('span','',c.sector));b.append(mark(c),copy,node('span','mono',String(events.length).padStart(2,'0')));list.append(b);
    }
    if(!count)list.append(node('p','co-empty-catalog','조건에 맞는 회사가 없습니다.'));
    $('company-count').textContent=count+' / '+state.companies.length;list.scrollTop=top;list.scrollLeft=left;
    keepSelectedCompanyVisible();
  }
  function renderHero(c){
    const hero=node('header','co-hero');hero.style.setProperty('--co-accent',c.accent);
    const top=node('div','co-hero-top');top.append(mark(c),node('span','mono',c.kind==='team'?'RESEARCH TEAM':c.kind==='organization'?'RESEARCH ORGANIZATION':'COMPANY & RESEARCH'));
    hero.append(top,node('h2','',label(c)));if(c.nameKo&&c.nameKo!==c.name)hero.append(node('p','co-name-en',c.name));
    hero.append(node('p','co-hero-summary',c.summary));
    const question=node('div','co-question');question.append(node('span','mono','어떤 문제를 풀려 했을까'),node('p','',c.question));hero.append(question);
    const years=c.events.map(e=>e.year),meta=node('div','co-hero-meta');meta.append(node('span','mono',Math.min(...years)+' — '+Math.max(...years)),node('span','',c.events.length+'개의 기록'),node('span','',c.sector));
    if(c.logo?.sourcePage){const credit=link('로고 출처',c.logo.sourcePage);credit.className='co-logo-source';meta.append(credit);}hero.append(meta);
    return hero;
  }
  function renderPeople(c){
    const section=node('section','co-people');section.append(node('h3','','함께 읽는 사람들'));const list=node('div','co-role-list');
    for(const p of c.people){const item=node('div','co-role');const b=p.id&&personButton(p.id,p.name+' ↗');item.append(b||node('strong','',p.name),node('span','co-role-title',p.role));if(p.note)item.append(node('p','',p.note));if(p.url)item.append(link('역할 출처',p.url));list.append(item);}section.append(list);return section;
  }
  function renderFlow(e){
    const visual=node('figure','co-flow');visual.append(node('figcaption','','아이디어의 연결'));const steps=node('ol','co-flow-steps');
    e.flow.forEach((step,i)=>{const li=node('li');li.append(node('span','mono',String(i+1).padStart(2,'0')),node('strong','',step.label),node('p','',step.note));steps.append(li);});visual.append(steps,node('p','co-flow-note','출처의 아이디어를 연결한 자체 도식 · 실제 시스템 실행 결과와 구분해 읽습니다.'));return visual;
  }
  function relationsFor(c){
    const rels=(c.connections||[]).map(r=>({...r,originCompanyId:c.id}));
    for(const other of state.companies)for(const rel of other.connections||[]){
      if(rel.companyId===c.id&&!rels.some(r=>r.companyId===other.id&&r.type===rel.type))rels.push({...rel,companyId:other.id,originCompanyId:other.id,note:label(other)+' 연표에 기록된 관계입니다. '+rel.note});
    }
    const parsed=core.parseQuery(state.q),from=state.from?Math.max(Number(state.from),parsed.from??-Infinity):parsed.from,to=state.to?Math.min(Number(state.to),parsed.to??Infinity):parsed.to;
    return rels.filter(r=>{if(from==null&&to==null)return true;const year=/^\d{4}/.exec(r.date||'');return year&&(from==null||Number(year[0])>=from)&&(to==null||Number(year[0])<=to);});
  }
  function renderRecord(c,e){
    const article=node('article','co-event');article.dataset.record=e.id;
    const year=node('div','co-event-year');year.append(node('span','mono',String(e.year)),node('span','co-event-dot'));article.append(year);
    const body=node('div','co-event-body'),header=button('',()=>{const now=state.record===e.id;state.record=now?'':e.id;renderPanel();route();$('company-panel').querySelector('[data-record="'+e.id+'"] .co-event-toggle')?.focus({preventScroll:true});},'co-event-toggle');
    header.setAttribute('aria-expanded',String(state.record===e.id));header.setAttribute('aria-controls','co-detail-'+e.id);
    const meta=node('div','co-event-meta');meta.append(node('span','co-type',core.types[e.type]),node('span','mono',e.dateLabel));header.append(meta,node('h4','',e.title),node('span','co-expand',state.record===e.id?'접기 −':'자세히 +'));body.append(header,node('p','co-event-summary',e.idea));
    const detail=node('div','co-event-detail');detail.id='co-detail-'+e.id;detail.hidden=state.record!==e.id;
    const q=node('section','co-detail-question');q.append(node('h5','','출발한 질문'),node('p','',e.question));detail.append(q,renderFlow(e));
    const change=node('section','co-change');change.append(node('h5','','무엇이 달라졌나'),node('p','',e.change));detail.append(change);
    const people=node('div','co-pills');for(const id of e.peopleIds||[]){const b=personButton(id);if(b)people.append(b);}if(people.childElementCount){const s=node('section','co-event-people');s.append(node('h5','','관련 인물 카드'),people);detail.append(s);}
    if(e.peopleNames?.length)detail.append(node('p','co-author-note','이 기록에 등장하는 인물·팀: '+e.peopleNames.join(' · ')));
    const related=node('div','co-work-list');for(const id of e.workIds||[]){const b=workButton(id,c.id,e.id);if(b)related.append(b);}if(related.childElementCount){const s=node('section','co-event-works');s.append(node('h5','','연구·원논문 시각화 이어 보기'),related);detail.append(s);}
    if(e.caveat){const caveat=node('aside','co-caveat');caveat.append(node('strong','','기록을 읽는 범위'),node('p','',e.caveat));detail.append(caveat);}
    const sources=node('section','co-sources');sources.append(node('h5','','원자료'));for(const source of e.sources){const row=node('div','co-source');row.append(link(source.title,source.url));if(source.note)row.append(node('p','',source.note));sources.append(row);}detail.append(sources);body.append(detail);article.append(body);return article;
  }
  function connections(c){
    const box=node('section','co-connections');box.append(node('h3','','인물·연구·회사가 만나는 곳'),node('p','co-connection-help','각 노드를 누르면 해당 인물 카드, 연구 시각화 또는 회사 연표로 이동합니다. 역할과 연결 근거는 아래에서 함께 확인할 수 있습니다.'));
    const stage=node('div','co-map'),left=node('div','co-map-column'),center=node('div','co-map-center'),right=node('div','co-map-column');left.append(node('span','mono','PEOPLE'));right.append(node('span','mono','RESEARCH & ORGANIZATIONS'));
    const activeEvents=core.filterEvents(c,state),activePeople=new Set(activeEvents.flatMap(e=>e.peopleIds||[])),activeNames=activeEvents.flatMap(e=>e.peopleNames||[]).join(' ');
    const hasFilters=state.q||state.type!=='all'||state.from||state.to;
    const people=c.people.filter(p=>!hasFilters||(p.id?activePeople.has(p.id):activeNames.includes(p.name)));
    for(const p of people){const b=p.id&&personButton(p.id,p.name);const item=b||node('div','co-map-candidate',p.name);item.classList.add('co-map-node');item.append(node('span','',p.role));left.append(item);}
    center.append(mark(c),node('strong','',label(c)),node('span','',c.sector));
    const rels=relationsFor(c);
    for(const rel of rels){const other=companyById(rel.companyId);if(!other)continue;const b=button(label(other),()=>open(other.id),'co-map-node');b.append(node('span','',rel.label));right.append(b);}
    const workIds=[...new Set(activeEvents.flatMap(e=>e.workIds||[]))];for(const id of workIds){const e=activeEvents.find(e=>e.workIds?.includes(id)),b=workButton(id,c.id,e.id);if(b){b.classList.add('co-map-node');right.append(b);}}
    stage.append(left,center,right);box.append(stage);
    const evidence=node('div','co-relations');for(const rel of rels){const other=companyById(rel.companyId);if(!other)continue;const row=node('article','co-relation');row.append(button(label(other)+' ↗',()=>open(other.id)),node('span','co-type',rel.label));if(rel.date)row.append(node('span','mono',rel.date));row.append(node('p','',rel.note));evidence.append(row);}if(evidence.childElementCount)box.append(node('h4','','회사 사이의 관계와 시점'),evidence);
    box.append(node('p','co-scope-note','인물과 연구는 현재 기록 조건에 맞춰 표시합니다. 기간을 지정하면 날짜가 확인된 회사 관계만 표시합니다. 공동저자·재직·공급·투자·인수·협력은 각 기록에 적힌 역할과 시점으로 읽습니다.'));return box;
  }
  function renderPanel(){
    const panel=$('company-panel');panel.replaceChildren();const c=companyById(state.selected);if(!c)return;
    panel.append(renderHero(c));const intro=node('div','co-overview');for(const text of c.overview)intro.append(node('p','',text));panel.append(intro);
    const nav=node('nav','co-view-tabs');nav.setAttribute('aria-label','회사 기록 보기 방식');for(const [id,text] of [['timeline','연도별 기록'],['connections','연결 보기']]){const b=button(text,()=>{state.view=id;renderPanel();route();$('company-panel').querySelector('.co-view-tabs button.active')?.focus({preventScroll:true});},'');b.setAttribute('aria-pressed',String(state.view===id));b.classList.toggle('active',state.view===id);nav.append(b);}panel.append(nav);
    if(state.view==='connections'){panel.append(connections(c));return;}
    const events=core.filterEvents(c,state),heading=node('div','co-timeline-heading');heading.append(node('h3','','연구가 제품과 기반으로 이어진 기록'),node('span','mono',events.length+' / '+c.events.length+' RECORDS'));panel.append(heading);
    if(!events.length){const empty=node('div','co-empty');empty.append(node('h4','','조건에 맞는 기록이 없습니다'),node('p','','검색어·기록 종류·기간을 바꾸어 보세요.'),button('모든 기록 보기',resetFilters,'co-reset'));panel.append(empty);}
    else{const timeline=node('div','co-timeline');for(const e of events)timeline.append(renderRecord(c,e));panel.append(timeline);}
    panel.append(renderPeople(c),node('p','co-scope-note','표시 연도는 해당 연구·공개·조직 사건의 시점입니다. 회사의 전체 연혁을 망라하지 않으며, 성능·적용 범위는 각 출처와 확인 조건 안에서 읽습니다.'));
  }
  function render(){
    renderCatalog();renderPanel();
    const total=state.companies.reduce((n,c)=>n+core.filterEvents(c,state).length,0);$('company-results-status').textContent=total+'개 회사 기록';
    const incomplete=['company-from','company-to'].some(id=>!$(id).validity.valid),reversed=state.from&&state.to&&Number(state.from)>Number(state.to);
    $('company-reset').hidden=!(state.q||state.type!=='all'||state.from||state.to||incomplete);
    $('company-range-error').hidden=!(incomplete||reversed);
    $('company-range-error').textContent=incomplete?'1900~2100 범위의 네 자리 연도를 입력하세요. 완성되지 않은 연도는 기간 조건에 적용하지 않습니다.':'시작 연도는 끝 연도보다 작거나 같아야 합니다.';
  }
  function resetFilters(){Object.assign(state,{q:'',type:'all',from:'',to:'',record:''});syncControls();render();route();}
  function changeFilter(key,value){state[key]=value;state.record='';const matches=state.companies.filter(c=>core.filterEvents(c,state).length);if(matches.length&&!matches.some(c=>c.id===state.selected))state.selected=matches[0].id;render();route();}
  function build(){
    const shell=$('companies-shell');shell.replaceChildren();
    const head=node('div','co-section-heading');const copy=node('div');copy.append(node('span','mono','COMPANIES / IDEAS INTO THE WORLD'),node('h2','','연구는 어디에서 자랐을까'),node('p','','회사와 연구조직의 시간을 따라, 사람·아이디어·제품·계산 기반을 연결합니다.'));head.append(copy);shell.append(head);
    const controls=node('div','co-controls');const search=node('label','co-search');search.append(node('span','','회사·인물·기술·연도'));const input=node('input');input.id='company-query';input.type='search';input.placeholder='예: Meta, 추천, CUDA, 2023';input.addEventListener('input',e=>changeFilter('q',e.target.value));search.append(input);controls.append(search);
    const kinds=node('label','co-field');kinds.append(node('span','','기록 종류'));const select=node('select');select.id='company-kind';for(const [value,text] of [['all','전체 기록'],...Object.entries(core.types)]){const o=node('option','',text);o.value=value;select.append(o);}select.addEventListener('change',e=>changeFilter('type',e.target.value));kinds.append(select);controls.append(kinds);
    const years=node('fieldset','co-years');years.append(node('legend','','기간'));for(const [key,txt] of [['from','시작 연도'],['to','끝 연도']]){const l=node('label');l.append(node('span','sr-only',txt));const inp=node('input');inp.type='number';inp.id='company-'+key;inp.min='1900';inp.max='2100';inp.placeholder=key==='from'?'시작':'끝';inp.setAttribute('aria-describedby','company-range-error');inp.addEventListener('input',e=>{const value=e.target.value,complete=/^\d{4}$/.test(value)&&Number(value)>=1900&&Number(value)<=2100,invalid=(!complete&&!!value)||e.target.validity.badInput;e.target.setCustomValidity(invalid?'1900~2100 범위의 네 자리 연도를 입력하세요.':'');e.target.setAttribute('aria-invalid',String(invalid));changeFilter(key,complete?value:'');});l.append(inp);years.append(l);if(key==='from')years.append(node('span','','—'));}controls.append(years);
    const reset=button('조건 초기화',resetFilters,'co-reset');reset.id='company-reset';reset.hidden=true;controls.append(reset);shell.append(controls);
    const status=node('div','co-status');const results=node('span','mono');results.id='company-results-status';results.setAttribute('aria-live','polite');const error=node('span','co-error','시작 연도는 끝 연도보다 작거나 같아야 합니다.');error.id='company-range-error';error.hidden=true;error.setAttribute('role','status');status.append(results,error);shell.append(status);
    const layout=node('div','co-layout'),catalog=node('aside','co-catalog');catalog.setAttribute('aria-label','회사·연구조직 목록');const heading=node('div','co-catalog-heading');heading.append(node('span','mono','ORGANIZATIONS'));const count=node('span','mono');count.id='company-count';heading.append(count);const list=node('div','co-list');list.id='company-list';catalog.append(heading,list);const panel=node('div','co-panel');panel.id='company-panel';layout.append(catalog,panel);shell.append(layout);
  }
  function appendLogoCredits(){
    const credits=$('asset-credits');if(!credits)return;credits.querySelector('.co-logo-credits')?.remove();
    const section=node('section','co-logo-credits');section.append(node('h3','','회사·연구조직 로고'));
    const list=node('ul');for(const c of state.companies){if(!c.logo?.sourcePage)continue;const item=node('li');item.append(link(c.logo.label||c.name,c.logo.sourcePage));if(c.logo.usageUrl)item.append(document.createTextNode(' · '),link('사용 안내',c.logo.usageUrl));list.append(item);}section.append(list);credits.append(section);
  }
  async function load(){
    const shell=$('companies-shell');shell.textContent='회사·연구조직 기록을 불러오고 있습니다…';shell.setAttribute('aria-busy','true');
    try{
      const version=document.documentElement.dataset.release||'';
      const companies=await Promise.all(core.ids.map(async id=>{const r=await fetch('company-history/'+id+'.json'+(version?'?v='+encodeURIComponent(version):''));if(!r.ok)throw new Error(id+': '+r.status);const c=await r.json();if(c.id!==id||!c.events?.length)throw new Error(id+': invalid data');return c;}));
      state.companies=companies;state.ready=true;state.failed=false;build();const params=new URLSearchParams(location.hash.slice(1));if(params.has('company'))openRoute(params);else{syncControls();render();}
      appendPersonLinks($('person-panel'),window.AtlasPeople.selected);appendLogoCredits();
      window.dispatchEvent(new CustomEvent('atlas:companies-ready'));
      if(params.has('company'))window.dispatchEvent(new CustomEvent('atlas:open-companies'));
    }catch(error){state.failed=true;shell.replaceChildren(node('h2','','회사 기록을 불러오지 못했습니다'),node('p','','연결을 확인한 뒤 다시 불러와 주세요.'),button('다시 불러오기',load,'co-reset'));console.error('Company history:',error);}
    finally{shell.setAttribute('aria-busy','false');}
  }
  window.AtlasCompanies={open,openRoute,show(){if(state.ready)render();route();},appendPersonLinks,search:q=>core.search(state.companies,q),get ready(){return state.ready;},get companies(){return state.companies;}};
  window.addEventListener('resize',()=>{if(state.ready)keepSelectedCompanyVisible();});
  load();
})();
