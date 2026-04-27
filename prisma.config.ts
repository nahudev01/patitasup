import "dotenv/config";

import { defineConfig } from "prisma/config";

const env = process.env;
const migrationUrl = env.PRISMA_MIGRATE_DATABASE_URL ?? env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationUrl,
    shadowDatabaseUrl: env.SHADOW_DATABASE_URL,
  },
});