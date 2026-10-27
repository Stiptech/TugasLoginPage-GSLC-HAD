# Serah-terima: Aplikasi Booking Bengkel Motor

> **Branch `claude/home-page` hanya memuat halaman masuk, daftar, dan beranda.**
> Layar booking, tiket, garasi, profil, riwayat, dan sisi admin sengaja tidak
> dibawa ke sini. Versi lengkapnya ada di branch
> `claude/admiring-albattani-vwjqwy`. Di beranda, bubble layanan dan kartu
> antrian cuma memunculkan pesan singkat karena halaman tujuannya belum ada.
> Tombol Keluar pindah ke pojok kanan atas beranda, menggantikan tab Profil.

Dokumen ini untuk sesi berikutnya supaya bisa melanjutkan tanpa riwayat percakapan. Baca juga `AGENTS.md`.

## Proyek
Tugas mata kuliah **Hybrid Application Development**, topik **Services**. Aplikasi booking bengkel motor untuk motor sport dan skuter, bekerja sama dengan merk Honda, Yamaha, Kawasaki, Suzuki, dan Vespa.

- Tiga layanan, masing-masing dengan **nomor antrian terpisah per kategori per hari**: Cuci (`C-001`), Service (`S-001`), Modif (`M-001`). Nomor reset tiap hari, user memilih tanggal booking.
  - **Cuci**: pilih paket Cuci Biasa atau Cuci Keseluruhan, lengkap dengan durasi dan harga.
  - **Service**: user memilih bagian yang dikeluhkan lalu menulis keluhannya.
  - **Modif**: user memilih jenis modifikasi (muncul ancar-ancar biaya) lalu menulis rincian.
- Peran: **Customer** dan **Admin bengkel**. Admin melihat antrian per kategori dan tanggal, lalu mengubah status (Menunggu, Dikerjakan, Selesai, Batal).
- Customer punya **Garasi** (merk, tipe sport/skuter, model, plat) yang dipilih saat booking.
- **Frontend dulu.** Data disimpan di memori (tanpa backend).

## Tech stack
Expo SDK 57 + TypeScript + React Native + NativeWind. tailwindcss 3.4.19 (jangan upgrade ke v4), nativewind 4.2.7, expo-router 57.0.23, react 19.2.3, react-native 0.86.3. Aturan Expo ada di `AGENTS.md`.

Tidak ada library UI atau ikon tambahan. Ikon digambar manual di `src/components/icons.tsx` memakai `View`.

## Isi repo

### lib
- `src/lib/types.ts`: `Role`, `Kategori`, `Status`, `TipeMotor`, `Session`, `Motor`, `Tiket`.
- `src/lib/catalog.ts`: `KATEGORI` (label, prefix, warna aksen, warna lembut, estimasi), `BENGKEL` (alamat, jam buka, telepon), `PAKET_CUCI` (durasi dan harga), `JENIS_SERVICE`, `JENIS_MODIF`, `ESTIMASI_MODIF`, `TAHAPAN` (timeline), `MERK`, `STATUS`, `montirUntuk()`.
- `src/lib/queue.ts`: `ringkasAntrian()` (nomor yang sedang dipanggil, jumlah menunggu dan selesai) dan `urutNomor()`.
- `src/lib/date.ts`, `src/lib/accounts.ts`, `src/lib/sha256.ts`.
- Akun demo: `customer@bengkel.id` / `customer123` dan `admin@bengkel.id` / `admin12345`.

### hooks
- `src/hooks/use-store.tsx`: `StoreProvider`, `useSession`, `useTickets`, `useGarage`, `nextQueueNumber`. Ada data seed tiket pelanggan lain supaya dashboard admin tidak kosong.

### components
- `app-ui.tsx`: `Page` (punya tombol kembali), `Card`, `SectionTitle`, `Empty`, `Chip`, `ChipRow`, `StatusBadge`, `ServiceBubble`, `ServiceCard`, `QueueNow`, `Timeline`, `IconLine`, `QueueTicket`, `DatePicker`, `InfoRow`, `OutlineButton`, `motorLabel`.
- `icons.tsx`: `Icon` dan `KATEGORI_ICON`. Tiap potongan diposisikan lewat titik tengahnya karena `rotate` di React Native berputar pada titik tengah.
- `auth-ui.tsx`, `motor-form.tsx`.

### routes
- `src/app/_layout.tsx`: Stack dengan `Stack.Protected` per peran.
- `src/app/index.tsx` (masuk) dan `register.tsx` (daftar), bahasa Indonesia.
- `src/app/home.tsx`: beranda, satu-satunya layar sesudah masuk di branch ini.

## Desain
Gaya minimalis, kontras rendah:
- Latar `#FAF7F0`, teks `#1F1E1B` (sekunder `#6B6A63`, redup `#9C9A91`), kartu putih dengan border `#E3E1D9`, tanpa bayangan.
- Aksen layanan: Cuci `#185FA5` (lembut `#EAF1F8`), Service `#0F6E56` (lembut `#E8F2EE`), Modif `#B4540A` (lembut `#F6EDE4`).
- Status: Menunggu `#FFF3D6/#8A5A00`, Dikerjakan `#E4EFFA/#185FA5`, Selesai `#E3F5EE/#0F6E56`, Batal `#FBE7E6/#B23A39`.
- Font Plus Jakarta Sans (400, 500, 600, 700) untuk semua teks. Nomor antrian dan plat nomor memakai Barlow Condensed (600, 700).
- Ikon outline tipis. Tanpa gradien, emoji, atau ilustrasi.
- Beranda: tiga bubble layanan berdampingan, lalu papan antrian live per kategori.
- Semua teks UI berbahasa Indonesia.

Desain awal dibuat di Claude Design, 11 layar: https://claude.ai/artifact/Mg1JM3ezo9Lc85d1abnJnE (privat, milik user).

## Cek sebelum selesai
```bash
npx tsc --noEmit
npx expo lint
npx expo export --platform web --output-dir /tmp/webout   # smoke test bundling
```
Semuanya sudah bersih per commit terakhir. ESLint dipasang lewat `eslint.config.js` (`eslint-config-expo/flat`).

## Font
Dipasang lewat `expo-font` dan paket `@expo-google-fonts/*`. Alurnya:

1. `src/app/_layout.tsx` memuat enam berkas font dengan `useFonts`, splash ditahan sampai selesai.
2. `tailwind.config.js` menimpa utility `font-normal`, `font-medium`, `font-semibold`, `font-bold` supaya sekalian memilih keluarga font, karena di React Native satu berkas font cuma punya satu ketebalan. Ada juga `font-plat` dan `font-plat-semi` untuk Barlow Condensed.
3. `src/components/text.tsx` membungkus `Text` bawaan dan menempelkan `font-normal`. **Semua layar mengimpor `Text` dari sini, bukan dari `react-native`.** Kelas font lain tetap menang karena ditulis belakangan di config Tailwind.
4. Nama keluarga font juga dicatat di `src/lib/fonts.ts` kalau butuh dipakai lewat `style`.

Catatan: `npx expo install` tidak bisa jalan di sesi cloud ini karena `api.expo.dev` diblokir proxy, jadi paket font dipasang lewat `npm install` biasa.

## Sisa pekerjaan yang mungkin
1. Penyimpanan awet di HP (`@react-native-async-storage/async-storage`), sekarang akun hanya awet di web.
2. Detail motor tambahan: tahun, odometer, catatan service terakhir, pajak.
3. Backend sungguhan. Semua penulisan data lewat `StoreProvider`, jadi tinggal ganti isinya dengan panggilan API.

## Catatan git
- `origin` = `Stiptech/Beforepushhybrid`, branch kerja `claude/admiring-albattani-vwjqwy`.
- Repo lama `Stiptech/TugasLoginPage-GSLC-HAD` menjadi remote `tugas-lama`. **Jangan push ke sana.**
- Jangan buat PR kecuali diminta. User berbahasa Indonesia.
