/* Reuse an existing history visual and its source config without copying its model. */
(function(){
  'use strict';
  const params=new URLSearchParams(location.search),id=params.get('event'),lessonSlug=params.get('lesson');
  const catalog=window.AtlasLearning,entry=window.AtlasEntries.get(id),lesson=catalog.lessons.find(x=>x.slug===lessonSlug);
  const title=document.getElementById('lab-title'),host=document.getElementById('lab-visual');
  document.getElementById('history-link').href=catalog.historyUrl(id||'backprop');
  if(!entry?.content?.article?.visual || !catalog.visualEvents.includes(id)){
    title.textContent='아직 이 기록의 체험 그림을 연결하지 않았습니다.';
    document.getElementById('lab-intro').textContent='역사 카드에서 확인한 뒤 새 그림을 등록할 수 있습니다.';
    return;
  }
  const a=entry.content.article,v=a.visual;
  title.textContent=v.title;document.title=v.title+' · Deep Learning × AI Atlas';
  document.getElementById('lab-question').textContent=a.question;
  document.getElementById('lab-intro').textContent=v.caption;
  document.getElementById('lab-boundary').textContent=entry.record?.caveat||v.scope||'';
  const dispose=window.AtlasVisuals.get(v.id).mount(host,v);
  window.addEventListener('pagehide',()=>dispose?.(),{once:true});
  const links=document.getElementById('lesson-links');
  for(const row of catalog.forEvent(id)){
    const a=document.createElement('a');a.href=catalog.lessonUrl(row);a.textContent=row.id.replace('DL-L','')+' · '+row.concept;
    if(row.slug===lesson?.slug)a.setAttribute('aria-current','page');links.append(a);
  }
})();
