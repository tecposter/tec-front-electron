const rules = require('./webpack.rules');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
/*
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});
*/

rules.push({
  // test: /\.s[ac]ss$/i,
  test: /\.s?css$/,
  use: [
    // Creates `style` nodes from JS strings
    'style-loader',
    // Translates CSS into CommonJS
    'css-loader',
    // Compiles Sass to CSS
    'sass-loader',
  ],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new MonacoWebpackPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /vs\/base\/common\/insane\/insane.js/,
      __dirname + '/node_modules/insane/insane.js'
    )
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'lib')
    ]
  }
};
