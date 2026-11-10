# Identitas

Nama : Steven Natanael Santoso
NIM : 280248872
Mata Kuliah : Hybrid Application Development

## Tema

Tema proyek: Services.

Aplikasi Bengkel Motor untuk booking layanan bengkel motor sport dan skuter yang bekerja sama dengan beberapa merk. Pelanggan memilih salah satu dari tiga layanan, yaitu Cuci, Service, atau Modif. Setiap layanan punya nomor antrian sendiri per hari (`C-001`, `S-001`, `M-001`), sehingga antrian tidak tercampur.

Peran pengguna: Customer (booking dan melihat tiket)

## Cara Menjalankan

1. Pasang Node.js, lalu buka folder proyek di terminal.
2. Pasang dependensi:
   ```bash
   npm install
3. Jalankan Aplikasi:
   npx expo start
4. pakai akun demo yang tersedia
  | Peran | Email | Password |
|---|---|---|
| Customer | customer@bengkel.id | customer123 |
| Admin | admin@bengkel.id | admin12345 |

## Penjelasan Konsep

## Cara kerja React Native

React Native Sendiri adalah framework berbasis javascript yang dipakai buat bangun aplikasi mobile seperti ios dan android dalam satu basis code, jadi react native bekerja dengan menjembatani code javascript dan native komponen lainya milik system OS Hp, sehingga applikasi bisa jalan dengan setara

## Keunggulan untuk aplikasi hybrid

1. **Satu code** : jadi kebanyakan code yang ditulis menggunakan java script bisa dipake di kedua OS jadi lebih simpel
2. **Fast Refresh** : Perubahan kode langsung terlihat di layar tanpa build ulang, dan state biasanya tetap terjaga. Mencoba perubahan kecil hanya butuh beberapa detik.
3. **Memudahkan untuk migrasi dari web** : lebih mudah untuk beradaptasi, karna base code nya mirip

## Komponen dan props

Komponen fungsi yang bisa dipakai ulang, jadi 1 komponen ngurus 1 bagian dan bisa dipakai berkali kali. Kalo di project ini ada `StatusBadge`, `QueueTicket`, dan `Card` dipakai di beberapa halaman. Props adalah data yang dikirim dari komponen root ke komponen leaf nya. Props cuma bisa dibaca, jadi leaf tidak boleh ngubah. jadi perubahan tampilan cukup dilakukan di satu tempat.


function KotakAngka({ angka, label }: { angka: number; label: string }) {
  return (
    <View>
      <Text>{angka}</Text>
      <Text>{label}</Text>
    </View>
  );
}

<KotakAngka angka={3} label="Motor" />


## State

State sendiri menyimpan data yang bisa berubah selama aplikasi berjalan, misalnya isian form atau status loading. State tidak diubah langsung, Nilainya diganti lewat fungsi, dan React menggambar ulang komponen dengan nilai baru. 
Contoh : 

const [busy, setBusy] = useState(false);

<PrimaryButton label={busy ? "Sedang masuk..." : "Masuk"} busy={busy} onPress={onSubmit} />


## Navigasi

Kita memakai Expo Router, yang membuat rute dari nama file. Setiap file di `src/app/` menjadi satu Page, jadi `tiket.tsx` bisa dibuka lewat rute `/tiket`. Di `_layout.tsx`, `Stack.Protected` hanya mengizinkan Page tertentu untuk pengguna yang sudah login. Perintah `replace` mengganti Page sekarang, jadi pengguna tidak kembali ke Page sebelumnya.

router.replace("/tiket");

## analisis kebutuhan

### masalah

di kebanyakan bengkel motor, cuci motor pelanggan datang dan menunggu tanpa tahu giliran dari antrain cuci lalu service dan bengkel sering bercampur, padahal memiliki lama pengerjaan yang berbeda. terkadang ada pelanggan yang tau masalah motornya dimana itu membuat pengerjaa njadi lebih cepat tapi ada pelanggan yang gatau mnasalah nya dimana itu yang biasa montir harus ce k1 per 1 masalahnya jadi dengan adanya project ini diharapkan agar dapat mempermudah bagi pelanggan dan montir untuk melakukan pekerjaanya

### terget pengguna
| Pengguna | Kebutuhan utama |
|---|---|
| Customer | Booking layanan, mendapat nomor antrian, dan memantau statusnya |
| Admin bengkel(belum ada page) | Melihat antrian per kategori dan mengubah status pengerjaan |

### kebutuhan pengguna
| Kode | Kebutuhan |
|---|---|
| K1 | Pengguna dapat mendaftar dan masuk ke akun |
| K2 | Pelanggan dapat memilih layanan Cuci, Service, atau Modif |
| K3 | Setiap layanan memiliki nomor antrian sendiri per hari (`C-001`, `S-001`, `M-001`) |
| K4 | Pelanggan dapat menuliskan keluhan (Service) atau rincian modifikasi (Modif) sebelum bertemu montir |
| K5 | Pelanggan dapat melihat status tiket dan jumlah antrian di depannya |
| K6 | Pelanggan dapat melihat nomor yang sedang dipanggil di bengkel |
| K7 | Pelanggan dapat membatalkan booking selama statusnya masih Menunggu |
| K8 | Pelanggan dapat menyimpan data motornya (merk, tipe, model, plat) |
| K9 | Admin dapat melihat antrian dan mengubah statusnya |

### Pemetaan kebutuhan

| Kebutuhan | Layar | Komponen | Status |
|---|---|---|---|
| K1 | Masuk (`index.tsx`), Daftar (`register.tsx`) | `AuthScreen`, `Field`, `PasswordField`, `PrimaryButton` | Sudah ada |
| K2 | Beranda (`home.tsx`) | `ServiceBubble` | Tampilan ada, masi hanya page |
| K3, K4 | Booking (`booking/[kategori].tsx`) | `DatePicker`, `Chip`, `MotorForm` | Rencana |
| K5 | Tiket (`tiket.tsx`) | `TiketStub`, `AntrianDiDepan`, `QueueTicket` | Sudah ada |
| K6 | Beranda (`home.tsx`) | `QueueNow` | Sudah ada |
| K7 | Tiket (`tiket.tsx`) | `OutlineButton` | Sudah ada |
| K8 | Profile (`profile.tsx`) dan Garasi | `Card`, `MotorForm` | Daftar motor ada, tambah dan hapus belum |
| K9 | Dashboard admin (`(admin)/antrian.tsx`) | `QueueTicket`, `StatusBadge`, `Chip` | Rencana |

### rencana pengembangan

1. **Page Booking** : pemilihan paket untuk cuci motor, keluhan service, modif jenis motor apa dan rincianya
2. **Page garasi** : add atau delete motor yang terdaftar
3. **admin dashboard** : mengubah status
4. **Validation form** : login page, register, booking
5. **Database** 