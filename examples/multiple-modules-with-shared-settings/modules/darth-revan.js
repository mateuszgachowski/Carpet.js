Carpet.module('darth-revan', function (exports, settings, context) {
  'use strict';

  exports.init = function () {
  	Carpet.log(context);
    context.innerHTML += '<li>Darth Revan ' + settings.type + '</li>';
  };
});