/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), viteReact()],
  test: {
    globals: true, // Habilita los métodos globales como describe, test, etc.
    environment: "jsdom", // Usa jsdom como entorno de pruebas
    setupFiles: "./src/setupTests.ts", // Archivo para configuraciones globales
  },
  resolve: {
    alias: {
      "*": path.resolve(__dirname, "./src"),
    },
  },
});
