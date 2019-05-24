module.exports = recurse;

function recurse(n) {
  if (n === 0 || n === 1) return n;
  return recurse(n-1) + recurse(n-2);
}