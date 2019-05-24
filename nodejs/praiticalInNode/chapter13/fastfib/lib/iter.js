
function iter (n) {
  var current = 0, next;
  for (var i = 0; i < n; i++) {
    swap = current, current = next;
    next = swap + next;
  }
  return current;
}

module.exports = iter;