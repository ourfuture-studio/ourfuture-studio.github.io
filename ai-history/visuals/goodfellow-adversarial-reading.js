/* Source-grounded selections; no classifier, attack or training process is run here. */
(function(){
 'use strict';
 const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
 window.AtlasVisuals.register('goodfellow-adversarial-reading',{mount(host,options){
  const data=options.reading;if(!data?.observations?.length||!data.steps?.length||!data.comparisons?.length)throw Error('Adversarial paper reading is required.');
  let view='source',observation=0,step=0,comparison=0,disposed=false;const root=el('div','goodfellow-adversarial-reading');host.append(root);
  const source=value=>{const a=el('a','ga-source',value.title+' ↗');a.href=value.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
  const button=(label,fn,attrs)=>{const b=el('button','',label);b.type='button';for(const[k,v]of Object.entries(attrs))b.setAttribute(k,String(v));b.addEventListener('click',()=>{const focused=document.activeElement===b;fn();if(focused&&!b.isConnected){const key=Object.keys(attrs).find(k=>k.startsWith('data-ga-'));if(key)root.querySelector('['+key+'="'+attrs[key]+'"]')?.focus({preventScroll:true});}});return b;};
  function render(){if(disposed)return;root.replaceChildren();Object.assign(root.dataset,{gaView:view,gaObservation:data.observations[observation].id,gaStep:data.steps[step].id,gaCase:data.comparisons[comparison].id});
   const intro=el('div','ga-intro');intro.append(el('span','ga-eyebrow','PERCEPTION · GRADIENT · ROBUSTNESS'),el('h4','','배운 판단에서, 약한 방향을 찾아보다'),el('p','','사람에게 비슷한 입력과 모델에게 비슷한 입력은 어떻게 다를까? 원도판의 결과와, 그 약점을 찾고 다시 학습하려던 아이디어를 구분해 읽는다.'));root.append(intro);
   const views=el('div','ga-views');for(const[id,title]of[['source','원문 그림 읽기'],['gradient','왜 작은 변화가 쌓일까'],['comparison','공격과 학습의 차이']])views.append(button(title,()=>{view=id;render();},{'data-ga-view':id,'aria-pressed':view===id}));root.append(views);
   const body=el('section','ga-body');
   if(view==='source'){
    const nav=el('div','ga-observations');for(const[i,item]of data.observations.entries())nav.append(button(String(i+1).padStart(2,'0')+' '+item.title,()=>{observation=i;render();},{'data-ga-observation':item.id,'aria-pressed':observation===i}));body.append(nav);
    const item=data.observations[observation],detail=el('article','ga-detail');detail.dataset.gaDetail=item.id;detail.append(el('span','ga-label',item.label),el('h5','',item.idea),el('p','',item.detail),source(item.source));body.append(detail);
    body.append(button('위의 Figure 1과 함께 보기',()=>{const panel=host.closest('.article-section')?.querySelector('[data-paper-architecture]');panel?.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});},{'data-ga-original':'true'}));
   }else if(view==='gradient'){
    const nav=el('div','ga-steps');for(const[i,item]of data.steps.entries())nav.append(button(String(i+1).padStart(2,'0')+' '+item.title,()=>{step=i;render();},{'data-ga-step':item.id,'aria-pressed':step===i}));body.append(nav);
    const item=data.steps[step],detail=el('article','ga-detail');detail.dataset.gaDetail=item.id;detail.append(el('span','ga-label',item.label),el('pre','ga-formula',item.formula),el('h5','',item.title),el('p','ga-idea',item.idea),el('p','ga-scope',item.detail),source(item.source));body.append(detail);
   }else{
    const nav=el('div','ga-cases');for(const[i,item]of data.comparisons.entries())nav.append(button(item.title,()=>{comparison=i;render();},{'data-ga-case':item.id,'aria-pressed':comparison===i}));body.append(nav);
    const item=data.comparisons[comparison];body.append(el('h5','',item.title),el('p','',item.description));const wrap=el('div','ga-table-view');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','공격과 학습 비교, 안에서 가로 이동');const table=el('table'),head=el('tr');head.append(el('th','','구분할 조건'),el('th','','원문에서 읽을 내용'));table.append(head);for(const row of item.rows){const tr=el('tr');tr.append(el('th','',row.label),el('td','',row.value));table.append(tr);}wrap.append(table);body.append(wrap,source(item.source));
    const note=el('aside','ga-gan-note');note.append(el('strong','','GAN의 “적대적”과는 바꾸는 대상이 다르다'),el('p','','GAN은 생성자와 판별자를 함께 배우는 게임이다. 여기의 공격은 고정된 분류기에서 입력을 바꾸고, 적대적 학습은 그 입력도 고려해 분류기의 연결값을 바꾼다.'));body.append(note);
   }
   root.append(body);const links=el('nav','ga-related');links.setAttribute('aria-label','연구와 인물 이어 읽기');for(const item of data.related){const a=el('a','',item.label+' →');a.href=item.href;a.dataset.gaRelated=item.id;links.append(a);}root.append(links,el('p','ga-reading-scope','버튼은 원문 해설과 비교 조건을 선택합니다. 실제 이미지 분류·적대적 공격·모델 학습을 실행하지 않습니다.'));
  }
  render();return()=>{disposed=true;root.remove();};
 }});
})();
