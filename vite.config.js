import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-root-data',
      configureServer(server) {
        server.middlewares.use('/data', (req, res, next) => {
          const cleanUrl = req.url.split('?')[0].replace(/^\//, '');
          const filePath = path.resolve(__dirname, 'data', cleanUrl);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            res.setHeader('Content-Type', 'application/json');
            return fs.createReadStream(filePath).pipe(res);
          }
          next();
        });
      },
      closeBundle() {
        const srcDir = path.resolve(__dirname, 'data');
        const destDir = path.resolve(__dirname, 'dist', 'data');
        if (fs.existsSync(srcDir)) {
          fs.mkdirSync(destDir, { recursive: true });
          const files = fs.readdirSync(srcDir);
          for (const file of files) {
            if (file.endsWith('.json')) {
              fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
            }
          }
        }
      }
    }
  ],
})
