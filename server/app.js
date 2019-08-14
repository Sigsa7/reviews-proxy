const express = require('express');
const path = require('path');
const redis = require('./redisConnection');
const axios = require('axios');
const httpProxy = require('http-proxy');
const morgan = require('morgan');
const apiProxy = httpProxy.createProxyServer();

const app = express();
// app.use(morgan('dev'))
app.get(`/${process.env.LOADERIO}`, (req, res) => {
  res.status(200).send(`${process.env.LOADERIO}`);
});
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));

const photos = 'http://13.52.61.135';
const reservations = 'http://18.217.25.48';
const reviews = 'http://54.153.60.8:3004';


app.get('/:restaurantId/reviews/reviewListing', (req, res) => {
  const { restaurantId } = req.params;
  const { sort, keywords, star } = req.query;

  const redisQueryStr = `${reviews}/${restaurantId}/reviews/reviewListing/${sort}/${keywords}/${star}`;
  
  redis.get(redisQueryStr, (err, result) => {
    if (result) {
      const jsonResult = JSON.parse(result);
      return res.status(200).json(jsonResult);
    } else {
      axios.get(
        `${reviews}/${restaurantId}/reviews/reviewListing`, 
        { params: { sort, keywords, star } },
      )
        .then(({ data }) => {
          redis.setex(redisQueryStr, 1800, JSON.stringify(data));
          return data;
        })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    }
  });
});

app.get('/:restaurantId/reviews/restaurantInfo', (req, res) => {
  const { restaurantId } = req.params;

  const redisQueryStr = `${reviews}/${restaurantId}/reviews/restaurantInfo`;
  
  redis.get(redisQueryStr, (err, result) => {
    if (result) {
      const jsonResult = JSON.parse(result);
      return res.status(200).json(jsonResult);
    } else {
      axios.get(`${reviews}/${restaurantId}/reviews/restaurantInfo`)
        .then(({ data }) => {
          redis.setex(redisQueryStr, 1800, JSON.stringify(data));
          return data;
        })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
    }
  });
});

app.all("/:restaurantID/images", function(req, res) {
    console.log('redirecting to photo-gallery api');
    apiProxy.web(req, res, {target: photos});
});

app.all('/booking/reserved/:restaurantID', function(req, res) {
  console.log('redirecting to reservation api');
  apiProxy.web(req, res, {target: reservations});
});
app.all('/booking/create/:restaurantID', function(req, res) {
  console.log('redirecting to reservation api');
apiProxy.web(req, res, {target: reservations});
});

module.exports = app;
