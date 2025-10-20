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
      name: "host_app",
      filename: "remoteEntry.js",
      remotes: {
        overview_remote: "http://localhost:3002/assets/remoteEntry.js",
        financials_remote: "http://localhost:3003/assets/remoteEntry.js",
        news_remote: "http://localhost:3004/assets/remoteEntry.js",
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
    port: 3000,
    cors: true,
  },
  preview: {
    port: 3000,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
