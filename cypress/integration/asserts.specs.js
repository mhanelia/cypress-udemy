/// <reference types='cypress' />

it('Equality', () => {
    const a=1;

    expect(a).eq(1);
    expect(a, 'Deveria ser 1').eq(1);
    expect(a).to.be.equal(1);
    expect('a').not.to.be.equal('b')
});

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.false;
    expect(c).to.be.undefined;
    
});

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj)
    expect(obj).to.be.deep.equal({a: 1, b: 2})
    expect(obj).eql({a: 1, b: 2})
    expect(obj).include({a: 1})
    expect(obj).to.have.property('b',2)
    expect(obj).to.not.be.empty
    expect({}).to.be.empty
});

it('Arrays', () => {
    const arr = [1,2,3]
    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,2,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty

});

it('Types', () => {

    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a("string")
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
    
});

it('String', () => {
    const str = 'string de teste'

    expect(str).to.be.equal('string de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/^string/)
    expect(str).to.match(/teste$/)
    expect(str).to.match(/.{15}/)
    expect(str).to.match(/\w+/)
    expect(str).to.match(/\D+/)

});

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2122

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2122)
    expect(floatNumber).to.be.closeTo(5.2, 0.1)
    expect(floatNumber).to.be.above(5)


    
});