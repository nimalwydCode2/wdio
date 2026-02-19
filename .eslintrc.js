module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    mocha: true, // provides describe/it globals
  },
  globals: {
    browser: 'readonly', // WDIO global
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // add custom rules here
  },
};
