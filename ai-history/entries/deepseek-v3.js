/* DeepSeek-V3, frozen to the December 2024 first technical-report version. */
(function(){
  'use strict';
  const paper='https://arxiv.org/pdf/2412.19437v1';
  const html='https://arxiv.org/html/2412.19437v1';
  const repo='https://github.com/deepseek-ai/DeepSeek-V3';
  const source={title:'DeepSeek-V3 · 2024년 기술 보고서 v1',url:paper};
  const content={
    article:{
      question:'언어를 배우는 신경망을 크게 만들면서,\n매 단어마다 그 전체를 계산해야 할까?',
      opening:[
        '문장을 이해하고 이어 쓰는 능력을 더 큰 신경망에 담으려면, 학습할 연결뿐 아니라 그 연결을 사용하는 방식도 설계해야 한다. DeepSeek-V3는 Transformer의 언어 예측을 유지하면서, 토큰마다 일부 연결을 선택하고 이미 읽은 문맥의 저장량을 줄이는 방향을 택했다.',
        '원논문 Figure 2의 두 부분은 서로 다른 부담을 다룬다. MLA는 앞서 읽은 토큰을 다시 참고할 때 필요한 키·값 정보를 작은 잠재 벡터로 압축한다. DeepSeekMoE는 공통으로 쓰는 전문가와 입력에 따라 선택하는 전문가를 나누어, 매 토큰이 모든 전문가를 통과하지 않게 한다. 전문가는 사람이 직업이나 과목을 정해 넣은 별도 인물이 아니라 학습되는 신경망 부분이다.',
        '학습 목표도 다음 한 토큰에서 조금 더 앞으로 넓혔다. Figure 3의 Multi-Token Prediction은 추가 토큰을 순차적으로 예측하도록 보조 학습 신호를 준다. 한 번의 추측으로 문장 전체를 완성한다는 뜻은 아니다. 무엇을 기억하고, 어느 연결을 사용하며, 어디까지 예측할지를 함께 바꾸려는 설계다.',
        '이 카드의 기준은 2024년 12월 기술 보고서 첫 판이다. DeepSeek-AI 팀의 공동연구이며, 창업자 량원펑과 공동 기여자 다마이 다이를 인물 연결의 출발점으로 표시한다. 두 사람이 모든 구성요소를 단독으로 만들었다는 의미는 아니다.'
      ],
      visual:{
        id:'frontier-model-reading',modelKey:'deepseek-v3',navLabel:'기억·선택·예측을 나누어 읽기',
        title:'MLA와 MoE의 원도판에서, 다른 계산 부담을 찾아보기',
        caption:'기본 아키텍처는 DeepSeek-V3 v1의 Figure 2다. MTP는 같은 보고서의 별도 Figure 3과 §2.2로 연결한다. 버튼은 원자료의 의미와 범위를 바꾸어 읽으며, 실제 모델의 라우팅·활성값·생성을 실행하지 않는다.',
        reading:{
          intro:'Figure 2의 Attention 쪽에서는 과거 토큰을 어떤 형태로 저장하는지, Expert 쪽에서는 현재 토큰에 어느 신경망 부분을 사용하는지 읽는다. 두 선택은 같은 절약 장치가 아니다. MTP는 이 기본 구조에 더한 학습 목표로 따로 살펴본다.',
          stages:[
            {id:'mla',title:'01 문맥을 다시 볼 정보는 압축해서 저장',figureLabel:'Figure 2 · Multi-head Latent Attention / §2.1.1',idea:'이전 토큰의 키와 값을 모두 큰 형태로 쌓아 두는 대신, 공통 잠재 표현으로 압축해 이후의 주의 계산에 이용한다.',points:['원도판의 압축 경로는 입력 표현에서 키·값의 공통 잠재 벡터로 이어진다.','생성 중 캐시에 남는 잠재 벡터와 위치 정보를 구분한다.','이 장치는 문맥의 KV 캐시를 다룬다. 모델의 모든 가중치를 같은 방식으로 압축한다는 뜻이 아니다.'],source,limit:'원문의 저차원 사영과 위치 정보 분리 원리를 읽는다. 이 화면이 실제 캐시 크기나 긴 문맥 정확도를 측정하지는 않는다.'},
            {id:'moe',title:'02 공통 연결과 토큰별로 선택하는 연결',figureLabel:'Figure 2 · DeepSeekMoE / §2.1.2',idea:'공유 전문가는 공통 변환을 담당하고, 라우터는 현재 토큰에 사용할 일부 전문가를 고른다. 큰 전체 모델과 한 번에 쓰는 계산을 분리하려 했다.',points:['선택 전문가로 가는 경로와 공유 전문가 경로를 함께 본다.','라우터의 선택이 한쪽에 몰리면 계산 장치도 불균형해진다. 보고서는 전문가별 편향을 조절하는 부하 균형 방식을 제시한다.','전문가의 역할은 학습에서 형성된다. 사람이 언어·수학·역사 같은 이름을 붙여 배정한 고정 분업은 아니다.'],source,limit:'일부 활성화가 모든 가중치의 저장·통신 비용을 없애지는 않는다. 보고서의 보조 손실 없는 주된 균형 방식과 보완적인 시퀀스별 보조 손실도 구분한다.'},
            {id:'mtp',title:'03 다음 토큰 너머에도 학습 신호를 주기',figureLabel:'별도 Figure 3 · Multi-Token Prediction / §2.2',idea:'앞으로 나올 추가 토큰까지 순서대로 예측하게 하여, 현재 표현이 조금 더 뒤의 전개에도 도움이 되도록 학습한다.',points:['Figure 2의 기본 구조와 Figure 3의 추가 예측 모듈은 다른 도판이다.','각 예측 깊이에서 앞선 토큰을 사용하는 인과적 순서를 유지한다.','MTP 모듈은 일반적인 생성에서 제외할 수 있고, 보고서는 추측 디코딩에 사용하는 방법도 설명한다.'],source,limit:'추가 예측은 학습 목표다. 모든 미래 단어를 병렬로 확정하거나, 매번 반드시 여러 단어를 수락한다는 뜻은 아니다.'}
          ],
          comparisons:[
            {id:'parameters',title:'전체 크기와 토큰당 활성 크기는 다른 수치',description:'보고서가 구분한 전체 파라미터와 토큰마다 활성화되는 파라미터를 함께 읽는다.',rows:[{label:'주 모델 전체',value:'671B · 주 모델이 보유한 파라미터'},{label:'토큰당 활성',value:'37B · 현재 토큰 처리에 활성화되는 파라미터'},{label:'해석의 범위',value:'37B만 저장하면 되는 모델이라는 뜻은 아니다. 공개 가중치에는 별도의 MTP 모듈도 포함된다.'}],source},
            {id:'burdens',title:'MLA·MoE·MTP가 바꾸는 지점',description:'세 아이디어는 같은 비용을 줄이는 동의어가 아니다.',rows:[{label:'MLA',value:'과거 토큰을 참고하기 위한 KV 캐시 표현'},{label:'MoE',value:'현재 토큰에 사용할 신경망 부분의 선택'},{label:'MTP',value:'미래 토큰 예측을 더하는 보조 학습 목표'}],source},
            {id:'training',title:'기초 능력을 배우기와 응답을 다듬기',description:'모델 구조·사전학습·사후학습을 한 단계로 뭉치지 않는다.',rows:[{label:'사전학습',value:'대규모 텍스트에서 언어 예측을 학습'},{label:'사후학습',value:'지도 미세조정과 강화학습으로 응답을 조정'},{label:'후속 R1 카드',value:'V3-Base 위의 추론 중심 사후학습을 별도 보고서로 읽기'}],source:{title:'DeepSeek-V3 · 공식 공개 저장소의 모델·학습 구분',url:repo}}
          ],
          related:[{id:'transformer',type:'event',label:'Transformer · 문맥을 참고하는 기본 구조'},{id:'deepseek-r1',type:'event',label:'DeepSeek-R1 · 기초 모델 위에서 추론을 학습'}]
        }
      },
      takeaway:{title:'규모를 키우는 일은, 모든 연결을 매번 쓰는 일과 다르다',text:'V3는 언어 예측을 배우는 모델의 크기와 토큰마다 실행할 계산을 나누고, 문맥 저장과 학습 신호도 함께 설계했다. 계산 효율은 구조 하나의 결과가 아니라 메모리·통신·학습 체계가 맞물린 결과로 읽어야 한다.'},
      technical:{
        title:'아키텍처·학습·비용을 구분해서 읽기',
        paragraphs:[
          '기준 판본은 arXiv:2412.19437v1(2024-12-27)이다. §2.1은 MLA와 DeepSeekMoE를 앞선 DeepSeek-V2에서 이어받았다고 설명한다. V3가 주의, 희소 전문가, 잠재 압축이라는 아이디어 자체를 모두 처음 제안했다고 읽지 않는다.',
          '§2.1.1 식(1)–(5)는 같은 입력 표현에서 키·값의 공통 저차원 벡터를 만들고 이를 각 주의 헤드에 연결한다. RoPE를 담는 위치 정보 경로는 따로 둔다. Figure 2의 상자와 선은 이 데이터 흐름을 보여 주며 실제 입력에서 측정한 주의 지도는 아니다.',
          '§2.1.2의 auxiliary-loss-free라는 이름은 모든 학습 손실이 없다는 뜻이 아니다. 전문가 선택 편향을 조절하는 주된 부하 균형 전략과, 극단적인 시퀀스 내 불균형을 막기 위한 작은 보완 보조 손실을 원문이 함께 설명한다.',
          '§2.2는 MTP의 추가 모듈을 기본 언어모델과 함께 학습한다. 이를 일반 추론에서 제외하는 선택과, 추가 토큰을 제안하고 검증하는 추측 디코딩에 활용하는 선택을 구분한다. MTP가 같은 길이의 모든 출력에서 같은 속도 향상을 보장하지는 않는다.',
          '§3의 FP8 혼합 정밀도, 파이프라인과 통신 겹치기 등은 구조를 실제 장비에서 학습시키는 체계다. 보고서의 학습 계산량이나 비용을 회사의 데이터 수집·연구 시행착오·장비 보유·서비스 운영 전체 비용으로 바꾸어 인용하지 않는다.',
          '§4의 기초 모델과 §5의 사후학습 모델은 같은 상태가 아니다. V3 첫 보고서에도 연구 중인 R1 계열의 생성 자료를 활용한 사후학습이 언급된다. 따라서 2024 V3 → 2025 R1이라는 공개 보고서 순서를, 두 연구가 서로 겹치지 않고 차례로 시작했다는 주장으로 해석하지 않는다.',
          '본문의 671B/37B는 보고서의 주 모델 규모 설명이다. 공식 저장소는 공개 가중치에 별도 MTP 모듈이 포함된다는 점도 구분한다. 이 카드에서는 새 정확도·학습 비용·지연을 측정하지 않았으며 최신 V3 후속 버전이나 현재 API의 내부 모델도 검증 대상으로 삼지 않는다.'
        ],
        formula:'원문 아키텍처의 구분\n문맥 저장: 입력 표현 → 키·값 공통 잠재 벡터 + 위치 정보\n토큰 계산: 공유 전문가 + 라우터가 고른 일부 전문가\n학습 목표: 다음 토큰 예측 + 추가 토큰의 순차 예측\n\n671B 전체 / 토큰당 37B 활성\n활성 크기 ≠ 모델 전체의 저장량\n\n원자료에 대한 해석이며 모델 연산·학습 실행 결과는 아님'
      }
    },
    keyIdeas:[
      {title:'기억할 표현과 실행할 연결을 나누어 설계한다',text:'MLA는 문맥을 다시 볼 때 남길 정보를, MoE는 현재 토큰에 쓸 연결을 다룬다. 모델이 클수록 두 부담을 구분해 생각할 필요가 있다.'},
      {title:'전문가는 사람이 적은 규칙 목록이 아니다',text:'연결주의 모델 안에서 학습되는 부분망이다. 희소한 선택 구조라는 이유만으로 심볼릭 추론이나 사람이 정한 직업별 분업으로 분류하지 않는다.'},
      {title:'기초 모델과 대화 응답은 같은 학습 단계가 아니다',text:'언어 예측으로 만든 표현을 기반으로, 시범과 보상으로 응답을 다듬는다. R1에서는 이 기반 위에서 추론 중심 사후학습을 더 깊게 다룬다.'}
    ],
    videos:[],
    references:[
      {title:'DeepSeek-AI · DeepSeek-V3 Technical Report · v1',url:paper,location:'2024-12-27 첫 판. §2.1·Figure 2(PDF p.7)의 MLA/MoE, §2.2·Figure 3의 MTP, §3의 시스템, §4–5의 사전·사후학습, Appendix A의 기여 목록을 기준으로 한다.'},
      {title:'DeepSeek-V3 · 첫 판 HTML 본문',url:html,location:'§2.1.1 식(1)–(5)의 KV 잠재 압축·위치 정보, §2.1.2의 균형 전략과 보완 보조 손실, §2.2의 인과 순서를 유지하는 MTP를 읽었다. Appendix A Research & Engineering에 Damai Dai와 Wenfeng Liang이 함께 명시된다.'},
      {title:'DeepSeek-V3 · 공식 모델 공개 저장소',url:repo,location:'Introduction·Model Summary·Model Downloads에서 전체/활성 규모, Base와 사후학습 모델, R1 계열 자료를 활용하는 설명을 대조한다. 현재 저장소의 설치 안내를 2024년 실험을 직접 재현한 증거로 사용하지 않는다.'}
    ]
  };
  const record={id:'deepseek-v3',year:2024,dateLabel:'2024-12-27 · 기술 보고서 v1',track:'neural',title:'모든 연결을 매번 쓰지 않고, 큰 언어모델을 배우다',subtitle:'DeepSeek-V3 · MLA · MoE · MTP',people:['Liang Wenfeng','Damai Dai'],authorNote:'DeepSeek-AI의 공동연구다. Appendix A Research & Engineering에 Wenfeng Liang·Damai Dai를 포함한 팀의 기여가 기재된다. 여기에 연결한 두 인물은 전체 저자 명단이 아니며, 창업자 역할과 각 방법의 단독 발명을 동일시하지 않는다.',summary:'문맥의 키·값을 압축하는 MLA, 토큰별 일부 전문가를 쓰는 MoE, 추가 토큰 예측을 함께 학습하는 MTP로 규모와 실행 계산을 나누어 설계했다.',detail:'2024년 첫 보고서의 Figure 2에서 MLA와 DeepSeekMoE를 읽고, 별도 Figure 3의 MTP와 사전·사후학습을 연결한다. 전체 파라미터와 활성 파라미터, 구조와 시스템 비용을 구분한다.',question:content.article.question,visual:'network',sources:[source,{title:'DeepSeek-V3 · 공식 저장소',url:repo}],caveat:'2024년 12월 arXiv v1에 한정한다. 원도판의 의미를 읽는 화면이며 실제 모델 추론·학습·라우팅 측정은 실행하지 않는다. 일부 파라미터 활성화가 전체 모델의 저장·통신 비용을 없애지는 않는다. 회사 전체 비용·최신 모델의 성능으로 일반화하지 않는다.',related:['transformer','deepseek-r1'],content};
  if((window.TIMELINE_DATA||[]).some(row=>row.id===record.id))throw new Error('Duplicate DeepSeek-V3 timeline record.');
  (window.TIMELINE_DATA=window.TIMELINE_DATA||[]).push(record);
  window.AtlasEntries.register({id:record.id,record:{...record},content});
  window.AtlasDeepSeekV3Entry=record;
})();
