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
            
        cy.title().then(title =>{
            console.log(title)
        })

        let syncTitle
        
        cy.title().then(title =>{
            console.log(title)
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
        
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