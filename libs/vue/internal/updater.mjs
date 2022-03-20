/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import { getExpressionValue, setExpressionValue } from './utils.mjs';
import Watcher from './watcher.mjs';

const getContentVal = (expr, vm) => {
  return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
    const actualExpression = args[1];
    return getExpressionValue(actualExpression, vm);
  });
};

export default {
  /**
   * 文本
   * @param { Node } node - element node to update
   * @param { string } expression - such as {{ expression }} or expression
   * @param { object } vm - Vue instance
   */
  textUpdater(node, expression, vm) {
    let textContent;
    if (expression.indexOf('{{') !== -1) {
      // 如果是 插值 类型的表达式, 将每一个 {{ expression }} 替换成对应的 value
      textContent = expression.replace(/\{\{(.+?)\}\}/g, (...args) => {
        const actualExpression = args[1];

        new Watcher(vm, actualExpression, () => {
          const contentVal = getContentVal(expression, vm);
          node.textContent = contentVal;
        });

        return getExpressionValue(actualExpression, vm);
      });
    } else {
      textContent = getExpressionValue(expression, vm); // <div v-text='msg'></div>
      new Watcher(vm, expression, newVal => {
        node.textContent = newVal;
      });
    }
    node.textContent = textContent;
  },
  htmlUpdater(node, expression, vm) {
    const value = getExpressionValue(expression, vm);
    new Watcher(vm, expression, newVal => {
      node.innerHTML = newVal;
    });
    node.innerHTML = value;
  },
  modelUpdater(node, expression, vm) {
    const value = getExpressionValue(expression, vm);
    // 绑定 watcher，实现 model -> view
    new Watcher(vm, expression, newVal => {
      node.value = newVal;
    });

    // view => model => view
    node.addEventListener('input', e => {
      setExpressionValue(expression, vm, e.target.value);
    });

    node.value = value; // 这边应该进一步根据元素类型,来决定要将 value 设置到哪个 attribute
  },
  /**
   * 处理 v-on 事件绑定
   * @param {Element} node - element node
   * @param {string} expression - event handler key or event expression
   * @param { Vue } vm - vue instance
   * @param { string } eventName - event name to listen
   */
  onUpdater(node, expression, vm, eventName) {
    let handler = vm.$options.methods && vm.$options.methods[expression];
    if (!handler) {
      // 如果无法从 methods 中获取到 expression 对应的 handler,就构造一个 handler
      handler = function() {
        // eslint-disable-next-line no-eval
        eval(handler);
      };
    }
    node.addEventListener(eventName, handler.bind(vm), false);
  }
};
