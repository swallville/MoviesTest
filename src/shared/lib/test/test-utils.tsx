import React from "react";

import { render as renderTest } from "@testing-library/react";

export * from "@testing-library/react";

const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (component: React.ReactElement, options?: any) => {
  return renderTest(component, {
    wrapper: WithProviders,
    ...options,
  });
};

export { render };
