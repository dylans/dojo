define([
	'intern!object',
	'intern/chai!assert',
	'dojo/_base/array',
	'dojo/hash',
	'dojo/router/RouterBase'
], function (registerSuite, assert, arrayUtil, hash, RouterBase) {

	// This test uses RouterBase so that we can test a few different
	// behaviors of the router which require re-initializing a new router
	var count = 0,
		router,
		handle, foo;

	// Simple helper to make tearDown simpler
	function removeAll(handles) {
		arrayUtil.forEach(handles, function(handle){
			handle.remove();
		});
	}

	function registerRoute(route) {
		return router.register(route, function(){
			count++;
		});
	}

	registerSuite({
		name: 'dojo/router',

		'existence': {
			before: function () {
				hash('', true);
				router = new RouterBase();
			},
			after: function () {
			},
			'methods': function () {
				assert.ok(router.register, 'Router has a register');
				assert.ok(router.go, 'Router has a go');
				assert.ok(router.startup, 'Router has a startup');
				assert.ok(router.destroy, 'Router has a destroy');
			}
		},
		'register': {
			before: function () {
				hash('');
				count = 0;
				router = new RouterBase();
			},
			after: function () {
				removeAll(handle);
				count = 0;
				// NOTE: router.destroy should be fixed to handle
				// calling destroy without calling started, without erring
				if (router._started) {
					router.destroy();
				}
			},
			'handle': function () {
				handle = registerRoute('/foo');
				assert.ok(handle.remove, 'Handle has a remove');
				assert.ok(handle.register, 'Handle has a register');
			}
		},
		'events': {
			beforeEach: function () {
				hash('');
				count = 0;
				router = new RouterBase();
			},
			afterEach: function () {
				removeAll(handle);
				count = 0;
				if (router._started) {
					router.destroy();
				}
			},
			'before startup': function () {
				handle = registerRoute('/foo');
				hash('/foo');
				assert.strictEqual(count, 0, 'Count should have been 0, was ' + count);
			},
			'after startup': function () {
				handle = registerRoute('/foo');
				router.startup('/foo');
				assert.strictEqual(count, 1, 'Count should have been 1, was ' + count);
			},
			'change route': function () {
				handle = [];
				handle.push(registerRoute('/foo'));
				router.startup('/foo');
				var dfd = this.async();
				handle.push(router.register('/bar', dfd.callback(function (value) {
					count++;
					assert.strictEqual(count, 2, 'Count should have been 2, was ' + count);
				})));
				hash('/bar');
				return dfd;
			},
			'go': function () {
				handle = [];
				handle.push(registerRoute('/foo'));
				handle.push(registerRoute('/bar'));
				router.startup('/foo');
				router.go('/bar');
				router.go('/foo');
				assert.strictEqual(count, 3, 'Count should have been 3, was ' + count);
			},
			'remove': function () {
				handle = registerRoute('/foo');
				router.startup('');
				handle.remove();
				router.go('/foo');
				assert.strictEqual(count, 0, 'Count should have been 0, was ' + count);
			},
			'regex': function () {
				router.startup('');
				handle = registerRoute(/^\/bar$/);
				router.go("/bar");
				assert.strictEqual(count, 1, 'Count should have been 1, was ' + count);
			}
		},
		'event object': {
			before: function () {
				hash('');
				count = 0;
				router = new RouterBase();

			},
			after: function () {
				handle.remove();
				count = 0;
				if (router._started) {
					router.destroy();
				}				
			},
			'structure': function () {
				var oldPath, newPath, params, stopImmediatePropagation, preventDefault;
				router.startup('');
				handle = router.register('/checkEventObject/:foo', function(event){
					oldPath = event.oldPath;
					newPath = event.newPath;
					params = event.params;
					stopImmediatePropagation = event.stopImmediatePropagation;
					preventDefault = event.preventDefault;
				});
				router.go('/checkEventObject/bar');

				assert.strictEqual(oldPath, '', 'oldPath should be empty string, was ' + oldPath);
				assert.strictEqual(newPath, '/checkEventObject/bar', 'newPath should be /checkEventObject/bar, was ' + newPath);
				assert.ok(params, 'params should be a truthy value, was ' + params);
				assert.property(params, 'foo', 'params should have a .foo property');
				assert.strictEqual(params.foo, 'bar', 'params.foo should be bar, was ' + params.foo);
				assert.isFunction(stopImmediatePropagation, 'stopImmediatePropagation should be a function, was ' + stopImmediatePropagation);
				assert.isFunction(preventDefault, 'preventDefault should be a function, was ' + preventDefault);
			}
		}
	});
});
