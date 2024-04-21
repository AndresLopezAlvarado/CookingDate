import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/socket.io": { target: "http://localhost:3000", ws: true } },
    // proxy: { "/socket.io": { target: VITE_BACKEND_URL, ws: true } },
  },
});
