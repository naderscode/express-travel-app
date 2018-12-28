var featuredCity = [
	"Paris.",
	"London.",
	"New York.",
	"Rome.",
	"Madrid.",
];

exports.getFeatured = function() {
	var idx = Math.floor(Math.random() * featuredCity.length);
	return featuredCity[idx];
};
