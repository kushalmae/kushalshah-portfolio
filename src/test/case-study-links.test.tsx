import { render, screen, within } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CaseStudyPage from "@/pages/CaseStudyPage";

const renderCaseStudy = (id: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/work/${id}`]}>
        <Routes>
          <Route path="/work/:id" element={<CaseStudyPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

describe("CaseStudyPage cross-links", () => {
  it("surfaces related writing and code for case studies", () => {
    renderCaseStudy("satops-procedure-tool");

    const related = screen.getByRole("region", { name: /related paths/i });

    expect(
      within(related).getByRole("link", { name: /Designing SatOps/i })
    ).toHaveAttribute("href", "/thinking/satops-procedure-tool");
    expect(
      within(related).getByRole("link", { name: /SatOps — Operations Console/i })
    ).toHaveAttribute("href", "https://github.com/kushalmae/opscon-repo");
  });
});
