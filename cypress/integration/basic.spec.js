/// <reference types='cypress' />

describe('Cypress basics',()=>{
    it.only('deve visitar uma pagina e realizar uma assertiva no titulo', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        
        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')    
        
        //OU 
        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')      

        //TODO imprimir title no console
        //TODO escrever o title em um campo de texto    
    });

    it('Devem encontrar e interagir com um elemento', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#buttonSimple').click()
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')

        //OU
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')


    });

})