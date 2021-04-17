'use strict';

/**
 * @namespace Account
 */
var page = module.superModule;

var server = require('server');

server.extend(page);

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Account-SubmitRegistration : The Account-SubmitRegistration endpoint is the endpoint that gets hit when a shopper submits their registration for a new account
 */
server.append(
    'SubmitRegistration',
    function (req, res, next) {
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Site = require('dw/system/Site');
        var Transaction = require('dw/system/Transaction');

        this.on('route:Complete', function (req, res) { // eslint-disable-line no-shadow
            // getting variables for the route complete function
            var resViewData = res.getViewData(); // eslint-disable-line
            if (Site.current.preferences.custom.freeMaternityEnabled && !empty(resViewData.success) && resViewData.success === true) {
                Transaction.wrap(function () {
                    if (customer && customer.authenticated && customer.profile) {
                        customer.profile.custom.freeMaternityEligible = true;
                    }
                });
            }
            
        });      
        return next();
        }
);

module.exports = server.exports();
