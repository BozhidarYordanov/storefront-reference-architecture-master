var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');

/**
 * Send SMS which would notify the user that the product is back in stock
 * @param {string} userPhone - User's phone
 * @param {string} productName - Product's name for witch user has subscribed
 */

module.exports.execute = function () {

    function sendBackInStockSms(userPhone, productName) {

        var twilioSmsService = dw.svc.LocalServiceRegistry.createService('plugin.http.twilio.sms', {

            createRequest: function(svc, args) {
                svc.addHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                );
                return args;
            },

            parseResponse: function(svc, client) {
                return client.text;
            }
        });

        var concatenatedBody = 'To=' + userPhone + '&Body=' + productName + ' is back in stock&From=+15077095822';

        twilioSmsService.call(concatenatedBody);

        return;
    }

    var objectsIterator = CustomObjectMgr.getAllCustomObjects('NotifyMeBackInStock');

    while (objectsIterator.hasNext()) {
        var currentObject = objectsIterator.next();
        var currentProduct = ProductMgr.getProduct(currentObject.custom.productId);

        if (currentProduct.getAvailabilityModel().inStock) {
            var allNumbers = currentObject.custom.phoneNumbers;
            var arrAllNumbers = allNumbers.split(", ");

            for (var i = 0; i < arrAllNumbers.length; i++) {
                sendBackInStockSms(arrAllNumbers[i], currentProduct.name);
            }

            Transaction.wrap(function () {
                CustomObjectMgr.remove(currentObject);
            });
        }
    }
}

