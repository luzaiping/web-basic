/* eslint-disable no-unused-vars */

/**
 * You want to access a file that isn’t handled by the module system.
 * use __dirname or __filename to determine the location of the file.
 */ 
const workingWithPaths = () => {
  console.log('__dirname: %s', __dirname);
  console.log('__filename: %s', __filename);
}
// workingWithPaths();

/**
 * You need to run platform-specific code based on operating system or processor architecture
 * use the procee.arch and process.platfrom properties
 */

const doBasedOnArch = () => {
  switch (process.arch) {
    case 'x64':
      // require('./lib.x64.node');
      console.log('you are running in x64 architecture.');
      console.log('currenting memoryUsage():', process.memoryUsage());
      break;
      case 'x32':
        console.log('you are running in x32 architecture.');
        console.log('currenting memoryUsage():', process.memoryUsage());
      break;
    default:
      throw new Error('Unsupported process.arch:', process.arch);
  }
};
// doBasedOnArch();

/**
 * Node programs can respond to signals send by other processes.
 * when You need to respond to signals sent by other processes.
 * Use the signal events that are sent to the process object.
 */
const signals = () => {
  process.stdin.resume();
  process.on('SIGHUP', () => {
    console.log('Reloading configuration...');
  });
  console.log('PID: ', process.pid);
}