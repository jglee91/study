## Webpack Training

### URL
- https://www.youtube.com/watch?v=cp_MeXO2fLg&list=PLuHgQVnccGMChcT9IKopFDoAIoTA-03DA
- webpack 생활코딩 Youtube 강의

### 내용
- web에서 사용 가능한 bundler 중 대표적인 것이 webpack
- 하나의 파일로 bundling 하는 작업을 통해 resource 낭비 최소화
- node project로 변환 필요
  ``` cmd
  $ npm init -y
  $ npm install -D webpack webpack-cli
  ```
- entry 파일을 통해 bundling
  ``` cmd
  $ npx webpack --entry ./src/index.js --output ./public/index_bundle.js
  ```
- webpack 명령어를 별도의 설정파일을 생성하여 관리하는 것이 유리
  - webpack 공식페이지에서 guide 및 docs를 참고해볼 것
  - __dirname : 현재 파일의 경로 (node.js 기본 제공 라이브러리인 path.js)
  - mode 옵션을 통해 개발/운영 별도로 관리 가능
    - 개발/운영용 config 파일을 분리하여 관리
    - 하나의 config 파일 내에 환경변수를 통해 관리 가능
      ``` js
      module.exports = {
        // ...
        mode: process.env.NODE_ENV || 'development',
      };
      ```
- js 외의 파일을 bundling 하기 위해서는 loader 사용이 필요
  - https://webpack.js.org/guides/asset-management/
  - css-loader는 css파일을 webpack으로 가져오며, json object 형태로 bundling됨
  - style-loader는 css-loader를 통해 가져온 css파일을 html에 삽입
  - module의 loader들은 마지막부터 실행됨
    ``` cmd
    $ npm install --save-dev style-loader css-loader
    ```
    ``` js
    module.exports = {
      // ...
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'css-loader'
            ]
          }
        ]
      }
    };
    ```
- 여러 파일을 한번에 bundling 하는 것도 가능
  ``` js
  module.exports = {
    // ...
    entry: {
      index: './src/index.js',
      about: './src/about.js',
    },
    output: {
      // ...
      filename: '[name]_bunding.js',  // [name]은 entry object key 값이 매칭된다
    },
  };
  ```
- plugin을 통해 bundling 결과를 변형하여 사용 가능
  - htmlwebpackplugin
    ``` cmd
    $ npm install --save-dev html-webpack-plugin
    ```
    ``` js
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
      // ...
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
      ],
    };
    ```
    - https://github.com/jantimon/html-webpack-plugin
- cmd에서 **--watch** 옵션을 주면 파일이 변경되었을 때 자동적으로 webpack cmd가 실행됨
  ``` cmd
  $ npx webpack --watch
  ```
- npm package 사용
  - lodash
    ``` js
    _.join([hello_word, world_word], ' ');
    ```
- 추가 study 필요항목
  - Code splitting
  - Lazy loading