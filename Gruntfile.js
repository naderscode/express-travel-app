module.exports = function(grunt){
	//load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-link-checker',
	].forEach(function(task){
		grunt.loadNpmTasks(task)
	});

	//configure plugins
	grunt.initConfig({
	    cafemocha: {
	        all: {src: 'qa/tests-*.js', options: {ui: 'tdd'}}
	    },
	    jshint: {
	        app: ['travelapp.js', 'public/js/**/*.js', 'lib/**/*.js'],
	        qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
	    },
	    linkChecker: {
	        dev: {
	            site: 'localhost',
	            options: {
	                initialPort: 3000
	            }
	        }
	    },
});

};