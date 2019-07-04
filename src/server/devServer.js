const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../config/webpack.dev.config.js');
const historyApiFallback = require('connect-history-api-fallback');

const apiProxy = httpProxy.createProxyServer();
const compiler = webpack(config);

app.use(historyApiFallback({
  verbose: false
}));

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/api/*', (req, res) => {
  req.url = req.originalUrl;
  
  apiProxy.web(req, res, {
    target: {
      port: 8081,
      host: 'localhost',
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`dev server listening to port ${PORT}`);
});
