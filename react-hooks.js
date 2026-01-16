/**
 * @type {import("eslint").Linter.Config}
 */
module.exports = {
  plugins: ["react-hooks"],

  rules: {
    // Checks effect dependencies
    "react-hooks/exhaustive-deps": "warn",
    // Checks rules of Hooks
    "react-hooks/rules-of-hooks": "error",
  },
};
