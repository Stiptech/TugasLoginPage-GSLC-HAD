import type { Kategori, Status, TipeMotor } from "./types";

export const KATEGORI: Record<
  Kategori,
  { label: string; prefix: string; icon: string; desc: string; warna: string }
> = {
  cuci: {
    label: "Cuci Motor",
    prefix: "C",
    icon: "💧",
    desc: "Cuci biasa atau cuci keseluruhan",
    warna: "#185FA5",
  },
  service: {
    label: "Service Motor",
    prefix: "S",
    icon: "🔧",
    desc: "Tulis keluhan, montir yang memeriksa",
    warna: "#0F6E56",
  },
  modif: {
    label: "Modif Motor",
    prefix: "M",
    icon: "🏁",
    desc: "Ceritakan rincian modifikasimu",
    warna: "#B4540A",
  },
};

export const KATEGORI_LIST: Kategori[] = ["cuci", "service", "modif"];

export const PAKET_CUCI = [
  { id: "biasa", label: "Cuci Biasa", desc: "Bodi dan velg, dibilas dan dikeringkan" },
  {
    id: "keseluruhan",
    label: "Cuci Keseluruhan",
    desc: "Bodi, mesin, rangka, dan kolong dibersihkan menyeluruh",
  },
];

export const JENIS_MODIF = [
  "Knalpot",
  "Velg & Ban",
  "Cat & Stiker",
  "Lampu",
  "Suspensi",
  "Aksesori",
];

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
