const PROD_SITE_URL = "https://kushalshah.vercel.app";

const importMetaEnv =
  typeof import.meta !== "undefined"
    ? ((import.meta as unknown as { env?: Record<string, string | undefined> }).env)
    : undefined;

const processEnv =
  typeof process !== "undefined" && process.env ? process.env : undefined;

const rawSiteUrl =
  importMetaEnv?.VITE_SITE_URL ||
  processEnv?.VITE_SITE_URL ||
  PROD_SITE_URL;

/** Strip trailing slash so it composes cleanly with `${siteUrl}${path}`. */
const normalizedSiteUrl = rawSiteUrl.replace(/\/+$/, "");

export const site = {
  name: "Kushal Shah",
  title: "Kushal Shah — Systems Architect & Technical Strategist",
  shortTitle: "Kushal Shah",
  jobTitle: "Systems Architect & Technical Strategist",
  description:
    "I lead complex technical systems from ambiguity to execution. Systems architecture, technical strategy, and cross-functional leadership.",
  longDescription:
    "Aerospace systems leader with deep experience across mission operations, OPIR/SBIRS payload systems, PWSA flight ops, mission algorithms, and software platforms. Lead complex technical systems from ambiguity to execution.",
  email: "kushalshah.kai@gmail.com",
  linkedin: "https://www.linkedin.com/in/kushalmae/",
  github: "https://github.com/kushalmae",
  githubUsername: "kushalmae",
  resumeUrl: "/resume.pdf",
  ogImage: "/hero-visual.jpg",
  siteUrl: normalizedSiteUrl,
  formspreeEndpoint:
    importMetaEnv?.VITE_FORMSPREE_ENDPOINT ||
    processEnv?.VITE_FORMSPREE_ENDPOINT ||
    "",
  twitterHandle: "@kushalmae",
  location: "United States",
} as const;
