'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	childProcess = require('child_process'),
	// phantomjs = require('phantomjs2'),
	phantomjs = require('slimerjs'),
	binPath = phantomjs.path,
	gl = require("gl")();
	// page = require('webpage').create();

// var headless = require('headless');


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

	// testing locally
	var newBinPath = 'Xvfb :1337 & export DISPLAY=:1337 & ' + binPath;

	// on heroku
	// var newBinPath = 'xvfb-run ' + binPath;

	// console.log(newBinPath);

	// Set the first argument to the url to crawl
	// childArgs[1] = url;
	// console.log(childArgs);

	//test headless
	// var options = {
	// 	display: {width: 1024, height: 980, depth: 32},
	// 	binPath: binPath,
	// 	childArgs: childArgs
	// };
	// console.log(childArgs);

	// headless(options, function(err, child_Process, servernum) {

	// 	// childProcess is a ChildProcess, as returned from child_process.spawn()
	// 	console.log('Xvfb running on server number', servernum);
	// 	console.log('Xvfb pid', child_Process.pid);
	// 	console.log('err should be null', err);

	// 	//code from crawl
	// 	// phantomjs.create(function(error,ph){
	// 	// 	ph.createPage(function(err,page){

	// 	// 	  	page.onConsoleMessage = function(msg, lineNum, sourceId) {
	// 	// 			console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
	// 	// 		};

	// 	// 		page.open(url, function(status) {
	// 	// 			// page.viewportSize = { width:1024, height:768 };
	// 	// 			// var head = page.evaluate(function(){
	// 	// 			// 	console.log('from page.evaluate');
	// 	// 			// 	return $scope.scene;
	// 	// 			// });

	// 	// 			setTimeout(function(){
	// 	// 				// If PhantomJS successfully crawled
	// 	// 				if (status !== "success") {
	// 	// 					console.log("===! Unable to access network\n");
	// 	// 				} else {
	// 	// 					// console.log(head);
	// 	// 					console.log(page.content);
	// 	// 				}
	// 	// 				// Exiting PhantomJS process
	// 	// 				page.close();
	// 	// 				phantom.exit();
	// 	// 			}, 5000);
	// 	// 		});
	// 	// 	});
	// 	// });

	// 	// childProcess.execFile(binPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
	// 	// 	callback(err, stdout);
	// 	// });

	// // //sample script for launching xvfb and slimer
	// // // Xvfb :1337 & export DISPLAY=:1337 & ./slimerjs myscript.js.

	// // // 	// console.log(childProcess);

	// // // 	// childProcess.execFile(newBinPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
	// // // 	// 	callback(err, stdout);
	// // // 	// });
	// });

	//cammand
	// var command = newBinPath + ' ' + childArgs[0] + ' ' + childArgs[1];
	// var command = newBinPath + ' ' + childArgs[0];
	// console.log(command);

	var crawlPath = path.join(__dirname, 'phantomjs-scripts/crawl.js');

	//Xvfb :1 -screen 0 1024x768x24 -ac +extension GLX +render -noreset

	//temp replaces #! for url so bash doesn't try to execute
	if (url.indexOf('#!') > -1) {
		url = url.replace('\#\!\/', 'shebang');
	};
	//only loads seo version
	url = url + '/seo';

	if (process.env.REDISCLOUD_URL) { 
		console.log('rendering via xvfb / slimer');
		// new version for xvfb - server
		// var xvfbServArg = ['-s', '-ac -screen 0 1280x1024x24 +extension GLX +render -noreset'];
		// var xvfbServArg = ['-s', '-ac -screen 0 1280x1024x24 +render -noreset'];

		// childArgs = [binPath, crawlPath, url];
		// //add xvfb server arguments
		// var xvfbServArg = '-ac -screen 0 1280x1024x24 +render -noreset';
		// var xvfbServArgStr = JSON.stringify(xvfbServArg);
		// childArgs.unshift('-s', xvfbServArgStr);
		// console.log(childArgs);
		// childProcess.execFile('xvfb-run', childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
		// 	if (err) console.log(err);
		// 	callback(err, stdout);
		// });
		var command = 'xvfb-run -s "-audit 2 -screen 0 1280x1024x24 -once" ' + binPath + ' ' + crawlPath + ' ' + url;
		console.log(command);
		childProcess.exec(command, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
		if (err) console.log('EXEC ERROR: ' + err);
			callback(err, stdout);
		});
	} else {
		console.log('rendering via slimer only');
		// new version for xvfb - local (working - I think)
		// var local = path.join(__dirname, 'bin/local.sh');
		// // var urlString = JSON.stringify(url);
		// childArgs = [binPath, crawlPath, url];
		// childProcess.execFile(local, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
		// 	if (err) console.log(err);
		// 	callback(err, stdout);
	
		// });
		//just with slimer - no xvfb
		childArgs = [crawlPath, url];
		console.log(childArgs);
		childProcess.execFile(binPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
			callback(err, stdout);
		});
	}

	// Call the PhantomJS process
	// childProcess.execFile(binPath, childArgs, { maxBuffer: maxBuffer }, function(err, stdout, stderr) {
	// 	callback(err, stdout);
	// });
};