module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "modules": true,
            "spread" : true,
            "restParams" : true
        },
        "sourceType": "module"
    },
    "plugins": [
        "html",
    ],
    rules: {
        // "indent": [2, 'tab', {SwitchCase: 1, VariableDeclarator: 1, ObjectExpression: 2}],
        "no-console": 0,
        "no-redeclare": 0,
        "no-sparse-arrays": 0,
        "one-var-declaration-per-line": [2, "always"],
        "no-mixed-spaces-and-tabs": 0,
        "semi": 2,
        "no-undef": 1,
        "no-unused-vars": [1, {"args": "none"}],
        "no-await-in-loop": 1
    },
    "globals": {
        "Vue": true,
    }
};