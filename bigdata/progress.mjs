/** Buildless, local-only progress storage. No accounts, network calls or dynamic code. */
const VERSION = 1;
const MAX_IMPORT_BYTES = 2 * 1024 * 1024;
const FORBIDDEN_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const RECORD_KEYS = new Set(['read', 'bookmark', 'attempts', 'correct', 'lastAnswer', 'lastCorrect', 'lastAttemptAt', 'updatedAt']);
const MAX_TIMESTAMP = Date.parse('9999-12-31T23:59:59.998Z');

const emptyState = () => ({version: VERSION, records: {}, lastLocation: null});
const clone = value => JSON.parse(JSON.stringify(value));
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
const safeCount = value => Number.isSafeInteger(value) && value >= 0;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function freeze(value) {
  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) freeze(item);
    Object.freeze(value);
  }
  return value;
}

function timestamp(value, label) {
  if (typeof value !== 'string' || value.length > 40) throw new TypeError(`${label}: ISO 날짜가 필요합니다.`);
  const ms = Date.parse(value);
  if (!Number.isFinite(ms) || ms > MAX_TIMESTAMP || new Date(ms).toISOString() !== value) {
    throw new TypeError(`${label}: 유효한 ISO 날짜가 아닙니다.`);
  }
  return ms;
}

function rejectUnsafeKeys(value, depth = 0) {
  if (depth > 20) throw new TypeError('가져오기 자료가 지나치게 깊게 중첩되었습니다.');
  if (!value || typeof value !== 'object') return;
  for (const key of Object.keys(value)) {
    if (FORBIDDEN_KEYS.has(key)) throw new TypeError('허용하지 않는 객체 키가 있습니다.');
    rejectUnsafeKeys(value[key], depth + 1);
  }
}

function makeCatalog(catalog) {
  if (!Array.isArray(catalog)) throw new TypeError('catalog 배열이 필요합니다.');
  const result = new Map();
  for (const item of catalog) {
    const code = item?.code;
    const choices = item?.question?.choices;
    const answer = item?.question?.answer;
    if (typeof code !== 'string' || !code.trim() || code.length > 100 || FORBIDDEN_KEYS.has(code) || result.has(code)) {
      throw new TypeError('catalog 문항 코드는 안전하고 유일한 문자열이어야 합니다.');
    }
    if (!Array.isArray(choices) || !choices.length || !choices.every(x => typeof x === 'string') ||
        !Number.isInteger(answer) || answer < 1 || answer > choices.length) {
      throw new TypeError(`catalog ${code}: 보기와 정답 번호를 확인하세요.`);
    }
    result.set(code, {length: choices.length, answer});
  }
  return result;
}

/** subscribe calls its listener immediately, then once after each effective change. */
export function createProgressStore({catalog, storage, key = 'ourfuture-bdw-learning-v1'} = {}) {
  const questions = makeCatalog(catalog);
  if (typeof key !== 'string' || !key.trim()) throw new TypeError('비어 있지 않은 저장 키가 필요합니다.');
  let state = emptyState();
  let warning = '';
  let persistent = true;
  let lastStamp = 0;
  let backing = storage;
  const listeners = new Set();

  const fallback = message => {
    persistent = false;
    warning = `${message} 현재 변경은 메모리에만 유지되며 이 화면을 닫으면 사라질 수 있습니다.`;
  };

  if (backing === undefined) {
    try { backing = globalThis.window?.localStorage; }
    catch { fallback('브라우저 로컬 저장소에 접근할 수 없습니다.'); }
  }
  if (!backing || typeof backing.getItem !== 'function' || typeof backing.setItem !== 'function' || typeof backing.removeItem !== 'function') {
    backing = null;
    fallback('사용할 수 있는 브라우저 로컬 저장소가 없습니다.');
  }

  function parse(text) {
    if (typeof text !== 'string') throw new TypeError('가져오기는 JSON 문자열이어야 합니다.');
    if (new TextEncoder().encode(text).byteLength > MAX_IMPORT_BYTES) throw new RangeError('가져오기 파일은2MB 이하여야 합니다.');
    let input;
    try { input = JSON.parse(text); }
    catch { throw new TypeError('JSON 형식을 읽을 수 없습니다.'); }
    rejectUnsafeKeys(input);
    if (!isObject(input) || input.version !== VERSION || !isObject(input.records) ||
        !own(input, 'lastLocation') || Object.keys(input).some(k => !['version', 'records', 'lastLocation'].includes(k))) {
      throw new TypeError('지원하는 진도 자료(version 1) 형식이 아닙니다.');
    }
    const output = emptyState();
    for (const [code, record] of Object.entries(input.records)) {
      if (!questions.has(code)) continue; // Removed/unrecognized catalog entries are ignored.
      const question = questions.get(code);
      if (!isObject(record) || Object.keys(record).length !== RECORD_KEYS.size ||
          Object.keys(record).some(k => !RECORD_KEYS.has(k)) ||
          typeof record.read !== 'boolean' || typeof record.bookmark !== 'boolean' ||
          !safeCount(record.attempts) || !safeCount(record.correct) || record.correct > record.attempts) {
        throw new TypeError(`${code}: 진도 값이나 시도·정답 수가 잘못되었습니다.`);
      }
      const updated = timestamp(record.updatedAt, `${code}.updatedAt`);
      if (record.attempts === 0) {
        if (record.correct !== 0 || record.lastAnswer !== null || record.lastCorrect !== null || record.lastAttemptAt !== null) {
          throw new TypeError(`${code}: 시도0의 최근 답안은 비어 있어야 합니다.`);
        }
      } else {
        if (!Number.isInteger(record.lastAnswer) || record.lastAnswer < 1 || record.lastAnswer > question.length ||
            typeof record.lastCorrect !== 'boolean' || record.lastCorrect !== (record.lastAnswer === question.answer)) {
          throw new TypeError(`${code}: 최근 답안과 현재 문항의 정답 판정이 맞지 않습니다.`);
        }
        if ((record.lastCorrect && record.correct === 0) || (!record.lastCorrect && record.correct === record.attempts)) {
          throw new TypeError(`${code}: 최근 판정과 누적 수가 맞지 않습니다.`);
        }
        if (timestamp(record.lastAttemptAt, `${code}.lastAttemptAt`) > updated) {
          throw new TypeError(`${code}: 최근 시도일이 수정일보다 늦습니다.`);
        }
      }
      output.records[code] = clone(record);
    }
    const location = input.lastLocation;
    if (location !== null) {
      if (!isObject(location) || Object.keys(location).length !== 2 ||
          !own(location, 'code') || !own(location, 'kind') ||
          typeof location.code !== 'string' || typeof location.kind !== 'string' ||
          !location.kind.trim() || location.kind.length > 120 || /[\u0000-\u001f]/.test(location.kind)) {
        throw new TypeError('마지막 학습 위치가 잘못되었습니다.');
      }
      // A location without a known matching record has no comparable update timestamp.
      if (questions.has(location.code) && own(output.records, location.code)) output.lastLocation = clone(location);
    }
    return output;
  }

  function updateClock() {
    for (const record of Object.values(state.records)) lastStamp = Math.max(lastStamp, Date.parse(record.updatedAt));
  }

  function stamp() {
    const value = Math.max(Date.now(), lastStamp + 1);
    if (value > MAX_TIMESTAMP) throw new RangeError('수정일 범위를 넘었습니다.');
    lastStamp = value;
    return new Date(value).toISOString();
  }

  function locationTime(snapshot) {
    return snapshot.lastLocation ? Date.parse(snapshot.records[snapshot.lastLocation.code]?.updatedAt) || 0 : 0;
  }

  function merge(incoming) {
    const next = clone(state);
    let imported = 0;
    const beforeLocationTime = locationTime(state);
    for (const [code, record] of Object.entries(incoming.records)) {
      const current = next.records[code];
      if (!current || Date.parse(record.updatedAt) > Date.parse(current.updatedAt)) {
        next.records[code] = clone(record);
        imported++;
      }
    }
    // Whole-record last-write-wins; attempts/correct are never added together.
    if (incoming.lastLocation && (!state.lastLocation || locationTime(incoming) > beforeLocationTime)) {
      next.lastLocation = clone(incoming.lastLocation);
    }
    const changed = !same(next, state);
    if (changed) { state = next; updateClock(); }
    return {imported, changed};
  }

  function readBacking() {
    if (!backing || !persistent) return false;
    try {
      const raw = backing.getItem(key);
      if (raw === null) return false;
      return merge(parse(raw)).changed;
    } catch {
      // Do not delete or automatically overwrite an unreadable/corrupt saved value.
      fallback('저장된 진도를 읽을 수 없거나 형식이 맞지 않습니다. 원래 저장값은 지우지 않았습니다.');
      return false;
    }
  }

  function persist() {
    if (!backing || !persistent) return;
    try { backing.setItem(key, JSON.stringify(state)); }
    catch { fallback('진도를 브라우저 저장소에 기록하지 못했습니다.'); }
  }

  function get() { return freeze(clone(state)); }
  function emit() {
    const snapshot = get();
    for (const fn of [...listeners]) {
      try { fn(snapshot); } catch { /* A failing view must not block other views or progress storage. */ }
    }
  }
  function question(code) {
    if (!questions.has(code)) throw new RangeError('현재 목록에 없는 문항입니다.');
    return questions.get(code);
  }
  function blank(updatedAt) {
    return {read: false, bookmark: false, attempts: 0, correct: 0, lastAnswer: null,
      lastCorrect: null, lastAttemptAt: null, updatedAt};
  }
  function changeRecord(code, change) {
    question(code);
    const remoteChanged = readBacking();
    const current = state.records[code];
    const record = current ? clone(current) : blank('');
    if (!change(record)) { if (remoteChanged) emit(); return; }
    record.updatedAt = stamp();
    state.records[code] = record;
    persist(); emit();
  }

  readBacking();

  // A storage event from another tab is merged without writing it back in a loop.
  const eventTarget = globalThis.window;
  if (eventTarget?.addEventListener && backing) {
    eventTarget.addEventListener('storage', event => {
      if (event.key !== key || (event.storageArea && event.storageArea !== backing)) return;
      if (event.newValue === null) { state = emptyState(); lastStamp = 0; emit(); return; }
      try { if (merge(parse(event.newValue)).changed) emit(); }
      catch { warning = '다른 탭의 진도 형식이 맞지 않아 현재 진도를 유지했습니다.'; emit(); }
    });
  }

  return {
    get,
    get warning() { return warning; },
    subscribe(fn) {
      if (typeof fn !== 'function') throw new TypeError('구독 함수가 필요합니다.');
      listeners.add(fn);
      try { fn(get()); } catch { /* Same isolation as later updates. */ }
      return () => { listeners.delete(fn); };
    },
    markRead(code) { changeRecord(code, record => { if (record.read) return false; record.read = true; return true; }); },
    setBookmark(code, value) {
      if (typeof value !== 'boolean') throw new TypeError('북마크는 boolean 값이어야 합니다.');
      changeRecord(code, record => { if (record.bookmark === value) return false; record.bookmark = value; return true; });
    },
    recordAnswer(code, answerIndex) {
      const q = question(code);
      if (!Number.isInteger(answerIndex) || answerIndex < 1 || answerIndex > q.length) throw new RangeError('유효한1부터 시작하는 보기 번호가 필요합니다.');
      changeRecord(code, record => {
        if (record.attempts === Number.MAX_SAFE_INTEGER) throw new RangeError('시도 횟수 범위를 넘었습니다.');
        const correct = answerIndex === q.answer;
        record.attempts++; if (correct) record.correct++;
        record.lastAnswer = answerIndex; record.lastCorrect = correct;
        record.lastAttemptAt = new Date().toISOString();
        return true;
      });
    },
    setLastLocation(location) {
      if (!isObject(location) || typeof location.kind !== 'string' || !location.kind.trim() ||
          location.kind.length > 120 || /[\u0000-\u001f]/.test(location.kind)) throw new TypeError('code와 kind가 있는 학습 위치가 필요합니다.');
      question(location.code);
      const remoteChanged = readBacking();
      const next = {code: location.code, kind: location.kind};
      if (same(next, state.lastLocation)) { if (remoteChanged) emit(); return; }
      const record = state.records[next.code] ? clone(state.records[next.code]) : blank('');
      record.updatedAt = stamp(); state.records[next.code] = record; state.lastLocation = next;
      persist(); emit();
    },
    exportData() { return JSON.stringify(get(), null, 2); },
    importData(text) {
      const incoming = parse(text); // Validate every known record before touching memory or storage.
      const remoteChanged = readBacking();
      const result = merge(incoming);
      if (result.changed) persist();
      if (result.changed || remoteChanged) emit();
      return {imported: result.imported};
    },
    clear() {
      state = emptyState(); lastStamp = 0;
      if (backing) {
        try { backing.removeItem(key); persistent = true; warning = ''; }
        catch { fallback('이 키의 저장값을 지우지 못했습니다. 메모리 진도만 비웠습니다.'); }
      }
      emit();
    }
  };
}
