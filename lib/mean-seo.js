'use strict';

/*!
 * MEAN - SEO
 * Ported from https://github.com/meanjs/mean-seo
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	browser = require('./browser'),
	Cache = require('./cache');
	// phantom = require('node-slimer');

/**
 * Module default options
 */
var defaultOptions = {
	cacheClient: 'disk',
	cacheDuration: 2 * 60 * 60 * 24 * 1000,
	cacheFolder: __dirname + '/../tmp/mean-seo/cache',
	cacheBuffer: 200 * 1024 * 1024
};

/**
 * SEO:
 *
 * Renders static pages for crawlers
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
module.exports = function SEO(options) {
	//Initialize local variables
	options = _.merge(defaultOptions, options || {});
	var cache = new Cache(options);

	return function SEO(req, res, next) {
		var escapedFragment = req.query._escaped_fragment_;

		//If the request came from a crawler
		if (escapedFragment !== undefined) {
      var url, key;
      if (escapedFragment.length > 0) {
        // If the request is in # style.
        url = req.protocol + '://' + req.get('host') + req.path + '#!/' + escapedFragment;
        // Use the escapedFragment as the key.
        key = escapedFragment;
      } else {
        // If the request is in HTML5 pushstate style.
        url = req.protocol + '://' + req.get('host') + req.originalUrl;
        // Rename key to stop Phantom from going into an infinite loop.
        url = url.replace('_escaped_fragment_', 'fragment_data');
        // Use the url as the key.
        key = url;
      }

			cache.get(key, function(err, page) {
				if (err) {

					//slimer crawl
					// phantom.create(function(err, ph) {
					// 	console.log(ph);
					// 	return ph.createPage(function(err, page) {
					// 		return page.open(url, function(err, status) {
					// 			console.log('opened site? ', status);
					// 			setTimeout(function() {
					// 				return page.evaluate(function() {
					// 					//Get what you want from the page using jQuery. A good way is to populate an object with all the jQuery commands that you need and then return the object.
					// 					var h2Arr = [],
					// 					pArr = [];
					// 					$('h2').each(function() {
					// 						h2Arr.push($(this).html());
					// 					});
					// 					$('p').each(function() {
					// 						pArr.push($(this).html());
					// 					});

					// 					return {
					// 						h2: h2Arr,
					// 						p: pArr
					// 					};
					// 				}, function(err, html) {
					// 					// console.log(result);
					// 					if (err) {
					// 						next(err);
					// 					} else {
					// 						//Save page to cache 
					// 						cache.set(key, html, function(err, res) {
					// 							if (err) {
					// 								next(err);
					// 							}
					// 						});

					// 						//And output the result
					// 						res.send(html);
					// 					}
					// 					ph.exit();
					// 				});
					// 			}, 5000);
					// 		});
					// 	});
					// },{phantomPath: './slimerjs-0.9.6/slimerjs'});


					// If not in cache crawl page - phantom crawl
					browser.crawl(url, options.cacheBuffer, function(err, html) {
						if (err) {
							next(err);
						} else {
							//Save page to cache 
							cache.set(key, html, function(err, res) {
								if (err) {
									next(err);
								}
							});

							//And output the result
							res.send(html);
						}
					});
				} else {
					//If page was found in cache, output the result					
					res.send(page.content);
				}
			});
		} else {
			next();
		}
	};
};
