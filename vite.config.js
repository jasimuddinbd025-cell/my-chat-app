import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Externalize supabase to fix build
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["@supabase/supabase-js"]
    }
  }
});
