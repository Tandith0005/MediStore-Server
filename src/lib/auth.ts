import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { envVars } from "../config/envVars.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: envVars.BETTER_AUTH_SECRET,
  baseURL: `${envVars.BETTER_AUTH_URL}/api/auth`,
  trustedOrigins: [
    envVars.APP_URL,
    envVars.BETTER_AUTH_URL
  ],

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      isDeleted: {
        type: "boolean",
        defaultValue: false,
        required: false,
      }
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: envVars.GOOGLE_CLIENT_ID as string,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET as string,
    },
  },

  session: {
    cookieCache: {
      enabled: false,
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    // When using Rewrites/Proxies, "lax" is often more stable than "none"
    cookieSameSite: "Lax",
    useSecureCookies: true,
  },

  //  Logout is implemented on the client side
});