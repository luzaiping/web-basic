module.exports = {
  // eslint-config-prettier 会将跟 prettier 冲突的配置禁用掉，即 默认使用 prettier 的配置
  extends: ['airbnb-base', 'prettier'],
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
  plugins: ['prettier'],
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018, // 这个可以解决 spread 和 rest operator 问题
    sourceType: 'module',
    ecmaFeatures: {}
  },
  rules: {
    'func-names': 0,
    'no-console': 0,
    'prettier/prettier': 'error', // prettier 作为 eslint rule 被校验
    quotes: [1, 'single'],
    semi: [0, 'never'],
    'no-unused-vars': 'error'
  }
};
