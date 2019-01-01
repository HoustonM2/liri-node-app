require("dotenv").config();
var fs= require('fs');
var request = require('request');
var input= process.argv[2]
var inputTwo=process.argv[3];
var keys = require('./keys')
var Spotify = require('node-spotify-api');
var moment  = require('moment');


var spotify = new Spotify({
    id: "2b242b2945484a4ea6d1d55bf62a6ccb",
    secret:"b716036951fb416fbf0e8820eab72ec2"
  });
   
 if (input === "spotify-this-song") {
     runSpotify(inputTwo)
 } 
 else if(input=== 'movie-this'){
     runRequest(inputTwo)
 }else if(input==='concert-this'){
     runConcert(inputTwo)
 }else if ( input === 'do-what-it-says'){
     runFs(inputTwo)
 }

function runSpotify(song){


        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err){
              return console.log('Error occurred: ' + err);
            }else
            //A preview link of the song from Spotify
            //The album that the song is from
            console.log('Spotify Results')
            console.log('---------------')
            console.log("Artist:" + data.tracks.items[0].album.artists[0].name); 
            console.log("Album Name:" +data.tracks.items[0].album.name)
            console.log("Song Name:" + data.tracks.items[0].name)
            console.log("Url:" + data.tracks.items[0].preview_url)
          });
          

    }


function runRequest(movie){
  
    request('http://www.omdbapi.com/?t='+ movie + '&apikey=504da74', function (error, response, body) {
      
        console.log("Omdbapi Movie Results")
        console.log('----------------------')
        console.log('Movie:' +JSON.parse(body).Title);
        console.log("Year of Release: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Countries produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Movie Plot: " + JSON.parse(body).Plot);
        console.log("Actor(s): " + JSON.parse(body).Actors);
        
});
}

function runConcert(concert){
    //https://rest.bandsintown.com/artists/Cher/events?app_id=%2088d073cee11973bd901dd4be5315cb8a
    request('https://rest.bandsintown.com/artists/'+ concert + '/events?app_id=%2088d073cee11973bd901dd4be5315cb8a', function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        body = JSON.parse(body);
        // console.log(body[0]);
        console.log('Concert Results')
        console.log('---------------')
        console.log('Venue:' + body[0].venue.name)
        console.log('City:' + body[0].venue.city +","+ body[0].venue.region ) // Print the HTML for the Google homepage.
        console.log('Date of Event: ' +  moment(body.datetime).format("MM/DD/YYYY"));
        
      }); 

}

function runFs(file){
    fs.readFile('random.txt', 'utf8', function(err, contents) {
        
        var words = contents.split(',');
        console.log(words[1]);

        var songTitle =  (words[1]);
    
        runSpotify(songTitle);

    });
         
}







