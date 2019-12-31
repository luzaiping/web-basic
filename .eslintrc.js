module.exports = {
  // eslint-config-prettier 会将跟 prettier 冲突的配置禁用掉，即 默认使用 prettier 的配置
  extends: ['prettier'],
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
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {}
  },
  rules: {
    'prettier/prettier': 'error', // prettier 作为 eslint rule 被校验
    indent: [0, 2],
    quotes: [1, 'single'],
    semi: [0, 'never'],
    'no-unused-vars': 1
  }
};
