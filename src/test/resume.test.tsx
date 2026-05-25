import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Resume from "@/pages/Resume";

describe("Resume page", () => {
  it("renders a career timeline view with major phases", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Resume />
        </MemoryRouter>
      </HelmetProvider>
    );

    const timeline = screen.getByRole("region", { name: /career timeline/i });

    expect(
      within(timeline).getByRole("heading", { name: /career timeline/i })
    ).toBeInTheDocument();
    expect(within(timeline).getByText(/Rocket Lab/i)).toBeInTheDocument();
    expect(within(timeline).getAllByText(/Northrop Grumman/i).length).toBeGreaterThan(0);
    expect(within(timeline).getByText(/Thales Avionics/i)).toBeInTheDocument();
    expect(within(timeline).getAllByText(/Mission operations/i).length).toBeGreaterThan(0);
    expect(within(timeline).getAllByText(/OPIR payload/i).length).toBeGreaterThan(0);
  });
});
