let sinon = require('sinon')
let expect = require('chai').expect

function once(fn) {
    var returnValue, called = false

    return function() {
        if( !called ) {
            called = true
            returnValue = fn.apply(this, arguments)
            return returnValue
        }
    }
}

const spyCase = () => {
    describe('sinon spy case', function() {
        it('spy once', function() {
            let callback = sinon.spy()
            let proxy = once(callback)

            proxy()
            proxy()
            proxy()

            expect(callback.calledOnce).to.ok
            expect(callback.callCount).to.equal(1)
        })
    })
}

const stubCase = () => {
    describe('sinon stub case', function() {
        it('returns the return value from the original function', function() {
            let callback = sinon.stub().returns(42)
            let proxy = once(callback)

            expect(proxy()).to.equal(42)
        })
    })
}

const ajaxCase = () => {

    let jQuery = {
        ajax: function() {
            //
        }
    }

    function getTodos(listId, callback) {
        jQuery.ajax({
            url: `/todo/${listId}/items`,
            success: function (data) {
                callback(null, data)
            }
        })
    }

    after(function() {
        jQuery.ajax.restore()
    })

    describe('ajax case using stub', function() {
        it('makes a GET request for todo items', function() {
            sinon.stub(jQuery, 'ajax')

            getTodos(42, sinon.spy())

            expect(jQuery.ajax.calledWithMatch( {url: 'todo/42/items'} ))
        })
    })

}

const fakeXHR = () => {
    let xhr, requests

    before(function() {
        xhr = sinon.useFakeXMLHttpRequest()
        requests = []
        xhr.onCreate = function(req) {
            requests.push(req)
        }
    })

    after(function() {
        xhr.restore()
    })

    it('makes a GET request for todo items', function () {
        getTodos(42, sinon.spy())
        expect(requests.length).to.equal(1)
        expect(requests[0].url).to.equal('todo/42/items')
    })
}

// stubCase()

ajaxCase()

// fakeXHR()