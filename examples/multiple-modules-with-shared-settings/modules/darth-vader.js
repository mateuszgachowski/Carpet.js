Carpet.module('darth-vader', function (exports, settings, context) {
  'use strict';

  exports.init = function () {
  	Carpet.log(context);
    context.innerHTML += '<li>Darth Vader ' + settings.type + '</li>';
  };
});