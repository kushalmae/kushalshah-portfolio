import { describe, expect, it } from "vitest";
import { STATIC_ROUTES } from "@/config/routes";
import { buildAllRoutes } from "../../scripts/lib/routes";

describe("public route registry", () => {
  it("does not publish the retired speaking page", () => {
    expect(STATIC_ROUTES.map((route) => route.path)).not.toContain("/speaking");
    expect(buildAllRoutes().map((route) => route.path)).not.toContain("/speaking");
  });
});
