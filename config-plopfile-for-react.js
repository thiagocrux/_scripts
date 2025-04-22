const { exec } = require('child_process');
const fs = require('node:fs');

const SETUP_PATH = process.cwd();

exec('pnpm add -D plop', (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);

  if (error) {
    console.log(`exec err`, error);
    return;
  }

  // Create 'generator' directory

  fs.mkdir(`${SETUP_PATH}/generators`, { recursive: true }, (error) => {
    if (error) {
      console.error('Error creating folder:', error);
      return;
    }

    console.log("Folder 'generators' created successfully!");

    // Create 'plopfile'

    fs.writeFile(
      `${SETUP_PATH}/generators/plopfile.js`,
      `
        module.exports = function (plop) {
          plop.setGenerator('component', {
            description: 'this is a skeleton plopfile',
            prompts: [
              {
                type: 'input',
                name: 'name',
                message: 'What is your component name?',
              },
            ],
            actions: [
              {
                type: 'add',
                path: '../src/components/{{pascalCase name}}/index.tsx',
                templateFile: 'templates/index.tsx.hbs',
              },
              {
                type: 'add',
                path: '../src/components/{{pascalCase name}}/styles.ts',
                templateFile: 'templates/styles.ts.hbs',
              },
            ],
          });
        }
      `,
      'utf8',
      (error) => {
        return error
          ? console.log('Error writing file:', error)
          : console.log(`File 'plopfile.js' created successfully!`);
      }
    );
  });

  // Create 'templates' directory inside the 'generator' directory

  fs.mkdir(
    `${SETUP_PATH}/generators/templates`,
    { recursive: true },
    (error) => {
      if (error) {
        console.error('Error creating folder:', error);
        return;
      }

      console.log("Folder 'generators' created successfully!");

      // Create templates

      fs.writeFile(
        `${SETUP_PATH}/generators/templates/index.tsx.hbs`,
        `
          import React from 'react';

          import { Container } from './styles';

          export function {{pascalCase name}}() {
            return (
              <Container>
                <p>{{pascalCase name}}</p>
              </Container>
            )
          };
        `,
        'utf8',
        (error) => {
          return error
            ? console.log('Error writing file:', error)
            : console.log(`File 'index.tsx' created successfully!`);
        }
      );

      fs.writeFile(
        `${SETUP_PATH}/generators/templates/styles.ts.hbs`,
        `
          import styled from 'styled-components';

          export const Container = styled.div\`\`;
        `,
        'utf8',
        (error) => {
          return error
            ? console.log('Error writing file:', error)
            : console.log(`File 'styles.ts' created successfully!`);
        }
      );
    }
  );

  // Formatting all files with prettier

  exec(
    'npx prettier generators/plopfile.js generators/templates/index.tsx.hbs generators/templates/styles.ts.hbs --write --single-quote',
    (error, stdout, stderr) => {
      console.log('\n');
      console.log(stdout);
      console.log(stderr);
      error && console.log(`[prettier] Error:`, error);
    }
  );
});
