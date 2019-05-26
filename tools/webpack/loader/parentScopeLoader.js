// a loader is simply a method that takes a string
// the original source file contents(or output from previous loader)
// and returns a new string(or other type), with the transform applied.
module.exports = function parentScopeLoader(source) {
  return '.parent {' + source + '}'
}