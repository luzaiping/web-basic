/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
/**
 * 实现一个二叉搜索树(BST)
 */

function Node(key) {
  if (typeof new.target !== 'undefined') {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

/**
 * 将指定节点添加到 tree
 * @param {Node} node 父节点
 * @param {Node} newNode 要插入的节点
 */
function insertNode(node, newNode) {
  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode;
    } else {
      insertNode(node.left, newNode);
    }
  } else {
    if (node.right === null) {
      node.right = newNode;
    } else {
      insertNode(node.right, newNode);
    }
  }
}

/**
 * 中序遍历： 左子树---> 根结点 ---> 右子树
 * @param {Node} node 树节点
 * @param {Function} callback 处理节点的函数, 这个就是 visitor pattern
 */
function inOrderTraverseNode(node, callback) {
  if (node !== null) {
    inOrderTraverseNode(node.left, callback);
    callback(node);
    inOrderTraverseNode(node.right, callback);
  }
}

/**
 * 前序遍历：根结点 ---> 左子树 ---> 右子树
 * @param {Node} node 树节点
 * @param {Function} callback 处理节点的函数, 这个就是 visitor pattern
 */
function preOrderTraverseNode(node, callback) {
  if (node !== null) {
    callback(node);
    preOrderTraverseNode(node.left, callback);
    preOrderTraverseNode(node.right, callback);
  }
}

/**
 * 后序遍历：左子树 ---> 右子树 ---> 根结点
 * @param {Node} node 树节点
 * @param {Function} callback 处理节点的函数, 这个就是 visitor pattern
 */
function postOrderTraverseNode(node, callback) {
  if (node !== null) {
    postOrderTraverseNode(node.left, callback);
    postOrderTraverseNode(node.right, callback);
    callback(node);
  }
}

function findMinNode(node) {
  if (node) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
  return null;
}

/**
 * 搜索最小树节点
 * @param {Node} node
 */
function minNode(node) {
  const target = findMinNode(node);
  return target && target.key;
}

function maxNode(node) {
  if (node) {
    while (node && node.right) {
      node = node.left;
    }
    return node.key;
  }
  return null;
}

function searchNode(node, key) {
  if (node) {
    if (node.key < key) {
      return searchNode(node.right, key);
    }
    if (node.key > key) {
      return searchNode(node.left, key);
    }
    return true;
  }

  return false;
}

function removeNode(node, key) {
  if (node === null) {
    return null;
  }

  if (key < node.key) {
    node.left = removeNode(node.left, key);
    return node;
  }

  if (key > node.key) {
    node.right = removeNode(node.right, key);
    return node;
  }

  // by returning null U can assign null to its parent node
  if (node.left === null && node.right === null) {
    node = null;
    return node;
  }

  if (node.left === null) {
    node = node.right;
    return node;
  }

  if (node.right === null) {
    node = node.left;
    return node;
  }

  const aux = findMinNode(node.right);
  node.key = aux.key;
  node.right = removeNode(node.right, aux.key);
  return node;
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    const node = new Node(key);

    if (this.root === null) {
      this.root = node;
    } else {
      insertNode(this.root, node);
    }
  }

  inOrderTraverse(callback) {
    inOrderTraverseNode(this.root, callback);
  }

  preOrderTraverse(callback) {
    preOrderTraverseNode(this.root, callback);
  }

  postOrderTraverse(callback) {
    postOrderTraverseNode(this.root, callback);
  }

  min() {
    return minNode(this.root);
  }

  max() {
    return maxNode(this.root);
  }

  search(key) {
    return searchNode(this.root, key);
  }

  remove(key) {
    this.root = removeNode(this.root, key);
  }
}

module.exports = BinarySearchTree;
