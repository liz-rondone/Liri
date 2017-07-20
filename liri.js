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


/********** KEYS **********/
var keys = require("./keys.js");
var twitterConKey = keys.twitterKeys.consumer_key;
var twitterConSecret = keys.twitterKeys.consumer_secret;
var twitterTokKey = keys.twitterKeys.access_token_key;
var twitterTokSecret = keys.twitterKeys.access_token_secret;
var omdbKey = keys.omdbKeys.omdb_key;
var spotifyClientId = keys.spotifyKeys.client_id;
var spotifyClientSecret = keys.spotifyKeys.client_secret;
/********** VARIABLES **********/
var fs = require("fs");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var action = process.argv[2];
var searchItem = process.argv[3];


/********** SWITCH ACTION **********/
switch(action) {
	// OMDb
	case "movie-this":
		if (searchItem === undefined) {
			omdb("mr+nobody");
		} else {
			omdb(searchItem);
		}
	break;

	// Spotify
	case "spotify-this-song":
		if (searchItem === undefined) {
			spot("the sign ace of base");
		} else {
			spot(searchItem);
		}
	break;

	// Twitter
	case "my-tweets":
		twitter();
	break;

	// Do What It Says
	case "do-what-it-says":
		doWhatItSays();
	break;
}



/********** OMDb **********/
function omdb(movieName) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + omdbKey;
	
	request(queryUrl, function(error, response, body) {

		if (!error && response.statusCode === 200) {
			// Parse the body of the site and recover just the requested info
			var jsonResponse = JSON.parse(body);

	    	console.log("Movie Title: " + jsonResponse.Title);
	    	console.log("Release Year: " + jsonResponse.Year);
	    	console.log("IMDb Rating: " + jsonResponse.imdbRating);
	    	console.log("Rotten Tomatoes Rating: " + jsonResponse.Ratings[1].Value);
	    	console.log("Produced in: " + jsonResponse.Country);
	    	console.log("Language: " + jsonResponse.Language);
	    	console.log("Plot: " + jsonResponse.Plot);
	    	console.log("Actors: " + jsonResponse.Actors);
		}
	});
};



/********** SPOTIFY **********/
function spot(songTitle) {

	var spotify = new Spotify({
	  id: spotifyClientId,
	  secret: spotifyClientSecret
	});
	 
	spotify.search({ type: 'track', query: songTitle }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	var jsonResponse = JSON.parse(data);

	console.log("Artist: " + jsonResponse.artist);
	});	
};


/********** TWITTER **********/
function twitter() {

	var client = new Twitter({
	  consumer_key: twitterConKey,
	  consumer_secret: twitterConSecret,
	  access_token_key: twitterTokKey,
	  access_token_secret: twitterTokSecret
	});

	var params = {screen_name: 'wrigron'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			var tweetLimit = 20;
		  	for (var i = 0; i < tweetLimit; i++) {
				console.log(tweets[i].text);
				console.log();
		  	}
		}
	})
};



/********** DO WHAT IT SAYS **********/
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		console.log(data);
		var dataArr = data.split(",");
		console.log(dataArr);
	});
};