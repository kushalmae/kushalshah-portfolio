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
    expect(within(timeline).getByText(/PMP/i)).toBeInTheDocument();
    expect(within(timeline).getByText(/SASE Top Gun 2/i)).toBeInTheDocument();
    expect(within(timeline).getByText(/Architect Apprenticeship Program/i)).toBeInTheDocument();
    expect(within(timeline).getByText(/Caltech Certificate/i)).toBeInTheDocument();
    expect(
      within(timeline).getByRole("link", { name: /PWSA Transport Layer/i })
    ).toHaveAttribute("href", "/thinking/pwsa-transport-layer");
    expect(
      within(timeline).getAllByRole("link", { name: /Mission-Critical System Leadership/i })[0]
    ).toHaveAttribute("href", "/work/mission-critical-systems");
    expect(
      within(timeline).getByRole("link", { name: /Drozone Layer/i })
    ).toHaveAttribute("href", "/work/drozone-layer-cuas");
  });
});
