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

      var carpetModules;
      var carpetComponents;
      var arraySlice;

      carpetModules = {};
      carpetComponents = {};
      arraySlice = Array.prototype.slice;

      return {
        /**
         * Defines console output on or off
         *
         * @type {Boolean}
         * @memberOf Carpet
         */
        loggingEnabled : false,

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
        log : function (/* arg1, arg2, ..., argn */) {
          this.debug.apply(this, ['log'].concat(arraySlice.call(arguments)));
        },

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
        warn : function (/* arg1, arg2, ..., argn */) {
          this.debug.apply(this, ['warn'].concat(arraySlice.call(arguments)));
        },

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
        error : function (/* arg1, arg2, ..., argn */) {
          this.debug.apply(this, ['error'].concat(arraySlice.call(arguments)));
        },

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
        info : function (/* arg1, arg2, ..., argn */) {
          this.debug.apply(this, ['info'].concat(arraySlice.call(arguments)));
        },

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
        clearConsole : function () {
          this.debug.apply(this, ['clear']);
        },


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
        debug : function (debugType /*, arg1, arg2, ..., argn */) {
          var args;
          if (this.loggingEnabled) {
            if (window.console && window.console[debugType] && window.console[debugType].apply) {
              args = arraySlice.call(arguments, 1);
              window.console[debugType].apply(window.console, ['Carpet:{0}'.replace('{0}', debugType), args]);
            }
          }
        },

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
        module : function (moduleName, initCallback) {
          if (carpetModules[moduleName]) {
            this.warn('Module: {0} already exists. Name collision'.replace('{0}', moduleName));
            return;
          }

          carpetModules[moduleName] = {
            moduleBody : initCallback,
            name       : moduleName,
            settings   : {},
            methods    : {},
            component  : this.getComponent
          };

          this.info('Module: {0} has been loaded to memory'.replace('{0}', moduleName));
        },

        /**
         * Will create a custom component that can be used in 'module' or globally
         *
         * @example
         *
         * Carpet.registerComponent('componentName', function () {
         *
         *   Carpet.log(this); // => { name: 'componentName', componentBody: function...}
         *
         *   return {
         *     componentMethod : function () {
         *       return 1;
         *     },
         *     componentProperty : [1, 5, 7],
         *     anythingYouWant : {}
         *   };
         * });
         *
         *
         * @memberOf Carpet
         * @method registerComponent
         *
         * @param  {String}   componentName  Name of the component
         * @param  {Function} initCallback   Component body
         */
        registerComponent : function (componentName, initCallback) {
          if (carpetComponents[componentName]) {
            this.warn('Component: {0} already exists. Name collision'.replace('{0}', componentName));
          }

          carpetComponents[componentName] = {
            name          : componentName,
            componentBody : initCallback,
            initialized   : false
          };

          this.info('Component: {0} has been loaded to memory'.replace('{0}', componentName));
        },

        /**
         * Returns module by given module name
         *
         * @example
         * ...
         * Carpet.module('oneAnotherModule', function () {});
         * ...
         *
         * Carpet.getModule('oneAnotherModule'); // => { name: 'oneAnotherModule', methods: [...]}
         *
         * @memberOf Carpet
         * @method getModule
         *
         * @param  {String} moduleName Name of the module you want to get
         * @return {Object}            Module object
         */
        getModule : function (moduleName) {
          if (carpetModules[moduleName]) {
            return carpetModules[moduleName];
          }
          else {
            this.warn('Module: {0} has not been found in memory'.replace('{0}', moduleName));
          }
        },

        /**
         * Returns registered component by its name
         *
         * @example
         * ...
         * Carpet.registerComponent('uber', function () { return 1; });
         * ...
         *
         * Carpet.getComponent('uber'); // => 1
         *
         * @memberOf Carpet
         * @method getComponent
         *
         * @param  {String} componentName Name of the component you want to get
         * @return {Any}                  Any type that component represents
         */
        getComponent : function (componentName) {
          var component;

          component = carpetComponents[componentName];

          if (component) {
            if (!component.initialized) {
              component.initialized = true;
              component.instance = component.componentBody.call(component);
            }
            return component.instance;
          }
          else {
            this.warn('Component: {0} has not been found in memory'.replace('{0}', componentName));
          }
        },

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
        init : function () {

          var DOMModules = document.querySelectorAll('[data-module]');
          var Carpet = this;

          for (var moduleIndex = 0; moduleIndex < DOMModules.length; moduleIndex++) {
            var domModule;
            var modules;
            var moduleSettings;
            var currentModule;

            domModule = DOMModules[moduleIndex];
            modules = domModule.getAttribute('data-module').split(' ');

            /*jshint -W054 */
            moduleSettings = new Function ('return ' + domModule.getAttribute('data-settings'))() || {};
            /*jshint +W054 */

            modules.forEach(function (moduleName) {
                currentModule = carpetModules[moduleName];

                if (currentModule) {

                  currentModule.settings = moduleSettings;
                  currentModule.moduleBody.call(currentModule, currentModule.methods, currentModule.settings, domModule);

                  if (typeof currentModule.methods.init === 'function') {
                    Carpet.info('Module: {0} has been autoinited'.replace('{0}', currentModule.name));
                    currentModule.methods.init();
                  }
                }
                else {
                  Carpet.warn('Module: {0} has not been found'.replace('{0}', moduleName));
                }
            });

          }
        }
      };
    }

    return new Carpet();
  }());
})();
