/* eslint-disable no-unused-vars */
const fs = require('fs');

function loadModule(filename, module, require) {
  const wrappedSrc = `(function(module, exports, require) {
    ${fs.readFileSync(filename, 'utf8')};
  })(module, module.exports, require);`;
  // eslint-disable-next-line no-eval
  eval(wrappedSrc);
}

function requireSimulator(moduleName) {
  console.log(`Require invoked for module: ${moduleName}`);
  const id = requireSimulator.resolve(moduleName);

  if (requireSimulator.cache[id]) {
    return requireSimulator.cache[id].exports;
  }

  const module = {
    exports: {},
    id
  };

  requireSimulator.cache[id] = module;

  loadModule(id, module, requireSimulator);

  return module.exports;
}

requireSimulator.resolve = moduleName => moduleName || '';

requireSimulator.cache = {};

const result = requireSimulator('./test.js');
result.sayHi();
