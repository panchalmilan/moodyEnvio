"use strict";

var path = require('path');

var geoCode = require('./utils/geocode');

var forecast = require('./utils/forecast');

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var publicDirPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express["static"](publicDirPath));
app.get('', function (req, res) {
  res.render('index', {
    title: 'Weather ',
    name: 'Milan Panchal'
  });
});
app.get('/help', function (req, res) {
  res.render('help', {
    title: 'This is a help page',
    name: 'Milan Panchal'
  });
});
app.get('/about', function (req, res) {
  res.render('about', {
    title: 'About page for this site'
  });
});
app.get('/weather', function (req, res) {
  var address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geoCode(address, function (err) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        latitude = _ref.latitude,
        longitude = _ref.longitude,
        location = _ref.location;

    if (err) {
      return res.send({
        error: err
      });
    }

    forecast(latitude, longitude, function (err, _ref2) {
      var forecast = _ref2.forecast,
          location = _ref2.location;

      if (err) {
        return res.send({
          error: err
        });
      }

      res.send({
        forecast: forecast,
        location: location,
        address: address
      });
    });
  });
});
app.get('/products', function (req, res) {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({
    products: []
  });
});
app.get('/help/*', function (req, res) {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: 'Help page Not Found'
  });
});
app.get('*', function (req, res) {
  res.render('404', {
    errorMessage: 'Page Not Found',
    title: 'Page Not Found'
  });
});
app.listen(port, function () {
  console.log('Server is up on port ' + port);
});