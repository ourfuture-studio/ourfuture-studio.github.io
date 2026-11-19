/* Applied company work only: do not add this record to the three research lanes. */
(function(){
 'use strict';
 const id='tesla-fsd-v12-2023',day21='https://www.youtube.com/watch?v=j0z4FweCy4M',day22='https://www.youtube.com/watch?v=ODSJsviD_SU',update='https://www.sec.gov/Archives/edgar/data/1318605/000095017024007073/tsla-ex99_1.htm',ai='https://www.tesla.com/AI',manual='https://www.tesla.com/ownersmanual/modely/en_us/GUID-2CB60804-9CEA-4F4B-8B04-09B991368DC5.html';
 const content={article:{question:'눈앞의 사진을 알아보는 데서,\n변하는 도로에 맞춰 행동하는 데로 어떻게 나아갈까?',opening:[
  '운전에서 필요한 것은 사진 한 장에 “차”라는 이름을 붙이는 일만이 아니다. 차가 지나갈 공간, 가려져 보이지 않는 곳, 다른 물체의 움직임과 내가 앞으로 할 행동을 함께 다뤄야 한다. Tesla가 공개한 AI 개발의 질문은 여러 카메라와 여러 시점의 관측을 차량 주변의 표현으로 바꾸고, 그 표현을 행동에 연결하는 것이다.',
  '카메라마다 보이는 방향과 물체의 모양이 다르다. 같은 물체를 서로 다른 위치와 시간에서 본 단서가 모이면 한 장으로는 어려운 공간 관계를 다룰 수 있다. Tesla의 공식 AI 페이지는 카메라별 인식, 여러 카메라 영상의 조감도 표현, 공간·시간에 걸친 자료를 결합한 정답 생성과 궤적 계획을 구분해 설명한다. 실제 연결망 전체나 v12의 모든 중간 표현을 공개한 문서는 아니다.',
  '2021·2022년 AI Day의 인식·계획·점유 네트워크 설명은 v12 이전의 공개 맥락이다. 공간의 점유를 다루면 이름을 붙인 물체 목록에서 한 걸음 더 나아가 어디에 무엇이 있고 어디로 움직일 수 있는지를 표현할 수 있다. 과거에 봤다는 사실만으로 지금도 같은 곳에 있다고 확정할 수는 없다. 아래에서는 관측됨·가려짐·과거 관측을 서로 다른 상태로 둔다.',
  '2023년 말의 v12에서 회사가 밝힌 변화는 학습을 제어 쪽으로 더 이어 간다는 것이다. 2024년 1월 공개된 Q4/FY 2023 자료는 12월 말 초기 배포와 이후 고객 제공, 종단간 학습을 보고한다. 자료는 모든 주행 행동을 직접 코딩하는 대신 AI가 조향·페달·방향지시등 등 제어에 영향을 준다고 설명한다. 비공개 층 수·정확한 손실 함수·내부 계획 표현을 여기서 지어내지 않는다.',
  '학습으로 제어를 연결하는 일과 도로에서 안전하게 작동함을 검증하는 일은 서로 다른 과제다. 과거 운전과 비슷한 출력을 내는지, 자기 행동이 다음 장면을 바꾸는 조건에서도 적절한지, 낯선 환경과 가림에서 실패하지 않는지는 별도로 점검해야 한다. 공식 페이지는 개방 루프·폐쇄 루프·하드웨어 연동 평가를 설명하며, 현재 사용 설명서는 FSD (Supervised)에 지속적인 운전자 주의와 즉시 개입 준비가 필요하다고 명시한다.'
 ],visual:{id:'tesla-fsd-spatial-control',navLabel:'공간 표현에서 감독 아래 제어로',title:'여러 관측을 연결하고, 행동을 배우고, 배포를 검증한다',caption:'공식 공개 자료의 범위에 맞춰 직접 그린 구조와 작은 계산입니다. 도로 영상·Tesla 모델·실차 주행을 실행한 결과가 아닙니다.'},takeaway:{title:'지능을 행동으로 잇는 연결도 학습의 대상이 된다',text:'장면의 이름을 맞히는 것에서 끝나지 않고, 여러 관측의 공간·시간 관계와 행동을 연결하려 했다. 더 많은 부분을 학습한다고 해서 가려진 현재를 항상 알거나 감독 없는 주행이 자동으로 성립하는 것은 아니다.'},technical:{title:'공개한 구조와 이 카드의 계산 범위',paragraphs:[
  'AI Day 2021·2022는 공개 발표 영상이다. 공식 목차에서 Vision·Planning and Control, Occupancy Network·Data Engine 부분을 연결한다. 영상의 도판을 논문 Figure처럼 부르지 않고, 세부 층 이름이나 수를 원자료를 넘어 확정하지 않는다. 현재 AI 페이지의 카메라별 네트워크·조감도·공간/시간 정답 생성 설명은 이 구조를 읽는 별도 근거다. 페이지에 함께 남은 네트워크 수·학습 시간 수치를 v12의 사양으로 사용하지 않는다.',
  'Q4/FY 2023 Update p.3은 2023년 12월 말 v12 초기 배포를, p.10은 일부 직원에서 이후 고객으로 이어진 제공과 end-to-end training을 기록한다. 보고서 공개 시점인 2024년 1월과 사건 시점인 2023년 말을 분리한다. 이전 시스템도 신경망을 사용했으므로 “이전에는 모두 규칙, 이후에는 모두 학습”이라는 구분을 하지 않는다.',
  '공간 화면은 직접 정한 7×7 좌표, 세 방향의 가상 시야, 두 고정 물체와 한 이동 물체다. 카메라의 실제 개수·설치 위치·보정·렌즈·3차원 깊이 추정을 재현하지 않는다. 각 칸 중심까지의 선분이 다른 물체의 사각형과 먼저 교차하면 가린 것으로 계산한다. 칸의 상태는 점유 확률이나 Tesla 신경망의 confidence가 아니다.',
  '선택한 현재 시점보다 미래의 관측을 사용하지 않는다. 과거 시점에서 보였지만 현재 보이지 않는 칸은 “과거만 관측”으로 남기며 현재 점유나 빈 공간으로 칠하지 않는다. 과거의 정답 위치로 현재 가림을 몰래 채우지 않는다. 실제 공간 인식에서 필요한 깊이·좌표 정합·움직임 예측은 이 작은 기하 계산 밖에 있다.',
  '학습 화면의 세 입력과 행동 지표, 초기 연결값·손실·학습률은 직접 정했다. 두 연결값의 선형식을 실제 경사하강으로 바꾸지만 FSD 신경망의 아키텍처·명령 단위·손실이나 학습 데이터를 재현하지 않는다. 따로 남긴 x=1.5의 목표는 연결값 갱신에 사용하지 않으며, 그 한 점의 오차도 실제 주행 안전성 지표가 아니다.',
  '배포 화면의 세 가지 확인은 공식 페이지가 밝힌 평가 도구의 역할을 비교한다. Tesla의 내부 배포 승인 순서·기준값을 재현한 체크리스트가 아니다. 현재 Model Y 설명서는 지역·차량·하드웨어·소프트웨어에 따른 차이, 카메라 가림·환경 영향, 운전자 감독을 명시한다. 현재 사용 조건을 2023년 말의 모든 버전에 그대로 소급하지 않는다.',
  '이 카드는 Tesla AI/Autopilot 팀의 공개 개발 방향을 다룬다. Musk와 연결하는 것은 기업 활동의 경로이며 단독 발명이나 개별 모델 설계를 뜻하지 않는다. 2017–2022년 Karpathy의 역할을 2023년 말 v12의 개발 기여로 바꾸어 적지 않는다. FSD (Supervised)와 별도 Robotaxi 서비스의 운행 조건·안전성은 섞지 않는다.'
 ],formula:'자체 공간 계산: 선택한 카메라의 시야 ∩ 가리지 않은 칸 중심\n현재 보임 → 관측된 빈 칸 / 관측된 점유\n현재 안 보임 + 과거 관측 → 과거만 관측 (현재 미확인)\n\n자체 학습 계산: û = b + w x\nL = (1 / 2N) Σ(ûᵢ − uᵢ)²\n(b,w) ← (b,w) − η ∇L, η=0.2\n위 두 계산은 Tesla의 실제 인식·계획·제어식이 아니다.'}},keyIdeas:[
  {title:'사진의 이름을 넘어, 행동에 필요한 공간을 표현한다',text:'여러 방향·시간의 단서로 공간의 관계와 움직임을 다룬다. 물체를 인식한 결과와 아직 관측하지 못한 영역을 구분해야 한다.'},
  {title:'상황에서 행동으로 이어지는 연결도 데이터로 배운다',text:'v12의 공개 방향은 제어에 영향을 주는 연결까지 학습으로 넓히는 것이다. 이전의 학습된 인식·계획을 없었던 것으로 만들거나, 비공개 내부를 하나의 확정 구조로 그리지 않는다.'},
  {title:'학습·평가·차량 내 사용은 다른 증거를 요구한다',text:'예측 오차와 행동 뒤의 결과, 장치에서의 실행, 운전자 감독을 따로 읽는다. 데이터가 많거나 손실이 내려갔다는 사실에서 안전성을 바로 결론 내리지 않는다.'}
 ],videos:[{title:'Tesla AI Day 2021 · Vision 48:44 / Planning and Control 1:13:12',url:day21+'&t=2924s'},{title:'Tesla AI Day 2022 · Planning 1:04:32 / Occupancy Network 1:12:11',url:day22+'&t=4331s'}],references:[
  {title:'Tesla · AI Day 2021·2022 공식 발표',url:day22,location:'공식 영상 목차 대조. 2021: 48:44 Tesla Vision, 1:13:12 Planning and Control, 1:28:11 Auto Labeling. 2022: 1:04:32 Planning, 1:12:11 Occupancy Network, 1:53:33 Data Engine. 두 영상의 내부 전체 구조를 v12 사양으로 사용하지 않는다.'},
  {title:'Tesla · Q4 and FY 2023 Update · SEC 제출 원문',url:update,location:'p.3 Summary Highlights·각주6: 12월 말 초기 배포, 제어에 대한 AI 영향, 적극적 감독. p.10 Core Technology: 직원 이후 고객·end-to-end training. 보고서 공개는 2024-01-24.'},
  {title:'Tesla · AI / SI & Robotics 공식 기술 페이지',url:ai,location:'2026-11-19 확인. /AI는 /SI로 이동. Neural Networks: camera별·조감도. Autonomy Algorithms: 공간·시간 정답과 궤적. Evaluation Infrastructure: open/closed-loop·hardware-in-loop. 현재 페이지의 수치를 v12 사양으로 옮기지 않는다.'},
  {title:'Tesla · Model Y Owner’s Manual · FSD (Supervised)',url:manual,location:'2026-11-19 확인. About·Before Using·Driver Attentiveness·Visualization: 지속 감독·카메라 가림과 환경·지역/차량/버전별 차이·시각화의 불완전성. 현행 사용 조건으로 읽는다.'}
 ]};
 const work={id,year:2023,dateLabel:'2023년 12월 말 초기 배포 · 2024.01 공식 보고',track:'industry',title:'FSD v12 · 공간을 읽는 AI에서 행동을 배우는 AI로',subtitle:'Tesla · 관측·학습·차량 내 제어·운전자 감독',people:['Tesla AI / Autopilot 팀'],summary:'여러 카메라와 시간의 공간 단서를 행동으로 연결하고, 제어까지 데이터로 학습하려 한 공개 방향을 살펴본다.',detail:'2021·2022년 공개 인식·계획과 2023년 말 v12의 종단간 학습을 구분하고, 자체 관측·작은 학습·배포 평가를 직접 조작한다.',question:content.article.question,visual:'network',sources:[{title:'Tesla · Q4 and FY 2023 Update pp.3·10',url:update}],caveat:'공식 공개 수준과 자체 계산을 구분한다. FSD (Supervised)는 적극적인 운전자 감독이 필요하며 차량을 자율주행차로 만들지 않는다. 비공개 전체 아키텍처·실차 성능·안전성·Robotaxi 운행 조건을 이 카드에서 추정하지 않는다.',related:['tesla-vision-2021'],content};
 if(window.AtlasTeslaFSD)throw Error('Duplicate Tesla FSD work');window.AtlasTeslaFSD=Object.freeze({work});
})();
