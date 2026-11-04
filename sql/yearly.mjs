/* Year links filter one canonical set of point articles. No progress data is used. */
export function mountYearly(doc = document, win = window) {
  const root = doc.getElementById('yearly-main');
  if (!root) throw new Error('The yearly learning page is missing its main content.');
  const navigation = root.querySelector('.yearly-years');
  const links = navigation ? [...navigation.querySelectorAll('a[data-year]')] : [];
  const articles = [...root.querySelectorAll('#yearly-points article[data-point]')];
  const panels = [...root.querySelectorAll('[data-year-panel]')];
  const count = root.querySelector('[data-year-count]');
  const summary = root.querySelector('#year-summary');
  const header = doc.querySelector('.learning-header');
  const years = new Set(links.map(link => link.dataset.year));
  const points = new Map();
  if (!navigation || !years.has('all') || !articles.length || !count || !summary) {
    throw new Error('The yearly learning page has incomplete navigation or point content.');
  }
  const panelYears = new Set(panels.map(panel => panel.dataset.yearPanel));
  if (years.size !== links.length || panelYears.size !== panels.length || [...years].some(year => !panelYears.has(year))) {
    throw new Error('Each supported year needs one navigation link and one summary panel.');
  }
  for (const article of articles) {
    if (!article.dataset.point || points.has(article.dataset.point) || !article.id) {
      throw new Error('Yearly point articles need unique point names and HTML IDs.');
    }
    const mentioned = new Set((article.dataset.years || '').trim().split(/\s+/).filter(year => years.has(year) && year !== 'all'));
    if (!mentioned.size) throw new Error('A yearly point needs at least one supported year.');
    points.set(article.dataset.point, {article, years: mentioned});
  }

  const syncStickyOffsets = () => {
    const headerStyle = header ? win.getComputedStyle(header) : null;
    const pinnedHeader = headerStyle && ['sticky', 'fixed', '-webkit-sticky'].includes(headerStyle.position);
    const headerTop = pinnedHeader ? Math.max(0, parseFloat(headerStyle.top) || 0) : 0;
    const headerHeight = pinnedHeader ? Math.max(0, header.getBoundingClientRect().height) : 0;
    const headerOffset = headerTop + headerHeight;
    const navHeight = Math.max(0, navigation.getBoundingClientRect().height);
    root.style.setProperty('--yearly-header-offset', headerOffset + 'px');
    root.style.setProperty('--yearly-nav-height', navHeight + 'px');
    root.style.setProperty('--yearly-anchor-offset', (headerOffset + navHeight + 16) + 'px');
  };
  // A mobile header is in normal flow. The year strip then sticks at viewport top.
  syncStickyOffsets();
  const resizeObserver = typeof win.ResizeObserver === 'function' ? new win.ResizeObserver(syncStickyOffsets) : null;
  if (resizeObserver) {
    if (header) resizeObserver.observe(header);
    resizeObserver.observe(navigation);
  }
  win.addEventListener('resize', syncStickyOffsets);

  const readYear = url => years.has(url.searchParams.get('year')) ? url.searchParams.get('year') : 'all';
  const hashArticle = url => {
    let id;
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { return null; }
    const target = id ? doc.getElementById(id) : null;
    const article = target?.closest('article[data-point]');
    return article && root.contains(article) ? article : null;
  };
  const visibleFor = (article, year) => year === 'all' || points.get(article.dataset.point).years.has(year);
  const localURL = url => url.pathname + url.search + url.hash;
  const setURLYear = (url, year) => {
    if (year === 'all') url.searchParams.delete('year');
    else url.searchParams.set('year', year);
    return url;
  };
  const scrollTo = target => {
    syncStickyOffsets();
    if (typeof target?.scrollIntoView === 'function') target.scrollIntoView({block: 'start'});
  };
  const render = year => {
    let visible = 0;
    for (const {article} of points.values()) {
      article.hidden = !visibleFor(article, year);
      if (!article.hidden) visible++;
    }
    for (const panel of panels) panel.hidden = panel.dataset.yearPanel !== year;
    for (const link of links) {
      if (link.dataset.year === year) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    const active = links.find(link => link.dataset.year === year);
    const navBox = navigation.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    if (activeBox.left < navBox.left) navigation.scrollLeft += activeBox.left - navBox.left;
    else if (activeBox.right > navBox.right) navigation.scrollLeft += activeBox.right - navBox.right;
    count.textContent = (year === 'all' ? '전체 연도 · 중복을 합친 ' : year + '년 · ') + '핵심 포인트 ' + visible + '개';
    root.dataset.selectedYear = year;
    return visible;
  };
  const fromLocation = ({initial = false} = {}) => {
    const url = new URL(win.location.href);
    let year = readYear(url);
    const target = hashArticle(url);
    const reveal = target && !visibleFor(target, year);
    if (reveal) year = 'all';
    render(year);
    // A shared point permalink remains usable even with an unrelated year query.
    if (reveal || (url.searchParams.has('year') && !years.has(url.searchParams.get('year')))) {
      setURLYear(url, year);
      win.history.replaceState(win.history.state, '', localURL(url));
    }
    if (target && (initial || reveal)) {
      if (typeof win.requestAnimationFrame === 'function') win.requestAnimationFrame(() => scrollTo(target));
      else scrollTo(target);
    }
  };
  const onNavigation = event => {
    const link = event.target.closest?.('a[data-year]');
    if (!link || !navigation.contains(link) || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
    const year = link.dataset.year;
    if (!years.has(year)) return;
    event.preventDefault();
    const url = setURLYear(new URL(win.location.href), year);
    url.hash = 'year-summary';
    render(year);
    if (localURL(url) !== win.location.pathname + win.location.search + win.location.hash) {
      win.history.pushState({yearlyYear: year}, '', localURL(url));
    }
    scrollTo(summary);
  };
  navigation.addEventListener('click', onNavigation);
  const restore = () => fromLocation();
  win.addEventListener('popstate', restore);
  win.addEventListener('hashchange', restore);
  fromLocation({initial: true});
  root.dataset.yearlyReady = 'true';
  return {
    get selectedYear() { return root.dataset.selectedYear; },
    destroy() {
      navigation.removeEventListener('click', onNavigation);
      win.removeEventListener('popstate', restore);
      win.removeEventListener('hashchange', restore);
      win.removeEventListener('resize', syncStickyOffsets);
      resizeObserver?.disconnect();
      delete root.dataset.yearlyReady;
    }
  };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') mountYearly();
