import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        background: path.resolve(__dirname, "src/background.js"),
        popup: path.resolve(__dirname, "src/popup.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: path.resolve(__dirname, "manifest.json"), dest: "" },
        { src: path.resolve(__dirname, "src/images"), dest: "" },
        { src: path.resolve(__dirname, "src/assets"), dest: "" },
      ],
    }),
  ],
});
