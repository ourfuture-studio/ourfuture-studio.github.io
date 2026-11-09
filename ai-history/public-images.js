/* Public distribution layer. Authored models and article data stay separate. */
(function () {
  'use strict';
  const sources = {
  "alphago-2016-search-cycle.png": {
    "url": "https://storage.googleapis.com/deepmind-media/alphago/AlphaGoNaturePaper.pdf#page=3",
    "title": "원논문 Figure3 · 선택·확장·평가·되돌림 갱신"
  },
  "bengio-2003-architecture.png": {
    "url": "https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf#page=6",
    "title": "원논문 Fig.1 · 같은 표 C를 여러 위치에서 조회한다"
  },
  "cilp-1999-recurrent-network.png": {
    "url": "https://openaccess.city.ac.uk/id/eprint/301/2/The_connectionist_inductive_learning.pdf#page=14",
    "title": "원논문 Figure3 · 같은 원자의 출력을 입력에 되돌리다"
  },
  "deepproblog-2018-addition-program.png": {
    "url": "https://arxiv.org/pdf/1805.10872v2#page=12",
    "title": "원논문 Listing 1 · 읽을 부분과 더할 부분을 나누다"
  },
  "deepproblog-2018-learning-pipeline.png": {
    "url": "https://arxiv.org/pdf/1805.10872v2#page=5",
    "title": "원논문 Fig.2 · 질의의 오차를 신경망까지 보내다"
  },
  "dreamcoder-2021-map-abstraction.png": {
    "url": "https://people.csail.mit.edu/asolar/papers/EllisWNSMHCST21.pdf#page=3",
    "title": "원논문 Figure2 · 다른 해법에서 map을 드러내다"
  },
  "expert-1977-situation-action.png": {
    "url": "https://ijcai.org/proceedings/1977/0231.pdf#page=6",
    "title": "원문 §3.1.3 · 분야의 설명을 계산 가능한 규칙으로 적다"
  },
  "finn-2017-maml-initialization.png": {
    "url": "https://proceedings.mlr.press/v70/finn17a/finn17a.pdf#page=2",
    "title": "원논문 Fig.1 · 적응하기 쉬운 θ를 향한 메타학습"
  },
  "frames-1974-shared-terminals.png": {
    "url": "https://dspace.mit.edu/server/api/core/bitstreams/d1a55020-5fff-458c-abc4-07432e3544bd/content#page=10",
    "title": "원문 Figure1.2 · 다른 장면 틀이 같은 면의 기록을 공유하다"
  },
  "goodfellow-2014-distribution-game.png": {
    "url": "https://arxiv.org/pdf/1406.2661v1#page=3",
    "title": "원논문 Fig.1 · 두 분포와 판별자가 바뀌는 네 장면"
  },
  "gpt1-2018-architecture-tasks.png": {
    "url": "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf#page=4",
    "title": "원문의 구조와 네 과제의 입력 변환"
  },
  "gpt1-2018-transfer-zero-shot.png": {
    "url": "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf#page=7",
    "title": "얼마나 전이했는가와, 사전학습 중 나타난 별도 관찰"
  },
  "gpt2-2019-summary-hint.png": {
    "url": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=6",
    "title": "같은 언어모형에 TL;DR:를 붙였을 때"
  },
  "gpt2-2019-task-transfer.png": {
    "url": "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf#page=2",
    "title": "모형을 키웠을 때, 서로 다른 과제에서 무엇이 달라졌나"
  },
  "gpt3-2020-arithmetic.png": {
    "url": "https://arxiv.org/pdf/2005.14165v4#page=23",
    "title": "두 자리 덧셈의 성공이, 모든 산술의 성공은 아니다"
  },
  "gpt3-2020-context-scaling.png": {
    "url": "https://proceedings.neurips.cc/paper/2020/file/1457c0d6bfcb4967418bfb8ac142f64a-Paper.pdf#page=2",
    "title": "모형의 크기와 문맥 속 예시를 함께 바꾸어 살피다"
  },
  "gpt3-2020-learning-settings.png": {
    "url": "https://arxiv.org/pdf/2005.14165v4#page=7",
    "title": "예시를 입력에 둘 때와, 가중치 갱신에 쓸 때"
  },
  "gruber-1993-portable-ontology.png": {
    "url": "https://tomgruber.org/writing/ontolingua-kaj-1993.pdf#page=8",
    "title": "원논문 Fig.1 · 하나의 온톨로지, 여러 응용"
  },
  "gruber-1993-translation-architecture.png": {
    "url": "https://tomgruber.org/writing/ontolingua-kaj-1993.pdf#page=17",
    "title": "원논문 Fig.2 · 공통 표현에서 대상별 번역으로"
  },
  "instructgpt-2022-human-preference.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf#page=2",
    "title": "사람이 더 선호한 답인가를, 같은 비교 기준에서 평가하다"
  },
  "instructgpt-2022-pretraining-mix.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Supplemental-Conference.pdf#page=34",
    "title": "선호 보상과 기존 언어능력을 함께 살피다"
  },
  "instructgpt-2022-three-stages.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2022/file/b1efde53be364a73914f58805a001731-Paper-Conference.pdf#page=4",
    "title": "원문의 세 단계: 시범·비교·강화학습"
  },
  "jumper-2021-outer-product-mean.png": {
    "url": "https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_MOESM1_ESM.pdf#page=18",
    "title": "원논문 보충 Fig.5 · MSA 표현에서 잔기쌍 표현으로"
  },
  "kbann-1990-rule-network.png": {
    "url": "https://cdn.aaai.org/AAAI/1990/AAAI90-129.pdf#page=3",
    "title": "원논문 Figure 1 · 지식베이스를 신경망으로 옮기기"
  },
  "kimi-k2-2025-agent-trajectories.png": {
    "url": "https://arxiv.org/pdf/2507.20534v1#page=10",
    "title": "원문 Figure8(b) · 도구를 쓰는 경로를 만들고 검수하다"
  },
  "kr-1982-meaning-postulate.png": {
    "url": "https://cdn.aaai.org/AAAI/1982/AAAI82-045.pdf#page=3",
    "title": "원문 §4 · 개념의 뜻이 사실의 이론에 들어오는 의미 공준"
  },
  "ltn-2022-grounding-graph.png": {
    "url": "https://openaccess.city.ac.uk/id/eprint/27580/1/2012.13635.pdf#page=8",
    "title": "원논문 Figure1 · 기호의 결합을 tensor계산으로 옮기다"
  },
  "ngiam-2011-competition.png": {
    "url": "https://cs.stanford.edu/~jngiam/papers/NgiamKohChenBhaskarNg2011.pdf#page=4",
    "title": "원논문 Fig.1 · 정규화와 경쟁의 기하"
  },
  "nscl-2019-concept-space.png": {
    "url": "https://nscl.csail.mit.edu/data/papers/2019ICLR-NSCL.pdf#page=4",
    "title": "원논문 Fig.3 · 물체 특징을 개념과 비교하다"
  },
  "nscl-2019-curriculum-execution.png": {
    "url": "https://nscl.csail.mit.edu/data/papers/2019ICLR-NSCL.pdf#page=5",
    "title": "원논문 Fig.4 · 쉬운 질문에서 복잡한 조합으로"
  },
  "nscl-2019-framework.png": {
    "url": "https://nscl.csail.mit.edu/data/papers/2019ICLR-NSCL.pdf#page=3",
    "title": "원논문 Fig.2 · 질문의 답이 두 경로를 잇다"
  },
  "peebles-2023-latent-transformer.png": {
    "url": "https://openaccess.thecvf.com/content/ICCV2023/papers/Peebles_Scalable_Diffusion_Models_with_Transformers_ICCV_2023_paper.pdf#page=3",
    "title": "원논문 Fig.3 왼쪽 · 잠재 격자에서 잡음·공분산 출력까지"
  },
  "pi05-2025-hierarchical-factorization.png": {
    "url": "https://arxiv.org/pdf/2504.16054v1#page=5",
    "title": "원문 §IV-A · 언어 하위과제와 행동 묶음의 조건부 연결"
  },
  "prolog-1974-member-computations.png": {
    "url": "https://www.doc.ic.ac.uk/~rak/papers/IFIP%2074.pdf#page=3",
    "title": "원문 Fig.2 · 같은 질문에서 두 답과 실패 경로가 생기다"
  },
  "robinson-1965-refutation-example.png": {
    "url": "https://web.stanford.edu/class/linguist289/robinson65.pdf#page=14",
    "title": "원논문 §6 Example 2 · C₉가 빈 절이 되는 반박"
  },
  "semantic-web-2001-cook-search.png": {
    "url": "https://lassila.org/publications/2001/SciAm.pdf#page=6",
    "title": "원문 도식 · 한 페이지에 없는 답을 여러 관계로 찾다"
  },
  "semantic-web-2001-intelligent-agents.png": {
    "url": "https://lassila.org/publications/2001/SciAm.pdf#page=8",
    "title": "원문 도식 · 온톨로지와 여러 서비스를 거쳐 계획으로"
  },
  "seq2seq-sentences-pca.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2014/file/5a18e133cbf9f257297f410bb7eca942-Paper.pdf#page=6",
    "title": "원문이 학습한 문장 표현"
  },
  "strips-1971-search-tree.png": {
    "url": "https://www.ijcai.org/proceedings/1971/0063.pdf#page=4",
    "title": "원문 Figure 1 · 세계 모형과 남은 목표가 함께 있는 탐색 나무"
  },
  "transformer-2017-architecture.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf#page=3",
    "title": "원문의 전체 구조 · Attention 다음에도 계산은 이어진다"
  },
  "transformer-2017-attention-anaphora.png": {
    "url": "https://arxiv.org/pdf/1706.03762v5#page=14",
    "title": "its를 표현할 때, 서로 다른 Head가 참고한 곳"
  },
  "transformer-2017-attention-long-distance.png": {
    "url": "https://arxiv.org/pdf/1706.03762v5#page=13",
    "title": "떨어진 말을 직접 참고한, 학습 후의 관찰"
  },
  "visual-genome-2016-scene-graph.png": {
    "url": "https://arxiv.org/pdf/1602.07332v1#page=6",
    "title": "원문 Fig.4 하단 · 객체·속성·관계를 연결한 장면 그래프 부분"
  },
  "word2vec-capitals-pca.png": {
    "url": "https://proceedings.neurips.cc/paper_files/paper/2013/file/9aa42b31882ec039965f3c4923ce901b-Paper.pdf#page=4",
    "title": "나라와 수도의 관계가, 학습된 표현에서 나타나다"
  }
};
  const links = new WeakMap();
  function connect(image) {
    const file = image.dataset.publicSource;
    if (!file || !image.parentNode) return;
    const source = sources[file];
    let link = links.get(image);
    if (!link) {
      link = document.createElement('a');
      link.className = 'public-paper-link';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      links.set(image, link);
    }
    link.href = source.url;
    link.replaceChildren();
    const title = document.createElement('strong');
    title.textContent = '원문에서 도판 보기 ↗';
    const detail = document.createElement('span');
    detail.textContent = source.title || image.alt || '논문 원문과 확인 위치';
    link.append(title, detail);
    image.before(link);
    for (let container = image.parentElement; container && container.tagName !== 'ARTICLE'; container = container.parentElement) {
      const buttons = [...container.querySelectorAll('button')].filter(button => /원문.*(?:크게|확대)|화면 너비/.test(button.textContent));
      if (!buttons.length) continue;
      for (const button of buttons) {
        button.hidden = true;
        button.style.setProperty('display', 'none', 'important');
      }
      break;
    }
  }
  function setSource(image, file) {
    if (!sources[file]) {
      links.get(image)?.remove();
      delete image.dataset.publicSource;
      image.style.removeProperty('display');
      image.removeAttribute('aria-hidden');
      image.src = window.ATLAS_EMBEDDED_IMAGES?.[file] || 'assets/' + file;
      return;
    }
    image.removeAttribute('src');
    image.style.setProperty('display', 'none', 'important');
    image.setAttribute('aria-hidden', 'true');
    image.dataset.publicSource = file;
    connect(image);
  }
  window.AtlasPublicAssets = Object.freeze({ setSource });
  if (typeof document === 'undefined') return;
  const observer = new MutationObserver(records => {
    for (const record of records) for (const added of record.addedNodes) {
      if (added.nodeType !== 1) continue;
      if (added.matches('img[data-public-source]')) connect(added);
      for (const image of added.querySelectorAll('img[data-public-source]')) connect(image);
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

/* File-specific retained image attribution. */
if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>{const c=document.createElement('p');c.className='about-note';c.append('Transformer-XL 도판: Dai 외 (2019), ACL. 원문의 Fig.2를 발췌했습니다. ');const a=document.createElement('a');a.href='https://creativecommons.org/licenses/by/4.0/';a.target='_blank';a.rel='noopener noreferrer';a.textContent='CC BY 4.0';c.append(a);document.getElementById('asset-credits')?.append(c);});
