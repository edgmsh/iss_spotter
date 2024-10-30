//const http = require('http');
const needle = require('needle');
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
/*
const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    let err = false;
    if (!ip) {
      err = true;
    }
    console.log("My public IP address is: " + ip);
    callback(err,ip);
  });
});
}
*/
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const bodyObj = JSON.parse(body);
    const ip = bodyObj.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when coords by IP: ${ip}`), null);
      return;
    }
    const bodyObj = JSON.parse(body);
   // const latitude = bodyObj.latitude;
   // const longitude = bodyObj.longitude;
    let coords = {latitude: bodyObj.latitude , longitude: bodyObj.longitude};
    callback(null, coords);
  }); 
};

module.exports = { fetchMyIP, fetchCoordsByIP };
