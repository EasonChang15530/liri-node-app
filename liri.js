require("dotenv").config();
// run "npm install axios" in this folder first!
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
spotify = new Spotify(keys.spotify);

// capture the command that the user puts in (process.argv[2])
var userCommand = process.argv[2];
// capture the user's search term (process.argv index 3 and later) (*use activity 18 level 2 for guidance on how to capture this!*)
var userSearchTerm = process.argv.slice(3).join("+");
console.log(userSearchTerm);
// Make a switch statement for the four commands. The default case should tell the user to try again.
switch (userCommand) {
  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;

  default:
    canNotRecognize();
    break;
}

// check if userCommand is "concert-this"
function concertThis() {
  // run an API call using axios to the bands-in-town API
  // inject the user's search term in the queryURL
  var artist = userSearchTerm;
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  console.log(queryUrl);
  axios.get(queryUrl).then(function (response) {
    // Display name of venue, venue location, and the date of the event 
    for (let i = 0; i < response.data.length; i++) {
      console.log("\nName of the venue: " + response.data[i].venue.name);
      console.log("Venue location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
      // Format the date of the event to be MM/DD/YYYY (look at the moment node package documentation!)
      // npm i moment
      console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
    };
  }).catch(function (error) {
    console.log(error.config);
  });
};

// check if userCommand is "spotify-this-song"
function spotifyThisSong() {
  // Using Spotify Node package info and documentation, make a call to the Spotify API using the user's search term
  var songName = userSearchTerm;
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log(data);
  });



  // Display to the user:
  // * Artist(s)
  // * The song's name
  // * A preview link of the song from Spotify
  // * The album that the song is from

  // Provide a default searchTerm if the user didn't provide an argument
};

// check if userCommand is "movie-this"
function movieThis() {
  // Use Axios to call the OMDB API using the user's search term. Use activities 17 and 18 as a reference!
  var movieName = userSearchTerm;
  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryURL);
  axios.get(queryURL).then(function (response) {
    // Display to the user:
    // * Title of the movie.
    console.log("Title of the movie: " + response.data.Title);
    // * Year the movie came out.
    console.log("Release Year: " + response.data.Year);
    // * IMDB Rating of the movie.
    console.log("IMDB Rating: " + response.data.Rated);
    // * Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    // * Country where the movie was produced.
    console.log("Country: "+ response.data.Country);
    // * Language of the movie.
    console.log("Language: "+ response.data.Language);
    // * Plot of the movie.
    console.log("Plot: "+ response.data.Plot);
    // * Actors in the movie.
    console.log("Actors: "+ response.data.Actors);
  }).catch(function (error) {
    console.log(error.config);
  });


  // Provide a default search if the user didn't provide an argument.
};

// check if userCommand is "do-what-it-says" (DO THIS PART OF THE ASSIGNMENT ONLY IF THE OTHER THREE API CALLS WORK WELL!)
function doWhatItSays() {


  // Use "fs" to read the random.txt file (hint, you will need to require fs! Look at activities 12 and 13)
  // The command will be whatever is before the comma. The search term will be whatever is after the comma.
  // Make the corresponding API call depending on what the command is.
};

// If the user doesn't provide 1 of the 4 recognizable commands, display message to the user to try again
function canNotRecognize() {
  console.log("Cannot recognize your input, please try again.");
};