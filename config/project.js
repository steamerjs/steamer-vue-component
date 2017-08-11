'use strict';

const path = require('path'),
      os = require('os'),
      webpack = require('webpack'),
      utils = require('steamer-webpack-utils'),
      steamerConfig = require('./steamer.config'),
      __basename = path.dirname(__dirname),
      __env = process.env.NODE_ENV,
      isProduction = __env === 'production';

var srcPath = path.resolve(__basename, "src"),
    devPath = path.resolve(__basename, "dev"),
    distPath = path.resolve(__basename, "dist"),
    examplePath = path.resolve(__basename, "example"),
    testPath = path.resolve(__basename, "test");

var HtmlResWebpackPlugin = require('html-res-webpack-plugin');

// ========================= webpack快捷配置 =========================
// 基本情况下，你只需要关注这里的配置
var config = {
    // ========================= webpack环境配置 =========================
    env: __env,

    // 默认使用的npm命令行
    npm: 'npm',

    webpack: {

        // ========================= webpack路径与url =========================
        // 项目路径
        path: {
            src: srcPath,
            dev: devPath,
            dist: distPath,
            example: examplePath,
            test: testPath,
        },

        // ========================= webpack服务器及路由配置 =========================
        // 开发服务器配置
        webserver: steamerConfig.webserver,
        cdn: steamerConfig.cdn,
        port: steamerConfig.port,    // port for local server
        route: steamerConfig.route, // http://host/news/

        // ========================= webpack自定义配置 =========================
        // 是否显示开发环境下的生成文件
        showSource: true,
        
        // 是否清理生成文件夹
        clean: true,

        // javascript 方言，目前仅支持 ts(typescript)
        js: [],

        // 预编译器，默认支持css 和 less. sass, scss 和 stylus 由npm-install-webpack-plugin自动安装
        style: [
            "css", "less"
        ],
        // 生产环境是否提取css
        extractCss: true,
        // 是否启用css模块化
        cssModule: false,

        // html 模板. 默认支持html 和 ejs, handlebars 和 pug 由npm-install-webpack-plugin自动安装
        template: [
            "html",
        ],

        // 利用DefinePlugin给应用注入变量
        injectVar: {
            "process.env": {
                NODE_ENV: JSON.stringify(__env)
            }
        },

        alias: {
            
        },

        // ========================= webpack entry配置 =========================
        // 根据约定，自动扫描js entry，约定是src/page/xxx/main.js 或 src/page/xxx/main.jsx
        /** 
            获取结果示例
            {
                'js/index': [path.join(configWebpack.path.src, "/page/index/main.js")],
                'js/spa': [path.join(configWebpack.path.src, "/page/spa/main.js")],
                'js/pindex': [path.join(configWebpack.path.src, "/page/pindex/main.jsx")],
            }
         */
        entry: utils.filterJsFileByCmd(utils.getJsEntry({
            srcPath: path.join(examplePath, "src/page"), 
            fileName: "main",
            extensions: ["js", "jsx"],
            keyPrefix: "",
            level: 1
        })),

        // 自动扫描html，配合html-res-webpack-plugin
        /**
            获取结果示例
            [ 
                { 
                    key: 'index',
                    path: 'path/src/page/index/index.html'
                },
                { 
                    key: 'spa',
                    path: 'path/src/page/spa/index.html'
                },
                { 
                    key: 'pindex',
                    path: 'path/src/page/pindex/index.html'
                } 
            ]
         */
        html: utils.filterHtmlFileByCmd(utils.getHtmlEntry({
            srcPath: path.join(examplePath, "src/page"),
            level: 1
        })),

    },
};



// ========================= webpack深度配置 =========================
// 使用了webpack-merge与webpack.base.js进行配置合并
// 如果上面的配置仍未能满足你，你可以在此处对webpack直接进行配置，这里的配置与webpack的配置项目一一对应
config.custom = {
    // webpack output
    getOutput: function() {
        
        if (isProduction) {
            return {
                library: "lib",
                libraryTarget: "umd",
            };
        }
        else {
            return {};
        }
    },

    // webpack module
    getModule: function() {

        var module = {
            rules: []
        };
        
        return module;
    },

    // webpack resolve
    getResolve: function() {
        return {
            alias: config.webpack.alias
        };
    },

    // webpack plugins
    getPlugins: function() {
        var plugins = [];

        if (!isProduction) {
            config.webpack.html.forEach(function(page, key) {
                plugins.push(new HtmlResWebpackPlugin({
                    mode: "html",
                    filename: page.key + ".html",
                    template: page.path,
                    htmlMinify: null,
                    entryLog: true,
                    templateContent: function(tpl) {
                        return tpl;
                    }
                }));
            }); 
        }
        
        return plugins;
    },
        
    // webpack externals
    getExternals: function() {
        return {};
    },

    // 其它 webpack 配置
    getOtherOptions: function() {
        return {};
    }
};

// ========================= webpack merge 的策略 =========================
config.webpackMerge = {
    // webpack-merge smartStrategy 配置
    smartStrategyOption: {
        "module.rules": "prepend",
        "plugins": "append"
    },

    // 在smartStrategy merge 之前，用户可以先行对 webpack.base.js 的配置进行处理
    mergeProcess: function(webpackBaseConfig) {

        return webpackBaseConfig;
    }
};

module.exports = config;
