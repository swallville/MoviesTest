/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  rules: {
    // Forcing explicit typedefs in TS is very nice,
    // but can easily annoy TS newcomers - thus let's disable them for now.
    "@typescript-eslint/explicit-function-return-type": "off",

    "@typescript-eslint/explicit-member-accessibility": "off",

    "@typescript-eslint/explicit-module-boundary-types": "off",

    // Rushstack overrides
    // TODO: evaluate these
    "@typescript-eslint/naming-convention": 0,

    "@typescript-eslint/no-empty-function": "off",

    // I don't see why this would become a problem
    // (Sometimes you want to define an interface that extends something but is a different interface,
    // that could have some additional props in the future)
    "@typescript-eslint/no-empty-interface": "off",

    "@typescript-eslint/no-explicit-any": "off",

    // If non-null assertion is wrong, why did they introduce it to TS?
    "@typescript-eslint/no-non-null-assertion": "off",

    "@typescript-eslint/no-object-literal-type-assertion": "off",

    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    "@typescript-eslint/no-use-before-define": ["error"],

    // This rule is actually detrimental: please see https://github.com/palantir/tslint/issues/3248#issuecomment-470746880
    "@typescript-eslint/prefer-interface": "off",
  },
};
