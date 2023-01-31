const path = require('path');

module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/react',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'prettier'
  ],
  plugins: ['react'],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: 'false'
  },
  settings: {
    react: {
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
    }
  },
  rules: {
    'arrow-body-style': 'off',
    'no-param-reassign': [2, { props: false }],

    'jsx-a11y/no-autofocus': ['warn'],
    'jsx-a11y/anchor-is-valid': [
      2,
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],

    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 0,
    'react/jsx-fragments': ['error', 'element'],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 'warn'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    commonjs: true
  },
  globals: {
    window: true,
    utag: true,
    cy: true
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.stories.js', '**/*.cy.js'],
      env: {
        jest: true
      },
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.resolve(__dirname, './jest.config.js')
          }
        }
      },
      rules: {
        'import/named': 'off',
        'import/order': 'off'
      }
    }
  ]
};
