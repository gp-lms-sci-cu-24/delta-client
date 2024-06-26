import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "/src/"),
      "@components": resolve(__dirname, "/src/components"),
      "@utils": resolve(__dirname, "/src/utils"),
      "@services": resolve(__dirname, "/src/services"),
      "@assets": resolve(__dirname, "/src/assets"),
      "@app": resolve(__dirname, "/src/app"),
      "@layouts": resolve(__dirname, "/src/layouts"),
    },
  },
});
