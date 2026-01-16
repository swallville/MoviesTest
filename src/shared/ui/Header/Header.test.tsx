jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  usePathname: jest.fn().mockReturnValue("/movies"),
}));

import { act, render, screen, waitFor } from "#/shared/lib/test/test-utils";
import { usePathname } from "next/navigation";

import Header from "./Header";

describe("Header", () => {
  const portalRoot = document.createElement("div");
  portalRoot.id = "modal-root";
  document.body.appendChild(portalRoot);
  const mockUsePathname = usePathname as jest.Mock;

  beforeAll(() => {
    if (!window.HTMLDialogElement.prototype.showModal) {
      window.HTMLDialogElement.prototype.showModal = function () {};
    }
  });

  it("renders the Header content and elements for primary variation", async () => {
    mockUsePathname.mockReturnValueOnce("/");

    render(<Header defaultBackgroundColor="primary" goBackButton={false} />);

    expect(screen.queryByTestId(`header`)).toBeInTheDocument();
    expect(screen.queryByTestId(`more-vertical-button`)).toBeInTheDocument();
    expect(screen.queryByTestId(`go-back-button`)).not.toBeInTheDocument();

    const moreVerticalButton = screen.getByTestId("more-vertical-button");
    expect(moreVerticalButton).toBeInTheDocument();

    act(() => {
      moreVerticalButton.click();
    });

    await waitFor(() => {
      expect(screen.queryByTestId(`modal-overlay`)).toBeInTheDocument();
      expect(screen.queryByTestId(`modal-dialog`)).toBeInTheDocument();
      expect(screen.queryByTestId(`close-modal-button`)).toBeInTheDocument();
    });
  });
  it("renders the Header content and elements for secondary variation", () => {
    mockUsePathname.mockReturnValueOnce("/movies");
    render(<Header defaultBackgroundColor="secondary" goBackButton />);

    expect(screen.queryByTestId(`header`)).toBeInTheDocument();
    expect(screen.queryByTestId(`go-back-button`)).toBeInTheDocument();
    expect(
      screen.queryByTestId(`more-vertical-button`),
    ).not.toBeInTheDocument();
  });
});
