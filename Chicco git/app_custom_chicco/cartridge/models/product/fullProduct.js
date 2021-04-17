'use strict';
var base = module.superModule;

module.exports = function fullProduct(product, apiProduct, options) {
   base.call(this, product, apiProduct, options);

   var productCustomHelper = require('*/cartridge/scripts/helpers/productCustomHelper');
   var freeMaternityKitHelper = require('*/cartridge/scripts/helpers/freeMaternityKitHelper');

    Object.defineProperty(product, 'freeMaternityKitEligible', {
        enumerable: true,
        value: productCustomHelper.checkFreeMaternityKit(apiProduct)
    });

    Object.defineProperty(product, 'freeMaternityKitEnabled', {
        enumerable: true,
        value: productCustomHelper.freeMaternityKitEnabled()
    });

    Object.defineProperty(product, 'freeMaternityKitCustomerEligible', {
        enumerable: true,
        value: freeMaternityKitHelper.customerEligibleForFreeKit()
    });

    return product;
};
