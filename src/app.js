const path = require('path');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const express = require('express');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather ',
    name: 'Milan Panchal',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'This is a help page',
    name: 'Milan Panchal',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page for this site',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geoCode(address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(latitude, longitude, (err, { forecast, location }) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: 'Help page Not Found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page Not Found',
    title: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
