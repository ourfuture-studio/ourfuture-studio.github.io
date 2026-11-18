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
  const companyKind = {id:'company-record',label:'회사 기록 참여',directed:false};
  const validKinds = new Set([...kinds.map(kind=>kind.id),companyKind.id]);
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
      if(!kinds.some(kind=>kind.id===edge.kind)||!edge.sources?.length||edge.fromPersonId===edge.toPersonId)throw new TypeError('Graph edges must preserve a real typed and cited relationship.');
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
  // A company is a separate node, never a shortcut for an inferred employment
  // or coauthorship relationship. Only cited event.peopleIds create its edges.
  function augmentCompanies(personModel,companies,profiles=[]){
    if(!personModel||!Array.isArray(personModel.nodes)||!Array.isArray(personModel.edges)||!Array.isArray(companies)||!Array.isArray(profiles))throw new TypeError('Person graph, company records and profiles are required.');
    const nodes=new Map(personModel.nodes.map(p=>[p.id,clone(p)])),profileById=new Map(profiles.map(p=>[p.id,p])),pairs=new Map(),companyIds=new Set(),skipped=[];
    const sourceList=sources=>(sources||[]).filter(s=>s&&typeof s.title==='string'&&s.title.trim()&&/^https?:\/\//i.test(s.url||''));
    for(const c of companies){
      if(!c?.id||companyIds.has(c.id))throw new TypeError('Company identities must be present and unique.');companyIds.add(c.id);
      const companyId='company:'+c.id;
      if(nodes.has(companyId))throw new TypeError('Company and person identities must not collide.');
      for(const event of c.events||[]){
        const sources=sourceList(event.sources);if(!event.id||!sources.length)continue;
        for(const id of new Set(event.peopleIds||[])){
          if(typeof id!=='string'||id.startsWith('company:'))continue;
          const profile=profileById.get(id),known=nodes.get(id);
          if(!known&&!profile){skipped.push({companyId:c.id,recordId:event.id,personId:id,reason:'No sourced person identity in graph or profiles'});continue;}
          if(!known)nodes.set(id,{id,name:profile.name,nameKo:profile.nameKo||'',label:profile.nameKo||profile.name,aliases:[...(profile.aliases||[])],profileId:profile.id,hasProfile:true,hasBackground:false,tags:[...(profile.tags||[])],degree:0});
          const key=companyId+'|'+id;
          if(!pairs.has(key))pairs.set(key,{id:companyKind.id+':'+companyId+':'+id,kind:companyKind.id,directed:false,fromPersonId:companyId,toPersonId:id,sources:[],evidence:[],records:[]});
          const pair=pairs.get(key);if(pair.records.some(r=>r.id===event.id))continue;
          const roster=(c.people||[]).filter(p=>p.id===id).map(p=>({name:p.name||'',role:p.role||'',note:p.note||''}));
          const record={id:event.id,title:event.title||event.id,date:event.date||'',dateLabel:event.dateLabel||'',year:event.year??null,idea:event.idea||'',companyId:c.id,sources:clone(sources),roster:clone(roster)};
          pair.records.push(record);pair.evidence.push({description:record.title+(record.idea?' — '+record.idea:''),period:record.dateLabel||record.date,recordId:record.id,companyId:c.id,roster:clone(roster)});
          for(const source of sources)if(!pair.sources.some(s=>s.url===source.url&&s.title===source.title&&s.scope===source.scope))pair.sources.push(clone(source));
        }
      }
      if([...pairs.values()].some(e=>e.fromPersonId===companyId))nodes.set(companyId,{id:companyId,nodeType:'company',companyId:c.id,name:c.name,nameKo:c.nameKo||'',label:c.nameKo||c.name,aliases:[...(c.aliases||[]),...(c.orgAliases||[])],tags:['industry'],hasProfile:false,profileId:null,hasBackground:false,logo:clone(c.logo||null),accent:c.accent||'',degree:0});
    }
    const edges=[...personModel.edges.map(clone),...[...pairs.values()].map(pair=>({...pair,records:pair.records.sort((a,b)=>compare(a.date,b.date)||compare(a.id,b.id))}))].sort((a,b)=>compare(a.id,b.id));
    const adjacency=new Map([...nodes.keys()].map(id=>[id,new Set()]));for(const edge of edges){adjacency.get(edge.fromPersonId).add(edge.toPersonId);adjacency.get(edge.toPersonId).add(edge.fromPersonId);}
    return freeze({nodes:[...nodes.values()].sort((a,b)=>compare(a.id,b.id)).map(p=>({...p,degree:adjacency.get(p.id).size})),edges,skipped});
  }
  function subset(model,options={}){
    const selectedKinds=options.kinds===undefined?defaultKinds:[...options.kinds],kindSet=new Set(selectedKinds);
    for(const kind of kindSet)if(!validKinds.has(kind))throw new TypeError('Unknown relationship type: '+kind);
    const allowedEdges=model.edges.filter(edge=>kindSet.has(edge.kind)),availableIds=new Set(allowedEdges.flatMap(edge=>[edge.fromPersonId,edge.toPersonId]));
    const query=String(options.query||'').trim(),tokens=query.split(/\s+/).map(fold).filter(Boolean),focusId=options.focusId||null;
    const matched=model.nodes.filter(node=>availableIds.has(node.id)&&(!focusId||node.id===focusId)&&(!tokens.length||tokens.every(token=>fold([node.name,node.nameKo,...(node.aliases||[])].join(' ')).includes(token))));
    const matchedIds=matched.map(node=>node.id),matchedSet=new Set(matchedIds),narrow=!!focusId||tokens.length>0;
    let edges=narrow?allowedEdges.filter(edge=>matchedSet.has(edge.fromPersonId)||matchedSet.has(edge.toPersonId)):allowedEdges;
    // Keep other participants visible through a directly matched person's company.
    // This adds company-record paths only; it creates no person-person relation.
    if(narrow&&options.companyContext){
      const companies=new Set(edges.filter(e=>e.kind===companyKind.id).flatMap(e=>[e.fromPersonId,e.toPersonId]).filter(id=>id.startsWith('company:')));
      const selectedCompanies=new Set(matched.filter(p=>p.nodeType==='company').map(p=>p.id)),participants=new Set();
      for(const edge of allowedEdges)if(edge.kind===companyKind.id&&(selectedCompanies.has(edge.fromPersonId)||selectedCompanies.has(edge.toPersonId))){participants.add(edge.fromPersonId);participants.add(edge.toPersonId);}
      edges=allowedEdges.filter(edge=>matchedSet.has(edge.fromPersonId)||matchedSet.has(edge.toPersonId)||(edge.kind===companyKind.id&&(companies.has(edge.fromPersonId)||companies.has(edge.toPersonId)))||(edge.kind!==companyKind.id&&participants.has(edge.fromPersonId)&&participants.has(edge.toPersonId)));
    }
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
  // Network view metrics describe this visible, documented graph only.
  // A second biography or another citation URL never makes a relationship heavier.
  function network(model,options={}){
    let width=Number(options.width===undefined?1200:options.width),height=Number(options.height===undefined?800:options.height);
    if(!Number.isFinite(width)||!Number.isFinite(height)||width<=0||height<=0)throw new TypeError('Network dimensions must be positive finite numbers.');
    width=Math.max(360,width);height=Math.max(240,height);
    if(!model||!Array.isArray(model.nodes)||!Array.isArray(model.edges))throw new TypeError('A graph with nodes and edges is required.');
    const adjacency=new Map(model.nodes.map(p=>[p.id,new Set()])),pairRecords=new Map(),pairKey=(a,b)=>[a,b].sort(compare).join(':');
    if(adjacency.size!==model.nodes.length)throw new TypeError('Network node identities must be unique.');
    for(const e of model.edges){
      if(!adjacency.has(e.fromPersonId)||!adjacency.has(e.toPersonId)||e.fromPersonId===e.toPersonId||!validKinds.has(e.kind))throw new TypeError('Network edges need distinct, existing endpoints and a known relationship type.');
      adjacency.get(e.fromPersonId).add(e.toPersonId);adjacency.get(e.toPersonId).add(e.fromPersonId);
      const key=pairKey(e.fromPersonId,e.toPersonId),ends=['advisor','influence'].includes(e.kind)?[e.fromPersonId,e.toPersonId]:[e.fromPersonId,e.toPersonId].sort(compare);
      if(!pairRecords.has(key))pairRecords.set(key,new Set());pairRecords.get(key).add([e.kind,...ends].join(':'));
    }
    const edges=model.edges.map(e=>{const pairWeight=pairRecords.get(pairKey(e.fromPersonId,e.toPersonId)).size;return{...clone(e),pairWeight,strokeWidth:1.4+1.6*(pairWeight-1)};});
    if(!model.nodes.length)return freeze({width,height,nodes:[],edges,components:[]});
    const nodeById=new Map(model.nodes.map(p=>[p.id,p])),radius=id=>Math.min(24,8+6*Math.sqrt(adjacency.get(id).size)),labelHalf=id=>Math.max(60,Math.min(80,[...String(nodeById.get(id).label||nodeById.get(id).name||id)].reduce((n,c)=>n+(/[\u2e80-\u9fff\uac00-\ud7af]/.test(c)?12.5:6.2),0)/2+6));
    const groups=components(model),locals=[];
    for(const group of groups){
      const points=group.nodeIds.map((id,i)=>({id,x:i?Math.cos(i*2.399963229728653)*48*Math.sqrt(i):0,y:i?Math.sin(i*2.399963229728653)*48*Math.sqrt(i):0,vx:0,vy:0,radius:radius(id),labelHalfWidth:labelHalf(id)})),byId=new Map(points.map(p=>[p.id,p]));
      const links=edges.filter(e=>byId.has(e.fromPersonId)&&byId.has(e.toPersonId)),uniqueLinks=[...new Map(links.map(e=>[pairKey(e.fromPersonId,e.toPersonId),e])).values()];
      if(points.length===2){const gap=(points[0].labelHalfWidth+points[1].labelHalfWidth+32)/2;points[0].x=-gap;points[1].x=gap;points[0].y=points[1].y=0;}
      if(points.length===3){points[0].x=0;points[0].y=-44;const gap=(points[1].labelHalfWidth+points[2].labelHalfWidth+12)/2;points[1].x=-gap;points[2].x=gap;points[1].y=points[2].y=43;}
      // Small deterministic spring simulations retain separate connected groups.
      if(points.length>3)for(let step=0;step<360;step++){
        const cooling=1-step/430;
        for(const p of points){p.vx-=p.x*.003;p.vy-=p.y*.003;}
        for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
          const a=points[i],b=points[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||1,force=1200/(d*d+600),fx=dx/d*force,fy=dy/d*force;
          a.vx-=fx;a.vy-=fy;b.vx+=fx;b.vy+=fy;
        }
        for(const e of uniqueLinks){const a=byId.get(e.fromPersonId),b=byId.get(e.toPersonId),dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)||1,ideal=115/(1+.12*(e.pairWeight-1)),force=(d-ideal)*.025;a.vx+=dx/d*force;a.vy+=dy/d*force;b.vx-=dx/d*force;b.vy-=dy/d*force;}
        for(const p of points){p.vx*=.65;p.vy*=.65;p.x+=p.vx*cooling;p.y+=p.vy*cooling;}
        separate(points,2);
      }
      separate(points,90);
      const left=Math.min(...points.map(p=>p.x-p.labelHalfWidth)),right=Math.max(...points.map(p=>p.x+p.labelHalfWidth)),top=Math.min(...points.map(p=>p.y-p.radius-8)),bottom=Math.max(...points.map(p=>p.y+p.radius+43));
      locals.push({...group,points,left,top,width:right-left+20,height:bottom-top+20});
    }
    function separate(points,passes){
      for(let pass=0;pass<passes;pass++){
        let moved=false;
        for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
          const a=points[i],b=points[j],dx=b.x-a.x,dy=b.y-a.y,overX=a.labelHalfWidth+b.labelHalfWidth+8-Math.abs(dx),overY=a.radius+b.radius+55-Math.abs(dy);
          if(overX<=0||overY<=0)continue;
          if(overX<overY){const shift=(overX+.15)/2,sign=dx<0?-1:1;a.x-=sign*shift;b.x+=sign*shift;}else{const shift=(overY+.15)/2,sign=dy<0?-1:1;a.y-=sign*shift;b.y+=sign*shift;}moved=true;
        }
        if(!moved)break;
      }
    }
    width=Math.max(width,...locals.map(g=>g.width+48));height=Math.max(height,...locals.map(g=>g.height+48));
    const ordered=locals.slice().sort((a,b)=>b.width*b.height-a.width*a.height||compare(a.id,b.id));
    function pack(w,h){
      let free=[{x:24,y:24,width:w-48,height:h-48}];const result=new Map();
      for(const g of ordered){
        let chosen=null,score=Infinity;
        for(const r of free)if(g.width<=r.width+.001&&g.height<=r.height+.001){const next=Math.min(r.width-g.width,r.height-g.height);if(next<score){score=next;chosen=r;}}
        if(!chosen)return null;
        const box={x:chosen.x,y:chosen.y,width:g.width,height:g.height};result.set(g.id,box);const next=[];
        for(const r of free){
          if(box.x>=r.x+r.width||box.x+box.width<=r.x||box.y>=r.y+r.height||box.y+box.height<=r.y){next.push(r);continue;}
          if(box.x>r.x)next.push({x:r.x,y:r.y,width:box.x-r.x,height:r.height});
          if(box.x+box.width<r.x+r.width)next.push({x:box.x+box.width,y:r.y,width:r.x+r.width-box.x-box.width,height:r.height});
          if(box.y>r.y)next.push({x:r.x,y:r.y,width:r.width,height:box.y-r.y});
          if(box.y+box.height<r.y+r.height)next.push({x:r.x,y:box.y+box.height,width:r.width,height:r.y+r.height-box.y-box.height});
        }
        free=next.filter((r,i)=>r.width>.01&&r.height>.01&&!next.some((s,j)=>i!==j&&r.x>=s.x&&r.y>=s.y&&r.x+r.width<=s.x+s.width&&r.y+r.height<=s.y+s.height&&(r.width*r.height<s.width*s.height||i>j)));
      }
      return result;
    }
    let packed=pack(width,height),attempt=0;while(!packed&&attempt++<80){height*=1.08;packed=pack(width,height);}if(!packed)throw new Error('Network groups could not be packed.');
    const right=Math.max(...[...packed.values()].map(b=>b.x+b.width)),bottom=Math.max(...[...packed.values()].map(b=>b.y+b.height)),shiftX=(width-right-24)/2,shiftY=(height-bottom-24)/2,positions=new Map(),resultGroups=[];
    for(const g of locals){const b=packed.get(g.id),x=b.x+shiftX,y=b.y+shiftY;for(const p of g.points)positions.set(p.id,{x:x+p.x-g.left+10,y:y+p.y-g.top+10,radius:p.radius,labelWidth:p.labelHalfWidth*2-12,connectionCount:adjacency.get(p.id).size,componentId:g.id});resultGroups.push({id:g.id,nodeIds:g.nodeIds.slice(),bounds:{x,y,width:b.width,height:b.height}});}
    return freeze({width,height,nodes:model.nodes.map(p=>({...clone(p),...positions.get(p.id)})),edges,components:resultGroups});
  }

  window.AtlasPersonGraphCore=freeze({build,augmentCompanies,subset,layout,network,components,kinds,defaultKinds,companyKind});
})();
