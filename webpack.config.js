
module.exports = {
  entry: './public/client/index.jsx',
  output: {
    path: './public/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [
          'babel-loader?presets[]=react,presets[]=es2015'
        ]
      }
    ]
  }
}