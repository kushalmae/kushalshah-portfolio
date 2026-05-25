/** Programs and organizations to surface as a trust strip on the home page.
 *
 * Implemented as text wordmarks rather than rasterized logos: many of these
 * are government/contractor marks where unlicensed use is sensitive, and a
 * uniform typographic treatment looks intentional rather than scraped. */

export interface Program {
  name: string;
  /** Short context line, shown under the name on hover or on wider screens. */
  context: string;
}

export const programs: Program[] = [
  { name: "Rocket Lab", context: "Global Operations" },
  { name: "Northrop Grumman", context: "OPIR / SBIRS" },
  { name: "U.S. Space Force", context: "OPIR programs" },
  { name: "SDA", context: "PWSA Tranche 2 Transport Layer" },
  { name: "Lockheed Martin", context: "OPIR partner" },
  { name: "UCLA", context: "M.S. Mechanical Engineering" },
  { name: "UC Irvine", context: "B.S. Mechanical + Aerospace" },
];
