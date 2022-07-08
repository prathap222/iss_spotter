const nextISSTimesForMyLocation = require('./iss_promised');

const printValues = function(values) {
  for (let value of values) {
    let riseTime = new Date(0);
    riseTime.setUTCSeconds(value.risetime);
    let duration = value.duration;
    console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((body) => {
    printValues(body);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });