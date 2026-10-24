import { z } from "zod";

const DEFAULT_DEV_HASH = "$2b$10$ORSv/dndRutBWh61UpoC.uJMoxbZbw.BnpMeY04oqSdEQEzSeMx0K"; // admin123
const DEFAULT_DEV_AUTH_SECRET = "dev_secret_local_testing_at_least_32_characters_long_super_secret";
const DEFAULT_DEV_SALT_SECRET = "daily_salt_secret_local_dev_32_characters_random";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().default("file:./dev.db"),
  ADMIN_USERNAME: z.string().default("admin"),
  ADMIN_PASSWORD_HASH: z.string().default(DEFAULT_DEV_HASH),
  AUTH_SECRET: z.string().min(16).default(DEFAULT_DEV_AUTH_SECRET),
  ANALYTICS_SALT_SECRET: z.string().min(16).default(DEFAULT_DEV_SALT_SECRET),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  RESEND_API_KEY: z.string().optional().default(""),
  CONTACT_FORWARD_EMAIL: z.string().optional().default(""),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || DEFAULT_DEV_HASH,
  AUTH_SECRET: process.env.AUTH_SECRET || DEFAULT_DEV_AUTH_SECRET,
  ANALYTICS_SALT_SECRET: process.env.ANALYTICS_SALT_SECRET || DEFAULT_DEV_SALT_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FORWARD_EMAIL: process.env.CONTACT_FORWARD_EMAIL,
});
