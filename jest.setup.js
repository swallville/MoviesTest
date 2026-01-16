// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@next/env").loadEnvConfig(process.cwd());

/**
 * Importing next during test applies automated polyfills:
 *  - Polyfill the built-in "fetch" provided by Next.js
 *
 * @see https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383 How to use built-in fetch in tests?
 * @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support Next.js Blog - Improved Built-in Fetch Support
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array About setupFilesAfterEnv usage
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("next");

// Disable logger for Jest
process.env.DISABLE_LOGGER = true;

// Backup of the native console object for later re-use
global._console = global.console;

// Force mute console by returning a mock object that mocks the props we use
global.muteConsole = function () {
  return {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    log: jest.fn(),
    warn: jest.fn(),
  };
};

// Mock __non_webpack_require__ to use the standard node.js "require"
global["__non_webpack_require__"] = require;

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation(function (query) {
    return {
      // Deprecated
      addEventListener: jest.fn(),
      addListener: jest.fn(),
      dispatchEvent: jest.fn(),
      matches: false,
      media: query,
      onchange: null,
      removeEventListener: jest.fn(),
      // Deprecated
      removeListener: jest.fn(),
    };
  }),
  writable: true,
});

if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const utils = require("util");
  globalThis.TextEncoder = utils.TextEncoder;
  globalThis.TextDecoder = utils.TextDecoder;
}

// Mock BroadcastChannel
function BroadcastChannelMocked() {}
BroadcastChannelMocked.prototype.onmessage = jest.fn();
BroadcastChannelMocked.prototype.postMessage = function (data) {
  this.onmessage({ data });
};
global.BroadcastChannel = BroadcastChannelMocked;

// Mock Request
function RequestMocked() {}
global.Request = RequestMocked;

// Mock fetch module
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 }),
  }),
);

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Ensure the property is deleted before redefining it
delete window.SVGElement.prototype.getBBox;
delete window.SVGElement.prototype.getBoundingClientRect;

Object.defineProperty(window.SVGElement.prototype, "getBBox", {
  value: jest.fn(() => ({
    x: 0,
    y: 0,
    height: 100,
    width: 100,
    bottom: 0,
    left: 0,
    right: 100,
    top: 100,
    toJSON() {
      return JSON.stringify(this);
    },
  })),
  writable: true,
});

Object.defineProperty(window.SVGElement.prototype, "getBoundingClientRect", {
  value: jest.fn(() => ({
    height: 100,
    width: 100,
    x: 0,
    y: 0,
  })),
  writable: true,
});
