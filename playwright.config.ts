import { defineConfig, devices } from "@playwright/test";

const OK_PORT = 3100;
const FAIL_PORT = 3101;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: `http://localhost:${OK_PORT}`, ...devices["Desktop Chrome"] },
  webServer: [
    {
      command: `npx next start -p ${OK_PORT}`,
      port: OK_PORT,
      reuseExistingServer: false,
      env: { LEAD_MAIL_TRANSPORT: "outbox", LEAD_RATE_LIMIT_MAX: "1000" },
    },
    {
      command: `npx next start -p ${FAIL_PORT}`,
      port: FAIL_PORT,
      reuseExistingServer: false,
      env: { LEAD_MAIL_TRANSPORT: "fail", LEAD_RATE_LIMIT_MAX: "1000" },
    },
  ],
});

export const FAIL_BASE_URL = `http://localhost:${FAIL_PORT}`;
