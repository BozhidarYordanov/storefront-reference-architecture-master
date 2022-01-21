'use strict';

/**
 * @namespace Twilio
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

/**
 * Twilio-Subscribe : Twilio-Subscribe endpoint is the endpoint that gets hit when a customer successfully subscribes for notification
 * @name Twilio-Subscribe
 * @function
 * @memberof Twilio
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - pid - hidden input field Product ID
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */

// Account-SaveProfile
server.post(
    'Subscribe',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
        var formErrors = require('*/cartridge/scripts/formErrors');

        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var notifyForm = server.forms.getForm('notifyForm');                    //gets the notifyForm object
        var NotifyMeBackInStock_CO = 'NotifyMeBackInStock';
        var currentPid = request.httpParameterMap.pid;
        var currentPhone = notifyForm.phone.value;
        
        if (notifyForm.valid) {
            var notifyResult = CustomObjectMgr.getCustomObject(NotifyMeBackInStock_CO, currentPid);
    
            // check if CO with this product id already exists
            if (notifyResult) {
                var numbersSubscribed = notifyResult.custom.phoneNumbers;
                var arrOfNumbers = numbersSubscribed.split(', ');

                // check if customer's phone number is in the list of numbers already
                if (arrOfNumbers.includes(currentPhone)) {
                    var alreadySubscribed = dw.content.ContentMgr.getContent('already-subscribed');
                
                    res.render('product/components/subscribed', {
                        alreadySubscribed: alreadySubscribed
                    });
                } else {

                    // add customer's phone number to already existing CO
                    arrOfNumbers.push(currentPhone);
                    var newSetOfNumbers = arrOfNumbers.join(", ");

                    Transaction.wrap(function () {
                        notifyResult.custom.phoneNumbers = newSetOfNumbers;
                    });

                    var successAsset = dw.content.ContentMgr.getContent('ajax-success');
                    res.render('product/components/success', {
                        successAsset: successAsset
                    });
                }
            } else {
                
                // create new CO for this product and this will be the first customer subscribet for it
                Transaction.wrap(function () {
                    var notifyEntry = CustomObjectMgr.createCustomObject(NotifyMeBackInStock_CO, request.httpParameterMap.pid);
                    notifyEntry.custom.phoneNumbers = currentPhone;
                });
    
                var successAsset = dw.content.ContentMgr.getContent('ajax-success');
                res.render('product/components/success', {
                    successAsset: successAsset
                });
            }

        } else {
            var failAsset = dw.content.ContentMgr.getContent('ajax-fail');
            res.render('product/components/fail', {
                failAsset: failAsset
            });
        }

        return next();
    }
);

module.exports = server.exports();

