const plugin = require("tailwindcss/plugin")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".font-normal": { fontFamily: "Jakarta", fontWeight: "400" },
        ".font-medium": { fontFamily: "JakartaMedium", fontWeight: "500" },
        ".font-semibold": { fontFamily: "JakartaSemiBold", fontWeight: "600" },
        ".font-bold": { fontFamily: "JakartaBold", fontWeight: "700" },

        ".font-plat": { fontFamily: "PlatBold", fontWeight: "700" },
        ".font-plat-semi": { fontFamily: "PlatSemiBold", fontWeight: "600" },
      })
    }),
  ],
}
