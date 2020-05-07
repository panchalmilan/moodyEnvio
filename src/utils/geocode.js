const request = require('request');

const geoCode = (address, cb) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    address +
    ' .json?access_token=key&limit=1';

  request({ url, json: true }, (err, {body} = {}) => {
    if (err) {
      cb(
        'Unable to connect to location services.Check your internet connection. ',
        undefined
      );
    } else if (!body.features.length) {
      cb('Unable to find location. Try another search !', undefined);
    } else {
      cb(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
