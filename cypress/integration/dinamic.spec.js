/// <reference types='cypress' />

describe('Teste dinamico', () => {
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html');
    })

    const comidas = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    comidas.forEach(comida => {
        it(`Cadastro com a comida ${comida}`, () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${comida}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
    
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
            
    })
    
    });

    it('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita').each($el =>{
            if($el.val()!= 'vegetariano') 
                cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        
    });
})