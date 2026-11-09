/* A bounded SPARQL 2008 algebra view: Filter(BGP), LeftJoin, projection and DISTINCT. */
(function(){
  'use strict';
  const INTEGER='http://www.w3.org/2001/XMLSchema#integer';
  const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v),copy=v=>JSON.parse(JSON.stringify(v));
  const own=(v,k)=>Object.hasOwn(v,k),validKeys=(v,keys)=>object(v)&&Object.keys(v).every(k=>keys.includes(k));
  const array=(v,max)=>Array.isArray(v)&&v.length<=max&&Array.from(v).every(x=>x!==undefined);
  const name=v=>typeof v==='string'&&/^[A-Za-z][A-Za-z0-9_]*$/u.test(v)&&!['constructor','prototype','__proto__'].includes(v);
  const text=v=>typeof v==='string'&&v.trim().length>0;
  const iri=v=>typeof v==='string'&&/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(v)&&!/[\u0000-\u0020\u007F-\u009F<>"{}|^\x60\\]/u.test(v);
  function term(v,variable=false){
    if(!object(v)||typeof v.value!=='string')throw new TypeError('An RDF term needs an explicit type and string value.');
    if(variable&&v.type==='variable'){
      if(!validKeys(v,['type','value'])||!name(v.value))throw new TypeError('Unsupported variable name.');
      return{type:'variable',value:v.value};
    }
    if(v.type==='iri'){
      if(!validKeys(v,['type','value'])||!iri(v.value))throw new TypeError('An absolute, whitespace-free IRI is required.');
      return{type:'iri',value:v.value};
    }
    if(v.type!=='literal'||!validKeys(v,['type','value','datatype','language'])||own(v,'datatype')&&own(v,'language'))throw new TypeError('A literal uses either a datatype, a language, or neither.');
    const result={type:'literal',value:v.value};
    if(own(v,'datatype')){if(!iri(v.datatype))throw new TypeError('Invalid datatype IRI.');result.datatype=v.datatype;}
    if(own(v,'language')){if(typeof v.language!=='string'||!/^[A-Za-z]+(?:-[A-Za-z0-9]+)*$/u.test(v.language))throw new TypeError('Invalid language tag.');result.language=v.language.toLowerCase();}
    return result;
  }
  const key=t=>JSON.stringify(t.type==='iri'?['iri',t.value]:t.type==='variable'?['var',t.value]:['literal',t.value,own(t,'language')?'@':own(t,'datatype')?'^':'plain',t.language||t.datatype||'']);
  const mappingKey=b=>JSON.stringify(Object.keys(b).sort().map(k=>[k,key(b[k])]));
  function evaluate(options){
    if(!validKeys(options,['triples','query'])||!array(options.triples,64)||!object(options.query))throw new TypeError('Provide a small RDF graph and a supported query.');
    const q=options.query;
    if(!validKeys(q,['patterns','filter','optional','select','distinct'])||!array(q.patterns,6)||!array(q.optional,3)||!array(q.select,8)||!q.select.length||q.select.some(v=>!name(v))||new Set(q.select).size!==q.select.length||typeof q.distinct!=='boolean'||!(q.filter===null||validKeys(q.filter,['variable','operator','value'])&&name(q.filter.variable)&&q.filter.operator==='>='&&Number.isSafeInteger(q.filter.value)))throw new TypeError('Unsupported query AST.');
    const inputIds=new Set(),byTriple=new Map();
    for(const t of options.triples){
      if(!validKeys(t,['id','subject','predicate','object'])||!text(t.id)||inputIds.has(t.id)||!['subject','predicate','object'].every(k=>own(t,k)))throw new TypeError('Graph triple ids must be unique.');
      inputIds.add(t.id);const s=term(t.subject),p=term(t.predicate),o=term(t.object);
      if(s.type!=='iri'||p.type!=='iri')throw new TypeError('This graph view uses IRI subjects and predicates.');
      const k=JSON.stringify([key(s),key(p),key(o)]);
      if(!byTriple.has(k))byTriple.set(k,{subject:s,predicate:p,object:o,ids:[]});byTriple.get(k).ids.push(t.id);
    }
    const graph=[...byTriple].sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0).map(([,t])=>({...t,ids:t.ids.sort()}));
    const patternIds=new Set();
    const pattern=v=>{
      if(!validKeys(v,['id','subject','predicate','object'])||!text(v.id)||patternIds.has(v.id)||!['subject','predicate','object'].every(k=>own(v,k)))throw new TypeError('Patterns need unique ids and three terms.');
      patternIds.add(v.id);const result={id:v.id,subject:term(v.subject,true),predicate:term(v.predicate,true),object:term(v.object,true)};
      if(result.subject.type==='literal'||result.predicate.type==='literal')throw new TypeError('A subject or predicate pattern cannot be a literal.');return result;
    };
    const required=q.patterns.map(pattern),optional=q.optional.map(pattern);
    const fresh=()=>({bindings:{},proofs:[{matches:[],optionalMatched:null}]});
    const cap=rows=>{if(rows.length>4096)throw new RangeError('The displayed algebra is limited to4096 intermediate rows.');return rows;};
    function join(rows,p){
      const next=[];
      for(const row of rows)for(const t of graph){
        const bindings={...row.bindings};let compatible=true;
        for(const part of ['subject','predicate','object']){
          const wanted=p[part],actual=t[part];
          if(wanted.type==='variable'){
            if(own(bindings,wanted.value)&&key(bindings[wanted.value])!==key(actual)){compatible=false;break;}
            bindings[wanted.value]=actual;
          }else if(key(wanted)!==key(actual)){compatible=false;break;}
        }
        if(compatible){next.push({bindings,proofs:row.proofs.map(proof=>({matches:[...proof.matches,{patternId:p.id,tripleIds:t.ids.slice()}],optionalMatched:proof.optionalMatched}))});cap(next);}
      }
      return next;
    }
    const stages=[];let matched=[fresh()];
    for(const p of required){matched=join(matched,p);stages.push({patternId:p.id,rows:copy(matched)});}
    const kept=[],rejected=[];
    for(const row of matched){
      if(q.filter===null){kept.push(row);continue;}
      const v=row.bindings[q.filter.variable];
      if(!v||v.type!=='literal'||v.datatype!==INTEGER||!(/^[+-]?[0-9]+$/u.test(v.value))){rejected.push({row,reason:'error'});continue;}
      if(BigInt(v.value)>=BigInt(q.filter.value))kept.push(row);else rejected.push({row,reason:'false'});
    }
    let optionalRows=[];
    if(!optional.length)optionalRows=copy(kept);
    else for(const base of kept){
      let matches=[base];for(const p of optional)matches=join(matches,p);
      if(matches.length)for(const row of matches){for(const proof of row.proofs)proof.optionalMatched=true;optionalRows.push(row);cap(optionalRows);}
      else{const row=copy(base);for(const proof of row.proofs)proof.optionalMatched=false;optionalRows.push(row);cap(optionalRows);}
    }
    const projectedRows=optionalRows.map(row=>({bindings:Object.fromEntries(q.select.filter(v=>own(row.bindings,v)).map(v=>[v,row.bindings[v]])),proofs:row.proofs}));
    let rows;
    if(!q.distinct)rows=projectedRows;
    else{const unique=new Map();for(const row of projectedRows){const k=mappingKey(row.bindings);if(!unique.has(k))unique.set(k,{bindings:row.bindings,proofs:[]});unique.get(k).proofs.push(...row.proofs);}rows=[...unique.values()];}
    return copy({graph,duplicateTripleCount:options.triples.length-graph.length,stages,matchedRows:matched,filter:{keptRows:kept,rejectedRows:rejected},optionalRows,projectedRows,rows,distinctRemoved:projectedRows.length-rows.length});
  }
  window.AtlasSPARQLModel=Object.freeze({evaluate});

  const el=(tag,cls,value)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(value!==undefined)n.textContent=value;return n;};
  const svg=(tag,attrs={},value)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(value!==undefined)n.textContent=value;return n;};
  const sourced=v=>object(v)&&text(v.title)&&text(v.url);
  function validate(c){
    if(!object(c)||!array(c.stages,3)||c.stages.length!==3||!['match','join','answer'].every(id=>c.stages.some(s=>s.id===id&&text(s.label)&&text(s.text)))||!array(c.terms,40)||!object(c.initial)||!object(c.ui)||!array(c.patterns,6)||!sourced(c.source)||!text(c.scope)||!array(c.evidence,6)||!c.evidence.length||c.evidence.some(e=>!['id','title','formula','caption'].every(k=>text(e[k]))||!sourced(e.source)))throw new TypeError('SPARQL view needs its three stages, fixture, controls and sourced evidence.');
    if(c.patterns.length!==3||!['wrote','topic','year'].every(id=>c.patterns.some(p=>p.id===id))||!array(c.ui.topicChoices,6)||!c.ui.topicChoices.every(x=>text(x.id)&&text(x.label)&&(!own(x,'term')||term(x.term).type==='iri'))||new Set(c.ui.topicChoices.map(x=>x.id)).size!==c.ui.topicChoices.length||!array(c.ui.projections,6)||!c.ui.projections.every(x=>text(x.id)&&text(x.label)&&array(x.select,8)&&x.select.length&&x.select.every(name)&&new Set(x.select).size===x.select.length)||new Set(c.ui.projections.map(x=>x.id)).size!==c.ui.projections.length||!array(c.ui.yearChoices,12)||!c.ui.yearChoices.every(Number.isSafeInteger)||new Set(c.ui.yearChoices).size!==c.ui.yearChoices.length)throw new TypeError('Invalid authored query controls.');
    if(c.terms.some(x=>!object(x)||!text(x.label))||new Set(c.terms.map(x=>key(term(x.term)))).size!==c.terms.length||term(c.ui.topicPredicate).type!=='iri'||!name(c.ui.yearVariable))throw new TypeError('Term display metadata must be unique and separate from RDF identity.');
    const i=c.initial;if(!validKeys(i,['yearEnabled','minYear','topic','homepage','projection','distinct'])||typeof i.yearEnabled!=='boolean'||typeof i.distinct!=='boolean'||!c.ui.yearChoices.includes(i.minYear)||!c.ui.topicChoices.some(x=>x.id===i.topic)||!['off','optional','required'].includes(i.homepage)||!c.ui.projections.some(x=>x.id===i.projection))throw new TypeError('Invalid initial query controls.');
    evaluate({triples:c.triples,query:{patterns:c.patterns,filter:null,optional:[c.ui.homepagePattern],select:c.ui.projections[0].select,distinct:false}});
  }
  window.AtlasVisuals.register('sparql-pattern-query',{
    mount(host,config){
      validate(config);const root=el('div','sparql-pattern-query'),listeners=[],stageButtons=[],patternButtons=[],stepButtons=[],inputs={};
      const labels=new Map(config.terms.map(x=>[key(term(x.term)),x.label]));
      const pretty=t=>t.type==='variable'?'?'+t.value:labels.get(key(t))||(t.type==='iri'?t.value.split(/[/#]/u).at(-1)||t.value:t.value);
      const exact=t=>t.type==='variable'?'?'+t.value:t.type==='iri'?'<'+t.value+'>':JSON.stringify(t.value)+(t.language?'@'+t.language:t.datatype?'^^<'+t.datatype+'>':'');
      const listen=(n,event,fn)=>{n.addEventListener(event,fn);listeners.push(()=>n.removeEventListener(event,fn));};
      const group=(label,cls)=>{const n=el('div',cls||'spq-controls');n.setAttribute('role','group');n.setAttribute('aria-label',label);return n;};
      const button=(label,parent,fn)=>{const b=el('button','',label);b.type='button';listen(b,'click',fn);parent.append(b);return b;};
      const link=s=>{const a=el('a','spq-source',s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';return a;};
      const disclosure=(title,content)=>{const d=el('details','spq-details');d.append(el('summary','',title),content);return d;};
      const pane=(content,label,cls='spq-svg-viewport')=>{const p=el('div',cls);p.tabIndex=0;p.setAttribute('role','group');p.setAttribute('aria-label',label);p.append(content);return p;};
      let state={...config.initial},stage='match',activePattern=config.patterns[0].id,activeStep=0,selected=0,selectedMatch=0,selectedJoin=0,model,query,disposed=false;
      const nav=group('SPARQL의 질문과 답을 살펴보는 단계','spq-stage-controls'),stageText=el('p','spq-stage-text');
      const match=el('section','spq-panel spq-match'),patternControls=group('질문에 포함된 트리플 패턴 선택'),patternDrawing=el('div','spq-pattern-drawing'),matchText=el('p','spq-keypoint'),matchFacts=el('div'),matchGraph=el('div');
      match.append(el('h4','','답을 적는 대신, 답이 따라야 할 관계를 적다'),el('p','spq-prose','?person과 ?paper는 아직 모르는 대상을 담을 자리입니다. 패턴의 관계와 고정된 값은 그대로 두고, 그 자리에 들어갈 RDF 자원을 찾습니다.'),patternDrawing,patternControls,matchText,matchFacts,matchGraph);
      const join=el('section','spq-panel spq-join'),joinControls=group('패턴이 합쳐지는 단계 선택'),joinSummary=el('div','spq-flow'),joinTable=el('div'),joinGraph=el('div'),filterControls=group('발표 연도 조건'),filterSummary=el('p','spq-keypoint'),rejections=el('div');
      join.append(el('h4','','같은 변수에는 같은 대상이 들어가야 한다'),el('p','spq-prose','각 패턴을 따로 만족하는 조각만 모아서는 충분하지 않습니다. 앞에서 ?paper가 p1이었다면, 다음 패턴의 ?paper도 같은 RDF 항이어야 한 답으로 이어집니다.'),joinSummary,joinControls,joinTable,joinGraph,filterControls,filterSummary,rejections);
      const answer=el('section','spq-panel spq-answer'),answerControls=group('선택 관계와 결과 열 설정'),queryCode=el('pre','spq-code'),answerSummary=el('p','spq-keypoint'),answerTable=el('div'),answerGraph=el('div'),evidence=el('section','spq-proof');
      answer.append(el('h4','','답의 열을 고르고, 빠진 정보와 중복을 다루다'),el('p','spq-prose','홈페이지가 있는 사람만 남길지, 있으면 덧붙일지 정해 보세요. 문서 열을 빼면 같은 연구자가 여러 번 나타날 수 있습니다. DISTINCT는 선택한 열이 모두 같은 행을 하나로 만듭니다.'),answerControls,queryCode,answerSummary,answerTable,answerGraph,evidence);
      function selectControl(label,values,parent,field){const wrap=el('label','spq-field');wrap.append(el('span','',label));const s=el('select');s.dataset.control=field;for(const [value,title]of values){const o=el('option','',title);o.value=String(value);s.append(o);}wrap.append(s);parent.append(wrap);inputs[field]=s;listen(s,'change',()=>{state[field]=field==='minYear'?Number(s.value):s.value;selected=0;recompute();});return s;}
      function checkControl(label,parent,field){const wrap=el('label','spq-check'),s=el('input');s.type='checkbox';s.dataset.control=field;wrap.append(s,el('span','',label));parent.append(wrap);inputs[field]=s;listen(s,'change',()=>{state[field]=s.checked;selected=0;recompute();});return s;}
      selectControl('찾을 주제',config.ui.topicChoices.map(x=>[x.id,x.label]),patternControls,'topic');
      checkControl('연도 조건을 더하기',filterControls,'yearEnabled');selectControl('몇 년 이후인가',config.ui.yearChoices.map(x=>[x,x+'년 이후']),filterControls,'minYear');
      selectControl('홈페이지 관계',[['off','질문에 넣지 않음'],['optional','있으면 덧붙임 · OPTIONAL'],['required','반드시 있어야 함']],answerControls,'homepage');
      selectControl('답으로 볼 열',config.ui.projections.map(x=>[x.id,x.label]),answerControls,'projection');checkControl('같은 답을 하나로 · DISTINCT',answerControls,'distinct');
      const sourcePanels=el('div','spq-source-panels');for(const item of config.evidence){const n=el('section','spq-source-panel');n.append(el('h5','',item.title),el('pre','spq-code',item.formula),el('p','spq-prose',item.caption),link(item.source));sourcePanels.append(n);}
      const scope=el('div');scope.append(el('p','spq-note',config.scope),el('p','spq-note','이 보기의 고정된 질의 구조는 필수 패턴에 연도 필터를 적용한 뒤, 선택 관계를 덧붙이고 결과 열을 고릅니다. 빈칸은 빈 문자열이나 거짓이 아니라 해당 변수에 값이 결합되지 않았다는 뜻입니다. 표시 순서는 읽기 편의를 위한 것이며 ORDER BY를 실행한 결과가 아닙니다.'),link(config.source));
      for(const s of config.stages){const b=button(s.label,nav,()=>{stage=s.id;renderStage();});b.dataset.stage=s.id;stageButtons.push(b);}
      for(const p of config.patterns){const b=button(p.id==='wrote'?'누가 어떤 문서를 썼나':p.id==='topic'?'그 문서의 주제는 무엇인가':'그 문서는 언제 발표됐나',patternControls,()=>{activePattern=p.id;selectedMatch=0;renderMatch();});b.dataset.pattern=p.id;patternButtons.push(b);}
      function mark(buttons,field,value){for(const b of buttons){const on=b.dataset[field]===String(value);b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));}}
      function construct(){
        const patterns=copy(config.patterns),choice=config.ui.topicChoices.find(x=>x.id===state.topic);
        if(!choice)throw new TypeError('Unknown topic choice.');const topic=patterns.find(p=>key(p.predicate)===key(config.ui.topicPredicate));if(topic)topic.object=choice.term?copy(choice.term):{type:'variable',value:'topic'};
        if(state.homepage==='required')patterns.push(copy(config.ui.homepagePattern));
        const projection=config.ui.projections.find(x=>x.id===state.projection);if(!projection)throw new TypeError('Unknown projection.');
        const select=projection.select.slice();if(state.homepage!=='off'&&state.projection!=='person'&&!select.includes('homepage'))select.push('homepage');
        return{patterns,filter:state.yearEnabled?{variable:config.ui.yearVariable,operator:'>=',value:state.minYear}:null,optional:state.homepage==='optional'?[copy(config.ui.homepagePattern)]:[],select,distinct:state.distinct};
      }
      function renderStage(){root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;match.hidden=stage!=='match';join.hidden=stage!=='join';answer.hidden=stage!=='answer';}
      function patternSvg(){
        const s=svg('svg',{viewBox:'0 0 710 205',role:'img','aria-label':'연구자와 논문, 주제와 연도를 잇는 질문의 변수 패턴'});
        const box=(x,y,w,label,id)=>{const g=svg('g',{class:'spq-pattern-node'+(activePattern===id?' active':'')});g.append(svg('rect',{x,y,width:w,height:48,rx:9}),svg('text',{x:x+w/2,y:y+29,'text-anchor':'middle'},label));s.append(g);};
        const edge=(d,id,label,x,y)=>{s.append(svg('path',{d,class:'spq-pattern-edge'+(activePattern===id?' active':'')}),svg('text',{x,y,class:'spq-edge-label','text-anchor':'middle'},label));};
        edge('M 170 56 L 273 56 M 264 51 L 273 56 L 264 61','wrote','wrote',222,42);edge('M 425 56 L 528 56 M 519 51 L 528 56 L 519 61','topic','topic',475,42);edge('M 350 80 L 350 132 M 345 123 L 350 132 L 355 123','year','year',378,109);
        box(18,32,152,'?person','wrote');box(274,32,152,'?paper',activePattern==='wrote'?'wrote':activePattern==='topic'?'topic':'year');box(529,32,162,state.topic==='any'?'?topic':pretty(query.patterns.find(p=>p.id==='topic').object),'topic');box(274,133,152,'?year','year');
        s.append(svg('text',{x:18,y:196,class:'spq-svg-note'},'같은 ?paper가 세 패턴을 이어 주는 공통 자리입니다.'));return s;
      }
      function rdfGraph(row,title){
        const block=el('div','spq-rdf-graph'),active=new Set((row?.proofs||[]).flatMap(p=>p.matches.flatMap(m=>m.tripleIds)));block.append(el('h5','',title));
        const predicate=id=>config.patterns.find(p=>p.id===id).predicate,triples=model.graph;
        const related=p=>triples.filter(t=>key(t.predicate)===key(p)),unique=terms=>[...new Map(terms.map(t=>[key(t),t])).values()];
        const authorTriples=related(predicate('wrote')),topicTriples=related(predicate('topic')),yearTriples=related(predicate('year'));
        const papers=unique(authorTriples.map(t=>t.object)).sort((a,b)=>key(a)<key(b)?-1:1),people=unique(authorTriples.map(t=>t.subject)),topics=unique(topicTriples.map(t=>t.object)),years=unique(yearTriples.map(t=>t.object));
        const homepageTriples=state.homepage==='off'?[]:related(config.ui.homepagePattern.predicate),homes=unique(homepageTriples.map(t=>t.object));
        const height=Math.max(230,papers.length*108+48)+(homes.length?88:0),drawing=svg('svg',{viewBox:'0 0 880 '+height,role:'img','aria-label':title+'의 실제 RDF 자원과 관계'}),positions=new Map();
        const set=(t,x,y,w=150)=>positions.set(key(t),{term:t,x,y,w,h:50});
        papers.forEach((t,i)=>set(t,265,20+i*108));
        people.forEach((t,i)=>{const ys=authorTriples.filter(a=>key(a.subject)===key(t)).map(a=>positions.get(key(a.object))?.y).filter(y=>y!==undefined);set(t,18,ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:40+i*110,145);});
        topics.forEach((t,i)=>{const ys=topicTriples.filter(a=>key(a.object)===key(t)).map(a=>positions.get(key(a.subject))?.y).filter(y=>y!==undefined);set(t,520,ys.length?ys.reduce((a,b)=>a+b,0)/ys.length:40+i*110,150);});
        years.forEach((t,i)=>set(t,745,30+i*Math.max(80,(height-(homes.length?130:80))/Math.max(1,years.length-1)),112));
        homes.forEach((t,i)=>set(t,18,height-68-i*65,192));
        const visible=[...authorTriples,...topicTriples,...yearTriples,...homepageTriples];
        for(const t of visible){const a=positions.get(key(t.subject)),b=positions.get(key(t.object));if(!a||!b)continue;const on=t.ids.some(id=>active.has(id));let d,x,y;
          if(b.x>a.x){const start=a.x+a.w,end=b.x,mid=(start+end)/2,sy=a.y+25,ty=b.y+25;
            if(key(t.predicate)===key(predicate('year'))){const bend=sy+65;d='M '+start+' '+sy+' C '+(start+30)+' '+sy+' '+(start+25)+' '+bend+' '+(start+55)+' '+bend+' L '+(end-45)+' '+bend+' C '+(end-25)+' '+bend+' '+(end-25)+' '+ty+' '+end+' '+ty;x=mid;y=bend-8;}
            else{d='M '+start+' '+sy+' C '+mid+' '+sy+' '+mid+' '+ty+' '+end+' '+ty;x=mid;y=(sy+ty)/2-9;}}
          else{const end=b.x+b.w/2,bend=b.y-20;d='M '+a.x+' '+(a.y+25)+' C 5 '+(a.y+25)+' 5 '+(a.y+45)+' 5 '+bend+' L '+end+' '+bend+' L '+end+' '+b.y;x=end+42;y=bend-9;}
          const arrow=b.x>a.x?'M '+(b.x-7)+' '+(b.y+21)+' L '+b.x+' '+(b.y+25)+' L '+(b.x-7)+' '+(b.y+29):'M '+(b.x+b.w/2-4)+' '+(b.y-7)+' L '+(b.x+b.w/2)+' '+b.y+' L '+(b.x+b.w/2+4)+' '+(b.y-7);
          const edge=svg('g',{class:'spq-rdf-edge'+(on?' active':''),'data-triple-ids':t.ids.join(','),'data-highlighted':String(on)});edge.append(svg('path',{d,class:'spq-rdf-relation'}),svg('path',{d:arrow,class:'spq-rdf-arrow'}),svg('text',{x,y,'text-anchor':'middle'},pretty(t.predicate)));drawing.append(edge);
        }
        for(const p of positions.values()){const on=visible.some(t=>t.ids.some(id=>active.has(id))&&(key(t.subject)===key(p.term)||key(t.object)===key(p.term))),g=svg('g',{class:'spq-rdf-node'+(on?' active':''),'data-term-key':key(p.term)});g.append(svg('rect',{x:p.x,y:p.y,width:p.w,height:p.h,rx:9}),svg('text',{x:p.x+p.w/2,y:p.y+22,'text-anchor':'middle'},pretty(p.term)),svg('text',{x:p.x+p.w/2,y:p.y+39,'text-anchor':'middle',class:'spq-rdf-kind'},p.term.type==='literal'?(p.term.datatype===INTEGER?'정수 리터럴':'리터럴'):'RDF 자원'));drawing.append(g);}
        if(!positions.size)drawing.append(svg('text',{x:30,y:80,class:'spq-svg-note'},'현재 그래프에 표시할 관계가 없습니다.'));
        block.append(pane(drawing,title+', 실제 관계 그림을 좌우로 이동'),el('p','spq-note',active.size?'강조한 선은 선택한 대응에서 사용한 RDF 진술입니다. 옅은 선은 같은 그래프의 다른 기록입니다.':'현재 선택한 대응이 없어 강조한 관계도 없습니다. 옅은 선은 그래프에 기록된 관계입니다.'));
        const tags=el('p','spq-triple-tags');for(const id of [...active].sort())tags.append(el('code','',id));block.append(tags);return block;
      }
      function table(rows,variables,title,onPick=null,picked=0,tableId='answer'){
        const block=el('div','spq-table-block');block.dataset.table=tableId;block.append(el('h5','',title));const t=el('table','spq-table'),head=el('thead'),hr=el('tr');if(onPick)hr.append(el('th','','연결 보기'));for(const v of variables)hr.append(el('th','','?'+v));head.append(hr);t.append(head);const body=el('tbody');
        rows.forEach((row,i)=>{const tr=el('tr');if(onPick){const td=el('td');const b=button(String(i+1),td,()=>onPick(i));b.dataset.row=String(i);b.setAttribute('aria-label',(tableId==='answer'?'답 ':'대응 ')+(i+1)+'의 연결 보기');b.setAttribute('aria-pressed',String(i===picked));tr.append(td);tr.classList.toggle('selected',i===picked);}for(const v of variables){const td=el('td');if(own(row.bindings,v)){td.textContent=pretty(row.bindings[v]);td.title=exact(row.bindings[v]);td.dataset.bound='true';}else{td.append(el('span','spq-unbound','미결합'));td.dataset.bound='false';}tr.append(td);}body.append(tr);});
        if(!rows.length){const tr=el('tr'),td=el('td','spq-empty','조건에 맞는 변수 대응이 없습니다.');td.colSpan=variables.length+(onPick?1:0);tr.append(td);body.append(tr);}t.append(body);block.append(pane(t,title+', 표를 좌우로 이동','spq-table-viewport'));return block;
      }
      function renderMatch(){
        mark(patternButtons,'pattern',activePattern);patternDrawing.replaceChildren(pane(patternSvg(),'질문의 관계 패턴 그림, 좌우로 이동'),el('p','spq-note','변수가 같은 이름으로 다시 나오면 같은 RDF 항을 가리켜야 합니다. 그림은 W3C의 그래프 패턴 정의를 바탕으로 구성했습니다.'));
        const p=query.patterns.find(x=>x.id===activePattern),vars=[...new Set(['subject','predicate','object'].filter(k=>p[k].type==='variable').map(k=>p[k].value))];
        const single=evaluate({triples:config.triples,query:{patterns:[p],filter:null,optional:[],select:vars.length?vars:['answer'],distinct:false}});
        matchText.textContent=exact(p.subject)+'  '+pretty(p.predicate)+'  '+exact(p.object)+' · 이 패턴만 만족하는 대응 '+single.rows.length+'개';
        selectedMatch=Math.max(0,Math.min(selectedMatch,single.rows.length-1));matchFacts.replaceChildren(table(single.rows,vars,'한 패턴에 들어갈 수 있는 값',i=>{selectedMatch=i;renderMatch();},selectedMatch,'match'));matchGraph.replaceChildren(rdfGraph(single.rows[selectedMatch],'변수의 자리에 실제 자원을 넣어 보다'));
        const facts=el('div','spq-matching-facts');for(const row of single.rows){for(const proof of row.proofs)for(const evidence of proof.matches){const t=model.graph.find(t=>t.ids.some(id=>evidence.tripleIds.includes(id)));const item=el('p');item.append(el('code','',t.ids.join(', ')+' · '+pretty(t.subject)+' — '+pretty(t.predicate)+' → '+pretty(t.object)));facts.append(item);}}
        matchFacts.append(disclosure('실제로 맞아떨어진 RDF 기록',facts));root.dataset.pattern=activePattern;root.dataset.matchRow=String(selectedMatch);
      }
      function renderJoin(){
        joinControls.replaceChildren();stepButtons.length=0;joinSummary.replaceChildren();model.stages.forEach((s,i)=>{const n=el('div','spq-flow-step');n.append(el('span','',String(i+1)),el('strong','',s.rows.length+'개 대응'),el('small','',pretty(query.patterns[i].predicate)));joinSummary.append(n);const b=button((i+1)+'번째 패턴까지',joinControls,()=>{activeStep=i;renderJoin();});b.dataset.step=String(i);stepButtons.push(b);});
        activeStep=Math.min(activeStep,model.stages.length-1);mark(stepButtons,'step',activeStep);const rows=model.stages[activeStep]?.rows||model.matchedRows,vars=[...new Set(rows.flatMap(r=>Object.keys(r.bindings)))];selectedJoin=Math.max(0,Math.min(selectedJoin,rows.length-1));joinTable.replaceChildren(table(rows,vars.length?vars:['person','paper'],'공통 변수를 맞춘 중간 대응',i=>{selectedJoin=i;renderJoin();},selectedJoin,'join'));joinGraph.replaceChildren(rdfGraph(rows[selectedJoin],'공유 변수가 이어 준 실제 관계'));
        filterSummary.textContent=state.yearEnabled?'?'+config.ui.yearVariable+' ≥ '+state.minYear+'를 적용하면 '+model.filter.keptRows.length+'개가 남고 '+model.filter.rejectedRows.length+'개가 제외됩니다.':'연도 조건을 아직 요구하지 않았습니다. 필수 관계 패턴 '+query.patterns.length+'개를 함께 만족한 대응은 '+model.matchedRows.length+'개입니다.';
        rejections.replaceChildren();if(model.filter.rejectedRows.length){const details=el('div');for(const item of model.filter.rejectedRows){const p=el('p','spq-note');p.textContent=Object.entries(item.row.bindings).map(([v,t])=>'?'+v+'='+pretty(t)).join(' · ')+' → '+(item.reason==='false'?'연도 조건에 맞지 않음':'정수 비교 값을 확인할 수 없음');details.append(p);}rejections.append(disclosure('어떤 대응이 제외됐나',details));}root.dataset.joinRows=String(model.matchedRows.length);root.dataset.filteredRows=String(model.filter.keptRows.length);root.dataset.joinRow=String(selectedJoin);root.dataset.joinStep=String(activeStep);
      }
      function queryText(){
        const namespace=config.ui.topicPredicate.value.replace(/[^/#]*$/u,''),compact=t=>namespace&&t.type==='iri'&&t.value.startsWith(namespace)&&/^[A-Za-z_][A-Za-z0-9._-]*$/u.test(t.value.slice(namespace.length))?'ex:'+t.value.slice(namespace.length):exact(t);
        const triple=p=>'    '+[p.subject,p.predicate,p.object].map(compact).join(' ')+' .';
        const main=query.patterns.map(triple);if(query.filter)main.push('    FILTER (?'+query.filter.variable+' >= '+query.filter.value+')');
        return(namespace?'PREFIX ex: <'+namespace+'>\n':'')+'SELECT '+(query.distinct?'DISTINCT ':'')+query.select.map(v=>'?'+v).join(' ')+'\nWHERE {\n'+(query.optional.length?'  {\n'+main.join('\n')+'\n  }\n  OPTIONAL {\n'+query.optional.map(triple).join('\n')+'\n  }':main.join('\n'))+'\n}';
      }
      function renderAnswer(){
        queryCode.textContent=queryText();selected=Math.max(0,Math.min(selected,model.rows.length-1));answerTable.replaceChildren(table(model.rows,query.select,'질문의 답 · '+model.rows.length+'행',i=>{selected=i;renderAnswer();},selected,'answer'));answerGraph.replaceChildren(rdfGraph(model.rows[selected],'이 답을 뒷받침하는 RDF 연결'));
        const unbound=model.rows.filter(r=>query.select.some(v=>!own(r.bindings,v))).length;
        answerSummary.textContent='필수 패턴과 필터 뒤 '+model.filter.keptRows.length+'개 → 관계를 덧붙인 뒤 '+model.optionalRows.length+'개 → 선택한 열로 '+model.rows.length+'행'+(query.distinct?' · 같은 답 '+model.distinctRemoved+'행을 합쳤습니다.':' · 같은 값의 행도 각각 유지합니다.')+(unbound?' 미결합 값이 있는 답은 '+unbound+'행입니다.':'');
        evidence.replaceChildren(el('h5','','이 답은 어떤 연결에서 왔나'));const row=model.rows[selected];if(!row)evidence.append(el('p','spq-note','현재 조건에서 답이 없어 연결 근거도 없습니다.'));
        else{evidence.append(el('p','spq-prose','선택한 답 '+(selected+1)+' · 이 답을 뒷받침하는 패턴 매칭 경로 '+row.proofs.length+'개'));row.proofs.forEach((proof,i)=>{const block=el('div','spq-proof-path');block.append(el('h6','','경로 '+(i+1)));const list=el('ol');for(const m of proof.matches){const t=model.graph.find(t=>t.ids.some(id=>m.tripleIds.includes(id))),li=el('li');li.append(el('span','',pretty(t.subject)+' — '+pretty(t.predicate)+' → '+pretty(t.object)),el('code','',m.patternId+' · '+m.tripleIds.join(', ')));list.append(li);}block.append(list);if(proof.optionalMatched===false)block.append(el('p','spq-note','선택한 관계는 맞는 기록이 없어 덧붙이지 않았습니다. 기존 답은 남고 해당 변수는 미결합입니다.'));evidence.append(block);});}
        root.dataset.rows=String(model.rows.length);root.dataset.distinctRemoved=String(model.distinctRemoved);root.dataset.unboundRows=String(unbound);root.dataset.answerRow=String(selected);
      }
      function recompute(){
        query=construct();model=evaluate({triples:config.triples,query});for(const[field,input]of Object.entries(inputs)){if(input.type==='checkbox')input.checked=Boolean(state[field]);else input.value=String(state[field]);}
        for(const[k,v]of Object.entries(state))root.dataset[k]=String(v);renderMatch();renderJoin();renderAnswer();
      }
      root.append(nav,stageText,match,join,answer,disclosure('공식 표준의 정의와 비교하기',sourcePanels),disclosure('이 보기의 범위와 전제',scope));recompute();renderStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const off of listeners)off();root.remove();};
    }
  });
})();
