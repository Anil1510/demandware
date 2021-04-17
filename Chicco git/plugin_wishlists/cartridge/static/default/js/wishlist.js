/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./whislist/plugin_wishlists/cartridge/client/default/js/wishlist.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/focus.js":
/*!**************************************************************************************************************************!*\
  !*** ./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/focus.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  setTabNextFocus: function setTabNextFocus(focusParams) {
    var KEYCODE_TAB = 9;
    var isTabPressed = focusParams.event.key === 'Tab' || focusParams.event.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    var firstFocusableEl = $(focusParams.containerSelector + ' ' + focusParams.firstElementSelector);
    var lastFocusableEl = $(focusParams.containerSelector + ' ' + focusParams.lastElementSelector);

    if ($(focusParams.containerSelector + ' ' + focusParams.lastElementSelector).is(':disabled')) {
      lastFocusableEl = $(focusParams.containerSelector + ' ' + focusParams.nextToLastElementSelector);

      if ($('.product-quickview.product-set').length > 0) {
        var linkElements = $(focusParams.containerSelector + ' a#fa-link.share-icons');
        lastFocusableEl = linkElements[linkElements.length - 1];
      }
    }

    if (focusParams.event.shiftKey)
      /* shift + tab */
      {
        if ($(':focus').is(firstFocusableEl)) {
          lastFocusableEl.focus();
          focusParams.event.preventDefault();
        }
      } else
      /* tab */
      {
        if ($(':focus').is(lastFocusableEl)) {
          // eslint-disable-line
          firstFocusableEl.focus();
          focusParams.event.preventDefault();
        }
      }
  }
};

/***/ }),

/***/ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/product/base.js":
/*!**********************************************************************************************************************!*\
  !*** ./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/product/base.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var focusHelper = __webpack_require__(/*! ../components/focus */ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/focus.js");
/**
 * Retrieves the relevant pid value
 * @param {jquery} $el - DOM container for a given add to cart button
 * @return {string} - value to be used when adding product to cart
 */


function getPidValue($el) {
  var pid;

  if ($('#quickViewModal').hasClass('show') && !$('.product-set').length) {
    pid = $($el).closest('.modal-content').find('.product-quickview').data('pid');
  } else if ($('.product-set-detail').length || $('.product-set').length) {
    pid = $($el).closest('.product-detail').find('.product-id').text();
  } else {
    pid = $('.product-detail:not(".bundle-item")').data('pid');
  }

  return pid;
}
/**
 * Retrieve contextual quantity selector
 * @param {jquery} $el - DOM container for the relevant quantity
 * @return {jquery} - quantity selector DOM container
 */


function getQuantitySelector($el) {
  var quantitySelected;

  if ($el && $('.set-items').length) {
    quantitySelected = $($el).closest('.product-detail').find('.quantity-select');
  } else if ($el && $('.product-bundle').length) {
    var quantitySelectedModal = $($el).closest('.modal-footer').find('.quantity-select');
    var quantitySelectedPDP = $($el).closest('.bundle-footer').find('.quantity-select');

    if (quantitySelectedModal.val() === undefined) {
      quantitySelected = quantitySelectedPDP;
    } else {
      quantitySelected = quantitySelectedModal;
    }
  } else {
    quantitySelected = $('.quantity-select');
  }

  return quantitySelected;
}
/**
 * Retrieves the value associated with the Quantity pull-down menu
 * @param {jquery} $el - DOM container for the relevant quantity
 * @return {string} - value found in the quantity input
 */


function getQuantitySelected($el) {
  return getQuantitySelector($el).val();
}
/**
 * Process the attribute values for an attribute that has image swatches
 *
 * @param {Object} attr - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {Object[]} attr.values - Array of attribute value objects
 * @param {string} attr.values.value - Attribute coded value
 * @param {string} attr.values.url - URL to de/select an attribute value of the product
 * @param {boolean} attr.values.isSelectable - Flag as to whether an attribute value can be
 *     selected.  If there is no variant that corresponds to a specific combination of attribute
 *     values, an attribute may be disabled in the Product Detail Page
 * @param {jQuery} $productContainer - DOM container for a given product
 * @param {Object} msgs - object containing resource messages
 */


function processSwatchValues(attr, $productContainer, msgs) {
  attr.values.forEach(function (attrValue) {
    var $attrValue = $productContainer.find('[data-attr="' + attr.id + '"] [data-attr-value="' + attrValue.value + '"]');
    var $swatchButton = $attrValue.parent();

    if (attrValue.selected) {
      $attrValue.addClass('selected');
      $attrValue.siblings('.selected-assistive-text').text(msgs.assistiveSelectedText);
    } else {
      $attrValue.removeClass('selected');
      $attrValue.siblings('.selected-assistive-text').empty();
    }

    if (attrValue.url) {
      $swatchButton.attr('data-url', attrValue.url);
    } else {
      $swatchButton.removeAttr('data-url');
    } // Disable if not selectable


    $attrValue.removeClass('selectable unselectable');
    $attrValue.addClass(attrValue.selectable ? 'selectable' : 'unselectable');
  });
}
/**
 * Process attribute values associated with an attribute that does not have image swatches
 *
 * @param {Object} attr - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {Object[]} attr.values - Array of attribute value objects
 * @param {string} attr.values.value - Attribute coded value
 * @param {string} attr.values.url - URL to de/select an attribute value of the product
 * @param {boolean} attr.values.isSelectable - Flag as to whether an attribute value can be
 *     selected.  If there is no variant that corresponds to a specific combination of attribute
 *     values, an attribute may be disabled in the Product Detail Page
 * @param {jQuery} $productContainer - DOM container for a given product
 */


function processNonSwatchValues(attr, $productContainer) {
  var $attr = '[data-attr="' + attr.id + '"]';
  var $defaultOption = $productContainer.find($attr + ' .select-' + attr.id + ' option:first');
  $defaultOption.attr('value', attr.resetUrl);
  attr.values.forEach(function (attrValue) {
    var $attrValue = $productContainer.find($attr + ' [data-attr-value="' + attrValue.value + '"]');
    $attrValue.attr('value', attrValue.url).removeAttr('disabled');

    if (!attrValue.selectable) {
      $attrValue.attr('disabled', true);
    }
  });
}
/**
 * Routes the handling of attribute processing depending on whether the attribute has image
 *     swatches or not
 *
 * @param {Object} attrs - Attribute
 * @param {string} attr.id - Attribute ID
 * @param {jQuery} $productContainer - DOM element for a given product
 * @param {Object} msgs - object containing resource messages
 */


function updateAttrs(attrs, $productContainer, msgs) {
  // Currently, the only attribute type that has image swatches is Color.
  var attrsWithSwatches = ['color'];
  attrs.forEach(function (attr) {
    if (attrsWithSwatches.indexOf(attr.id) > -1) {
      processSwatchValues(attr, $productContainer, msgs);
    } else {
      processNonSwatchValues(attr, $productContainer);
    }
  });
}
/**
 * Updates the availability status in the Product Detail Page
 *
 * @param {Object} response - Ajax response object after an
 *                            attribute value has been [de]selected
 * @param {jQuery} $productContainer - DOM element for a given product
 */


function updateAvailability(response, $productContainer) {
  var availabilityValue = '';
  var availabilityMessages = response.product.availability.messages;

  if (!response.product.readyToOrder) {
    availabilityValue = '<li><div>' + response.resources.info_selectforstock + '</div></li>';
  } else {
    availabilityMessages.forEach(function (message) {
      availabilityValue += '<li><div>' + message + '</div></li>';
    });
  }

  $($productContainer).trigger('product:updateAvailability', {
    product: response.product,
    $productContainer: $productContainer,
    message: availabilityValue,
    resources: response.resources
  });
}
/**
 * Generates html for product attributes section
 *
 * @param {array} attributes - list of attributes
 * @return {string} - Compiled HTML
 */


function getAttributesHtml(attributes) {
  if (!attributes) {
    return '';
  }

  var html = '';
  attributes.forEach(function (attributeGroup) {
    if (attributeGroup.ID === 'mainAttributes') {
      attributeGroup.attributes.forEach(function (attribute) {
        html += '<div class="attribute-values">' + attribute.label + ': ' + attribute.value + '</div>';
      });
    }
  });
  return html;
}
/**
 * @typedef UpdatedOptionValue
 * @type Object
 * @property {string} id - Option value ID for look up
 * @property {string} url - Updated option value selection URL
 */

/**
 * @typedef OptionSelectionResponse
 * @type Object
 * @property {string} priceHtml - Updated price HTML code
 * @property {Object} options - Updated Options
 * @property {string} options.id - Option ID
 * @property {UpdatedOptionValue[]} options.values - Option values
 */

/**
 * Updates DOM using post-option selection Ajax response
 *
 * @param {OptionSelectionResponse} optionsHtml - Ajax response optionsHtml from selecting a product option
 * @param {jQuery} $productContainer - DOM element for current product
 */


function updateOptions(optionsHtml, $productContainer) {
  // Update options
  $productContainer.find('.product-options').empty().html(optionsHtml);
}
/**
 * Dynamically creates Bootstrap carousel from response containing images
 * @param {Object[]} imgs - Array of large product images,along with related information
 * @param {jQuery} $productContainer - DOM element for a given product
 */


function createCarousel(imgs, $productContainer) {
  var carousel = $productContainer.find('.carousel');
  $(carousel).carousel('dispose');
  var carouselId = $(carousel).attr('id');
  $(carousel).empty().append('<ol class="carousel-indicators"></ol><div class="carousel-inner" role="listbox"></div><a class="carousel-control-prev" href="#' + carouselId + '" role="button" data-slide="prev"><span class="fa icon-prev" aria-hidden="true"></span><span class="sr-only">' + $(carousel).data('prev') + '</span></a><a class="carousel-control-next" href="#' + carouselId + '" role="button" data-slide="next"><span class="fa icon-next" aria-hidden="true"></span><span class="sr-only">' + $(carousel).data('next') + '</span></a>');

  for (var i = 0; i < imgs.length; i++) {
    $('<div class="carousel-item"><img src="' + imgs[i].url + '" class="d-block img-fluid" alt="' + imgs[i].alt + ' image number ' + parseInt(imgs[i].index, 10) + '" title="' + imgs[i].title + '" itemprop="image" /></div>').appendTo($(carousel).find('.carousel-inner'));
    $('<li data-target="#' + carouselId + '" data-slide-to="' + i + '" class=""></li>').appendTo($(carousel).find('.carousel-indicators'));
  }

  $($(carousel).find('.carousel-item')).first().addClass('active');
  $($(carousel).find('.carousel-indicators > li')).first().addClass('active');

  if (imgs.length === 1) {
    $($(carousel).find('.carousel-indicators, a[class^="carousel-control-"]')).detach();
  }

  $(carousel).carousel();
  $($(carousel).find('.carousel-indicators')).attr('aria-hidden', true);
}
/**
 * Parses JSON from Ajax call made whenever an attribute value is [de]selected
 * @param {Object} response - response from Ajax call
 * @param {Object} response.product - Product object
 * @param {string} response.product.id - Product ID
 * @param {Object[]} response.product.variationAttributes - Product attributes
 * @param {Object[]} response.product.images - Product images
 * @param {boolean} response.product.hasRequiredAttrsSelected - Flag as to whether all required
 *     attributes have been selected.  Used partially to
 *     determine whether the Add to Cart button can be enabled
 * @param {jQuery} $productContainer - DOM element for a given product.
 */


function handleVariantResponse(response, $productContainer) {
  var isChoiceOfBonusProducts = $productContainer.parents('.choose-bonus-product-dialog').length > 0;
  var isVaraint;

  if (response.product.variationAttributes) {
    updateAttrs(response.product.variationAttributes, $productContainer, response.resources);
    isVaraint = response.product.productType === 'variant';

    if (isChoiceOfBonusProducts && isVaraint) {
      $productContainer.parent('.bonus-product-item').data('pid', response.product.id);
      $productContainer.parent('.bonus-product-item').data('ready-to-order', response.product.readyToOrder);
    }
  } // Update primary images


  var primaryImageUrls = response.product.images.large;
  createCarousel(primaryImageUrls, $productContainer); // Update pricing

  if (!isChoiceOfBonusProducts) {
    var $priceSelector = $('.prices .price', $productContainer).length ? $('.prices .price', $productContainer) : $('.prices .price');
    $priceSelector.replaceWith(response.product.price.html);
  } // Update promotions


  $productContainer.find('.promotions').empty().html(response.product.promotionsHtml);
  updateAvailability(response, $productContainer);

  if (isChoiceOfBonusProducts) {
    var $selectButton = $productContainer.find('.select-bonus-product');
    $selectButton.trigger('bonusproduct:updateSelectButton', {
      product: response.product,
      $productContainer: $productContainer
    });
  } else {
    // Enable "Add to Cart" button if all required attributes have been selected
    $('button.add-to-cart, button.add-to-cart-global, button.update-cart-product-global').trigger('product:updateAddToCart', {
      product: response.product,
      $productContainer: $productContainer
    }).trigger('product:statusUpdate', response.product);
  } // Update attributes


  $productContainer.find('.main-attributes').empty().html(getAttributesHtml(response.product.attributes));
}
/**
 * @typespec UpdatedQuantity
 * @type Object
 * @property {boolean} selected - Whether the quantity has been selected
 * @property {string} value - The number of products to purchase
 * @property {string} url - Compiled URL that specifies variation attributes, product ID, options,
 *     etc.
 */

/**
 * Updates the quantity DOM elements post Ajax call
 * @param {UpdatedQuantity[]} quantities -
 * @param {jQuery} $productContainer - DOM container for a given product
 */


function updateQuantities(quantities, $productContainer) {
  if ($productContainer.parent('.bonus-product-item').length <= 0) {
    var optionsHtml = quantities.map(function (quantity) {
      var selected = quantity.selected ? ' selected ' : '';
      return '<option value="' + quantity.value + '"  data-url="' + quantity.url + '"' + selected + '>' + quantity.value + '</option>';
    }).join('');
    getQuantitySelector($productContainer).empty().html(optionsHtml);
  }
}
/**
 * updates the product view when a product attribute is selected or deselected or when
 *         changing quantity
 * @param {string} selectedValueUrl - the Url for the selected variation value
 * @param {jQuery} $productContainer - DOM element for current product
 */


function attributeSelect(selectedValueUrl, $productContainer) {
  if (selectedValueUrl) {
    $('body').trigger('product:beforeAttributeSelect', {
      url: selectedValueUrl,
      container: $productContainer
    });
    $.ajax({
      url: selectedValueUrl,
      method: 'GET',
      success: function success(data) {
        handleVariantResponse(data, $productContainer);
        updateOptions(data.product.optionsHtml, $productContainer);
        updateQuantities(data.product.quantities, $productContainer);
        $('body').trigger('product:afterAttributeSelect', {
          data: data,
          container: $productContainer
        });
        $.spinner().stop();
      },
      error: function error() {
        $.spinner().stop();
      }
    });
  }
}
/**
 * Retrieves url to use when adding a product to the cart
 *
 * @return {string} - The provided URL to use when adding a product to the cart
 */


function getAddToCartUrl() {
  return $('.add-to-cart-url').val();
}
/**
 * Parses the html for a modal window
 * @param {string} html - representing the body and footer of the modal window
 *
 * @return {Object} - Object with properties body and footer.
 */


function parseHtml(html) {
  var $html = $('<div>').append($.parseHTML(html));
  var body = $html.find('.choice-of-bonus-product');
  var footer = $html.find('.modal-footer').children();
  return {
    body: body,
    footer: footer
  };
}
/**
 * Retrieves url to use when adding a product to the cart
 *
 * @param {Object} data - data object used to fill in dynamic portions of the html
 */


function chooseBonusProducts(data) {
  $('.modal-body').spinner().start();

  if ($('#chooseBonusProductModal').length !== 0) {
    $('#chooseBonusProductModal').remove();
  }

  var bonusUrl;

  if (data.bonusChoiceRuleBased) {
    bonusUrl = data.showProductsUrlRuleBased;
  } else {
    bonusUrl = data.showProductsUrlListBased;
  }

  var htmlString = '<!-- Modal -->' + '<div class="modal fade" id="chooseBonusProductModal" tabindex="-1" role="dialog">' + '<span class="enter-message sr-only" ></span>' + '<div class="modal-dialog choose-bonus-product-dialog" ' + 'data-total-qty="' + data.maxBonusItems + '"' + 'data-UUID="' + data.uuid + '"' + 'data-pliUUID="' + data.pliUUID + '"' + 'data-addToCartUrl="' + data.addToCartUrl + '"' + 'data-pageStart="0"' + 'data-pageSize="' + data.pageSize + '"' + 'data-moreURL="' + data.showProductsUrlRuleBased + '"' + 'data-bonusChoiceRuleBased="' + data.bonusChoiceRuleBased + '">' + '<!-- Modal content-->' + '<div class="modal-content">' + '<div class="modal-header">' + '    <span class="">' + data.labels.selectprods + '</span>' + '    <button type="button" class="close pull-right" data-dismiss="modal">' + '        <span aria-hidden="true">&times;</span>' + '        <span class="sr-only"> </span>' + '    </button>' + '</div>' + '<div class="modal-body"></div>' + '<div class="modal-footer"></div>' + '</div>' + '</div>' + '</div>';
  $('body').append(htmlString);
  $('.modal-body').spinner().start();
  $.ajax({
    url: bonusUrl,
    method: 'GET',
    dataType: 'json',
    success: function success(response) {
      var parsedHtml = parseHtml(response.renderedTemplate);
      $('#chooseBonusProductModal .modal-body').empty();
      $('#chooseBonusProductModal .enter-message').text(response.enterDialogMessage);
      $('#chooseBonusProductModal .modal-header .close .sr-only').text(response.closeButtonText);
      $('#chooseBonusProductModal .modal-body').html(parsedHtml.body);
      $('#chooseBonusProductModal .modal-footer').html(parsedHtml.footer);
      $('#chooseBonusProductModal').modal('show');
      $.spinner().stop();
    },
    error: function error() {
      $.spinner().stop();
    }
  });
}
/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */


function handlePostCartAdd(response) {
  $('.minicart').trigger('count:update', response);
  var messageType = response.error ? 'alert-danger' : 'alert-success'; // show add to cart toast

  if (response.newBonusDiscountLineItem && Object.keys(response.newBonusDiscountLineItem).length !== 0) {
    chooseBonusProducts(response.newBonusDiscountLineItem);
  } else {
    if ($('.add-to-cart-messages').length === 0) {
      $('body').append('<div class="add-to-cart-messages"></div>');
    }

    $('.add-to-cart-messages').append('<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">' + response.message + '</div>');
    setTimeout(function () {
      $('.add-to-basket-alert').remove();
    }, 5000);
  }
}
/**
 * Retrieves the bundle product item ID's for the Controller to replace bundle master product
 * items with their selected variants
 *
 * @return {string[]} - List of selected bundle product item ID's
 */


function getChildProducts() {
  var childProducts = [];
  $('.bundle-item').each(function () {
    childProducts.push({
      pid: $(this).find('.product-id').text(),
      quantity: parseInt($(this).find('label.quantity').data('quantity'), 10)
    });
  });
  return childProducts.length ? JSON.stringify(childProducts) : [];
}
/**
 * Retrieve product options
 *
 * @param {jQuery} $productContainer - DOM element for current product
 * @return {string} - Product options and their selected values
 */


function getOptions($productContainer) {
  var options = $productContainer.find('.product-option').map(function () {
    var $elOption = $(this).find('.options-select');
    var urlValue = $elOption.val();
    var selectedValueId = $elOption.find('option[value="' + urlValue + '"]').data('value-id');
    return {
      optionId: $(this).data('option-id'),
      selectedValueId: selectedValueId
    };
  }).toArray();
  return JSON.stringify(options);
}
/**
 * Makes a call to the server to report the event of adding an item to the cart
 *
 * @param {string | boolean} url - a string representing the end point to hit so that the event can be recorded, or false
 */


function miniCartReportingUrl(url) {
  if (url) {
    $.ajax({
      url: url,
      method: 'GET',
      success: function success() {// reporting urls hit on the server
      },
      error: function error() {// no reporting urls hit on the server
      }
    });
  }
}

module.exports = {
  attributeSelect: attributeSelect,
  methods: {
    editBonusProducts: function editBonusProducts(data) {
      chooseBonusProducts(data);
    }
  },
  focusChooseBonusProductModal: function focusChooseBonusProductModal() {
    $('body').on('shown.bs.modal', '#chooseBonusProductModal', function () {
      $('#chooseBonusProductModal').siblings().attr('aria-hidden', 'true');
      $('#chooseBonusProductModal .close').focus();
    });
  },
  onClosingChooseBonusProductModal: function onClosingChooseBonusProductModal() {
    $('body').on('hidden.bs.modal', '#chooseBonusProductModal', function () {
      $('#chooseBonusProductModal').siblings().attr('aria-hidden', 'false');
    });
  },
  trapChooseBonusProductModalFocus: function trapChooseBonusProductModalFocus() {
    $('body').on('keydown', '#chooseBonusProductModal', function (e) {
      var focusParams = {
        event: e,
        containerSelector: '#chooseBonusProductModal',
        firstElementSelector: '.close',
        lastElementSelector: '.add-bonus-products'
      };
      focusHelper.setTabNextFocus(focusParams);
    });
  },
  colorAttribute: function colorAttribute() {
    $(document).on('click', '[data-attr="color"] button', function (e) {
      e.preventDefault();

      if ($(this).attr('disabled')) {
        return;
      }

      var $productContainer = $(this).closest('.set-item');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.product-detail');
      }

      attributeSelect($(this).attr('data-url'), $productContainer);
    });
  },
  selectAttribute: function selectAttribute() {
    $(document).on('change', 'select[class*="select-"], .options-select', function (e) {
      e.preventDefault();
      var $productContainer = $(this).closest('.set-item');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.product-detail');
      }

      attributeSelect(e.currentTarget.value, $productContainer);
    });
  },
  availability: function availability() {
    $(document).on('change', '.quantity-select', function (e) {
      e.preventDefault();
      var $productContainer = $(this).closest('.product-detail');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.modal-content').find('.product-quickview');
      }

      if ($('.bundle-items', $productContainer).length === 0) {
        attributeSelect($(e.currentTarget).find('option:selected').data('url'), $productContainer);
      }
    });
  },
  addToCart: function addToCart() {
    $(document).on('click', 'button.add-to-cart, button.add-to-cart-global', function () {
      var addToCartUrl;
      var pid;
      var pidsObj;
      var setPids;
      $('body').trigger('product:beforeAddToCart', this);

      if ($('.set-items').length && $(this).hasClass('add-to-cart-global')) {
        setPids = [];
        $('.product-detail').each(function () {
          if (!$(this).hasClass('product-set-detail')) {
            setPids.push({
              pid: $(this).find('.product-id').text(),
              qty: $(this).find('.quantity-select').val(),
              options: getOptions($(this))
            });
          }
        });
        pidsObj = JSON.stringify(setPids);
      }

      pid = getPidValue($(this));
      var $productContainer = $(this).closest('.product-detail');

      if (!$productContainer.length) {
        $productContainer = $(this).closest('.quick-view-dialog').find('.product-detail');
      }

      addToCartUrl = getAddToCartUrl();
      var form = {
        pid: pid,
        pidsObj: pidsObj,
        childProducts: getChildProducts(),
        quantity: getQuantitySelected($(this))
      };

      if (!$('.bundle-item').length) {
        form.options = getOptions($productContainer);
      }

      $(this).trigger('updateAddToCartFormData', form);

      if (addToCartUrl) {
        $.ajax({
          url: addToCartUrl,
          method: 'POST',
          data: form,
          success: function success(data) {
            handlePostCartAdd(data);
            $('body').trigger('product:afterAddToCart', data);
            $.spinner().stop();
            miniCartReportingUrl(data.reportingURL);
          },
          error: function error() {
            $.spinner().stop();
          }
        });
      }
    });
  },
  selectBonusProduct: function selectBonusProduct() {
    $(document).on('click', '.select-bonus-product', function () {
      var $choiceOfBonusProduct = $(this).parents('.choice-of-bonus-product');
      var pid = $(this).data('pid');
      var maxPids = $('.choose-bonus-product-dialog').data('total-qty');
      var submittedQty = parseInt($choiceOfBonusProduct.find('.bonus-quantity-select').val(), 10);
      var totalQty = 0;
      $.each($('#chooseBonusProductModal .selected-bonus-products .selected-pid'), function () {
        totalQty += $(this).data('qty');
      });
      totalQty += submittedQty;
      var optionID = $choiceOfBonusProduct.find('.product-option').data('option-id');
      var valueId = $choiceOfBonusProduct.find('.options-select option:selected').data('valueId');

      if (totalQty <= maxPids) {
        var selectedBonusProductHtml = '' + '<div class="selected-pid row" ' + 'data-pid="' + pid + '"' + 'data-qty="' + submittedQty + '"' + 'data-optionID="' + (optionID || '') + '"' + 'data-option-selected-value="' + (valueId || '') + '"' + '>' + '<div class="col-sm-11 col-9 bonus-product-name" >' + $choiceOfBonusProduct.find('.product-name').html() + '</div>' + '<div class="col-1"><i class="fa fa-times" aria-hidden="true"></i></div>' + '</div>';
        $('#chooseBonusProductModal .selected-bonus-products').append(selectedBonusProductHtml);
        $('.pre-cart-products').html(totalQty);
        $('.selected-bonus-products .bonus-summary').removeClass('alert-danger');
      } else {
        $('.selected-bonus-products .bonus-summary').addClass('alert-danger');
      }
    });
  },
  removeBonusProduct: function removeBonusProduct() {
    $(document).on('click', '.selected-pid', function () {
      $(this).remove();
      var $selected = $('#chooseBonusProductModal .selected-bonus-products .selected-pid');
      var count = 0;

      if ($selected.length) {
        $selected.each(function () {
          count += parseInt($(this).data('qty'), 10);
        });
      }

      $('.pre-cart-products').html(count);
      $('.selected-bonus-products .bonus-summary').removeClass('alert-danger');
    });
  },
  enableBonusProductSelection: function enableBonusProductSelection() {
    $('body').on('bonusproduct:updateSelectButton', function (e, response) {
      $('button.select-bonus-product', response.$productContainer).attr('disabled', !response.product.readyToOrder || !response.product.available);
      var pid = response.product.id;
      $('button.select-bonus-product', response.$productContainer).data('pid', pid);
    });
  },
  showMoreBonusProducts: function showMoreBonusProducts() {
    $(document).on('click', '.show-more-bonus-products', function () {
      var url = $(this).data('url');
      $('.modal-content').spinner().start();
      $.ajax({
        url: url,
        method: 'GET',
        success: function success(html) {
          var parsedHtml = parseHtml(html);
          $('.modal-body').append(parsedHtml.body);
          $('.show-more-bonus-products:first').remove();
          $('.modal-content').spinner().stop();
        },
        error: function error() {
          $('.modal-content').spinner().stop();
        }
      });
    });
  },
  addBonusProductsToCart: function addBonusProductsToCart() {
    $(document).on('click', '.add-bonus-products', function () {
      var $readyToOrderBonusProducts = $('.choose-bonus-product-dialog .selected-pid');
      var queryString = '?pids=';
      var url = $('.choose-bonus-product-dialog').data('addtocarturl');
      var pidsObject = {
        bonusProducts: []
      };
      $.each($readyToOrderBonusProducts, function () {
        var qtyOption = parseInt($(this).data('qty'), 10);
        var option = null;

        if (qtyOption > 0) {
          if ($(this).data('optionid') && $(this).data('option-selected-value')) {
            option = {};
            option.optionId = $(this).data('optionid');
            option.productId = $(this).data('pid');
            option.selectedValueId = $(this).data('option-selected-value');
          }

          pidsObject.bonusProducts.push({
            pid: $(this).data('pid'),
            qty: qtyOption,
            options: [option]
          });
          pidsObject.totalQty = parseInt($('.pre-cart-products').html(), 10);
        }
      });
      queryString += JSON.stringify(pidsObject);
      queryString = queryString + '&uuid=' + $('.choose-bonus-product-dialog').data('uuid');
      queryString = queryString + '&pliuuid=' + $('.choose-bonus-product-dialog').data('pliuuid');
      $.spinner().start();
      $.ajax({
        url: url + queryString,
        method: 'POST',
        success: function success(data) {
          $.spinner().stop();

          if (data.error) {
            $('#chooseBonusProductModal').modal('hide');

            if ($('.add-to-cart-messages').length === 0) {
              $('body').append('<div class="add-to-cart-messages"></div>');
            }

            $('.add-to-cart-messages').append('<div class="alert alert-danger add-to-basket-alert text-center"' + ' role="alert">' + data.errorMessage + '</div>');
            setTimeout(function () {
              $('.add-to-basket-alert').remove();
            }, 3000);
          } else {
            $('.configure-bonus-product-attributes').html(data);
            $('.bonus-products-step2').removeClass('hidden-xl-down');
            $('#chooseBonusProductModal').modal('hide');

            if ($('.add-to-cart-messages').length === 0) {
              $('body').append('<div class="add-to-cart-messages"></div>');
            }

            $('.minicart-quantity').html(data.totalQty);
            $('.add-to-cart-messages').append('<div class="alert alert-success add-to-basket-alert text-center"' + ' role="alert">' + data.msgSuccess + '</div>');
            setTimeout(function () {
              $('.add-to-basket-alert').remove();

              if ($('.cart-page').length) {
                location.reload();
              }
            }, 1500);
          }
        },
        error: function error() {
          $.spinner().stop();
        }
      });
    });
  },
  getPidValue: getPidValue,
  getQuantitySelected: getQuantitySelected,
  miniCartReportingUrl: miniCartReportingUrl
};

/***/ }),

/***/ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js":
/*!**************************************************************************************************************!*\
  !*** ./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function (include) {
  if (typeof include === 'function') {
    include();
  } else if (_typeof(include) === 'object') {
    Object.keys(include).forEach(function (key) {
      if (typeof include[key] === 'function') {
        include[key]();
      }
    });
  }
};

/***/ }),

/***/ "./whislist/plugin_wishlists/cartridge/client/default/js/wishlist.js":
/*!***************************************************************************!*\
  !*** ./whislist/plugin_wishlists/cartridge/client/default/js/wishlist.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var processInclude = __webpack_require__(/*! base/util */ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/util.js");

$(document).ready(function () {
  processInclude(__webpack_require__(/*! ./wishlist/wishlist */ "./whislist/plugin_wishlists/cartridge/client/default/js/wishlist/wishlist.js"));
});

/***/ }),

/***/ "./whislist/plugin_wishlists/cartridge/client/default/js/wishlist/wishlist.js":
/*!************************************************************************************!*\
  !*** ./whislist/plugin_wishlists/cartridge/client/default/js/wishlist/wishlist.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base = __webpack_require__(/*! base/product/base */ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/product/base.js");

var focusHelper = __webpack_require__(/*! base/components/focus */ "./storefront-reference-architecture/cartridges/app_storefront_base/cartridge/client/default/js/components/focus.js");
/**
 * Updates the Mini-Cart quantity value after the customer has pressed the "Add to Cart" button
 * @param {string} response - ajax response from clicking the add to cart button
 */


function handlePostCartAdd(response) {
  $('.minicart').trigger('count:update', response);
  var messageType = response.error ? 'alert-danger' : 'alert-success';

  if ($('.add-to-cart-messages').length === 0) {
    $('body').append('<div class="add-to-cart-messages"></div>');
  }

  $('.add-to-cart-messages').append('<div class="alert ' + messageType + ' add-to-basket-alert text-center" role="alert">' + response.message + '</div>');
  setTimeout(function () {
    $('.add-to-basket-alert').remove();
  }, 5000);
}
/**
 * Generates the modal window on the first call.
 *
 */


function getModalHtmlElement() {
  if ($('#editProductModal').length !== 0) {
    $('#editProductModal').remove();
  }

  var htmlString = '<!-- Modal -->' + '<div class="modal fade" id="editWishlistProductModal" tabindex="-1" role="dialog">' + '<span class="enter-message sr-only" ></span>' + '<div class="modal-dialog quick-view-dialog">' + '<!-- Modal content-->' + '<div class="modal-content">' + '<div class="modal-header">' + '    <button type="button" class="close pull-right" data-dismiss="modal">' + '        <span aria-hidden="true">&times;</span>' + '        <span class="sr-only"> </span>' + '    </button>' + '</div>' + '<div class="modal-body"></div>' + '<div class="modal-footer"></div>' + '</div>' + '</div>' + '</div>';
  $('body').append(htmlString);
}
/**
 * Parses the html for a modal window
 * @param {string} html - representing the body and footer of the modal window
 *
 * @return {Object} - Object with properties body and footer.
 */


function parseHtml(html) {
  var $html = $('<div>').append($.parseHTML(html));
  var body = $html.find('.product-quickview');
  var footer = $html.find('.modal-footer').children();
  return {
    body: body,
    footer: footer
  };
}
/**
 * replaces the content in the modal window for product variation to be edited.
 * @param {string} editProductUrl - url to be used to retrieve a new product model
 */


function fillModalElement(editProductUrl) {
  $('#editWishlistProductModal').spinner().start();
  $.ajax({
    url: editProductUrl,
    method: 'GET',
    dataType: 'json',
    success: function success(data) {
      var parsedHtml = parseHtml(data.renderedTemplate);
      $('#editWishlistProductModal .modal-body').empty();
      $('#editWishlistProductModal .modal-body').html(parsedHtml.body);
      $('#editWishlistProductModal .modal-footer').html(parsedHtml.footer);
      $('#editWishlistProductModal .modal-header .close .sr-only').text(data.closeButtonText);
      $('#editWishlistProductModal .enter-message').text(data.enterDialogMessage);
      $('#editWishlistProductModal').modal('show');
      $('body').trigger('editwishlistproduct:ready');
      $.spinner().stop();
    },
    error: function error() {
      $('#editWishlistProductModal').spinner().stop();
    }
  });
}
/**
 * show toast response
 * @param {Object} res - from the call to set the public status of a list or item in a list
 */


function showResponseMsg(res) {
  $.spinner().stop();
  var status;

  if (res.success) {
    status = 'alert-success';
  } else {
    status = 'alert-danger';
  }

  if ($('.add-to-wishlist-messages').length === 0) {
    $('body').append('<div class="add-to-wishlist-messages "></div>');
  }

  $('.add-to-wishlist-messages').append('<div class="add-to-wishlist-alert text-center ' + status + '">' + res.msg + '</div>');
  setTimeout(function () {
    $('.add-to-wishlist-messages').remove();
  }, 3000);
}
/**
 * toggles the public / private status of the item or wishlist item
 * @param {string} listID - the order model
 * @param {string} itemID - the customer model
 * @param {Object} callback - function to run if the ajax call returns with an
 *                        error so that the checkbox can be reset to it's original state
 */


function updatePublicStatus(listID, itemID, callback) {
  var url = $('#isPublicList').data('url');
  $.spinner().start();
  $.ajax({
    url: url,
    type: 'post',
    dataType: 'json',
    data: {
      listID: listID,
      itemID: itemID
    },
    success: function success(data) {
      if (callback && !data.success) {
        callback();
      }

      showResponseMsg(data, null);
    },
    error: function error(err) {
      if (callback) {
        callback();
      }

      showResponseMsg(err);
    }
  });
}
/**
 * @param {Object} $elementAppendTo - The element to append error html to
 * @param {string} msg - The error message
 * display error message if remove item from wishlist failed
 */


function displayErrorMessage($elementAppendTo, msg) {
  if ($('.remove-from-wishlist-messages').length === 0) {
    $elementAppendTo.append('<div class="remove-from-wishlist-messages "></div>');
  }

  $('.remove-from-wishlist-messages').append('<div class="remove-from-wishlist-alert text-center alert-danger">' + msg + '</div>');
  setTimeout(function () {
    $('.remove-from-wishlist-messages').remove();
  }, 3000);
}
/**
 * renders the list up to a given page number
 * @param {number} pageNumber - current page number
 * @param {boolean} spinner - if the spinner has already started
 * @param {string} focusElementSelector - selector of the element to focus on
 */


function renderNewPageOfItems(pageNumber, spinner, focusElementSelector) {
  var publicView = $('.wishlistItemCardsData').data('public-view');
  var listUUID = $('.wishlistItemCardsData').data('uuid');
  var url = $('.wishlistItemCardsData').data('href');

  if (spinner) {
    $.spinner().start();
  }

  var scrollPosition = document.documentElement.scrollTop;
  var newPageNumber = pageNumber;
  $.ajax({
    url: url,
    method: 'get',
    data: {
      pageNumber: ++newPageNumber,
      publicView: publicView,
      id: listUUID
    }
  }).done(function (data) {
    $('.wishlistItemCards').empty();
    $('body .wishlistItemCards').append(data);

    if (focusElementSelector) {
      $(focusElementSelector).focus();
    } else {
      document.documentElement.scrollTop = scrollPosition;
    }
  }).fail(function () {
    $('.more-wl-items').remove();
  });
  $.spinner().stop();
}

module.exports = {
  removeFromWishlist: function removeFromWishlist() {
    $('body').on('click', '.remove-from-wishlist', function (e) {
      e.preventDefault();
      var url = $(this).data('url');
      var elMyAccount = $('.account-wishlist-item').length; // If user is in my account page, call removeWishlistAccount() end point, re-render wishlist cards

      if (elMyAccount > 0) {
        $('.wishlist-account-card').spinner().start();
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'html',
          data: {},
          success: function success(html) {
            $('.wishlist-account-card>.card').remove();
            $('.wishlist-account-card').append(html);
            $('.wishlist-account-card').spinner().stop();
          },
          error: function error() {
            var $elToAppend = $('.wishlist-account-card');
            $elToAppend.spinner().stop();
            var msg = $elToAppend.data('error-msg');
            displayErrorMessage($elToAppend, msg);
          }
        }); // else user is in wishlist landing page, call removeProduct() end point, then remove this card
      } else {
        $.spinner().start();
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          data: {},
          success: function success() {
            var pageNumber = $('.wishlistItemCardsData').data('page-number') - 1;
            renderNewPageOfItems(pageNumber, false);
          },
          error: function error() {
            $.spinner().stop();
            var $elToAppendWL = $('.wishlistItemCards');
            var msg = $elToAppendWL.data('error-msg');
            displayErrorMessage($elToAppendWL, msg);
          }
        });
      }
    });
  },
  viewProductViaEdit: function viewProductViaEdit() {
    $('body').on('click', '.edit-add-to-wishlist .edit', function (e) {
      e.preventDefault();
      var editProductUrl = $(this).attr('href');
      $(e.target).trigger('editwishlistproduct:show');
      getModalHtmlElement();
      fillModalElement(editProductUrl);
    });
  },
  viewProductViaSelectAttribute: function viewProductViaSelectAttribute() {
    $('body').on('click', '.select-attributes-btn', function (e) {
      e.preventDefault();
      var editProductUrl = $(this).data('get-product-url');
      getModalHtmlElement();
      fillModalElement(editProductUrl);
    });
  },
  focusEditWishlistProductModal: function focusEditWishlistProductModal() {
    $('body').on('shown.bs.modal', '#editWishlistProductModal', function () {
      $('#editWishlistProductModal').siblings().attr('aria-hidden', 'true');
      $('#editWishlistProductModal .close').focus();
    });
  },
  onClosingEditWishlistProductModal: function onClosingEditWishlistProductModal() {
    $('body').on('hidden.bs.modal', '#editWishlistProductModal', function () {
      $('#editWishlistProductModal').remove();
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      $('#editWishlistProductModal').siblings().attr('aria-hidden', 'false');
    });
  },
  trapEditWishlistProductModalFocus: function trapEditWishlistProductModalFocus() {
    $('body').on('keydown', '#editWishlistProductModal', function (e) {
      var focusParams = {
        event: e,
        containerSelector: '#editWishlistProductModal',
        firstElementSelector: '.close',
        lastElementSelector: '.btn-update-wishlist-product',
        nextToLastElementSelector: '.select-size'
      };
      focusHelper.setTabNextFocus(focusParams);
    });
  },
  updateWishlistUpdateButton: function updateWishlistUpdateButton() {
    $('body').on('product:updateAddToCart', function (e, response) {
      response.$productContainer.find('.btn-update-wishlist-product').attr('disabled', !response.product.readyToOrder || !response.product.available);
    });
  },
  updateWishListItem: function updateWishListItem() {
    $('body').on('click', '.btn-update-wishlist-product', function (e) {
      e.preventDefault();
      var updateButtonBlock = $(this).closest('.wishlist-item-update-button-block').find('.update-wishlist-url');
      var updateProductUrl = updateButtonBlock.val();
      var uuid = updateButtonBlock.data('uuid');
      var form = {
        uuid: uuid,
        pid: base.getPidValue($(this))
      };
      $('#editWishlistProductModal').spinner().start();
      $.ajax({
        url: updateProductUrl,
        type: 'post',
        context: this,
        data: form,
        dataType: 'json',
        success: function success() {
          $.spinner().start();
          $('#editWishlistProductModal').spinner().stop();
          $('#editWishlistProductModal').remove();
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');
          var pageNumber = $('.wishlistItemCardsData').data('page-number') - 1;
          renderNewPageOfItems(pageNumber, false, '.product-info .edit-add-to-wishlist .edit:first');
        },
        error: function error() {
          var msg = $('.btn-update-wishlist-product').data('error-msg');
          $('#editWishlistProductModal').spinner().stop();
          $('#editWishlistProductModal').remove();
          $('.modal-backdrop').remove();
          $('body').removeClass('modal-open');

          if ($('.update-wishlist-messages').length === 0) {
            $('body').append('<div class="update-wishlist-messages "></div>');
          }

          $('.update-wishlist-messages').append('<div class="update-wishlist-alert text-center alert-danger">' + msg + '</div>');
          setTimeout(function () {
            $('.update-wishlist-messages').remove();
          }, 5000);
        }
      });
    });
  },
  toggleWishlistStatus: function toggleWishlistStatus() {
    $('#isPublicList').on('click', function () {
      var listID = $('#isPublicList').data('id');
      updatePublicStatus(listID, null, null);
    });
  },
  toggleWishlistItemStatus: function toggleWishlistItemStatus() {
    $('body').on('click', '.wishlist-item-checkbox', function () {
      var itemID = $(this).closest('.wishlist-hide').find('.custom-control-input').data('id');
      var el = $(this).siblings('input');

      var resetCheckBox = function resetCheckBox() {
        return el.prop('checked') ? el.prop('checked', false) : el.prop('checked', true);
      };

      updatePublicStatus(null, itemID, resetCheckBox);
    });
  },
  addToCartFromWishlist: function addToCartFromWishlist() {
    $('body').on('click', '.add-to-cart', function () {
      var pid;
      var addToCartUrl;
      var pidsQty;
      $('body').trigger('product:beforeAddToCart', this);
      pid = $(this).data('pid');
      addToCartUrl = $(this).data('url');
      pidsQty = parseInt($(this).closest('.product-info').find('.quantity').val(), 10);
      var form = {
        pid: pid,
        quantity: pidsQty
      };

      if ($(this).data('option')) {
        form.options = JSON.stringify($(this).data('option'));
      }

      $(this).trigger('updateAddToCartFormData', form);

      if (addToCartUrl) {
        $.ajax({
          url: addToCartUrl,
          method: 'POST',
          data: form,
          success: function success(data) {
            handlePostCartAdd(data);
            $('body').trigger('product:afterAddToCart', data);
            $.spinner().stop();
            base.miniCartReportingUrl(data.reportingURL, data.error);
          },
          error: function error() {
            $.spinner().stop();
          }
        });
      }
    });
  },
  moreWLItems: function moreWLItems() {
    $('body').on('click', '.more-wl-items', function () {
      var pageNumber = $('.wishlistItemCardsData').data('page-number');
      renderNewPageOfItems(pageNumber, true);
    });
  },
  copyWishlistLink: function copyWishlistLink() {
    $('body').on('click', '.fa-link', function () {
      var $temp = $('<input>');
      $('body').append($temp);
      $temp.val($('#shareUrl').val()).select();
      document.execCommand('copy');
      $temp.remove();
      $('.copy-link-message').removeClass('d-none');
      setTimeout(function () {
        $('.copy-link-message').addClass('d-none');
      }, 3000);
    });
  },
  submitWishlistSearch: function submitWishlistSearch() {
    $('body').on('click', '#wishlist-search button', function (e) {
      var firstName = $('#wishlist-search-first-name').val();
      var lastName = $('#wishlist-search-last-name').val();
      var email = $('#wishlist-search-email').val();

      if (!firstName && !lastName && !email || firstName && !lastName && !email || !firstName && lastName && !email) {
        e.preventDefault();
        $('.wishlist-error-search div').addClass('alert alert-danger');
        var errorText = $('.wishlist-error-search').data('error-msg');
        $('.wishlist-error-search div').html(errorText);
      }
    });
  },
  moreWLSearchResults: function moreWLSearchResults() {
    $('body').on('click', '.more-wl-results', function () {
      var firstName = $(this).data('search-fname');
      var lastName = $(this).data('search-lname');
      var pageNumber = $(this).data('page-number');
      var uuids = [];
      $('.wl-hit').each(function () {
        uuids.push($(this).find('a').data('id'));
      });
      var url = $(this).data('url');
      $.spinner().start();
      $.ajax({
        url: url,
        method: 'POST',
        data: {
          firstName: firstName,
          lastName: lastName,
          uuids: JSON.stringify(uuids),
          pageNumber: ++pageNumber
        },
        success: function success(data) {
          if (data.results.changedList) {
            $('.wl-hits .wl-hit').remove();
          }

          $('#result-count').html(data.results.totalString);
          data.results.hits.forEach(function (hit) {
            var divString = '<div class="row wl-hit">' + '<div class="text-left col-6">' + hit.firstName + ' ' + hit.lastName + '</div>' + '<div class="text-right col-6">' + '<a href="' + hit.url + '" title="' + hit.urlTitle + '" data-id="' + hit.id + '">' + hit.urlText + '</a>' + '</div>' + '</div>';
            $('.wl-hits').append(divString);
          });

          if (data.results.showMore) {
            $('.find-another-wl .more-wl-results').data('page-number', data.results.pageNumber);
          } else {
            $('.find-another-wl .more-wl-results').remove();
          }

          $.spinner().stop();
        },
        error: function error() {
          $.spinner().stop();
        }
      });
    });
  }
};

/***/ })

/******/ });
//# sourceMappingURL=wishlist.js.map