let immediate = setImmediate(() => {
    console.log('set immediate');
    clearImmediate(immediate);
});

let timeout = setTimeout(() => {
    console.log('set timeout');
    clearTimeout(timeout);
}, 0);

