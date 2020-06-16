/* eslint-disable prefer-template */
const ROUTRES = {
  NOT_FOUND: '404',
  HOME: '/',
  ERROR: 'error'
};

class HistoryRouter {
  constructor() {
    this.routers = {};
    this.listenPopState();
    this.listenLink();
  }

  listenPopState() {
    window.addEventListener('popstate', e => {
      const { state = {} } = e || {};
      const { path = '' } = state;
      this.dealPathHandler(path);
    });
  }

  listenLink() {
    window.addEventListener('click', e => {
      const { target } = e;
      const hrefValue = target.getAttribute('href');
      if (target.tagName.toUpperCase() === 'A' && hrefValue) {
        e.preventDefault();
        this.assign(hrefValue);
      }
    });
  }

  // 用于首次进入页面时调用
  load() {
    const { pathname } = window.location;
    this.dealPathHandler(pathname);
  }

  register(path, callback = function() {}) {
    path && (this.routers[path] = callback);
  }

  registerIndex(calback) {
    this.register(ROUTRES.HOME, calback);
  }

  registerNotFound(callback) {
    this.register(ROUTRES.NOT_FOUND, callback);
  }

  registerError(callback) {
    this.register(ROUTRES.ERROR, callback);
  }

  // 跳转到指定路径，需要往 session histroy 添加记录
  // 同时触发 path handler, 执行路径变化后所对应的处理函数 (通常就是更新 UI)
  assign(path) {
    window.history.pushState({ path }, null, path);
    this.dealPathHandler(path);
  }

  replace(path) {
    window.history.replaceState({ path }, null, path);
    this.dealPathHandler(path);
  }

  dealPathHandler(path) {
    let handler;
    if (path && !Object.prototype.hasOwnProperty.call(this.routers, path)) {
      handler = this.routers[ROUTRES.NOT_FOUND];
    } else {
      handler = this.routers[path || ROUTRES.HOME];
    }

    try {
      handler && handler.call(this);
    } catch (e) {
      handler = this.routers[ROUTRES.ERROR];
      handler && handler.call(this, e);
    }
  }
}

const router = new HistoryRouter();
const container = document.getElementById('container');

// 注册首页回调函数
router.registerIndex(() => {
  container.innerHTML = '我是首页';
});

// 注册其他视图回到函数
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
  throw new Error('抛出一个异常');
});

document.getElementById('btn').onclick = () => router.assign('/page2');

// 注册未找到对应path值时的回调
router.registerNotFound(() => {
  container.innerHTML = '页面未找到';
});
// 注册出现异常时的回调
router.registerError(e => {
  container.innerHTML = '页面异常，错误消息：<br>' + e.message;
});
// 加载页面
router.load();
