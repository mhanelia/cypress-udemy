/// <reference types='cypress' />

describe('Esperas...', () => {
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload()
    })
    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Teste')
    });

    it('Deve fazer retrys', () => {
        
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
        
    });

    it('Uso do find', () => {
        cy.get('#buttonList').click()
        cy.get('#lista > li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista li span').should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()

        cy.get('#lista > li')
        .find('span')
        .should('contain', 'Item 1')

        cy.get('#lista li span').should('contain', 'Item 2')
            
    });

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        cy.wait(2000)
        cy.get('#novoCampo').should('exist')

        cy.get('#buttonListDOM', {timeout: 6000}).click()
        cy.get('#lista li span')
        .should('have.length', '1')
        cy.get('#lista li span')
        .should('have.length', '2')


        
    });

    it('Click retry', () => {
        cy.get('#buttonCount')
        .click()
        .should('have.value', '1')
        
    });

    it('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').debug()
        // .should('have.length', '1')
    });
})