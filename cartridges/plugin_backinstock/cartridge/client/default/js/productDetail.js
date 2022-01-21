'use strict';

var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./product/detail'));

    $('form#notify').submit(function (e) {
    
        e.preventDefault();     // avoid to execute the actual submit of the form.
        
        var form = $(this);
        var button = $('#notify-me');
        var actionUrl = form.attr('action');
    
        $.spinner().start();
        button.attr('disabled', true);
        $.ajax({
            url: actionUrl,
            type: 'post',
            data: form.serialize(),     // serializes the form's elements.
            success: function (data) {
                displayMessage(data, button);
                if (data.success) {
                    $('.notify').trigger('reset');
                }
            },
            error: function (err) {
                displayMessage(err, button);
            }
        });
    });
});

