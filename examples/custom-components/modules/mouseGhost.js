Carpet.module('mouseGhost', function (exports, settings, context) {
  'use strict';

  // Here we require the utils
  var utils = this.component('utils');


  exports.init = function () {

    var mouseMoveEvent = function (event) {
      context.innerText = 'X: '+ event.x + ', Y: ' + event.y;
    };

    // You will have to stop your mouse movement for 300 ms to see the coordinates
    context.onmousemove = utils.debounce(mouseMoveEvent, 300);
 };
});