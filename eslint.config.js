const js = require("@eslint/js");

module.exports = [
    {
        ignores: [
            "node_modules/",
            "coverage/"
        ]
    },

    js.configs.recommended,

    // ESLint configuration file itself
    {
        files: ["eslint.config.js"],

        languageOptions: {
            globals: {
                require: "readonly",
                module: "readonly"
            }
        }
    },

    // Application source code
    {
        files: ["src/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",

            globals: {
                process: "readonly",
                console: "readonly"
            }
        },

        rules: {
            "no-unused-vars": "warn"
        }
    },

    // Jest test files
    {
        files: ["tests/**/*.js"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs",

            globals: {
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly"
            }
        },

        rules: {
            "no-unused-vars": "warn"
        }
    }
];