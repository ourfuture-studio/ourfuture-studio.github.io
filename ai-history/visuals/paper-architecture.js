/* Original paper figures, preserved separately from our explanatory diagrams. */
(function(){
  'use strict';
  const papers={
    'lecun-1989':{
      title:'1989 · 논문에 실린 실제 망과 특징 반응',
      image:'assets/papers/lecun-1989-figure4-architecture.png',width:2168,height:1124,
      alt:'1989년 논문 Figure 4. 아래의 28×28 입력에서 H1 4×24×24, H2 4×12×12, H3 12×8×8, H4 12×4×4를 거쳐 위의 10개 출력으로 이어지는 원본 특징 반응 도판.',
      caption:'아래의 입력에서 위의 출력으로 읽습니다. 각 판은 한 특징 지도이며, 논문이 제시한 실제 반응의 모양을 담고 있습니다. 층의 이름과 크기뿐 아니라, 한 숫자가 여러 특징 반응으로 바뀌는 모습도 함께 보세요.',
      source:'LeCun 외 · Handwritten Digit Recognition with a Back-Propagation Network (NIPS 1989)',
      url:'https://proceedings.neurips.cc/paper_files/paper/1989/file/53c3bce66e43be4f209556518c2fcb54-Paper.pdf#page=6',
      credit:'원문 Fig.4 · 인쇄 p.401 / PDF p.6. 도판 영역을 발췌하고 글자를 읽는 방향으로 회전했습니다. 그림·라벨·특징 반응은 다시 그리지 않았습니다.',
      distinction:'이 망은 1989년 연구입니다. 아래에서 연결하는 1998년 LeNet-5와 층 구성·입력 크기를 구분합니다.'
    },
    'lenet-5-1998':{
      title:'LeNet-5 · 원논문의 전체 아키텍처',
      image:'assets/papers/lenet-5-1998-figure2-architecture.png',width:2120,height:616,
      alt:'LeNet-5 원논문 Figure 2. 32×32 입력, C1 6×28×28, S2 6×14×14, C3 16×10×10, S4 16×5×5, C5 120, F6 84, 출력 10. 합성곱·서브샘플링·완전 연결·Gaussian connections를 원본 형태로 표시.',
      caption:'왼쪽의 영상이 여러 특징 지도로 바뀌고, 지도의 공간 크기는 줄어들며, 오른쪽의 숫자 판단으로 이어집니다. 쌓인 판은 특징 지도를, 작은 사각형과 선은 국소 연결 범위를 나타냅니다.',
      source:'LeCun·Bottou·Bengio·Haffner · Gradient-Based Learning Applied to Document Recognition (1998)',
      url:'https://leon.bottou.org/publications/pdf/ieee-1998.pdf#page=7',
      credit:'원문 Fig.2 · 저자 보관 원고 PDF p.7. 도판 영역을 발췌했습니다. 층의 수·크기·연결 표기는 원본 그대로입니다.',
      distinction:'S2·S4는 원문의 서브샘플링이며, 마지막 출력은 RBF 기준과의 거리입니다. 아래에서 시각계의 발상과 각 층의 설계를 연결해 읽을 수 있습니다.'
    }
  };
  const recordFigures=new Map([['lecun-handwritten-1989','lecun-1989'],['lenet','lenet-5-1998']]);
  function register(entries){
    for(const entry of entries){
      const {workId,key,paper,note}=entry;
      if(!workId||!/^[a-z0-9-]+$/.test(key))throw new Error('Invalid original-source figure key');
      if(paper&&note)throw new Error('Choose a source figure or reading note: '+key);
      if(paper){
        if(papers[key])throw new Error('Duplicate original-source figure: '+key);
        if(!paper.image?.startsWith('assets/')||!paper.url?.startsWith('https://')||!(paper.width>0&&paper.height>0))throw new Error('Incomplete original-source figure: '+key);
        papers[key]=Object.freeze(paper);
      }
      if(note){
        if(papers[key]||!note.title||!note.body||!note.source||!note.url?.startsWith('https://'))throw new Error('Incomplete original-source reading note: '+key);
        papers[key]=Object.freeze({...note,kind:'note'});
      }
      if(!papers[key])throw new Error('Unregistered original-source image: '+key);
      if(recordFigures.has(workId)&&recordFigures.get(workId)!==key)throw new Error('Duplicate figure for record: '+workId);
      recordFigures.set(workId,key);
    }
  }
  function keyForRecord(record){return recordFigures.get(record.eventId||record.id);}
  function kindForRecord(record){const key=keyForRecord(record);return key?(papers[key].kind||'figure'):null;}
  function mountForRecord(host,record){const key=keyForRecord(record);return key?mount(host,key):null;}
  function node(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
  function mount(host,key){
    const p=papers[key];if(!p)throw new Error('Unknown paper architecture: '+key);
    const section=node('section','paper-architecture');section.dataset.paperArchitecture=key;
    section.dataset.sourceKind=p.kind||'figure';
    if(p.kind==='note'){
      section.append(node('span','paper-architecture-label','원자료 읽기'),node('h4','paper-architecture-title',p.title),node('p','paper-architecture-caption',p.body));
      const credit=node('div','paper-architecture-credit'),link=node('a','',p.source+' ↗');link.href=p.url;link.target='_blank';link.rel='noopener noreferrer';credit.append(link);if(p.credit)credit.append(node('p','',p.credit));section.append(credit);host.append(section);return section;
    }
    section.append(node('span','paper-architecture-label',p.label||'원논문 도판'),node('h4','paper-architecture-title',p.title));
    const toolbar=node('div','paper-architecture-toolbar'),button=node('button','paper-architecture-zoom','그림 크게 보기');
    const viewer=node('div','paper-architecture-viewer');viewer.id='paper-architecture-'+key;viewer.tabIndex=0;viewer.setAttribute('role','region');viewer.setAttribute('aria-label',p.title+' · 확대한 뒤 가로로 이동할 수 있습니다.');
    button.type='button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',viewer.id);button.dataset.paperZoom=key;
    toolbar.append(node('span','',p.prompt||'원자료에 실린 구조와 표현을 직접 확인하세요.'),button);section.append(toolbar);
    const figure=node('figure'),img=node('img');img.src=window.ATLAS_EMBEDDED_IMAGES?.[p.image.slice(7)]||p.image;img.alt=p.alt;img.width=p.width;img.height=p.height;img.decoding='async';img.dataset.paperImage=key;
    if(p.background){if(!/^#[a-f0-9]{6}$/i.test(p.background))throw new Error('Invalid source image backdrop');viewer.style.backgroundColor=p.background;img.style.backgroundColor=p.background;}
    viewer.append(img);figure.append(viewer,node('figcaption','paper-architecture-caption',p.caption));section.append(figure);
    button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));button.textContent=expanded?'전체 그림으로 보기':'그림 크게 보기';viewer.classList.toggle('is-expanded',expanded);viewer.scrollLeft=0;});
    const credit=node('div','paper-architecture-credit'),a=node('a','',p.source+' ↗');a.href=p.url;a.target='_blank';a.rel='noopener noreferrer';credit.append(a,node('p','',p.credit));section.append(credit,node('p','paper-architecture-distinction',p.distinction));host.append(section);return section;
  }
  window.AtlasPaperArchitecture=Object.freeze({mount,mountForRecord,register,keyForRecord,kindForRecord});
})();
