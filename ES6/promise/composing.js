/*Promise.all(['promise1', 'promise2'])
    .then(([result1, result2]) => {
        console.log(`${result1 + result2}`)
    })
    .catch(err => {
        console.error(err)
    })*/


function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

delay(1000).then(() => console.log('2s has passed.'))

