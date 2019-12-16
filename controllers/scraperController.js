var express = require("express");
var router = express.Router();
var path = require("path");

var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");
var mongoose = require("mongoose");
mongoose.Promise = Promise;

var Note = require("../models/Note.js")
var Article = require("../models/Article.js")

router.get("/", function (req, res) {
    res.redirect("/articles");
});


// Routes
router.get("/scrape", function (req, res) {
    request("http://www.macworld.com/", function (error, response, body) {
        console.log(body);
        var $ = cheerio.load(body);
        var titleArray = [];

        $("div.excerpt-text").each(function (i, element) {
            var result = {};
            result.title = $(this)
                .find("p.crawl-headline")
                .children("a")
                .text();
            result.link = $(this)
            .find("p.crawl-headline")
                .children("a")
                .attr("href");
                result.summary = $(this)
                .find("p.crawl-summary")
                .text();
            console.log(result);
        });
        // Send a message to the client
        res.send("Scrape Complete");
    });
});

router.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("Note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.post("/articles/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.get("/clearAll", function (req, res) {
    Article.remove({}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed all articles");
        }
    });
    res.redirect("/articles-json");
});


module.exports = router;

