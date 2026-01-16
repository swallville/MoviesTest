module.exports = {
  extends: ["./import.js"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: "./tsconfig.lint.json",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  overrides: [
    {
      files: ["**/*.{tsx,ts}"],
      rules: {
        "fp/no-unused-expression": 0,
        "fp/no-nil": 0,
        "import/no-default-export": 0,
        "import/export": 0,
        "no-void": [
          "error",
          {
            allowAsStatement: true,
          },
        ],
        // This conflicts with sort-keys-fix/sort-keys-fix
        "effector/keep-options-order": 0,
        "@typescript-eslint/typedef": 0,
        "no-restricted-imports": [
          "error",
          {
            name: "next/navigation",
            message:
              "Please use 'next/router' instead, see useNavigationObserver.ts file for more details.",
          },
        ],
      },
    },
    {
      files: ["*.config.ts"],
      rules: {
        "fp/no-mutation": 0,
      },
    },
    {
      files: [
        "src/pages/**/{404,index}.tsx",
        "src/pages/auth/{login,logout}.tsx",
      ],
      rules: {
        "fp/no-mutation": ["error", { exceptions: [{ property: "Layout" }] }],
      },
    },
  ],
};
