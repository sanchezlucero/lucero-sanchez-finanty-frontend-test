// vite.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // Si 'poolOptions' da error, usamos una configuración compatible de hilos [cite: 2026-01-20]
    pool: 'forks',
    ...( {
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
    } as object), 
  },
});