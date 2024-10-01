const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.js',
    experimentalSessionAndOrigin: true,
    testIsolation: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',         // Diretório onde o relatório será salvo
      overwrite: false,                     // Não sobrescreve os relatórios existentes
      html: true,                           // Gera o relatório em HTML
      json: true,                           // Gera o relatório em JSON
      charts: true,                         // Incluir gráficos no relatório
      reportPageTitle: 'Relatório de Testes', // Título da página do relatório
      embeddedScreenshots: true,            // Incluir screenshots embutidos no relatório
    },
    setupNodeEvents(on, config) {
      // Configurações adicionais de eventos
    },
  },
});