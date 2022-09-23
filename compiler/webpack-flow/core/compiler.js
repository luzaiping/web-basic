/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');

const { SyncHook } = require('tapable');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const types = require('@babel/types');

const { toUnixPath, tryExtensions } = require('./utils');

class Compiler {
  constructor(options) {
    this.options = options;
    this.rootPath = this.getRootPath();
    this.hooks = {
      run: new SyncHook(),
      emit: new SyncHook(),
      done: new SyncHook()
    };
    // to store all entry
    this.entries = new Set();
    // to store all modules
    this.modules = new Set();
    // to store all chunks
    this.chunks = new Set();
    // to store all output assets
    this.assets = new Set();
    // to store all output filenames
    this.files = new Set();
  }

  /**
   * The base directory, an absolute path, for resolving entry points and loaders from the configuration.
   * get an absolute path for loaders and entry:
   * check whether context is defined in config, and is absolute path. if yes, just return it,
   * otherwise returns the directory of current process.
   * @return {string} an absolute string to the directory that contains loaders and entry files.
   */
  getRootPath() {
    const { context } = this.options;

    return typeof context === 'string' && path.isAbsolute(context)
      ? context
      : toUnixPath(process.cwd());
  }

  run() {
    // this'll emit all plugins running that tap this.hooks.run.
    this.hooks.run.call();
    // create an entry object which value of each key is absolute path in.
    const entryConfig = this.getEntry();
    console.log('== entryConfig ==', entryConfig);
    // build entry module
    this.buildEntryModule(entryConfig);
  }

  /**
   * Convert option.entry to object if its value is string.
   * and then convert each value of object to absolute path if it's not satisfied with path.isAbsolute.
   * @returns {Object} object that value of each entry is absolute path.
   */
  getEntry() {
    let entryObj = Object.create(null);
    const { entry: entryOption } = this.options;
    if (typeof entryOption === 'string') {
      entryObj.main = entryOption;
    } else {
      entryObj = entryOption;
    }

    Object.keys(entryObj).forEach(entryName => {
      const value = entryObj[entryName];
      if (!path.isAbsolute(value)) {
        const absoluteEntryPath = toUnixPath(path.join(this.rootPath, value));
        entryObj[entryName] = absoluteEntryPath;
      }
    });
    return entryObj;
  }

  buildEntryModule(entryConfig) {
    Object.keys(entryConfig).forEach(entryName => {
      const absoluteEntryPath = entryConfig[entryName];
      const entryModule = this.buildModule(entryName, absoluteEntryPath);
      this.entries.add(entryModule);
    });
    console.log('entires ===', this.entries);
    console.log('=== done ==');
  }

  /**
   * 1. using fs to read the content of module.
   * 2. transform module content to expected string using matched loaders.
   * 3.
   *
   * 5. recursion if module dependency exists
   * @param {string} moduleName - the name of module to build
   * @param {string} modulePath - the path of module to build, it should be an absolute path.
   */
  buildModule(moduleName, modulePath) {
    const originalSourceCode = fs.readFileSync(modulePath, 'utf-8');
    this.originalSourceCode = originalSourceCode;
    this.moduleCode = originalSourceCode;
    // apply loader to transform the sourceCode
    // this.handleLoader(modulePath);
    // compiler module
    const module = this.handleWebpackCompiler(moduleName, modulePath);
    return module;
  }

  handleLoader(modulePath) {
    const { rules } = this.options.module;
    rules.forEach(rule => {
      const { test: testRegexp, loader, use = [] } = rule;

      if (testRegexp.test(modulePath)) {
        const matchedLoaders = [];

        if (loader) {
          matchedLoaders.push(loader);
        }
        if (use && use.length > 0) {
          matchedLoaders.push(...use);
        }

        matchedLoaders
          .reverse() // calling loader function from bottom to top
          .filter(Boolean) // filter loader that's empty
          .forEach(loaderPath => {
            const loaderFn = require(loaderPath);
            if (typeof loaderFn === 'function') {
              this.moduleCode = loaderFn(this.moduleCode);
            }
          });
      }
    });
  }

  handleWebpackCompiler(moduleName, modulePath) {
    // get the path of module relative to rootPath and save it as moduleId
    const moduleId = `./${path.relative(this.rootPath, modulePath)}`;
    const moduleConfig = {
      id: moduleId,
      dependencies: new Set(), // save all dependencies of current module
      name: [moduleName]
    };
    // parse moduleCode to ast
    const ast = parser.parse(this.moduleCode, {
      sourceType: 'module'
    });

    traverse(ast, {
      // this is actual babel plugin
      CallExpression: ({ node }) => {
        // if meets require expression
        if (node.callee.name === 'require') {
          const originalRequirePath = node.arguments[0].value; // original require path
          const moduleDirName = path.dirname(modulePath);
          // const moduleDirName = path.posix.dirname(modulePath);
          const dependencyModulePath = tryExtensions(
            path.posix.join(moduleDirName, originalRequirePath),
            this.options.resolve.extensions,
            originalRequirePath,
            moduleDirName
          );
          // 生成 moduleId - 针对于根路径的模块ID 添加进入新的依赖模块路径
          const dependencyModuleId = `./${path.posix.relative(
            this.rootPath,
            dependencyModulePath
          )}`;

          // 通过 babel 修改源代码中的 require 变成 __webpack_require__
          // eslint-disable-next-line no-param-reassign
          node.callee = types.identifier('__webpack_require__');

          // 修改源代码中 require 语句引入的模块地址 调整为相对于根路径的值
          // eslint-disable-next-line no-param-reassign
          node.arguments = [types.stringLiteral(dependencyModuleId)];
          moduleConfig.dependencies.add(dependencyModuleId);
        }
      }
    });

    // based on modified ast to generate new code
    const { code } = generator(ast);
    // set new code to newSourceCode property
    moduleConfig.newSourceCode = code;

    moduleConfig.dependencies.forEach(dependency => {
      const depModule = this.buildModule(moduleName, dependency);
      this.modules.add(depModule);
    });

    return moduleConfig;
  }
}

module.exports = Compiler;
