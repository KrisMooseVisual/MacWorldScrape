var cheerio = require("cheerio");
var axios = require("axios");

console.log
    ("\n***********************************\n" +
        "SCRAPING FROM MACWORLD!\n" +
        "FROM MACWORLD'S WEBSITE:" +
        "\n***********************************\n");

axios.get("https://www.macworld.com/").then(function (response) {

    var $ = cheerio.load(response.data);

    var results = [];

    $("p.title").each(function (i, element) {

        var title = $(element).text();

        var link = $(element).parent().attr("href");

        console.log($(element));

        results.push({
            title: title,
            link: link,

        });
    });

    console.log(results);
});
