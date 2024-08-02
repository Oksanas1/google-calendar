import { ESLint } from 'eslint';

export default new ESLint({
  baseConfig: {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
      strict: 0,
      'no-alert': 0,
      'no-console': 0,
      'no-constant-condition': 0,
      'no-shadow': 0,
      'no-restricted-globals': 0,
      'no-unused-vars': 0,
      'no-underscore-dangle': 0,
      'func-names': 0,
      'global-require': 0,
      'import/extensions': 0,
      'import/no-dynamic-require': 0,
      'import/prefer-default-export': 0,
      'prefer-template': 0,
    },
  },
});
