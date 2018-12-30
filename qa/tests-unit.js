var featured = require('../lib/featured.js');
var expect = require('chai').expect;

suite('Featured city testss', function(){
	test('getFeatured() should return a featured city', function(){
		expect(typeof featured.getFeatured() === 'string');
	});
});
