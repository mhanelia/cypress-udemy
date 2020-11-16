it('sem testes', () => {
    
});

const getSomething = () => {
    setTimeout(() =>{
        return 12;
    }, 1000)
}

const system = () => {
    console.log('init');
    getSomething(some => console.log);
    console.log(`something is ${getSomething}`);
    console.log('end')

}

system();

