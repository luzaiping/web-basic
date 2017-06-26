
let promise = new Promise( resolve => {
    setTimeout( () => {
        resolve(1)
    }, 100)
})

module.exports = promise
