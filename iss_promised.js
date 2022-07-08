const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude } = JSON.parse(body);
  let url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const responseReceived = JSON.parse(data).response;
      return responseReceived;
    });
}

module.exports = nextISSTimesForMyLocation;