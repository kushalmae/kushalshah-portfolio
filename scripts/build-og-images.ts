import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { decompress as decompressWoff2 } from "wawoff2";
import { articles } from "../src/data/articles";

const WIDTH = 1200;
const HEIGHT = 630;

const require = createRequire(import.meta.url);

/** @fontsource/inter ships only WOFF2; satori needs raw SFNT (TTF/OTF). We
 * decompress the WOFF2 in memory using the official WASM decoder at build
 * time. No network round-trips, no committed binaries.
 *
 * Returns a tight ArrayBuffer (no offset) so @shuding/opentype.js sees the SFNT
 * magic bytes at offset 0 — passing a Node Buffer leaks the underlying pool's
 * leading bytes and breaks parsing. */
async function loadFont(woff2RelPath: string): Promise<ArrayBuffer> {
  const fontsourceDir = dirname(require.resolve("@fontsource/inter/package.json"));
  const fullPath = resolve(fontsourceDir, woff2RelPath);
  const woff2 = readFileSync(fullPath);
  const ttf = await decompressWoff2(woff2);
  const u8 = ttf instanceof Uint8Array ? ttf : new Uint8Array(ttf);
  // Copy into a fresh, exactly-sized ArrayBuffer.
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

interface CardProps {
  topic: string;
  title: string;
  date: string;
}

/** Satori takes JSX-like trees as plain objects. Using plain objects keeps this
 * file pure TypeScript with no extra JSX runtime; satori handles it identically. */
function card({ topic, title, date }: CardProps): Parameters<typeof satori>[0] {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0a0a0a",
        color: "#f7f6f3",
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 24,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 22,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                    color: "#b8a98a",
                    fontWeight: 400,
                  },
                  children: topic,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 60,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: -1,
                    color: "#f7f6f3",
                    display: "flex",
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 22,
              color: "#7a7973",
              fontWeight: 400,
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column", gap: 6 },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { color: "#f7f6f3", fontWeight: 700, fontSize: 26 },
                        children: "Kushal Shah",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        children: "Systems Architect · Technical Strategist",
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: { children: date },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: "#b8a98a",
            },
            children: "",
          },
        },
      ],
    },
  };
}

export async function generateOgImages(distDir: string): Promise<number> {
  let interRegular: ArrayBuffer;
  let interBold: ArrayBuffer;
  try {
    interRegular = await loadFont("files/inter-latin-400-normal.woff2");
    interBold = await loadFont("files/inter-latin-700-normal.woff2");
  } catch (err) {
    console.warn(
      `[og] Skipping per-article OG image generation: ${(err as Error).message}`
    );
    return 0;
  }

  const ogDir = resolve(distDir, "og");
  mkdirSync(ogDir, { recursive: true });

  let count = 0;
  for (const article of articles) {
    const svg = await satori(
      card({ topic: article.topic, title: article.title, date: article.date }),
      {
        width: WIDTH,
        height: HEIGHT,
        fonts: [
          { name: "Inter", data: interRegular, weight: 400, style: "normal" },
          { name: "Inter", data: interBold, weight: 700, style: "normal" },
        ],
      }
    );
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } });
    const png = resvg.render().asPng();
    writeFileSync(resolve(ogDir, `${article.slug}.png`), png);
    count++;
  }
  return count;
}
