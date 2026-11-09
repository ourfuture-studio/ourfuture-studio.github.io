/* RDF terms and a graph union for the authored views, not a Turtle parser or reasoner. */
(function(){
  'use strict';
  const XSD_STRING='http://www.w3.org/2001/XMLSchema#string',RDF_LANG='http://www.w3.org/1999/02/22-rdf-syntax-ns#langString';
  const isRecord=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const compare=(a,b)=>a<b?-1:a>b?1:0;
  function iri(value){
    if(typeof value!=='string'||!value.length||!/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(value)||/[\u0000-\u0020<>"{}|^`\\]/u.test(value))throw new TypeError('This view requires an absolute, whitespace-free IRI.');
    return value;
  }
  function canonicalTerm(term){
    if(!isRecord(term)||!['iri','literal'].includes(term.type)||typeof term.value!=='string')throw new TypeError('A term must explicitly be an IRI or literal. Blank nodes are outside this view.');
    const allowed=term.type==='iri'?['type','value']:['type','value','datatype','language'];
    if(Object.keys(term).some(key=>!allowed.includes(key)))throw new TypeError('Display labels belong to view metadata, not RDF term identity.');
    if(term.type==='iri')return{type:'iri',value:iri(term.value)};
    const language=Object.hasOwn(term,'language'),datatype=Object.hasOwn(term,'datatype');
    if(language&&datatype)throw new TypeError('A literal here uses a language tag or a datatype, not both input forms.');
    if(language){
      if(typeof term.language!=='string'||!/^[A-Za-z]+(?:-[A-Za-z0-9]+)*$/u.test(term.language))throw new TypeError('A nonempty language tag is required.');
      return{type:'literal',value:term.value,language:term.language.toLowerCase()};
    }
    const type=datatype?iri(term.datatype):XSD_STRING;
    if(type===RDF_LANG)throw new TypeError('rdf:langString requires a language-tagged input.');
    return{type:'literal',value:term.value,datatype:type};
  }
  const termKey=term=>JSON.stringify(term.type==='iri'?['iri',term.value]:['literal',term.value,term.language?'@':'^',term.language||term.datatype]);
  const cloneTerm=term=>({...term});
  function mergeGraphs(options){
    if(!isRecord(options)||!Array.isArray(options.graphs)||options.graphs.length>16)throw new TypeError('Provide up to sixteen source graphs.');
    const ids=new Set(),triples=new Map(),counts=[];let inputTripleCount=0;
    for(const graph of options.graphs){
      if(!isRecord(graph)||!hasText(graph.id)||graph.id.length>80||ids.has(graph.id)||!Array.isArray(graph.triples))throw new TypeError('Each source graph needs a unique id and triples.');
      ids.add(graph.id);inputTripleCount+=graph.triples.length;if(inputTripleCount>128)throw new RangeError('This view is limited to128 input triples.');
      const local=new Set();
      for(const triple of graph.triples){
        if(!isRecord(triple)||!['subject','predicate','object'].every(key=>Object.hasOwn(triple,key)))throw new TypeError('Each triple needs subject, predicate and object terms.');
        const subject=canonicalTerm(triple.subject),predicate=canonicalTerm(triple.predicate),object=canonicalTerm(triple.object);
        if(subject.type!=='iri'||predicate.type!=='iri')throw new TypeError('Subject and predicate must be IRIs in this view.');
        const key=JSON.stringify([termKey(subject),termKey(predicate),termKey(object)]);local.add(key);
        if(!triples.has(key))triples.set(key,{key,subject,predicate,object,sources:new Set()});triples.get(key).sources.add(graph.id);
      }
      counts.push({id:graph.id,inputTriples:graph.triples.length,uniqueTriples:local.size});
    }
    const result=[...triples.values()].sort((a,b)=>compare(a.key,b.key)).map(t=>({key:t.key,subject:cloneTerm(t.subject),predicate:cloneTerm(t.predicate),object:cloneTerm(t.object),sources:[...t.sources].sort(compare)}));
    const nodes=new Map();for(const t of result)for(const term of [t.subject,t.object])nodes.set(termKey(term),cloneTerm(term));
    return{
      triples:result,nodes:[...nodes].sort((a,b)=>compare(a[0],b[0])).map(([key,term])=>({key,term})),
      edges:result.map(t=>({key:t.key,subjectKey:termKey(t.subject),predicate:cloneTerm(t.predicate),objectKey:termKey(t.object),sources:t.sources.slice()})),
      graphCounts:counts.sort((a,b)=>compare(a.id,b.id)),inputTripleCount,duplicateCount:inputTripleCount-result.length
    };
  }
  window.AtlasRDFModel=Object.freeze({mergeGraphs});

  const node=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  const sourced=value=>value&&hasText(value.title)&&hasText(value.url);
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file]||'assets/'+file;
  function link(item){const e=node('a','rdf-source',item.title+' ↗');e.href=item.url;e.target='_blank';e.rel='noopener noreferrer';return e;}
  const svgNode=(tag,attrs,text)=>{const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const [key,value] of Object.entries(attrs||{}))e.setAttribute(key,String(value));if(text!==undefined)e.textContent=text;return e;};
  function wrapGraphLabel(value,limit){
    let remaining=Array.from(value.replace(/\s+/gu,' ').trim());const lines=[];
    while(remaining.length){
      if(lines.length===1){lines.push(remaining.length>limit?remaining.slice(0,limit-1).join('')+'…':remaining.join(''));break;}
      if(remaining.length<=limit){lines.push(remaining.join(''));break;}
      const boundary=remaining.slice(0,limit+1).lastIndexOf(' '),cut=boundary>0?boundary:limit;
      lines.push(remaining.slice(0,cut).join(''));remaining=remaining.slice(cut);while(remaining[0]===' ')remaining.shift();
    }
    return lines.length?lines:[''];
  }
  let mountNumber=0;
  function validate(config){
    if(!config||!Array.isArray(config.stages)||config.stages.length!==3||!['express','identify','share'].every(id=>config.stages.some(s=>s.id===id&&hasText(s.label)&&hasText(s.text))))throw new TypeError('The RDF view needs express, identify and share stages.');
    if(!Array.isArray(config.terms)||!config.terms.length||!config.terms.every(item=>item&&hasText(item.label)))throw new TypeError('RDF labels need separate term metadata.');
    const labels=new Set();for(const item of config.terms){const key=termKey(canonicalTerm(item.term));if(labels.has(key))throw new TypeError('Duplicate display metadata.');labels.add(key);}
    if(!Array.isArray(config.statements)||!config.statements.length||new Set(config.statements.map(s=>s.id)).size!==config.statements.length||!config.statements.every(s=>s&&['id','label','sentence'].every(key=>hasText(s[key]))))throw new TypeError('Sentence examples need unique ids and triples.');
    for(const item of config.statements)mergeGraphs({graphs:[{id:'sentence',triples:[item.triple]}]});
    if(!config.identity||!hasText(config.identity.text)||!Array.isArray(config.identity.cases)||!config.identity.cases.length||new Set(config.identity.cases.map(c=>c.id)).size!==config.identity.cases.length)throw new TypeError('Term comparisons need unique cases.');
    for(const item of config.identity.cases){if(!['id','label','explanation'].every(key=>hasText(item[key])))throw new TypeError('Term comparisons need explanatory text.');canonicalTerm(item.left);canonicalTerm(item.right);}
    if(!config.sharing||!['text','question','explanation'].every(key=>hasText(config.sharing[key]))||!Array.isArray(config.sharing.graphs)||config.sharing.graphs.length!==2||!config.sharing.graphs.every(g=>hasText(g.label)))throw new TypeError('Sharing needs two authored source graphs.');
    const whole=mergeGraphs({graphs:config.sharing.graphs});canonicalTerm(config.sharing.focus);if(whole.nodes.length>9)throw new RangeError('The picture is limited to nine displayed nodes.');
    if(!config.syntax||!hasText(config.syntax.text)||!sourced(config.syntax.source)||!Array.isArray(config.syntax.prefixes)||new Set(config.syntax.prefixes.map(p=>p.label)).size!==config.syntax.prefixes.length)throw new TypeError('Later syntax needs dated source and namespace metadata.');
    for(const p of config.syntax.prefixes)if(!p||!/^[A-Za-z][A-Za-z0-9_-]*$/u.test(p.label)||!iri(p.iri))throw new TypeError('A display prefix needs a name and namespace IRI.');
    if(!Array.isArray(config.evidence)||!config.evidence.length||new Set(config.evidence.map(e=>e.id)).size!==config.evidence.length||!config.evidence.every(e=>e&&['id','title','caption','scope'].every(key=>hasText(e[key]))&&/^[-A-Za-z0-9_.]+\.(?:gif|png|jpe?g)$/i.test(e.file)&&!e.file.includes('..')&&sourced(e.source)&&sourced(e.credit)))throw new TypeError('Original RDF diagrams need local assets and exact sources.');
    if(!hasText(config.scope)||!sourced(config.source))throw new TypeError('The RDF view needs source and scope.');
  }
  window.AtlasVisuals.register('rdf-knowledge-graph',{
    mount(host,config){
      validate(config);const instance=++mountNumber,listeners=[],root=node('div','rdf-knowledge-graph');
      const labels=new Map(config.terms.map(item=>[termKey(canonicalTerm(item.term)),item]));
      const pretty=term=>labels.get(termKey(term))?.label||(term.type==='literal'?term.value:term.value.split(/[/#]/u).at(-1)||term.value);
      const describe=term=>term.type==='iri'?'자원을 가리키는 IRI':term.language?'문자열 · @'+term.language:'값 · '+(term.datatype===XSD_STRING?'xsd:string':term.datatype.split(/[/#]/u).at(-1));
      const listen=(e,type,fn)=>{e.addEventListener(type,fn);listeners.push(()=>e.removeEventListener(type,fn));};
      const group=(label,cls)=>{const e=node('div',cls||'rdf-controls');e.setAttribute('role','group');e.setAttribute('aria-label',label);return e;};
      const button=(label,parent,fn)=>{const e=node('button','',label);e.type='button';listen(e,'click',fn);parent.append(e);return e;};
      const mark=(buttons,key,value)=>{for(const e of buttons){const active=e.dataset[key]===String(value);e.classList.toggle('active',active);e.setAttribute('aria-pressed',String(active));}};
      const range=(title,text,item)=>{const e=node('details','rdf-details');e.append(node('summary','',title),node('p','rdf-scope',text),link(item));return e;};
      let disposed=false,stage='express',statementId=config.statements[0].id,part='predicate',identityId=config.identity.cases[0].id,syntaxMode='prefixed',shareSelected=null,evidenceId=config.evidence[0].id,expanded=false,graphDraw=0;
      const shareListeners=[];
      const enabled=new Set(config.sharing.graphs.map(g=>g.id)),stageButtons=[],sentenceButtons=[],partButtons=[],identityButtons=[],syntaxButtons=[],evidenceButtons=[];
      const stageControls=group('진술·식별자·지식 공유의 세 보기','rdf-stage-controls'),stageText=node('p','rdf-stage-text');
      const expression=node('section','rdf-panel rdf-expression'),sentenceControls=group('관계로 적을 문장 선택'),sentence=node('p','rdf-sentence'),parts=group('주어·술어·목적어에서 강조할 부분','rdf-triple-parts'),expressionGraph=node('div','rdf-graph-view'),partMeaning=node('p','rdf-keypoint');
      expression.append(node('h4','','문장을, 함께 읽을 수 있는 관계로 적다'),sentenceControls,sentence,parts,expressionGraph,partMeaning);
      const identity=node('section','rdf-panel rdf-identity'),identityControls=group('RDF 항목을 비교할 기준 선택'),identityCards=node('div','rdf-identity-cards'),identityLeft=node('div','rdf-term-card'),identityRight=node('div','rdf-term-card'),identityResult=node('div','rdf-identity-result'),identityLabel=node('strong'),identityExplanation=node('p');identityResult.append(identityLabel,identityExplanation);identityCards.append(identityLeft,identityRight);identity.append(node('h4','','보이는 이름과, 가리키는 항목을 구분하다'),node('p','rdf-prose',config.identity.text),identityControls,identityCards,identityResult);
      const sharing=node('section','rdf-panel rdf-sharing'),sourceControls=group('함께 볼 두 자료 선택','rdf-source-controls'),sourceInputs=new Map(),shareSummary=node('div','rdf-share-summary'),shareGraph=node('div','rdf-graph-view'),shareTriples=group('합친 그래프에서 살펴볼 진술 선택','rdf-share-triples'),sourceTrace=node('p','rdf-source-trace');
      sharing.append(node('h4','',config.sharing.question),node('p','rdf-prose',config.sharing.text),sourceControls,shareSummary,shareGraph,shareTriples,sourceTrace,node('p','rdf-keypoint',config.sharing.explanation));
      const syntax=node('details','rdf-details rdf-syntax');syntax.append(node('summary','','후대 표기로 같은 관계 읽기 · RDF1.1 / Turtle · 2014'));const syntaxControls=group('같은 RDF 그래프의 두 표기'),syntaxCode=node('pre','rdf-code');syntax.append(node('p','rdf-prose',config.syntax.text),syntaxControls,syntaxCode,link(config.syntax.source));
      const evidence=node('details','rdf-details rdf-evidence');evidence.append(node('summary','','1999년 공식 표준의 그림과 연결하기'));const evidenceControls=group('공식 RDF 원그림 선택'),evidenceTitle=node('h4'),evidenceCaption=node('p','rdf-prose'),evidenceScope=node('p','rdf-scope'),evidenceSource=node('div'),evidenceCredit=node('p','rdf-credit'),zoom=node('button','rdf-zoom','원문 그림 확대'),pane=node('div','rdf-evidence-viewport'),image=node('img');zoom.type='button';image.decoding='async';image.loading='lazy';pane.append(image);evidence.append(evidenceControls,evidenceTitle,evidenceCaption,zoom,node('p','rdf-note','확대하면 그림 안에서 가로로 움직이며 원문을 읽을 수 있습니다.'),pane,evidenceScope,evidenceSource,evidenceCredit);

      function termCard(parent,term,heading){parent.replaceChildren(node('span','rdf-eyebrow',heading),node('strong','',pretty(term)),node('span','rdf-term-type',describe(term)));const code=node('code','rdf-term-code',term.type==='iri'?'<'+term.value+'>':JSON.stringify(term.value)+(term.language?'@'+term.language:'^^<'+term.datatype+'>'));parent.append(code);parent.dataset.termType=term.type;}
      function makeGraph(model,selectedKey,focusKey,highlightPart){
        const box=node('div','rdf-graph-picture');if(!model.nodes.length){box.append(node('p','rdf-empty','자료를 선택하면 그 자료에 적힌 관계를 표시합니다.'));return box;}
        const levels=new Map(),first=focusKey&&model.nodes.some(n=>n.key===focusKey)?focusKey:model.nodes[0].key;levels.set(first,0);
        for(let pass=0;pass<model.nodes.length;pass++)for(const edge of model.edges){if(levels.has(edge.subjectKey)&&!levels.has(edge.objectKey))levels.set(edge.objectKey,levels.get(edge.subjectKey)+1);else if(levels.has(edge.objectKey)&&!levels.has(edge.subjectKey))levels.set(edge.subjectKey,levels.get(edge.objectKey)-1);}
        for(const item of model.nodes)if(!levels.has(item.key))levels.set(item.key,Math.max(...levels.values())+1);
        const columns=[...new Set(levels.values())].sort((a,b)=>a-b),maxRows=Math.max(...columns.map(level=>model.nodes.filter(n=>levels.get(n.key)===level).length)),drawId=++graphDraw;
        const selected=model.triples.find(t=>t.key===selectedKey)||null;
        for(const vertical of [false,true]){
          const width=vertical?320:720,height=vertical?Math.max(260,columns.length*155):Math.max(310,maxRows*125+70),positions=new Map();
          for(const [column,level] of columns.entries()){
            const items=model.nodes.filter(n=>levels.get(n.key)===level);
            items.forEach((item,index)=>positions.set(item.key,vertical?{x:(index+1)*width/(items.length+1),y:75+column*155}:{x:columns.length===1?width/2:80+column*(width-160)/(columns.length-1),y:(index+1)*height/(items.length+1)}));
          }
          const graph=svgNode('svg',{viewBox:'0 0 '+width+' '+height,class:vertical?'rdf-network rdf-network-mobile':'rdf-network rdf-network-desktop',role:'img','aria-label':'명시된 '+model.triples.length+'개 관계의 방향 그래프'}),defs=svgNode('defs'),markerId='rdf-arrow-'+instance+'-'+drawId+'-'+(vertical?'v':'h'),marker=svgNode('marker',{id:markerId,viewBox:'0 0 10 10',refX:9,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});marker.append(svgNode('path',{d:'M 0 0 L 10 5 L 0 10 z',class:'rdf-arrow-head'}));defs.append(marker);graph.append(defs);
          for(const edge of model.edges){
            const a=positions.get(edge.subjectKey),b=positions.get(edge.objectKey),dx=b.x-a.x,dy=b.y-a.y;let x1,y1,x2,y2;
            if(!dx&&!dy){x1=a.x-35;y1=a.y-25;x2=a.x+35;y2=a.y-25;}else{const scale=1/Math.sqrt((dx*dx)/(55*55)+(dy*dy)/(30*30));x1=a.x+dx*scale;y1=a.y+dy*scale;x2=b.x-dx*scale;y2=b.y-dy*scale;}
            const active=edge.key===selectedKey,edgeGroup=svgNode('g',{class:'rdf-network-edge','data-selected':String(active)}),path=svgNode('path',{d:!dx&&!dy?'M '+x1+' '+y1+' C '+(a.x-80)+' '+(a.y-100)+' '+(a.x+80)+' '+(a.y-100)+' '+x2+' '+y2:'M '+x1+' '+y1+' L '+x2+' '+y2,'marker-end':'url(#'+markerId+')'});edgeGroup.append(path);
            const tx=(x1+x2)/2,ty=(y1+y2)/2-7,predicateLabel=pretty(edge.predicate);edgeGroup.append(svgNode('rect',{x:tx-Math.min(75,predicateLabel.length*6+8),y:ty-12,width:Math.min(150,predicateLabel.length*12+16),height:24,rx:4}),svgNode('text',{x:tx,y:ty+5,'text-anchor':'middle'},predicateLabel));graph.append(edgeGroup);
          }
          for(const item of model.nodes){
            const position=positions.get(item.key),subjectActive=selected&&item.key===termKey(selected.subject),objectActive=selected&&item.key===termKey(selected.object),highlight=highlightPart==='subject'?subjectActive:highlightPart==='object'?objectActive:false,shape=svgNode('g',{class:'rdf-network-node','data-term-type':item.term.type,'data-highlight':String(Boolean(highlight))});
            shape.append(svgNode(item.term.type==='literal'?'rect':'ellipse',item.term.type==='literal'?{x:position.x-55,y:position.y-31,width:110,height:62,rx:5}:{cx:position.x,cy:position.y,rx:55,ry:31}));
            const label=item.term.type==='literal'?'“'+item.term.value+'”':pretty(item.term),lines=wrapGraphLabel(label,vertical?6:7),text=svgNode('text',{x:position.x,y:position.y-(lines.length===2?(vertical?10:7):0),'text-anchor':'middle'});
            lines.forEach((line,index)=>text.append(svgNode('tspan',{x:position.x,dy:index===0?0:(vertical?19:16)},line)));shape.append(text,svgNode('text',{x:position.x,y:position.y+(vertical?26:23),'text-anchor':'middle',class:'rdf-network-kind'},item.term.type==='literal'?'값':'자원'));graph.append(shape);
          }
          box.append(graph);
        }
        box.append(node('p','rdf-graph-legend','둥근 노드 · 자원 / 네모 노드 · 값 / 화살표 · 술어의 방향'));return box;
      }
      function currentModel(){if(stage==='share')return mergeGraphs({graphs:config.sharing.graphs.filter(g=>enabled.has(g.id))});const item=config.statements.find(s=>s.id===statementId);return mergeGraphs({graphs:[{id:'statement',triples:[item.triple]}]});}
      function formatIRI(value){
        if(syntaxMode==='prefixed')for(const prefix of config.syntax.prefixes){if(value.startsWith(prefix.iri)){const local=value.slice(prefix.iri.length);if(/^[A-Za-z_][A-Za-z0-9_-]*$/u.test(local))return prefix.label+':'+local;}}
        return'<'+value+'>';
      }
      function formatTerm(term){if(term.type==='iri')return formatIRI(term.value);const lexical=JSON.stringify(term.value);return term.language?lexical+'@'+term.language:term.datatype===XSD_STRING?lexical:lexical+'^^'+formatIRI(term.datatype);}
      function updateSyntax(){
        const model=currentModel(),prefixes=syntaxMode==='prefixed'?config.syntax.prefixes.map(p=>'@prefix '+p.label+': <'+p.iri+'> .').join('\n')+'\n\n':'';
        syntaxCode.textContent=prefixes+model.triples.map(t=>[t.subject,t.predicate,t.object].map(formatTerm).join(' ')+' .').join('\n');mark(syntaxButtons,'syntax',syntaxMode);
      }
      function updateExpression(){
        if(disposed)return;const item=config.statements.find(s=>s.id===statementId),model=mergeGraphs({graphs:[{id:'statement',triples:[item.triple]}]}),triple=model.triples[0];root.dataset.statement=statementId;root.dataset.part=part;mark(sentenceButtons,'statement',statementId);mark(partButtons,'part',part);sentence.textContent=item.sentence;
        for(const e of partButtons){const key=e.dataset.part,term=triple[key];e.replaceChildren(node('span','rdf-eyebrow',{subject:'주어 · 누구에 대해',predicate:'술어 · 어떤 관계로',object:'목적어 · 무엇을 말하나'}[key]),node('strong','',pretty(term)),node('span','rdf-term-type',key==='predicate'?'관계를 가리키는 IRI':describe(term)));}
        const meanings={subject:'어느 대상에 대한 진술인지 주어로 가리킵니다.',predicate:'무슨 관계인지 술어로 명시합니다. 화살표는 주어에서 목적어로 향합니다.',object:triple.object.type==='literal'?'목적어를 값으로 적었습니다. 이 문자열은 같은 글자를 가진 자원 식별자와는 다른 항목입니다.':'목적어가 다른 자원을 가리킵니다. 그 자원에 대한 다른 진술도 이어 붙일 수 있습니다.'};partMeaning.textContent=meanings[part];expressionGraph.replaceChildren(makeGraph(model,triple.key,termKey(triple.subject),part));updateSyntax();
      }
      function updateIdentity(){
        if(disposed)return;const item=config.identity.cases.find(c=>c.id===identityId),left=canonicalTerm(item.left),right=canonicalTerm(item.right),equal=termKey(left)===termKey(right);root.dataset.identity=identityId;root.dataset.termEqual=String(equal);mark(identityButtons,'identity',identityId);termCard(identityLeft,left,'첫 번째 항목');termCard(identityRight,right,'두 번째 항목');identityLabel.textContent=equal?'같은 RDF 항목으로 비교됩니다':'서로 다른 RDF 항목으로 남습니다';identityExplanation.textContent=item.explanation;identityResult.dataset.equal=String(equal);
      }
      function updateSharing(){
        if(disposed)return;const model=mergeGraphs({graphs:config.sharing.graphs.filter(g=>enabled.has(g.id))});if(!model.triples.some(t=>t.key===shareSelected))shareSelected=model.triples[0]?.key||null;root.dataset.enabledGraphs=[...enabled].sort(compare).join(',');root.dataset.tripleCount=String(model.triples.length);root.dataset.duplicateCount=String(model.duplicateCount);for(const [id,input] of sourceInputs)input.checked=enabled.has(id);
        shareSummary.replaceChildren(node('strong','',model.inputTripleCount+'개 기록 → '+model.triples.length+'개 트리플'),node('span','',model.duplicateCount?'같은 진술 '+model.duplicateCount+'개는 그래프에 한 번 포함합니다.':'현재 자료에 있는 서로 다른 진술입니다.'));
        shareGraph.replaceChildren(makeGraph(model,shareSelected,termKey(canonicalTerm(config.sharing.focus)),'predicate'));for(const remove of shareListeners)remove();shareListeners.length=0;shareTriples.replaceChildren();
        model.triples.forEach((t,index)=>{const e=node('button','',pretty(t.subject)+' → '+pretty(t.predicate)+' → '+pretty(t.object)),select=()=>{shareSelected=t.key;updateSharing();};e.type='button';e.addEventListener('click',select);shareListeners.push(()=>e.removeEventListener('click',select));shareTriples.append(e);e.dataset.tripleIndex=String(index);e.classList.toggle('active',t.key===shareSelected);e.setAttribute('aria-pressed',String(t.key===shareSelected));});
        const selected=model.triples.find(t=>t.key===shareSelected);sourceTrace.textContent=selected?'선택한 진술의 자료: '+selected.sources.map(id=>config.sharing.graphs.find(g=>g.id===id).label).join(' + ')+'. 이 표시는 자료를 추적하기 위해 화면에 붙인 메타정보입니다.':'함께 볼 자료를 하나 이상 선택하세요.';updateSyntax();
      }
      function updateStage(){
        if(disposed)return;root.dataset.stage=stage;mark(stageButtons,'stage',stage);stageText.textContent=config.stages.find(s=>s.id===stage).text;expression.hidden=stage!=='express';identity.hidden=stage!=='identify';sharing.hidden=stage!=='share';syntax.hidden=stage==='identify';updateSyntax();
      }
      function updateEvidence(){
        if(disposed)return;const item=config.evidence.find(e=>e.id===evidenceId);root.dataset.evidence=evidenceId;mark(evidenceButtons,'evidence',evidenceId);evidenceTitle.textContent=item.title;evidenceCaption.textContent=item.caption;evidenceScope.textContent=item.scope;image.src=asset(item.file);image.alt=item.caption;evidenceSource.replaceChildren(link(item.source));evidenceCredit.replaceChildren(link(item.credit),document.createTextNode(' · '+(item.credit.note||'')));pane.dataset.expanded=String(expanded);pane.scrollLeft=0;pane.scrollTop=0;zoom.textContent=expanded?'원문 그림 전체 보기':'원문 그림 확대';zoom.setAttribute('aria-pressed',String(expanded));if(expanded){pane.tabIndex=0;pane.setAttribute('role','region');pane.setAttribute('aria-label','확대한 RDF 공식 원그림');}else{pane.removeAttribute('tabindex');pane.removeAttribute('role');pane.removeAttribute('aria-label');}
      }
      for(const item of config.stages){const e=button(item.label,stageControls,()=>{stage=item.id;updateStage();});e.dataset.stage=item.id;stageButtons.push(e);}
      for(const item of config.statements){const e=button(item.label,sentenceControls,()=>{statementId=item.id;updateExpression();});e.dataset.statement=item.id;sentenceButtons.push(e);}
      for(const key of ['subject','predicate','object']){const e=button(key,parts,()=>{part=key;updateExpression();});e.dataset.part=key;partButtons.push(e);}
      for(const item of config.identity.cases){const e=button(item.label,identityControls,()=>{identityId=item.id;updateIdentity();});e.dataset.identity=item.id;identityButtons.push(e);}
      for(const graph of config.sharing.graphs){const wrap=node('label','rdf-source-option'),input=node('input');input.type='checkbox';input.checked=true;input.dataset.graph=graph.id;wrap.append(input,node('span','',graph.label));sourceControls.append(wrap);sourceInputs.set(graph.id,input);listen(input,'change',()=>{if(input.checked)enabled.add(graph.id);else enabled.delete(graph.id);updateSharing();});}
      for(const [id,label] of [['prefixed','접두어로 적기 · Turtle'],['full','전체 IRI로 적기']]){const e=button(label,syntaxControls,()=>{syntaxMode=id;updateSyntax();});e.dataset.syntax=id;syntaxButtons.push(e);}
      for(const item of config.evidence){const e=button(item.title,evidenceControls,()=>{evidenceId=item.id;expanded=false;updateEvidence();});e.dataset.evidence=item.id;evidenceButtons.push(e);}
      listen(zoom,'click',()=>{expanded=!expanded;updateEvidence();});root.append(stageControls,stageText,expression,identity,sharing,syntax,evidence,range('이 보기의 범위와 근거',config.scope,config.source));updateExpression();updateIdentity();updateSharing();updateEvidence();updateStage();host.append(root);
      return()=>{if(disposed)return;disposed=true;for(const remove of [...listeners,...shareListeners])remove();shareListeners.length=0;root.remove();};
    }
  });
})();
