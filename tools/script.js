const webpack = require('webpack'),
    opn = require('opn'),
    path = require('path'),
    karmaServer = require('karma').Server;

let isProduction = process.env.NODE_ENV === 'production',
    isKarma = process.env.KARMA_ENV === 'karma';

const feature = require('./feature/feature');

if (feature.installDependency()) {
    return;
}


if (isKarma) {
    let config = require('../config/project'),
        configWebpack = config.webpack;

    let server = new karmaServer({
        configFile: path.join(configWebpack.path.test, '/unit/karma.conf.js'),
        singleRun: true
    }, function() {
        console.log('karma test done!');
        // opn(path.join(configWebpack.path.test, 'unit/coverage/lcov-report/index.html'));
    });
    server.start();
}
else if (!isProduction) {
    require('./server');
}
else if (isProduction) {
    compilerRun(require('./webpack.base'));
}

function compilerRun(config) {
    let compiler = webpack(config);

    compiler.run(function(err, stats) {
        if (!err) {

            console.log(stats.toString({
                assets: true,
                cached: true,
                colors: true,
                children: false,
                errors: true,
                warnings: true,
                version: true,
            }));
        }
        else {
            console.log(err);
        }
    });
}
