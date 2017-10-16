function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x)
        }, 2000)
    })
}

async function add1(x) {
    let a = await resolveAfter2Seconds(20)
    let b = await resolveAfter2Seconds(30)
    return x + a + b
}

async function add2(x) {
    const p_a = resolveAfter2Seconds(20)
    const p_b = resolveAfter2Seconds(30)
    return x + p_a + p_b
}

add1(10).then( value => {
    console.log(value) // print 60 after 4 seconds
})

add2(10).then(value => {
    console.log(value) // print 60 after 2 seconds
})