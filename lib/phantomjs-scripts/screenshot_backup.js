'use strict';

/**
 * Module dependencies
 */
var page = require('webpage').create(),
	system = require('system'),
	url = system.args[1],
	output = system.args[2],
	callback = system.args[3],
	fs = require('fs'),
	aws = require('aws-sdk');

// console logs for debugging
// page.onConsoleMessage = function(msg, lineNum, sourceId) {
// 	console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
//     // system.stderr.writeLine('console: ' + msg);
// };

// page.onError = function(message, stack) {
// 	console.log('ERROR: ' + message);
// 	// console.error(message);
// };

// page.onLoadFinished = function(status) {
// 	// var width = 1024;
// 	// var height = 768;
//  //    page.viewportSize = { width: width, height: height };
//  //    page.clipRect = { top: 0, left: 0, width: width, height: height };


//  	page.evaluate(function(){
//  		console.log('evaluating...');


// 	    setTimeout(function(){
// 			// page.render(output);
// 			// page.close();
// 			phantom.exit();
// 		}, 6000);
//  	});
// };

//to be executed from within page.evaluate
page.onCallback = function(data){
	if (data.exit) {
		page.render(output);
		// phantom.exit();
	}
};


phantom.outputEncoding = 'binary';

page.open(url, function (status) {
	var width = 1024;
	var height = 768;
	page.viewportSize = { width: width, height: height };
	page.clipRect = { top: 0, left: 0, width: width, height: height };

    if (status !== 'success') {
    	console.log('Error');
    } else {
	    // console.log('from screenshot.js');
	    setTimeout(function(){
	    	//
	    	var dataURLArray = [];
	    	for (var i = 0; i < 2; i++) {
	    	
	    	
		    	var dataPng = page.evaluate(function(){
					var scope = angular.element($('#sceneSection')).scope();
					
					scope.testAccess();
					// return scope.renderFrame();

					var canvas = scope.getCanvas();
					return scope.getCanvas().toDataURL('image/png');

					// var dataURLtoBlob = function(dataurl) {
					// 	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
					// 	bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
					// 	while(n--){
					// 		u8arr[n] = bstr.charCodeAt(n);
					// 	}
					// 	return new Blob([u8arr], {type:mime});
					// };

					// var blob = dataURLtoBlob(dataURL);
					// var fd = new FormData();
					// fd.append('file', blob, 'hello.txt');
					// window.callPhantom({ exit: true });
				});
				// console.log(dataPng);

				// page.content = '<!DOCTYPE html><html><body><img style=\"position:absolute;top:0;left:0\" src=\"' + dataPng + '\"></body></html>';
				// page.render(output);
				// page.render('/dev/stdout', { format: 'png' });
				
				// var bytes = page.renderBytes({format: 'png'});
				// if (bytes) system.stdout.write(bytes);

				// system.stdout.write(dataPng);

				// page.render('/dev/stdout', { format: "png" });
				// page.render(output);
				// var img = fs.read(output);
				// fs.write('/dev/stdout', img, 'w');
				// console.log(dataPng);
				dataURLArray.push(dataPng);
			}
			var stringOutput = JSON.stringify(dataURLArray);
			system.stdout.write(stringOutput);
			// fs.remove(output);

			// var base64image = page.renderBase64('PNG');
			// fs.write('/dev/stdout', base64image, 'w');

			setTimeout(function(){
				page.close();
				phantom.exit();
			}, 2000);

	    }, 6000);
	}
	
});
