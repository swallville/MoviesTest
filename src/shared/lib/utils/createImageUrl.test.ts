import { faker } from "@faker-js/faker";

import { createImageUrl } from "./createImageUrl";

describe("createImageUrl", () => {
  it("should create an image string from the params", () => {
    const size = faker.lorem.word();
    const path = `/${faker.lorem.word()}`;

    expect(createImageUrl(path, size)).toBe(`https://image.tmdb.org/t/p/${size}${path}`);
  });
});
