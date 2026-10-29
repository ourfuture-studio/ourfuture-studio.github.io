(() => {
  const theme=document.getElementById('theme');
  const values=['auto','light','dark'];let mode=0;
  theme.addEventListener('click',()=>{mode=(mode+1)%3;const value=values[mode];if(value==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=value;theme.textContent='테마: '+['자동','밝게','어둡게'][mode];});
  const catalog=document.getElementById('catalog');
  fetch('episodes.json').then(response=>{if(!response.ok)throw new Error('자료를 불러오지 못했습니다.');return response.json();}).then(data=>{
    catalog.replaceChildren();
    const groups=[
      {title:'NULL·집계·조인의 핵심 조건',start:0,end:6,label:'01 — 06'},
      {title:'비교·중복·그룹·순위로 확장',start:6,end:12,label:'07 — 12'},
      {title:'이론별 추가 체험 · 조회·집계·분석',start:12,end:21,label:'이론 글에서 바로 이어지는 체험'},
      {title:'이론별 추가 체험 · 데이터 모델과 키',start:21,end:29,label:'업무 규칙과 작은 표의 관계'},
      {title:'이론별 추가 체험 · 제약과 트랜잭션',start:29,end:34,label:'공통 실행 범위를 확인하며 비교하기'}
    ];
    for(const {title,start,end,label:groupLabel} of groups){
      const group=document.createElement('section');group.className='catalog-group';
      const label=document.createElement('div');label.className='mono';label.textContent=groupLabel;
      const heading=document.createElement('h2');heading.textContent=title;group.append(label,heading);
      for(const episode of data.episodes.slice(start,end)){
        const a=document.createElement('a');a.className='episode-link';a.href='lab.html?episode='+episode.id;
        const number=document.createElement('span');number.className='mono episode-number';number.textContent=episode.theoryNumber?'이론 '+String(episode.theoryNumber).padStart(2,'0'):String(episode.number).padStart(2,'0');
        const text=document.createElement('span');const h=document.createElement('span');h.className='episode-title';h.textContent=episode.title;const desc=document.createElement('span');desc.className='episode-desc';desc.textContent=episode.lede;text.append(h,desc);
        const arrow=document.createElement('span');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');a.append(number,text,arrow);group.append(a);
      }
      catalog.append(group);
    }
  }).catch(error=>{catalog.textContent=error.message+' 페이지를 새로고침해 주세요.';});
})();
