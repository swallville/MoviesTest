import { render, screen } from "#/shared/lib/test/test-utils";
import { VideoCard } from "#/widgets/movies/ui/VideoCard";

import { Modal } from "./Modal";

describe("Modal", () => {
  const portalRoot = document.createElement("div");
  portalRoot.id = "modal-root";
  document.body.appendChild(portalRoot);

  beforeAll(() => {
    if (!window.HTMLDialogElement.prototype.showModal) {
      window.HTMLDialogElement.prototype.showModal = function () {};
    }
  });
  it("renders the Modal content and elements", () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
    const index = 0;

    render(
      <Modal onClose={onClose}>
        <VideoCard onClick={onClick} index={index} />
      </Modal>,
    );

    expect(screen.queryByTestId(`modal-overlay`)).toBeInTheDocument();
    expect(screen.queryByTestId(`modal-dialog`)).toBeInTheDocument();
    expect(screen.queryByTestId(`close-modal-button`)).toBeInTheDocument();
    expect(screen.queryByTestId(`video-card-${index}`)).toBeInTheDocument();
    expect(
      screen.queryByTestId(`video-card-image-${index}`),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(`video-card-text-${index}`)).toHaveTextContent(
      `Play trailer ${index + 1}`,
    );

    const closeModalButton = screen.getByTestId("close-modal-button");
    closeModalButton.click();
    expect(onClose).toHaveBeenCalledTimes(1);

    const videoCardButton = screen.getByTestId(`video-card-${index}`);
    videoCardButton.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
