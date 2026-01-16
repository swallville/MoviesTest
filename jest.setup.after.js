// Call the garbage collector after all tests have run
global.afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  global.gc && global.gc();
});
