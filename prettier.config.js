/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */ 
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  trailingComma: 'es5',
}

export default config