let assertUsage = () => {
    let assert = require('chai').assert
        foo = 'bar'
        beverages = {
            teas: ['chai', 'mocha', 'oolong']
        }

    describe('something', function () {
        it('should be a string type', function() {
            assert.typeOf(foo, 'string')
        })
        it('should be a string type, otherwise throws error message', function() {
            assert.typeOf(foo, 'string', 'foo must be a string')
        })
        it('foo should be 3 length', function() {
            assert.lengthOf(foo, 3, 'foo must be a string with length 3')
        })
        it('foo should be equal to "bar"', function() {
            assert.equal(foo, 'bar', '')
        })
    })
}

let expectUsage = () => {
    let expect = require('chai').expect
    let foo = 'bar'
    let beverages = {
            'tea': ['chai', 'mocha', 'oolong']
        }
    let goodFn = () => {}
    let deepObj = { foo: {bar: { baz: 'quux' }}}
    describe('expect chainable style', function() {
        it('foo String', function() {
            expect(foo).to.be.a('string').to.equal('bar').to.have.lengthOf(3)
        })
        it('beverages Array', function() {
            expect(beverages).to.have.property('tea').with.lengthOf(3)
        })
        it('good function', function() {
            expect(goodFn).to.not.throw(Error)
        })
        it('deep object', function() {
            expect(deepObj).to.have.deep.property('foo.bar.baz', 'quux')
            expect(deepObj).to.have.any.keys('foo')
        })
    })
}

let shouldUsage = () => {
    require('chai').should()
    // chai.should()

    describe('Array', function() {
        describe('#indexOf()', function() {
            it('should return -1 when the value is not present', function() {
                [1, 2, 3].indexOf(5).should.equal(-1);
                [1, 2, 3].indexOf(0).should.equal(-1)
            })
        })
    })
}

// assertUsage()

expectUsage()

// shouldUsage()

describe('hook', function () {
    before(function() {
        // runs before all tests in this block
    })

    after(function() {
        // runs after all tests in this block
    })

    beforeEach(function() {
        // runs before each test in the block
    })

    afterEach(function() {
        // runs after each test in the block
    })

    // test cases
})