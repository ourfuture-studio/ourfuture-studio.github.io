(() => {
  const theme=document.getElementById('theme');
  const values=['auto','light','dark'];let mode=0;
  theme.addEventListener('click',()=>{mode=(mode+1)%3;const value=values[mode];if(value==='auto')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=value;theme.textContent='테마: '+['자동','밝게','어둡게'][mode];});
  const catalog=document.getElementById('catalog');
  fetch('episodes.json').then(response=>{if(!response.ok)throw new Error('자료를 불러오지 못했습니다.');return response.json();}).then(data=>{
    catalog.replaceChildren();
    for(const [index,title] of ['NULL·집계·조인의 핵심 조건','비교·중복·그룹·순위로 확장'].entries()){
      const group=document.createElement('section');group.className='catalog-group';
      const label=document.createElement('div');label.className='mono';label.textContent=index===0?'01 — 06':'07 — 12';
      const heading=document.createElement('h2');heading.textContent=title;group.append(label,heading);
      for(const episode of data.episodes.slice(index*6,index*6+6)){
        const a=document.createElement('a');a.className='episode-link';a.href='lab.html?episode='+episode.id;
        const number=document.createElement('span');number.className='mono episode-number';number.textContent=String(episode.number).padStart(2,'0');
        const text=document.createElement('span');const h=document.createElement('span');h.className='episode-title';h.textContent=episode.title;const desc=document.createElement('span');desc.className='episode-desc';desc.textContent=episode.lede;text.append(h,desc);
        const arrow=document.createElement('span');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');a.append(number,text,arrow);group.append(a);
      }
      catalog.append(group);
    }
  }).catch(error=>{catalog.textContent=error.message+' 페이지를 새로고침해 주세요.';});
})();
