let chai = require('chai')
let expect = chai.expect
let objectUtils = require('../../utils/objectUtils')

describe('objectUtils.js', function() {
    it('#isEmpty', function() {
        let child = Object.create({name: 'Felix'})
        expect(objectUtils.isEmpty(child)).to.be.true
        expect(objectUtils.isEmpty('')).to.be.false
    })
})