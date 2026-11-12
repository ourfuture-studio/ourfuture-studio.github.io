/* Discrete, synchronous calculations under selected McCulloch-Pitts assumptions.
 * This is a new small calculation, not a biological simulation or learned net.
 * Excitatory contacts are counted; one active inhibitory input vetoes firing.
 * Every internal edge takes one model-time unit. Updates use prior states only.
 */
(function(){
  'use strict';
  const clone=value=>JSON.parse(JSON.stringify(value));
  const binary=value=>value===0||value===1;
  const integer=value=>Number.isInteger(value);
  const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
  const inputIds=freeze(['A','B','I']);
  const presets=freeze([
    {id:'paper-relay',label:'한 뉴런의 활동을 전달',origin:'paper-figure-1a',figure:'1a',note:'Fig.1a: A의 흥분 접점 두 개, 필요한 최소 접점 수2. A=N₁, C=N₂.',aliases:{A:'N₁',C:'N₂'},usedInputs:['A']},
    {id:'paper-or',label:'하나라도 활동할 때',origin:'paper-figure-1b',figure:'1b',note:'Fig.1b: A와 B가 각각 흥분 접점 두 개로 연결되고 최소 접점 수는2. A=N₁, B=N₂, C=N₃.',aliases:{A:'N₁',B:'N₂',C:'N₃'},usedInputs:['A','B']},
    {id:'paper-and',label:'둘 다 활동할 때',origin:'paper-figure-1c',figure:'1c',note:'Fig.1c: A와 B가 각각 흥분 접점 하나로 연결되고 최소 접점 수는2. A=N₁, B=N₂, C=N₃.',aliases:{A:'N₁',B:'N₂',C:'N₃'},usedInputs:['A','B']},
    {id:'paper-inhibition',label:'흥분을 억제 입력이 막는다',origin:'paper-figure-1d',figure:'1d',note:'Fig.1d: A의 흥분 접점 두 개와 I의 억제 접점. A=N₁, I=N₂, C=N₃. B는 연결되지 않는다.',aliases:{A:'N₁',I:'N₂',C:'N₃'},usedInputs:['A','I']},
    {id:'chain',label:'두 연결을 차례로 지나기',origin:'authored-example',note:'A→R→C의 두 단계 전달을 계산하는 별도 연결.'},
    {id:'delayed-coincidence',label:'서로 다른 길이의 경로',origin:'authored-example',note:'A→R→C와 B→C의 경로 길이가 다른 별도 연결.'}
  ]);
  const scenarios=freeze([
    {id:'simultaneous',label:'A와 B가 같은 시점에 활동'},
    {id:'shifted',label:'B가 한 시점 늦게 활동'},
    {id:'veto',label:'A·B·I가 함께 활동'},
    {id:'late-inhibitor',label:'억제 입력이 한 시점 늦게 활동'},
    {id:'delayed-match',label:'두 단계 경로에서 B가 한 시점 늦게 활동'},
    {id:'continuous',label:'A·B가 두 시점 이어 활동'},
    {id:'empty',label:'모든 입력이 쉬는 상태'}
  ]);
  function validateNetwork(network){
    if(!network||network.delay!==1||!Array.isArray(network.inputs)||!network.inputs.length||!network.inputs.every(id=>typeof id==='string'&&/^[A-Za-z][A-Za-z0-9_-]*$/.test(id))||new Set(network.inputs).size!==network.inputs.length||!Array.isArray(network.nodes)||!network.nodes.length)throw new TypeError('A network needs named inputs, internal units and one common delay unit.');
    const ids=network.nodes.map(node=>node.id),known=new Set([...network.inputs,...ids]);
    if(ids.some(id=>typeof id!=='string'||!/^[A-Za-z][A-Za-z0-9_-]*$/.test(id)||network.inputs.includes(id))||new Set(ids).size!==ids.length||!ids.includes(network.outputId))throw new TypeError('Input and internal unit identities must be unique, with a known output.');
    for(const node of network.nodes){
      if(!integer(node.threshold)||node.threshold<1||node.threshold>64||!Array.isArray(node.excitatory)||!Array.isArray(node.inhibitory))throw new TypeError('Each unit needs a positive, fixed integer threshold and explicit contacts.');
      if(node.excitatory.some(edge=>!edge||!known.has(edge.from)||!integer(edge.synapses)||edge.synapses<1||edge.synapses>64)||new Set(node.excitatory.map(edge=>edge.from)).size!==node.excitatory.length||node.inhibitory.some(id=>!known.has(id))||new Set(node.inhibitory).size!==node.inhibitory.length)throw new TypeError('Contacts need known sources, positive integer multiplicity and no duplicates.');
      if(node.excitatory.some(edge=>node.inhibitory.includes(edge.from)))throw new TypeError('A source cannot be excitatory and inhibitory at the same unit.');
    }
    return network;
  }
  function createNetwork(id='paper-and',options={}){
    const descriptor=presets.find(row=>row.id===id);if(!descriptor)throw new RangeError('Unknown small-network preset.');
    const contact=(from,synapses=1)=>({from,synapses});
    let nodes;
    if(id==='chain')nodes=[{id:'R',label:'중간 뉴런',threshold:2,excitatory:[contact('A',2)],inhibitory:[]},{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('R',2)],inhibitory:[]}];
    else if(id==='delayed-coincidence')nodes=[{id:'R',label:'중간 뉴런',threshold:2,excitatory:[contact('A',2)],inhibitory:[]},{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('R'),contact('B')],inhibitory:[]}];
    else if(id==='paper-relay')nodes=[{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('A',2)],inhibitory:[]}];
    else if(id==='paper-or')nodes=[{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('A',2),contact('B',2)],inhibitory:[]}];
    else if(id==='paper-inhibition')nodes=[{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('A',2)],inhibitory:['I']}];
    else nodes=[{id:'C',label:'출력 뉴런',threshold:2,excitatory:[contact('A'),contact('B')],inhibitory:[]}];
    const originalThreshold=nodes.find(node=>node.id==='C').threshold;
    if(options.threshold!==undefined){if(!integer(options.threshold)||options.threshold<1||options.threshold>64)throw new RangeError('Threshold must be a positive integer.');nodes.find(node=>node.id==='C').threshold=options.threshold;}
    const customized=options.threshold!==undefined&&options.threshold!==originalThreshold;
    const network={id:descriptor.id,origin:customized?'authored-threshold-setting':descriptor.origin,figure:descriptor.figure||null,label:descriptor.label,note:descriptor.note,aliases:clone(descriptor.aliases||{}),usedInputs:descriptor.usedInputs?.slice()||(id==='chain'?['A']:['A','B']),inputs:inputIds.slice(),nodes,outputId:'C',delay:1,customized,thresholdMeaning:'minimum simultaneous active excitatory contacts k; count >= k'};
    validateNetwork(network);return network;
  }
  function makeTimeline(id='simultaneous',length=8){
    if(!scenarios.some(row=>row.id===id))throw new RangeError('Unknown input sequence.');
    if(!integer(length)||length<3||length>64)throw new RangeError('Use3-64 input times.');
    const frames=Array.from({length},()=>({A:0,B:0,I:0}));
    const pulse=(t,...ids)=>ids.forEach(name=>{frames[t][name]=1;});
    if(id==='simultaneous')pulse(1,'A','B');
    if(id==='shifted'||id==='delayed-match'){pulse(1,'A');pulse(2,'B');}
    if(id==='veto')pulse(1,'A','B','I');
    if(id==='late-inhibitor'){pulse(1,'A','B');pulse(2,'I');}
    if(id==='continuous'){pulse(1,'A','B');pulse(2,'A','B');}
    return frames;
  }
  function evaluateNeuron(node,previous){
    if(!node||!integer(node.threshold)||node.threshold<1||node.threshold>64||!Array.isArray(node.excitatory)||!Array.isArray(node.inhibitory)||!previous||typeof previous!=='object')throw new TypeError('A fixed unit and a preceding binary state are required.');
    if(new Set(node.excitatory.map(edge=>edge?.from)).size!==node.excitatory.length||new Set(node.inhibitory).size!==node.inhibitory.length||node.excitatory.some(edge=>node.inhibitory.includes(edge?.from)))throw new TypeError('Each source needs one explicit role at the receiving unit.');
    const edges=node.excitatory.map(edge=>{if(!edge||typeof edge.from!=='string'||!integer(edge.synapses)||edge.synapses<1||edge.synapses>64||!binary(previous[edge.from]))throw new TypeError('Excitatory sources need finite binary activity and integer contacts.');return{from:edge.from,active:previous[edge.from],synapses:edge.synapses,activeSynapses:previous[edge.from]*edge.synapses};});
    const inhibitory=node.inhibitory.map(from=>{if(!binary(previous[from]))throw new TypeError('Inhibitory activity must be0 or1.');return{from,active:previous[from]};});
    const excitatoryCount=edges.reduce((sum,edge)=>sum+edge.activeSynapses,0),inhibitoryActive=inhibitory.some(edge=>edge.active===1),thresholdReached=excitatoryCount>=node.threshold,out=Number(thresholdReached&&!inhibitoryActive);
    return{excitatory:edges,inhibitory,excitatoryCount,inhibitoryActive,threshold:node.threshold,thresholdReached,out,reason:inhibitoryActive?'inhibited':thresholdReached?'fired':'below-threshold',rule:'one-active-inhibitory-input-vetoes'};
  }
  function validateTimeline(network,timeline){
    if(!Array.isArray(timeline)||!timeline.length||timeline.length>64||!timeline.every(frame=>frame&&typeof frame==='object'&&Object.keys(frame).every(key=>network.inputs.includes(key))&&network.inputs.every(key=>binary(frame[key]))))throw new TypeError('Supply one complete binary input row per model time.');
  }
  function simulate(network,timeline,options={}){
    validateNetwork(network);validateTimeline(network,timeline);
    const steps=options.steps===undefined?timeline.length:options.steps;
    if(!integer(steps)||steps<0||steps>128)throw new RangeError('Use0-128 model-time updates.');
    const nodeIds=network.nodes.map(node=>node.id),initial=options.initialStates||{};
    if(Object.keys(initial).some(key=>!nodeIds.includes(key))||Object.values(initial).some(value=>!binary(value)))throw new TypeError('Initial internal activities must be known binary states.');
    const inputsAt=t=>Object.fromEntries(network.inputs.map(id=>[id,timeline[t]?.[id]||0]));
    let states=Object.fromEntries(nodeIds.map(id=>[id,initial[id]||0]));
    const firstInputs=inputsAt(0),firstNodes=Object.fromEntries(network.nodes.map(node=>[node.id,{out:states[node.id],reason:'initial-state',sourceTime:null,threshold:node.threshold,excitatoryCount:null,inhibitoryActive:null,thresholdReached:null,excitatory:[],inhibitory:[]}]));
    const frames=[{t:0,inputs:firstInputs,states:{...states},combined:{...firstInputs,...states},nodes:firstNodes,output:states[network.outputId],sourceTime:null}];
    for(let t=1;t<=steps;t++){
      const previous=frames[t-1].combined,nodes={};
      // All units read the same preceding frame. Array order cannot remove delay.
      for(const node of network.nodes)nodes[node.id]={...evaluateNeuron(node,previous),sourceTime:t-1,previousInput:Object.fromEntries([...new Set([...node.excitatory.map(edge=>edge.from),...node.inhibitory])].map(id=>[id,previous[id]]))};
      states=Object.fromEntries(nodeIds.map(id=>[id,nodes[id].out]));const inputs=inputsAt(t);
      frames.push({t,inputs,states:{...states},combined:{...inputs,...states},nodes,output:states[network.outputId],sourceTime:t-1});
    }
    return{network:clone(network),timeline:clone(timeline),frames,nodeIds,outputId:network.outputId,delayUnit:1,steps,timeUnit:'one-common-synaptic-delay; not milliseconds',scope:'New finite calculation under selected fixed-structure assumptions; no weights are learned.'};
  }
  function truthTable(network){
    validateNetwork(network);if(network.nodes.length!==1||network.inputs.length>8)throw new TypeError('A direct one-step truth table requires one internal unit and up to8 external inputs. Use the temporal trace for multiple units.');
    const node=network.nodes[0];return Array.from({length:2**network.inputs.length},(_,index)=>{const inputs=Object.fromEntries(network.inputs.map((id,j)=>[id,(index>>(network.inputs.length-1-j))&1]));return{inputs,...evaluateNeuron(node,inputs)};});
  }
  function table(result){
    if(!result?.frames||!Array.isArray(result.nodeIds))throw new TypeError('A simulation result is required.');
    return result.frames.map(frame=>({t:frame.t,...frame.inputs,...frame.states,sourceTime:frame.sourceTime}));
  }
  window.AtlasMCPModel=freeze({inputIds,presets,scenarios,createNetwork,makeTimeline,evaluateNeuron,simulate,truthTable,table});
})();
