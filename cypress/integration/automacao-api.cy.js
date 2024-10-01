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

      // Verifica os atributos da resposta
      const { code, status, data, etag, copyright, attributionText, attributionHTML } = response.body;

      expect(code).to.be.a('number');         
      expect(code).to.eq(200);                

      expect(status).to.be.a('string');       
      expect(status).to.eq('Ok');             

      expect(data).to.be.an('object');        

      expect(etag).to.be.a('string');         
      expect(etag).to.not.be.empty;           

      expect(copyright).to.be.a('string');    
      expect(copyright).to.not.be.empty;      

      expect(attributionText).to.be.a('string'); 
      expect(attributionText).to.not.be.empty;   

      expect(attributionHTML).to.be.a('string'); 
      expect(attributionHTML).to.not.be.empty;   
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
            failOnStatusCode: false 
        }).then((response) => {
          
          
            expect(response.status).to.eq(200);
            
            // Verifica se o corpo da resposta contém informações dos quadrinhos
            expect(response.body).to.have.property('data');
            expect(response.body.data).to.have.property('results');
            expect(response.body.data.results).to.be.an('array');
            expect(response.body.data.results.length).to.be.greaterThan(0); 
        });
    });
});
