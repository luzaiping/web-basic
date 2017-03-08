function exit() {
    // callback must be synchronous,
    process.on('exit', (code) => {
        console.log(`About to exit with code ${code}`);
    });

    // asynchronous function will be abandoned
    process.on('exit', () => {
        setTimeout(() => {
            console.log('anynchronous function will not be emitted right here');
        }, 0);
    })
}
// process.exit(3);

function warning() {
    process.on('warning', (waring) => {
        console.log(warning.name, waring.message, warning.stack);
    });

    process.setMaxListeners(1);
    process.on('foo', () => {});
    process.on('foo', () => {});
}
// warning();

function signal() {
    // Begin reading from stdin so the process does not exit.
    process.stdin.resume();

    process.on('SIGINT', () => {
        console.log('Received SIGINT.  Press Control-D to exit.');
    });
}

function argv() {
    process.argv.forEach((value, index) => {
        console.log(`${index}: ${value}`);
    });
}
// argv();

function chdir() {
    console.log(`starting directory: ${process.cwd()}`);
    process.chdir('d://');
    console.log(`new directory: ${process.cwd()}`);
}
// chdir();

function cpuUsage() {
    const startUsage = process.cpuUsage();
    const now = Date.now();
    while(Date.now() - now < 500);

    console.log(process.cpuUsage(startUsage));
}
// cpuUsage();

function emitWarning() {
    process.emitWarning('Something Happened!', 'CustomWarning'); // warning, name
    process.on('warning', (warning) => {
        // console.log(warning.name);
        // console.log(warning.message);
    })
}
emitWarning();