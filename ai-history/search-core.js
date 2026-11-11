/* Pure, DOM-independent search for the records actually present in AI Atlas.
 * Aliases below are retrieval aids, not claims that methods are identical.
 * Year filters always use a record's primary year, not years in dateLabel.
 */
(function (root) {
  'use strict';

  const FAMILIES = [
    ['ssi',['ssi','safe superintelligence','safe superintelligence inc','세이프 슈퍼인텔리전스']],
    ['dit',['dit','diffusion transformer','diffusion transformers','디퓨전 트랜스포머']],
    ['gan',['gan','generative adversarial nets','generative adversarial networks','생성적 적대 신경망','생성적 적대망']],
    ['maml',['maml','model agnostic meta learning','모델 불가지론적 메타학습']],
    ['word2vec',['word2vec','워드투벡','워드투백']],
    ['seq2seq',['seq2seq','sequence to sequence','시퀀스 투 시퀀스']],
    ['backpropagation', ['역전파', '오차 역전파', 'backpropagation', 'back propagation', 'backpropagating', 'back propagating', 'backprop']],
    ['lstm', ['장단기 기억', '장단기기억', 'long short term memory', 'lstm']],
    ['convolution', ['합성곱', '합성곱망', '합성곱 신경망', 'convolution', 'convolutional', 'convolutional neural network', 'convolutional neural networks', 'cnn']],
    ['attention', ['어텐션', 'attention', '트랜스포머', 'transformer']],
    ['prolog', ['프롤로그', 'prolog']],
    ['knowledge-representation', ['지식 표현', '지식표현', 'knowledge representation', '온톨로지', 'ontology']],
    ['perceptron', ['퍼셉트론', 'perceptron']],
    ['deep-learning', ['딥러닝', '깊은 학습', 'deep learning']],
    ['deep-belief', ['깊은 믿음망', '심층 믿음망', 'deep belief', 'dbn']],
    ['turing-test', ['튜링 테스트', 'turing test', '모방 게임', 'imitation game']],
    ['computability', ['계산 가능성', '계산가능성', 'computability', 'computable numbers']],
    ['neuro-symbolic', ['뉴로심볼릭', '신경 기호', '신경기호', 'neuro symbolic', 'neurosymbolic']],
    ['deepproblog', ['딥프롤로그', 'deepproblog']],
    ['nscl', ['nscl', 'ns-cl', 'neuro symbolic concept learner', '신경 기호 개념 학습기']],
    ['dreamcoder', ['드림코더', 'dreamcoder']],
    ['alphageometry', ['알파지오메트리', 'alphageometry']],
    ['alphaproof', ['알파프루프', 'alphaproof']]
  ];

  const PERSON_ALIASES = {
    'andrew ng':['앤드류 응','앤드류응','앤드루 응','앤드루응'],
    'alexandr wang':['알렉산드르 왕','알렉산드르왕','알렉산더 왕'],
    'jensen huang': ['젠슨 황','젠슨황','황런쉰','황인훈','Huang Renxun','Ren-Hsun Huang'],
    'alan turing': ['앨런 튜링', '알란 튜링', '엘런 튜링', '튜링'],
    'john mccarthy': ['존 매카시', '매카시', '맥카시'],
    'marvin minsky': ['마빈 민스키', '민스키'],
    'geoffrey hinton': ['제프리 힌턴', '제프리 힌튼', '힌턴', '힌튼'],
    'yann lecun': ['얀 르쿤', '르쿤', '르캉'],
    'artur davila garcez': ['아르투르 다빌라 가르세즈', '가르세즈', '가르세스'],
    'joshua tenenbaum': ['조슈아 테넨바움', '테넨바움'],
    'frank rosenblatt': ['프랭크 로젠블랫', '로젠블랫', '로젠블라트', '로젠블럿', '프랭크 로젠블럿'],
    'warren mcculloch': ['워런 매컬럭', '매컬럭', '맥컬럭'],
    'walter pitts': ['월터 피츠', '피츠'],
    'allen newell': ['앨런 뉴얼', '뉴얼', '뉴웰'],
    'herbert simon': ['허버트 사이먼', '사이먼'],
    'david rumelhart': ['데이비드 루멜하트', '루멜하트'],
    'ronald williams': ['로널드 윌리엄스', '윌리엄스'],
    'sepp hochreiter': ['제프 호흐라이터', '호흐라이터'],
    'jurgen schmidhuber': ['위르겐 슈미트후버', '슈미트후버', '슈미드후버'],
    'yoshua bengio': ['요슈아 벤지오', '벤지오'],
    'fei fei li': ['페이페이 리', '페이페이리'],
    'li fei fei': ['페이페이 리', '페이페이리'],
    'alex krizhevsky': ['알렉스 크리제프스키', '크리제프스키'],
    'ilya sutskever': ['일리야 수츠케버', '수츠케버'],
    'ashish vaswani': ['아시시 바스와니', '바스와니'],
    'luc de raedt': ['뤼크 드 라트', '드 라트'],
    'kevin ellis': ['케빈 엘리스', '엘리스']
  };

  function normalize(value) {
    return String(value == null ? '' : value)
      .normalize('NFKD').replace(/\p{M}/gu, '').normalize('NFC')
      .toLowerCase().replace(/ł/g, 'l').replace(/ø/g, 'o').replace(/æ/g, 'ae')
      .replace(/œ/g, 'oe').replace(/ß/g, 'ss').replace(/[’‘'`]/g, '')
      .replace(/[^\p{L}\p{N}]+/gu, ' ').replace(/\s+/g, ' ').trim();
  }
  const compact = value => normalize(value).replace(/\s/g, '');
  const canonicalName = value => {const key=normalize(value).split(' ').filter(t => t.length > 1).join(' ');return key==='li fei fei'?'fei fei li':key;};
  const plain = value => String(value == null ? '' : value).replace(/\s+/g, ' ').trim();
  const unique = values => [...new Set(values.filter(Boolean))];
  const escapeRE = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const familyKeys = new Map(FAMILIES.map(([key, aliases]) => [key, aliases.map(normalize)]));

  function aliasPattern(alias) {
    const text = compact(alias);
    if (!text) return null;
    const body = Array.from(text, escapeRE).join('\\s*');
    // One-syllable surnames must not turn words such as 논리 into person filters.
    const singleHangul = /^[가-힣]$/u.test(text);
    const start = singleHangul ? '(?<!\\p{L})' : /^[a-z0-9]/.test(text) ? '(?<![a-z0-9])' : '';
    const end = singleHangul ? '(?!\\p{L})' : /[a-z0-9]$/.test(text) ? '(?![a-z0-9])' : '';
    return new RegExp(start + body + end, 'gu');
  }

  const familyPatterns = FAMILIES.flatMap(([key, aliases]) => aliases.map(alias => ({
    type: 'family', key, alias: normalize(alias), re: aliasPattern(alias)
  })));

  function familySet(text) {
    const normalized = normalize(text);
    const result = new Set();
    for (const item of familyPatterns) {
      item.re.lastIndex = 0;
      if (item.re.test(normalized)) result.add(item.key);
    }
    return result;
  }

  function parse(query) {
    const original = String(query == null ? '' : query).trim();
    let text = original.normalize('NFKC');
    const yearFilters = [];
    const add = (from, to, label, type) => yearFilters.push({ from: Number(from), to: Number(to), label, type });

    text = text.replace(/(?<!\d)(\d{4})\s*(?:년\s*)?[-~–—〜]\s*(\d{4})(?:\s*년)?(?!\d)/gu, (all, a, b) => {
      add(Math.min(Number(a), Number(b)), Math.max(Number(a), Number(b)), all, 'range');
      return ' ';
    });
    text = text.replace(/(?<!\d)(\d{3}0)\s*년\s*대(?!\d)/gu, (all, year) => {
      add(year, Number(year) + 9, all, 'decade');
      return ' ';
    });
    text = text.replace(/(?<!\d)(\d{4})(?:\s*년)?(?!\d)/gu, (all, year) => {
      add(year, year, all, 'year');
      return ' ';
    });

    const terms = normalize(text).split(' ').filter(Boolean);
    const yearRange = yearFilters.length ? {
      from: Math.max(...yearFilters.map(f => f.from)),
      to: Math.min(...yearFilters.map(f => f.to))
    } : null;
    return {
      text: plain(text), terms, yearFilters, yearRange,
      years: unique(yearFilters.filter(f => f.type === 'year').map(f => f.from)),
      hasYearFilter: !!yearFilters.length,
      isEmpty: !terms.length && !yearFilters.length,
      invalidYearRange: !!yearRange && yearRange.from > yearRange.to
    };
  }

  function createIndex(events, profiles) {
    events = Array.isArray(events) ? events : [];
    profiles = Array.isArray(profiles) ? profiles : [];
    const nameMap = new Map();
    const identities = new Map();
    const peopleRecords = [];
    const works = new Map();
    const workIds = new Map();
    const eventMap = new Map(events.filter(Boolean).map(e => [e.id, e]));

    for (const p of profiles) {
      if (!p || !p.id) continue;
      const koParts = plain(p.nameKo).split(' ');
      const enParts = normalize(p.name).split(' ');
      const aliases = unique([
        normalize(p.name), canonicalName(p.name), normalize(p.nameKo),...(p.aliases||[]).map(normalize),
        enParts.at(-1)?.length >= 3 ? enParts.at(-1) : '',
        koParts.length > 1 ? normalize(koParts.at(-1)) : '',
        ...(PERSON_ALIASES[canonicalName(p.name)] || []).map(normalize)
      ]);
      const identity = { id: p.id, aliases, text: aliases.join(' ') };
      identities.set(p.id, identity);
      for(const name of [p.name,...(p.aliases||[])]){const key=canonicalName(name);if(!nameMap.has(key))nameMap.set(key,[]);if(!nameMap.get(key).includes(identity))nameMap.get(key).push(identity);}
    }

    function authorIdentities(names) {
      return unique((Array.isArray(names) ? names : []).flatMap(name => (nameMap.get(canonicalName(name)) || []).map(p => p.id)));
    }
    function authorText(names) {
      return unique((Array.isArray(names) ? names : []).flatMap(name => [name, ...(nameMap.get(canonicalName(name)) || []).map(p => p.text)])).join(' ');
    }
    function makeDoc(fields, personIds) {
      const text = normalize(fields.filter(Boolean).join(' '));
      return { text, compact: compact(text), families: familySet(text), personIds: new Set(personIds) };
    }
    function workText(w) {
      const c=w.content||{};
      const a=c.article||{};
      return [w.title, w.subtitle, w.summary, w.detail, w.question,
        a.question,...(a.opening||[]),a.visual?.title,...(a.visual?.mappings||[]).flatMap(m=>[m.label,m.biology,m.model,m.text]),a.takeaway?.title,a.takeaway?.text,...(a.technical?.paragraphs||[]),
        ...(c.keyIdeas||[]).flatMap(i=>[i.title,i.text]),c.theory?.text,c.theory?.formula,
        c.example?.title,c.example?.text,...(c.example?.steps||[]),c.story?.title,c.story?.text,
        ...(c.videos||[]).map(v=>v.title),...(w.sources || []).map(s => s.title), authorText(w.people)];
    }
    function mergeWork(key, w, p) {
      let target = works.get(key);
      const priority = p ? (p.enhanced === true ? 30 : p.enhanced === false ? 0 : p.nameKo ? 20 : 10) : -1;
      if (!target) {
        target = {
          kind: 'work', id: key, title: plain(w.title || w.subtitle),
          subtitle: '', summary: plain(w.summary || w.detail),
          year: Number(w.year), track: w.track,
          people: [], sources: [], _parts: [], _personIds: [], _priority: -2,
          _labelParts: []
        };
        works.set(key, target);
      }
      target._parts.push(...workText(w));
      target._labelParts.push(w.title, w.subtitle);
      target.people = unique([...target.people, ...(Array.isArray(w.people) ? w.people : [])]);
      target._personIds = unique([...target._personIds, ...authorIdentities(w.people), ...(p ? [p.id] : [])]);
      const sourceKeys = new Set(target.sources.map(s => s.url));
      for (const source of w.sources || []) if (!sourceKeys.has(source.url)) {
        target.sources.push({ title: plain(source.title), url: String(source.url || '') });
        sourceKeys.add(source.url);
      }
      if (w.eventId) target.eventId = w.eventId;
      if (priority > target._priority) {
        target._priority = priority;
        target.title = plain(w.title || w.subtitle || target.title);
        target.summary = plain(w.summary || w.detail || target.summary);
        target.year = Number(w.year);
        target.track = w.track || target.track;
        if (p) { target.personId = p.id; target.workId = w.id; }
      }
      return target;
    }

    for (const e of events) {
      if (!e || !e.id) continue;
      const eventWork = { ...e, title: e.subtitle || e.title, subtitle: e.title, eventId: e.id };
      mergeWork('event:' + e.id, eventWork, null);
      workIds.set(e.id, 'event:' + e.id);
    }
    for (const p of profiles) {
      if (!p || !p.id) continue;
      const identity = identities.get(p.id);
      const documents = [];
      const seen = new Set();
      for (const w of p.works || []) {
        if (!w || !w.id) continue;
        const eventId = w.eventId || (eventMap.has(w.id) ? w.id : null);
        const key = eventId ? 'event:' + eventId : workIds.get(w.id) || 'work:' + w.id;
        workIds.set(w.id, key);
        mergeWork(key, eventId ? { ...w, eventId } : w, p);
        if (seen.has(key)) continue;
        seen.add(key);
        documents.push({
          ...makeDoc([identity.text, ...workText(w)], [p.id, ...authorIdentities(w.people)]),
          year: Number(w.year), workId: w.id, eventId: eventId || undefined
        });
      }
      const years = unique(documents.map(w => w.year).filter(Number.isFinite)).sort((a, b) => a - b);
      peopleRecords.push({
        kind: 'person', id: 'person:' + p.id, personId: p.id,
        title: plain(p.nameKo || p.name), subtitle: plain(p.name),
        summary: plain(p.tagline || p.intro), years,
        tags: [...(p.tags || [])], _enhanced: !!p.enhanced,
        _identity: makeDoc([identity.text], [p.id]), _works: documents,
        _background: makeDoc([identity.text,root.AtlasPersonBackground?.text(p.id) || ''], [p.id]),
        _label: compact([p.nameKo, p.name, identity.text].filter(Boolean).join(' '))
      });
    }
    const workRecords = [...works.values()].map(w => {
      w.subtitle = w.people.join(' · ');
      w._doc = makeDoc(w._parts, w._personIds);
      w._label = compact(w._labelParts.filter(Boolean).join(' '));
      delete w._parts; delete w._personIds; delete w._labelParts; delete w._priority;
      return w;
    });
    const index = [...peopleRecords, ...workRecords];
    const aliases = new Map();
    for (const identity of identities.values()) for (const alias of identity.aliases) {
      const c = compact(alias);
      if (!c || (/^[a-z0-9]+$/.test(c) && c.length < 3)) continue;
      if (!aliases.has(alias)) aliases.set(alias, []);
      aliases.get(alias).push(identity.id);
    }
    Object.defineProperty(index, '_queryAliases', {
      value: [...aliases].map(([alias, ids]) => ({ type: 'person', ids: unique(ids), alias, re: aliasPattern(alias) }))
    });
    return index;
  }

  function queryTerms(index, text) {
    const normalized = normalize(text);
    const candidates = [];
    for (const entry of [...(index._queryAliases || []), ...familyPatterns]) {
      entry.re.lastIndex = 0;
      let match;
      while ((match = entry.re.exec(normalized)) !== null) {
        candidates.push({ from: match.index, to: match.index + match[0].length, entry });
        if (!match[0].length) entry.re.lastIndex++;
      }
    }
    candidates.sort((a, b) => (b.to - b.from) - (a.to - a.from) || a.from - b.from);
    const selected = [];
    for (const candidate of candidates) if (!selected.some(s => candidate.from < s.to && s.from < candidate.to)) selected.push(candidate);
    selected.sort((a, b) => a.from - b.from);
    let cursor = 0, rest = '';
    for (const span of selected) { rest += normalized.slice(cursor, span.from) + ' '; cursor = span.to; }
    rest += normalized.slice(cursor);
    return [
      ...selected.map(s => s.entry),
      ...rest.split(/\s+/).filter(Boolean).map(text => ({ type: 'word', text, compact: compact(text) }))
    ];
  }

  function matches(doc, terms) {
    return terms.every(term => term.type === 'family' ? doc.families.has(term.key)
      : term.type === 'person' ? term.ids.some(id => doc.personIds.has(id))
        : doc.compact.includes(term.compact));
  }
  function matchesYear(year, parsed) {
    return !parsed.hasYearFilter || (Number.isFinite(year) && !parsed.invalidYearRange && year >= parsed.yearRange.from && year <= parsed.yearRange.to);
  }
  function score(record, terms) {
    let value = record.kind === 'person' && record._enhanced ? 2 : 0;
    for (const term of terms) {
      if (term.type === 'word') value += record._label.includes(term.compact) ? 12 : 1;
      if (term.type === 'person') value += record.kind === 'person' && term.ids.includes(record.personId) ? 30 : 5;
      if (term.type === 'family') value += (familyKeys.get(term.key) || []).some(a => record._label.includes(compact(a))) ? 12 : 2;
    }
    return value;
  }

  function search(index, query, scope) {
    index = Array.isArray(index) ? index : [];
    query = String(query == null ? '' : query).trim();
    scope = ['all', 'person', 'work'].includes(scope) ? scope : 'all';
    const parsed = parse(query);
    const terms = queryTerms(index, parsed.text);
    const namedPeople = unique(terms.filter(t => t.type === 'person').flatMap(t => t.ids));
    let people = [], works = [];

    if (!parsed.invalidYearRange) for (const record of index) {
      if (record.kind === 'person' && scope !== 'work') {
        if (namedPeople.length && !namedPeople.includes(record.personId)) continue;
        const direct = !parsed.hasYearFilter && (matches(record._identity, terms) || matches(record._background, terms));
        if (direct || record._works.some(w => matchesYear(w.year, parsed) && matches(w, terms))) people.push(record);
      } else if (record.kind === 'work' && scope !== 'person') {
        if (matchesYear(record.year, parsed) && matches(record._doc, terms)) works.push(record);
      }
    }
    const order = (a, b) => score(b, terms) - score(a, terms)
      || (a.kind === 'work' ? a.year - b.year : Number(b._enhanced) - Number(a._enhanced))
      || a.title.localeCompare(b.title, 'ko');
    people.sort(order); works.sort(order);
    return { query, parsed, people, works, total: people.length + works.length };
  }

  root.AtlasSearchCore = { createIndex, search, parse, normalize };
})(typeof window !== 'undefined' ? window : globalThis);
