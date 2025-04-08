import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier'; // 🔥 추가
import prettierConfig from 'eslint-config-prettier'; // 🔥 추가

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin, // 🔥 추가
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx'] },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'error', // 🔥 Prettier 포맷도 ESLint 에러로 표시
    },
  },
  prettierConfig, // 🔥 Airbnb랑 충돌 제거용
];
