import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const base = process.env.NODE_ENV === 'production' ? '/frontend/' : '/';

export default defineConfig({
  plugins: [svelte()],
  base: base, 
  
  build: {
    outDir: 'dist',
  },
});