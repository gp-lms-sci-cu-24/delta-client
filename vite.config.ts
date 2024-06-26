import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@app": resolve(__dirname, "src/app"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@features": resolve(__dirname, "src/features"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@services": resolve(__dirname, "src/services"),
      "@utils": resolve(__dirname, "src/utils"),
      "@constants": resolve(__dirname, "src/constants"),
    },
  },
});
