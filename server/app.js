const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const app = express();
app.use(express.static(path.join(__dirname, '/../public/')));
var photos = 'http://localhost:3001',
    reservations = 'http://localhost:3002',
    menus = 'http://localhost:3003',
    reviews = 'http://localhost:3004';

app.all("/:restaurantID/images/*", function(req, res) {
    console.log('redirecting to 3001/images');
    apiProxy.web(req, res, {target: photos});
});

app.all("/:restaurant_id/reservations", function(req, res) {
  console.log('redirecting to 3002/reservations');
  apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
    console.log('redirecting to 3002/reservations');
    apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/menus", function(req, res) {
    console.log('redirecting to 3003/menus');
    apiProxy.web(req, res, {target: menus});
});

app.all("/:restaurantID/reviews/*", function(req, res) {
  console.log('redirecting to 3004/reviews');
  apiProxy.web(req, res, {target: reviews});
});

module.exports = app;
