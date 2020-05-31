/* eslint-disable prefer-template */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-continue */
/**
 * 超级无敌小的编译器
 */

/**
 * ============================================================================
 *                                   (/^▽^)/
 *                            词法分析器（Tokenizer）!
 * ============================================================================
 */

/**
 * 我们从第一个阶段开始，即词法分析，使用的是词法分析器(Tokenizer)
 *
 * 我们只是接收代码组成的字符串，然后把它们分割成 token 组成的数组。
 *
 * (add 2 (subtract 4 2)) => [{ type: 'paren', value: '('}, ...]
 */

// 我们从接收一个字符串开始，首先设置两个变量。
function tokenizer(input) {
  // `current` 变量类似指针，用于记录我们在代码字符串中的位置。
  let current = 0;

  // `token` 数组是我们放置 token 的地方
  const tokens = [];
  const inputLength = input.length;

  // 首先我们创建一个 `while` 循环，`current` 变量会在循环中自增。
  //
  // 我们这么做的原因是，由于 token 数组的长度是任意的，所以可能要在单个循环中多次
  // 增加 `current`
  while (current < inputLength) {
    // 我们在这里存储了 `input` 中的当前字符
    let char = input[current];

    // 要做的第一件事情就是检查是不是有右括号。这在之后将会用在 `CallExpression` 中，
    // 但是现在我们关心的只是字符本身。
    //
    // 检查以下是不是一个左圆括号。
    if (char === '(') {
      // 如果是，那么我们 push 一个 type 为 `paren`, value 为左圆括号的对象。
      tokens.push({
        type: 'paren',
        value: '('
      });

      // 自增 `current`
      current++;

      // 结束本次循环，进入下一次循环
      continue;
    }

    // 然后我们检查是不是一个右圆括号。这里做的和之前一样：检查右圆口号、加入新的 token、
    // 自增 `current`, 然后进入下一个循环。
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });
      current++;
      continue;
    }

    // 继续，我们现在检查是不是空格。有趣的是，我们想要空格的本意是分割字符，但现在
    // 对于我们存储的 token 来说不那么重要。我们暂且搁置它。
    //
    // 所以我们只是简单地检查是不是空格，如果是，那么我们直接进入下一个循环。
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // 下一个 token 的类型是数字。它和之前的 token 不同，因为数字可以由多个数字字符组成，
    // 但是我们只能把它们识别为一个 token。
    //
    // (add 123 456)
    //      ^^^ ^^^
    //      only two tokens
    //      这里只有两个 token
    //
    // 当我们遇到一个数字字符时，将会从这里开始
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      // 创建一个 `value` 字符串，用于 push 字符
      let value = '';

      // 然后我们循环遍历接下来的字符，直到我们遇到的字符不再是数字字符为止，把遇到的每
      // 一个数字字符 push 进 `value` 中，然后自增 `current`。
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current]; // 这边会增加 current 获取下一个字符
      }

      // 然后我们把类型为 `number` 的 token 放入 `tokens` 数组中。
      tokens.push({
        type: 'number',
        value
      });

      // 进入下一次循环
      continue;
    }

    // 最后一种类型的 token 是 `name`。 它由一系列的字母组成。这在我们的 lisp 语法中
    // 代表了函数。
    //
    //    add(2, 4)
    //    ^^^
    //    Name Token
    //
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      // 同样，我们用一个循环遍历所有的字母，把它们存入 value 中
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // 然后添加一个类型为 `name` 的 token，然后进入下一次循环。
      tokens.push({
        type: 'name',
        value
      });

      continue;
    }

    // 最后如果 char 没有匹配任何以上任何类型，就抛出类型错误。
    throw new TypeError(`I dont know what this character is ${char}`);
  }

  return tokens;
}

/**
 * ============================================================================
 *                                 ヽ/❀o ل͜ o\ﾉ
 *                             语法分析器（Parser）!!!
 * ============================================================================
 */

/**
 * 语法分析器接收 token 数组，然后把它转换为 AST
 *
 * [{ type: 'paren', value: '('}, ...] => { type: 'Program', body: [...] }
 */

// 现在我们定义 parser 函数，接收 `tokens` 数组
function parser(tokens) {
  // 我们再次声明一个 `current` 变量作为指针。
  let current = 0;

  // 但是这次我们使用递归而不是 `while` 循环，所以我们定义一个 `walk` 函数。
  function walk() {
    // walk 函数里，我们从当前 token 开始
    let token = tokens[current];

    // 对于不同类型的结点，对应的处理方法也不同，我们从 `number` 类型的 token 开始。
    // 检查是不是 `number` 类型
    if (token.type === 'number') {
      // 如果是， `current` 自增。
      current++;

      // 然后我们会返回一个新的 AST 节点 `NumberLiteral`, 并且把它的值设为 token 的值
      return {
        type: 'NumberLiternal',
        value: token.value
      };
    }

    // 接下来我们检查是不是 CallExpression 类型，我们先从左圆括号开始
    if (token.type === 'paren' && token.value === '(') {
      // 我们会自增 `current` 来跳过这个括号，因为括号在 AST 中是不重要的
      token = tokens[++current]; // 获取下一个 token

      // 我们创建一个类型为 `CallExpression` 的根节点，然后把它的 name 属性设置为当前
      // token 的值，因为紧跟在左括号后面的 token 一定是调用函数的名称。
      const node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      };

      // 我们再次自增 `current` 变量，跳过当前的 token
      token = tokens[++current];

      // 现在我们循环遍历接下来的每一个 token，直到我们遇到右括号，这些 token 将会
      // 是 `CallExpression` 的 `params`(参数)
      //
      // 这也是递归开始的地方，我们采用递归的方式来解决问题，而不是尝试去解析一个可能有无限
      // 层嵌套的节点
      //
      // 为了更好地解释，我们来看看我们的 Lisp 代码。你会注意到 `add` 的参数有两个，
      // 一个是数字，另一个是嵌套的 `CallExpression`，这个 `CallExpression` 中
      // 包含了它自己的参数(两个数字)
      //
      // (add 2 (subtract 4 2))
      //
      // 你也会注意到我们的 token 数组有多个右括号。
      //
      // 遇到嵌套的 `CallExpression` 时，我们将会依赖嵌套的 `walk` 函数来
      // 增加 `current` 变量
      //
      // 所以我们创建一个 while 循环，直到遇到类型为 `paren`，值为右括号的 token。
      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        // 我们调用 `walk` 函数，它将返回一个节点，然后我们把这个节点
        // 放入 `node.params` 中。
        node.params.push(walk());
        token = token[++current];
      }

      // 我们最后一次增加 `current`，跳过右括号。
      current++;

      // 返回节点
      return node;
    }

    // 同样，如果我们遇到了一个类型未知的结点，就抛出一个错误。
    throw new TypeError(token.type);
  }

  // 现在我们创建 AST， 根节点是一个类型为 `Program` 的节点
  const ast = {
    type: 'Program',
    body: []
  };

  // 现在我们开始 walk 函数，把节点放入 `ast.body` 中。
  //
  // 之所以在一个循环处理，是因为我们的程序可能在 `CallExpression` 后面包含连续的两个
  // 参数，而不是嵌套的。
  //
  //    (add 2 2)
  //    (substract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // 最后我们的语法分析器返回 AST
  return ast;
}

/**
 * ============================================================================
 *                                 ⌒(❀>◞౪◟<❀)⌒
 *                                   遍历器!!!
 * ============================================================================
 */

/**
 * 现在我们有了 AST, 我们需要一个 visitor 去遍历所有的节点。当遇到某个类型的节点时，我们
 * 需要调用 visitor 中对应类型的处理函数。
 *
 * traverse(ast, {
 *   Program(node, parent){
 *    // ...
 *  }
 *  CallExpression(node, parent) {
 *    // ...
 *  }
 *
 *  NumberLiteral(node, parent) {
 *    // ...
 *  }
 * });
 */

// 我们定义一个遍历器，它有两个参数：AST 和 visitor。在它的里面我们定义两个函数
function traverser(ast, visitor) {
  // `traverseNode` 函数接收一个 `node` 和 它的父节点 `paren` 作为参数，这个节点会被
  // 传入到 visitor 中相应的处理函数里。
  function traverseNode(node, parent) {
    // 首先看看 visitor 中有没有对应 `type` 的处理函数。
    const method = visitor[node.type];

    // 如果有，我们把 `node` 和 `parent` 都传入其中。
    if (method) {
      method(node, parent);
    }

    // 下面我们对每一个不同类型的节点分开处理
    switch (node.type) {
      // 我们从顶层的 `Program` 开始，Program 节点中有一个 body 属性，它是一个由若干个
      // 节点组成的数组，所以我们会调用 `traverseArray`
      //
      // （记住 `traverseArray` 会调用 `traverseNode`， 所以我们会递归地遍历这棵树。）
      case 'Program':
        traverseArray(node.body, node);
        break;

      // 下面我们对 `CallExpression` 做同样的事，遍历它的 `params`
      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      // 如果是 NumberLiteral，那么就没有任何子节点了，所以我们直接 break
      case 'NumberLiteral':
        break;
      default:
        throw new TypeError(node.type);
    }
  }

  // `traverseArray` 允许我们对数组中的每一个函数调用 `tranverseNode`
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  // 最后我们对 AST 调用 `traverseNode`，开始遍历。注意 AST 并没有父结点。
  traverseNode(ast, null);
}

/**
 * ============================================================================
 *                                   ⁽(◍˃̵͈̑ᴗ˂̵͈̑)⁽
 *                                   转换器!!!
 * ============================================================================
 */

/**
 * 下面是转换器。转换器接收我们之前构建好的 AST, 然后把它和 visitor 传递进入我们的遍历器
 * 中，最后得到一个新的 AST
 */

function transformer(ast) {
  // 创建 `newAST`，它与我们之前的 AST 类似，有一个类型为 Program 的根节点。
  const newAst = {
    type: 'Program',
    body: []
  };

  ast._context = newAst.body;

  traverser(ast, {
    NumberLiteral(node, parent) {
      // 我们创建一个新节点，名字叫 `NumberLiteral`，并把它放入父节点的 context 中。
      parent._context.push({
        type: 'NumberLiteral',
        value: node.value
      });
    },

    // 下一个， `CallExpression`
    CallExpression(node, parent) {
      let expression = {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: node.name
        },
        arguments: []
      };

      // 下面我们在原来的 `CallExpression` 结点上定义一个新的 context，它是 expression
      // 中 arguments 这个数组的引用，我们可以向其中放入参数。
      node._context = expression.arguments;

      // 然后来看看父结点是不是一个 `CallExpression`，如果不是...
      if (parent.type !== 'CallExpression') {
        // 我们把 `CallExpression` 结点包在一个 `ExpressionStatement` 中，这么做是因为
        // 单独存在（原文为top level）的 `CallExpressions` 在 JavaScript 中也可以被当做
        // 是声明语句。
        //
        // 译者注：比如 `var a = foo()` 与 `foo()`，后者既可以当作表达式给某个变量赋值，也
        // 可以作为一个独立的语句存在。
        expression = {
          type: 'ExpressionStatement',
          expression
        };
      }

      // 最后我们把 `CallExpression`（可能是被包起来的） 放入父结点的 context 中。
      parent._context.push(expression);
    }
  });

  // 最后返回创建好的新 AST。
  return newAst;
}

/**
 * ============================================================================
 *                               ヾ（〃＾∇＾）ﾉ♪
 *                                代码生成器!!!!
 * ============================================================================
 */

/**
 * 现在只剩最后一步啦：代码生成器。
 *
 * 我们的代码生成器会递归地调用它自己，把 AST 中的每个结点打印到一个很大的字符串中。
 */
function codeGenerator(node) {
  // 对于不同 `type` 的结点分开处理。
  switch (node.type) {
    // 如果是 `Program` 结点，那么我们会遍历它的 `body` 属性中的每一个结点，并且递归地
    // 对这些结点再次调用 codeGenerator，再把结果打印进入新的一行中。
    case 'Program':
      return node.body.map(codeGenerator).join('\n');

    // 对于 `ExpressionStatements`,我们对它的 expression 属性递归调用，同时加入一个
    // 分号。
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';' // << (...因为我们喜欢用*正确*的方式写代码)
      );

    // 对于 `CallExpressions`，我们会打印出 `callee`，接着是一个左圆括号，然后对
    // arguments 递归调用 codeGenerator，并且在它们之间加一个逗号，最后加上右圆括号。
    case 'CallExpression':
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      );

    // 对于 `Identifiers` 我们只是返回 `node` 的 name。
    case 'Identifier':
      return node.name;

    // 对于 `NumberLiterals` 我们只是返回 `node` 的 value
    case 'NumberLiteral':
      return node.value;

    // 如果我们不能识别这个结点，那么抛出一个错误。
    default:
      throw new TypeError(node.type);
  }
}

/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!!!!!编译器!!!!!!!!!!!
 * ============================================================================
 */

/**
 * 最后！我们创建 `compiler` 函数，它只是把上面说到的那些函数连接到一起。
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  // 然后返回输出!
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!你做到了!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// 现在导出所有接口...

module.exports = {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
  compiler
};
