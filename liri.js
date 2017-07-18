/********** DIRECTIONS **********/
// my-tweets
	//  last 20 tweets

// spotify-this-song
	// Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from
	// default: "The Sign" by Ace of Base.

// movie-this
	// Title of the movie.
	// Year the movie came out.
	// IMDB Rating of the movie.
	// Rotten Tomatoes Rating of the movie.
	// Country where the movie was produced.
	// Language of the movie.
	// Plot of the movie.
	// Actors in the movie.
	// default: "Mr. Nobody" 

// do-what-it-says


/********** VARIABLES **********/
var fs = require("fs");
var request = require("request");
// Grab the movieName which will always be the third node argument.
var movieName = process.argv[2];
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=  ";
	// This line is just to help us debug against the actual URL.
	// console.log(queryUrl);
var twitter = require('twitter');


/********** OMDb **********/
// If the request is successful
request(queryUrl, function(error, response, body) {
	if (!error && response.statusCode === 200) {
		// Parse the body of the site and recover just the requested info
    	console.log("Movie Title: " + JSON.parse(body).Title);
    	console.log("Release Year: " + JSON.parse(body).Year);
    	console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
    	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
    	console.log("Produced in: " + JSON.parse(body).Country);
    	console.log("Language: " + JSON.parse(body).Language);
    	console.log("Plot: " + JSON.parse(body).Plot);
    	console.log("Actors: " + JSON.parse(body).Actors);
	}
})


/********** SPOTIFY **********/



/********** TWITTER **********/