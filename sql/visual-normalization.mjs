/** Enrollment normalization under explicitly authored functional dependencies.
 * Pure data model; no SQL engine, network or learner-record access.
 */
export const BASE_ENROLLMENTS = Object.freeze([
  {studentId:'S01',courseId:'C01',studentName:'민아',courseName:'SQL',profId:'P01',profName:'김교수'},
  {studentId:'S01',courseId:'C02',studentName:'민아',courseName:'모델링',profId:'P02',profName:'이교수'},
  {studentId:'S02',courseId:'C01',studentName:'준',courseName:'SQL',profId:'P01',profName:'김교수'},
  {studentId:'S03',courseId:'C03',studentName:'아라',courseName:'파이썬',profId:'P01',profName:'김교수'},
].map(Object.freeze));
export const NORMALIZATION_FDS = Object.freeze([
  {determinant:['studentId'],dependent:['studentName']},
  {determinant:['courseId'],dependent:['courseName','profId']},
  {determinant:['profId'],dependent:['profName']},
]);
const ALL_COLUMNS=['studentId','courseId','studentName','courseName','profId','profName'];
const clone=value=>JSON.parse(JSON.stringify(value));
const project=(rows,columns)=>[...new Map(rows.map(row=>{const item=Object.fromEntries(columns.map(key=>[key,row[key]]));return [JSON.stringify(item),item];})).values()];
const relation=(name,columns,rows,pk,fk=[])=>({name,columns,rows,pk,fk});

export function normalizedRelations(stage=1,scenario='base'){
  stage=Number(stage);
  if(!Number.isInteger(stage)||stage<0||stage>3)throw new RangeError('stage must be 0, 1, 2 or 3');
  if(!['base','update','insert','delete'].includes(scenario))throw new RangeError('Unknown normalization scenario');
  const rows=clone(BASE_ENROLLMENTS);
  let tables;
  if(stage===0){
    const grouped=project(rows,['studentId','studentName']).map(student=>({...student,courses:rows.filter(r=>r.studentId===student.studentId).map(r=>Object.fromEntries(['courseId','courseName','profId','profName'].map(key=>[key,r[key]])))}));
    tables=[relation('StudentCourses',['studentId','studentName','courses'],grouped,['studentId'])];
  }else if(stage===1){
    tables=[relation('EnrollmentDetail',ALL_COLUMNS,rows,['studentId','courseId'])];
  }else{
    tables=[relation('Students',['studentId','studentName'],project(rows,['studentId','studentName']),['studentId']),
      relation('Enrollments',['studentId','courseId'],project(rows,['studentId','courseId']),['studentId','courseId'],[{column:'studentId',references:'Students.studentId'},{column:'courseId',references:'Courses.courseId'}]),
      relation('Courses',stage===2?['courseId','courseName','profId','profName']:['courseId','courseName','profId'],project(rows,stage===2?['courseId','courseName','profId','profName']:['courseId','courseName','profId']),['courseId'],stage===3?[{column:'profId',references:'Professors.profId'}]:[])];
    if(stage===3)tables.push(relation('Professors',['profId','profName'],project(rows,['profId','profName']),['profId']));
  }
  const result={stage,scenario,tables,action:{affectedRows:0,blocked:false}};
  const physicalProfessorRows=stage===0?tables[0].rows.flatMap(s=>s.courses):stage===1?tables[0].rows:tables.find(t=>t.name===(stage===2?'Courses':'Professors')).rows;
  result.professorNameLocations=physicalProfessorRows.filter(row=>row.profId==='P01').length;
  if(scenario==='update'){
    physicalProfessorRows.find(row=>row.profId==='P01').profName='김하늘';
    result.action.affectedRows=1;
  }else if(scenario==='insert'){
    if(stage===3){tables.find(t=>t.name==='Professors').rows.push({profId:'P03',profName:'최교수'});result.action.affectedRows=1;}
    else result.action.blocked=true;
  }else if(scenario==='delete'){
    if(stage===0)tables[0].rows=tables[0].rows.filter(row=>row.studentId!=='S03');
    else if(stage===1)tables[0].rows=tables[0].rows.filter(row=>!(row.studentId==='S03'&&row.courseId==='C03'));
    else{const enrollments=tables.find(t=>t.name==='Enrollments');enrollments.rows=enrollments.rows.filter(row=>!(row.studentId==='S03'&&row.courseId==='C03'));}
    result.action.affectedRows=1;
  }
  return result;
}
export const applyNormalizationScenario=normalizedRelations;

export function reconstruct(result){
  if(result.stage===0)return result.tables[0].rows.flatMap(student=>student.courses.map(course=>({studentId:student.studentId,courseId:course.courseId,studentName:student.studentName,courseName:course.courseName,profId:course.profId,profName:course.profName})));
  if(result.stage===1)return clone(result.tables[0].rows);
  const table=name=>result.tables.find(t=>t.name===name).rows;
  return table('Enrollments').flatMap(enrollment=>table('Students').filter(s=>s.studentId===enrollment.studentId).flatMap(student=>table('Courses').filter(c=>c.courseId===enrollment.courseId).flatMap(course=>{
    const professors=result.stage===3?table('Professors').filter(p=>p.profId===course.profId):[course];
    return professors.map(prof=>({studentId:enrollment.studentId,courseId:enrollment.courseId,studentName:student.studentName,courseName:course.courseName,profId:course.profId,profName:prof.profName}));
  })));
}

export function analyzeRelations(result){
  const rows=reconstruct(result),studentTable=result.tables.find(t=>t.name==='Students');
  const names=[...new Set(rows.filter(row=>row.profId==='P01').map(row=>row.profName))];
  return {enrollmentRows:rows.length,professorNameConflicts:names.length>1,
    studentS03Exists:studentTable?studentTable.rows.some(row=>row.studentId==='S03'):rows.some(row=>row.studentId==='S03'),
    professorP03Exists:result.tables.some(t=>t.name==='Professors'&&t.rows.some(row=>row.profId==='P03'))};
}

const LABELS={studentId:['학생ID','student_id'],courseId:['과목ID','course_id'],studentName:['학생명','student_name'],courseName:['과목명','course_name'],profId:['교수ID','prof_id'],profName:['교수명','prof_name'],courses:['수강과목 묶음','courses[]']};
const TABLE_LABELS={StudentCourses:'학생별 수강 묶음',EnrollmentDetail:'한 표에 저장한 수강 정보',Students:'학생',Enrollments:'수강',Courses:'과목',Professors:'교수'};
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=stage=>['반복 그룹이 있는 모형','제1정규형(1NF, First Normal Form)','제2정규형(2NF, Second Normal Form)','제3정규형(3NF, Third Normal Form)'][stage];
function cell(value){
  if(Array.isArray(value))return '<div class="norm-repeating">'+value.map(course=>'<div>'+['courseId','courseName','profId','profName'].map(key=>esc(course[key])).join(' · ')+'</div>').join('')+'</div>';
  return esc(value);
}
function tableHTML(table,{rejoined=false}={}){
  const heads=table.columns.map(key=>{const isPk=table.pk.includes(key),isFk=table.fk.some(x=>x.column===key);return `<th scope="col" class="${isPk?'norm-pk ':''}${isFk?'norm-fk':''}"><span>${LABELS[key][0]}</span><code>${LABELS[key][1]}</code>${isPk?'<b class="norm-key-tag">PK</b>':''}${isFk?'<b class="norm-key-tag">FK</b>':''}</th>`;}).join('');
  const rows=table.rows.map(row=>`<tr class="${row.studentId==='S01'?'norm-student-one':row.studentId==='S02'?'norm-student-two':row.studentId==='S03'?'norm-student-three':''}">${table.columns.map(key=>`<td class="${key==='profName'&&row[key]==='김하늘'?'norm-changed':row.profId==='P03'?'norm-added':''}">${cell(row[key])}</td>`).join('')}</tr>`).join('');
  return `<table><caption>${rejoined?'키로 복원한 수강 정보':`${TABLE_LABELS[table.name]} <span lang="en">(${table.name})</span>`}</caption><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>`;
}

function description(stage){
  const texts=[
    ['먼저 한 칸에 무엇을 넣었는지 확인하세요.','학생 S01의 수강 과목 두 개를 목록으로 한 칸에 저장했습니다. 이 모형에서는 한 수강 사실을 한 행으로 펼쳐 제1정규형으로 바꿉니다.'],
    ['한 칸은 하나의 값, 아직 한 표 안에 여러 사실.','학생명은 학생ID만으로, 과목 정보는 과목ID만으로 결정됩니다. 복합 키(Composite Key) 전체가 필요하지 않은 부분 함수 종속이 남아 있습니다.'],
    ['키의 일부로 결정되는 사실을 먼저 분리합니다.','학생·수강·과목으로 나누었습니다. 그러나 과목 표에는 과목ID → 교수ID → 교수명이라는 이행 함수 종속이 남아, 한 교수가 여러 과목을 담당하면 이름이 반복됩니다.'],
    ['교수에 관한 사실도 교수 표 한 곳으로.','과목 표는 교수ID를 외래 키로 참조합니다. 학생·과목·교수의 설명은 각각 한 곳에 저장하고, 수강 표에는 어떤 학생이 어떤 과목을 듣는지 남깁니다.']
  ][stage];
  return `<h3>${number(stage)}</h3><strong>${texts[0]}</strong><p>${texts[1]}</p>`;
}
function diagramHTML(result){
  if(result.stage<=1)return `<div class="norm-fd-grid"><div class="norm-fd-card"><span class="norm-fd-type">부분 함수 종속 <small>(Partial Functional Dependency)</small></span><div><code>student_id</code><span class="norm-fd-arrow" aria-hidden="true">→</span><code>student_name</code></div></div><div class="norm-fd-card"><span class="norm-fd-type">부분 함수 종속 <small>(Partial Functional Dependency)</small></span><div><code>course_id</code><span class="norm-fd-arrow" aria-hidden="true">→</span><code>course_name<br>prof_id</code></div></div><div class="norm-fd-card norm-fd-transitive"><span class="norm-fd-type">교수ID를 거치는 이행 종속 <small>(Transitive Dependency)</small></span><div><code>course_id</code><span class="norm-fd-arrow" aria-hidden="true">→</span><code>prof_id</code><span class="norm-fd-arrow" aria-hidden="true">→</span><code>prof_name</code></div></div></div>${result.stage===0?'<p class="norm-small">위 종속은 펼친 수강 관계에서 적용할 업무 규칙입니다. 현재 반복 그룹의 칸은 아직 원자값(Atomic Value) 하나가 아닙니다.</p>':''}`;
  const labels=result.stage===2?['Students','Enrollments','Courses']:['Professors','Courses','Enrollments','Students'];
  function draw(mobile){
    const width=mobile?360:1000,height=mobile?(result.stage===3?860:650):330;
    const cardWidth=mobile?270:(result.stage===3?200:270),cardHeight=175;
    const positions={};
    labels.forEach((name,i)=>positions[name]={x:mobile?45:25+i*(result.stage===3?245:330),y:mobile?30+i*210:45});
    const card=(name)=>{const t=result.tables.find(x=>x.name===name),p=positions[name];let contents=`<rect x="${p.x}" y="${p.y}" width="${cardWidth}" height="${cardHeight}" rx="8" class="norm-entity"/><text x="${p.x+15}" y="${p.y+28}" class="norm-entity-title">${TABLE_LABELS[name]} (${name})</text>`;
      t.columns.forEach((key,i)=>{const pk=t.pk.includes(key),fk=t.fk.some(x=>x.column===key);contents+=`<text x="${p.x+15}" y="${p.y+58+i*25}" class="norm-entity-column ${pk?'norm-svg-pk':''} ${fk?'norm-svg-fk':''}">${pk?'PK ':''}${fk?'FK ':''}${LABELS[key][1]}</text>`;});return contents;};
    const connections=result.stage===2?[['Students','Enrollments'],['Courses','Enrollments']]:[['Professors','Courses'],['Courses','Enrollments'],['Students','Enrollments']];
    let edges='';
    connections.forEach(([parent,child])=>{const a=positions[parent],b=positions[child];let d,one,many;
      if(mobile){const down=b.y>a.y,x=a.x+cardWidth/2,ya=down?a.y+cardHeight:a.y,yb=down?b.y:b.y+cardHeight;d=`M ${x} ${ya} L ${x} ${yb}`;one={x:x-14,y:down?ya+17:ya-10};many={x:x+9,y:down?yb-10:yb+17};}
      else{const right=b.x>a.x,xa=right?a.x+cardWidth:a.x,xb=right?b.x:b.x+cardWidth,y=a.y+cardHeight/2;d=`M ${xa} ${y} L ${xb} ${y}`;one={x:xa+(right?10:-16),y:y-10};many={x:xb+(right?-20:8),y:y-10};}
      edges+=`<path d="${d}" class="norm-relation-line" marker-end="url(#norm-arrow-${mobile?'m':'d'})"/><text x="${one.x}" y="${one.y}" class="norm-cardinality">1</text><text x="${many.x}" y="${many.y}" class="norm-cardinality">N</text>`;
    });
    const caption=result.stage===2?'학생과 과목의 기본 키를 수강 표의 외래 키가 참조합니다.':'교수에서 과목으로, 과목과 학생에서 수강으로 키를 연결합니다.';
    return `<svg class="norm-erd ${mobile?'norm-erd-mobile':'norm-erd-desktop'}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${number(result.stage)} 테이블 관계도"><title>${number(result.stage)}의 키와 일대다 관계</title><desc>${caption} 화살표는 부모 기본 키에서 이를 참조하는 자식 외래 키 방향입니다. 1은 부모 한 행, N은 여러 자식 행을 뜻합니다.</desc><defs><marker id="norm-arrow-${mobile?'m':'d'}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#47796b"/></marker></defs>${edges}${labels.map(card).join('')}</svg>`;
  }
  return draw(false)+draw(true)+(result.stage===2?'<p class="norm-remaining">과목 표 안에는 아직 <code>prof_id → prof_name</code>이 남습니다. 학생·과목의 부분 종속을 없앤 것과 교수의 이행 종속을 없앤 것은 서로 다른 단계입니다.</p>':'');
}

function actionText(result,analysis){
  if(result.scenario==='base')return `현재 설계에서 같은 교수 P01의 이름은 ${result.professorNameLocations}곳에 있습니다. 기본 자료를 키로 조인하면 ${analysis.enrollmentRows}개 수강 행을 복원합니다.`;
  if(result.scenario==='update')return `${result.professorNameLocations}곳 중 한 곳의 교수명을 김교수 → 김하늘로 바꿨습니다. ${analysis.professorNameConflicts?'같은 교수ID P01에 서로 다른 이름이 남아 수정 이상(Update Anomaly)을 확인할 수 있습니다.':'교수 표 한 행만 고쳐도 조인한 모든 P01 수강 행에 새 이름이 나타납니다.'} 여러 행을 모두 정확히 수정하면 앞 단계에서도 일관성을 유지할 수 있지만, 누락할 위치가 더 많습니다.`;
  if(result.scenario==='insert')return result.action.blocked?'교수 P03만 추가하려면 아직 과목이나 수강의 키도 요구됩니다. 가짜 과목·학생 또는 빈 키를 만들지 않도록 이번 삽입을 보류했습니다. 3NF의 교수 표에서는 교수만 독립적으로 추가할 수 있습니다.':'수강·과목 없이 교수 P03(최교수)를 교수 표에 추가했습니다. 새 교수가 수강 조인 결과를 늘리지는 않습니다.';
  return `학생 S03의 마지막 수강 S03·C03 한 건을 지웠습니다. ${analysis.studentS03Exists?'수강만 사라지고 학생 S03(아라)와 과목 C03(파이썬)의 설명은 별도 표에 남습니다.':'이 수강 행에만 있던 학생 S03(아라)과 과목 C03(파이썬)의 설명도 함께 사라졌습니다. 삭제 이상(Deletion Anomaly)의 예입니다.'} 이 교육용 삭제는 초기화로 되돌릴 수 있습니다.`;
}

export function mountNormalization(root=document){
  const panel=root.querySelector('[data-sqlv-normalization]');
  if(!panel||panel.dataset.normalizationMounted==='true')return;
  panel.dataset.normalizationMounted='true';
  const state={stage:1,scenario:'base'};
  const render=()=>{
    const result=normalizedRelations(state.stage,state.scenario),analysis=analyzeRelations(result);
    panel.querySelector('#norm-description').innerHTML=description(state.stage);
    panel.querySelector('#norm-diagram').innerHTML=diagramHTML(result);
    panel.querySelector('#norm-tables').innerHTML=result.tables.map(t=>`<article class="norm-table-card"><div class="norm-table-scroll" role="region" tabindex="0" aria-label="${TABLE_LABELS[t.name]} 표">${tableHTML(t)}</div>${t.fk.length?`<p class="norm-fk-note">${t.fk.map(f=>`${LABELS[f.column][1]} → ${f.references.replace('studentId','student_id').replace('courseId','course_id').replace('profId','prof_id')}`).join(' · ')}</p>`:''}</article>`).join('');
    panel.querySelector('#norm-table-count').textContent=result.tables.length;
    panel.querySelector('#norm-update-count').textContent=result.professorNameLocations;
    panel.querySelector('#norm-rejoin-count').textContent=analysis.enrollmentRows;
    panel.querySelector('#norm-action-report').textContent=actionText(result,analysis);
    panel.querySelector('#norm-action-report').classList.toggle('norm-conflict',analysis.professorNameConflicts||result.action.blocked);
    panel.querySelector('#norm-rejoined').innerHTML=tableHTML(relation('EnrollmentDetail',ALL_COLUMNS,reconstruct(result),['studentId','courseId']),{rejoined:true});
    panel.querySelectorAll('[data-norm-stage]').forEach(button=>button.setAttribute('aria-pressed',String(+button.dataset.normStage===state.stage)));
    panel.querySelector('#norm-scenario').value=state.scenario;
    panel.dataset.currentStage=String(state.stage);panel.dataset.currentScenario=state.scenario;
  };
  panel.querySelectorAll('[data-norm-stage]').forEach(button=>button.addEventListener('click',()=>{state.stage=+button.dataset.normStage;render();}));
  panel.querySelector('#norm-scenario').addEventListener('change',event=>{state.scenario=event.target.value;render();});
  panel.querySelector('#norm-reset').addEventListener('click',()=>{Object.assign(state,{stage:1,scenario:'base'});render();});
  render();
}
