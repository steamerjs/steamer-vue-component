'use strict';

// used for install dependencies and files to support certain kinds of features

var path = require('path'),
	project = require('../../config/project'),
	pkgJson = require('../../package.json'),
	merge = require('lodash.merge'),
	spawnSync = require('child_process').spawnSync,
	utils = require('steamer-webpack-utils');

var dependency = {
	template: {
		html: {
			'html-loader': '^0.4.5'
		},
		handlebars: {
			'handlebars-loader': '^1.5.0',
			'handlebars': '^4.0.10'
		},
		pug: {
			'pug-loader': '^2.3.0',
			'pug': '^2.0.0-rc.2'
		},
		ejs: {
			'ejs-compiled-loader': '^1.1.0',
			'ejs': '^2.5.6'
		}

	},
	style: {
		css: {
			'style-loader': '^0.18.2',
			'css-loader': '^0.28.4'
		},
		less: {
			'style-loader': '^0.18.2',
			'css-loader': '^0.28.4',
			'less': '^2.7.2',
			'less-loader': '^4.0.4'
		},
		sass: {
			'style-loader': '^0.18.2',
			'css-loader': '^0.28.4',
			'node-sass': '^4.5.3',
			'sass-loader': '^6.0.6'
		},
		scss: {
			'style-loader': '^0.18.2',
			'css-loader': '^0.28.4',
			'node-sass': '^4.5.3',
			'sass-loader': '^6.0.6'
		},
		stylus: {
			'style-loader': '^0.18.2',
			'css-loader': '^0.28.4',
			'stylus': '^0.54.5',
			'stylus-loader': '^3.0.1'
		}
	},
	js: {}
};

var files = {
	template: {},
	style: {},
	js: {}
};

module.exports = {
	installDependency: function() {
		console.log();

		var dependencies = merge({}, pkgJson.dependencies, pkgJson.devDependencies);

		var installDep = {},
			installFile = {
				template: {},
				style: {},
				js: {}
			},
			cmd = '';

		project.webpack.template.forEach((item1) => {
			let dep = dependency['template'][item1] || {};

			Object.keys(dep).forEach((item2) => {
				if (!dependencies[item2]) {
					installDep[item2] = dependency['template'][item1][item2];
					installFile.template[item1] = true;
				}
			});
		});

		project.webpack.style.forEach((item1) => {
			let dep = dependency['style'][item1] || {};

			Object.keys(dep).forEach((item2) => {
				if (!dependencies[item2]) {
					installDep[item2] = dependency['style'][item1][item2];
					installFile.style[item1] = true;
				}
			});
		});

		project.webpack.js.forEach((item1) => {
			let dep = dependency['js'][item1] || {};

			Object.keys(dep).forEach((item2) => {
				if (!dependencies[item2]) {
					installDep[item2] = dependency['js'][item1][item2];
					installFile.js[item1] = true;
				}
			});
		});

		Object.keys(installDep).forEach((item) => {
			cmd += (item + '@' + installDep[item] + ' ');
		});

		if (cmd) {
			utils.info('Start installing missing dependencies. Please wait......');
			this.copyFile(installFile);
			spawnSync(project.npm, ['install', '--save-dev', cmd], { stdio: 'inherit', shell: true });
			utils.info('Dependencies installation complete. Please run your command again.');
			return true;
		}
		else {
			return false;
		}
	},
	copyFile: function(installFile) {
		Object.keys(installFile.template).forEach((item1) => {
			let fileArr = files.template[item1] || [];
			fileArr.forEach((item2) => {
				utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
				utils.fs.copySync(item2.src, item2.dist);
			});
		});

		Object.keys(installFile.style).forEach((item1) => {
			let fileArr = files.style[item1] || [];
			fileArr.forEach((item2) => {
				utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
				utils.fs.copySync(item2.src, item2.dist);
			});
		});
		Object.keys(installFile.js).forEach((item1) => {
			let fileArr = files.js[item1] || [];
			fileArr.forEach((item2) => {
				utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
				utils.fs.copySync(item2.src, item2.dist);
			});
		});
	}
};