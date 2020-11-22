// dependencies
var express = require('express');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var log = require("loglevel");
var path = require("path");

// Setting up Express app

var app = express();
var port = process.env.PORT || 3000;

//bringing in db
var db = require(path.join(__dirname, '/models'));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

console.log('process.env.NODE_ENV (in server.js) = ' + process.env.NODE_ENV);
if (process.env.NODE_ENV) { // Production
	console.log("Setting log level to ERROR");
	log.setLevel("ERROR");
} else { // Development
	var level = process.env.LOG_LEVEL || "DEBUG";
	console.log("Setting log level to " + level);
	log.setLevel(level);
}

// // Importing routes and give the server access to them.
require('./controllers/burgers_controller.js')(app);

// Syncing the db
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("The App is listening on PORT " + port);
  });
});
