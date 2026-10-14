export type Role = "customer" | "admin";
export type Kategori = "cuci" | "modif" | "service";
export type Status = "menunggu" | "dikerjakan" | "selesai" | "batal";
export type TipeMotor = "sport" | "skuter";

export type Session = { name: string; email: string; role: Role };

export type Motor = {
  id: string;
  merk: string;
  tipe: TipeMotor;
  model: string;
  plat: string;
};

export type Tiket = {
  id: string;
  nomor: string; // contoh: C-003
  kategori: Kategori;
  tanggal: string; // YYYY-MM-DD
  status: Status;
  motor: Motor;
  userEmail: string;
  userName: string;
  paket?: string; // khusus cuci
  keluhan?: string; // khusus service
  rincian?: string; // khusus modif
  jenisModif?: string[]; // khusus modif
  dibuat: number;
};
