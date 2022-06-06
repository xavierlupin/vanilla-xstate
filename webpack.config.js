const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

const srcPath = path.resolve(__dirname, 'src')
const distPath = path.resolve(__dirname, 'docs')

module.exports = {
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(distPath, 'js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
}
