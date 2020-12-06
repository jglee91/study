# Typescript-tutorial

```cmd
$ npm install -g typescript nodemon ts-node prettier
$ tsc --init
$ npm install express body-parser dotenv
$ npm install --save-dev @types/express @types/body-parser @types/dotenv
```

```json
// tsconfig.json
{
  ...
  "outDir": "./build",
  ...
}
// package.json
{
  ...
  "scripts": {
    "build": "rm -rf build/ && prettier --write src/ && tsc"
  }
  ...
}
```

- Extensions
  - Prettier
