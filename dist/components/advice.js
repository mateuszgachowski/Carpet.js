/*!
 * Carpet.js v3.1.2 (http://mateuszgachowski.github.io/Carpet.js/)
 * Copyright 2014-2017 Mateusz Gachowski <mateusz.gachowski@gmail.com>
 * Licensed under MIT
 */

Carpet.registerComponent("advice",function(){"use strict";return{around:function(a,b){return function(){var c=0,d=arguments.length,e=new Array(d+1);for(e[0]=a.bind(this);c<d;c++)e[c+1]=arguments[c];return b.apply(this,e)}},before:function(a,b){var c="function"==typeof b?b:b.obj[b.fnName];return function(){return c.apply(this,arguments),a.apply(this,arguments)}},after:function(a,b){var c="function"==typeof b?b:b.obj[b.fnName];return function(){var b=(a.unbound||a).apply(this,arguments);return c.apply(this,arguments),b}},withAdvice:function(){["before","after","around"].forEach(function(a){this[a]=function(b,c){this[b]=Carpet.getComponent("advice")[a](this[b],c)}},this)}}});