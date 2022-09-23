/* eslint-disable class-methods-use-this */
class PluginA {
  apply(compiler) {
    compiler.hooks.run.tap('Plugin A', () => {
      console.log('PluginA is called.');
    });
  }
}

module.exports = PluginA;
