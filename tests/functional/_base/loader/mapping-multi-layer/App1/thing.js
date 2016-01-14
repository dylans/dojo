require({cache:
	{
		'common/another':function(){
			define([], function () {
				console.log('this is Common1/another in layer');
				require.mappingMultiLayerResults.push('Common1/another:cache');
			});
		}
	}
});
define(['common/another', 'starmap/demo2'], function() {
	console.log('this is App1/thing in layer');
	require.mappingMultiLayerResults.push('App1/thing:cache');
});
