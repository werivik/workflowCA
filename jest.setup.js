import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
export default [
{
files: ["**/*.js"],
languageOptions: {
globals: {
...globals.browser,
},
},
},
pluginJs.configs.recommended,
{
files: ["**/*.test.js"]
plugins: {
jest: pluginJest,
},
languageOptions: {
globals: {
...globals.jest,
},
},
rules: {
...pluginJest.configs.recommended.rules,
},
},
];