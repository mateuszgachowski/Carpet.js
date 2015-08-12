/* global describe:false, it:false, expect:false */
(function (window, document, undefined) {
  'use strict';


  describe('Carpet.js: Application namespace presence', function () {
    it('Carpet is defined', function () {
      expect(window.Carpet).toBeDefined();
    });

    it('Carpet should be an object', function () {
      expect(typeof window.Carpet).toBe('object');
    });

  });

  describe('Carpet.js: Console logging methods', function () {

    it('should have all the console logging methods present', function () {
      expect(window.Carpet.log).toBeDefined();
      expect(window.Carpet.warn).toBeDefined();
      expect(window.Carpet.error).toBeDefined();
      expect(window.Carpet.info).toBeDefined();
      expect(window.Carpet.clearConsole).toBeDefined();
      expect(window.Carpet.debug).toBeDefined();
    });

    it('all console logging methods should be functions', function () {
      expect(typeof window.Carpet.log).toBe('function');
      expect(typeof window.Carpet.warn).toBe('function');
      expect(typeof window.Carpet.error).toBe('function');
      expect(typeof window.Carpet.info).toBe('function');
      expect(typeof window.Carpet.clearConsole).toBe('function');
      expect(typeof window.Carpet.debug).toBe('function');
    });
  });

  describe('Carpet.js: Module pattern should behave correctly', function () {

    it('Carpet.module should be defined', function () {
      expect(window.Carpet.module).toBeDefined();
    });

    it('Carpet.module should be a function', function () {
      expect(typeof window.Carpet.module).toBe('function');
    });

    it('Carpet.getModule should be defined and be a function', function () {
      expect(window.Carpet.getModule).toBeDefined();
      expect(typeof window.Carpet.getModule).toBe('function');
    });

    it('calling Carpet.module should create a module instance in the memory', function () {
      window.Carpet.module('testingModule', function () {});

      expect(window.Carpet.getModule('testingModule')).toBeDefined();
    });

    it('created module should have all the valid properties', function () {
      var moduleName = 'testingModule2';
      var testingModuleCallback = function () {};
      window.Carpet.module(moduleName, testingModuleCallback);

      expect(typeof window.Carpet.getModule(moduleName)).toBe('object');

      expect(typeof window.Carpet.getModule(moduleName).moduleBody).toBeDefined();
      expect(typeof window.Carpet.getModule(moduleName).moduleBody).toBe('function');
      expect(window.Carpet.getModule(moduleName).moduleBody.toString()).toBe(testingModuleCallback.toString());

      expect(typeof window.Carpet.getModule(moduleName).name).toBeDefined();
      expect(typeof window.Carpet.getModule(moduleName).name).toBe('string');
      expect(window.Carpet.getModule(moduleName).name).toBe(moduleName);

      expect(typeof window.Carpet.getModule(moduleName).settings).toBeDefined();
      expect(typeof window.Carpet.getModule(moduleName).settings).toBe('object');

      expect(typeof window.Carpet.getModule(moduleName).methods).toBeDefined();
      expect(typeof window.Carpet.getModule(moduleName).methods).toBe('object');

    });

    it('should fire the module after found in DOM', function (done) {
      var element = document.createElement('div');
      element.setAttribute('data-module', 'domModuleTest');
      document.body.appendChild(element);

      window.Carpet.module('domModuleTest', function (exports, settings, context) {

        exports.init = function () {
          expect(context).toEqual(element);
          done();
        };
      });

      window.Carpet.init();
    });

    it('should fire multiple modules on one context with same inherited settings', function (done) {

      var sampleTestSettings = { sampleKey: 'sampleValue', anotherKey: 1 };

      var element = document.createElement('div');
      element.setAttribute('data-module', 'domModuleTest1 domModuleTest2 domModuleTest3');
      element.setAttribute('data-settings', JSON.stringify(sampleTestSettings));
      document.body.appendChild(element);

      var testModuleBody = function (exports, settings, context) {
        exports.init = function () {
          expect(context).toEqual(element);
          expect(settings).toEqual(sampleTestSettings);
          done();
        };
      };

      window.Carpet.module('domModuleTest1', testModuleBody);
      window.Carpet.module('domModuleTest2', testModuleBody);
      window.Carpet.module('domModuleTest3', testModuleBody);

      window.Carpet.init();
    });

    it('should inherit the settings from the DOM module', function (done) {

      var sampleSettings = { sampleKey: 'sampleValue', anotherKey: 1 };


      var element = document.createElement('div');
      element.setAttribute('data-module', 'domModuleTestSettings');
      element.setAttribute('data-settings', JSON.stringify(sampleSettings));
      document.body.appendChild(element);

      window.Carpet.module('domModuleTestSettings', function (exports, settings) {
        expect(settings).toBeDefined();
        expect(typeof settings).toBe('object');
        expect(settings).toEqual(sampleSettings);
        done();
      });

      window.Carpet.init();
    });

  });

  describe('Carpet.js: Component pattern should behave correctly', function () {
    it('Carpet.registerComponent should be defined', function () {
      expect(window.Carpet.registerComponent).toBeDefined();
    });

    it('Carpet.registerComponent should be a function', function () {
      expect(typeof window.Carpet.registerComponent).toBe('function');
    });

    it('Carpet.getComponent should be defined and be a function', function () {
      expect(window.Carpet.getComponent).toBeDefined();
      expect(typeof window.Carpet.getComponent).toBe('function');
    });

    it('calling Carpet.registerComponent should create a module instance in the memory', function () {
      window.Carpet.registerComponent('testingComponent', function () { return {}; });

      expect(window.Carpet.getComponent('testingComponent')).toBeDefined();
    });

    it('Carpet.getComponent should return correct instance of the component', function () {

      var componentAPI = {
        methodA : function () {
          return 1 + 5;
        },

        methodB : function () {
          return 'a' + 'b';
        },

        property1 : 9,
        property2 : {},
        property3 : [1, 5, 9]
      };

      window.Carpet.registerComponent('testingComponent', function () {
        return componentAPI;
      });

      expect(window.Carpet.getComponent('testingComponent')).toEqual(componentAPI);
    });

    it('this.component should return correct instance of the component in the module', function (done) {

      var componentName = 'testingComponentModule';
      var moduleName    = 'testingModuleComponent';
      var componentAPI  = {
        exampleMethod : function () {}
      };

      window.Carpet.registerComponent(componentName, function () {
        return componentAPI;
      });

      var element = document.createElement('div');
      element.setAttribute('data-module', moduleName);
      document.body.appendChild(element);

      window.Carpet.module(moduleName, function () {
        var loadComponent = this.component(componentName);

        expect(loadComponent).toEqual(componentAPI);
        done();
      });

      window.Carpet.init();
    });

    it('component should be loaded only once when required', function () {

      var componentBodyCounter = 0;
      var componentFunctionCounter = 0;

      window.Carpet.registerComponent('functionComponent', function () {
        componentBodyCounter++;
        return function () {
          componentFunctionCounter++;
        };
      });

      window.Carpet.getComponent('functionComponent')(); // First require
      window.Carpet.getComponent('functionComponent')(); // Second require

      expect(componentBodyCounter).toEqual(1); // Body fired only once (pending first require)
      expect(componentFunctionCounter).toEqual(2); // Function in the componentAPI called two times (one pending each)

    });
  });

})(this, this.document);
