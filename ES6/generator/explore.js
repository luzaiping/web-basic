function simpleCase() {
	function* genFunc() {
		console.log('First');
		yield;
		console.log('Second');
	}

	const genObj = genFunc();
	genObj.next();
	genObj.next();
}

// implements iterable
function iterableUsage() {

	function* objectEntries(obj) {
		const propKeys = Reflect.ownKeys(obj);
		for (const key of propKeys) {
			yield [key, obj[key]];
		}
	}

	const obj = { name: 'perry', sex: 'male', age: 98};
	const iterable = objectEntries(obj);

	for (const [key, value] of iterable) {
		console.log(`${key}: ${value}`)
	}

}

// simpler asynchronous code
function simplifyAysnc() {

	// Promise implementation
	function promiseFetch(url) {
		return fetch(url)
				.then(request => request.text())
				.then(text => JSON.parse(text))
				.catch(error => { console.log(`Error: ${error.stack}`)})
	}

	// generator with library co
	const generatorFetch = co.wrap(function* (url) {
		try {
			let request = yield fetch(url);
			let text = yield request.text();
			return JSON.parse(text);
		} catch (error) {
			console.log(`ERROR: ${error.stack}`)
		}
	});

	// async/await implementation
	async function asyncFetch(url) {
		try {
			let request = await fetch(url);
			let text = await request.text();
			return JSON.parse(text);
		} catch (error) {
			console.log(`ERROR: ${error.stack}`)
		}	
	}

	// the above three implementation can be invoked as following:
	xxxFetch('http://example.com/some_file.json').then(obj => console.log(obj));
}