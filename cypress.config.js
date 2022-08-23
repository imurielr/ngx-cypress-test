const { defineConfig } = require('cypress')
const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      return config;
    },
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*', "**/__snapshots__/*", "**/__image_snapshots__/*"],
  },
})