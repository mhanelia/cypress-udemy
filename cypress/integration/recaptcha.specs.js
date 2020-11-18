/// <reference types='cypress' />

describe('Recaptcha', () => {


    it('Recaptcha', () => {


        cy.visit('https://patrickhlauke.github.io/recaptcha/')

        // cy.log(setTimeout(() => {console.log(alert("É necessário resolver o CAPTCHA manualmente!!!")); }, 2000))
        
        cy.callCAPTCHA(); //funcao disponivel em commands.js
        

    });
    
});