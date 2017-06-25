
let promise  = new Promise((resolve) => {
    setTimeout( () => {
        resolve(1)
    }, 1000)
})

module.exports = promise