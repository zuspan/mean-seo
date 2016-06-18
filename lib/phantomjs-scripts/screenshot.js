'use strict';

/**
 * Module dependencies
 */
var page = require('webpage').create(),
	system = require('system'),
	url = system.args[1],
	output = system.args[2];

// console logs for debugging
// page.onConsoleMessage = function(msg, lineNum, sourceId) {
// 	console.log('<!-- CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")' + '-->');
// };

// page.onError = function(message, stack) {
// 	console.log('<!-- ERROR: ' + message + '-->');
// };

page.open(url, function (status) {
	var width = 1024;
	var height = 768;
    page.viewportSize = { width: width, height: height };
    page.clipRect = { top: 0, left: 0, width: width, height: height };
    setTimeout(function(){
	    page.render(output);
		page.close();
	    phantom.exit();
	}, 6000);
});
