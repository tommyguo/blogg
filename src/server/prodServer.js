require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const https = require('https');
const httpProxy = require('http-proxy');

// set up ports
const httpPort = 80;
const httpsPort = 443;

// http -> https redirect
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

const apiProxy = httpProxy.createProxyServer();

app.use('/api/*', (req, res) => {
  req.url = req.originalUrl;

  apiProxy.web(req, res, {
    target: {
      port: 8081,
      host: 'localhost',
    }
  });
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// set up http stuff
const http = require('http');
const httpServer = http.createServer(app);
httpServer.listen(httpPort);
console.log('prod server listening to port', httpPort);

const privateKey = fs.readFileSync(process.env.PRIV_KEY_PATH, 'utf8');
const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(httpsPort);
console.log('prod server listening to port', httpsPort);