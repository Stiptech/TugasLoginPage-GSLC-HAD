import { Text as RNText, type TextProps } from "react-native";

// Teks bawaan aplikasi. Semua Text memakai komponen ini supaya Plus Jakarta
// Sans terpasang tanpa harus menulis kelas font di tiap baris. Kelas font
// lain (font-medium, font-semibold, font-bold, font-plat) tetap menang
// karena ditulis belakangan di tailwind.config.js.
export function Text({ className, ...rest }: TextProps) {
  return <RNText className={"font-normal " + (className ?? "")} {...rest} />;
}

export type { TextProps };
