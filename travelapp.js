"use strict";

var express = require('express');
var fortune = require('./lib/featured.js');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && 
		req.query.test === '1';
	next();
});

//Mock weather data
function getWeatherData(){
	return {
		locations: [
				{
					name: 'Paris',
					forecastUrl: 'https://www.wunderground.com/weather/fr/paris',
					iconUrl: 'https://icons.wxug.com/i/c/v4/26.svg',
					weather: 'Cloudy',
					temp: '48F (10 C)',
				},
				{
					name: 'London',
					forecastUrl: 'https://www.wunderground.com/weather/gb/london',
					iconUrl: 'https://icons.wxug.com/i/c/v4/27.svg',
					weather: 'Mostly Cloudy',
					temp: '50 F (12 C)',	
				},
				{
					name: 'New York',
					forecastUrl: 'https://www.wunderground.com/weather/us/ny/new-york-city',
					iconUrl: 'https://icons.wxug.com/i/c/v4/27.svg',
					weather: 'Mostly Cloudy',
					temp: '40 F (5 C)',
				},

			],

	};
}
// middleware to add weather data to context
app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = getWeatherData();
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req,res){
	res.render('about', { 
		featured: featured.getFeatured(),
		pageTestScript: '/qa/tests-about.js' 
	});
});
app.get('/tours/river-boat', function(req, res){
	res.render('tours/river-boat');
});

app.get('/tours/dunes-coast', function(req, res){
	res.render('tours/dunes-coast');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});

app.disable('x-powered-by');