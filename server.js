var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware


// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/scraperController.js");
// var htmlRoutes = require("./routes/htmlRoutes")
app.use(routes);
// app.use(htmlRoutes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/macWorldDB", { useNewUrlParser: true });
var db = mongoose.connection;


app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});

