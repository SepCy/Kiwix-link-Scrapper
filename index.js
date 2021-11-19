const axios = require("axios");
const cheerio = require("cheerio");

// Function extracting links

const extractLinks = ($) => [
  ...new Set(
    $(".book__list a") // Select pagination links
      .map((_, a) => $(a).attr("href")) // Extract the href (url) from each link
      .toArray() // Convert cheerio object to array
  ),
];

const URL = "http://localhost:8090";

axios.get(URL).then(({ data }) => {
  const $ = cheerio.load(data); // Initialize cheerio
  const links = extractLinks($);

  console.log(links);
});
