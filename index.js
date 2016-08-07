'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.route('/pins')
.post(function(req, res, next) {
	var data = req.body;

	var lat = data.lat;
	var lng = data.lng;
	var text = data.text;

	if (!lat || !lng || !text) {
		res.status(400);
		res.json({ error: "lat, lng, and text are mandatory fields" });
		return;
	}

	// TODO: Store pin in DB

	res.json({ result: "OK" });
})
.get(function(req, res, next) {
	var lat = req.query.lat;
	var lng = req.query.lng;
	var rad = req.query.rad || 20;

	if (!lat || !lng) {
		res.status(400);
		res.json({ error: "lat and lng are mandatory query params." });
		return;
	}

	// TODO: Read pins from DB

	var out = {
		"pins": [
			{ lat: 49.34, lng: -125.325, text: "Alice's House" },
			{ lat: 48.643, lng: -122.123, text: "Bob's House" },
			{ lat: 49.497, lng: -134.183 }
		]
	}

	res.json(out);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
