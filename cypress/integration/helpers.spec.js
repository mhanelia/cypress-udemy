/// <reference types='cypress' />
///deve ser executado um por vez
describe('', () => {
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })
    it('Wrap', () => {
        
        // const obj = { nome: 'User', idade: 20}
        // expect(obj).to.have.property('nome')
        // cy.get('#formNome').then($el => {
        //     cy.wrap($el).type('funciona via cypress')
        // })
            
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 100)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))
        
        
    })


    it('Its', () => {
        //its traz uma propriedade do objeto
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')

        const obj2 = { nome: 'User', idade: 20, endereco: { rua: 'dos bobos' } }
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'bobos')

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    });

    it('Invoke', () => {
        const getValue = () => 1;
        const soma = (a,b) => a+b;

        cy.wrap({ fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)

        cy.get('#formNome').invoke('val','Texto via invoke')
        cy.window().invoke('alert', 'Da pra ver?')
        cy.get('#resultado').invoke('html', '<input type ="button" value="hacked"/>')


        
    });
})