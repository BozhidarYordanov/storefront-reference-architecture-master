'use strict';

/**
 * @namespace DeathStar
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var cache = require('*/cartridge/scripts/middleware/cache');
var deathStarInfoService = require('*/cartridge/scripts/DeathStarInfoService.js');

/**
 * DeathStar-Info : The DeathStar-Info endpoint is responsible for retrieving information for the ‘Death Star’ (starship).
 * @name DeathStar-Info
 * @param {middleware} - server.middleware.include
 * @param {middleware} - cache.applyDefaultCache
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    'Info', 
    server.middleware.include, 
    cache.applyDefaultCache,
    function (req, res, next) {

    var deathStarInfo = JSON.parse(deathStarInfoService.getDeathStarInfo());

    res.render('deathStar', {
        deathStarInfo : deathStarInfo
    });
    next();
});

module.exports = server.exports();
