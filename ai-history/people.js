/* Person-centred reading connections. Category tags describe works, not permanent camps. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const tracks = { neural: '연결주의 AI', symbolic: '심볼릭 AI', hybrid: '결합 연구', foundations: '기초·다른 연구', industry:'기업·인프라' };
  const colors = { neural: '#667bdf', symbolic: '#348a81', hybrid: '#ad6478', foundations: '#737887', industry:'#737887' };
  const clean = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const key = s => {const k=clean(s).normalize('NFC').replace(/[’']/g, '').split(/[^\p{L}\p{N}]+/u).filter(t=>t&&(t.length>1||!/^[a-z]$/.test(t))).join(' ');return k==='li fei fei'?'fei fei li':k;};
  const slug = s => key(s).replace(/ /g, '-');
  const node = (tag, cls, text) => { const el=document.createElement(tag); if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el; };
  const canonical = new Map();
  const profiles = [];
  const enhancements = [...(window.ATLAS_PEOPLE_PROFILES || []), ...(window.ATLAS_TURING_PROFILE ? [window.ATLAS_TURING_PROFILE] : [])];
  const portraitFor = person => window.AtlasPortraits?.resolve(person)||null;
  for(const p of enhancements){
    const copy={...p,works:[...p.works],enhanced:true};profiles.push(copy);canonical.set(key(p.name),copy);for(const alias of [p.nameKo,...(p.aliases||[])])if(alias&&key(alias))canonical.set(key(alias),copy);
  }
  for(const e of window.TIMELINE_DATA || []){
    for(const name of e.people){
      let p=canonical.get(key(name));
      if(!p){p={id:slug(name),name,nameKo:'',tagline:'연구에서 만나는 사람들',intro:'현재 지도에 수록된 연구에서 이 인물의 참여 기록을 모았습니다.',tags:[],works:[],enhanced:false};profiles.push(p);canonical.set(key(name),p);}
      const present=p.works.some(w=>w.eventId===e.id||w.id===e.id);
      if(!present)p.works.push({id:e.id,eventId:e.id,year:e.year,dateLabel:e.dateLabel,title:e.subtitle,summary:e.summary,type:'연구 기록',track:e.track,people:e.people,authorNote:e.authorNote,sources:e.sources,caveat:e.caveat,content:e.content});
    }
  }
  for(const p of profiles){
    p.works.sort((a,b)=>a.year-b.year);
    p.tags=[...new Set([...(p.tags||[]),...p.works.map(w=>w.track)])];
  }
  const focusOrder=new Map((window.ATLAS_FEATURED_IDS||[]).map((id,i)=>[id,i]));
  for(const p of profiles)p.focus=focusOrder.has(p.id);
  profiles.sort((a,b)=>(focusOrder.get(a.id)??999)-(focusOrder.get(b.id)??999)||Number(b.enhanced)-Number(a.enhanced)||a.name.localeCompare(b.name));
  const byId=new Map(profiles.map(p=>[p.id,p]));
  let selected='alan-turing',filtered=profiles,filter='all',query='',scope='all';

  function avatar(p,className){
    if(window.AtlasPortraits)return window.AtlasPortraits.createAvatar(p,{className,loading:className==='large'?'eager':'lazy'});
    const box=node('div','person-avatar '+(className||''));
    box.append(node('span','',initials(p.name)));
    return box;
  }
  function initials(name){const parts=name.replace(/[.’']/g,'').split(/\s+/).filter(t=>t.length>1);return ((parts[0]?.[0]||'')+(parts.at(-1)?.[0]||'')).toUpperCase();}
  function badge(tag){const b=node('span','person-tag',tracks[tag]||tag);b.style.setProperty('--tag-color',colors[tag]||colors.foundations);return b;}
  function renderCatalog(){
    const list=$('people-list'),scrollTop=list.scrollTop,scrollLeft=list.scrollLeft;list.replaceChildren();
    $('people-count').textContent=filtered.length+'명';
    let section='';
    for(const p of filtered){
      const group=p.focus?'주요 인물 · 24명':'함께 읽는 인물';
      if(group!==section){list.append(node('span','catalog-group-label',group));section=group;}
      const b=node('button','person-index-item'+(p.id===selected?' active':''));b.type='button';b.dataset.person=p.id;b.setAttribute('aria-pressed',String(p.id===selected));
      const copy=node('span','person-index-copy');copy.append(node('strong','',p.nameKo||p.name),node('span','',p.nameKo?p.name:p.works.length+'개의 연구 기록'));
      const count=node('span','person-index-count mono',String(p.works.length).padStart(2,'0'));
      b.append(avatar(p,'small'),copy,count);b.addEventListener('click',()=>select(p.id));list.append(b);
    }
    list.scrollTop=scrollTop;list.scrollLeft=scrollLeft;
  }
  function renderPerson(){
    const panel=$('person-panel');panel.replaceChildren();
    const p=byId.get(selected);
    if(!p||!filtered.length){
      const empty=node('div','people-empty');empty.append(node('span','mono','NO MATCHES'),node('h2','','해당하는 인물이 없습니다'),node('p','','다른 이름·연구·연도로 검색해 보세요.'));
      panel.append(empty);return;
    }
    const hero=node('header','person-hero');
    const visual=node('div','person-visual');visual.append(avatar(p,'large'));
    if(!portraitFor(p))visual.append(node('span','person-initial-label mono',p.name.toUpperCase()));
    const info=node('div','person-info');
    info.append(node('span','mono person-eyebrow',p.focus?'FEATURED / ONE PERSON, MANY IDEAS':'ONE PERSON, MANY IDEAS'),node('h2','',p.nameKo||p.name));
    if(p.nameKo)info.append(node('p','person-name-en',p.name));
    info.append(node('p','person-tagline',p.tagline));
    const tags=node('div','person-tags');p.tags.forEach(t=>tags.append(badge(t)));info.append(tags);
    if(p.roles?.length){const roles=node('div','person-roles');for(const role of p.roles)roles.append(node('span','',role));info.append(roles);}
    const period=node('div','person-period');period.append(node('span','mono',p.works[0].year+' — '+p.works.at(-1).year),node('span','',p.works.length+'개의 대표 기록'));info.append(period);
    hero.append(visual,info);panel.append(hero);
    if(window.AtlasPersonGraph?.has(p.id)){const b=node('button','person-graph-link','이 인물의 관계도 보기 ↗');b.type='button';b.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('atlas:open-graph',{detail:{personId:p.id}})));panel.append(b);}
    if(portraitFor(p))window.AtlasPortraits.appendCredit(panel,p,{className:'person-photo-credit'});
    const jumps=node('nav','person-year-nav');jumps.setAttribute('aria-label',(p.nameKo||p.name)+'의 연도별 기록 바로가기');
    p.works.forEach((w,index)=>{const b=node('button','',String(w.year));b.type='button';b.style.setProperty('--tag-color',colors[w.track]||colors.foundations);b.setAttribute('aria-label',w.year+'년 '+w.title+' 기록으로 이동');b.addEventListener('click',()=>{const target=panel.querySelectorAll('.person-work')[index];const heading=target.querySelector('h4');heading.tabIndex=-1;heading.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});jumps.append(b);});
    window.AtlasPersonBackground?.render(panel,p.id,id=>byId.get(id));
    panel.append(jumps,node('p','person-intro',p.intro));
    const heading=node('div','person-timeline-heading');heading.append(node('h3','','연도로 읽는 연구 기록'),node('span','mono','SELECTED WORKS'));panel.append(heading);
    const timeline=node('ol','person-timeline');
    for(const w of p.works){
      const item=node('li','person-work');item.dataset.work=w.id;
      const year=node('div','person-work-year mono',String(w.year));
      const body=node('article','person-work-body');
      const meta=node('div','person-work-meta');meta.append(node('span','',w.type||'연구 기록'),badge(w.track));
      body.append(meta,node('h4','',w.title),node('p','person-work-date',w.dateLabel),node('p','person-work-summary',w.summary));
      if(w.caveat)body.append(node('p','person-work-caveat',w.caveat));
      const authors=node('details','work-evidence');const summary=node('summary','','참여 인물·원문');authors.append(summary,node('p','work-authors',w.authorNote||w.people.join(' · ')));
      const sources=node('div','work-sources');
      for(const s of w.sources){const a=node('a','',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';sources.append(a);}
      authors.append(sources);body.append(authors);
      if(window.AtlasStudy.content(w)){
        const b=node('button','work-study-link','핵심·예시·자료 읽기');b.type='button';b.append(node('span','','↗'));
        b.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('atlas:open-work',{detail:{personId:p.id,workId:w.id}})));body.append(b);
      }
      if(w.eventId){const b=node('button','work-event-link','연구 흐름에서 보기 ↗');b.type='button';b.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('atlas:open-event',{detail:{id:w.eventId}})));body.append(b);}
      item.append(year,body);timeline.append(item);
    }
    panel.append(timeline,node('p','person-scope-note','표시한 연도는 논문·보고서·발표 등 해당 기록의 연도입니다. 대표 연구를 골라 수록했으며, 연구 기록의 세로선은 연도순 읽기를 뜻합니다.'+(window.AtlasPersonBackground?.get(p.id)?' 인물 관계는 위에서 지도·공동연구·영향 등의 유형과 근거를 따로 표시합니다.':'')));
    $('live-status').textContent=(p.nameKo||p.name)+', '+p.works.length+'개의 연구 기록';
  }
  function select(id, updateRoute=true, focus=true){
    if(!byId.has(id))return;
    if(scope==='featured'&&!byId.get(id).focus){scope='all';document.querySelectorAll('[data-people-scope]').forEach(b=>{const on=b.dataset.peopleScope==='all';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});setFilter(filter,query);}
    const fromCatalog=!!document.activeElement?.closest('#people-list');
    selected=id;renderCatalog();renderPerson();
    if(focus&&fromCatalog){$('people-list').querySelector('[data-person="'+id+'"]').focus({preventScroll:true});}
    else if(focus){const heading=$('person-panel').querySelector('h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
    if(updateRoute){try{history.replaceState(null,'','#person='+encodeURIComponent(id));}catch{}}
  }
  function setFilter(f,q){
    filter=f;query=clean(q.trim());
    const aliases={'튜링':'turing','앨런 튜링':'alan turing','엘런 튜링':'alan turing','로젠블럿':'rosenblatt','힌턴':'hinton','매카시':'mccarthy','민스키':'minsky','르쿤':'lecun','가르세즈':'garcez','테넨바움':'tenenbaum'};
    const term=clean(aliases[q.trim()]||q.trim());
    filtered=profiles.filter(p=>(scope==='all'||p.focus)&&(filter==='all'||p.tags.includes(filter))&&(!term||clean([p.name,p.nameKo,p.tagline,p.intro,window.AtlasPersonBackground?.text(p.id),...p.works.flatMap(w=>[w.year,w.title,w.summary])].filter(Boolean).join(' ')).includes(term)));
    const previous=selected;
    if(!filtered.some(p=>p.id===selected))selected=filtered[0]?.id||'';
    renderCatalog();renderPerson();
    if(previous!==selected&&selected&&!$('people-shell').hidden){try{history.replaceState(null,'','#person='+encodeURIComponent(selected));}catch{}}
    return filtered.length;
  }
  window.AtlasPeople={
    setFilter,select,findProfile:name=>canonical.get(key(name)),get total(){return profiles.length;},
    showWork:(personId,workId)=>{
      select(personId,true,false);
      const target=[...$('person-panel').querySelectorAll('.person-work')].find(el=>el.dataset.work===workId);
      if(target){const heading=target.querySelector('h4');heading.tabIndex=-1;heading.focus({preventScroll:true});target.classList.add('search-arrival');target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
    },
    get selected(){return selected;},get records(){return profiles.reduce((n,p)=>n+p.works.length,0);},
    get profiles(){return profiles;}
  };
  document.querySelectorAll('[data-people-scope]').forEach(b=>b.addEventListener('click',()=>{
    scope=b.dataset.peopleScope;
    document.querySelectorAll('[data-people-scope]').forEach(button=>{const on=button.dataset.peopleScope===scope;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});
    setFilter(filter,query);
  }));
  const requested=new URLSearchParams(location.hash.slice(1)).get('person');
  if(byId.has(requested))selected=requested;
  setFilter('all','');
})();
