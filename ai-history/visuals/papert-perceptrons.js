/* Original-source argument, followed by a finite authored score example. */
(function(){
  'use strict';
  const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;};
  const asset=file=>window.ATLAS_EMBEDDED_IMAGES?.[file.slice(7)]||file;
  const fmt=n=>(Math.abs(n)<1e-10?0:n).toFixed(2);
  function plot(result){
    const p=result.options,ink='var(--ink)',accent='var(--accent)',muted='var(--muted)',bg='var(--bg)',soft='var(--soft)';
    const px=x=>65+x*245,py=y=>305-y*245,segments=[];
    if(p.mode==='local'){
      const candidate=[];
      if(Math.abs(p.right)>1e-9)for(const x of [-.1,1.1]){const y=(p.threshold-p.left*x)/p.right;if(y>=-.1&&y<=1.1)candidate.push([x,y]);}
      if(Math.abs(p.left)>1e-9)for(const y of [-.1,1.1]){const x=(p.threshold-p.right*y)/p.left;if(x>=-.1&&x<=1.1)candidate.push([x,y]);}
      if(candidate.length>=2)segments.push(`<line x1="${px(candidate[0][0])}" y1="${py(candidate[0][1])}" x2="${px(candidate[1][0])}" y2="${py(candidate[1][1])}" stroke="${accent}" stroke-width="2.5"/>`);
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 365" role="img" aria-label="네 경우의 특징 좌표와 현재 판단. ${result.correct}개 일치."><title>관찰한 특징과 가능한 판단</title><rect x="12" y="10" width="365" height="340" rx="10" fill="${soft}"/><path d="M45 305H342M65 326V32" fill="none" stroke="${muted}" stroke-opacity=".5"/><text x="330" y="340" font-size="11" fill="${ink}">왼쪽 변경 L</text><text x="18" y="25" font-size="11" fill="${ink}">오른쪽 변경 R</text>${segments.join('')}${result.rows.map(r=>`<g><circle cx="${px(r.left)}" cy="${py(r.right)}" r="22" fill="${r.target?accent:bg}" stroke="${ink}" stroke-width="1.5"/><text x="${px(r.left)}" y="${py(r.right)+4}" text-anchor="middle" font-size="12" fill="${r.target?bg:ink}">${r.id}</text><text x="${px(r.left)}" y="${py(r.right)+42}" text-anchor="middle" font-size="11" fill="${r.correct?accent:ink}">목표 ${r.target} · 판단 ${r.output}${r.correct?' ✓':' ×'}</text></g>`).join('')}</svg>`;
  }
  window.AtlasVisuals.register('papert-perceptrons-limits',{
    mount(host,config){
      const root=node('div','papert-perceptrons'),nav=node('div','papert-nav'),body=node('div'),listeners=[],viewListeners=[];
      nav.setAttribute('role','group');nav.setAttribute('aria-label','페퍼트의 표현 범위 논증 보기');
      let stage='features',options={mode:'local',left:1,right:1,joint:-2,threshold:0},disposed=false;
      const on=(el,event,fn,persistent=false)=>{el.addEventListener(event,fn);(persistent?listeners:viewListeners).push(()=>el.removeEventListener(event,fn));};
      const buttons=[];
      for(const [id,label] of [['features','01 무엇을 보게 할 것인가'],['limits','02 연결값만 바꾸면 될까'],['representation','03 표현을 바꾸어 보기']]){const b=node('button','',label);b.type='button';b.dataset.papertStage=id;on(b,'click',()=>{stage=id;render();},true);buttons.push(b);nav.append(b);}
      function link(title,url){const a=node('a','',title+' ↗');a.href=url;if(url.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer';}return a;}
      function render(){
        if(disposed)return;viewListeners.splice(0).forEach(remove=>remove());if(stage==='limits')options={...options,mode:'local'};root.dataset.stage=stage;root.dataset.featureMode=options.mode;
        buttons.forEach(b=>{const active=b.dataset.papertStage===stage;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});body.replaceChildren();
        const panel=node('section','papert-panel');panel.dataset.papertPanel=stage;
        const labels={features:['THE QUESTION OF REPRESENTATION','많은 연결을 주면, 어떤 생각이든 담을 수 있을까?'],limits:['WEIGHTS CANNOT CREATE MISSING FEATURES','세 경우를 맞추면, 네 번째에서 모순이 생긴다'],representation:['CHANGE WHAT THE MACHINE CAN SEE','둘을 함께 보는 특징을 추가하면, 가능한 판단이 달라진다']};
        panel.append(node('span','papert-kicker',labels[stage][0]),node('h4','',labels[stage][1]));
        if(stage==='features'){
          panel.append(node('p','','페퍼트와 민스키가 물은 것은 단순히 연결값을 어떻게 잘 조정하느냐가 아니었다. 먼저 망에 주어진 관찰 단위가 무엇을 구별할 수 있는지, 그 단위들의 결과를 더하는 방식으로 어떤 판단을 표현할 수 있는지를 물었다.'));
          const scheme=node('div','papert-scheme');for(const [small,title,text] of [['입력 X','부분 특징 φ₁, φ₂, …','각 단위가 보는 범위와 성질을 정한다.'],['특징의 조합','가중합 Σαφ(X)','특징마다 가중치를 주어 증거를 더한다.'],['출력 ψ','문턱과 비교','정한 특징들의 선형 결합으로 판단한다.']]){const c=node('div');c.append(node('span','',small),node('b','',title),node('span','',text));scheme.append(c);}panel.append(scheme);
          panel.append(node('p','papert-reading','연결값은 이미 보이는 특징을 조합하는 방법을 바꾼다. 그러나 관찰 단계에서 구분하지 못한 관계를, 마지막 가중합만으로 언제나 복원할 수 있는 것은 아니다. 표현 가능한 판단과 그 판단을 찾는 학습 절차는 다른 문제다.'));
          const source=node('details','papert-original');source.append(node('summary','','원서의 연결성 논증 그림 함께 보기'));const img=node('img');img.src=asset('assets/papers/papert-connectedness-original.png');img.alt='서론 §0.8의 네 도형과 지름이 제한된 부분 관찰 영역. 확장판 보관 스캔에서 발췌.';img.width=1208;img.height=976;source.append(img,node('p','papert-note','원서 서론 인쇄 p.13 / 보관 스캔 PDF p.14. 네 도형과 부분 관찰 영역의 도판을 그대로 발췌했다. 아래의 두 변수 표는 이 논증의 점수 관계를 직접 요약한 것이다.'),link('원서 서론 §0.8',config.paperUrl+'#page=14'));panel.append(source);
        }else{
          panel.append(node('p','',stage==='limits'?'원서의 연결성 논증은 멀리 떨어진 양 끝을 바꾸는 네 경우를 사용한다. 한 관찰 단위가 두 끝을 동시에 볼 수 없다면, 왼쪽 변경이 점수에 더하는 양과 오른쪽 변경이 더하는 양을 나눌 수 있다. 아래에서는 그 귀결을 두 변수 L·R로 요약한다.':'왼쪽과 오른쪽의 상태를 함께 읽는 특징 L×R을 직접 추가해 보자. 두 변경의 결합을 따로 표시하면, 원래 두 특징만 보던 선형 판단과 표현할 수 있는 함수가 달라진다. 이 특징은 사람이 정한 것이며 학습으로 발견한 특징이 아니다.'));
          if(stage==='representation'){
            const toggles=node('div','papert-feature-toggle');toggles.setAttribute('role','group');toggles.setAttribute('aria-label','부분 특징과 함께 보는 특징 선택');for(const [id,label] of [['local','L·R 두 특징'],['joint','L×R 특징 추가']]){const b=node('button',options.mode===id?'active':'',label);b.type='button';b.dataset.papertMode=id;b.setAttribute('aria-pressed',String(options.mode===id));on(b,'click',()=>{options={...options,mode:id};render();});toggles.append(b);}panel.append(toggles);
          }else options={...options,mode:'local'};
          let result=window.AtlasPapertPerceptronsModel.evaluate(options);const layout=node('div','papert-layout'),art=node('div','papert-drawing');art.innerHTML=plot(result);const right=node('div');
          right.append(node('h5','','선택한 연결값으로 실제 계산'),node('p','papert-note','목표는 00·11에서 0, 01·10에서 1이다. 점의 색은 목표다. 두 특징 보기의 직선은 판단 경계이며, L×R을 추가하면 원래 두 변수에서 같은 직선으로 표현할 수 없다.'));
          const controls=node('div','papert-controls');
          for(const [key,label,min,max,step] of [['left','L의 연결값',-3,3,.25],['right','R의 연결값',-3,3,.25],...(options.mode==='joint'?[['joint','L×R의 연결값',-3,3,.25]]:[]),['threshold','문턱 θ',-3,3,.25]]){const l=node('label','',label),o=node('output','',fmt(options[key])),input=node('input');input.type='range';input.min=min;input.max=max;input.step=step;input.value=options[key];input.setAttribute('aria-label',label);input.dataset.papertParameter=key;on(input,'input',()=>{options={...options,[key]:Number(input.value)};o.textContent=fmt(options[key]);refresh();});l.append(o,input);controls.append(l);}right.append(controls);
          const actions=node('div','papert-actions');for(const [id,label,values] of [['reset','두 특징으로 시작',{mode:'local',left:1,right:1,joint:-2,threshold:0}],...(stage==='representation'?[['joint-preset','함께 보는 특징으로 네 경우 맞추기',{mode:'joint',left:1,right:1,joint:-2,threshold:0}]]:[])]){const b=node('button','',label);b.type='button';b.dataset.papertPreset=id;on(b,'click',()=>{options={...values};render();});actions.append(b);}right.append(actions);
          const status=node('p','papert-status','네 경우 중 '+result.correct+'개 일치');status.setAttribute('role','status');status.dataset.papertCorrect=String(result.correct);right.append(status);layout.append(art,right);panel.append(layout);
          const viewport=node('div','papert-table-view');viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','네 경우의 점수 표를 가로로 이동');const table=node('table','papert-table');table.innerHTML='<thead><tr><th>변경 L·R</th><th>함께 봄 L×R</th><th>점수 s</th><th>목표</th><th>판단</th></tr></thead>';const rows=node('tbody');for(const r of result.rows){const tr=node('tr');for(const t of [r.id,String(r.product),fmt(r.score),String(r.target),String(r.output)+(r.correct?' · 일치':' · 불일치')]){const td=node('td','',t);td.dataset.ok=String(r.correct);tr.append(td);}rows.append(tr);}table.append(rows);viewport.append(table);panel.append(viewport);
          const equation=node('pre','papert-equation');
          if(options.mode==='local')panel.append(equation,node('p','papert-reading','이 모순은 슬라이더를 덜 잘 조정했기 때문에 생기지 않는다. 두 특징의 선형 결합이라는 표현의 제한에서 생긴다. 슬라이더 범위를 전부 시험한 결과가 아니라, 모든 실수 연결값에 적용되는 점수 관계다.'));
          else panel.append(equation,node('p','papert-reading','추가한 특징이 두 변수의 결합을 담기 때문에 앞의 합 관계가 더 이상 유지되지 않는다. 정해진 특징 위의 학습과 특징 자체를 바꾸는 학습을 구분하면, 이후 역전파가 내부 표현을 학습 대상으로 삼은 의미도 이어 읽을 수 있다.'));
          function refresh(){result=window.AtlasPapertPerceptronsModel.evaluate(options);art.innerHTML=plot(result);status.textContent='네 경우 중 '+result.correct+'개 일치';status.dataset.papertCorrect=String(result.correct);rows.replaceChildren();for(const r of result.rows){const tr=node('tr');for(const t of [r.id,String(r.product),fmt(r.score),String(r.target),String(r.output)+(r.correct?' · 일치':' · 불일치')]){const td=node('td','',t);td.dataset.ok=String(r.correct);tr.append(td);}rows.append(tr);}equation.textContent=options.mode==='local'?'s₀₀ + s₁₁ = s₀₁ + s₁₀\n현재: '+fmt(result.leftSum)+' = '+fmt(result.rightSum)+'\n목표를 모두 맞추려면 왼쪽 합 ≤ 0, 오른쪽 합 > 0\n같은 두 합이 이 조건을 동시에 만족할 수 없다.':'s = '+fmt(options.left)+'L + '+fmt(options.right)+'R + '+fmt(options.joint)+'LR − '+fmt(options.threshold)+'\n현재 점수: '+result.rows.map(r=>r.id+' → '+fmt(r.score)).join(', ')+'\ns₀₀ + s₁₁ − s₀₁ − s₁₀ = '+fmt(result.identityResidual);}
          refresh();
          panel.append(node('p','papert-note','두 변수·수치·슬라이더와 L×R 특징은 직접 구성했다. 원서의 지름 제한 연결성 정리 전체나 원래 도형의 인식기를 구현한 것이 아니며, 연결성의 모든 경우나 모든 신경망의 한계를 뜻하지 않는다.'));
        }
        const links=node('div','papert-links');links.append(link('로젠블랫 · 퍼셉트론','#event=perceptron'),link('루멜하트·힌턴·윌리엄스 · 역전파','#event=backprop'),link('민스키 인물 기록','#person=marvin-minsky'));panel.append(links);body.append(panel);
      }
      root.append(nav,body);host.append(root);render();return()=>{disposed=true;listeners.forEach(remove=>remove());viewListeners.forEach(remove=>remove());root.remove();};
    }
  });
})();
