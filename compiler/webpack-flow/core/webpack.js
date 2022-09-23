const Compiler = require('./compiler');

/**
 * parse shell args to get webpack options from command arguments, and then merge them with input options.
 * @param {Object} options - input option, it's basically config of webpack.config.js
 * @returns {Object} mergedOptions - mergedOptions including both input options and shell options.
 */
function mergeOptions(options = {}) {
  const commandOptions = process.argv.slice(2);
  const shellOptions = commandOptions.reduce((obj, argv) => {
    const [key, value = true] = argv.split('='); // set value to true if it's undefined
    if (key && value) {
      const parsedKey = key.slice(2); // key starts with '--', eg. --progress
      // eslint-disable-next-line no-param-reassign
      obj[parsedKey] = value;
    }
    return obj;
  }, {});
  return {
    ...options,
    ...shellOptions
  };
}

/**
 * This function is using to load plugins defined in webpack config file, calling apply method of each plugin.
 * @param {Array} plugins - array of plugin
 * @param {Compiler} compiler - Compiler instance to run bundling.
 */
function loadPlugin(plugins, compiler) {
  if (Array.isArray(plugins)) {
    plugins.forEach(plugin => {
      plugin.apply(compiler);
    });
  }
}

/**
 * This is core of webpack, including functionality as following:
 * 1. merge input config which is basically options from webpack config file, with shell args.
 * 2. create an new compiler instance with merged options as arguments.
 * 3. load plugins defined in mergedOptions.
 * @param {Object} options - input config from webpack.config.js
 * @returns {Compiler} compiler instance
 */
function webpack(options) {
  const mergedOptions = mergeOptions(options);
  const compiler = new Compiler(mergedOptions);
  loadPlugin(options.plugins, compiler);
  return compiler;
}

module.exports = webpack;
