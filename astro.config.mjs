import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://calindotgabriel.github.io",
  output: "static",
  build: {
    assets: "assets",
  },
});
