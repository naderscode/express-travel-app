module.exports = function(grunt){
	//load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-link-checker',
	].forEach(function(task){
		grunt.loadNpmTasks(task)
	});



};