var fs = require('fs');
var path = require('path');

var gallery = null;
var reportError = function(message, exception) {
	console.error(message + "\n");
	if (typeof(exception) != 'undefined') {
		console.error(exception + "\n");
	}
	process.exit(1);
}

try {
	console.log('Opening gallery.json file...');
	gallery = require('../site-builder/content/gallery.json');
	console.log('- JSON format OK!');
}
catch (e) {
	reportError('There was a problem reading the gallery config.', e);
}

try {
	for (var category in gallery) {
		console.log('Checking category "' + category + '":');
		for (var i = 0; i < gallery[category].length; i++) {
			var image = gallery[category][i];
			var imagePath = path.join(__dirname, '../site-builder', 'public') + '/' + image.image;
			console.log('- ' + image.image);
			fs.accessSync(imagePath, fs.F_OK);
		}
	}

} catch (e) {
	reportError('There was a problem with the file: ' + imagePath, e);
}

console.log("\nThe gallery seems OK!\n");
process.exit(0);