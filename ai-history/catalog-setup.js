/* Integrate the independently researched additions before views and search load. */
(function () {
  window.TIMELINE_DATA=[...(window.TIMELINE_DATA||[]),...(window.ATLAS_MODERN_EVENTS||[]),...(window.ATLAS_FOCUS_EVENTS||[])];
  window.ATLAS_PEOPLE_PROFILES=[...(window.ATLAS_PEOPLE_PROFILES||[]),...(window.ATLAS_MODERN_PROFILES||[]),...(window.ATLAS_INDUSTRY_PROFILES||[]),...(window.ATLAS_FOCUS_PROFILES||[])];
  for(const p of window.ATLAS_INDUSTRY_PROFILES||[]){p.tags=['industry'];for(const work of p.works)work.track='industry';}
  for(const e of window.TIMELINE_DATA)if(!e.content)e.content=window.ATLAS_CARD_CONTENT?.[e.id];
  for(const p of [...window.ATLAS_PEOPLE_PROFILES,window.ATLAS_TURING_PROFILE])for(const w of p.works){
    if(!w.content)w.content=window.ATLAS_EXTRA_CONTENT?.[w.id]||window.ATLAS_CARD_CONTENT?.[w.eventId];
  }
  const review=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id==='geoffrey-hinton').works.find(w=>w.id==='hinton-deep-learning-review-2015');
  for(const id of ['yann-lecun','yoshua-bengio']){const p=window.ATLAS_PEOPLE_PROFILES.find(p=>p.id===id);if(p&&!p.works.some(w=>w.id===review.id))p.works.push({...review});}
  for(const p of window.ATLAS_PEOPLE_PROFILES)p.works.sort((a,b)=>a.year-b.year);
  window.AtlasEntries?.applyTo(window.TIMELINE_DATA,[...window.ATLAS_PEOPLE_PROFILES,window.ATLAS_TURING_PROFILE]);
  window.ATLAS_FEATURED_IDS=['alan-turing','john-mccarthy','frank-rosenblatt','marvin-minsky','geoffrey-hinton','jurgen-schmidhuber','yann-lecun','yoshua-bengio','andrew-ng','fei-fei-li','ilya-sutskever','demis-hassabis','ian-goodfellow','tomas-mikolov','ashish-vaswani','dario-amodei','william-peebles','chelsea-finn','yang-zhilin','jensen-huang','elon-musk','alex-karp','palmer-luckey','alexandr-wang'];
})();
