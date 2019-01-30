require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv.slice(3).join("+");

console.log(name);

switch (command) {
    case "concert-this":
      concertGet();
      break;
    
    case "spotify-this-song":
      spotifyGet();
      break;
    
    case "movie-this":
      movieGet();
      break;
    
    case "do-what-it-says":
      doGet();
      break;
    }

function movieGet() {
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
};

function spotifyGet() {
    axios.get("http://www.omdbapi.com/?t=" + name + "&apikey=trilogy").then(
    function(response) {
        // var movieInfo = response.data;

        // console.log("Title: " + movieInfo.Title);
        // console.log("Year: " + movieInfo.Year);
        // console.log("IMDb Rating: " + movieInfo.imdbRating);
        // console.log("Country: " + movieInfo.Country);
        // console.log("Language: " + movieInfo.Language);
        // console.log("Plot: " + movieInfo.Plot);
        // console.log("Actors: " + movieInfo.Actors);
        }
    );
};

function concertGet() {
    axios.get("https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp").then(
    function(response) {
        var concertInfo = response.data;

        var x;

        for (x in concertInfo) {

        console.log("Venue: " + concertInfo[x].venue.name);
        console.log("Location: " + concertInfo[x].venue.city + ", " + concertInfo[x].venue.region);

        var date = concertInfo[x].datetime;
        
        var dateFixed = moment(date).format("MMM Do YY");

        console.log("Date: " + dateFixed);
            };
        });
    };