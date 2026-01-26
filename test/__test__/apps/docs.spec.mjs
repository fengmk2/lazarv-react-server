import { join } from "node:path";

import { hostname, page, server } from "playground/utils";
import { expect, test } from "vitest";

test("docs load", async () => {
  await server("../docs");
  await page.goto(hostname);
  await page.waitForLoadState("networkidle");

  expect(await page.textContent("body")).toContain("react-server");
});
