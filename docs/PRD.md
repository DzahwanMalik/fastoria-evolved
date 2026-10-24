# PRD — THE FASTORIA 2027

| Field | Value |
| --- | --- |
| Produk | Landing page event + CMS dashboard THE FASTORIA 2027 |
| Versi | v1.3 |
| Tanggal | 25 Oktober 2026 |
| Status | Approved |

> Dokumen ini hanya membahas alur dan deskripsi produk. Aturan penulisan kode dibahas di skills terpisah, dan struktur database dikelola lewat MCP.

---

## 1. Ringkasan

THE FASTORIA 2027 adalah festival lomba pendidikan, seni, dan olahraga dalam rangka hari jadi Pondok Pesantren Tarbiyatul Huda ke-45 (edisi ke-4). Produk terdiri dari:

- **Landing page publik** — informasi acara, timeline, 19 cabang lomba dalam 6 kategori, total hadiah, lokasi, kontak, dan link pendaftaran.
- **CMS dashboard** — tempat panitia mengubah seluruh konten di atas tanpa bantuan developer.

## 2. Latar belakang & masalah

- Informasi lomba saat ini tersebar di Google Form, Google Drive, dan Instagram.
- Calon peserta harus mencari satu per satu biaya, format lomba, dan guidebook setiap cabang.
- Panitia belum punya satu tempat untuk memperbarui konten; perubahan masih lewat developer atau tools database.

## 3. Tujuan

1. Menjadi satu sumber informasi resmi yang lengkap dan mudah dipahami.
2. Mengarahkan peserta ke pendaftaran yang tepat dalam maksimal dua langkah dari hero.
3. Membuat panitia mandiri dalam memperbarui seluruh konten.
4. Nyaman dipakai di HP, karena mayoritas trafik berasal dari Instagram.

**Non-tujuan:** pendaftaran peserta di dalam aplikasi, pembayaran, penilaian, sertifikat, data peserta, multi-event, multi-bahasa, dan galeri edisi sebelumnya.

## 4. Pengguna

| Pengguna | Kebutuhan utama |
| --- | --- |
| Siswa calon peserta | Cari kategori, biaya, jenis lomba, deadline, guidebook, lalu daftar |
| Guru/pembina | Membandingkan beberapa lomba dan membagikan link ke siswa |
| Orang tua/pengunjung | Informasi acara, lokasi, dan kontak |
| Panitia (admin) | Mengubah konten, mengunggah gambar, dan mengatur data lomba |

## 5. Alur utama

### 5.1 Pengunjung

1. Masuk dari Instagram atau link yang dibagikan.
2. Melihat hero: nama acara, tanggal, lokasi, hadiah, dan hitung mundur.
3. Membaca tentang acara dan timeline pendaftaran.
4. Membuka bagian **Cabang Lomba**, memilih kategori, lalu membuka detail lomba.
5. Membuka guidebook atau menekan **Daftar** (diarahkan ke Google Form lomba terkait).
6. Jika pendaftaran tutup atau link belum tersedia, tombol tampil nonaktif dengan keterangan yang jelas.
7. Menemukan lokasi, kontak WhatsApp, dan sosial media di bagian bawah.

### 5.2 Admin

1. Login di `/admin/login` menggunakan akun yang diberikan panitia.
2. Melihat ringkasan konten dan daftar hal yang perlu dilengkapi.
3. Mengubah **Pengaturan Acara** (identitas, tanggal, hadiah, lokasi, kontak, timeline, sosial media, logo).
4. Menambah/mengubah **Kategori** dan **Cabang Lomba**, termasuk gambar, biaya, jenis lomba (individu/tim), dan link.
5. Menyimpan, lalu memeriksa hasilnya di landing page.
6. Logout setelah selesai.

## 6. Peta halaman

| Halaman | Akses | Isi |
| --- | --- | --- |
| `/` | Publik | Landing page satu halaman |
| `/admin/**` | Admin | CMS dashboard (login, ringkasan, pengaturan acara, kategori, cabang lomba, akun) |
| `*` | Publik | Halaman 404 dengan tautan kembali ke `/` |

Tidak ada halaman publik lain selain landing page dan halaman 404. Seluruh navigasi di landing page memakai anchor (`#tentang`, `#timeline`, `#cabang-lomba`, `#lokasi`), dan detail lomba tampil sebagai modal di halaman yang sama. Semua path `/admin/*` wajib login; path yang tidak dikenal menampilkan halaman 404 dengan tautan kembali ke `/`.

## 7. Landing page

| Bagian | Konten | Aksi |
| --- | --- | --- |
| Marquee | Tanggal penting & total hadiah | Menuju pendaftaran |
| Header | Logo, navigasi, CTA | Scroll ke section, buka menu mobile |
| Hero | Nama acara, deskripsi singkat, tanggal, lokasi, hadiah, hitung mundur | **Daftar** dan **Lihat Cabang Lomba** |
| Tentang | Deskripsi acara + angka kunci (19 cabang, 6 kategori, hadiah, 45 tahun) | — |
| Timeline | Tahapan acara beserta status Selesai / Berlangsung / Segera | — |
| Cabang Lomba | Tab kategori + kartu lomba (gambar, judul, biaya, jenis lomba) | Filter, buka detail, guidebook, daftar |
| Detail lomba | Deskripsi lengkap, kategori, biaya, jenis lomba, link | Tutup, guidebook, daftar |
| Hadiah | Total hadiah | — |
| Lokasi & Kontak | Alamat, tombol Google Maps, WhatsApp | Buka Maps/WhatsApp |
| Footer | Logo, sosial media, kontak, copyright | Kembali ke atas |

**Aturan tampilan**

- Seluruh konten berasal dari CMS, bukan hardcode.
- Semua lomba yang tersimpan langsung tampil di landing page.
- Filter kategori berjalan di halaman yang sama tanpa pindah route.
- Data yang belum diisi disembunyikan; tidak boleh tampil kosong atau "null".
- Link eksternal dibuka di tab baru.
- Mobile-first, nyaman dari lebar 360 px, tanpa scroll horizontal.

**Arah visual**

Mengikuti referensi di folder `reference/`: latar indigo gelap, aksen lime/koral/biru neon, tipografi poster besar, label monospace, sticker, dan marquee. Kesan energik dan playful, tetapi tetap sopan untuk acara pesantren. Versi mobile menyederhanakan elemen dekoratif.

## 8. CMS dashboard

| Halaman | Fungsi |
| --- | --- |
| Login | Email + password, pesan error yang jelas, redirect ke halaman tujuan |
| Ringkasan | Jumlah kategori/lomba dan checklist konten yang belum lengkap |
| Pengaturan Acara | Form identitas acara, tanggal, hadiah, lokasi, logo, kontak, timeline, sosial media |
| Kategori | Tambah, ubah, hapus, atur urutan; hapus ditolak jika masih dipakai lomba |
| Cabang Lomba | Cari/filter, tambah, ubah, hapus, upload gambar, atur jenis lomba (individu/tim) |
| Akun | Lihat nama/email, logout |

**Aturan umum CMS**

- Perubahan langsung berlaku di landing page setelah disimpan.
- Field wajib divalidasi; error tampil di dekat field terkait.
- Upload gambar hanya JPG/PNG/WebP/SVG dengan batas ukuran yang jelas.
- Aksi hapus selalu memakai konfirmasi yang menyebut nama data.
- Tombol simpan nonaktif saat proses berjalan; hasil akhir diberi notifikasi.
- Ada peringatan jika meninggalkan halaman dengan perubahan belum disimpan.
- Tampilan admin nyaman di desktop dan tetap bisa dipakai di tablet/HP.

## 9. Countdown, status pendaftaran & timeline

Hitung mundur mengikuti timeline dan berubah otomatis:

1. **Sebelum pendaftaran dibuka** → "Pendaftaran dibuka dalam", menghitung ke tanggal buka.
2. **Pendaftaran dibuka** → "Pendaftaran ditutup dalam", menghitung ke tanggal tutup.
3. **Setelah pendaftaran ditutup** → "Menuju hari H", menghitung ke tanggal pelaksanaan acara pada timeline.

Jika hari H sudah lewat, hitung mundur diganti keterangan "Acara telah berlangsung".

- **Pendaftaran:** Segera, Dibuka, atau Ditutup mengikuti fase di atas.
- **Timeline:** Selesai, Berlangsung, atau Segera, dihitung dari tanggal setiap tahap.

## 10. Definition of done

- Seluruh konten landing page dapat diubah dari CMS tanpa deploy ulang.
- 19 lomba tampil, dapat difilter per kategori, dan link pendaftaran/guidebook berfungsi.
- Badge Individu/Tim tampil sesuai data lomba.
- Hitung mundur berpindah fase dengan benar: menuju pendaftaran, menuju penutupan, lalu menuju hari H.
- Landing page hanya satu halaman; navigasi memakai anchor dan detail lomba berupa modal.
- Path yang tidak dikenal menampilkan halaman 404 dengan tautan kembali ke `/`.
- Landing page rapi di 360 px, 768 px, dan desktop.
- Admin dapat login, mengubah konten, dan logout dengan aman.
- Tidak ada data kosong atau tombol rusak yang tampil ke publik.
- Tidak ada halaman error saat data opsional belum diisi.
- Panitia dapat menyelesaikan update konten tanpa bantuan developer.

## 11. Rilis

**P0 — sebelum kampanye pendaftaran**
Landing page lengkap, login admin, pengaturan acara, kategori, cabang lomba, dan upload gambar.

**P1 — setelah rilis awal**
Pencarian lomba, gambar OG untuk sosial media, dan analytics klik pendaftaran.
