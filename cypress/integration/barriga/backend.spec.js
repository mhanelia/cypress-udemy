/// <reference types='cypress' />



describe('Deve testar a nivel de API', () => {
    // let token

    before(()=>{
        cy.getToken('madruguinha@vila.com', 'madruguinha')  
            // .then(tkn => {
            //     token = tkn
            // })
    })

    beforeEach(() => {
        cy.resetRest()
        
    })
    
    
    it('Deve criar uma conta', () => {

        cy.request({
            method: 'POST',
            url: '/contas',
            // headers:{ Authorization: `JWT ${token}`},
            body: { 
                nome: 'Conta via REST'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via REST')
        })
        
    })

    it('Deve alterar a conta', () => {
        cy.getContabyName('Conta para alterar')
            .then(contaID => {
                cy.request ({
                    url: `/contas/${contaID}`,
                    method: 'PUT',
                    // headers:{ Authorization: `JWT ${token}`},
                    body: { 
                        nome: 'Conta alterada via REST'
                    }            
                }).as('response')
            })
        
            
        

        cy.get('@response').its('status').should('be.equal', 200)
    })


    it('Não deve criar uma conta com mesmo nome', () => {

        cy.request({
            method: 'POST',
            url: '/contas',
            // headers:{ Authorization: `JWT ${token}`},
            body: { 
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
        
    })

    it('Deve criar uma movimentação', () => {
        cy.getContabyName('Conta para movimentacoes')
        .then(contaID =>{
            cy.request({
                method: 'POST',
                url: 'transacoes',
                // headers:{ Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaID,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Desc",
                    envolvido: "Me",
                    status: true,
                    tipo: "REC",
                    valor: "132"
                }

        }).as('response')
       
        })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
         
    })

    it('Deve consultar o saldo', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            // headers:{ Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })    

        cy.request({
            url: '/transacoes',
            method: 'GET',
            // headers:{ Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            console.log(res.body[0].id)
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method:'PUT',
                // headers:{ Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        
        cy.request({
            url: '/saldo',
            method: 'GET',
            // headers:{ Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })    

    })

    it('Deve remover uma movimentação', () => {
        cy.request({
            url: '/transacoes',
            method: 'GET',
            // headers:{ Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method:'DELETE',
                // headers:{ Authorization: `JWT ${token}`},

            }).its('status').should('be.equal',204)
        })
    })

})
