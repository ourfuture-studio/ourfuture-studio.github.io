/* Shared reading layout. Card-specific facts and diagrams never live here. */
(function(){
  'use strict';
  let disposeVisual=null;
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function dispose(){if(disposeVisual){disposeVisual();disposeVisual=null;}}
  function render(record,host){
    dispose();host.replaceChildren();host.hidden=false;
    const c=record.content,a=c.article;
    const nav=node('nav','article-nav');nav.setAttribute('aria-label','본문 바로가기');host.append(nav);
    const contents=node('article','idea-article');host.append(contents);
    function section(label,key){const s=node('section','article-section');s.dataset.section=key;const b=node('button','',label);b.type='button';b.addEventListener('click',()=>{s.tabIndex=-1;s.focus({preventScroll:true});s.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});nav.append(b);contents.append(s);return s;}
    const intro=section('출발한 질문','question');intro.append(node('p','article-question',a.question));for(const p of a.opening)intro.append(node('p','article-prose',p));
    if(a.visual){const visual=window.AtlasVisuals.get(a.visual.id);if(!visual)throw new Error('Unregistered visual: '+a.visual.id);const s=section(a.visual.navLabel||'뇌와 모델','visual');s.append(node('h3','',a.visual.title));window.AtlasPaperArchitecture?.mountForRecord(s,record);s.append(node('p','article-visual-intro',a.visual.caption));const visualHost=node('div','article-reconstruction');visualHost.style.minWidth='0';s.append(visualHost);disposeVisual=visual.mount(visualHost,a.visual);}
    const ideas=section('아이디어의 의미','meaning');
    for(const idea of c.keyIdeas){ideas.append(node('h3','',idea.title),node('p','article-prose',idea.text));}
    if(a.takeaway){const box=node('aside','article-takeaway');box.append(node('h3','',a.takeaway.title),node('p','',a.takeaway.text));ideas.append(box);}
    window.AtlasLearning?.renderForEvent(record.eventId||record.id,ideas);
    const evidence=section(a.evidenceLabel||'논문 더 읽기','evidence');
    if(a.technical){const d=node('details','article-technical');d.append(node('summary','',a.technical.title));const body=node('div');for(const p of a.technical.paragraphs||[])body.append(node('p','',p));if(a.technical.formula)body.append(node('pre','study-formula',a.technical.formula));if(record.caveat)body.append(node('p','article-scope',record.caveat));d.append(body);evidence.append(d);}
    const refs=node('details','article-references');refs.append(node('summary','',a.referencesLabel||'원문과 그림 출처'));const list=node('div','study-references');
    for(const r of c.references||[]){const row=node('div'),link=node('a','',r.title+' ↗');link.href=r.url;link.target='_blank';link.rel='noopener noreferrer';row.append(link,node('p','',r.location));list.append(row);}refs.append(list);evidence.append(refs);
    if(c.videos?.length){const media=node('details','article-references article-media');media.append(node('summary','','관련 강의 보기'));const cards=node('div','video-list');for(const v of c.videos){const link=node('a','video-card');link.href=v.url;link.target='_blank';link.rel='noopener noreferrer';link.append(node('span','video-play','▶'),node('strong','',v.title),node('span','video-channel',(v.channel||'')+' · YouTube ↗'),node('span','video-note',v.note));cards.append(link);}media.append(cards);evidence.append(media);}
  }
  window.AtlasArticle={render,dispose};
})();
