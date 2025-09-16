import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Important for SPA assets in Vercel
  build: {
    outDir: "dist"
  }
});
