module.exports = {
    files: [
        "src",
        "tools",
        "config",
        "README.md",
        ".eslintrc.js",
        ".eslintignore",
        ".stylelintrc.js",
        "postcss.config.js",
        ".gitignore",
        ".babelrc",
        "example",
    ],
    options: [
        {
            type: 'input',
            name: 'webserver',
            message: 'html url(//localhost:9000/)',
            default: "//localhost:9000/",
        },
        {
            type: 'input',
            name: 'port',
            message: 'development server port(9000)',
            default: '9000',
        }
    ]
};