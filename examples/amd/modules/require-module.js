Carpet.module('require-module', ['modules/test'], function (exports, settings, context, deps) {
  'use strict';
  exports.init = function () {
    console.log(exports, settings, context, deps);
  };
});
