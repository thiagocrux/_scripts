const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

exec(
  `
    pnpm add pino
    pnpm add pino-pretty -D
  `,
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (error) {
      console.log(`exec err`, error);
      return;
    }

    // Create 'src' folder and 'index.ts' file
    fs.mkdir(`${SETUP_PATH}/src/utils`, { recursive: true }, (error) => {
      if (error) {
        console.error('Error creating folder:', error);
        return;
      }

      fs.writeFile(
        `${SETUP_PATH}/src/utils/logger.ts`,
        `
        import pino from 'pino';

        const logger = pino({
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: \`\${JSON.stringify(new Date().toLocaleString())}\`,
            },
          },
          base: {
            pid: false,
          },
        });

        export default logger;
      `,
        'utf8',
        (error) => {
          if (error) {
            console.log('Error writing file:', error);
            return;
          }

          console.log(`File 'logger.ts' created successfully!`);
        }
      );
    });

    // Formatting all files with prettier
    exec(
      'npx prettier src/utils/logger.ts --write --single-quote',
      (error, stdout, stderr) => {
        console.log('\n');
        console.log(stdout);
        console.log(stderr);
        error && console.log(`[prettier] Error:`, error);
      }
    );
  }
);
