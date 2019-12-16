var express = require("express");
var exphbs = require("express-handlebars");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/article", (req, res) => {
	res.render("article");
});

router.get("/nav", (req, res) => {
	res.render("nav");
});

module.exports = router;