import { join } from "node:path";

import { hostname, page, server, waitForHydration } from "playground/utils";
import { expect, test } from "vitest";



test("tanstack-router load", async () => {
  await server("../examples/tanstack-router");
  await page.goto(hostname);
  await page.waitForLoadState("networkidle");
  await waitForHydration();

  expect(await page.textContent("body")).toContain("TanStack Router");
});
