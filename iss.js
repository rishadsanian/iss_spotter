const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback, ip) {
  // use request to fetch IP address from JSON API

  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      //Error handling
      callback("Request Failed \n" + error, null);
      return;
    }
    //Error handling
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    ip = data["ip"];
    callback(null, ip);
    return;
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    if (error) {
      //Error handling
      callback("Request Failed \n" + error, null);
      return;
    }
    const data = JSON.parse(body);
    //Error handling
    if (!data["success"]) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;

      callback(message, null);
      return;
    }
    //return data
    const coordinates = {
      lattidue: data["latitude"],
      longitude: data["longitude"],
    };
    callback(null, coordinates);
    return;
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        //Error handling
        callback("Request Failed \n" + error, null);
        return;
      }
      //Error handling
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const data = JSON.parse(body);

      callback(null, JSON.stringify(data["response"]));
      return;
    }
  );
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
