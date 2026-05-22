export type { Book, BookSection, MentalModel, BookTheme } from "./books/types";
export { BOOK_THEMES } from "./books/types";

import tinyExperiments from "./books/tiny-experiments";
import startWithWhy from "./books/start-with-why";
import radicalCandor from "./books/radical-candor";
import growthLoop from "./mental-models/growth-loop";
import minimumViableExperiment from "./mental-models/minimum-viable-experiment";
import identityByExperiment from "./mental-models/identity-by-experiment";
import curiosityOverCertainty from "./mental-models/curiosity-over-certainty";
import goldenCircle from "./mental-models/golden-circle";
import celeryTest from "./mental-models/celery-test";
import inspireVsManipulate from "./mental-models/inspire-vs-manipulate";
import radicalCandorModel from "./mental-models/radical-candor";
import feedbackQuadrant from "./mental-models/feedback-quadrant";
import rockStarsSuperstars from "./mental-models/rock-stars-superstars";

export const books = [tinyExperiments, startWithWhy, radicalCandor];

export const mentalModels = [
  growthLoop,
  minimumViableExperiment,
  identityByExperiment,
  curiosityOverCertainty,
  goldenCircle,
  celeryTest,
  inspireVsManipulate,
  radicalCandorModel,
  feedbackQuadrant,
  rockStarsSuperstars,
];

import { BOOK_THEMES } from "./books/types";

/** Fixed set of broad themes — not derived from per-item tags */
export const ALL_THEME_TAGS = [...BOOK_THEMES];

export function booksTagUrl(tag: string) {
  return `/books?tag=${encodeURIComponent(tag)}`;
}

export function itemHasThemeTag(tags: readonly string[], theme: string) {
  return tags.includes(theme);
}

export function getBookBySlug(slug: string) {
  return books.find((b) => b.slug === slug);
}

export function getMentalModelBySlug(slug: string) {
  return mentalModels.find((m) => m.slug === slug);
}

export function getModelsForBook(bookSlug: string) {
  const book = getBookBySlug(bookSlug);
  if (!book) return [];
  return mentalModels.filter((m) => book.mentalModelSlugs.includes(m.slug));
}
