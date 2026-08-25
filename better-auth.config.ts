import { betterAuth } from "better-auth";
import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL;

if (!connectionString) throw new Error("DATABASE_URL is required.");

export const auth = betterAuth({
  appName: "ARIX Accounts",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: new Pool({ connectionString, max: 2 }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 12,
    maxPasswordLength: 128,
  },
  session: { expiresIn: 60 * 60 * 12, updateAge: 60 * 60 },
  telemetry: { enabled: false },
});
