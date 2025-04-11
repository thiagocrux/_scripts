const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

exec(
  'pnpm add eslint @eslint/js globals typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh -D',
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
        import js from '@eslint/js'
        import globals from 'globals'
        import reactHooks from 'eslint-plugin-react-hooks'
        import reactRefresh from 'eslint-plugin-react-refresh'
        import tseslint from 'typescript-eslint'

        export default tseslint.config(
          { ignores: ['dist'] },
          {
            extends: [js.configs.recommended, ...tseslint.configs.recommended],
            files: ['**/*.{ts,tsx}'],
            languageOptions: {
              ecmaVersion: 2020,
              globals: globals.browser,
            },
            plugins: {
              'react-hooks': reactHooks,
              'react-refresh': reactRefresh,
            },
            rules: {
              ...reactHooks.configs.recommended.rules,
              'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
              ],
            },
          },
        )
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
