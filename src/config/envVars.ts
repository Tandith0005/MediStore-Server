import dotenv from "dotenv";
import z from "zod";


dotenv.config();

// Define schema
const envSchema = z.object({
  DATABASE_URL: z.url(),

  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url(),

  APP_URL: z.url(),
  PROD_APP_URL: z.url().optional(),

  PORT: z.coerce.number().default(5000),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  ADMIN_NAME: z.string(),
  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: z.string(),

  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

// Validate env
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

//  Export typed env
export const envVars = parsedEnv.data;