# Bilingual lewat cermin file statis, tanpa generator

Situs harus tersedia dalam Bahasa Indonesia (pengunjung utama) dan Inggris, tapi tetap berupa HTML/CSS/JS polos yang di-deploy apa adanya ke GitHub Pages. Kami memilih satu file HTML per bahasa: ID di root, EN sebagai cermin di `en/` dengan nama file yang sama. CSS, JS, font, dan favicon tetap satu set bersama.

## Considered Options

- **Generator statis kecil (11ty / script Node) dengan file terjemahan** — satu sumber markup, tapi menambah build step dan membuat halaman tidak lagi bisa diedit langsung di GitHub.
- **Toggle bahasa dengan JS di satu file** — tanpa duplikasi, tapi mesin pencari dan pengunjung tanpa JS hanya melihat satu bahasa, dan link yang dibagikan lewat WA tidak menentukan bahasanya.

## Consequences

- Setiap perubahan copy dikerjakan di dua file (`x.html` dan `en/x.html`). Perubahan struktur (header, palette, footer) juga dua kali.
- GitHub Pages hanya menyajikan satu `404.html`, sehingga halaman 404 memuat kedua bahasa dalam satu file.
- Tidak ada auto-redirect berdasarkan bahasa browser; tombol ID/EN selalu menuju halaman padanannya.
