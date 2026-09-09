-- EN: Read-only T-SQL for the Lakehouse SQL analytics endpoint, default dbo schema.
-- ID: T-SQL baca-saja untuk SQL analytics endpoint Lakehouse, skema dbo default.
-- EN: Wait for table metadata synchronization. Choose the Mining_Close_Demo endpoint.
-- ID: Tunggu sinkronisasi metadata tabel. Pilih endpoint Mining_Close_Demo.

-- Q1 EN: Reconciliation coverage, known USD and missing values. Not a full GL balance.
-- Q1 ID: Cakupan rekonsiliasi, USD diketahui dan nilai kosong. Bukan saldo buku besar lengkap.
SELECT SUM(OccurrenceRows) AS OccurrenceRows,
       SUM(NullUSDRows) AS NullUSDRows,
       SUM(UnmappedAccountRows) AS UnmappedAccountRows,
       SUM(NullVendorRows) AS NullVendorRows,
       SUM(RepeatedImportRows) AS RepeatedImportRows,
       SUM(KnownUSD_AllOccurrences) AS KnownUSD_AllOccurrences,
       SUM(KnownUSD_ReplayExcluded) AS KnownUSD_ReplayExcluded,
       SUM(ControlUSD) AS ControllerCertificateUSD,
       SUM(KnownUSD_AllOccurrences) - SUM(ControlUSD) AS AggregateDifferenceUSD
FROM dbo.gold_control_reconciliation;

-- Q2 EN: Preserve unmatched accounts, missing FX and all reconciliation statuses.
-- Q2 ID: Pertahankan akun tanpa pasangan, FX kosong dan semua status rekonsiliasi.
SELECT Site, Period, Account, LedgerPresent, ControlPresent, OccurrenceRows,
       NullUSDRows, NullAccountRows, UnmappedAccountRows, NullVendorRows,
       RepeatedImportRows, KnownUSD_AllOccurrences, ControlUSD,
       DifferenceUSD_AllOccurrences, DifferenceUSD_ReplayExcluded, ControlStatus
FROM dbo.gold_control_reconciliation
WHERE ControlStatus <> 'Matched'
ORDER BY Site, Period, Account;

-- Q3 EN: Counts are issue occurrences, not distinct transactions or additive savings.
-- Q3 ID: Jumlah adalah kejadian isu, bukan transaksi unik atau penghematan yang dapat dijumlahkan.
SELECT Domain, IssueType, Currency, COUNT(*) AS IssueRows,
       SUM(CASE WHEN ReviewAmount IS NULL THEN 1 ELSE 0 END) AS UnvaluedRows
FROM dbo.gold_exception_register
GROUP BY Domain, IssueType, Currency
ORDER BY Domain, IssueType, Currency;

-- Q4 EN: Exact duplicate candidates include document type and normalized vendor/currency.
-- Q4 ID: Kandidat duplikat persis mencakup jenis dokumen serta pemasok/mata uang ternormalisasi.
SELECT VendorIDKey, InvoiceNoKey, CurrencyKey, DocumentType,
       COUNT(*) AS CandidateRows,
       SUM(CandidateOpenDuplicateUSD) AS CandidateOpenExposureUSD
FROM dbo.gold_ap_review
WHERE DuplicateCandidate = 1
GROUP BY VendorIDKey, InvoiceNoKey, CurrencyKey, DocumentType
ORDER BY VendorIDKey, InvoiceNoKey, CurrencyKey, DocumentType;

-- Q5 EN: Receipt rows were grouped by POID/Currency before joining. Do not sum mixed currencies.
-- Q5 ID: Baris penerimaan dikelompokkan menurut POID/Currency sebelum join. Jangan jumlahkan mata uang berbeda.
SELECT InvoiceID, POID, Currency, NetAmount, ApprovedAmount, ReceivedAmount,
       ReceiptRows, PriceDifferenceLocal, ReceiptDifferenceLocal, MissingReceipt, MissingPO
FROM dbo.gold_ap_review
WHERE MissingReceipt = 1 OR MissingPO = 1 OR PriceDifferenceLocal <> 0
ORDER BY InvoiceID;

-- Q6 EN: Bank/cash comparison keeps currency and separates close date from later settlement.
-- Q6 ID: Perbandingan bank/kas mempertahankan mata uang dan memisahkan tanggal tutup dari pelunasan berikutnya.
SELECT Ref, Currency, BankRows, CashRows, BankAllDates, CashAllDates,
       BankAtClose, CashAtClose, BankPostCutoffRows, DifferenceAtClose,
       DifferenceAllDates, MatchStatus
FROM dbo.gold_bank_cash_reconciliation
WHERE MatchStatus <> 'Matched'
ORDER BY Currency, Ref;

-- Q7 EN: Budget variance uses the separate controller certificate, not a silently cleaned ledger.
-- Q7 ID: Varians anggaran memakai sertifikat controller terpisah, bukan ledger yang dibersihkan diam-diam.
SELECT Site, Period, SUM(BudgetUSD) AS BudgetUSD, SUM(ControlUSD) AS ControlUSD,
       SUM(VarianceUSD) AS VarianceUSD, SUM(KnownUSD_AllOccurrences) AS KnownUSD_AllOccurrences,
       SUM(NullUSDRows) AS NullUSDRows, SUM(UnmappedAccountRows) AS UnmappedAccountRows
FROM dbo.gold_budget_summary
GROUP BY Site, Period
ORDER BY Site, Period;

-- Q8 EN: Recovered production is not sold ounces, revenue, cash or proven causation.
-- Q8 ID: Produksi hasil pemulihan bukan ons terjual, pendapatan, kas atau penyebab yang terbukti.
SELECT Site, Period, ProductionRows, PlannedOreTonnes, ActualOreTonnes,
       OreTonnesVariance, RecoveredGoldOz, PlannedGoldOz, GoldOzVariance
FROM dbo.gold_operations_summary
ORDER BY Site, Period;

-- Q9 EN: Drill through without removing staged exceptions or replay occurrences.
-- Q9 ID: Telusuri detail tanpa menghapus pengecualian staging atau kejadian impor ulang.
SELECT SourceRowID, RawSourceFile, NativeSourceKey, Site, Period, Account, VendorID,
       Currency, AmountLocal, AmountUSD, NormalizationStatus, IsRepeatedImport
FROM dbo.gold_normalized_ledger
WHERE NormalizationStatus <> 'Ready'
ORDER BY SourceRowID;

-- Q10 EN: Verify source date, close cutoff, scope and run identity before using exports.
-- Q10 ID: Periksa tanggal sumber, batas tutup, cakupan dan identitas proses sebelum memakai ekspor.
SELECT SourceFile, InputRows, SHA256, SourceAsOfDate, CloseCutoffDate,
       LedgerScope, ControlAssumption, SnapshotStatus, RunUTC
FROM dbo.gold_source_metadata
ORDER BY SourceFile;

-- Q11 EN: Credit notes are separate document types, not duplicate invoices or realized savings.
-- Q11 ID: Nota kredit adalah jenis dokumen terpisah, bukan faktur duplikat atau penghematan terealisasi.
SELECT StatementLineID, VendorID, InvoiceNo, Currency, SignedAmount,
       InvoiceID, CreditNoteID, DocumentType, EvidenceRef
FROM dbo.gold_supplier_credits
ORDER BY StatementLineID;
