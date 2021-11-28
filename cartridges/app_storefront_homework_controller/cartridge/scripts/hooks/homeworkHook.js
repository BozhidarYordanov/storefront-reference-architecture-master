'use strict'

/**
 * homework hook
 * @param {Object} - viewData object
 * @returns {Object} - extendet viewData object
 */

function homework(viewData) {
    viewDate.product.reviews[0].info = [{
        about: 'Lorem ipsum dolor sit amet, cibo utroque ne vis, has no sumo graece.' +
        ' Dicta persius his id. Ea maluisset scripserit contentiones quo, est ne movet dicam.' +
        ' Equidem scriptorem vis no. Civibus tacimates interpretaris has et,' +
        ' ei offendit ocurreret vis, eos purto pertinax eleifend ea.',
        availability: 'preorder'
    }];

    return viewData;
}

module.exports = {
    homework: homework
};