'use strict';

/**
 * @namespace Telerik
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Telerik-Show : This endpoint is called when a shopper navigates to the Telerik-Show
 * @name Base/Telerik-Show
 * @function
 * @memberof Telerik
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
        res.render('telerik/home', {
            welcomeMsg : 'Welcome user'
        });
    next();
}, pageMetaData.computedPageMetaData);

server.get('Include', function (req, res, next) {
    var Site = require('dw/system/Site');
        res.render('telerik/include', {
            welcomeMsg : 'Welcome user'
        });
    next();
}, pageMetaData.computedPageMetaData);

server.get('List', function (req, res, next) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var results = new ProductSearchModel();
    var query = req.httpParameterMap.query;
    results.setSearchPhrase(query);
    results.search();
    res.render('telerik/searchResults', {
        searchResults : results,
        query : query
    });
    next();
}, pageMetaData.computedPageMetaData);


module.exports = server.exports();
