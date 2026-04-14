import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { envVars } from "../config/envVars.js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: envVars.BETTER_AUTH_SECRET,
  baseURL: `${envVars.APP_URL}/api/auth`,
  // baseURL: `${envVars.APP_URL}`,
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
      phone: {
      type: "string",
      required: false,   
      defaultValue: null,
    },
    address: {
      type: "string",
      required: false,  
      defaultValue: null,
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
    cookieSameSite: "lax",
    useSecureCookies: true,
  },

  //  Logout is implemented on the client side
});