"use strict";

var request = require('request');

var forecast = function forecast(lat, _long, cb) {
  var url = 'http://api.weatherapi.com/v1/forecast.json?key=9493a20f97a345c7b7670650200305&q=' + lat + ',' + _long;
  request({
    url: url,
    json: true
  }, function (err, _ref) {
    var body = _ref.body;

    if (err) {
      cb('unable to connect to weather services :(', undefined);
    } else if (body.error) {
      cb('Unable to find location :(', undefined);
    } else {
      var temp = body.current.temp_c;
      var text = body.forecast.forecastday[0].day.condition.text;
      var name = body.location.name;
      var region = body.location.region;
      var country = body.location.country;
      cb(undefined, {
        location: "".concat(name, ", ").concat(region, ", ").concat(country),
        forecast: "Today weather is ".concat(text, " and temperature is ").concat(temp, " C.")
      });
    }
  });
};

module.exports = forecast;