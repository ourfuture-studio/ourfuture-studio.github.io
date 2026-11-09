/* Bidirectional representation learning. Authored examples never stand in for
 * learned attention, embeddings, or predictions from the original model. */
(function(){
  'use strict';
  const paper='https://aclanthology.org/N19-1423.pdf';
  const at=(page,label)=>({title:'Devlin 외 (2019) · PDF p.'+page+' · '+label,url:paper+'#page='+page});
  const contextScope='bank는 직접 고른 문장의 같은 단어입니다. 색은 그 위치에서 참고할 수 있는 범위이며, 학습된 Attention 비중이나 계산한 의미 벡터가 아닙니다. 문맥의 뜻을 붙인 한국어 설명도 이 카드에서 직접 준비했습니다. 실제 WordPiece 분절·BERT 추론을 실행하지 않습니다.';
  window.AtlasEntries.register({
    id:'bert',
    record:{
      title:'단어의 뜻을, 앞뒤 문맥 속에서 다시 표현하다',
      summary:'제이컵 데블린과 공동연구자들은 단어의 의미를 왼쪽 문맥만으로 정하지 않고, 모든 층에서 앞뒤 문맥을 함께 참고하게 했다. 일부 토큰을 가리고 원래 토큰을 맞히게 하여 그 표현을 학습하고, 배운 가중치를 질문 응답·문장 관계 등의 과제로 옮겼다.',
      detail:'',question:'',
      sources:[{title:'BERT · NAACL 2019 원문·서지',url:'https://aclanthology.org/N19-1423/'},{title:'arXiv · 2018년 첫 원고 기록',url:'https://arxiv.org/abs/1810.04805'},{title:'Google Research · 당시 공식 BERT 코드',url:'https://github.com/google-research/bert'}],
      caveat:'연표는 첫 원고가 공개된 2018년에 놓고, 본문·그림은 NAACL 2019 출판본을 참조한다. 문장·선택 위치는 직접 정한 예이며 원래 모형의 예측·Attention·의미 벡터가 아니다. 마스킹된 정답 라벨과 모형에 주는 입력을 구분한다.'
    },
    content:{
      article:{
        question:'같은 단어도, 뒤에 오는 말을 읽고 나면\n다르게 이해되지 않을까?',
        opening:[
          '“I went to the bank”까지만 읽으면 은행을 말하는지, 강둑을 말하는지 아직 분명하지 않다. 뒤에 “to deposit money”가 오면 은행, “beside the river”가 오면 강둑이라는 문맥이 생긴다. 사람이 글을 이해할 때처럼, 기계도 한 단어를 문장 전체와 연결해 표현할 수 있을까?',
          '제이컵 데블린(Jacob Devlin), Ming-Wei Chang, Kenton Lee, Kristina Toutanova는 Transformer의 인코더를 사용했다. 각 위치가 앞뒤 토큰의 정보를 함께 참고하고, 그렇게 갱신한 표현을 다음 층에서도 다시 섞는다. 왼쪽만 읽은 표현과 오른쪽만 읽은 표현을 마지막에 붙이는 대신, 모든 층에서 두 방향의 문맥을 함께 사용한다.',
          '그런데 입력 전체를 보게 하면서 같은 위치의 단어를 맞히라고 하면, 정답을 그대로 읽는 지름길이 생긴다. BERT의 마스크 언어모형(MLM)은 일부 토큰을 가리거나 바꾼 입력을 주고, 선택한 위치의 원래 토큰을 맞히게 했다. 글 자체가 정답을 제공하지만, 가려진 정답은 입력에 따로 알려 주지 않는다. 주변 말을 연결해 빈자리를 복원하는 오차로 문맥 표현을 배운다는 발상이다.',
          '사전학습이 끝나면 문장 분류, 두 문장의 관계, 글에서 답의 구간 찾기처럼 출력이 다른 과제로 옮긴다. 과제에 맞는 작은 출력층을 붙이고, 정답 자료로 BERT 전체 가중치와 새 출력층을 함께 미세조정한다. 단어를 사전의 고정된 뜻 하나로 보관하는 대신, 그 단어가 놓인 글에 맞는 표현을 다음 과제가 사용할 수 있게 하려 했다.'
        ],
        visual:{
          id:'masked-context',navLabel:'앞뒤 문맥을 연결하다',
          title:'같은 bank, 다른 뒷말. 무엇을 함께 읽게 할까?',
          caption:'뒷말을 바꾸며 bank 위치가 참고할 수 있는 범위를 비교하세요. 이어서 정답을 입력에서 가리는 학습과, 배운 표현을 과제로 옮기는 연결을 원문 그림과 함께 살펴봅니다.',
          stages:[
            {id:'context',label:'앞뒤를 함께 읽다',text:'같은 단어의 표현도 주변 문맥을 반영하게 한다. BERT의 각 위치는 앞뒤를 함께 참고하고, GPT-1은 해당 위치까지의 앞선 문맥을 참고한다. 색은 접근 가능한 범위이지 실제 Attention의 강도가 아니다.'},
            {id:'pretrain',label:'가려진 말을 배우다',text:'입력의 일부를 바꾸고 원래 토큰을 목표로 남겨 둔다. 선택한 위치의 예측 오차가, 앞뒤 문맥을 연결하는 가중치를 학습하게 한다. 사전학습 뒤에는 과제의 정답으로 전체 모형을 조정한다.'},
            {id:'evidence',label:'원문과 연결하다',text:'NAACL 출판본의 Fig.1·2·3을 통해 사전학습과 미세조정, 입력 표현, 문맥을 섞는 방식의 차이를 확인한다. 이 카드에서 만든 문장과 원문 그림을 구분해 읽는다.'}
          ],
          context:{
            examples:[
              {id:'finance',label:'은행이라는 문맥',tokens:['I','went','to','the','bank','to','deposit','money','.'],focusIndex:4,text:'나는 돈을 예금하러 은행에 갔다. bank 뒤의 to deposit money가 금융 문맥을 더한다.',scope:contextScope,source:at(1,'§1 · 모든 층에서 앞뒤 문맥을 함께 조건으로 사용')},
              {id:'river',label:'강둑이라는 문맥',tokens:['I','went','to','the','bank','beside','the','river','.'],focusIndex:4,text:'나는 강 옆의 둑으로 갔다. bank 앞까지는 같지만, 뒤의 beside the river가 강가라는 문맥을 더한다.',scope:contextScope,source:at(1,'§1 · 양방향 문맥 표현')}
            ],
            modes:[{id:'bert',label:'BERT · 앞뒤 문맥',text:'bank 위치가 왼쪽과 오른쪽을 함께 참고할 수 있다. 층마다 문맥 정보를 섞으며 표현을 갱신한다.'},{id:'gpt',label:'GPT-1 · 앞선 문맥',text:'bank 위치의 표현은 그 위치까지 읽는다. bank 뒤의 토큰을 바꾸어도 이 위치의 표현에 그 정보가 들어오지 않는다. 뒤의 다른 위치에서는 이미 읽은 문장 전체를 참고할 수 있다.'}],
            scope:contextScope+' 여기서는 단어를 가리지 않은 표현의 접근 범위를 비교합니다. 아래 MLM에서는 원래 토큰을 학습 목표로 두고 입력을 별도로 바꿉니다.',
            source:at(13,'부록 · Fig.3 · BERT·GPT·ELMo의 사전학습 구조 비교')
          },
          pretrain:{
            example:{
              tokens:['the','cat','sat','on','the','mat','.'],
              selections:[{index:1,kind:'mask'},{index:2,kind:'random',replacement:'blue'},{index:5,kind:'same'}],maskToken:'[MASK]',
              scope:'세 가지 입력 처리와 정답의 관계를 나란히 볼 수 있도록 직접 정한 일곱 토큰 중 세 위치를 골랐습니다. 이 짧은 문장에 15% 비율을 적용한 표본이 아닙니다. random 자리의 blue는 바꾼 입력이며 맞혀야 할 정답은 원래의 sat입니다. 원래 단어를 유지한 mat 자리도 선택됐으므로 MLM 학습 목표에 포함됩니다.',
              source:at(4,'§3.1 · Task #1 · MLM 선택과 입력 처리')
            },
            rates:{population:100,selected:15,conditionalSlots:20,mask:16,random:2,same:2,text:'전체 토큰 중 15%를 예측 대상으로 선택한다. 선택된 대상 안에서 80%는 [MASK], 10%는 임의 토큰, 10%는 원래 토큰을 준다. 두 도표는 서로 다른 분모를 보여 준다. 조건부 비율은 선택 대상 20개 중 16·2·2로 표시했으며 실제 매 입력에서 이 개수를 고정 배분한다는 뜻은 아니다.',source:at(4,'§3.1 · 15% 선택 / 선택된 대상의 80·10·10% 처리')},
            nsp:{
              examples:[
                {id:'next',label:'같은 글에서 이어진 구간',sentenceA:['the','cat','sat','.'],sentenceB:['it','was','tired','.'],isNext:true,explanation:'하나의 글에 이 순서로 이어져 있다고 직접 정한 두 구간이다. 이 경우 IsNext를 목표로 둔다. 문장의 뜻만 보고 모형이 맞혔다고 표시한 결과가 아니다.'},
                {id:'random',label:'다른 글에서 가져온 구간',sentenceA:['the','cat','sat','.'],sentenceB:['the','train','arrived','.'],isNext:false,explanation:'B를 다른 글에서 뽑았다고 직접 정한 경우다. NotNext를 목표로 둔다. 어색한 문장을 골라 판정하는 규칙이나 인간의 상식 점수를 만든 것이 아니다.'}
              ],markers:{cls:'[CLS]',sep:'[SEP]'},
              scope:'원래 NSP 학습 쌍의 50%는 실제 이어지는 B, 50%는 코퍼스에서 무작위로 뽑은 B를 사용한다. 여기서는 두 조건의 입력과 자료에서 정한 라벨만 보여 준다. A·B는 자연어 한 문장씩으로 제한되지 않으며 토큰 구간일 수 있다. NSP를 모든 문장 순서·인과·논리 이해의 검증으로 해석하지 않는다.',
              source:at(4,'§3.1 · Task #2 · Next Sentence Prediction')
            },
            finetune:{text:'같은 사전학습 초기값에서 과제마다 별도로 미세조정한다. 문장 분류는 [CLS]의 최종 표현으로 라벨을 예측하고, 구간형 질문 응답은 본문 토큰마다 답의 시작·끝을 예측한다. 각 과제의 라벨 오차로 기존 BERT와 새 출력층을 함께 조정한다.',scope:'[CLS]가 사전학습만으로 모든 문장의 완성된 의미를 보장하는 벡터라는 뜻은 아니다. 과제마다 출력 방식·학습 자료가 다르다. 위 MLM·NSP·미세조정은 구성과 목표의 연결을 보여 주며 원래 모형의 훈련·판정을 실행하지 않는다.',source:at(5,'§3.2 · 과제별 입출력과 모든 파라미터 미세조정')},
            scope:'바뀐 입력, 선택 위치, 원래 정답을 직접 구성합니다. 선택되지 않은 위치에는 직접적인 MLM 예측 손실을 붙이지 않지만, 그 토큰도 문맥으로 쓰이므로 표현을 만드는 파라미터의 학습에 영향을 줄 수 있습니다. 토큰·segment·position의 번호는 입력 형식이며 학습된 임베딩 벡터 자체가 아닙니다.',
            source:at(5,'Fig.2·§3.2 · 입력 표현과 미세조정')
          },
          evidence:[
            {id:'architecture',file:'bert-2019-pretraining-finetuning.png',title:'글에서 배우고, 과제의 정답으로 조정하다',caption:'Fig.1 왼쪽은 바뀐 입력의 원래 토큰을 맞히는 Mask LM과 두 구간의 연결 여부를 맞히는 NSP다. 오른쪽은 질문과 본문을 함께 읽고 답의 시작·끝 위치를 고르는 미세조정이다. 같은 사전학습 가중치에서 과제별 학습을 시작하며 전체 모형을 조정한다.',scope:'왼쪽의 NSP 분류용 [CLS] 출력과 MLM 토큰 출력은 서로 다르다. 오른쪽은 구간형 질문 응답의 한 구성이다. 모든 과제가 같은 출력층을 사용한다는 뜻이 아니다. 파란 BERT 상자 안의 연결은 학습하는 Transformer 층을 나타낸다.',source:at(3,'Fig.1 · BERT의 사전학습과 미세조정'),credit:{title:'Devlin·Chang·Lee·Toutanova (2019) · Fig.1',url:paper+'#page=3',note:'NAACL 출판본에서 직접 렌더한 원그림입니다. 원래 라벨·화살표를 보존하고 한국어 해설을 그림 밖에 붙였습니다. ACL Anthology의 2016년 이후 자료는 CC BY 4.0으로 제공됩니다.'}},
            {id:'input',file:'bert-2019-input-representation.png',title:'어느 토큰인지, 어느 구간인지, 어디에 놓였는지',caption:'Fig.2는 WordPiece 토큰·구간 A/B·위치의 세 임베딩을 더해 입력을 만드는 모습을 보여 준다. [CLS]와 [SEP]로 경계를 나타내고, 첫 구간과 둘째 구간의 토큰에 서로 다른 segment 임베딩을 더한다.',scope:'그림의 구간 A/B는 반드시 한 문장씩이 아니다. 위치 임베딩은 학습하며 2017년 Transformer의 사인·코사인 위치 계산과 구분한다. 토큰 입력의 시작 표현과 여러 층에서 문맥을 반영한 최종 표현은 다르다. 이 카드의 직접 정한 띄어쓰기 토큰을 원그림의 WordPiece 실행 결과로 표시하지 않는다.',source:at(5,'Fig.2 · BERT 입력 표현'),credit:{title:'Devlin 외 (2019) · Fig.2',url:paper+'#page=5',note:'원그림의 세 임베딩과 합 표시를 보존했습니다. 출처: NAACL 2019 / ACL Anthology, CC BY 4.0. 원래 그림에 새 수치나 학습 결과를 추가하지 않았습니다.'}},
            {id:'context',file:'bert-2019-context-comparison.png',title:'두 방향을 마지막에 붙이는 것과, 층마다 함께 섞는 것',caption:'부록의 Fig.3은 BERT, OpenAI GPT, ELMo의 사전학습 구조를 나란히 그린다. BERT는 모든 층에서 두 방향의 문맥을 함께 사용하고, GPT는 왼쪽에서 오른쪽으로 읽으며, ELMo는 따로 학습한 양방향 언어모형의 표현을 결합한다.',scope:'선의 유무는 구조적 정보 흐름이며 실제 Attention 비중·토큰 간 의미의 정답을 나타내지 않는다. 그림만으로 세 방법의 성능 차이 원인을 모두 분리한 것은 아니다. 서로 다른 사전학습 자료·구조 등의 조건까지 같은 통제 실험으로 해석하지 않는다.',source:at(13,'부록 · Fig.3 · 사전학습 구조 비교'),credit:{title:'Devlin 외 (2019) · Fig.3',url:paper+'#page=13',note:'NAACL 출판본의 비교 그림을 직접 렌더했습니다. BERT·GPT·ELMo의 이름·연결을 보존했습니다. 출처: ACL Anthology, CC BY 4.0.'}}
          ],
          scope:'문맥의 접근 범위, 입력 교체, 원래 정답, 과제로 옮기는 연결을 보여 줍니다. 원래 BERT 가중치·학습된 Attention·의미 벡터·모형의 정답 확률을 불러오거나 벤치마크를 실행하지 않습니다.',
          source:at(3,'§3 · BERT의 전체 구성')
        },
        takeaway:{title:'단어 하나의 뜻을 저장하는 대신, 그 단어가 놓인 글을 함께 읽다',text:'단어를 둘러싼 앞뒤 문맥을 모든 층에서 함께 사용한다. 일부 토큰을 바꾼 입력에서 원래 말을 복원하게 하여 그 연결을 배우고, 배운 표현을 과제의 정답으로 더 조정한다. 문맥에 맞는 표현을 먼저 학습해 여러 언어 과제의 출발점으로 삼은 접근이다.'},
        technical:{
          title:'마스킹·문장 쌍·과제별 출력과 원문 조건 더 읽기',
          paragraphs:[
            'BERT는 Bidirectional Encoder Representations from Transformers의 약자다. 첫 arXiv 원고는 2018-10-11에 공개됐고, 이 카드에서 직접 읽고 그림을 사용한 출판본은 NAACL 2019, 인쇄 pp.4171–4186이다. 연표 연도와 인용 출판 연도를 구분한다. 네 공동저자는 Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova 순이다.',
            'Word2Vec의 한 어휘 항목에 대응하는 공유 임베딩과 달리, BERT의 최종 토큰 표현은 주어진 입력 문맥에 따라 계산된다. Transformer가 문맥을 섞는 구조를 제공하지만, 그 구조만으로 뜻을 이해한다고 가정하지 않는다. 어떤 학습 목표로 파라미터를 조정하고, 그 표현이 실제 과제에 도움이 되는지를 별도로 살핀다.',
            '왼쪽과 오른쪽 문맥을 함께 읽으며 같은 위치의 원래 토큰까지 그대로 입력하면 목표를 복사하는 문제가 생긴다. MLM은 예측 대상 일부를 바꾼 입력을 사용한다. 단, 선택한 대상의 10%는 의도적으로 원래 토큰을 유지하므로 모든 목표가 반드시 가려져 있다는 말도 정확하지 않다. BERT는 어떤 위치가 평가 대상인지 별도 입력 표시를 받지 않는다.',
            '§3.1에서 전체 WordPiece 토큰의 15%를 무작위 예측 대상으로 고른다. 이 선택 대상 중 80%는 [MASK], 10%는 무작위 토큰, 10%는 원래 토큰을 사용한다. 80·10·10의 분모는 전체 입력이 아니라 선택 대상이다. 이 카드의 20개 중 16·2·2 도표는 조건부 비율의 시각화이며 각 문장·배치마다 정확한 개수를 보장하는 규칙이 아니다.',
            '선택한 세 처리 방식 모두 원래 토큰을 정답으로 둔다. random 자리를 blue로 바꾸었어도 정답은 원래 토큰이다. unchanged 자리도 손실 대상에 포함된다. 선택하지 않은 자리에는 직접적인 MLM 예측 손실을 붙이지 않지만, 그 입력은 다른 선택 위치의 문맥으로 사용되므로 그 표현과 공유 파라미터에도 학습 신호가 전달될 수 있다.',
            'MLM은 가린 위치의 최종 은닉 표현을 어휘 softmax로 보내 원래 토큰을 예측한다. 보이는 나머지 입력 전체를 조건으로 사용할 수 있지만, 여러 선택 위치가 있을 때 다른 가린 토큰의 원래 정답 라벨을 입력으로 주지 않는다. 이 카드의 색은 가능한 정보 흐름이며 원래 모형이 학습한 Attention 분포를 추정한 것이 아니다.',
            '§3.1의 NSP는 A 다음에 실제 이어지는 B를 절반, 코퍼스에서 무작위로 고른 B를 절반 사용한다. [CLS]의 최종 표현으로 IsNext 또는 NotNext를 예측한다. 이는 자료의 연결 관계에서 만든 분류 목표다. 문장 사이의 논리·인과를 모두 이해했다는 판정이나, 뒤에 올 임의 문장을 생성하는 목표와 구분한다.',
            '입력은 [CLS] A [SEP] B [SEP]의 형태를 쓸 수 있다. WordPiece 임베딩에 각 토큰의 segment A/B 임베딩과 학습된 위치 임베딩을 더한다. B의 위치 번호를 0에서 다시 시작하지 않는다. 원문에서 sentence는 실제 문법적 문장 하나로 제한하지 않는 연속 텍스트 구간을 가리킨다.',
            '§3.2의 미세조정은 적절한 입출력을 연결하고 모든 파라미터를 함께 조정한다. 문장 분류·문장 쌍 분류는 [CLS] 표현 위의 출력층을 사용한다. 구간형 질문 응답은 질문과 본문을 함께 입력하고, 본문 토큰에서 답의 시작·끝 분포를 학습한다. 토큰 분류는 위치별 표현을 사용한다. 한 출력 형태가 모든 과제에 공통이라는 뜻은 아니다.',
            'BERT는 MLM과 NSP를 함께 사전학습한 모형이다. MLM을 익혔다고 곧바로 문장 분류·질문 응답을 실행한 것이 아니며, 이 카드도 사전학습이나 과제 미세조정을 실행하지 않는다. 미세조정 때 문장 전체를 읽는 구성과, 미래 토큰을 생성하는 시점의 정보 제한은 목적이 다르다. 양방향과 단방향의 차이를 모든 목적에서의 우열로 바꾸지 않는다.',
            '§3의 BERT_BASE는 12층·은닉 768·12개 Head·약 110M 파라미터, BERT_LARGE는 24층·은닉 1024·16개 Head·약 340M 파라미터다. 사전학습 자료는 BooksCorpus 약 800M 단어와 영어 Wikipedia 약 2,500M 단어다. 문장별로 섞은 목록보다 이어지는 구간을 추출할 수 있는 문서 수준 코퍼스를 사용한다. 원문의 설정을 적은 것이며 이 화면에서 해당 자료를 재학습한 결과가 아니다.',
            '§5.1의 Table 5는 BERT_BASE, No NSP, LTR & No NSP, 여기에 BiLSTM을 더한 조건을 비교한다. 원문은 보고한 과제에서 양방향 사전학습과 NSP의 기여를 분석한다. 그러나 LTR 조건은 양방향 여부와 사전학습 목표 등이 함께 달라지므로 표의 모든 차이를 한 요인만의 순수 효과로 읽지 않는다. 원문이 평가한 과제와 조건 밖의 언어 이해까지 결론을 넓히지 않는다.',
            '선택 위치의 토큰을 [MASK]로만 바꾸지 않은 이유는, 미세조정 시 [MASK] 토큰이 나타나지 않는 차이를 줄이고 실제 토큰의 표현도 배우게 하려는 것이다. 부록 C.2의 Table 8은 선택 대상의 처리 비율을 바꾸어 MNLI와 NER 조건을 비교한다. 서로 다른 과제·미세조정/고정 특징 사용 조건을 하나의 공통 성능 수치로 합치지 않는다.',
            '원문의 Fig.3은 구조 비교 그림이지 실제 학습된 Attention 관찰 그림이 아니다. 이 카드의 bank 예시도 원논문 문장이나 그 모형이 산출한 의미 좌표가 아니다. 두 문장의 같은 접두사와 다른 뒷말을 직접 준비해 어떤 정보가 해당 위치에 들어올 수 있는지 비교한다. 원문 그림·직접 구성한 입력·실제로 실행한 입력 변환의 경계를 남겨 둔다.'
          ],
          formula:'변경 전 원래 토큰: x\n예측 대상으로 선택한 위치: M\n선택 위치 일부를 바꾼 입력: x̃\n\nMLM 손실 = −Σᵢ∈M log P(xᵢ | x̃; θ)\n선택하지 않은 위치에는 직접적인 MLM 출력 손실을 붙이지 않는다.\n정답 xᵢ와 변경된 입력 x̃ᵢ를 구분한다.\n위 식은 한 입력의 선택 위치를 합으로 적었다.\n공식 코드는 선택 위치의 가중 평균 MLM 손실과 평균 NSP 손실을 더한다.\n\n원래 사전학습 목표 = MLM + NSP\n미세조정 = 과제별 정답으로 BERT 전체 + 새 출력층 조정'
        }
      },
      keyIdeas:[
        {title:'단어보다, 그 단어가 놓인 문맥을 표현한다',text:'같은 bank라도 뒤에 돈을 예금한다는 말이 오는지, 강이 나오는지에 따라 읽는 문맥이 달라진다. 각 위치의 표현을 입력 전체와 연결해 계산하면, 하나의 고정 임베딩만으로 담기 어려운 쓰임의 차이를 반영할 수 있다.'},
        {title:'정답을 가리는 일이, 문맥을 배울 문제를 만든다',text:'앞뒤를 모두 읽되 선택 위치의 원래 말을 맞히게 한다. 일부 입력을 바꾸어 그대로 복사하는 지름길을 줄이고, 주변 말의 정보를 연결하는 파라미터를 예측의 오차로 조정한다. 사람이 모든 문장에 별도 과제 라벨을 붙이지 않아도 글 자체에서 학습 목표를 만든다.'},
        {title:'양쪽을 따로 읽는 것에서, 층마다 함께 읽는 것으로',text:'BERT는 왼쪽 표현과 오른쪽 표현을 마지막에만 합치는 구성을 넘어, 각 층의 Attention에서 양방향 문맥을 함께 사용한다. 여러 층을 지나며 다른 위치에서 가져온 정보가 다시 다음 위치의 문맥이 된다. Fig.3은 이 구조적 차이를 보여 준다.'},
        {title:'문맥 표현의 가치는, 옮겨 간 과제에서 확인한다',text:'문맥을 잘 표현한다는 말은 벡터 그림만으로 증명되지 않는다. BERT는 그 가중치에서 문장 관계·질문 응답 등의 지도 학습을 시작하고 과제별로 평가했다. 이 카드에서는 학습 목표와 전이 구성을 설명하며 원래 실험의 성능 재현을 주장하지 않는다.'}
      ],
      videos:[{title:'Stanford CS224N (2019) · Contextual Word Embeddings',url:'https://www.youtube.com/watch?v=S-CspeZ8FHc',channel:'Stanford CS224N · 2019 공식 과정',note:'공식 일정의 2월 19일 문맥 표현·사전학습 강의와 연결된 영상이다. BERT를 이해할 배경 강의로 제공하며 원저자 발표로 표시하지 않는다. 영상 전체 시청·세부 구간·현재 재생은 확인하지 않았다.',sourceUrl:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html'}],
      references:[
        {title:'Devlin·Chang·Lee·Toutanova · BERT · NAACL 2019',url:paper,location:'인쇄 pp.4171–4186, PDF 16쪽. §1–3: 양방향 문맥과 연구 질문. Fig.1·2: 사전학습/미세조정과 입력 표현. §3.1: MLM 15%와 80/10/10, NSP. §3.2–4: 과제별 출력·미세조정. §5.1 Table 5: 분석. 부록 Fig.3: 구조 비교. 부록 C.2 Table 8: 마스킹 전략 비교. 출판본의 해당 지면을 렌더해 대조했다.'},
        {title:'ACL Anthology · 공식 서지와 그림 라이선스',url:'https://aclanthology.org/N19-1423/',location:'공동저자 4명·NAACL 2019년 6월·인쇄4171–4186·DOI10.18653/v1/N19-1423 확인. 페이지 하단은 2016년 이후 자료에 CC BY 4.0을 명시한다. 원그림은 출처를 밝히고 외부 한국어 해설을 붙였다.'},
        {title:'arXiv:1810.04805 · 첫 공개와 개정 이력',url:'https://arxiv.org/abs/1810.04805',location:'v1은 2018-10-11, v2는 2019-05-24다. 연표의 2018년은 첫 원고 기준이다. 2019 출판본의 그림·부록 번호를 2018 최초판에 그대로 소급하지 않는다.'},
        {title:'Stanford CS224N 2019 · 공식 일정과 배경 강의',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1194/index.html',location:'Feb 19 Modeling contexts of use: Contextual Representations and Pretraining 일정의 개별 video 링크와 YouTube 제목·영상 ID를 확인했다. 원저자 발표·특정 BERT 구간·현재 재생 확인으로 확대하지 않는다.'},
        {title:'Google Research · BERT 공식 코드',url:'https://github.com/google-research/bert',location:'당시 공식 저장소의 사전학습 데이터 생성과 MLM·NSP 구현을 원문 입력/목표의 보조 확인에 사용한다. 모델 가중치를 내려받거나 원래 학습·벤치마크를 실행한 것은 아니다.'}
      ]
    }
  });
})();
