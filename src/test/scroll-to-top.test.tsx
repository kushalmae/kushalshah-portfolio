import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "@/components/ScrollToTop";

const DelayedAnchor = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 180);
    return () => window.clearTimeout(timer);
  }, []);

  return mounted ? <div id="mental-models" /> : null;
};

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("scrolls to an anchored section when the route includes a hash", async () => {
    render(
      <MemoryRouter initialEntries={["/books#mental-models"]}>
        <ScrollToTop />
        <div id="mental-models" />
      </MemoryRouter>
    );

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: "start",
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it("waits for a lazily mounted anchor before falling back to the top", async () => {
    render(
      <MemoryRouter initialEntries={["/books#mental-models"]}>
        <ScrollToTop />
        <DelayedAnchor />
      </MemoryRouter>
    );

    expect(window.scrollTo).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(180);
    });
    await act(async () => {
      vi.advanceTimersByTime(50);
    });

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: "start",
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
