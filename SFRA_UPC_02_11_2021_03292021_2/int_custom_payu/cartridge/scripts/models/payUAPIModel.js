'use strict';

var Site = require('dw/system/Site');
var Logger = require('dw/system/Logger');
var URLUtils = require('dw/web/URLUtils');

var collections = require('*/cartridge/scripts/util/collections');
var payUHelper = require('*/cartridge/scripts/helpers/payUHelper');


/**
 * function used to get order payload for payU
 * 
 * @param {dw.order.Order} order - The current customer order
 * @return {Object} returns an object with order payload properties
 * 
 * */
function getOrderPayLoad(order) {

    var payLoad = {
        checkoutURL: Site.current.preferences.custom.payUCheckoutURL,
        key: Site.current.preferences.custom.payUMerchantKey,
        salt: Site.current.preferences.custom.payUSaltKey,
        txnid: order.orderNo,
        amount: order.getTotalGrossPrice().value,
        surl: URLUtils.https('PayU-Success').toString(),
        furl: URLUtils.https('PayU-Error').toString(),
        hash: '',
        service_provider: Site.current.preferences.custom.payUServiceProvider,
        udf1: '',
        udf2: '',
        udf3: '',
        udf4: '',
        udf5: ''
    };

    try {
        payLoad.productinfo = getProductInfo(order.getAllProductLineItems()).join();
        payLoad.customerInfo = getCustomerDetails(order);
        payLoad.hash = payUHelper.getPayURequestHash(payLoad);
    } catch (ex) {
        Logger.getLogger('PayU').error('(payUAPIModel~getOrderPayLoad) Error occured while try to get order payload and exception is: {0}', ex);
    }

    return payLoad;
}

/**
 * function used to get customer info from an order
 * 
 * @param {dw.order.Order} order - The current customer order
 * @return {Object} returns an object with customer payload properties
 * 
 * */
function getCustomerDetails(order) {
    var billingAddress = order.getBillingAddress();
    var customerInfo = {
        firstname: '',
        email: '',
        phone: '',
        lastname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zipcode: ''
    }
    try {
        customerInfo.firstname = billingAddress.getFirstName();
        customerInfo.email = order.customerEmail;
        customerInfo.phone = billingAddress.getPhone();
        customerInfo.lastname = billingAddress.getLastName();
        customerInfo.address1 = billingAddress.address1;
        customerInfo.address2 = billingAddress.address2;
        customerInfo.city = billingAddress.city;
        customerInfo.state = (!empty(billingAddress.stateCode) ? billingAddress.stateCode : 'NA');
        customerInfo.country = billingAddress.countryCode.value.toString();
        customerInfo.zipcode = billingAddress.postalCode;
        
    } catch (ex) {
        Logger.getLogger('PayU').error('(payUAPIModel~getCustomerDetails) Error occured while try to get customer information and exception is: {0}', ex);
    }
    return customerInfo
}

/**
 * function used to get product info payload for an order
 * 
 * @param {dw.order.LineItemCtnr} productLineItems - The current order product lineItems
 * @return {Object} returns an object with order payload properties
 * 
 * */
function getProductInfo(productLineItems) {
    var productInfo = new Array();
    try {
        collections.forEach(productLineItems, function (item) {
            productInfo.push(item.productID)
        });
    } catch (ex) {
        Logger.getLogger('PayU').error('(payUAPIModel~getProductInfo) Error occured while try to get product information and exception is: {0}', ex);
    }
    return productInfo;
}
exports.getOrderPayLoad = getOrderPayLoad;