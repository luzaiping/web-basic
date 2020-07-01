/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-globals */

(function() {
  function isValidListener(listener) {
    if (typeof listener === 'function') {
      return true;
    }

    if (
      listener &&
      typeof listener === 'object' &&
      typeof listener.listener === 'function'
    ) {
      return isValidListener(listener.listener);
    }

    return false;
  }

  function indexOf(arr, item) {
    let result = -1;
    const toFindItem = typeof item === 'object' ? item.listener : item;

    for (let i = 0, { length } = arr; i < length; i++) {
      if (arr[i].listener === toFindItem) {
        result = i;
        break;
      }
    }

    return result;
  }

  function EventEmitter() {
    this.events = {}; // key 是事件名称，value 是数组，数组的每一项是 object，包含 { listern, once}
  }

  EventEmitter.version = '1.0.0';

  const proto = EventEmitter.prototype;

  proto.on = function(eventName, listener) {
    if (!eventName || !listener) return this;

    if (isValidListener(listener)) {
      throw TypeError('listener should be function.');
    }

    const listeners = this.events[eventName] || [];

    if (indexOf(listeners, listener) === -1) {
      const toPushItem =
        typeof listener === 'object' ? listener : { listener, once: false };

      listeners.push(toPushItem);
    }

    this.events[eventName] = listeners;

    // eslint-disable-next-line consistent-return
    return this; // 方便 chain 调用
  };

  proto.once = function(eventName, listener) {
    return this.on(eventName, { listener, once: true });
  };

  proto.off = function(eventName, listener) {
    const listeners = this.events[eventName];
    if (!listeners || listeners.length === 0) return this;

    const index = indexOf(listeners, listener);

    if (index === -1) return this;

    listeners.splice(index, 1);

    return this;
  };

  proto.emit = function(eventName, args) {
    const listeners = this.events[eventName];
    if (!listeners || listeners.length === 0) return this;

    listeners.forEach(item => {
      item.listener.apply(this, args || []);
      if (item.once) {
        this.off(eventName, item.listener);
      }
    });

    return this;
  };

  proto.allOff = function(eventName) {
    if (eventName && this.events[eventName]) {
      this.events[eventName] = [];
    } else {
      this.events = {};
    }
  };

  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = EventEmitter;
    }
    exports.EventEmitter = EventEmitter;
  } else {
    const root =
      (typeof self === 'object' && self.self === self && self) ||
      (typeof global === 'object' && global.global === global && global) ||
      this ||
      {};
    root.EventEmitter = EventEmitter;
  }
})();
