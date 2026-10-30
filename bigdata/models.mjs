export const SOLVERS = {
"1-02": (inputs) => {
const ok=inputs.clean_status==='success'; return {answer:ok?'집계 시작 허용':'집계 시작 보류',explanation:ok?'정제 성공이라는 선행 조건을 충족했습니다. 집계 자체의 정확성은 별도 검토입니다.':'파일이 저장돼 있어도 정제 성공 조건을 충족하지 못했습니다.',values:{can_start:ok}};
},
"1-03": (inputs) => {
const db=inputs.deliverable==='recovery'; return {answer:db?'DB 운영·보호':'분석모형 개발',explanation:db?'자료를 지속적이고 안전하게 사용할 수 있도록 유지하는 업무입니다.':'자료로 예측 규칙을 만들고 검증하는 업무입니다.'};
},
"1-04": (inputs) => {
const changed=[]; if(Number(inputs.tb)!==1)changed.push('Volume'); if(Number(inputs.rate)!==100)changed.push('Velocity'); if(Number(inputs.formats)!==1)changed.push('Variety'); return {answer:changed.length?changed.join(' · '):'명시한 세 축의 변화 없음',explanation:'기준은 1TB·100건/초·1종류입니다. 바뀐 값만 표시하며 원인이나 성능을 추론하지 않습니다.',values:{changed}};
},
"1-05": (inputs) => {
const map={stored:['데이터 보유 확인','분석·제공·활용은 아직 확인하지 않았습니다.'],calculated:['분석 산출물 확인','계산은 끝났지만 제공과 사용을 확인하지 않았습니다.'],delivered:['서비스 제공 확인','전달은 확인했지만 실제 발주 변화와 효과는 별도입니다.'],used:['업무 활용 기록 확인','사용을 확인했어도 폐기 비용 감소의 인과효과는 별도 비교가 필요합니다.']}; const v=map[inputs.record]; return {answer:v[0],explanation:v[1]};
},
"1-06": (inputs) => {
const d=inputs.issue==='definition'; return {answer:d?'공통 정의와 관리 책임 수립':'현업 협업과 담당자 연결 강화',explanation:d?'같은 도구라도 기간과 집계 기준이 다르면 값이 다릅니다.':'정의가 같다는 조건에서는 현장 맥락과 의사소통을 먼저 점검합니다.'};
},
"1-07": (inputs) => {
const r=inputs.readiness==='ready'?'준비 기반 있음':'운영 준비 취약'; const u=inputs.use==='recorded'?'활용 기록 있음':'활용 미확인'; return {answer:r+' · '+u,explanation:'두 근거를 따로 기록합니다. 사용 기록의 부재를 미사용의 확정이나 효과 없음으로 바꾸지 않습니다.'};
},
"1-09": (inputs) => {
if(inputs.scope==='single') return {answer:'개별 분석 과제의 설계 계획',explanation:'한 과제 안의 조건을 정의합니다.'}; return inputs.dependencies==='yes'?{answer:'과제 간 의존 관계를 나타낸 로드맵',explanation:'A의 결과가 B에, B의 검증이 C에 필요한 순서입니다.'}:{answer:'과제 목록이며 의존 관계 보완 필요',explanation:'여러 이름만 나열해도 실행 순서와 지연 영향이 드러나지는 않습니다.'};
},
"1-10": (inputs) => {
const s=[Number(inputs.a_u)*Number(inputs.a_f),Number(inputs.b_u)*Number(inputs.b_f),Number(inputs.c_u)*Number(inputs.c_f)]; const m=Math.max(...s); const names=['A','B','C'].filter((x,i)=>s[i]===m); return {answer:names.length===1?names[0]+' 1순위':names.join('·')+' 공동 1순위',explanation:'자체 규칙의 곱 점수는 A='+s[0]+', B='+s[1]+', C='+s[2]+'입니다. 동점은 추가 기준이 필요합니다.',values:{scores:s}};
},
"1-12": (inputs) => {
const p=inputs.first==='pattern'; return {answer:p?'상향식 출발':'하향식 출발',explanation:p?'패턴에서 검증할 업무 질문을 만듭니다. 패턴 자체가 원인의 확정은 아닙니다.':'업무 질문에서 필요한 데이터와 분석을 정합니다. 이후 탐색에 따라 반복할 수 있습니다.'};
},
"1-13": (inputs) => {
const m={evaluate:['평가','점수뿐 아니라 업무 목표와 적용 조건을 검토합니다.'],prepare:['데이터 준비','학습 중 오류가 드러나 이전 단계로 돌아가는 것은 절차 위반이 아닙니다.'],model:['모델링','준비한 자료로 예측 규칙을 학습합니다.']}; const v=m[inputs.task]; return {answer:v[0],explanation:v[1]};
},
"1-16": (inputs) => {
if(inputs.purpose==='future')return inputs.available==='before'?{answer:'시점 조건상 입력 후보',explanation:'접수 이전에 확정된 기록이라는 필요조건을 충족했습니다. 목적 적합성과 목표 직접 포함 여부는 별도입니다.'}:{answer:'접수 시점 입력으로 사용 불가',explanation:'예측 뒤 생성된 반품 완료 사유는 당시 알 수 없습니다.'};return {answer:'새 사후 목적에 맞춰 입력 재검토',explanation:'사유 기록을 사용하는 새 과제는 가능성을 다시 검토하되 정답 자체를 넣는 순환과 성능 주장을 구분해야 합니다.'};
},
"1-17": (inputs) => {
if(inputs.pretrained!=='yes')return {answer:'사전학습 재사용에 해당하지 않음',explanation:'이 체험의 전이학습 기준은 먼저 학습한 지식의 재사용입니다. 무작위 초기값은 그 증거가 아닙니다.'};return inputs.frozen==='yes'?{answer:'전이학습: 고정 특징 추출',explanation:'앞부분 표현을 재사용하고 새 출력층을 학습합니다.'}:{answer:'전이학습: 미세 조정',explanation:'기존 가중치를 초기값으로 가져와 새 과제에 맞추어 갱신합니다.'};
},
"1-18": (inputs) => {
const bad=[];if(Number(inputs.latency)>2)bad.push('2초 응답 조건');if(inputs.transfer==='yes')bad.push('외부 전송 금지 조건');return {answer:bad.length?bad.join(' · ')+' 미충족':'제시된 두 운영조건 충족',explanation:bad.length?'점수가 높아도 남은 필수조건을 없애지 못합니다.':'이 두 조건만 통과했습니다. 성능·비용·장애 대응까지 도입 승인한 것은 아닙니다.',values:{time_ok:Number(inputs.latency)<=2,transfer_ok:inputs.transfer!=='yes'}};
},
"1-19": (inputs) => {
const m={delivery:['광고 제공의 근거를 새로 확인','배송 알림 동의를 다른 회사의 광고 제공 동의로 간주하지 않습니다.'],word:['동의의 내용과 적용 범위 확인','동의가 있다는 말만으로 이번 제공의 상대·목적·항목·기간을 확인하지 못했습니다.'],details:['확인한 범위와 나머지 적용 조건 검토','해당 내용을 확인했다는 기록입니다. 다른 조문·하위 규정과 구체적 사실을 포함한 적법성 확정은 이 체험에서 하지 않습니다.']};const v=m[inputs.consent];return {answer:v[0],explanation:v[1]};
},
"1-20": (inputs) => {
const n=Number(inputs.candidates);const linked=inputs.link==='yes';let a=linked?(n===1?'한 후보와의 연결 위험 확인':'여러 후보지만 재식별 위험 검토 필요'):'연결 가능성 추가 조사 필요';return {answer:a,explanation:'후보 '+n+'명은 정해 둔 준식별자 아래의 수입니다. 다른 외부 지식과 제공 환경까지 안전하다고 보장하지 않습니다.',values:{candidates:n,link_confirmed:linked}};
},
"1-21": (inputs) => {
const a=Number(inputs.age1),b=Number(inputs.age2);if(inputs.method==='generalize'){const out=[Math.floor(a/10)*10+'대',Math.floor(b/10)*10+'대'];return {answer:'일반화: '+out.join(' · '),explanation:'개인 행을 유지하고 범주를 넓힙니다.',values:{outputs:out,individual_rows:2}};}if(inputs.method==='aggregate')return {answer:'집계: 평균 '+((a+b)/2)+'세',explanation:'개인 행 대신 두 사람의 평균 하나를 보여줍니다.',values:{mean:(a+b)/2,summary_rows:1}};return {answer:'마스킹: 끝 네 자리 ****',explanation:'특정 문자의 표현을 가립니다. 이 처리가 안전을 자동 보장하지 않습니다.'};
},
"1-22": (inputs) => {
const n=Number(inputs.g1_asthma);if(!Number.isInteger(n)||n<0||n>2)return {answer:'집단 도수는0·1·2 중 정수로 입력',explanation:'두 사람 중 도수를 임의 반올림하지 않습니다.'};const p1=n/2,p2=1/2,p=(n+1)/4;const l1=(n===0||n===2)?1:2;const d1=Math.abs(p1-p),d2=Math.abs(p2-p);const distance=Math.max(d1,d2);const pass=distance<=Number(inputs.threshold)+1e-12;return {answer:'k=2 충족 · distinct l=2 '+(l1>=2?'충족':'미충족')+' · 이진 t '+(pass?'충족':'미충족'),explanation:'두 집단은 각각 2명입니다. 천식 비율은 '+p1+', '+p2+', 전체 '+p+'이며 최대 EMD는 '+distance+'입니다.',values:{k:2,distinct_l_min:l1,group_proportions:[p1,p2],global_proportion:p,max_emd:distance,t:Number(inputs.threshold)}};
},
"1-24": (inputs) => {
const m={json:['반정형','키와 중첩 등 구조 단서가 있지만 고정 관계형 표만으로 이루어지지 않은 교육 사례입니다.'],table:['정형','추출 산출물의 열 의미와 자료형이 정해졌습니다. 원본 음성과 구별합니다.'],audio:['비정형','의미 있는 문의 유형을 읽으려면 내용 해석이 필요합니다. 바이트 구조가 없다는 뜻은 아닙니다.']};const v=m[inputs.representation];return {answer:v[0],explanation:v[1]};
},
"1-26": (inputs) => {
if(inputs.api==='yes')return {answer:'API 명세에 따라 요청·응답 수집',explanation:'필요 필드·권한·조건을 충족한 공식 인터페이스를 사용하고 페이지와 반환 건수를 점검합니다.'};if(inputs.db==='yes')return {answer:'허용된 DB 질의 검토',explanation:'제공 형태가 달라졌으므로 읽기 권한 범위의 표와 질의를 확인합니다.'};return {answer:'허용된 수집 경로 추가 확인',explanation:'이 두 경로가 없다는 이유로 권한을 우회하거나 웹 수집이 자동 허용되지는 않습니다.'};
},
"1-27": (inputs) => {
const batch=inputs.bounded==='yes';return {answer:batch?'끝이 정해진 일괄 처리 예':'계속 증가하는 스트림 처리 예',explanation:'이 사건의 도착 지연은 '+Number(inputs.delay)+'초입니다. 입력의 끝 여부와 지연 값은 다른 조건이며 전체 처리 성능은 측정하지 않았습니다.',values:{delay_seconds:Number(inputs.delay),bounded:batch}};
},
"1-28": (inputs) => {
const elt=inputs.location==='inside';return {answer:elt?'ELT':'ETL',explanation:elt?'목적 분석 DB에 먼저 적재하고 내부에서 변환합니다.':'목적 분석 DB에 넣기 전에 외부에서 변환합니다. 중간 임시 파일은 여기서 목적 적재가 아닙니다.',values:{order:elt?['E','L','T']:['E','T','L']}};
},
"1-29": (inputs) => {
const m={mart:['데이터 마트','부서·주제의 범위가 핵심입니다. 기반 저장 구조와 함께 사용할 수 있습니다.'],warehouse:['데이터 웨어하우스','여러 원천을 정리해 일관된 분석·보고를 지원하는 목적입니다.'],lake:['데이터 레이크','다양한 원본 형태를 담는 저장 접근입니다. 저장만으로 품질이 보장되지는 않습니다.'],lakehouse:['레이크하우스 접근 검토','레이크 기반과 테이블·질의·관리 기능의 결합을 명시했습니다. 실제 기능은 구현을 확인합니다.']};const v=m[inputs.need];return {answer:v[0],explanation:v[1]};
},
"2-01": (inputs) => {
const a=Number(inputs.meanA),b=Number(inputs.meanB),sa=Number(inputs.sdA),sb=Number(inputs.sdB),f=Number(inputs.factor); if(![a,b,sa,sb,f].every(Number.isFinite)||a<=0||b<=0||sa<0||sb<0||f<=0)return {answer:'양수 평균과 음이 아닌 표준편차가 필요합니다',explanation:'이 체험은 양수 비율척도의 요약값만 다룹니다.'};const ca=100*(sa*f)/(a*f),cb=100*(sb*f)/(b*f);const who=Math.abs(ca-cb)<1e-10?'동률':ca>cb?'A':'B';return {answer:`A ${ca.toFixed(1)}%, B ${cb.toFixed(1)}% · ${who}`,explanation:'표준편차를 자기 평균으로 나눕니다. 같은 배율의 단위 변경은 비율을 유지합니다.',values:{cvA:ca,cvB:cb,meanA:a*f,meanB:b*f}};
},
"2-02": (inputs) => {
const m=Number(inputs.mean),s=Number(inputs.sd),q=String(inputs.level);const t={95:2.0638985616280205,99:2.796939504772804};if(!Number.isFinite(m)||!Number.isFinite(s)||s<=0||!(q in t))return {answer:'지원하는 신뢰수준과 양수 s를 입력하세요',explanation:'n=25, 자유도24만 지원합니다.'};const se=s/5,margin=t[q]*se;return {answer:`${q}% 구간 [${(m-margin).toFixed(3)}, ${(m+margin).toFixed(3)}]`,explanation:'정규모집단의 독립 표본, 미지의 모표준편차, n=25를 가정한 양측 t구간입니다. 한 구간에 대한 모수 확률로 해석하지 않습니다.',values:{n:25,df:24,se,margin,width:2*margin}};
},
"2-03": (inputs) => {
const map={'연령별 확률 다름':['MAR','연령별 확률은 다르지만 연령을 조건으로 실제 체중에는 의존하지 않는 규칙입니다.'],'같은 연령에서도 체중 의존':['MNAR','관측 연령을 고려한 뒤에도 빠진 체중 자체가 누락 확률을 바꿉니다.'],'모든 값과 독립':['MCAR','관측값·누락값 모두와 독립입니다. 이는 MAR의 더 강한 특수 경우입니다.'],'발생 규칙 미확인':['기전 미확인','빈칸 패턴만으로 MAR와 MNAR를 일반적으로 구분할 수 없습니다.']};const r=map[inputs.rule];return r?{answer:r[0],explanation:r[1]}:{answer:'규칙을 선택하세요',explanation:'명시된 네 상태만 비교합니다.'};
},
"2-04": (inputs) => {
const r={'사건 건수 X':['이산 건수','0회·1회처럼 사건을 셉니다.'],'이상적 대기시간 T':['연속시간','이상적인 시간 모형은 구간 안의 값을 연속적으로 허용합니다.'],'분으로 반올림한 기록 R':['이산적인 시간 기록','R=round(T)의 기록값은 이산적이지만 원래 T와 측정 대상인 시간의 의미는 구분합니다.']}[inputs.target];return r?{answer:r[0],explanation:r[1]}:{answer:'변수를 선택하세요',explanation:'자료형만으로 측정 대상을 정하지 않습니다.'};
},
"2-05": (inputs) => {
const r={'빈칸':['완전성 문제','필수 값이 없습니다. 빈칸을0점으로 단정하지 않습니다.'],'999':['유효성 문제','값은 있지만0~100의 정수 규칙을 어겼습니다.'],'80인데 원기록60':['정확성 문제','형식은 맞지만 확인한 원기록과 다릅니다.'],'80이고 원기록80':['이 세 검사는 통과','값 존재·허용범위·원기록 일치를 확인했습니다. 다른 품질 차원까지 모두 보증하지 않습니다.'],'80이고 원기록 미확인':['정확성 미확인','존재와 범위는 통과하지만 사실과 일치하는지 추가 근거가 필요합니다.']}[inputs.state];return r?{answer:r[0],explanation:r[1]}:{answer:'상태를 선택하세요',explanation:'필수인0~100의 정수 점수만 다룹니다.'};
},
"2-07": (inputs) => {
const r={'원인 미확인':['원기록·단위·상황 추가 확인','숫자가 크다는 사실만으로 삭제나 대치 근거가 생기지 않습니다.'],'행사 영수증도120':['실제 급증으로 보존 검토','실제 사건이라는 근거가 생겼습니다. 분석 목적과 비교 집단을 함께 기록합니다.'],'원기록12·입력오류확인':['12건으로 정정','희귀성이 아니라 확인한 원기록과 입력오류를 근거로 수정하고 변경 이력을 남깁니다.']}[inputs.evidence];return r?{answer:r[0],explanation:r[1]}:{answer:'확인 사실을 선택하세요',explanation:'자동 삭제 규칙이 아닙니다.'};
},
"2-08": (inputs) => {
const a=Number(inputs.q1),b=Number(inputs.q3),x=Number(inputs.x),k=Number(inputs.factor);if(![a,b,x,k].every(Number.isFinite)||b<a||k<0)return {answer:'Q1≤Q3와 음이 아닌 배수가 필요합니다',explanation:'잘못된 사분위수 순서를 자동으로 바꾸지 않습니다.'};const iqr=b-a,lo=a-k*iqr,hi=b+k*iqr;return {answer:x<lo||x>hi?'울타리 밖 후보 · 오류 미확정':'엄격한 울타리 밖이 아님',explanation:`울타리 [${lo}, ${hi}]와 관측값 ${x}을 비교합니다. 표시와 오류의 원인 판정은 다릅니다.`,values:{iqr,lower:lo,upper:hi,x}};
},
"2-12": (inputs) => {
const a=Number(inputs.min),b=Number(inputs.max),x=Number(inputs.x);if(![a,b,x].every(Number.isFinite)||b<=a)return {answer:'최댓값은 최솟값보다 커야 합니다',explanation:'상수 열의 도구별 특수처리를 이 단순식에 적용하지 않습니다.'};const raw=(x-a)/(b-a),y=inputs.clip==='적용'?Math.min(1,Math.max(0,raw)):raw;return {answer:`변환값 ${y.toFixed(3)}`,explanation:inputs.clip==='적용'?'저장된 기준으로 먼저 변환하고 범위 밖을0~1로 잘랐습니다. 역변환 정보가 손실될 수 있습니다.':'저장된 기준으로만 변환했습니다. 새 값은0~1밖일 수 있습니다.',values:{raw,transformed:y,min:a,max:b,x}};
},
"2-13": (inputs) => {
const m=Number(inputs.mean),s=Number(inputs.sd),x=Number(inputs.x);if(![m,s,x].every(Number.isFinite)||s<=0)return {answer:'양수 표준편차가 필요합니다',explanation:'표준편차0인 기준은 이 식으로 나눌 수 없습니다.'};const z=(x-m)/s;return {answer:`z=${z.toFixed(2)}`,explanation:z===0?'원래값이0이아니라기준평균과같다는뜻입니다.':`기준평균보다 ${z>0?'큼':'작음'}: 표준편차 ${Math.abs(z).toFixed(2)}배 거리입니다.`,values:{x,mean:m,sd:s,z}};
},
"2-14": (inputs) => {
const x=Number(inputs.x);if(!Number.isFinite(x)||x<=0)return {answer:'유한한 실수 로그 없음',explanation:'보정하지 않은 실수 로그의 정의역은 x>0입니다. 0에 상수를 더하면 다른 변환입니다.'};const y=inputs.base==='e'?Math.log(x):Math.log10(x);return {answer:`로그값 ${y.toFixed(3)}`,explanation:`밑 ${inputs.base==='e'?'e':'10'}를명시했습니다. 로그변환이정규성이나성능향상을보장하지는않습니다.`,values:{x,result:y}};
},
"2-15": (inputs) => {
const x=Number(inputs.x);if(!Number.isFinite(x))return {answer:'유한한 값을 입력하세요',explanation:'숫자만 처리합니다.'};const answer=x>=0&&x<10?'낮음':x>=10&&x<=20?'높음':'정의한 범위 밖';return {answer,explanation:answer==='정의한 범위 밖'?'이 규칙은0~20에만 정의했습니다. 임의로 범주를 배정하지 않습니다.':'구간 이름만으로 정확한 원래 값을 복원할 수 없습니다.',values:{x,bin:answer}};
},
"2-16": (inputs) => {
const labels=inputs.order==='파랑·빨강·초록'?['파랑','빨강','초록']:['빨강','파랑','초록'];if(!labels.includes(inputs.color))return {answer:'알려지지 않은 범주',explanation:'새 범주 처리는 별도 정책이 필요합니다.'};const vector=labels.map(x=>x===inputs.color?1:0);return {answer:`[${vector.join(',')}]`,explanation:`열순서:${labels.join('·')}. 한행은하나의색이므로정확히한칸만1입니다.`,values:{labels,vector}};
},
"2-17": (inputs) => {
const q=Number(inputs.quantity),p=Number(inputs.price);if(!Number.isInteger(q)||q<0||!Number.isFinite(p)||p<0)return {answer:'음이 아닌 정수 수량과 단가가 필요합니다',explanation:'다른 주문의 단가나 할인·세금은 이 단순식에 섞지 않습니다.'};const amount=q*p;return {answer:`${amount.toFixed(2)} 천원`,explanation:'같은 주문의 수량×단가입니다. 고객별 총액에는 고객ID와 집계 기간이 더 필요합니다.',values:{quantity:q,unit_price_thousand:p,amount_thousand:amount}};
},
"2-19": (inputs) => {
const x1=Number(inputs.x1),x2=Number(inputs.x2),x4=Number(inputs.x4);if(![x1,x2,x4].every(Number.isFinite))return {answer:'유한한 입력이 필요합니다',explanation:'유한한숫자만 처리합니다.'};if(inputs.mode==='새 축 결합'){const z=.6*x1+.8*x2;return {answer:`추출 · z=${z.toFixed(2)}`,explanation:'두 열을 결합한 새 표현입니다. 이 계수가 학습한 PCA 결과라는 주장은 아닙니다.',values:{z}};}return {answer:`선택 · [${x1},${x4}]`,explanation:inputs.mode==='이름만 바꾼 선택'?'이름을 a·b로 바꿔도 값과 의미를 그대로 남기면 선택입니다.':'원래 열 x1·x4를 그대로 남깁니다.',values:{selected:[x1,x4]}};
},
"2-21": (inputs) => {
const a=Number(inputs.a),b=Number(inputs.b);if(![a,b].every(Number.isFinite)||a<0||a>100||b<0||b>100)return {answer:'0~100%를 입력하세요',explanation:'동일 검증 표본과 정확도 지표를 비교합니다.'};if(inputs.testUsed==='예')return {answer:'시험 독립 평가 경계 깨짐',explanation:'시험 결과로 선택을 바꾸면 같은 시험 점수를 독립적인 최종 평가로 제시할 수 없습니다.'};return {answer:a===b?'검증 동점':a>b?'A 선택':'B 선택',explanation:'미리 정한 검증 정확도로 고릅니다. 이 선택이 미래의 우열을 보장하지는 않습니다.',values:{validationA:a,validationB:b}};
},
"2-22": (inputs) => {
if(inputs.goal==='새 사람'){const ok=inputs.split==='A·B 훈련 C 시험';return {answer:ok?'새 사람 경계 충족':'새 사람 경계 미확인 또는 미충족',explanation:ok?'C의 모든 기록은 훈련에 없습니다. 대표성까지 보장하지는 않습니다.':'같은 사람이 양쪽에 있으면 중복입니다. 시간 정보만으로 사람 분리를 보증할 수는 없습니다.'};}const ok=inputs.split==='1~2월 훈련 3월 시험';return {answer:ok?'미래 예측 순서 충족':'미래 예측 순서 미확인 또는 미충족',explanation:ok?'과거 정보로 이후 시점을 평가합니다. 입력 확정 시점과 간격은 별도로 확인합니다.':'미래로 과거를 평가하거나 사람 정보만으로 시간 순서를 추정하지 않습니다.'};
},
"2-23": (inputs) => {
const a=Number(inputs.a),b=Number(inputs.b);if(![a,b].every(Number.isFinite))return {answer:'유한한 수치를 입력하세요',explanation:'측정 정의를 먼저 선택합니다.'};if(inputs.scale==='색상 코드')return {answer:'배율 해석 불가 · 명목',explanation:'숫자는 범주의 이름입니다.'};if(inputs.scale==='만족도 순위')return {answer:'배율 해석 불가 · 서열',explanation:'순서는 있지만 등간성과 의미 있는 영점을 가정하지 않습니다.'};if(inputs.scale==='섭씨온도')return {answer:'배율 해석 불가 · 등간',explanation:`차이는${b-a}℃입니다. 임의영점의섭씨온도자체의배율은해석하지않습니다.`};if(a<=0||b<0)return {answer:'비율 계산에 양수 분모가 필요합니다',explanation:'0 또는 음수 기준으로 이 배율을 보고하지 않습니다.'};return {answer:`비율척도 · ${(b/a).toFixed(2)}배`,explanation:'명시한 같은 단위에서 온도 또는 중량의 비율을 해석합니다. 다른 물리량의 효과 비율까지 확대하지 않습니다.',values:{ratio:b/a,difference:b-a}};
},
"2-24": (inputs) => {
const a=Number(inputs.v1),b=Number(inputs.v2);if(![a,b].every(Number.isFinite)||a<=0||b<=0)return {answer:'양수 속도가 필요합니다',explanation:'정차 시간이 없는 두 구간만 다룹니다.'};let d,t;if(inputs.mode==='거리 60km씩'){d=120;t=60/a+60/b;}else{d=a+b;t=2;}const avg=d/t;return {answer:`평균 속도 ${avg.toFixed(2)} km/h`,explanation:`총거리${d.toFixed(2)}km를총시간${t.toFixed(2)}h로나눕니다. ${inputs.mode==='거리 60km씩'?'동일거리라조화평균':'동일시간이라산술평균'}입니다.`,values:{distance:d,time:t,average:avg}};
},
"2-25": (inputs) => {
const f=Number(inputs.factor);if(!Number.isFinite(f))return {answer:'유한한 배율이 필요합니다',explanation:'원자료2·4·6을 같은 배율로 변환합니다.'};const x=[2,4,6].map(v=>v*f),m=x.reduce((a,b)=>a+b,0)/3,ss=x.reduce((a,v)=>a+(v-m)**2,0),d=inputs.denominator==='경험분포 분산 n'?3:2,v=ss/d;return {answer:`분산 ${v.toFixed(3)} · 표준편차 ${Math.sqrt(v).toFixed(3)}`,explanation:`평균${m}, 편차제곱합${ss}, 분모${d}입니다. 분모n과n−1은서로다른정의입니다.`,values:{x,mean:m,ss,denominator:d,variance:v}};
},
"2-26": (inputs) => {
const meanShown=inputs.mean==='평균7 표시',outlier=inputs.outlier==='있음';return {answer:`${meanShown?'평균7을 직접 읽음':'평균은 직접 읽을 수 없음'} · ${outlier?'10은 전체 최댓값 아님':'전체 최댓값은 수염 관례 확인'}`,explanation:'중앙선은 주어진 중앙값6입니다. 평균7은 추가로 명시했을 때만 읽으며 원자료에서 역산한 값이 아닙니다.',values:{q1:4,median:6,q3:8,mean:meanShown?7:null,outlier:outlier?15:null}};
},
"2-28": (inputs) => {
const f=Number(inputs.factor);if(!Number.isFinite(f))return {answer:'유한한 배율이 필요합니다',explanation:'원래 자료는 x=[1,2,3], y=[2,4,6]입니다.'};const cov=2*f;if(f===0)return {answer:'공분산 0.00 · r 정의 불가',explanation:'y가 모두0인 상수 열이 되어 표준편차로 나눌 수 없습니다.',values:{covariance:0,correlation:null}};const r=Math.sign(f);return {answer:`공분산 ${cov.toFixed(2)} · r=${r.toFixed(2)}`,explanation:'공분산은 배율을 반영합니다. 상관은 절댓값 배율이 상쇄되고 음수 배율에서는 방향이 뒤집힙니다.',values:{covariance:cov,correlation:r,y:[2*f,4*f,6*f]}};
},
"2-31": (inputs) => {
const k=Number(inputs.classes),m=Number(inputs.students);if(!Number.isInteger(k)||k<1||k>4||!Number.isInteger(m)||m<1||m>20)return {answer:'학급1~4, 학생1~20의 정수를 입력하세요',explanation:'전체는4개 학급, 각20명입니다.'};let total,design;if(inputs.mode==='모든 학급에서 일부'){total=4*m;design=m===20?'전수조사':'층화추출';}else if(inputs.mode==='일부 학급 전원'){total=k*20;design=k===4?'전수조사':'1단계 집락추출';}else{total=k*m;design=k===4?(m===20?'전수조사':'층화추출'):(m===20?'1단계 집락추출':'2단계 집락추출');}return {answer:`${design} · ${total}명`,explanation:'집단의 성격을 추정하지 않고 모든 층에서 뽑는지, 집락을 먼저 선택하는지로 구분합니다.',values:{count:total,population:80}};
},
"2-32": (inputs) => {
const n=Number(inputs.n),full=inputs.frame==='전체 주민',N=full?2000:1000;if(!Number.isInteger(n)||n<1||n>N)return {answer:'표본 수는 선택한 틀의1명~전체 인원 이내여야 합니다',explanation:`현재틀은${N}명이며비복원추출입니다.`};const expectation=full?50:100,variance=full?2500:0,se=Math.sqrt(variance/n*(N-n)/(N-1));return {answer:`기대 표본평균 ${expectation} · 목표 평균 50`,explanation:full?'전 주민에게 선택 기회를 주었습니다. 기대값50이지 이번 실제 표본평균이 항상50이라는 뜻은 아닙니다.':'전화 없음 집단은 여전히 선택 확률0입니다. 틀 안의 표본오차가 작아도 목표평균과 차이50이 남습니다.',values:{sample_n:n,frame_n:N,expected_mean:expectation,target_mean:50,frame_standard_error:se}};
},
"2-33": (inputs) => {
const a=Number(inputs.badA),b=Number(inputs.badB);if(![a,b].every(x=>Number.isInteger(x)&&x>=0&&x<=100))return {answer:'불량 수는0~100의 정수여야 합니다',explanation:'각 공장의 생산100개를 고정합니다.'};const denominator=inputs.condition==='B 확인 → 불량인가'?100:a+b;if(denominator===0)return {answer:'조건부확률 정의 불가',explanation:'불량이0개라 조건 사건의 확률이0입니다.'};const p=b/denominator;return {answer:`${(100*p).toFixed(1)}%`,explanation:`분자B불량${b}개, 조건에맞는분모${denominator}개입니다. 방향을바꾸면분모가달라집니다.`,values:{numerator:b,denominator,probability:p}};
},
"2-34": (inputs) => {
const r=Number(inputs.red),b=Number(inputs.blue),N=r+b,rep=inputs.replace==='복원·독립';if(![r,b].every(x=>Number.isInteger(x)&&x>=0)||N===0||(!rep&&N<2))return {answer:'두 번 추출 가능한 주머니가 필요합니다',explanation:'복원은 적어도1개, 비복원은 적어도2개의 공이 필요합니다.'};const first=r/N,second=r===0?null:rep?r/N:Math.max(r-1,0)/(N-1),p=r===0?0:first*second;return {answer:`두 번 빨강 확률 ${p.toFixed(3)}`,explanation:rep?'매번 복원해 충분히 섞고 독립·균등 추출하므로 같은 확률을 곱합니다.':'첫 빨강 뒤 빨강1개와 전체1개가 함께 줄어듭니다. 빨강이2개 미만이면 두 번 빨강은 불가능합니다.',values:{first,second_if_red:second,both:p,N}};
},
"2-35": (inputs) => {
const p=Number(inputs.p),a=Number(inputs.scale),b=Number(inputs.shift);if(![p,a,b].every(Number.isFinite)||p<0||p>1)return {answer:'확률은0~1이어야 합니다',explanation:'P(X=0)=1−p로 정의합니다.'};const mx=2*p,vx=4*p*(1-p),mean=a*mx+b,variance=a*a*vx;return {answer:`기댓값 ${mean.toFixed(3)} · 분산 ${variance.toFixed(3)}`,explanation:'X는0 또는2이고 Y=aX+b입니다. 위치 이동은 분산을 유지하고 배율은 제곱으로 분산에 반영됩니다.',values:{p0:1-p,p2:p,meanX:mx,varianceX:vx,mean,variance}};
},
"2-36": (inputs) => {
const n=Number(inputs.n),s=Number(inputs.sigma);if(!Number.isInteger(n)||n<1||!Number.isFinite(s)||s<0)return {answer:'양의 정수 n과 음이 아닌 σ가 필요합니다',explanation:'모집단 평균100을 고정합니다.'};if(inputs.iid!=='충족')return {answer:'σ/√n 적용 근거 미확인',explanation:'의존 자료에서는 공분산 항도 필요할 수 있어 이 값으로 표준오차를 확정하지 않습니다.'};const se=s/Math.sqrt(n);return {answer:`평균의 기댓값100 · 표준오차 ${se.toFixed(3)}`,explanation:'평균의 기댓값은100입니다. 개별 관측의 표준편차와 표본평균의 표준오차는 다릅니다. 정규분포 근사의 정확도는 별도입니다.',values:{n,mean:100,individual_sd:s,se,variance_of_mean:s*s/n}};
},
"2-37": (inputs) => {
const p=Number(inputs.p),n=Number(inputs.n);if(!Number.isFinite(p)||p<=0||p>=1||!Number.isInteger(n)||n<1)return {answer:'0<p<1과 양의 정수 n이 필요합니다',explanation:'양 끝의 퇴화분포는 비일치 반례에서 제외합니다.'};const v=p*(1-p)/(inputs.rule==='전체 평균'?n:1);return {answer:`기댓값 ${p.toFixed(2)} · 분산 ${v.toFixed(4)}`,explanation:inputs.rule==='전체 평균'?'전체 평균은 불편하며 이 iid 모형에서 n 증가에 따라 p로 모입니다.':'첫값도 불편하지만 분포가 n과 무관합니다. p=0.5에서 고정 크기 오차의 확률이1인 반례처럼 이 모형에서 p로 모이지 않습니다.',values:{expected:p,variance:v,n}};
},
"2-38": (inputs) => {
const p=Number(inputs.p),a=Number(inputs.alpha);if(!Number.isFinite(p)||!Number.isFinite(a)||p<0||p>1||a<=0||a>=1)return {answer:'p는0~1, α는0과1사이여야 합니다',explanation:'가정이 유효한 검정에서 제공된 p값만 판정합니다.'};return {answer:p<=a?'귀무가설 기각':'귀무가설을 기각하지 못함',explanation:`사전에정한p≤α규칙에서${p}${p<=a?'≤':'>'}${a}입니다. 가설의참일확률·효과크기·β를이수치로대신하지않습니다.`,values:{p,alpha:a,reject:p<=a}};
},
"3-01": (inputs) => {
const a=Number(inputs.a),b=Number(inputs.b); if(!Number.isInteger(a)||!Number.isInteger(b)||a<2||b<2||a>6||b>6)return {answer:'입력 확인',explanation:'수준 수는 2~6의 정수입니다.'}; const main=1+(a-1)+(b-1),extra=inputs.interaction==='on'?(a-1)*(b-1):0; return {answer:main+extra,explanation:`절편 1+A의 ${a-1}열+B의 ${b-1}열+교호작용 ${extra}열입니다. 모든 조합 관측·완전열랭크를 전제합니다.`,values:{intercept:1,A:a-1,B:b-1,interaction:extra}};
},
"3-03": (inputs) => {
if(inputs.design==='independent')return {answer:'Mann–Whitney U',explanation:'짝이 없는 두 독립 표본의 순위를 비교합니다. 중앙값만의 차이로 해석하려면 추가 조건이 필요합니다.'}; if(inputs.symmetric==='yes')return {answer:'Wilcoxon 부호순위',explanation:'독립적인 사람들의 짝별 수치 차이를 만들고 차이 분포의 대칭성을 가정합니다.'}; return {answer:'차이 분포·검정 추가 검토',explanation:'짝은 유지하되 부호순위의 대칭성 가정을 자동으로 부여하지 않습니다. 목표와 척도에 맞는 검정을 다시 검토합니다.'};
},
"3-05": (inputs) => {
const b=Number(inputs.b),s=Number(inputs.shift),ys=[1+s,2+s,3+s]; const rss=ys.reduce((a,y)=>a+(y-b)**2,0),mean=2+s; return {answer:Number(rss.toFixed(6)),explanation:`관측은 ${ys.join(', ')}이고 평균은 ${mean}입니다. 절편 ${b}의 RSS는 잔차 제곱의 합이며 평균에서 2로 최소입니다.`,values:{observations:ys,mean,residuals:ys.map(y=>y-b),rss}};
},
"3-06": (inputs) => {
const p=Number(inputs.p),m=Number(inputs.mult); if(p<=0||p>=1)return {answer:'입력 확인',explanation:'이 체험은 0<p<1에서 로그오즈를 비교합니다.'};const odds=p/(1-p),nextOdds=m*odds,next=nextOdds/(1+nextOdds);return {answer:Number(next.toFixed(6)),explanation:`확률을 곱하지 않고 오즈 ${odds.toFixed(4)}를 ${m}배 한 뒤 확률로 되돌립니다.`,values:{p,odds,multiplier:m,nextOdds,nextProbability:next}};
},
"3-07": (inputs) => {
const a=[inputs.lp,inputs.ln,inputs.rp,inputs.rn].map(Number);if(a.some(v=>!Number.isInteger(v)||v<0||v>20)||a.reduce((s,v)=>s+v,0)===0)return {answer:'입력 확인',explanation:'음이 아닌 정수 도수이며 전체 수는 양수여야 합니다.'};const [lp,ln,rp,rn]=a;const H=(p,n)=>{const t=p+n;if(t===0)return 0;return [p/t,n/t].reduce((s,q)=>s+(q===0?0:-q*Math.log2(q)),0);};const total=lp+ln+rp+rn,parent=H(lp+rp,ln+rn),child=((lp+ln)*H(lp,ln)+(rp+rn)*H(rp,rn))/total,gain=parent-child;return {answer:Number(gain.toFixed(6)),explanation:'부모의 도수도 두 자식의 합으로 다시 만들었습니다. 정보이득은 부모 H에서 크기 가중 자식 H를 뺀 값입니다.',values:{parentEntropy:parent,weightedChildEntropy:child,informationGain:gain,total}};
},
"3-08": (inputs) => {
const ys=[2,4,Number(inputs.last)],pred=inputs.loss==='absolute'?4:ys.reduce((a,b)=>a+b,0)/3;const loss=ys.reduce((s,y)=>s+(inputs.loss==='absolute'?Math.abs(y-pred):(y-pred)**2),0);return {answer:Number(pred.toFixed(6)),explanation:inputs.loss==='absolute'?'절대오차 합을 최소화하는 중앙값 4를 사용합니다.':'제곱오차 합을 최소화하는 세 값의 평균을 사용합니다.',values:{responses:ys,prediction:pred,lossSum:loss}};
},
"3-09": (inputs) => {
const x1=Number(inputs.x1),x2=Number(inputs.x2),z1=x1+x2-1,z2=x1-x2,h1=Math.max(0,z1),h2=Math.max(0,z2),y=h1+2*h2;return {answer:Number(y.toFixed(6)),explanation:'가중합 z₁,z₂를 먼저 구하고 각각 ReLU를 적용한 뒤 h₁+2h₂로 합칩니다.',values:{z1,z2,h1,h2,y}};
},
"3-10": (inputs) => {
const relu=inputs.mode==='relu',pts=[[0,0],[0,1],[1,0],[1,1]],truth=[0,1,1,0];const outputs=pts.map(([a,b])=>{const s=a+b;return relu?Math.max(0,s)-2*Math.max(0,s-1):s-2*(s-1);});const predicted=outputs.map(v=>v>=.5?1:0),errors=predicted.filter((v,i)=>v!==truth[i]).length;return {answer:errors,explanation:relu?'이 명시적 ReLU 구성은 네 XOR 점을 맞춥니다. 훈련 성공을 보장하는 실험은 아닙니다.':'같은 가중치의 아핀 합성은 f=2−x₁−x₂입니다. (0,0)을 틀립니다. 모든 아핀 모형의 한계는 별도의 선형 분리 성질입니다.',values:{points:pts,outputs,predicted,truth,errors}};
},
"3-11": (inputs) => {
const z=Number(inputs.z),fn=inputs.fn,value=fn==='sigmoid'?1/(1+Math.exp(-z)):fn==='tanh'?Math.tanh(z):Math.max(0,z);return {answer:Number(value.toFixed(6)),explanation:fn==='sigmoid'?'sigmoid는 유한 실수에서 수학적으로 (0,1) 범위입니다.':fn==='tanh'?'tanh는 (−1,1) 범위이며 원점값은0입니다.':'ReLU는 음수 입력에서0, 양수에서는 입력을 유지하며 양수 상한이 없습니다.',values:{z,fn,value}};
},
"3-12": (inputs) => {
const rate=Number(inputs.rate),gradient=4,w=inputs.action==='update'?1-rate*gradient:1;return {answer:Number(w.toFixed(6)),explanation:inputs.action==='update'?`기울기4에 학습률${rate}를 곱해 현재 w=1에서 뺍니다.`:'기울기4를 계산했지만 갱신을 실행하지 않아 w=1 그대로입니다.',values:{gradient,wBefore:1,wAfter:w,lossBefore:2,lossAfter:2*w*w}};
},
"3-13": (inputs) => {
const s=Number(inputs.scale),t=Number(inputs.threshold),g=[6*s,8*s],norm=10*s,factor=norm===0?1:Math.min(1,t/norm),clipped=g.map(v=>v*factor),after=norm*factor;return {answer:Number(after.toFixed(6)),explanation:factor<1?'벡터 전체에 같은 배율을 곱해 방향은 유지하고 길이를 줄였습니다.':'문턱 이하이므로 그대로 유지합니다. 작은 기울기를 문턱까지 키우지 않습니다.',values:{before:g,normBefore:norm,factor,after:clipped,normAfter:after}};
},
"3-14": (inputs) => {
const s=Number(inputs.scale);if(s<=0)return {answer:'입력 확인',explanation:'양의 배율만 허용합니다.'};const support=[-s,s],w=1/s,width=2/w;return {answer:Number(width.toFixed(6)),explanation:`경계0은 같지만 지지점은 ±${s}입니다. 정규화 w=${w.toFixed(6)}에서 총 마진2/|w|를 계산합니다.`,values:{points:[-3*s,-s,s,3*s],support,w,b:0,totalMargin:width,distanceToBoundary:s}};
},
"3-15": (inputs) => {
const C=Number(inputs.C),A=1+2*C,B=3,answer=Math.abs(A-B)<1e-10?'같음':A<B?'A':'B';return {answer,explanation:`A는1+2C=${Number(A.toFixed(6))}, B는3+0C=3입니다. C=1에서 같고 전역 최적 SVM을 찾은 계산은 아닙니다.`,values:{C,objectiveA:A,objectiveB:B}};
},
"3-16": (inputs) => {
const both=Number(inputs.both);if(!Number.isInteger(both)||both<0||both>10)return {answer:'입력 확인',explanation:'40거래에서 A10·B20을 고정하므로 동시수는0~10 정수입니다.'};const forward=inputs.direction==='AB',antecedent=forward?10:20,consequent=forward?20:10,confidence=both/antecedent,lift=confidence/(consequent/40);return {answer:Number(confidence.toFixed(6)),explanation:`신뢰도는 동시${both}/선행${antecedent}입니다. 향상도는 이를 후행 기본비율${consequent}/40으로 나눕니다.`,values:{support:both/40,confidence,lift,N:40,A:10,B:20,both}};
},
"3-20": (inputs) => {
const eps=Number(inputs.eps),min=Number(inputs.min),points=[0,.1,.2,2],neighbor=points.map(x=>points.map(y=>Math.abs(x-y)<=eps+1e-12)),counts=neighbor.map(a=>a.filter(Boolean).length),core=counts.map(n=>n>=min),clustered=points.map((x,i)=>core[i]||core.some((c,j)=>c&&neighbor[i][j])),noise=points.filter((x,i)=>!clustered[i]),roles=points.map((x,i)=>core[i]?'핵심':clustered[i]?'경계':'잡음');return {answer:noise.length,explanation:'자기 자신도 셉니다. 핵심점이 아니어도 핵심점 이웃이면 경계점으로 속하며, 어느 핵심점의 이웃도 아니면 잡음입니다.',values:{points,counts,roles,noise}};
},
"3-21": (inputs) => {
const target=Number(inputs.target)/100,eigen=[6,3,1],cumulative=[];let sum=0;for(const e of eigen){sum+=e;cumulative.push(sum/10);}const k=cumulative.findIndex(p=>p+1e-12>=target)+1;return {answer:k,explanation:`누적비율60%,90%,100% 중 기준${Number(inputs.target)}% 이상인 첫 위치를 고릅니다. 정확도 기준이 아닙니다.`,values:{eigen,cumulative,minimumComponents:k}};
},
"3-22": (inputs) => {
const d=Number(inputs.d);if(!Number.isInteger(d)||d<0||d>5)return {answer:'입력 확인',explanation:'d는 0~5 정수입니다.'};const observed=[[10+d,10-d],[10-d,10+d]],chi=4*d*d/10;return {answer:Number(chi.toFixed(6)),explanation:`행·열 합 20, 전체 40이 유지돼 네 기대빈도는 모두 10입니다. 보정 없는 χ²는 4×${d}²/10입니다.`,values:{observed,expected:[[10,10],[10,10]],chi2:chi}};
},
"3-23": (inputs) => {
if(inputs.design==='repeated')return {answer:'반복측정 설계 검토',explanation:'같은 사람의 측정끼리 독립이 아니므로 이 글의 독립 집단 일원 모형을 그대로 적용하지 않습니다. 반복 구조를 반영하는 분석을 검토합니다.'};if(inputs.responses==='1')return {answer:'일원 ANOVA',explanation:'독립 세 집단의 한 반응 모평균을 비교하는 기본 질문입니다. 가정 진단은 별도로 필요합니다.'};return {answer:'일원 MANOVA',explanation:'같은 사람에게 함께 측정한 두 반응을 벡터로 묶어 독립 세 집단의 모평균벡터를 비교합니다.'};
},
"3-24": (inputs) => {
const U=.5*Number(inputs.x1)+.5*Number(inputs.x2),V=Number(inputs.y1)+Number(inputs.y2)-Number(inputs.y3);return {answer:`U=${Number(U.toFixed(6))}, V=${Number(V.toFixed(6))}`,explanation:'가중치는 고정입니다. 한 사람의 두 점수를 만들었을 뿐이며 여러 사람의 자료로 CCA 가중치를 학습하거나 상관을 추정하지 않았습니다.',values:{U,V,weightsX:[.5,.5],weightsY:[1,1,-1]}};
},
"3-25": (inputs) => {
const ar=.5*Number(inputs.pastW),ma=.2*Number(inputs.pastError),difference=ar+ma,level=Number(inputs.lastY)+difference,answer=inputs.output==='level'?level:difference;return {answer:Number(answer.toFixed(6)),explanation:inputs.output==='level'?'한 단계 차분 예측에 마지막 원수준을 더해 차분을 되돌립니다.':'과거 차분의 AR기여와 과거 혁신의 MA기여를 더합니다. 새 혁신의 조건부 기대는0입니다.',values:{ar,ma,difference,level}};
},
"3-27": (inputs) => {
const n=Number(inputs.n),L=Number(inputs.L),h=Number(inputs.h);if(![n,L,h].every(Number.isInteger)||n<1||L<1||h<1)return {answer:'입력 확인',explanation:'관측 수·길이·수평은 양의 정수입니다.'};const count=Math.max(0,n-L-h+1),pairs=[];for(let i=0;i<count;i++)pairs.push({inputStart:i+1,inputEnd:i+L,target:i+L+h});return {answer:count,explanation:`간격1에서 n−L−h+1=${n-L-h+1}이며 음수면 완전한 쌍은0개입니다. 입력 끝t에 정답t+h를 붙입니다.`,values:{n,L,h,pairs}};
},
"3-28": (inputs) => {
const prior=Number(inputs.prior),a=prior*Number(inputs.likeA),b=(1-prior)*Number(inputs.likeB),total=a+b;if(total===0)return {answer:'관찰확률 0',explanation:'이 모형에서 경고 확률이0이므로 경고를 조건으로 한 사후확률을 이 식으로 정의할 수 없습니다.',values:{jointA:a,jointB:b,evidence:total}};const p=a/total;return {answer:Number((100*p).toFixed(6)),explanation:'A와 경고의 결합확률을 모든 경고의 확률로 나눴습니다. 출력 단위는%이며 기대빈도 환산과 실제 관측은 구별합니다.',values:{jointA:a,jointB:b,evidence:total,posterior:p}};
},
"3-29": (inputs) => {
const p=Number(inputs.prior),scoreA=p*Number(inputs.a1)*.5,scoreB=(1-p)*Number(inputs.b1)*.5,total=scoreA+scoreB;if(total===0)return {answer:'관찰확률 0',explanation:'모든 클래스 점수가0이라 정규화할 수 없습니다.',values:{scoreA,scoreB}};const posterior=scoreA/total;return {answer:Number(posterior.toFixed(6)),explanation:'두 번째 특성 가능도는 양 클래스에서0.5로 고정합니다. 클래스 조건부 독립을 가정해 사전과 두 가능도를 곱한 뒤 점수 합으로 나눕니다.',values:{scoreA,scoreB,posterior,classification:scoreA>scoreB?'A':scoreA<scoreB?'B':'동률'}};
},
"3-30": (inputs) => {
const rate=Number(inputs.rate),next=[2+rate,2+3*rate],rss=(3-next[0])**2+(5-next[1])**2;return {answer:`(${Number(next[0].toFixed(6))},${Number(next[1].toFixed(6))})`,explanation:`기존 (2,2)에 보정 (1,3)의 ${rate}배를 더합니다. 이 두 가상 훈련점의 RSS만 계산하며 일반화는 측정하지 않습니다.`,values:{before:[2,2],correction:[1,3],after:next,target:[3,5],trainingRSS:rss}};
},
"3-31": (inputs) => {
const k=Number(inputs.k);let c=1;for(let i=1;i<=k;i++)c=c*(5-i+1)/i;return {answer:Math.round(c),explanation:k===5?'후보가 전체 5개라 가능한 집합은 하나입니다. 행 부트스트랩을 사용하면 나무별 행 무작위성은 별도로 남습니다.':'5개 중 2개 후보 집합은 10가지입니다. 노드마다 후보를 선택할 수 있고 한 나무의 고정 2열과 다릅니다.',values:{features:5,candidates:k,possibleSubsets:Math.round(c)}};
},
"3-32": (inputs) => {
const p3=Number(inputs.p3),ps=[.51,.51,p3],mean=ps.reduce((s,p)=>s+p,0)/3;const labels=ps.map(p=>p>=.5?1:0),hard=labels.reduce((s,p)=>s+p,0)>=2?1:0,soft=mean>=.5?1:0;return {answer:`하드 ${hard} / 소프트 ${soft}`,explanation:'이 체험은 확률이 0.5 이상이면 범주1로 둡니다. 하드는 레이블의 표 수, 소프트는 세 확률의 평균으로 결정합니다.',values:{probabilities:ps,labels,meanProbability:mean,hard,soft}};
},
"3-33": (inputs) => {
const N=4,tf=2,df=Number(inputs.df);if(!Number.isInteger(df)||df<1||df>N)return {answer:'입력 확인',explanation:'DF는1~4 정수입니다.'};const idf=inputs.mode==='smooth'?Math.log((N+1)/(df+1))+1:Math.log(N/df),weight=tf*idf;return {answer:Number(weight.toFixed(6)),explanation:inputs.mode==='smooth'?'평활화와+1이 있는 IDF를 적용한 정규화 전 TF-IDF입니다. scikit-learn 기본 최종 L2정규화 출력과 같다고 보지 않습니다.':'본문의 IDF=ln(N/DF), TF원시빈도2, 벡터정규화없음 조건입니다.',values:{N,tf,df,idf,unnormalizedTFIDF:weight}};
},
"3-34": (inputs) => {
const words=['새벽','기차','출발'],i=Number(inputs.center),center=words[i],context=words.filter((w,j)=>Math.abs(j-i)===1);const answer=inputs.mode==='cbow'?`CBOW: ${context.join('·')}→${center}`:`Skip-gram: ${context.map(w=>`${center}→${w}`).join(', ')}`;return {answer,explanation:inputs.mode==='cbow'?'주변 표현을 함께 입력해 중심 한 단어를 목표로 합니다.':'중심 한 단어에서 반경1의 주변 단어를 각각 목표로 합니다. 문장 경계를 넘지 않습니다.',values:{center,context,pairs:inputs.mode==='skip'?context.map(w=>[center,w]):[[context,center]]}};
},
"3-35": (inputs) => {
const xs=inputs.order==='reverse'?[0,2]:[2,0],rho=Number(inputs.rho),states=[0];for(const x of xs)states.push(rho*states[states.length-1]+x);return {answer:Number(states[2].toFixed(6)),explanation:`항등 활성화 순환식 hₜ=${rho}hₜ₋₁+xₜ를 순서대로 계산합니다. rho=1이면 이 고정 식의 두 순서는 같은 합이 됩니다.`,values:{inputs:xs,states,rho}};
},
"3-36": (inputs) => {
const a=Number(inputs.a);if(a<0||a>1)return {answer:'입력 확인',explanation:'첫 가중치는0~1, 둘째는1−a입니다.'};const b=1-a,y=a*2+b*6;return {answer:Number(y.toFixed(6)),explanation:`Value2에 ${a}, Value6에 ${b}를 곱해 합합니다. 이 예제는 이미 주어진 가중치의 집계이며 QK 점수 학습이 아닙니다.`,values:{weights:[a,b],values:[2,6],contributions:[a*2,b*6],output:y}};
},
"3-37": (inputs) => {
const reconstructed=[Number(inputs.r1),Number(inputs.r2)],original=[2,4],errors=original.map((x,i)=>x-reconstructed[i]),mse=errors.reduce((s,e)=>s+e*e,0)/2;return {answer:Number(mse.toFixed(6)),explanation:'각 좌표의 오차를 먼저 제곱해 더한 뒤 좌표 수2로 나눕니다. 오차 합0이어도 완벽한 복원이 아닐 수 있습니다.',values:{original,reconstructed,errors,errorSum:errors[0]+errors[1],mse}};
},
"3-38": (inputs) => {
const transition=Number(inputs.transition),joint=.8*.9*transition*.7;return {answer:Number(joint.toFixed(6)),explanation:'초기 정상0.8 × 첫 낮음 방출0.9 × 정상→마모 전이 × 마모의 높음 방출0.7입니다. 다른 상태 경로를 합하지 않았습니다.',values:{initial:.8,firstEmission:.9,transition,secondEmission:.7,pathObservationJoint:joint}};
},
"4-01": (inputs) => {
const k=Number(inputs.k);if(!Number.isInteger(k))return {answer:'범주 수는 정수로 입력',explanation:'도수표의 칸 수입니다.'};if(inputs.estimate==='raw')return {answer:'근사 조건 추가 확인',explanation:'원자료 추정치를 대입한 결과를 구간도수 효율적 MLE와 같은 기준분포로 자동 처리하지 않습니다.'};const p=inputs.estimate==='grouped'?1:0;return {answer:k-1-p,explanation:'고정 총합 제약1개와 같은 도수에서 추정한 모수 '+p+'개를 뺍니다. 독립성·기대도수·정규적 추정 조건을 전제합니다.',values:{k,estimated_parameters:p,df:k-1-p}};
},
"4-02": (inputs) => {
const k=Number(inputs.final_k),p=inputs.parameters==='fit'?2:0;if(!Number.isInteger(k))return {answer:'구간 수는 정수로 입력',explanation:'최종 도수표의 칸 수입니다.'};const df=k-1-p;return {answer:df>0?df:'양의 자유도 확보 필요',explanation:'병합 전8이 아니라 최종 '+k+'에서 합계 제약1과 추정 모수 '+p+'를 뺍니다. 근사 조건 자체는 별도 확인입니다.',values:{final_k:k,p,df}};
},
"4-03": (inputs) => {
const m={rows:['filter','관심 자료의 범위를 줄입니다.'],style:['refine','이미 정한 기본 표현의 가독성을 다듬습니다.'],form:['represent','기본 시각 형식을 정합니다. 시간 순서 없이 범주를 선으로 잇는 것이 적절한지는 별도입니다.']};const v=m[inputs.change];return {answer:v[0],explanation:v[1]};
},
"4-04": (inputs) => {
const tp=Number(inputs.tp),fp=Number(inputs.fp),fn=Number(inputs.fn),tn=Number(inputs.tn);const p=tp+fp?tp/(tp+fp):null,r=tp+fn?tp/(tp+fn):null;const fmt=x=>x===null?'정의 불가':String(Math.round(x*10000)/100)+'%';return {answer:'정밀도 '+fmt(p)+' · 재현율 '+fmt(r),explanation:'정밀도 분모는 '+(tp+fp)+', 재현율 분모는 '+(tp+fn)+'입니다. TN은 이 두 분모에 직접 들어가지 않습니다.',values:{precision:p,recall:r,predicted_positive:tp+fp,actual_positive:tp+fn,total:tp+fp+fn+tn}};
},
"4-06": (inputs) => {
const tp=inputs.found==='yes'?1:0,fp=Number(inputs.fp),fn=1-tp,tn=99-fp;const acc=(tp+tn)/100,rec=tp,pre=tp+fp?tp/(tp+fp):null,bal=(rec+tn/99)/2;return {answer:'정확도 '+(acc*100).toFixed(0)+'% · 재현율 '+(rec*100).toFixed(0)+'%',explanation:'양성 누락 '+fn+'건, 오경보 '+fp+'건입니다. 오류 비용을 정하지 않고 하나의 모형이 항상 낫다고 결론내리지 않습니다.',values:{TP:tp,FP:fp,FN:fn,TN:tn,precision:pre,balanced_accuracy:bal}};
},
"4-07": (inputs) => {
const p=[.9,Number(inputs.positive2)],n=[.8,.2],threshold=Number(inputs.threshold);let wins=0,ties=0;for(const a of p)for(const b of n){if(a>b)wins++;else if(a===b)ties++;}const auc=(wins+.5*ties)/4,tpr=p.filter(x=>x>=threshold).length/2,fpr=n.filter(x=>x>=threshold).length/2;return {answer:auc,explanation:'네 쌍에서 승리 '+wins+'개·동점 '+ties+'개입니다. 현재 TPR='+tpr+', FPR='+fpr+'이며 임곗값만 바꿔도 AUC는 바뀌지 않습니다.',values:{auc,wins,ties,TPR:tpr,FPR:fpr}};
},
"4-08": (inputs) => {
const e=[Number(inputs.e1),Number(inputs.e2),Number(inputs.e3)],mae=e.reduce((a,b)=>a+Math.abs(b),0)/3,mse=e.reduce((a,b)=>a+b*b,0)/3;return {answer:mse,explanation:'제곱한 뒤 평균합니다. MAE='+mae+', MSE='+mse+', RMSE='+Math.sqrt(mse)+'입니다. MSE만 목표 단위의 제곱입니다.',values:{MAE:mae,MSE:mse,RMSE:Math.sqrt(mse),errors:e}};
},
"4-14": (inputs) => {
const statistic=Number(inputs.estimate)/Number(inputs.se),critical=2.2281388519649385,reject=Math.abs(statistic)>=critical;return {answer:reject?'H0 기각':'H0 기각하지 못함',explanation:'t='+statistic+'이고 고정 df10·양측 α=.05의 임계 |t|는 약2.2281입니다. 기각 실패가 효과 없음의 증명은 아닙니다.',values:{t:statistic,df:10,alpha:.05,critical,reject}};
},
"4-15": (inputs) => {
const n=Number(inputs.n),p=Number(inputs.p),ssr=Number(inputs.ssr),sse=Number(inputs.sse),df=n-p-1;if(!Number.isInteger(n)||!Number.isInteger(p)||df<=0)return {answer:'양의 잔차 자유도 필요',explanation:'n과 p는 정수이고 n>p+1이어야 합니다.'};const msr=ssr/p,mse=sse/df;return {answer:msr/mse,explanation:'F=(SSR/p)/(SSE/(n−p−1))입니다. 기울기1개인 동일 조건의 양측 검정에서는 F=t²입니다.',values:{F:msr/mse,df_numerator:p,df_denominator:df,MSR:msr,MSE:mse}};
},
"4-16": (inputs) => {
const p=Number(inputs.probability),positive=8,negative=2,predicted=p>=.5?1:0,accuracy=predicted?positive/10:negative/10,brier=(positive*(1-p)**2+negative*p*p)/10;return {answer:Math.round(brier*1e12)/1e12,explanation:'임곗값.5에서 정확도는 '+(accuracy*100)+'%, 확률 제곱오차 평균은 '+(Math.round(brier*1e12)/1e12)+'입니다. 이 작은 상수 예시로 전체 보정·적합도를 확정하지 않습니다.',values:{probability:p,accuracy,brier,observed_positive_fraction:.8}};
},
"4-20": (inputs) => {
const a=Number(inputs.activation),p=Number(inputs.drop_p),training=inputs.mode==='train';const out=!training?a:(p===0?a:(inputs.mask==='kept'?a/(1-p):0));return {answer:out,explanation:training?'살아남은 값은 유지확률로 나눕니다. 확률모형의 기대값은 원 활성값과 같으며 이번 한 번의 출력과 다릅니다.':'통상 평가에서는 무작위 비활성화를 끄므로 원 활성값을 전달합니다.',values:{output:out,expected_training_output:a,training,drop_probability:p}};
},
"4-21": (inputs) => {
const won=Number(inputs.won),correct=inputs.conversion==='apply',x=correct?won/1000:won;return {answer:2*x,explanation:correct?'입력 단위는 천원 명세에 맞췄습니다. 목표 정답이 없어 실제 예측 오차는 아직 모릅니다.':'원 숫자를 천원 입력으로 잘못 전달했습니다. 이 출력 차이가 곧 전체 정확도 하락 수치는 아닙니다.',values:{model_input:x,output:2*x,conversion_applied:correct}};
},
"4-23": (inputs) => {
const space=Number(inputs.depths)*Number(inputs.rates),candidates=inputs.method==='grid'?space:Number(inputs.trials),fits=candidates*Number(inputs.folds),uses_previous=inputs.method==='bayes';return {answer:fits,explanation:'후보 '+candidates+'개×'+Number(inputs.folds)+'fold='+fits+'회입니다. '+(uses_previous?'베이지안은 이전 결과와 대리모형을 사용합니다.':'고정 격자·지정 무작위 추출은 이 체험에서 이전 점수로 후보를 적응 선택하지 않습니다.')+' 최종 재적합은 제외합니다.',values:{space_size:space,evaluated_candidates:candidates,fits,uses_previous_results:uses_previous}};
},
"4-25": (inputs) => {
const truth=0,a=1,b=Number(inputs.prediction_b),w=Number(inputs.weight_b),prediction=(1-w)*a+w*b,error=Math.abs(prediction-truth);return {answer:error,explanation:'결합 예측='+prediction+', 절대오차='+error+'입니다. A의 오차1과 이 사례에서 비교하며 일반화 향상은 주장하지 않습니다.',values:{truth,A:a,B:b,weight_B:w,combined_prediction:prediction,absolute_error:error,A_absolute_error:1}};
},
"4-27": (inputs) => {
const m={time:['시간축 선그래프','시간의 순서와 간격을 보입니다. A의 변화율40%, B50%는 각각 원래 값이 분모입니다.'],space:['위치 관계가 드러나는 지도 검토','공간 배치가 질문이므로 지도를 검토하되 건수와 인구당 비율을 구분합니다.'],numbers:['정렬한 막대 또는 표 검토','정확한 크기 비교에는 지도보다 공통 기준의 막대나 표가 직접적일 수 있습니다.']};const v=m[inputs.goal];return {answer:v[0],explanation:v[1],values:{A_change:4,B_change:4,A_growth:.4,B_growth:.5}};
},
"4-28": (inputs) => {
const a=Number(inputs.population_a),b=Number(inputs.population_b),total=200;return {answer:b/a,explanation:'표시 면적 B/A는 인구 B/A와 같습니다. 실제 땅100·50은 바뀌지 않습니다.',values:{A_display_area:total*a/(a+b),B_display_area:total*b/(a+b),display_ratio_B_to_A:b/a,A_geographic_area:100,B_geographic_area:50}};
},
"4-29": (inputs) => {
const ratio=Number(inputs.value_b)/Number(inputs.value_a),area=inputs.encoding==='area',r=area?Math.sqrt(ratio):ratio,a=area?ratio:ratio*ratio;const fmt=x=>String(Math.round(x*10000)/10000);return {answer:'반지름 '+fmt(r)+'배 · 면적 '+fmt(a)+'배',explanation:area?'면적비의 제곱근이 반지름비입니다.':'반지름에 값 비율을 직접 쓰면 면적은 그 비율의 제곱이 됩니다.',values:{value_ratio:ratio,radius_ratio:r,area_ratio:a}};
},
"4-30": (inputs) => {
const rows=[{name:'A',v:[1,2]},{name:'B',v:[8,9]},{name:'C',v:[2,1]},{name:'D',v:[9,8]}];if(inputs.operation==='center'){const m=(1+2)/2;return {answer:'A행 (−0.5, 0.5): 별도 중심화',explanation:'측정 단위는 유지하지만 값은 행 평균과의 차이로 바뀝니다. 단순 위치 변경이 아닙니다.',values:{A_centered:[1-m,2-m]}};}const out=[rows[0],rows[2],rows[1],rows[3]],sum=out.reduce((s,r)=>s+r.v[0]+r.v[1],0);return {answer:'합계 40 · 평균 5 유지',explanation:'이름과 값의 대응을 유지한 순열이므로 값의 모음과 합계는 바뀌지 않습니다.',values:{rows:out,sum,mean:sum/8}};
},
"4-31": (inputs) => {
const xs=[.2,.6,1.2,Number(inputs.last)],edges=inputs.bins==='equal'?[0,1,2,3]:[0,1,3];const counts=edges.slice(0,-1).map((a,i)=>xs.filter(x=>x>=a&&(i===edges.length-2?x<=edges[i+1]:x<edges[i+1])).length);const widths=edges.slice(1).map((b,i)=>b-edges[i]),heights=counts.map((c,i)=>c/(4*widths[i])),areas=heights.map((h,i)=>h*widths[i]);const fmt=x=>String(Math.round(x*10000)/10000);return {answer:'밀도 '+heights.map(fmt).join(' · '),explanation:'높이 합이 아니라 면적 합 '+areas.reduce((a,b)=>a+b,0)+'을 확인합니다. 마지막 구간만 오른쪽 경계를 포함합니다.',values:{edges,counts,widths,heights,areas,total_observations:4}};
},
"4-32": (inputs) => {
const base=Number(inputs.axis_start),ratio=(30-base)/(20-base),growth=(30-20)/20;let a='증가율 50% · 표시 높이비 '+String(Math.round(ratio*10000)/10000)+'배';if(inputs.unit==='percent')a+=' · 10퍼센트포인트';return {answer:a,explanation:'원자료의 분모는20입니다. 화면 길이의 분모 '+(20-base)+'와 다릅니다.',values:{raw_growth:growth,display_height_ratio:ratio,percentage_points:inputs.unit==='percent'?10:null}};
},
"4-33": (inputs) => {
const f=Number(inputs.factor),coefficient=2/f,old_input=3,new_input=old_input*f,old_prediction=2*3+.01*100,new_prediction=coefficient*new_input+.01*100;return {answer:coefficient,explanation:'새 계수는2/'+f+'입니다. 기존·새 예측은 모두 '+new_prediction+'이며 단위 변환으로 인과효과나 중요도를 측정하지 않았습니다.',values:{coefficient,new_input,old_prediction,new_prediction}};
},
"4-34": (inputs) => {
const x=Number(inputs.x),stored=inputs.path==='stored',z=stored?(x-10)/2:x,y=3*z+1;return {answer:y,explanation:stored?'학습 평균10·표준편차2를 고정한 transform을 적용했습니다.':'원시값을 모형식에 바로 넣어 학습 때와 다른 입력을 사용했습니다. 이 값은 올바른 파이프라인 출력이 아닙니다.',values:{raw_input:x,model_input:z,prediction:y,used_saved_transform:stored}};
},
"4-35": (inputs) => {
if(inputs.truth!=='yes')return {answer:'성능 미확인',explanation:'입력1 비율20%→60%는 관찰했지만 정답이 없어 정확도를 계산하지 않습니다.',values:{old_input_fraction:.2,new_input_fraction:.6,input_change_pp:40,accuracy:null}};const y=[0,0,1,1,1],p=inputs.prediction==='correct'?[0,0,1,1,1]:[1,0,1,1,1],correct=y.filter((v,i)=>v===p[i]).length;return {answer:'이5건 정확도 '+(correct/5*100)+'%',explanation:'같은 저장 예측에 도착한 정답을 연결한 결과입니다. 입력 변화가 곧 성능 하락은 아니며 미래 모집단 성능을 보장하지 않습니다.',values:{correct,total:5,accuracy:correct/5,input_change_pp:40}};
},
"4-36": (inputs) => {
const y=[10,20],c=[Number(inputs.candidate1),Number(inputs.candidate2)],mae=(Math.abs(y[0]-c[0])+Math.abs(y[1]-c[1]))/2,old=2;const a=mae<old?'이 구간 후보 개선 기록':mae>old?'이 결과는 후보 교체를 지지하지 않음':'이 지표에서는 동점';return {answer:a,explanation:'기존 MAE2, 후보 MAE'+mae+'입니다. 같은 두 정답의 결과이며 교체 승인·영구적 개선은 아닙니다.',values:{truth:y,candidate:c,candidate_MAE:mae,incumbent_MAE:old}};
},
"4-37": (inputs) => {
const demand=Number(inputs.demand),stock=Number(inputs.stock),order=Math.max(demand-stock,0);return {answer:order,explanation:'max('+demand+'−'+stock+',0)='+order+'개입니다. 입고·폐기·안전재고·포장·비용 제약은 이 단순 정책에서 제외했습니다.',values:{forecast:demand,stock,raw_difference:demand-stock,additional_order:order}};
}
};
