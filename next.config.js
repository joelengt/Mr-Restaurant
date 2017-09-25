const {resolve} = require('path');
const path = require('path');
const glob = require('glob');

module.exports = {
  webpack: (config, {dev}) => {

    config.node = {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    };

    config.resolve = {
      alias: {
        'styles': resolve(__dirname, 'src/styles'),
        'lib': resolve(__dirname, 'lib')
      },
      modules: ['node_modules', 'shared'],
    };

    // console.dir(require("!postcss-loader!./styles/main.scss"));

    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/images/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.eot(\?.*)?$/,
        loader: 'url-loader?limit=100000',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: 'static/fonts/[name].[hash:8].[ext]'
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
    return config
  }
};