var Browser = require('zombie'),
	assert = require('chai').assert;


var browser;

suite('Cross-Page-Tests', function(){
		setup(function(){
			browser = new Browser();
		});

		test('requesting a group rate quote from the river-boat tour page should ' +
			'populate the hidden referrer field correctly', function(done){
		var referrer = 'http://localhost:3000/tours/river-boat';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value === referrer);
					done();
				});
			});
		});

		test('requesting a group rate quote from the dunes-coast tour page should' + 
					'populate the hidden referrer field correctly', function(done){
			var referrer = 'http://localhost:3000/tours/dunes-coast';
			browser.visit(referrer, function(){
				browser.clickLink('.requestGroupRate', function(){
					assert(browser.field('referrer').value === referrer);
						done();
				});
			});
		});

		test('visiting the "request group rate" directly should result' + 
					'in an empty value for the referrer field', function(done){
			browser.visit('http://localhost:3000/tours/request-group-rate', function(){
					assert(browser.field('referrer').value === '');
						done();
			});

		});


});