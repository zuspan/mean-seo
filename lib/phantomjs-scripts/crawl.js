'use strict';

/**
 * Module dependencies
 */
var page = require('webpage').create(),
	system = require('system'),
	url = system.args[1];

	// url = THREE.ParticleSystem( geometry, material);em.args[system.args.length - 1];
	console.log(url);

/**
 * PhantomJS script
 */

page.onConsoleMessage = function(msg, lineNum, sourceId) {
	console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

// page.onError = function(message, stack) {
// 	console.log('ERROR: ' + message);
// };

//puts shebang back
if (url.indexOf('/shebang/') > -1) {
	url = url.replace('/shebang/', '/#!/');
};

page.open(url, function(status) {
	// page.viewportSize = { width:1024, height:768 };
	// var head = page.evaluate(function(){
	// 	console.log('from page.evaluate');
	// 	return $scope.scene;
	// });

	setTimeout(function(){
		// If PhantomJS successfully crawled
		if (status !== "success") {
			console.log("===! Unable to access network\n");
		} else {
			// console.log(head);
			console.log(page.content);
		}
		// Exiting PhantomJS process
		page.close();
		phantom.exit();
	}, 5000);

	
});