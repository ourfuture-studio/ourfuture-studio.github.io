/* NIPS 2017 for the method, arXiv v5 for the attention-visualization appendix.
 * The small matrices below are authored values, never pretrained parameters. */
(function(){
  'use strict';
  const paper='https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf';
  const appendix='https://arxiv.org/pdf/1706.03762v5';
  const blog='https://research.google/blog/transformer-a-novel-neural-network-architecture-for-language-understanding/';
  const at=(page,label)=>({title:'Vaswani 외 (2017) · NIPS PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const extra=(page,label)=>({title:'2017 arXiv v5 부록 · PDF p.'+page+' · '+label,url:appendix+'#page='+page});
  const embeddings={the:[.1,.2,-.1,.3],cat:[.6,-.2,.4,.1],saw:[-.3,.5,.2,-.2],dog:[.5,.1,-.2,.4],'.':[0,-.1,.1,.2]};
  const example=(id,label,tokens,translation)=>({id,label,tokens,inputVectors:tokens.map(token=>embeddings[token].slice()),translation});
  window.AtlasEntries.register({
    id:'transformer',
    record:{
      title:'단어가 서로를 참고하며, 문맥 속 표현을 만들다',
      summary:'각 위치의 단어가 다른 위치에서 필요한 정보를 가져와 자신의 표현을 갱신한다. 순서 정보와 여러 Attention head를 결합하고, 번역문을 예측하는 목표로 어떤 관계를 참고할지 함께 학습했다.',
      detail:'',question:'',
      sources:[{title:'Attention Is All You Need · NIPS 2017 출판본',url:paper},{title:'Attention Is All You Need · arXiv v5, 시각화 부록 포함',url:appendix}],
      caveat:'여덟 공동저자의 연구이며 첫 쪽 각주는 동등 기여·무작위 저자 순서를 밝힌다. 작은 벡터·투영 행렬은 직접 정한 값이다. 원문 부록의 학습된 Attention 그림과 구분하며, 비중이 높은 연결만으로 정답 의미나 인과 설명을 확정하지 않는다.',
      related:['word2vec','seq2seq','gpt3']
    },
    content:{
      article:{
        question:'같은 단어도, 다른 말을 참고하며\n문맥에 맞는 표현을 만들 수 있을까?',
        opening:[
          'bank라는 글자만으로는 금융기관인지 강둑인지 정하기 어렵다. 같은 문장에 river가 등장한다면 해석의 단서가 달라진다. 연구팀의 2017년 설명은 이런 예에서 출발한다. 한 단어의 표현을 사전에 정한 벡터로 끝내지 않고, 지금 문장의 다른 말에서 정보를 가져와 바꿀 수 있을까?',
          'Transformer는 문장의 각 위치에서 다른 위치들을 비교하고, 그곳의 정보를 서로 다른 비중으로 모아 새 표현을 만든다. Self-Attention은 무엇을 찾는지를 나타내는 Query, 비교할 단서를 나타내는 Key, 실제로 가져올 정보인 Value를 같은 문장의 표현에서 학습한 투영으로 만든다. 각 위치는 자신도 참고할 수 있다. 여러 Head가 서로 다른 투영으로 정보를 모으고, 그 결과를 다시 결합한다.',
          'Vaswani와 일곱 공동저자는 이 계산을 문장 안의 각 위치에 반복해 적용하는 인코더와, 앞서 만든 말 및 입력 문장의 표현을 참고하는 디코더를 구성했다. 번역의 정답을 예측하는 오차가 단어 표현과 참고 방법을 함께 바꾼다. 입력을 읽는 순환망의 시간 순서에 매이지 않고 위치별 계산을 병렬로 할 수 있도록 구성하되, 새 번역문을 생성할 때는 여전히 앞선 출력부터 차례로 만든다.'
        ],
        visual:{
          id:'word-in-context',navLabel:'서로 참고하는 단어',
          title:'다른 위치의 정보를 모아, 지금 위치의 표현을 바꾸다',
          caption:'두 번째 cat을 골라 앞의 단어를 바꿔 보세요. 같은 시작 벡터에서도 참고할 문맥이 달라지면 계산 결과가 달라집니다. 이어서 입력 읽기와 출력 생성이 허용하는 참고 범위를 비교하고, 원문의 구조도와 실제 Attention 관찰을 살펴봅니다.',
          stages:[
            {id:'attend',label:'문맥에서 가져오다',text:'선택한 위치의 Query를 다른 위치의 Key와 비교해 비중을 구하고, Value를 그 비중으로 모은다. 두 Head의 결과를 이어 붙이고 다시 투영한다. 성분에 뜻의 이름을 미리 붙이지 않는다.'},
            {id:'structure',label:'무엇을 볼 수 있나',text:'인코더는 입력 문장 전체를 읽고, 디코더의 Self-Attention은 아직 나오지 않은 출력을 가린다. 인코더를 참고하는 Attention은 디코더의 표현에서 입력 문장의 표현으로 연결된다.'},
            {id:'evidence',label:'원문에서 확인하다',text:'방법은 NIPS 출판본의 구조도와 본문을, 학습된 Attention의 관찰은 별도 arXiv v5 부록을 기준으로 읽는다. 앞의 작은 계산과 원문에서 학습한 연결을 나누어 살펴본다.'}
          ],
          calculation:{
            examples:[
              example('same','고양이와 고양이',['the','cat','saw','the','cat','.'],'고양이가 고양이를 보았다. 앞뒤 cat은 같은 시작 벡터를 사용하지만 문장 속 위치가 다르다.'),
              example('changed','앞의 cat을 dog로',['the','dog','saw','the','cat','.'],'개가 고양이를 보았다. 다섯 번째 cat은 그대로 두고 다른 위치의 단어만 바꾼다.')
            ],
            heads:[
              {id:'head-1',label:'Head 1',WQ:[[1,0],[0,1],[.2,0],[0,.2]],WK:[[.8,0],[.1,1],[0,.2],[.2,0]],WV:[[1,0],[0,1],[.5,0],[0,.5]]},
              {id:'head-2',label:'Head 2',WQ:[[0,.6],[.7,0],[.3,0],[0,.8]],WK:[[0,1],[1,0],[.2,0],[0,.3]],WV:[[0,.5],[.5,0],[0,1],[1,0]]}
            ],
            outputProjection:[[.7,0,.2,0],[0,.8,0,.1],[.3,0,.6,0],[0,.2,0,.9]],initialQuery:4,
            scope:'두 문장·네 성분의 시작 벡터·두 Head의 투영 행렬을 직접 정했습니다. 원문 식 (1)의 계산과 여러 Head의 결합을 추적하며 원래 학습된 Transformer의 의미 판단을 재현하지 않습니다. 입력 벡터에 √4를 곱하고 선택에 따라 사인·코사인 위치 정보를 더합니다. 표시한 결과는 Attention 블록의 출력이며 Add & Norm·FFN 이후의 완성된 층 출력이 아닙니다. 비중은 참고 위치의 가중치이며 다음 단어의 확률이 아닙니다.',
            source:at(4,'Fig.2 · 식 (1), 다중 Head는 pp.4–5')
          },
          structure:{
            sourceTokens:['I','am','here'],decoderInputTokens:['〈시작〉','Je','suis'],expectedTokens:['Je','suis','ici'],
            modes:[
              {id:'encoder',label:'입력끼리',title:'인코더 Self-Attention · 입력 전체에서',text:'각 Query와 Key·Value는 같은 인코더의 앞 단계 표현에서 온다. 입력 문장을 이미 주었으므로 앞뒤 모든 위치를 참고할 수 있다. 모든 위치를 똑같은 비중으로 참고한다는 뜻은 아니다.',source:at(5,'§3.2.3 · Encoder self-attention')},
              {id:'decoder',label:'앞선 출력끼리',title:'디코더 Self-Attention · 미래를 가리고',text:'출력 입력을 정답보다 한 칸 오른쪽으로 옮겼다. 세 번째 위치의 입력은 suis이고 이번 정답은 ici다. 현재 위치까지 참고해도 아직 예측할 ici를 읽은 것이 아니다. 학습에서는 이전 정답을, 실제 생성에서는 앞서 만든 출력을 입력으로 쓴다.',source:at(3,'§3.1 · shifted-right 입력과 causal mask; §3.2.3은 p.5')},
              {id:'cross',label:'입력을 다시 보기',title:'인코더–디코더 Attention · 입력의 표현으로',text:'Query는 디코더 앞부분의 표현에서, Key·Value는 인코더의 최종 출력에서 온다. 출력의 각 위치가 번역할 입력 전체를 참고한다. 그림의 단어 표시는 해당 위치를 가리키며, 원래 단어 벡터를 그대로 최종 인코더 출력이라고 계산한 화면이 아니다.',source:at(5,'§3.2.3 · Encoder-decoder attention')}
            ],
            scope:'직접 준비한 영어·프랑스어 문장 쌍의 참고 가능 범위입니다. 색은 가능·차단을 나타내며 학습된 Attention 비중이 아닙니다. 〈시작〉은 한 칸 옮긴 입력을 보여 주기 위한 자체 표기입니다. 세 모드가 하나의 동일한 Q·K·V 표를 공유한다고 가정하지 않습니다.',
            source:at(3,'Fig.1 · 세 Attention의 연결')
          },
          evidence:[
            {
              id:'architecture',file:'transformer-2017-architecture.png',title:'원문의 전체 구조 · Attention 다음에도 계산은 이어진다',
              caption:'NIPS 출판본 Fig.1이다. 왼쪽은 입력 인코더, 오른쪽은 출력 디코더다. 위치 정보를 더한 표현에서 Attention과 Feed-Forward를 쌓고, 각 하위 계산을 잔차 연결 및 LayerNorm으로 감싼다. 디코더에는 미래를 가리는 Attention과 입력을 다시 참고하는 Attention이 따로 있다.',
              scope:'원문의 N×는 같은 구조의 층을 여섯 겹 쌓는 구성이며 모든 층이 하나의 파라미터를 공유한다는 뜻이 아닙니다. 원래 기본 모형은 512성분·8개 Head이며 위의 네 성분·두 Head 설정과 다릅니다. Add & Norm은 원문 순서인 LayerNorm(x + Sublayer(x))입니다. 마지막 어휘 Softmax와 Attention의 참고 비중 Softmax를 구분합니다.',
              source:at(3,'Fig.1 · Encoder–decoder stacks'),
              credit:{title:'Vaswani 외 (2017) · NIPS Fig.1',url:paper+'#page=3',note:'PDF의 그림 영역을 직접 렌더했습니다. 원그림을 보존하고 한국어 설명을 별도로 붙였습니다. 별도 재사용 허가나 CC 라이선스를 확인했다는 뜻은 아닙니다.'}
            },
            {
              id:'distance',file:'transformer-2017-attention-long-distance.png',title:'떨어진 말을 직접 참고한, 학습 후의 관찰',
              caption:'arXiv v5 부록 Fig.3이다. making 위치에서 문장 뒤쪽 more·difficult로 이어지는 Attention을 보여 준다. 원문은 멀리 떨어진 관계를 참고한 사례로 제시한다. 색은 서로 다른 Head에 대응하며 입력에 EOS·패딩 표기도 함께 보인다.',
              scope:'인코더의 6개 층 중 layer 5에서 고른 사례입니다. 원문은 making에서 나가는 연결만 표시했습니다. 전체 문장·모든 Head의 성능 평가가 아니며 위에서 직접 정한 고양이 문장의 계산 결과도 아닙니다. 굵은 연결 자체를 문법적 정답이나 인과 증명으로 판정하지 않습니다.',
              source:extra(13,'Attention Visualizations · Fig.3'),
              credit:{title:'Vaswani 외 (2017) · arXiv v5 Fig.3',url:appendix+'#page=13',note:'부록 원그림을 직접 렌더했습니다. 단어·연결·색을 바꾸지 않았으며 설명은 그림 밖에 붙였습니다.'}
            },
            {
              id:'reference',file:'transformer-2017-attention-anaphora.png',title:'its를 표현할 때, 서로 다른 Head가 참고한 곳',
              caption:'arXiv v5 부록 Fig.4다. 위는 Head 5의 전체 Attention, 아래는 its에서 나가는 Head 5·6의 연결만 골라 보여 준다. 서로 다른 Head가 Law와 application 쪽 정보를 다르게 모으는 모습을 관찰할 수 있다.',
              scope:'원문은 인코더 layer 5 of 6의 두 Head가 대명사 참조 해석에 관여하는 듯하다고 서술합니다. 이 선택 사례만으로 모든 대명사의 지시 대상을 맞히거나 각 Head에 고정된 문법 역할이 있다고 결론 내리지 않습니다. Attention 가중치와 모델 전체의 결정을 구분합니다.',
              source:extra(14,'Attention Visualizations · Fig.4'),
              credit:{title:'Vaswani 외 (2017) · arXiv v5 Fig.4',url:appendix+'#page=14',note:'위의 전체 Head와 아래의 its 선택 연결을 함께 보존한 원문 영역입니다. 자체 수치 예시와 별개인 학습 결과 자료입니다.'}
            }
          ],
          scope:'원문을 참고한 자체 계산·참고 가능 범위 도식과 원문 그림을 나누어 표시합니다. 작은 행렬의 계산은 실행하지만 원래 Transformer의 학습·번역 추론·성능 평가를 실행한 화면은 아닙니다.',
          source:at(2,'§2–3 · 순환 계산을 대신하는 Self-Attention 구조')
        },
        takeaway:{title:'사전 속 단어 표현을, 지금 문장의 관계 속에서 갱신하다',text:'각 위치에서 무엇을 참고할지와 무엇을 가져올지를 학습하고, 그렇게 만든 위치별 표현을 여러 층에서 다시 갱신한다. 순서 정보와 출력의 참고 제한을 함께 두어, 문맥을 읽는 계산과 다음 말을 만드는 계산을 연결했다.'},
        technical:{
          title:'Query·Key·Value, 위치 정보와 원문 구조를 더 읽기',
          paragraphs:[
            '주된 방법의 기준은 11쪽 NIPS 2017 출판본이다. Fig.1은 p.3, Fig.2와 식 (1)은 p.4, 세 Attention의 역할과 위치 정보는 pp.5–6에 있다. 실제 Attention 관찰 Fig.3–5는 그 출판본에 없으며 2017-12-06 arXiv v5의 15쪽 원고 부록에 있다. 이 카드의 두 학습 결과 그림은 그중 Fig.3·4다.',
            'Query·Key·Value는 사람이 각 단어에 질문·정답·뜻의 목록을 붙인 것이 아니다. 해당 단계의 입력 표현에 학습할 행렬 WQ·WK·WV를 곱한 벡터다. q·k의 호환성 점수를 √d_k로 나눈 뒤 Key 위치들에 softmax를 적용하고, 그 비중으로 Value를 합한다. q와 k의 차원은 같아야 하지만 v의 차원은 별도로 정할 수 있다. Query 개수와 Key 개수도 인코더–디코더 Attention에서는 달라질 수 있다.',
            '여러 Head는 같은 입력에서 서로 다른 Q·K·V 투영을 학습한다. 각 Head가 가져온 값을 이어 붙여 WO로 다시 투영한다. 원래 기본 모형은 8개 Head, d_model=512, d_k=d_v=64다. 위 화면은 네 성분·두 Head이며 실제 학습 파라미터를 불러오지 않았다. Head 1은 문법, Head 2는 의미처럼 기능을 미리 배정하지 않는다.',
            '여기서는 직접 정한 E에 √4=2를 곱해 입력 임베딩의 스케일을 맞추고, 원문 사인·코사인 식으로 만든 네 성분의 위치 정보를 더한다. Q·K·V는 이 합에서 매번 다시 계산한다. 위치 정보를 끄면 같은 cat의 두 시작 행은 같고 같은 전체 Key·Value 집합에 같은 Query를 적용하므로 두 Attention 출력도 같다. 위치 정보를 켜면 위치별 값이 달라진다. 이 숫자 차이에 은행성·주어성 같은 의미 이름을 배정하지 않는다.',
            '원문은 위치 정보를 입력·출력 임베딩에 더하고, 학습한 위치 임베딩도 시험해 거의 같은 결과를 얻었다고 보고한다. 사인·코사인 방식이 모든 모형에서 유일한 위치 표현이라는 뜻은 아니다. 순서를 보존하려는 설계와, 이 작은 설정에서 표시한 수치 변화의 의미 범위를 나누어 읽는다.',
            'Attention만으로 원래 한 층의 계산이 모두 끝나는 것은 아니다. 원문은 각 하위 계산 뒤에 잔차 덧셈과 LayerNorm을 두고 위치별 Feed-Forward를 적용한다. 식은 LayerNorm(x + Sublayer(x))로, 후대에 흔히 쓰이는 pre-norm으로 조용히 바꾸지 않았다. FFN은 각 위치에 같은 파라미터를 적용하지만 서로 다른 층끼리는 파라미터가 다르다. 위 작은 계산은 Attention 결합 출력까지다.',
            '인코더는 주어진 입력 전체를 참고한다. 디코더 Self-Attention은 j≤i 위치만 허용하되, 입력 자체가 정답보다 한 칸 오른쪽으로 옮겨져 있다. 그래서 현재 위치를 허용해도 이번 정답을 미리 읽지 않는다. 가린 점수는 원문에서 softmax 전에 −∞로 처리하여 비중이 0이 된다. 화면의 가능·차단 행렬은 이 접근 규칙이며 학습 후 비중을 나타내는 지도와 다르다.',
            '인코더–디코더 Attention의 Q는 디코더 앞 단계에서, K·V는 인코더 최종 출력에서 온다. 같은 문장 안에서 나온 Q·K·V를 사용하는 Self-Attention과 구분한다. 이 방식은 입력을 하나의 최종 벡터에만 의존해 읽는 2014년 Seq2Seq 카드의 구조와도 다르다. Attention을 사용하는 이전 번역 연구가 이미 있었으며 Transformer를 Attention 자체의 단독 최초 발명으로 소개하지 않는다.',
            '학습에서는 정답 출력 문장을 한 칸 옮겨 입력하고 마스크를 적용하므로 여러 출력 위치의 손실을 병렬로 계산할 수 있다. 실제 생성에서는 정답 미래가 주어지지 않아 앞서 생성한 접두사에 이어 다음 토큰을 만든다. 병렬 학습을 문장 전체를 한 번에 독립 생성한다는 설명으로 바꾸지 않는다. 입력 길이 n의 일반적인 전체 Attention은 n×n 점수표를 만들어 길이가 커질 때 계산·메모리 비용도 증가한다.',
            '원문의 토큰은 반드시 띄어쓴 단어 하나와 일치하지 않는다. §5.1의 영어–독일어 실험은 BPE와 약 37,000개의 공유 어휘를 사용했다. 이 화면의 the·cat 등 여섯 토큰 분할은 직접 정했으며 원래 tokenizer를 실행한 결과가 아니다. 고정 Word2Vec 입력 표와 달리 Transformer는 문맥과 위치를 거쳐 각 출현의 표현을 갱신하지만, 단순히 값이 달라졌다는 사실이 올바른 의미 이해를 입증하지는 않는다.',
            '부록 Fig.3·4는 학습된 망의 선택된 층·Head에서 Attention 분포를 관찰한다. Fig.4의 설명에는 apparently라는 제한이 있다. 대명사 참조에 관여하는 듯한 관찰을 확정된 인과 기제로 확대하지 않는다. 위 작은 행렬의 결과, 원문의 관찰 그림, 번역 벤치마크 성능은 서로 다른 근거다.',
            'NIPS 출판본 p.8 Table 2의 Transformer(big)는 WMT14 newstest2014에서 영어→독일어 28.4·영어→프랑스어 41.0 BLEU를 보고한다. 그림 출처인 arXiv v5는 초록·Table 2에 영어→프랑스어 41.8을 적지만 §6.1 본문에는 41.0이 남아 있다. 이 카드는 출판본 수치를 기준으로 하며 차이의 이유를 추정하지 않는다. 원문의 큰 모형·데이터·평가 조건에 속한 수치로, 위 화면의 직접 정한 계산 점수가 아니다. 원래 학습이나 BLEU 평가를 재실행하지 않았다.',
            '첫 쪽 각주는 여덟 저자의 동등 기여와 무작위 나열을 명시하고, Jakob의 Self-Attention 제안, Ashish·Illia의 초기 모형, Noam의 scaled dot-product·multi-head·위치 표현 등 기여를 구체적으로 적는다. 인물별 연표의 Vaswani 카드도 이 공동연구의 같은 본문을 열도록 연결한다.'
          ],
          formula:'자체 계산의 Self-Attention:\nX = √d_model · E + PE\nQₕ = XWQₕ, Kₕ = XWKₕ, Vₕ = XWVₕ\nAₕ = softmax(QₕKₕᵀ / √d_k + mask)\nheadₕ = AₕVₕ\nMultiHead = Concat(head₁, …, head_H)WO\nPE(pos, 2i) = sin(pos / 10000^(2i/d_model))\nPE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))\n원문의 하위 층: LayerNorm(x + Sublayer(x))'
        }
      },
      keyIdeas:[
        {title:'단어마다 하나의 뜻 좌표를 고정하는 데서, 문맥 속 출현으로',text:'같은 cat도 누가 보고 있는지와 누구를 보고 있는지가 문장 안에서 달라진다. Transformer는 같은 시작 표현을 쓰더라도 위치와 다른 단어의 정보를 바탕으로 각 출현의 표현을 갱신한다. 그 갱신이 번역에 유용하도록 학습한다.'},
        {title:'먼 말까지, 중간 단어를 하나씩 거치지 않고 참고하다',text:'한 Attention 층에서 떨어진 두 위치를 직접 연결할 수 있다. 문장을 읽는 순환 상태가 중간 위치를 차례로 지나야 하는 구조와 계산 경로가 다르다. 긴 문장에서 항상 정답 관계를 찾는다는 보장과는 구분한다.'},
        {title:'참고할 기준과 가져올 내용을 나누어 배운다',text:'Query·Key로 참고 비중을 만들고 Value로 내용을 가져온다. 여러 Head는 서로 다른 투영으로 이 계산을 나누고 결과를 결합한다. 사람의 눈길을 그대로 복사하거나 Head마다 고정된 의미 역할을 적어 주는 방식은 아니다.'},
        {title:'전체를 읽는 것과, 다음 말을 만드는 것은 참고 범위가 다르다',text:'입력이 이미 주어진 인코더는 앞뒤 문맥을 읽을 수 있다. 생성할 출력의 미래는 아직 없으므로 디코더에서 가린다. 그 상태에서 입력 문장의 표현을 다시 참고하며, 앞선 출력에 이어 다음 말을 만든다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Self-Attention and Generative Models',url:'https://www.youtube.com/watch?v=5vcj8kSwBCY',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 일정의 2월 21일 강의와 연결 영상에서 확인했다. 원저자 Ashish Vaswani와 Anna Huang의 후대 강의이며 2017년 논문 발표 영상과 구분한다. 현재 재생·전체 시청은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Vaswani 외 · Attention Is All You Need · NIPS 2017 출판본',url:paper,location:'11쪽 공식 PDF. p.1 각주: 동등 기여·저자 순서·기여 설명. pp.2–3 §2–3: 동기·인코더·디코더·shifted 입력과 Fig.1. p.4 Fig.2·식 (1): scaled dot-product Attention. pp.4–5: 여러 Head와 세 용도. pp.5–6: 임베딩 스케일·위치 표현. pp.6–8: 계산 경로와 실험 조건. 관련 지면을 렌더해 대조했다.'},
        {title:'Vaswani 외 · arXiv v5 · Attention Visualizations 부록',url:appendix,location:'2017-12-06의 15쪽 원고. p.13 Fig.3: making에서 나가는 여러 Head의 장거리 참고. p.14 Fig.4: layer 5 of 6, Head 5 전체와 its의 Head 5·6. NIPS 출판본에 없는 부록이며 해당 원그림을 직접 렌더했다.'},
        {title:'Jakob Uszkoreit · Google Research 공식 2017년 설명',url:blog,location:'Accuracy and Efficiency 및 The Transformer에서 bank의 문맥과 위치별 표현 갱신을 설명한다. 원저자의 설명을 핵심 질문의 배경으로 사용했다. 블로그의 별도 영불 관찰을 이 카드의 자체 행렬 계산 결과로 제시하지 않는다.'},
        {title:'Stanford CS224N 2019 · 공식 일정',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Feb 21 Self-Attention and Generative Models, Ashish Vaswani·Anna Huang 및 연결된 YouTube 링크를 확인했다. 후대 강의이며 원논문 성능의 근거와 구분한다.'}
      ]
    }
  });
})();
