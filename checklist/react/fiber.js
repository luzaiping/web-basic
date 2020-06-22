/* eslint-disable no-param-reassign */
const TEXT_TYPE = 'TEXT_ELEMENT';
let nextUnitOfWork = null;

const isValidProp = key => key !== 'children';

function createTextElement(text) {
  return {
    type: TEXT_TYPE,
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      )
    }
  };
}

/**
 * 实现 fiber -> dom
 * @param {Object} fiber
 */
function createDom(fiber) {
  const dom =
    fiber.type === TEXT_TYPE
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter(isValidProp)
    .forEach(key => {
      dom[key] = fiber.props[key];
    });

  return dom;
}

// 设置初始 nextUnitOfWork
function render(element, container) {
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element]
    }
  };
}

function performUnitOfWork(fiber) {
  // first create a new node and append it to the DOM.
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;

  while (index < elements.length) {
    const element = elements[index];

    // for each child, we create a new fiber
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) return fiber.child;

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}

function workLoop(deadLine) {
  let shouldYield = false;

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadLine.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

const SReactDOM = {
  render
};

const SReact = {
  createElement
};

const element = SReact.createElement(
  'div',
  { id: 'foo' },
  SReact.createElement('a', null, 'bar'),
  SReact.createElement('b')
);

const container = document.getElementById('root');

SReactDOM.render(element, container);

requestIdleCallback(workLoop);
