(function () {
  'use strict';

  if (typeof window.PubSub !== 'object') {
    throw new Error('pubSub component requires pubSub library included (https://github.com/mroderick/PubSubJS)');
  }

  var CarpetEvents = {
    beforeInit : 'Carpet.beforeInit',
    afterInit  : 'Carpet.afterInit'
  };

  Carpet.init = Carpet.advice.before(Carpet.init, function () {
    Carpet.message = window.PubSub;
    Carpet.message.publish(CarpetEvents.beforeInitialized);
  });

  Carpet.init = Carpet.advice.after(Carpet.init, function () {
    Carpet.message.publish(CarpetEvents.afterInitialized);
  });
})();
