function partical(fn, ...presetArgs) {
    return function particallyApplied(...laterArgs) {
        return fn(...presetArgs, ...laterArgs)
    }
}

function ajax(url, data, callback) {
    console.log(url, data, callback)
}

let getPerson = partical(ajax, 'http://xxx.com/person')
let getOrder = partical(ajax, 'http://xxx.com/order')
let getCurrentPersonVersion1 = partical(ajax, 'http://xxx.com/person', { userId: 1111 })
let getCurrentPersonVerson2 = partical(getPerson, { userId: 1111 })

// version1
let getCurrentUserVersion1 = function particallyApplied(...laterArgs) {
    return ajax('http://xxx.com/person', { userId: 1111 }, ...laterArgs)
}

// verson2
let getCurrentUser = function outerParticallyApplied(...outerLaterArgs) {
    let getPerson = function(...innerLaterArgs) {
        return ajax('http://xxx.com/person', ...innerLaterArgs)
    }
    getPerson({ userId: 1111 }, ...outerLaterArgs)
}

function add(x, y) {
    return x + y
}

/*[1, 2, 3, 4, 5].map(function(value) {
    return add(3, value)
})*/

[2, 3, 3, 4, 5].map(partical(add, 3))

module.exports = { partical }