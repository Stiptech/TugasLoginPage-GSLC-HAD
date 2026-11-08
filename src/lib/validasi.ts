export type ErrorForm = {
  nama?: string;
  email?: string;
  password?: string;
};

export function cekNama(nama: string): string {
  const n = nama.trim();
  if (n === "") return "Nama lengkap masih kosong.";
  if (n.length < 2) return "Nama minimal 2 huruf.";
  if (/\d/.test(n)) return "Nama tidak boleh berisi angka.";
  return "";
}

export function cekEmail(email: string): string {
  const e = email.trim();
  if (e === "") return "Email masih kosong.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return "Format email belum benar. Contoh: nama@email.com";
  }
  return "";
}

export function cekPasswordBaru(password: string): string {
  if (password === "") return "Kata sandi masih kosong.";
  if (password.length < 8) return "Kata sandi minimal 8 karakter.";
  if (!/[A-Za-z]/.test(password)) return "Kata sandi harus punya minimal satu huruf.";
  if (!/\d/.test(password)) return "Kata sandi harus punya minimal satu angka.";
  return "";
}

export function validasiLogin(email: string, password: string): ErrorForm {
  const hasil: ErrorForm = {};

  const errEmail = cekEmail(email);
  if (errEmail !== "") hasil.email = errEmail;

  if (password === "") hasil.password = "Kata sandi masih kosong.";

  return hasil;
}

export function validasiDaftar(nama: string, email: string, password: string): ErrorForm {
  const hasil: ErrorForm = {};

  const errNama = cekNama(nama);
  if (errNama !== "") hasil.nama = errNama;

  const errEmail = cekEmail(email);
  if (errEmail !== "") hasil.email = errEmail;

  const errPassword = cekPasswordBaru(password);
  if (errPassword !== "") hasil.password = errPassword;

  return hasil;
}

export function adaError(hasil: ErrorForm): boolean {
  return Object.values(hasil).some((pesan) => !!pesan);
}
