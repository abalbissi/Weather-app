const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.opencagedata.com/geocode/v1/json?key=8805bf1ac1934276ae3d21cb1ee5f585&q=" +
    encodeURIComponent(address);
  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the geographic server", undefined);
    } else if (response.statusCode !== 200) {
      callback("Request failed with status code:", response.statusCode);
    } else if (response.body.results.length === 0) {
      callback("Unable to see the location, search again", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.results[0].geometry.lat,
        longitude: response.body.results[0].geometry.lng,
        location: response.body.results[0].components.country,
      });
    }
  });
};

const forecast = (latitude, longitude, callback) => {
  const url ='http://api.weatherstack.com/current?access_key=b56ea36ed88de492d3b3d0beb4831d19&query='+latitude+','+longitude
  request({ url: url, json: true }, (error, response ) => {
    if (error) {
      callback("Unable to connect to the geographic server", undefined);
    } else if (response.statusCode !== 200) {
      callback("Request failed with status code:", response.statusCode);
    } else {
      callback(' It is currently ' + response.body.current.temperature + ' degrees out. There is a ' + response.body.current.precip + '% chance of rain.');
    }
  });
};




module.exports = { geocode, forecast };
