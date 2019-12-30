module.exports = {
  plugins: ["prettier"],
  globals: {
    /* window: true,
    document: true,
    localStorage: true,
    sessionStorage: true,
    CookieStorage: true,
    navigator: true,
    location: true */
  },
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
    "prettier/prettier": "error",
    indent: [0, 2],
    quotes: [1, "single"],
    semi: [0, "never"],
    "no-unused-vars" : 1
  }
}
