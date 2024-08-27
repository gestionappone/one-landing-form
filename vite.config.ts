/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    federation({
      name: "mainHostApp",
      remotes: {
        remoteMicroEcommerceApp: "http://localhost:3000/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  test: {
    globals: true, // Habilita los métodos globales como describe, test, etc.
    environment: "jsdom", // Usa jsdom como entorno de pruebas
    setupFiles: "./src/setupTests.ts", // Archivo para configuraciones globales
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "./src/utils"),
      "ui-library": path.resolve(__dirname, "./src/ui-library"),
    },
  },
});
