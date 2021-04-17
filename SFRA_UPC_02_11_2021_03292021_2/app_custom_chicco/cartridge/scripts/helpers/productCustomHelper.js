'use strict';

var Logger = require('dw/system/Logger').getLogger('productCustomHelper', 'productCustomHelper');

var Site = require('dw/system/Site');

var collections = require('*/cartridge/scripts/util/collections');

/**
 * function use to check if product is free maternityKit
 * @param {dw.catalog.Product} apiProduct - The apiProduct object
 * @returns {Boolean} freeMaternityKit - A boolean falg to show if product is freeMaternityKit
 * 
*/
function checkFreeMaternityKit(apiProduct) {

    if (apiProduct.variant) {
        apiProduct = apiProduct.masterProduct;
    }

    var productCategories = apiProduct.getAllCategories();
    var freeMaternityKit = false;
    try {
        collections.forEach(productCategories, function(category) {
            if (!empty(category.custom.freeMaternityEnabled) && category.custom.freeMaternityEnabled === true) {
                freeMaternityKit = true;
            } 
        });
        // Product override to turn if off or on in specific product
        if (!empty(apiProduct.custom.freeMaternityEnabled) && apiProduct.custom.freeMaternityEnabled === false) {
            freeMaternityKit = false;
        } else if (!freeMaternityKit && !empty(apiProduct.custom.freeMaternityEnabled) && apiProduct.custom.freeMaternityEnabled === true) {
            freeMaternityKit = true;
        }
    
    } catch (ex) {
        Logger.error('(productCustomHelper~checkFreeMaternityKit) Exception occured while try to check product maternitykit, and exception is {0}', ex);
    }
    return freeMaternityKit;
}

/**
 * function use to check if free maternityKit is enabled
 * @returns {Boolean} enabled - A boolean falg to show if freeMaternityKit is enabled
 * 
*/
function freeMaternityKitEnabled() {

    var enabled = !empty(Site.current.preferences.custom.freeMaternityEnabled) ? Site.current.preferences.custom.freeMaternityEnabled: false;
    return enabled;
}

module.exports = {
    checkFreeMaternityKit: checkFreeMaternityKit,
    freeMaternityKitEnabled: freeMaternityKitEnabled
}