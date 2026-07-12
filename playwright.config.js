import { devices, defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./__e2e__",

  use: {
    baseURL: "http://localhost:5173",
  },

  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
    {
      name: "Mobile",
      use: {
        ...devices["iPhone 12"],
      },
    },
  ],
});
