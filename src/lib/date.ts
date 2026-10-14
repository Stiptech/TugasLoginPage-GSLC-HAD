const HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

// Tanggal lokal dalam format YYYY-MM-DD (bukan UTC).
export function toISO(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function today(): string {
  return toISO(new Date());
}

// Daftar tanggal mulai hari ini, untuk pilihan tanggal booking.
export function nextDays(count: number): { iso: string; hari: string; tgl: string; bulan: string }[] {
  const out = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      iso: toISO(d),
      hari: i === 0 ? "Hari ini" : HARI[d.getDay()],
      tgl: String(d.getDate()),
      bulan: BULAN[d.getMonth()],
    });
  }
  return out;
}

export function formatTanggal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${HARI[date.getDay()]}, ${d} ${BULAN[m - 1]} ${y}`;
}
