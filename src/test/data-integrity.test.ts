import { describe, expect, it } from "vitest";
import { articles, ARTICLE_TOPICS } from "@/data/articles";
import { caseStudies } from "@/data/case-studies";
import { books, mentalModels } from "@/data/books";
import { githubProjects } from "@/data/github-projects";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const allUnique = <T>(values: T[]) => new Set(values).size === values.length;

describe("data integrity — articles", () => {
  it("has at least one article", () => {
    expect(articles.length).toBeGreaterThan(0);
  });

  it("uses unique kebab-case slugs", () => {
    const slugs = articles.map((a) => a.slug);
    expect(allUnique(slugs)).toBe(true);
    for (const slug of slugs) {
      expect(slug, `article slug "${slug}" must be kebab-case`).toMatch(SLUG_RE);
    }
  });

  it.each(articles)("article '$slug' has required fields", (article) => {
    expect(article.slug).toBeTruthy();
    expect(article.title).toBeTruthy();
    expect(article.description).toBeTruthy();
    expect(article.date).toBeTruthy();
    expect(article.readTime).toBeTruthy();
    expect(Array.isArray(article.tags)).toBe(true);
    expect(article.tags.length).toBeGreaterThan(0);
    expect(Array.isArray(article.sections)).toBe(true);
    expect(article.sections.length).toBeGreaterThan(0);
    expect(article.insight).toBeTruthy();
    expect(ARTICLE_TOPICS).toContain(article.topic);
    expect(Array.isArray(article.keyTakeaways)).toBe(true);
    expect(article.keyTakeaways.length).toBeGreaterThan(0);

    const sectionIds = article.sections.map((s) => s.id);
    expect(
      allUnique(sectionIds),
      `article '${article.slug}' has duplicate section ids`
    ).toBe(true);
    for (const section of article.sections) {
      expect(section.id).toMatch(SLUG_RE);
      expect(section.heading).toBeTruthy();
      expect(Array.isArray(section.paragraphs)).toBe(true);
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("series part numbers are consistent within each series", () => {
    const seriesGroups = new Map<string, typeof articles>();
    for (const article of articles) {
      if (!article.series) continue;
      const list = seriesGroups.get(article.series.id) ?? [];
      list.push(article);
      seriesGroups.set(article.series.id, list);
    }

    for (const [seriesId, list] of seriesGroups) {
      const totals = new Set(list.map((a) => a.series!.total));
      expect(totals.size, `series '${seriesId}' has inconsistent totals`).toBe(1);

      const parts = list.map((a) => a.series!.part).sort((a, b) => a - b);
      expect(
        allUnique(parts),
        `series '${seriesId}' has duplicate part numbers`
      ).toBe(true);
      for (const part of parts) {
        expect(part).toBeGreaterThanOrEqual(1);
        expect(part).toBeLessThanOrEqual(list[0].series!.total);
      }
    }
  });
});

describe("data integrity — case studies", () => {
  it("has at least one case study", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
  });

  it("uses unique kebab-case ids", () => {
    const ids = caseStudies.map((c) => c.id);
    expect(allUnique(ids)).toBe(true);
    for (const id of ids) {
      expect(id).toMatch(SLUG_RE);
    }
  });

  it.each(caseStudies)("case study '$id' has required fields", (study) => {
    expect(study.id).toBeTruthy();
    expect(study.label).toBeTruthy();
    expect(study.title).toBeTruthy();
    expect(study.image).toBeTruthy();
    expect(study.summary).toBeTruthy();
    expect(study.tags.length).toBeGreaterThan(0);
    expect(study.tldr.problem).toBeTruthy();
    expect(study.tldr.solution).toBeTruthy();
    expect(study.tldr.impact).toBeTruthy();
    expect(study.problem.length).toBeGreaterThan(0);
    expect(study.approach.length).toBeGreaterThan(0);
    expect(study.solution.length).toBeGreaterThan(0);
    expect(study.impact.length).toBeGreaterThan(0);
    expect(study.insight).toBeTruthy();
  });

  it("case study related article slugs exist", () => {
    const articleSet = new Set(articles.map((article) => article.slug));
    for (const study of caseStudies) {
      if (study.relatedArticle) {
        expect(
          articleSet.has(study.relatedArticle.slug),
          `case study '${study.id}' references unknown article '${study.relatedArticle.slug}'`
        ).toBe(true);
      }
    }
  });

  it("GitHub project case study references exist", () => {
    const studySet = new Set(caseStudies.map((study) => study.id));
    for (const project of githubProjects) {
      if (project.caseStudyId) {
        expect(
          studySet.has(project.caseStudyId),
          `GitHub project '${project.slug}' references unknown case study '${project.caseStudyId}'`
        ).toBe(true);
      }
    }
  });
});

describe("data integrity — books and mental models", () => {
  it("books and mental models use unique kebab-case slugs", () => {
    const bookSlugs = books.map((b) => b.slug);
    const modelSlugs = mentalModels.map((m) => m.slug);
    expect(allUnique(bookSlugs)).toBe(true);
    expect(allUnique(modelSlugs)).toBe(true);
    for (const slug of [...bookSlugs, ...modelSlugs]) {
      expect(slug).toMatch(SLUG_RE);
    }
  });

  it.each(books)("book '$slug' has required fields", (book) => {
    expect(book.title).toBeTruthy();
    expect(book.author).toBeTruthy();
    expect(book.description).toBeTruthy();
    expect(book.intro.length).toBeGreaterThan(0);
    expect(book.sections.length).toBeGreaterThan(0);
    expect(book.insight).toBeTruthy();
    expect(book.keyTakeaways.length).toBeGreaterThan(0);
    expect(Array.isArray(book.mentalModelSlugs)).toBe(true);
  });

  it("every referenced mental model slug exists", () => {
    const modelSet = new Set(mentalModels.map((m) => m.slug));
    for (const book of books) {
      for (const slug of book.mentalModelSlugs) {
        expect(modelSet.has(slug), `book '${book.slug}' references unknown mental model '${slug}'`).toBe(true);
      }
    }
  });

  it.each(mentalModels)("mental model '$slug' has required fields", (model) => {
    expect(model.name).toBeTruthy();
    expect(model.oneLiner).toBeTruthy();
    expect(model.description).toBeTruthy();
    expect(model.definition.length).toBeGreaterThan(0);
    expect(model.whenToUse.length).toBeGreaterThan(0);
    expect(model.application).toBeTruthy();
  });

  it("every mental model source book slug exists when set", () => {
    const bookSet = new Set(books.map((b) => b.slug));
    for (const model of mentalModels) {
      if (model.sourceBook) {
        expect(
          bookSet.has(model.sourceBook.slug),
          `mental model '${model.slug}' references unknown book '${model.sourceBook.slug}'`
        ).toBe(true);
      }
    }
  });
});
