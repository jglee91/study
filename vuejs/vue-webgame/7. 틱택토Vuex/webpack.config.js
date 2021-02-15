const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval', // eval: 개발(webpack build 속도가 빠름) / hidden-source-map: 운영
  resolve: {
    extensions: ['.js', '.vue'], // import에서 확장자 생략 가능
  },
  entry: {
    app: path.join(__dirname, './main.js'), // 하나로 합쳐질 파일
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        // loader: 'vue-loader', // loader나 use나 같은 옵션
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [ // vue에서 style 처리하려면, 아래 2개 loader가 필요 | sass-loader, scss-loader, postcss-loader, ...
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue 버전과 vue-template-compiler 버전은 반드시 같아야함
  ],
  output: {
    filename: '[name].js', // entry.app이 [name]에 바인딩 (-> app.js)
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist', // 해당 옵션이 있어야 webpack-dev-server의 메모리에 output이 올라감
  },
  devServer: { // webpack-dev-server 로 실행시, dist 디렉토리는 생성되지 않음
    port: 4000,
    hot: true,
  },
};
