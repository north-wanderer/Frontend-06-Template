const path = require('path')
const vuePlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new vuePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'src/*.html', to: '[name].[ext]'}
      ]
    })
  ]
}
