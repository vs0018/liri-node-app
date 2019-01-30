require("dotenv").config();
var fs = require("fs");

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv.slice(3).join("+");

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

    if (!name) {
        name = "mr+nobody"
    };

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
        console.log("\n------------------------\n");
    });
};

function spotifyGet() {
    if (!name) {
        name = "the+sign"
    };

    spotify.search({ type: 'track', query: name, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
            };
  
        var songInfo = data.tracks.items[0];

        var albumInfo = songInfo.album;
        
        var artistInfo = albumInfo.artists;
        var x;
        var artists = [];
        for (x in artistInfo) {
            artists.push(artistInfo[x].name);
        }
        console.log("Track Name: " + name);
        console.log("Artists: " + artists.join(", "));
        console.log("Preview URL: " + songInfo.preview_url);
        console.log("Album name: " + albumInfo.name);
        console.log("\n------------------------\n");
    });
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

        var dateFixed = moment(date, "YYYY-MM-DDTHH:mm:ss").format("MM/DD/YY");

        console.log("Date: " + dateFixed);

        console.log("\n------------------------\n");
        };
    });
};

