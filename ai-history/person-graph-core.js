/* Sourced person relationships: immutable graph data, filtering and stable layout. */
(function () {
  'use strict';
  const kinds = [
    {id:'advisor',label:'지도 관계',directed:true},
    {id:'collaboration',label:'공동 연구',directed:false},
    {id:'influence',label:'영향',directed:true},
    {id:'cofounder',label:'공동 창업',directed:false},
    {id:'debate',label:'논쟁',directed:false},
    {id:'institution',label:'기관 인연',directed:false}
  ];
  const defaultKinds = ['advisor','collaboration','influence'];
  const validKinds = new Set(kinds.map(kind=>kind.id));
  const compare = (a,b)=>a<b?-1:a>b?1:0;
  const fold = value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  const clone = value=>JSON.parse(JSON.stringify(value));
  function normalizedEndpoints(edge){
    let from=edge.fromPersonId,to=edge.toPersonId;
    if(['student-of','influenced-by'].includes(edge.relation))[from,to]=[to,from];
    if(!['advisor','influence'].includes(edge.kind)&&from>to)[from,to]=[to,from];
    return [from,to];
  }
  function build(profiles,backgroundAPI){
    profiles=profiles||window.AtlasPeople?.profiles||[];
    backgroundAPI=backgroundAPI||window.AtlasPersonBackground;
    if(!backgroundAPI||!Array.isArray(backgroundAPI.graphEdges)||!Array.isArray(backgroundAPI.edges)||!Array.isArray(backgroundAPI.records))throw new TypeError('A sourced person background graph is required.');
    const profileById=new Map(profiles.map(person=>[person.id,person])),names=new Map(),backgroundIds=new Set(backgroundAPI.records.map(row=>row.personId));
    for(const row of backgroundAPI.records){
      const owner=profileById.get(row.personId);
      if(owner)names.set(row.personId,{name:owner.name,nameKo:owner.nameKo||''});
      for(const link of row.connections){const previous=names.get(link.personId)||{};names.set(link.personId,{name:previous.name||link.name,nameKo:previous.nameKo||link.nameKo||''});}
    }
    const ids=new Set();
    const edges=backgroundAPI.graphEdges.map(edge=>{
      if(!validKinds.has(edge.kind)||!edge.sources?.length||edge.fromPersonId===edge.toPersonId)throw new TypeError('Graph edges must preserve a real typed and cited relationship.');
      const directed=['advisor','influence'].includes(edge.kind);
      if(edge.directed!==directed)throw new TypeError('Advisor and influence directions must remain explicit.');
      ids.add(edge.fromPersonId);ids.add(edge.toPersonId);
      const evidence=backgroundAPI.edges.filter(raw=>{const [from,to]=normalizedEndpoints(raw);return raw.kind===edge.kind&&from===edge.fromPersonId&&to===edge.toPersonId;});
      if(!evidence.length)throw new TypeError('Each normalized relationship needs its original evidence.');
      return {...clone(edge),id:[edge.kind,edge.fromPersonId,edge.toPersonId].join(':'),evidence:clone(evidence)};
    }).sort((a,b)=>compare(a.id,b.id));
    if(new Set(edges.map(edge=>edge.id)).size!==edges.length)throw new TypeError('Normalized relationships must be unique.');
    const nodes=[...ids].sort(compare).map(id=>{
      const profile=profileById.get(id),known=names.get(id);
      if(!profile&&!known?.name)throw new TypeError('A relationship endpoint needs a sourced name: '+id);
      const name=profile?.name||known.name,nameKo=profile?.nameKo||known?.nameKo||'',aliases=[...(profile?.aliases||[])];
      return {id,name,nameKo,label:nameKo||name,aliases,profileId:profile?id:null,hasProfile:!!profile,hasBackground:backgroundIds.has(id),tags:[...(profile?.tags||[])],degree:edges.filter(edge=>edge.fromPersonId===id||edge.toPersonId===id).length};
    });
    return freeze({nodes,edges});
  }
  function subset(model,options={}){
    const selectedKinds=options.kinds===undefined?defaultKinds:[...options.kinds],kindSet=new Set(selectedKinds);
    for(const kind of kindSet)if(!validKinds.has(kind))throw new TypeError('Unknown relationship type: '+kind);
    const allowedEdges=model.edges.filter(edge=>kindSet.has(edge.kind)),availableIds=new Set(allowedEdges.flatMap(edge=>[edge.fromPersonId,edge.toPersonId]));
    const query=String(options.query||'').trim(),tokens=query.split(/\s+/).map(fold).filter(Boolean),focusId=options.focusId||null;
    const matched=model.nodes.filter(node=>availableIds.has(node.id)&&(!focusId||node.id===focusId)&&(!tokens.length||tokens.every(token=>fold([node.name,node.nameKo,...(node.aliases||[])].join(' ')).includes(token))));
    const matchedIds=matched.map(node=>node.id),matchedSet=new Set(matchedIds),narrow=!!focusId||tokens.length>0;
    const edges=narrow?allowedEdges.filter(edge=>matchedSet.has(edge.fromPersonId)||matchedSet.has(edge.toPersonId)):allowedEdges;
    const ids=new Set(edges.flatMap(edge=>[edge.fromPersonId,edge.toPersonId]));
    const nodes=model.nodes.filter(node=>ids.has(node.id)).map(node=>({...node,matched:narrow&&matchedSet.has(node.id),visibleDegree:edges.filter(edge=>edge.fromPersonId===node.id||edge.toPersonId===node.id).length}));
    return freeze({nodes,edges,matchedIds:narrow?matchedIds:[],kinds:[...kindSet],query,focusId});
  }
  function components(model){
    const adjacency=new Map(model.nodes.map(node=>[node.id,new Set()]));
    for(const edge of model.edges){if(!adjacency.has(edge.fromPersonId)||!adjacency.has(edge.toPersonId))throw new TypeError('Layout edge endpoints must exist.');adjacency.get(edge.fromPersonId).add(edge.toPersonId);adjacency.get(edge.toPersonId).add(edge.fromPersonId);}
    const seen=new Set(),groups=[];
    for(const node of [...model.nodes].sort((a,b)=>compare(a.id,b.id))){
      if(seen.has(node.id))continue;
      const queue=[node.id],members=[];seen.add(node.id);
      for(let head=0;head<queue.length;head++){const id=queue[head];members.push(id);for(const next of [...adjacency.get(id)].sort(compare))if(!seen.has(next)){seen.add(next);queue.push(next);}}
      const root=members.slice().sort((a,b)=>adjacency.get(b).size-adjacency.get(a).size||compare(a,b))[0],order=[],ordered=new Set([root]),todo=[root];
      for(let head=0;head<todo.length;head++){const id=todo[head];order.push(id);for(const next of [...adjacency.get(id)].sort((a,b)=>adjacency.get(b).size-adjacency.get(a).size||compare(a,b)))if(!ordered.has(next)){ordered.add(next);todo.push(next);}}
      groups.push({id:members.slice().sort(compare)[0],nodeIds:order});
    }
    return groups.sort((a,b)=>b.nodeIds.length-a.nodeIds.length||compare(a.id,b.id));
  }
  function layout(model,options={}){
    let width=Number(options.width===undefined?1200:options.width),height=Number(options.height===undefined?760:options.height);
    if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw new TypeError('Layout dimensions must be positive finite numbers.');
    const gapX=160,gapY=100,padX=90,padY=80;
    width=Math.max(width,360);height=Math.max(height,240);
    if(!model.nodes.length){if(model.edges.length)throw new TypeError('Layout edge endpoints must exist.');return freeze({width,height,nodes:[],edges:[],components:[]});}
    const columns=Math.max(1,Math.floor((width-2*padX)/gapX)+1),occupied=[],positions=new Map(),groups=components(model);
    function available(x,y,w,h){if(x+w>columns)return false;for(let row=y;row<y+h;row++)for(let col=x;col<x+w;col++)if(occupied[row]?.[col])return false;return true;}
    const packed=[];
    for(const group of groups){
      const count=group.nodeIds.length,blockColumns=Math.min(columns,count<=3?count:Math.ceil(count/2)),blockRows=Math.ceil(count/blockColumns);
      let atX=0,atY=0,found=false;
      for(let y=0;!found;y++)for(let x=0;x<=columns-blockColumns;x++)if(available(x,y,blockColumns,blockRows)){atX=x;atY=y;found=true;break;}
      for(let y=atY;y<atY+blockRows;y++){occupied[y]??=[];for(let x=atX;x<atX+blockColumns;x++)occupied[y][x]=true;}
      const slots=[];
      for(let y=0;y<blockRows;y++)for(let x=0;x<blockColumns;x++)slots.push({x:atX+(y%2?blockColumns-1-x:x),y:atY+y});
      // A three-person component places its most-connected person between the other two.
      if(count===3&&blockRows===1)[slots[0],slots[1]]=[slots[1],slots[0]];
      group.nodeIds.forEach((id,index)=>positions.set(id,{x:padX+slots[index].x*gapX,y:padY+slots[index].y*gapY}));
      packed.push({...group,bounds:{x:padX+atX*gapX-65,y:padY+atY*gapY-35,width:(blockColumns-1)*gapX+130,height:(blockRows-1)*gapY+100}});
    }
    const usedRows=occupied.length,usedColumns=Math.max(...occupied.map(row=>row.length));
    const usedWidth=(usedColumns-1)*gapX+2*padX,usedHeight=(usedRows-1)*gapY+2*padY;
    width=Math.max(width,usedWidth);height=Math.max(height,usedHeight);
    const dx=(width-usedWidth)/2,dy=(height-usedHeight)/2;
    const nodes=model.nodes.map(node=>({...node,x:positions.get(node.id).x+dx,y:positions.get(node.id).y+dy}));
    return freeze({width,height,nodes,edges:model.edges.slice(),components:packed.map(group=>({...group,bounds:{...group.bounds,x:group.bounds.x+dx,y:group.bounds.y+dy}}))});
  }
  window.AtlasPersonGraphCore=freeze({build,subset,layout,components,kinds,defaultKinds});
})();
