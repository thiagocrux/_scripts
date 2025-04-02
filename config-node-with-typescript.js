const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

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
    fs.mkdir(`${SETUP_PATH}/src`, { recursive: true }, (error) => {
      if (error) {
        console.error('Error creating folder:', error);
        return;
      }

      fs.writeFile(
        `${SETUP_PATH}/src/index.ts`,
        `
          import express from 'express';

          const app = express();

          app.listen(3001, () => {
            // eslint-disable-next-line no-console
            console.log(\`Server running on http://localhost:3001\`);
          });
        `,
        'utf8',
        (error) => {
          if (error) {
            console.log('Error writing file:', error);
            return;
          }

          console.log(`File 'index.ts' created successfully!`);
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
  }
);
