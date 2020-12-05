/// <reference types='cypress' />

describe('Desafio', () => {

    // Login
    it('Deve realizar login', () => {
        cy.visit('http://barrigareact.wcaquino.me/')
        cy.get('[href="/login"]').click()
        cy.get('[data-test="email"]').type('madruguinha@vila.com')
        cy.get('[data-test="passwd"]').type('madruguinha')
        cy.get('.btn').click()
        cy.get('.toast-message').should('be.visible')
    });
    // Inserir conta
    it.skip('Deve inserir a conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta entrada')
        cy.get('.btn').click()
        cy.get('.toast-success').should('be.visible')   
    });
    
    //Alterar conta
    it('Deve alterar a conta', () => {
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(.,'Conta para extrato')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]').clear().type('Conta para extrato2')
        cy.get('.btn').click()
        cy.get('.toast').should('contain', 'atualizada')

    });
        

    // Inserir conta repetida
    it.skip('Inserir conta repetida', () => {
        cy.wait(1000)
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta entrada')
        cy.get('.btn').click()
        cy.get('.toast-error').should('be.visible')   
    });

    // Inserir movimentacao
    it.skip('Inserir movimentacao', () => {
        cy.get('[data-test="menu-movimentacao"]').click()
        cy.get('.btn-success').click()
        cy.get('[data-test="data-transacao"]').invoke('val','2020/12/12')
        //cy.get('[data-test="data-pagamento"]').type('30/12/2020')
        cy.get('[data-test="descricao"]').type('Receita')
        cy.get('[data-test="valor"]').type('1200.00')
        cy.get('[data-test="envolvido"]').type('Madruguinha')
        cy.get('[data-test="conta"]').select('Conta entrada')
        cy.get('.btn-primary').click()
        cy.get('.toast-success').should('be.visible')

    });
    // calculo de saida
    // remover movimentacao


})





