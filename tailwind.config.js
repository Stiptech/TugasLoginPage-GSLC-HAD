const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Semua kode ada di src/, jadi di sinilah NativeWind harus mencari kelas.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    // Di React Native satu berkas font cuma punya satu ketebalan, jadi
    // fontWeight saja tidak cukup. Utility bawaan Tailwind ditimpa supaya
    // sekalian memilih keluarga fontnya. Urutan di bawah penting: yang
    // ditulis belakangan menang, jadi font-semibold mengalahkan font-normal
    // yang dipasang sebagai bawaan di src/components/text.tsx.
    plugin(({ addUtilities }) => {
      addUtilities({
        ".font-normal": { fontFamily: "Jakarta", fontWeight: "400" },
        ".font-medium": { fontFamily: "JakartaMedium", fontWeight: "500" },
        ".font-semibold": { fontFamily: "JakartaSemiBold", fontWeight: "600" },
        ".font-bold": { fontFamily: "JakartaBold", fontWeight: "700" },
        // Barlow Condensed untuk nomor antrian dan plat nomor.
        ".font-plat": { fontFamily: "PlatBold", fontWeight: "700" },
        ".font-plat-semi": { fontFamily: "PlatSemiBold", fontWeight: "600" },
      })
    }),
  ],
}
