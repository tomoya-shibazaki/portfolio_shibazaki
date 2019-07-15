const path = require('path')
// const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const HtmlWebPackPlugin = require("html-webpack-plugin")
// const ExtractText = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')



module.exports = {
  entry: path.join(__dirname, 'assets/src/js/index'),

  output: {
    path: path.join(__dirname, 'assets/dist'),
    filename: '[name]-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.scss$/,
      //   use: ExtractText.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'sass-loader']
      //   })
      // },
      // {
      //   loader: 'postcss-loader',
      //   options: {
      //     sourceMap: true,
      //     plugins: () => [require('autoprefixer')]
      //   }
      // },
      // {
      //   loader: 'sass-loader',
      //   options: {
      //     sourceMap: true
      //   }
      // },
    ]
  },

  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: 'webpack-stats.json'
    }),
    new HtmlWebPackPlugin({
      template: "./assets/src/index.html",
      // filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
    }),
    // new ExtractText({
    //   filename: '[name]-[hash].css'
    // }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/assets/dist/'),
    compress: true,
    port: 3000
  },
  devtool: 'source-map'
}