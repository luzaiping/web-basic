/* eslint-disable no-unused-vars */
/**
 * 高性能渲染10万条数据 (时间分片)
 */

const container = document.getElementById('container');
const total = 100000;

function createNode(prefixStr = '') {
  const li = document.createElement('li');
  // eslint-disable-next-line no-bitwise
  li.innerText = `${prefixStr}${~~(Math.random() * total)}`;
  return li;
}

/**
 * dom 操作，导致页面 reflow -> repaint -> composite
 * 大量这种操作导致 GUI 线程占用太多时间
 */
function navieLoop() {
  const now = Date.now();
  for (let i = 0; i < total; i++) {
    container.appendChild(createNode());
  }
  // 页面渲染之前执行这句
  console.log('JS运行时间：', Date.now() - now);
  setTimeout(() => {
    // 渲染完成后执行 callback
    console.log('总运行时间：', Date.now() - now);
  }, 0);
}

// navieLoop();

function patchInsert(pageCount, curIndex, parent = container) {
  for (let i = 0; i < pageCount; i++) {
    const prefixStr = `${curIndex + i} : `;
    parent.appendChild(createNode(prefixStr));
  }
}

/**
 * 使用 setTimtout 按时间分批插入
 * 确定：setTimeout 的执行时机不确定，如果滑动比较快，会发现页面会有空白的情形
 */
function useTimer() {
  const pageSize = 20; // 每页多少条
  const currentIndex = 0;

  function loop(currentTotal, curIndex) {
    if (currentTotal < 0) return;
    const pageCount = Math.min(currentTotal, pageSize); // 实际每页渲染的条数

    setTimeout(() => {
      patchInsert(pageCount, curIndex);
      loop(currentTotal - pageCount, curIndex + pageCount);
    }, 0);
  }

  loop(total, currentIndex);
}

// useTimer();

// useRequestAnimationFrame();
function useRequestAnimationFrame() {
  const pageSize = 20; // 每页多少条
  const currentIndex = 0; // 当前渲染的索引

  function loop(currentTotal, curIndex) {
    if (currentTotal < 0) return;
    // // 实际每页渲染的条数，以当前总条数 和 默认每页数取最小值
    const pageCount = Math.min(currentTotal, pageSize);

    requestAnimationFrame(() => {
      patchInsert(pageCount, curIndex);
      loop(currentTotal - pageCount, curIndex + pageCount);
    });
  }
  loop(total, currentIndex);
}

/**
 * 结合 RFA 和 DocumentFragement
 */
function combineRFAWithFragment() {
  const pageSize = 20; // 每页多少条
  const currentIndex = 0; // 当前渲染的索引

  function loop(currentTotal, curIndex) {
    if (currentTotal < 0) return;
    // // 实际每页渲染的条数，以当前总条数 和 默认每页数取最小值
    const pageCount = Math.min(currentTotal, pageSize);

    window.requestAnimationFrame(() => {
      const fragment = document.createDocumentFragment();
      patchInsert(pageCount, curIndex, fragment); // 先添加到 fragement
      container.appendChild(fragment); // 再将 fragement 加到 dom 里
      loop(currentTotal - pageCount, curIndex + pageCount);
    });
  }
  loop(total, currentIndex);
}

combineRFAWithFragment();
