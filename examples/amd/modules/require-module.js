define(['carpet'], function (Carpet) {
  'use strict';
  Carpet.module('require-module', function (exports, settings, context) {

    exports.init = function () {
      console.log(arguments, settings, context);
    };
  });
});