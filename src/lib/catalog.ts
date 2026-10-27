import type { Kategori, Status, TipeMotor } from "./types";

export const KATEGORI: Record<
  Kategori,
  {
    label: string;
    pendek: string;
    prefix: string;
    desc: string;
    warna: string;
    lembut: string; // latar lembut untuk kartu, kontrasnya rendah
    estimasi: string;
  }
> = {
  cuci: {
    label: "Cuci Motor",
    pendek: "Cuci",
    prefix: "C",
    desc: "Cuci biasa atau cuci keseluruhan",
    warna: "#185FA5",
    lembut: "#EAF1F8",
    estimasi: "20 - 45 menit",
  },
  service: {
    label: "Service Motor",
    pendek: "Service",
    prefix: "S",
    desc: "Tulis keluhan, montir yang memeriksa",
    warna: "#0F6E56",
    lembut: "#E8F2EE",
    estimasi: "1 - 3 jam",
  },
  modif: {
    label: "Modif Motor",
    pendek: "Modif",
    prefix: "M",
    desc: "Ceritakan rincian modifikasimu",
    warna: "#B4540A",
    lembut: "#F6EDE4",
    estimasi: "Tergantung rincian",
  },
};

// Profil bengkel, dipakai di beranda dan halaman tiket.
export const BENGKEL = {
  nama: "Bengkel Roda Dua",
  alamat: "Jl. Kemang Raya No. 24, Jakarta Selatan",
  buka: "08.00",
  tutup: "17.00",
  telepon: "021 7220 118",
  libur: "Minggu tutup",
};

export const KATEGORI_LIST: Kategori[] = ["cuci", "service", "modif"];

export const PAKET_CUCI = [
  {
    id: "biasa",
    label: "Cuci Biasa",
    desc: "Bodi dan velg, dibilas lalu dikeringkan",
    durasi: "± 20 menit",
    harga: "Rp 20.000",
  },
  {
    id: "keseluruhan",
    label: "Cuci Keseluruhan",
    desc: "Bodi, mesin, rangka, dan kolong dibersihkan menyeluruh",
    durasi: "± 45 menit",
    harga: "Rp 45.000",
  },
];

// Jenis service yang paling sering diambil, jadi user tidak mulai dari nol.
export const JENIS_SERVICE = [
  "Service rutin",
  "Ganti oli",
  "Rem",
  "Mesin",
  "Kelistrikan",
  "CVT / rantai",
  "Ban",
];

export const JENIS_MODIF = [
  "Knalpot",
  "Velg & Ban",
  "Cat & Stiker",
  "Lampu",
  "Suspensi",
  "Aksesori",
];

// Estimasi kasar per jenis modif, ditampilkan sebagai ancar-ancar saja.
export const ESTIMASI_MODIF: Record<string, string> = {
  Knalpot: "Rp 450.000 ke atas",
  "Velg & Ban": "Rp 1.200.000 ke atas",
  "Cat & Stiker": "Rp 700.000 ke atas",
  Lampu: "Rp 250.000 ke atas",
  Suspensi: "Rp 900.000 ke atas",
  Aksesori: "Rp 150.000 ke atas",
};

// Tahapan pengerjaan, dipakai di timeline halaman tiket.
export const TAHAPAN: { status: Status; label: string; ket: string }[] = [
  { status: "menunggu", label: "Masuk antrian", ket: "Tiket terbit, tunggu dipanggil" },
  { status: "dikerjakan", label: "Dikerjakan montir", ket: "Motor sedang ditangani" },
  { status: "selesai", label: "Selesai", ket: "Motor siap diambil" },
];

// Nama montir contoh, dipasangkan ke tiket supaya detailnya tidak kosong.
export const MONTIR = ["Pak Sigit", "Pak Yanto", "Bang Deni", "Bang Fajar"];

export function montirUntuk(id: string): string {
  let n = 0;
  for (let i = 0; i < id.length; i++) n = (n + id.charCodeAt(i)) % 997;
  return MONTIR[n % MONTIR.length];
}

// Merk partner bengkel beserta model yang dilayani.
export const MERK: Record<string, Record<TipeMotor, string[]>> = {
  Honda: {
    sport: ["CBR150R", "CBR250RR", "CB150R"],
    skuter: ["BeAT", "Scoopy", "Vario 125", "PCX 160"],
  },
  Yamaha: {
    sport: ["R15", "R25", "MT-25"],
    skuter: ["Fazzio", "Lexi", "Aerox", "NMAX"],
  },
  Kawasaki: {
    sport: ["Ninja 250", "Ninja ZX-25R", "Z250"],
    skuter: [],
  },
  Suzuki: {
    sport: ["GSX-R150", "GSX-S150"],
    skuter: ["Address", "Nex II"],
  },
  Vespa: {
    sport: [],
    skuter: ["Primavera", "Sprint", "LX"],
  },
};

export const MERK_LIST = Object.keys(MERK);

export const TIPE_LABEL: Record<TipeMotor, string> = {
  sport: "Sport",
  skuter: "Skuter",
};

export const STATUS: Record<Status, { label: string; fg: string; bg: string }> = {
  menunggu: { label: "Menunggu", fg: "#8A5A00", bg: "#FFF3D6" },
  dikerjakan: { label: "Dikerjakan", fg: "#185FA5", bg: "#E4EFFA" },
  selesai: { label: "Selesai", fg: "#0F6E56", bg: "#E3F5EE" },
  batal: { label: "Batal", fg: "#B23A39", bg: "#FBE7E6" },
};

export const STATUS_LIST: Status[] = ["menunggu", "dikerjakan", "selesai", "batal"];
