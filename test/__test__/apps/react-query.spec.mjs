import { join } from "node:path";

import { expect } from "@playwright/test";
import { hostname, page, server, waitForHydration } from "playground/utils";
import { test } from "vitest";



test("react-query load", async () => {
  await server("../examples/react-query");
  await page.goto(hostname);
  await page.waitForLoadState("networkidle");
  await waitForHydration();
  await expect(page.locator("css=.post-card")).toHaveCount(100);
  await expect(page.locator("css=.comment-card")).toHaveCount(500);
});
