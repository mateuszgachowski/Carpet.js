/*!
 * Carpet.js v2.0.1 (http://mgachowski.pl)
 * Copyright 2014-2014 Mateusz Gachowski <mateusz.gachowski@gmail.com>
 * Licensed under MIT (https://github.com/mateuszgachowski/Carpet.js/blob/master/LICENSE)
 */
(function () {
  'use strict';

  /**
   * Defining global Carpet's namespace (having readable name)
   *
   * @namespace Carpet
   * @type {Object}
   */
  window.Carpet = (function () {


    function Carpet () {

      var carpetModules = {};
      var arraySlice = Array.prototype.slice;
      this.loggingEnabled = false;

      /**
       * Will log something in console only if Carpet.loggingEnabled is true
       *
       * @example
       *
       *  Carpet.log('I want to log text');                                 // => Carpet:log (23/11/2012 16:18:42) ["I want to log text"]
       *  Carpet.log('I want to log text', { and: 'a javascript object' }); // => Carpet:log (23/11/2012 16:19:01) ["I want to log text", > Object]
       *
       * @memberOf Carpet
       * @method log
       *
       * @param     {Any[]}  Any number of arguments of any type, all would be logged
       */
      this.log = function (/* arg1, arg2, ..., argn */) {
        this.debug.apply(this, ['log'].concat(arraySlice.call(arguments)));
      };

      /**
       * Will warn something in console only if Carpet.loggingEnabled is true
       *
       * @example
       *
       *  Carpet.warn('I want to log a warning');                                 // => Carpet:warn (23/11/2012 16:18:42) ["I want to log a warning"]
       *  Carpet.warn('I want to log a warning', { and: 'a javascript object' }); // => Carpet:warn (23/11/2012 16:19:01) ["I want to log a warning", > Object]
       *
       * @memberOf Carpet
       * @method warn
       *
       * @param     {Any[]}  Any number of arguments of any type, all would be warned
       */
      this.warn = function (/* arg1, arg2, ..., argn */) {
        this.debug.apply(this, ['warn'].concat(arraySlice.call(arguments)));
      };

      /**
       * Will log something in console only if Carpet.loggingEnabled is true
       *
       * @example
       *
       *  Carpet.error('I want to log an error');                                 // => Carpet:error (23/11/2012 16:18:42) ["I want to log an error"]
       *  Carpet.error('I want to log an error', { and: 'a javascript object' }); // => Carpet:error (23/11/2012 16:19:01) ["I want to log an error", > Object]
       *
       * @memberOf Carpet
       * @method error
       *
       * @param     {Any[]}  Any number of arguments of any type, all would be logged
       */
      this.error = function (/* arg1, arg2, ..., argn */) {
        this.debug.apply(this, ['error'].concat(arraySlice.call(arguments)));
      };

      /**
       * Will log something in console only if Carpet.loggingEnabled is true
       *
       * @example
       *
       *  Carpet.info('I want to log an info');                                 // => Carpet:info (23/11/2012 16:18:42) ["I want to log an info"]
       *  Carpet.info('I want to log an info', { and: 'a javascript object' }); // => Carpet:info (23/11/2012 16:19:01) ["I want to log an info", > Object]
       *
       * @memberOf Carpet
       * @method info
       *
       * @param     {Any[]}  Any number of arguments of any type, all would be logged
       */
      this.info = function (/* arg1, arg2, ..., argn */) {
        this.debug.apply(this, ['info'].concat(arraySlice.call(arguments)));
      };

      /**
       * Will clear all data that's already logged in console.
       *
       * @example
       *
       *  Carpet.clearConsole()
       *  // Console was cleared
       *
       * @memberOf Carpet
       * @method clearConsole
       */
      this.clearConsole = function () {
        this.debug.apply(this, ['clear']);
      };


      /**
       * Will debug something in console only if Carpet.loggingEnabled is true
       *
       * @example
       *
       *  Carpet.debug('log',   'I want to log text');          // => Carpet:log (23/11/2012 16:18:42) ["I want to log text"]
       *  Carpet.debug('warn',  'I want to log a warning');     // => Carpet:warn (23/11/2012 16:18:42) ["I want to log a warning"]
       *  Carpet.debug('error', 'I want to log an error');      // => Carpet:error (23/11/2012 16:18:42) ["I want to log an error"]
       *
       * @memberOf Carpet
       * @method debug
       *
       * @param     {String}  debugType   Type of debug info, can be 'log', 'warn' or 'error'
       * @param     {Any[]}               Any number of arguments of any type, all would be logged
       */
      this.debug = function (debugType /*, arg1, arg2, ..., argn */) {
        var args;
        if (this.loggingEnabled) {
          if (window.console && window.console[debugType] && window.console[debugType].apply) {
            args = arraySlice.call(arguments, 1);
            window.console[debugType].apply(window.console, ['Carpet:{0}'.replace('{0}', debugType), args]);
          }
        }
      };

      /**
       * Will create a new module and add returned methods to the modules namespace
       *
       * @example
       *
       *  // Single instance (the same for all modules, with shared settings etc)
       *  Carpet.module('sampleModule', function (exports, settings, DOMContext) {
       *
       *    var config = {
       *      privateVar: 123
       *    };
       *
       *    var privateFunction = function () {
       *      console.log('This is a private function. Do whatever you want.');
       *      console.log('We have access to public ', settings, ' and public methods ', exports, ' and context :)');
       *    };
       *
       *    exports.sampleMethod = function () {
       *      console.log('This is a sample method');
       *      console.log('We are working on ', DOMContext, ' element');
       *      privateFunction();
       *    };
       *
       *    exports.init = function () {
       *      console.log('this is automatically called after module is loaded');
       *      this.sampleMethod();
       *    };
       *
       *  });
       *
       *
       * @memberOf Carpet
       * @method module
       *
       * @param  {String}   moduleName Name of the module
       * @param  {Function} callback   Actual module body
       */
      this.module = function (moduleName, initCallback) {
        if (carpetModules[moduleName]) {
          this.warn('Module: {0} already exists. Name collision'.replace('{0}', moduleName));
          return;
        }

        carpetModules[moduleName] = {
          moduleBody : initCallback,
          name       : moduleName,
          settings   : {},
          methods    : {}
        };

        this.log('Module: {0} has been loaded to memory'.replace('{0}', moduleName));
      };

      /**
       * Returns module by given module name
       * @param  {String} moduleName Name of the module you want to get
       * @return {Object}            Module object
       */
      this.getModule = function (moduleName) {
        if (carpetModules[moduleName]) {
          return carpetModules[moduleName];
        }
        else {
          this.warn('Module: {0} has not been found in memory'.replace('{0}', moduleName));
        }
      };

      /**
       * Loads the modules if found in DOM ([data-module="myModule"])
       * It will automatically fire the `init` method if found inside the module
       *
       * @example
       *
       * &lt;div class="module" data-module="myModule"&gt;&lt;/div&gt;
       *
       * &lt;script type="text/javascript"&gt;
       *  Carpet.init();
       * &lt;/script&gt;
       *
       * @memberOf Carpet
       * @method init
       *
       */
      this.init = function () {
        var DOMModules = document.querySelectorAll('[data-module]');

        for (var moduleIndex = 0; moduleIndex < DOMModules.length; moduleIndex++) {
          var domModule;
          var moduleName;
          var moduleSettings;
          var currentModule;

          domModule = DOMModules[moduleIndex];
          moduleName = domModule.getAttribute('data-module');

          /*jshint -W054 */
          moduleSettings = new Function ('return ' + domModule.getAttribute('data-settings'))() || {};
          /*jshint +W054 */

          currentModule = carpetModules[moduleName];

          if (currentModule) {

            currentModule.settings = moduleSettings;
            currentModule.moduleBody.call(currentModule, currentModule.methods, currentModule.settings, domModule);

            if (typeof currentModule.methods.init === 'function') {
              this.info('Module: {0} has been autoinited'.replace('{0}', currentModule.name));
              currentModule.methods.init();
            }
          }
          else {
            this.warn('Module: {0} has not been found'.replace('{0}', moduleName));
          }
        }
      };
    }

    return new Carpet();
  }());
})();

(function () {
  'use strict';
  /**
   * @namespace Carpet.advice
   * @type {Object}
   */

  Carpet.advice = {

    /**
     * Wrapes function around
     *
     * @memberOf Carpet.advice
     * @param  {Function} base    Function to wrap on
     * @param  {Function} wrapped Wrapping function
     * @return {Function}         Wrapped function body
     */
    around: function (base, wrapped) {
      return function composedAround() {
        // unpacking arguments by hand is faster
        var i = 0;
        var l = arguments.length;
        var args = new Array(l + 1);

        args[0] = base.bind(this);
        for (; i < l; i++) {
          args[i + 1] = arguments[i];
        }
        return wrapped.apply(this, args);
      };
    },

    /**
     * Fires function before the base one
     *
     * @memberOf Carpet.advice
     * @param  {Function} base   Base function to be advised
     * @param  {Function} before Function to be called before
     * @return {Function}        Function body with your function before
     */
    before : function (base, before) {
      var beforeFn = (typeof before === 'function') ? before : before.obj[before.fnName];
      return function composedBefore() {
        beforeFn.apply(this, arguments);
        return base.apply(this, arguments);
      };
    },

    /**
     * Fires function after the base on
     *
     * @memberOf Carpet.advice
     * @param  {Function} base  Base function to be advised
     * @param  {Function} after Function to be called after
     * @return {Function}       Function body with your function before
     */
    after: function (base, after) {
      var afterFn = (typeof after === 'function') ? after : after.obj[after.fnName];
      return function composedAfter() {
        var res = (base.unbound || base).apply(this, arguments);
        afterFn.apply(this, arguments);
        return res;
      };
    },


    /**
     * Binds advice for given object
     *
     * @example
     * var myObj = {
     *   sample : function () {
     *     console.log('World!');
     *   }
     * };
     *
     * Carpet.advice.withAdvice.call(myObj);
     *
     * myObj.before('sample', function () {
     *   console.log('Hello ');
     * });
     *
     * myObj.sample();
     * // => 'Hello '
     * // => 'World!'
     *
     * @memberOf Carpet.advice
     */
    withAdvice: function () {
      ['before', 'after', 'around'].forEach(function (m) {
        this[m] = function (method, fn) {
          this[method] = Carpet.advice[m](this[method], fn);
        };
      }, this);
    }
  };

})();
