(() => {
  'use strict';
  const M = window.CloseModel;
  const STORAGE_KEY = 'cmg_close_v1';
  const STEPS = ['overview', 'exceptions', 'journals', 'review'];
  const $ = id => document.getElementById(id);
  const COPY = {
    skip: ['Langsung ke ruang kerja', 'Skip to workspace'],
    brandSub: ['Ruang kerja pengendalian keuangan', 'Finance control workspace'],
    demo: ['Demo fiktif', 'Fictional demo'],
    eyebrow: ['PENUTUPAN BULANAN / BROWSER USE', 'MONTH-END CLOSE / BROWSER USE'],
    lead: ['Dari bukti ke draf yang siap ditinjau. Keputusan tetap di tangan manusia.', 'From evidence to a review-ready draft. Decisions remain with people.'],
    dossierStatus: ['Status berkas kerja', 'Dossier status'],
    draft: ['Draf kerja', 'Working draft'],
    ready: ['Siap ditinjau manusia', 'Ready for human review'],
    localNotice: ['Hanya di peramban ini. Draf disimpan pada perangkat ini, bukan di server bersama. File bukti tidak pernah diunggah. Tidak ada pengiriman, persetujuan, atau pembukuan jurnal.', 'Only in this browser. The draft is stored on this device, not on a shared server. Evidence files are never uploaded. Nothing is submitted, approved, or posted.'],
    period: ['Periode', 'Period'],
    exceptionRows: ['Baris pengecualian', 'Exception rows'],
    journalGroups: ['Kelompok jurnal / mata uang', 'Journal / currency groups'],
    evidenceFiles: ['File bukti', 'Evidence files'],
    overview: ['Ikhtisar penutupan', 'Close overview'],
    exceptions: ['Pengecualian', 'Exceptions'],
    journals: ['Usulan jurnal', 'Proposed journals'],
    review: ['Tinjau / ekspor', 'Review / export'],
    overviewHeading: ['Mulai dengan konteks dan sumber', 'Start with context and sources'],
    overviewHint: ['Isi hasil analisis Anda sendiri. Tidak ada angka jawaban bawaan. Semua kolom wajib kecuali ditandai opsional.', 'Enter your own analysis. No answer figures are preloaded. All fields are required unless marked optional.'],
    dossier: ['Berkas kerja penutupan', 'Close dossier'],
    workingRules: ['ATURAN KERJA', 'WORKING RULES'],
    keepTraceable: ['Pastikan setiap kesimpulan dapat ditelusuri', 'Make every conclusion traceable'],
    rule1: ['Lampirkan sumber, lalu catat file, sheet, dan ID baris.', 'Attach sources, then record the file, sheet, and row ID.'],
    rule2: ['Pisahkan mata uang. Tautkan kandidat terkait dengan ID kelompok risiko.', 'Keep currencies separate. Link related candidates with a Risk Group ID.'],
    rule3: ['Rekonsiliasi setiap kelompok jurnal sampai dua desimal.', 'Reconcile each journal group to two decimal places.'],
    rule4: ['Periksa empat poin kendali sebelum menyimpan draf siap ditinjau.', 'Check all four checkpoints before saving a review-ready draft.'],
    fictional: ['Gunakan hanya data sintetis dan persona fiktif. Jangan masukkan nama atau informasi pribadi nyata.', 'Use synthetic data and fictional personas only. Do not enter real names or personal information.'],
    kpisHeading: ['Indikator hasil rekonsiliasi', 'Reconciliation indicators'],
    kpisHint: ['Masukkan jumlah baris unik dari sumber. Pengecualian dapat tumpang tindih. Eksposur adalah potensi risiko, bukan penghematan atau kerugian yang telah dipastikan.', 'Enter unique source-row counts. Exceptions can overlap. Exposure is potential risk, not savings or confirmed loss.'],
    evidenceHeading: ['Bukti lokal dan sidik SHA-256', 'Local evidence and SHA-256 fingerprints'],
    evidenceNotice: ['Konten file hanya dibaca di memori untuk menghitung SHA-256. Hanya nama, ukuran, waktu modifikasi, dan hash yang disimpan. Maksimal 50 file, 20 MiB per file. Nama file harus unik.', 'File content is read only in memory to calculate SHA-256. Only the name, size, modification time, and hash are retained. Maximum 50 files, 20 MiB per file. Filenames must be unique.'],
    attachEvidence: ['Lampirkan file bukti', 'Attach evidence files'],
    chooseEvidence: ['Pilih satu atau beberapa file bukti', 'Choose one or more evidence files'],
    chooseJson: ['Pilih satu file JSON untuk diperiksa', 'Choose one JSON file to validate'],
    hashNotice: ['Hash membantu membandingkan file, bukan menjamin kebenaran isinya. Ekspor tidak menyertakan file asli. Hash yang diimpor belum diverifikasi ulang terhadap file asli.', 'Hashes help compare files, not prove their accuracy. Exports do not include original files. Imported hashes have not been independently checked against the originals.'],
    exceptionsHeading: ['Pengecualian yang dapat ditindaklanjuti', 'Exceptions with a clear next action'],
    exceptionsHint: ['Satu baris per temuan. Kandidat bukan kesimpulan final. Tambahkan hanya baris yang diperlukan, lalu lengkapi sumber dan tindak lanjut.', 'One row per finding. A candidate is not a final conclusion. Add only the rows needed, then complete sources and follow-up actions.'],
    overlapNotice: ['Jangan jumlahkan nilai antarbaris atau antarkategori. Satu kejadian dapat muncul beberapa kali. ID kelompok risiko opsional menautkan kandidat terkait; tampilan hanya menghitung kelompok unik per mata uang, tanpa menjumlahkan nilai atau mengklaim penghematan.', 'Do not add amounts across rows or categories. One event can appear more than once. An optional Risk Group ID links related candidates; the view counts unique groups per currency without adding amounts or claiming savings.'],
    addException: ['Tambah pengecualian', 'Add exception'],
    journalsHeading: ['Usulan penyesuaian, bukan instruksi pembukuan', 'Proposed adjustments, not posting instructions'],
    journalsHint: ['Gunakan ID jurnal yang sama untuk baris dalam satu jurnal. ID baris harus unik. Setiap ID jurnal dan mata uang harus seimbang hingga dua desimal.', 'Use the same Journal ID for lines in one journal. Line IDs must be unique. Every Journal ID and currency must balance to two decimal places.'],
    journalNotice: ['Isi salah satu sisi saja: debit atau kredit. Sisi kosong dihitung sebagai nol. Tidak ada fungsi pembukuan. Usulan hanya untuk ditinjau manusia.', 'Enter only one side: debit or credit. A blank side counts as zero. There is no posting function. Proposals are for human review only.'],
    addJournal: ['Tambah baris jurnal', 'Add journal line'],
    reviewHeading: ['Tinjau satu berkas kerja yang utuh', 'Review one complete dossier'],
    reviewHint: ['Pemeriksaan otomatis menguji kelengkapan dan aritmetika, bukan kebenaran akuntansi. Konfirmasi manusia tetap diperlukan.', 'Automated checks test completeness and arithmetic, not accounting correctness. Human confirmation is still required.'],
    reviewEvidence: ['Daftar bukti dan referensi', 'Evidence register and references'],
    reviewExceptions: ['Daftar pengecualian', 'Exception register'],
    reviewJournals: ['Usulan jurnal per mata uang', 'Proposed journals by currency'],
    checkpoints: ['Empat poin kendali', 'Four checkpoints'],
    checkpointsHint: ['Centang setelah Anda memeriksa sumber. Perubahan data membatalkan semua konfirmasi dan mengembalikan status menjadi draf.', 'Check these after inspecting the sources. Data changes clear all confirmations and return the status to draft.'],
    saveReady: ['Simpan draf siap ditinjau', 'Save review-ready draft'],
    readyNotice: ['Status akhir hanya “Siap ditinjau manusia”. Bukan disetujui, dikirim, atau dibukukan.', 'The final status is only “Ready for human review”. It is not approved, submitted, or posted.'],
    portability: ['Pindahkan draf dengan kendali Anda', 'Move the draft under your control'],
    exportHint: ['Ekspor JSON menyertakan payload, versi skema, dan riwayat lokal. Impor file yang sama di peramban lain. Ekspor dapat berisi draf belum lengkap dan selalu diperiksa ulang.', 'JSON exports include the payload, schema version, and local history. Import the same file in another browser. Exports may contain incomplete drafts and are always revalidated.'],
    exportJson: ['Unduh JSON', 'Download JSON'],
    printReview: ['Cetak tinjauan', 'Print review'],
    importJson: ['Pilih file draf JSON', 'Choose a JSON draft file'],
    importHint: ['Maksimal 1 MiB. File diperiksa sebelum diterapkan. Penerapan mengganti satu draf aktif. Ekspor draf saat ini terlebih dahulu jika perlu.', 'Maximum 1 MiB. The file is checked before it is applied. Applying replaces the one active draft. Export your current draft first if needed.'],
    applyImport: ['Terapkan draf impor', 'Apply imported draft'],
    auditHeading: ['Riwayat lokal', 'Local history'],
    auditNotice: ['Maksimal 1.000 kejadian terbaru. Riwayat ini dapat diubah bersama file JSON. Ini bukan log audit independen atau tanda persetujuan.', 'Up to 1,000 recent events. This history can be edited with the JSON file. It is not an independent audit log or an approval record.'],
    validationTitle: ['Hal yang perlu diperbaiki', 'Items to resolve'],
    validationHint: ['Pilih pesan untuk membuka kolom terkait. Draf belum lengkap tetap dapat disimpan, tetapi tidak dapat ditandai siap ditinjau.', 'Select a message to open the related field. Incomplete drafts can be saved but cannot be marked review-ready.'],
    autosaveNotice: ['Perubahan disimpan otomatis di peramban ini. Ekspor untuk cadangan yang dapat dipindahkan.', 'Changes are saved automatically in this browser. Export for a portable backup.'],
    validateDraft: ['Periksa draf', 'Validate draft'],
    saveDraft: ['Simpan draf', 'Save draft'],
    nextStep: ['Langkah berikutnya', 'Next step'],
    footer: ['Contoso Minerals Group adalah organisasi fiktif. Demo lokal tanpa integrasi sistem keuangan.', 'Contoso Minerals Group is fictional. A local demo with no financial system integration.'],
    site: ['Lokasi', 'Site'],
    preparedBy: ['Disusun oleh', 'Prepared by'],
    sourceAsOf: ['Data sumber per tanggal', 'Source as of'],
    reportTitle: ['Judul laporan', 'Report title'],
    narrative: ['Ringkasan untuk CFO', 'CFO summary'],
    currency: ['Mata uang', 'Currency'],
    reconciledRows: ['Baris yang direkonsiliasi', 'Reconciled rows'],
    unresolvedRows: ['Baris belum terselesaikan', 'Unresolved rows'],
    exposure: ['Potensi eksposur', 'Potential exposure'],
    exceptionId: ['ID pengecualian', 'Exception ID'],
    category: ['Kategori', 'Category'],
    sourceFile: ['File sumber', 'Source file'],
    sourceSheet: ['Sheet sumber', 'Source sheet'],
    sourceRow: ['ID baris sumber', 'Source row ID'],
    amount: ['Nilai baris', 'Row amount'],
    owner: ['Penanggung jawab', 'Owner'],
    dueDate: ['Tenggat', 'Due date'],
    action: ['Tindak lanjut', 'Action'],
    rationale: ['Dasar pertimbangan', 'Rationale'],
    riskGroupId: ['ID kelompok risiko (opsional)', 'Risk Group ID (optional)'],
    lineId: ['ID baris jurnal', 'Journal line ID'],
    journalId: ['ID jurnal', 'Journal ID'],
    account: ['Akun', 'Account'],
    debit: ['Debit', 'Debit'],
    credit: ['Kredit', 'Credit'],
    noJournalsReason: ['Alasan tidak mengusulkan jurnal', 'Reason for no proposed journals'],
    select: ['Pilih', 'Select'],
    'site.GROUP': ['GROUP · Grup', 'GROUP · Group'],
    'site.S01': ['S01 · Lokasi 01', 'S01 · Site 01'],
    'site.S02': ['S02 · Lokasi 02', 'S02 · Site 02'],
    'site.S03': ['S03 · Lokasi 03', 'S03 · Site 03'],
    'persona.PERSONA_A': ['Maya Hartono · Controller grup (fiktif)', 'Maya Hartono · Group controller (fictional)'],
    'persona.PERSONA_B': ['Dimas Wicaksono · Operasional (fiktif)', 'Dimas Wicaksono · Operations (fictional)'],
    'persona.PERSONA_C': ['Nadia Kusuma · Treasury (fiktif)', 'Nadia Kusuma · Treasury (fictional)'],
    'category.DUPLICATE_CANDIDATE': ['Kandidat duplikat', 'Duplicate candidate'],
    'category.MISSING_RECEIPT': ['Bukti penerimaan belum tersedia', 'Missing receipt'],
    'category.PRICE_DIFFERENCE': ['Selisih harga', 'Price difference'],
    'category.FX_MISSING': ['Kurs belum tersedia', 'FX missing'],
    'category.UNMAPPED_ACCOUNT': ['Akun belum dipetakan', 'Unmapped account'],
    'category.BANK_TIMING': ['Perbedaan waktu pencatatan bank', 'Bank timing'],
    'category.UNRECORDED_FEE': ['Biaya belum dicatat', 'Unrecorded fee'],
    'category.OTHER': ['Lainnya', 'Other'],
    periodHelp: ['Format YYYY-MM. Gunakan periode yang ditinjau.', 'YYYY-MM format. Use the period under review.'],
    sourceDateHelp: ['Format YYYY-MM-DD. Tanggal snapshot sumber harus pada atau setelah akhir periode.', 'YYYY-MM-DD format. The source snapshot date must be on or after period end.'],
    dateHelp: ['Format YYYY-MM-DD. Masukkan tanggal yang valid.', 'YYYY-MM-DD format. Enter a valid date.'],
    narrativeHelp: ['Minimal 80 karakter dan 12 kata. Jelaskan hasil, risiko, asumsi, dan tindak lanjut. Teks yang Anda masukkan tidak diterjemahkan otomatis.', 'At least 80 characters and 12 words. Explain results, risks, assumptions, and next actions. Your entered text is not automatically translated.'],
    moneyHelp: ['Tanpa pemisah ribuan. Gunakan titik desimal, maksimal dua desimal dan 12 digit sebelum titik.', 'No thousands separators. Use a decimal point, up to two decimal places and 12 digits before the point.'],
    wholeHelp: ['Bilangan bulat nonnegatif, maksimal 9 digit.', 'Nonnegative whole number, up to 9 digits.'],
    idHelp: ['1 sampai 40 karakter: huruf, angka, titik, garis bawah, atau tanda hubung. Awali dengan huruf atau angka.', '1 to 40 characters: letters, numbers, dot, underscore, or hyphen. Start with a letter or number.'],
    sourceHelp: ['Gunakan nama file persis seperti pada daftar bukti.', 'Use the filename exactly as shown in the evidence register.'],
    noJournalsHelp: ['Wajib bila tidak ada baris jurnal. Minimal 20 karakter dan 4 kata.', 'Required when there are no journal lines. At least 20 characters and 4 words.'],
    'check.evidence': ['Saya telah memeriksa file bukti serta referensi file, sheet, dan baris.', 'I have checked evidence files and file, sheet, and row references.'],
    'check.amountsPeriod': ['Saya telah memeriksa periode, mata uang, jumlah baris unik, dan nilai terhadap sumber.', 'I have checked the period, currency, unique row counts, and amounts against the sources.'],
    'check.summary': ['Saya telah meninjau ringkasan CFO, asumsi, potensi risiko, dan tindak lanjut yang bermakna.', 'I have reviewed a meaningful CFO summary, assumptions, potential risks, and next actions.'],
    'check.balance': ['Saya telah memeriksa keseimbangan tiap jurnal dan mata uang, atau alasan tidak ada usulan jurnal.', 'I have checked every journal and currency balance, or the reason for no proposed journals.'],
    evidenceEmpty: ['Belum ada file bukti', 'No evidence files yet'],
    evidenceEmptyHelp: ['Lampirkan file sintetis untuk menghitung hash lokal dan mencatat referensinya.', 'Attach a synthetic file to calculate its local hash and record its reference.'],
    exceptionsEmpty: ['Belum ada pengecualian', 'No exceptions yet'],
    exceptionsEmptyHelp: ['Tambahkan temuan dari analisis Anda. Tidak ada baris contoh atau nilai bawaan.', 'Add findings from your analysis. There are no sample rows or preloaded amounts.'],
    journalsEmpty: ['Belum ada usulan jurnal', 'No proposed journals yet'],
    journalsEmptyHelp: ['Tambahkan baris yang didukung bukti, atau jelaskan mengapa tidak ada usulan jurnal.', 'Add evidence-backed lines, or explain why no journal is proposed.'],
    blank: ['Belum diisi', 'Not entered'],
    invalidValue: ['Nilai tidak valid', 'Invalid value'],
    row: ['Baris', 'Row'],
    source: ['Referensi sumber', 'Source reference'],
    followUp: ['Tindak lanjut dan dasar', 'Follow-up and rationale'],
    count: ['Jumlah baris', 'Row count'],
    rowAmounts: ['Nilai per baris, tidak dijumlahkan', 'Per-row amounts, not summed'],
    categorySummary: ['Ringkasan kategori per mata uang', 'Categories by currency'],
    linkedGroups: ['Kelompok risiko unik', 'Unique risk groups'],
    unlinkedRows: ['Baris tanpa kelompok', 'Rows without a group'],
    balanceStatus: ['Pemeriksaan keseimbangan', 'Balance check'],
    balanced: ['Seimbang', 'Balanced'],
    unbalanced: ['Belum seimbang atau belum lengkap', 'Unbalanced or incomplete'],
    difference: ['Debit dikurangi kredit', 'Debit less credit'],
    filename: ['Nama file', 'Filename'],
    fileSize: ['Ukuran (byte)', 'Size (bytes)'],
    modified: ['Modifikasi terakhir', 'Last modified'],
    hash: ['SHA-256', 'SHA-256'],
    noDate: ['Tidak dicatat', 'Not recorded'],
    auditTime: ['Waktu lokal', 'Local time'],
    auditAction: ['Kejadian', 'Event'],
    'audit.created': ['Draf baru dibuka', 'New draft opened'],
    'audit.edited': ['Isi atau konfirmasi diubah', 'Content or confirmations edited'],
    'audit.saved-draft': ['Draf disimpan', 'Draft saved'],
    'audit.saved-review-ready': ['Draf siap ditinjau disimpan', 'Review-ready draft saved'],
    'audit.imported': ['Draf diimpor, konfirmasi dikosongkan', 'Draft imported, confirmations cleared'],
    'audit.exported': ['Ekspor JSON disiapkan', 'JSON export prepared'],
    'audit.evidence-added': ['Metadata bukti ditambahkan', 'Evidence metadata added'],
    localSaved: ['Tersimpan lokal', 'Saved locally'],
    notSaved: ['Belum tersimpan lokal', 'Not saved locally'],
    newLocal: ['Belum ada draf tersimpan', 'No saved draft yet'],
    savedDraft: ['Draf disimpan hanya di peramban ini.', 'Draft saved only in this browser.'],
    savedReady: ['Draf disimpan dengan status Siap ditinjau manusia. Tidak ada yang dikirim atau dibukukan.', 'Draft saved as Ready for human review. Nothing was submitted or posted.'],
    editReset: ['Perubahan mengembalikan status menjadi draf dan mengosongkan konfirmasi.', 'The change returned the status to draft and cleared confirmations.'],
    complete: ['Semua pemeriksaan lulus. Draf dapat disimpan untuk ditinjau manusia.', 'All checks pass. The draft can be saved for human review.'],
    issues: ['Hal yang perlu diperbaiki: {count}. Buka “Periksa draf” untuk rinciannya.', 'Items to resolve: {count}. Open “Validate draft” for details.'],
    validated: ['Pemeriksaan selesai. Hal yang perlu diperbaiki: {count}.', 'Validation completed. Items to resolve: {count}.'],
    storageFailed: ['Penyimpanan lokal tidak tersedia atau penuh. Perubahan hanya berada di memori. Unduh JSON sebelum menutup halaman.', 'Local storage is unavailable or full. Changes are only in memory. Download JSON before closing the page.'],
    restoreFailed: ['Draf tersimpan tidak dapat dibaca dan belum ditimpa. Gunakan impor untuk memulihkan cadangan, atau pilih Simpan draf untuk mengganti data lokal dengan draf ini.', 'The saved draft could not be read and has not been overwritten. Import a backup to recover it, or choose Save draft to replace the local data with this draft.'],
    evidenceBusy: ['Menghitung SHA-256 secara lokal. File tidak diunggah.', 'Calculating SHA-256 locally. Files are not uploaded.'],
    evidenceAdded: ['Metadata bukti disimpan. File baru: {count}.', 'Evidence metadata saved. New files: {count}.'],
    evidenceLimit: ['Bukti tidak ditambahkan. Batasnya 50 file, 20 MiB per file, nama unik hingga 255 karakter.', 'Evidence was not added. Limits: 50 files, 20 MiB per file, unique filenames up to 255 characters.'],
    evidenceConflict: ['Nama file sudah digunakan dengan hash berbeda. Ganti nama file sebelum melampirkannya.', 'That filename already has a different hash. Rename the file before attaching it.'],
    evidenceError: ['File tidak dapat dibaca atau SHA-256 tidak tersedia. Gunakan HTTPS atau localhost, lalu coba lagi.', 'The file could not be read or SHA-256 is unavailable. Use HTTPS or localhost, then try again.'],
    rowLimit: ['Maksimal 200 baris per daftar.', 'Maximum 200 rows per register.'],
    finishRow: ['Lengkapi atau perbaiki baris yang ada sebelum menambah baris baru.', 'Complete or correct existing rows before adding another row.'],
    duplicateIdInput: ['ID tidak diterapkan karena sudah digunakan pada baris lain. Gunakan ID unik.', 'The ID was not applied because another row already uses it. Use a unique ID.'],
    bothSidesInput: ['Nilai tidak diterapkan. Kosongkan sisi lainnya sebelum memasukkan nilai positif.', 'The amount was not applied. Clear the other side before entering a positive amount.'],
    exported: ['Unduhan JSON disiapkan. Simpan file tersebut sebagai cadangan Anda.', 'The JSON download is ready. Save the file as your backup.'],
    exportFailed: ['Ekspor tidak dapat dibuat. Periksa ketersediaan unduhan di peramban.', 'The export could not be created. Check that browser downloads are available.'],
    importPreview: ['Skema valid: {title}. Pengecualian: {exceptions}. Baris jurnal: {journals}. Hal yang perlu diperbaiki: {issues}. Terapkan untuk mengganti draf aktif. Konfirmasi akan dikosongkan.', 'Valid schema: {title}. Exceptions: {exceptions}. Journal lines: {journals}. Items to resolve: {issues}. Apply to replace the active draft. Confirmations will be cleared.'],
    imported: ['Draf diterapkan. Tinjau ulang bukti dan empat poin kendali. File asli tidak disertakan dalam JSON.', 'Draft applied. Recheck the evidence and all four checkpoints. Original files are not included in JSON.'],
    importRejected: ['Impor ditolak. Draf aktif tidak diubah.', 'Import rejected. The active draft was not changed.'],
    'import.size': ['Ukuran JSON melebihi 1 MiB.', 'JSON exceeds 1 MiB.'],
    'import.json': ['File bukan JSON yang valid.', 'The file is not valid JSON.'],
    'import.schema': ['Struktur, kolom, panjang daftar, atau metadata file tidak sesuai skema.', 'The structure, fields, list length, or file metadata does not match the schema.'],
    'import.type': ['Jenis atau panjang data tidak sesuai skema.', 'A data type or length does not match the schema.'],
    'import.enum': ['Kode lokasi, persona, mata uang, kategori, status, atau kejadian tidak dikenal.', 'An unknown site, persona, currency, category, status, or event code was found.'],
    'import.version': ['Versi skema tidak didukung. Diperlukan cmg.close.v1.', 'Unsupported schema version. cmg.close.v1 is required.'],
    'import.unsafe': ['Nama properti berbahaya ditemukan.', 'An unsafe property name was found.'],
    'import.readiness': ['Status siap ditinjau tidak didukung oleh hasil validasi.', 'The review-ready status is not supported by validation results.'],
    'error.required': ['Isi kolom ini.', 'Complete this field.'],
    'error.period': ['Gunakan periode YYYY-MM yang valid antara 2000 dan 2099.', 'Use a valid YYYY-MM period between 2000 and 2099.'],
    'error.date': ['Gunakan tanggal yang valid antara 2000 dan 2099.', 'Use a valid date between 2000 and 2099.'],
    'error.sourcePeriod': ['Tanggal sumber harus pada atau setelah akhir periode.', 'The source date must be on or after period end.'],
    'error.narrative': ['Tulis minimal 80 karakter dan 12 kata, lalu tinjau maknanya secara manual.', 'Write at least 80 characters and 12 words, then review its meaning manually.'],
    'error.whole': ['Masukkan bilangan bulat nonnegatif hingga 9 digit.', 'Enter a nonnegative whole number of up to 9 digits.'],
    'error.money': ['Masukkan nilai nonnegatif yang valid, maksimal 12 digit dan 2 desimal. Gunakan titik, tanpa pemisah ribuan.', 'Enter a valid nonnegative amount, up to 12 digits and 2 decimal places. Use a decimal point, without thousands separators.'],
    'error.evidence': ['Lampirkan setidaknya satu file bukti.', 'Attach at least one evidence file.'],
    'error.sourceFile': ['Nama file harus sama persis dengan salah satu file bukti terlampir.', 'The filename must exactly match an attached evidence file.'],
    'error.identifier': ['Gunakan ID 1 sampai 40 karakter yang diawali huruf atau angka; hanya huruf, angka, titik, garis bawah, dan tanda hubung.', 'Use an ID of 1 to 40 characters starting with a letter or number; only letters, numbers, dots, underscores, and hyphens.'],
    'error.duplicate': ['ID sudah digunakan. Huruf besar dan kecil dianggap sama.', 'This ID is already used. IDs are case-insensitive.'],
    'error.duplicateRecord': ['Catatan sumber yang sama sudah ada. Perbaiki referensi atau gabungkan analisis pada baris yang tepat.', 'The same source record already exists. Correct the reference or consolidate the analysis on the appropriate row.'],
    'error.rationale': ['Jelaskan dasar pertimbangan minimal 20 karakter dan 4 kata.', 'Explain the rationale in at least 20 characters and 4 words.'],
    'error.bothSides': ['Debit dan kredit tidak boleh sama-sama positif pada satu baris.', 'Debit and credit cannot both be positive on one line.'],
    'error.emptyLine': ['Salah satu sisi harus lebih besar dari nol.', 'One side must be greater than zero.'],
    'error.balance': ['Jurnal dan mata uang ini memerlukan minimal dua baris valid, total positif, dan selisih nol hingga dua desimal.', 'This journal and currency need at least two valid lines, positive totals, and a zero difference to two decimal places.'],
    'error.noJournals': ['Jelaskan alasan tidak ada jurnal, minimal 20 karakter dan 4 kata.', 'Explain why no journal is proposed, in at least 20 characters and 4 words.'],
    'error.check': ['Konfirmasikan setelah memeriksa bukti dan hasil analisis.', 'Confirm after checking the evidence and analysis.']
  };
  let payload = M.emptyPayload(), audit = [], activeStep = 'overview';
  let showErrors = false, pendingImport = null, busy = false, storageLocked = false;
  let saved = false, editRecorded = false, notice = null, storageErrorKey = '';
  function t(key, values = {}) {
    const pair = COPY[key];
    if (!pair) throw new Error('Missing translation: ' + key);
    return pair[payload.language === 'en' ? 1 : 0].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ''));
  }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function log(action) {
    audit.push({ at: new Date().toISOString(), action });
    if (audit.length > 1000) audit = audit.slice(-1000);
  }
  function persist(explicit = false) {
    if (storageLocked && !explicit) { saved = false; updateStorage(); return false; }
    try {
      const text = JSON.stringify(M.envelope(payload, audit));
      if (new TextEncoder().encode(text).length > M.MAX_IMPORT_BYTES) throw new Error('size');
      localStorage.setItem(STORAGE_KEY, text);
      saved = true; storageLocked = false; storageErrorKey = '';
    } catch (_) { saved = false; storageErrorKey = 'storageFailed'; }
    updateStorage();
    return saved;
  }
  function updateStorage() {
    $('save-state').textContent = t(saved ? 'localSaved' : audit.length ? 'notSaved' : 'newLocal');
    $('storage-alert').hidden = !storageErrorKey;
    $('storage-alert').textContent = storageErrorKey ? t(storageErrorKey) : '';
  }
  function message(key, values = {}, danger = false, detailKey = '') {
    notice = { key, values, danger, detailKey };
    $('message').hidden = false;
    $('message').classList.toggle('danger', danger);
    $('message').textContent = t(key, values) + (detailKey ? ' ' + t(detailKey) : '');
  }
  function changed(checkOnly = false, action = 'edited') {
    const confirmed = payload.status === 'review-ready' || Object.values(payload.checks).some(Boolean);
    payload.status = 'draft';
    if (!checkOnly) for (const key of Object.keys(payload.checks)) payload.checks[key] = false;
    if (!editRecorded || action !== 'edited') { log(action); editRecorded = true; }
    if (!checkOnly && confirmed) message('editReset');
    persist();
    updateDerived();
  }
  function localeNumber(value) { return new Intl.NumberFormat(payload.language === 'en' ? 'en-US' : 'id-ID').format(value); }
  function money(value) {
    const amount = typeof value === 'bigint' ? value : M.cents(value);
    if (amount === null) return value === '' ? t('blank') : t('invalidValue') + ': ' + value;
    const absolute = amount < 0n ? -amount : amount;
    return (amount < 0n ? '-' : '') + localeNumber(absolute / 100n) + (payload.language === 'en' ? '.' : ',') + String(absolute % 100n).padStart(2, '0');
  }
  function show(value) { return value || t('blank'); }
  function dateText(value) {
    return value ? new Date(value).toLocaleString(payload.language === 'en' ? 'en-GB' : 'id-ID') : t('noDate');
  }
  function sourceText(source) {
    return [t('sourceFile') + ': ' + show(source.file), t('sourceSheet') + ': ' + show(source.sheet), t('sourceRow') + ': ' + show(source.rowId)].join('\n');
  }
  function empty(container, title, hint) {
    const box = element('div', undefined, 'empty');
    box.append(element('strong', t(title)), element('span', t(hint)));
    container.append(box);
  }
  function table(container, caption, headers, rows) {
    const wrap = element('div', undefined, 'table-wrap');
    wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', t(caption));
    const grid = element('table'), head = element('thead'), header = element('tr'), body = element('tbody');
    grid.append(element('caption', t(caption)));
    headers.forEach(key => { const th = element('th', t(key)); th.scope = 'col'; header.append(th); });
    head.append(header);
    rows.forEach(values => {
      const row = element('tr');
      values.forEach(value => { const cell = element('td'); if (value instanceof Node) cell.append(value); else cell.textContent = value; row.append(cell); });
      body.append(row);
    });
    grid.append(head, body); wrap.append(grid); container.append(wrap);
  }
  function multiline(text, className = 'row-list') {
    const node = element('div', undefined, className);
    text.split('\n').forEach(line => node.append(element('span', line)));
    return node;
  }
  function options(kind) {
    if (kind === 'currency') return M.CURRENCIES.map(value => [value, value]);
    if (kind === 'site') return M.SITES.map(value => [value, t('site.' + value)]);
    if (kind === 'persona') return [['', t('select')], ...M.PERSONAS.map(value => [value, t('persona.' + value)])];
    return M.CATEGORIES.map(value => [value, t('category.' + value)]);
  }
  function getPath(path) { return path.split('.').reduce((value, key) => value[key], payload); }
  function setPath(path, value) {
    const parts = path.split('.'), key = parts.pop();
    parts.reduce((object, part) => object[part], payload)[key] = value;
  }
  function field(container, spec) {
    const box = element('div', undefined, 'field' + (spec.wide ? ' wide' : ''));
    const label = element('label', t(spec.label)); label.htmlFor = spec.id;
    let input;
    if (spec.options) {
      input = element('select');
      options(spec.options).forEach(([value, text]) => { const option = element('option', text); option.value = value; input.append(option); });
    } else if (spec.type === 'textarea') { input = element('textarea'); input.rows = spec.label === 'narrative' ? 5 : 3; }
    else {
      input = element('input'); input.type = spec.type || 'text';
      if (spec.inputMode) input.inputMode = spec.inputMode;
      if (spec.label === 'sourceFile') input.setAttribute('list', 'evidence-names');
    }
    input.id = spec.id; input.name = spec.id; input.dataset.path = spec.path;
    input.value = getPath(spec.path); input.required = !spec.optional;
    input.setAttribute('aria-label', t(spec.label));
    if (spec.max) input.maxLength = spec.max;
    input.addEventListener('input', () => {
      const parts = spec.path.split('.');
      const rows = payload[parts[0]];
      if (Array.isArray(rows) && (parts[2] === 'id' || parts[2] === 'lineId') && input.value.trim()) {
        const duplicate = rows.some((row, index) => index !== Number(parts[1]) && row[parts[2]].trim().toUpperCase() === input.value.trim().toUpperCase());
        if (duplicate) { input.value = getPath(spec.path); message('duplicateIdInput', {}, true); return; }
      }
      if (parts[0] === 'journals' && ['debit', 'credit'].includes(parts[2])) {
        const opposite = rows[Number(parts[1])][parts[2] === 'debit' ? 'credit' : 'debit'];
        if (M.cents(input.value, true) > 0n && M.cents(opposite, true) > 0n) {
          input.value = getPath(spec.path); message('bothSidesInput', {}, true); return;
        }
      }
      setPath(spec.path, input.value); changed();
    });
    box.append(label, input);
    if (spec.help) {
      const help = element('span', t(spec.help), 'field-help'); help.id = spec.id + '-help';
      input.setAttribute('aria-describedby', help.id); box.append(help);
    }
    container.append(box);
    return input;
  }
  const dossierFields = [
    { id: 'period', path: 'period', label: 'period', max: 7, help: 'periodHelp' },
    { id: 'site', path: 'site', label: 'site', options: 'site' },
    { id: 'prepared-by', path: 'preparedBy', label: 'preparedBy', options: 'persona' },
    { id: 'source-as-of', path: 'sourceAsOf', label: 'sourceAsOf', max: 10, help: 'sourceDateHelp' },
    { id: 'report-title', path: 'reportTitle', label: 'reportTitle', max: 200, wide: true },
    { id: 'narrative', path: 'narrative', label: 'narrative', type: 'textarea', max: 8000, wide: true, help: 'narrativeHelp' }
  ];
  const kpiFields = [
    { id: 'currency', path: 'kpis.currency', label: 'currency', options: 'currency' },
    { id: 'reconciled-rows', path: 'kpis.reconciledRows', label: 'reconciledRows', max: 9, inputMode: 'numeric', help: 'wholeHelp' },
    { id: 'unresolved-rows', path: 'kpis.unresolvedRows', label: 'unresolvedRows', max: 9, inputMode: 'numeric', help: 'wholeHelp' },
    { id: 'exposure', path: 'kpis.exposure', label: 'exposure', max: 25, inputMode: 'decimal', help: 'moneyHelp' }
  ];
  function sourceFields(base, path) {
    return [
      { id: base + '-source-file', path: path + '.source.file', label: 'sourceFile', max: 255, help: 'sourceHelp' },
      { id: base + '-source-sheet', path: path + '.source.sheet', label: 'sourceSheet', max: 100 },
      { id: base + '-source-row', path: path + '.source.rowId', label: 'sourceRow', max: 100 }
    ];
  }
  function renderRows(kind) {
    const exception = kind === 'exceptions', rows = payload[kind], container = $(exception ? 'exception-rows' : 'journal-rows');
    container.replaceChildren();
    if (!rows.length) { empty(container, exception ? 'exceptionsEmpty' : 'journalsEmpty', exception ? 'exceptionsEmptyHelp' : 'journalsEmptyHelp'); return; }
    rows.forEach((row, index) => {
      const base = (exception ? 'exception-' : 'journal-') + (index + 1), path = kind + '.' + index;
      const card = element('section', undefined, 'card row-card'), heading = element('div', undefined, 'row-heading');
      heading.append(element('h3', t('row') + ' ' + (index + 1)), element('span', exception ? t('exceptions') : t('journals')));
      const grid = element('div', undefined, 'field-grid three'); card.append(heading, grid);
      const specs = exception ? [
        { id: base + '-id', path: path + '.id', label: 'exceptionId', max: 40, help: 'idHelp' },
        { id: base + '-category', path: path + '.category', label: 'category', options: 'category' },
        { id: base + '-risk-group', path: path + '.riskGroupId', label: 'riskGroupId', max: 40, optional: true, help: 'idHelp' },
        ...sourceFields(base, path),
        { id: base + '-currency', path: path + '.currency', label: 'currency', options: 'currency' },
        { id: base + '-amount', path: path + '.amount', label: 'amount', max: 25, inputMode: 'decimal', help: 'moneyHelp' },
        { id: base + '-owner', path: path + '.owner', label: 'owner', options: 'persona' },
        { id: base + '-due-date', path: path + '.dueDate', label: 'dueDate', max: 10, help: 'dateHelp' },
        { id: base + '-action', path: path + '.action', label: 'action', max: 1000, type: 'textarea' },
        { id: base + '-rationale', path: path + '.rationale', label: 'rationale', max: 1000, type: 'textarea' }
      ] : [
        { id: base + '-line-id', path: path + '.lineId', label: 'lineId', max: 40, help: 'idHelp' },
        { id: base + '-journal-id', path: path + '.journalId', label: 'journalId', max: 40, help: 'idHelp' },
        { id: base + '-account', path: path + '.account', label: 'account', max: 100 },
        { id: base + '-debit', path: path + '.debit', label: 'debit', max: 25, inputMode: 'decimal', optional: true, help: 'moneyHelp' },
        { id: base + '-credit', path: path + '.credit', label: 'credit', max: 25, inputMode: 'decimal', optional: true, help: 'moneyHelp' },
        { id: base + '-currency', path: path + '.currency', label: 'currency', options: 'currency' },
        ...sourceFields(base, path)
      ];
      specs.forEach(spec => field(grid, spec));
      container.append(card);
    });
  }
  function renderEvidence(container) {
    container.replaceChildren();
    if (!payload.evidence.length) return empty(container, 'evidenceEmpty', 'evidenceEmptyHelp');
    table(container, 'evidenceFiles', ['filename', 'fileSize', 'modified', 'hash'], payload.evidence.map(file => [
      file.name, localeNumber(file.size), dateText(file.lastModified), element('span', file.sha256, 'hash')
    ]));
  }
  function renderCategorySummary() {
    const container = $('exception-summary'); container.replaceChildren();
    if (!payload.exceptions.length) return;
    const card = element('section', undefined, 'card'); card.append(element('h3', t('categorySummary')));
    table(card, 'categorySummary', ['category', 'currency', 'count', 'rowAmounts'], M.categorySummary(payload.exceptions).map(group => [
      t('category.' + group.category), group.currency, localeNumber(group.rows.length),
      multiline(group.rows.map(row => show(row.id) + ': ' + money(row.amount) + (row.riskGroupId ? ' · ' + row.riskGroupId : '')).join('\n'))
    ]));
    table(card, 'linkedGroups', ['currency', 'linkedGroups', 'unlinkedRows'], M.riskCounts(payload.exceptions).map(group => [group.currency, localeNumber(group.groups), localeNumber(group.unlinked)]));
    container.append(card);
  }
  function renderBalance(container) {
    container.replaceChildren();
    if (!payload.journals.length) return;
    table(container, 'balanceStatus', ['journalId', 'currency', 'debit', 'credit', 'difference', 'balanceStatus'], M.journalTotals(payload.journals).map(total => {
      const balanced = total.valid && total.debit === total.credit && total.debit > 0n && total.count >= 2;
      return [show(total.journalId), total.currency, total.valid ? money(total.debit) : t('invalidValue'), total.valid ? money(total.credit) : t('invalidValue'), total.valid ? money(total.debit - total.credit) : t('invalidValue'), element('span', t(balanced ? 'balanced' : 'unbalanced'), balanced ? 'balanced' : 'unbalanced')];
    }));
  }
  function reviewMetadata() {
    const container = $('review-dossier'); container.replaceChildren();
    container.append(element('h3', show(payload.reportTitle)));
    const list = element('dl', undefined, 'review-meta');
    const entries = [
      ['period', show(payload.period)], ['site', t('site.' + payload.site)],
      ['preparedBy', payload.preparedBy ? t('persona.' + payload.preparedBy) : t('blank')],
      ['sourceAsOf', show(payload.sourceAsOf)], ['dossierStatus', t(payload.status === 'review-ready' ? 'ready' : 'draft')],
      ['currency', payload.kpis.currency],
      ['reconciledRows', show(payload.kpis.reconciledRows)], ['unresolvedRows', show(payload.kpis.unresolvedRows)],
      ['exposure', payload.kpis.currency + ' ' + money(payload.kpis.exposure)]
    ];
    entries.forEach(([label, value]) => {
      const group = element('div'); group.append(element('dt', t(label)), element('dd', value)); list.append(group);
    });
    container.append(list, element('h3', t('narrative')), element('p', show(payload.narrative), 'narrative-text'));
    container.append(element('p', t('kpisHint'), 'small'), element('p', t('readyNotice'), 'small'));
  }
  function renderReview() {
    reviewMetadata();
    renderEvidence($('review-evidence'));
    const exceptions = $('review-exceptions'); exceptions.replaceChildren();
    if (!payload.exceptions.length) empty(exceptions, 'exceptionsEmpty', 'exceptionsEmptyHelp');
    else {
      exceptions.append(element('p', t('overlapNotice'), 'small'));
      table(exceptions, 'reviewExceptions', ['exceptionId', 'category', 'source', 'rowAmounts', 'owner', 'followUp'], payload.exceptions.map(row => [
        multiline(show(row.id) + '\n' + (row.riskGroupId ? t('riskGroupId') + ': ' + row.riskGroupId : t('unlinkedRows'))),
        t('category.' + row.category), multiline(sourceText(row.source)),
        row.currency + ' ' + money(row.amount),
        multiline((row.owner ? t('persona.' + row.owner) : t('blank')) + '\n' + t('dueDate') + ': ' + show(row.dueDate)),
        multiline(t('action') + ': ' + show(row.action) + '\n' + t('rationale') + ': ' + show(row.rationale))
      ]));
    }
    const journals = $('review-journals'); renderBalance(journals);
    if (!payload.journals.length) {
      empty(journals, 'journalsEmpty', 'journalsEmptyHelp');
      journals.append(element('p', t('noJournalsReason') + ': ' + show(payload.noJournalsReason)));
    } else table(journals, 'reviewJournals', ['lineId', 'journalId', 'account', 'currency', 'debit', 'credit', 'source'], payload.journals.map(row => [
      show(row.lineId), show(row.journalId), show(row.account), row.currency, money(M.cents(row.debit, true) ?? row.debit), money(M.cents(row.credit, true) ?? row.credit), multiline(sourceText(row.source))
    ]));
    const history = $('audit-trail'); history.replaceChildren();
    table(history, 'auditHeading', ['auditTime', 'auditAction'], audit.slice().reverse().map(event => [dateText(event.at), t('audit.' + event.action)]));
  }
  function renderChecks() {
    const container = $('checkpoint-fields'); container.replaceChildren();
    Object.keys(payload.checks).forEach(key => {
      const label = element('label', undefined, 'check-row'), input = element('input');
      input.type = 'checkbox'; input.id = 'check-' + key; input.name = input.id; input.checked = payload.checks[key];
      input.setAttribute('aria-label', t('check.' + key)); label.htmlFor = input.id;
      input.addEventListener('change', () => { payload.checks[key] = input.checked; changed(true); });
      label.append(input, element('span', t('check.' + key))); container.append(label);
    });
  }
  function go(step, focus = false) {
    activeStep = step;
    STEPS.forEach(name => {
      $('tab-' + name).setAttribute('aria-selected', String(name === step));
      $('tab-' + name).tabIndex = name === step ? 0 : -1;
      $('panel-' + name).hidden = name !== step;
    });
    $('next-step').hidden = step === 'review';
    if (step === 'review') renderReview();
    if (focus) $('tab-' + step).focus();
  }
  function renderErrors(errors) {
    document.querySelectorAll('[aria-invalid="true"]').forEach(node => node.removeAttribute('aria-invalid'));
    $('validation-errors').replaceChildren();
    $('validation-panel').hidden = !showErrors || !errors.length;
    if (!showErrors) return;
    errors.forEach((error, index) => {
      const item = element('li'), link = element('a', (error.context ? error.context + ' · ' : '') + t(error.label) + ': ' + t('error.' + error.code));
      link.href = '#' + error.target; link.id = 'validation-error-' + index;
      link.addEventListener('click', event => { event.preventDefault(); go(error.step); const target = $(error.target); target?.focus(); target?.scrollIntoView({ block: 'center' }); });
      item.append(link); $('validation-errors').append(item);
      $(error.target)?.setAttribute('aria-invalid', 'true');
    });
  }
  function updateDerived() {
    $('draft-status').textContent = t(payload.status === 'review-ready' ? 'ready' : 'draft');
    $('metric-period').textContent = show(payload.period);
    $('metric-exceptions').textContent = localeNumber(payload.exceptions.length);
    $('metric-journals').textContent = localeNumber(M.journalTotals(payload.journals).length);
    $('metric-evidence').textContent = localeNumber(payload.evidence.length);
    const errors = M.validate(payload);
    $('readiness-summary').textContent = errors.length ? t('issues', { count: errors.length }) : t('complete');
    $('save-review-ready').disabled = errors.length > 0 || busy;
    for (const key of Object.keys(payload.checks)) if ($('check-' + key)) $('check-' + key).checked = payload.checks[key];
    renderCategorySummary(); renderBalance($('journal-balance')); renderErrors(errors);
    $('no-journals-field').hidden = payload.journals.length > 0;
    if ($('no-journals-reason')) $('no-journals-reason').required = !payload.journals.length;
    if (activeStep === 'review') renderReview();
  }
  function render() {
    document.documentElement.lang = payload.language;
    document.querySelectorAll('[data-i18n]').forEach(node => { node.textContent = t(node.dataset.i18n); });
    $('lang-id').setAttribute('aria-pressed', String(payload.language === 'id'));
    $('lang-en').setAttribute('aria-pressed', String(payload.language === 'en'));
    for (const [container, specs] of [[$('dossier-fields'), dossierFields], [$('kpi-fields'), kpiFields]]) {
      container.replaceChildren(); specs.forEach(spec => field(container, spec));
    }
    $('no-journals-field').replaceChildren();
    field($('no-journals-field'), { id: 'no-journals-reason', path: 'noJournalsReason', label: 'noJournalsReason', type: 'textarea', max: 1000, help: 'noJournalsHelp' });
    renderRows('exceptions'); renderRows('journals'); renderChecks(); renderEvidence($('evidence-list'));
    let names = $('evidence-names');
    if (!names) { names = element('datalist'); names.id = 'evidence-names'; document.body.append(names); }
    names.replaceChildren();
    payload.evidence.forEach(file => { const option = element('option'); option.value = file.name; names.append(option); });
    updateDerived(); updateStorage(); go(activeStep);
    if (notice) message(notice.key, notice.values, notice.danger, notice.detailKey);
    renderImportPreview();
  }
  function setBusy(value) {
    busy = value;
    for (const id of ['evidence-files', 'import-json', 'export-json', 'save-draft', 'print-review']) $(id).disabled = value;
    $('apply-import').disabled = value || !pendingImport;
    updateDerived();
  }
  function addRow(kind) {
    if (payload[kind].length >= M.MAX_ROWS) return message('rowLimit', {}, true);
    const errors = M.validate(payload).filter(error => error.step === kind && !['balance', 'noJournals'].includes(error.code));
    if (errors.length) { showErrors = true; updateDerived(); message('finishRow', {}, true); $(errors[0].target)?.focus(); return; }
    payload[kind].push(kind === 'exceptions' ? M.newException(payload.exceptions) : M.newJournal(payload.journals));
    changed(); renderRows(kind); updateDerived();
    const id = kind === 'exceptions' ? 'exception-' + payload.exceptions.length + '-id' : 'journal-' + payload.journals.length + '-line-id';
    $(id).focus();
  }
  function renderImportPreview() {
    $('import-preview').hidden = !pendingImport;
    $('apply-import').disabled = !pendingImport || busy;
    if (pendingImport) {
      const p = pendingImport.payload;
      $('import-preview').textContent = t('importPreview', { title: show(p.reportTitle), exceptions: p.exceptions.length, journals: p.journals.length, issues: M.validate(p).length });
    }
  }
  $('close-form').addEventListener('submit', event => event.preventDefault());
  STEPS.forEach((step, index) => {
    $('tab-' + step).addEventListener('click', () => go(step));
    $('tab-' + step).addEventListener('keydown', event => {
      const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (direction || event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        go(event.key === 'Home' ? STEPS[0] : event.key === 'End' ? STEPS[3] : STEPS[(index + direction + STEPS.length) % STEPS.length], true);
      }
    });
  });
  ['id', 'en'].forEach(language => $('lang-' + language).addEventListener('click', () => {
    payload.language = language; persist(); render(); $('lang-' + language).focus();
  }));
  $('next-step').addEventListener('click', () => { go(STEPS[Math.min(3, STEPS.indexOf(activeStep) + 1)], true); $('workspace').scrollIntoView({ block: 'start' }); });
  $('add-exception').addEventListener('click', () => addRow('exceptions'));
  $('add-journal-line').addEventListener('click', () => addRow('journals'));
  $('validate-draft').addEventListener('click', () => { showErrors = true; updateDerived(); message('validated', { count: M.validate(payload).length }); if (M.validate(payload).length) $('validation-panel').scrollIntoView({ block: 'start' }); });
  $('save-draft').addEventListener('click', () => {
    const previousAudit = audit.slice();
    payload.status = 'draft'; log('saved-draft'); editRecorded = false;
    const ok = persist(true);
    if (!ok) audit = previousAudit;
    updateDerived(); if (ok) message('savedDraft');
  });
  $('save-review-ready').addEventListener('click', () => {
    showErrors = true;
    if (busy || M.validate(payload).length) { updateDerived(); return; }
    const previousAudit = audit.slice();
    payload.status = 'review-ready'; log('saved-review-ready'); editRecorded = false;
    if (persist(true)) message('savedReady');
    else { payload.status = 'draft'; audit = previousAudit; }
    updateDerived();
  });
  $('evidence-files').addEventListener('change', async event => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length || busy) return;
    if (selected.some(file => file.size > M.MAX_FILE_BYTES || !file.name.trim() || file.name.length > 255) || selected.length > M.MAX_FILES) {
      event.target.value = ''; message('evidenceLimit', {}, true); return;
    }
    setBusy(true); message('evidenceBusy');
    try {
      const additions = [];
      for (const file of selected) {
        const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
        const sha256 = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
        const existing = [...payload.evidence, ...additions].find(item => item.name === file.name);
        if (existing && existing.sha256 !== sha256) throw new Error('evidenceConflict');
        if (!existing) additions.push({ name: file.name, size: file.size, sha256, lastModified: file.lastModified });
      }
      if (payload.evidence.length + additions.length > M.MAX_FILES) throw new Error('evidenceLimit');
      if (additions.length) { payload.evidence.push(...additions); changed(false, 'evidence-added'); }
      render(); message('evidenceAdded', { count: additions.length });
    } catch (error) { message(['evidenceConflict', 'evidenceLimit'].includes(error.message) ? error.message : 'evidenceError', {}, true); }
    finally { event.target.value = ''; setBusy(false); }
  });
  $('export-json').addEventListener('click', () => {
    const previousAudit = audit.slice();
    try {
      log('exported');
      const text = JSON.stringify(M.envelope(payload, audit), null, 2);
      M.parseEnvelope(text);
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      const link = element('a'); link.href = url;
      link.download = 'contoso-close-' + (/^20\d{2}-\d{2}$/.test(payload.period) ? payload.period : 'draft') + '-' + payload.site + '.json';
      document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      persist(); message('exported'); renderReview();
    } catch (_) { audit = previousAudit; message('exportFailed', {}, true); }
  });
  $('import-json').setAttribute('aria-describedby', 'import-help');
  $('import-json').addEventListener('change', async event => {
    const file = event.target.files?.[0]; pendingImport = null; renderImportPreview();
    if (!file || busy) return;
    setBusy(true);
    try {
      if (file.size > M.MAX_IMPORT_BYTES) throw new M.ImportError('size');
      pendingImport = M.parseEnvelope(await file.text());
    } catch (error) {
      const code = error instanceof M.ImportError ? error.code : 'json';
      message('importRejected', {}, true, 'import.' + code);
    } finally { event.target.value = ''; setBusy(false); renderImportPreview(); }
  });
  $('apply-import').addEventListener('click', () => {
    if (!pendingImport || busy) return;
    const language = payload.language;
    payload = pendingImport.payload; audit = pendingImport.auditTrail; payload.language = language;
    payload.status = 'draft'; Object.keys(payload.checks).forEach(key => { payload.checks[key] = false; });
    pendingImport = null; editRecorded = false; log('imported'); persist(true);
    showErrors = true; render(); message('imported');
  });
  $('print-review').addEventListener('click', () => { renderReview(); window.print(); });
  let themeBeforePrint = '';
  window.addEventListener('beforeprint', () => {
    themeBeforePrint = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', 'light');
    renderReview();
  });
  window.addEventListener('afterprint', () => document.documentElement.setAttribute('data-theme', themeBeforePrint || 'light'));
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { const doc = M.parseEnvelope(stored); payload = doc.payload; audit = doc.auditTrail; saved = true; }
  } catch (_) { storageLocked = true; storageErrorKey = 'restoreFailed'; }
  if (!audit.length) log('created');
  render();
})();
