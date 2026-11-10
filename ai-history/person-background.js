/* Independently maintained biography facts and typed, sourced person connections. */
(function () {
  'use strict';
  const rows = window.ATLAS_PERSON_BACKGROUNDS || [];
  const kinds = new Set(['advisor','collaboration','influence','cofounder','debate','institution']);
  const relations = {advisor:['student-of','advised'],influence:['influenced-by','influenced'],collaboration:['collaborated-with'],cofounder:['cofounded-with'],debate:['debated-with'],institution:['shared-institution-with']};
  const hasText = value => typeof value === 'string' && value.trim().length > 0;
  const identifier = value => hasText(value) && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
  function sourceUrl(value) {
    try {const url = new URL(value);return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;} catch {return null;}
  }
  const byId = new Map();
  for (const row of rows) {
    if (!identifier(row.personId) || byId.has(row.personId) || !hasText(row.background) || !Array.isArray(row.sources) || !row.sources.length) throw new TypeError('Person background requires a unique identity, text and sources.');
    const sources = new Map();
    for (const source of row.sources) {
      if (!hasText(source.id) || sources.has(source.id) || !hasText(source.title) || !sourceUrl(source.url)) throw new TypeError('Each biography source needs a unique local ID and HTTPS URL.');
      sources.set(source.id, source);
    }
    const cited = item => item && Array.isArray(item.sourceIds) && item.sourceIds.length > 0 && item.sourceIds.every(id => sources.has(id));
    if (!cited({sourceIds:row.backgroundSourceIds}) || !Array.isArray(row.education) || !Array.isArray(row.researchPlaces) || !Array.isArray(row.connections)) throw new TypeError('Background facts need explicit source references.');
    if (row.origin && (!['출생','성장'].includes(row.origin.label) || !hasText(row.origin.text) || !cited(row.origin))) throw new TypeError('Birthplace and upbringing must be distinguished and sourced.');
    for (const place of [...row.education, ...row.researchPlaces]) if (!hasText(place.name) || !cited(place)) throw new TypeError('Institutions must be named and sourced.');
    for (const place of row.researchPlaces) if (!identifier(place.institutionId)) throw new TypeError('Research places need stable institution IDs.');
    const seen = new Set();
    for (const link of row.connections) {
      const key = link.personId + ':' + link.kind;
      if (!identifier(link.personId) || link.personId === row.personId || seen.has(key) || !hasText(link.name) || !hasText(link.label) || !hasText(link.description) || !kinds.has(link.kind) || !relations[link.kind].includes(link.relation) || !cited(link)) throw new TypeError('Connections require a real, typed, directed and sourced relationship.');
      seen.add(key);
    }
    byId.set(row.personId, row);
  }
  function text(id) {
    const row = byId.get(id);if (!row) return '';
    return [row.background,row.origin?.text,...row.education.flatMap(x=>[x.name,x.detail]),...row.researchPlaces.flatMap(x=>[x.name,x.place,x.note]),...row.connections.flatMap(x=>[x.name,x.nameKo,x.label,x.description])].filter(Boolean).join(' ');
  }
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  rows.forEach(freeze);
  const edges = rows.flatMap(row => row.connections.map(link => freeze({fromPersonId:row.personId,toPersonId:link.personId,kind:link.kind,relation:link.relation,label:link.label,description:link.description,period:link.period || '',sources:link.sourceIds.map(id=>row.sources.find(source=>source.id===id))})));
  const graph = new Map();
  for(const edge of edges){
    let from=edge.fromPersonId,to=edge.toPersonId;const directed=['advisor','influence'].includes(edge.kind);
    if(['student-of','influenced-by'].includes(edge.relation))[from,to]=[to,from];
    if(!directed&&from>to)[from,to]=[to,from];
    const key=[edge.kind,from,to].join(':');
    const normalized=graph.get(key)||{fromPersonId:from,toPersonId:to,kind:edge.kind,directed,sources:[]};
    for(const source of edge.sources)if(!normalized.sources.some(x=>x.url===source.url))normalized.sources.push(source);
    graph.set(key,normalized);
  }
  const graphEdges=Object.freeze([...graph.values()].map(freeze));
  function render(host, personId, lookup) {
    const row = byId.get(personId);if (!row) return;
    const node = (tag, cls, text) => {const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
    const section=node('section','person-background');section.dataset.personBackground=personId;
    section.append(node('h3','','출신과 연구 배경'));
    const sourceNumbers=new Map(row.sources.map((source,index)=>[source.id,index+1]));
    function citations(ids) {
      const span=node('span','person-background-citations');
      for(const id of [...new Set(ids)]){const source=row.sources.find(x=>x.id===id),a=node('a','', '['+sourceNumbers.get(id)+']');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';a.title=source.title;a.setAttribute('aria-label',source.title+' 출처 보기');span.append(a);}
      return span;
    }
    const introduction=node('p','person-background-intro',row.background);introduction.append(citations(row.backgroundSourceIds));section.append(introduction);
    const grid=node('div','person-background-grid'),origins=node('dl','person-background-facts'),places=node('div','person-research-places');
    function fact(label,value,ids){const group=node('div');group.append(node('dt','',label));const detail=node('dd','',value);detail.append(citations(ids));group.append(detail);origins.append(group);}
    if(row.origin)fact(row.origin.label,row.origin.text,row.origin.sourceIds);
    if(row.education.length){const group=node('div');group.append(node('dt','','학업'));const details=node('dd');for(const education of row.education){const item=node('div','person-education',education.name+(education.period?' · '+education.period:'')+(education.detail?' — '+education.detail:''));item.append(citations(education.sourceIds));details.append(item);}group.append(details);origins.append(group);}
    places.append(node('h4','','연구·활동한 곳'));
    const list=node('ul');
    for(const place of row.researchPlaces){const item=node('li');item.dataset.institution=place.institutionId;item.append(node('strong','',place.name),node('span','person-place-period',place.period||''));if(place.note)item.append(node('p','',place.note));if(place.place)item.append(node('span','person-place-location',place.place));item.append(citations(place.sourceIds));list.append(item);}
    places.append(list);if(origins.children.length)grid.append(origins);else grid.classList.add('person-background-grid-wide');grid.append(places);section.append(grid);
    if(row.connections.length){
      const related=node('div','person-connections');related.append(node('h4','','연결해서 읽을 인물'));const relatedList=node('ul');
      for(const link of row.connections){const item=node('li');item.dataset.relatedPerson=link.personId;item.dataset.relation=link.kind;const heading=node('div','person-connection-heading'),target=lookup?.(link.personId),label=target?.nameKo||link.nameKo||link.name;
        if(target){const a=node('a','person-connection-name',label+' ↗');a.href='#person='+encodeURIComponent(link.personId);a.setAttribute('aria-label',label+' 인물 기록으로 이동');a.addEventListener('click',event=>{if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset(false);window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:'person',personId:link.personId}}));});heading.append(a);}else heading.append(node('strong','person-connection-name',label));
        heading.append(node('span','person-relation-kind',link.label));const description=node('p','',link.description);description.append(citations(link.sourceIds));item.append(heading,description);relatedList.append(item);
      }
      related.append(relatedList);section.append(related);
    }
    const details=node('details','person-background-sources');details.append(node('summary','','배경과 관계의 출처'));const sourceList=node('ol');
    for(const source of row.sources){const item=node('li'),a=node('a','',source.title+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';item.append(a);if(source.scope)item.append(node('span','',source.scope));sourceList.append(item);}
    details.append(sourceList);section.append(details);host.append(section);
  }
  window.AtlasPersonBackground=Object.freeze({get:id=>byId.get(id),text,render,records:Object.freeze(rows.slice()),edges:Object.freeze(edges),graphEdges});
})();
