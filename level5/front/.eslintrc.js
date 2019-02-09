const path = require('path');

module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'flowtype'],
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'import/no-unresolved': 0,
    'max-len': 0,
    'no-shadow': 0,
    'import/prefer-default-export': 0,
    'react/sort-comp': [2, { order: [
      'static-methods',
      'lifecycle',
      'render',
      '/^render.+$/',
      '/^handle.+$/',
      'everything-else'
    ]}],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
  },
};
