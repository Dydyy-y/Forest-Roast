import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.ts'],
    exclude: ['e2e/**'],
    environment: 'node', // keep default; localStorage is mocked manually
  },
});
