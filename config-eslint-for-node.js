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

    const fileContent = `import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: 'next' },
      ],
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
]);
`;

    fs.writeFile(filePath, fileContent, 'utf8', (error) => {
      return error
        ? console.log('Error writing file:', error)
        : console.log(`File ${fileName} created successfully!`);
    });
  }
);
