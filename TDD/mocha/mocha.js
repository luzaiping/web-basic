import { expect } from 'chai'

/*describe('hook', function () {
    before('hook descript, optional', function() {
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
})*/

let syncCase = () => {
    describe('Array', function() {
        describe('#indexOf', function() {
            it('should equal -1 when the value is not present.', function() {
                expect([1, 2, 3].indexOf(4)).to.equal(-1)
            })
        })

        describe('#includes', function() {
            it('should be false when the value is not present.', function() {
                expect([1, 2, 3].includes(4)).to.be.false
            })
            it('should include when the value is present', function() {
                expect([1, 2, 3]).to.include(1)
            })
        })
    })
}

let asynCase = () => {
    let Ajax = require('../../Browser/mockAjax')
    describe('Ajax', function() {
        describe('#load', function() {
            it('should return the load result', function (done) {
                Ajax.load('url', function(result) {
                    expect(result).to.equal('asyn result')
                    done()
                })
            })
        })
    })
}

let promiseCase = () => {
    var promise = require('../../ES6/promise/promiseTest')
    describe('promiseTest', function() {
        it('#resolve should return 1', function(done) {
            promise.then(function(result) {
                expect(result).to.equal(1)
                done()
            }, function(err) {
                done(err)
            })
        })
    })
}

let pendingCase = () => {
    describe('Array', function() {
        describe('#indexOf()', function() {
            // pending test below
            it('a pending test case because no callback is providing');
        });
        })
}

/**
 * only should not be committed to version constrol (such as git)
 */
let onlyCase = () => {
    describe('Array', function () {
        it.only('only this test case is executed.', function () {
            expect([1, 2, 3].includes(1)).to.be.true
        })

        it('this test case will not executed.', function () {
            expect([1, 2, 3].indexOf(1)).to.equal(0)
        })
    })
}

let skipCase = () => {
    describe.skip('this suite will not executed. because skip is used. but recored as pending case', function () {
        it('only this test case is executed.', function () {
            expect([1, 2, 3].includes(1)).to.be.true
        })

        it('this test case will not executed.', function () {
            expect([1, 2, 3].indexOf(1)).to.equal(0)
        })
    })
}

let dynamicCase = () => {
    function add(...args) {
        return args.reduce( (prev, current) => {
            return prev + current
        }, 0)
    }

    let data = [
        { args: [1, 2], expected: 3 },
        { args: [1, 2, 3], expected: 6 },
        { args: [1, 2, 3, 4], expected: 10 }
    ]

    for (let datum of data) {
        let { args, expected } = datum
        it(`correctly adds ${args.length} args`, function () {
            expect(add(...args)).to.equal(expected)
        })
    }
}

let slowCase = () => {
    describe('something slow', function () {
        this.slow(5000)
        it('should take long time to execute this', function () {
            expect(1).to.equal(1)
        })
    })
}

syncCase()
asynCase()
promiseCase()
pendingCase()
// onlyCase()
skipCase()
dynamicCase()
slowCase()