import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Now from "@/pages/Now";
import { STATIC_ROUTES } from "@/config/routes";
import { buildAllRoutes } from "../../scripts/lib/routes";

describe("Now page", () => {
  it("renders current focus and onward paths", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Now />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByRole("heading", { name: /now/i })).toBeInTheDocument();
    expect(screen.getByText(/Rocket Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/Globalstar/i)).toBeInTheDocument();
    expect(screen.getByText(/SDA T2TL/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /selected work/i })).toHaveAttribute(
      "href",
      "/work"
    );
    expect(screen.getAllByRole("link", { name: /contact/i })[0]).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("is included in static public routes", () => {
    expect(STATIC_ROUTES.map((route) => route.path)).toContain("/now");
    expect(buildAllRoutes().map((route) => route.path)).toContain("/now");
  });
});
