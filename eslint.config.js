const js = require("@eslint/js");

module.exports = [
    {
        ignores: [
            "node_modules/",
            "coverage/",
            "eslint.config.js"
        ]
    },

    js.configs.recommended,

    // Backend - Node.js
    {
        files: [
            "src/**/*.js",
            "tests/**/*.js"
        ],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",

            globals: {
                process: "readonly",
                console: "readonly",
                __dirname: "readonly",
                require: "readonly",
                module: "readonly"
            }
        }
    },

    // Jest
    {
        files: ["tests/**/*.js"],

        languageOptions: {
            globals: {
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly"
            }
        }
    },

    // Frontend - Browser
    {
        files: ["public/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "script",

            globals: {
                document: "readonly",
                fetch: "readonly",
                console: "readonly"
            }
        }
    }
];