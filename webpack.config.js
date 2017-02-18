// var webpack = require('webpack');
// var path = require('path');

// module.exports = {
//   devtool: 'inline-source-map',
//   entry: path.join(__dirname, 'public/client/index.js'),
//   output: {
//     path: path.join(__dirname, 'public/build'),
//     filename: 'bundle.js',
//     publicPath: '/build'
//   },
//   resolve: {
//     modulesDirectories: ['node_modules', 'src'],
//     extensions: ['', '.js', '.jsx', '.css'],
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
//       }
//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//   ]
// }

module.exports = {
  entry: './public/client/index.jsx',
  output: {
    path: './public',
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