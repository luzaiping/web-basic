import sinon from 'sinon'
import { expect } from 'chai'

const obj = {
    method: (name) => { return `hello ${name}` },
    method2: () => {}
}

/**
 * spy 用于记录一个函数 调用时的 参数，返回值，this 以及 exception 信息
 */
describe('spy', () => {
    it('#anonymous function', () => {
        let spyObj = sinon.spy() // spy anonymous function
        spyObj()
        expect(spyObj.called).to.be.true
    })

    it('spy object.method', () => {
        let spyObj = sinon.spy(obj, 'method') // spy specific object.method
        let spyObj2 = sinon.spy(obj, 'method2') // spy 另外一个函数
        
        obj.method('world') // 真实调用目标函数
        obj.method('react')

        expect(spyObj.withArgs('world').calledOnce).to.be.true // withArgs(args) 用于检查 spyObj 被调用时的参数是否就是 args
        expect(spyObj.withArgs('react').calledOnce).to.be.true // calledOnce 用于检查特定的 spyObj 是否是被调用一次
        expect(spyObj.callCount).to.equal(2) // callCount 表示被 spy 的函数被调用了多少次
        expect(spyObj2.notCalled).to.be.true // notCalled 表示被 spy 的函数是否没有被调用，true / false

        expect(spyObj.returnValues[0]).to.equal('hello world') // returnValues 返回值的数组
        expect(spyObj.returnValues[1]).to.equal('hello react')

        obj.method2()

        expect(spyObj.calledBefore(spyObj2)).to.be.true // calledBefore 用于表示一个 spyObj 是否在 另外一个 spyObj 前被调用
        expect(spyObj2.calledImmediatelyAfter(spyObj)).to.be.true

        expect(spyObj.calledOn(obj)).to.be.true // calledOn 只要 spyObj 被调用时有一次的 this 是 obj 就返回 true

        let tempFn = obj.method
        tempFn()
        expect(spyObj.callCount).to.equal(3)
        expect(spyObj.alwaysCalledOn(obj)).to.be.false // alwaysCalledOn 用于检测 spyObj 被调用时的 this 是否都是指向 obj
    })
})