let helper = require('./composeHelper')

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
        // value not yet in the new list?
        if (uniqList.indexOf( list[i] ) === -1 ) {
            uniqList.push( list[i] );
        }
    }
    return uniqList
}

function skipShortWord(list) {
    return list.filter(v => v.length > 3)
}

let text = 'what a fuck guy you are! what a bad day it is.'

function one(text) {
    let list = words(text)
    console.log(unique(list))
}

function two(text) {
    console.log(unique(words(text)))
}

// function uniqueWords(text) {
//     return unique(words(text))
// }

one(text)
two(text)

const composed = helper.compose(unique, words)
console.log(composed(text))

const composedES6 = helper.composeES6(unique, words)
console.log(composedES6(text))

const biggerWords = helper.compose(skipShortWord, unique, words)
console.log(biggerWords(text))