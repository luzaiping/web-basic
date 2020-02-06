exports.loseloseHashCode = function(key) {
  let hash;

  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % 37;
};

exports.djbToHashCode = function(key) {
  let hash = 5381;

  for (let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i);
  }

  return hash % 33;
};

exports.Node = function(key, value) {
  if (typeof new.target !== 'undefined') {
    this.key = key;
    this.value = value;
    this.toString = function() {
      return `[${this.key} - ${this.value}]`;
    };
  }
};
