let composeHelper = require('./composeHelper')
let particalHelper = require('../chapter3/particalHelper')

function words(str) {
    return String(str)
            .toLowerCase()
            .split( /\s|\b/ )
            .filter( function alpha(v){
                return /^[\w]+$/.test( v )
            })
}

function unique(list) {
    var uniqList = []
    for (let i = 0; i < list.length; i++) {
        if (uniqList.indexOf( list[i] ) === -1 ) {
            uniqList.push( list[i] );
        }
    }
    return uniqList
}

function skipShortWord(list) {
    return list.filter(v => v.length > 3)
}

function skipLongWord(list) {
    return list.filter(v => v.length < 4)
}

let text = 'what a fuck guy you are! what a bad day it is.'

function one(text) {
    let list = words(text)
    console.log(unique(list))
}

function two(text) {
    console.log(unique(words(text)))
}

one(text)
two(text)

const composed = composeHelper.compose(unique, words)
console.log(composed(text))

const composedES6 = composeHelper.composeES6(unique, words)
console.log(composedES6(text))

// const biggerWords = helper.compose(skipShortWord, unique, words)
// console.log(biggerWords(text))

const filterWords = particalHelper.particalRight(composeHelper.compose, unique, words)
const biggerWords = filterWords(skipShortWord)
const shorterWords = filterWords(skipLongWord)

const filterWords2 = particalHelper.particalRightAll(composeHelper.compose, words, unique)
const biggerWords2 = filterWords2(skipShortWord)
const shorterWords2 = filterWords2(skipLongWord)

console.log(biggerWords(text))
console.log(shorterWords(text))

console.log(biggerWords2(text))
console.log(shorterWords2(text))

// another compose
console.log(composeHelper.composeReduceUnary(unique, words)(text))
console.log(composeHelper.pipe(words, unique)(text))
console.log(composeHelper.pipeUsingRevert(unique, words)(text))