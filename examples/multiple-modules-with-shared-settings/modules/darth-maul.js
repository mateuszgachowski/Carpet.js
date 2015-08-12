Carpet.module('darth-maul', function (exports, settings, context) {
  'use strict';

  exports.init = function () {
  	Carpet.log(context);
    context.innerHTML += '<li>Darth Maul the ' + settings.type + '</li>';
  };
});