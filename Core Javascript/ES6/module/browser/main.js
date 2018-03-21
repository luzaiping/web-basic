import {addTextToBody} from './utils.js '

function testFeature() {
  let x = 1

  console.log('check scope: ', x === window.x )
  console.log('check this: ', this === undefined)
  //delete x // strict mode 不能直接 delete 变量
}

testFeature()

addTextToBody('Modules are pretty cool.')