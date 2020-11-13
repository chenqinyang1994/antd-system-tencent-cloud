module.exports = {
    "parser": "@babel/eslint-parser",
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        "indent": ["error", 4],
        "max-len": ["error", { "code": 80 }]
    }
}