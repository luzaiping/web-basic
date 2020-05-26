export const addCartAnimmation = (event, callback) => {
  const { pageX, pageY } = event;
  const elem = document.createElement('b');
  elem.classList.add('menu-animated-cart-dot');
  const temp = 18 / window.devicePixelRatio;
  elem.style.left = `${pageX - temp}px`;
  elem.style.top = `${pageY - temp}px`;
  document.body.append(elem);

  setTimeout(() => {
    elem.addEventListener('transitionend', ev => {
      if (ev.propertyName === 'opacity') {
        elem.remove();
        callback();
      }
    });
    elem.classList.add('moving');
  }, 50);
};
