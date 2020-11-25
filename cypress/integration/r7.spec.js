/// <reference types='cypress' />

it('votação', () => {
    

    for (var i = 1; i < 15000; i++) {
        cy.visit('https://afazenda.r7.com/a-fazenda-12/votacao');
        cy.get(':nth-child(1) > .voting-button--hidden', {force: true}).click()
        cy.get('.voting-button').click()
    }
        
});