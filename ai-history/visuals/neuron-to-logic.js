/* Figure 1c topology and its expression were checked on pp.130–131.
 * The SVG is a new drawing; the biological component is independently reusable. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const paperDrawing=()=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" role="img" aria-label="원논문 Figure 1c를 참고한 세 뉴런의 연결. 뉴런 1과 2의 활동이 뉴런 3의 활동에 함께 연결된다.">
    <title>McCulloch·Pitts, Figure 1c의 연결 구조</title>
    <rect x="8" y="9" width="404" height="282" rx="16" fill="var(--soft)"/>
    <g class="neuron-feature" data-feature="connection" fill="none" stroke="var(--ink)" stroke-width="2.8" stroke-linecap="round">
      <path d="M90 80 C174 79 232 100 278 141 M90 213 C174 215 237 199 278 159 M301 150 H366"/>
      <g fill="var(--ink)" stroke="none"><circle cx="278" cy="141" r="3"/><circle cx="278" cy="159" r="3"/></g>
      <path class="neuron-glow" d="M90 80 C174 79 232 100 278 141 M90 213 C174 215 237 199 278 159 M301 150 H366" stroke="var(--accent)" stroke-width="4.5"/>
    </g>
    <g class="neuron-feature" data-feature="cell" fill="var(--bg)" stroke="var(--ink)" stroke-width="2.3" stroke-linejoin="round">
      <path d="M46 80 Q70 77 90 63 L90 97 Q70 84 46 80Z M46 213 Q70 210 90 196 L90 230 Q70 217 46 213Z M257 150 Q279 143 301 128 L301 172 Q279 155 257 150Z"/>
      <path class="neuron-glow" d="M46 80 Q70 77 90 63 L90 97 Q70 84 46 80Z M46 213 Q70 210 90 196 L90 230 Q70 217 46 213Z M257 150 Q279 143 301 128 L301 172 Q279 155 257 150Z" fill="var(--accent)" fill-opacity=".15" stroke="var(--accent)"/>
      <g fill="var(--ink)" stroke="none" font-family="var(--mono)" font-size="17"><text x="77" y="86">1</text><text x="77" y="219">2</text><text x="286" y="156">3</text></g>
    </g>
    <g class="neuron-feature" data-feature="signal" fill="var(--ink)" font-family="var(--mono)" font-size="18">
      <text x="46" y="46">N₁(t − 1)</text><text x="46" y="267">N₂(t − 1)</text><text x="310" y="194">N₃(t)</text>
      <g class="neuron-glow" fill="var(--accent)"><circle cx="79" cy="80" r="5"/><circle cx="79" cy="213" r="5"/><circle cx="290" cy="150" r="5"/></g>
    </g>
  </svg>`;
  window.AtlasVisuals.register('neuron-to-logic',{
    mount(host,config){
      const root=node('div','neuron-comparison');root.dataset.focus='all';
      const grid=node('div','neuron-figure-grid');
      function panel(label,sub,svg,caption){const f=node('figure','neuron-figure');const h=node('figcaption');h.append(node('span','mono',sub),node('h4','',label));const drawing=node('div','neuron-drawing');drawing.innerHTML=svg;f.append(h,drawing,node('p','neuron-figure-meaning',caption));return f;}
      grid.append(panel('뇌의 뉴런','BIOLOGICAL NEURON',window.AtlasNeuronDrawing.svg(),config.biologyCaption),panel('논문의 뉴런 모델','McCULLOCH · PITTS / FIG. 1c',paperDrawing(),config.modelCaption));
      const controls=node('div','neuron-compare-controls');controls.setAttribute('role','group');controls.setAttribute('aria-label','뇌와 모델에서 대응되는 특징 비교');
      const buttons=[],listeners=[];
      const options=[{id:'all',label:'전체 보기'},...config.mappings];
      const result=node('div','neuron-compare-result'),pairs=node('div','neuron-correspondences'),explanation=node('p','neuron-map-explanation');
      explanation.setAttribute('aria-live','polite');
      const rows=new Map();
      for(const map of config.mappings){const row=node('p','neuron-correspondence');row.append(node('span','',map.biology),node('span','neuron-map-arrow','→'),node('strong','',map.model));rows.set(map.id,row);pairs.append(row);}
      function select(id){
        root.dataset.focus=id;
        for(const button of buttons){const on=button.dataset.mapping===id;button.setAttribute('aria-pressed',String(on));button.classList.toggle('active',on);}
        for(const feature of root.querySelectorAll('.neuron-feature'))feature.dataset.emphasis=String(id==='all'||feature.dataset.feature===id);
        for(const [key,row] of rows)row.classList.toggle('active',key===id);
        explanation.textContent=config.mappings.find(m=>m.id===id)?.text||'신경활동에서 수학으로 옮길 성질을 골랐다. 뉴런의 활동과 연결을 명제와 논리 관계에 대응시킨 것이다.';
      }
      for(const option of options){const b=node('button','',option.label);b.type='button';b.dataset.mapping=option.id;const click=()=>select(option.id);b.addEventListener('click',click);listeners.push(()=>b.removeEventListener('click',click));buttons.push(b);controls.append(b);}
      result.append(pairs,explanation);root.append(controls,grid,result);
      const credits=node('div','neuron-figure-sources');
      for(const [label,s] of [['뉴런 구조 참조',config.anatomySource],['연결·기호 참조',config.modelSource]]){const a=node('a','',label+' · '+s.title+' ↗');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';credits.append(a);}
      root.append(credits);host.append(root);select('all');
      return ()=>{for(const remove of listeners)remove();root.remove();};
    }
  });
})();
