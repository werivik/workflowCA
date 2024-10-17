import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import pluginCypress from "eslint-plugin-cypress";
export default [

{
files: ["cypress.config.js", "cypress/**/*.cy.js"],
plugins: {
cypress: pluginCypress,
},
languageOptions: {
globals: {
...globals.browser,
...globals.node,
...globals.cypress,
},
},
rules: {
...pluginCypress.configs.recommended.rules,
"no-undef": "off",
"no-unused-vars": "off",
},
},
];