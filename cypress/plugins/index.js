const { defineConfig } = require('cypress');

module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
  return config;
};