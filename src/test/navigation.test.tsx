import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SiteHeader from "@/components/SiteHeader";

describe("site navigation", () => {
  it("does not expose speaking and links mental models to their populated index section", () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));

    expect(screen.queryByRole("link", { name: /speaking/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /mental models/i })).toHaveAttribute(
      "href",
      "/books#mental-models"
    );
  });
});
