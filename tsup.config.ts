import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/api.ts" },
  format: "cjs",
  platform: "node",
  target: "node20",
  outDir: "api",
  splitting: false,
  external: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "@prisma/internals",
    "bcrypt",
    "express",
    "cors",
    "better-auth",
    "pg",
    "dotenv",
    "path",
    "fs",
  ],
  shims: false,
  bundle: true,
  noExternal: ["./src"],
});
