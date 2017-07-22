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
		// console.log(action);
	break;

	// Spotify
	case "spotify-this-song":
		if (searchItem === undefined) {
			spot("the sign");
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
			console.log();
			console.log("-------------------------------------------------------------------");
	    	console.log("MOVIE TITLE: " + jsonResponse.Title);
	    	console.log("RELEASE YEAR: " + jsonResponse.Year);
	    	console.log("IMDb RATING: " + jsonResponse.imdbRating);
	    	console.log("ROTTEN TOMATOES RATING: " + jsonResponse.Ratings[1].Value);
	    	console.log("PRODUCED IN: " + jsonResponse.Country);
	    	console.log("LANGUAGE: " + jsonResponse.Language);
	    	console.log("PLOT: " + jsonResponse.Plot);
	    	console.log("ACTORS: " + jsonResponse.Actors);
	    	console.log("-------------------------------------------------------------------");
	    	console.log();
		}
	});
};



/********** SPOTIFY **********/
function spot(songTitle) {
 
	var spotify = new Spotify({
		id: spotifyClientId,
		secret: spotifyClientSecret
	});
	 
	spotify
	.search({ type: 'track', query: songTitle })
	.then(function(response) {
		var spotifyArr = response.tracks.items[0];

		console.log();
		console.log("-------------------------------------------------------------------");
		console.log("ARTIST: " + spotifyArr.artists[0].name);
		console.log("TITLE: " + spotifyArr.name);
		console.log("ALBUM: " + spotifyArr.album.name);
		console.log("URL: " + spotifyArr.preview_url);
		console.log("-------------------------------------------------------------------");
		console.log();
	})
	.catch(function(err) {
		console.log(error);
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
				console.log();
				console.log("-------------------------------------------------------------------");
				console.log(tweets[i].text);
				console.log("-------------------------------------------------------------------");
		  	}
		}
	})
};



/********** DO WHAT IT SAYS **********/
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {

		var dataArr = data.split(",");
		// console.log(dataArr[0]);
		var actionTxt = dataArr[0];
		var searchTxt = dataArr[1];

		if (error) {
			return console.log(error);
		} else {

			if(actionTxt === "spotify-this-song"){
				spot(searchTxt);
			} else if (actionTxt === "movie-this") {
				omdb(searchTxt);
			} else if (actionTxt === "my tweets") {
				twitter(searchTxt);
			};
		};

	});
};