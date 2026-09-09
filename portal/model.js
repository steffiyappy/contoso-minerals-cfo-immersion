(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CloseModel = factory();
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const SCHEMA_VERSION = 'cmg.close.v1';
  const MAX_IMPORT_BYTES = 1048576;
  const MAX_ROWS = 200;
  const MAX_FILES = 50;
  const MAX_FILE_BYTES = 20971520;
  const CURRENCIES = ['USD', 'IDR'];
  const SITES = ['GROUP', 'S01', 'S02', 'S03'];
  const PERSONAS = ['PERSONA_A', 'PERSONA_B', 'PERSONA_C'];
  const CATEGORIES = ['DUPLICATE_CANDIDATE', 'MISSING_RECEIPT', 'PRICE_DIFFERENCE', 'FX_MISSING', 'UNMAPPED_ACCOUNT', 'BANK_TIMING', 'UNRECORDED_FEE', 'OTHER'];
  const ACTIONS = ['created', 'edited', 'saved-draft', 'saved-review-ready', 'imported', 'exported', 'evidence-added'];
  const canonical = value => value.trim().toUpperCase();
  const identifier = value => /^[A-Za-z0-9][A-Za-z0-9._-]{0,39}$/.test(value);
  const meaningful = (value, chars, words) => value.trim().length >= chars && (value.trim().match(/\S+/g) || []).length >= words;
  function cents(value, blankIsZero = false) {
    if (value === '' && blankIsZero) return 0n;
    if (typeof value !== 'string' || !/^\d{1,12}(?:\.\d{1,2})?$/.test(value)) return null;
    const [whole, fraction = ''] = value.split('.');
    return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  }
  function dateValid(value) {
    if (!/^20\d{2}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(value + 'T00:00:00.000Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }
  function emptyPayload() {
    return {
      period: '2026-08', site: 'GROUP', preparedBy: '', sourceAsOf: '', reportTitle: '', narrative: '',
      kpis: { currency: 'USD', reconciledRows: '', unresolvedRows: '', exposure: '' },
      exceptions: [], journals: [], evidence: [], noJournalsReason: '',
      checks: { evidence: false, amountsPeriod: false, summary: false, balance: false },
      status: 'draft', language: 'id'
    };
  }
  function nextId(rows, field, prefix) {
    const taken = new Set(rows.map(row => canonical(row[field])));
    let next = 1;
    while (taken.has(prefix + String(next).padStart(3, '0'))) next++;
    return prefix + String(next).padStart(3, '0');
  }
  function newException(rows) {
    return {
      id: nextId(rows, 'id', 'EX'), category: 'OTHER', source: { file: '', sheet: '', rowId: '' },
      currency: 'USD', amount: '', owner: '', dueDate: '', action: '', rationale: '', riskGroupId: ''
    };
  }
  function newJournal(rows) {
    return { lineId: nextId(rows, 'lineId', 'JL'), journalId: '', account: '', debit: '', credit: '', currency: 'USD', source: { file: '', sheet: '', rowId: '' } };
  }
  function journalTotals(rows) {
    const totals = new Map();
    rows.forEach((row, index) => {
      const key = canonical(row.journalId) + '|' + row.currency;
      if (!totals.has(key)) totals.set(key, { journalId: row.journalId, currency: row.currency, debit: 0n, credit: 0n, valid: true, count: 0, firstIndex: index });
      const total = totals.get(key);
      const debit = cents(row.debit, true), credit = cents(row.credit, true);
      total.count++;
      if (debit === null || credit === null) total.valid = false;
      else { total.debit += debit; total.credit += credit; }
    });
    return [...totals.values()];
  }
  function categorySummary(rows) {
    const groups = new Map();
    rows.forEach(row => {
      const key = row.category + '|' + row.currency;
      if (!groups.has(key)) groups.set(key, { category: row.category, currency: row.currency, rows: [] });
      groups.get(key).rows.push({ id: row.id, amount: row.amount, riskGroupId: row.riskGroupId });
    });
    return [...groups.values()];
  }
  function riskCounts(rows) {
    return CURRENCIES.map(currency => {
      const selected = rows.filter(row => row.currency === currency);
      return { currency, groups: new Set(selected.filter(row => row.riskGroupId).map(row => canonical(row.riskGroupId))).size, unlinked: selected.filter(row => !row.riskGroupId).length };
    }).filter(row => row.groups || row.unlinked);
  }
  function validate(p) {
    const errors = [];
    const add = (code, target, step, label, context = '') => errors.push({ code, target, step, label, context });
    const required = (value, target, step, label, context) => {
      if (!value.trim()) add('required', target, step, label, context);
    };
    const periodOK = /^20\d{2}-(0[1-9]|1[0-2])$/.test(p.period);
    if (!periodOK) add('period', 'period', 'overview', 'period');
    if (!SITES.includes(p.site)) add('required', 'site', 'overview', 'site');
    if (!PERSONAS.includes(p.preparedBy)) add('required', 'prepared-by', 'overview', 'preparedBy');
    if (!dateValid(p.sourceAsOf)) add('date', 'source-as-of', 'overview', 'sourceAsOf');
    else if (periodOK) {
      const [year, month] = p.period.split('-').map(Number);
      const end = new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
      if (p.sourceAsOf < end) add('sourcePeriod', 'source-as-of', 'overview', 'sourceAsOf');
    }
    required(p.reportTitle, 'report-title', 'overview', 'reportTitle');
    if (!meaningful(p.narrative, 80, 12)) add('narrative', 'narrative', 'overview', 'narrative');
    for (const [key, target] of [['reconciledRows', 'reconciled-rows'], ['unresolvedRows', 'unresolved-rows']]) {
      if (!/^\d{1,9}$/.test(p.kpis[key])) add('whole', target, 'overview', key);
    }
    if (cents(p.kpis.exposure) === null) add('money', 'exposure', 'overview', 'exposure');
    if (!p.evidence.length) add('evidence', 'evidence-files', 'overview', 'evidence');
    const files = new Set(p.evidence.map(file => file.name));
    function sourceCheck(source, base, step, context) {
      for (const [field, suffix, label] of [['file', 'file', 'sourceFile'], ['sheet', 'sheet', 'sourceSheet'], ['rowId', 'row', 'sourceRow']]) {
        required(source[field], base + '-source-' + suffix, step, label, context);
      }
      if (source.file && !files.has(source.file)) add('sourceFile', base + '-source-file', step, 'sourceFile', context);
    }
    function uniqueId(value, seen, target, step, label, context) {
      if (!identifier(value)) add('identifier', target, step, label, context);
      else if (seen.has(canonical(value))) add('duplicate', target, step, label, context);
      seen.add(canonical(value));
    }
    const ids = new Set(), records = new Set();
    p.exceptions.forEach((row, index) => {
      const base = 'exception-' + (index + 1), context = row.id || String(index + 1);
      uniqueId(row.id, ids, base + '-id', 'exceptions', 'exceptionId', context);
      sourceCheck(row.source, base, 'exceptions', context);
      if (cents(row.amount) === null) add('money', base + '-amount', 'exceptions', 'amount', context);
      if (!PERSONAS.includes(row.owner)) add('required', base + '-owner', 'exceptions', 'owner', context);
      if (!dateValid(row.dueDate)) add('date', base + '-due-date', 'exceptions', 'dueDate', context);
      required(row.action, base + '-action', 'exceptions', 'action', context);
      if (!meaningful(row.rationale, 20, 4)) add('rationale', base + '-rationale', 'exceptions', 'rationale', context);
      if (row.riskGroupId && !identifier(row.riskGroupId)) add('identifier', base + '-risk-group', 'exceptions', 'riskGroupId', context);
      const record = JSON.stringify([row.category, ...['file', 'sheet', 'rowId'].map(key => canonical(row.source[key])), row.currency]);
      if (row.source.rowId && records.has(record)) add('duplicateRecord', base + '-source-row', 'exceptions', 'sourceRow', context);
      records.add(record);
    });
    const lineIds = new Set(), journalRecords = new Set();
    p.journals.forEach((row, index) => {
      const base = 'journal-' + (index + 1), context = row.lineId || String(index + 1);
      uniqueId(row.lineId, lineIds, base + '-line-id', 'journals', 'lineId', context);
      if (!identifier(row.journalId)) add('identifier', base + '-journal-id', 'journals', 'journalId', context);
      required(row.account, base + '-account', 'journals', 'account', context);
      sourceCheck(row.source, base, 'journals', context);
      const debit = cents(row.debit, true), credit = cents(row.credit, true);
      if (debit === null) add('money', base + '-debit', 'journals', 'debit', context);
      if (credit === null) add('money', base + '-credit', 'journals', 'credit', context);
      if (debit !== null && credit !== null) {
        if (debit > 0n && credit > 0n) add('bothSides', base + '-credit', 'journals', 'credit', context);
        if (debit === 0n && credit === 0n) add('emptyLine', base + '-debit', 'journals', 'debit', context);
        const record = JSON.stringify([canonical(row.journalId), canonical(row.account), row.currency, String(debit), String(credit), ...['file', 'sheet', 'rowId'].map(key => canonical(row.source[key]))]);
        if (row.journalId && journalRecords.has(record)) add('duplicateRecord', base + '-line-id', 'journals', 'lineId', context);
        journalRecords.add(record);
      }
    });
    for (const total of journalTotals(p.journals)) {
      if (!total.valid || total.debit !== total.credit || total.count < 2 || total.debit === 0n) {
        add('balance', 'journal-' + (total.firstIndex + 1) + '-journal-id', 'journals', 'journalId', total.journalId + ' / ' + total.currency);
      }
    }
    if (!p.journals.length && !meaningful(p.noJournalsReason, 20, 4)) add('noJournals', 'no-journals-reason', 'journals', 'noJournalsReason');
    for (const key of Object.keys(p.checks)) {
      if (!p.checks[key]) add('check', 'check-' + key, 'review', 'check.' + key);
    }
    return errors;
  }
  class ImportError extends Error {
    constructor(code, field = '') { super(code); this.name = 'ImportError'; this.code = code; this.field = field; }
  }
  function envelope(payload, auditTrail) { return { schemaVersion: SCHEMA_VERSION, auditTrail, payload }; }
  function parseEnvelope(text) {
    const fail = (code = 'schema', field = '') => { throw new ImportError(code, field); };
    if (typeof text !== 'string' || new TextEncoder().encode(text).length > MAX_IMPORT_BYTES) fail('size');
    let doc;
    try {
      doc = JSON.parse(text, (key, value) => {
        if (['__proto__', 'prototype', 'constructor'].includes(key)) fail('unsafe');
        return value;
      });
    } catch (error) { if (error instanceof ImportError) throw error; fail('json'); }
    function object(value, keys, field) {
      if (!value || typeof value !== 'object' || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype) fail('schema', field);
      if (Object.keys(value).sort().join('|') !== keys.slice().sort().join('|')) fail('schema', field);
    }
    function string(value, field, max = 500) {
      if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) fail('type', field);
    }
    function enumeration(value, list, field) { if (!list.includes(value)) fail('enum', field); }
    function list(value, max, field) { if (!Array.isArray(value) || value.length > max) fail('schema', field); }
    function source(value, field) {
      object(value, ['file', 'sheet', 'rowId'], field);
      string(value.file, field, 255); string(value.sheet, field, 100); string(value.rowId, field, 100);
    }
    object(doc, ['schemaVersion', 'auditTrail', 'payload'], 'envelope');
    if (doc.schemaVersion !== SCHEMA_VERSION) fail('version');
    const p = doc.payload;
    object(p, Object.keys(emptyPayload()), 'payload');
    for (const field of ['period', 'sourceAsOf']) string(p[field], field, 10);
    string(p.reportTitle, 'reportTitle', 200); string(p.narrative, 'narrative', 8000);
    string(p.noJournalsReason, 'noJournalsReason', 1000);
    enumeration(p.site, SITES, 'site');
    enumeration(p.preparedBy, ['', ...PERSONAS], 'preparedBy');
    enumeration(p.status, ['draft', 'review-ready'], 'status');
    enumeration(p.language, ['id', 'en'], 'language');
    object(p.kpis, ['currency', 'reconciledRows', 'unresolvedRows', 'exposure'], 'kpis');
    enumeration(p.kpis.currency, CURRENCIES, 'currency');
    for (const key of ['reconciledRows', 'unresolvedRows', 'exposure']) string(p.kpis[key], key, 25);
    object(p.checks, ['evidence', 'amountsPeriod', 'summary', 'balance'], 'checks');
    for (const value of Object.values(p.checks)) if (typeof value !== 'boolean') fail('type', 'checks');
    list(p.exceptions, MAX_ROWS, 'exceptions'); list(p.journals, MAX_ROWS, 'journals'); list(p.evidence, MAX_FILES, 'evidence');
    p.exceptions.forEach(row => {
      object(row, ['id', 'category', 'source', 'currency', 'amount', 'owner', 'dueDate', 'action', 'rationale', 'riskGroupId'], 'exceptions');
      for (const key of ['id', 'riskGroupId']) string(row[key], key, 40);
      for (const key of ['action', 'rationale']) string(row[key], key, 1000);
      string(row.amount, 'amount', 25); string(row.dueDate, 'dueDate', 10);
      enumeration(row.category, CATEGORIES, 'category'); enumeration(row.currency, CURRENCIES, 'currency');
      enumeration(row.owner, ['', ...PERSONAS], 'owner'); source(row.source, 'exceptions.source');
    });
    p.journals.forEach(row => {
      object(row, ['lineId', 'journalId', 'account', 'debit', 'credit', 'currency', 'source'], 'journals');
      for (const key of ['lineId', 'journalId']) string(row[key], key, 40);
      string(row.account, 'account', 100);
      for (const key of ['debit', 'credit']) string(row[key], key, 25);
      enumeration(row.currency, CURRENCIES, 'currency'); source(row.source, 'journals.source');
    });
    const filenames = new Set();
    p.evidence.forEach(file => {
      object(file, ['name', 'size', 'sha256', 'lastModified'], 'evidence');
      string(file.name, 'evidence.name', 255);
      if (!file.name.trim() || /[\\/]/.test(file.name) || filenames.has(file.name)) fail('schema', 'evidence.name');
      filenames.add(file.name);
      if (!Number.isSafeInteger(file.size) || file.size < 0 || file.size > MAX_FILE_BYTES) fail('type', 'evidence.size');
      if (!Number.isSafeInteger(file.lastModified) || file.lastModified < 0 || file.lastModified > 8640000000000000) fail('type', 'evidence.lastModified');
      if (typeof file.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(file.sha256)) fail('type', 'evidence.sha256');
    });
    list(doc.auditTrail, 1000, 'auditTrail');
    doc.auditTrail.forEach(event => {
      object(event, ['at', 'action'], 'auditTrail');
      if (typeof event.at !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(event.at) || !Number.isFinite(Date.parse(event.at))) fail('type', 'auditTrail.at');
      enumeration(event.action, ACTIONS, 'auditTrail.action');
    });
    if (p.status === 'review-ready' && validate(p).length) fail('readiness');
    return doc;
  }
  return { SCHEMA_VERSION, MAX_IMPORT_BYTES, MAX_ROWS, MAX_FILES, MAX_FILE_BYTES, CURRENCIES, SITES, PERSONAS, CATEGORIES, emptyPayload, newException, newJournal, cents, dateValid, validate, journalTotals, categorySummary, riskCounts, envelope, parseEnvelope, ImportError };
});
