const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5500',
    setupNodeEvents(on, config) {
      on('before:run', (details) => {
        console.log('Test Run Starting', details);
      });

      on('after:run', (results) => {
        console.log('Test Run Completed:', results);
      });
    },
    supportFile: 'cypress/support/index.js',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
