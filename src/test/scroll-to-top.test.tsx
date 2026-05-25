import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ScrollToTop from "@/components/ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  it("scrolls to an anchored section when the route includes a hash", async () => {
    render(
      <MemoryRouter initialEntries={["/books#mental-models"]}>
        <ScrollToTop />
        <div id="mental-models" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
        block: "start",
      });
    });
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
