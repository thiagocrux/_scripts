pnpm add -D express @types/express typescript tsx
npx tsc --init --outDir dist
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"
npm pkg set scripts.dev="tsx watch src/index.ts"
npm pkg delete scripts.test
