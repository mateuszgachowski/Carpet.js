Carpet.module('competitions', function (exports, settings, context) {
  'use strict';

  var teams = {
    arsenal : ['ARS vs WHU', 'ARS vs SUN', 'ARS vs EVE'],
    chelsea : ['CHE vs LIV', 'CHE vs BUR', 'CHE vs CRY']
  };

  var loadMatches = function () {
    context.innerHTML = '<h1>' + settings.teamName + '</h1>' + teams[settings.teamName].join(', ');
  };

  exports.init = function () {
    Carpet.loggingEnabled = true;
    loadMatches();
  };
});