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
      name: "financials_remote",
      filename: "remoteEntry.js",
      exposes: {
        "./FinancialStatements": "./src/FinancialStatements.tsx",
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
        "@mui/material": {
          singleton: true,
          requiredVersion: "^7.0.0",
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: "^7.0.0",
        },
        "@emotion/react": {
          singleton: true,
          requiredVersion: "^11.0.0",
        },
        "@emotion/styled": {
          singleton: true,
          requiredVersion: "^11.0.0",
        },
        "@tanstack/react-query": {
          singleton: true,
          requiredVersion: "^5.0.0",
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: "^7.0.0",
        },
      },
    }),
  ],
  server: {
    port: 3003,
    cors: true,
  },
  preview: {
    port: 3003,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
