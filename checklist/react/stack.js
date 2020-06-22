const TEXT_TYPE = 'TEXT_ELEMENT';

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

const SReact = {
  createElement
};

function render(element, container) {
  // TODO create dom nodes
  const dom =
    element.type === TEXT_TYPE
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isValidProp = key => key !== 'children';
  Object.keys(element.props)
    .filter(isValidProp)
    .forEach(key => {
      dom[key] = element.props[key];
    });

  element.props.children.forEach(child => {
    render(child, dom);
  });

  container.appendChild(dom);
}

const SReactDOM = {
  render
};

const element = SReact.createElement(
  'div',
  { id: 'foo' },
  SReact.createElement('a', null, 'bar'),
  SReact.createElement('b')
);

console.log(element);

/** @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b></b>
//   </div>
// )

const container = document.getElementById('root');

SReactDOM.render(element, container);
