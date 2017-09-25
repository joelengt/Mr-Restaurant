require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  webpack: (config, {dev}) => {

    config.module.rules.push(
      {
        test: /\.css$/,
        use: ['css-loader', 'postcss-loader', 'style-loader']
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }, {
        test: /\.eot(\?.*)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: 'static/fonts/[name].[hash:8].[ext]'
          // name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.otf(\?.*)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'font/opentype',
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff2',
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }
    );
    console.log(config);
    return config
  }
};