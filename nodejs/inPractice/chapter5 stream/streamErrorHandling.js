/* eslint-disable no-unused-vars */

const fs = require('fs');

/**
 * catch errors generated by a stream.
 */
const catchError = () => {
  const stream = fs.createReadStream('not Found');

  stream.on('error', err => {
    console.trace();
    console.error('Stack: ', err.stack);
    console.error('The error raised was: ', err);
  });
};
catchError();
