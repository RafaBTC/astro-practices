import globals from 'globals'
import eslintPluginAstro from 'eslint-plugin-astro';
import reactPlugin from 'eslint-plugin-react';
import tsEslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import astroParser from 'astro-eslint-parser';

export default [
  // Ignorar node_modules y dist
  {
    ignores: ['node_modules/', 'dist/', '.astro/']
  },

  // Reglas globales para archivos JS/TS
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        jsx: true,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin
    },
    rules: {
      // Estilos de código
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-console': 'warn',

      // Imports
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ],

      // React
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },
    settings: {
      react: { version: 'detect' }
    }
  },

  // TypeScript
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },

  // Archivos Astro
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'astro/no-set-html-directive': 'error',
      'astro/no-unused-css-selector': 'warn',
      'astro/prefer-class-list-directive': 'warn',
      // Estilos de código en archivos Astro
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always']
    }
  }
]
