/**
 * @jest-environment jsdom
 */
import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { useDeviceType } from "#/lib/hooks";

const TestComponent: React.FC = () => {
  const { isDesktop } = useDeviceType();

  const content = isDesktop ? "desktop" : "mobile";

  return <div>{content}</div>;
};

describe("useDeviceType", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should provide initial value as portrait when media query matches false", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 600,
      writable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 800,
      writable: true,
    });

    jest.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          addEventListener: jest.fn(),
          addListener: jest.fn(),
          matches: false,
          removeEventListener: jest.fn(),
          removeListener: jest.fn(),
        }) as unknown as MediaQueryList,
    );

    render(<TestComponent />);

    expect(screen.getByText("mobile")).toBeInTheDocument();
  });

  it("should provide initial value as landscape when media query matches true", () => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1280,
      writable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 720,
      writable: true,
    });

    jest.spyOn(window, "matchMedia").mockImplementation(
      () =>
        ({
          addEventListener: jest.fn(),
          addListener: jest.fn(),
          matches: true,
          removeEventListener: jest.fn(),
          removeListener: jest.fn(),
        }) as unknown as MediaQueryList,
    );

    render(<TestComponent />);

    expect(screen.getByText("desktop")).toBeInTheDocument();
  });
});
