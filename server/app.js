const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const app = express();
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));
var photos = 'http://13.57.252.210',
    reservations = '18.217.25.48',
    menus = 'http://18.219.221.244',
    reviews = '54.153.40.76';

// app.all("/:restaurantID/images", function(req, res) {
//     console.log('redirecting to photo-gallery api');
//     apiProxy.web(req, res, {target: photos});
// });

app.all('/booking/reserved/:restaurantID', function(req, res) {
  console.log('redirecting to reservation api');
  apiProxy.web(req, res, {target: reservations});
});
app.all('/booking/create/:restaurantID', function(req, res) {
  console.log('redirecting to reservation api');
apiProxy.web(req, res, {target: reservations});
});

// app.all("/:restaurant_id/menus", function(req, res) {
//     console.log('redirecting to menus api');
//     apiProxy.web(req, res, {target: menus});
// });

app.all("/:restaurantID/reviews/reviewListing", function(req, res) {
  console.log('redirecting to reviews api');
  apiProxy.web(req, res, {target: reviews});
});

app.all("/:restaurantID/reviews/restaurantInfo", function(req, res) {
  console.log('redirecting to reviews api');
  apiProxy.web(req, res, {target: reviews});
});

module.exports = app;
