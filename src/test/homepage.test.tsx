import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Index from "@/pages/Index";

describe("Homepage", () => {
  it("surfaces thinking, mental models, current focus, and stronger CTAs", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(
      screen.getByRole("heading", { name: /thinking & mental models/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read technical writing/i })).toHaveAttribute(
      "href",
      "/thinking"
    );
    expect(screen.getByRole("link", { name: /explore mental models/i })).toHaveAttribute(
      "href",
      "/books#mental-models"
    );
    expect(screen.getByRole("link", { name: /current focus/i })).toHaveAttribute(
      "href",
      "/now"
    );
    expect(screen.getByRole("link", { name: /review resume/i })).toHaveAttribute(
      "href",
      "/resume"
    );
    expect(screen.getByRole("link", { name: /start a conversation/i })).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});
