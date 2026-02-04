// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  outDir: 'dist',
  external: [
    '@prisma/client',
    'pg-native',           // already in your original command
    // Add others if needed, e.g.:
    // 'pg',
    // '@prisma/adapter-pg',
  ],
  // Optional but useful:
  clean: true,             // removes dist before each build
  sourcemap: true,         // helps debugging on Vercel
  splitting: false,        // keep as single file (common for Express servers)
  bundle: true,
});