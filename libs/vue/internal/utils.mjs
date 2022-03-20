/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
export const isELementNode = node => node.nodeType === 1;

export const isDirective = attrName => attrName.startsWith('v-');

export const getExpressionValue = (expression = '', vm) => {
  return expression.split('.').reduce((data, currentVal) => {
    return data[currentVal.trim()];
  }, vm.$data);
};

export const setExpressionValue = (expression = '', vm, newVal) => {
  expression.split('.').reduce((data, currentVal) => {
    data[currentVal.trim()] = newVal;
  }, vm.$data);
};

export const isEventName = eventName => {
  return eventName.startsWith('@');
};
