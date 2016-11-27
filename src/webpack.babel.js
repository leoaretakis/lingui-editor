import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

const config = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve('./src/client.js')
  ],

  output: {
    path: path.resolve('./dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      include: /src/,
      loader: 'babel'
    }]
  }
}

export default config
