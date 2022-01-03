'use strict'

var server = require('server');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 *  Create custom object to store data passed from newsletter subscription form into SFCC
 */

server.post('Create', server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if(!form || !form.firstName || !form.lastName || !form.email) {
        error = true;
    }

    var type = 'NewsletterSubscription';
    var keyValue = UUIDUtils.createUUID();

    try {
        Transaction.wrap(function() {
            var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
            newsletter.custom.firstName = form.firstName;
            newsletter.custom.lastName = form.lastName;
            newsletter.custom.email = form.email;
            newsletter.custom.gender = form.gender;
        });
    } catch (error) {
        error = true;
    }

    if(error) {
        res.json({
            error: true
        });
    } else {
        res.json({
            error: false,
            id: keyValue
        });
    }

    return next();
});


/**
 *  Delete custom object
 */

 server.post('Delete', server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if(!form || !form.id) {
        error = true;
    }

    var type = 'NewsletterSubscription';
    var keyValue = form.id;

    try {
        var newsletter = CustomObjectMgr.getCustomObject(type, keyValue);
        Transaction.wrap(function() {
            CustomObjectMgr.remove(newsletter);
        });
    } catch (error) {
        error = true;
    }

    if(error) {
        res.json({
            error: true
        });
    } else {
        res.json({
            error: false,
            id: keyValue
        });
    }

    return next();
});

module.exports = server.exports();