// jest.config.js
module.exports = async () => ({
  clearMocks: true,
  collectCoverageFrom: [
    "{src,pages,server}/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.{mocks,mock}.ts",
    "!src/**/*.d.ts",
    "!src/**/*.story.tsx",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/testing/**",
    "!docs/**",
  ],
  // XXX re-enable coverage once tests added
  collectCoverage: false,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "package.json",
    "package-lock.json",
    ".*__snapshots__/.*",
    "/__snapshots__/",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: [
    "html",
    "text-summary",
    [
      "lcovonly",
      {
        file: "lcov.info",
      },
    ],
  ],
  coverageThreshold: {
    global: {
      statements: 0, // XXX - set to 85
      branches: 0, // XXX - set to 85
      functions: 0, // XXX - set to 85
      lines: 0, // XXX - set to 85
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^#/app/(.*)": "<rootDir>/src/app/$1",
    "^#/public/(.*)": "<rootDir>/public/$1",
    "^#/shared/(.*)": "<rootDir>/src/shared/$1",
    "^#/lib/(.*)": "<rootDir>/src/shared/lib/$1",
    "^#/widgets/(.*)": "<rootDir>/src/widgets/$1",
    "^#/entities/(.*)": "<rootDir>/src/entities/$1",
    "^react($|/.+)": "<rootDir>/node_modules/react$1", // makes sure all React imports are running off of the one in this package.
  },
  setupFiles: [
    "<rootDir>/jest.setup.js",
    "./node_modules/jest-canvas-mock/lib/index.js",
  ],
  setupFilesAfterEnv: [
    "jest-extended/all", // Extends native "expect" abilities - See https://github.com/jest-community/jest-extended
    "<rootDir>/jest.setup.js",
    "<rootDir>/jest.setup.after.js",
    "@testing-library/jest-dom",
  ],
  testEnvironment: "jsdom",
  testMatch: ["**/*.(test|spec).(js|jsx|ts|tsx)"],
  testPathIgnorePatterns: [],
  testTimeout: 30_000,
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ["\\.(css|less|scss|sass)$"],
  // This is a workaround for:
  // https://github.com/facebook/jest/issues/11956
  workerIdleMemoryLimit: "1GB",
});
