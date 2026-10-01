# Kartu tanpa bukti visual tetap tayang, dan itu disengaja

> **Diperbarui 2 Oktober 2026:** Laundry Multi-Outlet kini punya Galeri (lihat pembaruan di bawah). Yang masih memakai perlakuan `.cover-type` hanya Helpdesk WA FH UIR. Keputusan umum di bawah tetap berlaku untuk kartu mana pun yang suatu hari tidak punya bukti visual.

Project mandiri **Laundry Multi-Outlet** tidak bisa dijalankan, jadi tidak akan punya **Galeri project**. Foldernya di `~/Developments` hanya tersisa struktur direktori (nol berkas Dart), dan salinannya di GitHub (`flutter_laundry_offline_app-multioutlet`, privat) memang lengkap kodenya, tetapi bergantung pada Supabase: login lewat Supabase Auth, sedangkan repo hanya memuat migrasi `002` tanpa `001`, sehingga skema basis datanya tidak bisa dibangun ulang. Tanpa itu tidak ada tangkapan layar yang jujur.

Pertanyaannya bukan "bagaimana membuat gambarnya", melainkan "apa yang harus dilakukan pada kartu yang tidak punya gambar". Kami memilih **menahannya tetap tayang** dengan perlakuan visual yang disengaja, dan **tanpa kalimat penjelasan** pada kartunya.

## Pembaruan 1 Oktober 2026

Versi pertama ADR ini (Agustus–September 2026) menyebut **tiga** Project — Kasir AI, Laundry Multi-Outlet, dan Glowup Clinic — kehilangan kode sumbernya secara permanen dan "tidak ada arsip lain". Itu keliru: yang diperiksa hanya mesin ini. Kelima sub-repo ketiganya ternyata utuh di GitHub privat. Kasir AI dan Glowup Clinic lalu dijalankan dari salinan di folder sementara dan kini punya Galeri. Satu hal lagi ikut ketahuan: kode Kasir AI tidak memuat n8n maupun fitur AI apa pun (kata itu hanya berasal dari nama folder kursusnya), sehingga Project itu diganti namanya menjadi **Kasir Multi-Outlet** dan klaim n8n/AI dihapus. Pelajaran: "kode hilang" harus diperiksa sampai ke remote Git, bukan hanya ke disk.

## Pembaruan 2 Oktober 2026

Laundry Multi-Outlet akhirnya dijalankan dan punya Galeri. Alasan "tidak bisa dijalankan" di atas ternyata keliru: aplikasinya **offline-first dengan SQLite**, dan layar login punya jalur offline (akun owner bawaan yang dibuat saat basis data lokal diinisialisasi). Supabase hanya dipakai untuk login online dan sinkronisasi opsional, jadi tidak perlu backend sama sekali untuk memotret aplikasinya. Repo juga memuat `supabase/schema.sql`; yang tidak lengkap hanya folder `migrations`. Tangkapan layar diambil dari build debug di emulator dengan data fiktif (laundry, pelanggan, order, pengeluaran), logo dan nama bawaan kursus diganti, dan layar login/splash tidak dipublikasikan. Sinkronisasi Supabase tidak dijalankan dan galeri menyebut itu. Kata "stok" dihapus dari kartu karena aplikasinya tidak punya layar stok.

## Considered Options

- **Hapus kartunya.** Situs jadi seragam — setiap kartu punya bukti visual. Tapi keluasan bidang usaha (laundry) hilang dari portfolio, padahal pekerjaannya nyata: jejak `.flutter-plugins-dependencies` dan folder `.claude` membuktikan repo itu pernah dijalankan di mesin ini.
- **Gabungkan jadi satu blok "pernah dibangun".** Jujur dan rapi, tapi menambah satu pola halaman baru hanya untuk satu atau dua kartu.
- **Tahan sebagai kartu tanpa gambar yang disengaja.** ← dipilih.

Soal kalimat penjelasan: menulis "tidak bisa dijalankan" adalah transparansi yang merugikan tanpa memberi manfaat kepada pembaca — pengunjung utama situs ini pemilik usaha yang menimbang jasa, bukan auditor. Menulis "belum ada tangkapan layar" lebih buruk lagi, karena "belum" menjanjikan sesuatu yang mungkin tidak datang. Aturan jujur situs ini mengikat **klaim** (Status Project, Catatan asal-usul, Catatan data); tidak memasang galeri bukanlah sebuah klaim, jadi tidak ada yang perlu dikoreksi.

## Consequences

- Slot sampul kartu diisi `.cover-type`: tumpukan teknologi sebagai teks mono besar di atas latar bergaris halus. Tingginya mengikuti `.cover` (4/3) sehingga sejajar dengan kartu bergambar di grid. Saat ini dipakai oleh Laundry Multi-Outlet dan oleh Helpdesk WA FH UIR (yang bergambar chat WhatsApp berisi data mahasiswa, jadi sengaja tidak dipotret).
- Panel itu **jelas berupa kata**, bukan tiruan tangkapan layar. CSS lama `.shot` — kotak putus-putus yang meniru bentuk screenshot dan komentarnya sendiri menyatakan "never shipped" — dibuang pada perubahan yang sama, agar tidak ada yang mengira `.cover-type` adalah penerusnya.
- Teksnya mengulang `<p class="tech">` yang sudah ada di bawah, jadi panel diberi `aria-hidden="true"` supaya pembaca layar tidak mendengarnya dua kali.
- Definisi **Galeri project** di `CONTEXT.md` diperluas: galeri bersifat opsional, dan ketiadaannya bukan sebuah klaim.
- Kalau suatu hari Supabase untuk Laundry bisa dihidupkan kembali (atau skemanya ditemukan), kartunya cukup diberi `cover.jpg` dan seksi galeri seperti kartu lain; keputusan ini tidak mengunci apa pun selain tampilan sementara.
