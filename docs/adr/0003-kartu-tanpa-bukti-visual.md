# Kartu tanpa bukti visual tetap tayang, dan itu disengaja

Tiga Project mandiri — **Kasir AI**, **Laundry Multi-Outlet**, dan **Glowup Clinic** — kehilangan kode sumbernya secara permanen. Foldernya di `~/Developments` hanya tersisa struktur direktori: nol berkas Dart, `routes/` dan `migrations/` Laravel kosong, dan tidak ada arsip lain di mesin ini. Karena tidak ada yang bisa dijalankan, ketiganya tidak akan pernah punya **Galeri project**. (Bandingkan Jago POS, yang kehilangan satu berkas `pubspec.yaml` saja sehingga bisa dipulihkan dari `pubspec.lock` dan akhirnya punya galeri.)

Pertanyaannya bukan "bagaimana membuat gambarnya", melainkan "apa yang harus dilakukan pada kartu yang selamanya tidak bergambar". Kami memilih **menahannya tetap tayang** dengan perlakuan visual yang disengaja, dan **tanpa kalimat penjelasan** pada kartunya.

## Considered Options

- **Hapus ketiga kartu.** Situs jadi seragam — setiap kartu punya bukti visual. Tapi keluasan bidang usaha (laundry, klinik kecantikan, otomasi AI) hilang dari portfolio, padahal pekerjaannya nyata: jejak `.flutter-plugins-dependencies` dan folder `.claude` membuktikan repo itu pernah dijalankan di mesin ini.
- **Gabungkan jadi satu blok "pernah dibangun".** Jujur dan rapi, tapi menambah satu pola halaman baru hanya untuk tiga kartu.
- **Tahan sebagai kartu tanpa gambar yang disengaja.** ← dipilih.

Soal kalimat penjelasan: menulis "kode sumber tidak lagi tersedia" adalah transparansi yang merugikan tanpa memberi manfaat kepada pembaca — pengunjung utama situs ini pemilik usaha yang menimbang jasa, bukan auditor. Menulis "belum ada tangkapan layar" lebih buruk lagi, karena "belum" menjanjikan sesuatu yang tidak akan datang. Aturan jujur situs ini mengikat **klaim** (Status Project, Catatan asal-usul, Catatan data); tidak memasang galeri bukanlah sebuah klaim, jadi tidak ada yang perlu dikoreksi.

## Consequences

- Slot sampul ketiga kartu diisi `.cover-type`: tumpukan teknologi sebagai teks mono besar di atas latar bergaris halus. Tingginya mengikuti `.cover` (4/3) sehingga sejajar dengan kartu bergambar di grid.
- Panel itu **jelas berupa kata**, bukan tiruan tangkapan layar. CSS lama `.shot` — kotak putus-putus yang meniru bentuk screenshot dan komentarnya sendiri menyatakan "never shipped" — dibuang pada perubahan yang sama, agar tidak ada yang mengira `.cover-type` adalah penerusnya.
- Teksnya mengulang `<p class="tech">` yang sudah ada di bawah, jadi panel diberi `aria-hidden="true"` supaya pembaca layar tidak mendengarnya dua kali.
- Definisi **Galeri project** di `CONTEXT.md` diperluas: galeri bersifat opsional, dan ketiadaannya bukan sebuah klaim.
- Kalau suatu hari kode salah satu project itu ditemukan kembali, kartunya cukup diberi `cover.jpg` dan seksi galeri seperti kartu lain; keputusan ini tidak mengunci apa pun selain tampilan sementara.
