module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },

  "extends": [
    "standard",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "@vue/typescript"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/indent": [2, 2],
    "max-len": [2, 120, 4, { "ignoreUrls": true }],
    "@typescript-eslint/explicit-function-return-type": [1, {"allowExpressions": true}],
        // we only want single quotes
    "space-before-blocks": "off",
    'quotes': ['error', 'single'],
    // we want to force semicolons
    'semi': ['error', 'always'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error']
  }
}
