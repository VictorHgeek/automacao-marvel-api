// Importa a biblioteca CryptoJS para gerar o hash MD5
const CryptoJS = require("crypto-js");


describe('Teste de API - Marvel Creators', () => {
  const publicKey = Cypress.env('PUBLIC_KEY');
  const privateKey = Cypress.env('PRIVATE_KEY');
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/creators/32';

  it('Deve retornar os detalhes do criador com sucesso', () => {
    const ts = new Date().getTime(); 
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); 

    cy.request({
      method: 'GET',
      url: `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
      failOnStatusCode: false 
    }).then((response) => {
      
      expect(response.status).to.eq(200);
      
      
    });
  });
});

describe('Teste de API - Marvel Comics', () => {
    const publicKey = Cypress.env('PUBLIC_KEY');
    const privateKey = Cypress.env('PRIVATE_KEY');
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/creators/32/comics';

    it('Deve retornar os quadrinhos do criador com sucesso', () => {
        const ts = new Date().getTime(); // Cria um timestamp atual
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Gera o hash MD5

        cy.request({
            method: 'GET',
            url: `${baseUrl}?ts=${ts}&apikey=${publicKey}&hash=${hash}`,
            failOnStatusCode: false // Permite capturar respostas com erro para verificação
        }).then((response) => {
            // Log para depuração
            cy.log(`Status: ${response.status}`);
            cy.log(`Body: ${JSON.stringify(response.body)}`);

            // Verifica se o status da resposta é 200
            expect(response.status).to.eq(200);
            
            // Verifica se o corpo da resposta contém informações dos quadrinhos
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('results');
            expect(response.body.data.results).to.be.an('array'); // Verifica se é um array
            expect(response.body.data.results.length).to.be.greaterThan(0); // Verifica se há pelo menos um quadrinho
        });
    });
});
