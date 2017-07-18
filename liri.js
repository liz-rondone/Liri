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
	// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	// Feel free to change the text in that document to test out the feature for other commands.



/********** VARIABLES **********/
var fs = require("fs");
var request = require("request");
var spotify = require('spotify');
var twitter = require('twitter');
var action = process.argv[2];
var movieName = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=  ";



/********** SWITCH ACTION **********/
switch(action) {
	case "movie-this":
	omdb();
	break;

	case "spotify-this-song":
	spotify();
	break;

	// case "my-tweets":
	// twitter();
	// break;
}



/********** OMDb **********/
// If the request is successful
request(queryUrl, function omdb(error, response, body) {

	// If information is correctly entered 
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
	console.log("sorry");
})



/********** SPOTIFY **********/
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function spotify(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
});



/********** TWITTER **********/