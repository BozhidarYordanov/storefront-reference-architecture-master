'use strict'

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 *  @param {Array} resourceArray
 */

function getDeathStarInfo() {
    
    var getDeathStarInfoService = LocalServiceRegistry.createService("homework.http.swapi.getds", {

        createRequest: function(svc, args) {
            svc.setRequestMethod("GET");
            return args;
        },

        parseResponse: function(svc, client) {
            return client.text;
        }
    });

    var response = getDeathStarInfoService.call().object;

    return response;
}

module.exports = {
    getDeathStarInfo : getDeathStarInfo
};