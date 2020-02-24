module.exports = {
  // eslint-plugin-prettier is a plugin that adds a rule that formats content using Prettier
  plugins: ['prettier'],
  // eslint-config-prettier 会将跟 prettier 冲突的配置禁用掉，即 默认使用 prettier 的配置
  extends: ['airbnb-base', 'prettier'],
  // the additional global variables your script accesses during execution.
  globals: {
    /* window: true,
    document: true,
    localStorage: true,
    sessionStorage: true,
    CookieStorage: true,
    navigator: true,
    location: true */
  },
  // Runs Prettier as an ESLint rule and reports differences as individual ESLint issues
  // eslint-plugin-prettier 这个插件可以让 eslint 运行 prettier
  env: {
    // Each environment brings with it a certain set of predefined global variables.
    browser: true,
    es6: true, // supporting new ES6 global such as Set, Map. This will enable ES6 syntax automatically,
    node: true,
    jest: true,
    mocha: true // support mocha
  },
  // Specify the Javascript language option you want to support.
  // Setting parser options helps ESLint determine what is a parsing error.
  // All language options are false by default.
  parserOptions: {
    ecmaVersion: 2018, // 这个可以解决 spread 和 rest operator 以及 async await. 默认值是 5
    sourceType: 'module', // 默认值是 'script', 'module' 表示使用 ES Module
    ecmaFeatures: {
      // globalReturn: true, 允许在全局作用域里使用 return 语句，这个一般不配，很少使用
      // impliedStrict: true, 允许全局的 strict mode 如果 ecmaversion >= 5
      jsx: true // supporting jsx syntax. 注意这个不表示支持 React. React 对jsx应用了 eslint 无法识别的特别的语义。如果要支持 React，要用 eslint-react-plugin
    }
  },
  // while rules are enabled and at what error level.
  rules: {
    'func-names': 0,
    'no-console': 0,
    'prettier/prettier': 'error', // prettier 作为 eslint rule 被校验
    quotes: [1, 'single'],
    semi: [0, 'never'],
    'no-unused-vars': 'error',
    'no-plusplus': 0
  }
};
