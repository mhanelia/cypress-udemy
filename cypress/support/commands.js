// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('callCAPTCHA', () => {
  // Aguarda até que o iframe (Google reCAPTCHA) seja totalmente carregado
  cy.get('iframe')
    .first() //Obtem o primeiro elemento DOM dentro de um conjunto de elementos DOM.
    .its('0.contentDocument.body') // Obtem o valor de uma propriedade no assunto chamado anteriormente - iframe neste caso
    .should('not.be.undefined') // Cria uma afirmacao. Neste caso o assunto acima não pode ser undefined
    .and('not.be.empty') // e não pode ser vazio
    .then(cy.wrap)
    .find('#recaptcha-anchor')
    .should('be.visible')
    .click();
                    
    });

    Cypress.Commands.add('clickAlert', (locator, message) => { 
    
    cy.get(locator).click()
    cy.on('window:alert',msg =>{
        expect(msg).to.be.equal(message)
    }) 
  });
