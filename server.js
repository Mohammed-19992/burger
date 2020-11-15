
// Dependencies

var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();

var connection = require("./config/connection");
var exphbs = require("express-handlebars");

// parse application of json
app.use(bodyParser.json());

// Serving static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./controllers/burgerController"));

// Setting up handlebars
// var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Connecting to the database and start express server
connection.connect(error => {
    if (error) {
        console.log(error);
    } else {
        app.listen(PORT, () => {
            console.log(`This application is listening ${PORT}`);
        });
    }
});
