import { readdir, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { chromium } from "playwright-chromium";

let browserServer;

export async function setup() {
  browserServer = await chromium.launchServer({
    headless: !process.env.REACT_SERVER_DEBUG,
    args: process.env.CI
      ? ["--no-sandbox", "--disable-setuid-sandbox"]
      : undefined,
  });

  const wsEndpoint = browserServer.wsEndpoint();

  // Write the endpoint to a file for the test setup to read
  const endpointFilePath = resolve(process.cwd(), ".wsEndpoint");
  await writeFile(endpointFilePath, wsEndpoint, "utf8");
}

export async function teardown() {
  await browserServer.close();

  // Clean up the endpoint file
  try {
    await rm(resolve(process.cwd(), ".wsEndpoint"));
  } catch {
    // Ignore errors when removing the file
  }

  if (!process.env.CI) {
    const files = await readdir(process.cwd(), { withFileTypes: true });
    await Promise.all(
      files
        .filter(
          (file) => file.isDirectory() && file.name.includes(".react-server")
        )
        .map((file) => rm(join(process.cwd(), file.name), { recursive: true }))
    );
  }
}
