module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [],
  settings: {
    'import/resolver': {
      typescript: {},
      'babel-plugin-root-import': {
        rootPathSuffix: 'app',
        rootPathPrefix: '~',
      },
      node: {
        extensions: ['.js', '.jsx', 'ts', '.tsx'],
      },
    },
  },
  globals: {
    ios: false,
    android: false,
    windowHeight: false,
    windowWidth: false,
    hairlineWidth: false,
    DeviceInfo: false,
    isIphoneX: false,
    StatusBarHeight: false,
    HeaderHeight: false,
  },
  rules: {
    'global-require': 0,
    'import/extensions': 0,
    'linebreak-style': [2, 'unix'],
    'prefer-const': 0,
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error', 'log', 'info', 'disableYellowBox'],
      },
    ],
    'no-param-reassign': ['error', { props: false }],
    'no-restricted-globals': 0,
    'no-unused-vars': 0,
    'consistent-return': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-use-before-define': 0,
    'no-underscore-dangle': 0,
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'lines-between-class-members': [
      1,
      'always',
      {
        exceptAfterSingleLine: true,
      },
    ],
    'prefer-destructuring': [
      2,
      {
        array: false,
        object: true,
      },
    ],
    'max-classes-per-file': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/explicit-member-accessibility': [
      2,
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/explicit-function-return-type': [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
