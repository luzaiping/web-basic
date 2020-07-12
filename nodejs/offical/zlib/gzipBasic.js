/* eslint-disable no-unused-vars */
const { createGzip } = require('zlib');
const { createReadStream, createWriteStream } = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');

const INPUT_FILE = 'input.txt';
const OUTPUT_FILE = 'input.txt.gz';

const source = createReadStream(INPUT_FILE);
const destination = createWriteStream(OUTPUT_FILE);
const gzip = createGzip();

const errorCallback = err => {
  if (err) {
    console.error('发生错误：', err);
    process.exitCode = 1;
  }
};

function basicUsage() {
  pipeline(source, gzip, destination, errorCallback);
}

async function promiseUsage() {
  const pipe = promisify(pipeline);
  try {
    await pipe(source, gzip, destination);
  } catch (e) {
    errorCallback();
  }
}

// basicUsage();

promiseUsage();
