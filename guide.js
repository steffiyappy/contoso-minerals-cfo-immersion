"use strict";

const labels = {
  id: {
    skip: "Langsung ke panduan", theme: "Tema", lock: "Kunci",
    eyebrow: "OPERASI / KEUANGAN / MANAJEMEN / HR",
    gateTitle: "Enam alur kerja. Dari briefing sampai jawaban kebijakan.",
    gateLead: "Briefing Microsoft 365 berbasis kata kunci tanpa lampiran, perbandingan eksternal Researcher, Analyst dua langkah dengan satu workbook sumber, Cowork, prompt Excel gabungan/terpisah, serta HR Agent Builder.",
    edition: "Edisi lengkap · briefing kata kunci · 11 September 2026",
    journey1: "Pahami konteks", journey2: "Telusuri angka", journey3: "Siapkan tindakan",
    unlockTitle: "Buka panduan praktik", unlockLead: "Prompt lengkap dalam bahasa Indonesia dan English, dengan file sumber dan langkah yang sesuai.",
    password: "Password sesi", unlock: "Buka panduan", unlocking: "Membuka panduan...",
    lockNote: "Password mengenkripsi isi prompt. File contoh dan portal demo bukan penyimpanan privat. Gunakan hanya data sintetis.",
    search: "Cari tugas atau prompt", openPortal: "Buka portal Close Control ↗",
    demoOnly: "Contoso Minerals Group adalah organisasi fiktif.",
    footer: "Data simulasi. Keputusan tetap di tangan manusia.",
    wrongPassword: "Password tidak cocok. Periksa lalu coba lagi.",
    secureError: "Buka situs melalui HTTPS atau server localhost. Browser ini belum menyediakan enkripsi yang diperlukan.",
    contentError: "Isi panduan tidak dapat dibaca. Minta penyaji memeriksa paket situs.",
    setup: "Sebelum mulai", notes: "Perhatikan", success: "Hasil yang perlu terlihat",
    copy: "Salin prompt", copied: "Prompt disalin.", copyError: "Browser tidak mengizinkan salin otomatis. Pilih teks prompt lalu salin secara manual.",
    inputs: "Gunakan", outputs: "Hasil baru", sourceFiles: "File pada langkah ini",
    files: "File contoh", fabric: "Opsional · Bangun Fabric", takeHome: "Bahan lanjutan · di luar sesi", previous: "Sebelumnya", next: "Berikutnya",
    filesTitle: "Unduh satu edisi, jalankan satu cerita.",
    filesLead: "Dua paket memuat angka dan ID yang sama. Panduan serta narasi disesuaikan dengan bahasa masing-masing; nama kolom teknis dipertahankan.",
    downloadID: "Unduh file Indonesia", downloadEN: "Download English files",
    archiveDetail: "Paket lengkap: sumber asli, email EML dan dokumen briefing, workbook Analyst tambahan, slide skill Excel, serta buku pedoman HR.",
    file: "File", purpose: "Kegunaan", size: "Ukuran", macroWarning: "File .xlsm berisi VBA yang dijalankan manual di Excel desktop. Tinjau kode lebih dahulu. Jangan menonaktifkan kebijakan keamanan; gunakan sumber .xlsx jika makro diblokir.",
    sharedSource: "GenericCostAllocation.bas memakai ID teknis yang sama pada kedua edisi. Komentar kode berbahasa Inggris; panduan pengguna tersedia dalam kedua bahasa.",
    fabricTitle: "Dari file latihan ke tabel Fabric.",
    fabricLead: "Jalur tambahan, bukan prasyarat demo utama. Bangun Lakehouse, jalankan notebook, lalu berikan hasil ekspor kepada Cowork.",
    fabricGuide: "Buka panduan langkah demi langkah ↗", fabricDownload: "Unduh paket build Fabric",
    fabricPackage: "Notebook, SQL, CSV sumber, panduan dwibahasa, instruksi data agent, dan prompt Cowork.",
    fabricSteps: [
      "Unggah CSV ke Lakehouse dan lampirkan notebook pada Lakehouse tersebut.",
      "Jalankan transformasi dengan kontrol baris, kurs, exception, dan rekonsiliasi.",
      "Unduh CSV hasil beserta metadata tanggal sumber. Lampirkan hasil itu pada Cowork.",
      "Opsional: buat Fabric data agent untuk bertanya melalui Microsoft 365 Copilot."
    ],
    fabricNote: "Cowork memakai snapshot file pada jalur ini, bukan koneksi langsung yang telah diuji. Notebook belum dijalankan pada tenant Fabric Anda. Data agent memiliki persyaratan kapasitas dan akses tersendiri.",
    references: "Sumber Microsoft", searchTitle: "Hasil pencarian", noResults: "Tidak ada prompt yang cocok. Coba kata seperti rekonsiliasi, VBA, atau Council.",
    clearSearch: "Hapus pencarian", core: "90 menit · 6 demo", stats: ["menit termasuk tanya jawab", "demo utama", "pilihan prompt per bahasa", "bidang: operasi, keuangan, manajemen, HR"],
    overview: "Briefing lintas dokumen, email, Teams dan kalender; Researcher membandingkan sumber internal dan publik; Analyst menghitung hasil dari satu workbook, lalu mengekspornya ke Excel pada langkah terpisah. Excel menyediakan alur gabungan atau terpisah untuk selisih anggaran, komentar dan laporan bulanan. Cowork dan HR tetap dalam alur utama.",
    scenario: "AGUSTUS 2026 / PENUTUPAN BULANAN",
    permissions: "Periksa akses Copilot Chat, Researcher, Analyst, Cowork, Copilot di Excel dan Agent Builder sebelum sesi. Pilih mode Researcher melalui UI, bukan prompt. Siapkan Browser Use pada lingkungan yang diizinkan admin.",
    noSend: "Seluruh perusahaan, orang, angka, dan komunikasi pada file contoh adalah fiktif. Alur berhenti pada draf untuk ditinjau manusia.",
    fabricTime: "45-60 menit + data agent opsional",
    filesNote: "Daily Briefing mencari data kerja Microsoft 365 berdasarkan kata kunci, tanpa lampiran. Paket EML hanya bahan persiapan penyaji; belum diimpor ke Microsoft 365. Analyst memakai 12 dan 17-20; Researcher/Finance memakai 10-13; HR memakai 14. Sumber lama 01-09 adalah latihan terpisah.",
    agenda: "Alokasi 90 menit", clock: "Menit", activity: "Demo", prompts: "Prompt",
    welcome: "Pembukaan dan konteks", qa: "Tanya jawab", total: "Total",
    takeHomeTitle: "Simpan untuk setelah sesi.",
    takeHomeLead: "Latihan sebelumnya, VBA, rumus dan skill khusus tetap tersedia di sini. Tiga skill Finance bawaan sudah masuk demo Excel utama. Panduan Fabric ada di bawah.",
    referenceTitle: "Buka pustaka lengkap untuk latihan mandiri",
    referenceNote: "Pustaka ini mempertahankan latihan lama beserta sumber dan dependensinya. Jangan mencampurkan model dan keluaran lama dengan alur enam bagian terbaru.",
    finish: "Enam segmen selesai. Sisihkan lima menit terakhir untuk tanya jawab.",
    searchScope: "Pencarian mencakup prompt utama dan materi HR Agent Builder. Buka Bahan lanjutan untuk pustaka lengkap.",
    scheduleNote: "05-15 berarti menit ke-5 sampai ke-15, bukan jam. Durasi adalah alokasi demo, bukan jaminan waktu proses."
  },
  en: {
    skip: "Skip to guide", theme: "Theme", lock: "Lock",
    eyebrow: "OPERATIONS / FINANCE / MANAGEMENT / HR",
    gateTitle: "Six workflows. From morning briefing to policy answers.",
    gateLead: "Keyword-based Microsoft 365 briefing without attachments, external Researcher comparisons, two-step Analyst with one source workbook, Cowork, combined/separate Excel prompts, and HR Agent Builder.",
    edition: "Complete edition · keyword briefing · 11 September 2026",
    journey1: "Understand context", journey2: "Trace the numbers", journey3: "Prepare action",
    unlockTitle: "Open the hands-on guide", unlockLead: "Complete Indonesian and English prompts, matched source files and practical steps.",
    password: "Session password", unlock: "Open guide", unlocking: "Opening guide...",
    lockNote: "The password encrypts prompt content. Sample files and the demo portal are not private storage. Use synthetic data only.",
    search: "Find a task or prompt", openPortal: "Open Close Control portal ↗",
    demoOnly: "Contoso Minerals Group is a fictional organization.",
    footer: "Simulation data. Decisions stay with people.",
    wrongPassword: "Incorrect password. Check it and try again.",
    secureError: "Open the site over HTTPS or a localhost server. This browser does not provide the required encryption.",
    contentError: "The guide content cannot be read. Ask the presenter to check the site package.",
    setup: "Before you start", notes: "Keep in view", success: "What you should see",
    copy: "Copy prompt", copied: "Prompt copied.", copyError: "The browser blocked automatic copying. Select the prompt text and copy it manually.",
    inputs: "Use", outputs: "New outputs", sourceFiles: "Files for this step",
    files: "Sample files", fabric: "Optional · Build Fabric", takeHome: "Take-home · outside the session", previous: "Previous", next: "Next",
    filesTitle: "Download one edition. Follow one story.",
    filesLead: "Both packages contain the same numbers and identifiers. Guides and narratives are localized; technical column names stay stable.",
    downloadID: "Unduh file Indonesia", downloadEN: "Download English files",
    archiveDetail: "Complete pack: original sources, EML emails and briefing documents, deeper Analyst workbooks, Excel skills slide, and HR handbook.",
    file: "File", purpose: "Purpose", size: "Size", macroWarning: "The .xlsm files contain VBA that you run manually in desktop Excel. Review the code first. Do not disable security policy; use the .xlsx source if macros are blocked.",
    sharedSource: "GenericCostAllocation.bas uses the same technical identifiers in both editions. Code comments are in English; user guidance is available in both languages.",
    fabricTitle: "From exercise files to Fabric tables.",
    fabricLead: "An optional extension, not a prerequisite for the core demo. Build a Lakehouse, run the notebook, then give the exported results to Cowork.",
    fabricGuide: "Open the step-by-step guide ↗", fabricDownload: "Download Fabric build kit",
    fabricPackage: "Notebook, SQL, source CSVs, bilingual guides, data-agent instructions and Cowork prompts.",
    fabricSteps: [
      "Upload the CSVs to a Lakehouse and attach the notebook to that Lakehouse.",
      "Run transformations with row, FX, exception and reconciliation controls.",
      "Download result CSVs with source-date metadata. Attach that snapshot to Cowork.",
      "Optional: create a Fabric data agent for questions in Microsoft 365 Copilot."
    ],
    fabricNote: "Cowork consumes a file snapshot on this path, not a verified direct connection. The notebook has not run in your Fabric tenant. Data agents have separate capacity and access requirements.",
    references: "Microsoft sources", searchTitle: "Search results", noResults: "No matching prompts. Try reconciliation, VBA or Council.",
    clearSearch: "Clear search", core: "90 minutes · 6 demos", stats: ["minutes including Q&A", "core demos", "prompt choices per language", "areas: operations, finance, management, HR"],
    overview: "Brief across documents, email, Teams and calendar; Researcher compares internal and public evidence; Analyst calculates results from one workbook, then exports them to Excel in a separate step. Excel offers combined or separate routes for budget variances, commentary and monthly reporting. Cowork and HR remain in the core flow.",
    scenario: "AUGUST 2026 / MONTH-END CLOSE",
    permissions: "Confirm Copilot Chat, Researcher, Analyst, Cowork, Copilot in Excel and Agent Builder access before the session. Choose Researcher modes in the UI, not the prompt. Prepare Browser Use in your admin-enabled environment.",
    noSend: "Every company, person, amount and communication in the sample files is fictional. The workflow stops at a draft for human review.",
    fabricTime: "45-60 minutes + optional data agent",
    filesNote: "Daily Briefing searches Microsoft 365 work data by keyword, without attachments. The EML package is presenter preparation only; it has not been imported into Microsoft 365. Analyst uses 12 and 17-20; Researcher/Finance use 10-13; HR uses 14. Earlier 01-09 sources are a separate exercise.",
    agenda: "Your 90-minute schedule", clock: "Minutes", activity: "Demo", prompts: "Prompts",
    welcome: "Opening and context", qa: "Q&A", total: "Total",
    takeHomeTitle: "Keep these for after the session.",
    takeHomeLead: "Previous exercises, VBA, formulas and custom skills remain available here. The three built-in Finance skills are already in the core Excel demo. The Fabric guide is below.",
    referenceTitle: "Open the complete self-study prompt library",
    referenceNote: "This library preserves earlier exercises with their own sources and dependencies. Do not mix older models and outputs with the current six-part flow.",
    finish: "The six segments are complete. Keep the final five minutes for questions.",
    searchScope: "Search covers the core prompts and HR Agent Builder materials. Open Take-home for the complete library.",
    scheduleNote: "05-15 means elapsed minutes 5 to 15, not clock time. Durations are demo allocations, not processing-time guarantees."
  }
};

let language = "id";
let content = null;
let activeSection = "start";
let toastTimer;
const el = id => document.getElementById(id);
const text = key => labels[language][key];
const local = item => typeof item === "string" ? item : item?.[language] || "";
const portalURL = () => new URL("portal/", location.href).href.split("#")[0];
const substitute = value => value.replaceAll("{{PORTAL_URL}}", portalURL());

function node(tag, value, className) {
  const result = document.createElement(tag);
  if (value !== undefined) result.textContent = value;
  if (className) result.className = className;
  return result;
}

function rich(target, value) {
  const chunks = substitute(value).split(/(\*\*[^*]+\*\*)/);
  chunks.forEach(chunk => target.append(
    chunk.startsWith("**") ? node("strong", chunk.slice(2, -2)) : document.createTextNode(chunk)
  ));
  return target;
}

function list(items, ordered = false) {
  const result = node(ordered ? "ol" : "ul");
  (items || []).forEach(item => result.append(rich(node("li"), item)));
  return result;
}

function toast(message) {
  clearTimeout(toastTimer);
  el("copy-status").textContent = message;
  el("copy-status").hidden = false;
  toastTimer = setTimeout(() => { el("copy-status").hidden = true; }, 5000);
}

function translateShell() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-t]").forEach(item => { item.textContent = text(item.dataset.t); });
  el("language-id").setAttribute("aria-pressed", String(language === "id"));
  el("language-en").setAttribute("aria-pressed", String(language === "en"));
  if (content) render();
}

function sections() {
  const result = [...content.sections];
  result.splice(1, 0, {id: "files", title: {id: labels.id.files, en: labels.en.files}});
  if (content.agentBuilder && !result.some(section => section.id === content.agentBuilder.id)) result.push(content.agentBuilder);
  result.push({id: "take-home", title: {id: labels.id.takeHome, en: labels.en.takeHome}});
  return result;
}

function navigate(id, focus = true) {
  id = content.legacyRoutes?.[id] || id;
  if (!sections().some(section => section.id === id)) return;
  activeSection = id;
  el("search").value = "";
  history.replaceState(null, "", `${location.pathname}${location.search}#${id}`);
  render();
  if (focus) {
    el("content").focus();
    window.scrollTo({top: 0, behavior: "instant"});
  }
}

function renderNavigation() {
  el("navigation").replaceChildren();
  sections().forEach(section => {
    const button = node("button", local(section.title));
    button.type = "button";
    button.dataset.section = section.id;
    if (section.id === activeSection && !el("search").value) button.setAttribute("aria-current", "page");
    button.addEventListener("click", () => navigate(section.id));
    el("navigation").append(button);
  });
}

function head(title, subtitle, duration) {
  const result = node("header", undefined, "section-head");
  result.append(node("p", text("scenario"), "eyebrow"), node("h1", title));
  if (subtitle) result.append(node("p", subtitle, "lead"));
  if (duration) result.append(node("span", duration, "chip"));
  return result;
}

function fileRow(caption, files) {
  const result = node("p", undefined, "file-row");
  result.append(node("strong", caption + ": "));
  files.forEach((file, i) => {
    if (i) result.append(document.createTextNode(" · "));
    result.append(node("code", file));
  });
  return result;
}

function promptBlock(prompt) {
  const result = node("section", undefined, "prompt-block");
  result.dataset.promptId = prompt.id;
  const bar = node("div", undefined, "prompt-top");
  const heading = node("h3", local(prompt.title));
  const copy = node("button", text("copy"), "copy-button");
  copy.type = "button";
  copy.setAttribute("aria-label", `${text("copy")}: ${local(prompt.title)}`);
  const body = node("div", substitute(local(prompt.text)), "prompt-text");
  body.tabIndex = 0;
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(body.textContent);
      toast(text("copied"));
    } catch (error) {
      toast(text("copyError"));
      const range = document.createRange();
      range.selectNodeContents(body);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      body.focus();
    }
  });
  bar.append(heading, copy);
  result.append(bar);
  if (prompt.inputs[language].length) result.append(fileRow(text("inputs"), prompt.inputs[language]));
  result.append(body);
  if (prompt.outputs[language].length) result.append(fileRow(text("outputs"), prompt.outputs[language]));
  return result;
}

function taskCard(card, promptFilter) {
  const result = node("article", undefined, "card task-card");
  result.dataset.cardId = card.id;
  const header = node("div", undefined, "card-head");
  const title = node("div");
  title.append(node("span", local(card.surface), "surface"), node("h2", local(card.title)));
  header.append(title);
  result.append(header);
  if (card.steps[language]?.length) result.append(list(card.steps[language], true));
  const files = card.files.filter(name => !/_(ID|EN)\./.test(name) || name.includes(`_${language.toUpperCase()}.`));
  if (files.length) {
    const details = node("details", undefined, "source-list");
    details.append(node("summary", text("sourceFiles")), list(files));
    result.append(details);
  }
  card.prompts.filter(promptFilter || (() => true)).forEach(prompt => result.append(promptBlock(prompt)));
  return result;
}

function renderSources(main) {
  const details = node("details", undefined, "footer-sources source-links");
  details.append(node("summary", text("references")));
  const items = node("ul");
  content.meta.sources.forEach(source => {
    const li = node("li");
    const anchor = node("a", source.title);
    anchor.href = source.url;
    anchor.target = "_blank";
    anchor.rel = "noopener";
    li.append(anchor);
    items.append(li);
  });
  details.append(items);
  main.append(details);
}

function renderSection(section, main) {
  if (section.id === "start") main.append(node("p", text("edition"), "edition-banner"));
  main.append(head(local(section.title), local(section.subtitle), local(section.duration)));
  if (section.downloads?.length) {
    const grid = node("div", undefined, "download-grid");
    section.downloads.filter(file => !file.language || file.language === language)
      .forEach(file => grid.append(tile(local(file.title), local(file.detail), file.href)));
    main.append(grid);
  }
  if (section.id === "start") {
    main.append(node("p", text("overview")));
    const strip = node("div", undefined, "stat-strip");
    const count = content.sections.reduce((sum,s) => sum+s.cards.reduce((n,c)=>n+c.prompts.length,0),0);
    [content.agenda.totalMinutes, content.agenda.stages.length, count, 4].forEach((value, i) => {
      const item = node("div");
      item.append(node("strong", value.toLocaleString(language === "id" ? "id-ID" : "en-US")),
                  node("span", labels[language].stats[i]));
      strip.append(item);
    });
    main.append(strip);
    renderAgenda(main);
  }
  if (section.setup[language]?.length) {
    const setup = node("section", undefined, "setup");
    setup.append(node("h2", text("setup")), list(section.setup[language], true));
    main.append(setup);
  }
  section.cards.forEach(card => main.append(taskCard(card)));
  if (section.presenterDownloads?.length) {
    const details = node("details", undefined, "notes");
    details.append(node("summary", local(section.presenterTitle)));
    const grid = node("div", undefined, "download-grid");
    section.presenterDownloads.filter(file => !file.language || file.language === language)
      .forEach(file => grid.append(tile(local(file.title), local(file.detail), file.href)));
    details.append(grid);
    main.append(details);
  }
  if (section.success[language]?.length) {
    const success = node("section", undefined, "success");
    success.append(node("h2", text("success")), list(section.success[language]));
    main.append(success);
  }
  if (section.notes[language]?.length) {
    const notes = node("section", undefined, "notes");
    notes.append(node("h2", text("notes")), list(section.notes[language]));
    main.append(notes);
  }
  if (section.id === "start") {
    main.append(node("p", text("permissions"), "small"), node("p", text("noSend"), "small"));
    renderSources(main);
  }
}

function renderAgenda(main) {
  const section = node("section", undefined, "agenda");
  section.append(node("h2", text("agenda")));
  const table = node("table", undefined, "file-table agenda-table");
  table.id = "agenda-table";
  const header = node("tr");
  ["clock", "activity", "prompts"].forEach(key => header.append(node("th", text(key))));
  const thead = node("thead");
  thead.append(header);
  table.append(thead);
  const tbody = node("tbody");
  let elapsed = 0;
  const append = (minutes, title, promptCount, sectionId) => {
    const row = node("tr");
    row.dataset.minutes = minutes;
    row.append(node("td", `${String(elapsed).padStart(2, "0")}-${String(elapsed + minutes).padStart(2, "0")}`));
    const cell = node("td");
    if (sectionId) {
      const button = node("button", title, "agenda-link");
      button.type = "button";
      button.addEventListener("click", () => navigate(sectionId));
      cell.append(button);
    } else cell.textContent = title;
    row.append(cell, node("td", promptCount ? String(promptCount) : "-"));
    tbody.append(row);
    elapsed += minutes;
  };
  append(content.agenda.openingMinutes, text("welcome"), 0);
  content.agenda.stages.forEach(stage => {
    const s = content.sections.find(section => section.id === stage.sectionId);
    append(stage.minutes, local(stage.title), s.cards.reduce((n,c) => n+c.prompts.length, 0), stage.sectionId);
  });
  append(content.agenda.qaMinutes, text("qa"), 0);
  table.append(tbody);
  section.append(table, node("p", text("scheduleNote"), "small"));
  main.append(section);
}

function tile(title, detail, href, download = true) {
  const anchor = node("a", undefined, "download-tile");
  anchor.href = href;
  if (download) anchor.setAttribute("download", "");
  else { anchor.target = "_blank"; anchor.rel = "noopener"; }
  anchor.append(node("strong", title), node("span", detail));
  return anchor;
}

function renderFiles(main) {
  main.append(head(text("filesTitle"), text("filesLead")));
  const grid = node("div", undefined, "download-grid");
  grid.append(tile(text("downloadID"), text("archiveDetail"), "downloads/Samples_ID.zip"),
              tile(text("downloadEN"), text("archiveDetail"), "downloads/Samples_EN.zip"));
  main.append(grid);
  const table = node("table", undefined, "file-table");
  const heading = node("thead");
  const row = node("tr");
  ["file", "purpose", "size"].forEach(key => row.append(node("th", text(key))));
  heading.append(row);
  table.append(heading);
  const body = node("tbody");
  content.files.filter(file => file.language === language).forEach(file => {
    const item = node("tr");
    const name = node("td");
    if (file.download) {
      const link = node("a", file.name);
      link.href = file.download;
      link.setAttribute("download", "");
      name.append(link);
    } else name.textContent = file.name;
    item.append(name, node("td", local(file.description)),
                node("td", `${Math.ceil(file.bytes / 1024)} KB`));
    body.append(item);
  });
  table.append(body);
  main.append(table);
  const notes = node("section", undefined, "notes");
  notes.append(node("h2", text("notes")),
               list([text("macroWarning"), text("filesNote"), text("sharedSource")]));
  main.append(notes);
}

function renderFabric(main) {
  main.append(node("h2", text("fabricTitle")), node("p", text("fabricLead")));
  const grid = node("div", undefined, "download-grid");
  grid.append(tile(text("fabricGuide"), text("fabricTime"),
                   `fabric/04_Fabric_Build_${language.toUpperCase()}.html`, false),
              tile(text("fabricDownload"), text("fabricPackage"), "downloads/Fabric_Build.zip"));
  main.append(grid, list(labels[language].fabricSteps, true), node("p", text("fabricNote"), "notes"));
}

function renderTakeHome(main) {
  main.append(head(text("takeHomeTitle"), text("takeHomeLead")));
  const library = node("details", undefined, "notes reference-library");
  library.append(node("summary", text("referenceTitle")));
  let built = false;
  library.addEventListener("toggle", () => {
    if (!library.open || built) return;
    built = true;
    library.append(node("p", text("referenceNote")));
    content.referenceSections.forEach(section => {
      const details = node("details", undefined, "reference-section");
      details.append(node("summary", local(section.title)));
      let loaded = false;
      details.addEventListener("toggle", () => {
        if (!details.open || loaded) return;
        loaded = true;
        if(section.setup[language].length) details.append(list(section.setup[language], true));
        section.cards.forEach(card => details.append(taskCard(card)));
        if(section.notes[language].length) details.append(list(section.notes[language]));
      });
      library.append(details);
    });
  });
  main.append(library);
  renderFabric(main);
}

function renderSearch(main, query) {
  main.append(head(text("searchTitle"), query));
  main.append(node("p", text("searchScope"), "small"));
  const clear = node("button", text("clearSearch"));
  clear.type = "button";
  clear.addEventListener("click", () => { el("search").value = ""; render(); el("search").focus(); });
  main.append(clear);
  let matches = 0;
  sections().filter(section => section.cards).forEach(section => section.cards.forEach(card => {
    const test = prompt => `${local(card.title)} ${local(card.surface)} ${local(prompt.title)} ${local(prompt.text)}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    if (card.prompts.some(test)) { matches++; main.append(taskCard(card, test)); }
  }));
  if (!matches) main.append(node("p", text("noResults"), "notes"));
}

function render() {
  renderNavigation();
  const main = el("content");
  main.replaceChildren();
  const query = el("search").value.trim();
  if (query) { renderSearch(main, query); return; }
  if (activeSection === "files") renderFiles(main);
  else if (activeSection === "take-home") renderTakeHome(main);
  else if (activeSection === content.agentBuilder?.id) renderSection(content.agentBuilder, main);
  else renderSection(content.sections.find(section => section.id === activeSection) || content.sections[0], main);
  const core = content.sections;
  const order = core.some(section => section.id === activeSection) ? core : sections();
  const index = order.findIndex(section => section.id === activeSection);
  const pager = node("nav", undefined, "pager");
  pager.setAttribute("aria-label", "Step navigation");
  [[index - 1, "previous"], [index + 1, "next"]].forEach(([target, label]) => {
    if (order[target]) {
      const button = node("button", `${text(label)} · ${local(order[target].title)}`);
      button.type = "button";
      button.addEventListener("click", () => navigate(order[target].id));
      pager.append(button);
    }
  });
  main.append(pager);
  if (activeSection === core.at(-1).id) main.append(node("p", text("finish"), "notes"));
}

function decode(value) {
  return Uint8Array.from(atob(value), char => char.charCodeAt(0));
}

async function unlock(event) {
  event.preventDefault();
  el("unlock-error").textContent = "";
  if (!window.crypto?.subtle) { el("unlock-error").textContent = text("secureError"); return; }
  const password = el("password").value;
  const button = el("unlock-button");
  button.disabled = true;
  button.textContent = text("unlocking");
  try {
    const envelope = JSON.parse(el("encrypted-content").textContent);
    const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({name:"PBKDF2", salt:decode(envelope.salt), iterations:envelope.iterations, hash:"SHA-256"},
      material, {name:"AES-GCM",length:256}, false, ["decrypt"]);
    const decoded = await crypto.subtle.decrypt({name:"AES-GCM", iv:decode(envelope.nonce), additionalData:new TextEncoder().encode(envelope.schema)},
      key, decode(envelope.ciphertext));
    const parsed = JSON.parse(new TextDecoder().decode(decoded));
    if (!Array.isArray(parsed.sections) || !Array.isArray(parsed.files)) throw new TypeError("Invalid content schema");
    content = parsed;
    el("password").value = "";
    el("gate").hidden = true;
    el("guide").hidden = false;
    el("lock-button").hidden = false;
    const requested = content.legacyRoutes?.[location.hash.slice(1)] || location.hash.slice(1);
    if (sections().some(section => section.id === requested)) activeSection = requested;
    render();
    el("content").focus();
  } catch (error) {
    el("unlock-error").textContent = error.name === "OperationError" ? text("wrongPassword") : text("contentError");
    el("password").focus();
  } finally {
    button.disabled = false;
    button.textContent = text("unlock");
  }
}

el("unlock-form").addEventListener("submit", unlock);
window.addEventListener("hashchange", () => {
  if (content) navigate(location.hash.slice(1) || "start", false);
});
el("language-id").addEventListener("click", () => { language = "id"; translateShell(); });
el("language-en").addEventListener("click", () => { language = "en"; translateShell(); });
el("search").addEventListener("input", () => { if (content) render(); });
el("theme-toggle").addEventListener("click", () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
});
el("lock-button").addEventListener("click", () => {
  content = null;
  el("content").replaceChildren();
  el("navigation").replaceChildren();
  el("guide").hidden = true;
  el("gate").hidden = false;
  el("lock-button").hidden = true;
  el("search").value = "";
  el("password").focus();
});
translateShell();
