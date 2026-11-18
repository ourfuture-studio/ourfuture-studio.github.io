/* Independently chosen pixels and matrices. No trained ViT weights or labels. */
(function(){
 'use strict';
 const models=[{id:'base',name:'ViT-Base',layers:12,dimension:768,mlp:3072,heads:12},{id:'large',name:'ViT-Large',layers:24,dimension:1024,mlp:4096,heads:16},{id:'huge',name:'ViT-Huge',layers:32,dimension:1280,mlp:5120,heads:16}];
 const pixels=Array.from({length:16},(_,y)=>Array.from({length:16},(_,x)=>{
  let rgb=y>=12?[84,143,101]:[190,220,242];
  if((x-12)**2+(y-2)**2<=2)rgb=[247,200,88];
  if(y>=7&&y<=12&&x>=4&&x<=11)rgb=[225,177,116];
  if(y>=3&&y<=7&&Math.abs(x-7.5)<=y-2)rgb=[181,82,76];
  if(y>=9&&y<=12&&x>=7&&x<=8)rgb=[86,91,110];
  if(y>=8&&y<=9&&((x>=5&&x<=6)||(x>=10&&x<=11)))rgb=[78,134,175];
  return rgb;
 }));
 function patches(size){if(![4,8].includes(size))throw RangeError('Choose a 4 or 8 pixel example patch.');const list=[];for(let y=0;y<16;y+=size)for(let x=0;x<16;x+=size){const flat=[];for(let dy=0;dy<size;dy++)for(let dx=0;dx<size;dx++)flat.push(...pixels[y+dy][x+dx]);list.push({id:list.length+1,x,y,size,flat,vector:project(flat)});}return list;}
 function project(flat){if(!Array.isArray(flat)||flat.length%3!==0||flat.length<3||!flat.every(v=>Number.isFinite(v)&&v>=0&&v<=255))throw TypeError('Projection expects bounded RGB triples.');const n=flat.length/3,sums=[0,0,0];for(let i=0;i<flat.length;i++)sums[i%3]+=flat[i]/255;const[r,g,b]=sums.map(x=>x/n);return [r,0.5*g+0.5*b,r-b];}
 function shape(height,width,patch,dimension=768){for(const v of [height,width,patch,dimension])if(!Number.isInteger(v)||v<=0||v>8192)throw RangeError('Positive bounded integer dimensions are required.');if(height%patch||width%patch)throw RangeError('Image dimensions must be divisible by patch size.');const count=height*width/(patch*patch),sequence=count+1;return {height,width,patch,dimension,patches:count,sequence,patchValues:patch*patch*3,scoreCells:sequence*sequence};}
 function getModel(id){const model=models.find(x=>x.id===id);if(!model)throw RangeError('Unknown ViT size.');return model;}
 function position(index,count){if(index===0)return [0,0,0];const side=Math.sqrt(count),row=Math.floor((index-1)/side),col=(index-1)%side;return [0.8*index/(count+1),0.3*row/(side-1),0.3*col/(side-1)];}
 function attention(size,swapped=false,withPosition=true){const items=patches(size);if(swapped)[items[0],items[items.length-1]]=[items[items.length-1],items[0]];const cls=[0.8,-0.3,0.5],inputs=[{id:0,content:cls},...items.map(p=>({id:p.id,content:p.vector}))].map((x,i)=>({...x,slot:i,position:withPosition?position(i,items.length):[0,0,0]}));for(const x of inputs)x.vector=x.content.map((v,j)=>v+x.position[j]);const query=inputs[0].vector,scores=inputs.map(x=>query.reduce((sum,v,j)=>sum+v*x.vector[j],0)/Math.sqrt(3)),max=Math.max(...scores),exp=scores.map(x=>Math.exp(x-max)),sum=exp.reduce((a,b)=>a+b,0),weights=exp.map(x=>x/sum),output=[0,1,2].map(j=>inputs.reduce((sum,x,i)=>sum+weights[i]*x.vector[j],0));return {inputs,scores,weights,output,withPosition,swapped};}
 const stages=[
  {id:'patch',label:'패치 → 같은 선형 투영',title:'화소를, 관계를 계산할 수 있는 벡터로',text:'각 패치의 RGB 값을 펼친 뒤 같은 학습 가능한 행렬로 투영한다. 이미 붙어 있는 사물 이름을 읽는 과정이 아니다. 공식 구현은 패치 크기와 stride가 같은 합성곱으로 이 비중첩 선형 투영을 계산할 수 있음을 설명한다.',page:3},
  {id:'position',label:'위치 + 별도 class token',title:'내용과 자리, 전체를 읽을 위치를 준비한다',text:'패치의 내용 벡터와 위치 벡터를 더한다. 앞에 붙는 class embedding은 별도의 학습 가능한 벡터다. 그림의 별표·0번 칸을 사진에서 잘라 낸 패치로 읽지 않는다.',page:3},
  {id:'attention',label:'Encoder: Norm → Attention → +',title:'멀리 있는 이미지 조각도 직접 참고한다',text:'정규화한 여러 위치가 서로를 참고하고, 결과를 기존 입력에 더한다. 이미지 분류 encoder는 앞쪽 위치만 보게 하는 인과 마스크를 쓰지 않는다. 참고할 수 있다는 구조와 실제 Attention 가중치가 큰지는 다르다.',page:3},
  {id:'mlp',label:'Encoder: Norm → MLP → +',title:'각 위치 안에서 표현을 다시 조합한다',text:'MLP는 위치마다 같은 연결값으로 벡터를 변환하고 잔차 더하기를 적용한다. Attention의 위치 사이 결합과 MLP의 위치별 변환을 쌓아 표현을 바꾼다. 서로 다른 encoder 층은 각자의 연결값을 가진다.',page:3},
  {id:'class',label:'class 출력 → 분류 head',title:'여러 조각을 참고한 class 위치의 출력을 읽는다',text:'마지막 class 위치의 표현을 정규화한 뒤 분류 head에 전달한다. 학습의 분류 오차가 class token만이 아니라 patch projection과 encoder의 연결값까지 바꾼다. 자연어로 장면을 설명하는 모델은 아니다.',page:3}
 ];
 function freeze(x){if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;}
 window.AtlasVit2020Core=Object.freeze({models:freeze(models),pixels:freeze(pixels),stages:freeze(stages),patches,project,shape,getModel,attention});
})();
