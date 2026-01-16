import { compose, concat, join, map, toPairs } from "rambdax";

/**
 * Creates a query string based on object
 */
const createQueryString = compose(
  concat("?"),
  join("&"),
  map(join("=")),
  toPairs,
);

export default createQueryString;
