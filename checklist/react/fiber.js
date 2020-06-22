/* eslint-disable no-param-reassign */

const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
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

function updateDom(dom, prevProps, nextProps) {
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // remove old properties
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = '';
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

/**
 * 创建 fiber 对应的 dom 元素
 * @param {Object} fiber
 */
function createDom(fiber) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  // 将非 children 的 props 添加到 dom 节点上
  // 作为 dom 节点的 attribute
  updateDom(dom, {}, fiber.props);

  return dom;
}

// 这个 render 是 react 16之前的实现方式：
// 不管 element tree 有多大，始终要渲染完才会让出资源
/* function render(element, container) {
  // 根据元素类型创建对应的 dom 元素
  const dom = createDom(element);

  // 递归处理 children
  element.props.children.forEach(child => {
    render(child, dom);
  });

  container.appendChild(dom);
} */

let nextUnitOfWork = null;
let WIPRoot = null; // WIP: work-in-progress
let currentRoot = null;
let deletions = null;

function commitWork(fiber) {
  if (!fiber) return;

  const domParent = fiber.parent.dom;
  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom);
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom !== null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function commitRoot() {
  // TODO add nodes to dom
  deletions.forEach(commitWork);
  commitWork(WIPRoot.child);
  currentRoot = WIPRoot;
  WIPRoot = null;
}

// set nextUnitOfWork to the root of the fiber tree
function render(element, container) {
  WIPRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot
  };
  nextUnitOfWork = WIPRoot;
  deletions = [];
}

function reconcileChildren(WIPFiber, elements) {
  let index = 0;
  let oldFiber = WIPFiber.alternate && WIPFiber.alternate.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber = null;

    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: WIPFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      };
    }

    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: WIPFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      };
    }

    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      WIPFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}

function performUnitOfWork(fiber) {
  // add a dom node
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!nextUnitOfWork && WIPRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
}

// browser 会在恰当的时机调用这个函数
requestIdleCallback(workLoop);

const Didact = {
  createElement
};

const DidactDOM = {
  render
};

const container = document.getElementById('root');

const rerender = value => {
  const element = Didact.createElement(
    'div',
    null,
    Didact.createElement(
      'input',
      {
        // eslint-disable-next-line no-use-before-define
        onInput: updateValue,
        value
      },
      null
    ),
    Didact.createElement('h2', null, `Hello ${value}`)
  );

  DidactDOM.render(element, container);
};

function updateValue(e) {
  rerender(e.target.value);
}

rerender('world');

// 下面注释是告知 babel 在转换下面的 jsx
// 时使用我们定义的 Didact.createElement 函数
/** @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );

// console.log('render', JSON.stringify(element));
