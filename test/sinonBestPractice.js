let sinon = require('sinon')
let expect = require('chai').expect

let Database = {
    save: function() {}
}

function setupNewUser(info, callback) {
    var user = {
        name: info.name,
        nameLowercase: info.name.toLowerCase()
    }

    try {
        Database.save(user, callback)
    } catch(err) {
        callback(err)
    }
}

describe('sinon spy', function() {
    it('should call save once', function() {
        var save = sinon.spy(Database, 'save')

        setupNewUser({ name: 'test' }, function() { })

        save.restore()
        expect(save.called).to.be.ok
        expect(save.callCount).to.equal(1)
    })

    /*
    it('should pass object with correct values to save', function() {
        var save = sinon.stub(Database, 'save')
        var info = { name: 'test' }
        var expectedUser = {
          name: info.name,
          nameLowercase: info.name.toLowerCase()
        }

        setupNewUser(info, function() { })

        expect(save.calledWith(expectedUser)).to.be.ok
    })

    it('should pass the error into the callback if save fails', function() {
      var expectedError = new Error('oops')
      var save = sinon.stub(Database, 'save')
      save.throws(expectedError)
      var callback = sinon.spy()

      setupNewUser({ name: 'foo' }, callback)

      save.restore()
      sinon.assert.calledWith(callback, expectedError)
    })
    */

    it('should pass the database result into the callback', function() {
      var expectedResult = { success: true }
      var save = sinon.stub(Database, 'save')
      save.yields(null, expectedResult)
      var callback = sinon.spy()

      setupNewUser({ name: 'foo' }, callback)

      save.restore()

      expect(callback.calledWith(null, expectedResult)).to.be.ok
      // sinon.assert.calledWith(callback, null, expectedResult);
    })
})
