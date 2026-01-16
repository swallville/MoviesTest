import { ZodSchema, z } from "zod";

/**
 * Used to validate runtime API response schemas
 */
const responseValidator = <T>({
  schema,
  result,
  query,
}: {
  schema: ZodSchema;
  result: T;
  query: string;
}) => {
  try {
    schema.parse(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        message: `The "${query}" response does not match the expected schema`,
        query: query,
        response: err.issues,
      };
    }
  }
};

export default responseValidator;
