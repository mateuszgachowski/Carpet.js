# ![Carpet.js Icon](http://mgachowski.pl/carpetjs.svg) Carpet.js

[![Greenkeeper badge](https://badges.greenkeeper.io/mateuszgachowski/Carpet.js.svg)](https://greenkeeper.io/)

<small>project icon: Rug by Factorio.us collective from The Noun Project</small>

Master: [![Build Status](https://travis-ci.org/mateuszgachowski/Carpet.js.svg?branch=master)](https://travis-ci.org/mateuszgachowski/Carpet.js) Develop: [![Build Status](https://travis-ci.org/mateuszgachowski/Carpet.js.svg?branch=develop)](https://travis-ci.org/mateuszgachowski/Carpet.js)

# Features

- Lightweight: Minified: 2.2K, Minified & Gzipped: < 1K
- Easy and Module based
- Easily extendable by components

**Used on big-scale projects as:**

- Copa America Offical Site (http://www.ca2015.com/)
- ePlayer (http://eplayer.performgroup.com/)
- ProTipster (https://www.protipster.com/)
and many more...

**Browser Support (tested)**

- IE 9.0 (Windows 7)
- IE 10.0 (Windows 7)
- IE 11.0 (Windows 7)
- Firefox 41.0 (Windows 8)
- Firefox 41.0 (Mac OS X 10.11)
- Safari 8.1 (Mac OS X 10.11)
- Chrome 45.0 (Windows 7)
- Chrome 45.0 (Mac OS X 10.10.0)



# Framework Usage

## Installation

```
bower install carpet
```

or download the compressed file [from here](https://github.com/mateuszgachowski/Carpet.js/blob/master/dist/carpet.min.js)

## Minimal application

Minimal application will not do anything until you define some modules.

Example:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Carpet.js - Sample usage</title>
  </head>
  <body>
    <!-- your code here -->
    <script src="bower_components/carpet/dist/carpet.min.js"></script>

    <script>
      Carpet.init(); // Initialises the framework
    </script>
  </body>
</html>
```

## Modules

Carpet.js is about modules so you have to define one before you start.
Modules are defined very easily:

In html file:

```html
<div data-module="myFirstModule"></div>
```
In JS file (before `Carpet.init()`)

```js
Carpet.module('myFirstModule', function (exports, settings, context) {
  'use strict';

  exports.init = function () {
    console.log('I will show when a data-module="myFirstModule" will be found in DOM');
  };
});
```

`Carpet.module()` takes two parameters:
- name of the module (string, it should fit the name put in `data-module` attribute)
- module body (function which will contain all the module body)

Your module body will be called with three parameters: `exports`, `settings` and `context`.

- `exports` - object which will be 'public', you can extend it with a function or properties. `exports.init` is reserved for the initial function which will be called immediately after module init. If you do not provide `exports.init` the module will stay in the memory but have to be initialized in another way (e.g. PubSub)
- `settings` - object with module settings. Settings can be passed by the DOM attribute as following:
```js
data-settings="{'key' : 'value', sample: [1, 3, 5]}"
```

- `context` - is a HTML DOM context which should be used as scope for all DOM finding actions, e.g. using jQuery:
```js
$('a', context).anything(); // or
$(context).find('.my-pro-element').on('click', anotherFunction);
```

**Additional informations**

In module body you can also access its `this` context where you can find some additional data:

```js
this.name       // - (string) containing the name of the module
this.moduleBody // - (function) body of the module
this.settings   // - (object) settings object
this.methods    // - (object) all public methods - same as 'exports'
```

## Logging to console

Carpet.js comes with bunch of console.log extensions which will help you to organise your console output.

Sample logs:
```js
Carpet:log ["Module: navigation has been loaded to memory"]
Carpet:info ["Module: navigation has been autoinited"]
```

**Enable logging**

Logging is disabled by default. You can easily enable it by just setting the `Carpet.loggingEnabled` to `true`.
Remember the property must be set before `Carpet.init()`.

```js
Carpet.loggingEnabled = true;
```

**Use available logging methods**

```js
Carpet.log('log me'); // with log level
Carpet.warn('something wrong!'); // with warn level
Carpet.error('Application abort!!'); // with error level
Carpet.info('I am awesome'); // with info level
```

Logs can take any type and any amount of parameters

```js
Carpet.warn('log me', {}, [], 1, -1, Infinity, function(){} /* any other type here */); // with log level
```

**Clearing the output**

To clear the output just call `Carpet.clearConsole()`

For more information you can check the [API documentation](http://mateuszgachowski.github.io/Carpet.js/api_docs/index.html)

# Writing your own components

Components are separated logic in Carpet.js. They can be loaded inside the modules. Before first load they stay in the memory - not executed.

*You can use them as helpers or any other kind of separated logic.*

Writing a component is very easy:

```js
Carpet.registerComponent('componentName', function () {

  Carpet.log(this); // => { name: 'componentName', componentBody: function...}

  return {
    componentMethod : function () {
      return 1;
    },

    componentProperty : [1, 5, 7],

    anythingYouWant : {}
  };
});
```

Component can return any type. Object with methods or a simple function are the preferred pattern.

Component is inactive until the first 'require'. You can get the component in two ways:

```js
// Globally (from anywhere)
Carpet.getComponent('componentName'); // => { componentMethod: function...}

// Locally in the module (preferred)
Carpet.module('myModule', function (exports, settings, context) {
  var mySweetComponent = this.component('componentName');

  Carpet.log(mySweetComponent);
  // =>
  // {
  //  componentMethod : function () { return 1; },
  //  componentProperty : [1, 5, 7],
  //  anythingYouWant : {}
  // }
});
```

Components have to be loaded before modules, so the structure looks like this:

```html
  <!-- Carpet.js -->
  <script src="carpet.min.js"></script>

  <!-- Components -->
  <script src="components/myComponent.js"></script> <!-- HERE -->

  <!-- Modules -->
  <script src="modules/myModule.js"></script>

  <!-- Application init -->
  <script>Carpet.init();</script>

```

Carpet.js comes with some components included, but they are not added in the core library by default. You must add them to your html file with a `script` tag.

# Contribution

## Setup for development

```
npm install
grunt dist      # Generates dist files with full testing and linting
# or
grunt dist-dev  # Generates dist files without checking the code
```

## Generating JSDoc

```
grunt docs
```

## Running unit tests

```
npm test
```

## Branching model and submitting changes

Carpet.js is using the great [Git Flow](https://github.com/nvie/gitflow). Please follow installation instruction for your distribution [clicking here](https://github.com/nvie/gitflow/wiki/Installation).

After you install GitFlow on your machine run this command in the **forked** Carpet.js repository:

```
git flow init
```

Now you should be ready to start working on a feature. Feature naming pattern should fit the following:

```
mg-short-description
^      ^-- Short description separated by dashes (-)
^--- Your initials

Examples:

mg-component-pubsub
ms-bug-21-wrong-casting # bug or others can be followed by GitHub issue number
```

To start working on a feature you will have to create a feature branch.

```
git flow feature start mg-component-pubsub
```

Then you can easily work on your branch, commit and `git push` your changes.
After you finish your functionality and all tests are passing correctly (locally and by Travis CI) you can submit a Pull Request.

If the Pull request has been merged correctly you can just finish the branch by:

```
git flow feature finish mg-component-pubsub
```

Thats all, your feature will be released in next version!

## Writing build-in components

Writing Carpet.js components don't differ from normal component registration pattern but requires documentation and full test coverage.

As a sample you can take a look at the advice component and its tests:

```js
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
    // etc..
    // [...]
  };
});
```

Feel free to contribute or add [issues](https://github.com/mateuszgachowski/Carpet.js/issues) and questions
