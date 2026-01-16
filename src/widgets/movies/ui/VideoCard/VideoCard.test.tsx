import { render, screen } from "#/shared/lib/test/test-utils";

import { VideoCard } from "./VideoCard";

describe("VideoCard", () => {
  it("renders the VideoCard content and elements", () => {
    const onClick = jest.fn();
    const index = 0;
    render(<VideoCard onClick={onClick} index={index} />);

    expect(screen.queryByTestId(`video-card-${index}`)).toBeInTheDocument();
    expect(
      screen.queryByTestId(`video-card-image-${index}`),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(`video-card-text-${index}`)).toHaveTextContent(
      `Play trailer ${index + 1}`,
    );
  });
});
