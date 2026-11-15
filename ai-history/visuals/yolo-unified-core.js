/* Inspect an authored YOLOv1-shaped output. No CNN or optimizer is executed. */
(function(){
 'use strict';
 const clone=v=>JSON.parse(JSON.stringify(v)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),freeze=v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v)){Object.values(v).forEach(freeze);Object.freeze(v);}return v;};
 const source='https://pjreddie.com/static/papers/yolo_1.pdf';
 const classes=[['aeroplane','비행기'],['bicycle','자전거'],['bird','새'],['boat','배'],['bottle','병'],['bus','버스'],['car','자동차'],['cat','고양이'],['chair','의자'],['cow','소'],['diningtable','식탁'],['dog','개'],['horse','말'],['motorbike','오토바이'],['person','사람'],['pottedplant','화분'],['sheep','양'],['sofa','소파'],['train','기차'],['tvmonitor','모니터']].map(([id,label],index)=>({id,label,index}));
 const initial={scoreThreshold:0.25,nmsThreshold:0.5,focusConfidence:0.9,focusClass:'dog',useNms:true,secondCenter:'separate'};
 const stages=[['question','무엇이 어디에 있을까?'],['grid','위치와 종류를 함께 적을 출력 구조'],['raw','직접 정한 예측값을 읽다'],['score','종류와 박스의 점수를 결합하다'],['threshold','점수 조건을 적용하다'],['nms','같은 종류의 겹친 예측을 비교하다'],['audit','정답을 아는 학습 조건과 구분하다'],['output','남은 예측과 한계를 읽다']].map(([kind,label],index)=>({index,kind,label}));
 const architecture=[
  {id:'input',label:'영상 전체',shape:[448,448,3],convolutions:0},
  {id:'early',label:'7×7 / 3×3 합성곱과 풀링',shape:[56,56,192],convolutions:2},
  {id:'mix',label:'1×1 축소와 3×3 특징',shape:[28,28,512],convolutions:4},
  {id:'repeat',label:'1×1·3×3 반복과 풀링',shape:[14,14,1024],convolutions:10},
  {id:'deep',label:'깊은 특징과 공간 축소',shape:[7,7,1024],convolutions:6},
  {id:'late',label:'3×3 합성곱 두 층',shape:[7,7,1024],convolutions:2},
  {id:'fc',label:'완전연결 두 층',shape:[4096,1470],convolutions:0},
  {id:'output',label:'7×7×(2×5+20)',shape:[7,7,30],convolutions:0}
 ];
 const example=freeze({initial,classes,stages,architecture,grid:7,boxesPerCell:2,classCount:20,outputShape:[7,7,30],boxCount:98,predictionValues:1470,
  scenes:[{id:'dog',label:'직접 그린 개',x:0.34,y:0.54,w:0.34,h:0.38},{id:'person',label:'직접 그린 사람',x:0.78,y:0.4,w:0.13,h:0.48}],
  scenarios:[
   {id:'unified',label:'종류와 위치를 함께',input:initial},
   {id:'strict',label:'높은 점수만 남기면',input:{...initial,scoreThreshold:0.7}},
   {id:'duplicates',label:'겹친 예측을 그대로 두면',input:{...initial,useNms:false}},
   {id:'low-confidence',label:'A의 예측 신뢰도만 낮추면',input:{...initial,focusConfidence:0.3}},
   {id:'cat',label:'같은 출력에서 고양이 점수를 보면',input:{...initial,focusClass:'cat'}},
   {id:'same-cell',label:'두 종류의 정답 중심이 한 칸이면',input:{...initial,secondCenter:'same-cell'}}
  ],
  source:{paper:source,representation:source+'#page=2',architecture:source+'#page=3',training:source+'#page=4',inference:source+'#page=4'},
  boundary:'직접 정한 49칸·98박스·20종류 출력값을 읽고 산술 계산한다. 양수 신뢰도는 세 칸의 여섯 박스에만 넣었다. 영상에서 특징을 추출하거나 신경망·연결값·학습·탐지 성능을 실행하지 않는다. 추론의 예측 신뢰도와, 정답을 아는 별도 학습 진단의 IoU를 연결해 갱신하지 않는다.',
  choices:{scoreThreshold:[0.1,0.25,0.5,0.7],nmsThreshold:[0.3,0.5,0.8],focusConfidence:[0.3,0.6,0.9],focusClass:['dog','cat','person'],secondCenter:['separate','same-cell']}
 });
 function validate(value){
  if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).sort().join('|')!==Object.keys(initial).sort().join('|'))throw TypeError('Provide the six explicit authored settings.');
  const v=clone(value);for(const key of ['scoreThreshold','nmsThreshold','focusConfidence','focusClass','secondCenter'])if(!example.choices[key].includes(v[key]))throw TypeError('Use an offered finite setting: '+key);if(typeof v.useNms!=='boolean')throw TypeError('Use an explicit NMS setting.');return v;
 }
 function box(id,row,col,predictor,x,y,w,h,confidence){return{id,cellId:'r'+row+'c'+col,row,col,predictor,label:predictor===0?'A':'B',x,y,w,h,tx:x*7-col,ty:y*7-row,confidence};}
 function makeCells(input){
  const cells=[];for(let row=0;row<7;row++)for(let col=0;col<7;col++){
   const id='r'+row+'c'+col,probabilities=classes.map(()=>0),boxes=[0,1].map(j=>box(id+'-'+(j===0?'a':'b'),row,col,j,(col+0.5)/7,(row+0.5)/7,0.1,0.1,0));
   const put=(kind,value)=>{probabilities[classes.find(c=>c.id===kind).index]=value;};
   if(id==='r3c2'){put('dog',0.7);put('cat',0.2);put('person',0.1);boxes[0]=box(id+'-a',row,col,0,0.35,0.55,0.35,0.4,input.focusConfidence);boxes[1]=box(id+'-b',row,col,1,0.37,0.55,0.28,0.36,0.7);}
   if(id==='r3c3'){put('dog',0.8);put('cat',0.1);put('person',0.1);boxes[0]=box(id+'-a',row,col,0,0.44,0.55,0.35,0.4,0.7);boxes[1]=box(id+'-b',row,col,1,0.45,0.55,0.32,0.38,0.35);}
   if(id==='r2c5'){put('person',0.9);put('dog',0.05);put('cat',0.05);boxes[0]=box(id+'-a',row,col,0,0.78,0.4,0.13,0.48,0.85);boxes[1]=box(id+'-b',row,col,1,0.79,0.4,0.12,0.46,0.65);}
   cells.push({id,row,col,probabilities,boxes});
  }return cells;
 }
 function iou(a,b){const left=Math.max(a.x-a.w/2,b.x-b.w/2),right=Math.min(a.x+a.w/2,b.x+b.w/2),top=Math.max(a.y-a.h/2,b.y-b.h/2),bottom=Math.min(a.y+a.h/2,b.y+b.h/2),intersection=Math.max(0,right-left)*Math.max(0,bottom-top),union=a.w*a.h+b.w*b.h-intersection;return union>0?intersection/union:0;}
 function trainingAudit(cells,input){
  const targets=clone(example.scenes);if(input.secondCenter==='same-cell'){targets[1].x=0.4;targets[1].y=0.56;}
  for(const t of targets){t.row=Math.floor(t.y*7);t.col=Math.floor(t.x*7);t.cellId='r'+t.row+'c'+t.col;}
  const crowdedCell=targets[0].cellId===targets[1].cellId?targets[0].cellId:null;
  const rows=targets.map(target=>{const cell=cells.find(c=>c.id===target.cellId),comparisons=cell.boxes.map(b=>({boxId:b.id,predictor:b.predictor,iou:iou(b,target)}));comparisons.sort((a,b)=>b.iou-a.iou||a.predictor-b.predictor);const responsible=crowdedCell===target.cellId?null:comparisons[0].boxId,chosen=cell.boxes.find(b=>b.id===responsible);let loss=null;
   if(chosen){const tx=target.x*7-target.col,ty=target.y*7-target.row,xy=5*((chosen.tx-tx)**2+(chosen.ty-ty)**2),size=5*((Math.sqrt(chosen.w)-Math.sqrt(target.w))**2+(Math.sqrt(chosen.h)-Math.sqrt(target.h))**2),confidence=(chosen.confidence-iou(chosen,target))**2,classification=classes.reduce((sum,c)=>sum+(cell.probabilities[c.index]-(c.id===target.id?1:0))**2,0);loss={xy,size,confidence,classification,selectedTerms:xy+size+confidence+classification};}
   return{target,comparisons,responsible,loss,status:responsible?'one-target-in-cell':'shared-class-target-conflict'};
  });return{targets,crowdedCell,rows,status:crowdedCell?'crowded-cell':'separate-cells',lambdaCoord:5,lambdaNoObject:0.5,scope:'정답을 아는 학습 조건의 별도 진단이다. 위의 추론 결과를 바꾸지 않는다. 선택한 책임 박스의 좌표·신뢰도와 해당 칸의 종류 손실항만 읽는다. 전체98박스의 no-object 항과 전체 학습 갱신은 포함하지 않는다.'};
 }
 const order=(a,b)=>b.score-a.score||a.boxId.localeCompare(b.boxId)||a.classIndex-b.classIndex;
 function analyze(options={}){
  if(!options||typeof options!=='object'||Array.isArray(options)||Object.keys(options).some(k=>k!=='input'))throw TypeError('Provide input only.');
  const input=validate(options.input===undefined?initial:options.input),cells=makeCells(input),boxes=cells.flatMap(c=>c.boxes),scores=[];
  for(const cell of cells)for(const b of cell.boxes)for(const c of classes)scores.push({id:b.id+':'+c.id,boxId:b.id,cellId:cell.id,classId:c.id,classLabel:c.label,classIndex:c.index,probability:cell.probabilities[c.index],confidence:b.confidence,score:b.confidence*cell.probabilities[c.index],box:clone(b)});
  const passing=scores.filter(s=>s.score>=input.scoreThreshold).sort(order),kept=[],suppressed=[],nmsTrace=[];
  for(const c of classes){const rows=passing.filter(s=>s.classId===c.id).sort(order),retained=[];for(const candidate of rows){const checks=retained.map(winner=>({winnerId:winner.id,iou:iou(winner.box,candidate.box)})),against=checks.find(r=>r.iou>input.nmsThreshold);if(input.useNms&&against){suppressed.push({...candidate,suppressedBy:against.winnerId,overlap:against.iou});nmsTrace.push({candidateId:candidate.id,classId:c.id,decision:'suppressed',checks,against:against.winnerId});}else{retained.push(candidate);kept.push(candidate);nmsTrace.push({candidateId:candidate.id,classId:c.id,decision:'kept',checks,against:null});}}}
  kept.sort(order);suppressed.sort(order);const audit=trainingAudit(cells,input),status=kept.length?'detections-retained':'no-detections',events=[],push=(kind,message,detail={})=>events.push({index:events.length,kind,message,...clone(detail)});
  push('question','영상 전체에서 물체의 종류와 위치를 함께 예측한다는 발상을 살핀다.');
  push('grid','7×7칸 각각에 두 박스의 좌표·신뢰도와 한 묶음의20종류 값을 둔다.',{shape:[7,7,30],gridCells:49,boxCount:98,predictionValues:1470});
  push('raw','신경망을 실행하는 대신 직접 정한98개 박스 예측을 읽는다.',{cells,boxes});
  push('score','같은 칸의 종류별 조건값을 두 박스가 공유하고, 각 박스의 예측 신뢰도와 곱한다.',{scores});
  push('threshold','이 보기에서 정한 점수 문턱 이상인 종류·박스 쌍을 남긴다.',{passing});
  push('nms',input.useNms?'종류별 점수순으로 읽으며, 남긴 박스와의 IoU가 정한 문턱보다 큰 중복을 제외한다.':'NMS를 끄면 점수 조건을 통과한 겹친 예측도 남는다.',{kept,suppressed,nmsTrace});
  push('audit','정답을 아는 학습 진단에서만 중심 칸·책임 박스·일부 손실항을 비교한다. 추론 출력은 바꾸지 않는다.',{audit});
  push('output','남은 예측은 직접 정한 출력표의 결과다. 실제 영상 인식이나 학습 성능의 결과가 아니다.',{status});
  return freeze({input,cells,boxes,scores,passing,kept,suppressed,nmsTrace,audit,status,events,scope:example.boundary});
 }
 function verifyRun(run){try{return{valid:same(run,analyze({input:run.input}))};}catch(_){return{valid:false};}}
 function replay(run,index=0){if(!Number.isInteger(index)||index<0||index>=stages.length)throw RangeError('Choose one of the eight steps.');if(!verifyRun(run).valid)throw TypeError('Trace differs from the authored calculation.');const state={index,event:clone(run.events[index]),kind:run.events[index].kind,complete:index===7,input:clone(run.input),shape:null,gridCells:null,boxCount:null,predictionValues:null,cells:[],boxes:[],scores:[],passing:[],kept:[],suppressed:[],nmsTrace:[],audit:null,status:'inspecting'};for(const e of run.events.slice(0,index+1))for(const[k,v]of Object.entries(e))if(!['index','kind','message'].includes(k))state[k]=clone(v);state.selectedBoxes=state.boxes.filter(b=>b.confidence>0);state.selectedScores=state.scores.filter(s=>s.classId===run.input.focusClass&&s.confidence>0);state.selectedPassing=state.passing.filter(s=>s.classId===run.input.focusClass);state.selectedKept=state.kept.filter(s=>s.classId===run.input.focusClass);state.selectedSuppressed=state.suppressed.filter(s=>s.classId===run.input.focusClass);return freeze(state);}
 window.AtlasYoloUnified=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
