'use strict';  // eslint-disable-line

/**
 * Webpack configuration base class
 */
const fs = require('fs');
const path = require('path');

const npmBase = path.join(__dirname, '../../node_modules');
const basePath = path.resolve(__dirname, '../../src/static/');

const PATHS = {
    app: path.join(__dirname, '../../src/static'),
    build: path.join(__dirname, '../../src/static_dist')
};

const VENDOR = [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-mixin',
    'classnames',
    'redux',
    'react-router-redux',
    'jquery',
    'bootstrap-loader',
    'font-awesome-webpack!./styles/font-awesome.config.prod.js'
];

class WebpackBaseConfig {

  constructor() {
    this._config = {};
  }

  /**
   * Get the list of included packages
   * @return {Array} List of included packages
   */
  get includedPackages() {
    return [].map((pkg) => fs.realpathSync(path.join(npmBase, pkg)));
  }

  /**
   * Set the config data.
   * This will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @return {Object} config Final webpack config
   */
  get config() {
    return this._config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'dev';
  }

  /**
   * Get the absolute path to src directory
   * @return {String}
   */
  get srcPathAbsolute() {
    return path.resolve('./src/static');
  }

  /**
   * Get the absolute path to tests directory
   * @return {String}
   */
  get testPathAbsolute() {
    return path.resolve('./test');
  }

  /**
   * Get the default settings
   * @return {Object}
   */
  get defaultSettings() {
    const cssModulesQuery = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    };

    return {
      context: basePath,
      devtool: 'eval',
      devServer: {
        contentBase: ['./public/', './src/static'],
        publicPath: '/assets/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 3000
      },
      /*entry: './index.js',*/
      entry: {
        vendor: VENDOR,
        app: PATHS.app
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.js?$/,
            include: basePath,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-2']
            }
          },
          {
            test: /^.((?!cssmodule).)*\.css$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' }
            ]
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader'
          },
          {
            test: /^.((?!cssmodule).)*\.styl$/,
            loaders: [
              { loader: 'style-loader' },
              { loader: 'css-loader' },
              { loader: 'stylus-loader' }
            ]
          },
          {
            test: /\.json$/,
            loader: 'json-loader'
          },
          {
            test: /\.(js|jsx)$/,
            include: [].concat(
              this.includedPackages,
              [basePath]
            ),
            loaders: [
              // Note: Moved this to .babelrc
              { loader: 'babel-loader' }
            ]
          },
          {
            test: /\.cssmodule\.(sass|scss)$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'sass-loader' }
            ]
          },
          {
            test: /\.cssmodule\.css$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              }
            ]
          },
          {
            test: /\.cssmodule\.less$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'less-loader' }
            ]
          },
          {
            test: /\.cssmodule\.styl$/,
            loaders: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                query: cssModulesQuery
              },
              { loader: 'stylus-loader' }
            ]
          }
        ]
      },
      output: {
        path: PATHS.build,
        filename: 'app.js',
        publicPath: '/static'
      },
      plugins: [],
      resolve: {
        alias: {
          actions: `${basePath}/actions/`,
          components: `${basePath}/components/`,
          config: `${basePath}/config/${this.env}.js`,
          images: `${basePath}/images/`,
          sources: `${basePath}/sources/`,
          stores: `${basePath}/stores/`,
          styles: `${basePath}/styles/`
        },
        extensions: ['.js', '.jsx'],
        modules: [
          basePath,
          'node_modules'
        ]
      }
    };
  }
}

module.exports = WebpackBaseConfig;
