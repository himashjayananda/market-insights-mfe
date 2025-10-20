import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: "overview_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Overview": "./src/Overview.tsx",
        "./api/hooks": "./src/api/hooks.ts",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "react-dom": {
          singleton: true,
          requiredVersion: "^19.0.0",
        },
        "@tanstack/react-query": {
          singleton: true,
          requiredVersion: "^5.0.0",
        },
        "@market-insights/ui": {
          singleton: true,
          requiredVersion: "^1.0.0",
        },
      },
    }),
  ],
  server: {
    port: 3002,
    cors: true,
  },
  preview: {
    port: 3002,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
