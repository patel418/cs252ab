/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com



var Cloudant = require('cloudant');

require('dotenv').load();

var bodyparser = require('body-parser');

var user = "f085e392-3304-4ea3-8295-c63c236e510f-bluemix";

var pass = "cbeb0894389eaf2af2f63a15ce20e4e7147d4ebb277d96f227918bb262fc0f62";

var cloud = Cloudant({account:user, password:pass});

var passport = require('passport');

var adventureb = cloud.db.use('adventureb');

//var nano = require('nano')("https://f085e392-3304-4ea3-8295-c63c236e510f-bluemix.cloudant.com");
var nano = require('nano')("https://f085e392-3304-4ea3-8295-c63c236e510f-bluemix:cbeb0894389eaf2af2f63a15ce20e4e7147d4ebb277d96f227918bb262fc0f62@f085e392-3304-4ea3-8295-c63c236e510f-bluemix.cloudant.com");


var request = require('request');
var http = require('http');

var express = require('express');

		// cfenv provides access to your Cloud Foundry environment
		// for more info, see: https://www.npmjs.com/package/cfenv
		var cfenv = require('cfenv');

		// create a new express server
		var app = express();
app.use(express.static(__dirname + '/public'));
var db = nano.db.get('adventureb', function(err, body)
{
	if (!err)
	{
		console.log('found database');
	}
});





app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(bodyparser.json("application/json"));
 app.post('/', function(req, res)
{
	console.log(req.body);
	console.log("this is a test");
	res.setHeader('Content-Type', 'application/json');
    	/*response has to be in the form of a JSON*/
        req.body.serverMessage = "NodeJS replying to angular"
	        /*adding a new field to send it to the angular Client */
		    res.send(JSON.stringify(req.body));
		        /*Sending the respone back to the angular Client */

	var ab = nano.use('adventureb');
	ab.insert(req.body, function(err)
		{
			if (err)
				return console.log('inserting error');
			console.log("You have inserted the title");
		});

	});

app.use(function(req, res, next) {
	      res.setHeader("Access-Control-Allow-Origin", "https://localhost:6001/");
	      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,   Content-Type, Accept");
	      res.setHeader('Access-Control-Allow-Credentials', true);
	      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	      
	      next();
});
app.get('/#/home', function(req, res, next)
{
//res.writeHead(200,{'Content-Type':'application/json'});
res.setHeader('Content-Type', 'application/json');

res.setHeader("Access-Control-Allow-Origin", "https://localhost:6001/");
	      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With,   Content-Type, Accept");
	      res.setHeader('Access-Control-Allow-Credentials', true);
	      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	      



/*
http.request({
	host: 'localhost:6001',
	path: '/#/home'


}, function(res)
{
	res.send(JSON.stringify("Hello World"));
}); */


/* var options = {
	  uri: '/#/home',
	    method: 'GET',
	      json: {
		          "error": "this is lame"
			    }
};

request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		      console.log(body.id) // Print the shortened url.
		        }
}); */ 


res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
/* adventureb.find({selector:{post:true}}, function(er, result) {
	  if (er) {
		      console.log("er");
		        }

			  console.log('Found %d documents with name simron', result.docs.length);
			    for (var i = 0; i < result.docs.length; i++) {
				        
					console.log('  Doc title: %s', result.docs[i]);
					  }
			//res.json({"title": "sidhant", "category": "abc", "body": "bajbscajhbrc"});
			//res.json({"error": "message"}, null, 3);
});
//next(); */
req.type("json");
//res.contentType('application/json');
req.send(JSON.stringify({"hello": false}));
next();
});





	

/*var first_name = {name:'first-name', type:'json', index:{fields:['name']}}
adventureb.index(first_name, function(er, response) {
	  if (er) {
		      console.log("not working");;
		        }

			  console.log('Index creation result: %s', response.result);
}); */

/*var alice = nano.use('adventureb');
alice.insert({ crazy: true }, 'rabbit', function(err, body) {
	  if (!err)
		      console.log(body); */
//});

	




// Running on Bluemix. Parse out the port and host that we've been assigned.
// serve the files out of ./public as our main files

//get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
		// print a message when the server starts listening
		console.log("server starting on " + appEnv.url);
		});
