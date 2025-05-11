const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

exec(
  `
    pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
    npx husky init
  `,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(`exec err`, error);
      return;
    }

    // .husky/commit-msg

    fs.writeFile(
      `${SETUP_PATH}/.husky/commit-msg`,
      'npx --no -- commitlint --edit $1',
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File '.husky/commit-msg' created successfully!");
      }
    );

    // .husky/pre-commit

    fs.writeFile(
      `${SETUP_PATH}/.husky/pre-commit`,
      'npx --no-install lint-staged',
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File '.husky/pre-commit' created successfully!");
      }
    );

    // commitlint.config.js

    fs.writeFile(
      `${SETUP_PATH}/commitlint.config.js`,
      `
        export default {
          extends: ['@commitlint/config-conventional'],
          rules: {
            'body-max-line-length': [1, 'always', 100],
          },
        };
      `,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File 'commitlint.config.js' created successfully!");
      }
    );

    // .lintstagedrc.mjs

    fs.writeFile(
      `${SETUP_PATH}/.lintstagedrc.mjs`,
      `
        export default {
          '*.{js,ts,mjs,mts}': (filenames) => [
            \`npx prettier --write \${filenames.map((filename) => \`"\${filename}"\`).join(' ')}\`,
            // 'eslint . --fix --ignore-pattern "dist/*"',
            // config testing routine...,
          ]
        };
      `,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File '.lintstagedrc.mjs' created successfully!");
      }
    );

    // Formatting all files with prettier
    exec(
      'npx prettier .lintstagedrc.mjs commitlint.config.js --write --single-quote',
      (error, stdout, stderr) => {
        console.log('\n');
        console.log(stdout);
        console.log(stderr);
        error && console.log(`[prettier] Error:`, error);
      }
    );
  }
);
