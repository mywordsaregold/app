import js from "@eslint/js"
import globals from "globals"
// import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

/**
 * @param {Partial<{
      [K in keyof typeof react.configs.all.rules as K extends string ? `react/${K}` : never]: typeof react.configs.all.rules[K]
    }>} overrides
 */
function reactRules(overrides) {
  const importedRules = [
    react.configs.all.rules,
    react.configs.recommended.rules,
    react.configs["jsx-runtime"].rules,
    overrides,
  ]
  /** @type {typeof overrides} */
  const rules = importedRules.reduce((acc, rules) => {
    for (const key of Object.keys(rules)) {
      delete acc[key]
      delete acc[key.replace("react/", "")]
      acc[key] = rules[key]
    }
    return acc
  }, {})
  return rules
}

export default tseslint.config(
  { ignores: ["dist", "cypress.config.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended], //, eslintPluginPrettierRecommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactRules({
        "react/function-component-definition": 0,
        "react/jsx-indent": [2, 2, { checkAttributes: true, indentLogicalExpressions: true }],
        "react/jsx-indent-props": [2, 2],
        "react/jsx-filename-extension": 0,
        "react/jsx-max-depth": [2, { max: 3 }],
        "react/jsx-max-props-per-line": [2, { maximum: { single: 4, multi: 1 } }],
        "react/jsx-newline": [2, { prevent: true }],
        "react/jsx-no-bind": 0,
        "react/jsx-no-literals": 0,
        "react/jsx-one-expression-per-line": 0, //[2, { allow: "single-child" }],
        "react/no-unescaped-entities": 0,
      }),
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "array-bracket-spacing": [
        "error",
        "always",
        {
          objectsInArrays: false,
        },
      ],
      "arrow-parens": ["error", "as-needed"],
      "comma-dangle": ["error", "always-multiline"],
      "indent": ["error", 2],
      "linebreak-style": ["off", "unix"],
      "max-len": [
        "error",
        {
          code: 160,
        },
      ],
      "no-trailing-spaces": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "object-curly-spacing": ["error", "always"],
      "quote-props": ["error", "consistent"],
      "quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "semi": ["error", "never"],
      // 'sort-imports': [
      //   'error',
      //   {
      //     ignoreDeclarationSort: false,
      //     memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      //   },
      // ],
      // "prettier/prettier": ["error", {}, { usePrettierrc: false }],
    },
  }
)
