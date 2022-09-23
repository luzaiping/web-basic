const fs = require('fs');

/**
 * To transform a file path to unix style.
 * @param {String} path - file path.
 * @returns file path with unix style.
 */
function toUnixPath(path) {
  return path.replace(/\\/g, '/');
}

/**
 *
 *
 * @export
 * @param {string} modulePath - absolute path of module
 * @param {Array} extensions - extension config array
 * @param {string} originalModulePath - original required path
 * @param {string} moduleContext - context of module
 * @return {string}
 */
function tryExtensions(
  modulePath, // absolute path of
  extensions,
  originalModulePath,
  moduleContext
) {
  console.log('== extensions ==', extensions);
  extensions.unshift('');
  // eslint-disable-next-line no-restricted-syntax
  for (const extension of extensions) {
    const filePath = `${modulePath}${extension}`;
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  // 未匹配对应文件
  throw new Error(
    `No module, Error: Can't resolve ${originalModulePath} in  ${moduleContext}`
  );
}

module.exports = {
  toUnixPath,
  tryExtensions
};
