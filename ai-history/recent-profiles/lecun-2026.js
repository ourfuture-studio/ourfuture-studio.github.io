/* A dated 2026 research-direction record, preserving every earlier LeCun work. */
(function(){
 'use strict';
 const person=(window.ATLAS_PEOPLE_PROFILES||[]).find(p=>p.id==='yann-lecun');
 if(!person||person.works.some(w=>w.id==='lecun-world-models-2026'))throw Error('An existing LeCun profile and unapplied recent adapter are required');
 const vision='https://openreview.net/pdf/315d43ba26f55357a84cec9a7ed15a6610094f79.pdf',ijepa='https://arxiv.org/pdf/2301.08243',vjepa='https://arxiv.org/pdf/2506.09985',ami='https://amilabs.xyz/';
 const content={
  article:{
   question:'눈앞의 장면을 알아보는 것에서,\n행동했을 때의 다음 장면을 예상하는 지능으로 갈 수 있을까?',
   opening:[
    '컵이 무엇인지 알아보는 능력만으로는 컵을 어느 쪽으로 밀어야 하는지 정할 수 없다. 목표를 이루려면 지금의 상황을 기억하고, 어떤 행동이 어떤 결과로 이어질지 예상하며, 그 결과를 목표와 비교해야 한다. 르쿤의 최근 연구 방향은 장면의 분류에서 이런 예측과 계획의 문제로 이어진다.',
    '2022년의 입장문은 자기지도 학습으로 세계모델을 만들고 여러 추상 수준에서 추론·계획하는 구조를 제안했다. 2023년 I-JEPA 공동연구에서는 같은 이미지의 문맥으로 가려진 부분의 표현을 예측했다. 원래 픽셀을 모두 복원하기보다, 예측에 필요한 관계를 담는 표현을 배우려는 발상이다. 이 이미지 학습을 곧바로 행동 계획이라고 부르지는 않는다.',
    '2025년 V-JEPA 2 공동연구는 두 단계를 나눴다. 먼저 영상에서 가려진 부분의 표현을 예측하며 인코더를 학습한다. 그 인코더를 고정한 뒤 로봇의 상태·행동과 영상으로 미래 표현을 예측하는 V-JEPA 2-AC를 학습한다. 계획할 때는 여러 행동열의 예상 끝 표현을 목표 영상의 표현과 비교하고, 첫 행동만 적용한 뒤 다시 관찰한다.',
    '2026년 AMI Labs 공식 페이지는 르쿤을 창립팀의 한 사람으로 싣고, 표현 공간에서 예측하는 세계모델·기억·계획을 연구 목표로 설명한다. 이 카드는2022년의 구상,2023·2025년의 공동연구,2026년의 회사 연구 방향을 날짜별로 이어 읽는다. AMI의 목표를 이미 구현·검증된 결과로 바꾸어 쓰지 않는다.'
   ],
   visual:{id:'lecun-world-models-2026',navLabel:'관찰·예측·계획을 연결하다',title:'장면의 표현에서, 행동의 결과를 비교하는 계획으로',caption:'원문의 다단계 학습·계획 도식을 먼저 읽고, 직접 만든 격자에서 관찰·목표·배경·장애물·계획 길이를 바꾸며 예측과 재계획의 역할을 살펴봅니다.'},
   takeaway:{title:'모든 세부를 그리는 것과, 행동을 고를 만큼 예측하는 것은 다른 문제다',text:'세계모델은 목표 자체를 정하는 장치와 구분된다. 관찰을 어떤 표현으로 바꿀지, 행동에 따라 무엇을 예측할지, 그 예측으로 어떤 계획을 고를지 함께 설계해야 한다. 실제 결과를 다시 보는 과정도 필요하다.'},
   technical:{title:'원문의 학습·계획과 이 보기의 범위를 더 읽기',paragraphs:[
    '2022년 A Path Towards Autonomous Machine Intelligence는 단독 저자의 입장문이다. 저자는 전통적인 실험·학술논문의 형식과 다른 비전 문서라고 밝히고, 많은 구성요소의 우선권을 주장하지 않는다. 제안된 구조 전체가 완성됐다는 보고로 읽지 않는다.',
    'I-JEPA(2023) Figure3과 §3은 같은 이미지의 문맥으로 여러 표적 블록의 표현을 예측한다. 문맥 인코더와 예측기는 경사로 학습하고, 표적 인코더는 문맥 인코더의 지수이동평균으로 갱신한다. 예측 대상은 이미지 픽셀이 아니라 학습된 표적 표현이다. 영상의 인과적 미래 예측이나 로봇 제어는 이 논문의 직접 과제가 아니다.',
    'V-JEPA 2(2025) Figure2와 §2–3은 가려진 영상 표현 예측의 사전학습과 행동 조건부 후학습을 구분한다. 후학습에서는 인코더를 고정하고, 과거 영상 표현·로봇 행동·말단 상태를 받아 미래 영상의 표현을 예측하는 새 예측기를 학습한다. 그림 왼쪽의 자기지도 예측과 오른쪽의 행동 조건부 예측을 같은 학습으로 합치지 않는다.',
    'V-JEPA 2-AC의 §3.2 식(5)·Figure7은 예측된 끝 표현과 목표 표현의 L1 거리를 최소화할 행동열을 찾는다. 논문은 연속 행동 좌표에 Cross-Entropy Method를 적용하고, 첫 행동만 실행한 뒤 관찰하고 재계획한다. 아래 격자의 유한 전열거·상하좌우 이동·동률 처리와는 다른 최적화다.',
    '아래 계산에서는 위치 두 성분을 사람이 표현으로 정했다. 색 무늬를 제외하는 규칙도 직접 정했으므로, 실제 JEPA가 어떤 정보가 필요한지 학습해 발견했다는 결과가 아니다. 좌표와 이동 규칙은 항상 맞는 것으로 둔 작은 모형이며, 실제 로봇의 관찰 오차·모형 오차·연속 제어를 평가하지 않는다.',
    '2026년 AMI Labs 공식 페이지는 추상적 표현에서 예측하며, 행동의 결과를 예상해 목표에 맞는 행동열을 계획하는 연구 방향을 설명한다. 르쿤의 이름은 창립팀에 확인되지만, 이 카드에서는 별도로 확인하지 않은 구체 직함이나 공개되지 않은 성능을 추가하지 않는다.'
   ],formula:'원문 V-JEPA 2-AC의 계획 관점\n\n현재 관찰 → 인코더 → 현재 표현 z\n목표 영상 → 같은 인코더 → 목표 표현 z_g\n행동열 a₁:T → 예측기 → 예상 끝 표현\n목표 비용 = ‖예상 끝 표현 − z_g‖₁\n첫 행동 적용 → 다시 관찰 → 재계획\n\n이 보기의 별도 규칙\n표현 = [가로 위치, 세로 위치]\n목표 거리 = |x_T − x_g| + |y_T − y_g|\n4^T개 행동열을 모두 열거 (T = 2 또는 4)'}
  },
  keyIdeas:[{title:'분류에서 결과 예측으로 질문을 넓힌다',text:'무엇이 보이는지 알아보는 데서, 어떤 행동 뒤에 상황이 어떻게 달라질지 예측하는 문제로 이어진다.'},{title:'예측할 표현의 수준을 정한다',text:'입력의 모든 픽셀을 맞히는 대신 예측에 필요한 표현을 학습하려 한다. 어떤 정보가 남고 빠지는지는 실제 학습과 과제로 확인해야 한다.'},{title:'모형 안의 계획을 실제 관찰로 되돌린다',text:'행동열의 예상 끝과 목표를 비교해 고르되 첫 행동만 실행한 뒤 다시 본다. 예측을 한 번 얻었다고 전체 미래가 확정되는 것은 아니다.'}],
  videos:[],
  references:[{title:'LeCun · A Path Towards Autonomous Machine Intelligence',url:vision,location:'Version0.9.2,2022-06-27. 입장문 첫쪽의 범위와 자율적 지능·예측 세계모델 구상. 이 카드에서 새 실험 결과로 표시하지 않는다.'},{title:'Assran 외 · I-JEPA 원논문',url:ijepa,location:'CVPR2023·arXivv3. PDF3의 Figure3, PDF3–4 §3. 같은 이미지의 표적 표현·문맥·EMA 표적 인코더와 학습 방식.'},{title:'Assran 외 · V-JEPA 2 원논문',url:vjepa,location:'2025년 공동연구. PDF1 저자·CoreTeam표기, PDF4 Figure2·§2, PDF8–10 §3, PDF10 §3.2 식(5), PDF11 Figure7. 르쿤은 CoreTeam 공동저자다.'},{title:'Meta · V-JEPA 2 공식 프로젝트',url:'https://ai.meta.com/research/vjepa/',location:'영상 자기지도 학습, 행동 조건부 후학습과 로봇 계획을 설명하는 공식 프로젝트 페이지. 기대 응용과 실험 범위를 구분한다.'},{title:'FAIR · V-JEPA 2 공식 코드',url:'https://github.com/facebookresearch/vjepa2',location:'원문 코드·모델 공개처. 이 카드의 격자는 이 코드를 실행한 결과가 아니다.'},{title:'AMI Labs · 2026 공식 연구 방향과 창립팀',url:ami,location:'2026-11-15확인. 표현 공간 세계모델·기억·추론·계획의 연구 목표와 Yann LeCun이 포함된 창립팀. 별도로 확인하지 않은 직함은 표기하지 않는다.'}]
 };
 person.intro+=' 이후에는 관찰에서 세계의 표현을 배우고, 행동의 결과를 예측해 계획하는 지능으로 질문을 넓혔다. 2022년의 구조 제안,2023년 I-JEPA와2025년 V-JEPA 2 공동연구를 거쳐,2026년 AMI Labs의 공식 연구 방향으로 이어지는 기록을 함께 읽는다.';
 person.works.push({id:'lecun-world-models-2026',year:2026,dateLabel:'2026 · AMI 공식 연구 방향 / 2022–2025 선행 연구',title:'JEPA·세계모델에서 AMI Labs로: 표현을 예측하고 행동을 계획하다',summary:'시각 분류에서 표현 공간의 예측과 행동 계획으로 질문을 넓힌 흐름을 읽는다. 2025년 공동연구의 학습·계획 도식과2026년 AMI의 연구 목표를 구분한다.',type:'연구 방향·공동연구 연결',track:'neural',people:['Yann LeCun'],authorNote:'2022년 르쿤의 입장문,2023년 Assran 외 I-JEPA,2025년 Assran 외 V-JEPA 2의 공동연구,2026년 AMI 공식 자료를 날짜별로 구분한다.',sources:[{title:'2022 · 르쿤의 입장문',url:vision},{title:'2023 · I-JEPA 공동연구',url:ijepa},{title:'2025 · V-JEPA 2 공동연구',url:vjepa},{title:'2026 · AMI 공식 연구 방향',url:ami}],caveat:'2026년 기록은 AMI의 공식 연구 방향이다. 원도판은2025년 공동연구에서 가져왔고, 격자·표현·이동 규칙·유한 계획 계산은 직접 작성했다.',related:['lenet','backprop','transformer'],content});
})();
