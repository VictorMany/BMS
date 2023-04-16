module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    rules: {
        quotes: [2, "single", { avoidEscape: true }],
        // allow async-await
        "generator-star-spacing": "off",
        // allow paren-less arrow functions
        "arrow-parens": "off",
        "one-var": "off",
        "no-void": "off",
        "multiline-ternary": "off",
        quotes: [1, "single"],

        "prefer-promise-reject-errors": "off",

        // allow debugger during development only
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      }
}
