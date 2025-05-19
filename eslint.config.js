import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsonPlugin from 'eslint-plugin-json';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import i18next from 'eslint-plugin-i18next';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettier,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  i18next.configs['flat/recommended'],
  {
    ignores: ['node_modules/**', 'tmp/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es2020,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-var': 'error',
      'no-trailing-spaces': 'error',
      'import/default': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
      'import/no-named-as-default-member': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.mjs', '.mts', '.js'],
          moduleDirectory: ['node_modules', './'],
        },
        typescript: true,
      },
    },
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*.json'],
    extends: [jsonPlugin.configs.recommended],
  },
  {
    files: ['**/*.test.m{ts,js}', 'test/**/*'],
  },
);
