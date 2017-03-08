const spawn = require('child_process').spawn;

const ls = spawn('ls', ['-lh', '/'])

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
});