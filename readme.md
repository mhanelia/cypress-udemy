# cypress-udemy

Repositório utilizado durante o curso Testes de aplicações modernas com Cypress.

  - cypress
  - xpath
  - page objects
  - teste funcional
  - API
  - teste de interface

# Comandos para instalação do cypress e cypress-xpath:
```sh
  > git init    
  > npm init -y   
  > npm install -D cypress
  > npm install -D cypress-xpath
```

# Anotações durante o curso: 

# Arrow functions:
Uma expressão arrow function possui uma sintaxe mais curta quando comparada a uma expressão de 
função (function expression) e não tem seu próprio this, arguments, super ou new.target. 
Estas expressões de funções são melhor aplicadas para funções que não sejam métodos, e 
elas não podem ser usadas como construtoras (constructors).

# Promisses:
Uma Promise é um objeto que representa a eventual conclusão ou falha de uma operação assincrona.
Uma necessidade comum é executar duas ou mais operações assincronas consecutivas, onde cada operação 
subsequente começa quando a operação anterior é bem sucedida, com o resultado do passo anterior. 
Nós conseguimos isso criando uma cadeia de promises.
Exemplo:
```sh
cy.title().then(title =>{
            console.log(title)
        })
```

#Describe/It
describe: agrupa testes
it: são os testes em sí
.skip: ele pula o teste ou grupo de testes, pode ser usado mais de uma vez
.only: executa apenas aquele teste ou grupo de testes. Não pode ser mais de uma vez ele 
sempre entende o ultimo .only

#Assertivas:
Garantem que o teste executou da forma esperada. Ao usar expect, tentar colocar de um jeito legível: expect(a).to.be.equal(a)
Procurar encadear as ações quando possível. Ex.:
```sh    
cy.get('#buttonSimple')
    .click()
    .should('have.value', 'Obrigado!')
```

# Elementos:
Nas buscas, o . é uma classe CSS, o # é uma busca por ID, [] ele busca dentro da propriedade
do elemento, @ é quando usa-se aliases

# Comandos: 
.reload() - recarrega a tela

.should() - Crie uma assertiva. As assertivas são repetidas automaticamente até que 
passem ou expirem. Não podem ser encadeados 'cy' (cy.should errado). o should só retenta o 
comando diretamente anterior, ele sempre monitora o elemento que vem do comando anterior

before() ou beforeEach() podem ser chamados nas specs ou dentro de cypress/support

para verificar o texto dentro de um campo de texto (textfield) usa-se have.value 

.click({multiple:true}) - permite clicar em mais de um combobox em uma mesma chamada

Em combo e combo multiplo sempre leva-se em conta o value do elemento no HMTL

timeout padrão é 4 segundos, pode ser passado como parametro individual ou alterar no cypress.json

cy.wait() aguarda o tempo fixo na execução, o timeout é melhor pois é um limite máximo mas não fixo

should fica realizando a busca mesmo o get não tenha terminado, o then só tenta a hora que carrega o que precisa

should retorna o que foi enviado pelo elemento, o then vai ser o mesmo objeto mas se tiver um return ele devolve o return

cy.wrap() ele encapsula um objeto para que esse objeto seja usado com outros cy.

invoke chama uma propriedade de um objeto como função 

