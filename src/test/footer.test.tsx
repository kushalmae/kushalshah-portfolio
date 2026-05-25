import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import SiteFooter from "@/components/SiteFooter";

describe("SiteFooter", () => {
  it("surfaces primary portfolio destinations and social links", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /work/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: /thinking/i })).toHaveAttribute(
      "href",
      "/thinking"
    );
    expect(screen.getByRole("link", { name: /books/i })).toHaveAttribute("href", "/books");
    expect(screen.getByRole("link", { name: /mental models/i })).toHaveAttribute(
      "href",
      "/books#mental-models"
    );
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute(
      "href",
      "/resume"
    );
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/kushalmae"
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/kushalmae/"
    );
  });
});
