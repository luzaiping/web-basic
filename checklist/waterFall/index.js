(function() {
  const items = document.querySelectorAll('.item');
  const gap = 10; // 定义每个item之间的间隙
  const itemWidth = items[0].offsetWidth; // 获取item的宽度，以第一个为准

  function getClient() {
    return {
      width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      height:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
    };
  }

  // scrollTop 兼容
  // function getScrollTop() {
  //   return window.pageYOffset || document.documentElement.scrollTop;
  // }

  function waterFall() {
    const { width: pageWidth } = getClient();
    const columns = parseInt(pageWidth / (itemWidth + gap), 10);
    const arr = []; // 用来存储已排好的元素距离顶部的高度

    for (let i = 0; i < items.length; i++) {
      if (i < columns) {
        items[i].style.top = 0;
        items[i].style.left = `${(itemWidth + gap) * i}px`;
        arr.push(items[i].offsetHeight);
      } else {
        // 先获取当前最小高度的索引及其值
        let minHeight = arr[0]; // 最小高度值 (这边的高度是指当前 item 距离顶部的高度，不是元素本身的高度)
        let minIndex = 0; // 最小高度的索引
        for (let j = 1; j < arr.length; j++) {
          if (arr[j] < minHeight) {
            minHeight = arr[j];
            minIndex = j;
          }
        }

        // 设置新元素的 top, 等于当前最小的元素的高度 + gap
        items[i].style.top = `${arr[minIndex] + gap}px`;

        // 设置新元素的 left，等于最小元素距离左边的 offsetLeft
        items[i].style.left = `${items[minIndex].offsetLeft}px`;

        // 修改最小列的高度
        arr[minIndex] = arr[minIndex] + items[i].offsetHeight + gap;
      }
    }
  }

  window.onload = waterFall;
  window.onresize = waterFall;
})();
