const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

exec(
  'pnpm add eslint @eslint/js globals typescript-eslint -D',
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(`exec err`, error);
      return;
    }

    // eslint.config.mjs

    fs.writeFile(
      `${SETUP_PATH}/eslint.config.mjs`,
      `
        import { defineConfig } from 'eslint/config';
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
        ])
      `,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log(`File 'eslint.config.mjs' created successfully!`);
      }
    );

    // Formatting all files with prettier
    exec(
      'npx prettier eslint.config.mjs --write --single-quote',
      (error, stdout, stderr) => {
        console.log('\n');
        console.log(stdout);
        console.log(stderr);
        error && console.log(`[prettier] Error:`, error);
      }
    );
  }
);
