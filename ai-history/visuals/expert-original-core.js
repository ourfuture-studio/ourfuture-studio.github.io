/* Feigenbaum1977 RULE85: premise matching, not a CF propagation or diagnosis engine. */
(function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b),freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
 const example=freeze({
  "id": "mycin-rule85",
  "question": "어떤 관찰이 이 규칙의 후보 근거를 뒷받침할까?",
  "target": {
    "attribute": "identity",
    "value": "pseudomonas-aeruginosa",
    "label": "pseudomonas-aeruginosa라는 정체 가설"
  },
  "bindings": [
    {
      "role": "culture",
      "symbol": "C1",
      "label": "가상 배양 표본"
    },
    {
      "role": "organism",
      "symbol": "O1",
      "label": "가상 관찰 미생물"
    },
    {
      "role": "patient",
      "symbol": "P1",
      "label": "이 규칙을 읽기 위한 가상 환자 맥락"
    }
  ],
  "inputs": [
    {
      "id": "culture-site",
      "label": "배양 부위",
      "subject": "C1",
      "expected": "blood",
      "expectedLabel": "혈액 (blood)",
      "condition": "배양 부위가 혈액이다 (blood)",
      "yes": "혈액으로 확인 (blood)",
      "no": "혈액이 아닌 것으로 확인"
    },
    {
      "id": "gram-stain",
      "label": "그람 염색",
      "subject": "O1",
      "expected": "gramneg",
      "expectedLabel": "음성 (gramneg)",
      "condition": "그람 염색이 음성이다 (gramneg)",
      "yes": "음성으로 확인 (gramneg)",
      "no": "음성이 아닌 것으로 확인"
    },
    {
      "id": "morphology",
      "label": "형태",
      "subject": "O1",
      "expected": "rod",
      "expectedLabel": "막대형 (rod)",
      "condition": "형태가 막대형이다 (rod)",
      "yes": "막대형으로 확인 (rod)",
      "no": "막대형이 아닌 것으로 확인"
    },
    {
      "id": "compromised-host",
      "label": "숙주 방어 상태",
      "subject": "P1",
      "expected": "compromised",
      "expectedLabel": "방어 기능 저하 (compromised host)",
      "condition": "숙주 방어 기능이 약해져 있다 (compromised host)",
      "yes": "방어 기능 저하 조건과 일치 (compromised host)",
      "no": "이 조건과 다른 것으로 확인"
    }
  ],
  "rule": {
    "id": "rule85",
    "number": 85,
    "printedCF": ".6",
    "grade": "suggestive evidence",
    "conclusion": "RULE85의 적용 조건 충족",
    "derivedFact": "rule85-ready",
    "source": {
      "title": "Feigenbaum (1977) · RULE85",
      "url": "https://ijcai.org/proceedings/1977/0231.pdf#page=9",
      "printedPage": 1022,
      "pdfPage": 9
    }
  },
  "initial": {
    "culture-site": true,
    "gram-stain": true,
    "morphology": true
  },
  "records": [
    {
      "id": "why",
      "title": "WHY · 왜 병원 감염 여부를 묻는가?",
      "rule": "RULE37",
      "known": [
        "gramneg",
        "rod",
        "facultative"
      ],
      "question": "병원에서 감염됐는가?",
      "conditional": "not hospital-acquired이면 RULE37의 경로를 검토한다.",
      "outcomes": [
        {
          "attribute": "category",
          "value": "enterobacteriaceae",
          "printedCF": ".8"
        },
        {
          "attribute": "identity",
          "value": "pseudomonas-aeruginosa",
          "printedCF": ".1"
        }
      ],
      "boundary": "이 대화에는 질문에 대한 실제 답이나 RULE37이 발화한 결과가 없다. 두 수치는 서로 다른 속성의 원문 주석이며 합산하지 않는다.",
      "source": {
        "url": "https://ijcai.org/proceedings/1977/0231.pdf#page=10",
        "printedPages": "1023–1024",
        "pdfPages": "10–11"
      }
    },
    {
      "id": "how",
      "title": "HOW · facultative는 어떻게 얻었는가?",
      "rule": "RULE27",
      "outcomes": [
        {
          "attribute": "aerobicity",
          "value": "facultative",
          "printedCF": ".8"
        },
        {
          "attribute": "aerobicity",
          "value": "anaerobic",
          "printedCF": ".2"
        }
      ],
      "boundary": "원문 설명은 RULE27을 사용했다고 기록하지만 그 IF 전제 전체는 이1977년 발췌에 없다. 보이지 않는 조건을 채워 새 규칙을 실행하지 않는다.",
      "source": {
        "url": "https://ijcai.org/proceedings/1977/0231.pdf#page=10",
        "printedPages": "1023",
        "pdfPages": "10"
      }
    },
    {
      "id": "why-not",
      "title": "WHY NOT · streptococcus는 왜 시도하지 않았는가?",
      "rule": "RULE33",
      "required": "morphology = coccus",
      "recorded": "clause 2가 이미 false라 RULE33은 never tried로 설명된다.",
      "boundary": "RULE33의 전체 전제는 이1977년 발췌에 없다. 원문의 탈락 이유를 보존하며 완전한 규칙이나 새 균종 판정을 만들지 않는다.",
      "source": {
        "url": "https://ijcai.org/proceedings/1977/0231.pdf#page=11",
        "printedPages": "1024",
        "pdfPages": "11"
      }
    }
  ],
  "scope": "Published RULE85 premise matching under hypothetical observations. Printed CF annotations only, no propagation or diagnostic probabilities. Separate original explanation records are not a reconstructed rule chain."
});
 function analyze({observations=example.initial}={}){if(!observations||typeof observations!=='object'||Array.isArray(observations)||Reflect.ownKeys(observations).some(k=>typeof k!=='string'||!example.inputs.some(i=>i.id===k)||typeof observations[k]!=='boolean'))throw new TypeError('Use known historical-rule conditions with true/false observations; omit unknowns.');
  const engine=window.AtlasExpertModel;if(!engine?.analyze)throw new Error('The preserved expert rule engine must load first.');const observed=clone(observations),rule={id:'rule85',label:'원문 RULE85의 네 조건',if:example.inputs.map(i=>({fact:i.id,value:true})),then:'rule85-ready'},model=engine.analyze({inputs:example.inputs.map(i=>({id:i.id,label:i.label})),rules:[rule],observations:observed,goal:'rule85-ready'}),assessed=model.rules[0],conditions=assessed.conditions.map((c,index)=>({...clone(example.inputs[index]),status:c.status,observed:Object.hasOwn(observed,c.fact)?observed[c.fact]:null})),blocked=conditions.some(c=>c.status==='contradicted'),status=blocked?'blocked':model.known['rule85-ready']===true?'applies':'needs-data',events=[];
  const push=e=>events.push({index:events.length,...clone(e)});
  push({kind:'goal',target:example.target,message:'이 정체 가설을 뒷받침하는 원문 규칙의 조건을 살펴본다.'});
  push({kind:'bind',bindings:example.bindings,message:'배양 표본 C1, 관찰 대상 O1, 가상 환자 맥락 P1을 구분해 같은 사례의 조건으로 묶는다.'});
  push({kind:'rule',ruleId:'rule85',printedCF:'.6',message:'RULE85가 이 가설에 어떤 관찰을 요구하는지 확인한다. .6은 원문에 붙은 계수 주석이다.'});
  for(const condition of conditions)push({kind:'check',condition,message:condition.condition+' · '+({satisfied:'확인한 관찰이 조건과 일치한다.',contradicted:'조건과 다른 관찰이 확인되어 이 규칙의 적용을 막는다.',unknown:'아직 확인한 관찰이 없다. 반대라고 단정하지 않는다.'})[condition.status]});
  for(const q of model.questions){const condition=conditions.find(c=>c.id===q.fact);push({kind:'ask',condition,why:{rule:'rule85',target:example.target,condition:condition.condition},message:'왜 '+condition.label+' 확인이 필요한가? 이 가설에 관한 RULE85가 요구하는 조건이기 때문이다.'});}
  push({kind:'outcome',status,conclusion:status==='applies'?example.rule.conclusion:null,conditions,questions:model.questions.map(q=>q.fact),message:status==='applies'?'네 조건이 모두 맞아 RULE85의 적용 조건을 충족했다. 균종을 확정한 결론과 구분한다.':status==='blocked'?'조건과 다른 관찰이 있어 RULE85는 적용하지 않는다. 이 정체 가설 자체가 거짓이라는 뜻은 아니다.':'확인하지 않은 조건이 남아 RULE85의 적용을 아직 결정하지 못했다.'});
  push({kind:'explain',status,how:conditions.filter(c=>c.status!=='unknown').map(c=>({id:c.id,subject:c.subject,status:c.status,observed:c.observed,expected:c.expected})),why:model.questions.map(q=>({fact:q.fact,rule:'rule85',target:example.target.value})),message:'어떻게 판단했는지는 확인한 관찰과 조건별 일치 기록으로, 왜 묻는지는 목표 가설에서 필요한 조건으로 설명한다.'});
  push({kind:'result',status,message:status==='applies'?'RULE85의 적용 조건 충족 · 원문 .6은 고정 주석으로 남는다.':status==='blocked'?'이 규칙의 적용을 막은 관찰을 확인했다. 다른 규칙이나 다른 가설까지 배제한 것은 아니다.':'미확인 정보를 남겨 둔다. 미확인을 거짓으로 채우지 않는다.'});
  return{example:clone(example),observations:observed,conditions,status,questions:model.questions.map(q=>q.fact),derived:model.derivations,events,scope:example.scope};
 }
 function replay(result,index=0){if(!result||!Array.isArray(result.events)||!Number.isInteger(index)||index<0||index>=result.events.length)throw new RangeError('Select a calculated rule-check step.');const conditions=[],questions=[];let status='checking',conclusion=null,bindings=[],ruleSeen=false;for(const e of result.events.slice(0,index+1)){if(e.kind==='bind')bindings=clone(e.bindings);if(e.kind==='rule')ruleSeen=true;if(e.kind==='check')conditions.push(clone(e.condition));if(e.kind==='ask')questions.push(clone(e.condition));if(e.kind==='outcome'){status=e.status;conclusion=e.conclusion;}}return{index,event:clone(result.events[index]),conditions,questions,status,conclusion,bindings,ruleSeen,complete:index===result.events.length-1};}
 function verifyRun(result){try{return{valid:equal(result,analyze({observations:result.observations}))};}catch(_){return{valid:false};}}
 window.AtlasExpertOriginal=freeze({getExample:()=>clone(example),analyze,replay,verifyRun});
})();
