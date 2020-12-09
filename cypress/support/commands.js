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
import loc from './locators'

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
})

Cypress.Commands.add('clickAlert', (locator, message) => { 
    
    cy.get(locator).click()
    cy.on('window:alert',msg =>{
        expect(msg).to.be.equal(message)
    }) 
})

Cypress.Commands.add('login', (user, passwd) =>{
    cy.visit('http://barrigareact.wcaquino.me/')
    cy.get('[href="/login"]').click()
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('be.visible')
})

Cypress.Commands.add('resetApp',  () =>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()
      
})

Cypress.Commands.add('getToken', (user, passwd) =>{
    cy.request({
        method: 'POST',
        url: '/signin',
        body: { 
            email: user,
            redirecionar: false,
            senha: passwd
         }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token)
            return token
        })
})

Cypress.Commands.add('resetRest', () => {
        cy.request({
            method: 'GET',
            url: '/reset',
            // headers:{ Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getContabyName', name =>  { 
    
    cy.request ({
        method: 'GET',
        url: '/contas',
        // headers:{ Authorization: `JWT ${token}`},
        qs: { 
            nome: name
        }                        
    }).then(res => {
        return res.body[0].id       
    })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => { 
    if (options.length === 1){
        if (Cypress.env('token')) {
            options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`,

            }
        }
    }

    return originalFn(...options)
});
