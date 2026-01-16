import { render, screen } from "#/shared/lib/test/test-utils";

import Loading from "./Loading";

describe("Loading", () => {
  it("should match the snapshot", () => {
    expect(render(<Loading />)).toMatchSnapshot();
  });
  it("renders the Loading content and elements", () => {
    render(<Loading />);

    expect(screen.queryByTestId(`loading-spinner`)).toBeInTheDocument();
    expect(screen.queryByTestId(`loading-spinner-icon`)).toBeInTheDocument();
  });
});
