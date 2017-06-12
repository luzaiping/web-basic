var expect = require('chai').expect

let syncUsage = () => {
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

syncUsage()

let asynUsage = () => {
    let Ajax = require('../Browser/mockAjax')
    describe('Ajax', function() {
        describe('#load', function() {
            it('should return the load result', function(done) {
                Ajax.load('url', function(result) {
                    expect(result).to.equal('asyn result')
                })
                done()
            })
        })
    })
}

let promiseUsage = () => {
    var promise = require('../ES6/promise/promiseTest')

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

asynUsage()
promiseUsage()
