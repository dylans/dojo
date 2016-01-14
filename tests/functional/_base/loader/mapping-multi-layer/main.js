results = [];
require({cache:
	{
		'router/demoA':function(){
			define(['./demoC'], function () {
				console.log('this is Router/demoA in layer');
				require.mappingMultiLayerResults.push('Router/demoA:cache');
			});
		},
		'router/demoC':function(){
			define([], function () {
				console.log('this is Router/demoC in layer');
				require.mappingMultiLayerResults.push('Router/demoC:cache');
			});
		},
		'mappedModule/mappedA': function() {
			define(['./mappedC'], function () {
				console.log('this is MappedModule/mappedA in layer');
				require.mappingMultiLayerResults.push('mappedModule/mappedA:cache');
			});
		},
		'mappedModule/mappedB': function() {
			define([], function () {
				console.log('this is MappedModule/mappedB in layer');
				require.mappingMultiLayerResults.push('mappedModule/mappedB:cache');
			});
		},
		'mappedModule/mappedC': function() {
			define([], function () {
				console.log('this is MappedModule/mappedC in layer');
				require.mappingMultiLayerResults.push('MappedModule/mappedC:cache');
			});
		},
		'my/replacement/A': function () {
			define([ '../A' ], function (A) {
				console.log('this is my/replacement/A in layer');
				require.mappingMultiLayerResults.push('my/replacement/A:cache');
			});
		},
		'my/replacement/B': function () {
			define([], function () {
				console.log('this is my/replacement/B in layer : SHOULD NEVER BE CALLED');
				require.mappingMultiLayerResults.push('my/replacement/B:cache');
			});
		},
		'my/A': function () {
			define([ './B' ], function (B) {
				console.log('this is my/A in layer');
				require.mappingMultiLayerResults.push('my/A:cache');
			});
		},
		'my/B': function () {
			define([], function () {
				console.log('this is my/B in layer');
				require.mappingMultiLayerResults.push('my/B:cache');
			});
		}
	}
});

require(['app1/thing', 'starmap/demo1', 'starmapModule/mappedA', 'my/A'], function() {
	console.log('main/app1/thing is loaded');
	require.mappingMultiLayerResults.push('mainRequire1:loaded');

	require(['app2/thing'], function() {
		console.log('main/app2/thing is loaded');
		require.mappingMultiLayerResults.push('mainRequire2:loaded');
	});

});
