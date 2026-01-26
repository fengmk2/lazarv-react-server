import { join } from "node:path";

import {
  hostname,
  page,
  server,
  waitForChange,
  waitForHydration,
} from "playground/utils";
import { expect, test } from "vitest";



test("express load", async () => {
  await server("../examples/express/src/app/index.jsx", undefined, "/react-server/");
  await page.goto(hostname + "/react-server/");
  await waitForHydration();
  expect(await page.textContent("body")).toContain("Hello World!");
  const button = await page.getByRole("button");
  await waitForChange(
    () => button.click(),
    () => button.textContent()
  );
  expect(await button.textContent()).toContain("1");
});
