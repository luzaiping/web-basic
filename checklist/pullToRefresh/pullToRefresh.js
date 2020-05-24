/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
(function() {
  const root =
    // eslint-disable-next-line no-restricted-globals
    (typeof self === 'object' && self.self === self && self) || // 这一行是处理 window 和 webworker
    (typeof global === 'object' && global.global === global && global) || // 这一行是处理 node
    this || // 这个是处理 node vm
    {}; // 这个是处理微信小程序的情形

  // util 方法
  const util = {
    extend(target, ...rest) {
      for (const item of rest) {
        Object.keys(item).forEach(key => {
          target[key] = item[key];
        });
      }
      return target;
    }
  };

  function PullToRefresh(options) {
    this.options = util.extend({}, this.constructor.defaultOptions, options);
    this.init();
  }

  PullToRefresh.VERSION = '1.0.0';

  PullToRefresh.defaultOptions = {
    // 下拉时的文字
    pullText: '下拉以刷新页面',
    // 下拉时的图标
    pullIcon: '&#8675;',
    // 释放前的文字
    relaseText: '释放以刷新页面',
    // 释放后的文字
    refreshText: '刷新',
    // 释放后的图标
    refreshIcon: '&hellip;',
    // 当大于 60px 的时候才会触发 release 事件
    threshold: 60,
    // 最大可以拉到 80px 的高度
    max: 80,
    // 释放后，高度回到 50px
    reloadHeight: 50
  };

  const proto = PullToRefresh.prototype;
  proto.constructor = PullToRefresh;

  // 记录当前状态 pending/pulling/releasing/refreshing
  let _state = 'pending';
  // touchstart 时 Y 轴的位置
  let pullStartY = null;
  // touchmove 时 Y 轴的位置
  let pullMoveY = null;
  // 手指移动的距离
  let dist = 0;
  // refresh-element 要移动的距离，跟手指距离的值不同，因为要有阻尼效果
  let distResisted = 0;
  // 是否支持 passive 事件，传递 passive 为 true 来明确告诉浏览器，事件处理程序不会调用 preventDefault 来阻止默认滑动行为
  let supportsPassive = false;

  const ELEMENT_IDENTITY = 'refresh-element';

  proto.init = function() {
    // 创建下拉元素和添加对应的样式
    this.createRefreshElement();
    this.setRefreshStyle();

    // 获取下拉元素
    this.getElement();

    // 判断是否支持 passive
    this.supportsPassive();

    // 绑定事件
    this.bindEvent();
  };

  proto.createRefreshElement = function() {
    const elem = document.createElement('div');
    if (this.options.target !== 'body') {
      const targetElem = document.getElementById(this.options.target); // 获取目标元素
      targetElem.parentNode.insertBefore(elem, targetElem); // 将 elem 插入到目标元素的前面
    } else {
      document.body.insertBefore(elem, document.body.firstChild); // 将 elem 插入到 body 的最前面
    }

    elem.className = ELEMENT_IDENTITY;
    elem.id = ELEMENT_IDENTITY;
    elem.innerHTML =
      '<div class="refresh-box"><div class="refresh-content"><div class="refresh-icon"></div><div class="refresh-text"></div></div></div>';
  };

  proto.setRefreshStyle = function() {
    const styleElem = document.createElement('style');
    styleElem.setAttribute('id', 'refresh-element-style');
    document.head.appendChild(styleElem);
    styleElem.textContent = `
      .refresh-element {
        pointer-events: none;
        font-size: 0.85em;
        top: 0;
        height: 0;
        transition: height 0.3s, min-height 0.3s;
        text-align: center;
        width: 100%;
        overflow: hidden;
        color: #fff;
      }
      .refresh-box { padding: 10px; }
      .pull { transition: none; }
      .refresh-text { margin-top: .33em; }
      .refresh-icon { transition: transform .3s; }
      .release .refresh-icon { transform: rotate(180deg); }
    `;
  };

  proto.getElement = function() {
    this.refreshElem = document.getElementById(ELEMENT_IDENTITY);
  };

  // 判断是否支持 passive
  proto.supportsPassive = function() {
    try {
      const obj = Object.defineProperty({}, 'passive', {
        get() {
          supportsPassive = true;
          return true;
        }
      });

      window.addEventListener('test', null, obj);
    } catch (error) {
      console.error(error);
    }
  };

  proto.bindEvent = function() {
    window.addEventListener('touchstart', this);
    window.addEventListener(
      'touchmove',
      this,
      supportsPassive ? { passive: false } : false
    );
    window.addEventListener('touchend', this);
  };

  proto.handleEvent = function(event) {
    const methodName = `on${event.type}`;
    if (this[methodName]) {
      this[methodName](event);
    }
  };

  /**
   * 判断是否可以下拉刷新：只有 window.scrollY 是 0，才需要触发下拉刷新
   */
  proto.shouldPullToRefresh = function() {
    return !window.scrollY;
  };

  // 根据状态更新文本
  proto.update = function() {
    const iconEl = this.refreshElem.querySelector('.refresh-icon');
    const textEl = this.refreshElem.querySelector('.refresh-text');

    // 设置图标的内容，刷新 或者 下拉
    iconEl.innerHTML =
      _state === 'refreshing'
        ? this.options.refreshIcon
        : this.options.pullIcon;

    // 下面的逻辑是更新文案
    // 如果状态是 releasing, 就显示 释放以刷新页面
    if (_state === 'releasing') {
      textEl.innerHTML = this.options.relaseText;
    }

    // 状态是 pulling 或者 pending，就显示 下拉以刷新页面
    if (_state === 'pulling' || _state === 'pending') {
      textEl.innerHTML = this.options.pullText;
    }

    // 状态时 refreshing，就显示刷新
    if (_state === 'refreshing') {
      textEl.innerHTML = this.options.refreshText;
    }
  };

  proto.ontouchstart = function(e) {
    if (this.shouldPullToRefresh()) {
      // 设置开始下拉刷新时的屏幕垂直位置
      pullStartY = e.touches[0].screenY;
    }

    // 如果当前状态不是 pending, 就什么都不做，直接返回
    // 即如果正在刷新，下拉或者释放，就什么都不做
    if (_state !== 'pending') {
      return;
    }

    // 设置状态为 pending
    _state = 'pending';

    // 更新 图标 和 文字
    this.update();
  };

  proto.resistanceFunction = function(t) {
    return Math.min(1, t / 2.5);
  };

  proto.ontouchmove = function(e) {
    // 记录当前屏幕垂直位置
    pullMoveY = e.touches[0].screenY;

    // 当前状态是刷新的话，直接返回
    if (_state === 'refreshing') {
      return;
    }

    // 当前状态是 pending，即刚开始下拉
    // 状态应该从 pending 切换到 pulling
    if (_state === 'pending') {
      // 添加 pull className, 覆盖 transition 为 null
      // 即去掉 transition
      this.refreshElem.classList.add('pull');

      // 设置状态为 下拉
      _state = 'pulling';

      // 更新图标和文案
      this.update();
    }

    // 计算手指移动距离, 移动后的位置减去开始位置
    if (pullStartY && pullMoveY) {
      dist = pullMoveY - pullStartY;
    }

    // 移动距离大于 0
    if (dist > 0) {
      e.preventDefault();

      // 设置最小高度，通过这个逐步显示出内容来
      // 因为 height 设置为 0
      this.refreshElem.style.minHeight = `${distResisted}px`;

      // 计算阻尼距离
      distResisted =
        this.resistanceFunction(dist / this.options.threshold) *
        Math.min(this.options.max, dist);

      // 还是下拉状态时，手指移动距离大于 thresold (60px), 将状态 从 pulling 切换成 releasing
      if (_state === 'pulling' && distResisted > this.options.threshold) {
        // 添加 release class, 用于翻转图标 rotate(180deg)
        this.refreshElem.classList.add('release');

        // 状态改为 releasing
        _state = 'releasing';

        this.update();
      }

      // 从 releasing 切换成 pulling, 在 thresold 的位置上下移动，就可以一直在
      // releasing 和 pulling 状态切换
      if (_state === 'releasing' && distResisted < this.options.threshold) {
        // 移除 release 类，这样图标就不会翻转
        this.refreshElem.classList.remove('release');

        // 将状态切换为 下拉状态
        _state = 'pulling';

        // 更新文案 和 图标
        this.update();
      }
    }
  };

  proto.ontouchend = function() {
    // 下拉状态，并且手指移动距离大于阈值
    if (_state === 'releasing' && distResisted > this.options.threshold) {
      // 将状态为 refreshing
      _state = 'refreshing';

      // 调整整体高度
      this.refreshElem.style.minHeight = `${this.options.reloadHeight}px`;
      // 添加 refresh 类
      this.refreshElem.classList.add('refresh');

      // 如果有提供 onRefresh 回调，就调用 onRefresh, 入参是 onReset
      if (typeof this.options.onRefresh === 'function') {
        this.options.onRefresh(this.onReset.bind(this));
      }
    } else {
      // 如果状态还是刷新，就直接返回。就是没拉到可以 release 的状态就释放
      if (_state === 'refreshing') {
        return;
      }
      // 将最小高度设置为 0
      this.refreshElem.style.minHeight = '0px';

      // 恢复状态为 pending
      _state = 'pending';
    }

    // 触摸结束后，要再更新文案和图标
    this.update();

    // 移除 release 和 pull 类
    this.refreshElem.classList.remove('release');
    this.refreshElem.classList.remove('pull');

    // 设置几个内部变量的值
    pullStartY = pullMoveY = null;
    dist = distResisted = 0;
  };

  proto.onReset = function() {
    this.refreshElem.classList.remove('refresh');
    this.refreshElem.style.minHeight = '0px';
    _state = 'pending';
  };

  if (typeof exports !== 'undefined' && !exports.nodeType) {
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = PullToRefresh;
      module.exports = PullToRefresh;
    }
    exports.PullToRefresh = PullToRefresh;
  } else {
    root.PullToRefresh = PullToRefresh;
  }
})();
