var express = require('express');

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);

//add the statis middleware
app.use(express.static(__dirname + '/public'));

// set 'showTests' context property if the querystring contains test=1
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


app.get('/', function(req,res){
	res.render('home');
});


app.get('/about', function(req,res){
	res.render('about', {
		//specify page test file the view should be using
		pageTestScript: '/qa/tests-about.js'
	});

});


//custom 404 page
app.use(function(req,res){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//custrom 500 page
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
	console.log('Express started pn http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});