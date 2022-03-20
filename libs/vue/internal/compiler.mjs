/* eslint-disable import/extensions */
import { isELementNode, isDirective, isEventName } from './utils.mjs';
import compilerUpdater from './updater.mjs';

export default class Compiler {
  constructor(el, vm) {
    this.el = isELementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    this.init();
  }

  init() {
    // 1. 获取文档碎片对象 放入内存中以减少页面回流和重绘
    const fragement = this.nodeToFragement();

    // 2. 编译模板内容, 将 插值 和 指令 转换成 data 中对应的值
    this.compile(fragement);

    // 3. 添加 fragement 到根元素上
    this.el.appendChild(fragement);
  }

  nodeToFragement() {
    const fragement = document.createDocumentFragment();
    let nextChild = this.el.firstChild;
    while (nextChild) {
      fragement.appendChild(nextChild);
      nextChild = this.el.firstChild;
    }
    return fragement;
  }

  /**
   * 编译模板: 处理节点, 根据节点类型相应按 元素 或者 文本 类型进行处理
   * 如果节点还有子节点, 就递归处理
   * @param fragement 包含内容的 fragement
   */
  compile(fragement) {
    const { childNodes } = fragement;
    [...childNodes].forEach(child => {
      if (isELementNode(child)) {
        // 编译元素节点
        this.compileElementNode(child);
      } else {
        // 编译文本节点
        this.compileTextNode(child);
      }

      // 递归处理子节点
      if (child.childNodes && child.childNodes.length > 0) {
        this.compile(child);
      }
    });
  }

  /**
   * 编译元素类型的 node, 获取节点的 attributes, 只处理 directive attribute
   * @param node 具体节点
   */
  compileElementNode(node) {
    const { attributes } = node;
    [...attributes].forEach(attr => {
      const { name, value } = attr;
      // name 是 attribute name，要先判断是否是 directive 类型，是的话才处理
      if (isDirective(name)) {
        const [, directiveName] = name.split('-'); // directiveName: text / html / model / on:click
        const [dirName, eventName] = directiveName.split(':'); // dirName: text / html / model / on
        const directiveUpdate = compilerUpdater[`${dirName}Updater`]; // 获取 directive 对应的 updater
        if (directiveUpdate) {
          directiveUpdate(node, value, this.vm, eventName); // 调用 updater 进行内容替换
          node.removeAttribute(`v-${directiveName}`); // 移除 directive attribute
        }
      } else if (isEventName(name)) {
        const [, eventName] = name.split('@');
        compilerUpdater.onUpdater(node, value, this.vm, eventName);
        node.removeAttribute(name); // 移除 directive attribute
      }
    });
  }

  // 编译文本节点 {{}}
  compileTextNode(node) {
    const { textContent: content } = node;
    // 处理 插值 类型的文本节点
    if (/\{\{(.+?)\}\}/.test(content)) {
      compilerUpdater.textUpdater(node, content, this.vm);
    }
  }
}
