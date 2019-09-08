async function test() {
  // return 123
  throw new Error('Problem!')
}

// test().then(value => console.log(value))
test().catch(error => console.log(error))

/* async function fetchJson(url) {
  try {
    let response = await fetch(url)
    let text = await response.text()
    return JSON.parse(text)
  } catch (error) {
    console.log(`Error: ${error.stack}`)
  }
} */

async function foo() {
  const [result1, result2] = await Promise.all([
    aysncFunc1(),
    aysncFunc2()
  ])
}