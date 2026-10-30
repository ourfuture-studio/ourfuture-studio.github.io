import { CATALOG } from './catalog.mjs';
import { createProgressStore } from './progress.mjs';

// Additive integration: the existing app.mjs remains responsible for the
// calculator and quiz explanation. Only read/bookmark/answer history is saved
// by the progress store; experimental inputs are never read or saved here.
const lessonNode = document.getElementById('lesson-data');
if (lessonNode && !document.getElementById('learning-lesson-nav')) {
  let data;
  try { data = JSON.parse(lessonNode.textContent); } catch { data = null; }
  const item = data && CATALOG.find(record => record.code === data.code);
  const host = document.querySelector('header .wrap') || document.querySelector('header');
  if (item && host) {
    const store = createProgressStore({ catalog: CATALOG });
    const code = item.code;
    const nav = document.createElement('nav');
    nav.id = 'learning-lesson-nav';
    nav.className = 'learner-nav';
    nav.setAttribute('aria-label', '학습 메뉴');
    for (const [label, href] of [
      ['홈', 'index.html'], ['과목별 핵심', 'study.html'],
      ['문제 풀기', 'practice.html'], ['체험', 'experiments.html'],
      ['오답노트', 'review.html']
    ]) {
      const link = document.createElement('a');
      link.textContent = label;
      link.href = href;
      nav.append(link);
    }
    host.prepend(nav);

    const tools = document.createElement('div');
    tools.id = 'learning-lesson-tools';
    tools.className = 'learner-tools';
    const read = document.createElement('button');
    read.type = 'button';
    read.id = 'learning-mark-read';
    const bookmark = document.createElement('button');
    bookmark.type = 'button';
    bookmark.id = 'learning-bookmark';
    const status = document.createElement('p');
    status.id = 'learning-lesson-status';
    status.className = 'learner-status';
    status.setAttribute('aria-live', 'polite');
    tools.append(read, bookmark, status);
    const privacy = document.createElement('p');
    privacy.id = 'learning-storage-note';
    privacy.className = 'learner-status';
    privacy.textContent = '읽음·북마크·문제 답안 기록만 이 브라우저에 저장합니다. 실험 입력값은 저장하지 않습니다.';
    tools.append(privacy);
    host.append(tools);

    const current = () => store.get().records[code] || {};
    const render = () => {
      const record = current();
      read.disabled = Boolean(record.read);
      read.textContent = record.read ? '읽음으로 표시됨' : '읽음 표시';
      bookmark.textContent = record.bookmark ? '북마크 해제' : '북마크';
      bookmark.setAttribute('aria-pressed', String(Boolean(record.bookmark)));
      const attempts = Number(record.attempts) || 0;
      const latest = attempts ? (record.lastCorrect ? '최근 답안 정답' : '최근 답안 오답') : '아직 푼 기록 없음';
      status.textContent = `${record.read ? '읽음' : '읽지 않음'} · ${record.bookmark ? '북마크함' : '북마크 안 함'} · 풀이 ${attempts}회 · ${latest}`;
      if (store.warning) status.textContent += ' · ' + store.warning;
    };
    const remember = () => store.setLastLocation({ code, kind: 'lesson' });
    read.addEventListener('click', () => {
      // Repeated clicks do not unset read state; the store contract is markRead.
      if (!current().read) store.markRead(code);
      remember();
    });
    bookmark.addEventListener('click', () => {
      store.setBookmark(code, !current().bookmark);
      remember();
    });

    let selectionRevision = 0;
    let recordedRevision = -1;
    let recordedAnswer = null;
    for (const radio of document.querySelectorAll('input[name="quiz"]')) {
      radio.addEventListener('change', () => { selectionRevision += 1; });
    }
    const check = document.getElementById('check-answer');
    if (check) check.addEventListener('click', () => {
      const selected = document.querySelector('input[name="quiz"]:checked');
      const answer = Number(selected?.value);
      if (!selected || !Number.isInteger(answer) || answer < 1 || answer > 4) return;
      if (recordedRevision === selectionRevision && recordedAnswer === answer) return;
      store.recordAnswer(code, answer);
      recordedRevision = selectionRevision;
      recordedAnswer = answer;
      remember();
      // No solver call, preventDefault, stopPropagation or feedback-DOM edits:
      // the original quiz listener runs independently and remains unchanged.
    });
    store.subscribe(render);
    render();
    remember();
  }
}
