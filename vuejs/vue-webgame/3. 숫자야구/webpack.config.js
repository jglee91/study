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
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue 버전과 vue-template-compiler 버전은 반드시 같아야함
  ],
  output: {
    filename: '[name].js', // entry.app이 [name]에 바인딩 (-> app.js)
    path: path.join(__dirname, 'dist'),
  },
};
