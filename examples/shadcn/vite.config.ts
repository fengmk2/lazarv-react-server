import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@voidzero-dev/vite-plus";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: { alias: { "@/": "/src/" } },
});
