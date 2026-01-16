import { render, screen } from "#/shared/lib/test/test-utils";

import { VideoPlayer } from "./VideoPlayer";

describe("VideoPlayer", () => {
  it("renders the VideoPlayer content and elements", () => {
    const onCloseVideo = jest.fn();
    const selectedVideo = "TmD4c4vVclo";
    render(
      <VideoPlayer onCloseVideo={onCloseVideo} selectedVideo={selectedVideo} />,
    );

    expect(screen.queryByTestId(`video-player`)).toBeInTheDocument();
    expect(screen.queryByTestId(`close-video-button`)).toBeInTheDocument();
    expect(screen.queryByTestId(`youtube-iframe`)).toBeInTheDocument();
  });
});
