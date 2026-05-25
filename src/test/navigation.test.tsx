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

  it("shows resume in the primary nav instead of only under more", () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const resumeLinks = screen.getAllByRole("link", { name: /^resume$/i });
    expect(resumeLinks.some((link) => link.getAttribute("href") === "/resume")).toBe(
      true
    );
    expect(screen.getByRole("button", { name: /more/i })).toBeInTheDocument();
    expect(
      screen.queryAllByRole("menuitem", { name: /^resume$/i })
    ).toHaveLength(0);
  });
});
