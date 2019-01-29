require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv.slice(3).join("+");

console.log(name);

axios.get("http://www.omdbapi.com/?t=" + name + "&apikey=trilogy").then(
  function(response) {
    console.log(response);
  }
);