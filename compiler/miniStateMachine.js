/* eslint-disable no-useless-escape */
const numberReg = /[0-9]/;
const punctuatorReg = /[\+\-\*/]/;
const TYPE = {
  NUMERIC: 'Numeric',
  PUNCTUATOR: 'Punctuator'
};

/**
 * 用于保存最终的 tokens
 */
const tokens = [];

const initailToken = { value: '', type: '' };

/**
 * 当前状态机中的 token
 */
let currentToken = initailToken;

function setCurrentToken(value, type = TYPE.NUMERIC) {
  currentToken = { value, type };
}

function emitToken() {
  tokens.push(currentToken);
  currentToken = initailToken;
}

function punctuatorFn(char) {
  emitToken();
  if (numberReg.test(char)) {
    setCurrentToken(char);
    // eslint-disable-next-line no-use-before-define
    return numberFn;
  }
  if (punctuatorReg.test(char)) {
    setCurrentToken(char, TYPE.PUNCTUATOR);
    return punctuatorFn;
  }
  throw new TypeError(
    `The type of argument: ${char} in punctuatorFn is required to be number or punctrator.`
  );
}

function numberFn(char) {
  if (numberReg.test(char)) {
    currentToken.value += char;
    return numberFn;
  }
  if (punctuatorReg.test(char)) {
    emitToken();
    setCurrentToken(char, TYPE.PUNCTUATOR);
    return punctuatorFn;
  }
  throw new TypeError(
    `The type of argument: ${char} in numberFn is required to be number or punctrator.`
  );
}

function startFn(char) {
  if (numberReg.test(char)) {
    setCurrentToken(char);
    return numberFn;
  }
  if (punctuatorReg.test(char)) {
    setCurrentToken(char, TYPE.PUNCTUATOR);
    return punctuatorFn;
  }
  throw new TypeError(
    `The type of argument: ${char} in startFn is required to be number or punctrator.`
  );
}

/**
 * 词法分析器，用于将 string 转换为 tokens 数组
 * @param {String} input - 指定的输入字符串
 */
function tokenizer(input) {
  const inputArray = input.split('');
  let stateFn = startFn;
  inputArray.forEach(char => {
    stateFn = stateFn(char);
  });

  emitToken();
  return tokens;
}

console.log(tokenizer('100+200-300*2'));
