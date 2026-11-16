/* Keep shared research articles canonical; extend only the selected person histories. */
(function(){
 'use strict';
 const profiles=window.ATLAS_PEOPLE_PROFILES,ctc=window.AtlasGravesCTCEntry,adversarial=window.ATLAS_ADVERSARIAL_GOODFELLOW_WORK;
 const schmidhuber=profiles?.find(p=>p.id==='jurgen-schmidhuber'),goodfellow=profiles?.find(p=>p.id==='ian-goodfellow');
 if(!schmidhuber||!goodfellow||!ctc?.content||!adversarial?.content)throw Error('Load the existing people and both research articles before extending their histories.');
 if(schmidhuber.works.some(w=>w.id===ctc.record.id)||goodfellow.works.some(w=>w.id===adversarial.id))throw Error('A selected research history was already extended.');
 schmidhuber.tagline='기억을 유지하는 구조에서, 정렬을 함께 배우는 목표로';
 schmidhuber.roles=[...schmidhuber.roles,'Graves·Fernández·Gomez와 CTC 공동연구'];
 schmidhuber.intro='긴 시간 전의 입력을 지금의 판단에 사용하려면 무엇을 기억해야 하며, 정답 글자의 시점까지 사람이 표시해야 할까? 1997년 LSTM은 정보를 유지하고 학습 신호를 전달하는 순환망 구조를, 2006년 CTC는 여러 시간 정렬을 합쳐 정답 문자열에서 오차를 만드는 학습 목표를 다룬다. 두 연구를 함께 읽으면 신경망의 기억 구조와 출력에 정답을 연결하는 방법이 다른 설계라는 점을 볼 수 있다. CTC는 Graves·Fernández·Gomez·Schmidhuber 네 사람의 공동연구다. 2015년 종설은 이 개별 방법들과 구분해, 학습의 경로와 역사를 해석한 자료로 읽는다.';
 schmidhuber.works.push({...ctc.record,content:ctc.content});
 goodfellow.tagline='자료를 만드는 학습과, 판단의 취약성을 드러내는 입력';
 goodfellow.roles=[...goodfellow.roles,'Shlens·Szegedy와 적대적 예제 연구'];
 goodfellow.intro='신경망은 그럴듯한 자료를 어떻게 만들며, 사람에게 거의 같은 입력을 왜 다르게 판단할까? 2014년 GAN에서는 생성자와 판별자의 목표를 맞물려 자료의 분포를 학습했다. 2014년 말 사전공개하고 2015년 ICLR에서 발표한 Shlens·Szegedy와의 공동연구에서는, 학습된 모델의 연결값을 고정한 채 오차를 키우는 방향으로 입력을 조금 바꾸어 판단의 취약성을 조사했다. 같은 기울기 계산도 연결값을 학습할 때와 입력을 바꿀 때의 대상과 목적이 다르다. 아래 두 기록은 생성 모델, 적대적 입력, 적대적 학습을 구분해 읽는다.';
 goodfellow.works.push(adversarial);
 schmidhuber.works.sort((a,b)=>a.year-b.year);goodfellow.works.sort((a,b)=>a.year-b.year);
})();
