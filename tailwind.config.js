// tailwind.config.js
const isProduction = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  // only needed in Tailwind 1.0 for tailwind 2.0 compat
  // future: {
  //     purgeLayersByDefault: true,
  //     removeDeprecatedGapUtilities: true,
  //   },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    // for tailwind UI users only
    // require('@tailwindcss/ui'),
    // other plugins here
    require('@tailwindcss/forms'),
  ],
  // purge: {
  //   content: [
  //     "./src/**/*.svelte",
  //     "./src/**/*.html"
  //   ],
  //   // this is for extracting Svelte `class:` syntax but is not perfect yet, see below
  //   defaultExtractor: content => {
  //     const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
  //     const broadMatchesWithoutTrailingSlash = broadMatches.map(match => _.trimEnd(match, '\\'))
  //     const matches = broadMatches
  //       .concat(broadMatchesWithoutTrailingSlash)
  //     return matches
  //   },
  //   enabled: isProduction // disable purge in dev
  // },
  purge: ["./src/**/*.svelte"]
};