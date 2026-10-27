import { View, type ViewStyle } from "react-native";

// Ikon outline tipis digambar pakai View biasa, jadi tidak perlu library ikon
// atau react-native-svg. Semua potongan diposisikan lewat titik tengahnya
// supaya hasil putarannya tetap pas, karena rotate di React Native berputar
// pada titik tengah elemen.

export type IconName =
  | "home"
  | "ticket"
  | "bike"
  | "user"
  | "droplet"
  | "wrench"
  | "flag"
  | "chevron"
  | "back"
  | "clock"
  | "check"
  | "plus"
  | "trash"
  | "list";

type Props = { name: IconName; color?: string; size?: number };

const W = 1.5; // tebal garis

export function Icon({ name, color = "#1F1E1B", size = 22 }: Props) {
  const s = size;

  // Satu potongan ikon, diletakkan lewat titik tengah (cx, cy).
  function piece(
    cx: number,
    cy: number,
    w: number,
    h: number,
    extra?: ViewStyle & { rot?: string }
  ): ViewStyle {
    const { rot, ...rest } = extra ?? {};
    return {
      position: "absolute",
      left: cx * s - w / 2,
      top: cy * s - h / 2,
      width: w,
      height: h,
      ...(rot ? { transform: [{ rotate: rot }] } : null),
      ...rest,
    };
  }

  // Garis lurus setebal W.
  const bar = (cx: number, cy: number, panjang: number, rot?: string): ViewStyle =>
    piece(cx, cy, panjang * s, W, { backgroundColor: color, rot });

  const barTegak = (cx: number, cy: number, panjang: number): ViewStyle =>
    piece(cx, cy, W, panjang * s, { backgroundColor: color });

  // Lingkaran kosong.
  const ring = (cx: number, cy: number, d: number): ViewStyle =>
    piece(cx, cy, d * s, d * s, {
      borderRadius: (d * s) / 2,
      borderWidth: W,
      borderColor: color,
    });

  const box: ViewStyle = { width: s, height: s };

  switch (name) {
    // Rumah: atap berupa sudut belah ketupat, badan rumah kotak terbuka di atas.
    case "home":
      return (
        <View style={box}>
          <View
            style={piece(0.5, 0.38, s * 0.44, s * 0.44, {
              borderTopWidth: W,
              borderLeftWidth: W,
              borderColor: color,
              rot: "45deg",
            })}
          />
          <View
            style={piece(0.5, 0.67, s * 0.56, s * 0.36, {
              borderWidth: W,
              borderTopWidth: 0,
              borderColor: color,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            })}
          />
        </View>
      );

    // Tiket: kotak dengan garis sobek putus-putus di tengah.
    case "ticket":
      return (
        <View style={box}>
          <View
            style={piece(0.5, 0.5, s * 0.76, s * 0.54, {
              borderWidth: W,
              borderColor: color,
              borderRadius: 3,
            })}
          />
          <View style={barTegak(0.5, 0.33, 0.09)} />
          <View style={barTegak(0.5, 0.5, 0.09)} />
          <View style={barTegak(0.5, 0.67, 0.09)} />
        </View>
      );

    // Motor: dua roda, rangka, dan setang.
    case "bike":
      return (
        <View style={box}>
          <View style={ring(0.21, 0.68, 0.34)} />
          <View style={ring(0.79, 0.68, 0.34)} />
          <View style={bar(0.5, 0.52, 0.42, "-12deg")} />
          <View style={bar(0.74, 0.35, 0.22, "-40deg")} />
        </View>
      );

    // Orang: kepala dan bahu.
    case "user":
      return (
        <View style={box}>
          <View style={ring(0.5, 0.3, 0.34)} />
          <View
            style={piece(0.5, 0.74, s * 0.6, s * 0.28, {
              borderWidth: W,
              borderBottomWidth: 0,
              borderColor: color,
              borderTopLeftRadius: s * 0.3,
              borderTopRightRadius: s * 0.3,
            })}
          />
        </View>
      );

    // Tetes air: kotak dengan tiga sudut tumpul, diputar supaya ujung runcingnya ke atas.
    case "droplet":
      return (
        <View style={box}>
          <View
            style={piece(0.5, 0.54, s * 0.5, s * 0.5, {
              borderWidth: W,
              borderColor: color,
              borderTopRightRadius: 1,
              borderTopLeftRadius: s * 0.3,
              borderBottomLeftRadius: s * 0.3,
              borderBottomRightRadius: s * 0.3,
              rot: "-45deg",
            })}
          />
        </View>
      );

    // Kunci pas: kepala bulat di kiri atas, gagang miring ke kanan bawah.
    case "wrench":
      return (
        <View style={box}>
          <View style={ring(0.29, 0.28, 0.32)} />
          <View style={piece(0.6, 0.62, W, s * 0.48, { backgroundColor: color, rot: "-38deg" })} />
        </View>
      );

    // Bendera: tiang tegak dengan kain di atas.
    case "flag":
      return (
        <View style={box}>
          <View style={barTegak(0.24, 0.52, 0.76)} />
          <View
            style={piece(0.5, 0.33, s * 0.48, s * 0.36, {
              borderWidth: W,
              borderLeftWidth: 0,
              borderColor: color,
            })}
          />
        </View>
      );

    case "chevron":
    case "back":
      return (
        <View style={box}>
          <View
            style={piece(0.5, 0.5, s * 0.32, s * 0.32, {
              borderTopWidth: W,
              borderRightWidth: W,
              borderColor: color,
              rot: name === "back" ? "-135deg" : "45deg",
            })}
          />
        </View>
      );

    // Jam: lingkaran dengan dua jarum.
    case "clock":
      return (
        <View style={box}>
          <View style={ring(0.5, 0.5, 0.74)} />
          <View style={barTegak(0.5, 0.4, 0.2)} />
          <View style={bar(0.59, 0.5, 0.18)} />
        </View>
      );

    case "check":
      return (
        <View style={box}>
          <View style={bar(0.32, 0.6, 0.28, "45deg")} />
          <View style={bar(0.6, 0.45, 0.46, "-48deg")} />
        </View>
      );

    case "plus":
      return (
        <View style={box}>
          <View style={bar(0.5, 0.5, 0.6)} />
          <View style={barTegak(0.5, 0.5, 0.6)} />
        </View>
      );

    // Tempat sampah: tutup, pegangan, dan badan.
    case "trash":
      return (
        <View style={box}>
          <View style={bar(0.5, 0.26, 0.66)} />
          <View style={bar(0.5, 0.15, 0.26)} />
          <View
            style={piece(0.5, 0.57, s * 0.48, s * 0.56, {
              borderWidth: W,
              borderTopWidth: 0,
              borderColor: color,
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            })}
          />
        </View>
      );

    case "list":
      return (
        <View style={box}>
          <View style={bar(0.5, 0.26, 0.68)} />
          <View style={bar(0.5, 0.5, 0.68)} />
          <View style={bar(0.5, 0.74, 0.68)} />
        </View>
      );
  }
}

// Ikon layanan dipakai di beranda, form booking, dan halaman masuk.
export const KATEGORI_ICON: Record<string, IconName> = {
  cuci: "droplet",
  service: "wrench",
  modif: "flag",
};
