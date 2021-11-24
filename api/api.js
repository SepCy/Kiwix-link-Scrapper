	const axios = require("axios");
	const cheerio = require("cheerio");
	const { router } = require("express").Router();
	var db = require("./../database/db.js")
	// Function extracting links

	const extractLinks = ($) => [
		...new Set(
			$(".book__list a") // Select pagination links
			.map((_, a) => $(a).attr("href")) // Extract the href (url) from each link
			.toArray() // Convert cheerio object to array
		),
	];
	
	var LinksArry = []
	const URL = "http://localhost:8090";
	
	

	axios.get(URL).then(({ data }) => {
		const $ = cheerio.load(data); // Initialize cheerio
		const links = extractLinks($);
	
		LinksArry = [...links]

		var sql ='INSERT INTO links (url) VALUES (?)'

		for(let i = 0; i < LinksArry.length; i++){
			console.log(LinksArry[i])
			db.run(sql, LinksArry[i], function (err, result) {
				if (err){
					console.log(err.message)
				}
				console.log('success')
			});
		}
		

		// // user get infos
		// const user = 'informatique'


		// for(let i = 0; i < LinksArry.length; i++){
		// 	console.log(LinksArry[i])
		// }

	});

	