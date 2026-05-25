import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Breadcrumbs from "@/components/Breadcrumbs";

describe("Breadcrumbs", () => {
  it("renders a sticky bar below the header when sticky is enabled", () => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs
          sticky
          items={[
            { label: "Home", to: "/" },
            { label: "Thinking", to: "/thinking" },
            { label: "Example essay" },
          ]}
        />
      </MemoryRouter>
    );

    const stickyBar = container.firstElementChild;
    expect(stickyBar).toHaveClass("sticky", "top-16");
    expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
  });

  it("offsets below the reading progress bar when requested", () => {
    const { container } = render(
      <MemoryRouter>
        <Breadcrumbs
          sticky
          belowReadingProgress
          items={[
            { label: "Home", to: "/" },
            { label: "Example essay" },
          ]}
        />
      </MemoryRouter>
    );

    expect(container.firstElementChild).toHaveClass("top-[4.0625rem]");
  });
});
