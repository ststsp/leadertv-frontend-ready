// postcss.config.cjs  (CommonJS)
// Ако файлът е .cjs, използваме module.exports,
// а не "export default".
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
