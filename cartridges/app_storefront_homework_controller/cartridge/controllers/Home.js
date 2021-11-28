'use strict'

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    if (!viewData.product) {
        next();
    } else {
        viewData.product.reviews = [{
            text: 'Lorem ipsum dolor sit amet, cibo utroque ne vis, has no sumo graece.' +
            ' Dicta persius his id. Ea maluisset scripserit contentiones quo, est ne movet dicam.' +
            ' Equidem scriptorem vis no. Civibus tacimates interpretaris has et,' +
            ' ei offendit ocurreret vis, eos purto pertinax eleifend ea.',
            rating: 3.5
        }, {
            text: 'Very short review',
            rating: 5
        }, {
            text: 'Lorem ipsum dolor sit amet, cibo utroque ne vis, has no sumo graece.',
            rating: 1.5
        }];

        res.setViewData(viewData);
        next();
    }
})

module.exports = server.exports();