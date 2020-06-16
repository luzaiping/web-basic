const HASH = {
  INDEX: 'index',
  NOT_FOUND: '404',
  ERROR: 'error'
};

class HashRouter {
  constructor() {
    this.routers = {};
    window.addEventListener('hashchange', this.load.bind(this), false);
  }

  register(hash, callback = function() {}) {
    this.routers[hash] = callback;
  }

  registerIndex(callback) {
    this.register(HASH.INDEX, callback);
  }

  registerNotFound(callback) {
    this.register(HASH.NOT_FOUND, callback);
  }

  registerError(callback) {
    this.register(HASH.ERROR, callback);
  }

  load() {
    let handler;
    try {
      // if (event) {
      //   console.log(`新url: ${event.newURL}, 旧url: ${event.oldURL}`);
      // }
      const hash = window.location.hash.slice(1);

      if (hash && !Object.prototype.hasOwnProperty.call(this.routers, hash)) {
        handler = this.routers[HASH.NOT_FOUND];
      } else {
        handler = this.routers[hash || HASH.INDEX];
      }
      handler && handler.call(this);
    } catch (error) {
      handler = this.routers[HASH.ERROR];
      handler && handler.call(this);
    }
  }
}

const router = new HashRouter();
const container = document.getElementById('container');

router.registerIndex(() => {
  container.innerHTML = '我是首页';
});

router.register('/page1', () => {
  container.innerHTML = '我是page1';
});

router.register('/page2', () => {
  container.innerHTML = '我是page2';
});

router.register('/page3', () => {
  container.innerHTML = '我是page3';
});

router.register('/page4', () => {
  throw new Error('something went wrong');
});

router.registerNotFound(() => {
  container.innerHTML = '页面找不到了';
});

router.registerError(() => {
  container.innerHTML = '页面出错了';
});

router.load();
