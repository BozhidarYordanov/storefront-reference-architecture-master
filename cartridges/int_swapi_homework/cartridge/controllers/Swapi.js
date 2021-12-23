'use strict';

/**
 * @namespace Swapi
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Swapi-Get : The Swapi-Get endpoint is responsible for retrieving information for the ‘Death Star’ (starship).
 * @name Swapi-Get
 * @param {middleware} - server.middleware.include
 * @param {middleware} - cache.applyDefaultCache
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    'Get', 
    server.middleware.include, 
    cache.applyDefaultCache,
    function (req, res, next) {

    var deathStar = '';
    res.render('swapi', { 
        deathStar 
    });
    next();
});

module.exports = server.exports();
