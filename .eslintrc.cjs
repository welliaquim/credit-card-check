module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "hardcore",
    "hardcore/react",
    "hardcore/react-performance",
    "hardcore/react-testing-library",
    "hardcore/jest",
    "hardcore/fp",
  ],
  env: {
    browser: true,
  },

  overrides: [
    {
      files: ["server/**/*.js"],

      extends: ["hardcore/node"],

      env: {
        browser: false,
      },
    },
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/prop-types": "off",
    "import/no-unused-modules": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "no-console": "off",
  },
};