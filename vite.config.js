import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import react from '@vitejs/plugin-react';
import imageminGifSicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngQuant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';
import { resolve } from 'node:path';
import { env } from 'node:process';
import { defineConfig } from 'vite';

const idDev = env.NODE_ENV === 'development';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Pet_Bridge/',
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
        },
      },
    }),
  ],
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: idDev
        ? '[name]_[local]__[hash:base64:5]'
        : '[hash:base64:4]',
    },
  },
  esbuild: {
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactRouter: ['react-router-dom'],
          extra: ['@tanstack/react-query'],
        },
      },
    },
  },
});
