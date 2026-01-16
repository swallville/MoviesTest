/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: ["plugin:import/recommended", "plugin:import/typescript"],

  plugins: ["import"],

  overrides: [
    {
      files: ["**/*.js", "**/*.ts", "**/*.tsx"],
      rules: {
        "import/no-default-export": 2,

        "import/no-duplicates": ["error"],

        "import/no-unresolved": "off",

        "import/order": [
          "error",
          {
            groups: ["builtin", "external", "parent", "internal", "sibling"],
            pathGroups: [
              {
                pattern: "@(react|next|effector)",
                group: "external",
                position: "before",
              },
              {
                pattern: "#/**",
                group: "parent",
              },
              {
                pattern: "../**",
                group: "internal",
              },
              {
                pattern: "./**",
                group: "sibling",
              },
            ],
            pathGroupsExcludedImportTypes: ["react"],
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],

        // 'typescript-sort-keys/interface': 'off',
        // 'typescript-sort-keys/string-enum': 'off',
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        "import/prefer-default-export": "off",
      },
    },
  ],
};
