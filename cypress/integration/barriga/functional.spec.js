/// <reference types='cypress' />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Deve testar nivel funcional', () => {
    before(()=>{
        
        cy.login('madruguinha@vila.com', 'madruguinha')
        cy.resetApp()
    })
    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    });
    
    
    it('Deve criar uma conta', () => {
        cy.acessarMenuConta()
        cy.InserirConta('Conta de testes')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')   
    })

    it('Deve alterar a conta', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'atualizada')
    })

    it('Não deve criar uma conta com mesmo nome', () => {
        cy.acessarMenuConta()
        cy.InserirConta('Conta mesmo nome')

        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Deve criar uma movimentação', () => {
        
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Receita')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Madruguinha')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Receita', '123' )).should('exist')
    })

    it.only('Deve consultar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','534')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain','4.034,00')

    })

    it('Deve remover uma movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVE_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')  
    })

})