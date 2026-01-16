/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  extends: "@rushstack/eslint-config/mixins/react",

  rules: {
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",

    "react/forbid-prop-types": "off",

    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".tsx", ".jsx", ".js"],
      },
    ],

    "react/jsx-indent": "off",

    // TODO: Remove this
    "react/jsx-no-bind": 0,

    "react/jsx-no-target-blank": "off",

    "react/jsx-one-expression-per-line": "off",

    "react/jsx-props-no-spreading": "off",

    // We've got prettier for that
    "react/jsx-wrap-multilines": "off",

    "react/no-array-index-key": "off",

    "react/no-unescaped-entities": "off",

    "react/prop-types": "off",

    "react/sort-comp": [
      1,
      {
        order: [
          "static-methods",
          "instance-variables",
          "type-annotations",
          "lifecycle",
          "everything-else",
          "/^_?handle.+$/",
          "/^_?render.+$/",
          "render",
        ],
      },
    ],
  },

  settings: {
    react: {
      version: "17.0.2",
    },
  },
};
