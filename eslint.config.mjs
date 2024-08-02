import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
 {
    rules: {
      strict: 0,
      'no-alert': 0,
      'no-console': 0,
      'no-constant-condition': 0,
      'no-restricted-globals': 0,
      'no-unused-vars': 0,
      'no-underscore-dangle': 0,
      'func-names': 0,
      'global-require': 0,
      'import/extensions': 0,
      'import/no-dynamic-require': 0,
      'import/prefer-default-export': 0,
      'prefer-template': 0,
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 1
        },      
        "multiline": {
          "max": 1
        }
      }],
      "vue/html-self-closing": ["error", {
        "html": {
          "void": "never",
          "normal": "never",
          "component": "always"
        },
        "svg": "always",
        "math": "always"
      }]
    },
  },
];