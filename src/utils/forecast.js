const request = require('request');
const forecast = (lat, long, cb) => {
  const url =
    'http://api.weatherapi.com/v1/forecast.json?key=9493a20f97a345c7b7670650200305&q=' +
    lat +
    ',' +
    long;
  request({ url, json: true }, (err, {body}) => {
    if (err) {
      cb('unable to connect to weather services :(', undefined);
    } else if (body.error) {
      cb('Unable to find location :(', undefined);
    } else {
      const temp = body.current.temp_c;
      const text = body.forecast.forecastday[0].day.condition.text;
      const name = body.location.name;
      const region = body.location.region;
      const country = body.location.country;
      cb(undefined, {
        location: `${name}, ${region}, ${country}`,
        forecast: `Today weather is ${text} and temperature is ${temp} C.`,
      });
    }
  });
};

module.exports = forecast;
