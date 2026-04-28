import { defineConfig } from 'vite'
import react  from '@vitejs/plugin-react'

 export default defineConfig({
  plugins: [react(
    {

    jsxImportSource: "@emotion/react",}
  )]
})
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}