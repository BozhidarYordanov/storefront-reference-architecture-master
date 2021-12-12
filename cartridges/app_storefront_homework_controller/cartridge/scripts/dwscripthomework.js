'use strict'

// 1.Create a function to get product by a given ID
/**
 * 
 *  @param {string} ID
 *  @returns {dw.catalog.Product} Product
 */

function getProductByID(productID) {
    var ProductMgr = require('dw/catalog/ProductMgr');

    return ProductMgr.getProduct(productID);
}

// 2.Create a function to get product category by given product
/**
 * 
 *  @param {dw.catalog.Product} product
 *  @returns {Collection} Product's categories
 */

 function getCategoryByGivenProduct(product) {

    return product.getAllCategories();
}

// 3.Create a function to get different product prices for a given product
/**
 * 
 *  @param {dw.catalog.Product} product
 *  @returns {ProductPriceModel} Different product prices
 */

 function getPricesForGivenProduct(product) {

    return product.getPriceModel();
}

// 4.Create a function to get catalog main categories
/**
 * 
 *  @param {dw.catalog.Catalog} catalog
 *  @returns {Category} Catalog main categories
 */

 function getCatalogMainCategories(catalog) {

    return catalog.getRoot();
}

// 5.Create a function to get customer by ID
/**
 * 
 *  @param {String} string
 *  @returns {dw.customer.Customer} Customer
 */

 function getCustomerByID(customerNumber) {
    var ProductMgr = require('dw/customer/CustomerMgr');

    return CustomerMgr.getCustomerByCustomerNumber(customerNumber);
}

// 6.Create a function to check if a given customer is assigned to a given customer group
/**
 * 
 *  @param {dw.customer.Customer, dw.customer.CustomerGroup}
 *  @returns {boolean} Customer
 */

 function isCustomerAssignedToGroup(customer, customerGroup) {

    return customer.isMemberOfCustomerGroup(customerGroup);
}


/**
 * 
 *  @constructor
 *  @param {*}
 */

function DWScriptHomework(productID, product, catalog, customerNumber, customer, customerGroup) {
    this.product = getProductByID(productID);
    this.category = getCategoryByGivenProduct(product);
    this.prices = getPricesForGivenProduct(product);
    this.category = getCatalogMainCategories(catalog);
    this.customer = getCustomerByID(customerNumber);
    this.isMember = isCustomerAssignedToGroup(customer, customerGroup)
}

module.export = DWScriptHomework;