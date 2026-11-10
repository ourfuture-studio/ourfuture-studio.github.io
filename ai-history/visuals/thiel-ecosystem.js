/* An original interactive reading map of people, organizations and platforms. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const button=(text,action,cls='')=>{const b=node('button',cls,text);b.type='button';b.addEventListener('click',action);return b;};
  const svg=(tag,attrs={})=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
  function mount(host){
    const core=window.AtlasThielEcosystem,root=node('div','thiel-ecosystem');host.append(root);
    let viewId='organization',selection=core.select(viewId,'peter-thiel'),activeEdge=null,observer=null,frame=0,disposed=false;
    const title=node('h4','thiel-map-title'),intro=node('p','thiel-map-intro'),tabs=node('div','thiel-tabs');tabs.setAttribute('role','group');tabs.setAttribute('aria-label','기업·자본·AI 인프라의 연결 보기');
    const legend=node('div','thiel-legend');for(const[type,value]of Object.entries(core.types)){const badge=node('span','thiel-type thiel-type-'+type,value.label);legend.append(badge);}
    const layout=node('div','thiel-layout'),figure=node('div','thiel-map-figure'),map=node('div','thiel-map'),lines=svg('svg',{'class':'thiel-lines','aria-hidden':'true'}),columns=node('div','thiel-columns');map.append(lines,columns);figure.append(map,node('p','thiel-map-note','항목을 누르면 역할·시점·출처가 열립니다. 선의 길이와 위치는 지분·투자액·영향력·실행 순서를 뜻하지 않습니다.'));
    const detail=node('aside','thiel-detail');detail.setAttribute('aria-label','선택한 인물·회사·플랫폼의 근거');detail.setAttribute('aria-live','polite');layout.append(figure,detail);
    const relations=node('div','thiel-relations'),relationHeading=node('h5'),relationButtons=node('div','thiel-relation-buttons');relations.append(relationHeading,relationButtons);
    const scope=node('div','thiel-scope');scope.append(node('span','thiel-eyebrow','HOW TO READ'),node('h5','','인물의 역할, 펀드의 투자, 회사의 기술을 구분합니다'),node('p','','공동창업·파트너·투자·플랫폼 제공·회사 간 협력은 서로 다른 관계입니다. 회사의 발표와 제품 문서는 각 조직의 설명이며, 투자 성과나 제품 성능을 독립적으로 검증한 결과가 아닙니다.'));
    const graph=button('틸·카프 공동창업 관계도 보기 ↗',()=>{document.getElementById('detail-dialog')?.close();window.dispatchEvent(new CustomEvent('atlas:open-graph',{detail:{personId:'peter-thiel'}}));},'thiel-graph-link');graph.dataset.thielGraph='peter-thiel';scope.append(graph);
    root.append(node('span','thiel-eyebrow','PEOPLE → ORGANIZATIONS → INFRASTRUCTURE'),tabs,title,intro,legend,layout,relations,scope);
    for(const view of core.views){const b=button(view.label,()=>{viewId=view.id;selection=core.select(viewId,view.initial);activeEdge=null;render();},'thiel-tab');b.dataset.thielView=view.id;tabs.append(b);}
    function sourceLinks(ids,target){const list=node('ul','thiel-sources');for(const id of [...new Set(ids)]){const source=core.sources[id],li=node('li'),a=node('a','',source.title+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a,node('span','',source.location));list.append(li);}target.append(list);}
    function personLink(entity){const a=node('a','thiel-person-link',entity.label+' 인물 카드로 이동 ↗');a.href='#person='+entity.personId;a.addEventListener('click',event=>{if(event.button||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();window.AtlasSearch?.reset(false);window.dispatchEvent(new CustomEvent('atlas:search-result',{detail:{kind:'person',personId:entity.personId}}));});return a;}
    function renderDetail(){
      const entity=selection.node;detail.replaceChildren();detail.append(node('span','thiel-type thiel-type-'+entity.type,core.types[entity.type].label),node('h5','thiel-detail-title',entity.label),node('span','thiel-english',entity.english),node('p','',entity.description),node('p','thiel-time',entity.time));
      if(entity.personId)detail.append(personLink(entity));
      sourceLinks(entity.sourceIds,detail);
      if(activeEdge){const e=core.edges.find(edge=>edge.id===activeEdge),a=core.nodes.find(n=>n.id===e.from),b=core.nodes.find(n=>n.id===e.to),evidence=node('section','thiel-edge-detail');evidence.dataset.thielEdgeDetail=e.id;evidence.append(node('span','thiel-eyebrow','SELECTED RELATION'),node('h6','',a.label+(e.kind==='partnership'?' ↔ ':' → ')+b.label),node('strong','',e.label),node('p','',e.description),node('p','thiel-time',e.time));sourceLinks(e.sourceIds,evidence);detail.append(evidence);}
    }
    function selectEntity(id){selection=core.select(viewId,id);activeEdge=null;renderSelection();}
    function renderSelection(){
      for(const b of columns.querySelectorAll('[data-thiel-node]')){const id=b.dataset.thielNode,on=id===selection.node.id,neighbor=selection.neighborIds.includes(id);b.setAttribute('aria-pressed',String(on));b.classList.toggle('is-neighbor',neighbor);b.classList.toggle('is-dimmed',!on&&!neighbor);}
      const view=core.getView(viewId);relationHeading.textContent=selection.node.label+'에 연결된 관계 · '+selection.connections.length+'개';relationButtons.replaceChildren();
      for(const e of selection.connections){const a=core.nodes.find(n=>n.id===e.from),b=core.nodes.find(n=>n.id===e.to),r=button('',()=>{activeEdge=e.id;renderSelection();},'thiel-relation');r.dataset.thielEdge=e.id;r.setAttribute('aria-pressed',String(activeEdge===e.id));r.append(node('span','thiel-relation-names',a.label+(e.kind==='partnership'?' ↔ ':' → ')+b.label),node('strong','',e.label),node('span','thiel-relation-time',e.time));relationButtons.append(r);}
      renderDetail();scheduleLines(view);
    }
    function render(){const view=core.getView(viewId);title.textContent=view.title;intro.textContent=view.description;for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.thielView===viewId));columns.replaceChildren();columns.style.setProperty('--thiel-columns',view.columns.length);
      for(const col of view.columns){const group=node('div','thiel-column');group.append(node('span','thiel-column-label',col.label));for(const id of col.ids){const entity=view.nodes.find(n=>n.id===id),b=button('',()=>selectEntity(id),'thiel-node thiel-node-'+entity.type);b.dataset.thielNode=id;b.setAttribute('aria-label',entity.label+' · '+core.types[entity.type].label+' · 역할과 연결 보기');b.append(node('span','thiel-node-top',core.types[entity.type].label),node('strong','',entity.label),node('span','thiel-node-short',entity.short));group.append(b);}columns.append(group);}renderSelection();}
    function scheduleLines(view){if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=0;if(!disposed)drawLines(view);});}
    function drawLines(view){
      lines.replaceChildren();const bounds=map.getBoundingClientRect();if(!bounds.width||!bounds.height)return;lines.setAttribute('viewBox','0 0 '+bounds.width+' '+bounds.height);const defs=svg('defs'),marker=svg('marker',{id:'thiel-arrow-head',viewBox:'0 0 8 8',refX:7,refY:4,markerWidth:5,markerHeight:5,orient:'auto-start-reverse'});marker.append(svg('path',{d:'M 0 0 L 8 4 L 0 8 z',fill:'currentColor'}));defs.append(marker);lines.append(defs);
      const relevant=new Set(selection.connections.map(e=>e.id));for(const e of view.edges){const a=columns.querySelector('[data-thiel-node="'+e.from+'"]')?.getBoundingClientRect(),b=columns.querySelector('[data-thiel-node="'+e.to+'"]')?.getBoundingClientRect();if(!a||!b)continue;let x1,y1,x2,y2;if(Math.abs(a.left-b.left)<10){const below=b.top>a.top;x1=a.left-bounds.left+a.width*.65;y1=(below?a.bottom:a.top)-bounds.top;x2=b.left-bounds.left+b.width*.65;y2=(below?b.top:b.bottom)-bounds.top;}else{const right=b.left>a.left;x1=(right?a.right:a.left)-bounds.left;y1=a.top-bounds.top+a.height*.5;x2=(right?b.left:b.right)-bounds.left;y2=b.top-bounds.top+b.height*.5;}
        const mid=(x1+x2)/2,path=svg('path',{d:'M '+x1+' '+y1+' C '+mid+' '+y1+', '+mid+' '+y2+', '+x2+' '+y2,fill:'none','class':'thiel-line'+(relevant.has(e.id)?' is-connected':'')+(activeEdge===e.id?' is-selected':''),'data-thiel-line':e.id,'stroke-dasharray':e.kind==='investment'?'6 5':e.kind==='partnership'?'2 5':'','marker-end':'url(#thiel-arrow-head)'});if(e.kind==='partnership')path.setAttribute('marker-start','url(#thiel-arrow-head)');lines.append(path);}
    }
    render();if(typeof ResizeObserver==='function'){observer=new ResizeObserver(()=>scheduleLines(core.getView(viewId)));observer.observe(map);}return()=>{disposed=true;if(frame)cancelAnimationFrame(frame);observer?.disconnect();root.remove();};
  }
  window.AtlasVisuals.register('thiel-capital-infrastructure',{mount});
})();
