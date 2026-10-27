import type { Kategori, Tiket } from "./types";

export type Ringkasan = {
  sedang: string | null; // nomor yang sedang dikerjakan
  menunggu: number;
  selesai: number;
};

// Ringkasan antrian satu kategori pada satu tanggal.
export function ringkasAntrian(
  tickets: Tiket[],
  kategori: Kategori,
  tanggal: string
): Ringkasan {
  const list = tickets.filter((t) => t.kategori === kategori && t.tanggal === tanggal);
  const dikerjakan = list
    .filter((t) => t.status === "dikerjakan")
    .map((t) => t.nomor)
    .sort();
  return {
    sedang: dikerjakan[0] ?? null,
    menunggu: list.filter((t) => t.status === "menunggu").length,
    selesai: list.filter((t) => t.status === "selesai").length,
  };
}

export function urutNomor(a: Tiket, b: Tiket): number {
  return a.nomor < b.nomor ? -1 : a.nomor > b.nomor ? 1 : 0;
}
