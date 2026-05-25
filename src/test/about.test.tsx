import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import About from "@/pages/About";

describe("About page", () => {
  it("renders a scannable operating principles section", () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(
      screen.getByRole("heading", { name: /operating principles/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/map the system before optimizing/i)).toBeInTheDocument();
    expect(screen.getByText(/design for failure modes/i)).toBeInTheDocument();
    expect(screen.getByText(/translate across domains/i)).toBeInTheDocument();
  });
});
