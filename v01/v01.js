var express = require('express');

var http = require('http');

//tunnel is a ssh2 clientConnection object 
var tunnel = require('reverse-tunnel-ssh');

//Library used to find local IP address.
//var ip = require('ip');


/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

var app = express();
var port = 3100;

/*
 * Config for Production and Development
 */
app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views');

// Locate the assets
app.use(express.static(__dirname + '/assets'));


// Set Handlebars
app.set('view engine', 'handlebars');

/*
 * Routes
 */
//Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});


/*
console.log('My local IP: '+ip.address());


//Query whatismyipaddress.com to get the external IP address.
http.get('http://bot.whatismyipaddress.com', function(res){
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log('My external IP: '+chunk);
    });
});
*/

tunnel({
  host: 'localhost',
  username: 'user-ssh',
  dstHost: '0.0.0.0', // bind to all IPv4 interfaces 
  dstPort: 19999,
  //srcHost: '127.0.0.1', // default 
  //srcPort: dstPort // default is the same as dstPort 
}, function(error, clientConnection) {
  debugger;
  console.log('Reverse SSH successful!');
});

/* Start up the Express web server */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);



