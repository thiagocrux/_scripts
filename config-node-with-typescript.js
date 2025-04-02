const { exec } = require('child_process');
const path = require('node:path');
const fs = require('node:fs');
const { SETUP_PATH, SHELL_SCRIPTS_PATH } = require('./_config');

const folderPath = path.join(SETUP_PATH, '/src');
const fileName = 'index.ts';

const fileContent = `
  import express from 'express';

  const app = express();

  app.listen(3001, () => {
    // eslint-disable-next-line no-console
    console.log(\`Server running on http://localhost:3001\`);
  });
`;

// Run npm scripts
exec(
  `
    pnpm add -D express @types/express typescript tsx
    npx tsc --init --outDir dist
    npm pkg set scripts.build="tsc"
    npm pkg set scripts.start="node dist/index.js"
    npm pkg set scripts.dev="tsx watch src/index.ts"
    npm pkg delete scripts.test
  `,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(`exec err`, error);
      return;
    }

    // Create 'src' folder and 'index.ts' file
    fs.mkdir(folderPath, { recursive: true }, (error) => {
      if (error) {
        console.error('Error creating folder:', error);
        return;
      }

      fs.writeFile(
        `${folderPath}/${fileName}`,
        fileContent,
        'utf8',
        (error) => {
          if (error) {
            console.log('Error writing file:', error);
            return;
          }

          console.log(`File '${fileName}' created successfully!\n`);
        }
      );
    });

    // Formatting all files with prettier
    exec('npx prettier . --write', (error, stdout, stderr) => {
      console.log('Formatting files with prettier:\n');
      console.log(stdout);
      console.log(stderr);

      if (error) {
        console.log(`[Prettier] Error:`, error);
        return;
      }
    });
  }
);
