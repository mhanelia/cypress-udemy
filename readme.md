Iniciar um projeto node.js - npm init -y
Baixar o Cypress - npm install -D cypress
Abrir o Cypress - npx cypress open

--

Arrow functions:
Uma expressão arrow function possui uma sintaxe mais curta quando comparada a uma expressão de função (function expression) e não tem seu próprio this, arguments, super ou new.target. Estas expressões de funções são melhor aplicadas para funções que não sejam métodos, e elas não podem ser usadas como construtoras (constructors).
--

Promisses:
Uma Promise é um objeto que representa a eventual conclusão ou falha de uma operação assincrona.
Uma necessidade comum é executar duas ou mais operações assincronas consecutivas, onde cada operação subsequente começa quando a operação anterior é bem sucedida, com o resultado do passo anterior. Nós conseguimos isso criando uma cadeia de promises.
--

Describe/ It

describe: agrupa testes
it: são os testes em sí
.skip: ele pula o teste ou grupo de testes, pode ser usado mais de uma vez
.only: executa apenas aquele teste ou grupo de testes. Não pode ser mais de uma vez ele sempre entende o ultimo .only
--

Assertivas:

ao usar expect, tentar colocar de um jeito legível: expect(a).to.be.equal(a)
--




