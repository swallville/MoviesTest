import { isEmpty, maybe } from "rambdax";
import { ApiClientProps } from "./types";
import createQueryString from "#/shared/lib/utils/createQueryString";

const isPostRequest = (method: string) => method === "POST";
const isGetRequest = (method: string) => method === "GET";

/**
 * Create a fetch request client with appropriate properties
 */
const apiClient = async <T>(options: ApiClientProps) => {
  const {
    url,
    params = {},
    method = "GET",
    mode = "cors",
    parseResponse,
  } = options;

  const hasParams = !isEmpty(params);

  const bodyWithParams = hasParams && isPostRequest(method);
  const urlWithParams = hasParams && isGetRequest(method);

  const body = maybe(bodyWithParams, JSON.stringify(params), undefined);
  const requestUrl = maybe(urlWithParams, createQueryString(params), url);

  const requestOptions = {
    body,
    headers: {
      "Content-Type": "text/plain",
    },
    method,
    mode,
  };

  try {
    const request = new Request(requestUrl ?? "", requestOptions);
    const response = await fetch(request);

    const result: T =
      typeof parseResponse === "function"
        ? await parseResponse(response)
        : await response.json();

    return result;
  } catch (error) {
    return {
      error,
    };
  }
};

export default apiClient;
