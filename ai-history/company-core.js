/* Company records are independent of person and paper records. */
(function (root) {
  'use strict';
  const ids = ['google','nvidia','google-deepmind','openai','anthropic','deepseek','qwen','meta','netflix','amazon','tesla','palantir','xai','anduril','world-labs','physical-intelligence'];
  const types = {research:'연구',product:'제품·서비스',tools:'데이터·도구',infrastructure:'계산 기반',organization:'조직 변화',partnership:'협력'};
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').toLowerCase();
  function parseQuery(value) {
    let text = String(value || '').trim(), from = null, to = null, invalid = false;
    const range = text.match(/(\d{4})\s*년?\s*(?:~|～|–|—|-)\s*(\d{4})\s*년?/);
    const year = !range && text.match(/\b(\d{4})(?!\d)(?:\s*년)?/);
    if (range) {from=Number(range[1]);to=Number(range[2]);invalid=from>to;text=text.replace(range[0],' ');}
    else if (year) {from=to=Number(year[1]);text=text.replace(year[0],' ');}
    return {tokens:normalize(text).split(/\s+/).filter(Boolean),from,to,invalid};
  }
  const personNames = ids => (ids||[]).flatMap(id=>{const p=root.AtlasPeople?.profiles.find(p=>p.id===id);return p?[p.name,p.nameKo,...(p.aliases||[])]:[];});
  const identity = c => [c.name,c.nameKo,...(c.aliases||[]),c.sector,c.summary,...c.people.flatMap(p=>[p.name,p.role]),...personNames(c.people.map(p=>p.id).filter(Boolean))].join(' ');
  const eventText = (c,e) => normalize([c.name,c.nameKo,...(c.orgAliases||[]),e.title,e.question,e.idea,e.change,e.year,...(e.peopleNames||[]),...personNames(e.peopleIds),...e.flow.flatMap(s=>[s.label,s.note]),types[e.type]].join(' '));
  function filterEvents(company, filters = {}) {
    const parsed = parseQuery(filters.q), from = filters.from === '' || filters.from == null ? parsed.from : Number(filters.from), to = filters.to === '' || filters.to == null ? parsed.to : Number(filters.to);
    if(parsed.invalid || (from != null && to != null && from > to))return [];
    return company.events.filter(e=>(!filters.type || filters.type==='all' || filters.type===e.type) && (from==null || e.year>=from) && (to==null || e.year<=to) && (parsed.from==null || e.year>=parsed.from) && (parsed.to==null || e.year<=parsed.to) && parsed.tokens.every(t=>eventText(company,e).includes(t))).sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
  }
  function search(companies, query) {
    if(!String(query||'').trim())return [];
    const parsed=parseQuery(query), results=[];
    if(parsed.invalid)return results;
    for(const company of companies){
      if(parsed.from==null && parsed.tokens.every(t=>normalize(identity(company)).includes(t)))results.push({kind:'company',id:'company:'+company.id,companyId:company.id,title:company.nameKo||company.name,subtitle:company.sector,summary:company.summary});
      for(const e of filterEvents(company,{q:query}))results.push({kind:'company',id:'company:'+company.id+':'+e.id,companyId:company.id,recordId:e.id,year:e.year,title:e.title,subtitle:(company.nameKo||company.name)+' · '+e.dateLabel,summary:e.idea});
    }
    return results;
  }
  root.AtlasCompanyCore={ids,types,normalize,parseQuery,filterEvents,search};
})(typeof window!=='undefined'?window:globalThis);
