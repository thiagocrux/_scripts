const { exec } = require('child_process');
const fs = require('node:fs');
const { SETUP_PATH, SHELL_SCRIPTS_PATH } = require('./_config');

exec(
  `sh "${SHELL_SCRIPTS_PATH}/config-eslint-for-node.sh"`,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(`exec err`, error);
      return;
    }

    // eslint.config.mjs
    const fileName = 'eslint.config.mjs';
    const filePath = `${SETUP_PATH}/${fileName}`;

    const fileContent = `import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,ts,mjs,mts,cjs,jsx,tsx}'],
  },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactHooks.configs['recommended-latest'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
      'react/jsx-no-bind': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react/jsx-uses-vars': 'error',
    },
  },
];
`;

    fs.writeFile(filePath, fileContent, 'utf8', (error) => {
      return error
        ? console.log('Error writing file:', error)
        : console.log(`File ${fileName} created successfully!`);
    });
  }
);
