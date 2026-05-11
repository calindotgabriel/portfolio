import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://calingabriel.com",
  output: "static",
  build: {
    assets: "assets",
  },
});
