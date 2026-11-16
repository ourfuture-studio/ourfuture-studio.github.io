/* Extend the existing Williams chronology without replacing the shared 1986 paper. */
(function(){
 'use strict';
 const person=window.ATLAS_PEOPLE_PROFILES?.find(p=>p.id==='ronald-williams'),work=window.ATLAS_WILLIAMS_REINFORCE_WORK;
 if(!person||!work?.content?.article)throw Error('Load Williams and the REINFORCE article before extending the chronology.');
 if(person.works.some(w=>w.id===work.id))throw Error('Duplicate Williams REINFORCE work.');
 person.tagline='정답의 오차와 행동의 보상에서, 배울 신호를 찾다';
 person.roles=[...(person.roles||[]),'Rumelhart·Hinton과 역전파 공동연구','1992 REINFORCE · 보상 학습'];
 person.intro='정답 출력이 주어질 때 중간 표현은 어떻게 배우며, 정답 행동을 직접 알려 주지 않을 때 선택은 어떻게 배울까? 윌리엄스는 루멜하트·힌턴과의 1986년 역전파 공동논문에서 최종 오차를 연결값의 기울기로 전달해 내부 표현을 학습하는 절차를 설명했다. 1992년 REINFORCE에서는 확률적으로 나온 선택의 로그 확률 기울기에 보상 신호를 연결해, 기대 보상을 높이는 학습 방향을 다뤘다. 정답을 맞힐 표현을 배우는 문제와 평가를 받으며 선택 방식을 바꾸는 문제를 함께 읽는 인물이다. 두 연구의 학습 신호는 다르지만, 확률을 만드는 신경망의 기울기를 계산할 때는 역전파와 보상 학습이 연결될 수 있다. 아래에는 기존 1986년 공동논문과 1992년 단독저자 연구를 날짜별로 놓았다.';
 person.works.push(work);person.works.sort((a,b)=>a.year-b.year);
})();
