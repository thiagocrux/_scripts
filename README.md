# \_Scripts

Repository of useful scripts for automating common tasks.

## Technologies

These are some of the tecnologies used in those scripts:

- `javascript`: A dynamic scripting language that enables interactive web pages and server-side applications, serving as the foundation of modern web development.
- `prettier`: A code formatter.

## Requirements

It is required to have [Node.js](https://nodejs.org/pt) and [pnpm](https://pnpm.io/pt/) installed on your machine and a package manager.

## Installation and usage

1. Clone the repository:

```bash
git clone https://github.com/thiagocrux/_scripts.git
```

2. Run the script you desire inside your project folder:

```bash
node {PATH_TO_SCRIPT}/{SCRIPT_NAME}.js
```

## Scripts

### JS/TS development

- #### `config-commit-linters`

  This script sets up a Git hooks and linting configuration for a Node.js or JS/TS frontend project.

  ```bash
  node {PATH_TO_SCRIPT}/config-commit-linters.js
  ```

- #### `config-eslint-for-node`

  This script sets up ESLint for a TypeScript + Node.js project with modern JavaScript standards.

  ```bash
  node {PATH_TO_SCRIPT}/config-eslint-for-node.js
  ```

- #### `config-eslint-for-react`

  This script sets up ESLint for a TypeScript + React project with modern JavaScript standards. DESCRIPTION

  ```bash
  node {PATH_TO_SCRIPT}/config-eslint-for-react.js
  ```

- #### `config-logger`

  This script sets up a logging system for a Node.js/TypeScript project using Pino, a fast and low-overhead logger.

  ```bash
  node {PATH_TO_SCRIPT}/config-logger.js
  ```

- #### `config-node-with-typescript`

  This script sets up a TypeScript-based Express.js project with a basic development workflow.

  ```bash
  node {PATH_TO_SCRIPT}/config-node-with-typescript.js
  ```

- #### `config-plopfile-for-react`

  This script sets up Plop.js, a code generator tool, to automate the creation of React components with TypeScript and styled-components.

  ```bash
  node {PATH_TO_SCRIPT}/config-plopfile-for-react.js
  ```

- #### `config-prettier`

  This script configures Prettier (a code formatter) and VS Code settings for consistent code formatting in a project.

  ```bash
  node {PATH_TO_SCRIPT}/config-prettier.js
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)
