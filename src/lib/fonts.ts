// Nama keluarga font yang dipakai di seluruh aplikasi.
//
// Di React Native satu berkas font = satu keluarga. Jadi tiap ketebalan
// didaftarkan dengan nama sendiri, lalu dipetakan ke kelas Tailwind
// (font-normal, font-medium, font-semibold, font-bold) di tailwind.config.js.
export const FONT = {
  reguler: "Jakarta",
  medium: "JakartaMedium",
  semibold: "JakartaSemiBold",
  bold: "JakartaBold",
  // Barlow Condensed, dipakai untuk nomor antrian dan plat nomor.
  platSemibold: "PlatSemiBold",
  platBold: "PlatBold",
} as const;
