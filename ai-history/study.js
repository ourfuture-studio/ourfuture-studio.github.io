/* Shared deep-reading sections. All text is rendered as text, never source HTML. */
(function () {
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const link=(title,url,cls)=>{const a=node('a',cls,title);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
  function content(record){return record.content||window.ATLAS_CARD_CONTENT?.[record.eventId||record.id]||window.ATLAS_EXTRA_CONTENT?.[record.id];}
  function render(record,host){
    window.AtlasArticle?.dispose();host.replaceChildren();const c=content(record);host.hidden=!c;if(!c)return;
    if(c.article){window.AtlasArticle.render(record,host);return;}
    const nav=node('nav','study-nav');nav.setAttribute('aria-label','상세 내용 바로가기');host.append(nav);
    let serial=0;
    function section(label,short){
      const s=node('section','study-section');s.id='study-section-'+(++serial);
      const heading=node('h3');heading.append(node('span','mono',String(serial).padStart(2,'0')),document.createTextNode(label));heading.tabIndex=-1;s.append(heading);host.append(s);
      const b=node('button','',short||label);b.type='button';b.addEventListener('click',()=>{heading.focus({preventScroll:true});s.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});nav.append(b);return s;
    }
    if(c.keyIdeas?.length){
      const s=section('핵심 아이디어','핵심');const grid=node('div','idea-grid');
      for(const idea of c.keyIdeas){const a=node('article','idea-card');a.append(node('h4','',idea.title),node('p','',idea.text));grid.append(a);}s.append(grid);
    }
    if(c.example){
      const title=c.example.title.replace(/^교육용\s*(?:예시|예제)?\s*[·:：-]?\s*/,'');
      const s=section('예시','예시');const box=node('div','study-example');box.append(node('h4','',title),node('p','',c.example.text));
      if(c.example.steps?.length){const steps=node('ol');for(const step of c.example.steps)steps.append(node('li','',step));box.append(steps);}s.append(box);
    }
    if(c.theory){
      const d=node('details','article-technical');d.append(node('summary','','수식과 세부 설명'));const body=node('div');
      if(c.theory.text)body.append(node('p','',c.theory.text));if(c.theory.formula)body.append(node('pre','study-formula',c.theory.formula));d.append(body);host.append(d);
    }
    if(c.story){
      const s=section(c.story.kind||'연구 맥락','배경');s.append(node('h4','',c.story.title),node('p','',c.story.text));
      if(c.story.source)s.append(link(c.story.source.title+' ↗',c.story.source.url,'story-source'));
    }
    if(c.videos?.length){
      const s=section('영상으로 더 보기','영상');const cards=node('div','video-list');
      for(const v of c.videos){const a=link('',v.url,'video-card');a.append(node('span','video-play','▶'),node('strong','',v.title),node('span','video-channel',(v.channel||'')+' · YouTube ↗'));if(v.note)a.append(node('span','video-note',v.note));cards.append(a);}s.append(cards);
    }
    window.AtlasLearning?.renderForEvent(record.eventId||record.id,host);
    if(c.references?.length){
      const s=section('원문에서 확인할 곳','원문');const list=node('div','study-references');
      for(const r of c.references){const item=node('div');item.append(link(r.title+' ↗',r.url));if(r.location)item.append(node('p','',r.location));list.append(item);}s.append(list);
    }
  }
  window.AtlasStudy={content,render};
})();
