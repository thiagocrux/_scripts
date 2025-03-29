const { exec } = require('child_process');
const fs = require('node:fs');
const { SETUP_PATH, SHELL_SCRIPTS_PATH } = require('./_config');

exec(
  `sh "${SHELL_SCRIPTS_PATH}/config-commit-linters.sh"`,
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

    const commitlintFileContent = `export default {
  extends: ['@commitlint/config-conventional'],
};`;

    fs.writeFile(
      `${SETUP_PATH}/commitlint.config.js`,
      commitlintFileContent,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File 'commitlint.config.js' created successfully!");
      }
    );

    // .lintstagedrc.mjs

    const lintStagedFileContent = `export default {
  '*.{js,ts,mjs,mts}': (filenames) => [
  'npx prettier --write' + filenames.join(' '),
  // 'eslint . --fix --ignore-pattern "dist/*"',
  // config testing routine...,
]};`;

    fs.writeFile(
      `${SETUP_PATH}/.lintstagedrc.mjs`,
      lintStagedFileContent,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log("File '.lintstagedrc.mjs' created successfully!");
      }
    );
  }
);
