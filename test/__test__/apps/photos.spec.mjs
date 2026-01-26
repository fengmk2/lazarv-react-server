import { join } from "node:path";

import { hostname, page, server } from "playground/utils";
import { expect, test } from "vitest";



test("photos load", async () => {
  await server("../examples/photos");
  await page.goto(hostname);
  expect(await page.textContent("body")).toContain("Photos");
});
