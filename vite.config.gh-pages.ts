import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Substitua 'seu-repositorio' pelo nome real do seu repositório
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'seu-repositorio';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: `/${repoName}/`,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist-gh-pages"),
    emptyOutDir: true,
  },
});