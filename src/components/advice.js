/**
 * @module advice
 */
Carpet.registerComponent('advice', function () {
  'use strict';

  return {
    /**
     * Wrapes function around
     *
     * @param  {Function} base    Function to wrap on
     * @param  {Function} wrapped Wrapping function
     * @return {Function}         Wrapped function body
     */
    around: function (base, wrapped) {
      return function composedAround() {
        // unpacking arguments by hand is faster
        var i = 0;
        var l = arguments.length;
        var args = new Array(l + 1);

        args[0] = base.bind(this);
        for (; i < l; i++) {
          args[i + 1] = arguments[i];
        }
        return wrapped.apply(this, args);
      };
    },

    /**
     * Fires function before the base one
     *
     * @param  {Function} base   Base function to be advised
     * @param  {Function} before Function to be called before
     * @return {Function}        Function body with your function before
     */
    before : function (base, before) {
      var beforeFn = (typeof before === 'function') ? before : before.obj[before.fnName];
      return function composedBefore() {
        beforeFn.apply(this, arguments);
        return base.apply(this, arguments);
      };
    },

    /**
     * Fires function after the base on
     *
     * @param  {Function} base  Base function to be advised
     * @param  {Function} after Function to be called after
     * @return {Function}       Function body with your function before
     */
    after: function (base, after) {
      var afterFn = (typeof after === 'function') ? after : after.obj[after.fnName];
      return function composedAfter() {
        var res = (base.unbound || base).apply(this, arguments);
        afterFn.apply(this, arguments);
        return res;
      };
    },


    /**
     * Binds advice for given object
     *
     * @example
     * var myObj = {
     *   sample : function () {
     *     console.log('World!');
     *   }
     * };
     *
     * Carpet.advice.withAdvice.call(myObj);
     *
     * myObj.before('sample', function () {
     *   console.log('Hello ');
     * });
     *
     * myObj.sample();
     * // => 'Hello '
     * // => 'World!'
     *
     */
    withAdvice: function () {
      ['before', 'after', 'around'].forEach(function (m) {
        this[m] = function (method, fn) {
          this[method] = Carpet.getComponent('advice')[m](this[method], fn);
        };
      }, this);
    }
  };
});