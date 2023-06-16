const axios = require("axios");

const geocode = (address, callback) => {
  const geocodeUrl =
    "https://api.opencagedata.com/geocode/v1/json?key=8805bf1ac1934276ae3d21cb1ee5f585&q=" +
    encodeURIComponent(address);
  axios
    .get(geocodeUrl)
    .then((response) => {
      if (response.data.results.length === 0) {
        callback("Unable to see the location, search again", undefined);
      } else {
        callback(undefined, {
          latitude: response.data.results[0].geometry.lat,
          longitude: response.data.results[0].geometry.lng,
          location: response.data.results[0].components.country,
        });
      }
    })
    .catch((error) => {
      callback("Unable to connect to the geographic server", undefined);
    });
};

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b56ea36ed88de492d3b3d0beb4831d19&query=" +
    latitude +
    "," +
    longitude;
  axios
    .get(url)
    .then((response) => {
      callback(
        "It is currently " +
          response.data.current.temperature +
          " degrees out. There is a " +
          response.data.current.precip +
          "% chance of rain."
      );
    })
    .catch((error) => {
      callback("Unable to connect to the weather server", undefined);
    });
};

module.exports = { geocode, forecast };

