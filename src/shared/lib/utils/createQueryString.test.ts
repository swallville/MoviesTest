import createQueryString from "./createQueryString";

describe("createQueryString", () => {
  it("should create a query string from an object", () => {
    expect(createQueryString({ foo: "bar" })).toBe("?foo=bar");
  });
});
