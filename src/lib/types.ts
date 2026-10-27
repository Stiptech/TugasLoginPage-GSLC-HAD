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
  nomor: string;
  kategori: Kategori;
  tanggal: string;
  status: Status;
  motor: Motor;
  userEmail: string;
  userName: string;
  paket?: string;
  keluhan?: string;
  jenisService?: string[];
  rincian?: string;
  jenisModif?: string[];
  dibuat: number;
};
