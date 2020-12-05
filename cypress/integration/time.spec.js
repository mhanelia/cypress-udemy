/// <reference types='cypress' />

describe('Trabalhando com alertas', () => {
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    it('Voltando ao passado', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '30/11/2020')

        // cy.clock()   
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3, 13, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '13/04/2012')
    });

    it.only('Vai para o futuro', () => {
        
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gt','1606767073431')
    
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.lte','0')
        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.lte','1000')

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gte','5000')
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('be.gte','15000')
    });
})