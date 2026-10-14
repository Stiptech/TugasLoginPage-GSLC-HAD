# Serah-terima: Aplikasi Booking Bengkel Motor

Dokumen ini untuk sesi berikutnya (misalnya cloud session) supaya bisa melanjutkan tanpa riwayat percakapan. Baca juga `AGENTS.md`.

## Proyek
Tugas mata kuliah **Hybrid Application Development**, topik **Services**. Aplikasi booking bengkel motor untuk motor sport dan skuter, bekerja sama dengan merk Honda, Yamaha, Kawasaki, Suzuki, dan Vespa.

- Tiga layanan, masing-masing dengan **nomor antrian terpisah per kategori per hari**: Cuci (`C-001`), Service (`S-001`), Modif (`M-001`). Nomor reset tiap hari, user memilih tanggal booking.
  - **Cuci**: pilih paket Cuci Biasa atau Cuci Keseluruhan.
  - **Service**: user menulis keluhan motor.
  - **Modif**: user memilih jenis modifikasi dan menulis rincian sebelum bertemu montir.
- Peran: **Customer** dan **Admin bengkel**. Admin melihat antrian per kategori dan tanggal, lalu mengubah status (Menunggu, Dikerjakan, Selesai, Batal).
- Customer punya **Garasi** (motor tersimpan: merk, tipe sport/skuter, model, plat) yang dipilih saat booking.
- **Frontend dulu.** Data disimpan di memori (tanpa backend). Jangan menambah library lain dulu.

## Tech stack (wajib)
Expo SDK 57 + TypeScript + React Native + NativeWind. Versi terpasang: tailwindcss 3.4.19 (jangan upgrade ke v4), nativewind 4.2.7, expo-router 57.0.23, react 19.2.3, react-native 0.86.3. Aturan Expo ada di `AGENTS.md` (cek docs versi 57 sebelum memakai API Expo, pakai `npx expo install` untuk paket baru).

## Sudah ada
- `src/lib/types.ts`, `catalog.ts` (merk, model, paket cuci, jenis modif, label dan warna status), `date.ts`, `accounts.ts`.
- Akun demo: `customer@bengkel.id` / `customer123` dan `admin@bengkel.id` / `admin12345` (ada field `role`). `verify()` mengembalikan `Session | null`.
- `src/hooks/use-store.tsx`: `StoreProvider`, `useSession`, `useTickets`, `useGarage`, `nextQueueNumber`. Berisi data seed tiket pelanggan lain untuk dashboard admin.
- `src/components/app-ui.tsx` (Page, Chip, StatusBadge, ServiceCard, QueueTicket, DatePicker, InfoRow, OutlineButton), `motor-form.tsx`, dan `auth-ui.tsx` (Field kini menerima `style`).
- `src/app/_layout.tsx`: Stack dengan `Stack.Protected` per peran (belum login, customer, admin).
- `src/app/(customer)/`: tab `home`, `riwayat`, `garasi`, `profil`.
- `docs/stitch-prompt.md`: prompt desain per halaman.

## Belum ada (sisa pekerjaan)
1. `src/app/booking/[kategori].tsx`: form booking dinamis per kategori (cuci, service, modif).
2. `src/app/tiket/[id].tsx`: detail tiket antrian (nomor, status, antrian di depan, batalkan).
3. `src/app/(admin)/_layout.tsx` dan `(admin)/antrian.tsx`. Jangan beri nama `index.tsx` karena bentrok dengan route login di `/`.
4. Rebrand `src/app/index.tsx` dan `register.tsx`: masih bertema "Class notebook / Weekly Plan" dan berbahasa Inggris. Ganti ke bahasa Indonesia, akun demo baru, dan panggil `useSession().signIn(verify(...))` saat login berhasil (Stack.Protected yang mengalihkan halaman).
5. Ikon tab saat ini emoji. Ganti dengan ikon outline sesuai desain.
6. Jalankan `npx tsc --noEmit` dan `npx expo lint`. **Kode belum pernah dijalankan atau di-typecheck**, jadi kemungkinan ada error yang harus diperbaiki.

## Desain
Dibuat di Claude Design, 11 layar: https://claude.ai/artifact/Mg1JM3ezo9Lc85d1abnJnE (privat, milik user).

Gaya:
- Warna: latar `#FAF7F0`, teks `#1F1E1B` (sekunder `#6B6A63`, redup `#9C9A91`), kartu putih dengan border `#E3E1D9`, tanpa bayangan.
- Aksen layanan: Cuci `#185FA5`, Service `#0F6E56`, Modif `#B4540A`.
- Status: Menunggu `#FFF3D6/#8A5A00`, Dikerjakan `#E4EFFA/#185FA5`, Selesai `#E3F5EE/#0F6E56`, Batal `#FBE7E6/#B23A39`.
- Font Plus Jakarta Sans. Nomor antrian dan plat memakai Barlow Condensed bergaya plat nomor.
- Ikon outline tipis. Tanpa gradien, emoji, atau ilustrasi.
- Beranda: tiga kotak bubble layanan berdampingan.
- Semua teks UI berbahasa Indonesia.

## Pertanyaan terbuka (tanyakan ke user sebelum mengubah desain)
User bilang desain **terlalu simpel dan isinya terlalu kosong**. Belum dijawab isi tambahan yang diinginkan:
- Status antrian live (nomor yang sedang dilayani, estimasi tunggu, jam buka).
- Detail motor dan jadwal perawatan (tahun, odometer, service terakhir, pajak).
- Timeline progres pengerjaan dan nama montir.
- Estimasi durasi dan harga (data contoh) di form booking.

Juga tanyakan apakah diperkaya di semua layar atau sebagian dulu.

## Catatan git
- `origin` = `Stiptech/Beforepushhybrid` (repo percobaan user untuk pekerjaan yang belum final).
- Repo lama `Stiptech/TugasLoginPage-GSLC-HAD` menjadi remote `tugas-lama`. **Jangan push ke sana.** User akan push sendiri ke `main` setelah semuanya fix.
- Jangan buat PR kecuali diminta. User berbahasa Indonesia.
