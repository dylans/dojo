define([
	'intern!object',
	'intern/chai!assert',
	'dojo/hash',
	'dojo/topic'
], function (registerSuite, assert, hash, topic) {

	var _subscriber = null;
	// utilities for the tests:
	function setHash(h) {
		h = h || "";
		location.replace('#'+h);
	}

	function getHash() {
		var h = location.href, i = h.indexOf("#");
		return (i >= 0) ? h.substring(i + 1) : "";
	}

	registerSuite({
		name: 'dojo/hash',

		'get hash': {
			beforeEach: function () {
				setHash('');
			},
			afterEach: function () {
				setHash('');
			},
			'empty': function () {
				assert.strictEqual('', hash());
			},
			'text': function () {
				setHash('text');
				assert.strictEqual('text', hash());
			},
			'text%20with%20spaces': function () {
				setHash('text%20with%20spaces');
				assert.strictEqual('text%20with%20spaces', hash());
			},
			'text%23with%23encoded%23hashes': function () {
				setHash('text%23with%23encoded%23hashes');
				assert.strictEqual('text%23with%23encoded%23hashes', hash());
			},
			'text+with+pluses': function () {
				setHash('text+with+pluses');
				assert.strictEqual('text+with+pluses', hash());
			},
			'%20leadingSpace': function () {
				setHash('%20leadingSpace');
				assert.strictEqual('%20leadingSpace', hash());
			},
			'trailingSpace%20': function () {
				setHash('trailingSpace%20');
				assert.strictEqual('trailingSpace%20', hash());
			},
			'under_score': function () {
				setHash('under_score');
				assert.strictEqual('under_score', hash());
			},
			'extra&instring': function () {
				setHash('extra&instring');
				assert.strictEqual('extra&instring', hash());
			},
			'extra?instring': function () {
				setHash('extra?instring');
				assert.strictEqual('extra?instring', hash());
			},
			'?testa=3&testb=test': function () {
				setHash('?testa=3&testb=test');
				assert.strictEqual('?testa=3&testb=test', hash());
			}
		},

		'set hash': {
			beforeEach: function () {
				setHash('');
			},
			afterEach: function () {
				setHash('');
			},
			'empty': function () {
				hash('');
				assert.strictEqual('', getHash());
			},
			'text': function () {
				hash('text');
				assert.strictEqual('text', getHash());
			},
			'text%20with%20spaces': function () {
				hash('text%20with%20spaces');
				assert.strictEqual('text%20with%20spaces', getHash());
			},
			'text%23with%23encoded%23hashes': function () {
				hash('text%23with%23encoded%23hashes');
				assert.strictEqual('text%23with%23encoded%23hashes', getHash());
			},
			'text+with+pluses': function () {
				hash('text+with+pluses');
				assert.strictEqual('text+with+pluses', getHash());
			},
			'%20leadingSpace': function () {
				hash('%20leadingSpace');
				assert.strictEqual('%20leadingSpace', getHash());
			},
			'trailingSpace%20': function () {
				hash('trailingSpace%20');
				assert.strictEqual('trailingSpace%20', getHash());
			},
			'under_score': function () {
				hash('under_score');
				assert.strictEqual('under_score', getHash());
			},
			'extra&instring': function () {
				hash('extra&instring');
				assert.strictEqual('extra&instring', getHash());
			},
			'extra?instring': function () {
				hash('extra?instring');
				assert.strictEqual('extra?instring', getHash());
			},
			'?testa=3&testb=test': function () {
				hash('?testa=3&testb=test');
				assert.strictEqual('?testa=3&testb=test', getHash());
			},
			'#leadingHash': function () {
				hash('#leadingHash');
				assert.strictEqual('leadingHash', getHash());
			}
		},

		'topic publish': {
			beforeEach: function () {
				_subscriber = null;
				setHash('');
			},
			afterEach: function () {
				_subscriber.remove();
				setHash('');
			},
			'text': function () {
				var dfd = this.async();
				_subscriber = topic.subscribe('/dojo/hashchange',
					dfd.callback(function (value) {
						assert.strictEqual('text', value);
						return value;
					})
				);
				hash('text');
				return dfd;
			}
		}
	});
});
