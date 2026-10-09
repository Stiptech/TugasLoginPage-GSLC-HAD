/** @type {import('tailwindcss').Config} */
module.exports = {
  // Semua kode ada di src/, jadi di sinilah NativeWind harus mencari kelas.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
