# Prompt Stitch per halaman: Aplikasi Booking Bengkel Motor

Cara pakai:
1. Buat project baru di Stitch, pilih **Mobile**.
2. Untuk **setiap halaman**, tempel **BLOK GAYA** (di bawah) lebih dulu, lalu tempel prompt halamannya di bawahnya. Stitch sering lupa gaya kalau blok ini tidak diulang.
3. Buat halaman sesuai urutan (1 sampai 11) supaya tampilannya konsisten. Setelah halaman 3 jadi, kamu bisa menyuruh Stitch meniru gayanya: "Match the style of the Beranda screen."
4. Kalau hasilnya menyimpang, tambahkan satu kalimat koreksi saja (contoh: "Remove the gradient, use flat white cards"), jangan tulis ulang seluruh prompt.

---

## BLOK GAYA (tempel di awal setiap prompt)

```
App: "Bengkel Motor", a booking app for a motorcycle workshop in Indonesia. Customers book one of three services: Cuci Motor, Service Motor, Modif Motor. Each service has its own separate queue number (C-001, S-001, M-001) that resets daily. Workshop works with brands Honda, Yamaha, Kawasaki, Suzuki, Vespa; bikes are sport or scooter (skuter). All UI text in Indonesian.

Canvas: mobile portrait 390 x 844. 16px side margin on every screen. 8px spacing grid (spacing values only 4, 8, 12, 16, 24, 32).

Colors (use only these, no other hues):
- Background #FAF7F0 (warm off-white)
- Card/surface #FFFFFF with 1px border #E3E1D9, no drop shadows
- Text primary #1F1E1B, secondary #6B6A63, muted #9C9A91
- Primary button: solid #1F1E1B, white text
- Service accents: Cuci #185FA5, Service #0F6E56, Modif #B4540A
- Status badge (soft tint background + darker text): Menunggu #FFF3D6/#8A5A00, Dikerjakan #E4EFFA/#185FA5, Selesai #E3F5EE/#0F6E56, Batal #FBE7E6/#B23A39

Typography: Inter. Screen title 24 semibold, section label 12 medium uppercase letter-spaced in secondary color, body 14 regular, caption 12. Left-aligned text everywhere except the queue number.

Shape: cards radius 12, buttons radius 10, chips fully rounded, inputs radius 10 height 44 with 1px border. Buttons height 48.

Icons: thin 1.5px outline icons in one consistent set (Lucide or Phosphor style). NO emoji, NO filled colorful icons, NO 3D or stock illustrations.

Hard rules (avoid generic AI look):
- No gradients, no glassmorphism, no neon glow, no purple/blue-violet theme.
- No decorative hero images, no abstract blobs, no stock photos of people.
- No lorem ipsum, no "John Doe", no "$" currency. Use realistic Indonesian data only.
- Do not center everything; use left-aligned layouts with clear hierarchy.
- Do not add features I did not ask for (no search bar, no notifications bell, no promo banners, no payment, no ratings).
- Keep screens calm and dense enough to be useful, like a utility app, not a landing page.

Bottom tab bar (customer screens only): 4 tabs: Beranda, Riwayat, Garasi, Profil. White background, 1px top border #E3E1D9, outline icons, active tab #1F1E1B with label, inactive #9C9A91.

Sample data to reuse everywhere:
- Customer: Rizky Pratama, customer@bengkel.id
- Motors: Yamaha R25 (Sport) B 4321 XYZ; Honda Scoopy (Skuter) B 1234 ABC
- Today: Selasa, 13 Okt 2026
```

---

## 1. Login

```
Screen: Login. No bottom tab bar.

Layout, top to bottom, left-aligned, content vertically starting about 25% from the top:
1. Small wordmark "Bengkel Motor" (16 semibold) with a simple outline motorcycle icon to its left, 24px size.
2. 32px gap, then title "Masuk" (24 semibold) and subtitle "Booking antrian bengkel tanpa menunggu lama." (14, secondary).
3. 24px gap, then two inputs stacked with 16px gap:
   - Label "Email", placeholder "nama@email.com"
   - Label "Password", placeholder "Minimal 8 karakter", with a text button "Lihat" on the right inside the field
4. Right-aligned small link "Lupa password?" under the password field.
5. Primary full-width button "Masuk".
6. 24px gap, then a bordered white card titled "Akun demo" (caption, secondary) with two tappable rows:
   - "Rizky Pratama" / customer@bengkel.id, with a small "Customer" tag on the right
   - "Admin Bengkel" / admin@bengkel.id, with a small "Admin" tag on the right
   Rows separated by a 1px divider, each row 56px tall, with a chevron on the right.
7. At the bottom, centered text: "Belum punya akun? Daftar di sini" where "Daftar di sini" is underlined in #185FA5.

Do not add social login buttons.
```

## 2. Register

```
Screen: Daftar. No bottom tab bar.

Layout, left-aligned:
1. A back arrow icon button (44x44 tap area) at top left.
2. Title "Buat akun" (24 semibold), subtitle "Daftar untuk mulai booking layanan bengkel." (14, secondary).
3. Inputs stacked with 16px gap:
   - "Nama lengkap", placeholder "Contoh: Rizky Pratama"
   - "Email", placeholder "nama@email.com"
   - "Password", placeholder "Minimal 8 karakter", with "Lihat" text button inside
4. Under the password field, a caption (12, muted): "Gunakan minimal 8 karakter."
5. Show ONE field in an error state as a variant: the Email field with a #E24B4A border and the message "Format email belum benar. Contoh: nama@email.com" below it.
6. Primary full-width button "Daftar".
7. Bottom text: "Sudah punya akun? Masuk di sini" with "Masuk di sini" underlined in #185FA5.

Do not add social login buttons or a terms checkbox.
```

## 3. Beranda (Home)

```
Screen: Beranda, with the bottom tab bar (Beranda active).

Layout, top to bottom, scrollable:
1. Header: "Halo, Rizky" (24 semibold), under it "Mau ngapain motormu hari ini?" (14, secondary). No avatar, no bell icon.
2. Section label "BOOKING LAYANAN". Three full-width service cards stacked with 12px gap, each 80px tall, white, 1px border, radius 12:
   - Left: 48x48 rounded square (radius 10) filled with the service accent at 10% opacity, containing a 24px outline icon in the accent color (Cuci: water droplet; Service: wrench; Modif: gear or sliders)
   - Middle: service name (16 semibold) and description (12, secondary)
   - Right: chevron icon in muted color
   Cards: "Cuci Motor" / "Cuci biasa atau cuci keseluruhan"; "Service Motor" / "Tulis keluhan, montir yang memeriksa"; "Modif Motor" / "Ceritakan rincian modifikasimu".
3. Section label "ANTRIAN AKTIF SAYA". One queue ticket card: a 96px wide left block filled with #0F6E56 showing small white text "Antrian" and big white bold "S-003" (28), and a right area with "Service Motor" (14 semibold) + status badge "Menunggu" on the same row, then "Yamaha R25 · B 4321 XYZ" (12, secondary), then "Sel, 13 Okt 2026" (12, muted). Card height 88, radius 12, overflow hidden.
4. Section label "MERK PARTNER BENGKEL". A wrapping row of outlined chips (white, 1px border): Honda, Yamaha, Kawasaki, Suzuki, Vespa. Below, caption (12, muted): "Kami melayani motor sport dan skuter dari merk-merk di atas."

Do not add a banner, search bar, promo, or a map.
```

## 4. Booking Cuci Motor

```
Screen: Booking Cuci Motor. No bottom tab bar. Sticky bottom bar with the primary button.

Layout, scrollable:
1. Top: back arrow, title "Cuci Motor" (24 semibold), subtitle "Pilih paket, motor, dan tanggal." (14, secondary).2. Section label "PAKET CUCI". Two selectable cards stacked (white, 1px border, radius 12, padding 16). Each has a radio circle on the left, title (14 semibold), and description (12, secondary):
   - "Cuci Biasa" / "Bodi dan velg, dibilas dan dikeringkan"  (SELECTED: border 1.5px #185FA5, radio filled #185FA5, background #F3F8FD)
   - "Cuci Keseluruhan" / "Bodi, mesin, rangka, dan kolong dibersihkan menyeluruh" (unselected)
3. Section label "MOTOR". Two selectable motor cards: "Yamaha R25" with "Sport · B 4321 XYZ" (SELECTED style as above) and "Honda Scoopy" with "Skuter · B 1234 ABC". Below, a dashed-border outline button "+ Tambah motor baru".
4. Section label "TANGGAL". Horizontal scrolling row of 7 date tiles, each 64 wide, 72 tall: day name (12), date number (18 semibold), month (12). First tile "Hari ini 13 Okt" SELECTED with solid #1F1E1B background and white text; others white with border: Rab 14, Kam 15, Jum 16, Sab 17, Min 18, Sen 19.
5. Sticky bottom bar (white, top border): primary button "Ambil nomor antrian" full width.

Do not show prices.
```

## 5. Booking Service Motor

```
Screen: Booking Service Motor. No bottom tab bar. Sticky bottom bar with the primary button.

Same structure and style as the Booking Cuci screen, but accent color is #0F6E56 (selected borders, radio, and selected tint #F1F9F6). Layout, scrollable:
1. Back arrow, title "Service Motor" (24 semibold), subtitle "Ceritakan keluhan motormu sebelum bertemu montir." (14, secondary).
2. Section label "MOTOR": selectable motor cards "Yamaha R25 / Sport · B 4321 XYZ" (unselected) and "Honda Scoopy / Skuter · B 1234 ABC" (SELECTED), plus dashed button "+ Tambah motor baru".
3. Section label "TANGGAL": same 7-day horizontal date row, second tile "Rab 14" selected.
4. Section label "KELUHAN MOTOR": multiline text area, 120px tall, radius 10, filled with realistic text: "Mesin kasar saat digas dan ada bunyi tek-tek dari bagian atas mesin. Rem belakang juga terasa kurang pakem." Show a character counter "112/300" in the bottom right (12, muted). Helper caption under it (12, muted): "Semakin jelas keluhan, semakin cepat montir mendiagnosis."
5. Sticky bottom bar: primary button "Ambil nomor antrian".

There is no package selection on this screen.
```

## 6. Booking Modif Motor

```
Screen: Booking Modif Motor. No bottom tab bar. Sticky bottom bar with the primary button.

Same structure and style as the Booking Cuci screen, but accent color is #B4540A (selected borders, checks, and selected tint #FDF5EE). Layout, scrollable:
1. Back arrow, title "Modif Motor" (24 semibold), subtitle "Beri tahu rincian modifikasi sebelum bertemu montir." (14, secondary).
2. Section label "MOTOR": same two selectable motor cards, Yamaha R25 SELECTED, plus dashed "+ Tambah motor baru".
3. Section label "TANGGAL": same 7-day horizontal date row, "Kam 15" selected.
4. Section label "JENIS MODIFIKASI (BOLEH LEBIH DARI SATU)": wrapping multi-select chips: Knalpot (SELECTED, solid #B4540A with white text and a check icon), Velg & Ban (SELECTED), Cat & Stiker, Lampu, Suspensi, Aksesori (unselected, white with border).
5. Section label "RINCIAN MODIFIKASI": multiline text area 140px tall with realistic text: "Ganti knalpot racing slip-on warna titanium, velg 17 inci warna hitam doff dengan ban 110/70 depan dan 140/70 belakang. Tolong sekalian cek apakah perlu setting ulang CDI." Counter "168/500".
6. Sticky bottom bar: primary button "Ambil nomor antrian".
```

## 7. Tiket Antrian (detail)

```
Screen: Tiket Antrian (booking confirmation and detail). No bottom tab bar.

Layout, scrollable:
1. Back arrow and title "Tiket antrian" (24 semibold).
2. A large ticket card (white, 1px border, radius 16, overflow hidden):
   - Top block 140px tall filled #0F6E56: small white caption "Nomor antrian" (12), then the number "S-003" in white bold 56 (centered inside this block only), then white caption "Service Motor" (14).
   - A dashed horizontal divider with two small half-circle notches on the left and right edges (ticket style, in the page background color).
   - Bottom block with padding 16 and rows (label left in secondary 14, value right in primary 14, 12px row spacing): "Status" with badge "Menunggu"; "Tanggal" "Sel, 13 Okt 2026"; "Motor" "Yamaha R25"; "Plat" "B 4321 XYZ"; "Keluhan" with a longer text value wrapped on 3 lines: "Mesin kasar saat digas dan ada bunyi tek-tek dari bagian atas mesin."
3. Below the ticket, an info row card (white, border, radius 12, padding 16): left a 40px circle with outline icon of people/queue in #0F6E56 at 10% tint, text "Antrian di depanmu" (12, secondary) and "2 motor" (18 semibold).
4. A full-width outlined destructive button "Batalkan booking" (white, 1px #E24B4A border, red text).
5. A full-width secondary text button "Kembali ke beranda".

Do not show a QR code or barcode.
```

## 8. Riwayat

```
Screen: Riwayat, with the bottom tab bar (Riwayat active).

Layout, scrollable:
1. Title "Riwayat" (24 semibold), subtitle "Semua booking dan nomor antrianmu" (14, secondary).
2. A horizontal row of filter chips under the subtitle: Semua (SELECTED, solid #1F1E1B), Cuci, Service, Modif.
3. A list of 5 queue ticket cards stacked with 12px gap. Each card: 88px tall, radius 12, white, 1px border, left color block 96px wide with the number, right area with service name + status badge on the first row, motor and plate on the second row, date on the third row (muted). Use this data:
   - Block #0F6E56 "S-003" / Service Motor / Menunggu / Yamaha R25 · B 4321 XYZ / Sel, 13 Okt 2026
   - Block #185FA5 "C-007" / Cuci Motor / Dikerjakan / Honda Scoopy · B 1234 ABC / Sel, 13 Okt 2026
   - Block #B4540A "M-002" / Modif Motor / Selesai / Yamaha R25 · B 4321 XYZ / Sab, 3 Okt 2026
   - Block #185FA5 "C-012" / Cuci Motor / Selesai / Honda Scoopy · B 1234 ABC / Jum, 25 Sep 2026
   - Block #0F6E56 "S-005" / Service Motor / Batal / Honda Scoopy · B 1234 ABC / Rab, 16 Sep 2026
```

## 9. Garasi

```
Screen: Garasi, with the bottom tab bar (Garasi active).

Layout, scrollable:
1. Title "Garasi" (24 semibold), subtitle "Motor yang kamu simpan, tinggal pilih saat booking" (14, secondary).
2. Two motor cards stacked with 12px gap (white, border, radius 12, padding 16). Each: motorcycle name (16 semibold) such as "Yamaha R25", a caption (12, secondary) "Sport · B 4321 XYZ", and a full-width outlined small button "Hapus dari garasi" (red text, red 1px border, height 40). Second card: "Honda Scoopy" / "Skuter · B 1234 ABC".
3. Section label "TAMBAH MOTOR". A white form card (border, radius 12, padding 16) with 4 steps shown as already progressed:
   - Label "Merk", wrapping chips: Honda, Yamaha (SELECTED, solid #1F1E1B), Kawasaki, Suzuki, Vespa
   - Label "Tipe", chips: Sport (SELECTED), Skuter
   - Label "Model", chips: R15, R25 (SELECTED), MT-25
   - Label "Plat nomor", input with placeholder "B 1234 ABC"
   - Primary button "Simpan ke garasi", full width.
```

## 10. Profil

```
Screen: Profil, with the bottom tab bar (Profil active).

Layout:
1. Title "Profil" (24 semibold).
2. A white card (border, radius 12, horizontal padding 16) with three rows separated by 1px dividers, each row 52px tall: "Nama" / "Rizky Pratama"; "Email" / "customer@bengkel.id"; "Total booking" / "5". Label left in secondary, value right in primary.
3. 24px gap, then a full-width outlined destructive button "Keluar" (white, 1px #E24B4A border, red text, height 48).
4. A tiny centered caption at the bottom above the tab bar: "Bengkel Motor v1.0" (12, muted).

Do not add an avatar photo, settings list, or dark mode toggle. Keep it minimal.
```

## 11. Dashboard Admin (Antrian)

```
Screen: Antrian (admin dashboard for workshop staff). This screen has NO customer bottom tab bar. Header has the title on the left and a small outlined text button "Keluar" on the right.

Layout, scrollable:
1. Title "Antrian bengkel" (24 semibold), subtitle "Admin Bengkel · Sel, 13 Okt 2026" (14, secondary).
2. A row of 4 equal stat cards (white, border, radius 12, padding 12), each with a big number (24 semibold) and a label (12, secondary) and a small colored dot matching the status: Menunggu 4, Dikerjakan 2, Selesai 6, Batal 1.
3. Horizontal 7-day date row, same tiles as the booking screens, "Hari ini 13" selected.
4. Filter chips: Semua (SELECTED), Cuci, Service, Modif.
5. A list of 3 expanded ticket cards (white, border, radius 12, padding 16, 12px gap). Each card:
   - Row 1: the queue number in a small colored pill (accent color background, white bold text) on the left, customer name (14 semibold) next to it, status badge on the far right.
   - Row 2: motor and plate (12, secondary).
   - Row 3: the detail text in a light #F4F3EF rounded box (radius 8, padding 12, 14): for cuci show "Paket: Cuci Keseluruhan", for service show the complaint, for modif show chips of modification types plus the detail text.
   - Row 4: a segmented control with four options: Menunggu, Dikerjakan, Selesai, Batal; the current status is highlighted with its badge colors.
   Data:
   - "C-001" Dewi Lestari, Honda PCX 160 · D 8812 KA, Paket: Cuci Keseluruhan, status Dikerjakan
   - "S-001" Andi Saputra, Kawasaki Ninja 250 · B 5521 TRX, "Mesin kasar saat digas, ada bunyi tek-tek.", status Menunggu
   - "M-001" Bima Aditya, Yamaha R15 · F 3090 MB, chips Knalpot and Velg & Ban, "Ganti knalpot racing dan velg 17 inci warna hitam.", status Menunggu

Make it feel like an efficient staff tool: compact, scannable, no decorative elements, no charts.
```

---

## Tips supaya hasil Stitch lebih bagus
- Kalau ada emoji atau ikon berwarna muncul, tambahkan: "Replace all icons with thin outline icons in one set. No emoji."
- Kalau warnanya melenceng, tambahkan: "Use only the listed hex colors. Remove all gradients and shadows."
- Kalau datanya jadi bahasa Inggris atau nama asing, tambahkan: "All text must be Indonesian, use the sample data exactly."
- Untuk ekspor ke kode: setelah semua halaman jadi, kirim screenshot atau ekspor ke aku, dan aku sesuaikan dengan komponen yang sudah ada (NativeWind).
