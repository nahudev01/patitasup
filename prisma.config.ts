import { config as loadEnv } from "dotenv";

import { defineConfig } from "prisma/config";

loadEnv();

const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process
  ?.env ?? { };

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env.DATABASE_URL,
  },
});