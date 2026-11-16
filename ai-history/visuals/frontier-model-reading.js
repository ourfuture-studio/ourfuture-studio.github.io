/* Original-paper annotations: controls select a reading, never execute an LLM. */
(function(){
 'use strict';
 const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 window.AtlasVisuals.register('frontier-model-reading',{
  mount(host,options){
   const data=options.reading;if(!data?.stages?.length||!data?.comparisons?.length)throw Error('A sourced model reading is required.');let view='reading',stage=0,comparison=0,disposed=false;
   const root=el('div','frontier-model-reading');host.append(root);
   const button=(label,fn,attrs={})=>{const b=el('button','',label);b.type='button';for(const[k,v]of Object.entries(attrs))b.setAttribute(k,String(v));b.addEventListener('click',()=>{const focused=document.activeElement===b;fn();if(focused&&!b.isConnected){const key=Object.keys(attrs).find(k=>k.startsWith('data-fm-'));if(key)root.querySelector('['+key+'="'+attrs[key]+'"]')?.focus({preventScroll:true});}});return b;};
   const source=value=>{const a=el('a','fm-source',value.title+' ↗');a.href=value.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
   const personId=options.modelKey==='qwen3'?'junyang-lin':'liang-wenfeng',personName=personId==='junyang-lin'?'린쥔양':'량원펑';
   function render(){if(disposed)return;root.replaceChildren();root.dataset.fmModel=options.modelKey;root.dataset.fmView=view;root.dataset.fmStage=data.stages[stage].id;root.dataset.fmCase=data.comparisons[comparison].id;
    const intro=el('section','fm-intro');intro.append(el('span','fm-eyebrow','IDEA · ORIGINAL SOURCE'),el('h4','','원도판에서, 지능을 구현하려던 선택을 읽다'),el('p','',data.intro));root.append(intro);
    const nav=el('div','fm-views');for(const[id,label]of[['reading','원자료에서 읽을 지점'],['comparison','조건과 역할 비교'],['connections','이어지는 연구']])nav.append(button(label,()=>{view=id;render();},{'data-fm-view':id,'aria-pressed':view===id}));root.append(nav);
    const body=el('section','fm-body');
    if(view==='reading'){
     const list=el('div','fm-stage-list');list.setAttribute('aria-label','원도판에서 읽을 지점');for(const[i,item]of data.stages.entries()){const b=button(item.title.replace(/^\d+\s+/,''),()=>{stage=i;render();},{'data-fm-stage':item.id,'aria-pressed':stage===i});b.prepend(el('span','fm-step',String(i+1).padStart(2,'0')));list.append(b);}body.append(list);
     const item=data.stages[stage],detail=el('div','fm-detail');detail.dataset.fmDetail=item.id;detail.append(el('span','fm-figure-label',item.figureLabel),el('h5','',item.title),el('p','fm-idea',item.idea));const points=el('ul','fm-points');for(const p of item.points||[])points.append(el('li','',p));detail.append(points);if(item.limit)detail.append(el('p','fm-limit',item.limit));if(item.source)detail.append(source(item.source));body.append(detail);
     body.append(button('위의 원도판과 함께 보기',()=>{const panel=host.closest('.article-section')?.querySelector('[data-paper-architecture]');if(panel)panel.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});},{'data-fm-original':'true'}));
    }else if(view==='comparison'){
     const nav=el('div','fm-case-nav');for(const[i,item]of data.comparisons.entries())nav.append(button(item.title,()=>{comparison=i;render();},{'data-fm-case':item.id,'aria-pressed':comparison===i}));body.append(nav);const item=data.comparisons[comparison];body.append(el('h5','',item.title),el('p','',item.description));
     const wrap=el('div','fm-table-view');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','모델의 조건과 역할 비교, 안에서 가로 이동');const table=el('table'),head=el('tr');head.append(el('th','','읽을 조건·역할'),el('th','','원문에서 확인한 내용'));table.append(head);for(const row of item.rows){const tr=el('tr');tr.append(el('th','',row.label),el('td','',row.value));table.append(tr);}wrap.append(table);body.append(wrap);if(item.source)body.append(source(item.source));
    }else{
     body.append(el('h5','','아이디어가 달라지는 지점을 함께 읽기'),el('p','','아래 연결은 연구를 비교하며 읽는 경로입니다. 인물 사이의 공동연구나 지도 관계는 각 인물 카드의 근거에서 따로 확인할 수 있습니다.'));
     const links=el('div','fm-research-links');for(const item of data.related||[]){const a=el('a','fm-related',item.label+' →');a.href=item.type==='person'?'#person='+item.id:item.type==='work'?'#person='+item.personId+'&work='+item.id:'#event='+item.id;a.dataset.fmRelated=item.id;links.append(a);}body.append(links);
     const person=el('a','fm-related',personName+' 인물·연구 기록 →');person.href='#person='+personId;person.dataset.fmPerson=personId;body.append(person);
    }
    root.append(body,el('p','fm-reading-scope','버튼은 원문의 구조·학습 조건·역할을 골라 읽는 기능입니다. 이 화면에서 모델을 학습하거나 답변을 생성하지 않습니다.'));
   }render();return()=>{disposed=true;root.remove();};
  }
 });
})();
