function wait(ms) {
  new Promise(r => setTimeout(r, ms))
}

async function hello() {
  await wait(100);
  return 'world';
}

// hello().then(value => console.log(value))

async function foo() {
  await wait(500);
  throw Error('bar')
}

// foo().catch(e => console.log(e))

function fetch(url) {
  new Promise(r => setTimeout(r, 100))
}

const jsonPromises = ['1', '2', '3'].map(async url => {
  const response = await fetch(url);
  return response && response.json()
})