import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  cacheDir: './.vite',
  build: {
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => (id.includes('onchain-runtime-v3') ? 'midnight-runtime' : undefined),
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
      extensions: ['.js', '.cjs'],
      ignoreDynamicRequires: true,
    },
  },
  plugins: [react(), wasm()],
  optimizeDeps: {
    exclude: [
      '@midnight-ntwrk/onchain-runtime-v3',
      '@midnight-ntwrk/onchain-runtime-v3/midnight_onchain_runtime_wasm_bg.wasm',
    ],
  },
});
