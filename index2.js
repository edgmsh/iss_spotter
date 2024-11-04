const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss_promised');

fetchMyIP()
  .then((response) => console.log(response));

  fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((body) => console.log(body));

  fetchMyIP()
  .then((ip) => fetchCoordsByIP(ip))
  .then((coords) => fetchISSFlyOverTimes(coords))
  .then(body => console.log(body));

  nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
