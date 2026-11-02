import { CATALOG } from './catalog.mjs?v=a97b2c78257b';

export function filterTopics(topics, query = '', subject = 'all') {
  const tokens = String(query).normalize('NFKC').toLocaleLowerCase('ko').trim().split(/\s+/u).filter(Boolean);
  return topics.filter(topic => {
    if (subject !== 'all' && String(topic.subject) !== String(subject)) return false;
    const haystack = `${topic.code} ${topic.title}`.normalize('NFKC').toLocaleLowerCase('ko');
    return tokens.every(token => haystack.includes(token));
  });
}

function topicItem(topic) {
  const article = document.createElement('article');
  article.className = 'topic-index-item';
  const code = document.createElement('span');
  code.className = 'topic-index-code';
  code.textContent = `${topic.code} · ${topic.subject}과목`;
  const heading = document.createElement('h3');
  heading.textContent = topic.title;
  const links = document.createElement('div');
  links.className = 'topic-index-links';
  for (const [text, href] of [['이론 읽기', `theory/${topic.code}.html`], ['문제풀이', `practice.html?code=${topic.code}`], ['조건 바꿔 체험', `${topic.code}.html#experiment-title`]]) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    link.setAttribute('aria-label', `${topic.code} ${text}`);
    links.append(link);
  }
  article.append(code, heading, links);
  return article;
}

export function initializeSummary(root = document) {
  const search = root.querySelector('#topic-search');
  const subject = root.querySelector('#topic-subject');
  const results = root.querySelector('#topic-index-results');
  if (!search || !subject || !results) return;
  const details = root.querySelector('#topic-index-details');
  const count = root.querySelector('#topic-count');
  const summaryCount = root.querySelector('#index-summary-count');
  const render = () => {
    const topics = filterTopics(CATALOG, search.value, subject.value);
    results.replaceChildren(...topics.map(topicItem));
    count.textContent = `전체 ${CATALOG.length}개 중 ${topics.length}개 주제`;
    summaryCount.textContent = `${topics.length}개`;
    root.querySelector('#topic-empty').hidden = topics.length > 0;
    if (search.value.trim() || subject.value !== 'all') details.open = true;
  };
  search.addEventListener('input', render);
  subject.addEventListener('change', render);
  root.querySelector('#reset-topic-search').addEventListener('click', () => {
    search.value = '';
    subject.value = 'all';
    render();
    search.focus();
  });
  const printButton = root.querySelector('#print-summary');
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
  root.querySelector('#summary-search-controls').hidden = false;
  render();
}

if (typeof document !== 'undefined') initializeSummary();
