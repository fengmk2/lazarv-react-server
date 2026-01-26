import { join } from "node:path";

import { hostname, page, server } from "playground/utils";
import { expect, test } from "vitest";

test("todo load", async () => {
  await server("../examples/todo/src/index.tsx");
  await page.goto(hostname);
  expect(await page.textContent("body")).toContain("Todo");
});
