import { type Config, defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
  path: '.env.local',
})

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
}) satisfies Config