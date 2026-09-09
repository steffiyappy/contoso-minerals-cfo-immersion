"use strict";

const labels = {
  id: {
    skip: "Langsung ke panduan", theme: "Tema", lock: "Kunci",
    eyebrow: "DEMO CFO / DATA SINTETIS",
    gateTitle: "Dari data yang berantakan ke keputusan yang bisa dipertanggungjawabkan.",
    gateLead: "Tiga lokasi. Tiga format ekspor. Satu penutupan bulanan. Gunakan Copilot untuk menelusuri angka, menguji narasi, dan menyiapkan tindakan.",
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
    files: "File contoh", fabric: "Opsional · Bangun Fabric", previous: "Sebelumnya", next: "Berikutnya",
    filesTitle: "Unduh satu edisi, jalankan satu cerita.",
    filesLead: "Dua paket memuat angka dan ID yang sama. Panduan serta narasi disesuaikan dengan bahasa masing-masing; nama kolom teknis dipertahankan.",
    downloadID: "Unduh file Indonesia", downloadEN: "Download English files",
    archiveDetail: "12 file: 7 sumber utama, workbook VBA, sumber tanpa makro, referensi rumus, kode VBA, dan skill.",
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
    clearSearch: "Hapus pencarian", core: "60 menit · alur inti", stats: ["lokasi fiktif", "baris ledger", "baris invoice AP", "prompt per bahasa"],
    overview: "Alur utama: Council → Excel → Critique → Cowork → Browser Use. VBA, skill, dan Fabric tersedia sebagai pendalaman.",
    scenario: "AGUSTUS 2026 / PENUTUPAN BULANAN",
    permissions: "Gunakan akun kerja dengan akses ke Researcher, Cowork, dan Copilot di Excel. Browser Use memerlukan Cowork web di Edge, profil kerja yang sama, serta izin admin. Pilih Model Council untuk perbandingan model dan Auto untuk Critique. Periksa ketersediaan sebelum sesi.",
    noSend: "Seluruh perusahaan, orang, angka, dan komunikasi pada file contoh adalah fiktif. Alur berhenti pada draf untuk ditinjau manusia.",
    fabricTime: "45-60 menit + data agent opsional",
    filesNote: "File 06 adalah draf untuk dikritisi, bukan kunci jawaban. File 09 merupakan referensi yang dibuka setelah membangun ulang rumus."
  },
  en: {
    skip: "Skip to guide", theme: "Theme", lock: "Lock",
    eyebrow: "CFO DEMO / SYNTHETIC DATA",
    gateTitle: "From fragmented data to defensible CFO decisions.",
    gateLead: "Three sites. Three export layouts. One month-end close. Use Copilot to trace the numbers, challenge the narrative and prepare action.",
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
    files: "Sample files", fabric: "Optional · Build Fabric", previous: "Previous", next: "Next",
    filesTitle: "Download one edition. Follow one story.",
    filesLead: "Both packages contain the same numbers and identifiers. Guides and narratives are localized; technical column names stay stable.",
    downloadID: "Unduh file Indonesia", downloadEN: "Download English files",
    archiveDetail: "12 files: 7 core sources, VBA workbook, macro-free source, formula reference, VBA code and skill.",
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
    clearSearch: "Clear search", core: "60 minutes · core workflow", stats: ["fictional sites", "ledger rows", "AP invoice lines", "prompts per language"],
    overview: "Core flow: Council → Excel → Critique → Cowork → Browser Use. VBA, skills and Fabric are extensions.",
    scenario: "AUGUST 2026 / MONTH-END CLOSE",
    permissions: "Use a work account with Researcher, Cowork and Copilot in Excel access. Browser Use requires Cowork on the web in Edge, the same work profile and admin enablement. Select Model Council for model comparisons and Auto for Critique. Confirm availability before the session.",
    noSend: "Every company, person, amount and communication in the sample files is fictional. The workflow stops at a draft for human review.",
    fabricTime: "45-60 minutes + optional data agent",
    filesNote: "File 06 is a draft to challenge, not an answer key. File 09 is the reference to open after rebuilding the formulas."
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
  result.push({id: "fabric", title: {id: labels.id.fabric, en: labels.en.fabric}});
  return result;
}

function navigate(id, focus = true) {
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
  main.append(head(local(section.title), local(section.subtitle), local(section.duration)));
  if (section.id === "start") {
    main.append(node("p", text("overview")));
    const strip = node("div", undefined, "stat-strip");
    const count = content.sections.reduce((sum,s) => sum+s.cards.reduce((n,c)=>n+c.prompts.length,0),0);
    [3, 3012, 1092, count].forEach((value, i) => {
      const item = node("div");
      item.append(node("strong", value.toLocaleString(language === "id" ? "id-ID" : "en-US")),
                  node("span", labels[language].stats[i]));
      strip.append(item);
    });
    main.append(strip);
  }
  if (section.setup[language]?.length) {
    const setup = node("section", undefined, "setup");
    setup.append(node("h2", text("setup")), list(section.setup[language], true));
    main.append(setup);
  }
  section.cards.forEach(card => main.append(taskCard(card)));
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
    item.append(node("td", file.name), node("td", local(file.description)),
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
  main.append(head(text("fabricTitle"), text("fabricLead")));
  const grid = node("div", undefined, "download-grid");
  grid.append(tile(text("fabricGuide"), text("fabricTime"),
                   `fabric/04_Fabric_Build_${language.toUpperCase()}.html`, false),
              tile(text("fabricDownload"), text("fabricPackage"), "downloads/Fabric_Build.zip"));
  main.append(grid, list(labels[language].fabricSteps, true), node("p", text("fabricNote"), "notes"));
}

function renderSearch(main, query) {
  main.append(head(text("searchTitle"), query));
  const clear = node("button", text("clearSearch"));
  clear.type = "button";
  clear.addEventListener("click", () => { el("search").value = ""; render(); el("search").focus(); });
  main.append(clear);
  let matches = 0;
  content.sections.forEach(section => section.cards.forEach(card => {
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
  else if (activeSection === "fabric") renderFabric(main);
  else renderSection(content.sections.find(section => section.id === activeSection) || content.sections[0], main);
  const order = sections();
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
    const requested = location.hash.slice(1);
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
