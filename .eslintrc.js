module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.js', '.jsx', '.ts']
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'comma-dangle': [
      'error',
      {
        functions: 'never'
      }
    ],
    'linebreak-style': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'react/jsx-uses-react': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-undef': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off'
  }
};
