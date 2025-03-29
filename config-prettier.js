const fs = require("node:fs");
const path = require("node:path");
const { SETUP_PATH } = require("./_config");

// .prettierrc

const prettierFilePath = path.join(SETUP_PATH, "/.prettierrc");

const prettierFileContent = `{
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
}`;

fs.writeFile(prettierFilePath, prettierFileContent, "utf8", (error) => {
  if (error) {
    console.log("Error writing file:", error);
    return;
  }

  console.log("File '.prettierrc' created successfully!");
});

// .vscode/settings.json

const vscodeSettingsFolderPath = path.join(SETUP_PATH, "/.vscode");

const vscodeSettingsFilePath = path.join(
  vscodeSettingsFolderPath,
  "/settings.json"
);

const vscodeSettingsFileContent = `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`;

fs.mkdir(vscodeSettingsFolderPath, { recursive: true }, (error) => {
  if (error) {
    console.error("Error creating folder:", error);
    return;
  }

  console.log("Folder '.vscode' created successfully!");

  fs.writeFile(
    vscodeSettingsFilePath,
    vscodeSettingsFileContent,
    "utf8",
    (error) => {
      if (error) {
        console.log("Error writing file:", error);
      }

      console.log("File '.vscode/settings.json' created successfully!");
    }
  );
});

console.log("writeFile operation initiated...");
