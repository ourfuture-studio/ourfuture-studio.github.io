/* First LLaMA: a sourced architecture reconstruction, causal mask and paper values. */
(function(){
 'use strict';
 const C=window.AtlasLlama2023Core;
 if(!C)throw Error('LLaMA visual requires its independent core.');
 const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const svgNode=(tag,attrs,text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const[k,v]of Object.entries(attrs||{}))n.setAttribute(k,String(v));if(text!==undefined)n.textContent=text;return n;};
 const source=(title,url)=>{const a=node('a','llama-source',title+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
 window.AtlasVisuals.register('llama-2023-learning',{
  mount(host){
   const root=node('div','llama-2023-learning');host.append(root);
   let view='architecture',modelId='7b',part='attention',position=2,mode='training',disposed=false;
   function choose(fn,key){fn();render();for(const b of root.querySelectorAll('[data-llama-key]'))if(b.dataset.llamaKey===key){b.focus({preventScroll:true});break;}}
   function button(text,key,fn,pressed){const b=node('button','',text);b.type='button';b.dataset.llamaKey=key;if(pressed!==undefined)b.setAttribute('aria-pressed',String(pressed));b.addEventListener('click',()=>choose(fn,key));return b;}
   function heading(eyebrow,title,text){const box=node('header','llama-view-heading');box.append(node('span','llama-eyebrow',eyebrow),node('h4','',title));if(text)box.append(node('p','',text));return box;}
   function architecture(model){
    const wrap=node('div','llama-architecture-grid'),figure=node('figure','llama-block-figure');
    const svg=svgNode('svg',{viewBox:'45 0 420 865',role:'img','aria-label':model.name+' 재구성 아키텍처. 토큰 임베딩, 입력 RMSNorm, RoPE가 적용된 인과적 다중 head Attention과 잔차 더하기, RMSNorm과 SwiGLU 및 두 번째 잔차 더하기를 '+model.layers+'층 반복한다. 마지막 RMSNorm과 어휘 출력 변환으로 다음 토큰의 점수를 얻는다.'});
    const defs=svgNode('defs'),marker=svgNode('marker',{id:'llama-arrow-'+modelId,viewBox:'0 0 10 10',refX:8,refY:5,markerWidth:6,markerHeight:6,orient:'auto-start-reverse'});marker.append(svgNode('path',{d:'M 0 0 L 10 5 L 0 10 z',fill:'#738292'}));defs.append(marker);svg.append(defs);
    const arrow=d=>svg.append(svgNode('path',{d,fill:'none',stroke:'#738292','stroke-width':1.8,'marker-end':'url(#llama-arrow-'+modelId+')'}));
    svg.append(svgNode('rect',{x:105,y:127,width:335,height:520,rx:19,class:'llama-repeat'}));
    svg.append(svgNode('text',{x:272,y:151,'text-anchor':'middle',class:'llama-svg-small'},'TRANSFORMER BLOCK × '+model.layers));
    const box=(y,h,label,sub,key)=>{const g=svgNode('g',{'data-llama-diagram-part':key,class:'llama-svg-node'+(part===key?' is-selected':'')});g.append(svgNode('rect',{x:160,y,width:225,height:h,rx:10}));g.append(svgNode('text',{x:272,y:y+(sub?h/2-2:h/2+5),'text-anchor':'middle',class:'llama-svg-label'},label));if(sub)g.append(svgNode('text',{x:272,y:y+h/2+19,'text-anchor':'middle',class:'llama-svg-small'},sub));svg.append(g);};
    svg.append(svgNode('text',{x:272,y:24,'text-anchor':'middle',class:'llama-svg-small'},'INPUT TOKENS'));
    box(42,50,'Token embedding','d = '+model.dimension,'embedding');arrow('M272 92V170');
    box(172,44,'RMSNorm','','norm');arrow('M272 216V247');
    box(250,62,'Causal self-attention',model.heads+' heads · RoPE on Q / K','attention');arrow('M272 312V343');
    arrow('M272 111H75V361H252');
    const add=y=>{svg.append(svgNode('circle',{cx:272,cy:y,r:17,class:'llama-svg-add'+(part==='residual'?' is-selected':'')}),svgNode('text',{x:272,y:y+6,'text-anchor':'middle',class:'llama-svg-label'},'+'));};
    add(361);arrow('M272 378V411');box(414,44,'RMSNorm','','norm');arrow('M272 458V492');
    box(495,58,'SwiGLU feed-forward','same transformation at every position','swiglu');arrow('M272 553V589');
    arrow('M272 394H75V607H252');add(607);arrow('M272 624V682');
    svg.append(svgNode('text',{x:93,y:284,transform:'rotate(-90 93 284)','text-anchor':'middle',class:'llama-svg-small'},'residual path'),svgNode('text',{x:93,y:500,transform:'rotate(-90 93 500)','text-anchor':'middle',class:'llama-svg-small'},'residual path'));
    box(685,44,'RMSNorm','','output');arrow('M272 729V758');box(761,52,'Vocabulary projection','next-token scores','output');
    svg.append(svgNode('text',{x:272,y:846,'text-anchor':'middle',class:'llama-svg-small'},'FINAL CONTEXT → NEXT TOKEN'));
    figure.append(svg,node('figcaption','','자체 재구성 · 원문 §2.2 + 공식 llama_v1 model.py. 왼쪽 돌아가는 선 두 개는 잔차 더하기다. 층마다 다른 연결값을 갖고, 같은 층 안에서는 위치마다 연결값을 공유한다.'));
    const reading=node('div','llama-block-reading'),nav=node('div','llama-part-nav');nav.setAttribute('aria-label','아키텍처 부분 선택');
    for(const[i,p]of C.parts.entries())nav.append(button(String(i+1).padStart(2,'0')+' '+p.short,'part-'+p.id,()=>{part=p.id;},part===p.id));
    const p=C.parts.find(x=>x.id===part),detail=node('div','llama-part-detail');detail.setAttribute('aria-live','polite');detail.append(node('span','llama-eyebrow','READ THE CONNECTION'),node('h5','',p.title),node('p','',p.text),source(p.location,p.source));
    reading.append(nav,detail);wrap.append(figure,reading);return wrap;
   }
   function context(){
    const frag=document.createDocumentFragment();frag.append(heading('CAUSAL CONTEXT','다음 말을 미리 보지 않고, 다음 말을 배운다','문장 안의 위치를 누르면 그 위치가 참고할 수 있는 칸과 예측할 정답이 달라집니다. 칸은 직접 나눈 예시이며 원래 모델의 토큰 분할이나 Attention 강도를 나타내지 않습니다.'));
    const switcher=node('div','llama-mode-nav');for(const[id,label]of[['training','학습: 정답으로 연결값을 바꾼다'],['inference','사용: 연결값을 유지한다']])switcher.append(button(label,'mode-'+id,()=>{mode=id;},mode===id));frag.append(switcher);
    const selection=C.contextAt(position),tokens=node('div','llama-token-row');tokens.setAttribute('aria-label','문맥 위치 선택');
    for(const[i,t]of C.tokens.entries()){const cell=node('div','llama-token-wrap');const b=button(t,'token-'+i,()=>{position=i;},position===i);if(i===C.tokens.length-1){b.disabled=true;b.removeAttribute('aria-pressed');b.title='이 예시의 마지막 칸 뒤에는 정답 토큰을 두지 않았습니다.';}b.className=i<=position?'is-visible':'is-future';if(i===position+1)b.classList.add('is-target');cell.append(b,node('span','',i===position?'현재 위치':i===position+1?'다음 정답':i<=position?'참고 가능':'미래 위치'));tokens.append(cell);}frag.append(tokens);
    const status=node('div','llama-context-result');status.setAttribute('aria-live','polite');status.dataset.llamaContext=String(position);status.append(node('p','llama-context-rule','현재 출력이 참고하는 입력: '+selection.visible.join(' ')),node('p','llama-target','예측할 다음 칸: '+selection.target));
    status.append(node('p','',mode==='training'?'이 위치의 예측과 실제 다음 칸을 비교해 오차를 만든다. 여러 위치의 오차가 같은 층의 연결값을 함께 학습시킨다. 정답은 오차를 계산할 때 쓰며, 현재 위치의 Attention이 미리 읽는 입력이 아니다.':'학습한 연결값은 유지된다. 현재까지의 문맥에서 다음 토큰을 선택하고 입력 뒤에 붙여 다시 계산하는 흐름이다. 여기의 다음 칸은 정해 둔 문장 예시이며 실제 LLaMA가 생성한 답이 아니다.'));frag.append(status);
    const matrixWrap=node('div','llama-mask-wrap');matrixWrap.tabIndex=0;matrixWrap.setAttribute('role','region');matrixWrap.setAttribute('aria-label','인과 마스크 표. 행은 출력 위치, 열은 참고할 입력 위치. 가로로 이동할 수 있습니다.');
    const table=node('table','llama-mask'),caption=node('caption','','● 참고 가능 · — 차단 · 진한 행은 선택한 위치');table.append(caption);const tr=node('tr');tr.append(node('th','','출력 ↓ / 입력 →'));for(const[i,t]of C.tokens.entries()){const th=node('th','',String(i+1)+' '+t);th.scope='col';tr.append(th);}table.append(tr);
    for(const[i,row]of C.causalMask(C.tokens.length).entries()){const tr=node('tr',i===position?'is-selected':'');const th=node('th','',String(i+1)+' '+C.tokens[i]);th.scope='row';tr.append(th);for(const allowed of row){const td=node('td',allowed?'is-allowed':'is-blocked',allowed?'●':'—');td.setAttribute('aria-label',allowed?'참고 가능':'미래 위치 차단');tr.append(td);}table.append(tr);}matrixWrap.append(table);frag.append(matrixWrap,node('p','llama-small','마스크의 연결 가능 여부만 계산합니다. ●는 모든 칸에 같은 Attention 가중치를 준다는 뜻이 아닙니다.'),source('공식 코드 · causal Attention과 mask',C.code+'#L110-L137'));return frag;
   }
   function budget(model){
    const frag=document.createDocumentFragment();frag.append(heading('SIZE × TRAINING TOKENS','얼마나 큰 망을, 얼마나 많은 글에서 학습했을까?','버튼은 원문 Table 2에 보고된 네 모델 중 하나를 고릅니다. 모델 이름과 실제 파라미터 수, 학습 토큰 수를 함께 읽어 보세요.'));
    const comparison=node('div','llama-budget-bars');
    for(const[label,value,max,unit]of[['연결값의 수',model.parametersB,65.2,'B parameters'],['학습 토큰 수',model.tokensT,1.4,'T tokens']]){const row=node('div','llama-budget-row'),track=node('div','llama-budget-track'),bar=node('span');bar.style.width=(value/max*100)+'%';track.append(bar);row.append(node('span','',label),node('strong','',value.toFixed(1)+' '+unit),track);comparison.append(row);}frag.append(comparison,node('p','llama-small','두 막대는 단위와 최댓값이 다릅니다. 연결값은 65.2B, 학습 토큰은 1.4T를 각 막대의 기준으로 둡니다. 속도·비용·성능 막대가 아닙니다.'));
    const stats=node('dl','llama-budget-stats');for(const[label,value]of[['모델 이름',model.name],['연결값',model.parametersB.toFixed(1)+' billion'],['학습량',model.tokensT.toFixed(1)+' trillion tokens'],['반복 블록',model.layers+' layers'],['표현 차원',String(model.dimension)],['Attention',model.heads+' heads']]){const group=node('div');group.append(node('dt','',label),node('dd','',value));stats.append(group);}frag.append(stats);
    frag.append(node('p','llama-paper-idea','7B와 13B는 1조 토큰, 33B와 65B는 1.4조 토큰으로 학습했다. 모델을 오래 학습하면 학습 비용도 든다. 논문의 질문은 그 비용을 감수하고 나서 작은 모델을 반복 사용할 때 얻는 이점까지 함께 보자는 것이다.'));
    const figure=node('figure','llama-original-curve'),img=node('img');img.src=window.ATLAS_EMBEDDED_IMAGES?.['papers/llama-2023-figure1-original.png']||'assets/papers/llama-2023-figure1-original.png';img.width=904;img.height=904;img.alt='LLaMA 원문 Figure 1. 가로축은 학습 토큰 수, 세로축은 훈련 손실이다. 7B와 13B 곡선은 1000 billion, 33B와 65B 곡선은 1400 billion tokens까지 표시된다. 네 곡선 모두 학습이 진행되며 손실이 내려가는 추세다.';img.decoding='async';figure.append(img,node('figcaption','','Figure 1 원본 · v1 PDF 3쪽. 곡선과 캡션을 그대로 발췌했다. 훈련 손실의 감소이며 외부 과제의 정확도나 응답 속도 그래프가 아니다. 숫자를 추정해 다시 그리지 않았다.'),source('Touvron 외 · Figure 1 · 원문 3쪽',C.paper));frag.append(figure);return frag;
   }
   function links(){const frag=document.createDocumentFragment();frag.append(heading('PEOPLE · PAPER · COMPANY','한 모델을, 사람과 회사의 기록으로 이어 읽다','논문 저자 사이의 공동연구와 회사의 조직 역할은 구분해 연결합니다.'));
    const list=node('div','llama-related');for(const[label,href]of[['위고 투브롱 · 인물과 LLaMA 기록','#person=hugo-touvron'],['기욤 랑플 · 인물과 공동연구','#person=guillaume-lample'],['Meta · 2023년 회사 기록','#company=meta&record=meta-llama-2023'],['Transformer · 문맥을 연결하는 앞선 구조','#event=transformer'],['GPT-3 · 몇 개의 예시를 문맥에 놓기','#event=gpt3'],['InstructGPT · 사람 피드백 사후학습과 비교','#event=instructgpt']]){const a=node('a','',label+' →');a.href=href;list.append(a);}frag.append(list,node('p','llama-small','Transformer·GPT-3·InstructGPT는 아이디어를 비교해 읽는 경로입니다. 이 링크 자체가 인물 사이의 지도 관계나 직접적인 공동연구의 근거는 아닙니다.'));return frag;}
   function render(){if(disposed)return;root.replaceChildren();root.dataset.llamaView=view;root.dataset.llamaModel=modelId;root.dataset.llamaPart=part;root.dataset.llamaMode=mode;
    const model=C.getModel(modelId),top=node('div','llama-top');top.append(node('span','llama-eyebrow','LLaMA · FEBRUARY 2023'),node('p','llama-top-question','많이 배우되, 계속 사용하기 좋은 크기는 무엇일까?'));
    const sizeNav=node('div','llama-model-nav');sizeNav.setAttribute('aria-label','LLaMA 원문 모델 크기 선택');for(const m of C.models)sizeNav.append(button(m.name,'model-'+m.id,()=>{modelId=m.id;},modelId===m.id));top.append(sizeNav);const summary=node('p','llama-model-summary',model.parametersB.toFixed(1)+'B 연결값 · '+model.layers+'층 · '+model.heads+' heads · '+model.tokensT.toFixed(1)+'T 학습 토큰');summary.setAttribute('aria-live','polite');top.append(summary);root.append(top);
    const nav=node('nav','llama-view-nav');nav.setAttribute('aria-label','LLaMA 살펴보기');for(const[id,label]of[['architecture','01 층의 연결'],['context','02 문맥과 다음 말'],['budget','03 크기와 학습량'],['connections','04 연결해서 읽기']])nav.append(button(label,'view-'+id,()=>{view=id;},view===id));root.append(nav);
    const body=node('section','llama-view');if(view==='architecture'){body.append(heading('RECONSTRUCTED ARCHITECTURE','앞 문맥을 모으고, 그 표현을 다시 바꾼다','원문 전체 아키텍처 그림이 아닌 자체 재구성입니다. 오른쪽 부분을 고르면 해당 연결의 의미와 원문 위치를 함께 볼 수 있습니다.'),architecture(model));}else if(view==='context')body.append(context());else if(view==='budget')body.append(budget(model));else body.append(links());root.append(body,node('p','llama-scope','표·원곡선·공식 코드를 읽는 화면입니다. 구조적 마스크 이외의 모델 계산, 원래 가중치의 학습과 문장 생성은 실행하지 않습니다.'));
   }
   render();return()=>{disposed=true;root.remove();};
  }
 });
})();
