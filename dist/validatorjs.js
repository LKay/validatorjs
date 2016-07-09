var Validator =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Validator_1 = __webpack_require__(1);
	var validator = Validator_1.Validator;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = validator;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _Promise = typeof Promise === 'undefined' ? __webpack_require__(2).Promise : Promise;

	var Rules_1 = __webpack_require__(7);
	var Messages_1 = __webpack_require__(17);
	var Errors_1 = __webpack_require__(13);
	var formatter = function formatter(attribute) {
	    return attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
	};

	var Validator = function () {
	    function Validator(input, rules, messages) {
	        _classCallCheck(this, Validator);

	        this.input = input;
	        this.messages = new Messages_1.Messages(messages);
	        this.errors = new Errors_1.Errors(this.messages);
	        this.rules = new Rules_1.Rules(rules, this.errors);
	    }

	    _createClass(Validator, [{
	        key: "check",
	        value: function check() {
	            if (this.rules.hasAsync) {
	                throw new Error("Cannot synchronously validate schema containing asynchronous rules.");
	            }
	            return this.rules.validate(this.input);
	        }
	    }, {
	        key: "checkAsync",
	        value: function checkAsync(passes, fails) {
	            return this.rules.validateAsync(this.input, passes, fails);
	        }
	    }, {
	        key: "passes",
	        value: function passes(callback) {
	            if (this.rules.hasAsync) {
	                return this.checkAsync(callback);
	            }
	            return this.check();
	        }
	    }, {
	        key: "fails",
	        value: function fails(callback) {
	            if (this.rules.hasAsync) {
	                return this.checkAsync(null, callback).then(function (result) {
	                    return Validator.Promise.resolve(!result);
	                });
	            }
	            return !this.check();
	        }
	    }], [{
	        key: "make",
	        value: function make(input, rules, messages) {
	            return new Validator(input, rules, messages);
	        }
	    }, {
	        key: "setMessages",
	        value: function setMessages(lang, messages) {
	            Messages_1.Messages.messages[lang] = messages;
	        }
	    }, {
	        key: "getMessages",
	        value: function getMessages() {
	            var lang = arguments.length <= 0 || arguments[0] === undefined ? Validator.lang : arguments[0];

	            return Messages_1.Messages.messages[lang];
	        }
	    }, {
	        key: "useLang",
	        value: function useLang(lang) {
	            Validator.lang = lang;
	        }
	    }, {
	        key: "getDefaultLang",
	        value: function getDefaultLang() {
	            return Validator.lang;
	        }
	    }, {
	        key: "setAttributeFormatter",
	        value: function setAttributeFormatter(formatter) {
	            Validator.attributeFormatter = formatter;
	        }
	    }, {
	        key: "register",
	        value: function register(name, fn, message) {
	            Rules_1.Rules.register(name, fn, message);
	        }
	    }, {
	        key: "registerAsync",
	        value: function registerAsync(name, fn, message) {
	            Rules_1.Rules.register(name, fn, message, true);
	        }
	    }]);

	    return Validator;
	}();

	Validator.Promise = _Promise;
	Validator.lang = "en";
	Validator.attributeFormatter = formatter;
	Validator.Messages = Messages_1.Messages;
	exports.Validator = Validator;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(5);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(6)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), (function() { return this; }()), __webpack_require__(4)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var flat_1 = __webpack_require__(8);
	var objectAssign = __webpack_require__(10);
	var objectPath = __webpack_require__(11);
	var Validator_1 = __webpack_require__(1);
	var Rule_1 = __webpack_require__(12);
	var Errors_1 = __webpack_require__(13);
	var Required_1 = __webpack_require__(15);
	var Min_1 = __webpack_require__(16);

	var Rules = function () {
	    function Rules(rules, errors) {
	        _classCallCheck(this, Rules);

	        this.hasAsync = false;
	        this.errors = errors;
	        this.rules = this.parseRules(flat_1.flatten(rules, { safe: true }));
	    }

	    _createClass(Rules, [{
	        key: "getRules",
	        value: function getRules() {
	            return this.rules;
	        }
	    }, {
	        key: "validate",
	        value: function validate(input) {
	            var _this = this;

	            this.errors.clear();
	            Object.keys(this.rules).forEach(function (field) {
	                var value = objectPath.get(input, field);
	                var passes = true;
	                _this.rules[field].validators.forEach(function (rule) {
	                    var _Rules$registered$rul;

	                    if (_this.rules[field].bail && !passes) {
	                        return;
	                    }
	                    var result = (_Rules$registered$rul = Rules.registered[rule.name]).fn.apply(_Rules$registered$rul, [value].concat(_toConsumableArray(rule.params), [input]));
	                    if (!result) {
	                        var _Rules$registered$rul2;

	                        passes = false;
	                        var errorParams = (_Rules$registered$rul2 = Rules.registered[rule.name]).getErrorParams.apply(_Rules$registered$rul2, _toConsumableArray(rule.params));
	                        var numeric = _this.rules[field].numeric;
	                        _this.errors.add(field, { name: rule.name, numeric: numeric, params: errorParams });
	                    }
	                });
	            });
	            return this.errors.errorsCount === 0;
	        }
	    }, {
	        key: "validateAsync",
	        value: function validateAsync(input, passes, fails) {
	            var _this2 = this;

	            this.errors.clear();
	            var sequence = Validator_1.Validator.Promise.resolve(true);
	            var allPass = true;
	            Object.keys(this.rules).forEach(function (field) {
	                var value = objectPath.get(input, field);
	                _this2.rules[field].validators.forEach(function (rule) {
	                    var ruleValidator = Rules.registered[rule.name];
	                    var handleError = function handleError(reason) {
	                        allPass = false;
	                        var errorParams = ruleValidator.getErrorParams.apply(ruleValidator, _toConsumableArray(rule.params));
	                        var numeric = _this2.rules[field].numeric;
	                        _this2.errors.add(field, { name: rule.name, numeric: numeric, params: objectAssign({}, errorParams, { reason: reason }) });
	                    };
	                    sequence = sequence.then(function (passes) {
	                        if (_this2.rules[field].bail && !passes) {
	                            return Validator_1.Validator.Promise.resolve(false);
	                        }
	                        if (!ruleValidator.isAsync) {
	                            var syncResult = ruleValidator.fn.apply(ruleValidator, [value].concat(_toConsumableArray(rule.params), [input]));
	                            if (!syncResult) {
	                                handleError();
	                            }
	                            return Validator_1.Validator.Promise.resolve(syncResult);
	                        }
	                        return new Validator_1.Validator.Promise(function (resolve, reject) {
	                            var timer = setTimeout(function () {
	                                reject(new Errors_1.AsyncTimeoutError(rule.name, ruleValidator.timeout));
	                            }, ruleValidator.timeout);
	                            var done = function done(result, reason) {
	                                clearTimeout(timer);
	                                if (!result) {
	                                    handleError(reason);
	                                }
	                                resolve(result);
	                            };
	                            var asyncResult = ruleValidator.fn.apply(ruleValidator, [value].concat(_toConsumableArray(rule.params), [done, input]));
	                            if (!!asyncResult && ["object", "function"].indexOf(typeof asyncResult === "undefined" ? "undefined" : _typeof(asyncResult)) !== -1 && typeof asyncResult.then === "function") {
	                                asyncResult.then(function (result) {
	                                    if (Array.isArray(result)) {
	                                        var _result = _slicedToArray(result, 2);

	                                        var res = _result[0];
	                                        var reason = _result[1];

	                                        done(res, reason);
	                                    } else {
	                                        done(result);
	                                    }
	                                }).catch(function (e) {
	                                    return done(false, String(e));
	                                });
	                            }
	                        });
	                    });
	                });
	            });
	            return sequence.then(function () {
	                if (typeof passes === "function") {
	                    passes(allPass);
	                }
	                if (typeof fails === "function") {
	                    fails(!allPass);
	                }
	                return Validator_1.Validator.Promise.resolve(allPass);
	            });
	        }
	    }, {
	        key: "parseRules",
	        value: function parseRules(rules) {
	            var _this3 = this;

	            var registeredRules = Object.keys(Rules.registered);
	            return Object.keys(rules).reduce(function (parsed, field) {
	                var fieldRules = rules[field];
	                var _rules = [];
	                if (typeof fieldRules === "string") {
	                    _rules = fieldRules.split("|");
	                } else if (Array.isArray(fieldRules)) {
	                    _rules = fieldRules;
	                }
	                var bail = _rules.indexOf("bail") !== -1;
	                var numeric = _rules.some(function (_) {
	                    return Rules.numericRules.indexOf(_) !== -1;
	                });
	                _rules.filter(function (_) {
	                    return _ !== "bail";
	                }).forEach(function (rule) {
	                    var params = [];

	                    var _rule$split = rule.split(":");

	                    var _rule$split2 = _slicedToArray(_rule$split, 2);

	                    var name = _rule$split2[0];
	                    var _params = _rule$split2[1];

	                    if (registeredRules.indexOf(name) === -1) {
	                        return;
	                    }
	                    if (Rules.registered[name].isAsync) {
	                        _this3.hasAsync = true;
	                    }
	                    if (_params) {
	                        params = _params.split(",");
	                    }
	                    if (!parsed[field]) {
	                        parsed[field] = { bail: bail, numeric: numeric, validators: [] };
	                    }
	                    parsed[field].validators.push({ name: name, params: Rules.registered[name].parseParams(params) });
	                });
	                return parsed;
	            }, {});
	        }
	    }], [{
	        key: "register",
	        value: function register(name, fn, message) {
	            var isAsync = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	            Rules.registered[name] = new Rule_1.Rule(name, fn, message, isAsync);
	        }
	    }]);

	    return Rules;
	}();

	Rules.numericRules = ["integer", "numeric"];
	Rules.registered = {
	    "min": Min_1.RuleMin.make(),
	    "required": Required_1.RuleRequired.make()
	};
	exports.Rules = Rules;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var isBuffer = __webpack_require__(9)

	var flat = module.exports = flatten
	flatten.flatten = flatten
	flatten.unflatten = unflatten

	function flatten(target, opts) {
	  opts = opts || {}

	  var delimiter = opts.delimiter || '.'
	  var maxDepth = opts.maxDepth
	  var output = {}

	  function step(object, prev, currentDepth) {
	    currentDepth = currentDepth ? currentDepth : 1
	    Object.keys(object).forEach(function(key) {
	      var value = object[key]
	      var isarray = opts.safe && Array.isArray(value)
	      var type = Object.prototype.toString.call(value)
	      var isbuffer = isBuffer(value)
	      var isobject = (
	        type === "[object Object]" ||
	        type === "[object Array]"
	      )

	      var newKey = prev
	        ? prev + delimiter + key
	        : key

	      if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
	        (!opts.maxDepth || currentDepth < maxDepth)) {
	        return step(value, newKey, currentDepth + 1)
	      }

	      output[newKey] = value
	    })
	  }

	  step(target)

	  return output
	}

	function unflatten(target, opts) {
	  opts = opts || {}

	  var delimiter = opts.delimiter || '.'
	  var overwrite = opts.overwrite || false
	  var result = {}

	  var isbuffer = isBuffer(target)
	  if (isbuffer || Object.prototype.toString.call(target) !== '[object Object]') {
	    return target
	  }

	  // safely ensure that the key is
	  // an integer.
	  function getkey(key) {
	    var parsedKey = Number(key)

	    return (
	      isNaN(parsedKey) ||
	      key.indexOf('.') !== -1
	    ) ? key
	      : parsedKey
	  }

	  Object.keys(target).forEach(function(key) {
	    var split = key.split(delimiter)
	    var key1 = getkey(split.shift())
	    var key2 = getkey(split[0])
	    var recipient = result

	    while (key2 !== undefined) {
	      var type = Object.prototype.toString.call(recipient[key1])
	      var isobject = (
	        type === "[object Object]" ||
	        type === "[object Array]"
	      )

	      // do not write over falsey, non-undefined values if overwrite is false
	      if (!overwrite && !isobject && typeof recipient[key1] !== 'undefined') {
	        return
	      }

	      if ((overwrite && !isobject) || (!overwrite && recipient[key1] == null)) {
	        recipient[key1] = (
	          typeof key2 === 'number' &&
	          !opts.object ? [] : {}
	        )
	      }

	      recipient = recipient[key1]
	      if (split.length > 0) {
	        key1 = getkey(split.shift())
	        key2 = getkey(split[0])
	      }
	    }

	    // unflatten again for 'messy objects'
	    recipient[key1] = unflatten(target[key], opts)
	  })

	  return result
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(obj != null &&
	    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
	      (obj.constructor &&
	      typeof obj.constructor.isBuffer === 'function' &&
	      obj.constructor.isBuffer(obj))
	    ))
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';

	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';

	  var
	    toStr = Object.prototype.toString,
	    _hasOwnProperty = Object.prototype.hasOwnProperty;

	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (typeof value !== 'string') {
	        for (var i in value) {
	            if (_hasOwnProperty.call(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }

	  function toString(type){
	    return toStr.call(type);
	  }

	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }

	  var isArray = Array.isArray || function(obj){
	    /*istanbul ignore next:cant test*/
	    return toStr.call(obj) === '[object Array]';
	  }

	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }

	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }

	  function factory(options) {
	    options = options || {}

	    var objectPath = function(obj) {
	      return Object.keys(objectPath).reduce(function(proxy, prop) {
	        if(prop === 'create') {
	          return proxy;
	        }

	        /*istanbul ignore else*/
	        if (typeof objectPath[prop] === 'function') {
	          proxy[prop] = objectPath[prop].bind(objectPath, obj);
	        }

	        return proxy;
	      }, {});
	    };

	    function getShallowProperty(obj, prop) {
	      if (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || _hasOwnProperty.call(obj, prop)) {
	        return obj[prop];
	      }
	    }

	    function set(obj, path, value, doNotReplace){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (typeof path === 'string') {
	        return set(obj, path.split('.').map(getKey), value, doNotReplace);
	      }
	      var currentPath = path[0];
	      var currentValue = getShallowProperty(obj, currentPath);
	      if (path.length === 1) {
	        if (currentValue === void 0 || !doNotReplace) {
	          obj[currentPath] = value;
	        }
	        return currentValue;
	      }

	      if (currentValue === void 0) {
	        //check if we assume an array
	        if(typeof path[1] === 'number') {
	          obj[currentPath] = [];
	        } else {
	          obj[currentPath] = {};
	        }
	      }

	      return set(obj[currentPath], path.slice(1), value, doNotReplace);
	    }

	    objectPath.has = function (obj, path) {
	      if (obj == null) {
	        return false;
	      }

	      if (typeof path === 'number') {
	        path = [path];
	      } else if (typeof path === 'string') {
	        path = path.split('.');
	      }

	      if (!path || path.length === 0) {
	        return false;
	      }

	      for (var i = 0; i < path.length; i++) {
	        var j = getKey(path[i]);
	        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
	          (options.includeInheritedProps ? (j in Object(obj)) : _hasOwnProperty.call(obj, j))) {
	          obj = obj[j];
	        } else {
	          return false;
	        }
	      }

	      return true;
	    };

	    objectPath.ensureExists = function (obj, path, value){
	      return set(obj, path, value, true);
	    };

	    objectPath.set = function (obj, path, value, doNotReplace){
	      return set(obj, path, value, doNotReplace);
	    };

	    objectPath.insert = function (obj, path, value, at){
	      var arr = objectPath.get(obj, path);
	      at = ~~at;
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }
	      arr.splice(at, 0, value);
	    };

	    objectPath.empty = function(obj, path) {
	      if (isEmpty(path)) {
	        return void 0;
	      }
	      if (obj == null) {
	        return void 0;
	      }

	      var value, i;
	      if (!(value = objectPath.get(obj, path))) {
	        return void 0;
	      }

	      if (typeof value === 'string') {
	        return objectPath.set(obj, path, '');
	      } else if (isBoolean(value)) {
	        return objectPath.set(obj, path, false);
	      } else if (typeof value === 'number') {
	        return objectPath.set(obj, path, 0);
	      } else if (isArray(value)) {
	        value.length = 0;
	      } else if (isObject(value)) {
	        for (i in value) {
	          if (_hasOwnProperty.call(value, i)) {
	            delete value[i];
	          }
	        }
	      } else {
	        return objectPath.set(obj, path, null);
	      }
	    };

	    objectPath.push = function (obj, path /*, values */){
	      var arr = objectPath.get(obj, path);
	      if (!isArray(arr)) {
	        arr = [];
	        objectPath.set(obj, path, arr);
	      }

	      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	    };

	    objectPath.coalesce = function (obj, paths, defaultValue) {
	      var value;

	      for (var i = 0, len = paths.length; i < len; i++) {
	        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	          return value;
	        }
	      }

	      return defaultValue;
	    };

	    objectPath.get = function (obj, path, defaultValue){
	      if (typeof path === 'number') {
	        path = [path];
	      }
	      if (!path || path.length === 0) {
	        return obj;
	      }
	      if (obj == null) {
	        return defaultValue;
	      }
	      if (typeof path === 'string') {
	        return objectPath.get(obj, path.split('.'), defaultValue);
	      }

	      var currentPath = getKey(path[0]);
	      var nextObj = getShallowProperty(obj, currentPath)
	      if (nextObj === void 0) {
	        return defaultValue;
	      }

	      if (path.length === 1) {
	        return nextObj;
	      }

	      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	    };

	    objectPath.del = function del(obj, path) {
	      if (typeof path === 'number') {
	        path = [path];
	      }

	      if (obj == null) {
	        return obj;
	      }

	      if (isEmpty(path)) {
	        return obj;
	      }
	      if(typeof path === 'string') {
	        return objectPath.del(obj, path.split('.'));
	      }

	      var currentPath = getKey(path[0]);
	      var currentVal = getShallowProperty(obj, currentPath);
	      if(currentVal == null) {
	        return currentVal;
	      }

	      if(path.length === 1) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      } else {
	        if (obj[currentPath] !== void 0) {
	          return objectPath.del(obj[currentPath], path.slice(1));
	        }
	      }

	      return obj;
	    }

	    return objectPath;
	  }

	  var mod = factory();
	  mod.create = factory;
	  mod.withInheritedProps = factory({includeInheritedProps: true})
	  return mod;
	});


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ASYNC_TIMEOUT = 5000;

	var Rule = function () {
	    function Rule(name, fn, message) {
	        var isAsync = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	        var timeout = arguments.length <= 4 || arguments[4] === undefined ? ASYNC_TIMEOUT : arguments[4];

	        _classCallCheck(this, Rule);

	        this.name = name;
	        this.fn = fn;
	        this.message = message;
	        this.isAsync = isAsync;
	        this.timeout = timeout;
	    }

	    _createClass(Rule, [{
	        key: "parseParams",
	        value: function parseParams(params) {
	            return params;
	        }
	    }, {
	        key: "getErrorParams",
	        value: function getErrorParams() {
	            return {};
	        }
	    }]);

	    return Rule;
	}();

	exports.Rule = Rule;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var findIndex = __webpack_require__(14);
	var Validator_1 = __webpack_require__(1);

	var Errors = function () {
	    function Errors(messages) {
	        _classCallCheck(this, Errors);

	        this.errors = {};
	        this.errorsCount = 0;
	        this.messages = messages;
	    }

	    _createClass(Errors, [{
	        key: "clear",
	        value: function clear() {
	            this.errorsCount = 0;
	            this.errors = {};
	        }
	    }, {
	        key: "add",
	        value: function add(attribute, error) {
	            if (!this.has(attribute)) {
	                this.errors[attribute] = [];
	            }
	            if (findIndex(this.errors[attribute], function (_) {
	                return _.name === error.name;
	            }) === -1) {
	                this.errors[attribute].push(error);
	            }
	            this.errorsCount++;
	        }
	    }, {
	        key: "get",
	        value: function get(attribute) {
	            var lang = arguments.length <= 1 || arguments[1] === undefined ? Validator_1.Validator.lang : arguments[1];

	            return this.messages.getMessages(attribute, this.errors[attribute], lang);
	        }
	    }, {
	        key: "first",
	        value: function first(attribute) {
	            var lang = arguments.length <= 1 || arguments[1] === undefined ? Validator_1.Validator.lang : arguments[1];

	            if (this.has(attribute)) {
	                return this.messages.getMessage(attribute, this.errors[attribute][0], lang);
	            }
	            return false;
	        }
	    }, {
	        key: "all",
	        value: function all() {
	            var lang = arguments.length <= 0 || arguments[0] === undefined ? Validator_1.Validator.lang : arguments[0];

	            return this.messages.getErrorMessages(this.errors, lang);
	        }
	    }, {
	        key: "has",
	        value: function has(attribute) {
	            return this.errors.hasOwnProperty(attribute);
	        }
	    }]);

	    return Errors;
	}();

	exports.Errors = Errors;

	var RuleValidatorError = function (_Error) {
	    _inherits(RuleValidatorError, _Error);

	    function RuleValidatorError(name) {
	        _classCallCheck(this, RuleValidatorError);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RuleValidatorError).call(this, "ValidatorError: Parameters for rule '" + name + "' have incorrect format."));
	    }

	    return RuleValidatorError;
	}(Error);

	exports.RuleValidatorError = RuleValidatorError;

	var AsyncTimeoutError = function (_Error2) {
	    _inherits(AsyncTimeoutError, _Error2);

	    function AsyncTimeoutError(name, timeout) {
	        _classCallCheck(this, AsyncTimeoutError);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(AsyncTimeoutError).call(this, "TimeoutError: Rule '" + name + "' has failed due to timeout. Asynchronous check have not returned any result after " + timeout + " ms."));
	    }

	    return AsyncTimeoutError;
	}(Error);

	exports.AsyncTimeoutError = AsyncTimeoutError;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (arr, predicate, ctx) {
		if (typeof Array.prototype.findIndex === 'function') {
			return arr.findIndex(predicate, ctx);
		}

		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}

		var list = Object(arr);
		var len = list.length;

		if (len === 0) {
			return -1;
		}

		for (var i = 0; i < len; i++) {
			if (predicate.call(ctx, list[i], i, list)) {
				return i;
			}
		}

		return -1;
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rule_1 = __webpack_require__(12);
	var isAsync = false;
	var name = "require";
	var validator = function validator(value) {
	    return [undefined, null].indexOf(value) === -1 || typeof value === "string" && value.replace(/\s/g, "").length > 0;
	};

	var RuleRequired = function (_Rule_1$Rule) {
	    _inherits(RuleRequired, _Rule_1$Rule);

	    function RuleRequired() {
	        _classCallCheck(this, RuleRequired);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RuleRequired).call(this, name, validator, null, isAsync));
	    }

	    _createClass(RuleRequired, null, [{
	        key: "make",
	        value: function make() {
	            return new RuleRequired();
	        }
	    }]);

	    return RuleRequired;
	}(Rule_1.Rule);

	exports.RuleRequired = RuleRequired;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rule_1 = __webpack_require__(12);
	var Errors_1 = __webpack_require__(13);
	var isAsync = false;
	var name = "min";
	var validator = function validator(value, min) {
	    return typeof value === "number" && value >= min || typeof value === "string" && value.length >= min || false;
	};

	var RuleMin = function (_Rule_1$Rule) {
	    _inherits(RuleMin, _Rule_1$Rule);

	    function RuleMin() {
	        _classCallCheck(this, RuleMin);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(RuleMin).call(this, name, validator, null, isAsync));
	    }

	    _createClass(RuleMin, [{
	        key: "parseParams",
	        value: function parseParams(params) {
	            var _params = _slicedToArray(params, 1);

	            var _min = _params[0];

	            var min = parseInt(_min, 10);
	            if (!_min || isNaN(min)) {
	                throw new Errors_1.RuleValidatorError(this.name);
	            }
	            return [min];
	        }
	    }, {
	        key: "getErrorParams",
	        value: function getErrorParams(min) {
	            return { min: String(min) };
	        }
	    }], [{
	        key: "make",
	        value: function make() {
	            return new RuleMin();
	        }
	    }]);

	    return RuleMin;
	}(Rule_1.Rule);

	exports.RuleMin = RuleMin;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var objectPath = __webpack_require__(11);
	var Validator_1 = __webpack_require__(1);
	var en_1 = __webpack_require__(18);

	var Messages = function () {
	    function Messages(messages) {
	        _classCallCheck(this, Messages);

	        this.customMessages = messages || {};
	        this.customMessages.custom = this.customMessages.custom || {};
	    }

	    _createClass(Messages, [{
	        key: "getErrorMessages",
	        value: function getErrorMessages(errors, lang) {
	            var _this = this;

	            return Object.keys(errors).reduce(function (messages, field) {
	                messages[field] = _this.getMessages(field, errors[field], lang);
	                return messages;
	            }, {});
	        }
	    }, {
	        key: "getMessages",
	        value: function getMessages(field, errors, lang) {
	            var _this2 = this;

	            return errors.map(function (error) {
	                return _this2.getMessage(field, error, lang);
	            });
	        }
	    }, {
	        key: "getMessage",
	        value: function getMessage(field, error, lang) {
	            var key = field + "." + error.name;
	            var template = objectPath.get(this.customMessages.custom, key + "." + (error.numeric ? "numeric" : "string")) || objectPath.get(this.customMessages.custom, key) || objectPath.get(this.customMessages.custom, field) || objectPath.get(this.customMessages, error.name) || objectPath.get(Messages.messages[lang], error.name) || key;
	            return Object.keys(error.params).reduce(function (message, param) {
	                return message.replace(":" + param, error.params[param]);
	            }, template).replace(":attribute", Validator_1.Validator.attributeFormatter(field));
	        }
	    }]);

	    return Messages;
	}();

	Messages.messages = { en: en_1.default };
	exports.Messages = Messages;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	var lang = {
	    accepted: 'The :attribute must be accepted.',
	    alpha: 'The :attribute field must contain only alphabetic characters.',
	    alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
	    alpha_num: 'The :attribute field must be alphanumeric.',
	    between: 'The :attribute field must be between :min and :max.',
	    confirmed: 'The :attribute confirmation does not match.',
	    email: 'The :attribute format is invalid.',
	    def: 'The :attribute attribute has errors.',
	    digits: 'The :attribute must be :digits digits.',
	    different: 'The :attribute and :different must be different.',
	    'in': 'The selected :attribute is invalid.',
	    integer: 'The :attribute must be an integer.',
	    min: {
	        numeric: 'The :attribute must be at least :min.',
	        string: 'The :attribute must be at least :min characters.'
	    },
	    max: {
	        numeric: 'The :attribute may not be greater than :max.',
	        string: 'The :attribute may not be greater than :max characters.'
	    },
	    not_in: 'The selected :attribute is invalid.',
	    numeric: 'The :attribute must be a number.',
	    required: 'The :attribute field is required.',
	    required_if: 'The :attribute field is required when :other is :value.',
	    same: 'The :attribute and :same fields must match.',
	    size: {
	        numeric: 'The :attribute must be :size.',
	        string: 'The :attribute must be :size characters.'
	    },
	    string: 'The :attribute must be a string.',
	    url: 'The :attribute format is invalid.',
	    regex: 'The :attribute format is invalid',
	    attributes: {}
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = lang;

/***/ }
/******/ ]);