const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  //console.log('It worked! Returned IP:' , ip);
  return ip;
});

// fetchCoordsByIP(42, (error, data) => {
//   if (error) {
//     console.log("Failed: ", error);
//     return;
//   }
//   console.log("Success: ", data);
// });

fetchISSFlyOverTimes(
  { latitude: 49.27670, longitude: -123.13000 },
  (error, data) => {
    if (error) {
      console.log("Failed:", error);
      return;
    }
    console.log("Success! Data:" + data);
  }
);