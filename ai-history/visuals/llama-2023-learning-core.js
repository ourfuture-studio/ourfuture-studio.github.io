/* Source values and structural calculations only; no LLaMA weights or sampling. */
(function(){
 'use strict';
 const paper='https://arxiv.org/pdf/2302.13971v1#page=3';
 const code='https://github.com/meta-llama/llama/blob/llama_v1/llama/model.py';
 const models=[
  {id:'7b',name:'LLaMA 7B',parametersB:6.7,dimension:4096,heads:32,layers:32,tokensT:1.0},
  {id:'13b',name:'LLaMA 13B',parametersB:13.0,dimension:5120,heads:40,layers:40,tokensT:1.0},
  {id:'33b',name:'LLaMA 33B',parametersB:32.5,dimension:6656,heads:52,layers:60,tokensT:1.4},
  {id:'65b',name:'LLaMA 65B',parametersB:65.2,dimension:8192,heads:64,layers:80,tokensT:1.4}
 ];
 const parts=[
  {id:'embedding',short:'단어 조각을 벡터로',title:'서로 비교하고 바꿀 수 있는 표현으로 옮긴다',text:'입력 토큰의 번호는 의미의 크기가 아니다. 임베딩은 각 번호를 학습 가능한 벡터로 바꾼다. 그 벡터가 여러 층을 통과하며 앞 문맥을 반영한 표현으로 달라진다. 아래 문장 칸은 직접 나눈 예시이며 원래 SentencePiece 분할을 재현한 것이 아니다.',source:code+'#L188-L190',location:'공식 코드 · Transformer의 tok_embeddings'},
  {id:'norm',short:'먼저 RMSNorm',title:'각 하위층에 들어가기 전에 표현의 크기를 조절한다',text:'LLaMA는 Attention과 FeedForward의 출력 뒤가 아니라 입력에 정규화를 둔다. 논문은 이를 큰 망의 학습 안정성을 위한 선택으로 설명한다. RMSNorm은 벡터의 제곱평균 크기를 사용하며, 단어의 의미를 사람이 정한 범주로 분류하는 장치가 아니다.',source:paper,location:'원문 §2.2 · Pre-normalization'},
  {id:'attention',short:'앞 문맥 + 위치',title:'이 위치를 해석하는 데 앞의 어떤 위치를 참고할까?',text:'각 위치의 표현에서 Q·K·V를 만들고, Q·K에 RoPE로 위치 정보를 반영한다. 인과 마스크는 아직 보아서는 안 되는 미래 위치를 막는다. 여러 head가 문맥을 결합한 뒤 출력 변환을 거친다. 연결 가능 여부와 실제 학습된 Attention의 강도는 서로 다르다.',source:code+'#L110-L137',location:'공식 코드 · Attention.forward와 apply_rotary_emb'},
  {id:'residual',short:'기존 표현 + 새 정보',title:'새로 계산한 변화를 기존 표현에 더한다',text:'Attention의 결과를 기존 입력에 더하고, 다음 변환의 결과도 그 입력에 다시 더한다. 그림 왼쪽의 돌아가는 선은 이 두 잔차 경로다. 블록을 깊게 쌓아도 기존 정보와 새 변화가 이어지는 구조이며, 원코드의 두 더하기를 따로 표시했다.',source:code+'#L163-L179',location:'공식 코드 · TransformerBlock.forward'},
  {id:'swiglu',short:'SwiGLU로 표현 변환',title:'문맥에서 모은 정보를, 각 위치 안에서 다시 조합한다',text:'Attention이 위치 사이를 연결했다면, FeedForward는 각 위치의 벡터를 같은 연결값으로 변환한다. SwiGLU는 두 변환의 한 갈래에 SiLU를 적용하고 두 갈래를 원소별로 곱한 뒤 다시 투영한다. “어떤 의미를 통과시킬지”를 사람이 적은 논리 규칙이 아니라 학습 가능한 연결값으로 다룬다.',source:code+'#L140-L161',location:'원문 §2.2 · SwiGLU / 공식 FeedForward.forward'},
  {id:'output',short:'다음 토큰을 예측',title:'문맥 표현을 다음 토큰의 점수로 바꾼다',text:'블록을 여러 층 거친 뒤 최종 RMSNorm과 어휘 출력 변환을 적용한다. 학습에서는 실제 다음 토큰의 확률을 높이도록 오차로 연결값을 바꾼다. 사용할 때는 학습한 연결값을 유지하고 문맥 뒤에 출력을 이어 간다. 원래 공개 코드는 추론용이며 여기서는 출력 확률이나 토큰 생성을 실행하지 않는다.',source:code+'#L182-L219',location:'공식 코드 · Transformer의 norm·output·forward'}
 ];
 const tokens=['The','cat','sat','on','the','mat'];
 function getModel(id){const m=models.find(x=>x.id===id);if(!m)throw RangeError('Unknown first LLaMA size: '+id);return m;}
 function contextAt(position){if(!Number.isInteger(position)||position<0||position>=tokens.length-1)throw RangeError('Choose a position with a next-token target.');return {position,visible:tokens.slice(0,position+1),target:tokens[position+1],targetPosition:position+1,blocked:tokens.slice(position+1)};}
 function causalMask(length){if(!Number.isInteger(length)||length<1||length>32)throw RangeError('Mask length outside display scope.');return Array.from({length},(_,i)=>Array.from({length},(_,j)=>j<=i));}
 function tokensPerParameter(id){const m=getModel(id);return m.tokensT*1000/m.parametersB;}
 function freeze(value){if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
 window.AtlasLlama2023Core=Object.freeze({models:freeze(models),parts:freeze(parts),tokens:freeze(tokens),paper,code,getModel,contextAt,causalMask,tokensPerParameter});
})();
