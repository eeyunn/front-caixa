import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents() {},
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
