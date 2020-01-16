// U want to execute an external application and stream the output
// Spawn is stream-based, it's great for handling large outputs or
// working with data as it's read in.
const childProcess = require('child_process');

// spawn method returns a ChildProcess object containing stdin
// stdout,and stderr stream objects.
/* const child = childProcess.spawn('echo', ['hello', 'world']);
child.on('error', console.error); // Errors are emitted on error event.
child.stdout.pipe(process.stdout); // Output from stdout and stderr can be read as it's available.
child.stderr.pipe(process.stderr); */

//
const cat = childProcess.spawn('cat', ['./messy.txt']);
const sort = childProcess.spawn('sort');
const uniq = childProcess.spawn('uniq');

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
