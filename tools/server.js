const url = require('url'),
    express = require('express'),
    app = express(),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    proxy = require('http-proxy-middleware');

let webpackConfig = require('./webpack.base.js'),
    config = require('../config/project'),
    configWebpack = config.webpack,
    port = configWebpack.port,
    route = Array.isArray(configWebpack.route) ? configWebpack.route : [configWebpack.route];

function addProtocal(urlString) {
    if (!!~urlString.indexOf('http:') || !!~urlString.indexOf('https:')) {
        return urlString;
    }
    return 'http:' + urlString;
}

let urlObject = url.parse(addProtocal(configWebpack.webserver));

for (let key in webpackConfig.entry) {
    if (webpackConfig.entry.hasOwnProperty(key)) {
        webpackConfig.entry[key].unshift(`webpack-hot-middleware/client?reload=true&dynamicPublicPath=true&path=__webpack_hmr`);
    }
}

let compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
        colors: true
    },
    publicPath: configWebpack.webserver
}));

app.use(webpackHotMiddleware(compiler, {
    // 这里和上面的client配合，可以修正 webpack_hmr 的路径为项目路径的子路径，而不是直接成为 host 子路径（从publicPath开始，而不是根开始）
    // https://github.com/glenjamin/webpack-hot-middleware/issues/24
    path: `${urlObject.path}__webpack_hmr`
}));

// 静态资源转发
route.forEach((rt) => {
    app.use(rt, proxy({ target: `http://127.0.0.1:${port}`, pathRewrite: { [`^${rt}`]: '/' }}));
});

app.listen(port, function(err) {
    if (err) {
        console.error(err);
    }
    else {
        console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
    }
});
