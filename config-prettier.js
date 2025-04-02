const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

// .prettierrc

fs.writeFile(
  `${SETUP_PATH}/.prettierrc`,
  `
    {
      "arrowParens": "always",
      "bracketSameLine": false,
      "bracketSpacing": true,
      "embeddedLanguageFormatting": "auto",
      "endOfLine": "lf",
      "htmlWhitespaceSensitivity": "css",
      "insertPragma": false,
      "jsxSingleQuote": false,
      "printWidth": 80,
      "proseWrap": "preserve",
      "quoteProps": "as-needed",
      "requirePragma": false,
      "semi": true,
      "singleQuote": false,
      "tabWidth": 2,
      "trailingComma": "es5",
      "useTabs": false,
      "vueIndentScriptAndStyle": false
    }
  `,
  'utf8',
  (error) => {
    if (error) {
      console.log('Error writing file:', error);
      return;
    }

    console.log("File '.prettierrc' created successfully!");
  }
);

// .vscode/settings.json

fs.mkdir(`${SETUP_PATH}/.vscode`, { recursive: true }, (error) => {
  if (error) {
    console.error('Error creating folder:', error);
    return;
  }

  console.log("Folder '.vscode' created successfully!");

  fs.writeFile(
    `${SETUP_PATH}/.vscode/settings.json`,
    `
      {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
      }
    `,
    'utf8',
    (error) => {
      if (error) {
        console.log('Error writing file:', error);
      }

      console.log("File '.vscode/settings.json' created successfully!");
    }
  );
});

// Formatting all files with prettier
exec('npx prettier . --write --single-quote', (error, stdout, stderr) => {
  console.log('\n');
  console.log(stdout);
  console.log(stderr);
  error && console.log(`[prettier] Error:`, error);
});
