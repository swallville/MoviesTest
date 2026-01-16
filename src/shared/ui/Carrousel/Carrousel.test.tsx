import { render, screen } from "#/shared/lib/test/test-utils";
import { VideoCard } from "#/widgets/movies/ui/VideoCard/VideoCard";
import Carrousel from "./Carrousel";

let intersectionCallback: IntersectionObserverCallback;

beforeAll(() => {
  const mockedIntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    scrollMargin = "";
    thresholds = [];
  };

  // Mock DOMRectReadOnly with required static method fromRect
  const mockedDOMRectReadOnly = class {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    top = 0;
    right = 0;
    bottom = 0;
    left = 0;
    toJSON() {
      return this;
    }
    static fromRect(): DOMRectReadOnly {
      const rect = new window.DOMRectReadOnly();

      return rect;
    }
  };

  Element.prototype.getBoundingClientRect = function () {
    return new window.DOMRectReadOnly();
  };

  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    value: mockedIntersectionObserver,
    writable: true,
  });

  Object.defineProperty(window, "DOMRectReadOnly", {
    configurable: true,
    value: mockedDOMRectReadOnly,
    writable: true,
  });
});

describe("Carrousel", () => {
  it("renders the Carrousel content and elements", () => {
    const loadMore = jest.fn();
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const index = 0;

    render(
      <Carrousel loadMore={loadMore} loading={false}>
        <VideoCard onClick={onClick1} index={index} />
        <VideoCard onClick={onClick2} index={index + 1} />
      </Carrousel>,
    );

    expect(screen.queryByTestId(`carrousel`)).toBeInTheDocument();
    expect(screen.queryByTestId(`carrousel-grid`)).toBeInTheDocument();
    expect(screen.queryByTestId(`video-card-${index}`)).toBeInTheDocument();
    expect(
      screen.queryByTestId(`video-card-image-${index}`),
    ).toBeInTheDocument();
    expect(screen.queryByTestId(`video-card-text-${index}`)).toHaveTextContent(
      `Play trailer ${index + 1}`,
    );
    expect(screen.queryByTestId(`video-card-${index + 1}`)).toBeInTheDocument();
    expect(
      screen.queryByTestId(`video-card-image-${index + 1}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(`video-card-text-${index + 1}`),
    ).toHaveTextContent(`Play trailer ${index + 2}`);
    expect(loadMore).toHaveBeenCalledTimes(0);
  });

  it("calls loadMore when last item is intersecting", () => {
    const loadMore = jest.fn();
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();
    const index = 0;

    render(
      <Carrousel loadMore={loadMore} loading={false}>
        <VideoCard onClick={onClick1} index={index} />
        <VideoCard onClick={onClick2} index={index + 1} />
      </Carrousel>,
    );

    // Simulate intersection with valid boundingClientRect and intersectionRect
    intersectionCallback(
      [
        {
          isIntersecting: true,
          boundingClientRect: new window.DOMRectReadOnly(),
          intersectionRect: new window.DOMRectReadOnly(),
          intersectionRatio: 1,
          rootBounds: null,
          target: document.createElement("div"),
          time: 0,
        },
      ],
      {} as IntersectionObserver,
    );
    expect(loadMore).toHaveBeenCalledTimes(1);
  });
});
