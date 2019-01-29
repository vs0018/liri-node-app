require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
// var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv.slice(3).join("+");

console.log(name);

axios.get("http://www.omdbapi.com/?t=" + name + "&apikey=trilogy").then(
  function(response) {
    var movieInfo = response.data;

    console.log("Title: " + movieInfo.Title);
    console.log("Year: " + movieInfo.Year);
    console.log("IMDb Rating: " + movieInfo.imdbRating);
    console.log("Country: " + movieInfo.Country);
    console.log("Language: " + movieInfo.Language);
    console.log("Plot: " + movieInfo.Plot);
    console.log("Actors: " + movieInfo.Actors);
    }
);