'use strict';

var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var List = require('dw/util/List');
var URLUtils = require('dw/web/URLUtils');
var Transaction = require('dw/system/Transaction');
var ProductMgr = require('dw/catalog/ProductMgr');
var Resource = require('dw/web/Resource');

/**
 * Send notify email to customer in case of unavailable product is in stock. 
 */
exports.notifySubscriber = function () {

	var unavailableProducts = CustomObjectMgr.getAllCustomObjects('UnavailableProduct');
	
	var outOfStockProducts = new dw.util.HashSet();
	var inStockProducts =  new dw.util.HashMap();
	
	while (unavailableProducts.hasNext()) {		
		var unavailableProduct = unavailableProducts.next();

		var inStock = inStockProducts.containsKey(unavailableProduct.custom.productID);
		if (!outOfStockProducts.contains(unavailableProduct.custom.productID) && !inStock) {
			var product = ProductMgr.getProduct(unavailableProduct.custom.productID);

			var availabilityModel = product.availabilityModel;
			var availabilityStatus = product.availabilityModel.availabilityStatus;
			var inventoryRecord = product.availabilityModel.inventoryRecord;

			if (availabilityStatus == dw.catalog.ProductAvailabilityModel.AVAILABILITY_STATUS_IN_STOCK && inventoryRecord != null && (inventoryRecord.stockLevel.available || inventoryRecord.perpetual)) {
				inStockProducts.put(unavailableProduct.custom.productID, new dw.util.ArrayList());
				inStock = true;
			}else {
				outOfStockProducts.add(unavailableProduct.custom.productID);
			}
		}
		
		if (inStock) {
			inStockProducts.get(unavailableProduct.custom.productID).add(unavailableProduct.custom.email);
		}
	}
	
	outOfStockProducts.clear();
	unavailableProducts.close();

	for (var key in inStockProducts) {

		var customerEmails = inStockProducts.get(key);

		for each (var email in customerEmails) {

			var customerInfo  = CustomObjectMgr.queryCustomObject('CustomerContactInfo','custom.email={0}',email);

			if (!empty(customerInfo)) {
				var Email = require('~/cartridge/scripts/models/SiteGenEmailModel');

				var product = ProductMgr.getProduct(key);

				Email.get('mail/backinstocknotifyemail', email).setSubject(Resource.msg('backinstock.email.subject','backinstock',null)).send({
	                firstName: customerInfo.custom.firstName,
	                lastName: customerInfo.custom.lastName,
	                pidLink: URLUtils.abs('Product-Show','pid',key),
	                Product: product,
				});
				
				Transaction.wrap(function() {
					CustomObjectMgr.remove(CustomObjectMgr.queryCustomObject('UnavailableProduct','custom.productID={0}',key));
				});
				
				var exist = CustomObjectMgr.queryCustomObject('UnavailableProduct','custom.email={0}',email);
				
				if (!exist) {
					Transaction.wrap(function() {
						CustomObjectMgr.remove(customerInfo);
					});
				}
			}
			
		}
	}
	
	inStockProducts.clear();
};
