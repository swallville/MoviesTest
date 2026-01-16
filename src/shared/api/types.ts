export interface ApiClientProps {
  url: string;
  params?: Record<string, unknown>;
  method?: string;
  mode?: RequestMode;
  parseResponse?: (response: Response) => Promise<unknown>;
}
