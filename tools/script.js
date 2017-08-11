"use strict";

const utils = require('steamer-webpack-utils'),
	  webpack = require('webpack'),
	  fs = require('fs'),
	  opn = require('opn'),
	  path = require('path');

var karma = require('karma').server;

const isProduction = process.env.NODE_ENV === 'production',
	  isKarma = process.env.KARMA_ENV === 'karma',
	  feature = require('./feature/feature');

if (feature.installDependency()) {
	return;
}


if (isKarma) {	
	var config = require('../config/project'),
    	configWebpack = config.webpack;
    
	karma.start({
		configFile: path.join(configWebpack.path.test, '/unit/karma.conf.js'),
		singleRun: true
	}, function(){
		console.log("karma test done!");
		opn(path.join(configWebpack.path.test,'unit/coverage/lcov-report/index.html'));
	});
}
else if (!isProduction) {	
	require('./server');
}
else if (isProduction) {

	compilerRun(require('./webpack.base'));
}


function compilerRun(config) {
	var compiler = webpack(config);

	compiler.run(function(err, stats) {
	    if (!err) {
	        const jsonStats = stats.toJson();
	        // print asset stats
	        // fs.writeFileSync("stats.txt", JSON.stringify(jsonStats, " " , 4))
	        
	        console.log(stats.toString({
	            cached: true,
	            chunks: false, // Makes the dist much quieter
	            colors: true,
	            children: false // supress some plugin output
	        }));

	        if (jsonStats.errors.length > 0) {
	            console.log('Webpack compiler encountered errors.');
	            console.log(jsonStats.errors.join('\n'));
	        }
            else if (jsonStats.warnings.length > 0) {
	            console.log('Webpack compiler encountered warnings.');
	            console.log(jsonStats.warnings.join('\n'));
	        }
	    }
	    else {
	        console.log(err);
	    }
	});
}