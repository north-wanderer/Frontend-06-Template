module.exports = {
  mode:'development',
  // entry: './test.js',
  entry: './src/main.jsx',
  module: {
    rules: [
      {
        test: /.[js | jsx]$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {"pragma": "createElement"}]]
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    port: 3000
  },
}