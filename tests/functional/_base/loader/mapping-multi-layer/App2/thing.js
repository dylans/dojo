require({cache:
	{
		'common/another':function(){
			define(['./anotherone'], function () {
				console.log('this is Common2/another in layer');
				require.mappingMultiLayerResults.push('Common2/another:cache');
			});
		},
		'common/anotherone':function(){
			define([], function () {
				console.log('this is Common2/anotherone in layer');
				require.mappingMultiLayerResults.push('Common2/anotherone:cache');
			});
		}

	}
});
define(['common/another', 'starmapModule/mappedB'], function() {
	console.log('this is App2/thing in layer');
	require.mappingMultiLayerResults.push('App2/thing:cache');
});
