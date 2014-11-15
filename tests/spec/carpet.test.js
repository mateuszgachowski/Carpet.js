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
      window.Carpet.module(moduleName, function () {});

      expect(typeof window.Carpet.getModule(moduleName)).toBe('object');

      expect(typeof window.Carpet.getModule(moduleName).moduleBody).toBeDefined();
      expect(typeof window.Carpet.getModule(moduleName).moduleBody).toBe('function');
      expect(window.Carpet.getModule(moduleName).moduleBody.toString()).toBe('function () {}');

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

})(this, this.document);
