/**
 *
 * <p>This script provides inheritance support and is inspired by base2 and Prototype</p>
 *
 * <p>The constructor is named <pre>init()</pre></p>
 *
 * <p>If a needs to override a method of a superclass, the overridden method can always be
 * called using</p>
 *                   <pre>this._super();</pre>
 *
 * <p>This is true for the constructor as well as for any other method.</p>
 *
 * @see http://etobi.de/blog/artikel/weiterlesen/vererbung-mit-javascript/
 *
 * @module util/Class
 */

/**
 * Base class which allows simple inheritance.
 *
 * @class module:util/Class~Class
 * @example
 * var MyClass = SiteGenClass.extends({
    *     init : function(){
    *         // do some construction
    *     }
    * })
    *
    * // you can call the super class's method from within any method like this
    * ...
    *     myMethod : function(){
    *         // call 'myMethod' of super class
    *         this._super();
    *     }
    */
   // Hack, because vars cannot be imported in DW, only functions
   function SiteGenClass() {}
   
   (function () {
       var initializing = false;
       var fnTest = /xyz/.test(function () {}) ? /\b_super\b/ : /.*/;
   
       // The base Class implementation (does nothing)
       //this.Class = function(){};
   
       /**
        * Create a new sub class
        * @param  {Object} prop An object defining the members of the sub class
        * @return {Object}      The sub class
        * @instance
        */
       SiteGenClass.extend = function (prop) {
           var _super = this.prototype;
   
           // Instantiate a base class (but only create the instance,
           // don't run the init constructor)
           initializing = true;
           var prototype = new this();
           initializing = false;
   
           // Copy the properties over onto the new prototype
           var callback = function (name, fn) {
               return function () {
                   var tmp = this._super;
   
                   // Add a new ._super() method that is the same method
                   // but on the super-class
                   this._super = _super[name];
   
                   // The method only need to be bound temporarily, so we
                   // remove it when we're done executing
                   var ret = fn.apply(this, arguments);
                   this._super = tmp;
   
                   return ret;
               };
           };
           for (var name in prop) {
               // Check if we're overwriting an existing function
               prototype[name] =
                   typeof prop[name] === 'function' && typeof _super[name] === 'function' && fnTest.test(prop[name]) ? callback(name, prop[name]) : prop[name];
           }
   
           // The dummy class constructor
           function SiteGenClass() {
               // All construction is actually done in the init method
               if (!initializing && this.init) {
                   this.init.apply(this, arguments);
               }
           }
   
           // Populate our constructed prototype object
           SiteGenClass.prototype = prototype;
   
           // Enforce the constructor to be what we expect
           SiteGenClass.constructor = SiteGenClass;
   
           // And make this class extendable
           SiteGenClass.extend = arguments.callee;
   
           return SiteGenClass;
       };
   })();
   
   /** @type {module:util/SiteGenClass~SiteGenClass} */
   exports.SiteGenClass = SiteGenClass;
   