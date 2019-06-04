var t = require("babel-types");

/**
 * module.exports = function(babel) {
 *  visitor: {
 *    Identifier(path, state) {},
 *    ASTNodeTypeHere(path, state) {}
 *  }
 * }
 */

module.exports = function(babel) {
  return {
    visitor: {
      BinaryExpression(path) {
        const node = path.node;
        let result;

        if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
          switch (node.operator) {
            case "+":
              result = new Big(node.left.value).plus(node.right.value);
              break;
            case "-":
              result = node.left.value - node.right.value;
              break;
            case "*":
              result = node.left.value * node.right.value;
              break;
            case "/":
              result = node.left.value / node.right.value;
              break;
            case "**":
              let i = node.right.value;
              while (--i) {
                result = result || node.left.value;
                result = result * node.left.value;
              }
              break;
            default:
          }
        }
        if (result !== undefined) {
          path.replaceWith(t.numericLiteral(result));

          let parentPath = path.parentPath;
          parentPath && visitor.BinaryExpression.call(this, parentPath);
        }
      }
    }
  };
};
