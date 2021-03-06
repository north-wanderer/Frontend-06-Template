module.exports = {
  mode:'development',
  entry: './main.jsx',
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
  }
}