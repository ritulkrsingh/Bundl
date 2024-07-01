import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const mode = process.env.MODE || 'development'
const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')
const env = loadEnv(mode, process.cwd(), '')

// https://vitejs.dev/config/ss
export default defineConfig({
  root,
  define: {
    'process.env.REACT_APP_API_URL': JSON.stringify(env.REACT_APP_API_URL)
  },
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      }
    }
  }
})
