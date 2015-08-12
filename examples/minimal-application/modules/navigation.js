Carpet.module('navigation', function (exports, settings, context, deps) {
  'use strict';

  exports.init = function () {
    Carpet.loggingEnabled = true;
    Carpet.log('Yupi! Navigation module loaded with ', context);
  };
});