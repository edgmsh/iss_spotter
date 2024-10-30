// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

let myIP = "";

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  myIP = ip;
});

fetchCoordsByIP(myIP, (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned latitude:' , coords.latitude);
  console.log('It worked! Returned longitude:' , coords.longitude);
});

