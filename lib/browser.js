'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	childProcess = require('child_process'),
	// phantomjs = require('phantomjs2'),
	phantomjs = require('slimerjs'),
	binPath = phantomjs.path;

var headless = require('headless');


/**
 * Initialize shell arguments
 */
var childArgs = [
	path.join(__dirname, 'phantomjs-scripts/crawl.js'),
	'/'
];

/**
 * Crawl the page
 */
exports.crawl = function(url, maxBuffer, callback) {
	//tests
	console.log('hi from crawl');
	// console.log(phantomjs.version);
	console.log(binPath);
	var newBinPath = 'Xvfb :1337 & export DISPLAY=:1337 & ' + binPath;
	// console.log(newBinPath);

	// Set the first argument to the url to crawl
	childArgs[1] = url;

	// // //test headless
	// var options = {
	// 	// display: {width: 1024, height: 980, depth: 32},
	// 	binPath: binPath,
	// 	childArgs: childArgs
	// };
	// console.log(childArgs);

	// headless(options, function(err, childProcess, servernum) {
	// 	// childProcess is a ChildProcess, as returned from child_process.spawn()
	// 	console.log('Xvfb running on server number', servernum);
	// 	console.log('Xvfb pid', childProcess.pid);
	// 	console.log('err should be null', err);

	// //sample script for launching xvfb and slimer
	// // Xvfb :1337 & export DISPLAY=:1337 & ./slimerjs myscript.js.

	// // 	// console.log(childProcess);

	// // 	// childProcess.execFile(newBinPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
	// // 	// 	callback(err, stdout);
	// // 	// });
	// });
	
	//new version for xvfb
	childProcess.exec(newBinPath + ' ' + childArgs[0] + ' ' + childArgs [1], { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
		callback(err, stdout);
	});

	// Call the PhantomJS process
	// childProcess.execFile(binPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
	// 	callback(err, stdout);
	// });
};